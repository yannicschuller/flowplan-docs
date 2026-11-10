# Coolify and reverse proxies

Flowplan only needs an HTTPS proxy in front of it. WebSockets are not needed: collaboration runs over normal HTTP requests and server-sent events.

## Coolify

1. Choose **New resource → Docker Image** (`ghcr.io/yannicschuller/flowplan:latest`) or **Dockerfile** from the Git repository.
2. **Ports Exposes**: `3000`.
3. Enter the domain, e.g. `https://flowplan.example.com`. Coolify gets the certificate via Traefik.
4. **Persistent Storage**: a volume with the target `/app/data`.
5. Set the environment variables from the [configuration](/configuration).
6. Deploy. After about 20 seconds the health check reports the container as healthy.

### Health check

The image comes with its own health check. If you set it up in Coolify:

| Field | Value |
| --- | --- |
| Check type | HTTP request |
| Method / scheme / host | `GET` / `HTTP` / `localhost` |
| Port | `3000` – empty means 80, where nothing listens |
| Path | `/api/health` |
| Expected code | `200` |
| Start period | `30` seconds (with S3, Litestream restores the database on the first start) |

Flowplan sends no `X-Powered-By` header. The health check only needs the status code; its details are not public without a token (see [Health check](/operations#health-check)).

### Volume permissions

The container runs as the user `node` (UID 1000). A new Docker volume gets the permissions automatically. A mounted host folder must belong to the user Flowplan runs as – otherwise the start stops with "Flowplan cannot write to its data folder …". There are three ways:

**Give the folder to UID 1000:**

```bash
sudo chown -R 1000:1000 /path/to/flowplan-data
```

**Run Flowplan as the folder's owner** – with Docker's own `user:`. Any UID/GID works, also one without an entry in the image's `/etc/passwd`:

```yaml
services:
  flowplan:
    image: ghcr.io/yannicschuller/flowplan:latest
    user: "1001:1001"          # or "${UID}:${GID}", with UID and GID in .env
    volumes:
      - /path/to/flowplan-data:/app/data
```

**Set `PUID` and `PGID`** (as in the linuxserver.io images). The container then starts as root (`user: "0:0"`); Flowplan gives the data folder to `PUID:PGID`, starts the app as that user and never runs as root itself:

```yaml
services:
  flowplan:
    image: ghcr.io/yannicschuller/flowplan:latest
    user: "0:0"
    environment:
      PUID: "1001"
      PGID: "1001"
    volumes:
      - /path/to/flowplan-data:/app/data
```

`chown` only runs while the folder still belongs to someone else – so once, not on every start. Without a value, `PGID` equals `PUID`; both must be numbers greater than 0. Started as root without `PUID`/`PGID`, Flowplan runs as UID 1000 as usual. Without `user: "0:0"`, `PUID`/`PGID` have no effect; Flowplan says so in one line at start.

Your own commands in the image (such as `node /app/move.mjs` for an [instance move](/move-instance)) run as the user from `user:` with `docker compose run`/`exec`, and as UID 1000 with `docker run`. With `user:` or `PUID`/`PGID`, add `--user 1001:1001` to `docker run`; whatever a command run as root prepares for the next start (a move, a restore), Flowplan hands over to `PUID:PGID` itself at start.

### Roll out automatically

Coolify does not watch the registry itself. The repositories' image workflows therefore trigger a deployment through the Coolify API after pushing a new image (`POST /api/v1/deploy?uuid=…` with an API token). Coolify's built-in GitHub webhook does not fit: it builds from source and fires on the push, before the image is ready.

1. In Coolify, turn on API access under **Settings** (and allow the CI runner's address if needed).
2. Under **Keys & Tokens → API tokens**, create a token with the *deploy* permission.
3. In the resource under **Webhooks**, copy the *Deploy Webhook* address, e.g. `https://coolify.example.com/api/v1/deploy?uuid=…&force=false`.
4. In the GitHub repository under **Settings → Secrets and variables → Actions**, create two secrets: `COOLIFY_WEBHOOK` (the address) and `COOLIFY_TOKEN` (the token).

| Repository | Image in Coolify | Rolled out on |
| --- | --- | --- |
| flowplan | `ghcr.io/yannicschuller/flowplan:beta` (or `:latest` without automation) | every manual build (**Actions → Docker image → Run workflow**) and every release newer than the current beta |
| flowplan-website | `ghcr.io/yannicschuller/flowplan-website:latest` | every push to `main` |
| flowplan-docs | `ghcr.io/yannicschuller/flowplan-docs:latest` | every push to `main` |

Pull requests and Dependabot never deploy; without the secrets (in forks, for example) the step is skipped. If Coolify does not pull the new image on deploy, set `pull_policy: always` in the compose file.

> [!WARNING]
> Keep the number of instances at 1 in Coolify. Several containers would write to the same SQLite file.

## Pangolin, Traefik and other proxies

- `APP_URL` must exactly match the address under which Flowplan appears in the browser.
- If TLS ends at the front proxy (such as Pangolin) and it passes on to Traefik, **turn off TLS to the target** there and set a **custom host header** with the Flowplan domain – otherwise Traefik finds no route and answers with 404.
- Large uploads: content archives can be up to 2 GB, [AFFiNE workspace files](/migrate#from-affine) as large as the import limit (largest upload, at least 100 MB, or `FLOWPLAN_IMPORT_MAX_MB`). Traefik does not limit the request size by itself – only a `buffering` middleware of your own with `maxRequestBodyBytes` does; it then has to be at least that large. nginx needs `client_max_body_size` (the example below allows 2 GB; the default is just 1 MB), Caddy only limits with `request_body { max_size … }`. Cloudflare (proxied) lets at most 100 MB per request through on the Free and Pro plans – import larger AFFiNE files through a route without the Cloudflare proxy. Flowplan takes large imports as a stream and writes them to disk; the request must state its size (`Content-Length`), which browsers always do.
- Timeouts: exporting and importing large archives can take minutes; raise proxy timeouts if needed.
- Server-sent events (live editing in documents, live cursors on whiteboards) must not be buffered; nginx: `proxy_buffering off` (see the example below). Flowplan also sends `X-Accel-Buffering: no` for this.
- Client address: the proxy must set `X-Forwarded-For` (Traefik and Caddy do so by default, nginx needs the line from the example). Only then does Flowplan limit sign-in attempts, demo starts and anonymous form answers per address. Without the header only the limits per account and per link apply, and the log shows a note on the first request. `FLOWPLAN_TRUSTED_PROXIES` names the number of proxies ([Configuration](/en/configuration)).

### nginx

```nginx
server {
  server_name flowplan.example.com;
  client_max_body_size 2g;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_buffering off;
    proxy_read_timeout 600s;
  }
}
```

### Caddy

```
flowplan.example.com {
  reverse_proxy 127.0.0.1:3000
}
```

Never expose the internal port `3000` publicly as well.

## Custom domains for publications

With **Custom domains for publications** under **Administration → Extensions & domains**, owners show published pages under their domain ([Sharing and publishing](/sharing#custom-domain)). Flowplan recognises the domain by the `Host` header and serves only the publication. The certificate stays the reverse proxy's job; it must pass requests for any host on to Flowplan and keep the `Host` unchanged.

Flowplan answers `GET /api/domains/allowed?domain=<host>` with 200 for verified domains of active publications and with 404 otherwise – exactly the question Caddy asks before a new certificate.

### Caddy with on-demand TLS

```
{
  on_demand_tls {
    ask http://127.0.0.1:3000/api/domains/allowed
  }
}

flowplan.example.com {
  reverse_proxy 127.0.0.1:3000
}

# Every other host: a certificate only when Flowplan knows the domain.
https:// {
  tls {
    on_demand
  }
  reverse_proxy 127.0.0.1:3000
}
```

Caddy fetches the certificate on the first request for the domain. Domains Flowplan has not verified get none – so nobody can trigger certificates for other people's names.

### Traefik

Traefik does not ask before issuing a certificate. Add a router per domain (file provider or labels) – after the domain is verified in Flowplan:

```yaml
http:
  routers:
    flowplan-docs-example:
      rule: Host(`docs.example.org`)
      service: flowplan
      tls:
        certResolver: letsencrypt
  services:
    flowplan:
      loadBalancer:
        servers:
          - url: http://flowplan:3000
```

Verification does not depend on the router: Flowplan only checks the TXT record `_flowplan-verify.<host>`.

### Coolify

In Coolify add the extra domain to the **Domains** field of the Flowplan resource (comma-separated, e.g. `https://flowplan.example.com,https://docs.example.org`) and redeploy. Coolify creates the router and certificate for Traefik. `APP_URL` stays the address of the app.

### Security

- Under a custom domain Flowplan only answers the publication's read access, its files and the interface's static files. Sign-in, app and API answer with 404 – also when someone forges the `Host` header.
- Cookies and `Authorization` headers are dropped there, and Flowplan never sets a cookie.
- The pages carry `frame-ancestors 'none'` and `X-Frame-Options: DENY`.
- An entry for the instance's own address is not possible.
- A domain is verified only by the DNS TXT record `_flowplan-verify.<host>` – a domain already pointing at the instance is not enough. Unverified entries expire after 7 days, so nobody can block someone else's domain for good.
