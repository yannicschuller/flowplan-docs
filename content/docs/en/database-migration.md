# Switching the database: SQLite and PostgreSQL

With the bundled tool you move an instance from SQLite to PostgreSQL – or back. The downtime is the copy itself, usually a few minutes; afterwards every table is compared row by row.

## How it works

The tool `db-migrate.mjs` lives in the Docker image under `/app/scripts/` (in the source code under `scripts/`). It copies every table from the source into an empty target and then compares each table by its row count and a checksum over all values. The source stays unchanged – so the way back is always open, as long as nobody has worked in the target yet.

Not copied but rebuilt on the first start: the search index and the `pgvector` table. The AI embeddings themselves are copied, so semantic search needs no new calls to the AI provider afterwards.

The tool does not move **files**; they stay where they are: in the `uploads/` folder of the data folder or in the S3 bucket. So keep the same data folder (the same volume) and the same `S3_*` values. `secrets.key` and `web-push-keys.json` also stay in the data folder and are still needed.

Roughly, copying takes a second per few tens of thousands of rows; documents and embeddings make up most of it. Add the first start with the search index build (see [Search on PostgreSQL](/en/postgresql#search-on-postgresql)).

## From SQLite to PostgreSQL

The commands assume the Docker Compose installation (service `flowplan`, volume on `/app/data`) and a PostgreSQL the container reaches as `postgres`. Replace `<password>` and the address with your values.

1. **Same version.** Update Flowplan to the version that will run afterwards and start it once. The tool refuses a database from another version.
2. **Prepare the target:** an empty database on PostgreSQL 16 or newer and a role that owns it – see [Requirements](/en/postgresql#requirements), also for `pg_trgm` and `pgvector`.
3. **Back up:** **Administration → Storage & backup → Whole instance → Download**. Keep the file until the new instance runs.
4. **Stop Flowplan** – the tool only reads a consistent state when nothing writes:

   ```bash
   docker compose stop flowplan
   ```

5. **Copy and verify:**

   ```bash
   docker compose run --rm --no-deps --entrypoint node flowplan \
     /app/scripts/db-migrate.mjs \
     --from sqlite:/app/data/flowplan.sqlite \
     --to postgres://flowplan:<password>@postgres:5432/flowplan
   ```

   The output shows progress per table and at the end a table with the row counts and the checksums of source and target. The last line reads `verified: every table has the same rows` (exit code 0). With `DIFFERENCES found` (exit code 1), the tables concerned are marked `DIFFERENT`; nobody uses the target yet – fix the cause, empty the target database and run it again.

6. **Switch over:** in `.env`, set `DATABASE_URL=postgres://flowplan:<password>@postgres:5432/flowplan` (and `FLOWPLAN_PG_SCHEMA` if not `public`). The data folder and the `S3_*` values stay as they are.
7. **Start and check:**

   ```bash
   docker compose up -d
   ```

   Sign in, open a page, search for something (the index fills within seconds to minutes) and check that **Administration → Monitoring → System** says **PostgreSQL**.
8. **Clean up, but not right away:** the old `flowplan.sqlite` stays in the data folder and is ignored as long as `DATABASE_URL` is set. Delete it only once the new instance's first scheduled backup has run.

With S3: Litestream no longer runs with PostgreSQL; scheduled backups become `pg_dump` archives ([Backups with pg_dump](/en/postgresql#backups-with-pg-dump)). You can delete the old Litestream copy under `<prefix>/db/` in the bucket later.

Without Docker Compose, the same works with `docker run` – pass the container's volume and network:

```bash
docker run --rm --network <network> -v flowplan-data:/app/data --entrypoint node \
  ghcr.io/yannicschuller/flowplan:latest /app/scripts/db-migrate.mjs \
  --from sqlite:/app/data/flowplan.sqlite \
  --to postgres://flowplan:<password>@postgres:5432/flowplan
```

## From PostgreSQL to SQLite

The same way in reverse. The target file must not exist yet – if the data folder still holds a `flowplan.sqlite` from before PostgreSQL, move it aside first.

1. Same version on both sides, download the instance backup (as above).
2. Stop Flowplan: `docker compose stop flowplan`.
3. Move an old SQLite file aside:

   ```bash
   docker compose run --rm --no-deps --entrypoint sh flowplan -c \
     'mkdir -p /app/data/sqlite-old && for f in /app/data/flowplan.sqlite*; do [ -e "$f" ] && mv "$f" /app/data/sqlite-old/; done; true'
   ```

4. Copy and verify:

   ```bash
   docker compose run --rm --no-deps --entrypoint node flowplan \
     /app/scripts/db-migrate.mjs \
     --from postgres://flowplan:<password>@postgres:5432/flowplan \
     --to sqlite:/app/data/flowplan.sqlite
   ```

5. Remove `DATABASE_URL` (and `FLOWPLAN_PG_SCHEMA`) from `.env`, then `docker compose up -d` and check as above.
6. With S3: Litestream backs up the new file continuously again from the start. If the bucket still holds a copy from before PostgreSQL under `<prefix>/db/`, delete or move it before starting – otherwise a later restore from the bucket could end up at that old state.

The PostgreSQL database stays unchanged; keep it until the SQLite instance's first scheduled backup has run.

## Tool options

| Option | Meaning |
| --- | --- |
| `--from`, `--to` | Source and target: `sqlite:<file>` on one side, `postgres://…` on the other. |
| `--schema <name>` | Schema in PostgreSQL (default `public`; created if missing). Matches `FLOWPLAN_PG_SCHEMA`. |
| `--verify-only` | Copy nothing, only compare row counts and checksums of both sides. |
| `--batch <number>` | Rows per read (default 1000). |
| `--quiet` | No progress lines. |

The tool refuses: a source from another Flowplan version, a target table that already has rows, a target file that already exists, and values that do not fit the PostgreSQL column (SQLite accepts anything in any column) – naming the row concerned.

## Verifying

As long as nobody has worked in the new instance, you can repeat the comparison at any time:

```bash
docker compose run --rm --no-deps --entrypoint node flowplan \
  /app/scripts/db-migrate.mjs --verify-only \
  --from sqlite:/app/data/flowplan.sqlite \
  --to postgres://flowplan:<password>@postgres:5432/flowplan
```

Each table shows its row count and the checksums of source and target side by side. The checksum does not depend on row order and compares the values as both databases store them.

## Going back if something goes wrong

- **Before anyone works in the new instance:** stop Flowplan, undo the setting (remove or set `DATABASE_URL` again) and start. The source is unchanged.
- **If people have already worked:** move in the opposite direction (section above), so nothing is lost.
- **As a last resort:** restore the downloaded instance backup under **Administration → Storage & backup → Restore from backup** or on the setup screen – it fits both databases.

An aborted copy does not resume: empty the target database (or delete the half-written file) and start over.

## Rebuilding the search index

After a switch, Flowplan rebuilds the search index by itself on the first start. By hand:

```bash
docker compose exec flowplan node /app/scripts/db-search-rebuild.mjs
```

With `DATABASE_URL` in the environment it acts on PostgreSQL, otherwise on the SQLite file in the data folder (`--sqlite <file>` for another one).

## Other ways

- The **instance backup** (ZIP) and the [move tool](/en/move-instance) carry the database in the portable SQLite format and restore on SQLite as well as PostgreSQL. To move to another server and switch the database at once, that is often the easier way.
- For [cluster mode](/en/cluster), the files must be in the S3 bucket first – see there.
