const SLUG_RE = /^[a-zA-Z0-9-_]{1,128}$/;

function $(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing #${id}`);
  return el;
}

function randomSlug(len = 12) {
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789'; // no 0/1/i/l/o
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  let out = '';
  for (let i = 0; i < bytes.length; i++)
    out += alphabet[bytes[i] % alphabet.length];
  return out;
}

function goToSlug(slug) {
  const clean = (slug || '').trim();
  if (!SLUG_RE.test(clean) || clean === 'api' || clean === '_') {
    $('landingStatus').textContent =
      'Invalid slug. Use only letters, numbers, "-", "_".';
    return;
  }
  window.location.href = `/${encodeURIComponent(clean)}`;
}

function boot() {
  const input = $('slugInput');
  const openBtn = $('openBtn');
  const randomBtn = $('randomBtn');

  input.value = randomSlug(10);

  openBtn.addEventListener('click', () => goToSlug(input.value));
  randomBtn.addEventListener('click', () => {
    input.value = randomSlug(12);
    $('landingStatus').textContent = '';
    input.focus();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') goToSlug(input.value);
  });
}

boot();
