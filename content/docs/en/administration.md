# Administering the instance

Whoever administers the instance sees **Administration** in the sidebar: the instance's first account and everyone it gives the admin right to – with single sign-on also the members of the group in `OIDC_ADMIN_GROUP`. There they manage accounts, workspaces, operations, the instance's settings and the activity log.

The bar at the top shows what is running: the **version**, the **commit** (linked to GitHub) and the build date. Docker images from our workflow know their commit; with Coolify it comes from `SOURCE_COMMIT`. For your own build pass `--build-arg GIT_COMMIT=$(git rev-parse HEAD)`, otherwise it says "commit unknown".

## Users

All accounts of the instance with their last sign-in and the storage they use. **Manage** opens an account:

- **Limits** for this person: storage (everything they upload or copy – across all workspaces), number of own workspaces and the largest file. Bars show how much is used. Empty = instance default, 0 = unlimited; admins are not limited.
- **Delete account …** appears once an account is disabled. The dialog says beforehand what happens: name, e-mail, password, passkeys, sessions and personal settings are deleted, as are workspaces where only this person was a member and their private spaces. Shared workspaces get another member as owner if needed; contributions there stay and appear as "Deleted account". Your own account and the last admin account cannot be deleted.
- **Mark e-mail as confirmed** for accounts that have not opened the link from the confirmation e-mail yet.
- **End sessions** signs a person out on all devices.
- **Deactivate** locks an account immediately and ends all sessions; **Activate** releases it again.
- For accounts with e-mail and password: **Make admin** or **Remove admin** (someone always administers the instance) and **Reset link** – a link for a new password, valid for two hours, to hand over when the instance does not send e-mails.

Accounts with e-mail and password are created with **Create account** (see [Sign-in](/sign-in)); SSO accounts on their first sign-in via OIDC, and their admin right comes from the group at the provider.

- **Two-factor:** the list shows "2FA on", "2FA via passkey" or "2FA off". **Reset two-factor** (e.g. for a lost phone) turns off the account's authenticator app; this is recorded in the activity log, and the person gets an e-mail if the instance sends e-mail.
- **AI:** if [Administration → AI](/ai#for-admins) is set to "Selected people", you allow or deny AI per person here.

## Workspaces

All workspaces with their number of members, usage and storage quota. The quota can be overridden per workspace. With single sign-on, **Map SSO groups centrally** maps provider groups to roles and groups in any workspace ([SSO groups](/sign-in#map-sso-groups-to-workspaces)).

## AI

Optional and off by default: provider (Ollama, OpenAI-compatible, Anthropic, Gemini), who may use AI, individual features and users' own keys. Everything in [AI](/ai#for-admins).

## Operations

The state of the instance: size of the database and uploads, queues, search index, versions and uptime; refused requests (failed sign-ins, limits, anonymous uploads), storage per workspace with its quota, the mail queue, failing webhooks and the last run of every background worker. Plus **alerts by webhook** and the **maintenance notice**, and below them the storage overview with the S3 connection, database backup and content figures. Details under [Operations and troubleshooting](/operations#administration-operations).

## Instance

| Setting | Effect |
| --- | --- |
| Name | Appears in the sidebar and on the start page next to the logo. |
| Notice | A banner for everyone, e.g. announced maintenance. |
| Storage per workspace | For workspaces without a quota of their own. |
| Storage per person | For people without a limit of their own; everything they upload or copy. |
| Own workspaces per person | How many workspaces a person may own. |
| Version retention | Days after which automatic versions are deleted. |
| Maximum upload size | The limit per file in MB. |
| Create workspaces | Whether everyone may create workspaces of their own. |
| Allow sign-ups with e-mail and password | Anyone may create an account. Without this setting only invited addresses (and the instance's first account). |
| Offer a public demo | Visitors try Flowplan without an account, see below. |
| Require two-factor sign-in | Not required, only for admins, or for all local accounts. Accounts without an authenticator app and without a passkey set up a second factor right after signing in ([Two-factor sign-in](/sign-in#two-factor-sign-in)). SSO accounts are not affected. |

The settings are grouped into **General**, **Access**, **Storage and limits** and **Versions and backup**; changes take effect with **Save**. Empty fields fall back to the [environment variables](/configuration). Everyone sees their limits and the storage they use under **Settings → General → Your limits**.

### E-mail and scheduled backup

- **E-mail delivery** shows the configured server, the queue and the last error; **Send test e-mail** checks the connection right away.
- **Daily database backup**: a consistent copy of the database per day, with S3 in the bucket under `backups/`, otherwise in the data folder. The newest *n* are kept; **Back up now** creates one immediately.
- **Hourly instead of daily**: one copy per hour – meant for encrypted backups in place of Litestream (see [Encryption](/storage-and-backups#encryption)). Keep more copies then, e.g. 72 for three days. The Markdown export still runs once a day.
- **Encryption** shows the key ID, how many files in the bucket are not yet encrypted with this key (**Encrypt existing objects** catches up), and what leaves the server unencrypted regardless (Litestream, Git export).
- **Lock accounts without sign-in after (days)**: locked accounts lose their sessions and their API tokens stop working; the lock appears in the activity log and can be lifted under **Users**.

### Backup of the whole instance

**Download backup** creates a verified copy of the database and files while running. An uploaded backup is checked and applied on the next restart; the previous state stays as `pre-restore-…` in the data directory. With `FLOWPLAN_ENCRYPTION_KEY` the downloaded file is encrypted (`.zip.enc`); on upload it is decrypted with the current or an earlier key.

## Demo

The demo is off on every instance until an administrator switches it on.

With **Offer a public demo**, the address `/demo` of your instance starts a demo (on flowplan.org the button **Try the demo** links there). Without an account it creates a demo guest with an example workspace of its own. Every demo gets fresh example pages that show all features: a welcome page, an editor tour with all blocks, a project database with relation, rollup, formula, recurrence and all views (table, board, calendar, timeline, gallery, list, feed, chart, form), a whiteboard, a journal and a small wiki.

- The demo ends with **End demo**, on signing out, after 45 minutes without activity and after three hours at the latest. Then the account, workspace, pages and files are deleted completely.
- Demo guests cannot take anything outside: no publishing, no share links, no invitations, no further workspaces, no public forms, no administration.
- Every demo workspace has 25 MB of storage. New demos are limited to five per hour and address and 40 at the same time.

## Activity log

The latest changes with person, action and affected resource – such as shares, role changes, deletions, settings and the billing status of time entries. For the **export**, optionally pick a from and to date (UTC, as stored) and download the log as **CSV** (semicolons, with BOM, for Excel) or as **JSON**. In the CSV, values a spreadsheet would run as a formula start with an apostrophe. Only signed-in administrators can export, never API tokens.
