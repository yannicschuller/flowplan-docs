# Storage, S3 and backups

All data lives in one directory. With S3 storage, files are mirrored and the database is backed up continuously – the container then holds nothing irreplaceable anymore.

## What is where

| Path in `/app/data` | Content |
| --- | --- |
| `flowplan.sqlite` (+ `-wal`, `-shm`) | All content, accounts, sessions, settings |
| `uploads/` | Uploaded files |
| `web-push-keys.json` | Push keys, unless set via the environment |
| `secrets.key` | Key for stored secrets, only without `FLOWPLAN_ENCRYPTION_KEY` and `FLOWPLAN_SECRETS_KEY` ([Configuration](/configuration#stored-secrets)) |
| `pre-restore-…`, `pre-move-…` | Previous state after a restore or a [move](/move-instance); delete after a few days |
| `ocr/` | Language data for text recognition, recreated when needed |

## Turn on S3 storage

With `S3_BUCKET` and credentials (see [Configuration](/configuration#s3-and-database-backup)):

- **Files**: every uploaded file goes into the bucket right after saving, and deleted files move to `<prefix>/.deleted/uploads/` there; they are removed only once no kept scheduled backup in the bucket needs them, after one day at the earliest ([delayed deletion](#delayed-deletion)). `uploads/` stays the working copy. If a file is missing there – a new host, a lost volume –, Flowplan fetches it from the bucket: right away when requested, all others in the background.
- **Database**: [Litestream](https://litestream.io) transfers changes to the SQLite file to `<prefix>/db` about every second. If the container starts without a database, Litestream first restores it from the bucket.

On the first start with S3, Flowplan uploads all existing files. **Administration → Storage & backup** shows the progress, the connection and the split between local and S3 (cards **Backups** and **Usage**); with `FLOWPLAN_METRICS_TOKEN`, or signed in as an administrator, `/api/health` shows it under `objectStorage.pending`.

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
> Why no Postgres and no Redis by default? Flowplan works in one process directly on SQLite – faster and simpler for one instance per organisation. Sessions, presence and live sync run through the database and the process itself; Redis would have nothing to do. For larger teams there is [PostgreSQL](/postgresql) and [cluster mode](/cluster) with Redis.

## Backups

1. **Instance backup in Flowplan** (recommended): **Administration → Storage & backup → Whole instance → Download** downloads the database and files consistently while running.
2. **S3 with Litestream**: a continuous backup; an earlier point in time can be restored (below).
3. **Scheduled backup**: a consistent copy of the database every day or every hour, with S3 in the bucket under `backups/`, otherwise in the data folder – encrypted when a key is set ([Encryption](#encryption)). Also to a server of your own via [SFTP](#backup-via-sftp), with all files if you like, or through an [SMB or NFS share](#smb-or-nfs-share). No scheduled backup is made before the first account exists (demo accounts and the development account do not count) – so a new instance does not put an empty copy next to the backups of an old one.
4. A **volume backup** on the host or in Coolify. For a consistent copy, stop the container first.
5. **By hand** while running:

```bash
sqlite3 /app/data/flowplan.sqlite "VACUUM INTO '/backup/flowplan.sqlite'"
```

Back up `uploads/` and `web-push-keys.json` as well.

With **PostgreSQL**, scheduled backups and **Back up now** become `pg_dump` archives (`flowplan-….dump`) and Litestream is not used; targets, encryption and retention stay the same. See [Backups with pg_dump](/postgresql#backups-with-pg-dump).

The content archive under **Settings → Import & export → Export → Workspace as ZIP** backs up a workspace but does not replace an instance backup with accounts and permissions.

## Backup via SFTP

The scheduled backup can also go to a server of your own – a NAS, a backup server or rented storage with SSH access. Set it up under **Administration → Storage & backup → SFTP target**:

- **Server**, **port** (22) and **user**, sign-in with a **password** or a **private key** (OpenSSH or PEM, optionally with a passphrase). Flowplan stores password, key and passphrase only encrypted ([stored secrets](/en/configuration#stored-secrets)); afterwards the interface only shows that one is stored.
- **Folder on the server**: relative to the login folder or absolute (`/srv/backups/flowplan`); `..` is not allowed. If it is missing, Flowplan creates it.
- **Keep**: this many backups stay in the folder, older ones are removed.
- **Include files**: mirrors the uploaded files to `uploads/` in the folder. New files are added with every backup; files deleted for good in Flowplan move to `.deleted/uploads/` ([delayed deletion](#delayed-deletion)). Files the database still lists are never moved away there. If the `uploads/` folder is missing or empty although the database lists files (a volume that is not mounted, say), the backup skips the mirror with an error; the database copy is still transferred.
- With `FLOWPLAN_ENCRYPTION_KEY`, everything on the server is encrypted – the database as in S3 and the data folder (`flowplan-….sqlite.enc`), every file on its own ([Encryption](#encryption)).

**Host key:** on the first **Test connection**, Flowplan shows the server's fingerprint (`SHA256:…`) before it sends any credentials. Compare it on the server with `ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub` and confirm it with **Trust this key**. If the server later presents another key (a reinstall – or someone intercepting the connection), every transfer stops and the administration shows the old and the new fingerprint; it only continues after **Accept the new key**. Another server or port always needs a new confirmation.

The SFTP backup runs with every scheduled backup (daily or hourly; **Scheduled database backup** must be on); **Back up now** in the SFTP target transfers right away. The last transfer and the last error are shown below it and in the status line at the top.

A restricted account on the server is enough, e.g. with OpenSSH:

```text
Match User flowplan
  ChrootDirectory /srv/sftp/flowplan
  ForceCommand internal-sftp
  AllowTcpForwarding no
```

### Delayed deletion

A kept backup should always be fully restorable – including the files deleted since it was made. That is why Flowplan does not remove deleted files on the SFTP server (with **Include files**) and in the S3 bucket right away:

- They move to `.deleted/uploads/` (SFTP: in the folder, S3: under `<prefix>/`). The time of the move is appended to the name (`<file>.<milliseconds since 1970>`), so it survives copying the folder or a restore on another instance.
- They are removed for good by a later backup once they were moved before the oldest backup still kept – then no backup needs them any more. In the bucket also not before one day has passed, as far as Litestream's history reaches back. So a higher **Keep** also means deleted files stay longer.
- If a deleted file comes back (after a restore, for example), the SFTP backup moves it back from `.deleted/uploads/` instead of transferring it again.
- When [restoring](#restore-while-setting-up), Flowplan looks for a file missing from `uploads/` in `.deleted/uploads/`.

Without scheduled backups (**Scheduled database backup** off), Flowplan deletes in the bucket right away – there is no backup that could need the file.

### SMB or NFS share

Flowplan does not speak SMB or NFS itself – the container would need mount privileges for that. Instead, Docker mounts the share as a volume, and the scheduled backup writes to the data folder's `backups/` folder (the local target, i.e. without `S3_BUCKET`):

```yaml
services:
  flowplan:
    volumes:
      - flowplan-data:/app/data
      # Put the share over the backups folder.
      - nas-backups:/app/data/backups

volumes:
  flowplan-data:
  # SMB/CIFS (the Docker host needs cifs-utils)
  nas-backups:
    driver: local
    driver_opts:
      type: cifs
      device: "//nas.example.lan/flowplan"
      o: "username=flowplan,password=${NAS_PASSWORD},uid=1000,gid=1000,file_mode=0600,dir_mode=0700,vers=3.0"
```

For NFS instead:

```yaml
  nas-backups:
    driver: local
    driver_opts:
      type: nfs
      o: "addr=nas.example.lan,nfsvers=4,rw"
      device: ":/export/flowplan"
```

`uid=1000` is the user `node` Flowplan runs as; with NFS the export must be writable for this UID. The password comes from an `.env` file next to `compose.yaml`. In panels such as 1Panel or Portainer this is a "volume with driver local and options" or a "CIFS/NFS volume".

> [!WARNING]
> Only put the `backups/` folder on the share, never the whole data folder: SQLite needs reliable file locks, which SMB and NFS do not guarantee. The share only receives the database – for the files, download the [instance backup](#backups) or use the SFTP target with **Include files**.

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
- **Journal days** (`<journal folder>/2026/10/2026-10-27.md`) are found by their journal (the folder) and the date; `flowplan.id` in the frontmatter only counts when it names a day of the same journal. Repositories from older versions, where days were still `pages/<title>-<id>.md`, keep working: changes to those files are still taken over before the export, then the export writes the days to the new paths and removes the old files. No day is created twice; a renamed journal keeps its days because the folder is matched by its id.
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
- Attachments above 10 MB go along, as in the Markdown export.
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
- **On a new host with S3**: start a new installation with **the same** `S3_*` variables and an empty volume. Litestream restores the database, the files follow in the background. Stop the old instance first; `secrets.key` and `web-push-keys.json` are not in the bucket (see [Moving an instance, way C](/move-instance#way-c-s3-and-litestream)).
- **Moving to another server**: see [Moving an instance](/move-instance) – the built-in move tool fetches database, files and keys straight from the old instance, with a few minutes of downtime.
- **From a scheduled backup of an instance with PostgreSQL** (`flowplan-….dump`, `.dump.enc`): also upload it under **Restore from backup**, or on the setup screen of a new instance with PostgreSQL. Only the database is replaced, the files stay. Only the data of Flowplan's tables is loaded; an archive with custom functions, views or triggers in Flowplan's schema is refused – see [PostgreSQL, restoring](/postgresql#restoring).
- **An earlier point in time**, with the app stopped:

```bash
litestream restore -config /etc/litestream.yml \
  -timestamp 2026-09-26T12:00:00Z -o /app/data/flowplan.sqlite
```

Move the existing `flowplan.sqlite` with `-wal` and `-shm` aside first.

### Restore while setting up

A new, still empty instance takes over a backup right on the setup screen: under **Create account**, click **Restore from a backup** ([Installation, first start](/en/installation#first-start)). You can use

- **File**: a scheduled backup (`flowplan-….sqlite`, `.sqlite.enc`) or the backup of the whole instance (`flowplan-instanz-….zip`, `.zip.enc`), up to 50 GB. The upload is written straight to disk and shows its progress. If attachments are then missing – neither in the backup nor in the instance's file storage –, the page says how many; if the old instance kept its files in S3 or on an SFTP server, restore from there.
- **S3**: the newest scheduled backup from `<prefix>/backups/` of a bucket, with the files from `<prefix>/uploads/` – any missing there come from `<prefix>/.deleted/uploads/`.
- **SFTP**: the newest backup from the folder, with the files from `uploads/` (if **Include files** was on) – any missing there come from `.deleted/uploads/`. Flowplan shows the host key first; it only signs in once you confirm **The fingerprint matches**.

If the backup is encrypted, the page asks for the old instance's key (`FLOWPLAN_ENCRYPTION_KEY`) – or it is already set on the new one. Flowplan checks the database (intact, a Flowplan database, not from a newer version – older ones are brought up to date when they open, as with an update), puts the empty initial state aside as `pre-restore-…` and applies the backup right away. Afterwards you sign in with an account from the backup. If Litestream runs (S3 without `FLOWPLAN_LITESTREAM=off`), the backup is applied on the next restart of the container – the page says so.

This is only possible while the instance has no account, and with `FLOWPLAN_SETUP_TOKEN` set only via the setup link. As soon as an account exists, the server refuses every request for it; then **Administration → Storage & backup → Restore from backup** remains.

> [!NOTE]
> Stored secrets (authenticator apps, AI and messenger keys, the SFTP password) can only be read with the same `FLOWPLAN_ENCRYPTION_KEY` or `FLOWPLAN_SECRETS_KEY` as on the old instance; without either, the key is in `secrets.key` in the data folder, which is in no backup. If you entered a key while restoring, set it as `FLOWPLAN_ENCRYPTION_KEY` afterwards.

## Quotas

`FLOWPLAN_WORKSPACE_QUOTA_MB` or **Administration → Limits & retention** sets a default quota per workspace; under **Administration → Workspaces** it can be overridden per workspace. Uploads, copies, templates and imports beyond the quota are refused.
