---
keywords: s3_bucket, database_url, flowplan_encryption_key, imprint, privacy, variables
---

# Configuration: storage, database and security

The environment variables for S3 and database backups, PostgreSQL and cluster, encryption, stored secrets, moving an instance and legal pages.

## S3 and database backup

| Variable | Default | Meaning |
| --- | --- | --- |
| `S3_BUCKET` | *empty* | Turns S3 on. Without this variable everything stays local. |
| `S3_ENDPOINT` | AWS | API address of the storage, e.g. `http://minio:9000`. |
| `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | – | Access keys with read and write access to the bucket. |
| `S3_REGION` | `us-east-1` | Region. Garage requires its own value (often `garage`). |
| `S3_PREFIX` | `flowplan` | Folder in the bucket; files under `<prefix>/uploads/`, the database under `<prefix>/db/`. |
| `FLOWPLAN_LITESTREAM` | on | `off`: only mirror files, do not back up the database. |
| `LITESTREAM_SSE_C_KEY` | *empty* | Optional: the storage provider encrypts the Litestream replica (SSE-C, 32 bytes base64, only over https and with providers that support SSE-C). |

Details: [Storage, S3 and backups](/storage-and-backups).

## Database and cluster

Without these variables, Flowplan uses SQLite in one container. They are also listed, with comments, in the [`.env.example`](https://github.com/yannicschuller/flowplan/blob/main/.env.example). Every value with its default and explanation is under [PostgreSQL](/postgresql#variables) and [Cluster mode](/cluster#more-variables).

| Variable | Default | Meaning |
| --- | --- | --- |
| `DATABASE_URL` | *empty* | `postgres://…` switches to PostgreSQL. Its role should own the database but not be a superuser ([PostgreSQL](/en/postgresql#role-without-superuser-rights)). |
| `FLOWPLAN_PG_SCHEMA`, `FLOWPLAN_PG_POOL`, `FLOWPLAN_PG_*_TIMEOUT` | `public`, `10`, … | Schema, connections per instance and time limits. |
| `FLOWPLAN_PG_PREPARE` | on | `off`: unnamed queries instead of named prepared statements – for PgBouncer in `transaction` mode without `max_prepared_statements`. |
| `DATABASE_SESSION_URL` | `DATABASE_URL` | A direct connection (or a `session`-mode pool) for notifications, the lead in a cluster and `pg_dump`/`pg_restore`, when `DATABASE_URL` points at PgBouncer in `transaction` mode. |
| `FLOWPLAN_BACKUP_FORMAT` | `pg_dump` | `sqlite`: scheduled backups on PostgreSQL in the portable SQLite format. |
| `FLOWPLAN_CLUSTER` | *empty* | `1`: several instances; requires `DATABASE_URL`, `REDIS_URL`, `S3_BUCKET`, `FLOWPLAN_ENCRYPTION_KEY` (or `FLOWPLAN_SECRETS_KEY`) and `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`. |
| `REDIS_URL` | *empty* | Redis for cluster mode, `redis://…` or `rediss://…`. |
| `FLOWPLAN_READY_REQUIRE` | all | Which checks decide `/api/health/ready`. |

## Encryption

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_ENCRYPTION_KEY` | *empty* | 32 bytes, base64 (`openssl rand -base64 32`). Encrypts files in the bucket, scheduled backups, Markdown exports and the instance backup. Without a key nothing changes. |
| `FLOWPLAN_ENCRYPTION_KEY_FILE` | *empty* | Instead of the variable: path to a file holding the key (Docker secret). |
| `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS` | *empty* | Earlier keys, comma-separated – only for reading after a key change. |

Details: [Encryption](/storage-encryption#encryption).

## Stored secrets

Flowplan stores AI provider keys, the keys of authenticator apps ([two-factor sign-in](/sign-in#two-factor-sign-in)), the access tokens of the [Git export of spaces](/markdown-git-export#git-export-of-a-space) and the tokens of [chat apps](/notifications#chat-apps) only encrypted (AES-256-GCM, bound to their place). The key for this comes, in this order, from:

| Source | Meaning |
| --- | --- |
| `FLOWPLAN_ENCRYPTION_KEY` | If set, it also encrypts the stored secrets. |
| `FLOWPLAN_SECRETS_KEY` / `FLOWPLAN_SECRETS_KEY_FILE` | A key just for this: 32 bytes, base64 or hex (`openssl rand -base64 32`), or the path to a file (Docker secret). |
| `secrets.key` in the data folder | Without the two variables, Flowplan creates this file itself when first needed (readable only by its owner). |

> [!IMPORTANT]
> The instance backup deliberately leaves out `secrets.key` – it doesn't belong next to the data it protects. Back up the file separately or set the key as a variable. If it is missing after a restore, admins and users enter their AI keys and chat-app tokens again, and for two-factor sign-in recovery codes or a reset by an administrator help.
> The [move tool](/move-instance), by contrast, takes `secrets.key` along, as it moves the whole instance.

## Instance move

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_MOVE_ALLOW_PRIVATE` | *empty* | On the **new** instance: `true` allows taking over an instance at an internal address (LAN, VPN, `localhost`) and over `http://` – a home server, say. Without it only public HTTPS addresses. Remove it after the move. |

Details: [Moving an instance](/move-instance).

## Legal and interface

| Variable | Default | Meaning |
| --- | --- | --- |
| `IMPRINT_URL` | *empty* | Link to the legal notice, e.g. `https://example.com/imprint`. Shown on the sign-in page, under shared pages and forms and in the account menu (on a phone under **More** in the sidebar) – only when set. |
| `PRIVACY_URL` | *empty* | Link to the privacy policy, in the same places and also only when set. |
| `FLOWPLAN_SOURCE_URL` | Flowplan’s GitHub repository | Address of the source of the code running on this instance (http or https). The AGPL-3.0 requires that whoever runs a **modified** version for others offers them its source (§ 13). When set, **Settings → About Flowplan** and the sign-in page (footer “Source code”) link to this address instead of `github.com/yannicschuller/flowplan`; the commit is then no longer linked to GitHub. |
| `DRAWIO_URL` | `https://embed.diagrams.net` | Address of the draw.io editor for the `/drawio` block, e.g. your own `jgraph/drawio` container. https only (http only for `localhost`); an invalid value turns draw.io off. Viewing never loads draw.io. |
| `FLOWPLAN_HIDE_SPONSOR` | `false` | `true` hides only the **Support Flowplan ♥** part (link to GitHub Sponsors) under **Settings → About Flowplan**. Licence and source code always stay visible. In the iPhone, iPad and Android apps the link never shows regardless; in browsers and the desktop app it does. |
