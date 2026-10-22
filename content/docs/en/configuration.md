# Configuration

All environment variables at a glance. Many values can also be set in the interface under **Administration → Instance**; values set there take precedence.

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
| `SESSION_HOURS` | `8` | How long a session lasts in hours (1–24). |
| `SESSION_REMEMBER` | off | `true` offers **Stay signed in on this device** when signing in – see [Sign-in](/sign-in#stay-signed-in). |
| `SESSION_IDLE_HOURS` | `168` | With "stay signed in": the session ends this many hours after it was last used. |
| `SESSION_MAX_DAYS` | `30` | With "stay signed in": sign in again after this many days at the latest (1–365). |
| `SESSION_GROUPS_HOURS` | `168` | With "stay signed in" and SSO: sign in at the provider again after this many hours, so group changes take effect. |
| `LDAP_URL` | *empty* | Sign-in with an LDAP directory (`ldap://` or `ldaps://`) – see [Sign-in with LDAP](/sign-in#sign-in-with-ldap). |
| `LDAP_BIND_DN` / `LDAP_BIND_PASSWORD` | *empty* | Search account for LDAP; without it, anonymous search. |
| `LDAP_BASE_DN` | – | Where LDAP accounts are searched. |
| `LDAP_USER_FILTER` | `(\|(uid={user})(mail={user}))` | Search filter; `{user}` is the escaped sign-in name. |
| `LDAP_GROUP_ATTRIBUTE` | `memberOf` | Groups for SSO mappings and the admin group, synced hourly. |
| `LDAP_TLS_CA` | *empty* | CA for `ldaps://`/StartTLS (path or PEM). |
| `LDAP_STARTTLS` | `false` | `ldap://` with StartTLS. |
| `LDAP_TIMEOUT_MS` | `8000` | Time limit per LDAP operation. |

The other OIDC variables and everything about passwords and passkeys are described under [Sign-in](/sign-in).

## Operations

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_DATA_DIR` | `/app/data` in the image, `./data` otherwise | Data directory for SQLite, uploads, push keys and text recognition data. |
| `FLOWPLAN_WORKSPACE_QUOTA_MB` | unlimited | Default storage quota per workspace in MB (`0` = unlimited). |
| `FLOWPLAN_SNAPSHOT_RETENTION_DAYS` | `180` | How long automatic versions are kept, in days (`0` = forever). |
| `FLOWPLAN_OCR` | on | `0` turns off text recognition for scanned PDFs and images. |
| `FLOWPLAN_OCR_LANGS` | `deu,eng` | Languages of the text recognition, e.g. `fra,eng`; the first is the main language. `deu`, `eng` and `fra` are bundled. Each extra language costs memory and time per page. |
| `FLOWPLAN_METRICS_TOKEN` | *empty* | At least 16 characters; enables `/api/metrics` in Prometheus format. |
| `FLOWPLAN_UPDATE_CHECK` | on | `false` turns off the check for new versions (for instances without internet). Otherwise the server asks GitHub for the latest release at most every 12 hours and shows admins a notice in the administration. |
| `FLOWPLAN_UPDATE_URL` | GitHub API | Another address for the latest release (same format as `api.github.com/repos/yannicschuller/flowplan/releases/latest`), such as an internal mirror. Not to be confused with the [desktop app's](/offline-and-apps#desktop-app-for-macos-windows-and-linux) variable of the same name, which names the app's update source on the computer running it. |
| `FLOWPLAN_TRUSTED_PROXIES` | `1` | Number of proxies in front of Flowplan (Traefik alone: `1`, Pangolin in front of Traefik: `2`, `0` = trust no header). Decides which entry in `X-Forwarded-For` is the real address – for limiting sign-in attempts, demo starts and anonymous form answers. Entries made up by the browser are ignored this way. When no address arrives at all (the proxy does not set the header), only the limits per account and per link apply, and the log shows a note once. |
| `FLOWPLAN_ANONYMOUS_UPLOAD_MB` | `1024` | How many MB visitors without an account may upload per day on the whole instance – through anonymous forms and editing links (`0` = unlimited). Each form or link additionally gets 200 MB per day, independent of the workspace's storage quota. |

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

Flowplan stores AI provider keys, the keys of authenticator apps ([two-factor sign-in](/sign-in#two-factor-sign-in)) and the access tokens of the [Git export of spaces](/storage-and-backups#git-export-of-a-space) only encrypted (AES-256-GCM, bound to their place). The key for this comes, in this order, from:

| Source | Meaning |
| --- | --- |
| `FLOWPLAN_ENCRYPTION_KEY` | If set, it also encrypts the stored secrets. |
| `FLOWPLAN_SECRETS_KEY` / `FLOWPLAN_SECRETS_KEY_FILE` | A key just for this: 32 bytes, base64 or hex (`openssl rand -base64 32`), or the path to a file (Docker secret). |
| `secrets.key` in the data folder | Without the two variables, Flowplan creates this file itself when first needed (readable only by its owner). |

> [!IMPORTANT]
> The instance backup deliberately leaves out `secrets.key` – it doesn't belong next to the data it protects. Back up the file separately or set the key as a variable. If it is missing after a restore, admins and users enter their AI keys again, and for two-factor sign-in recovery codes or a reset by an administrator help.

## E-mail (SMTP)

| Variable | Default | Meaning |
| --- | --- | --- |
| `SMTP_HOST` | *empty* | Turns on sending e-mail: invitations, address confirmations, password resets and digests of unread notifications. |
| `SMTP_PORT` | `587` | Port. With `465` Flowplan speaks TLS directly, STARTTLS otherwise. |
| `SMTP_SECURE` | by port | `true`/`false` forces TLS from the start of the connection. |
| `SMTP_USER` / `SMTP_PASSWORD` | *empty* | Sign-in at the mail server. |
| `SMTP_FROM` | `Flowplan <SMTP_USER>` | Sender, e.g. `Flowplan <flowplan@example.com>`. |

Check delivery under **Administration → Instance → Send test e-mail**.

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
| `EXPORT_GIT_*` | *empty* | Deprecated: the Git export of the whole instance, see [Push into a Git repository](/storage-and-backups#push-into-a-git-repository). Keeps working; the Git export of spaces is the better choice. |

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
| `FLOWPLAN_AI_FEATURES` | *all* | Allowed features, comma-separated: `write`, `summarize`, `ask`, `database`. |
| `FLOWPLAN_AI_SEMANTIC_SEARCH` | *off* | `on`: [semantic search](/ai#semantic-search-optional) with the embedding model. |
| `FLOWPLAN_AI_EMBED_PER_HOUR` | `5000` | Maximum chunks embedded per hour for semantic search. |
| `FLOWPLAN_AI_REQUESTS_PER_HOUR` | `300` | Maximum AI requests per person and hour (plus 30 per minute, 3 at once). |

## Push notifications

| Variable | Meaning |
| --- | --- |
| `WEB_PUSH_SUBJECT` | Contact for the push services, e.g. `mailto:admin@example.com`. |
| `WEB_PUSH_PUBLIC_KEY` / `WEB_PUSH_PRIVATE_KEY` | VAPID key pair. If not given, Flowplan creates one in `FLOWPLAN_DATA_DIR/web-push-keys.json`. |
| `MOBILE_PUSH` | Notifications to the apps for iPhone, iPad and Android through Expo's push service (`exp.host`), which hands them to Apple or Google. Nothing to set up; `off` turns them off. Default: `on`. |
| `MOBILE_PUSH_CONTENT` | `on` sends the notification's text along (it then passes Expo, Apple and Google). Default: `off` – as with Web Push only "something new in the inbox". |

The keys must not change, otherwise all devices lose their subscription. Outgoing HTTPS to the push services of Apple, Google and Mozilla must be possible.

## Do not set

The image sets `NODE_ENV`, `PORT`, `HOSTNAME` and `NEXT_TELEMETRY_DISABLED` itself. `FLOWPLAN_DIST_DIR` is only meant for parallel development servers, `OIDC_ALLOW_LOCAL_HTTP` only for tests with a provider on `http://localhost`.

## In the interface

Under **Administration → Instance**, administrators set:

- the instance name and a notice banner for everyone,
- the default storage quota and how long versions are kept,
- the maximum upload size,
- whether everyone may create workspaces of their own,
- whether anyone may sign up with e-mail and password,
- the daily or hourly database backup and how many copies are kept,
- after how many days without sign-in accounts are locked,
- whether the instance offers a public **demo** (running and total started demos are shown under **Administration → Operations**).

Empty fields fall back to the environment variables.
