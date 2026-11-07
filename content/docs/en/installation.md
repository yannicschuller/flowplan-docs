# Installation with Docker

Flowplan runs as a single container with SQLite and a data directory. Postgres, Redis or a separate search service are not needed – PostgreSQL and several instances are possible, but optional.

## Requirements

- A server with Docker and a persistent volume. Text recognition for scanned PDFs briefly needs noticeable CPU when uploading.
- Already running an instance on another server? Then [move it](/move-instance) after installing instead of starting over.
- A domain with HTTPS through a reverse proxy (Traefik, Caddy, nginx, Coolify, Pangolin …). For just trying it out it works without, see [Without HTTPS](#without-https).
- Optionally an OpenID Connect provider for single sign-on. Without one, people sign in with e-mail and password or a passkey, see [Sign-in](/sign-in).
- Optionally an S3-compatible storage for files and the continuous database backup, see [Storage, S3 and backups](/storage-and-backups).
- Optionally a PostgreSQL database instead of SQLite, see [PostgreSQL](/en/postgresql). How much hardware you need for how many people is under [Sizing](/en/sizing).

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

The chart's README explains every value. Several pods with PostgreSQL, Redis and S3 (`cluster.enabled=true`): see [Cluster mode](/en/cluster#kubernetes-helm).

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
