const SLUG_RE = /^[a-zA-Z0-9-_]{1,128}$/;
const KDF_ITERATIONS = 100_000;
const AUTOSAVE_DEBOUNCE_MS = 1500;

const enc = new TextEncoder();
const dec = new TextDecoder();

function $(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing #${id}`);
  return el;
}

function getSlugFromPathname(pathname) {
  const trimmed = pathname.replace(/^\/+|\/+$/g, '');
  if (!trimmed) return 'home';
  // Only use the first segment; keep URLs simple and predictable.
  return trimmed.split('/')[0];
}

function bytesToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function formatTimestamp(ts) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(ts));
  } catch {
    return new Date(ts).toLocaleString();
  }
}

let toastTimer = null;
function toast(message) {
  const el = $('toast');
  el.textContent = message;
  el.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

async function apiJson(path, init) {
  const res = await fetch(path, init);
  const text = await res.text().catch(() => '');
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

async function deriveKey(password, saltBytes) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: KDF_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

async function decryptPayload(password, payload) {
  const salt = base64ToBytes(payload.salt);
  const iv = base64ToBytes(payload.iv);
  const ciphertext = base64ToBytes(payload.content);
  const key = await deriveKey(password, salt);
  const plaintextBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext,
  );
  return { text: dec.decode(plaintextBuf), salt, key };
}

async function encryptText(key, saltBytes, text) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertextBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(text),
  );
  return {
    content: bytesToBase64(new Uint8Array(ciphertextBuf)),
    iv: bytesToBase64(iv),
    salt: bytesToBase64(saltBytes),
  };
}

const state = {
  slug: getSlugFromPathname(window.location.pathname),
  password: null,
  key: null,
  salt: null,
  exists: false,
  createdAt: null,
  updatedAt: null,
  saving: false,
  dirty: false,
  autosaveHandle: null,
};

function setStatus(text) {
  $('status').textContent = text || '';
}

function setLastSaved(ts) {
  $('lastSaved').textContent = ts ? `Last saved: ${formatTimestamp(ts)}` : '';
}

function showAuth() {
  $('authSection').classList.remove('hidden');
  $('editorSection').classList.add('hidden');
  $('password').value = '';
  $('noteContent').value = '';
  state.password = null;
  state.key = null;
  state.salt = null;
  state.exists = false;
  state.createdAt = null;
  state.updatedAt = null;
  state.dirty = false;
  setStatus('');
  setLastSaved(null);
}

function showEditor(text) {
  $('authSection').classList.add('hidden');
  $('editorSection').classList.remove('hidden');
  $('noteContent').value = text;
  $('noteContent').focus();
  state.dirty = false;
}

function validateSlugOrDie() {
  if (!SLUG_RE.test(state.slug) || state.slug === 'api' || state.slug === '_') {
    $('title').textContent = 'Invalid slug';
    $('authSection').innerHTML =
      '<p class="hint">Invalid URL slug. Use only letters, numbers, "-", "_".</p>';
    throw new Error('Invalid slug');
  }
}

