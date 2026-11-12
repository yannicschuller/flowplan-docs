---
keywords: sizing, ram, cpu, disk space, number of users, hardware
---

# Sizing

How many people a Flowplan instance carries, what runs out first and what hardware to plan for small, medium and large teams – based on the load tests.

## Active people, not accounts

What matters is not how many accounts an instance has, but how many people work **at the same moment**: opening pages, typing, searching, changing records. An account that is doing nothing costs the server nothing.

The figures below count **active people** the way the load test simulates them: each sends a request every 1.5 seconds on average, or types continuously in a shared document. Real people read, think and switch to other apps – they create far less load. So the figures are a cautious limit: an instance that carries 20 such people copes with noticeably more real people signed in at the same time.

The administration shows how many are active at once on your instance: **people active now** on the overview and the **Active people** per hour chart under **Administration → Monitoring** (see [Operations](/en/monitoring#administration-monitoring)). Take the peaks, not the average.

## What one instance carries

Measured up to the first load step where things slow down: 95 % of reading requests above 500 ms, of writing requests above 1 s, or more than 1 % errors. "Carries" is the step before.

| Setup | Carries about | Note |
| --- | ---: | --- |
| Single container with SQLite | 20 active people | One process, no other services |
| PostgreSQL, 1 instance with one dedicated core | 30 active people | Beyond that, read times rise steeply |
| PostgreSQL, 2 instances with one core each (cluster) | 40–50 active people | Still error-free at 60, but slow |

The **rule of thumb** for planning: **25–30 active people per instance with one dedicated CPU core.** For more people, add instances in [cluster mode](/en/cluster) – this grows roughly linearly as long as PostgreSQL has headroom. An instance does its main work essentially on one core (Node.js); more cores per instance mostly help side work such as text recognition, more instances help with more people.

Measured on 4 vCPU (Intel Xeon, 2.1 GHz) with 16 GB RAM, PostgreSQL 16 and Redis 7 on the same machine. On a server running nothing else, and with faster cores, the figures are higher.

## What runs out first

- **The instance's CPU** – on reads: loading the sidebar with its permission checks page by page, opening large databases (all records) and search. These requests slow down first.
- **Writes and live editing stay fast for long.** At 60 active people on two instances, document changes (95 %) went through in 182 ms, and one person's change reached co-editors on the other instance through Redis in 195 ms.
- **PostgreSQL** was not the bottleneck in the test: writing requests stayed below 500 ms everywhere.

How you notice it in production: under **Administration → Monitoring** the response time (p95) rises, one core of the instance runs at full load all the time, and the **System** section shows connections "waiting".

## Recommendations

Guide values for people active at the same time at peak. Plan memory generously for imports, exports and text recognition of scanned PDFs.

| | Small | Medium | Large |
| --- | --- | --- | --- |
| Active at the same time | up to about 20 | about 20–60 | more than 60 |
| Setup | one container with SQLite | [PostgreSQL](/en/postgresql), one container – from about 30 active people, or for updates without downtime, a [cluster](/en/cluster) of 2–3 instances | cluster with one instance per 25 active people, plus a spare |
| Flowplan | 2 vCPU, 2–4 GB RAM | 1–2 vCPU, 2 GB RAM per instance | 1–2 vCPU, 2 GB RAM per instance |
| Database | SQLite on a local SSD (no NFS) | PostgreSQL with 2 vCPU, 4 GB RAM, SSD | PostgreSQL with 4+ vCPU, 8+ GB RAM, SSD, own server or managed service |
| Other services | optional S3 | in a cluster: Redis (small, no persistence), S3 | Redis, S3 |

**Database connections:** set `FLOWPLAN_PG_POOL` to 10–20 per instance, and PostgreSQL's `max_connections` to at least `instances × (FLOWPLAN_PG_POOL + 2)` plus a reserve. Example: 4 instances with pool 20 need 88 connections; with a reserve, `max_connections=150` fits.

**Plan a spare:** in a cluster, run at least one instance more than the load needs – during an update or when a node fails, the others carry on.

## Measure it yourself

The load tests are in the source code under [`scripts/loadtest`](https://github.com/yannicschuller/flowplan/blob/main/scripts/loadtest/README.md): for a single container and for cluster mode (`scripts/load-test-cluster.mjs`, 1, 2 … instances against PostgreSQL and Redis). A measurement on the hardware Flowplan will run on tells you the most.

> [!WARNING]
> Never measure against an instance people use: the test creates hundreds of accounts, pages and thousands of records and slows the instance down for everyone. Use a fresh, separate instance and delete it afterwards.
