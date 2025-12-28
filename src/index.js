const VERSION_LIMIT = 10;

const MAX_CONTENT_B64 = 800_000; // ~600KB binary payload
const MAX_IV_B64 = 128;
const MAX_SALT_B64 = 128;

const BASE64_RE = /^[A-Za-z0-9+/]+={0,2}$/;

const CSP = [
  "default-src 'none'",
  "base-uri 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "connect-src 'self'",
  "img-src 'self' data:",
  "script-src 'self'",
  "style-src 'self'",
  "font-src 'self'",
  "manifest-src 'self'",
].join('; ');

function parseAllowedOrigins(env) {
  const raw = env?.CORS_ALLOW_ORIGINS;
  if (!raw) return null;
  const trimmed = String(raw).trim();
  if (!trimmed) return null;
  if (trimmed === '*') return '*';
  return new Set(
    trimmed
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

function corsHeaders(request, env) {
  const allow = parseAllowedOrigins(env);
  if (!allow) return {};
  const origin = request.headers.get('Origin') || '';
  if (allow === '*') {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  }
  if (!origin || !allow.has(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(data, init = {}, request, env) {
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json; charset=utf-8');
  headers.set('Cache-Control', 'no-store');
  applyCommonSecurityHeaders(headers);
  const cors = request && env ? corsHeaders(request, env) : {};
  for (const [k, v] of Object.entries(cors)) headers.set(k, v);
  return new Response(JSON.stringify(data), { ...init, headers });
}

function isValidSlug(slug) {
  if (typeof slug !== 'string') return false;
  if (slug.length < 1 || slug.length > 128) return false;
  // URL-safe slugs only; keeps routing + security simple.
  if (!/^[a-zA-Z0-9-_]+$/.test(slug)) return false;
  if (slug === 'api') return false;
  if (slug === '_') return false;
  return true;
}

function isBase64(str, maxLen) {
  if (typeof str !== 'string') return false;
  if (str.length < 1 || str.length > maxLen) return false;
  if (str.length % 4 !== 0) return false;
  return BASE64_RE.test(str);
}

async function parseJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function numberOrNull(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (
    typeof value === 'string' &&
    value.trim() !== '' &&
    Number.isFinite(Number(value))
  )
    return Number(value);
  return null;
}

async function getNote(env, slug, incrementAccess = false) {
  if (incrementAccess) {
    // Increment access_count and return the updated row
    await env.DB.prepare(
      'UPDATE notes SET access_count = access_count + 1 WHERE slug = ?',
    )
      .bind(slug)
      .run();
  }
  return env.DB.prepare(
    'SELECT slug, content, iv, salt, size, access_count, created_at, updated_at FROM notes WHERE slug = ?',
  )
    .bind(slug)
    .first();
}

async function saveNote(env, slug, { content, iv, salt, now }) {
  const size = content.length;
  const insertPrevious = env.DB.prepare(
    `INSERT INTO note_versions (slug, content, iv, salt, size, created_at)
     SELECT slug, content, iv, salt, size, updated_at
     FROM notes
     WHERE slug = ?`,
  ).bind(slug);

  const upsert = env.DB.prepare(
    `INSERT INTO notes (slug, content, iv, salt, size, access_count, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, 0, ?, ?)
     ON CONFLICT(slug) DO UPDATE SET
       content = excluded.content,
       iv = excluded.iv,
       salt = excluded.salt,
       size = excluded.size,
       access_count = notes.access_count + 1,
       updated_at = excluded.updated_at`,
  ).bind(slug, content, iv, salt, size, now, now);

  const prune = env.DB.prepare(
    `DELETE FROM note_versions
     WHERE slug = ?
       AND id NOT IN (
         SELECT id FROM note_versions
         WHERE slug = ?
         ORDER BY id DESC
         LIMIT ${VERSION_LIMIT}
       )`,
  ).bind(slug, slug);

  await env.DB.batch([insertPrevious, upsert, prune]);
}

async function deleteNote(env, slug) {
  // Do not rely on FK cascade being enabled.
  const delVersions = env.DB.prepare(
    'DELETE FROM note_versions WHERE slug = ?',
  ).bind(slug);
  const delNote = env.DB.prepare('DELETE FROM notes WHERE slug = ?').bind(slug);
  await env.DB.batch([delVersions, delNote]);
}

function applyCommonSecurityHeaders(headers) {
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'no-referrer');
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  );
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload',
  );
}

function withSecurityHeaders(
  response,
  { isHtml = false, noIndex = false } = {},
) {
  const headers = new Headers(response.headers);
  applyCommonSecurityHeaders(headers);
  if (isHtml) headers.set('Content-Security-Policy', CSP);
  if (noIndex)
    headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function fetchAsset(request, env) {
  const res = await env.ASSETS.fetch(request);
  const contentType = res.headers.get('Content-Type') || '';
  const isHtml = contentType.includes('text/html');
  const url = new URL(request.url);
  const noIndex = url.pathname === '/note' || url.pathname === '/note.html';
  return withSecurityHeaders(res, { isHtml, noIndex });
}

async function fetchHtmlByPath(request, env, pathname, { noIndex } = {}) {
  const url = new URL(request.url);
  url.pathname = pathname;
  const res = await env.ASSETS.fetch(new Request(url.toString(), request));
  const secured = withSecurityHeaders(res, {
    isHtml: true,
    noIndex: Boolean(noIndex),
  });
  return secured;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      const headers = new Headers(corsHeaders(request, env));
      if (headers.keys().next().done) {
        // No CORS configured; return minimal response.
        return new Response(null, { status: 204 });
      }
      return new Response(null, { status: 204, headers });
    }

    const segments = url.pathname.split('/').filter(Boolean);

    // =========================
    // API: /api/health
    // =========================
    if (
      segments[0] === 'api' &&
      segments[1] === 'health' &&
      request.method === 'GET'
    ) {
      // Cheap DB ping; catches missing bindings early.
      await env.DB.prepare('SELECT 1').first();
      return json({ ok: true, now: Date.now() }, {}, request, env);
    }

    // =========================
    // API: /api/note/:slug (+ versions)
    // =========================
    if (segments[0] === 'api' && segments[1] === 'note') {
      const slug = segments[2] ? decodeURIComponent(segments[2]) : '';
      if (!isValidSlug(slug)) {
        return json({ message: 'Invalid slug' }, { status: 400 }, request, env);
      }

      // /api/note/:slug/versions
      if (segments[3] === 'versions') {
        if (request.method !== 'GET')
          return json(
            { message: 'Method Not Allowed' },
            { status: 405 },
            request,
            env,
          );

        const rows = await env.DB.prepare(
          `SELECT id, created_at, size
           FROM note_versions
           WHERE slug = ?
           ORDER BY id DESC
           LIMIT ${VERSION_LIMIT}`,
        )
          .bind(slug)
          .all();

        return json(
          {
            versions: (rows.results || []).map((r) => ({
              id: r.id,
              createdAt: r.created_at,
              size: r.size,
            })),
          },
          {},
          request,
          env,
        );
      }

      // /api/note/:slug/version/:id
      if (segments[3] === 'version' && segments[4]) {
        if (request.method !== 'GET')
          return json(
            { message: 'Method Not Allowed' },
            { status: 405 },
            request,
            env,
          );
        const id = numberOrNull(segments[4]);
        if (!id || id < 1)
          return json(
            { message: 'Invalid version id' },
            { status: 400 },
            request,
            env,
          );

        const row = await env.DB.prepare(
          'SELECT id, content, iv, salt, size, created_at FROM note_versions WHERE slug = ? AND id = ?',
        )
          .bind(slug, id)
          .first();

        if (!row)
          return json({ message: 'Not Found' }, { status: 404 }, request, env);

        return json(
          {
            id: row.id,
            content: row.content,
            iv: row.iv,
            salt: row.salt,
            size: row.size,
            createdAt: row.created_at,
          },
          {},
          request,
          env,
        );
      }

      if (request.method === 'GET') {
        const row = await getNote(env, slug, true); // increment access count
        if (!row) return json({ exists: false }, {}, request, env);

        return json(
          {
            exists: true,
            content: row.content,
            iv: row.iv,
            salt: row.salt,
            size: row.size,
            accessCount: row.access_count,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
          },
          {},
          request,
          env,
        );
      }

      if (request.method === 'POST') {
        const body = await parseJson(request);
        if (!body)
          return json(
            { message: 'Invalid JSON' },
            { status: 400 },
            request,
            env,
          );

        const content = body?.content;
        const iv = body?.iv;
        const salt = body?.salt;
        const expectedUpdatedAt = numberOrNull(body?.expectedUpdatedAt);

        if (!isBase64(content, MAX_CONTENT_B64))
          return json(
            { message: 'Invalid content' },
            { status: 400 },
            request,
            env,
          );
        if (!isBase64(iv, MAX_IV_B64))
          return json({ message: 'Invalid iv' }, { status: 400 }, request, env);
        if (!isBase64(salt, MAX_SALT_B64))
          return json(
            { message: 'Invalid salt' },
            { status: 400 },
            request,
            env,
          );

        const now = Date.now();

        if (expectedUpdatedAt !== null) {
          const existing = await env.DB.prepare(
            'SELECT updated_at FROM notes WHERE slug = ?',
          )
            .bind(slug)
            .first();
          if (existing && existing.updated_at !== expectedUpdatedAt) {
            return json(
              { message: 'Conflict', updatedAt: existing.updated_at },
              { status: 409 },
              request,
              env,
            );
          }
        }

        await saveNote(env, slug, { content, iv, salt, now });
        return json({ success: true, updatedAt: now }, {}, request, env);
      }

      if (request.method === 'DELETE') {
        await deleteNote(env, slug);
        return json({ success: true }, {}, request, env);
      }

      return json(
        { message: 'Method Not Allowed' },
        { status: 405 },
        request,
        env,
      );
    }

    // ==========================================
    // Compatibility API (optional):
    // - POST /api/load   { siteName }
    // - POST /api/save   { siteName, encrypted, iv, salt, ... }
    // - GET  /api/check?site=...
    // - POST /api/delete { siteName }
    // ==========================================
    if (segments[0] === 'api' && segments.length >= 2) {
      const action = segments[1];

      if (action === 'check' && request.method === 'GET') {
        const site = url.searchParams.get('site') ?? '';
        if (!isValidSlug(site))
          return json(
            { message: 'Invalid site' },
            { status: 400 },
            request,
            env,
          );
        const row = await env.DB.prepare(
          'SELECT updated_at FROM notes WHERE slug = ?',
        )
          .bind(site)
          .first();
        return json(
          { exists: Boolean(row), updatedAt: row?.updated_at },
          {},
          request,
          env,
        );
      }

      if (action === 'load' && request.method === 'POST') {
        const body = await parseJson(request);
        if (!body)
          return json(
            { message: 'Invalid JSON' },
            { status: 400 },
            request,
            env,
          );

        const siteName = body?.siteName;
        if (!isValidSlug(siteName))
          return json(
            { message: 'Invalid siteName' },
            { status: 400 },
            request,
            env,
          );

        // Increment access count
        await env.DB.prepare(
          'UPDATE notes SET access_count = access_count + 1 WHERE slug = ?',
        )
          .bind(siteName)
          .run();

        const row = await env.DB.prepare(
          'SELECT content, iv, salt, access_count, updated_at FROM notes WHERE slug = ?',
        )
          .bind(siteName)
          .first();
        if (!row) return json({ payload: null }, { status: 200 }, request, env);

        return json(
          {
            payload: {
              encrypted: row.content,
              iv: row.iv,
              salt: row.salt,
              version: 1,
            },
            accessCount: row.access_count,
            updatedAt: row.updated_at,
          },
          {},
          request,
          env,
        );
      }

      if (action === 'save' && request.method === 'POST') {
        const body = await parseJson(request);
        if (!body)
          return json(
            { message: 'Invalid JSON' },
            { status: 400 },
            request,
            env,
          );

        const siteName = body?.siteName;
        const encrypted = body?.encrypted;
        const iv = body?.iv;
        const salt = body?.salt;

        if (!isValidSlug(siteName))
          return json(
            { message: 'Invalid siteName' },
            { status: 400 },
            request,
            env,
          );
        if (!isBase64(encrypted, MAX_CONTENT_B64))
          return json(
            { message: 'Invalid encrypted' },
            { status: 400 },
            request,
            env,
          );
        if (!isBase64(iv, MAX_IV_B64))
          return json({ message: 'Invalid iv' }, { status: 400 }, request, env);
        if (!isBase64(salt, MAX_SALT_B64))
          return json(
            { message: 'Invalid salt' },
            { status: 400 },
            request,
            env,
          );

        const now = Date.now();
        await saveNote(env, siteName, { content: encrypted, iv, salt, now });
        return json({ ok: true, updatedAt: now }, {}, request, env);
      }

      if (action === 'delete' && request.method === 'POST') {
        const body = await parseJson(request);
        if (!body)
          return json(
            { message: 'Invalid JSON' },
            { status: 400 },
            request,
            env,
          );

        const siteName = body?.siteName;
        if (!isValidSlug(siteName))
          return json(
            { message: 'Invalid siteName' },
            { status: 400 },
            request,
            env,
          );
        await deleteNote(env, siteName);
        return json({ success: true }, {}, request, env);
      }

      if (action === 'versions') {
        if (request.method !== 'POST')
          return json(
            { message: 'Method Not Allowed' },
            { status: 405 },
            request,
            env,
          );

        const body = await parseJson(request);
        if (!body)
          return json(
            { message: 'Invalid JSON' },
            { status: 400 },
            request,
            env,
          );

        const siteName = body?.siteName;
        if (!isValidSlug(siteName))
          return json(
            { message: 'Invalid siteName' },
            { status: 400 },
            request,
            env,
          );

        const rows = await env.DB.prepare(
          `SELECT content, iv, salt, created_at, size
           FROM note_versions
           WHERE slug = ?
           ORDER BY id DESC
           LIMIT ${VERSION_LIMIT}`,
        )
          .bind(siteName)
          .all();

        return json(
          {
            versions: (rows.results || []).map((r, idx) => ({
              encrypted: r.content,
              iv: r.iv,
              salt: r.salt,
              timestamp: r.created_at,
              version: VERSION_LIMIT - idx,
              size: r.size,
            })),
          },
          {},
          request,
          env,
        );
      }

      return json({ message: 'Not Found' }, { status: 404 }, request, env);
    }

    // =========================
    // Static site routing
    // =========================
    // 1) Exact asset hit (css/js/icons/etc.)
    const assetRes = await fetchAsset(request, env);
    if (assetRes.status !== 404) return assetRes;

    // 2) Landing page
    if (url.pathname === '/' || segments.length === 0) {
      return fetchHtmlByPath(request, env, '/index.html', { noIndex: false });
    }

    // 3) Content pages under /_/
    if (url.pathname.startsWith('/_/')) {
      const section = segments[1] || '';
      // Only allow one segment after "/_/" (e.g. "/_/privacy").
      if (!section || segments.length !== 2) {
        return json({ message: 'Not Found' }, { status: 404 }, request, env);
      }
      return fetchHtmlByPath(request, env, `/_/${section}`, { noIndex: false });
    }

    // 4) Note pages: any other path is treated as a note slug and serves the note UI.
    if (segments.length !== 1) {
      const redirectTo = `/${encodeURIComponent(segments[0])}`;
      const headers = new Headers({ Location: redirectTo });
      applyCommonSecurityHeaders(headers);
      return new Response(null, {
        status: 302,
        headers,
      });
    }

    return fetchHtmlByPath(request, env, '/note', { noIndex: true });
  },
};
