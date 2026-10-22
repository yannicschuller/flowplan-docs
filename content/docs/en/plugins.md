# Block extensions

Block extensions bring custom block types into the editor: a poll, a counter, a chart from a database, your team's own widget. An extension is a static web page with a manifest. Flowplan shows it isolated in a frame and only talks to it through messages.

## For owners: register an extension

1. Your administrators allow the address: either through `PLUGIN_ALLOWED_ORIGINS` ([configuration](/configuration#integrations)) or with the switch **Block extensions from any HTTPS address** under **Administration → Extensions & domains**.
2. Under **Settings → Block extensions** enter the address at **Address of the extension**, e.g. `https://plugins.example.org/poll/`, and choose **Register**. Flowplan loads `flowplan-plugin.json` from there, checks it and shows the extension as a card of its own: which blocks it brings and what it may do, below that the switches **Active** and **Also show on published pages**. It is removed with the trash icon at the top of its card.
3. In the editor its blocks appear in the `/` menu under **Extensions**.

Per extension there is:

- **Active** – when off, its blocks only show their text.
- **Also show on published pages** – without this switch its blocks appear on [published pages](/sharing#publish-on-the-web) as text only.
- **Databases it may read** – only when it requests database access.
- **Settings** – as the manifest describes them. Everyone who sees the block also sees the settings: do not enter passwords.

Registering again reloads the manifest (new version, new block types). Removing it leaves the blocks in the documents; they then show their text.

## What an extension may do – and what not

The frame has `sandbox="allow-scripts"` and never `allow-same-origin`, so the extension runs in an anonymous origin of its own:

- It reads neither Flowplan's cookies nor its storage and cannot change the page around it.
- It knows neither the name nor the e-mail address of the person reading.
- Forms, pop-ups and redirecting the whole page are blocked.
- Every message is checked: sender (exactly this frame), shape (zod schema), the nonce from the handshake. More than 60 messages per second are dropped.
- Height: the extension asks for a height; Flowplan keeps it between 40 px and the manifest's `maxHeight` (at most 2000 px).

Permissions a manifest can request:

| Permission | Meaning |
| --- | --- |
| `read:page` | Title of the page the block is on. |
| `read:selection` | The text selected in the editor. |
| `write:block` | Store its own data in the block (JSON, at most 64 KB) – only for people with edit rights. |
| `read:database:<id>` | Read records of exactly this database (ID of the database page). |
| `read:database` | Read records of the databases an owner picks when registering. |

Database queries always run with the rights of the person reading: private records and properties with a read rule stay hidden. Published pages never query databases, and blocks there are always read-only.

The text an extension hands over with its data goes into search and the Markdown export. In the export a link to the extension takes the frame's place.

## For developers: build an extension

An extension is a set of static files served over HTTPS. A complete example (counter and poll) lives in the repository under `examples/plugin-hello/`.

### The manifest

`flowplan-plugin.json` next to the entry page:

```json
{
  "name": "Hello Flowplan",
  "version": "1.0.0",
  "description": "A counter and a small poll",
  "entry": "index.html",
  "blocks": [
    { "type": "counter", "label": "Counter", "icon": "🔢", "description": "A number to count up" },
    { "type": "poll", "label": "Poll", "icon": "📊", "entry": "poll.html" }
  ],
  "permissions": ["read:page", "write:block"],
  "size": { "height": 160, "maxHeight": 600 },
  "settings": {
    "step": { "type": "number", "label": "Counter step", "default": 1 }
  }
}
```

| Field | Rule |
| --- | --- |
| `name` | 1–60 characters. |
| `version` | `1.2.3`, optionally with a suffix (`1.2.3-beta.1`). |
| `entry` | Relative path of the page in the frame (default `index.html`); no `..`, no other address. |
| `blocks` | 1–20 block types: `type` of lowercase letters, digits and `-`; `label`; optionally `icon` (emoji), `description` and an `entry` of its own. |
| `permissions` | See above. |
| `size` | Initial `height` and `maxHeight` in pixels (40–2000). |
| `settings` | Up to 20 settings: `string`, `number` or `boolean` with `label` and `default`. |

The manifest must not redirect to another address and may be at most 64 KB.

### Security headers

Serve the page with a strict Content Security Policy, for example:

```
Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'
```

`connect-src 'none'` makes sure block data does not leave the frame. If the extension needs a server of its own, name it there explicitly.

### The message protocol

All messages are objects with `protocol: "flowplan-plugin/1"`. After loading, Flowplan sends:

```js
{ protocol: "flowplan-plugin/1", type: "init", nonce, blockType, readOnly, permissions, settings }
```

From then on every message of the extension carries this `nonce`. Answer with `ready` first; Flowplan then sends the stored data as `data`.

| From the extension | Fields | Answer |
| --- | --- | --- |
| `ready` | – | `data` with the stored data |
| `resize` | `height` | – (the height is capped) |
| `getData` | `id` | `response` with `result` = data |
| `setData` | `id`, `data`, optionally `text` (search text, up to 2000 characters) | `response`; errors `read-only`, `permission:write:block` or `too-large` |
| `getContext` | `id` | `response` with `theme`, `locale`, `readOnly`, `blockType`, `page.title` (with `read:page`), `selection` (with `read:selection`) |
| `query` | `id`, `databaseId`, optionally `limit` (1–200) | `response` with `fields` and `rows`; errors `public` or `permission:read:database:<id>` |

Answers look like `{ protocol, nonce, type: "response", id, ok: true, result }` or `{ …, ok: false, error }`. When others change the data (simultaneous editing, undo), `data` arrives again.

A minimal example:

```js
const PROTOCOL = "flowplan-plugin/1";
let nonce = null;
const send = (message) => parent.postMessage({ protocol: PROTOCOL, nonce, ...message }, "*");
addEventListener("message", (event) => {
  if (event.source !== parent || event.data?.protocol !== PROTOCOL) return;
  const message = event.data;
  if (message.type === "init" && !nonce) {
    nonce = message.nonce;
    send({ type: "ready" });
  } else if (message.nonce === nonce && message.type === "data") {
    document.body.textContent = JSON.stringify(message.data);
    send({ type: "resize", height: document.documentElement.scrollHeight });
  }
});
```

Messages to Flowplan go out with the target `"*"`: the frame has no origin of its own that Flowplan could name. Flowplan recognises senders by the frame and the nonce.

### Try it

1. Serve `examples/plugin-hello/` over HTTPS (for example behind your reverse proxy).
2. Set `PLUGIN_ALLOWED_ORIGINS=https://plugins.example.org` and restart Flowplan.
3. As an owner register `https://plugins.example.org/plugin-hello/` and type `/counter` in the editor.
