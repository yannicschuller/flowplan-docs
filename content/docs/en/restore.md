---
keywords: restore, backup, litestream, point in time, recovery, s3, sftp, setup
---

# Restore

Bringing an instance back from a backup, from the S3 bucket or to an earlier point in time – and repairing Litestream when its replica is stuck.

## Ways to restore

- **From an instance backup**: upload it under **Administration → Storage & backup → Restore from backup** (at the very end). Flowplan checks it and applies it on the next restart; the previous state stays as `pre-restore-…` in the data directory.
- **From a scheduled backup**, with the app stopped: [decrypt](/storage-encryption#emergency-decrypt-without-a-running-instance) an encrypted one first, then move the existing `flowplan.sqlite` with `-wal` and `-shm` aside and put the backup in place as `/app/data/flowplan.sqlite`. With S3, the files follow from the bucket.
- **On a new host with S3**: start a new installation with **the same** `S3_*` variables and an empty volume. Litestream restores the database, the files follow in the background. Stop the old instance first; `secrets.key` and `web-push-keys.json` are not in the bucket (see [Moving an instance, way C](/move-instance#way-c-s3-and-litestream)).
- **Moving to another server**: see [Moving an instance](/move-instance) – the built-in move tool fetches database, files and keys straight from the old instance, with a few minutes of downtime.
- **From a scheduled backup of an instance with PostgreSQL** (`flowplan-….dump`, `.dump.enc`): also upload it under **Restore from backup**, or on the setup screen of a new instance with PostgreSQL. Only the database is replaced, the files stay. Only the data of Flowplan's tables is loaded; an archive with custom functions, views or triggers in Flowplan's schema is refused – see [PostgreSQL, restoring](/postgresql#restoring).
- **An earlier point in time**, with the app stopped:

```bash
litestream restore -config /etc/litestream.yml \
  -timestamp 2026-09-26T12:00:00Z -o /app/data/flowplan.sqlite
```

Move the existing `flowplan.sqlite` with `-wal` and `-shm` aside first.

## Repair the Litestream state {since=0.10.0}

If two containers replicated on the same volume at the same time (see [Roll out SQLite without overlap](/coolify-and-proxy#roll-out-sqlite-without-overlap)), the log shows `compaction failed … level=1 … close reader 0: file checksum mismatch` every 30 seconds. The database is fine – one of Litestream's change files (LTX) is broken. Litestream does not repair it: compaction stays stuck on that file, old change files pile up, and a restore from the bucket through that file fails.

**Flowplan detects and repairs this by itself.** {since=0.10.0} Every 15 minutes, the container that replicates lists `<prefix>/db/0000/` in the bucket once. Change files older than an hour there, while Litestream has run in this container for more than 30 minutes, mean the replica is stuck. {since=0.10.2} Litestream's memory shows it earlier: each failed compaction buffers all change files since the broken one, until the system ends Litestream (and the container) for lack of memory. Flowplan reads it every minute: above max(512 MB, 25 % of the container's or host's memory) and rising steadily for 10 minutes counts as stuck, too. Then **Administration → Monitoring** shows a warning, administrators get one message per incident ([alerts by webhook](/monitoring#alerts-by-webhook), event `ops.litestream_stuck`, and their chat apps), and the activity log gets an entry. Flowplan makes a scheduled backup if they are on and schedules the repair for the **next restart**; if the backup fails, nothing is scheduled and it tries again after six hours.

On that start, Flowplan deletes only `<prefix>/db/` in the bucket, resets the local state, and Litestream begins afresh with a full snapshot. Uploads, backups and the database in the volume stay; without a database in the volume the replica is kept. If deleting fails, Flowplan starts normally, logs it and tries again on the next start.

Flowplan does not restart by itself: the repair waits for the next update or restart. **Restart now** does it right away – the container comes back through its restart policy (`restart: unless-stopped`, the default in Coolify). **Cancel the repair** takes it back. With `FLOWPLAN_LITESTREAM_AUTOHEAL=off` you only get the warning and the message; **Rebuild the replica now** in the warning schedules the repair by hand.

**By hand, step 1 – reset the local state.** This removes only the local change files in `.flowplan.sqlite-litestream/ltx`, never the database (`litestream reset`):

::: steps

1. In the running container (in Coolify under **Terminal**): `touch /app/data/litestream-reset`.
2. **Stop** the container and **start** it again – not as a rolling update.
3. On start, the log shows `Litestream: resetting the local replication state`, then `detected database behind replica` and `fetched latest L0 file from replica`: Litestream takes over the last position from the bucket and carries on from there. Flowplan deletes the `litestream-reset` file by itself afterwards.

:::

Without a running container, do the same by hand: stop the container, delete only the folder `.flowplan.sqlite-litestream` in the volume (never `flowplan.sqlite`, `-wal` or `-shm`), start the container.

**Step 2 – only if the message keeps coming afterwards:** then the broken file is in the bucket too, and Litestream reads it from there when compacting. Start replication afresh:

::: steps

1. To be safe, create and download a backup under **Administration → Storage & backup**.
2. In the running instance, `echo remote > /app/data/litestream-reset` (the same as **Rebuild the replica now**), then **stop** the container and **start** it again. {since=0.10.0}
3. On start, Flowplan deletes only `<prefix>/db/` in the bucket, resets the local state and starts Litestream. Litestream finds no state in the bucket, starts from scratch and uploads a full snapshot of the database right away (`<prefix>/db/0009/`).

:::

Without `remote` (an empty `litestream-reset` file), Flowplan only resets the local state as in step 1. You can also delete the folder `<prefix>/db/` in the bucket yourself while the container is stopped – **not** `<prefix>/uploads/` or `<prefix>/backups/`, those are the files and backups.

Until that snapshot is in the bucket, there is no earlier point in time to restore from there; the database in the volume and your backups stay untouched.

## Restore while setting up

A new, still empty instance takes over a backup right on the setup screen: under **Create account**, click **Restore from a backup** ([Installation, first start](/en/installation#first-start)). You can use

- **File**: a scheduled backup (`flowplan-….sqlite`, `.sqlite.enc`) or the backup of the whole instance (`flowplan-instanz-….zip`, `.zip.enc`), up to 50 GB. The upload is written straight to disk and shows its progress. If attachments are then missing – neither in the backup nor in the instance's file storage –, the page says how many; if the old instance kept its files in S3 or on an SFTP server, restore from there.
- **S3**: the newest scheduled backup from `<prefix>/backups/` of a bucket, with the files from `<prefix>/uploads/` – any missing there come from `<prefix>/.deleted/uploads/`.
- **SFTP**: the newest backup from the folder, with the files from `uploads/` (if **Include files** was on) – any missing there come from `.deleted/uploads/`. Flowplan shows the host key first; it only signs in once you confirm **The fingerprint matches**.

If the backup is encrypted, the page asks for the old instance's key (`FLOWPLAN_ENCRYPTION_KEY`) – or it is already set on the new one. Flowplan checks the database (intact, a Flowplan database, not from a newer version – older ones are brought up to date when they open, as with an update), puts the empty initial state aside as `pre-restore-…` and applies the backup right away. Afterwards you sign in with an account from the backup. If Litestream runs (S3 without `FLOWPLAN_LITESTREAM=off`), the backup is applied on the next restart of the container – the page says so.

This is only possible while the instance has no account, and with `FLOWPLAN_SETUP_TOKEN` set only via the setup link. As soon as an account exists, the server refuses every request for it; then **Administration → Storage & backup → Restore from backup** remains.

> [!NOTE]
> Stored secrets (authenticator apps, AI and messenger keys, the SFTP password) can only be read with the same `FLOWPLAN_ENCRYPTION_KEY` or `FLOWPLAN_SECRETS_KEY` as on the old instance; without either, the key is in `secrets.key` in the data folder, which is in no backup. If you entered a key while restoring, set it as `FLOWPLAN_ENCRYPTION_KEY` afterwards.
