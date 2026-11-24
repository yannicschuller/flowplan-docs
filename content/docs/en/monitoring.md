---
keywords: monitoring, statistics, alert, webhook, prometheus, grafana, maintenance, error ID, restart, crash, OOM
new: errors-in-detail 2026-11-17, restarts 2026-11-18
---

# Monitoring and maintenance

Watch the instance live: figures, statistics, alerts via webhook, maintenance notices and Prometheus.

## Administration → Monitoring

**Administration → Monitoring** shows the instance live – refreshed every 15 seconds, paused while the tab is in the background:

- **Health**: database, file storage (with disk usage), S3 mirror, backup, e-mail, AI provider (reachable and response time, checked at most every five minutes), push relay (reachable, checked at most every minute, see [Push notifications](/administration#push-notifications)), background workers and update. Each tile leads to the section in charge.
- **Key figures**: five tiles in a row, each with a value and a small trend; storage, AI tokens and errors compare with the period before once it has been collected: **Active 24 h** (plus active now and since midnight), **Storage** (change over 7 days, with disk usage), **Deliveries 7 days** (plus those given up), **AI tokens 14 days** (vs. last week) and **Errors 24 h** (5xx, vs. the day before, with the error rate). Each tile jumps to its card.
- **Charts**: across the full width **Requests & errors** (5xx) – 1 hour, 24 hours or 7 days, with requests per minute and p95 response time –, below it the cards in two columns (one on narrow screens): **Active people** per hour (7 days), **Sign-ins** successful and failed per day (14 days), **Refused requests**, **Storage** by kind and the largest workspaces, **Deliveries** (webhooks, push, e-mail) per day and **AI usage** (tokens per day and per feature). Every chart shows its values on hover, tap or with the arrow keys and has **As a table**.
- **Queues**: what is waiting to be processed right now – search index, mail queue, push delivery, AI fields and AI search index, S3 upload, webhooks retrying.
- **Events**: errors, warnings and notes of the last 14 days, filterable.
- **Quick actions**: **Back up now**, **Check AI provider**, **Check alerts**, **Test alert**, the way to Maintenance & notices and the activity log as CSV.
- Below: **Background workers**, **Instance in numbers** (size of the database and uploads, versions, uptime, demos …), **Alerts by webhook** and **Statistics**.

In detail:

- **Refused requests**: failed sign-ins, requests a limit refused with 429 (sign-in attempts, invitations, AI, MCP, forms …) and anonymous uploads over the daily budget (forms, share links) – per day over the last 14 days. A rise points to attacks or limits that are too tight. The counters are kept for 35 days and cleaned up daily.
- **Background workers**: last run and last error of backup, Markdown export, AI background work, calendar and issue sync and LDAP sync; “off” means not set up.
- **Storage**: usage by kind and the largest workspaces with bars against the quota (yellow from 80 %, red from 95 %). Quotas are set under **Administration → Workspaces** and **Administration → Limits & retention**.
- **Deliveries**: delivered webhooks, push messages and e-mails per day; what is waiting, given up and the latest errors are under **Queues**. Only the host of a webhook address is shown, never its path or token.

### Errors in detail {since=0.10.0}

Below the error chart, **Errors in detail** shows where the errors (5xx) come from – one row per kind of error with route or command (such as `POST /api/command · row.update`), error name and short message, count and trend in the chosen range, and when it last happened; sorted by last seen or count. A click into the error chart shows only that time slot. The **Errors 24 h** tile jumps here.

Opened, a row shows the **place in the code** (the top stack frames in Flowplan's own code, to copy) and the last 20 **occurrences** with time, error ID, status, instance (in a cluster), version and role. **Copy for an issue** copies a plain-text report without personal data. In the Docker image you see compiled files and function names; source files with line only when the build's source maps are next to them. **Clear** deletes all error details; the count in the chart stays.

Every answer carries an **error ID** in the `X-Request-Id` header, and for an error also in the JSON (`requestId`). The app shows it in the message "Something went wrong on the server" as "Error ID: …" – with it you find the occurrence.

Captured are answers from 500 up, failures of background workers and jobs and failed MCP tools, also with statistics switched off. Stored are only the route as a pattern (without IDs and query), command, status, error name, the message (at most 500 characters; keys, tokens, passwords, e-mail and IP addresses and IDs masked), stack frames, database error code, error ID, instance, version and role (administrator, member, guest, not signed in, API token, MCP). Never stored: IP addresses, request contents, headers or who it was. Kept 14 days, at most 500 kinds of errors.

**Errors from external services:** answers with 502–504 because another service failed – such as the AI provider, a linked site in a link preview, the image search or a calendar or Git provider – don't count as server errors. They are listed in their own section below **Errors in detail** with service, host (without path), route, status, count and when last seen, and they don't go into the error rate, the error chart or the recommendations, so Flowplan's own errors stand out right away. {since=0.11.5}

### Restarts {since=0.10.0}

When the container restarts without any visible error, **Restarts** under **Administration → Monitoring** helps after the fact: every restart of the last 30 days is listed with its time, how long Flowplan ran before, the reason and the memory at the last heartbeat (process and container against its limit).

| Reason | Means |
| --- | --- |
| Clean | Flowplan got SIGTERM or SIGINT and shut down in order – an update, `docker stop`, a restart. |
| Crash | An error ended the process; the error with its stack is shown. |
| Likely out of memory | At the last heartbeat memory was at 90 % or more of the container's limit (or of the JavaScript heap's), or the container reports an OOM kill, or the whole server had 5 % or less of its memory available. |
| Killed without trace | Neither a signal nor an error: e.g. `SIGKILL` after a failed healthcheck, by the host or `kill -9`, a power cut – or an OOM kill that left no trace. |

Opened, an unexpected restart shows the last 200 lines of the server log before the end – Flowplan's own output and Litestream's – as text to scroll through; **Download as .txt** saves them with reason and memory. A clean restart is a short entry without lines.

How it works: every 30 seconds Flowplan writes a heartbeat (time, uptime, memory of the process and the container's limit from cgroup v2 or v1) to `/app/data/logs/`, and when it shuts down, whether it was clean. The next start reads it and records the restart. Next to it lies the server log: per container two files with about 2,000 lines together (at most 1 MB each), the same for Litestream (`litestream.log`). The output in the container log (`docker logs`) stays as it was.

**Redacted** before a line reaches the disk: the values of environment variables whose name contains `TOKEN`, `SECRET`, `PASSWORD` or `KEY` (S3 keys, encryption key, passwords …), bearer tokens, credentials in addresses (`https://name:password@…`), `password=…` and the like, e-mail and IP addresses. Flowplan never writes page contents to the log.

Entries are kept 30 days. In a cluster every instance records its own restarts; when several containers share one data folder, the files carry their container's name (`FLOWPLAN_INSTANCE_ID` or the host name). `FLOWPLAN_LOG_FILE=off` switches the log on disk off – restarts are then listed without lines.

A **crash** or **two unexpected restarts within an hour** make an incident: once per incident an alert goes out by webhook (`ops.unexpected_restart`) and to the administrators' chat apps, the **Monitoring** tile on the administration's start page shows it for a day, and the activity log records it.

> [!NOTE]
> **Limits of the OOM detection:** when the kernel ends the process for lack of memory, Flowplan cannot write anything any more. "Likely out of memory" is therefore a guess from the last heartbeat – up to 30 seconds old, a fast rise after it stays invisible – or from the container's OOM counter, which Docker and Kubernetes usually reset on a restart. `docker inspect --format '{{.State.OOMKilled}}' <container>` or `kubectl describe pod` ("OOMKilled") tell for sure. Without a memory limit on the container the JavaScript heap and the whole server's available memory count – when the server runs out, the kernel ends some process, such as Litestream; `dmesg` then shows `Killed process … (litestream)`. And because Litestream is the container's first process, its very last line when it stops can be missing from the file.

### Statistics

For the charts, Flowplan counts requests, errors and response times per minute, active people per hour, storage per day and AI tokens per feature – numbers only, without IP addresses, paths, user agents or names. Who was active is held in memory for the running hour only, so that each person counts once. Successful sign-ins are counted with their time (without the person). AI tokens come from the provider where it reports them, otherwise they are estimated (four characters per token).

| Resolution | Kept for |
| --- | --- |
| Minutes | 48 hours |
| Hours | 35 days |
| Days (storage, AI tokens) | 400 days |

Switch the statistics off under **Administration → Monitoring → Statistics** (**Collect usage statistics**) or for the whole instance with `FLOWPLAN_METRICS=off` (see [Configuration](/configuration#operations)); the switch is then locked. **Delete statistics** removes all counted requests, active people, storage history, AI tokens and successful sign-ins; the counters of refused requests stay.

### Alerts by webhook

Under **Administration → Monitoring → Alerts by webhook**, enter an `https://` address (with `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE=true` also `http://` and internal addresses) and choose the events:

| Event | When |
| --- | --- |
| Backup failed | The last scheduled backup ended with an error. |
| Storage > 90 % | A workspace with a quota is more than 90 % full. |
| Worker error | A worker that is set up reported an error in the last 24 hours. |
| Many failed sign-ins | 50 or more failed sign-ins within an hour. |
| Security incidents | Right away for every new incident of the [detection rules](/security-monitoring#detection-rules) (`ops.security`, with `rule` and `severity`). |
| Litestream replica stuck | Right away, once per incident: the [Litestream replica in the bucket is stuck](/restore#repair-the-litestream-state) (`ops.litestream_stuck`). {since=0.10.0} |
| Unexpected restarts | Right away, once per incident: a crash or two unexpected [restarts](#restarts) within an hour (`ops.unexpected_restart`). {since=0.10.0} |

Flowplan checks every ten minutes and sends at most **one message per event and day** as a `POST` with JSON:

```json
{ "event": "ops.storage_high", "title": "Speicher > 90 %", "detail": "Agency: 93 %", "instance": "Flowplan", "url": "https://flowplan.example.org", "at": "2026-10-22T08:10:00.000Z" }
```

The `title` is in German, as alerts are sent outside of a request; match on `event`.

The header `X-Flowplan-Signature: sha256=<HMAC-SHA256 of the body>` is made with the **signing secret** shown, `X-Flowplan-Event` names the event. **Send test** sends `ops.test` right away, **Check now** checks out of turn, **New secret** creates a new signing secret. The latest alerts sent are listed below with their status code. An empty address turns alerts off.

### Maintenance & notices

**Administration → Maintenance & notices** holds two banners and the banners to click away. The **notice for everyone** – e.g. “The new filing applies from Monday” – stays until you clear the field. A **maintenance notice** with text, start and end appears to everyone signed in as a banner at the top of the window from saving on – before the start as “Scheduled maintenance”, during it as “Maintenance in progress”, in each person's time zone and language. After the end it disappears by itself, also in windows already open (they check every five minutes). Everyone can hide the notice for themselves. **Remove notice** withdraws it at once. Saving and removing are in the activity log.

#### Banners to click away

For news each person should see only once – e.g. “Flowplan is now an app” or your Discord server – **New banner** creates a banner everyone sees until they close it or follow its link. After that it never appears for them again, on no device; whoever opens Flowplan next sees it at the top of the window.

- **Content:** an optional **heading** (bold), the **text** (at most 300 characters) and an optional **link** with its own label – an `https://` address (opens in a new tab) or a page of this instance (`#…` or `/…`). The **preview** shows it while you write.
- **Colour:** notice (blue), promotion (accent), news (green) or important (yellow).
- **Who and where:** everyone or administrators only; everywhere or **browser only** – then not in the desktop app and the apps, e.g. when it promotes the apps.
- **Period:** optional **From** and **Until**; without them it applies right away and until you end it.
- **Templates** fill in the form for the apps (link to flowplan.org/download, browser only) or for Discord.

The list shows each banner with its state (shown, planned, paused, ended) and how many closed it and how many followed the link. **Pause** hides it without losing its numbers; **Show again** shows it to everyone once more, also to those who closed it; **Delete** removes it with its numbers for everyone right away. At most three banners appear at a time, newest first. Creating, changing and deleting are in the activity log.

### Storage overview

**Administration → Storage & backup** shows in the cards **Backups**, **Usage** and **Content**:

- whether the S3 storage is reachable, how long the check took and how many files are still waiting,
- what is local and what is in the bucket: files by kind (images, videos, documents …) and how the database is split,
- how many workspaces, pages, databases, records, whiteboards, files, accounts and comments there are.

## Prometheus

With `FLOWPLAN_METRICS_TOKEN` (at least 16 characters), `/api/metrics` delivers metrics: sizes, queues, search backlog, storage and quota per workspace, `flowplan_object_storage_pending` and `flowplan_build_info` with version and commit.

```yaml
scrape_configs:
  - job_name: flowplan
    metrics_path: /api/metrics
    authorization:
      credentials: <FLOWPLAN_METRICS_TOKEN>
    static_configs:
      - targets: ["flowplan:3000"]
```

Without a token the endpoint is switched off. The same token unlocks the details of `/api/health` (see above).

> [!NOTE]
> **For load tests:** `FLOWPLAN_METRICS_LOOP=1` also measures the delay and utilisation of the Node event loop and the time spent in SQLite, and adds them to `/api/metrics`. The values cover the time since the previous scrape – meant for a single scraper such as the load test script, not for a shared Prometheus. Off by default.
