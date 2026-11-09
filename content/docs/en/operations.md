# Operations and troubleshooting

Health check, metrics, the storage overview and the most common causes when something does not run.

## Health check

`GET /api/health` answers without sign-in with `200`, or with `503` when there are problems, and tells nothing about the instance:

```json
{"service":"flowplan","status":"ok"}
```

With `503` it says `"status":"error"`. Docker/Podman health checks, Kubernetes probes, Coolify, Gatus and uptime monitors only need the status code; the desktop and mobile apps recognise a Flowplan instance by `"service":"flowplan"`.

The details come only with the token from `FLOWPLAN_METRICS_TOKEN` (`Authorization: Bearer <token>`, as for `/api/metrics`) or for signed-in instance administrators:

- `checks.database`: database reachable and writable,
- `checks.storage`: upload directory writable,
- `searchBacklog`: search index backlog,
- `failedPushDeliveries`: failed push deliveries,
- `objectStorage`: with S3 `pending` (files still to upload) and `retrying`, otherwise `"off"`,
- `uptimeSeconds`: the server's uptime.
- `version`, `commit`, `builtAt`: which version from which commit runs here (empty when the image doesn't carry them) – for example to check whether a deployment is current.

```sh
curl -H "Authorization: Bearer $FLOWPLAN_METRICS_TOKEN" https://flowplan.example.com/api/health
```

Personal API tokens do not unlock the details.

For Kubernetes and load balancers there are also `/api/health/live` (the process answers) and `/api/health/ready` (database and, in a cluster, Redis and the bucket reachable; `503` while shutting down), see [Cluster mode](/cluster#health-readiness-and-shutdown).

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
| Security incidents | Right away for every new incident of the [detection rules](#detection-rules) (`ops.security`, with `rule` and `severity`). |

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

## Security

Flowplan records security-relevant events, detects typical attacks in them and hands both to your own tools. It all works without setup; the variables below only connect it to the outside.

### What is recorded

- **Sign-in:** successful, failed, refused (limit or block), from a new device
- **Account:** password changed or reset, passkey added or removed, two-factor on or off, API token created or revoked, sessions ended, account deleted
- **Rights:** admin rights granted or removed (also through SSO or LDAP groups at sign-in), roles, invitations, accounts disabled or reset by admins
- **Sharing and data:** share links, published pages, all exports and backups
- **Refused:** requests from a foreign origin, internal addresses (SSRF), scripts in submitted content, many refused API requests from one address
- **Administration:** LDAP, SCIM, restore, extensions, domains, AI provider, alerts and other security-relevant settings

**Privacy:** for an address, the database keeps only its network (IPv4 `/24`, IPv6 `/48`) and a hash keyed with a secret of the instance – enough to group and block, not the address itself. Accounts of failed sign-ins are only stored masked (`ma***@example.com`). Events are deleted after 90 days (`FLOWPLAN_SECURITY_RETENTION_DAYS`).

### Administration → Threats & incidents

The page `/#admin/threats` (group **Security**) sums it up and refreshes every 30 seconds:

- **State:** open incidents (critical ones in red), hints on missing connections, numbers of the last 24 hours and sign-ins per hour
- **Incidents** of the detection rules, with actions right next to them: resolved, block the address or network for 24 hours, end all sessions of the person, disable the account. **Details & next steps** opens an incident's own page (`/#admin/threats/incident/<id>`): on the left what happened – why the rule fired (with its thresholds), the period, the origin and whether it is already blocked, the accounts tried, successful sign-ins in the same period (red when an account may have been taken over afterwards), networks, countries, devices and the timeline of all its events; for probing also the requested paths with answer and count (IDs and tokens replaced by `:id`, `:n` and `:token`). On the right what the incident means, when it is harmless and what to do step by step – with the matching action (block the address, end sessions, disable the account, resolve) or the link to it right at the step.
- **Addresses with failures**, **events** with filters (severity, kind) and export as CSV or JSON
- **Signed-in people** (admins first), **open ways in** (API tokens, share links, public pages of the whole instance) to revoke
- **Blocks** of addresses and networks, for a time or indefinitely. Blocked addresses only get `403` – signed-in people in them too. Your own address and network cannot be blocked.

New incidents go to all instance admins as notifications of the kind **Security incidents of the instance**. Each admin chooses how under **Settings → Notifications**: the channels (by default inbox, push, e-mail and chat apps) and whether **all incidents** or **critical only** arrive; the notification leads straight to the incident's page, and the top of the incident list says how you are notified right now. When a webhook is set up under **Monitoring → Alerts by webhook**, every incident also goes there right away (event `ops.security` with `rule` and `severity`). At most 30 reports an hour, so an attack floods nobody.

Whoever signs in with a device not seen for 90 days gets a security notice themselves – a taken-over account is often noticed by its owner first.

### Detection rules

| Rule | Trigger | Severity |
| --- | --- | --- |
| Password guessing on an account | 10 failures on one account in 15 minutes | warning |
| Many failures from one address | 20 failures from one address in 15 minutes | warning |
| Many accounts from one address | 5 different accounts from one address in 15 minutes (credential stuffing) | critical |
| Sign-in after many failures | successful sign-in after 5 failures on the same account | critical |
| Admin from a new device | an admin signs in with a device not seen for 90 days | warning |
| Two countries in a short time | sign-ins from two countries within 2 hours (needs `FLOWPLAN_COUNTRY_HEADER`) | critical |
| Rights changed | admin rights, LDAP/SCIM, restore, extensions, domains | critical |
| Many exports | more than 20 exports by one person in an hour (and far above their usual) | warning |
| Probing | 60 refused API requests (401/403/404) from one address in 10 minutes | warning |
| Attacks through content | 5 refused scripts or internal addresses in an hour | warning |

The same thing within a day counts on the open incident instead of opening a new one.

### Logs (stdout, JSON)

Every event is a JSON line on stdout – Docker, Loki, Elastic, Graylog or Datadog pick them up as they are:

```json
{"ts":"2026-10-30T19:11:27.536Z","level":"warn","logger":"flowplan.security","event":"login.failure","severity":"warn","ip":"203.0.113.7","network":"203.0.113.0/24","subject":"ma***@example.com","device":"Chrome · macOS","detail":"password"}
```

More fields depending on the event: `user` (account id), `country`. The full address (`ip`) is only in this line – for fail2ban and CrowdSec. `FLOWPLAN_SECURITY_LOG=anonymous` leaves it out, `=off` writes no lines.

### OpenTelemetry

With `OTEL_EXPORTER_OTLP_ENDPOINT` (or `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT`) Flowplan sends the events as OTLP logs (HTTP/JSON, `/v1/logs`) to your collector, e.g. Grafana Alloy, the OpenTelemetry Collector, Grafana Cloud, Honeycomb or Datadog. Credentials go in `OTEL_EXPORTER_OTLP_HEADERS` (`api-key=…,x-scope-orgid=…`), the service name in `OTEL_SERVICE_NAME` (default `flowplan`). The fields of the log line arrive as attributes `flowplan.*`.

### Prometheus

`/api/metrics` also has `flowplan_security_events_total{event,severity}`, `flowplan_security_incidents_open{rule,severity}` and `flowplan_security_blocks`. An alert in Prometheus or Grafana:

```yaml
- alert: FlowplanSecurityIncident
  expr: sum(flowplan_security_incidents_open{severity="critical"}) > 0
  for: 1m
```

### fail2ban

With the `journald` logging driver (`logging: { driver: journald }` in the Compose service) fail2ban reads the lines directly:

```ini
# /etc/fail2ban/filter.d/flowplan.conf
[Definition]
failregex = "logger":"flowplan\.security","event":"login\.(failure|refused)","severity":"[a-z]+","ip":"<HOST>"
            "logger":"flowplan\.security","event":"request\.probing","severity":"[a-z]+","ip":"<HOST>"

# /etc/fail2ban/jail.d/flowplan.conf
[flowplan]
enabled = true
backend = systemd
journalmatch = CONTAINER_NAME=flowplan
filter = flowplan
maxretry = 10
findtime = 10m
bantime = 1h
```

When fail2ban blocks in the firewall in front of the reverse proxy, the request never arrives. The blocks in Flowplan itself also work behind Cloudflare or a proxy fail2ban does not control.

### CrowdSec

A parser for the log lines and a scenario for password guessing (example; the acquisition with `labels: { type: flowplan }`):

```yaml
# parsers/s01-parse/flowplan.yaml
name: flowplan/flowplan-logs
description: "Flowplan security events"
filter: "evt.Line.Labels.type == 'flowplan'"
onsuccess: next_stage
nodes:
  - filter: "UnmarshalJSON(evt.Line.Raw, evt.Unmarshaled, 'flowplan') in ['', nil] && evt.Unmarshaled.flowplan.logger == 'flowplan.security'"
    statics:
      - meta: log_type
        expression: "'flowplan_' + replace(evt.Unmarshaled.flowplan.event, '.', '_')"
      - meta: source_ip
        expression: evt.Unmarshaled.flowplan.ip

# scenarios/flowplan-bf.yaml
type: leaky
name: flowplan/login-bf
description: "Flowplan password guessing"
filter: "evt.Meta.log_type in ['flowplan_login_failure', 'flowplan_login_refused']"
groupby: evt.Meta.source_ip
capacity: 10
leakspeed: 30s
blackhole: 5m
labels:
  remediation: true
```

### More variables

| Variable | Default | Effect |
| --- | --- | --- |
| `FLOWPLAN_SECURITY_LOG` | `on` | `on` (with address), `anonymous` (without), `off` (no log lines) |
| `FLOWPLAN_SECURITY_RETENTION_DAYS` | `90` | How long events stay in the database (at least 7) |
| `FLOWPLAN_COUNTRY_HEADER` | *empty* | The proxy's header with the country of the request, e.g. `CF-IPCountry` behind Cloudflare – turns on the rule "two countries". Only set it when the proxy sets the header itself. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | *empty* | OTLP collector for the events (see above) |

Everything with addresses needs the reverse proxy to set `X-Forwarded-For` and a correct `FLOWPLAN_TRUSTED_PROXIES` ([Configuration](/en/configuration)). When no address arrives, the page shows a hint.

## Check after the first start

- `/api/health` returns `200`.
- Signing in works and lands back in Flowplan.
- The first account (with SSO: a member of the admin group) sees **Administration**.
- Upload a file, restart the container, open the file again – then the volume is mounted correctly.
- With S3: `objectStorage.pending` drops to `0`; the bucket contains `flowplan/uploads/` and `flowplan/db/`; the log shows lines from `litestream` on start.

## Workflows

[Workflows](/workflows) run in the server process. A restart loses nothing: running steps without a valid lease return to the queue after two minutes at most, waiting runs (waits, approvals) continue at their time, schedules make up for the last missed slot once. Under **Administration → Limits & retention → Workflows**, monitoring shows waiting steps, the oldest step due, undistributed events and the failure rate. Runs are deleted after 30 days (`FLOWPLAN_WORKFLOW_RUN_DAYS`), waiting ones never.

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| Sign-in ends with an error about the redirect URI | The URI at the provider ≠ `APP_URL` + `/api/auth/callback`. |
| "Invalid request origin" when saving | `APP_URL` differs from the address in use. |
| No administration visible | With SSO the group is missing in the token: check `OIDC_SCOPES`, `OIDC_GROUPS_CLAIM`, `OIDC_ADMIN_GROUP` and sign in again. For e-mail accounts an administrator grants the right under **Users**. |
| Everything is empty after a restart | The volume is not mounted on `/app/data`. |
| `SQLITE_READONLY`, `EACCES` or `unable to open database file` in the log, nothing appears in the data folder | The mounted host folder does not belong to UID 1000: `sudo chown -R 1000:1000 /path/to/flowplan-data`, or use a named Docker volume ([Volume permissions](/coolify-and-proxy#volume-permissions)). Newer images say so at start and stop. |
| Container "degraded" in Coolify | The health check port is empty (= 80); enter `3000`. |
| 404 through the front proxy | No route at the inner proxy: set the host header, turn off TLS to the target, the container must be healthy. |
| `objectStorage.retrying: true` | The bucket is unreachable or the keys are wrong. Uploads are retried with growing intervals, nothing gets lost locally. Check the endpoint from the container (typos, service only bound to an internal IP). |
| The container does not start, the log shows `litestream` | Endpoint, bucket or keys for the database backup are wrong; to narrow it down use `FLOWPLAN_LITESTREAM=off`. |
| Push does not arrive | `WEB_PUSH_SUBJECT` is missing, the keys have changed or outgoing HTTPS is blocked. |
| High CPU load after uploads | Text recognition of scanned PDFs; if needed `FLOWPLAN_OCR=0`. |
| Other people's changes or live cursors arrive late | The proxy buffers server-sent events (`/api/documents/live`, `/api/whiteboards/…/cursors`); turn buffering off. Without the channel, Flowplan keeps syncing every few seconds. |

## Desktop apps

The desktop app for macOS, Windows and Linux is a slim window around a Flowplan instance. All data stays on the server; new Flowplan features arrive with the server and need no app update. The app has its own repository: [flowplan-desktop](https://github.com/yannicschuller/flowplan-desktop).

**Offline use:** works in the desktop app as in the browser, including the AppImage on Linux. Turn it on in the app itself under **Settings → Offline & devices**, because the app, the browser and the installed web app store separately. Without a connection the app opens the copy from the instance's service worker, also when another page of the instance fails to load; the app's own offline page only appears without a copy. If the option is missing, the address is not HTTPS with a valid certificate (the service worker needs a secure connection; `http://localhost` works for tests). See [Work without a connection](/offline-and-apps#turn-on-offline-use).

### Download

[flowplan.org/download](https://flowplan.org/download) detects the system and downloads the latest version; every file is listed below. The same files are in the [latest release](https://github.com/yannicschuller/flowplan-desktop/releases/latest):

| System | File | Architecture |
| --- | --- | --- |
| macOS 12 or newer | `Flowplan-<version>-mac.dmg` | Apple Silicon and Intel in one app |
| Windows 10 or newer | `Flowplan-<version>-windows-setup.exe`, the `.zip` without installing | x64 and ARM in one installer |
| Linux | `Flowplan-<version>-linux-<arch>.AppImage`, or the `.tar.gz` | x64 and ARM |

On first start the app always asks for the instance's address, suggesting `https://app.flowplan.org` (HTTPS, `http://localhost` for local tests); more instances are added as profiles (see below). For managed installations `--server=<URL>` or the environment variable `FLOWPLAN_SERVER` suggests their own address instead – the first start still asks to confirm it. The app checks that Flowplan really runs there (`/api/health` answers with `"service": "flowplan"`) and refuses addresses that redirect to another site.

**Signing in with passkeys and SSO:** passkeys, and providers that ask for one, only work in a real browser. The app therefore opens the sign-in in the default browser: it creates a random secret, opens `/api/auth/desktop` with its hash, after signing in you confirm **Sign in to the app**, and the browser hands a one-time code back to the app via `flowplan://sign-in`. The code is valid for one minute, once, and only together with the secret that never leaves the app. If the browser asks whether it may open Flowplan, that is this step.

From version 1.0.6 the Mac app is signed with a Developer ID and notarized by Apple; macOS opens it without asking. Only versions up to 1.0.5 were unsigned: there macOS blocks the first launch (from macOS 15 allow it under **System Settings → Privacy & Security → Open Anyway**, up to macOS 14 right-click → **Open**; if macOS says "damaged", `xattr -dr com.apple.quarantine /Applications/Flowplan.app` helps). Self-built apps without a certificate behave the same, see [flowplan-desktop → Signing](https://github.com/yannicschuller/flowplan-desktop#signing). Windows shows SmartScreen (**More info → Run anyway**), and an AppImage has to be made executable first (`chmod +x`).

### Profiles

The desktop app can keep several instances as profiles (how to use them: [Several instances](/offline-and-apps#several-instances-profiles)). Under the hood:

- Every profile has its own Electron session (`persist:profile-<id>`): cookies, service worker, offline copy, IndexedDB and cache are separate, also for two profiles on the same instance. Permissions (notifications, microphone) go only to the active profile's instance, and a sign-in started in the browser is dropped on a switch.
- The profiles live in `config.json` in the app's user data folder (`profiles`, `activeProfile`). An address from version 1.0.4 or older becomes the first profile automatically on first start and keeps its session; `server` still mirrors the active profile, so an older version finds an address after a downgrade.
- `--profile=<id or name>` starts the app with a saved profile or switches a running app to it, for example from a Linux launcher. New addresses are not accepted this way; only `--server=<URL>` or `FLOWPLAN_SERVER` suggest one on first start, as before.
- Removing a profile signs it out of the instance and empties its session on this computer.

### Updates

The app checks for a newer release 15 seconds after starting, then every six hours and via **Nach Updates suchen …** in the menu:

| Installed as | What happens |
| --- | --- |
| Windows installer | Downloads in the background, with its progress in a small notice in the window and on the taskbar button; then the notice, the menu and the notification area offer **Restart**, otherwise it installs when the app quits. |
| Linux AppImage | The same – the AppImage replaces itself. |
| macOS (1.0.6 and later, signed) | The same. |
| macOS up to 1.0.5 (unsigned), Windows ZIP, Linux `.tar.gz` | A notice in the window names the new version and leads to the download page (up to 1.0.8 this was a dialog). macOS only lets signed apps replace themselves – so from 1.0.5 or older download 1.0.6 once; after that the app updates itself. |

From the version after 1.0.8 no dialog interrupts any more: the answer to **Check for Updates…** also appears as a notice in the window. Without a connection the check stays quiet and tries again later. `FLOWPLAN_UPDATE_URL` on the computer running the app makes it fetch updates from another source – a folder with the same files (`latest*.yml` and the installers), for example a mirror inside a company network. Not to be confused with the server's variable of the same name, which points the instance's release check at a mirror (see [Configuration](/configuration#operations)).

### Settings, links and launch at login

- The app's settings (notification area icon, open at login, the quick capture shortcut, the spell checker's languages) are in `config.json` under `settings`, the pages in windows of their own per profile under `pageWindows`. The app checks both when reading; anything unknown is dropped.
- `flowplan://open?instance=<address>&page=<id>` opens a page (see [flowplan-desktop → Links](https://github.com/yannicschuller/flowplan-desktop#links-to-pages-flowplan)). An instance without a profile is only added after asking and the same check as on setup. On Linux this needs the registered desktop file, like the sign-in through the browser.
- **Open at login** registers a login item on macOS and Windows; on Linux the app writes `~/.config/autostart/flowplan.desktop` (or under `$XDG_CONFIG_HOME`).
- Quick capture and dropped files go to the profile's own instance with its sign-in, through the same endpoints as the web app (`capture.record`, `/api/upload`, the Markdown import, `/api/import/source`); nothing is set up on the server for it.

### Signing and new versions

New versions are made in the flowplan-desktop repository via **Actions → Release → Run workflow**: the version goes up, the apps are built and attached for all three systems, and the release is published only once everything is there. Installed apps find it within six hours.

The apps are signed as soon as the secrets `CSC_LINK`/`CSC_KEY_PASSWORD` (macOS, plus `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID` for notarization) or `WIN_CSC_LINK`/`WIN_CSC_KEY_PASSWORD` (Windows) are set there; a signed Mac app then updates itself like on Windows. To build yourself: in the repository run `npm run dist:mac`, `dist:win` or `dist:linux`.

