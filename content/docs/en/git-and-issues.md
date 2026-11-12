---
keywords: github, gitlab, forgejo, gitea, issues, pull request, commit, branch
---

# Git and issues

Connect databases to GitHub, GitLab and Forgejo: branches, commits and pull requests on the record, issues synced both ways.

## Git connection

**… → Git connection** connects the database to GitHub, GitLab or Gitea/Forgejo:

::: steps

1. **Set up Git connection** creates a webhook address and a secret.
2. **In the repository**, add a webhook with both:
   - content type JSON,
   - events for pushes and pull or merge requests.
   The exact steps are in the dialog.
3. **Commits and pull requests** that mention a ticket number of this database like `WEB-123` appear in the record under **Development**. Numbers of other databases are left alone – they have their own connection.
4. **“closes WEB-123”** (also *fixes*, *resolves*) marks the record done. This happens once the commit is on the default branch or the pull request is merged – through the database's workflow and automations.

:::

Every request is checked against the secret. Only people who may edit the database see the address and the secret. **New address and secret** invalidates the old ones.

Pull requests show their state as a badge: **Open**, **Merged** or **Closed**.

### Back-link on the pull request

Like Notion, Flowplan can link back to the record in the pull or merge request itself. In the dialog, under **Back-link on the pull request → Add access token**, enter the provider, the server (empty for github.com or gitlab.com, required for Gitea/Forgejo) and an access token:

- **GitHub**: fine-grained token with access to the repository and *Pull requests: Read and write* (or *Issues: Read and write*).
- **GitLab**: project or personal access token with the scope `api` (role at least Reporter).
- **Gitea / Forgejo**: token with `write:issue` (plus `read:repository` for private repositories).

When a pull/merge request names ticket numbers of this database, Flowplan writes **one** comment, e.g. `Linked in Flowplan: [WEB-123 Login form](…)` – one line per record, with a link to the record. Later events (edited title, merged, closed) **update the same comment** instead of writing new ones; if all numbers are gone, it says “No longer linked in Flowplan.”

- The comment shows the ticket number and title. For **private records** and databases behind a journal PIN, only the ticket number; nothing is written for databases in the trash or in encrypted spaces.
- The token is stored encrypted, never shown again and only sent to the server it was entered for. A webhook from another provider or server does not get it. Own servers are allowed by the administrators with [`ISSUE_SYNC_ALLOWED_HOSTS`](/configuration-integrations#integrations), as for the issue sync; internal addresses are blocked.
- The comment is written in the background – the webhook answers at once, even when the Git server is slow. Errors (e.g. `403` for a missing permission) show in the dialog under **Last back-link failed**. Flowplan writes at most 30 comments per minute and connection.
- Without a token nothing changes: Flowplan writes nothing to the repository. **Remove token** switches the back-link off.

## Sync GitHub, GitLab and Forgejo issues

A database can keep itself in step with the issues of a GitHub, GitLab or Forgejo/Gitea repository – both ways or only one. Unlike the [Git connection](#git-connection), which only links commits and pull requests, records and issues are created and updated on both sides here.

**Setting up the connection** (workspace owners and administrators):

::: steps

1. **Settings → Calendars & issues → Connect GitHub, GitLab or Forgejo**.
2. Choose the provider; for an own server enter its address (empty for github.com or gitlab.com), the repository (`owner/name`) or project (`group/project`) and an access token that may read and write issues – on GitHub a fine-grained token with *Issues: Read and write*, on GitLab a token with the `api` scope. For **Forgejo / Gitea** the server address is required (e.g. `https://codeberg.org`); create the token there under **Settings → Applications → Generate token** with `write:issue` and `read:repository` (`read:organization` optional, so organisation labels are found too).
3. **Test connection** makes one call with the token; **Save** stores the token encrypted. It is never shown again.
4. Optional **People**: one `login = e-mail` of a member per line. Assignees are matched through it.
5. For immediate updates, add the shown **webhook address** with the **secret** in the repository – on GitHub with content type JSON and the events *Issues* and *Issue comments*, on GitLab as *Secret token* with *Issues events* and *Comments*, on Forgejo/Gitea under **Settings → Webhooks → Add webhook → Forgejo** (or Gitea) with POST, content type `application/json`, the secret and the custom events *Issues* and *Issue comments*. Without a webhook, Flowplan syncs every 10 minutes.

:::

The sync acts as the person who set up the connection: they need edit rights on the database, and records they may not read are skipped. If they are no longer an owner of the workspace, the connection pauses until someone saves the token again.

**Mapping a database**: **… → Sync issues** in the database. There you choose the connection, repository and direction (*both ways*, *only issues → database*, *only database → issues*) and map properties:

| Issue | Property |
| --- | --- |
| Title | Title |
| Description (Markdown) | a text property or the record's document |
| Open/closed and labels | a select – per option "open" or "closed", optionally with a label (e.g. *Doing* → open + `in progress`) |
| Labels | a multi-select (only labels that exist as options) |
| Assignee | a person (through the connection's people list) |
| Milestone due date | a date (an existing milestone with that date is set) |
| Number and address | number/text or URL – read-only |

Two switches handle **comments**: issue comments appear as record comments (with name and link), and record comments go out as issue comments. **Also take over existing issues** fetches all existing issues on the first run; otherwise only what changes after saving. New records become issues once the mapping is saved – older records stay as they are.

**Conflicts**: if both the record and the issue changed since the last sync, the later change wins. The decision is written to the audit log. Each record is linked to at most one issue; the record then shows a chip like **GitHub #123** with a link.

**Status**: the dialog shows the last pull and push, conflicts, skipped records and errors; **Sync now** starts a run right away. When the provider reports a rate limit, Flowplan waits for the time it gives. A repository can only be connected to one database. **Disconnect** ends the sync; records and issues stay.

Pull requests are not synced. Administrators allow own servers (GitHub Enterprise, self-hosted GitLab, your own Forgejo or Gitea) with [`ISSUE_SYNC_ALLOWED_HOSTS`](/configuration-integrations#integrations).
