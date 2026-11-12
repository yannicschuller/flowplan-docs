---
keywords: encryption, flowplan_encryption_key, key rotation, decrypt, litestream
---

# Encrypting files and backups

With a key of your own, Flowplan encrypts everything that leaves the server – files in the bucket, backups and the database copy – existing data too.

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

::: steps

1. Set the new key as `FLOWPLAN_ENCRYPTION_KEY` and move the old one to `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS` (several separated by commas), then restart.
2. Under **Administration → Encryption**, choose **Encrypt existing objects**. All files in the bucket are re-encrypted with the new key.
3. Keep the old key until the last backup encrypted with it has dropped out of retention.

:::

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
