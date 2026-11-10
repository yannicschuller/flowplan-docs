# Installation with Docker

Flowplan runs as a single container with SQLite and a data directory. Postgres, Redis or a separate search service are not needed – PostgreSQL and several instances are possible, but optional.

## Requirements

- A server with Docker and a persistent volume. Text recognition for scanned PDFs briefly needs noticeable CPU when uploading.
- Already running an instance on another server? Then [move it](/move-instance) after installing instead of starting over.
- A domain with HTTPS through a reverse proxy (Traefik, Caddy, nginx, Coolify, Pangolin …). For just trying it out it works without, see [Without HTTPS](#without-https).
- Optionally an OpenID Connect provider for single sign-on. Without one, people sign in with e-mail and password or a passkey, see [Sign-in](/sign-in).
- Optionally an S3-compatible storage for files and the continuous database backup, see [Storage, S3 and backups](/storage-and-backups).
- Optionally a PostgreSQL database instead of SQLite, see [PostgreSQL](/en/postgresql). How much hardware you need for how many people is under [Sizing](/en/sizing).

## Deploy in one click

No server of your own yet? Three ways to a running instance without setting up Docker by hand. All of them use the same image as the Compose file below.

| Method | Data | HTTPS and address |
| --- | --- | --- |
| [Render](#render) | SQLite on a persistent disk | Automatic, `https://<name>.onrender.com` or your domain |
| [DigitalOcean App Platform](#digitalocean-app-platform) | PostgreSQL (dev database), files in a Spaces bucket | Automatic, `https://<name>.ondigitalocean.app` or your domain |
| [Any server](#any-server-cloud-init-or-install-script) (Hetzner, Netcup, IONOS …) | SQLite in a Docker volume on the server | Caddy with a Let's Encrypt certificate for your domain |

### Render

**[Deploy to Render →](https://render.com/deploy?repo=https://github.com/yannicschuller/flowplan)**

The button reads the Blueprint [`render.yaml`](https://github.com/yannicschuller/flowplan/blob/main/render.yaml) from the repository: a web service from the image `ghcr.io/yannicschuller/flowplan:latest` in Frankfurt, a 5 GB disk on `/app/data` and the health check on `/api/health`.

1. Click the button, sign in to Render and confirm the Blueprint. The SMTP fields can stay empty (see [E-mail](/en/configuration#e-mail-smtp)).
2. Render generates `FLOWPLAN_SETUP_TOKEN`. Once the deploy is done, copy it from the service's **Environment** tab and open `https://<name>.onrender.com/register?setup=<token>` – this first account administers the instance. If the token contains a `+`, write it as `%2B` in the address.

**Costs:** persistent disks need a paid instance – the Blueprint uses **Starter**, the smallest one with a disk; the disk is billed per GB on top (see Render's pricing). For more than a handful of people choose a larger instance ([Sizing](/en/sizing)). On the free instance the data would be lost on every restart.

**Address:** without `APP_URL`, Flowplan uses Render's own address (`RENDER_EXTERNAL_URL`). For your own domain, add it under **Settings → Custom Domains** and set `APP_URL=https://flowplan.example.com` under **Environment** – ideally before the first account, because passkeys are bound to the address.

**Persistence and updates:** everything lives on the disk – Render runs a service with a disk as exactly one instance and stops it briefly on every deploy. Render keeps snapshots of the disk; for backups away from Render, add S3 ([Storage, S3 and backups](/en/storage-and-backups)). To update, start a **Manual Deploy**: Render pulls the `:latest` image again.

### DigitalOcean App Platform

**[Deploy to DigitalOcean →](https://cloud.digitalocean.com/apps/new?repo=https://github.com/yannicschuller/flowplan/tree/main)**

The button reads [`.do/deploy.template.yaml`](https://github.com/yannicschuller/flowplan/blob/main/.do/deploy.template.yaml): a service from the image, a PostgreSQL 16 dev database and the health check on `/api/health`, in Frankfurt (`fra`).

App Platform has **no persistent volumes**: the container's disk is reset on every deploy and restart. That is why the template uses PostgreSQL instead of SQLite (`DATABASE_URL` points at the database) and expects a bucket for files:

- **Uploads:** create a Spaces bucket and a Spaces access key, and fill in `S3_BUCKET`, `S3_ACCESS_KEY_ID` and `S3_SECRET_ACCESS_KEY` (`S3_ENDPOINT` is preset for Frankfurt, `https://fra1.digitaloceanspaces.com`). Flowplan then puts every file into the bucket and fetches missing ones back after a deploy. **Without a bucket, uploaded files are lost on the next deploy.**
- **`FLOWPLAN_SETUP_TOKEN`** (generate with `openssl rand -hex 24`): the first account only via `<address>/register?setup=<token>`.
- **`FLOWPLAN_ENCRYPTION_KEY`** (generate with `openssl rand -base64 32`): encrypts the files in the bucket and protects stored secrets such as API keys. It must be set here, because a `secrets.key` on the container's disk would be replaced on every deploy. Keep a copy in a password manager.
- Optional `WEB_PUSH_PUBLIC_KEY` and `WEB_PUSH_PRIVATE_KEY` (`npx web-push generate-vapid-keys`): without them, new keys are made on every deploy and push in the browser stops until people turn it on again. Push to the apps is not affected.

App Platform cannot generate secrets itself, so you enter these values when creating the app (or later under the component's **Settings → Environment Variables**). `APP_URL` is App Platform's `${APP_URL}`: the `ondigitalocean.app` address, or your domain once you add it under **Settings → Domains** – then deploy again.

**Database:** a dev database has **no backups** and is meant for trying out. For real use, upgrade it to a managed database cluster, or attach an existing one with PostgreSQL 16 or newer ([PostgreSQL](/en/postgresql)). The image ships `pg_dump` and `pg_restore`, so Flowplan's own scheduled backups work on PostgreSQL too – store them in the bucket ([Storage, S3 and backups](/en/storage-and-backups)). The connection is encrypted; `uselibpqcompat=true` in `DATABASE_URL` accepts DigitalOcean's own certificate authority, as `psql` does with `sslmode=require`. If the log reports `permission denied for schema public`, the dev database's role may not create tables – use a managed database cluster, where the database owner can ([Role without superuser rights](/en/postgresql#role-without-superuser-rights)).

**Updates:** start a new deploy (**Actions → Force Rebuild and Deploy**); App Platform pulls the `:latest` image again.

### Any server: cloud-init or install script

For a virtual server (VPS) with **Ubuntu 24.04 or Debian 12** at any provider. Most of them – Hetzner Cloud, Netcup, IONOS, DigitalOcean Droplets, Vultr, Scaleway, OVHcloud – accept a cloud-init file as **"user data"** or **"cloud config"** when you create the server.

1. Point your domain's DNS record (A, and AAAA for IPv6) to the server – with a new server, as soon as you know its address.
2. Copy [`deploy/cloud-init.yaml`](https://github.com/yannicschuller/flowplan/blob/main/deploy/cloud-init.yaml), set the one line `FLOWPLAN_DOMAIN=flowplan.example.com` and paste it as user data when creating the server.
3. After a few minutes, sign in with SSH and read `/root/flowplan-README.txt`: it holds the address and the link for the first account. Progress is logged in `/var/log/flowplan-install.log`.

On a server that already runs, the install script does the same:

```bash
curl -fsSL https://raw.githubusercontent.com/yannicschuller/flowplan/main/deploy/install.sh | sudo bash -s -- flowplan.example.com
```

What the script sets up:

- **Docker** with the Compose plugin from Docker's own package repository (skipped when it is already there).
- **`/opt/flowplan`** with `compose.yaml` (Flowplan and [Caddy](https://caddyserver.com), which fetches and renews the HTTPS certificate itself), the `Caddyfile` and a `.env` readable only by root. Its secrets are generated on the server with `openssl`: `FLOWPLAN_SETUP_TOKEN` and `FLOWPLAN_ENCRYPTION_KEY` – keep a copy of the key in a password manager, encrypted backups cannot be read without it.
- **The data** in the Docker volume `flowplan-data`. It survives updates and restarts; for backups off the server add S3 or SFTP ([Storage, S3 and backups](/en/storage-and-backups)).
- **Firewall** (ufw): only SSH, 80 and 443 stay open. On a server with a firewall of its own, run the script with `FLOWPLAN_FIREWALL=off`. Ports 80 and 443 must be free – if another web server already holds them, put Flowplan behind it instead ([Coolify and reverse proxies](/en/coolify-and-proxy)).
- **Automatic security updates** of the system (unattended-upgrades).
- **Image updates are off by default:** you update when it suits you with `cd /opt/flowplan && docker compose pull && docker compose up -d` – the administration tells you about new releases. For an automatic weekly update (Sunday night), set `FLOWPLAN_AUTO_UPDATE=weekly` in the cloud-init file (or before `bash` in the command), or later run `systemctl enable --now flowplan-update.timer`.

**Without a domain** (`FLOWPLAN_DOMAIN=` left empty, or the script without an argument), Flowplan starts at `http://<server address>` without a certificate – fine for a test, see [Without HTTPS](#without-https). To switch to a domain later, point its DNS record to the server and run the script again with the domain: it sets `APP_URL` and the `Caddyfile`, and keeps the data and secrets. Do it before the first account if you can, because passkeys are bound to the address.

Further settings (e-mail, single sign-on, S3) go into `/opt/flowplan/.env`, followed by `docker compose up -d` in `/opt/flowplan` – see [Configuration](/en/configuration).

## With Docker Compose

Flowplan is open source (AGPL-3.0). The ready-made image is in the GitHub Container Registry, for `linux/amd64` and `linux/arm64`:

| Tag | Content |
| --- | --- |
| `ghcr.io/yannicschuller/flowplan:latest` | The latest version (release) |
| `ghcr.io/yannicschuller/flowplan:0.7.0` | A fixed version (currently 0.7.0), also as `:0.7` and `:0` |
| `ghcr.io/yannicschuller/flowplan:beta` | The latest manually built development state, or a release if that is newer – for trying out, not for production |

Download the Compose file and the example configuration:

```bash
mkdir flowplan && cd flowplan
curl -O https://raw.githubusercontent.com/yannicschuller/flowplan/main/compose.yaml
curl -o .env https://raw.githubusercontent.com/yannicschuller/flowplan/main/.env.example
```

In `.env`, set at least the public address:

```dotenv
APP_URL=https://flowplan.example.com
# Recommended once the address is reachable from the internet: openssl rand -hex 24
FLOWPLAN_SETUP_TOKEN=
```

With `FLOWPLAN_SETUP_TOKEN` you create the first account via `https://flowplan.example.com/register?setup=<token>`; without the link a new instance offers neither sign-up nor restore. If the token is missing and `APP_URL` is not a local address, Flowplan warns at start in the log and on the setup screen.

For single sign-on also set `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET` and `OIDC_ADMIN_GROUP` (see [Sign-in](/sign-in)); for e-mails (invitations, forgotten passwords) the `SMTP_*` values from the [configuration](/configuration#e-mail-smtp).

```bash
docker compose up -d
```

The container listens on port `3000` (bound to `127.0.0.1` only in the Compose file, so that the proxy sits in front of it). The volume `flowplan-data` on `/app/data` holds all content independently of the container. Choose a fixed version with `FLOWPLAN_VERSION=0.7.0` in `.env`.

> [!NOTE]
> An instance opens with the sign-in page. The website [flowplan.org](https://flowplan.org) and this documentation are separate projects; the hosted instance runs at [app.flowplan.org](https://app.flowplan.org).

## Build the image yourself

From the source code ([github.com/yannicschuller/flowplan](https://github.com/yannicschuller/flowplan)):

```bash
git clone https://github.com/yannicschuller/flowplan.git && cd flowplan
cp .env.example .env
docker compose up -d --build
```

Or without Compose:

```bash
docker build -t flowplan:latest .
docker run -d --name flowplan \
  -p 127.0.0.1:3000:3000 \
  -v flowplan-data:/app/data \
  --env-file .env \
  flowplan:latest
```

The image contains Node, Litestream for the S3 backup and `curl` for the health check. It runs as the user `node` (UID 1000).

## First start

1. Open `https://flowplan.example.com/api/health` – the answer is `200` with `"status":"ok"`.
2. Open the address in the browser: a new instance offers **Create account**. This first account administers the instance. If the address is reachable from the internet, set `FLOWPLAN_SETUP_TOKEN` first and create the account via `/register?setup=<token>` – otherwise someone could beat you to it ([Sign-in](/en/sign-in#e-mail-and-password)). (With single sign-on: **Sign in with SSO**; administrators are the members of the group in `OIDC_ADMIN_GROUP`.)
3. In the sidebar under **Administration**, set the instance name, upload limit, sign-ups and the [other settings](/administration).

**Moving or reinstalling?** Instead of the first account, the setup screen offers **Restore from a backup**: upload a backup file or fetch the newest backup from S3 or via SFTP, encrypted ones with the old instance's key. Afterwards you sign in with the accounts of the backup ([Restore while setting up](/en/storage-and-backups#restore-while-setting-up)). To move from a running instance there is also [Moving an instance](/en/move-instance).

> [!WARNING]
> With SQLite, **exactly one instance** runs. Several replicas would write to the same SQLite file. Do not simply scale horizontally; when updating, stop the old container before the new one. Several instances only work in [cluster mode](/en/cluster) with PostgreSQL, Redis and S3.

## Without HTTPS

For trying it out only: Flowplan also runs at a plain `http://` address, for example `APP_URL=http://192.168.1.20:3000` on your own network. `APP_URL` must then be exactly that address – with `http://` and the port.

The sign-in page and **Administration → Instance** then show the note "This instance runs without HTTPS". That is fine for a test, not for real use:

- **Passwords cross the network unencrypted** – anyone on the same network can read them.
- **Passkeys, the offline copy, push, and the camera, microphone and clipboard** are only available in the browser over HTTPS. Flowplan hides them or says why they are missing.
- **The apps for iPhone, iPad and Android** connect without HTTPS only to an instance on your local network (e.g. `http://192.168.1.20:3000`, `http://nas` or `http://nas.local`) and warn first. On iPhone and iPad, `.lan` or `.home.arpa` names don't work – enter the IP address there. See [An instance on your own network without HTTPS](/offline-and-apps#an-instance-on-your-own-network-without-https).
- Cookies carry no `Secure` flag, and the browser does not upgrade requests to HTTPS.

At `http://localhost` or `http://127.0.0.1` on your own computer there is no note: browsers treat these addresses like a secure connection.

For real use, put a reverse proxy with a certificate in front (see [Coolify and reverse proxies](/coolify-and-proxy)) and change `APP_URL` to the `https://` address. With Caddy two lines are enough; Caddy gets the certificate itself.

> [!NOTE]
> Up to 0.8.0 Flowplan silently required HTTPS: at an `http://` address styles and scripts were missing and the registration form simply stayed put. This is fixed – and forms with a password never send credentials in the address bar again.

## Update

When a newer release exists, the **administration** shows a notice with the new version number and a link to the changes (turn off with `FLOWPLAN_UPDATE_CHECK=false`, see [Configuration](/configuration)). With the image tag `:latest`, this is all it takes:

```bash
docker compose pull
docker compose up -d
```

With a self-built image, use `git pull` and `docker compose up -d --build` instead.

On start, Flowplan migrates the database itself. Make a backup beforehand (see [Storage, S3 and backups](/storage-and-backups)); going back to an older version after a migration is not supported.

### Upgrading to 0.7.0

Nothing to do by hand; Flowplan creates the new tables (for idempotency keys and the push relay, among others) on start. What changes for operations:

- **API description only when signed in:** `/api/openapi.json` and `/api/docs` need a sign-in or an API token. Public as before with `FLOWPLAN_PUBLIC_API_DOCS=true` (see [OpenAPI and SDKs](/api-and-webhooks#openapi-and-sdks)).
- **A shorter health check:** without a token, `/api/health` only answers `{"service":"flowplan","status":"ok"}`; the details come with `FLOWPLAN_METRICS_TOKEN` (see [Health check](/operations#health-check)).
- **Push to the apps through the push relay:** notifications to the apps go end-to-end encrypted through `push.flowplan.org`. `APP_URL` must be the public HTTPS address and outgoing HTTPS to the relay possible – see [Push relay](/configuration#push-relay-and-end-to-end-encryption).
- **Usage statistics:** monitoring counts requests, active people and storage – numbers only. Switch it off with `FLOWPLAN_METRICS=off` or in the administration (see [Statistics](/operations#statistics)).

## Kubernetes (Helm)

The chart lives in the repository at [`deploy/helm/flowplan`](https://github.com/yannicschuller/flowplan/tree/main/deploy/helm/flowplan). Flowplan runs as **exactly one pod** (SQLite) with a volume for `/app/data`; updates replace the pod with a short downtime (strategy `Recreate`). The chart (version 0.1.0) installs Flowplan 0.7.0 (`appVersion`); choose another version with `--set image.tag=…`.

```bash
kubectl create namespace flowplan
kubectl -n flowplan create secret generic flowplan-env \
  --from-literal=FLOWPLAN_ENCRYPTION_KEY="$(openssl rand -base64 32)"
helm install flowplan deploy/helm/flowplan -n flowplan \
  --set appUrl=https://flowplan.example.org \
  --set existingSecret=flowplan-env \
  --set ingress.enabled=true \
  --set ingress.hosts[0].host=flowplan.example.org
```

- Set OIDC, SMTP and S3 via `oidc.*`, `smtp.*` and `s3.*`; secrets preferably in `existingSecret` (keys are the names of the [environment variables](/configuration)). Further variables via `env`.
- `appUrl` is required (or taken from the first ingress host).
- The chart generates a random `FLOWPLAN_SETUP_TOKEN` (kept across upgrades; your own value via `setupToken` or in `existingSecret`). Create the first account with the setup link `helm install` prints at the end: `https://flowplan.example.org/register?setup=<token>`; read the token with `kubectl -n flowplan get secret flowplan -o jsonpath='{.data.FLOWPLAN_SETUP_TOKEN}' | base64 -d`.
- Use a block or local volume, not NFS (SQLite).
- Health checks use `/api/health`; the pod runs as user 1000 without extra privileges. `helm test flowplan` checks that it answers.
- The volume is kept on uninstall.
- To update: `git pull` in the repository, then `helm upgrade flowplan deploy/helm/flowplan -n flowplan --reuse-values`.

The chart's README explains every value. Several pods with PostgreSQL, Redis and S3 (`cluster.enabled=true`): see [Cluster mode](/en/cluster#kubernetes-helm). The database role in `DATABASE_URL` should own the database but not be a superuser ([Role without superuser rights](/en/postgresql#role-without-superuser-rights)).

## Without Docker

Node.js 22.13 or newer (the image uses Node 26):

```bash
npm ci
npm run build
FLOWPLAN_DATA_DIR=/var/lib/flowplan npm start
```

For local development, `npm run dev` is enough. Development mode also offers **Open local workspace**, a shared example account; production mode has no such access.

## Next

- [Configuration](/configuration): all environment variables.
- [Coolify and reverse proxies](/coolify-and-proxy): running behind Traefik, Coolify or Pangolin.
- [Moving an instance](/move-instance): to another server, with an example for Hetzner Cloud.
- [PostgreSQL](/en/postgresql) and [cluster mode](/en/cluster): for larger teams.
