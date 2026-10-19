# Operations and troubleshooting

Health check, metrics, the storage overview and the most common causes when something does not run.

## Health check

`GET /api/health` answers without sign-in with `200`, or with `503` when there are problems. It only reports states, no content:

- database reachable and writable,
- upload directory writable,
- search index backlog,
- failed push deliveries,
- with S3: `objectStorage.pending` (files still to upload) and `retrying`.

## Administration → Operations

Administrators see the size of the database and uploads, queues, search index, versions and uptime there. The **storage overview** shows:

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

Without a token the endpoint is switched off.

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

### Download

[flowplan.org/download](https://flowplan.org/download) detects the system and downloads the latest version; every file is listed below. The same files are in the [latest release](https://github.com/yannicschuller/flowplan-desktop/releases/latest):

| System | File | Architecture |
| --- | --- | --- |
| macOS 12 or newer | `Flowplan-<version>-mac.dmg` | Apple Silicon and Intel in one app |
| Windows 10 or newer | `Flowplan-<version>-windows-setup.exe`, the `.zip` without installing | x64 and ARM in one installer |
| Linux | `Flowplan-<version>-linux-<arch>.AppImage`, or the `.tar.gz` | x64 and ARM |

On first start the app always asks for the instance's address, suggesting `https://app.flowplan.org` (HTTPS, `http://localhost` for local tests); change it via the menu **Server wechseln …**. For managed installations `--server=<URL>` or the environment variable `FLOWPLAN_SERVER` suggests their own address instead – the first start still asks to confirm it. The app checks that Flowplan really runs there (`/api/health` answers with `"service": "flowplan"`) and refuses addresses that redirect to another site.

**Signing in with passkeys and SSO:** passkeys, and providers that ask for one, only work in a real browser. The app therefore opens the sign-in in the default browser: it creates a random secret, opens `/api/auth/desktop` with its hash, after signing in you confirm **Sign in to the desktop app**, and the browser hands a one-time code back to the app via `flowplan://sign-in`. The code is valid for one minute, once, and only together with the secret that never leaves the app. If the browser asks whether it may open Flowplan, that is this step.

While the apps are not signed and notarized, macOS blocks the first launch: from macOS 15 allow it under **System Settings → Privacy & Security → Open Anyway** (up to macOS 14, right-click → **Open** is enough); if macOS says the app is "damaged", `xattr -dr com.apple.quarantine /Applications/Flowplan.app` removes the quarantine flag. With signing and notarization this goes away, see [flowplan-desktop → Signing](https://github.com/yannicschuller/flowplan-desktop#signing). Windows shows SmartScreen (**More info → Run anyway**), and an AppImage has to be made executable first (`chmod +x`).

### Updates

The app checks for a newer release 15 seconds after starting, then every six hours and via **Nach Updates suchen …** in the menu:

| Installed as | What happens |
| --- | --- |
| Windows installer | Downloads in the background; a dialog offers **Restart now**, otherwise it installs on the next start. |
| Linux AppImage | The same – the AppImage replaces itself. |
| macOS, signed | The same. |
| macOS unsigned, Windows ZIP, Linux `.tar.gz` | A dialog names the new version and opens the download page. macOS only lets signed apps replace themselves. |

Without a connection the check stays quiet and tries again later. `FLOWPLAN_UPDATE_URL` makes the app fetch updates from another source – a folder with the same files (`latest*.yml` and the installers), for example a mirror inside a company network.

### Signing and new versions

New versions are made in the flowplan-desktop repository via **Actions → Release → Run workflow**: the version goes up, the apps are built and attached for all three systems, and the release is published only once everything is there. Installed apps find it within six hours.

The apps are signed as soon as the secrets `CSC_LINK`/`CSC_KEY_PASSWORD` (macOS, plus `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID` for notarization) or `WIN_CSC_LINK`/`WIN_CSC_KEY_PASSWORD` (Windows) are set there; a signed Mac app then updates itself like on Windows. To build yourself: in the repository run `npm run dist:mac`, `dist:win` or `dist:linux`.

