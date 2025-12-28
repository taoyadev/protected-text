# CloudNote D1

Zero-knowledge encrypted notes on **Cloudflare Workers + D1 (SQLite)**.

- **Browser**: password → PBKDF2 → AES‑GCM encryption → upload ciphertext
- **Server (D1)**: stores only encrypted blobs + metadata — never sees plaintext or password

Features (v1):

- Create/open notes by URL slug (`/<slug>`)
- Autosave + manual save
- Version history (keeps last 10 encrypted snapshots)
- Change password (re-encrypt + save)
- Export/import encrypted backups
- Delete note

## Deploy (Cloudflare)

1. Create a D1 database:

```bash
npx wrangler d1 create cloudnote-db
```

2. Put the `database_id` into `wrangler.toml:12`.

3. Initialize schema:

```bash
npx wrangler d1 execute cloudnote-db --file=./schema.sql
```

Or apply migrations (recommended):

```bash
npx wrangler d1 migrations apply cloudnote-db
```

4. Dev / deploy:

```bash
npx wrangler dev
npx wrangler deploy
```

Open `http://localhost:8787/my-note` (or your production domain) and use the URL slug as the note ID.

## Files

- `src/index.js` – Worker API + static routing + security headers
- `schema.sql` – D1 schema
- `public/index.html` – landing page
- `public/note.html` – note UI
- `public/note.js` – client-side encryption app
- `public/app.css` – shared styles
