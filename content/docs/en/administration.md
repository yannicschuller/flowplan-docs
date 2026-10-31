# Administering the instance

Whoever administers the instance sees **Administration** in the sidebar: the instance's first account and everyone it gives the admin right to – with single sign-on also the members of the group in `OIDC_ADMIN_GROUP`.

## Overview

The administration opens with an overview. At the top is the state of the instance: problems and notices (linked to the area concerned), five live figures – people active now, people active today (different people since midnight), requests per minute, error rate of the last hour, sign-ins today – and the requests of the last 24 hours as a chart. The figures refresh every 15 seconds while the page is visible (“Live”). Below, one tile per area with its state and, where it fits, a figure with its trend: active people (Users), the fullest quota (Workspaces), storage of the last 30 days, AI tokens today, changes in the activity log, requests or errors (Monitoring). Errors are marked red, notices yellow. On phones the tiles are a list with a small trend on the right.

The sections are grouped into **People** (Users, Sign-in & SSO, Workspaces), **Data** (Storage & backup, Limits & retention, Markdown & Git export), **Services** (E-mail, Push notifications, AI, Extensions & domains), **Security** (Threats & incidents, Encryption, Activity log – see [Security](/en/operations#security)) and **Operations** (Monitoring, Maintenance & notices, Instance). Every section starts with a **status line** – e.g. “Scheduled backup off” with a link to the switch, or “S3 off” with a link to the guide. Every setting has exactly one home. Switches and choices save at once, with “Saving …” or “Saved” next to them; single text fields show **Save** once you have changed them. Every section has its own address, e.g. `/#admin/storage` or `/#admin/monitoring`.

## Users

All accounts as a searchable list (stacked on phones) with their state: **Active**, **Inactive** (30 days or more without signing in), **Disabled**, plus **Admin** (local accounts with admin rights and everyone who last signed in with the admin group, also via SSO or LDAP) and **E-mail unconfirmed**, when the person was last here and the storage used. The filter buttons above the list (with their counts) show only active, inactive or disabled accounts, admins or who is **here now**. Several accounts at once: tick them, then **End sessions**, **Disable** or **Enable**.

**Who is here right now** shows in the **Last active** column and refreshes every 30 seconds: a green dot for **Active now** (Flowplan is open and was used in the last few minutes), an amber one for **Open · idle for …** (open but untouched since then – a tab in the background, too), a grey one with the time of the last visit when Flowplan is closed, and an empty circle for accounts that were never here. For this the open app only reports once a minute that it is open and how long ago it was last used (typing, clicking, scrolling, touching) – not what someone does or which page is open.

**Manage** opens an account in a side panel (full screen on phones):

- **Usage and limits** for this person: storage (everything they upload or copy – across all workspaces), number of own workspaces and the largest file. Bars show how much is used. Empty = instance default, 0 = unlimited; admins are not limited. **Save limits** applies them.
- **Access**:
  - **AI features**: if [Administration → AI](/ai#for-admins) is set to "Selected people", you allow or deny AI per person here.
  - **End sessions** signs the person out on all devices.
  - For accounts with e-mail and password: **Make admin** or **Revoke admin** (someone always administers the instance) and **Reset link** – a link for a new password, valid for two hours, to hand over when the instance does not send e-mails.
  - **Two-factor sign-in**: "2FA on", "2FA via passkey" or "2FA off". **Reset two-factor** (e.g. for a lost phone) turns off the account's authenticator app; this is recorded in the activity log, and the person gets an e-mail if the instance sends e-mail.
  - **Mark e-mail as confirmed** for accounts that have not opened the link from the confirmation e-mail yet.
- **Danger zone**: **Disable** blocks the account at once and ends all sessions; **Enable** releases it again. **Delete account …** is possible once an account is disabled. The dialog says beforehand what happens: name, e-mail, password, passkeys, sessions and personal settings are deleted, as are workspaces where only this person was a member and their private spaces. Shared workspaces get another member as owner if needed; contributions there stay and appear as "Deleted account". Your own account and the last admin account cannot be deleted.

Accounts with e-mail and password are created with **Create account** (see [Sign-in](/sign-in)); SSO accounts on their first sign-in via OIDC, and their admin right comes from the group at the provider. Whether people may sign up themselves is set under [Sign-in & SSO](#sign-in-sso).

## Sign-in & SSO

- **Sign-up & access**: **Sign-up with email and password** (anyone may create an account; without this setting only invited addresses and the instance's first account), **Everyone may create workspaces** and **Block inactive accounts** after a number of days without signing in. Blocked accounts lose their sessions and their API tokens stop working; the block appears in the activity log and can be lifted under **Users**. **Delete inactive accounts** goes one step further: after a number of days without any use (at least 60, and more than for blocking) an account is deleted – as when an admin deletes it: personal data and the workspaces and private spaces only this person belongs to go, contributions to shared workspaces stay under “Deleted account”. 14 and 3 days before, the person gets an e-mail with the date; signing in before then keeps the account. If it is already blocked, the e-mail asks them to contact the administrators – enabling it again under **Users** cancels the deletion. Without e-mail delivery set up, for admin accounts and for accounts without an e-mail address nothing is ever deleted. Under **Users**, “Deleted on …” shows where a deletion is pending; every deletion appears in the activity log.
- **Two-factor sign-in**: **Require two-factor sign-in** – not required, only for admins or for all local accounts –, plus how many local accounts already have a second factor. Accounts without an authenticator app and without a passkey set up a second factor right after signing in ([Two-factor sign-in](/sign-in#two-factor-sign-in)). SSO accounts are not affected.
- **Single sign-on (OIDC)**: whether a provider is set up, the admin group and **Map SSO groups centrally** – provider groups get roles and groups in any workspace ([SSO groups](/sign-in#map-sso-groups-to-workspaces)).
- **SCIM tokens** and the **LDAP directory** with their state ([User provisioning (SCIM)](/sign-in#user-provisioning-scim), [Sign-in with LDAP](/sign-in#sign-in-with-ldap)).
- **Contacts from LDAP**: base DN, people filter and sync for [contacts databases](/contacts#contacts-from-the-ldap-directory); changes are recorded as security events. See [Contacts from LDAP](/sign-in#contacts-from-ldap).

## Workspaces

All workspaces with members, pages, usage (a bar when there is a quota) and **Own quota** – saved when you leave the field. Empty = default, 0 = unlimited. The default is set under [Limits & retention](#limits-retention).

## Storage & backup

The one place for backups:

- **Backups**: **S3 mirror** and **Litestream** with their state, the scheduled **Daily database backup** – a consistent copy of the database per day, with S3 in the bucket under `backups/`, otherwise in the data folder –, **Hourly instead of daily** (meant for encrypted backups in place of Litestream, see [Encryption](/storage-and-backups#encryption); keep more copies then, e.g. 72 for three days), **Backups kept**, the last backup and **Back up now**. The Markdown export still runs once a day.
- **Usage**: what is local and what is in the bucket, by kind, and how the database is split.
- **Whole instance → Download** creates a verified copy of the database and files while running. With `FLOWPLAN_ENCRYPTION_KEY` the file is encrypted (`.zip.enc`).
- **Content**: how many workspaces, pages, databases, records, files, accounts and comments there are.
- At the very end, in red: **Restore from backup**. An uploaded backup is checked and applied on the next restart; the previous state stays as `pre-restore-…` in the data directory. An encrypted backup is decrypted with the current or an earlier key.

Details: [Storage and backups](/storage-and-backups).

## Limits & retention

| Setting | Effect |
| --- | --- |
| Storage per workspace | For workspaces without a quota of their own. |
| Storage per person | For people without a limit of their own; everything they upload or copy. |
| Own workspaces per person | How many workspaces a person may own. |
| Largest upload | The limit per file in MB. |
| Keep versions | Days after which automatic versions are deleted. |

Empty fields fall back to the [environment variables](/configuration). Everyone sees their limits and the storage they use under **Settings → Account & security → Your limits**.

## Markdown & Git export

Choose pages and databases for the Markdown export, switch on the Git export of spaces, and the (deprecated) instance Git repository – see [Markdown export and Git](/storage-and-backups#markdown-export-and-git).

## E-mail

**Sending e-mail** shows the configured server, the sender, the queue and the last error; without SMTP a note with the variables ([E-mail (SMTP)](/configuration#e-mail-smtp)). **Test e-mail** checks the connection right away.

## Push notifications

Whether notifications can reach the apps and through which service (`/#admin/push`). The overview's tile shows the relay with a green, yellow or red badge – e.g. “Reachable (85 ms)” – and the deliveries of the last 24 hours; the same tile is under **Monitoring → Health**.

- **Push relay**: the address in use – the official `https://push.flowplan.org` or your own from `PUSH_RELAY_URL` (credentials in the address are never shown) –, whether it is on and otherwise exactly why not (`PUSH_RELAY=off`, `APP_URL` not an HTTPS address, `PUSH_RELAY_URL` invalid), the `APP_URL` the relay knows the instance by, and whether `/.well-known/flowplan-push` is published.
- **Reachability**: the instance requests `GET <relay>/healthz` – at most 5 seconds, HTTPS only, following no redirects – and shows “Reachable” with the response time (and the relay's version if it names one) or the reason: timeout, connection refused, DNS, TLS, redirect, HTTP status. It also fetches its own `/.well-known/flowplan-push` at `APP_URL`, as the relay does, and checks that the current signing key is listed. If that fails from inside, it is only a warning: behind NAT or a proxy that does not resolve its own address internally this is normal – what counts is that the relay reaches it from outside ([test notification](/search-and-notifications#test-notification)). A result is kept for a minute; **Check now** checks again at once.
- **Signing key**: key ids with their status (signing, waiting, retiring) and dates. **Rotate key …** asks first and rotates as described in [Push relay and end-to-end encryption](/configuration#push-relay-and-end-to-end-encryption), optionally immediately.
- **Deliveries of the last 24 hours** per channel (relay, Expo, Web Push) and result (delivered, gone, forbidden, invalid, rate limited, error), the last delivery through the relay, the last error as a code (e.g. `signature HTTP 401` or `unreachable`), the queue and the registered devices per channel. Counted only while the usage statistics are on (see [Monitoring](#monitoring)).
- **Expo and Web Push**: `MOBILE_PUSH` on or off, what `MOBILE_PUSH_CONTENT` sends along, where the VAPID keys come from and whether `WEB_PUSH_SUBJECT` is set.

The answers never contain tokens, keys or push addresses. `/api/admin/push` is for signed-in administrators only, never for API tokens.

## Chat apps

**Administration → Chat apps** governs [notifications to chat apps](/search-and-notifications#chat-apps). At the top: allowed services, the instance's bot, active connections and those switched off after errors, and the deliveries of the last 24 hours.

- **Allowed services:** Telegram, Gotify, ntfy and Matrix can be switched off one by one (default: `FLOWPLAN_MESSENGERS`). Services switched off get no more messages; people's connections stay stored and resume when the service is switched on again.
- **Instance Telegram bot:** bot token from @BotFather and optionally an own API address (Bot API server or relay/proxy, also in the own network). **Check and save** asks Telegram for the bot with `getMe` and stores the token only when it is accepted – encrypted, shown only as “…abcd”. **Remove bot** deletes it (a token from `FLOWPLAN_TELEGRAM_BOT_TOKEN` then applies again). A conflict with a webhook or another program polling the bot shows under **Last error**.
- **Server addresses:** empty allows any public server; otherwise only the hosts listed, one per line (`*.example.org` for subdomains). `api.telegram.org` and `ntfy.sh` always work. Internal addresses need `FLOWPLAN_MESSENGER_ALLOW_PRIVATE=true`.

Changing the bot is recorded as the security event “Instance Telegram bot changed”, changing services and hosts as “Security-relevant setting changed” – both also in the [activity log](#activity-log).

## AI

Optional and off by default: provider (Ollama, OpenAI-compatible, Anthropic, Gemini), who may use AI, individual features and users' own keys. A switch of its own: **On-device AI (Apple)** – allowed by default because nothing leaves the device. Everything in [AI](/ai#for-admins).

## Extensions & domains

**Block extensions from any HTTPS address** (off: only from `PLUGIN_ALLOWED_ORIGINS`) and **Custom domains for publications** – see [Block extensions](/plugins) and [Coolify and reverse proxies](/coolify-and-proxy#custom-domains-for-publications).

## Encryption

The key ID, earlier keys, how many files in the bucket are not yet encrypted with this key (**Encrypt existing objects** catches up), and what leaves the server unencrypted regardless (Litestream, Git export). See [Encryption](/storage-and-backups#encryption).

## Activity log

The latest changes with person, action and affected resource – such as shares, role changes, deletions, settings and the billing status of time entries –, searchable and filtered by person and kind, a list on phones. Under **Export**, optionally pick a from and to date (UTC, as stored) and download the log as **CSV** (semicolons, with BOM, for Excel) or as **JSON**. In the CSV, values a spreadsheet would run as a formula start with an apostrophe. Only signed-in administrators can export, never API tokens.

## Monitoring

Health, usage and events of the instance – live, with charts, queues, background workers, refused requests, alerts by webhook and the usage statistics. Details under [Operations and troubleshooting](/operations#administration-monitoring).

## Maintenance & notices

**Notice for everyone** – a banner for everyone until you clear it – the **maintenance notice** with start and end, which disappears by itself afterwards, and **banners to click away** that each person sees until they close them – e.g. for the apps or your Discord server ([Maintenance & notices](/operations#maintenance-notices)).

## Instance

| Setting | Effect |
| --- | --- |
| Instance name | Shown when signing in, in the sidebar and in the browser tab. |
| Public demo | Visitors try Flowplan without an account, see [Demo](#demo). |
| Version | Running **version**, **commit** (linked to GitHub) and build date. Docker images from our workflow know their commit; with Coolify it comes from `SOURCE_COMMIT`. For your own build pass `--build-arg GIT_COMMIT=$(git rev-parse HEAD)`, otherwise it says "commit unknown". When a newer version is out, a notice with **How to update** shows there. |
| Admin group | The SSO or LDAP group from `OIDC_ADMIN_GROUP`. |

Below, **More instance settings** leads to the sections that earlier instance settings moved to.

## Demo

The demo is off on every instance until an administrator switches it on under **Administration → Instance → Public demo**.

Then the address `/demo` of your instance starts a demo (on flowplan.org the button **Try the demo** links there). Without an account it creates a demo guest with an example workspace of its own. Every demo gets fresh example pages that show all features: a welcome page, an editor tour with all blocks, a project database with relation, rollup, formula, recurrence and all views (table, board, calendar, timeline, gallery, list, feed, chart, form), a whiteboard, a journal and a small wiki.

- The demo ends with **End demo**, on signing out, after 45 minutes without activity and after three hours at the latest. Then the account, workspace, pages and files are deleted completely.
- Demo guests cannot take anything outside: no publishing, no share links, no invitations, no further workspaces, no public forms, no administration.
- Every demo workspace has 25 MB of storage. New demos are limited to five per hour and address and 40 at the same time.
- Running and total started demos are shown under **Administration → Monitoring → Instance in numbers**.
