# API and webhooks

With personal API tokens, scripts, n8n or Home Assistant access Flowplan; webhooks report new records, form answers and pages to other services.

## API tokens

Under **Settings → API & AI assistants** you create tokens: with a name, **Read only**, **Read and write** or **Browser extension only**. The token is shown only once – afterwards only its beginning is visible. A **Read only** token is refused for every request that writes, including restoring backups and uploading files.

- **Browser extension only:** for the [browser extension](/browser-extension). The token only reaches /api/clipper/targets and /api/clipper/save; everywhere else it counts as no token.

Every request with the token acts with your permissions:

```bash
curl -H "Authorization: Bearer fp_…" https://flowplan.example.com/api/bootstrap
```

- **Read**: all `GET` endpoints, such as `/api/bootstrap` (workspace, pages) and `/api/pages/<id>` (a document, or a database with its records).
  In a database's answer the records are under `rows` (with `preview` instead of the full document); `related` contains linked databases, the database's own records are only under `rows`.
- **Write**: `POST /api/command` with the same action as the interface, e.g. to create a record:

```bash
curl -X POST https://flowplan.example.com/api/command \
  -H "Authorization: Bearer fp_…" -H "Content-Type: application/json" \
  -d '{"action":"row.create","pageId":"<database ID>","cells":{"title":"From Home Assistant"}}'
```

