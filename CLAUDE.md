# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential
```bash
npm install          # Install dependencies (Node >= 18.18 required)
npm run dev          # Start Next.js dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint via next lint
npm run type-check   # TypeScript validation without build
npm run test         # Run Vitest unit tests (one-time)
npm run test:watch   # Run Vitest in watch mode
npm run format       # Format code with Prettier
```

### Testing Individual Files
```bash
npx vitest run tests/site.test.ts          # Run single test file
npx vitest run tests/site.test.ts -t "slug" # Run tests matching pattern
```

### Analysis
```bash
npm run analyze      # Build with bundle analyzer
```

## Architecture Overview

### Zero-Knowledge Encryption Flow

The app implements client-side encryption where passwords **never** leave the browser:

1. **Password Entry** (`components/editor/password-gate.tsx`) → User enters password to create or unlock note
2. **Key Derivation** (`lib/crypto.ts`) → PBKDF2 with 100k iterations derives AES-256 key from password
3. **Encryption/Decryption** (`lib/crypto.ts`) → AES-256-GCM with random IV per save
4. **Storage** (`lib/storage.ts`) → Encrypted payload saved to Vercel KV with version history (10 versions kept)
5. **Server-side** (`app/api/{save,load}/route.ts`) → APIs only handle encrypted blobs; cannot decrypt

**Key principle**: The password is held in React state during the editor session and used to re-encrypt on every autosave. The server receives only `{ encrypted, iv, salt, version }` payloads.

### Route Structure

```
app/
├── page.tsx                     # Marketing landing page with hero + pricing
├── [siteName]/page.tsx          # Dynamic editor route (validates slug via isSiteNameValid)
└── api/
    ├── save/route.ts            # POST encrypted payload → Vercel KV
    ├── load/route.ts            # GET encrypted payload by siteName
    └── check/route.ts           # HEAD check if siteName exists
```

- **Slug validation** (`lib/site.ts`): Site names must match `/^[a-z0-9][a-z0-9-]{2,31}$/` (3-32 chars, lowercase alphanumeric + hyphens, no leading/trailing hyphens)
- **Dynamic routing**: `app/[siteName]/page.tsx` calls `notFound()` if slug invalid

### Editor Autosave Pipeline

`components/editor/encrypted-editor.tsx` orchestrates the editor lifecycle:

1. **Bootstrap** (useEffect on mount): `loadEncryptedNote(siteName)` checks if note exists → sets mode to `'create'` or `'unlock'`
2. **Password gate**: User enters password → if unlocking, attempts `decryptContent(payload, password)` → on success, transitions to `status: 'ready'`
3. **Content changes**: User types → `setContent()` → marks `isDirty: true`
4. **Debounced save** (`hooks/use-debounce.ts` at 1.5s): When `debouncedContent` changes and `isDirty` is true, triggers `encryptContent()` → `saveEncryptedNote()` → updates `lastSaved` timestamp
5. **Export/Share**: Actions use in-memory `content` (plaintext) to download or copy URL

### Data Layer

- **Storage abstraction** (`lib/storage.ts`): Wraps `@vercel/kv` with `getSite`, `saveSite`, `getVersions`
- **Version history**: Each save pushes to `versions:{siteName}` list (limited to 10 entries via `ltrim`)
- **Metadata tracking**: `StoredSite` includes `createdAt`, `updatedAt`, `accessCount`, `size`

### Security Headers

`next.config.mjs` enforces strict CSP, X-Frame-Options: DENY, and restrictive Permissions-Policy. When adding third-party scripts/fonts, update the CSP accordingly.

### PWA Configuration

`next-pwa` is configured with `disable: !isProd` so service workers only register in production. Manifest is at `public/manifest.json`.

## Key Patterns

### Crypto Helpers
All encryption/decryption lives in `lib/crypto.ts`. Functions are pure and testable:
- `encryptContent(content, password)` → `{ encrypted, iv, salt, version }`
- `decryptContent(payload, password)` → plaintext string
- Base64 encoding/decoding for wire transport

### API Client
`lib/api.ts` exports `loadEncryptedNote`, `saveEncryptedNote`, `checkSiteExists` wrappers around fetch calls. Always returns `{ payload, exists }` or throws.

### Testing
- Vitest setup in `vitest.config.ts` with `@` alias and jsdom environment
- `tests/site.test.ts` covers slug normalization/validation
- When adding crypto tests, mock Web Crypto API via `vitest.setup.ts`

## Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
# Vercel KV (required for save/load APIs)
KV_URL=redis://localhost:6379
KV_REST_API_URL=http://localhost:8079
KV_REST_API_TOKEN=local_dev_token

# Stripe (for future Pro billing)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# NextAuth (reserved for future auth integration)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-me
```

**Local KV emulation**: Use Upstash Redis locally or point to a Vercel KV sandbox. API routes will fail without valid KV credentials.

## Constraints & Gotchas

- **No server-side decryption**: Never attempt to decrypt content in API routes or server components
- **Slug collisions**: First-come-first-served; no user accounts yet, so anyone with the URL + password can access
- **Rate limiting**: `lib/rate-limit.ts` has basic IP-based throttling; expand as needed
- **Bundle size**: Monaco/Tiptap editors are heavy; next.config.mjs has dynamic imports ready for code splitting
- **CSP violations**: Console warnings about inline styles are expected due to Tailwind; tune CSP for production
