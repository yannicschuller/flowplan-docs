---
keywords: troubleshooting, restart, crash, OOM, out of memory, docker inspect, dmesg, Litestream, checksum mismatch, lock, bug report, installation details, diagnostics
---

# Troubleshooting in operation

What to check when a running instance restarts without an error, Litestream reports errors or two containers share one data folder – and what belongs in a bug report.

**More on this topic:** [Operations and troubleshooting](/operations) · [Monitoring and maintenance](/monitoring) · [Storage, S3 and backups](/storage-and-backups) · [Coolify and reverse proxies](/coolify-and-proxy)

Problems during setup (sign-in, permissions, proxy) are in the [troubleshooting table](/operations#troubleshooting).

## Restarts without an error

Flowplan restarts, the log shows no error, and the users only notice a short interruption. Start with Flowplan's own record, then ask Docker and the kernel.

### In Flowplan

**Settings → Instance → Monitoring → Restarts** {since=0.10.0} lists every restart of the last 30 days with its reason (clean, crash, likely out of memory, killed without trace), the memory at the last heartbeat and, for an unexpected one, the last 200 lines of the server and Litestream log before the end, with **Download as .txt**. What the reasons mean and where their limits are is under [Restarts](/monitoring#restarts).

### With Docker

```sh
# Why the container ended last time, and how often it restarted
docker inspect --format 'OOMKilled={{.State.OOMKilled}} ExitCode={{.State.ExitCode}} RestartCount={{.RestartCount}} FinishedAt={{.State.FinishedAt}}' <container>
# The last health checks with their output
docker inspect --format '{{json .State.Health}}' <container>
# What happened to the container in the last 24 hours (die, oom, kill, health_status)
docker events --since 24h --until "$(date +%s)" --filter container=<container>
# Memory and CPU right now, against the limit
docker stats --no-stream <container>
# Whether the kernel ended a process for lack of memory
dmesg -T | grep -i oom
```

| You see | Means |
| --- | --- |
| `OOMKilled=true`, `ExitCode=137` | The container hit its own memory limit and the kernel ended it. Raise the limit or find what grows (below, [Litestream](#litestream)). |
| `ExitCode=137` without OOM | `SIGKILL` from outside: `docker kill`, `kill -9`, or a stop that took longer than the grace period. |
| `ExitCode=143` or `0` after `docker stop`/an update | A normal stop (`SIGTERM`). |
| `Health.Status` `unhealthy`, `FailingStreak` rising | `/api/health` failed several times in a row; `Health.Log` holds the answers. Docker alone does not restart an unhealthy container, an orchestrator may. |
| `RestartCount` rising | The restart policy brings the container back; `docker events` shows when. |
| `Out of memory: Killed process … (litestream)` or `(node)` in `dmesg` | The kernel ended the process. `Memory cgroup out of memory` means the container's limit, a line without `cgroup` (`constraint=CONSTRAINT_NONE`) means the whole server was out of memory. |

**The host runs out of memory as a whole.** Without a memory limit on the container, the kernel's global OOM killer picks the largest process on the server – it can be Litestream, the container's first process. `OOMKilled` stays `false`, because the container's own limit was not the cause; and once Docker has restarted the container, `docker inspect` shows the new, running container (`ExitCode=0`), not how the old one ended – `docker events` or the restart entry tell that. Flowplan lists the restart as "killed without trace" or, if the server had 5 % or less of its memory available at the last heartbeat, as "likely out of memory". Only `dmesg` tells for sure. Give the container a memory limit, or leave the server enough room for Flowplan, Litestream and everything else on it; see [Sizing](/sizing).

## Litestream

Litestream replicates the SQLite database to the bucket (only with S3 and without `DATABASE_URL`). Its lines in the log carry `level=…`; the saved copy is `/app/data/logs/litestream.log`.

| Log line | Means |
| --- | --- |
| `sync error … rename …ltx.tmp …: no such file or directory` | Two Litestream processes work on the same database – two containers on one volume ([below](#two-containers-on-one-data-folder)). |
| `compaction failed … level=1 … file checksum mismatch`, every 30 seconds | One of Litestream's change files (LTX) is corrupt, locally or in the bucket – usually left behind by such an overlap. The database itself is fine. |

While compaction is stuck, Litestream no longer cleans up its change files: they pile up locally and in the bucket, and **Litestream's memory keeps growing** – up to the point where the kernel ends it (see the host running out of memory above). A restore from the bucket through the broken file fails too.

**Flowplan repairs this by itself.** {since=0.10.0} Every 15 minutes it checks the bucket; a stuck replica gives a warning in **Settings → Instance → Monitoring**, a message to the administrators and, after a scheduled backup, a repair on the next restart (**Restart now** does it right away). `FLOWPLAN_LITESTREAM_AUTOHEAL=off` keeps only the warning.

The repair is a marker file `/app/data/litestream-reset`, read on the next start before Litestream replicates:

| Content | Does |
| --- | --- |
| empty (`touch`) | Resets only the local state (`.flowplan.sqlite-litestream`); Litestream carries on from the bucket. |
| `remote` as its first line {since=0.10.0} | Also deletes `<prefix>/db/` in the bucket; Litestream starts afresh with a full snapshot. Written by the self-healing and by **Rebuild the replica now**. |

Never the database, uploads or backups are touched. The steps, what the log shows and what to do without a running container are under [Repair the Litestream state](/restore#repair-the-litestream-state).

## Two containers on one data folder

With SQLite, only one container may run on a data folder. Every container holds a lock on `/app/data/.flowplan.lock` {since=0.10.0}; a second one that finds it taken serves anyway, starts no Litestream and writes a block to the log:

```text
==========================================================================
Flowplan: ANOTHER CONTAINER IS USING THE DATA FOLDER /app/data.
  It holds /app/data/.flowplan.lock. Two Flowplan containers on one SQLite database must not overlap:
  …
==========================================================================
```

**Settings → Instance → Monitoring** shows the warning "A second Flowplan container (*host*) has been using the same data folder since *time* …" on both containers. A few seconds during an update point to a rollout with overlap; a warning that stays points to a second resource, replica or `docker run` on the same volume. Find the other container (`docker ps`, the host name in the warning) and stop it. How to roll out without overlap, also in Coolify, is under [Roll out SQLite without overlap](/coolify-and-proxy#roll-out-sqlite-without-overlap).

## What to put in a bug report

**Copy for bug report** {since=0.12.2}: under **Settings → About Flowplan** this button puts the installation details into one line and shows it in a box below, for example `Backend: Flowplan 0.12.2 (release, build 28c0c38, built 2026-11-27T12:10Z) · Frontend: Firefox 140, Windows`. Paste it into the issue's **Installation details** field.

- **Everyone** gets the Flowplan version, the channel (beta or release), the build (short commit) and its date, and their own browser and system – in the iPhone, iPad and Android app or the desktop app the app's version instead of the browser.
- **Admins** also get Node.js, how Flowplan is installed, the database (SQLite or PostgreSQL with its major version), the storage (local disk or S3) and single instance or cluster. The same button is under **Settings → Instance → Name & version**. The install method is what `FLOWPLAN_INSTALL_METHOD` says ([Configuration](/configuration-storage#legal-and-interface)), otherwise what Flowplan detects: Kubernetes, Docker, Podman or no container.
- **Never in it:** host names, IP addresses, the instance's address, e-mail addresses, names or secrets.

The backend part is also available from `GET /api/diagnostics` and the MCP tool [`get_diagnostics`](/mcp#tools). An API token never carries admin rights, so both answer it without the admin details.

Open an [issue](https://github.com/yannicschuller/flowplan/issues/new/choose) with:

- the **version line**, the first line Flowplan writes to the log, e.g. `Flowplan 0.10.0 (release, build abc1234, built …, Node.js …)` (or `version` from [`/api/health`](/operations#health-check) with the token);
- for a restart, the entry's **.txt** from **Settings → Instance → Monitoring → Restarts**;
- the output of the `docker inspect` lines above, and the `dmesg` lines around the time if there are any;
- for Litestream, the first error lines in the log and whether S3 and `S3_PREFIX` are set (not their values);
- how the instance runs: Docker, Compose, Coolify, Kubernetes; SQLite or PostgreSQL; memory limit.

> [!WARNING]
> **Never post secrets:** no keys, tokens, passwords, `.env` files or a full `docker inspect` without `--format` – it lists every environment variable with its value. Flowplan redacts its saved log files ([what is redacted](/monitoring#restarts)), but read every line before you post it; `docker logs` is not redacted.
