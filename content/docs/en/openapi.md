---
keywords: openapi, sdk, typescript, python, client, swagger
---

# OpenAPI and SDKs

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

## Clients

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

Both clients send an [`Idempotency-Key`](/api-and-webhooks#idempotency-key-retries-without-doubles) with every change on their own and retry by themselves – GET requests and changes after a network error, `429`, `502`, `503`, `504` or `409` while the first attempt still runs, twice by default (`retries`, `0` turns it off). Changes are retried with the same key and so applied once. To repeat an action later, pass your own key: `idempotencyKey` (TypeScript, in the options of a call) or `idempotency_key=` (Python).

If you build Flowplan yourself, `npm run sdk` regenerates the clients; the test `tests/openapi.test.ts` fails when the committed files no longer match the document.

## Tags and properties via the API

- `GET /api/tags?workspace=<id>` – the workspace's tags (`id`, `name`, `color`, `position`, `pages`, `records`: number of readable database records with the tag) and properties (`id`, `name`, `type`, `options`). `GET /api/tags/<tagId>?workspace=<id>` also returns the readable pages (`pages`) and records (`records`: `page_id`, `row_id`, `title`, `database`, `space_id`, `updated_at`, `tags`) with that tag.
- `GET /api/pages/<id>` contains `properties`: `tags` (tag IDs), `values` (by property ID) and `info` (created/changed at/by).
- `POST /api/command` with `page.properties`: `{ "action": "page.properties", "pageId": "…", "addTags": ["Customer"], "values": { "Status": "Open", "Budget": 1200 } }`. Tags and properties go by ID or name; `tags` replaces all tags, `addTags`/`removeTags` change them, `null` removes a value.
- `POST /api/command` with `page.collapseProperties`: `{ "action": "page.collapseProperties", "pageId": "…", "collapsed": true }` collapses the bar with tags and properties for you (`false` expands, `null` back to the default). Applies only to you, on all devices; read access to the page is enough.
- `pages.tag` adds or removes tags on up to 500 pages at once.
- Owners (for a space's tags and properties also that space's owners): `tag.save`, `tag.delete`, `tag.merge`, `tag.reorder`, `property.save`, `property.delete`, `property.reorder`. New tags (`tag.save` without `tagId`) with `spaceId` may also be created by members who may write in that space; without `spaceId` (or `null`) a new tag or property applies to the whole workspace (owners only).
- Scopes ([more](/page-tags#scope-workspace-or-space)): tags and properties in `GET /api/tags` carry `spaceId` (`null`: the whole workspace); `GET /api/tags/<id>?sameName=1` adds same-named tags of other spaces. `tag.scope`/`property.scope` (`{ workspaceId, tagId | propertyId, spaceId, resolve?: "block" | "copy" | "remove", mergeSameName? }`, owners only) change the scope, `meta.usage` (`{ workspaceId, kind, id, spaceId }`) shows the use outside the target first.
- Moving: `page.moveCheck` (like `page.move`) lists the tags and properties of the current space the destination lacks (`foreign`, with `sameName` and `candidates`). `page.move` and `pages.bulk` take the choice as `meta`: `{ "tags": { "<id>": { "action": "map", "to": "<id>" } }, "properties": { "<id>": { "action": "copy" } } }` or short `"auto"` (map to the same-named ones, else copy), `"copy"`, `"remove"`. Without a choice, `page.move` answers 409 instead of dropping values.
- Templates: `template.save` without `spaceId` belongs to the page's space, with `spaceId: null` to the whole workspace (owners; a space's tags: 409 or `spaceMeta: "remove"`). `template.dependencies` (`{ workspaceId, templateId, spaceId }`) lists what a template of another space brings (keys `tag:<name>`, `property:<name>`); `page.create`, `template.apply` and `template.copy` (`{ workspaceId, templateId, spaceId, meta? }`) take the choice as `meta`, `template.update` changes a template's scope with `spaceId`. `GET /api/templates` returns `space_id` and `space_name`.
- Text properties (except the title) hold inline Markdown – in `row.create`, `row.update`, `rows.bulk`, `rows.import`, when reading and in webhooks: `**bold**`, `_italic_`, `~~strikethrough~~`, `` `code` ``, `[label](https://…)` (http, https, mailto only), `\n` for a line break. Send plain text escaped: a backslash before `` \ * _ ~ ` [ ] ``. See [Formatted text](/database-properties#formatted-text).
- Database properties with the tags as options: in `database.update` a `multiselect` property with `"tagOptions": true` (the server sets its `options`). Cells hold tag names; a new name in `row.create`, `row.update` or `rows.bulk` creates the tag (members with edit rights, 403 otherwise); `rows.import` leaves out names that may not become tags. MCP lists such properties in `get_database` with `tagOptions: true`.
- In `GET /api/search`, `#tag`, `-#tag`, `name:value`, `OR`, `NOT`, parentheses, `created_by:`, `created:`, `type:`, `in:` and `title:` act as filters (parameter `tz`: the time zone for `today` and similar) (see [Search](/search-and-notifications#filter-by-tags-and-properties)). MCP clients get tags and values with `read_page` as frontmatter.

## Record versions

`row.update` carries the `version` of the record you read. If the record changed since, the server answers `409` – unless you also send `base`: the values of the changed properties as you read them. Then the change applies as long as nobody else changed those properties meanwhile, and only a real conflict (someone changed the same property) gets the `409`. Answers to `row.update` and the other changes of a record (`row.move`, `row.schedule` …) include its new `rowVersion`; send that with the next change.

## Collections via the API

- `GET /api/collections?workspace=<id>` – your collections and those shared with the workspace, in your order: `id`, `name`, `icon`, `query`, `shared`, `mine`, `canEdit`, `ownerName`.
- `GET /api/collections/<id>?tz=Europe/Berlin` – runs a collection. It returns `collection`, `items` (`pageId`, `rowId`, `type`, `title`, `icon`, `spaceId`, `database`, `tags`, `createdAt`, `updatedAt`, `createdBy`, `creatorName`; most recently changed first, at most 500), `total`, `truncated` and `encryptedLeftOut`. Matches always follow the permissions of the token's person.
- `GET /api/collections/preview?workspace=<id>&q=<query>` – the first 50 matches of a query that is not saved, and its canonical form (`query`).
- `POST /api/command`:
  - `collection.create` `{ workspaceId, name, query, icon?, shared? }`
  - `collection.update` `{ collectionId, name?, query?, icon?, shared? }`
  - `collection.delete` / `collection.restore` `{ collectionId }`
  - `collection.duplicate` `{ collectionId, name? }`
  - `collection.reorder` `{ workspaceId, order: [ids] }`
  The query is stored in its canonical form and returned as `query`. `search.save` and `search.delete` still work and create or delete collections.
- MCP: `list_collections`, `run_collection` (read), `save_collection`, `delete_collection` (write).
