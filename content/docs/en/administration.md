# Administering the instance

Whoever administers the instance sees **Administration** in the sidebar: the instance's first account and everyone it gives the admin right to – with single sign-on also the members of the group in `OIDC_ADMIN_GROUP`.

## Overview

The administration opens with an overview. At the top is the state of the instance: problems and notices (linked to the area concerned), six live figures – people active now, people active today (different people since midnight), requests per minute, error rate of the last hour, sign-ins today and the response time (p95: how long the slowest 5 % of the last hour's requests took) – and the requests of the last 24 hours as a chart. The figures refresh every 15 seconds while the page is visible (“Live”). Below, one tile per area with its state and, where it fits, a figure with its trend: active people (Users), the fullest quota (Workspaces), storage of the last 30 days, AI tokens today, changes in the activity log, requests or errors (Monitoring). Errors are marked red, notices yellow. On phones the tiles are a list with a small trend on the right.

The sections are grouped into **People** (Users, Sign-in & SSO, Workspaces), **Data** (Storage & backup, Limits & retention, Markdown & Git export), **Services** (E-mail, Push notifications, AI, Extensions & domains), **Security** (Threats & incidents, Encryption, Activity log – see [Security](/en/operations#security)) and **Operations** (Monitoring, Maintenance & notices, Instance). Every section starts with a **status line** – e.g. “Scheduled backup off” with a link to the switch, or “S3 off” with a link to the guide. Every setting has exactly one home. Switches and choices save at once, with “Saving …” or “Saved” next to them; single text fields show **Save** once you have changed them. Every section has its own address, e.g. `/#admin/storage` or `/#admin/monitoring`.

## Users

All accounts as a searchable table (cards stacked on phones) with their state: **Active**, **Inactive** (30 days or more without signing in), **Disabled** (blocked), plus **Admin** (local accounts with admin rights and everyone who last signed in with the admin group, also via SSO or LDAP) and **E-mail unconfirmed**, how many workspaces the person is a member of (the tooltip shows how many of them they own), the storage used against their limit, when they were last here and when the account was created. Clicking a column header – **Person**, **Status**, **Workspaces**, **Storage**, **Last active**, **Created** – sorts by it, a second click reverses the order; at first the most recently active come first. On phones, choose the order under **Sort by**. At the bottom the table pages through 25, 50 or 100 accounts at a time (“1–25 of 112”). The filter buttons above the table (with their counts) show only active, inactive or disabled accounts, admins or who is **here now**. Several accounts at once: tick them, then **End sessions**, **Block** or **Unblock**. To give the table room, **Sign-in & SSO** and **Workspaces** sit as tabs above the heading on this page instead of beside it.

**Who is here right now** shows in the **Last active** column and refreshes every 30 seconds: a green dot for **Active now** (Flowplan is open and was used in the last few minutes), an amber one for **Open · idle for …** (open but untouched since then – a tab in the background, too), a grey one with the time of the last visit when Flowplan is closed, and an empty circle for accounts that were never here. For this the open app only reports once a minute that it is open and how long ago it was last used (typing, clicking, scrolling, touching) – not what someone does or which page is open.

Clicking the row or the name opens the account in a side panel (from the bottom on phones). **⋯** at the end of the row is quicker: **Details and settings**, **Sign out everywhere** and **Block …** or **Unblock**. At the top the panel shows the person's workspaces (with their names, how many they own), when they were last active, when the account was created and how they sign in (e.g. “E-mail + password · SSO · Passkey”), below that the **Storage** used with a bar – everything they upload or copy, across all workspaces – and:

- **Role**: for accounts with e-mail and password **Member** or **Admin** (someone always administers the instance); for SSO accounts it comes from the sign-in group.
- **Storage limit** for this person.
- **Sessions**: on how many devices the person is signed in; **Sign out** ends all sessions.
- **Password** (accounts with e-mail and password): **Create link** makes a reset link valid for two hours – to hand over when the instance does not send e-mails.
- **E-mail address**: **Mark as confirmed** for accounts that have not opened the link from the confirmation e-mail yet.
- Folded under **More: …** (the line names what is inside):
  - **Own workspaces** and **Largest file** as further limits. Empty = instance default, 0 = unlimited; admins are not limited. As soon as you change one of these limits or the storage limit, the **Save limits** bar appears at the bottom.
  - **AI features**: if [Administration → AI](/ai#for-admins) is set to "Selected people", you allow or deny AI per person here.
  - **Two-factor sign-in** (for accounts with an authenticator app): **Reset** (e.g. for a lost phone) turns off the account's authenticator app; this is recorded in the activity log, and the person gets an e-mail if the instance sends e-mail.
  - **Sign-in methods**: whether the account has a password (or removed it), whether it signs in through LDAP and which SSO identities are connected – with issuer, address, when connected and last used. The person connects and disconnects them under **Settings → Account & security**.
  - **Merge accounts**: **Merge …** combines the account with a second account of the same person (see [Merge accounts](#merge-accounts)).
- At the end: **Block** blocks the account at once and ends all sessions; **Unblock** releases it again. **Delete account** (**Delete …**) is possible only once an account is blocked. The dialog says beforehand what happens: name, e-mail, password, passkeys, sessions and personal settings are deleted, as are workspaces where only this person was a member and their private spaces. Shared workspaces get another member as owner if needed; contributions there stay and appear as "Deleted account". Even when the account stays as an empty placeholder for that, the personal data goes: calendar connections and their syncing, CalDAV and CardDAV links, guest access, own keys for encrypted spaces, grants on single records, devices, drafts, widget and sidebar settings, stickers and reactions. What stays is content, version history and authorship as well as tracked time (a running timer stops); share links the person created keep working. Your own account and the last admin account cannot be deleted.

Accounts with e-mail and password are created with **Create account** (see [Sign-in](/sign-in)); SSO accounts on their first sign-in via OIDC, and their admin right comes from the group at the provider. Whether people may sign up themselves is set under [Sign-in & SSO](#sign-in-sso).

### Merge accounts

When a person has two accounts – such as a local one and one created at their first SSO sign-in – merge them with **Merge …** under **More** in their account's side panel. Choose the other account (accounts with the same e-mail address are listed first) and, with the arrow, which one stays. The preview lists what moves before anything happens.

Everything of the account taken over moves to the one that stays: own pages and spaces, memberships of workspaces and spaces with their shares (the **higher role** stays; guest only if the person was a guest everywhere), groups, comments and reactions, mentions in comments and documents, assignments and person properties in databases, favourites, collections, sidebar, journal, notifications and their settings, webhooks, calendar and contact connections, time tracking, passkeys, SSO identities, the LDAP and SCIM link and the history in the activity and security logs. Where both accounts have the same thing (a favourite, or the sidebar of a workspace), the one of the account that stays wins.

- **Sessions** of the account taken over end; its **API tokens** are revoked (scripts need a new token of the remaining account – so no token suddenly reads another account's data).
- **Password**: if the remaining account has none, it takes over the other's; otherwise it keeps its own. A local account's admin right goes along.
- **Authenticator app**: taken over when the remaining account has none; recovery codes must then be created again.
- **End-to-end encryption**: if only the account taken over has keys, they move. If both have keys, those of the remaining account stay; encrypted spaces only the other account had must be shared again.
- Older versions of documents keep their mentions as they were.

The merge runs as one step – all or nothing –, is recorded in the activity log and as "Accounts merged" in the security log. The account taken over is deleted afterwards. Your own account can only be the one that stays.

## Sign-in & SSO

- **Sign-up & access**: **Sign-up with email and password** (anyone may create an account; without this setting only invited addresses and the instance's first account), **Everyone may create workspaces** and **Block inactive accounts** after a number of days without signing in. Blocked accounts lose their sessions and their API tokens stop working; the block appears in the activity log and can be lifted under **Users**. **Delete inactive accounts** goes one step further: after a number of days without any use (at least 60, and more than for blocking) an account is deleted – as when an admin deletes it: personal data and the workspaces and private spaces only this person belongs to go, contributions to shared workspaces stay under “Deleted account”. 14 and 3 days before, the person gets an e-mail with the date; signing in before then keeps the account. If it is already blocked, the e-mail asks them to contact the administrators – unblocking it under **Users** cancels the deletion. Without e-mail delivery set up, for admin accounts and for accounts without an e-mail address nothing is ever deleted. Under **Users**, “Deleted on …” shows where a deletion is pending; every deletion appears in the activity log.
- **Two-factor sign-in**: **Require two-factor sign-in** – not required, only for admins or for all local accounts –, plus how many local accounts already have a second factor. Accounts without an authenticator app and without a passkey set up a second factor right after signing in ([Two-factor sign-in](/sign-in#two-factor-sign-in)). SSO accounts are not affected.
- **Sessions**: how long people stay signed in – **Browser without “Stay signed in”** (hours after signing in, default 8), **Offer “Stay signed in” in the browser** (default off), **Browser with “Stay signed in”** (7, 30, 90 or 365 days without use, default 7), **Desktop and mobile apps** (default: stay signed in; or as in the browser without “Stay signed in”) and **Apps: end without use** (30, 90 or 365 days, default 90). **Default** follows the `SESSION_*` environment variables ([Configuration](/configuration)); a value chosen here takes precedence. The apps' lifetime applies only to sign-ins the app proves – the hand-off through the browser, or the password with the app's device key; the user agent alone does not count, and older app versions sign in with a password like a browser. See [Stay signed in](/sign-in#stay-signed-in).
- **Single sign-on (OIDC)**: whether a provider is set up, the admin group and **Map SSO groups centrally** – provider groups get roles and groups in any workspace ([SSO groups](/sign-in#map-sso-groups-to-workspaces)).
- **SCIM tokens** and the **LDAP directory** with their state ([User provisioning (SCIM)](/sign-in#user-provisioning-scim), [Sign-in with LDAP](/sign-in#sign-in-with-ldap)).
- **Contacts from LDAP**: base DN, people filter, sync and **More attributes** (which LDAP attributes may be mapped beyond the default mapping, on top of `LDAP_CONTACTS_ATTRIBUTES`) for [contacts databases](/contacts#contacts-from-the-ldap-directory); changes are recorded as security events. See [Contacts from LDAP](/sign-in#contacts-from-ldap).

## Workspaces

All workspaces with members, pages, usage (a bar when there is a quota) and **Own quota** – saved when you leave the field. Empty = default, 0 = unlimited. The default is set under [Limits & retention](#limits-retention).

## Storage & backup

The one place for backups:

- **Backups**: **S3 mirror** and **Litestream** with their state, the scheduled **Daily database backup** – a consistent copy of the database per day, with S3 in the bucket under `backups/`, otherwise in the data folder –, **Hourly instead of daily** (meant for encrypted backups in place of Litestream, see [Encryption](/storage-and-backups#encryption); keep more copies then, e.g. 72 for three days), **Backups kept**, the last backup and **Back up now**. The Markdown export still runs once a day.
- **Usage**: what is local and what is in the bucket, by kind, and how the database is split.
- **Whole instance → Download** creates a verified copy of the database and files while running. With `FLOWPLAN_ENCRYPTION_KEY` the file is encrypted (`.zip.enc`).
- **Content**: how many workspaces, pages, databases, records, files, accounts and comments there are.
- **Move instance**: on the old instance **Prepare the move** (a move token, visible once, valid for 24 hours, revocable; confirmed with your password or a fresh sign-in), then read-only, "moved to …" and **Redirect the web interface**. On the new instance, also in red, **Take over from another instance**: first copy with progress, **pre-flight check** of the settings (names and check values only), **Make the source read-only and fetch the last state** and **Apply** on the next restart (previous state as `pre-move-…`). Guide: [Moving an instance](/move-instance).
- At the very end, in red: **Restore from backup**. An uploaded backup is checked and applied on the next restart; the previous state stays as `pre-restore-…` in the data directory. An encrypted backup is decrypted with the current or an earlier key. With [PostgreSQL](/postgresql#restoring) it also takes a scheduled backup (`flowplan-….dump`) – then only the database is replaced, the files stay.

Details: [Storage and backups](/storage-and-backups).

## Limits & retention

| Setting | Effect |
| --- | --- |
| Storage per workspace | For workspaces without a quota of their own. |
| Storage per person | For people without a limit of their own; everything they upload or copy. |
| Own workspaces per person | How many workspaces a person may own. |
| Largest upload | The limit per file in MB. Also applies to [importing an AFFiNE workspace file](/migrate#from-affine) (at least 100 MB; `FLOWPLAN_IMPORT_MAX_MB` takes precedence). |
| Keep versions | Days after which automatic versions are deleted. |
| Empty the trash after | Days after which deleted pages, spaces, database records and templates are deleted permanently with their files (1–3650, default 30, 0 = never automatically). See [Trash](/pages-and-spaces#trash). |

Empty fields fall back to the [environment variables](/configuration). Everyone sees their limits and the storage they use under **Settings → Account & security → Your limits**.

### Workflows

**Limits & retention → Workflows** holds the limits of [workflows](/workflows): runs per minute (per workflow and workspace), steps per run, cascade depth, items per “For each”, AI tokens and e-mails per workflow and day, how long runs are kept, the longest wait, active workflows per workspace, the HTTP node (on/off, only certain hosts, internal addresses) and e-mails to addresses outside the members. Left empty, the value from the [environment](/configuration#workflows) applies. Next to it, monitoring shows the load: active workflows, runs per minute, waiting and running steps, the oldest step due, the failure rate and today's AI tokens.

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

**Marketplace**: switch publishing to and taking over from the [Flowplan Marketplace](/marketplace) on or off for the whole instance.

## Encryption

The key ID, earlier keys, how many files in the bucket are not yet encrypted with this key (**Encrypt existing objects** catches up), and what leaves the server unencrypted regardless (Litestream, Git export). See [Encryption](/storage-and-backups#encryption).

## Activity log

The latest changes with person, action and affected resource – such as shares, role changes, deletions, settings and the billing status of time entries –, searchable and filtered by person and kind, a list on phones. Under **Export**, optionally pick a from and to date (UTC, as stored) and download the log as **CSV** (semicolons, with BOM, for Excel) or as **JSON**. In the CSV, values a spreadsheet would run as a formula start with an apostrophe. Only signed-in administrators can export, never API tokens.

## Monitoring

Health, usage and events of the instance – live: five key figures at the top (**Active 24 h**, **Storage**, **Deliveries 7 days**, **AI tokens 14 days**, **Errors 24 h**) with their trend and, where it fits, a comparison with the period before, below them cards in two columns with charts, queues, background workers, refused requests, alerts by webhook and the usage statistics. Details under [Operations and troubleshooting](/operations#administration-monitoring).

## Maintenance & notices

**Notice for everyone** – a banner for everyone until you clear it – the **maintenance notice** with start and end, which disappears by itself afterwards, and **banners to click away** that each person sees until they close them – e.g. for the apps or your Discord server ([Maintenance & notices](/operations#maintenance-notices)).

## Instance

| Setting | Effect |
| --- | --- |
| Instance name | Shown when signing in, in the sidebar and in the browser tab. |
| Public demo | Visitors try Flowplan without an account, see [Demo](#demo). |
| Version | Running **version**, **commit** (linked to GitHub) and build date. Docker images from our workflow know their commit; with Coolify it comes from `SOURCE_COMMIT`. For your own build pass `--build-arg GIT_COMMIT=$(git rev-parse HEAD)`, otherwise it says "commit unknown". When a newer version is out, a notice with **How to update** shows there. |
| Admin group | The SSO or LDAP group from `OIDC_ADMIN_GROUP`. |
| What's new after updates for new accounts | What new accounts start with for **What's new after updates**: **Show all** (default), **Only breaking changes** or **Never**. Only for accounts created afterwards; existing accounts keep their setting, and everyone can change it under **Appearance & language**. |

Everyone sees version, licence and source code under **Settings → About Flowplan**; for our images it also says whether it is a beta or a release (own builds: `--build-arg FLOWPLAN_CHANNEL=beta` or `release`). If you run modified code, name its source with `FLOWPLAN_SOURCE_URL`; `FLOWPLAN_HIDE_SPONSOR=true` hides the link to GitHub Sponsors ([Configuration](/configuration#legal-and-interface)).

Below, **More instance settings** leads to the sections that earlier instance settings moved to.

## Demo

The demo is off on every instance until an administrator switches it on under **Administration → Instance → Public demo**.

Then the address `/demo` of your instance starts a demo (on flowplan.org the button **Try the demo** links there). Without an account it creates a demo guest with an example workspace of its own. Every demo gets fresh example pages that show all features: a welcome page, an editor tour with all blocks, a project database with relation, rollup, formula, recurrence and all views (table, board, calendar, timeline, gallery, list, feed, chart, form), a whiteboard, a journal and a small wiki.

- The demo ends with **End demo**, on signing out, after 45 minutes without activity and after three hours at the latest. Then the account, workspace, pages and files are deleted completely.
- Demo guests cannot take anything outside: no publishing, no share links, no invitations, no further workspaces, no public forms, no administration.
- Every demo workspace has 25 MB of storage. New demos are limited to five per hour and address and 40 at the same time.
- Running and total started demos are shown under **Administration → Monitoring → Instance in numbers**.
