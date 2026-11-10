# Moving an instance

How to move a whole Flowplan instance to another server – say from a home server to a rented one – with all accounts, workspaces, files and keys, usually with only a few minutes of downtime.

A Flowplan instance consists of exactly four things:

| Part | What | Moves along |
| --- | --- | --- |
| Container | the image `ghcr.io/yannicschuller/flowplan` (for `linux/amd64` and `linux/arm64`) | install anew, the same or a newer version |
| Data folder `/app/data` | `flowplan.sqlite` (+ `-wal`, `-shm`), `uploads/`, `web-push-keys.json`, `secrets.key`; `ocr/` and `tmp/` are recreated | yes – this is the actual move |
| Environment variables | `APP_URL`, keys, `OIDC_*`, `S3_*`, `SMTP_*` … | copy by hand, **above all the keys** |
| Domain and reverse proxy | DNS record, HTTPS certificate | switch DNS, set up the proxy again |

This holds for every way of running it: `docker run`, Docker Compose, Kubernetes with the [Helm chart](/installation#kubernetes-helm), without Docker or in a deployment panel. If you use a panel, recreate the same container with the same volume and the same variables there.

## Prepare

1. **Write down the environment variables.** All the old instance gets – depending on the setup from the `.env`, with `docker inspect <container>` (section `Env`), `docker compose config` or `helm get values flowplan`. The full list is under [Configuration](/configuration).
2. **Keep the keys safe**, apart from the data (password manager):
   - `FLOWPLAN_ENCRYPTION_KEY` (or the file of `FLOWPLAN_ENCRYPTION_KEY_FILE`) and `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS`: without them, encrypted backups, the encrypted files in the bucket and the stored secrets sealed with it cannot be read.
   - `FLOWPLAN_SECRETS_KEY` (or `…_FILE`), if set. If neither is set, the key for stored secrets is `secrets.key` in the data folder – the built-in move tool takes it along; with the other ways you copy it yourself.
   - What depends on it: AI keys, calendar connections (Google, Microsoft 365), chat app tokens, Git export tokens and the accounts' two-factor secrets. Without the key, accounts with two-factor sign-in only get in with recovery codes.
3. **Keep the domain.** The same `APP_URL` means passkeys, the OIDC redirect, CalDAV and CardDAV accounts, the apps, incoming webhooks (Git, tickets, inbound e-mail) and share links simply keep working after the DNS switch. With a new domain all of that must be set up again (see [Another domain](#another-domain)).
4. **Lower the TTL of the DNS record** at least as long beforehand as the current TTL (often 1 to 24 hours), e.g. to 300 seconds. The switch then takes effect within minutes.
5. **Set up the new server** (example: [Hetzner Cloud](#example-hetzner-cloud)) with **the same or a newer** Flowplan version – an older one cannot open a newer database – and with the same environment variables. A bucket of its own for the new instance is simplest; with the same bucket see [way C](#way-c-s3-and-litestream).
6. **Make a backup**: **Administration → Storage & backup → Whole instance → Download**. It never hurts.
7. **Warn the users**: **Administration → Maintenance & notices** shows everyone a maintenance window.

## Three ways

| Way | When | Downtime |
| --- | --- | --- |
| **A: Move tool** (recommended) | whenever the new server can reach the old one | minutes (only the final sync) |
| **B: Download and upload a backup** | small instances, no network path between the servers | from the backup until the new instance starts |
| **C: S3 and Litestream** | the old instance already runs with S3 and Litestream | from stopping the old to starting the new instance |

### Way A: The move tool

Under **Administration → Storage & backup** (admins only), the new instance fetches everything straight from the old one: server to server, resumable and with checksums.

**On the old instance – "Prepare the move"**

1. **Move instance → Prepare the move**. For safety Flowplan asks for your password; with SSO the sign-in must be at most 15 minutes old (otherwise sign out and in once).
2. Flowplan shows the **transfer address** and the **move token** (`fpmove_…`) – **only this once**. The token is valid for 24 hours and only for the move: it may read the instance, make it read-only for the final sync and complete the move, nothing else. Only a hash is stored; **Revoke** invalidates it at once, and a new token replaces the old one. Creating, revoking and every step of the move are in the activity log and a security event under **Administration → Security**. Ten wrong token attempts from one address lock it out for 15 minutes.

**On the new instance – "Take over from another instance"**

The new instance is fresh: only the first admin account you create on first start. If it already has content, Flowplan asks for an explicit confirmation, because everything is replaced.

> [!TIP]
> **Same domain, but DNS still points to the old server?** Then you cannot reach the new instance at its final address yet, and its proxy cannot get a certificate for it. Two options:
> - **Temporary address:** point a second name at the new server (say `new.flowplan.example.org`), start the new instance with `APP_URL=https://new.flowplan.example.org` first and do the move there. The pre-flight check then warns about `APP_URL` – that is expected. Before the restart in step 6, set `APP_URL` to the final address (the proxy may serve both names).
> - **Without the interface:** the [command line](#without-the-interface-command-line) on the new server.

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
   | Same bucket | Warning: both instances would write into the same folder (see [way C](#way-c-s3-and-litestream)). |
   | S3, SMTP, OIDC reachable | Error with the service's message. Many providers block outgoing ports 25 and 465 – use port 587 then. |

   Change the new instance's variables and restart it until no errors remain; the move continues after the restart.
4. **Make the source read-only and fetch the last state**: downtime starts here. The old instance accepts no more changes – everyone sees "Move in progress: This instance is read-only", reading and signing in still work, changes (also through the API, CalDAV, webhooks, inbound e-mail) are refused with a clear message. The new instance fetches a fresh database snapshot and only the files that are new or changed since the first copy; removed ones go. This usually takes minutes.
5. **Apply on restart → Apply**: Flowplan checks the database and prepares everything for the next start – exactly like **Restore from backup**. The old instance is told: it now shows "This instance has moved to …", stays read-only, and its move token is used up.
6. **Restart the new instance** (the container, the pod or the service). On start Flowplan swaps in database, files and keys; the new instance's previous state stays in the data folder as `pre-move-<time>`. The log says `Instanz wiederhergestellt; vorheriger Stand in …/pre-move-…`.
7. **Switch DNS** (below) and [check afterwards](#check-afterwards).

You now sign in on the new instance with the accounts of the old one; the new one's first admin account is replaced. Existing sign-ins (browsers, apps) stay valid as long as the domain stays the same.

On the old instance, **Move instance** also offers **Redirect the web interface**: whoever opens it in the browser goes straight to the new address. **Lift read-only** makes it writable again – only when the move is called off.

While the old instance is read-only, its background services pause: incoming mail (the IMAP mailbox stays unread for the new instance), calendar and issue sync, workflows, reminders, deliveries of e-mail, push, webhooks and messengers, and scheduled backups. The app can't change anything there either.

#### Without the interface (command line)

The same without a web interface on the new instance – before any account exists there, say, or over SSH while DNS still points to the old server. The tool is in the image as `/app/move.mjs` and in the source as `scripts/move.mjs` (`npm run move`). It fetches the first copy, makes the old instance read-only, fetches the last state, prepares everything for the next start and tells the old instance the new address (`--target-url`, otherwise `APP_URL`). Interrupted? Run the same command again – it continues where it stopped.

```bash
# Docker Compose (in the new instance's folder; same .env, same volume)
docker compose run --rm flowplan node /app/move.mjs \
  --from https://flowplan.example.org --token fpmove_…
docker compose up -d          # starts and applies the copy

# docker run
docker run --rm -v flowplan-data:/app/data -e APP_URL=https://flowplan.example.org \
  ghcr.io/yannicschuller/flowplan node /app/move.mjs --from https://flowplan.example.org --token fpmove_…

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

### Way B: Download and upload a backup

1. On the old instance [announce maintenance](/administration#maintenance-notices) – changes after the download are lost.
2. **Administration → Storage & backup → Whole instance → Download**. With `FLOWPLAN_ENCRYPTION_KEY` the file is encrypted (`.zip.enc`) – the new instance then needs the same key.
3. The instance backup holds the database and files but **not** `secrets.key` and `web-push-keys.json`. Copy both by hand (or set the keys as variables):
   ```bash
   # old
   docker compose cp flowplan:/app/data/secrets.key .
   docker compose cp flowplan:/app/data/web-push-keys.json .
   # new
   docker compose cp secrets.key flowplan:/app/data/
   docker compose cp web-push-keys.json flowplan:/app/data/
   docker compose exec -u root flowplan chown node:node /app/data/secrets.key /app/data/web-push-keys.json
   ```
4. On the new instance **Restore from backup → Choose backup**. The proxy in front must let such large uploads through (Caddy does by itself, nginx with `client_max_body_size`, Cloudflare at most 100 MB); otherwise bring the file to the server with `scp` and upload it there. At most 50 GB.
5. Restart; the previous state stays as `pre-restore-…`. Then switch DNS.

### Way C: S3 and Litestream

If the old instance runs with S3 (files in the bucket) and Litestream (a continuous copy of the database under `<prefix>/db/`), the new instance can start straight from the bucket:

1. **Stop** the old instance – the Litestream of two instances must never write into the same folder at the same time.
2. Start the new instance with the **same** `S3_*` variables, the same `FLOWPLAN_ENCRYPTION_KEY` and an **empty** data folder. Litestream restores the database; Flowplan fetches files on first access right away and all others in the background.
3. Copy `secrets.key` and `web-push-keys.json` as in way B unless the keys are set as variables.
4. Switch DNS.

With `FLOWPLAN_LITESTREAM=off` there is no continuous copy: use the newest scheduled backup from `<prefix>/backups/` instead (see [Restore](/storage-and-backups#restore)). The pre-flight check of way A notices a Litestream copy in the bucket and points to this way.

> [!NOTE]
> Active [workflows](/workflows) arrive on the new instance **paused** – with their draft, versions and held runs. So nothing starts twice while the old instance is still running. Check them afterwards and activate them again.

## Switch DNS

1. After the final sync (way A) or the start of the new instance, change the domain's **A record** (IPv4) and **AAAA record** (IPv6) to the new server. Remove a port forwarding or tunnel at the old location.
2. The new server's proxy gets its certificate as soon as the domain points to it (with Let's Encrypt over port 80) – give it a minute.
3. Check what the world sees with `dig +short flowplan.example.org` (or `nslookup`). Whoever still has the old address cached reaches the old instance until the TTL runs out – which then shows the notice with the new one.
4. Raise the TTL again afterwards.

## Check afterwards

- **Sign in**: with password, passkey and SSO. Existing sessions stay valid.
- **Administration → Monitoring**: all green? **Administration → Encryption** shows the same key ID as before.
- **Administration → Storage & backup**: S3 connected, the queue drains (with S3, Flowplan uploads every file once after a takeover), **Back up now** succeeds.
- **Administration → E-mail → Send test email** and **Administration → Push notifications → Send test notification**.
- Open a few pages, images and attachments; upload a file.
- AI, calendar connections, chat apps: if they work without signing in again, the stored secrets are readable.
- Refresh CalDAV/CardDAV in an app, open the desktop and mobile apps, trigger incoming webhooks (Git, tickets) once.

## Clean up

- Remove `FLOWPLAN_MOVE_ALLOW_PRIVATE` on the new instance.
- Delete `pre-move-…` (or `pre-restore-…`) in the data folder after a few days, e.g. `docker compose exec flowplan sh -c 'rm -rf /app/data/pre-move-*'`.
- Keep the old instance running with its notice for a few days, then stop it, wipe its volume and revoke its S3 credentials (if it had its own). The move token is already used up.
- Turn on or check a scheduled backup on the new instance ([Backups](/storage-and-backups#backups)).

## Going back if something goes wrong

Until the DNS switch nothing is lost: on the old instance **Administration → Storage & backup → Move instance → Lift read-only**, and everything runs as before. After the switch: switch DNS back and lift the read-only state – what was changed on the new instance in the meantime only comes back with a move in the other direction. The new instance itself returns to its previous state when you replace `flowplan.sqlite*` and `uploads/` with the contents of `pre-move-…` while the container is stopped.

## Another domain

If the instance gets a new address, set `APP_URL` to it and then set up again:

- **Passkeys** are bound to the domain: everyone signs in with password or SSO and creates them again.
- **OIDC**: change the redirect address at the provider to `<new APP_URL>/api/auth/callback`.
- **CalDAV and CardDAV**: set up the accounts in the calendar and contacts apps again.
- **Incoming webhooks** (Git, ticket sync, inbound e-mail) and **share links** point to the old address.
- **Desktop and mobile apps** store the server's address. They keep connecting to the old instance; there everyone sees the notice "This instance has moved to …", and changes are refused with a message naming the new address. Sign out in the app and enter the new address (desktop: **Profiles → Add profile …**). Leave **Redirect the web interface** off meanwhile: the apps refuse an address that redirects to another site.

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

## Example: Hetzner Cloud

A concrete way from a home server to a server at Hetzner, with Docker Compose and Caddy. Plan names and prices change – the Hetzner Console is what counts.

### Server

| Setting | Recommendation |
| --- | --- |
| Type | **CAX21** (Arm64, 4 vCPU, 8 GB RAM) or **CX32** (x86, 4 vCPU, 8 GB RAM), or their current successor. 4 GB is enough for small teams; text recognition of scanned PDFs needs CPU for a moment, local AI (Ollama) much more. The image exists for `linux/arm64` and `linux/amd64`, both types fit. |
| Location | **Falkenstein** (`fsn1`) or **Nuremberg** (`nbg1`) – Object Storage is available there too. |
| Image | **Ubuntu 24.04** |
| Networking | Public IPv4 and IPv6. Keep an IPv4 address: not every registry and mail server is reachable over IPv6. |
| SSH key | Add your own public key; never use password sign-in. |
| Firewall | Create and assign a **Hetzner Cloud Firewall**: inbound TCP **22** only from your address (or your VPN), TCP **80** and **443** and UDP **443** (HTTP/3) from anywhere. Docker bypasses `ufw` on the server; the Cloud Firewall in front still applies. |
| Backups | Turn on the server's **Backups** (a surcharge on the server price): daily images of the whole disk, in addition to Flowplan's own backups. |

### Object Storage as S3

1. In the Hetzner Console **Object Storage → Create bucket**, same location as the server (e.g. Falkenstein), visibility **private**. The name must be unique, e.g. `flowplan-<your-name>`.
2. **Security → S3 credentials → Generate credentials**. The secret is shown only once.
3. Into the `.env`:

```dotenv
S3_BUCKET=flowplan-example
S3_ENDPOINT=https://fsn1.your-objectstorage.com
S3_REGION=fsn1
S3_ACCESS_KEY_ID=<access key>
S3_SECRET_ACCESS_KEY=<secret key>
S3_PREFIX=flowplan
```

Endpoint and region follow the location: `https://<location>.your-objectstorage.com` with `fsn1` (Falkenstein), `nbg1` (Nuremberg) or `hel1` (Helsinki) as `S3_REGION`. With `FLOWPLAN_ENCRYPTION_KEY`, files and backups are stored there encrypted; the Litestream copy is not (see [Litestream and encryption](/storage-and-backups#litestream-and-encryption)). Object Storage is billed monthly, with a base price that includes a quota – see Hetzner for current prices.

### Docker, Flowplan and Caddy

Install Docker following the official guide for Ubuntu ([docs.docker.com/engine/install/ubuntu](https://docs.docker.com/engine/install/ubuntu/)), then:

```bash
mkdir -p /opt/flowplan && cd /opt/flowplan
curl -o .env https://raw.githubusercontent.com/yannicschuller/flowplan/main/.env.example
# create compose.yaml and Caddyfile from below, fill in .env
docker compose up -d
```

`compose.yaml`:

```yaml
# Flowplan with Caddy in front (HTTPS from Let's Encrypt). Exactly one instance (SQLite).
services:
  flowplan:
    image: ghcr.io/yannicschuller/flowplan:${FLOWPLAN_VERSION:-latest}
    env_file: .env
    environment:
      FLOWPLAN_DATA_DIR: /app/data
      # Caddy is the one proxy in front and sets X-Forwarded-For.
      FLOWPLAN_TRUSTED_PROXIES: "1"
    volumes:
      - flowplan-data:/app/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]
      interval: 30s
      timeout: 5s
      start_period: 20s
      retries: 3

  caddy:
    image: caddy:2
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    environment:
      FLOWPLAN_DOMAIN: ${FLOWPLAN_DOMAIN}
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy-data:/data
      - caddy-config:/config
    depends_on:
      - flowplan
    restart: unless-stopped

volumes:
  flowplan-data:
  caddy-data:
  caddy-config:
```

`Caddyfile`:

```caddyfile
{$FLOWPLAN_DOMAIN} {
	encode zstd gzip
	reverse_proxy flowplan:3000
}
```

In the `.env`, besides the old instance's values:

```dotenv
FLOWPLAN_DOMAIN=flowplan.example.org
APP_URL=https://flowplan.example.org
# SMTP: Hetzner blocks outgoing ports 25 and 465 for new accounts – use 587 with STARTTLS.
SMTP_PORT=587
SMTP_SECURE=false
# Only for the move, when the home server is reachable only in the LAN/VPN:
# FLOWPLAN_MOVE_ALLOW_PRIVATE=true
```

For a [temporary address](#way-a-the-move-tool) during the move, set `FLOWPLAN_DOMAIN=new.flowplan.example.org` and the matching `APP_URL`; after **Apply**, change both to the final domain and restart with `docker compose up -d` – the same restart applies the move. Caddy can also serve both names: `{$FLOWPLAN_DOMAIN}, new.flowplan.example.org { … }`.

Prefer Kubernetes? The repository's [Helm chart](/installation#kubernetes-helm) runs on a single server too (with k3s, say); the move then goes through the interface or `kubectl exec … node /app/move.mjs` (above).

### The run with the home server

1. A day before, lower the DNS record's TTL to 300 seconds.
2. Set up the Hetzner server as above, with the same variables as at home (the keys!), and start it with `docker compose up -d`; create the first account.
3. At home **Prepare the move**; on the Hetzner server **Take over from another instance** with the home server's public address (or its VPN address with `FLOWPLAN_MOVE_ALLOW_PRIVATE=true`).
4. Pre-flight check until no errors remain. **Make the source read-only and fetch the last state**, **Apply**, `docker compose restart flowplan`.
5. Point the A and AAAA records to the Hetzner server's addresses, remove the port forwarding at the router.
6. [Check afterwards](#check-afterwards), [clean up](#clean-up) after a few days.
