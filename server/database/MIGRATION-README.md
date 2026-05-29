# WarmWishes SQLite migration

The server now runs fully on SQLite. The remaining MongoDB dependency is the **one-time import script** in `server\database\migrate-from-mongodb.js`, which uses the native `mongodb` driver to copy legacy data into `warmwishes.db`.

## What is migrated

- users and refresh tokens
- projects
- project users
- project tasks
- donations and donation summaries
- datasets
- contacts
- builders
- messages

## Running the import

1. Set `MONGODB_CONNECTION_STRING` or `MONGODB_URI`.
2. Optionally set `MONGODB_DATABASE` if the database name is not in the connection string.
3. From `server`, run `node .\database\migrate-from-mongodb.js`.

The script initializes the SQLite schema, clears previously imported SQLite data, and repopulates it from MongoDB so project and message relationships stay consistent.

## After the import

Once the imported data looks correct in SQLite, the MongoDB database is no longer needed for the application runtime.
