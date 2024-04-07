-- Add up migration script here
ALTER TABLE listing ADD created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;