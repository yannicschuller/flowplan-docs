# Cluster mode

In cluster mode, several Flowplan instances serve one installation: one PostgreSQL database, one Redis, one S3 bucket and any number of instances behind a load balancer – for more people active at the same time and updates without downtime.

## Do you need it?

Most teams do not: a single container carries about 20 simultaneously active people with SQLite and about 30 with PostgreSQL (see [Sizing](/en/sizing)). Cluster mode pays off when more people regularly work at the same time, or when Flowplan should keep running through updates and the loss of a server. In return it brings three services you have to run (or rent) and back up.

## Requirements

Switch it on with `FLOWPLAN_CLUSTER=1`. Then these are required:

| What | Variable | For |
| --- | --- | --- |
| **PostgreSQL** 16+ | `DATABASE_URL=postgres://…` | All data. SQLite is a file on one host and does not work. See [PostgreSQL](/en/postgresql). |
| **Redis** (tested with 7) | `REDIS_URL=redis://…` or `rediss://…` (TLS) | Live editing, presence and rate limits between the instances. Redis does not need to persist any of it. |
| **S3 storage** | `S3_BUCKET`, `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | All files; the local `uploads/` folder is only a cache. See [Storage, S3 and backups](/en/storage-and-backups). |

If one is missing, an instance does not start and lists every problem at once in the log. `REDIS_URL` without cluster mode is ignored with a warning.

Also required, even though Flowplan does not check it at start: **keys that are identical on every instance.** A single container creates some keys itself in its data folder – in a cluster every instance has its own folder, and each would create different ones. So set the same values everywhere:

- `FLOWPLAN_ENCRYPTION_KEY` (or at least `FLOWPLAN_SECRETS_KEY`) – otherwise an instance cannot read stored secrets and signatures of the others (two-factor sign-in, AI keys, unlocked share links). See [Stored secrets](/en/configuration#stored-secrets).
- `WEB_PUSH_PUBLIC_KEY` and `WEB_PUSH_PRIVATE_KEY` – otherwise push subscriptions only match one instance. See [Push notifications](/en/configuration#push-notifications).

Coming from a single container without these variables, take the values from its data folder: the content of `secrets.key` as `FLOWPLAN_SECRETS_KEY`, and `publicKey`/`privateKey` from `web-push-keys.json` as `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`.

## What the instances share

- **Live editing and presence:** changes to documents, records and whiteboards, cursors and "who is here" reach every instance through Redis. Two people on different instances work together as on one. The data itself is in PostgreSQL; if a message is lost, the browser catches up on its next sync. **No sticky sessions are needed.**
- **Rate limits:** limits such as those for AI requests count across all instances (through Redis). Limits already kept in the database (failed sign-ins, demos, MCP) applied to all of them anyway.
- **Leader-only jobs:** exactly one instance leads at any time (elected through a lock in PostgreSQL). Only it runs the timed jobs: reminders, automations, page reviews, the search indexer, text extraction from files, cleanup and retention, digests, scheduled backups and Markdown exports, LDAP, calendar and issue sync, inbound e-mail, Telegram, AI background work and the monitoring alerts. If it fails, another one takes over within seconds.
- **Queues:** every instance sends e-mails, push messages, webhooks and chat-app messages; each message is taken by exactly one instance.
- **Files:** an uploaded file first lands in the cache of the instance that received it, which uploads it to the bucket right away (usually well under a second). Other instances fetch it from the bucket when needed and wait up to 5 seconds for it.

## Health, readiness and shutdown

| Address | Answers | Meant for |
| --- | --- | --- |
| `/api/health/live` | `200` as long as the process answers – no database check, since a restart does not fix a database outage | Liveness probe |
| `/api/health/ready` | `200` when the database, Redis and the bucket answer; `503` otherwise and while shutting down | Readiness probe, load balancer |
| `/api/health` | as before, see [Health check](/en/operations#health-check) | Docker health check, apps |

Without a token, `/api/health/ready` only answers `ok`/`error` per check; with `FLOWPLAN_METRICS_TOKEN` as a bearer token, response times and error messages are added.

`FLOWPLAN_READY_REQUIRE` decides which checks count for readiness – a list of `database`, `redis` and `objectStorage`, by default all three. The database always counts. If Redis fails, the default turns every instance "not ready" at once and the load balancer has nothing left. With `FLOWPLAN_READY_REQUIRE=database,objectStorage` they stay ready: editing and saving keep working, only live changes between instances arrive on the next sync, and each instance counts rate limits on its own.

**Shutdown:** on `SIGTERM` the instance immediately answers `503` on `/api/health/ready`, closes its live connections (browsers reconnect through the load balancer to another instance), finishes open requests, hands over the lead and signs off from the others. Give it 30 seconds for this (`stop_grace_period`, `terminationGracePeriodSeconds`).

## Schema before the start

Each instance brings the database schema up to its version on start (under a lock; they wait for each other). Cleaner is a separate step before the instances start, which fails loudly:

```bash
DATABASE_URL=postgres://… node /app/scripts/db-schema.mjs
```

Then set `FLOWPLAN_PG_SCHEMA_AUTO=off` for the instances. The Docker Compose example and the Helm chart work this way. The schema is only extended, never shrunk: during a rolling update, old and new instances run side by side.

## Docker Compose

A complete example lives in [`deploy/compose/cluster`](https://github.com/yannicschuller/flowplan/tree/main/deploy/compose/cluster): PostgreSQL 16, Redis 7 with a password and without persistence, MinIO as S3 including bucket creation, the schema step, two Flowplan instances and Caddy as load balancer. It is meant for trying things out on one host and as a starting point; in production, run the database, Redis and storage as separate, backed-up services.

```bash
git clone https://github.com/yannicschuller/flowplan.git
cd flowplan/deploy/compose/cluster
cp .env.example .env    # replace every "change-me" value
docker compose up -d
```

In it:

- `.env` holds `APP_URL`, `FLOWPLAN_SETUP_TOKEN` and the passwords for PostgreSQL, Redis and MinIO – placeholders only, to be replaced. Add `FLOWPLAN_ENCRYPTION_KEY` (commented out in the example) as well as `WEB_PUSH_PUBLIC_KEY` and `WEB_PUSH_PRIVATE_KEY` (see [Requirements](#requirements)).
- The `schema` service runs once before the instances (`node /app/scripts/db-schema.mjs`); the instances have `FLOWPLAN_PG_SCHEMA_AUTO=off`.
- `flowplan-1` and `flowplan-2` each have their own volume as a cache, `FLOWPLAN_PG_POOL=20` and a health check on `/api/health/ready`. More instances: copy the `flowplan-2` service and add it to the `Caddyfile`.
- Caddy distributes round robin over ready instances (health check on `/api/health/ready`) and passes live connections through unbuffered (`flush_interval -1`). For HTTPS, replace `:8080` in the `Caddyfile` with your host name.
- PostgreSQL runs with `max_connections=200`.

Another load balancer (nginx, Traefik, HAProxy) needs the same: health check on `/api/health/ready`, no buffering for server-sent events (`/api/documents/live` and the cursor channels), long read timeouts, uploads up to 110 MB and `FLOWPLAN_TRUSTED_PROXIES` matching the number of proxies.

## Kubernetes (Helm)

The chart in [`deploy/helm/flowplan`](https://github.com/yannicschuller/flowplan/tree/main/deploy/helm/flowplan) has cluster mode built in (`cluster.enabled=true`). It does not create PostgreSQL, Redis or S3 – use managed services or their own charts. The connection addresses live only in Secrets you create yourself:

```bash
kubectl create namespace flowplan
kubectl -n flowplan create secret generic flowplan-cluster \
  --from-literal=DATABASE_URL='postgres://flowplan:<password>@postgres:5432/flowplan' \
  --from-literal=REDIS_URL='redis://:<password>@redis-master:6379/0'
