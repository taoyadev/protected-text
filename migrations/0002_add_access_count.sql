-- Migration: Add access_count column and updated_at index
-- NOTE: This migration is now a no-op because 0001_init.sql was updated
-- to include access_count column and idx_notes_updated_at index.
-- The migration file is kept for D1 migration history compatibility.

-- No operations needed - all schema is now in 0001_init.sql
SELECT 1;
