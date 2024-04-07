CREATE TYPE WantType AS ENUM (
    'class',
    'department',
    'category'
);

CREATE TABLE IF NOT EXISTS users
  (
     id                  TEXT PRIMARY KEY,
     username            TEXT,
     email               TEXT NOT NULL,
     profile_picture_url TEXT
  );

CREATE TABLE IF NOT EXISTS class
  (
     id         SERIAL PRIMARY KEY,
     class_name TEXT NOT NULL,
     department TEXT NOT NULL
  );

CREATE TABLE IF NOT EXISTS want
  (
     id       SERIAL PRIMARY KEY,
     type     WantType NOT NULL,
     class_id INTEGER REFERENCES class(id) NOT NULL,
     user_id  TEXT REFERENCES users(id) NOT NULL
  );

CREATE TABLE IF NOT EXISTS class_drop
  (
     id       SERIAL PRIMARY KEY,
     class_id INTEGER REFERENCES class(id) NOT NULL,
     user_id  TEXT REFERENCES users(id) NOT NULL
  );

CREATE TABLE IF NOT EXISTS listing
  (
     id          SERIAL PRIMARY KEY,
     poster_id   TEXT NOT NULL REFERENCES users(id),
     title       TEXT NOT NULL,
     description TEXT NOT NULL,
     have_id     INTEGER NOT NULL REFERENCES class(id),
     want_id     INTEGER NOT NULL REFERENCES want(id)
  );

CREATE TABLE IF NOT EXISTS chat
  (
     id             SERIAL PRIMARY KEY,
     listing_id     INTEGER NOT NULL REFERENCES listing(id) ON DELETE CASCADE,
     other_party_id TEXT NOT NULL REFERENCES users(id)
  );

CREATE TABLE IF NOT EXISTS message
  (
     id         SERIAL PRIMARY KEY,
     content    TEXT NOT NULL,
     chat_id    INTEGER NOT NULL REFERENCES chat(id) ON DELETE CASCADE,
     sender_id  TEXT NOT NULL REFERENCES users(id),
     READ       BOOLEAN NOT NULL DEFAULT false,
     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ); 

