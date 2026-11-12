---
keywords: environment variables, env, configuration, app_url, docker
---

# Configuration

All environment variables at a glance. Many values can also be set in the interface of the **Administration** (see [In the interface](#in-the-interface)); values set there take precedence.

**More on this topic:** [Configuration: storage, database and security](/configuration-storage) · [Configuration: e-mail, integrations and workflows](/configuration-integrations) · [Configuration: AI, voice notes and push](/configuration-ai-push)

## Required

| Variable | Example | Meaning |
| --- | --- | --- |
| `APP_URL` | `https://flowplan.example.com` | The public address exactly as it appears in the browser – scheme, host, port if any, without a trailing slash. The basis for sign-in redirects, cookies, passkeys, links in e-mails and push notifications and the origin check. |

## Sign-in

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_LOCAL_LOGIN` | on | `false` turns off e-mail, password and passkeys; then only single sign-on remains. |
| `FLOWPLAN_SETUP_TOKEN` | *empty* (Helm: generated) | Recommended for instances reachable from the internet: the first account and the restore on the setup screen only work via `/register?setup=<token>`. No effect afterwards. If it is missing and `APP_URL` is not a local address, Flowplan warns at start in the log and on the setup screen. See [Sign-in](/en/sign-in#e-mail-and-password). |
| `OIDC_ISSUER` | *empty* | The login provider for single sign-on. Without it there are only e-mail, password and passkeys. |
| `OIDC_CLIENT_ID` | – | Client ID. |
| `OIDC_CLIENT_SECRET` | – | Client secret. Never put it into the image or into Git. Empty: a public client, PKCE only. |
| `OIDC_LINKED_SSO_ONLY` | off | `true`: accounts connected to SSO sign in through SSO only. A password or passkey sign-in is refused with a note; passkeys and the authenticator app stay for confirming important steps. See [Connect an existing account to SSO](/en/sso-oidc#connect-an-existing-account-to-sso). |
| `OIDC_NEW_ACCOUNTS` | on | `false`: SSO sign-in creates no new accounts – only existing, connected or SCIM-provisioned accounts sign in. At a first SSO sign-in with a known address, "Create a separate account instead" is then not offered. |
| `SESSION_HOURS` | `8` | Browser session without "Stay signed in": ends this many hours after signing in (1–24). Also under **Administration → Sign-in & SSO → Sessions**; a value saved there takes precedence (for every `SESSION_*` except `SESSION_MAX_DAYS` and `SESSION_GROUPS_HOURS`). |
| `SESSION_REMEMBER` | off | `true` offers **Stay signed in** in the browser when signing in – see [Sign-in](/sessions). The apps stay signed in regardless. |
| `SESSION_IDLE_HOURS` | `168` | With "stay signed in" in the browser: the session ends this many hours after it was last used (1–8760). |
| `SESSION_APP_REMEMBER` | on | The desktop and mobile apps stay signed in while they (or their widgets) are used – for sign-ins the app proves (hand-off through the browser, or password with the app's device key; see [Sign-in](/sessions)). `false`: their sessions end like a browser session without "Stay signed in". |
| `SESSION_APP_DAYS` | `90` | An app's session ends after this many days without use (1–365). |
| `SESSION_MAX_DAYS` | `30` / `365` | Sessions that stay signed in end at the latest this many days after signing in (1–365; default 30 in the browser, 365 in the apps; never shorter than the time without use) – with SSO just as with password and passkey. |
| `SESSION_GROUPS_HOURS` | *empty* | Only when set: SSO sessions with "stay signed in" end after this many hours already, so group changes at the provider take effect with the new sign-in. Without it they follow through SCIM, the LDAP sync or the next sign-in. |
| `LDAP_URL` | *empty* | Sign-in with an LDAP directory (`ldap://` or `ldaps://`) – see [Sign-in with LDAP](/scim-and-ldap#sign-in-with-ldap). |
| `LDAP_BIND_DN` / `LDAP_BIND_PASSWORD` | *empty* | Search account for LDAP; without it, anonymous search. |
| `LDAP_BASE_DN` | – | Where LDAP accounts are searched. |
| `LDAP_USER_FILTER` | `(\|(uid={user})(mail={user}))` | Search filter; `{user}` is the escaped sign-in name. |
| `LDAP_GROUP_ATTRIBUTE` | `memberOf` | Groups for SSO mappings and the admin group, synced hourly. |
| `LDAP_TLS_CA` | *empty* | CA for `ldaps://`/StartTLS (path or PEM). |
| `LDAP_STARTTLS` | `false` | `ldap://` with StartTLS. |
| `LDAP_TIMEOUT_MS` | `8000` | Time limit per LDAP operation. |
| `LDAP_CONTACTS_BASE_DN` | `LDAP_BASE_DN` | Base for [contacts from LDAP](/scim-and-ldap#contacts-from-ldap); the OU tree starts here. |
| `LDAP_CONTACTS_FILTER` | people without computers | Which entries count as contacts. |
| `LDAP_CONTACTS_SYNC_MINUTES` | `60` | Sync of contacts from the directory (15–1440 minutes). |
| `LDAP_CONTACTS_ATTRIBUTES` | – | More LDAP attributes contacts databases may map (separated by commas or spaces), on top of those of the default mapping. |
| `LDAP_CONTACTS` | on | `off` turns contacts from LDAP off. |

The other OIDC variables and everything about passwords and passkeys are described under [Sign-in](/sign-in).

## Operations

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_DATA_DIR` | `/app/data` in the image, `./data` otherwise | Data directory for SQLite, uploads, push keys and text recognition data. |
| `PUID` / `PGID` | `1000` / same as `PUID` | Only in the image, without `user:` (as with linuxserver.io): at start Flowplan gives the data folder to this user and group and runs as them, never as root; `0` is refused. With `user: "UID:GID"` Flowplan runs as that user directly instead – see [Volume permissions](/coolify-and-proxy#volume-permissions). |
| `FLOWPLAN_WORKSPACE_QUOTA_MB` | unlimited | Default storage quota per workspace in MB (`0` = unlimited). |
| `FLOWPLAN_IMPORT_MAX_MB` | *empty* | Largest file for [imports from AFFiNE](/migrate-affine) and other tools in MB, for everyone. Without it the **largest upload** applies (Administration → Limits & retention, or the person's own limit), at least 100 MB. Only the AFFiNE workspace file (`.affine`) may exceed 100 MB; ZIP exports stay at 100 MB. A proxy in front must let such large requests through. |
| `FLOWPLAN_MAX_DOCUMENT_MB` | `16` | Largest size of a collaboratively edited document (page or record document) in MB. Changes that would make a document grow beyond it are refused ("The document is too large …"); split larger content across several pages. Keeps every edit of a huge document from slowing the server down. |
| `FLOWPLAN_IMPORT_MAX_DOCS` | `10000` | Largest number of pages per [import](/migrate) from AFFiNE, Confluence, Evernote, Google Docs, Obsidian and Notion/Markdown: documents, folders, databases, whiteboards and collections; when importing as a new database, the number of records. Above it the preview shows the count and the import is refused (the message names the variable). Documents are converted one at a time; a higher value costs time, hardly memory. |
| `FLOWPLAN_IMPORT_MAX_FILES` | `20000` | Largest number of files (images, attachments) per import from an AFFiNE workspace or snapshot; further ones are left out, the preview names their number and the variable. ZIP exports may have as many entries as pages and files together (at least 12,000). |
| `FLOWPLAN_SNAPSHOT_RETENTION_DAYS` | `180` | How long automatic versions are kept, in days (`0` = forever). |
| `FLOWPLAN_OCR` | on | `0` turns off text recognition for scanned PDFs and images. |
| `FLOWPLAN_OCR_LANGS` | `deu,eng` | Languages of the text recognition, e.g. `fra,eng`; the first is the main language. `deu`, `eng`, `fra` and `chi_sim` (Chinese, Simplified, e.g. `chi_sim,eng`) are bundled. Each extra language costs memory and time per page; Chinese the most (about 100 MB more memory, roughly one and a half times as long per page). |
| `FLOWPLAN_METRICS` | on | `off` switches off the usage statistics of the [monitoring](/monitoring#statistics): requests, errors and response times per minute, active people per hour, storage history and AI tokens. Only numbers are collected – no IP addresses, paths or names; minutes are kept 48 hours, hours 35 days, days 400 days. With `off` nothing is collected, and the switch **Collect usage statistics** under **Administration → Monitoring → Statistics** is locked. `/api/metrics` does not depend on it. |
| `FLOWPLAN_METRICS_TOKEN` | *empty* | At least 16 characters; enables `/api/metrics` in Prometheus format. Sent as `Authorization: Bearer …`, it also unlocks the details of `/api/health` (see [Health check](/operations#health-check)). |
| `FLOWPLAN_PUBLIC_API_DOCS` | `false` | `true` makes `/api/openapi.json` and `/api/docs` readable without signing in; visitors only see the major version (`0.x`) there. Otherwise only for signed-in people and API tokens. |
| `FLOWPLAN_UPDATE_CHECK` | on | `false` turns off the check for new versions (for instances without internet). Otherwise the server asks GitHub for the latest release at most every 12 hours and shows admins a notice in the administration. |
| `FLOWPLAN_MARKETPLACE_URL` | `https://marketplace.flowplan.org` | Address of the Flowplan Marketplace (default `https://marketplace.flowplan.org`); `off` switches it off. The instance never connects to it itself – the address only decides which window the browser exchanges templates with. See [Marketplace](/marketplace). |
| `FLOWPLAN_UPDATE_URL` | GitHub API | Another address for the latest release (same format as `api.github.com/repos/yannicschuller/flowplan/releases/latest`), such as an internal mirror. Not to be confused with the [desktop app's](/desktop-app) variable of the same name, which names the app's update source on the computer running it. |
| `FLOWPLAN_TRUSTED_PROXIES` | `1` | Number of proxies in front of Flowplan (Traefik alone: `1`, Pangolin in front of Traefik: `2`, `0` = trust no header). Decides which entry in `X-Forwarded-For` is the real address – for limiting sign-in attempts, demo starts and anonymous form answers. Entries made up by the browser are ignored this way. When no address arrives at all (the proxy does not set the header), only the limits per account and per link apply, and the log shows a note once. |
| `FLOWPLAN_SECURITY_LOG` | `on` | Security events as a JSON line on stdout: `on` (with address, for fail2ban/CrowdSec), `anonymous`, `off` ([Security](/en/security-monitoring#security)). |
| `FLOWPLAN_SECURITY_RETENTION_DAYS` | `90` | How long security events stay in the database (at least 7). |
| `FLOWPLAN_COUNTRY_HEADER` | *empty* | The proxy's header with the country of the request (e.g. `CF-IPCountry`); turns on the rule "two countries in a short time". |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | *empty* | OTLP collector (HTTP); security events go there as OpenTelemetry logs. With `OTEL_EXPORTER_OTLP_HEADERS` and `OTEL_SERVICE_NAME`. |
| `FLOWPLAN_ANONYMOUS_UPLOAD_MB` | `1024` | How many MB visitors without an account may upload per day on the whole instance – through anonymous forms and editing links (`0` = unlimited). Each form or link additionally gets 200 MB per day, independent of the workspace's storage quota. |

The Typst preview loads its compiler and fonts (WebAssembly, about 11 MB compressed) on first use from `/typst/…` of your own server; nothing is fetched from a CDN.

## Do not set

The image sets `NODE_ENV`, `PORT`, `HOSTNAME` and `NEXT_TELEMETRY_DISABLED` itself. `FLOWPLAN_DIST_DIR` is only meant for parallel development servers, `OIDC_ALLOW_LOCAL_HTTP` only for tests with a provider on `http://localhost`, `FLOWPLAN_GIT_ALLOW_HTTP` only for tests of the Git export with an `http://` server (no effect in production). Version and commit (`FLOWPLAN_VERSION`, `GIT_COMMIT`, `SOURCE_COMMIT`) come from the build; `FLOWPLAN_VERSION` in `.env` only picks the image tag in `compose.yaml`.

## In the interface

In the **Administration**, administrators set (see [Administering the instance](/administration)):

- **Instance**: the instance name and whether the instance offers a public **demo** (running and total started demos are shown under **Administration → Monitoring → Instance in numbers**),
- **Sign-in & SSO**: whether anyone may sign up with e-mail and password, whether everyone may create workspaces of their own, after how many days without sign-in accounts are blocked, required two-factor sign-in,
- **Limits & retention**: the default storage quota, storage and own workspaces per person, the maximum upload size, how long versions are kept,
- **Storage & backup**: the daily or hourly database backup and how many copies are kept,
- **Maintenance & notices**: a notice banner for everyone and the maintenance notice,
- **Extensions & domains**: **Custom domains for publications** (off) and **Block extensions from any HTTPS address** (off) – see [Coolify and reverse proxies](/coolify-and-proxy#custom-domains-for-publications) and [Block extensions](/plugins),
- **Monitoring → Statistics**: whether usage statistics are collected (locked with `FLOWPLAN_METRICS=off`).

Empty fields fall back to the environment variables.
