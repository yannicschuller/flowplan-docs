---
keywords: api, rest, token, webhook, idempotency, n8n, integration
---

# API and webhooks

With personal API tokens, scripts, n8n or Home Assistant access Flowplan; webhooks report new records, form answers and pages to other services.

**More on this topic:** [OpenAPI and SDKs](/openapi) · [Inbound e-mail](/inbound-email) · [Chat notifications](/chat-notifications)

## API tokens

Under **Settings → API & AI assistants** you create tokens: with a name, **Read only**, **Read and write** or **Browser extension only**. The token is shown only once – afterwards only its beginning is visible. A **Read only** token is refused for every request that writes, including restoring backups and uploading files.

- **Browser extension only:** for the [browser extension](/browser-extension). The token only reaches /api/clipper/targets and /api/clipper/save; everywhere else it counts as no token.
- **Marketplace check:** a tick when you create the token, off by default (not for **Browser extension only** tokens). The token then reaches the [import check](/marketplace#checking-an-import) of marketplace packages (`POST /api/marketplace/check`) – also as a **Read only** token, because the check keeps nothing. The permission never allows a real import; that still needs a **Read and write** token. Without the permission `/api/marketplace/check` answers 403.

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

**Markdown export** also works with a read token, since it only reads – e.g. for a cron job that pushes the export into a Git repository (or let Flowplan do it, see [Markdown export and Git](/markdown-git-export)):

```bash
curl -sf -X POST https://flowplan.example.com/api/markdown-export \
  -H "Authorization: Bearer fp_…" -H "Content-Type: application/json" \
  -d '{"pageId":"<page id>","format":"zip","includeSubpages":true,"history":true}' -o export.zip
```

Instead of `pageId`, `spaceId` exports a whole [space](/export#export-a-whole-space) into one ZIP: `{"spaceId":"<space id>","format":"zip","history":true}`.

**Block links:** `GET /api/pages/{pageId}/blocks/{blockId}` returns the title and the start of a block's text (with `?row=` for records), `GET /api/blocks?workspace=…&q=…` searches headings and blocks, and the `block.ids` action gives the blocks of an older document their ids.

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

The header is accepted by `POST /api/command`, uploads (`/api/upload`), imports, webhooks, time reports, issue sync, the browser extension's `/api/clipper/save` and the actions of the mobile apps; the [OpenAPI document](/openapi) marks these operations (`x-idempotent`). The web app, the mobile apps (widgets, Shortcuts, share sheet, notification buttons, changes queued offline) and the generated SDKs send a key with every change on their own and keep it when they retry – a double click, a tap with a weak signal or a reconnect never applies a change twice.

## Webhooks

Webhooks have their own section: **Settings → Webhooks** (group “Connections”, owners only). Owners of a workspace create webhooks there with **Create webhook**: an address, events and optionally a single database. The list shows each webhook with its format, last delivery and events. Every webhook has a page of its own (`/#settings/webhooks/<id>`) with the cards **Target** (format, address, database, credentials for Slack/Matrix), **Events** (one switch per event), **Message** (chat formats only), **Preview** and – for an existing webhook – **Delivery** with **Send test message**; **Save changes** saves it, and it is deleted in the **Danger zone** with **Delete webhook …**. The secret key appears once above the list after creating.

Stored credentials (the token for Slack or Matrix) never go to a new address: if you change the address or the format of a webhook with a token, enter the token again, otherwise it isn't saved.

A webhook acts with the rights of the person who created it: it only reports pages, records and comments they may read – content from other people's private spaces stays out, as do hidden properties. If that person is deactivated or leaves the workspace, the webhook stops delivering. Its address and secret are stored encrypted.

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

## Workflows

[Workflows](/workflows) can be driven entirely through the API (all routes in the OpenAPI document under *Workflows*):

| Route | Purpose |
| --- | --- |
| `GET /api/workflows?workspaceId=` | List with status, “runs as” and last run |
| `GET /api/workflows/catalog` | Node catalogue with settings as JSON Schema |
| `GET /api/workflows/{id}` | Status, active version, draft with its check (editors) |
| `POST /api/workflows/{id}/draft` | Replace the draft by a graph JSON |
| `POST /api/workflows/{id}/test` | Dry run or test run of the draft |
| `POST /api/workflows/{id}/activate` | Activate – you become the person it runs as (write token) |
| `POST /api/workflows/{id}/pause` | Pause, optionally cancel open runs |
| `POST /api/workflows/{id}/run` | Start a workflow with a manual trigger |
| `GET /api/workflows/{id}/runs`, `GET /api/workflow-runs/{runId}` | Runs and steps |
| `POST /api/workflow-runs/{runId}/retry` / `cancel` | Retry from the failed node / cancel |
| `GET /api/workflows/{id}/export`, `POST /api/workflows/import` | JSON export (without secrets) and import as a draft |

Read tokens only read. Approvals are decided only by a signed-in person, never by a token. `activate`, `run` and `import` take an `Idempotency-Key`. The SDKs have methods for all of it (`saveWorkflowDraft`, `testWorkflow`, `activateWorkflow`, `runWorkflow` …).

### Inbound workflow webhook

The **Inbound webhook** trigger has an address of its own, `POST /api/workflow-hooks/<token>` (shown in the node, can be rotated). The default is **signed**: `X-Flowplan-Timestamp` (Unix seconds, at most 5 minutes old) and `X-Flowplan-Signature: sha256=<HMAC-SHA256(secret, timestamp + "." + body)>`. Each signature counts once. The answer is `202` right away, with the run's ID.

```bash
body='{"title":"Server down","description":"web-1 is not answering"}'
ts=$(date +%s)
sig=$(printf '%s.%s' "$ts" "$body" | openssl dgst -sha256 -hmac "$SECRET" | cut -d' ' -f2)
curl -X POST "$URL" -H "Content-Type: application/json" -H "X-Flowplan-Timestamp: $ts" -H "X-Flowplan-Signature: sha256=$sig" -d "$body"
```

```js
const ts = Math.floor(Date.now() / 1000).toString();
const sig = crypto.createHmac("sha256", secret).update(`${ts}.${body}`).digest("hex");
await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", "X-Flowplan-Timestamp": ts, "X-Flowplan-Signature": `sha256=${sig}` }, body });
```

```python
ts = str(int(time.time()))
sig = hmac.new(secret.encode(), f"{ts}.{body}".encode(), hashlib.sha256).hexdigest()
urllib.request.urlopen(urllib.request.Request(url, body.encode(), {"Content-Type": "application/json", "X-Flowplan-Timestamp": ts, "X-Flowplan-Signature": "sha256=" + sig}))
```

For services that cannot sign there is the deliberately chosen **Token only** mode (at most 10 calls a minute). A workflow's HTTP node sends an outgoing `Idempotency-Key: <run>:<node>:<iteration>`, so retries do not act twice at the receiver.

## n8n

For [n8n](https://n8n.io) there is the community node **`n8n-nodes-flowplan`** (source under [`integrations/n8n`](https://github.com/yannicschuller/flowplan/tree/main/integrations/n8n)).

1. In n8n, install `n8n-nodes-flowplan` under **Settings → Community Nodes**.
2. Add a **Flowplan API** credential: your instance address and an [API token](#api-tokens).
3. Use the nodes:
   - **Flowplan** lists workspaces and pages, creates pages (optionally with Markdown content), reads, creates and updates database records (properties by name) and searches.
   - **Flowplan Trigger** starts workflows on new or changed records, form answers and new pages. It registers its own webhook on activation (which needs a write token of an owner), removes it on deactivation and rejects deliveries with a wrong signature.

If n8n runs in your own network, set `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE=true` ([Configuration](/configuration-integrations#integrations)).

## Calendar subscriptions

Calendar views can be subscribed to as an iCalendar link, see [Views](/views#subscribe-to-a-calendar).