kubectl -n flowplan create secret generic flowplan-env \
  --from-literal=S3_ACCESS_KEY_ID='<key-id>' \
  --from-literal=S3_SECRET_ACCESS_KEY='<secret>' \
  --from-literal=FLOWPLAN_ENCRYPTION_KEY="$(openssl rand -base64 32)" \
  --from-literal=WEB_PUSH_PUBLIC_KEY='<public VAPID key>' \
  --from-literal=WEB_PUSH_PRIVATE_KEY='<private VAPID key>'

helm install flowplan deploy/helm/flowplan -n flowplan \
  --set appUrl=https://flowplan.example.org \
  --set existingSecret=flowplan-env \
  --set cluster.enabled=true \
  --set cluster.replicas=3 \
  --set cluster.database.existingSecret=flowplan-cluster \
  --set cluster.redis.existingSecret=flowplan-cluster \
  --set s3.bucket=flowplan --set s3.endpoint=https://s3.example.org
```

A VAPID key pair comes from e.g. `npx web-push generate-vapid-keys`. What the chart does in cluster mode:

- **Schema job** as a `pre-install`/`pre-upgrade` hook (`node /app/scripts/db-schema.mjs`) before pods of a new version start. Without it (`cluster.migration.enabled=false`) the pods do it on start.
- **Rolling updates** without downtime (`maxUnavailable: 0`), a **PodDisruptionBudget** (`cluster.podDisruptionBudget.minAvailable`, default 1) and pods spread over nodes where possible.
- **Probes:** liveness on `/api/health/live`, readiness on `/api/health/ready`; before stopping, a pod waits `cluster.preStopSeconds` (5) so the load balancer takes it out.
- **No volume:** `/app/data` is an `emptyDir` per pod (`cluster.cacheSizeLimit`, 5 Gi); files live in the bucket, backups come from PostgreSQL (`pg_dump`).
- **Connections:** `cluster.poolSize` (10) per pod plus two of its own; `replicas × (poolSize + 2)` must stay below the server's `max_connections`.
- The chart refuses to install if the database, Redis or bucket is missing.

With ingress-nginx, set the annotations `nginx.ingress.kubernetes.io/proxy-buffering: "off"` and `nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"` for live connections, and `nginx.ingress.kubernetes.io/proxy-body-size: 110m` for uploads. The chart's README explains every value.

