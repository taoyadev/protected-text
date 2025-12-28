# CloudNote D1 — Product Spec (PM)

## Goal

Build a production-ready, zero-knowledge encrypted note app on **Cloudflare Workers + D1**.

- Users share/open a note by URL path (`/<slug>`).
- A password is used **only in the browser** to derive an encryption key (PBKDF2) and encrypt/decrypt content (AES‑GCM).
- The server stores only encrypted blobs and metadata; it must never receive plaintext or passwords.

## Core user flows

### 1) Open existing note

1. User visits `https://yourdomain.com/<slug>`
2. App fetches ciphertext + parameters from the API
3. User enters password → app decrypts locally
4. App shows editor + status (“Loaded”)

### 2) Create new note

1. User visits a new slug
2. API returns `exists=false`
3. User confirms creation, enters password
4. App initializes a new salt and empty content
5. On first save/autosave, encrypted payload is persisted

### 3) Edit + save

- Manual save button
- Autosave with debounce / interval (no data loss)
- Clear save status and error states

### 4) Version history + restore

- Keep the last N versions (default: 10) per slug
- User can list versions and restore any previous version

### 5) Delete note

- User can delete the note (and its versions) with explicit confirmation

## Non-goals (for v1)

- Server-side auth / accounts
- Full-text search (server cannot read content)
- Collaboration / real-time multi-user editing

## Non-functional requirements

### Privacy & security

- Zero-knowledge: server never sees plaintext or password.
- Strong defaults: PBKDF2 (≥100k iterations) + AES‑GCM.
- “Note pages” must not be indexable by search engines.
- Strict security headers for HTML/JS/CSS.

### Reliability

- D1 persistence (no “KV lost data” problems).
- Idempotent writes and robust error handling.

### Performance

- Keep UI responsive for medium notes (≤500KB ciphertext payload).
- Minimize round-trips; use efficient D1 queries.

## Acceptance criteria (ship checklist)

- `wrangler dev` runs locally and the app is usable end-to-end.
- Create → save → reload → decrypt works for any valid slug.
- Wrong password fails cleanly (no partial plaintext in UI).
- Version history populates after multiple saves and restore works.
- Delete removes the note and versions.
- API rejects invalid slugs and oversize payloads.
- Note pages send `X-Robots-Tag: noindex` (or equivalent) and `Referrer-Policy: no-referrer`.
