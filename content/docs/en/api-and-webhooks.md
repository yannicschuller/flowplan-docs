# API and webhooks

With personal API tokens, scripts, n8n or Home Assistant access Flowplan; webhooks report new records, form answers and pages to other services.

## API tokens

Under **Settings → API & webhooks** you create tokens: with a name, **Read only** or **Read and write**. The token is shown only once – afterwards only its beginning is visible. A **Read only** token is refused for every request that writes, including restoring backups and uploading files.

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

## Webhooks

Owners of a workspace create webhooks: an address, events and optionally a single database.

| Event | When |
| --- | --- |
| `row.created` | A new record in a database, also from a form |
| `row.updated` | A record changed (`changed` names the properties) |
| `form.submitted` | A form answer |
| `page.created` | A new page |

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

### Check the signature

The header `X-Flowplan-Signature: sha256=<hex>` is the HMAC-SHA256 signature of the body with the secret key that is shown once when the webhook is created:

```js
import { createHmac, timingSafeEqual } from "node:crypto";
const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
const valid = timingSafeEqual(Buffer.from(expected), Buffer.from(req.headers["x-flowplan-signature"]));
```

### Delivery

- Answers with status 2xx count as delivered; otherwise Flowplan retries up to six times with growing intervals.
- The list shows the last delivery or the last error per webhook.
- Only public HTTPS addresses are allowed. For services in the same network (Home Assistant, n8n) the administrators set `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE=true`.

### Create webhooks via the API

With a **write token** of an owner, webhooks can also be created and removed via the API (`POST /api/webhooks`; remove one with `POST /api/command` and `{"action": "webhook.delete", …}`), for instance by automation services. Read tokens cannot.

## OpenAPI and SDKs

Every instance describes its own API as an [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0) document:

- `GET /api/openapi.json` – the document, public and cached for an hour. Its `servers` entry carries the instance's address (`APP_URL`).
- `/api/docs` – the same description for reading: every path by section, parameters, requests, answers and schemas.

It lists every endpoint an API token may call: workspace and pages, search, files, imports and exports, webhooks, the MCP server and `POST /api/command` with a schema for each commonly used action (`page.create`, `row.create`, `row.update`, `webhook.delete` …) plus the list of all other actions. Each endpoint names its error codes (400, 401, 403, 404, 409, 413, 429) and the rate limits; calendar subscriptions and CalDAV are noted as external accesses with their own link.

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

If you build Flowplan yourself, `npm run sdk` regenerates the clients; the test `tests/openapi.test.ts` fails when the committed files no longer match the document.

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
