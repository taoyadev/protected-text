# CloudNote D1 — Architecture (Architect)

## High-level architecture

**Single Worker** (serves static assets and API) + **D1 (SQLite)**.

- Static assets: landing page + note editor (HTML/CSS/JS)
- API:
  - `GET /api/note/:slug`
  - `POST /api/note/:slug`
  - `DELETE /api/note/:slug`
  - `GET /api/note/:slug/versions`
  - `GET /api/note/:slug/version/:id`
  - (Optional compatibility) `/api/load|save|check|delete|versions`
- Storage:
  - `notes`: latest encrypted payload per slug
  - `note_versions`: last N previous payloads per slug

## Threat model (what we can / cannot protect)

### Protected

- Cloudflare/D1 compromise should not expose plaintext (ciphertext only).
- Network observers should not learn content (TLS).
- Server-side XSS should be mitigated with strict CSP and no inline scripts.

### Not fully protected (by design constraints)

- Offline password guessing against leaked ciphertext is possible if users choose weak passwords.
- Slug enumeration is possible (the server must answer existence checks to be usable).
- Availability attacks (overwrites / spam writes) are possible without an auth layer.

## Mitigations & design choices

- Strong client KDF: PBKDF2 with high iterations (configurable for future).
- Input validation:
  - Slug allowlist and reserved paths.
  - Payload size limits.
  - Base64 sanity checks (lightweight).
- Version retention: keep only last N versions per slug.
- Security headers:
  - CSP (no inline script), `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, etc.
  - `X-Robots-Tag: noindex` for note pages.
- CORS: disabled by default (same-origin app), optionally allow via env var if separated hosting is needed.

## Operational notes

- Use Cloudflare dashboard Rate Limiting rules (recommended) to mitigate abusive writes.
- Backups: D1 exports can be scheduled out-of-band (manual export is acceptable for v1).
