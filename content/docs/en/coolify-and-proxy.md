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

### Volume permissions

The container runs as UID 1000. A new Docker volume gets the permissions automatically. A mounted host folder must belong to this UID:

```bash
sudo chown -R 1000:1000 /path/to/flowplan-data
```

### Roll out automatically

Coolify does not watch the registry itself. The repositories' image workflows therefore trigger a deployment through the Coolify API after pushing a new image (`POST /api/v1/deploy?uuid=…` with an API token). Coolify's built-in GitHub webhook does not fit: it builds from source and fires on the push, before the image is ready.

1. In Coolify, turn on API access under **Settings** (and allow the CI runner's address if needed).
2. Under **Keys & Tokens → API tokens**, create a token with the *deploy* permission.
3. In the resource under **Webhooks**, copy the *Deploy Webhook* address, e.g. `https://coolify.example.com/api/v1/deploy?uuid=…&force=false`.
4. In the GitHub repository under **Settings → Secrets and variables → Actions**, create two secrets: `COOLIFY_WEBHOOK` (the address) and `COOLIFY_TOKEN` (the token).

| Repository | Image in Coolify | Rolled out on |
| --- | --- | --- |
| flowplan | `ghcr.io/yannicschuller/flowplan:beta` (or `:latest` without automation) | every manual build (**Actions → Docker image → Run workflow**) |
| flowplan-website | `ghcr.io/yannicschuller/flowplan-website:latest` | every push to `main` |
| flowplan-docs | `ghcr.io/yannicschuller/flowplan-docs:latest` | every push to `main` |

Pull requests and Dependabot never deploy; without the secrets (in forks, for example) the step is skipped. If Coolify does not pull the new image on deploy, set `pull_policy: always` in the compose file.

> [!WARNING]
> Keep the number of instances at 1 in Coolify. Several containers would write to the same SQLite file.

## Pangolin, Traefik and other proxies

- `APP_URL` must exactly match the address under which Flowplan appears in the browser.
- If TLS ends at the front proxy (such as Pangolin) and it passes on to Traefik, **turn off TLS to the target** there and set a **custom host header** with the Flowplan domain – otherwise Traefik finds no route and answers with 404.
- Large uploads: content archives can be up to 2 GB. Traefik does not limit the request size; nginx needs `client_max_body_size`, Cloudflare has its own limits.
- Timeouts: exporting and importing large archives can take minutes; raise proxy timeouts if needed.
- Server-sent events (live editing in documents, live cursors on whiteboards) must not be buffered; nginx: `proxy_buffering off` (see the example below). Flowplan also sends `X-Accel-Buffering: no` for this.

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
