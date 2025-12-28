-- Schema for protected-text-D1 (Cloudflare D1)
-- Reference schema - for migrations, see migrations/ directory

CREATE TABLE IF NOT EXISTS notes (
  slug TEXT PRIMARY KEY,        -- Note URL slug (ID)
  content TEXT NOT NULL,        -- Encrypted ciphertext (Base64)
  iv TEXT NOT NULL,             -- Initialization vector (Base64)
  salt TEXT NOT NULL,           -- Password derivation salt (Base64)
  size INTEGER NOT NULL,        -- Ciphertext size (characters)
  access_count INTEGER NOT NULL DEFAULT 0,  -- Access counter
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS note_versions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  content TEXT NOT NULL,
  iv TEXT NOT NULL,
  salt TEXT NOT NULL,
  size INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (slug) REFERENCES notes(slug) ON DELETE CASCADE
);

-- Index for efficient version queries by slug
CREATE INDEX IF NOT EXISTS idx_note_versions_slug_id ON note_versions(slug, id);

-- Index for conflict detection queries by updated_at
CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON notes(updated_at);
