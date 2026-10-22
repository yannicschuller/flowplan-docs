# MCP: AI assistants

Connect Claude, ChatGPT and other AI assistants to your Flowplan using the Model Context Protocol (MCP). They search, read and write with exactly your permissions, nothing more.

Besides the optional [built-in AI](/ai), MCP connects the assistant *you* choose. It works with your pages, databases and tasks. It sees only what you can see in Flowplan.

## Set up

1. Under **Settings → API & AI assistants**, create a [personal API token](/api-and-webhooks) for the assistant. Choose **Read only** if the assistant should only search and read. Choose **Read and write** if it should also create pages and records.
2. Copy the address shown under **AI assistants (MCP)**. It is your Flowplan address followed by `/api/mcp`, for example `https://flowplan.example.com/api/mcp`.
3. Enter both in your client (examples below). The settings page has a ready-made configuration for each client and fills in a token you have just created.

Use a separate token for each assistant. That way you can see when each one was last used, and you can revoke one without affecting the others.

### Claude Code

```bash
claude mcp add --transport http flowplan https://flowplan.example.com/api/mcp \
  --header "Authorization: Bearer fp_…"
```

With `--scope user` the connection is available in all your projects. In Claude Code, `/mcp` shows the connection and its tools.

### Claude Desktop

Claude Desktop connects to remote MCP servers that use a token through the small `mcp-remote` bridge, which needs Node.js. Open **Settings → Developer → Edit config**, add the following to `claude_desktop_config.json`, and restart Claude:

```json
{
  "mcpServers": {
    "flowplan": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://flowplan.example.com/api/mcp", "--header", "Authorization:${FLOWPLAN_AUTH}"],
      "env": { "FLOWPLAN_AUTH": "Bearer fp_…" }
    }
  }
}
```

The token goes in `env`, not in `args`: that way it does not appear in the process list.

### ChatGPT

In ChatGPT, custom MCP connectors are available in **developer mode**, depending on your plan and workspace settings. Under **Settings → Apps & Connectors**, create a new connector with the address `https://flowplan.example.com/api/mcp`. If ChatGPT offers token or API key authentication, enter `fp_…` there.

If your ChatGPT version only offers OAuth or "No authentication", ChatGPT cannot connect to Flowplan yet. Flowplan currently signs in only with personal tokens (see [What is supported](#what-is-supported)). Never put the token into the address as a workaround: addresses end up in logs.

### Cursor, VS Code, Windsurf and others

Clients that speak Streamable HTTP and accept their own headers use this configuration (the exact file depends on the client, e.g. `.cursor/mcp.json` or `.vscode/mcp.json`):

```json
{
  "mcpServers": {
    "flowplan": {
      "type": "http",
      "url": "https://flowplan.example.com/api/mcp",
      "headers": { "Authorization": "Bearer fp_…" }
    }
  }
}
```

## Tools

| Tool | What it does | Token |
| --- | --- | --- |
| `list_workspaces` | Your workspaces with your role and the spaces you can see | Read |
| `list_pages` | Pages in a workspace, optionally in one space or below one page | Read |
| `search` | Full-text search across pages, records, comments and file contents | Read |
| `read_page` | A page as Markdown; databases with their records | Read |
| `query_database` | Records with properties by name, property definitions, views; text filter, a saved view, paging | Read |
| `get_record` | One record with all properties and its record document | Read |
| `my_tasks` | Your tasks from documents and records, with due dates | Read |
| `create_page` | New document, database or whiteboard; documents can start with Markdown content | Write |
| `append_to_page` | Appends Markdown to the end of a document | Write |
| `create_record` | New record; properties by name | Write |
| `update_record` | Changes individual properties of a record | Write |

Properties are named by their name (or ID). Dates are written as `YYYY-MM-DD`, options by their name, people by e-mail address or name, and relations as a list of record IDs. `update_record` accepts the `version` from `get_record`: if someone changed the record in the meantime, the change is refused instead of being overwritten.

In addition, each page is available as a **resource** `flowplan://page/<ID>` (your favourites are listed). There are two **prompts**: *Summarize a page* and *Plan my day*.

## Permissions

- Every call acts as the person who owns the token, with **exactly their rights**. The same checks apply as in the browser: workspace membership and guest access, private spaces, page and group permissions, private records, and journals locked with a PIN.
- **Read tokens** only offer read tools. A write call with a read token is refused.
- **Write tools** run the same actions as the interface. That means automatic versions, mentions and task notifications, followers, the activity log and [webhooks](/api-and-webhooks#webhooks) all work as usual. Locked pages stay locked.
- Tokens never have administrator rights and cannot create or revoke tokens.
- The public demo has no MCP access: demo accounts cannot create tokens, and browser sessions are not accepted by `/api/mcp`.

## Security notes

- Treat the token like a password. Anyone who has it can read (and with a write token change) everything you can. Revoke a token under **Settings → API & AI assistants** if you no longer need it or it might have leaked; the connection stops immediately.
- AI assistants can be misled by content they read (prompt injection), for example by text on a page shared with you. Give an assistant a **read token** if it does not need to write. With a write token, use the client's confirmation prompts for tool calls.
- Answers can contain anything you can read in Flowplan. That content goes to the provider of your assistant, so check its privacy terms first.
- `/api/mcp` accepts only tokens, not the sign-in cookie, so another website cannot use your browser session. Requests from a foreign `Origin` are refused.
- Limits: 120 requests per minute per person, 2 MB per request, and answers are cut after 200,000 characters. Write tools have the same size limits as the interface.

## What is supported

- Transport: **Streamable HTTP** (`POST /api/mcp`, JSON answers, no session). Protocol versions 2025-06-18, 2025-03-26 and 2024-11-05.
- Sign-in: personal API tokens as `Authorization: Bearer fp_…`. **OAuth** sign-in (for clients that only support OAuth) is not available yet.
- Not included: deleting content, administration, files and uploads, whiteboard contents.

## Examples

- "Search Flowplan for the offer for Müller and summarize the open points."
- "Read the page *Team meeting* and add a section *Decisions* with today's results."
- "Show my overdue tasks and make a plan for today."
- "Create a record in the *Bugs* database: title *Login on iPad hangs*, status *Open*, assigned to anna@example.com."
