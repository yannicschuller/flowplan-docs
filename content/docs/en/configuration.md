# Configuration

All environment variables at a glance. Many values can also be set in the interface of the **Administration** (see [In the interface](#in-the-interface)); values set there take precedence.

## Required

| Variable | Example | Meaning |
| --- | --- | --- |
| `APP_URL` | `https://flowplan.example.com` | The public address exactly as it appears in the browser – scheme, host, port if any, without a trailing slash. The basis for sign-in redirects, cookies, passkeys, links in e-mails and push notifications and the origin check. |

## Sign-in

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_LOCAL_LOGIN` | on | `false` turns off e-mail, password and passkeys; then only single sign-on remains. |
| `OIDC_ISSUER` | *empty* | The login provider for single sign-on. Without it there are only e-mail, password and passkeys. |
| `OIDC_CLIENT_ID` | – | Client ID. |
| `OIDC_CLIENT_SECRET` | – | Client secret. Never put it into the image or into Git. |
| `OIDC_LINKED_SSO_ONLY` | off | `true`: accounts connected to SSO sign in through SSO only. A password or passkey sign-in is refused with a note; passkeys and the authenticator app stay for confirming important steps. See [Connect an existing account to SSO](/en/sign-in#connect-an-existing-account-to-sso). |
| `OIDC_NEW_ACCOUNTS` | on | `false`: SSO sign-in creates no new accounts – only existing, connected or SCIM-provisioned accounts sign in. At a first SSO sign-in with a known address, "Create a separate account instead" is then not offered. |
| `SESSION_HOURS` | `8` | How long a session lasts in hours (1–24). Without `SESSION_REMEMBER` this applies to every session, the apps' too. |
| `SESSION_REMEMBER` | off | `true` offers **Stay signed in** when signing in – see [Sign-in](/sign-in#stay-signed-in). Recommended when the desktop or mobile apps and their widgets are used. |
| `SESSION_IDLE_HOURS` | `168` | With "stay signed in": the session ends this many hours after it was last used (1–2160, at most `SESSION_MAX_DAYS`). |
| `SESSION_MAX_DAYS` | `30` | With "stay signed in": sign in again after this many days at the latest (1–365) – with SSO just as with password and passkey. |
| `SESSION_GROUPS_HOURS` | *empty* | Only when set: SSO sessions with "stay signed in" end after this many hours already, so group changes at the provider take effect with the new sign-in. Without it they follow through SCIM, the LDAP sync or the next sign-in. |
| `LDAP_URL` | *empty* | Sign-in with an LDAP directory (`ldap://` or `ldaps://`) – see [Sign-in with LDAP](/sign-in#sign-in-with-ldap). |
| `LDAP_BIND_DN` / `LDAP_BIND_PASSWORD` | *empty* | Search account for LDAP; without it, anonymous search. |
| `LDAP_BASE_DN` | – | Where LDAP accounts are searched. |
| `LDAP_USER_FILTER` | `(\|(uid={user})(mail={user}))` | Search filter; `{user}` is the escaped sign-in name. |
| `LDAP_GROUP_ATTRIBUTE` | `memberOf` | Groups for SSO mappings and the admin group, synced hourly. |
| `LDAP_TLS_CA` | *empty* | CA for `ldaps://`/StartTLS (path or PEM). |
| `LDAP_STARTTLS` | `false` | `ldap://` with StartTLS. |
| `LDAP_TIMEOUT_MS` | `8000` | Time limit per LDAP operation. |
| `LDAP_CONTACTS_BASE_DN` | `LDAP_BASE_DN` | Base for [contacts from LDAP](/sign-in#contacts-from-ldap); the OU tree starts here. |
| `LDAP_CONTACTS_FILTER` | people without computers | Which entries count as contacts. |
| `LDAP_CONTACTS_SYNC_MINUTES` | `60` | Sync of contacts from the directory (15–1440 minutes). |
| `LDAP_CONTACTS` | on | `off` turns contacts from LDAP off. |

The other OIDC variables and everything about passwords and passkeys are described under [Sign-in](/sign-in).

## Operations

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_DATA_DIR` | `/app/data` in the image, `./data` otherwise | Data directory for SQLite, uploads, push keys and text recognition data. |
| `FLOWPLAN_WORKSPACE_QUOTA_MB` | unlimited | Default storage quota per workspace in MB (`0` = unlimited). |
| `FLOWPLAN_IMPORT_MAX_MB` | *empty* | Largest file for [imports from AFFiNE](/migrate#from-affine) and other tools in MB, for everyone. Without it the **largest upload** applies (Administration → Limits & retention, or the person's own limit), at least 100 MB. Only the AFFiNE workspace file (`.affine`) may exceed 100 MB; ZIP exports stay at 100 MB. A proxy in front must let such large requests through. |
| `FLOWPLAN_IMPORT_MAX_DOCS` | `10000` | Largest number of pages per [import](/migrate) from AFFiNE, Confluence, Evernote, Google Docs, Obsidian and Notion/Markdown: documents, folders, databases, whiteboards and collections; when importing as a new database, the number of records. Above it the preview shows the count and the import is refused (the message names the variable). Documents are converted one at a time; a higher value costs time, hardly memory. |
| `FLOWPLAN_IMPORT_MAX_FILES` | `20000` | Largest number of files (images, attachments) per import from an AFFiNE workspace or snapshot; further ones are left out, the preview names their number and the variable. ZIP exports may have as many entries as pages and files together (at least 12,000). |
| `FLOWPLAN_SNAPSHOT_RETENTION_DAYS` | `180` | How long automatic versions are kept, in days (`0` = forever). |
| `FLOWPLAN_OCR` | on | `0` turns off text recognition for scanned PDFs and images. |
| `FLOWPLAN_OCR_LANGS` | `deu,eng` | Languages of the text recognition, e.g. `fra,eng`; the first is the main language. `deu`, `eng` and `fra` are bundled. Each extra language costs memory and time per page. |
| `FLOWPLAN_METRICS` | on | `off` switches off the usage statistics of the [monitoring](/operations#statistics): requests, errors and response times per minute, active people per hour, storage history and AI tokens. Only numbers are collected – no IP addresses, paths or names; minutes are kept 48 hours, hours 35 days, days 400 days. With `off` nothing is collected, and the switch **Collect usage statistics** under **Administration → Monitoring → Statistics** is locked. `/api/metrics` does not depend on it. |
| `FLOWPLAN_METRICS_TOKEN` | *empty* | At least 16 characters; enables `/api/metrics` in Prometheus format. Sent as `Authorization: Bearer …`, it also unlocks the details of `/api/health` (see [Health check](/operations#health-check)). |
| `FLOWPLAN_PUBLIC_API_DOCS` | `false` | `true` makes `/api/openapi.json` and `/api/docs` readable without signing in; visitors only see the major version (`0.x`) there. Otherwise only for signed-in people and API tokens. |
| `FLOWPLAN_UPDATE_CHECK` | on | `false` turns off the check for new versions (for instances without internet). Otherwise the server asks GitHub for the latest release at most every 12 hours and shows admins a notice in the administration. |
| `FLOWPLAN_UPDATE_URL` | GitHub API | Another address for the latest release (same format as `api.github.com/repos/yannicschuller/flowplan/releases/latest`), such as an internal mirror. Not to be confused with the [desktop app's](/offline-and-apps#desktop-app-for-macos-windows-and-linux) variable of the same name, which names the app's update source on the computer running it. |
| `FLOWPLAN_TRUSTED_PROXIES` | `1` | Number of proxies in front of Flowplan (Traefik alone: `1`, Pangolin in front of Traefik: `2`, `0` = trust no header). Decides which entry in `X-Forwarded-For` is the real address – for limiting sign-in attempts, demo starts and anonymous form answers. Entries made up by the browser are ignored this way. When no address arrives at all (the proxy does not set the header), only the limits per account and per link apply, and the log shows a note once. |
| `FLOWPLAN_SECURITY_LOG` | `on` | Security events as a JSON line on stdout: `on` (with address, for fail2ban/CrowdSec), `anonymous`, `off` ([Security](/en/operations#security)). |
| `FLOWPLAN_SECURITY_RETENTION_DAYS` | `90` | How long security events stay in the database (at least 7). |
| `FLOWPLAN_COUNTRY_HEADER` | *empty* | The proxy's header with the country of the request (e.g. `CF-IPCountry`); turns on the rule "two countries in a short time". |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | *empty* | OTLP collector (HTTP); security events go there as OpenTelemetry logs. With `OTEL_EXPORTER_OTLP_HEADERS` and `OTEL_SERVICE_NAME`. |
| `FLOWPLAN_ANONYMOUS_UPLOAD_MB` | `1024` | How many MB visitors without an account may upload per day on the whole instance – through anonymous forms and editing links (`0` = unlimited). Each form or link additionally gets 200 MB per day, independent of the workspace's storage quota. |

The Typst preview loads its compiler and fonts (WebAssembly, about 11 MB compressed) on first use from `/typst/…` of your own server; nothing is fetched from a CDN.

## S3 and database backup

| Variable | Default | Meaning |
| --- | --- | --- |
| `S3_BUCKET` | *empty* | Turns S3 on. Without this variable everything stays local. |
| `S3_ENDPOINT` | AWS | API address of the storage, e.g. `http://minio:9000`. |
| `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | – | Access keys with read and write access to the bucket. |
| `S3_REGION` | `us-east-1` | Region. Garage requires its own value (often `garage`). |
| `S3_PREFIX` | `flowplan` | Folder in the bucket; files under `<prefix>/uploads/`, the database under `<prefix>/db/`. |
| `FLOWPLAN_LITESTREAM` | on | `off`: only mirror files, do not back up the database. |
| `LITESTREAM_SSE_C_KEY` | *empty* | Optional: the storage provider encrypts the Litestream replica (SSE-C, 32 bytes base64, only over https and with providers that support SSE-C). |

Details: [Storage, S3 and backups](/storage-and-backups).

## Encryption

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_ENCRYPTION_KEY` | *empty* | 32 bytes, base64 (`openssl rand -base64 32`). Encrypts files in the bucket, scheduled backups, Markdown exports and the instance backup. Without a key nothing changes. |
| `FLOWPLAN_ENCRYPTION_KEY_FILE` | *empty* | Instead of the variable: path to a file holding the key (Docker secret). |
| `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS` | *empty* | Earlier keys, comma-separated – only for reading after a key change. |

Details: [Encryption](/storage-and-backups#encryption).

## Stored secrets

Flowplan stores AI provider keys, the keys of authenticator apps ([two-factor sign-in](/sign-in#two-factor-sign-in)), the access tokens of the [Git export of spaces](/storage-and-backups#git-export-of-a-space) and the tokens of [chat apps](/search-and-notifications#chat-apps) only encrypted (AES-256-GCM, bound to their place). The key for this comes, in this order, from:

| Source | Meaning |
| --- | --- |
| `FLOWPLAN_ENCRYPTION_KEY` | If set, it also encrypts the stored secrets. |
| `FLOWPLAN_SECRETS_KEY` / `FLOWPLAN_SECRETS_KEY_FILE` | A key just for this: 32 bytes, base64 or hex (`openssl rand -base64 32`), or the path to a file (Docker secret). |
| `secrets.key` in the data folder | Without the two variables, Flowplan creates this file itself when first needed (readable only by its owner). |

> [!IMPORTANT]
> The instance backup deliberately leaves out `secrets.key` – it doesn't belong next to the data it protects. Back up the file separately or set the key as a variable. If it is missing after a restore, admins and users enter their AI keys and chat-app tokens again, and for two-factor sign-in recovery codes or a reset by an administrator help.

## E-mail (SMTP)

| Variable | Default | Meaning |
| --- | --- | --- |
| `SMTP_HOST` | *empty* | Turns on sending e-mail: invitations, address confirmations, password resets and digests of unread notifications. |
| `SMTP_PORT` | `587` | Port. With `465` Flowplan speaks TLS directly, STARTTLS otherwise. |
| `SMTP_SECURE` | by port | `true`/`false` forces TLS from the start of the connection. |
| `SMTP_USER` / `SMTP_PASSWORD` | *empty* | Sign-in at the mail server. |
| `SMTP_FROM` | `Flowplan <SMTP_USER>` | Sender, e.g. `Flowplan <flowplan@example.com>`. |

Check delivery under **Administration → E-mail → Send test email**.

## Inbound e-mail (IMAP)

For [inbound e-mail](/api-and-webhooks#inbound-e-mail) via webhook (Mailgun, Postmark, SendGrid, Cloudflare) nothing needs to be set. A mailbox of your own is polled over IMAP every two minutes:

| Variable | Default | Meaning |
| --- | --- | --- |
| `INBOUND_MAIL_DOMAIN` | *empty* | Domain of the inbound addresses, e.g. `mail.example.com`. The settings then show `inbox+<token>@mail.example.com` for each address. |
| `INBOUND_IMAP_HOST` | *empty* | Turns on IMAP polling (together with `INBOUND_IMAP_USER`). |
| `INBOUND_IMAP_PORT` | `993` | Port (`143` when `INBOUND_IMAP_TLS=false`). |
| `INBOUND_IMAP_USER` / `INBOUND_IMAP_PASSWORD` | *empty* | Sign-in at the mailbox. The part before `@` is also the part before `+` in the addresses. |
| `INBOUND_IMAP_FOLDER` | `INBOX` | Folder that is polled. |
| `INBOUND_IMAP_TLS` | `true` | `false` only for a mail server on the same host or network (unencrypted). |

The mail server must support plus addressing (`inbox+anything@…` is delivered to `inbox@…`); Dovecot, Postfix, Gmail/Google Workspace and Microsoft 365 (switch it on there) do. Flowplan marks processed e-mails as read and deletes nothing.

## Integrations

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE` | *empty* | `true` allows webhooks to internal addresses and `http://` – such as Home Assistant or n8n in the same network. Without this variable only public HTTPS addresses are allowed. |
| `SPACE_GIT_EXPORT` | *empty* | `true` turns on the [Git export of spaces](/storage-and-backups#git-export-of-a-space): space owners push their space into a repository of their own, daily or weekly. |
| `SPACE_GIT_ALLOWED_HOSTS` | *empty* | Allowed Git servers for it, comma-separated (e.g. `git.example.org`). Without it any public `https://` server is allowed; internal addresses never. |
| `SPACE_GIT_ALLOW_PRIVATE` | *empty* | `true` also allows internal addresses for the servers listed in `SPACE_GIT_ALLOWED_HOSTS` – for example a Forgejo on the same host that the container reaches via `--add-host git.example.org:host-gateway`. Only works together with the list; every other server stays limited to public addresses. |
| `ISSUE_SYNC_ALLOWED_HOSTS` | *empty* | Own servers for the [GitHub and GitLab issue sync](/projects-and-tickets#sync-github-and-gitlab-issues), comma-separated (e.g. `gitlab.example.org`). github.com and gitlab.com are always allowed; other servers only when listed here. |
| `ISSUE_SYNC_ALLOW_PRIVATE` | *empty* | `true` also allows internal addresses for the servers listed in `ISSUE_SYNC_ALLOWED_HOSTS` – for example a GitLab in the same network. Only works together with the list. |
| `NETBOX_ALLOW_PRIVATE` | *empty* | `true` also allows internal addresses and `http://` for the [NetBox import on whiteboards](/en/whiteboards#import-and-export) – for example a NetBox in the same network. Without it, only public HTTPS addresses. The address and token are never stored on the server. |
| `PLUGIN_ALLOWED_ORIGINS` | *empty* | HTTPS origins owners may register [block extensions](/plugins) from, comma-separated (e.g. `https://plugins.example.org`). Without it only when the administration switches on **Block extensions from any HTTPS address**. The origins are also added to the `frame-src` of the Content Security Policy. |
| `GIPHY_API_KEY` / `TENOR_API_KEY` | *empty* | Key for the [GIF search on whiteboards](/whiteboards#images-icons-and-records) at GIPHY or Tenor (if both are set, GIPHY wins). Without a key the **GIFs** tab is hidden. Searches run through the server; chosen GIFs up to 8 MB are stored on the server. |
| `EXPORT_GIT_*` | *empty* | Deprecated: the Git export of the whole instance, see [Push into a Git repository](/storage-and-backups#push-into-a-git-repository). Keeps working; the Git export of spaces is the better choice. |

## Calendar sync

Two-way sync of database views with [Google Calendar and Microsoft Outlook / 365](/views#sync-with-google-calendar-or-outlook). Each person connects their own account; without a client ID that provider stays hidden. Flowplan asks for changes every ten minutes (the providers' push notifications are not used – they would need a publicly reachable HTTPS address verified with the provider).

| Variable | Default | Meaning |
| --- | --- | --- |
| `GOOGLE_CALENDAR_CLIENT_ID` / `GOOGLE_CALENDAR_CLIENT_SECRET` | *empty* | OAuth client (type “Web application”) from the Google Cloud Console, with the Google Calendar API enabled and the scope `…/auth/calendar`. Redirect URI: `<APP_URL>/api/calendar-sync/callback/google`. |
| `MS_CALENDAR_CLIENT_ID` / `MS_CALENDAR_CLIENT_SECRET` | *empty* | App registration in Microsoft Entra ID (web platform) with the delegated permissions `Calendars.ReadWrite` and `offline_access`. Redirect URI: `<APP_URL>/api/calendar-sync/callback/microsoft`. |
| `MS_CALENDAR_TENANT` | `common` | `common` (work and personal accounts), `organizations` or a tenant ID. |

People's refresh tokens are stored sealed in the database (like all [stored secrets](#stored-secrets)).

## Legal and interface

| Variable | Default | Meaning |
| --- | --- | --- |
| `IMPRINT_URL` | *empty* | Link to the legal notice, e.g. `https://example.com/imprint`. Shown on the sign-in page, under shared pages and forms and in the account menu – only when set. |
| `PRIVACY_URL` | *empty* | Link to the privacy policy, in the same places and also only when set. |

## Voice notes (Whisper)

Voice notes in the editor are always stored as audio. With a Whisper service in your own network, Flowplan also turns them into text; the recording never leaves your server.

| Variable | Default | Meaning |
| --- | --- | --- |
| `WHISPER_URL` | *empty* | Address of an OpenAI-compatible Whisper server (`POST /v1/audio/transcriptions`), e.g. `http://whisper:8000`. Turns transcription on. |
| `WHISPER_MODEL` | `Systran/faster-whisper-small` | The model name as the service expects it. |
| `WHISPER_LANGUAGE` | `de` | Language of the recordings (e.g. `en`). |
| `WHISPER_API_KEY` | *empty* | Only if the service requires a key. |
| `WHISPER_MAX_MB` | `200` | Largest recording in MB. |
| `WHISPER_RESPONSE_FORMAT` | `verbose_json` | Response format of speech recognition; falls back to `json` once. |
| `WHISPER_DIARIZE` | *empty* | `on`: ask for speaker separation (`diarize=true`), only for services that support it. |

Example with [speaches](https://github.com/speaches-ai/speaches) (formerly faster-whisper-server) in the same Compose project:

```yaml
  whisper:
    image: ghcr.io/speaches-ai/speaches:latest-cpu
    volumes:
      - whisper-models:/home/ubuntu/.cache/huggingface/hub
    restart: unless-stopped
```

Then set `WHISPER_URL=http://whisper:8000` for Flowplan. Newer speaches versions do not download models by themselves; download it once, for example from the Flowplan container:

```sh
node -e "fetch('http://whisper:8000/v1/models/Systran/faster-whisper-small',{method:'POST'}).then(r=>console.log(r.status))"
```

`small` needs about 1 GB of memory and transcribes roughly in real time on a normal CPU; `base` is faster and less accurate, `medium` more accurate and considerably slower. Do not make the Whisper service publicly reachable – only Flowplan talks to it.

## AI

All optional; the values apply until an admin saves under **Administration → AI**. Details: [AI](/ai).

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_AI` | *off* | `on` switches AI on. |
| `FLOWPLAN_AI_PROVIDER` | *empty* | `ollama`, `openai` (OpenAI-compatible), `anthropic` or `gemini`. If only `OLLAMA_URL` is set, Ollama is used. |
| `OLLAMA_URL` | *empty* | Address of Ollama, e.g. `http://ollama:11434` with the Compose service. |
| `FLOWPLAN_AI_BASE_URL` | *per provider* | Address of the provider, e.g. `https://api.mistral.ai/v1` for an OpenAI-compatible service. |
| `FLOWPLAN_AI_MODEL` | *empty* | Model, e.g. `llama3.1` or `gpt-4o-mini`. |
| `FLOWPLAN_AI_EMBEDDING_MODEL` | *empty* | Model for semantic search, e.g. `nomic-embed-text` (Ollama). Without it: full-text search only. |
| `FLOWPLAN_AI_API_KEY` / `FLOWPLAN_AI_API_KEY_FILE` | *empty* | The provider's key. Never stored in the database and only used for the provider from the variables. |
| `FLOWPLAN_AI_ACCESS` | `everyone` | `selected`: only people who were enabled. |
| `FLOWPLAN_AI_GUESTS` | *off* | `on`: guests may use AI too. |
| `FLOWPLAN_AI_USER_PROVIDERS` | *off* | `on`: people may add their own provider and key. |
| `FLOWPLAN_AI_FEATURES` | *all* | Allowed features, comma-separated: `write`, `summarize`, `ask`, `database`, `actions`, `whiteboard`. |
| `FLOWPLAN_AI_DEVICE` | *on* | `off`: no [on-device AI](/ai#on-device-ai-apple) in the apps for iPhone, iPad and Mac. Independent of `FLOWPLAN_AI`. |
| `FLOWPLAN_AI_SEMANTIC_SEARCH` | *off* | `on`: [semantic search](/ai#semantic-search-optional) with the embedding model. |
| `FLOWPLAN_AI_EMBED_PER_HOUR` | `5000` | Maximum chunks embedded per hour for semantic search. |
| `FLOWPLAN_AI_REQUESTS_PER_HOUR` | `300` | Maximum AI requests per person and hour (plus 30 per minute, 3 at once). |

## Push notifications

| Variable | Meaning |
| --- | --- |
| `WEB_PUSH_SUBJECT` | Contact for the push services, e.g. `mailto:admin@example.com`. |
| `WEB_PUSH_PUBLIC_KEY` / `WEB_PUSH_PRIVATE_KEY` | VAPID key pair. If not given, Flowplan creates one in `FLOWPLAN_DATA_DIR/web-push-keys.json`. |
| `MOBILE_PUSH` | Notifications to the apps for iPhone, iPad and Android. Nothing to set up; `off` turns them off altogether. Default: `on`. |
| `PUSH_RELAY_URL` | The [push relay](#push-relay-and-end-to-end-encryption) notifications to the apps go through. An HTTPS origin only (`http` only for `localhost`), without a path. Default: `https://push.flowplan.org`. |
| `PUSH_RELAY` | `off`: no relay. Apps then only get notifications if they have an Expo token (older app versions), through Expo's push service. Default: `on`. |
| `MOBILE_PUSH_CONTENT` | Whether the notification's text comes along – and with it the buttons **Done** and **Tomorrow** on due tasks and **Reply** on comments ([Buttons on notifications](/offline-and-apps#buttons-on-notifications)); **Mark as read** is always there. *Empty* (default): only where it is end-to-end encrypted, i.e. through the relay; through Expo (older apps) only "something new in the inbox" as with Web Push, and Live Activities only with times, no titles. `on`: also through Expo and with titles in Live Activities – readable by Expo, Apple and Google. `off`: never, not even through the relay. |

The VAPID keys must not change, otherwise all browsers lose their subscription. Outgoing HTTPS to the push services of Apple, Google and Mozilla (Web Push) and to the push relay must be possible.

### Push relay and end-to-end encryption

Notifications to the apps go through the Flowplan push relay (`push.flowplan.org`). Only the relay holds the credentials for Apple (APNs) and Google (Firebase); your instance needs none of its own – self-hosted instances, too, reach the apps from the App Store and Google Play this way.

- **End-to-end encrypted:** every app installation creates a key pair (X25519) per instance and gives the instance only the public key. The instance encrypts every notification with it (HKDF-SHA256, AES-256-GCM, a fresh one-time key per notification); only the app on the device decrypts it. The relay, Apple and Google only see ciphertext – plus the kind of message, which buttons it has, the number on the app icon and when it was sent. If a notification cannot be decrypted, the app shows "New notification".
- **Signed:** the instance has a signing key pair of its own (Ed25519), created on first use. The private key is stored only encrypted in the database (like stored secrets, see above); the public key is published at `/.well-known/flowplan-push`. The relay only accepts signed requests, and only for devices that registered for exactly this instance. For this, `APP_URL` must be the public HTTPS address, and `/.well-known/flowplan-push` must be reachable from outside.
- **What is stored:** per app installation the relay token (only encrypted) and the public key. Both go with signing out, removing the device under *Signed-in devices*, or when the relay reports that the device can no longer be reached. Neither tokens nor keys nor content are logged.
- **Live Activities** (iPhone) for the timer and focus are also updated by the instance through the relay when their state changes. iOS renders their content itself – it cannot be encrypted. By default it therefore holds only times and the phase, no titles (`MOBILE_PUSH_CONTENT=on` sends the title along).
- **Older app versions** without the relay keep getting notifications through Expo's push service (`exp.host`), without text by default.
- **Rotating the signing key:** `node --import tsx scripts/push-relay-key.mjs rotate` in the repository, or as an administrator `POST /api/admin/operations` with `{"action":"pushRelay.rotate"}`. The new key is published at once and signs after a little more than an hour; the old one stays listed for 7 days (`--grace-days` or `graceDays`). For a key that may have leaked, `--immediate` or `"immediate": true`: the new one signs at once, all old ones are removed. `{"action":"pushRelay.keys"}` lists the keys (ids and dates only). Or under **Administration → Push notifications → Rotate key …**.
- **Your own relay:** only together with your own app build – see [Running your own push relay](#running-your-own-push-relay).
- **Checking it:** **Settings → Notifications → Send test notification** sends at once through the relay, Expo and Web Push to your own devices and shows the result per device – for example that the relay could not verify the instance (`/.well-known/flowplan-push` not reachable) or cannot be reached. Administrators also see the relay address, whether `/.well-known/flowplan-push` is enabled and the `APP_URL` in use. See [Test notification](/search-and-notifications#test-notification).
- **State in the administration:** **Administration → Push notifications** shows the relay in use (official or your own), whether it is on and otherwise why not, whether it is reachable right now (`/healthz`, with response time), whether the instance can fetch its own `/.well-known/flowplan-push` at `APP_URL`, the signing keys with **Rotate key …**, the deliveries of the last 24 hours per channel and the last error. See [Administration → Push notifications](/administration#push-notifications).

**For an instance's privacy policy**, for example: "Push notifications to the Flowplan apps are delivered end-to-end encrypted through Flowplan's push service (push.flowplan.org) and the services of Apple (APNs) or Google (Firebase Cloud Messaging). These services receive a device token, the address of this instance, the time and the kind of the notification, but not its content." – extend it accordingly with `MOBILE_PUSH_CONTENT=on` or notifications through Expo.

### Running your own push relay

The relay is open source ([github.com/yannicschuller/flowplan-push](https://github.com/yannicschuller/flowplan-push)) and can be self-hosted. **The official Flowplan apps (iPhone and iPad on TestFlight, Android from [flowplan.org/download](https://flowplan.org/download)) don't need it** – they only accept notifications through `push.flowplan.org`, because Apple and Google deliver to these apps only with Flowplan's keys. Your own relay makes sense if you build **your own app version** (own bundle ID, own Apple team) or want to reach instances in an internal network.

1. **Start the relay** – as the Docker image `ghcr.io/yannicschuller/flowplan-push:latest` (or built from the repository), e.g. in Coolify at `https://push.example.com`, port `8080`, a volume on `/data`. Environment variables:

   | Variable | Value |
   | --- | --- |
   | `RELAY_STORAGE_KEY` | `openssl rand -base64 32` – encrypts the stored device tokens |
   | `RELAY_PUBLIC_URL` | the relay's public address without a path, e.g. `https://push.example.com` (otherwise `https://push.flowplan.org` applies) |
   | `APNS_KEY_ID`, `APNS_TEAM_ID`, `APNS_KEY` | your Apple team's APNs key (`.p8`): key ID, team ID and the file's contents (base64 also works) |
   | `ALLOWED_BUNDLE_IDS` | your app's bundle ID, e.g. `com.example.notes` |
   | `FCM_SERVICE_ACCOUNT` | optional, your Firebase project's service-account JSON for Android |
   | `TRUST_PROXY` | `1` behind Coolify/Traefik |
   | `ALLOW_PRIVATE_INSTANCES` | `true` if instances in an internal network (private addresses, `http://localhost`) should send notifications – meant for development and closed networks only, as the relay's README says |

   `https://push.example.com/healthz` answers `{"status":"ok"}`; the start-up log says whether APNs and FCM are set up.
2. **Build the app** – with your bundle ID and Apple team, `PUSH_RELAY_URL=https://push.example.com` (the app's build variable) and, for Android, your `google-services.json`. The app only registers with the relay it was built for.
3. **Configure the instance** – `PUSH_RELAY_URL=https://push.example.com`. `APP_URL` must be the instance's HTTPS address and `/.well-known/flowplan-push` reachable for the relay. An instance can use one relay only: pointed at yours, it no longer reaches the store apps through the relay.
4. **Check** – with the [test notification](/search-and-notifications#test-notification).

Operations, key rotation, blocking abusive instances (`node dist/src/cli.js block <origin>` in the container) and backups are described in the relay's README.

## Chat apps

Notifications to [Telegram, Gotify, ntfy and Matrix](/search-and-notifications#chat-apps). Everything can also be set under **Administration → Chat apps**; values saved there take precedence.

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_MESSENGERS` | *all* | Services people may connect, comma-separated: `telegram`, `gotify`, `ntfy`, `matrix`; `off` for none. |
| `FLOWPLAN_TELEGRAM_BOT_TOKEN` | *empty* | Token of the instance's Telegram bot (from @BotFather). With it people connect Telegram through a link with a one-time code, without an own bot. |
| `FLOWPLAN_TELEGRAM_API_URL` | `https://api.telegram.org` | Address of the Bot API for the instance's bot – a self-hosted [Telegram Bot API server](https://github.com/tdlib/telegram-bot-api) or a relay/proxy. May be in the own network and `http://`. |
| `FLOWPLAN_MESSENGER_ALLOW_PRIVATE` | as `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE` | `true`: people may name servers in the own network (internal addresses, `http://`) – e.g. Gotify or ntfy at home. Otherwise internal addresses are blocked, also when a name is later pointed at one. |

**The instance's bot without a public address:** Flowplan uses no webhook but reads the bot's messages with `getUpdates` – only while a connection code waits (at most 15 minutes). Outgoing HTTPS to the Bot API is enough. The bot must therefore not have a webhook at the same time or be polled by another program (Telegram then reports a conflict, the administration shows it) – use a separate bot just for Flowplan.

**Outgoing connections:** to `api.telegram.org` (or the own API address), `ntfy.sh` and the servers people name. They go through the same check as link previews and webhooks: resolve the address, refuse internal addresses, use exactly the checked address, no redirects. Refused attempts appear as the security event “Internal address refused (SSRF)”.

The tokens of people and of the bot are stored encrypted like other [stored secrets](#stored-secrets). If the key is missing after a restore, the administration enters the bot token again; connections with an own token are switched off after three failed attempts, and their owners learn it in the inbox.

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
