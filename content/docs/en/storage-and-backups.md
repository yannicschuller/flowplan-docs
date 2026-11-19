---
keywords: storage, s3, backup, sftp, restore, minio, garage
---

# Storage, S3 and backups

All data lives in one directory. With S3 storage, files are mirrored and the database is backed up continuously – the container then holds nothing irreplaceable anymore.

**More on this topic:** [Restore](/restore) · [Encrypting files and backups](/storage-encryption) · [Markdown export and Git](/markdown-git-export)

## What is where

| Path in `/app/data` | Content |
| --- | --- |
| `flowplan.sqlite` (+ `-wal`, `-shm`) | All content, accounts, sessions, settings |
| `uploads/` | Uploaded files |
| `web-push-keys.json` | Push keys, unless set via the environment |
| `secrets.key` | Key for stored secrets, only without `FLOWPLAN_ENCRYPTION_KEY` and `FLOWPLAN_SECRETS_KEY` ([Configuration](/configuration-storage#stored-secrets)) |
| `pre-restore-…`, `pre-move-…` | Previous state after a restore or a [move](/move-instance); delete after a few days |
| `ocr/` | Language data for text recognition, recreated when needed |

### How Flowplan uses the SQLite file {since=0.10.2}

The database runs in WAL mode with `synchronous=NORMAL` – the setting SQLite and Litestream recommend for WAL: saving no longer waits for the disk, the file is synchronised when the log is written back (checkpoint). If Flowplan crashes or the container restarts, nothing is lost. If the power fails or the whole machine crashes, the last changes before the failure can be missing; the file itself always stays consistent. With Litestream, only the changes of the last second are not in the bucket yet anyway.

Flowplan also uses up to 64 MiB of memory as the database's cache, reads it through a memory map (up to 256 MiB; this takes address space, not additional memory) and keeps temporary results in memory instead of files. For query planning, `PRAGMA optimize` gathers statistics at startup and every six hours. There is nothing to configure.

## Turn on S3 storage

With `S3_BUCKET` and credentials (see [Configuration](/configuration-storage#s3-and-database-backup)):

- **Files**: every uploaded file goes into the bucket right after saving, and deleted files move to `<prefix>/.deleted/uploads/` there; they are removed only once no kept scheduled backup in the bucket needs them, after one day at the earliest ([delayed deletion](#delayed-deletion)). `uploads/` stays the working copy – unless you [keep only part of the files locally](#keep-only-part-of-the-files-locally). If a file is missing there – a new host, a lost volume –, Flowplan fetches it from the bucket: right away when requested, all others in the background.
- **Database**: [Litestream](https://litestream.io) transfers changes to the SQLite file to `<prefix>/db` about every second. If the container starts without a database, Litestream first restores it from the bucket.

On the first start with S3, Flowplan uploads all existing files. **Administration → Storage & backup** shows the progress, the connection and the split between local and S3 (cards **Backups** and **Usage**); with `FLOWPLAN_METRICS_TOKEN`, or signed in as an administrator, `/api/health` shows it under `objectStorage.pending`.

MinIO, Garage, SeaweedFS, AWS S3 and other S3-compatible services are suitable.

### Keep only part of the files locally {since=0.10.2}

On a small server the bucket can hold the files on its own: with `S3_LOCAL_CACHE=2GB` (or `500MB`, `1.5GB`; 1 GB = 1024 MB), `uploads/` becomes a cache of that size.

- When it grows beyond the limit, Flowplan removes the **least recently used** files locally – at startup, after uploads and every five minutes, until the cache is below 80 % of the limit. Only files that are **confirmed in the bucket** go: uploaded, nothing left to do for them, and the object there has the right size. Files that are not yet (or no longer) in the bucket, files used or written in the last ten minutes and files being read stay.
- If a removed file is needed – a download, a preview, the offline copy, an export, text recognition –, Flowplan fetches it from the bucket. Files removed on purpose are not fetched back in the background.
- Backups keep working: the instance backup, the [SFTP mirror](#backup-via-sftp) and the [instance move](/move-instance) read the files that are only in the bucket from there, without filling the cache again.
- The limit is a target, not a hard cap: many uploads within a few minutes can exceed it for a short time. Leave room on the disk for that.
- **Administration → Storage & backup → Usage** shows the cache's size and limit and how many files are only in the bucket; `/api/health` lists the same under `objectStorage.localCache`.

Empty (the default), everything stays local as before. Without `S3_BUCKET` the variable is ignored (the log says so). The database is never part of it. In [cluster mode](/cluster) the same cache is used; `S3_LOCAL_CACHE` there takes the place of `FLOWPLAN_CACHE_MAX_MB`. Before you change `S3_BUCKET`, `S3_ENDPOINT` or `S3_PREFIX` with a cache, copy the objects to the new place (e.g. with `rclone copy`): files that are only in the old bucket cannot be uploaded from the server.

**Don't put the database on a bucket mount.** A bucket mounted through FUSE (s3fs, rclone mount, goofys …) has no real file locking – SQLite needs it, and the database can become corrupted. A FUSE mount is at most suitable for files; `S3_LOCAL_CACHE` is the supported way to keep them in the bucket. The database directory stays on a local disk (or use [PostgreSQL](/postgresql)); Litestream backs it up into the bucket.

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
3. **Scheduled backup**: a consistent copy of the database every day or every hour, with S3 in the bucket under `backups/`, otherwise in the data folder – encrypted when a key is set ([Encryption](/storage-encryption#encryption)). Also to a server of your own via [SFTP](#backup-via-sftp), with all files if you like, or through an [SMB or NFS share](#smb-or-nfs-share). No scheduled backup is made before the first account exists (demo accounts and the development account do not count) – so a new instance does not put an empty copy next to the backups of an old one.
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

- **Server**, **port** (22) and **user**, sign-in with a **password** or a **private key** (OpenSSH or PEM, optionally with a passphrase). Flowplan stores password, key and passphrase only encrypted ([stored secrets](/en/configuration-storage#stored-secrets)); afterwards the interface only shows that one is stored.
- **Folder on the server**: relative to the login folder or absolute (`/srv/backups/flowplan`); `..` is not allowed. If it is missing, Flowplan creates it.
- **Keep**: this many backups stay in the folder, older ones are removed.
- **Include files**: mirrors the uploaded files to `uploads/` in the folder. New files are added with every backup; files deleted for good in Flowplan move to `.deleted/uploads/` ([delayed deletion](#delayed-deletion)). Files the database still lists are never moved away there. If the `uploads/` folder is missing or empty although the database lists files (a volume that is not mounted, say), the backup skips the mirror with an error; the database copy is still transferred. Files that are only in the bucket because of [`S3_LOCAL_CACHE`](#keep-only-part-of-the-files-locally) count as present: they are read from the bucket.
- With `FLOWPLAN_ENCRYPTION_KEY`, everything on the server is encrypted – the database as in S3 and the data folder (`flowplan-….sqlite.enc`), every file on its own ([Encryption](/storage-encryption#encryption)).

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
- When [restoring](/restore#restore-while-setting-up), Flowplan looks for a file missing from `uploads/` in `.deleted/uploads/`.

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

## Quotas

`FLOWPLAN_WORKSPACE_QUOTA_MB` or **Administration → Limits & retention** sets a default quota per workspace; under **Administration → Workspaces** it can be overridden per workspace. Uploads, copies, templates and imports beyond the quota are refused.
