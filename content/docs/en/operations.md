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

```sh
curl -H "Authorization: Bearer $FLOWPLAN_METRICS_TOKEN" https://flowplan.example.com/api/health
```

Personal API tokens do not unlock the details.

## Administration → Monitoring

**Administration → Monitoring** shows the instance live – refreshed every 15 seconds, paused while the tab is in the background:

- **Health**: database, file storage (with disk usage), S3 mirror, backup, e-mail, AI provider (reachable and response time, checked at most every five minutes), push relay (reachable, checked at most every minute, see [Push notifications](/administration#push-notifications)), background workers and update. Each tile leads to the section in charge.
- **Key figures**: active now, requests per minute (with error rate and p95 response time), sign-ins today, storage with its change over 7 days.
- **Charts**: **Requests & errors** (5xx) – 1 hour, 24 hours or 7 days –, **Active people** per hour (7 days), **Sign-ins** successful and failed per day (14 days), **Refused requests**, **Storage** by kind and the largest workspaces, **Deliveries** (webhooks, push, e-mail) per day and **AI usage** (tokens per day and per feature). Every chart shows its values on hover, tap or with the arrow keys and has **As a table**.
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

Flowplan checks every ten minutes and sends at most **one message per event and day** as a `POST` with JSON:

```json
{ "event": "ops.storage_high", "title": "Speicher > 90 %", "detail": "Agency: 93 %", "instance": "Flowplan", "url": "https://flowplan.example.org", "at": "2026-10-22T08:10:00.000Z" }
```

The `title` is in German, as alerts are sent outside of a request; match on `event`.

The header `X-Flowplan-Signature: sha256=<HMAC-SHA256 of the body>` is made with the **signing secret** shown, `X-Flowplan-Event` names the event. **Send test** sends `ops.test` right away, **Check now** checks out of turn, **New secret** creates a new signing secret. The latest alerts sent are listed below with their status code. An empty address turns alerts off.

### Maintenance & notices

**Administration → Maintenance & notices** holds two banners. The **notice for everyone** – e.g. “The new filing applies from Monday” – stays until you clear the field. A **maintenance notice** with text, start and end appears to everyone signed in as a banner at the top of the window from saving on – before the start as “Scheduled maintenance”, during it as “Maintenance in progress”, in each person's time zone and language. After the end it disappears by itself, also in windows already open (they check every five minutes). Everyone can hide the notice for themselves. **Remove notice** withdraws it at once. Saving and removing are in the activity log.

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

## Check after the first start

- `/api/health` returns `200`.
- Signing in works and lands back in Flowplan.
- The first account (with SSO: a member of the admin group) sees **Administration**.
- Upload a file, restart the container, open the file again – then the volume is mounted correctly.
- With S3: `objectStorage.pending` drops to `0`; the bucket contains `flowplan/uploads/` and `flowplan/db/`; the log shows lines from `litestream` on start.

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| Sign-in ends with an error about the redirect URI | The URI at the provider ≠ `APP_URL` + `/api/auth/callback`. |
| "Invalid request origin" when saving | `APP_URL` differs from the address in use. |
| No administration visible | With SSO the group is missing in the token: check `OIDC_SCOPES`, `OIDC_GROUPS_CLAIM`, `OIDC_ADMIN_GROUP` and sign in again. For e-mail accounts an administrator grants the right under **Users**. |
| Everything is empty after a restart | The volume is not mounted on `/app/data`. |
| `SQLITE_READONLY` or `EACCES` in the log | The host folder does not belong to UID 1000. |
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

