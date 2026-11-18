---
keywords: high availability, failover, redundancy, active/passive, load balancer, hetzner, uptime
---

# High availability

Keep Flowplan running when a server fails or is updated: active/passive with a standby server, or active/active in cluster mode – with a complete example at Hetzner.

## Two ways

| | Active/passive | Active/active ([cluster mode](/en/cluster)) |
| --- | --- | --- |
| What runs | two servers, Flowplan runs on only one at a time | two or more instances at once behind a load balancer |
| A server fails | you start Flowplan on the other one (minutes) | the other instances keep working (seconds) |
| Updates | a short interruption while it restarts | no interruption, one instance after the other |
| Database | SQLite with Litestream, or PostgreSQL | PostgreSQL |
| Other services | S3 (or a volume you can move) | PostgreSQL, Redis and S3 |
| More people | no, one instance carries everyone | yes, about 25–30 active people per instance ([Sizing](/en/sizing)) |

For most teams **active/passive** is the better start: little new to run, and an outage costs minutes instead of hours. The cluster pays off when updates should not interrupt at all, or when one instance is no longer enough.

## What both need

- **Files on more than one server:** an S3 bucket ([Storage, S3 and backups](/en/storage-and-backups)). Required in a cluster, the simplest way for active/passive; otherwise a volume you can attach to the other server (for SQLite never a network share such as NFS).
- **The same keys as variables** on every server: `FLOWPLAN_ENCRYPTION_KEY` (or `FLOWPLAN_SECRETS_KEY`) as well as `WEB_PUSH_PUBLIC_KEY` and `WEB_PUSH_PRIVATE_KEY`. Without them each instance creates its own in its data folder, and two-factor sign-in, stored secrets and push subscriptions only match one server. How to create them or take them over from an existing data folder: [Cluster mode](/en/cluster#requirements).
- **One address:** a load balancer or a floating IP in front, the same `APP_URL` everywhere and `FLOWPLAN_TRUSTED_PROXIES` matching the number of proxies.
- **The same version:** the same image tag (`FLOWPLAN_VERSION`) on every server.

## Active/passive

Two servers with the same `compose.yaml` and the same `.env`. Flowplan runs on the active one; on the passive one the container is stopped. In front sits a load balancer that checks `/api/health/ready` and sends traffic only to the running server – then nothing about the address changes when you switch. With a floating IP instead of a load balancer, you move the IP to the other server when you switch.

> [!WARNING]
> Without cluster mode only **one** instance may run at a time. Two instances run timed jobs twice (reminders, digests, backups, workflows), and live changes do not reach the other one. With SQLite and Litestream, two running instances spoil the copy in the bucket.

### With PostgreSQL

Both servers point `DATABASE_URL` at the same database and `S3_*` at the same bucket. If a second instance starts by mistake, Flowplan notices through a lock in the database: it still starts, logs a loud warning every ten minutes, and **Administration → Monitoring** shows on every instance, until only one runs: {since=0.10.0}

> "A second Flowplan instance is running against the same database without cluster mode (*instance*, since *time*). Timed jobs such as reminders, digests, backups and workflows then run twice, and live changes do not reach the other instance. Switch cluster mode on for every instance (FLOWPLAN_CLUSTER=1 with Redis and S3) or stop one of the instances. During a rolling restart this is normal for a moment."

Switching over when the active server fails:

::: steps

1. **Make sure the old server is really down:** stop the container or power the server off in your provider's console. A server that is merely unreachable may otherwise keep running.
2. On the passive server, `docker compose up -d`.
3. Wait until `/api/health/ready` answers `200`; the load balancer then sends traffic there by itself (with a floating IP: move the IP now).
4. Check under **Administration → Monitoring** that no warning about a second instance shows.

:::

Switching back works the same way. A stopped server may start again only once the other one is stopped.

### With SQLite and Litestream

The database is a file on the active server; Litestream copies every change into the bucket continuously (under `<prefix>/db/`, every second), and the files are there too. The passive server has the same `S3_*` variables and keys and an **empty** data folder. The warning about a second instance does not apply here – each instance would have a file of its own.

::: steps

1. **Stop** the old server – two Litestream processes must never write into the same folder of the bucket at once.
2. No old database may be on the passive server: Litestream restores only when `flowplan.sqlite` is missing. Empty a data folder from an earlier stint first (or take a new volume).
3. `docker compose up -d`: Litestream fetches the database from the bucket, Flowplan the files on first access.
4. Switch the address as above; afterwards empty the old server's data folder before it becomes the passive server.

:::

At most the changes of the last second before the failure, which Litestream had not copied yet, are lost. The steps match [way C of moving an instance](/en/move-instance#way-c-s3-and-litestream). Without S3 a block volume works too, which you detach from the failed server and attach to the passive one (at Hetzner: **Volumes**, within one location only) – never a network share.

**Switching automatically** (e.g. with keepalived) only with a safe way to power off the old server: after a network glitch both run otherwise.

## Active/active: cluster mode

In [cluster mode](/en/cluster) all instances run at once. They share live editing, presence, rate limits and the parallel AI answers through Redis, all data is in PostgreSQL, all files in the bucket; any instance answers imports and print views. **No sticky sessions are needed.** When an instance fails, the load balancer takes it out after the next health check, and another one takes over the timed jobs within seconds.

Two single points remain: **PostgreSQL** (see [Failover and replicas](/en/postgresql#failover-and-replicas) and [below](#postgresql)) and **Redis**. When Redis fails, everyone keeps working; only live changes between instances arrive late. Set `FLOWPLAN_READY_REQUIRE=database,objectStorage` for that – otherwise every instance reports "not ready" and the load balancer has no target left.

### Updates without downtime

One instance after the other: stop it, start the new image, wait until it is ready, then the next one. On `SIGTERM` an instance answers `503` on `/api/health/ready` at once, finishes open requests and hands on live connections and the lead (`stop_grace_period: 30s`). The new version only extends the schema, so old instances keep working with it.

So that browsers do not mix versions, every image carries a **deployment id** (`v<version>-<commit>`, fixed at build time). The app requests its files with `?dpl=<id>`, so caches on the way serve nothing stale, and when a page of the old version reaches a new instance, the browser reloads the whole page at the next navigation. Should an instance still lack a file of the other version, Flowplan's own build check heals the page. Building the image yourself, set the id with `FLOWPLAN_DEPLOYMENT_ID` (`--build-arg FLOWPLAN_DEPLOYMENT_ID=…`) – the same for every instance of one image – or switch it off with `off`. {since=0.10.0}

## Example: Hetzner Cloud

A cluster with two Flowplan servers behind the **Hetzner Load Balancer**, Redis and PostgreSQL in a private network, and files in **Hetzner Object Storage**. The files for it are in the repository under [`deploy/compose/hetzner`](https://github.com/yannicschuller/flowplan/tree/main/deploy/compose/hetzner). Names, plans and menus change – the Hetzner Console is what counts.

```text
Internet ── HTTPS ──▶ Load Balancer (public IP, certificate)
                          │  private network 10.0.0.0/16
              ┌───────────┴───────────┐
          app-1 :3000             app-2 :3000      Flowplan (FLOWPLAN_CLUSTER=1)
              └─────┬───────────┬─────┘
               redis :6379   postgres :5432        private network only
              Object Storage (S3, over HTTPS)
```

### Servers and network

All servers in the same location (e.g. Falkenstein, `fsn1`), with Ubuntu 24.04 and your SSH key.

| Server | Size | Note |
| --- | --- | --- |
| `app-1`, `app-2` | 2 vCPU, 4 GB RAM each (the smallest type of that size, Arm or x86) | each carries about 25–30 active people; more app servers for more people |
| `redis` | the smallest type | stores nothing permanently |
| `postgres` | 2 vCPU, 4 GB RAM; from about 60 active people 4 vCPU, 8 GB, ideally with dedicated vCPUs | or one of the options [below](#postgresql) |

- **Network:** under **Networks**, create a private network (e.g. `10.0.0.0/16`) and attach every server and the load balancer. Flowplan, Redis and PostgreSQL listen on their private address only.
- **Placement group:** put `app-1` and `app-2` into a **placement group** of type *spread*, so they do not run on the same physical host.
- **Firewall:** one **Cloud Firewall** for every server: inbound only TCP 22 from your address. The app servers need no public ports – the load balancer reaches them through the private network. The Cloud Firewall only applies to the public interface, so protect Redis and PostgreSQL with a password as well and bind them to the private address (Docker bypasses `ufw`).

### Object Storage

Under **Object Storage**, create a private bucket in the same location and create a key under **S3 credentials** (the secret is shown only once). Endpoint and region follow the location, e.g. `S3_ENDPOINT=https://fsn1.your-objectstorage.com` and `S3_REGION=fsn1` – use the endpoint the console shows for your bucket. With `FLOWPLAN_ENCRYPTION_KEY`, files and backups are stored there encrypted.

### PostgreSQL

| Option | The database server fails | Effort |
| --- | --- | --- |
| **One PostgreSQL server with backups** (`postgres.yaml` in the example) | Flowplan is down until the server runs again or is rebuilt from the backup | low: one server, backups as below |
| **Patroni on three small servers** with etcd, HAProxy locally on every app server | another server takes over within seconds | high: run and monitor Patroni, etcd and HAProxy |
| **Managed service** of a provider with a data centre nearby | the provider switches over | low, but the database sits outside the private network: only with TLS (`sslmode=require`) and access only from your servers' addresses |

If Hetzner offers no managed PostgreSQL in your location, pick a provider nearby – every query travels that distance. How Flowplan handles a failover and which address belongs in `DATABASE_URL` is under [Failover and replicas](/en/postgresql#failover-and-replicas). With Patroni, `DATABASE_URL` points to `127.0.0.1:5000`, where HAProxy offers only the primary.

### Redis

A small server with `redis.yaml` from the example: a password, no persistence, on the private address only. A managed Redis with a fixed address works too (`rediss://` with TLS); Redis Sentinel and Redis Cluster do not. With `FLOWPLAN_READY_REQUIRE=database,objectStorage` (as in `.env.example`), Flowplan stays ready while Redis is briefly away.

### Load balancer

Under **Load Balancers**, create a load balancer in the same location (the smallest type is enough) and attach it to the private network:

| Setting | Value |
| --- | --- |
| Targets | `app-1` and `app-2`, through the **private network** |
| Service | **HTTPS**, port 443 → destination port 3000; a certificate managed by Hetzner (Let's Encrypt; the DNS zone must be at Hetzner for that) or one you upload |
| HTTP → HTTPS | **switch the redirect on** |
| Health check | HTTP, port 3000, path `/api/health/ready`, every 5–10 seconds, timeout 5 seconds, status `200` |
| Sticky sessions | **off** – not needed |
| Proxy protocol | off |
| Algorithm | round robin or least connections |

The load balancer sets `X-Forwarded-For`, which is why `.env` has `FLOWPLAN_TRUSTED_PROXIES=1`. Live connections are server-sent events: the load balancer has to pass them through unbuffered, and Flowplan sends a heartbeat regularly so they are not closed for silence. After setting up, check that a second person's changes appear at once and that a large import (up to 100 MB) goes through. Finally point your domain's A and AAAA records at the load balancer's addresses.

### Setting up the app servers

::: steps

1. Install Docker following the [official guide](https://docs.docker.com/engine/install/ubuntu/).
2. Get the example files: `git clone https://github.com/yannicschuller/flowplan.git` and copy what is in `deploy/compose/hetzner` to `/opt/flowplan`.
3. Create the keys **once** – `openssl rand -base64 32` for `FLOWPLAN_ENCRYPTION_KEY`, `npx web-push generate-vapid-keys` for the push keys – and keep a copy apart from the backups.
4. `cp .env.example .env` and fill it in: domain, database, Redis, bucket, keys, setup token. `.env` is the same on both app servers except for `PRIVATE_IP` and `FLOWPLAN_INSTANCE_ID`.
5. `docker compose up -d` on `app-1` first, once it is ready on `app-2`; then create the first account at `https://<domain>/register?setup=<token>`.

:::

### Backups

- Switch on the **scheduled backup** under **Administration → Storage & backup**: the leading instance writes a `pg_dump` archive into the bucket under `<prefix>/backups/` daily (or hourly), encrypted with `FLOWPLAN_ENCRYPTION_KEY` ([Backups with pg_dump](/en/postgresql#backups-with-pg-dump)).
- **A second copy outside the bucket**, e.g. via [SFTP](/en/storage-and-backups#backup-via-sftp) to a Hetzner Storage Box – a fault in the bucket then does not hit both.
- **The database server** additionally with Hetzner's backups (images of the disk); with Patroni, or to restore to any point in time, WAL archiving (e.g. pgBackRest) into a bucket of its own.
- The app servers hold nothing that is not in the bucket or the database – a new server with the same `.env` replaces an old one.

### Updates

::: steps

1. Read the release notes and set `FLOWPLAN_VERSION` in `.env` on both servers to the new version.
2. On `app-1`: `docker compose pull && docker compose up -d`. The old instance answers `503`, the load balancer takes it out, and the new one brings the schema up to date.
3. Wait until the load balancer shows `app-1` as healthy again (or `curl http://<private IP>:3000/api/health/ready`).
4. The same on `app-2`.

:::

To be on the safe side, remove the server as a target in the load balancer before step 2 and add it back afterwards. The [deployment id](#updates-without-downtime) makes sure browsers do not mix both versions in the meantime.

## Next

- [Cluster mode](/en/cluster): every requirement and variable.
- [PostgreSQL](/en/postgresql#failover-and-replicas): failover, replicas and time limits.
- [Sizing](/en/sizing): how many instances and which hardware.
- [Kubernetes](/en/kubernetes): the same with the Helm chart.