async function loadNote() {
  const data = await apiJson(`/api/note/${encodeURIComponent(state.slug)}`, {
    method: 'GET',
  });
  if (!data.exists) return { exists: false };
  return {
    exists: true,
    content: data.content,
    iv: data.iv,
    salt: data.salt,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

async function saveNote({ force } = { force: false }) {
  if (!state.key || !state.salt) throw new Error('Not unlocked');
  if (state.saving) return;
  if (!force && !state.dirty) return;

  state.saving = true;
  $('saveBtn').disabled = true;
  setStatus('Encrypting…');

  try {
    const text = $('noteContent').value;
    const encrypted = await encryptText(state.key, state.salt, text);

    setStatus('Saving…');

    const body = { ...encrypted };
    if (!force && typeof state.updatedAt === 'number')
      body.expectedUpdatedAt = state.updatedAt;

    const res = await apiJson(`/api/note/${encodeURIComponent(state.slug)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    state.updatedAt = res.updatedAt;
    state.dirty = false;
    setStatus('Saved.');
    setLastSaved(res.updatedAt);
  } catch (e) {
    if (e?.status === 409) {
      const serverUpdatedAt = e?.data?.updatedAt;
      const choice = confirm(
        `Conflict: this note was updated elsewhere.\n\nReload latest? (Cancel = overwrite)\n\nServer updated: ${serverUpdatedAt ? formatTimestamp(serverUpdatedAt) : 'unknown'}`,
      );
      if (choice) {
        toast('Reloading latest…');
        await accessNote({ reloadOnly: true });
      } else {
        toast('Overwriting…');
        await saveNote({ force: true });
      }
      return;
    }
    console.error(e);
    setStatus('Save failed.');
    toast('Save failed.');
  } finally {
    state.saving = false;
    $('saveBtn').disabled = false;
  }
}

function scheduleAutosave() {
  if (state.autosaveHandle) clearTimeout(state.autosaveHandle);
  state.autosaveHandle = setTimeout(
    () => saveNote().catch(() => {}),
    AUTOSAVE_DEBOUNCE_MS,
  );
}

async function accessNote({ reloadOnly } = { reloadOnly: false }) {
  const passwordInput = $('password').value;
  const password = reloadOnly ? state.password : passwordInput;

  if (!password) {
    alert('Password required');
    return;
  }

  $('accessBtn').disabled = true;
  setStatus('Loading…');

  try {
    const data = await loadNote();

    if (!data.exists) {
      const ok = confirm("Note doesn't exist. Create it with this password?");
      if (!ok) return;

      const salt = crypto.getRandomValues(new Uint8Array(16));
      const key = await deriveKey(password, salt);

      state.password = password;
      state.salt = salt;
      state.key = key;
      state.exists = false;
      state.createdAt = null;
      state.updatedAt = null;

      showEditor('');
      setStatus('New note (unsaved).');
      toast('New note ready.');
      return;
    }

    const decrypted = await decryptPayload(password, data);

    state.password = password;
    state.salt = decrypted.salt;
    state.key = decrypted.key;
    state.exists = true;
    state.createdAt = data.createdAt;
    state.updatedAt = data.updatedAt;

    showEditor(decrypted.text);
    setStatus('Loaded.');
    setLastSaved(data.updatedAt);
    toast('Unlocked.');
  } catch (e) {
    console.error(e);
    alert('Wrong password or corrupted data.');
    setStatus('');
  } finally {
    $('accessBtn').disabled = false;
  }
}

async function openVersions() {
  if (!state.key) return;
  const dialog = $('versionsDialog');
  const list = $('versionsList');
  list.innerHTML = '<li class="hint">Loading…</li>';
  dialog.showModal();

  try {
    const data = await apiJson(
      `/api/note/${encodeURIComponent(state.slug)}/versions`,
      { method: 'GET' },
    );
    const versions = data.versions || [];
    if (versions.length === 0) {
      list.innerHTML = '<li class="hint">No versions yet.</li>';
      return;
    }

    list.innerHTML = '';
    for (const v of versions) {
      const li = document.createElement('li');
      li.className = 'list-item';

      const meta = document.createElement('div');
      meta.className = 'list-meta';

      const title = document.createElement('div');
      title.className = 'title';
      title.textContent = `Version — ${formatTimestamp(v.createdAt)}`;

      const sub = document.createElement('div');
      sub.className = 'sub';
      sub.textContent = `${v.size} chars`;

      meta.appendChild(title);
      meta.appendChild(sub);

      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = 'Restore';
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        try {
          const ver = await apiJson(
            `/api/note/${encodeURIComponent(state.slug)}/version/${encodeURIComponent(String(v.id))}`,
            { method: 'GET' },
          );

          const payload = { content: ver.content, iv: ver.iv, salt: ver.salt };
          const decrypted = await decryptPayload(state.password, payload);

          // Restore into editor but require a save to confirm (like ProtectedText).
          $('noteContent').value = decrypted.text;
          state.dirty = true;
          setStatus('Version restored (unsaved).');
          toast('Version restored. Save to confirm.');
          dialog.close();
        } catch (e) {
          console.error(e);
          alert('Failed to restore version. Password may be different.');
        } finally {
          btn.disabled = false;
        }
      });

      li.appendChild(meta);
      li.appendChild(btn);
      list.appendChild(li);
    }
  } catch (e) {
    console.error(e);
    list.innerHTML = '<li class="hint">Failed to load versions.</li>';
  }
}

async function changePassword() {
  if (!state.key || !state.salt) return;
  const dialog = $('changePasswordDialog');
  const newPass = $('newPassword').value;
  const confirmPass = $('confirmPassword').value;

  if (!newPass || newPass.length < 4) {
    alert('Use a longer password.');
    return;
  }
  if (newPass !== confirmPass) {
    alert('Passwords do not match.');
    return;
  }

  $('applyPasswordBtn').disabled = true;
  try {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await deriveKey(newPass, salt);
    const text = $('noteContent').value;

    const encrypted = await encryptText(key, salt, text);
    const body = { ...encrypted };
    if (typeof state.updatedAt === 'number')
      body.expectedUpdatedAt = state.updatedAt;

    const res = await apiJson(`/api/note/${encodeURIComponent(state.slug)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    state.password = newPass;
    state.salt = salt;
    state.key = key;
    state.updatedAt = res.updatedAt;
    state.dirty = false;
    setStatus('Password changed and saved.');
    setLastSaved(res.updatedAt);
    toast('Password changed.');
    dialog.close();
    $('newPassword').value = '';
    $('confirmPassword').value = '';
  } catch (e) {
    console.error(e);
    alert('Failed to change password.');
  } finally {
    $('applyPasswordBtn').disabled = false;
  }
}

async function deleteCurrentNote() {
  const ok = confirm(
    'Delete this note and its history? This cannot be undone.',
  );
  if (!ok) return;
  $('deleteBtn').disabled = true;
  try {
    await apiJson(`/api/note/${encodeURIComponent(state.slug)}`, {
      method: 'DELETE',
    });
    toast('Deleted.');
    showAuth();
  } catch (e) {
    console.error(e);
    alert('Delete failed.');
  } finally {
    $('deleteBtn').disabled = false;
  }
}

async function exportEncrypted() {
  if (!state.key || !state.salt) return;
  const text = $('noteContent').value;
  const encrypted = await encryptText(state.key, state.salt, text);

  const payload = {
    format: 'cloudnote-d1-export-v1',
    slug: state.slug,
    exportedAt: Date.now(),
    note: {
      ...encrypted,
      updatedAt: state.updatedAt,
      createdAt: state.createdAt,
    },
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cloudnote-${state.slug}-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast('Exported.');
}

async function importEncrypted(file) {
  const text = await file.text();
  const data = JSON.parse(text);
  const note = data?.note || data;

  if (!note?.content || !note?.iv || !note?.salt) {
    alert('Invalid export file.');
    return;
  }

  if (!state.password) {
    alert('Unlock the note first.');
    return;
  }

  try {
    const decrypted = await decryptPayload(state.password, note);
    $('noteContent').value = decrypted.text;

    // Use imported salt/key for future saves (matches the imported encryption).
    state.salt = decrypted.salt;
    state.key = decrypted.key;
    state.dirty = true;
    setStatus('Imported (unsaved).');
    toast('Imported. Save to confirm.');
  } catch (e) {
    console.error(e);
    alert('Import failed (wrong password?).');
  }
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast('Link copied.');
  } catch {
    prompt('Copy link:', window.location.href);
  }
}

function lock() {
  const ok = state.dirty
    ? confirm(
        'Lock now? This will discard unsaved changes and clear plaintext from this tab.',
      )
    : confirm('Lock now? This will clear plaintext from this tab.');
  if (!ok) return;
  showAuth();
  toast('Locked.');
}

function wireEvents() {
  $('accessBtn').addEventListener('click', () => accessNote());
  $('password').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') accessNote();
  });

  $('saveBtn').addEventListener('click', () => saveNote({ force: false }));
  $('versionsBtn').addEventListener('click', () => openVersions());
  $('deleteBtn').addEventListener('click', () => deleteCurrentNote());
  $('exportBtn').addEventListener('click', () =>
    exportEncrypted().catch(() => {}),
  );
  $('importFile').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    importEncrypted(file).catch(() => {});
  });

  $('copyLinkBtn').addEventListener('click', () => copyLink());
  $('lockBtn').addEventListener('click', () => lock());

  $('changePasswordBtn').addEventListener('click', () => {
    $('changePasswordDialog').showModal();
    $('newPassword').focus();
  });
  $('applyPasswordBtn').addEventListener('click', () => changePassword());

  $('versionsCloseBtn').addEventListener('click', () =>
    $('versionsDialog').close(),
  );
  $('changePasswordCloseBtn').addEventListener('click', () =>
    $('changePasswordDialog').close(),
  );

  $('noteContent').addEventListener('input', () => {
    state.dirty = true;
    setStatus('Unsaved changes…');
    scheduleAutosave();
  });

  window.addEventListener('beforeunload', (e) => {
    if (state.dirty) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      saveNote().catch(() => {});
    }
    if (e.key === 'Escape') {
      if ($('versionsDialog').open) $('versionsDialog').close();
      if ($('changePasswordDialog').open) $('changePasswordDialog').close();
    }
  });
}

function boot() {
  validateSlugOrDie();
  $('slug').textContent = `/${state.slug}`;
  $('title').textContent = `CloudNote D1 — /${state.slug}`;
  wireEvents();
  showAuth();
}

boot();
