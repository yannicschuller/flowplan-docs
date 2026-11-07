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

- **PostgreSQL 16 or newer**, an empty database (or an empty schema) and a role that owns it. Flowplan needs no superuser rights.
- **A UTF-8 locale** such as `en_US.utf8` or `de_DE.utf8` – the official `postgres` image and most managed services use one. With the `C` locale, search still finds Chinese and Japanese text correctly, but much more slowly.
- **The `pg_trgm` extension** for full-text search. It ships with every regular PostgreSQL and is "trusted": Flowplan installs it itself into a schema of its own, `flowplan_ext`, if the role may create objects in the database (`CREATE` privilege, which the database owner has). Otherwise run `CREATE EXTENSION pg_trgm;` once as an administrator. Without `pg_trgm` search keeps working, but scans every entry each time (the log says so).
- **Optionally `pgvector`** for [semantic AI search](/en/ai). From pgvector 0.8 on, Flowplan installs it itself like `pg_trgm`. **Before 0.8** the extension is not "trusted" – an administrator then runs `CREATE EXTENSION vector;` once in Flowplan's database, and Flowplan uses it from its next start. Without `pgvector`, Flowplan computes semantic search itself, as on SQLite; switch it off with `FLOWPLAN_PGVECTOR=off`.
- **For backups**, `pg_dump` and `pg_restore` of at least the server's major version. The Docker image ships the PostgreSQL 18 tools and so fits servers up to version 18. Without Docker, install a matching `postgresql-client` package or point `FLOWPLAN_PG_BIN` at the folder holding the programs.

```sql
-- as an administrator on the PostgreSQL server
CREATE ROLE flowplan LOGIN PASSWORD '<password>';
CREATE DATABASE flowplan OWNER flowplan;
-- optional, only for pgvector before 0.8 (in the new database):
\c flowplan
CREATE EXTENSION IF NOT EXISTS vector;
```

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
      POSTGRES_USER: flowplan
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: flowplan
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U flowplan -d flowplan"]
      interval: 5s
      retries: 20
    restart: unless-stopped

volumes:
  flowplan-data:
  postgres-data:
```

`POSTGRES_PASSWORD` goes into the `.env` next to `compose.yaml` (`openssl rand -hex 24`).

### Variables

| Variable | Default | Meaning |
| --- | --- | --- |
| `DATABASE_URL` | *empty* (SQLite) | Address of the PostgreSQL database, `postgres://…` or `postgresql://…`. |
| `FLOWPLAN_PG_SCHEMA` | `public` | Schema inside the database, if Flowplan shares the database with something else. Created if missing. |
| `FLOWPLAN_PG_POOL` | `10` | Connections per instance (1–500). |
| `FLOWPLAN_PG_STATEMENT_TIMEOUT` | `120000` | Longest a query may run, in milliseconds; `0` = no limit. |
| `FLOWPLAN_PG_LOCK_TIMEOUT` | `10000` | Longest a query waits for a lock (ms). |
| `FLOWPLAN_PG_IDLE_TX_TIMEOUT` | `60000` | A transaction idle this long is ended (ms). |
| `FLOWPLAN_PG_CONNECT_TIMEOUT` | `30000` | Longest a request waits for a free connection from the pool (ms). |
| `FLOWPLAN_PG_SCHEMA_AUTO` | on | `off`: the instance does not create or update the schema itself – a separate step does (`node /app/scripts/db-schema.mjs`, see [cluster mode](/en/cluster#schema-before-the-start)). |
| `FLOWPLAN_PGVECTOR` | on | `off` ignores `pgvector` even when it is installed. |
| `FLOWPLAN_BACKUP_FORMAT` | `pg_dump` | `sqlite`: scheduled backups in the portable SQLite format instead of `pg_dump` (below). |
| `FLOWPLAN_PG_BIN` | *empty* | Folder with `pg_dump`, `pg_restore` and `psql` if they are not on the `PATH`. |

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
- [Encryption](/en/storage-and-backups#encryption) as before; `decrypt.mjs` also decrypts `.dump.enc`.
- The archive holds only Flowplan's schema, without the search index and the `pgvector` table – Flowplan rebuilds both after a restore. That keeps it smaller, and it restores on a server without `pg_trgm` or `pgvector` as well.
- `pg_dump` runs outside Flowplan and barely loads the instance.

**Falling back to SQLite:** if no suitable `pg_dump` is available (too old or not installed), the scheduled backup writes a portable SQLite file (`flowplan-….sqlite`) instead and notes this in the log. With `FLOWPLAN_BACKUP_FORMAT=sqlite` it always does. Such a file restores on SQLite **and** PostgreSQL.

The **instance backup** (Administration → Storage & backup → Whole instance → Download) always holds the database in the portable SQLite format, so it restores on both databases. Litestream does not run with PostgreSQL – for continuous backups to any point in time, use your database server's own means (WAL archiving, your provider's point-in-time recovery).

### Restoring

- **A `pg_dump` archive** (`.dump`, `.dump.enc`) is restored on the setup screen of a new instance with PostgreSQL: upload it or fetch it from S3 or via SFTP, as in [Restore while setting up](/en/storage-and-backups#restore-while-setting-up). An instance on SQLite refuses such archives – use the instance backup or [switch the database](/en/database-migration).
- Flowplan checks the archive first (not from a newer version), then replaces the whole schema in one transaction and rebuilds the search index. The previous state is kept as `pre-restore-<time>/flowplan.dump` in the data folder – leave room for one more archive. If the restore fails, the previous state comes back.
- An archive from another schema (`FLOWPLAN_PG_SCHEMA`) restores as well.
- **The instance backup** (ZIP) is restored as before under **Administration → Storage & backup → Restore from backup**.

## PgBouncer

Flowplan pools its connections itself; connecting straight to the server is the simplest way. With PgBouncer in front:

- **Version 1.21 or newer** with `max_prepared_statements` above `0`: Flowplan uses named prepared statements.
- **Session pooling in cluster mode:** over a connection of its own, Flowplan receives notifications (`LISTEN`) and elects the leading instance (a lock that lasts as long as the connection). It uses the same `DATABASE_URL` as for the pool – so in a cluster, PgBouncer must run in `session` mode for Flowplan; otherwise several instances could each consider themselves the leader.
- A single container also works with `transaction` mode. With S3, the notifications about new files are then lost, and uploads to the bucket only start with the check every 15 seconds.

## Next

- [Switching the database](/en/database-migration): from SQLite to PostgreSQL and back.
- [Cluster mode](/en/cluster): several instances with Redis and S3.
- [Sizing](/en/sizing): how many people an instance carries.
