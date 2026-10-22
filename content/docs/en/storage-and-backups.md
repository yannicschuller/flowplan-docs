# Storage, S3 and backups

All data lives in one directory. With S3 storage, files are mirrored and the database is backed up continuously – the container then holds nothing irreplaceable anymore.

## What is where

| Path in `/app/data` | Content |
| --- | --- |
| `flowplan.sqlite` (+ `-wal`, `-shm`) | All content, accounts, sessions, settings |
| `uploads/` | Uploaded files |
| `web-push-keys.json` | Push keys, unless set via the environment |
| `ocr/` | Language data for text recognition, recreated when needed |

## Turn on S3 storage

With `S3_BUCKET` and credentials (see [Configuration](/configuration#s3-and-database-backup)):

- **Files**: every uploaded file goes into the bucket right after saving, and deleted files are removed there. `uploads/` stays the working copy. If a file is missing there – a new host, a lost volume –, Flowplan fetches it from the bucket: right away when requested, all others in the background.
- **Database**: [Litestream](https://litestream.io) transfers changes to the SQLite file to `<prefix>/db` about every second. If the container starts without a database, Litestream first restores it from the bucket.

On the first start with S3, Flowplan uploads all existing files. `/api/health` shows the progress under `objectStorage.pending`, and **Administration → Storage & backup** shows the connection and the split between local and S3 (cards **Backups** and **Usage**).

MinIO, Garage, SeaweedFS, AWS S3 and other S3-compatible services are suitable.

### Garage

Garage creates neither the bucket nor the keys by itself:

```bash
garage status                                  # read the node ID
garage layout assign -z dc1 -c 10G <node ID>
garage layout apply --version 1
garage bucket create flowplan
garage key create flowplan
garage bucket allow --read --write --owner flowplan --key flowplan
garage key info flowplan --show-secret         # key ID and secret
```

`S3_REGION` must match the value `s3_region` in `garage.toml`.

### SeaweedFS

Start the S3 service so that it listens on all interfaces (`-ip.bind=0.0.0.0`), otherwise other containers cannot reach it. The endpoint is the S3 port, `8333` by default.

> [!NOTE]
> Why no Postgres and no Redis? Flowplan works in one process directly on SQLite – faster and simpler for one instance per organisation. Sessions, presence and live sync run through the database and the process itself; Redis would have nothing to do.

## Backups

1. **Instance backup in Flowplan** (recommended): **Administration → Storage & backup → Whole instance → Download** downloads the database and files consistently while running.
2. **S3 with Litestream**: a continuous backup; an earlier point in time can be restored (below).
3. **Scheduled backup**: a consistent copy of the database every day or every hour, with S3 in the bucket under `backups/`, otherwise in the data folder – encrypted when a key is set ([Encryption](#encryption)).
4. A **volume backup** on the host or in Coolify. For a consistent copy, stop the container first.
5. **By hand** while running:

```bash
sqlite3 /app/data/flowplan.sqlite "VACUUM INTO '/backup/flowplan.sqlite'"
```

Back up `uploads/` and `web-push-keys.json` as well.

The content archive under **Settings → Import & export → Export → Workspace as ZIP** backs up a workspace but does not replace an instance backup with accounts and permissions.

## Encryption

On request, Flowplan encrypts everything it sends out of the server with a key only the server knows (AES-256-GCM). Whoever gets hold of the bucket or a backup – the storage provider, someone with leaked credentials, a bucket made public by mistake – sees only unreadable data.

| What | Encrypted |
| --- | --- |
| Files in the bucket (`<prefix>/uploads/`) | yes |
| Scheduled backups (`flowplan-….sqlite.enc`) | yes, in the bucket and in the data folder |
| Markdown exports (`….zip.enc`) | yes, in the bucket and in the data folder |
| Downloaded instance backup (`….zip.enc`) | yes |
| Litestream replica of the database (`<prefix>/db/`) | no – see [Litestream](#litestream-and-encryption) |
| Git export | no – readable Markdown is what it is for |
| Data folder on the server (`flowplan.sqlite`, `uploads/`) | no – use the host's disk encryption for that |

### Turn it on

Create a key, set it as an environment variable and restart:

```bash
openssl rand -base64 32
# or without openssl:
docker run --rm ghcr.io/yannicschuller/flowplan node /app/decrypt.mjs --new-key
```

```env
FLOWPLAN_ENCRYPTION_KEY=<32 bytes, base64>
# or as a Docker secret:
FLOWPLAN_ENCRYPTION_KEY_FILE=/run/secrets/flowplan-key
```

**Administration → Encryption** then shows “Encryption on” with the key ID (the first bytes of a hash, not the key itself). A malformed key shows up there as an error; backups then fail instead of being stored unencrypted.

> [!CAUTION]
> Without the key, encrypted backups and files are lost – for you too. Keep it apart from the backups (password manager, vault), not in the same bucket and not only on the same server.

### Existing data

There is no migration step, and nothing is rewritten at startup. Flowplan recognises encrypted data by its first bytes, so unencrypted and encrypted data sit side by side without problems:

- **From the moment you turn it on**, new files and every new backup and export are encrypted.
- **Files already in the bucket** stay readable and unencrypted for now. Administration counts them; **Encrypt existing objects** uploads them once more in the background, this time encrypted, replacing the old object. The app keeps running normally meanwhile.
- **Older backups and exports** are not rewritten. Over time they drop out of retention (**Backups kept**), or you can delete them by hand.
- **Restore** works with both: an unencrypted instance backup can still be uploaded, and an encrypted one is decrypted first.
- If the bucket has **versioning**, older unencrypted versions of the objects remain. Remove them with a lifecycle rule or by hand.

**Turning it off** works too: move the key to `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS`. Then nothing new is encrypted, but what is already encrypted stays readable.

### Change the key

1. Set the new key as `FLOWPLAN_ENCRYPTION_KEY` and move the old one to `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS` (several separated by commas), then restart.
2. Under **Administration → Encryption**, choose **Encrypt existing objects**. All files in the bucket are re-encrypted with the new key.
3. Keep the old key until the last backup encrypted with it has dropped out of retention.

Every encrypted file names the ID of its key. If that key is missing, Flowplan says exactly that instead of silently returning broken data.

### Litestream and encryption

Litestream (0.5) cannot encrypt the database replica itself. With a key set, Administration therefore warns that an unencrypted copy is kept under `<prefix>/db/`. Two ways out:

1. **Encrypted backups only** (recommended for a bucket you do not trust): set `FLOWPLAN_LITESTREAM=off`, turn on **Hourly instead of daily** under **Administration → Storage & backup → Backups**, and keep more copies (e.g. 72). Then delete the folder `<prefix>/db/` in the bucket. The price: in the worst case you lose the last hour instead of the last seconds, and on a new host you restore the database from the newest backup (below).
2. **Server-side encryption at the provider (SSE-C)**: set `LITESTREAM_SSE_C_KEY` to a key of its own (32 bytes, base64). The provider encrypts the replica and receives the key with every request to do so. That protects against leaked disks or buckets, not against the provider itself. It only works over https and only with providers that support SSE-C (check first). Empty the folder `<prefix>/db/` before turning it on, because a replica made of unencrypted and SSE-C parts cannot be restored.

### Emergency: decrypt without a running instance

`decrypt.mjs` needs only Node.js – no database and no running server. It is in the Docker image at `/app/decrypt.mjs` and in the source at `scripts/decrypt.mjs`:

```bash
# in the folder with the backup
docker run --rm --user "$(id -u)" -v "$PWD:/work" -w /work -e FLOWPLAN_ENCRYPTION_KEY='<key>' \
  ghcr.io/yannicschuller/flowplan node /app/decrypt.mjs flowplan-2026-10-19-03-00.sqlite.enc
# → flowplan-2026-10-19-03-00.sqlite
```

The same works for Markdown exports (`.zip.enc` becomes `.zip`), for the instance backup and for single objects from `uploads/` in the bucket (output `<name>.decrypted`). Add earlier keys through `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS`; `--key-file <path>` reads the key from a file. The output only appears once the checksum is correct.

The format is openly documented: `FPE1` (4 bytes) · key ID (8 bytes) · IV (12 bytes) · data · GCM tag (16 bytes). The first 12 bytes are authenticated as well.

### More protection

Encryption covers what leaves the server. On the server itself, the database and files are unencrypted, because Flowplan has to read them to show them. To cover that as well:

- **Disk encryption** on the host (LUKS, an encrypted volume at your provider). You can add it at any time, independently of Flowplan.
- The format carries a version (`FPE1`) and a key ID. A later switch to another method or key therefore goes the same way as above, without making old backups unreadable.
- Encrypting the running database (SQLCipher) is deliberately not part of this; see the reasoning in [issue #32](https://github.com/yannicschuller/flowplan/issues/32).
- For individual confidential content there are **[encrypted spaces](/encrypted-spaces)**: they are encrypted in the browser already, so the database, the uploads folder and the backups on the server hold only ciphertext – independently of `FLOWPLAN_ENCRYPTION_KEY`.

## Markdown export and Git

A readable copy outside Flowplan – for emergencies when the instance is down, or as an archive in a Git repository. **Administration → Markdown & Git export** chooses pages and databases; with every scheduled backup (and with **Back up now**) each becomes a Markdown ZIP with its sub-pages, comments and earlier versions:

- with S3 in the bucket under `<S3_PREFIX>/exports/`, otherwise in the data folder under `exports/`; as many are kept as backups (**Backups kept**). With `FLOWPLAN_ENCRYPTION_KEY` the ZIPs are encrypted (`.zip.enc`), the push to Git is not;
- the export reads with the permissions of the person who saved the selection – private records and journals with a PIN stay out;
- file names and paths in the ZIP contain ids, so they stay the same between runs (clean Git diff). Records start with YAML frontmatter, comments are in `<file>.comments.md`, earlier versions under `<file>.versions/`.

### Push into a Git repository

> [!IMPORTANT]
> The instance Git export (`EXPORT_GIT_*`) is deprecated. It keeps working but is replaced by the [Git export of a space](#git-export-of-a-space), which space owners set up themselves; the administration shows a notice about it. The scheduled Markdown export to S3 or the data folder stays as it is.

With these variables Flowplan pushes every export into a repository itself (Forgejo, Gitea, GitHub, GitLab) – every page in a folder of its own, one commit per run with changes:

| Variable | Meaning |
| --- | --- |
| `EXPORT_GIT_URL` | `https://` address of the repository, without credentials. |
| `EXPORT_GIT_TOKEN` | Token with write access to that repository. Only in the environment, never in the database or a backup. |
| `EXPORT_GIT_USERNAME` | User name for the token (default `flowplan`; GitLab: `oauth2`). |
| `EXPORT_GIT_BRANCH` | Branch, default `main`. An empty repository gets it on the first run. |
| `EXPORT_GIT_AUTHOR`, `EXPORT_GIT_EMAIL` | Author of the commits. |
| `EXPORT_GIT_IMPORT` | `true`: changes made in the repository since the last run are taken over before exporting. |

With `EXPORT_GIT_IMPORT=true`, changed files are handled like this:

- **Records** (`records/<database>/…md`) are updated by `flowplan.id` in the frontmatter; new files become new records.
- **Document pages** (`index.md`, `pages/…-<id>.md`) get the file's text; the previous state stays as a version.
- Database tables, comments and versions are copies and are not read back.

Markdown does not know every Flowplan block (such as columns). Whiteboards are in the repository as SVG images; an embedded board carries an invisible marker (`<!-- flowplan:whiteboard … -->`) that makes it an embed again when changes are taken over from Git – please leave the image and link below it in place. If you edit pages with other such blocks in Git, the previous state is in the version history. The administration shows the state of the last push (commit, changes taken over, errors).

### Git export of a space

Instead of one repository for the whole instance, the owner of a space sets up a repository for that space themselves: **Manage space → Git export** (via `…` next to the space or **Settings → Spaces**). The administration only switches the feature on:

| Variable | Default | Meaning |
| --- | --- | --- |
| `SPACE_GIT_EXPORT` | *empty* | `true` turns on the Git export of spaces. Without it, space owners don't see it and exports already set up don't run. |
| `SPACE_GIT_ALLOWED_HOSTS` | *empty* | Git servers, comma-separated, e.g. `git.example.org,codeberg.org`. When set, only these are allowed; without it, any public `https://` server. |
| `SPACE_GIT_ALLOW_PRIVATE` | *empty* | `true` also allows internal addresses for the servers listed in `SPACE_GIT_ALLOWED_HOSTS` – for example a Forgejo on the same host that the container reaches via `--add-host git.example.org:host-gateway`. Only works together with the list; every other server stays limited to public addresses. |

In the space, the owner enters:

- the **repository address** (`https://`, without credentials), **branch** (default `main`), **user name** and an **access token with write access** (GitLab: user name `oauth2`);
- the **frequency**: daily or weekly, plus **Run now**;
- optionally **comments and earlier versions** (`<file>.comments.md`, `<file>.versions/`).

What happens:

- The repository gets the [Markdown export of the space](/import-export-versions) – every top-level page in a folder of its own (`<title>-<id>/`), plus `index.md` and `README.txt`. Other files in the repository (such as `LICENSE` or CI files) stay untouched.
- One commit per run, and only when something changed; pages no longer in the space are deleted in the same commit.
- The export reads with the owner's permissions: private records of others and journals with a PIN stay out.
- Export only: Flowplan does not take over changes made in the repository.
- The settings show the last run (commit, files changed, error) and when the next one is due. A failed run is retried after an hour.

Security:

- Flowplan stores the token only encrypted (like the other [stored secrets](/configuration#stored-secrets), bound to the space). After saving, the interface only shows whether one is stored; it is not in exports, and in the instance backup only encrypted. A new repository address needs the token again.
- Every address is resolved and checked: internal addresses (localhost, private networks) cannot be reached, redirects are not followed. The only exception: servers the administration lists in `SPACE_GIT_ALLOWED_HOSTS` when `SPACE_GIT_ALLOW_PRIVATE=true` is set as well – for example a Git server on the same host. Even then it stays HTTPS, with the pinned address and no redirects.
- The export ends, and token and working copy (`git-export/spaces/<space>/` in the data folder) are deleted, when the owner turns it off, leaves the workspace, becomes a guest or deletes their account – or when the space gets a new owner or moves to the trash.

**Administration → Markdown & Git export** shows how many spaces use the Git export and their last errors – without addresses or content.

## Restore

- **From an instance backup**: upload it under **Administration → Storage & backup → Restore from backup** (at the very end). Flowplan checks it and applies it on the next restart; the previous state stays as `pre-restore-…` in the data directory.
- **From a scheduled backup**, with the app stopped: [decrypt](#emergency-decrypt-without-a-running-instance) an encrypted one first, then move the existing `flowplan.sqlite` with `-wal` and `-shm` aside and put the backup in place as `/app/data/flowplan.sqlite`. With S3, the files follow from the bucket.
- **On a new host with S3**: start a new installation with **the same** `S3_*` variables and an empty volume. Litestream restores the database, the files follow in the background.
- **An earlier point in time**, with the app stopped:

```bash
litestream restore -config /etc/litestream.yml \
  -timestamp 2026-09-26T12:00:00Z -o /app/data/flowplan.sqlite
```

Move the existing `flowplan.sqlite` with `-wal` and `-shm` aside first.

## Quotas

`FLOWPLAN_WORKSPACE_QUOTA_MB` or **Administration → Limits & retention** sets a default quota per workspace; under **Administration → Workspaces** it can be overridden per workspace. Uploads, copies, templates and imports beyond the quota are refused.
