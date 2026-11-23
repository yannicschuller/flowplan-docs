---
keywords: coolify, reverse proxy, nginx, traefik, caddy, https, volume
new: checklist 2026-11-18
---

# Coolify and reverse proxies

Flowplan only needs an HTTPS proxy in front of it. WebSockets are not needed: collaboration runs over normal HTTP requests and server-sent events.

## Coolify

::: steps

1. Choose **New resource → Docker Image** (`ghcr.io/yannicschuller/flowplan:latest`) or **Dockerfile** from the Git repository.
2. **Ports Exposes**: `3000`.
3. Enter the domain, e.g. `https://flowplan.example.com`. Coolify gets the certificate via Traefik.
4. **Persistent Storage**: a volume with the target `/app/data`.
5. Set the environment variables from the [configuration](/configuration).
6. Deploy. After about 20 seconds the health check reports the container as healthy.

:::

### Checklist

Before an instance goes into regular use, check the resource's settings:

- **Health check** on, port `3000`, path `/api/health` ([Health check](#health-check)).
- **Restart policy** left at Coolify's default (`unless-stopped`): the container comes back after a crash and after **Restart now** in the administration. For **Max restart count**, check the field's tooltip in Coolify for what `0` means there.
- With SQLite: **Container naming** set to **Consistent name (no rolling updates)** plus a **Custom container name** ([Roll out SQLite without overlap](#roll-out-sqlite-without-overlap)).
- **Stop grace period** 30 seconds or more, so Flowplan and Litestream end cleanly.
- A **memory limit** with room for Litestream next to the app – or, without a limit, enough free memory on the host ([Sizing](/sizing), [when the host runs out](/troubleshooting#restarts-without-an-error)).
- Beta and production as **separate resources**, rolled out by `COOLIFY_BETA_WEBHOOK` and `COOLIFY_WEBHOOK` ([Roll out automatically](#roll-out-automatically)).
- The beta instance with its **own volume** and its own bucket or `S3_PREFIX` – never the production volume.

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

Flowplan runs as UID 1000 (the user `node`) by default. A new Docker volume gets the permissions automatically. For a mounted host folder that belongs to someone else, set `PUID` and `PGID` – as with the linuxserver.io images, no `user:` needed:

```yaml
services:
  flowplan:
    image: ghcr.io/yannicschuller/flowplan:latest
    environment:
      PUID: "1001"
      PGID: "1001"
    volumes:
      - /path/to/flowplan-data:/app/data
```

At start, before anything else, Flowplan gives the data folder to `PUID:PGID` and then runs the app as that user – never as root. `chown` only runs while the folder or something directly in it still belongs to someone else – so once, not on every start. Without a value, `PGID` equals `PUID`; both must be numbers greater than 0 (`0` is refused). Without `PUID`/`PGID`, Flowplan runs as UID 1000 and hands the folder to it the same way.

**Alternatively, Docker's own `user:`** – Flowplan then runs as that user from the start and changes no owners; the folder must already belong to it. Any UID/GID works, also one without an entry in the image's `/etc/passwd`. Kubernetes (`runAsUser`, the [Helm chart](/installation#kubernetes-helm)) works this way.

```yaml
services:
  flowplan:
    image: ghcr.io/yannicschuller/flowplan:latest
    user: "1001:1001"          # or "${UID}:${GID}", with UID and GID in .env
    volumes:
      - /path/to/flowplan-data:/app/data
```

With `user:`, `PUID`/`PGID` have no effect; Flowplan says so in one line at start. Or give the folder to UID 1000 instead: `sudo chown -R 1000:1000 /path/to/flowplan-data`. If nothing fits, the start stops with "Flowplan cannot write to its data folder …".

**Commands in the container** (`docker exec`, `docker compose exec`/`run`, `docker run … node …`) run as root without `user:`. Flowplan's own tools – `/app/move.mjs`, `/app/decrypt.mjs`, `/app/scripts/db-*.mjs` – switch to `PUID:PGID` (default 1000:1000) by themselves before they write anything. For any other command that writes into the data folder, add the user: `docker compose exec -u 1001:1001 flowplan …` (`-u 1000:1000` without `PUID`). Whatever a command run as root leaves directly in the data folder, Flowplan hands over at the next start.

### Roll out automatically

Coolify does not watch the registry itself. The repositories' image workflows therefore trigger a deployment through the Coolify API after pushing a new image (`POST /api/v1/deploy?uuid=…` with an API token). Coolify's built-in GitHub webhook does not fit: it builds from source and fires on the push, before the image is ready.

::: steps

1. In Coolify, turn on API access under **Settings** (and allow the CI runner's address if needed).
2. Under **Keys & Tokens → API tokens**, create a token with the *deploy* permission.
3. In the resource under **Webhooks**, copy the *Deploy Webhook* address, e.g. `https://coolify.example.com/api/v1/deploy?uuid=…&force=false`.
4. In the GitHub repository under **Settings → Secrets and variables → Actions**, create the secrets `COOLIFY_WEBHOOK` (the address) and `COOLIFY_TOKEN` (the token). For a second instance of the flowplan repository that follows `:beta`, add its address as `COOLIFY_BETA_WEBHOOK`; `COOLIFY_WEBHOOK` is then the instance on `:latest`.

:::

| Repository | Image in Coolify | Rolled out on |
| --- | --- | --- |
| flowplan, beta instance (`COOLIFY_BETA_WEBHOOK`) | `ghcr.io/yannicschuller/flowplan:beta` | every beta build (**Actions → Docker image → Run workflow**) |
| flowplan, production instance (`COOLIFY_WEBHOOK`) | `ghcr.io/yannicschuller/flowplan:latest` | every release |
| flowplan-website | `ghcr.io/yannicschuller/flowplan-website:latest` | every push to `main`, once CI has passed and the new image serves its pages |
| flowplan-docs | `ghcr.io/yannicschuller/flowplan-docs:latest` | every push to `main`, once CI has passed and the new image serves its pages |

Pull requests and Dependabot never deploy; without the secrets (in forks, for example) the step is skipped. If Coolify does not pull the new image on deploy, set `pull_policy: always` in the compose file.

> [!WARNING]
> Keep the number of instances at 1 in Coolify. Several containers would write to the same SQLite file.

### A beta instance that tests replication {since=0.11.0}

A beta instance without S3 never runs Litestream – its replication, the [self-healing](/restore#repair-the-litestream-state) and the bucket reset are then first exercised on production. To test them with every `:beta`, give the beta instance replication of its own:

::: steps

1. At your S3 provider, create a **separate bucket** for the beta instance (e.g. `flowplan-beta`) and an access key that may only use that bucket. A separate bucket is safest: a reset of the beta replica can never touch production. If you can only use one bucket, give the beta instance at least its own `S3_PREFIX` (e.g. `flowplan-beta`) – never the prefix of production.
2. In Coolify, in the beta resource's environment variables, set `S3_BUCKET`, `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` and `S3_PREFIX` for that bucket. Its data volume stays its own, too.
3. Deploy. The log shows Litestream restoring (an empty bucket: nothing to restore) and then replicating; **Administration → Monitoring** shows the replica's state.

:::

Files uploaded on the beta instance then go to the beta bucket as well. Delete the bucket when you no longer need the beta instance.

### Roll out SQLite without overlap {since=0.10.0}

With SQLite (no `DATABASE_URL`), only **one** Flowplan container may run on a data volume at any time – not even for the seconds of an update. If a deployment starts the new container while the old one still runs (a rolling update that waits for the new one's health check), two Litestream processes work on the same database. That damages the replication state in `.flowplan.sqlite-litestream`: the log first shows `sync error … rename …ltx.tmp …: no such file or directory`, then every 30 seconds `compaction failed … file checksum mismatch`. How to repair it is under [Repair the Litestream state](/restore#repair-the-litestream-state).

So avoid:

- a rollout that starts the new container before the old one has stopped – roll out with **stop first, then start**;
- more than one instance, replica or copy of the resource on the same volume (a second resource, for `:beta` for example, needs its **own** volume and its own `S3_PREFIX`);
- `docker compose up` under a second project name on the same volume, or an extra `docker run … -v flowplan-data:/app/data`, while the instance runs.

**In Coolify:** in the resource's settings, section **Container**, set **Container naming** to **Consistent name (no rolling updates)** and give it a **Custom container name** (e.g. `flowplan-production`), then deploy once. Coolify then stops the old container before it starts the new one; an update interrupts Flowplan for a few seconds. Keep the health check on and the **Stop grace period** at 30 seconds or more, so Flowplan and Litestream end cleanly.

If you need updates without interruption, use [PostgreSQL](/postgresql) – an update may overlap briefly there – or [cluster mode](/cluster).

**The safety net:** every container takes an exclusive lock on `/app/data/.flowplan.lock` (`flock`) when it starts and holds it while it runs. If a second container finds the lock taken, it

- starts the app anyway, so that a rolling update's health check passes and the old container gets stopped;
- starts **no** second Litestream and no restore from the bucket; a pending instance restore (and a database that does not exist yet, which the other container may be restoring right now) waits completely before the app starts;
- logs `ANOTHER CONTAINER IS USING THE DATA FOLDER …`;
- starts replication by itself as soon as the other container has stopped and the lock is free. If that Litestream crashes, the app keeps running and Flowplan restarts it after `FLOWPLAN_LITESTREAM_RESTART_SECONDS` seconds (default 5) – twice as late with each further crash, after 300 seconds at most.

While it waits, **Administration → Monitoring** shows the warning “A second Flowplan container (*host*) has been using the same data folder since *time* …” on both containers (on the waiting one: “This container … has been waiting …”). It ends once only one container runs. The net prevents the damaged state, but it does not replace a rollout without overlap: for the time of the overlap, two apps write to the same file. The lock needs a file system with `flock` – a local Docker volume or a local folder, not SMB.

## Pangolin, Traefik and other proxies

- `APP_URL` must exactly match the address under which Flowplan appears in the browser.
- If TLS ends at the front proxy (such as Pangolin) and it passes on to Traefik, **turn off TLS to the target** there and set a **custom host header** with the Flowplan domain – otherwise Traefik finds no route and answers with 404.
- Large uploads: files up to 10 GB (see [Uploading large files](#uploading-large-files)), content archives up to 2 GB, [AFFiNE workspace files](/migrate-affine) as large as the import limit (largest upload, at least 100 MB, at most 1024 MB, or `FLOWPLAN_IMPORT_MAX_MB`). Traefik does not limit the request size by itself – only a `buffering` middleware of your own with `maxRequestBodyBytes` does; it then has to be at least that large. nginx needs `client_max_body_size` (the example below allows 10 GB; the default is just 1 MB), Caddy only limits with `request_body { max_size … }`. Cloudflare (proxied) lets at most 100 MB per request through on the Free and Pro plans – import larger AFFiNE files through a route without the Cloudflare proxy. Flowplan takes large imports as a stream and writes them to disk; the request must state its size (`Content-Length`), which browsers always do.
- Timeouts: exporting and importing large archives can take minutes; raise proxy timeouts if needed.
- Server-sent events (live editing in documents, live cursors on whiteboards, updates of the sidebar and the inbox through `/api/live`) must not be buffered; nginx: `proxy_buffering off` (see the example below). Flowplan also sends `X-Accel-Buffering: no` for this.
- Client address: the proxy must set `X-Forwarded-For` (Traefik and Caddy do so by default, nginx needs the line from the example). Only then does Flowplan limit sign-in attempts, demo starts and anonymous form answers per address. Without the header only the limits per account and per link apply, and the log shows a note on the first request. `FLOWPLAN_TRUSTED_PROXIES` names the number of proxies ([Configuration](/en/configuration)).

### Uploading large files {since=0.11.3}

The **largest upload** ([Limits & retention](/en/administration#limits-retention)) may be up to 10240 MB (10 GB). Flowplan writes an uploaded file straight to disk as it arrives and puts it into the [S3 bucket](/en/storage-and-backups) in parts; memory does not grow with it. For a file that large to arrive, every hop in front has to play along:

- **Size:** the proxy must let requests of that size through – nginx `client_max_body_size 10g;`, Caddy without a `request_body` limit, Traefik without a `buffering` middleware (or with `maxRequestBodyBytes` at least that large). In the [Helm chart](/en/kubernetes) raise `ingress.bodySize` (default 110 MB), e.g. to `10g`.
- **Time:** a 10 GB upload takes almost half an hour at 50 Mbit/s. Depending on the version, Traefik aborts requests that have not arrived completely within 60 seconds (`readTimeout`) – in **Coolify** too. If a large upload stops after about a minute, this is why. There, under **Servers → Proxy**, add the lines `--entrypoints.http.transport.respondingTimeouts.readTimeout=0` and `--entrypoints.https.transport.respondingTimeouts.readTimeout=0` (or e.g. `=6h`) to the configuration and restart the proxy. nginx needs `proxy_request_buffering off;` (otherwise nginx first writes the whole file to its own disk) and a generous `client_body_timeout`; Caddy does not limit the duration. Inside the container `FLOWPLAN_REQUEST_TIMEOUT` applies (default 6 hours, [Configuration](/en/configuration)).
- **Cloudflare** (proxied) lets at most 100 MB per request through on the Free and Pro plans, 200 MB on Business, 500 MB on Enterprise. Larger files only go through a route without the Cloudflare proxy.
- **Space:** while it is uploaded, the file lies in `uploads/.incoming` in the data directory; Flowplan removes what an aborted upload left after a day.

What reads a file into memory as a whole keeps its own limit of 1 GB per file: files in a Flowplan archive, Anki packages, attachments from the Notion and BookStack imports, pictures in whiteboard imports and the [AFFiNE workspace file](/migrate-affine). Photos, voice memos and PDFs from the apps (sharing, widgets, quick capture) are limited to 100 MB per request.

### nginx

```nginx
server {
  server_name flowplan.example.com;
  client_max_body_size 10g;
  client_body_timeout 300s;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_buffering off;
    proxy_request_buffering off;
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
