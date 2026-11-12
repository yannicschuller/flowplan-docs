---
keywords: move tool, sync, downtime, troubleshooting, move
---

# Moving with the move tool

The move tool has the new instance fetch everything from the old one – database, files, keys – with a short downtime; plus troubleshooting a move.

## Way A: The move tool

Under **Administration → Storage & backup** (admins only), the new instance fetches everything straight from the old one: server to server, resumable and with checksums.

**On the old instance – "Prepare the move"**

::: steps

1. **Move instance → Prepare the move**. For safety Flowplan asks for your password; with SSO the sign-in must be at most 15 minutes old (otherwise sign out and in once).
2. Flowplan shows the **transfer address** and the **move token** (`fpmove_…`) – **only this once**. The token is valid for 24 hours and only for the move: it may read the instance, make it read-only for the final sync and complete the move, nothing else. Only a hash is stored; **Revoke** invalidates it at once, and a new token replaces the old one. Creating, revoking and every step of the move are in the activity log and a security event under **Administration → Security**. Ten wrong token attempts from one address lock it out for 15 minutes.

:::

**On the new instance – "Take over from another instance"**

The new instance is fresh: only the first admin account you create on first start. If it already has content, Flowplan asks for an explicit confirmation, because everything is replaced.

> [!TIP]
> **Same domain, but DNS still points to the old server?** Then you cannot reach the new instance at its final address yet, and its proxy cannot get a certificate for it. Two options:
> - **Temporary address:** point a second name at the new server (say `new.flowplan.example.org`), start the new instance with `APP_URL=https://new.flowplan.example.org` first and do the move there. The pre-flight check then warns about `APP_URL` – that is expected. Before the restart in step 6, set `APP_URL` to the final address (the proxy may serve both names).
> - **Without the interface:** the [command line](#without-the-interface-command-line) on the new server.

::: steps

1. **Move instance → Take over from another instance**: enter the **address of the old instance** (its `APP_URL`) and the **move token**, **Start the takeover**.
   - If the old server is only in your own network (LAN, a VPN such as WireGuard or Tailscale, e.g. `http://192.168.1.10:3000`), set `FLOWPLAN_MOVE_ALLOW_PRIVATE=true` on the **new** instance for the move. Without it, as for every request the server makes, only public `https://` addresses are allowed.
2. **First copy**: a consistent database snapshot, every file in `uploads/` one by one with a SHA-256 checksum, `web-push-keys.json` and `secrets.key`. The page shows bytes, files and the estimated time left. The old instance keeps running as usual. If the connection drops or a server restarts, **Resume** continues where it stopped – files already checked are not fetched again, a half file continues from its last byte.
3. **Pre-flight check → Check**. Flowplan compares the settings of both instances – only names and check values (an HMAC keyed with the move token), never the values themselves – and checks whether the new instance reaches S3, SMTP and the OIDC provider. The result is a list of **OK**, **Warning** and **Error**:

   | Check | Meaning |
   | --- | --- |
   | Version | Error if the new instance is older than the old one: update it first. |
   | `FLOWPLAN_ENCRYPTION_KEY` | Error if it is missing or different: encrypted backups, the encrypted files in the bucket, stored tokens and calendar connections would be unreadable. Set the old key (a new one only in addition, the old one then in `…_PREVIOUS`). |
   | Stored secrets | Error if their key is missing (`FLOWPLAN_SECRETS_KEY` or `FLOWPLAN_ENCRYPTION_KEY`). A generated `secrets.key` comes along by itself. |
   | `APP_URL` | Warning for a different address, with everything that must then be set up again. |
   | OIDC, S3, SMTP, push, AI, other | Variables missing here, with a different value, or set only here. Missing `OIDC_ISSUER`/`OIDC_CLIENT_ID` is an error – nobody would get in with SSO. |
   | Same bucket | Warning: both instances would write into the same folder (see [way C](/move-instance#way-c-s3-and-litestream)). |
   | S3, SMTP, OIDC reachable | Error with the service's message. Many providers block outgoing ports 25 and 465 – use port 587 then. |

   Change the new instance's variables and restart it until no errors remain; the move continues after the restart.
4. **Make the source read-only and fetch the last state**: downtime starts here. The old instance accepts no more changes – everyone sees "Move in progress: This instance is read-only", reading and signing in still work, changes (also through the API, CalDAV, webhooks, inbound e-mail) are refused with a clear message. The new instance fetches a fresh database snapshot and only the files that are new or changed since the first copy; removed ones go. This usually takes minutes.
5. **Apply on restart → Apply**: Flowplan checks the database and prepares everything for the next start – exactly like **Restore from backup**. The old instance is told: it now shows "This instance has moved to …", stays read-only, and its move token is used up.
6. **Restart the new instance** (the container, the pod or the service). On start Flowplan swaps in database, files and keys; the new instance's previous state stays in the data folder as `pre-move-<time>`. The log says `Instanz wiederhergestellt; vorheriger Stand in …/pre-move-…`.
7. **Switch DNS** (below) and [check afterwards](/move-instance#check-afterwards).

:::

You now sign in on the new instance with the accounts of the old one; the new one's first admin account is replaced. Existing sign-ins (browsers, apps) stay valid as long as the domain stays the same.

On the old instance, **Move instance** also offers **Redirect the web interface**: whoever opens it in the browser goes straight to the new address. **Lift read-only** makes it writable again – only when the move is called off.

While the old instance is read-only, its background services pause: incoming mail (the IMAP mailbox stays unread for the new instance), calendar and issue sync, workflows, reminders, deliveries of e-mail, push, webhooks and messengers, and scheduled backups. The app can't change anything there either.

### Without the interface (command line)

The same without a web interface on the new instance – before any account exists there, say, or over SSH while DNS still points to the old server. The tool is in the image as `/app/move.mjs` and in the source as `scripts/move.mjs` (`npm run move`). It fetches the first copy, makes the old instance read-only, fetches the last state, prepares everything for the next start and tells the old instance the new address (`--target-url`, otherwise `APP_URL`). Interrupted? Run the same command again – it continues where it stopped.

```bash
# Docker Compose (in the new instance's folder; same .env, same volume)
docker compose run --rm flowplan node /app/move.mjs \
  --from https://flowplan.example.org --token fpmove_…
docker compose up -d          # starts and applies the copy

# docker run
docker run --rm -v flowplan-data:/app/data -e APP_URL=https://flowplan.example.org \
  ghcr.io/yannicschuller/flowplan node /app/move.mjs --from https://flowplan.example.org --token fpmove_…
# (writes as UID 1000; with PUID/PGID add -e PUID=… -e PGID=…, with user: --user UID:GID)

# Kubernetes (Helm chart)
kubectl -n flowplan exec deploy/flowplan -- node /app/move.mjs --from https://flowplan.example.org --token fpmove_…
kubectl -n flowplan rollout restart deploy/flowplan

# without Docker
npm run move -- --from https://flowplan.example.org --token fpmove_… --data /var/lib/flowplan
```

| Option | Meaning |
| --- | --- |
| `--from <address>` | Address of the old instance. On the command line internal addresses and `http://` are allowed too – you decide where it connects. |
| `--token <token>` | The move token (or `FLOWPLAN_MOVE_TOKEN` in the environment, to keep it out of the shell history). |
| `--data <folder>` | Data folder, default `FLOWPLAN_DATA_DIR` or `./data`. |
| `--target-url <address>` | Address of the new instance for the notice on the old one (default `APP_URL`). |
| `--copy-only` | Only the first copy; the old instance stays writable. Later run it again without the option for the final sync. |
| `--yes` | Replace a data folder that already has content (its previous state stays as `pre-move-…`). |

The pre-flight check is only in the interface; on the command line compare the variables yourself (list above).

## Troubleshooting

| Message or state | Cause and fix |
| --- | --- |
| "Internal addresses are only allowed with FLOWPLAN_MOVE_ALLOW_PRIVATE=true" | The old instance has a private address (LAN, VPN, `localhost`) or only `http://`. Set `FLOWPLAN_MOVE_ALLOW_PRIVATE=true` on the new instance, restart, remove it after the move. |
| "Invalid or expired move token" | Copied wrongly, older than 24 hours, revoked, replaced by a new one or used up by a completed move. Create a new one on the old instance. |
| "Too many invalid move requests" | Ten wrong tokens from one address: wait 15 minutes. |
| The transfer stops | **Resume** (or run the command again). Finished files stay, half ones continue. |
| "Checksum does not match" | The file arrived damaged and is fetched again automatically; if it keeps happening, check the connection (proxy, VPN). |
| "This database snapshot no longer exists" | The old instance made a new snapshot in the meantime (new token, restart). **Resume** fetches it. |
| Time-out at the start (502/504) | The first time, the old instance computes the checksums of all files. A proxy with a short time limit in front (nginx: `proxy_read_timeout` 60 s, Cloudflare 100 s) gives up. Raise the limit or use the address without the proxy (with `FLOWPLAN_MOVE_ALLOW_PRIVATE`). |
| Pre-flight: error for `FLOWPLAN_ENCRYPTION_KEY` or stored secrets | Set the old instance's key on the new one and restart. Only then switch. |
| SMTP not reachable | Many providers block outgoing ports 25 and 465. Use `SMTP_PORT=587` with STARTTLS. |
| Nothing happens after **Apply** | Applying needs a restart of the new instance. The log must say `Instanz wiederhergestellt`. |
| The old instance says "read-only" although the move was called off | **Move instance → Lift read-only**. |
