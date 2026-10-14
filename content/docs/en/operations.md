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

Every release comes with the desktop apps, as downloads in the [GitHub release](https://github.com/yannicschuller/flowplan/releases): for macOS (`.dmg`, Apple Silicon and Intel), Windows (installer `-setup.exe` and `.zip`, x64 and ARM) and Linux (`.AppImage` and `.tar.gz`, x64 and ARM). On first start they ask for your instance's address; it can be preset with `--server=<URL>` or `FLOWPLAN_SERVER`.

Without certificates the apps are unsigned – macOS asks on first opening (right-click → Open), Windows shows SmartScreen, and Linux AppImages need to be made executable first (`chmod +x`). They are signed when the repository has the secrets `CSC_LINK`/`CSC_KEY_PASSWORD` (macOS, plus `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID` for notarization) or `WIN_CSC_LINK`/`WIN_CSC_KEY_PASSWORD` (Windows). To build by hand: in the `desktop/` folder run `npm run dist:mac`, `npm run dist:win` or `npm run dist:linux`.
