---
keywords: smtp, imap, mail server, github, google calendar, outlook, telegram, workflows, variables
---

# Configuration: e-mail, integrations and workflows

The environment variables for sending mail and inbound e-mail, integrations such as GitHub and calendars, chat apps and workflows.

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

For [inbound e-mail](/inbound-email) via webhook (Mailgun, Postmark, SendGrid, Cloudflare) nothing needs to be set. A mailbox of your own is polled over IMAP every two minutes:

| Variable | Default | Meaning |
| --- | --- | --- |
| `INBOUND_MAIL_DOMAIN` | *empty* | Domain of the inbound addresses, e.g. `mail.example.com`. The settings then show `inbox+<token>@mail.example.com` for each address. |
| `INBOUND_IMAP_HOST` | *empty* | Turns on IMAP polling (together with `INBOUND_IMAP_USER`). |
| `INBOUND_IMAP_PORT` | `993` | Port (`143` when `INBOUND_IMAP_TLS=false`). |
| `INBOUND_IMAP_USER` / `INBOUND_IMAP_PASSWORD` | *empty* | Sign-in at the mailbox. The part before `@` is also the part before `+` in the addresses. |
| `INBOUND_IMAP_FOLDER` | `INBOX` | Folder that is polled. |
| `INBOUND_IMAP_TLS` | `true` | `false` only for a mail server on the same host or network (unencrypted). |
| `INBOUND_MAIL_AUTHSERV_ID` | *empty* | The id (authserv-id) your own receiving mail server or provider starts its `Authentication-Results` header with, e.g. `mx.example.com`. Also applies to inbound e-mail via webhook. |

The mail server must support plus addressing (`inbox+anything@…` is delivered to `inbox@…`); Dovecot, Postfix, Gmail/Google Workspace and Microsoft 365 (switch it on there) do. Flowplan marks processed e-mails as read and deletes nothing.

**Sender check:** whether a sender counts as verified (SPF/DKIM/DMARC passed for the From domain) is read from the `Authentication-Results` header. The sender can put one in the message too – so only the topmost header with the id from `INBOUND_MAIL_AUTHSERV_ID` counts. Without the variable no sender counts as verified: workflows set to **Verified senders only** then never start, the default (all but failed ones) keeps running. The id is at the start of the header your server writes into received e-mails (`Authentication-Results: mx.example.com; spf=pass …`).