**Markdown export** also works with a read token, since it only reads – e.g. for a cron job that pushes the export into a Git repository (or let Flowplan do it, see [Markdown export and Git](/storage-and-backups#markdown-export-and-git)):

```bash
curl -sf -X POST https://flowplan.example.com/api/markdown-export \
  -H "Authorization: Bearer fp_…" -H "Content-Type: application/json" \
  -d '{"pageId":"<page id>","format":"zip","includeSubpages":true,"history":true}' -o export.zip
```

Instead of `pageId`, `spaceId` exports a whole [space](/import-export-versions#export-a-whole-space) into one ZIP: `{"spaceId":"<space id>","format":"zip","history":true}`.

Tokens never get administrator rights and cannot create further tokens. You can revoke them at any time in the same list; locked accounts lose their tokens automatically.

To connect Claude, ChatGPT or other AI assistants, use the [MCP server](/mcp) with a token like this.

## Idempotency-Key: retries without doubles

A request can fail without an answer – the connection drops, a proxy times out – although Flowplan already applied it. So that a script can simply try again, every changing request takes the header `Idempotency-Key`: one key per logical action (e.g. a UUID v4, 8–128 characters of `A–Z a–z 0–9 _ -`), sent again **unchanged** with every retry of that action.

```bash
KEY=$(uuidgen)
curl -X POST https://flowplan.example.com/api/command \
  -H "Authorization: Bearer fp_…" -H "Content-Type: application/json" \
  -H "Idempotency-Key: $KEY" \
  -d '{"action":"comment.create","pageId":"<page ID>","body":"Deployed"}'
# The same request with the same key again: no second comment.
```

- **First request:** applied; the key is stored with the answer. For `POST /api/command` this happens in the same transaction as the change – either both or neither.
- **Same key, same request** (method, path and body): the stored answer with the same status, marked with `Idempotent-Replayed: true`. Nothing is applied again.
- **Same key, different request:** `422` (`code: idempotency_key_reused`).
- **First request still running:** `409` with `Retry-After` (`code: idempotency_in_progress`) – wait and send again with the same key.
- **Answers with secrets** (a new API token, a feed address, an access password) and answers larger than 64 KB are not stored: a repeat gets `409` (`code: idempotency_already_applied`) instead of the secret a second time.
- An invalid key gives `400` (`code: idempotency_key_invalid`). A failed request (4xx, 5xx) keeps no key – after fixing the cause it can be sent again with the same key.

Keys belong to whoever sends them: to the person for the web app, to the API token, or to the app installation (widgets, Shortcuts, share sheet). The same key of another token or person is a different key. Keys expire after 24 hours. Requests without the header work as before.

The header is accepted by `POST /api/command`, uploads (`/api/upload`), imports, webhooks, time reports, issue sync, the browser extension's `/api/clipper/save` and the actions of the mobile apps; the [OpenAPI document](#openapi-and-sdks) marks these operations (`x-idempotent`). The web app, the mobile apps (widgets, Shortcuts, share sheet, notification buttons, changes queued offline) and the generated SDKs send a key with every change on their own and keep it when they retry – a double click, a tap with a weak signal or a reconnect never applies a change twice.

## Webhooks

Webhooks have their own section: **Settings → Webhooks** (group “Connections”, owners only). Owners of a workspace create webhooks there with **Create webhook**: an address, events and optionally a single database. The list shows each webhook with its format, last delivery and events. Every webhook has a page of its own (`/#settings/webhooks/<id>`) with the cards **Target** (format, address, database, credentials for Slack/Matrix), **Events** (one switch per event), **Message** (chat formats only), **Preview** and – for an existing webhook – **Delivery** with **Send test message**; **Save changes** saves it, and it is deleted in the **Danger zone** with **Delete webhook …**. The secret key appears once above the list after creating.

| Event | When |
| --- | --- |
| `row.created` | A new record in a database, also from a form |
| `row.updated` | A record changed (`changed` names the properties) |
| `row.done` | A record became done (status "Done" or similar, or the database's done rule) |
| `form.submitted` | A form answer |
| `page.created` | A new page |
| `comment.created` | A new comment on a page or record (`text`) |
| `mention` | Someone was mentioned in a page or record (`userId`, `text` = the name) |
| `digest.due` | Once a day at the chosen time: open records due today or overdue (`items`) |

Flowplan sends JSON with `POST`:

```json
{
  "event": "row.created",
  "id": "…",
  "createdAt": "2026-09-27T10:00:00.000Z",
  "workspaceId": "…",
  "data": { "pageId": "…", "rowId": "…", "cells": { "title": "New" } }
}
```

The test message from the settings arrives with the event `test`.

### Check the signature

The header `X-Flowplan-Signature: sha256=<hex>` is the HMAC-SHA256 signature of the body with the secret key that is shown once when the webhook is created:

```js
import { createHmac, timingSafeEqual } from "node:crypto";
const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
const valid = timingSafeEqual(Buffer.from(expected), Buffer.from(req.headers["x-flowplan-signature"]));
```

### Delivery

- Answers with status 2xx count as delivered; otherwise Flowplan retries up to six times with growing intervals.
- The list under **Settings → Webhooks** shows each webhook's format, last delivery or last error and its events.
- Only public HTTPS addresses are allowed. For services in the same network (Home Assistant, n8n) the administrators set `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE=true`.
- **Send test message** in the list or on the webhook's page (card **Delivery**) sends a sample message right away and shows the result; it is not retried. Below the last delivery the list also shows the last error and when it happened.

### Create webhooks via the API

With a **write token** of an owner, webhooks can also be created, changed and removed via the API (`POST /api/webhooks`, `POST /api/webhooks/update`, a test message with `POST /api/webhooks/test`; remove one with `POST /api/command` and `{"action": "webhook.delete", …}`), for instance by automation services. Read tokens cannot.

## Chat notifications

Instead of JSON, a webhook can post a ready message to a chat. On the webhook's page under **Settings → Webhooks**, choose the **format** in the card **Target**:

| Format | Target | What arrives |
| --- | --- | --- |
| JSON | n8n, Home Assistant, your own services | The signed JSON above |
| Slack | Incoming Webhook or a Slack app | Block Kit: header, text with the record as a link, fields for changed properties, a line with who and when |
| Matrix | Room webhook (e.g. hookshot) or the Matrix client API | HTML message (`formatted_body`) with plain text as `body` |
| Microsoft Teams | Incoming Webhook or the workflow "Post to a channel when a webhook request is received" | Adaptive Card with a fact list and an **Open in Flowplan** button |
| Discord | Channel webhook | Embed with title, link, fields and timestamp |

Next to the form a **preview** shows the message for a sample event, and below it the content that is actually sent.

### Setup

**Slack**

- *Messages only:* Create an app in Slack (api.slack.com/apps), turn on **Incoming Webhooks**, pick a channel and enter the address `https://hooks.slack.com/services/…` in Flowplan.
- *With thread replies:* Give the app the `chat:write` scope under **OAuth & Permissions**, install it and enter the **Bot User OAuth Token** (`xoxb-…`) and the **channel ID** (in Slack: channel details, at the bottom); invite the bot to the channel (`/invite @App`). For replies, also enter the **signing secret** (Basic Information). After saving, the webhook's page (card **Delivery**) shows a **Request URL** (`…/api/webhooks/slack/<id>`): turn on **Event Subscriptions** in the app, enter that address and subscribe to the bot event `message.channels` (`message.groups` for private channels). Replies in the thread of a Flowplan message then appear as a comment on the record – written in the name of the person who set up the webhook, prefixed with "Slack:". Threads are matched for 30 days.

**Matrix**

- *Room webhook:* Create a "generic webhook" in the room with a bridge such as hookshot and enter its address. Flowplan sends `text` and `html` (plus the fields of a Matrix message).
- *Client API:* Create an access token for a bot account, invite the account to the room and enter the **homeserver address** (e.g. `https://matrix.example.org`), the **access token** and the **room** (`!id:server` or `#alias:server`) in Flowplan. Flowplan sends with `PUT /_matrix/client/v3/rooms/{room}/send/m.room.message/{txn}`; retries of the same delivery never create duplicate messages.

**Microsoft Teams**

- In Teams, add a workflow to the channel from the template "Post to a channel when a webhook request is received" (or a classic Incoming Webhook) and enter the address it shows.

**Discord**

- In the channel settings under **Integrations → Webhooks** create a webhook and enter the address `https://discord.com/api/webhooks/…`. Mentions (@everyone etc.) are never triggered.

Access tokens, bot tokens and signing secrets are stored encrypted and never shown again; when editing, an empty field keeps the stored value, and **Remove stored credentials** deletes them. Chat addresses follow the same rule as other webhooks: public HTTPS only, and every delivery checks the address again.

### Templates

Every event has a default text that you can change in the form (**Template for event**). The buttons insert placeholders:

| Placeholder | Content |
| --- | --- |
| `{title}` | Title of the record or page |
| `{actor}` | Who caused it |
| `{page}` | Database or parent page |
| `{changes}` | Changed properties as a list (in the digest: the due records) |
| `{url}` | Link in Flowplan |
| `{text}` | Comment text or the name of the mentioned person |
| `{date}` | Date and time (in the digest: the day) |
| `{count}` | Number of changes or due records |

A small Markdown is allowed: `**bold**`, `_italic_`, `` `code` ``, `[text](address)`, lines starting with `- ` as a list and `> ` as a quote. Flowplan converts it to the platform's markup (Slack mrkdwn, Matrix HTML, Teams Markdown, Discord Markdown). Values from Flowplan are never read as markup – a `*` in a title stays a `*`. When `{changes}` is not in the template, Slack, Teams and Discord show the changes as fields of their own and Matrix as a list below. Long values are shortened (titles 200 characters, comments 1,000, at most 10 changes and 25 due records) so the platforms' limits are kept. The **language of the messages** (default texts, date format) is set per webhook.

Example:

```text
{actor} changed [{title}]({url}) in **{page}**:
{changes}
```

### Daily digest

With the event **Due today** (`digest.due`, "daily at …") a list of the open records that are due today or overdue arrives once a day at the chosen time (the browser's time zone when the webhook was created) – from all databases of the workspace or only the chosen one. The due date is the date property with "Due", "Fällig", "Deadline" or similar in its name, otherwise the first date property; done is what the database's done rule says. Private records are never listed. When nothing is due, nothing is sent.

## Inbound e-mail

Workspace owners create addresses with **Create address** under **Settings → General → Inbound e-mail** that file incoming e-mail in Flowplan:

- **Target page**: every e-mail becomes a new subpage. The subject is the title, the text (cleaned HTML or plain text) the content, with sender and date above it. Attachments become files of the new page; embedded images (`cid:`) appear in place, all other attachments as a list below.
- **Target database**: every e-mail becomes a record. The subject is the title, the text the record's content, the sender address goes into the first e-mail property (if there is one), the e-mail's date is the creation date, and attachments go into the first files property (otherwise as a list into the content).
- **Allowed senders**: addresses (`ada@example.org`) or domains (`example.org`, exactly that domain). E-mails from other senders are not stored but noted in the audit log.
- **Signing key** (optional): see below.

The address acts with the permissions of the person who created it. If they lose write access to the target or the target is locked, the address stops accepting mail (the list shows the error).

Security and limits:

- Every address has a random 32-character token. **Generate a new token** invalidates the current address at once.
- HTML from e-mails is cleaned like guest content: no scripts, forms, styles or frames; remote images (e.g. tracking pixels) are removed, links stay.
- Attachments: at most 20 per e-mail, 10 MB per file, 25 MB together; larger ones are named in the text. The file type is checked against the content, photos lose their location; only images and PDFs open in the browser, everything else is downloaded. Attachments count towards the workspace's storage quota and the daily budget for anonymous uploads (200 MB per address and day, plus `FLOWPLAN_ANONYMOUS_UPLOAD_MB` for the whole instance).
- At most 60 e-mails per address and hour (rejected ones count too); beyond that Flowplan answers 429 and the provider retries later.
- The same `Message-ID` is stored only once per address. Without a `Message-ID`, sender, subject, date and text count.
- The sender address of an e-mail can be forged. The sender list is a pre-filter; above all the token must stay secret. For webhooks the signing key adds protection.

### Via webhook (Mailgun, Postmark, SendGrid, Cloudflare)

Without further setup Flowplan accepts e-mail as a `POST` to the webhook address shown in the list:

```
https://flowplan.example.com/api/inbound-mail/<token>
```

Flowplan recognises the format from the content:

| Provider | Setup |
| --- | --- |
| **Mailgun** | *Receiving → Create Route*: an expression such as `match_recipient("flowplan@mg.example.com")`, action *Forward* to the webhook address. Enter Mailgun's *HTTP webhook signing key* as the signing key; Flowplan then checks `timestamp`, `token` and `signature` (at most 15 minutes old). |
| **Postmark** | Server → *Inbound* stream → *Webhook URL* = the webhook address. Postmark sends JSON with `FromFull`, `TextBody`, `HtmlBody` and `Attachments`. |
| **SendGrid** | *Settings → Inbound Parse → Add Host & URL*: domain and webhook address. With *POST the raw, full MIME message* the whole e-mail arrives (`email`), otherwise the fields `from`, `subject`, `text`, `html`, `attachment-info` and `attachment1…`. |
| **Cloudflare Email Routing** | An Email Worker rule that passes on the raw e-mail (example below). |
| **Your own scripts** | JSON or `multipart/form-data` with `from`, `to`, `subject`, `text`, `html`, `messageId`, `date` and `attachments` (JSON: `[{ "filename", "contentType", "content" (base64), "contentId" }]`, multipart: file fields) – or the whole e-mail as `raw` (text) or `rawBase64`, or as the body with `Content-Type: message/rfc822`. |

Cloudflare Email Worker:

```js
export default {
  async email(message, env) {
    const raw = await new Response(message.raw).arrayBuffer();
    const body = new Uint8Array(raw);
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.FLOWPLAN_KEY), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const sig = [...new Uint8Array(await crypto.subtle.sign("HMAC", key, body))].map((b) => b.toString(16).padStart(2, "0")).join("");
    const res = await fetch(env.FLOWPLAN_URL, {
      method: "POST",
      headers: { "Content-Type": "message/rfc822", "X-Flowplan-Signature": `sha256=${sig}` },
      body,
    });
    if (!res.ok) message.setReject(`Flowplan: ${res.status}`);
  },
};
```

**Signing key**: when an address has one, every delivery needs either the header `X-Flowplan-Signature: sha256=<hex>` (HMAC-SHA256 of the unchanged body with the key, as with Flowplan's own webhooks) or Mailgun's signature fields. Otherwise Flowplan answers 401.

Answers: `200` with `{"status": "stored" | "duplicate" | "rejected"}` – rejected and duplicate e-mails get 200 too, so the provider does not retry. `401` invalid signature, `404` unknown token, `409` target not writable, `413` too large or daily budget reached, `415` unknown format, `429` hourly limit.

### Via an IMAP mailbox

Instead of a provider, Flowplan can poll a mailbox of your own (every two minutes, unread e-mail). The administrators set `INBOUND_IMAP_HOST`, `INBOUND_IMAP_USER`, `INBOUND_IMAP_PASSWORD` and `INBOUND_MAIL_DOMAIN` for it ([Configuration](/configuration#inbound-e-mail-imap)). Each address in the list then reads

```
inbox+<token>@mail.example.com
```

(plus addressing: the part before `+` is the mailbox's user name). Flowplan looks for the token in `To`, `Cc`, `Delivered-To` and `X-Original-To`. Processed, duplicate, rejected and unroutable e-mails are marked as read; when the hourly limit or daily budget is reached they stay unread for the next round.

### Via the API

With an owner's **write token**: `GET /api/inbound-mail?workspace=<id>` lists the addresses; `POST /api/command` with `inbound.save` (create or change: `pageId`, `senders`, optionally `label`, `secret`, `id`), `inbound.rotate` and `inbound.delete` manages them.

## OpenAPI and SDKs

Every instance describes its own API as an [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0) document:

- `GET /api/openapi.json` – the document. Its `servers` entry carries the instance's address (`APP_URL`).
- `/api/docs` – the same description for reading: every path by section, parameters, requests, answers and schemas.

Both are only available to signed-in people and with an API token (`Authorization: Bearer fp_…`, any scope); without signing in `/api/openapi.json` answers `401` and `/api/docs` asks to sign in. Instances that want to show the description publicly set `FLOWPLAN_PUBLIC_API_DOCS=true`; visitors then only see the major version (`0.x`) under `info.version`, signed-in people the exact one.

```sh
curl -H "Authorization: Bearer fp_…" https://flowplan.example.com/api/openapi.json > openapi.json
```

It lists every endpoint an API token may call: workspace and pages, search, files, imports and exports, webhooks, the MCP server and `POST /api/command` with a schema for each commonly used action (`page.create`, `row.create`, `row.update`, `webhook.delete` …) plus the list of all other actions. Each endpoint names its error codes (400, 401, 403, 404, 409, 413, 429) and the rate limits; calendar subscriptions and CalDAV are noted as external accesses with their own link.

Uploaded images have a placeholder: the answer of `POST /api/upload` names, under `placeholder`, the size the image is shown in (`w`, `h`) and a [ThumbHash](https://evanw.github.io/thumbhash/) (`hash`, base64) – a blurred preview in about 25 bytes. `GET /api/files/placeholders?ids=…` returns the same for up to 100 files and profile pictures (`avatar:<user ID>`), but only for files you may download; anything else is left out of the answer. For older files the placeholder is computed on the first request. Files of encrypted spaces never have one – the server cannot see their content.

The document is built from the code: where the server validates input with `zod` (properties and views of a database, the actions, export options), the same schemas are used; the rest is described from the routes in `lib/openapi.ts`. A test keeps them together – every route under `app/api`, every action of `command()` and the SDKs.

### Clients

Two thin, dependency-free clients are generated from the document, in the source under [`sdk/`](https://github.com/yannicschuller/flowplan/tree/main/sdk):

- **TypeScript** (`sdk/typescript/flowplan.ts`): one file, ESM, built on `fetch`, with types for every answer and action. Copy the file into your project and you are done:

```ts
import { FlowplanClient } from "./flowplan.js";
const client = new FlowplanClient({ baseUrl: "https://flowplan.example.com", token: "fp_…" });
const { workspace, pages } = await client.bootstrap();
const { id } = await client.command({ action: "row.create", pageId: "<database ID>", cells: { title: "From the SDK" } });
```

- **Python** (`sdk/python/flowplan_client.py`): standard library only (`urllib`), Python 3.11 or newer, `TypedDict`s for the answers:

```python
from flowplan_client import FlowplanClient
client = FlowplanClient("https://flowplan.example.com", token="fp_…")
shell = client.bootstrap()
created = client.command({"action": "row.create", "pageId": "<database ID>", "cells": {"title": "From the SDK"}})
```

Methods are named after the document's `operationId` (`getPage` / `get_page`, `search`, `uploadFile` / `upload_file`, `markdownExport` / `markdown_export` …). Answers outside 2xx raise `FlowplanError` with the status, the server's message and, for 429, the time to wait. Each SDK comes with a README and an example script.

Both clients send an [`Idempotency-Key`](#idempotency-key-retries-without-doubles) with every change on their own and retry by themselves – GET requests and changes after a network error, `429`, `502`, `503`, `504` or `409` while the first attempt still runs, twice by default (`retries`, `0` turns it off). Changes are retried with the same key and so applied once. To repeat an action later, pass your own key: `idempotencyKey` (TypeScript, in the options of a call) or `idempotency_key=` (Python).

If you build Flowplan yourself, `npm run sdk` regenerates the clients; the test `tests/openapi.test.ts` fails when the committed files no longer match the document.

### Tags and properties via the API

- `GET /api/tags?workspace=<id>` – the workspace's tags (`id`, `name`, `color`, `position`, `pages`, `records`: number of readable database records with the tag) and properties (`id`, `name`, `type`, `options`). `GET /api/tags/<tagId>?workspace=<id>` also returns the readable pages (`pages`) and records (`records`: `page_id`, `row_id`, `title`, `database`, `space_id`, `updated_at`, `tags`) with that tag.
- `GET /api/pages/<id>` contains `properties`: `tags` (tag IDs), `values` (by property ID) and `info` (created/changed at/by).
- `POST /api/command` with `page.properties`: `{ "action": "page.properties", "pageId": "…", "addTags": ["Customer"], "values": { "Status": "Open", "Budget": 1200 } }`. Tags and properties go by ID or name; `tags` replaces all tags, `addTags`/`removeTags` change them, `null` removes a value.
- `POST /api/command` with `page.collapseProperties`: `{ "action": "page.collapseProperties", "pageId": "…", "collapsed": true }` collapses the bar with tags and properties for you (`false` expands, `null` back to the default). Applies only to you, on all devices; read access to the page is enough.
- `pages.tag` adds or removes tags on up to 500 pages at once.
- Owners only: `tag.save`, `tag.delete`, `tag.merge`, `tag.reorder`, `property.save`, `property.delete`, `property.reorder`. New tags (`tag.save` without `tagId`) may also be created by members with edit rights.
- Database properties with the tags as options: in `database.update` a `multiselect` property with `"tagOptions": true` (the server sets its `options`). Cells hold tag names; a new name in `row.create`, `row.update` or `rows.bulk` creates the tag (members with edit rights, 403 otherwise); `rows.import` leaves out names that may not become tags. MCP lists such properties in `get_database` with `tagOptions: true`.
- In `GET /api/search`, `#tag`, `-#tag` and `name:value` act as filters (see [Search](/search-and-notifications#filter-by-tags-and-properties)). MCP clients get tags and values with `read_page` as frontmatter.

## n8n

For [n8n](https://n8n.io) there is the community node **`n8n-nodes-flowplan`** (source under [`integrations/n8n`](https://github.com/yannicschuller/flowplan/tree/main/integrations/n8n)).

1. In n8n, install `n8n-nodes-flowplan` under **Settings → Community Nodes**.
2. Add a **Flowplan API** credential: your instance address and an [API token](#api-tokens).
3. Use the nodes:
   - **Flowplan** lists workspaces and pages, creates pages (optionally with Markdown content), reads, creates and updates database records (properties by name) and searches.
   - **Flowplan Trigger** starts workflows on new or changed records, form answers and new pages. It registers its own webhook on activation (which needs a write token of an owner), removes it on deactivation and rejects deliveries with a wrong signature.

If n8n runs in your own network, set `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE=true` ([Configuration](/configuration#integrations)).

## Calendar subscriptions

Calendar views can be subscribed to as an iCalendar link, see [Views](/views#subscribe-to-a-calendar).