## Administration → Monitoring → System

The **System** section under **Administration → Monitoring** shows how the installation runs:

- **Mode** (single container, or cluster with the number of instances), **Database** with version and reachability,
- **Connections of this instance** (open, idle, waiting) and the **Timeouts**,
- **Redis** with version and messages sent, received and failed, **Object storage** with bucket and reachability,
- the **Leader** and since when it leads,
- the **Shared queues** (files, mail, push, webhooks, chat apps),
- in a cluster, a table of all **Instances** with their state (leader, ready, stopping), busy and waiting connections, memory and last heartbeat. An instance silent for 30 seconds drops off the list.

"Waiting" connections mean requests are waiting for a free database connection – raise `FLOWPLAN_PG_POOL` or add instances.

## More variables

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_CLUSTER` | *empty* | `1` (or `true`, `on`) switches cluster mode on. Equivalent: `FLOWPLAN_MODE=cluster`. |
| `REDIS_URL` | *empty* | `redis://:<password>@host:6379/0`, with TLS `rediss://…`. User, password and database number go into the address. |
| `FLOWPLAN_READY_REQUIRE` | `database,redis,objectStorage` | Checks that decide `/api/health/ready` (above). |
| `FLOWPLAN_INSTANCE_ID` | host name + random | Name of the instance in the overview and in the `application_name` of its database connections. The Helm chart uses the pod name. |
| `FLOWPLAN_REDIS_PREFIX` | `flowplan:` | Prefix for keys and channels when several installations share one Redis. |
| `FLOWPLAN_LEADER_INTERVAL` | `5000` | How often (ms) instances check the lead; decides how fast a failed leader is replaced. |

## Known limits

- **Files are uploaded by the instance that received them.** Until then – normally well under a second – other instances wait up to 5 seconds. A few paths read the local folder directly (exports and archives, some importers, copies when publishing) and can still miss a file just uploaded on another instance. If an instance fails before uploading, the file is lost.
- **Restores and instance moves with one instance.** An uploaded backup sits in the cache of the instance that received it and is only applied once that instance leads. Applying it replaces every table in one transaction; requests from other instances wait meanwhile and fail after `FLOWPLAN_PG_LOCK_TIMEOUT`. On Kubernetes, an `emptyDir` is lost on restart. So scale down to **one instance** first (`cluster.replicas=1`, or only `flowplan-1`), restore, then scale up again. The same goes for the [move tool](/en/move-instance).
- **Redis is a single point:** if it fails, editing and saving keep working, but live changes between instances only arrive on the next sync, each instance counts rate limits on its own, and with the default `FLOWPLAN_READY_REQUIRE` every instance turns "not ready" (above).
- **No Redis Sentinel and no Redis Cluster:** Flowplan talks to exactly one Redis address. A managed Redis with a stable address works.
- **Per instance** remain the progress displays of restores and moves and the search indexer's backlog figures.

## Next

- [Sizing](/en/sizing): how many instances and what hardware.
- [Switching the database](/en/database-migration): bring an existing instance to PostgreSQL. For a cluster, first turn on S3 in the single container and wait until every file is in the bucket (**Administration → Storage & backup**, or `objectStorage.pending` at `0` in [`/api/health`](/en/operations#health-check)).
