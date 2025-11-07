# Protected Text – Next-gen encrypted notes

A modern rebuild of ProtectedText.com featuring zero-knowledge encryption, Markdown-friendly writing experience, instant autosave and Pro-ready architecture.

## Features
- 🔐 **Zero-knowledge** – client-side AES-256-GCM encryption with PBKDF2 key derivation.
- 📝 **Modern editor** – minimal interface powered by Tailwind, ready for Monaco & Tiptap enhancements.
- ⚡ **Autosave** – debounce-based saving pipeline hitting Vercel KV APIs.
- 📱 **PWA-ready** – next-pwa configured with offline manifest + caching defaults.
- 🧠 **Productized UX** – marketing landing page, waitlist, Pro upsell, and FAQ.

## Tech stack
- Next.js 15 (App Router) + React 18 + TypeScript
- Tailwind CSS + custom UI primitives (Button/Input/Textarea)
- Web Crypto API for encryption/decryption helpers
- Vercel KV (Upstash Redis) storage abstraction
- Zustand-ready hooks folder & Vitest setup for future tests

## Getting started
```bash
npm install
cp .env.example .env.local
npm run dev
```

Optional services:
- Redis (for local KV emulation) – configure via `KV_URL`
- Stripe secrets for `/api/stripe/webhook` once billing is wired up

## Useful scripts
| Script | Description |
| --- | --- |
| `npm run dev` | Start Next dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint via `next lint` |
| `npm run type-check` | TypeScript project check |
| `npm run test` | Vitest unit tests (jsdom env) |
| `npm run analyze` | Bundle analyzer build |

## Project structure
```
app/                # App Router routes (landing, dynamic editor, API)
components/         # UI primitives + editor flows
lib/                # crypto helpers, storage, validation
hooks/              # shared React hooks (debounce)
public/             # PWA manifest & icons
task/               # Original product briefs & research
```

## Environment variables
- `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` – Vercel KV
- `NEXTAUTH_*` – reserved for auth integration
- `STRIPE_*` – Stripe keys for Pro billing

See `task/` docs for the full product brief, requirements, and architecture notes.
