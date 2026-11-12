---
keywords: postgresql, postgres, database, database_url
---

# PostgreSQL

Instead of SQLite, Flowplan can use a PostgreSQL database – when you already run a well-kept database server, when more people work at the same time, or when you want several instances in [cluster mode](/en/cluster).

## SQLite or PostgreSQL?

**SQLite stays the default** and is the best choice for most instances: one container, one data folder, nothing else to run. A single query is even faster on SQLite, because it runs inside the same process.

PostgreSQL pays off when

- you already run or rent a database server (with its own monitoring, replication and point-in-time recovery) and want Flowplan on it,
- regularly more than about 20 people work in Flowplan **at the same time** (see [Sizing](/en/sizing)),
- you want to run several Flowplan instances behind a load balancer – [cluster mode](/en/cluster) requires PostgreSQL.

Feature-wise there is no difference: every feature, search and backups work with both databases. You can switch at any time, in both directions, see [Switching the database](/en/database-migration).

Flowplan still needs its data folder (`/app/data`) with PostgreSQL: it holds uploaded files (without S3), `secrets.key`, the push keys and temporary files of backups. Only the database moves to PostgreSQL.

## Requirements

- **PostgreSQL 16 or newer**, an empty database (or an empty schema) and a role that owns it. Flowplan needs no superuser rights – and should not have them, see [Role without superuser rights](#role-without-superuser-rights).
- **A UTF-8 locale** such as `en_US.utf8` or `de_DE.utf8` – the official `postgres` image and most managed services use one. With the `C` locale, search still finds Chinese and Japanese text correctly, but much more slowly.
- **The `pg_trgm` extension** for full-text search. It ships with every regular PostgreSQL and is "trusted": Flowplan installs it itself into a schema of its own, `flowplan_ext`, if the role may create objects in the database (`CREATE` privilege, which the database owner has). Otherwise run `CREATE EXTENSION pg_trgm;` once as an administrator. Without `pg_trgm` search keeps working, but scans every entry each time (the log says so).
- **Optionally `pgvector`** for [semantic AI search](/en/ai). From pgvector 0.8 on, Flowplan installs it itself like `pg_trgm`. **Before 0.8** the extension is not "trusted" – an administrator then runs `CREATE EXTENSION vector;` once in Flowplan's database, and Flowplan uses it from its next start. Without `pgvector`, Flowplan computes semantic search itself, as on SQLite; switch it off with `FLOWPLAN_PGVECTOR=off`.
- **For backups**, `pg_dump` and `pg_restore` of at least the server's major version. The Docker image ships the PostgreSQL 18 tools; they back up and restore on servers from version 16 to 18. Without Docker, install a matching `postgresql-client` package or point `FLOWPLAN_PG_BIN` at the folder holding the programs.

```sql
-- as an administrator (superuser) on the PostgreSQL server
CREATE ROLE flowplan LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD '<password>';
CREATE DATABASE flowplan OWNER flowplan;
-- in the new database, the extensions into a schema of their own:
\c flowplan
CREATE SCHEMA IF NOT EXISTS flowplan_ext AUTHORIZATION flowplan;
CREATE EXTENSION IF NOT EXISTS pg_trgm SCHEMA flowplan_ext;
-- optional, for semantic search (the only way before pgvector 0.8):
CREATE EXTENSION IF NOT EXISTS vector SCHEMA flowplan_ext;
```

### Role without superuser rights

Let Flowplan connect with a role that owns the database but is **not a superuser**. Flowplan creates and alters tables, functions and triggers in its database – owning it is enough for that. A superuser, on the other hand, can read files on the database server and run programs there (`COPY … TO PROGRAM`); a flaw in Flowplan, or an administrator exploiting one, would reach the host.

Many images and charts make the configured user a superuser – the official `postgres` image does so with `POSTGRES_USER`. In that case create a role of its own as above. The administrator best installs the extensions right away, into the schema `flowplan_ext`: Flowplan uses an installed extension wherever it is, and otherwise creates `pg_trgm` (and `pgvector` from 0.8) in `flowplan_ext` itself. `pgvector` before 0.8 can only be installed by an administrator; without it semantic search runs more slowly.

An existing role that is a superuser is demoted by another superuser:

```sql
-- once, while flowplan is still a superuser (as flowplan):
CREATE ROLE admin LOGIN SUPERUSER PASSWORD '<password>';
-- then as admin:
ALTER ROLE flowplan NOSUPERUSER NOCREATEROLE NOCREATEDB;
```

The database and its tables stay owned by `flowplan`, and the extensions installed so far stay usable. Keep the `admin` login for administration; Flowplan does not need it.

## Setting it up

`DATABASE_URL` selects PostgreSQL. If the value starts with `postgres://` or `postgresql://`, Flowplan uses PostgreSQL; without it, it stays on SQLite.

```dotenv
DATABASE_URL=postgres://flowplan:<password>@db.example.internal:5432/flowplan
# with TLS to the database server:
# DATABASE_URL=postgres://flowplan:<password>@db.example.internal:5432/flowplan?sslmode=require
```

Special characters in the password (`@`, `:`, `/`, `#` …) must be percent-encoded in the address, e.g. `%40` for `@`.

On its **first start**, Flowplan creates all tables, indexes and triggers itself. On every update it adds what the new version needs – it never drops anything, and several instances coordinate through a lock. So an update works as usual: pull the new image, restart the container.

### With Docker Compose

An example of a single container with PostgreSQL next to it. For `pgvector`, use the image `pgvector/pgvector:0.8.0-pg16` instead of `postgres:16`.

```yaml
services:
  flowplan:
    image: ghcr.io/yannicschuller/flowplan:latest
    env_file: .env
    environment:
      FLOWPLAN_DATA_DIR: /app/data
      DATABASE_URL: postgres://flowplan:${POSTGRES_PASSWORD}@postgres:5432/flowplan
    ports:
      - "127.0.0.1:3000:3000"
    volumes:
      - flowplan-data:/app/data
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${POSTGRES_ADMIN_PASSWORD}
      FLOWPLAN_DB_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./postgres-init.sh:/docker-entrypoint-initdb.d/10-flowplan.sh:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -h 127.0.0.1 -U flowplan -d flowplan"]
      interval: 5s
      retries: 20
    restart: unless-stopped

volumes:
  flowplan-data:
  postgres-data:
```

`POSTGRES_PASSWORD` (the password of the role `flowplan`) and `POSTGRES_ADMIN_PASSWORD` (that of the image's superuser `postgres`, for administration only) go into the `.env` next to `compose.yaml` (`openssl rand -hex 24` each). The script [`postgres-init.sh`](https://github.com/yannicschuller/flowplan/blob/main/deploy/compose/cluster/postgres-init.sh) from the cluster example creates the role `flowplan` without superuser rights on the database's first start, gives it the database `flowplan` and installs the extensions into `flowplan_ext` – put it next to `compose.yaml`. A volume made with an older version of this example (`POSTGRES_USER: flowplan`) keeps its roles: there `flowplan` is the superuser until you [demote it](#role-without-superuser-rights).

### Variables

| Variable | Default | Meaning |
| --- | --- | --- |
| `DATABASE_URL` | *empty* (SQLite) | Address of the PostgreSQL database, `postgres://…` or `postgresql://…`. |
| `DATABASE_SESSION_URL` | `DATABASE_URL` | A connection of its own for notifications, the lead in a cluster and `pg_dump`/`pg_restore`/`psql` – only needed when `DATABASE_URL` points at PgBouncer in `transaction` mode ([below](#pgbouncer)). |
| `FLOWPLAN_PG_SCHEMA` | `public` | Schema inside the database, if Flowplan shares the database with something else. Created if missing. |
| `FLOWPLAN_PG_POOL` | `10` | Connections per instance (1–500). |
| `FLOWPLAN_PG_STATEMENT_TIMEOUT` | `120000` | Longest a query may run, in milliseconds; `0` = no limit. |
| `FLOWPLAN_PG_LOCK_TIMEOUT` | `10000` | Longest a query waits for a lock (ms). |
| `FLOWPLAN_PG_IDLE_TX_TIMEOUT` | `60000` | A transaction idle this long is ended (ms). |
| `FLOWPLAN_PG_CONNECT_TIMEOUT` | `30000` | Longest a request waits for a free connection from the pool (ms). |
| `FLOWPLAN_PG_PREPARE` | on | `off` sends every query unnamed instead of as a named prepared statement – for PgBouncer in `transaction` mode before 1.21 or without `max_prepared_statements`. |
| `FLOWPLAN_PG_SCHEMA_AUTO` | on | `off`: the instance does not create or update the schema itself – a separate step does (`node /app/scripts/db-schema.mjs`, see [cluster mode](/en/cluster#schema-before-the-start)). |
| `FLOWPLAN_PGVECTOR` | on | `off` ignores `pgvector` even when it is installed. |
| `FLOWPLAN_BACKUP_FORMAT` | `pg_dump` | `sqlite`: scheduled backups in the portable SQLite format instead of `pg_dump` (below). |
| `FLOWPLAN_PG_BIN` | *empty* | Folder with `pg_dump`, `pg_restore` and `psql` if they are not on the `PATH`. |

Every variable is also listed, with comments, in the repository's [`.env.example`](https://github.com/yannicschuller/flowplan/blob/main/.env.example).

Long-running work such as backups, restores and schema changes lifts the time limits for itself.

**Connections:** each instance opens up to `FLOWPLAN_PG_POOL` connections plus up to two of its own (notifications, and in a cluster the election of the leading instance). The server's `max_connections` must therefore be at least `instances × (FLOWPLAN_PG_POOL + 2)` plus a reserve for backups and administration. PostgreSQL's default of 100 is plenty for one instance with the default pool.

## Search on PostgreSQL

Search on PostgreSQL returns the same hits in the same order as on SQLite: parts of words ("plan" in "Projektplanung"), Chinese and Japanese text without spaces, umlauts and accents, title before text, the same snippets. Under the hood it uses trigram indexes from `pg_trgm`.

> [!NOTE]
> **First start after the update or switch:** Flowplan builds the two search indexes while it opens the database. On large instances this can take a few minutes, and the instance does not answer meanwhile. Give health checks enough time (`start_period`, `startupProbe`). After that, the index fills up in the background – search already works and finds more as it goes.

To rebuild the search index completely, e.g. after installing `pg_trgm` or when hits are missing:

```bash
docker compose exec flowplan node /app/scripts/db-search-rebuild.mjs
```

The script reads `DATABASE_URL` and `FLOWPLAN_PG_SCHEMA` from the container's environment; the running instance then indexes everything again (pages, records, comments, messages and files). The same command works on SQLite.

## Backups with pg_dump

On PostgreSQL, the **scheduled backup** and **Back up now** (Administration → Storage & backup) write a `pg_dump` archive in custom format: `flowplan-2026-11-07-03-00.dump`, encrypted as `.dump.enc` with `FLOWPLAN_ENCRYPTION_KEY`. Everything else stays as with SQLite:

- Targets: S3 under `<prefix>/backups/`, [SFTP](/en/storage-and-backups#backup-via-sftp) or the data folder – with the same retention and the same [delayed deletion](/en/storage-and-backups#delayed-deletion) of files.
- [Encryption](/en/storage-encryption#encryption) as before; `decrypt.mjs` also decrypts `.dump.enc`.
- The archive holds only Flowplan's schema, without the search index and the `pgvector` table – Flowplan rebuilds both after a restore. That keeps it smaller, and it restores on a server without `pg_trgm` or `pgvector` as well.
- `pg_dump` runs outside Flowplan and barely loads the instance.

**Falling back to SQLite:** if no suitable `pg_dump` is available (too old or not installed), the scheduled backup writes a portable SQLite file (`flowplan-….sqlite`) instead and notes this in the log. With `FLOWPLAN_BACKUP_FORMAT=sqlite` it always does. Such a file restores on SQLite **and** PostgreSQL.

The **instance backup** (Administration → Storage & backup → Whole instance → Download) always holds the database in the portable SQLite format, so it restores on both databases. Litestream does not run with PostgreSQL – for continuous backups to any point in time, use your database server's own means (WAL archiving, your provider's point-in-time recovery).

### Restoring

- **A `pg_dump` archive on a running instance** (`flowplan-….dump`, `.dump.enc`): upload it under **Administration → Storage & backup → Restore from backup**. Flowplan checks it right away and applies it on the next restart – in cluster mode the leading instance does, see [Known limits](/en/cluster#known-limits). Only the database is replaced; the files stay as they are.
- **On a new instance** with PostgreSQL, the same works on the setup screen: upload it or fetch it from S3 or via SFTP, as in [Restore while setting up](/en/storage-and-backups#restore-while-setting-up).
- An instance on SQLite refuses such archives – use the instance backup or [switch the database](/en/database-migration).
- Flowplan checks the archive first (a Flowplan database, not from a newer version), then replaces the whole schema in one transaction and rebuilds the search index. Only the data of Flowplan's tables comes from the archive; tables, functions and triggers are created by the running version itself. Older archives therefore fit into the current tables.
- If the archive holds objects Flowplan does not create itself – custom functions, views, triggers or rules in Flowplan's schema –, Flowplan refuses it: “The backup contains database objects Flowplan does not create itself (such as functions or triggers), so it is not restored.” Keep custom objects in another schema; Flowplan's `pg_dump` does not back that up. The previous state is kept as `pre-restore-<time>/flowplan.dump` in the data folder – leave room for one more archive. If the restore fails, the previous state comes back.
- An archive from another schema (`FLOWPLAN_PG_SCHEMA`) restores as well.
- **The instance backup** (ZIP) is restored in the same place as before; it fits both databases.

## PgBouncer

Flowplan pools its connections itself; connecting straight to the server is the simplest way. PgBouncer in front should work as follows – it has not been tested against a real PgBouncer yet:

- **Named prepared statements:** Flowplan uses them by default. In `transaction` mode, PgBouncer needs version 1.21 or newer with `max_prepared_statements` above `0` for them. Otherwise set `FLOWPLAN_PG_PREPARE=off`: Flowplan then sends every query unnamed (costs about a third of the throughput).
- **A session of its own for notifications, the lead and backups:** `LISTEN`, the leading instance's lock in a cluster, and `pg_dump`, `pg_restore` and `psql` need a connection to themselves. They use `DATABASE_SESSION_URL` – point it straight at the server or at a pool in `session` mode. Without it they use `DATABASE_URL`.
- **Startup parameter `options`:** Flowplan passes the schema (`search_path`) and time limits as `options` when connecting. If PgBouncer refuses it, `ignore_startup_parameters = options` helps – then the schema must be `public`, and you set the time limits on the role (`ALTER ROLE flowplan SET statement_timeout = '120s'` and so on).

```dotenv
# pool through PgBouncer in transaction mode, own sessions straight to the server
DATABASE_URL=postgres://flowplan:<password>@pgbouncer:6432/flowplan
DATABASE_SESSION_URL=postgres://flowplan:<password>@postgres:5432/flowplan
# only without max_prepared_statements or before PgBouncer 1.21:
# FLOWPLAN_PG_PREPARE=off
```

## Next

- [Switching the database](/en/database-migration): from SQLite to PostgreSQL and back.
- [Cluster mode](/en/cluster): several instances with Redis and S3.
- [Sizing](/en/sizing): how many people an instance carries.