## Integrations

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE` | *empty* | `true` allows webhooks to internal addresses and `http://` – such as Home Assistant or n8n in the same network. Without this variable only public HTTPS addresses are allowed. |
| `SPACE_GIT_EXPORT` | *empty* | `true` turns on the [Git export of spaces](/markdown-git-export#git-export-of-a-space): space owners push their space into a repository of their own, daily or weekly. |
| `SPACE_GIT_ALLOWED_HOSTS` | *empty* | Allowed Git servers for it, comma-separated (e.g. `git.example.org`). Without it any public `https://` server is allowed; internal addresses never. |
| `SPACE_GIT_ALLOW_PRIVATE` | *empty* | `true` also allows internal addresses for the servers listed in `SPACE_GIT_ALLOWED_HOSTS` – for example a Forgejo on the same host that the container reaches via `--add-host git.example.org:host-gateway`. Only works together with the list; every other server stays limited to public addresses. |
| `ISSUE_SYNC_ALLOWED_HOSTS` | *empty* | Own servers for the [GitHub, GitLab and Forgejo issue sync](/git-and-issues#sync-github-gitlab-and-forgejo-issues), comma-separated (e.g. `gitlab.example.org`). github.com, gitlab.com and codeberg.org are always allowed; other servers only when listed here. |
| `ISSUE_SYNC_ALLOW_PRIVATE` | *empty* | `true` also allows internal addresses for the servers listed in `ISSUE_SYNC_ALLOWED_HOSTS` – for example a GitLab in the same network. Only works together with the list. |
| `NETBOX_ALLOW_PRIVATE` | *empty* | `true` also allows internal addresses and `http://` for the [NetBox import on whiteboards](/en/whiteboard-racks#import-and-export) – for example a NetBox in the same network. Without it, only public HTTPS addresses. The address and token are never stored on the server. |
| `PLUGIN_ALLOWED_ORIGINS` | *empty* | HTTPS origins owners may register [block extensions](/plugins) from, comma-separated (e.g. `https://plugins.example.org`). Without it only when the administration switches on **Block extensions from any HTTPS address**. The origins are also added to the `frame-src` of the Content Security Policy. |
| `GIPHY_API_KEY` / `TENOR_API_KEY` | *empty* | Key for the [GIF search on whiteboards](/whiteboards#images-icons-and-records) at GIPHY or Tenor (if both are set, GIPHY wins). Without a key the **GIFs** tab is hidden. Searches run through the server; chosen GIFs up to 8 MB are stored on the server. |
| `EXPORT_GIT_*` | *empty* | Deprecated: the Git export of the whole instance, see [Push into a Git repository](/markdown-git-export#push-into-a-git-repository). Keeps working; the Git export of spaces is the better choice. |

## Calendar sync

Two-way sync of database views with [Google Calendar and Microsoft Outlook / 365](/views#sync-with-google-calendar-or-outlook). Each person connects their own account; without a client ID that provider stays hidden. Flowplan asks for changes every ten minutes (the providers' push notifications are not used – they would need a publicly reachable HTTPS address verified with the provider).

| Variable | Default | Meaning |
| --- | --- | --- |
| `GOOGLE_CALENDAR_CLIENT_ID` / `GOOGLE_CALENDAR_CLIENT_SECRET` | *empty* | OAuth client (type “Web application”) from the Google Cloud Console, with the Google Calendar API enabled and the scope `…/auth/calendar`. Redirect URI: `<APP_URL>/api/calendar-sync/callback/google`. |
| `MS_CALENDAR_CLIENT_ID` / `MS_CALENDAR_CLIENT_SECRET` | *empty* | App registration in Microsoft Entra ID (web platform) with the delegated permissions `Calendars.ReadWrite` and `offline_access`. Redirect URI: `<APP_URL>/api/calendar-sync/callback/microsoft`. |
| `MS_CALENDAR_TENANT` | `common` | `common` (work and personal accounts), `organizations` or a tenant ID. |

People's refresh tokens are stored sealed in the database (like all [stored secrets](/configuration-storage#stored-secrets)).

## Chat apps

Notifications to [Telegram, Gotify, ntfy and Matrix](/notifications#chat-apps). Everything can also be set under **Administration → Chat apps**; values saved there take precedence.

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_MESSENGERS` | *all* | Services people may connect, comma-separated: `telegram`, `gotify`, `ntfy`, `matrix`; `off` for none. |
| `FLOWPLAN_TELEGRAM_BOT_TOKEN` | *empty* | Token of the instance's Telegram bot (from @BotFather). With it people connect Telegram through a link with a one-time code, without an own bot. |
| `FLOWPLAN_TELEGRAM_API_URL` | `https://api.telegram.org` | Address of the Bot API for the instance's bot – a self-hosted [Telegram Bot API server](https://github.com/tdlib/telegram-bot-api) or a relay/proxy. May be in the own network and `http://`. |
| `FLOWPLAN_MESSENGER_ALLOW_PRIVATE` | as `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE` | `true`: people may name servers in the own network (internal addresses, `http://`) – e.g. Gotify or ntfy at home. Otherwise internal addresses are blocked, also when a name is later pointed at one. |

**The instance's bot without a public address:** Flowplan uses no webhook but reads the bot's messages with `getUpdates` – only while a connection code waits (at most 15 minutes). Outgoing HTTPS to the Bot API is enough. The bot must therefore not have a webhook at the same time or be polled by another program (Telegram then reports a conflict, the administration shows it) – use a separate bot just for Flowplan.

**Outgoing connections:** to `api.telegram.org` (or the own API address), `ntfy.sh` and the servers people name. They go through the same check as link previews and webhooks: resolve the address, refuse internal addresses, use exactly the checked address, no redirects. Refused attempts appear as the security event “Internal address refused (SSRF)”.

The tokens of people and of the bot are stored encrypted like other [stored secrets](/configuration-storage#stored-secrets). If the key is missing after a restore, the administration enters the bot token again; connections with an own token are switched off after three failed attempts, and their owners learn it in the inbox.

## Workflows

Defaults for [workflows](/workflows); the [administration](/administration#workflows) can override them.

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_WORKFLOWS` | `on` | Main switch; `off`: no new workflow pages, all paused |
| `FLOWPLAN_WORKFLOW_RUNS_PER_MINUTE` | 60 | Runs per minute and workflow |
| `FLOWPLAN_WORKFLOW_WORKSPACE_RUNS_PER_MINUTE` | 600 | Runs per minute and workspace |
| `FLOWPLAN_WORKFLOW_STEPS_PER_RUN` | 200 | Steps per run |
| `FLOWPLAN_WORKFLOW_CASCADE_DEPTH` | 5 | Depth of workflows triggering each other |
| `FLOWPLAN_WORKFLOW_FOREACH_MAX` | 100 | Items per “For each” |
| `FLOWPLAN_WORKFLOW_AI_TOKENS_PER_DAY` | 100000 | AI tokens per workflow and day (0 = AI nodes off) |
| `FLOWPLAN_WORKFLOW_MAILS_PER_DAY` | 100 | E-mails per workflow and day |
| `FLOWPLAN_WORKFLOW_RUN_DAYS` | 30 | Days runs are kept |
| `FLOWPLAN_WORKFLOW_MAX_WAIT_DAYS` | 365 | Longest wait or approval deadline |
| `FLOWPLAN_WORKFLOW_ACTIVE_PER_WORKSPACE` | 100 | Active workflows per workspace |
| `FLOWPLAN_WORKFLOW_WORKERS` | 4 | Steps at once per instance |
| `FLOWPLAN_WORKFLOW_HTTP` | `on` | HTTP node allowed |
| `FLOWPLAN_WORKFLOW_HTTP_HOSTS` | empty | Only these hosts (comma-separated) |
| `FLOWPLAN_WORKFLOW_HTTP_ALLOW_PRIVATE` | `false` | Allow internal addresses (home network, n8n) |
| `FLOWPLAN_WORKFLOW_EXTERNAL_MAIL` | `on` | E-mails to addresses outside the members |
| `FLOWPLAN_WORKFLOW_TEST_RUNS_PER_MINUTE` | 10 | Test and dry runs per person and minute |
| `FLOWPLAN_WORKFLOW_PARALLEL_RUNS` | 10 | Runs of one workflow running at the same time (1–100); further ones wait in the queue |
| `FLOWPLAN_WORKFLOW_RUNS_KEPT` | 10000 | Keep at most this many runs per workflow (100–1,000,000); older finished ones are deleted daily, open ones never |

> [!NOTE]
> **Development and tests only:** `FLOWPLAN_WORKFLOW_LEASE_MS` (default 120000, a step's [lease](/cluster#workflows-in-a-cluster)), `FLOWPLAN_WORKFLOW_POLL_MS` (5000, how often each instance looks for due steps) and `FLOWPLAN_WORKFLOW_SWEEP_MS` (60000, how often expired leases go back to the queue) shorten the queue's timings, in milliseconds. Do not set them in production.
