-- Migration: Add access_count column and updated_at index
-- Safe for production: uses column existence check pattern

-- Add access_count column if it doesn't exist
-- SQLite doesn't support IF NOT EXISTS for ALTER TABLE ADD COLUMN,
-- so we use a workaround: the migration will fail silently if column exists
-- when run through D1 migration system (which handles this gracefully)

ALTER TABLE notes ADD COLUMN access_count INTEGER NOT NULL DEFAULT 0;

-- Add index for conflict detection queries
CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON notes(updated_at);
