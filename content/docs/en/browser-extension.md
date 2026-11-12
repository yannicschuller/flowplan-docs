---
keywords: browser, extension, chrome, firefox, web clipper, bookmarks
---

# Browser extension

With the browser extension you save web pages to Flowplan in one click: the whole article, just the selection, a bookmark or single highlights. It runs in Chrome, Edge, Brave, Opera and Firefox.

## Setting up

1. In Flowplan, create a [personal API token](/api-and-webhooks) under **Settings → API & AI assistants** (or **Settings → Web clipper → Create token**) and choose the permission **Browser extension only**. Such a token can do nothing else: it opens neither the API nor MCP and cannot read anything but the list of your targets.
2. Install the extension (see below) and click its icon.
3. Enter the address of your instance, for example `https://flowplan.example.com`, and the token. The browser now asks once for access to exactly this address – the extension never accesses other sites.

**Sign out** in the extension's window removes the token from the browser and gives up the access to the instance. You can revoke the token in the settings at any time.

## Saving

Click the extension's icon or press **Alt+Shift+F**. Choose the target – the extension remembers it – and optionally tags:

- **Whole page:** the extension finds the actual article and leaves out navigation, ads, cookie notices, comments and sidebars. Links and images keep pointing to the original page. The link to the source sits at the top of the new page.
- **Selection:** only the selected part of the page, with formatting and links.
- **Bookmark only:** title, address, description and favicon go into the space's **Lesezeichen** (bookmarks) database (see [Web clipper](/import-export-versions)). Duplicate links are refused.

Depending on the target you get:

| Target | Whole page / selection | Bookmark |
| --- | --- | --- |
| A space | a new page in the space | a record in its bookmarks database |
| A page | a new sub-page | a record in the bookmarks database of its space |
| A database | a new record with the text as its document; the link goes into the first URL property | as for a page |

**Tags** go into a property named *Tags* (or *Schlagwörter*, *Labels*) when the database has one; new tags are added as options. In the bookmarks database the extension creates the *Tags* property the first time. On pages the tags appear as `#tag` below the source link.

The server cleans the content once more: scripts, forms, embedded foreign pages and event attributes are dropped, just like when pasting into the editor.

## Highlights

Select text on a web page and choose **Highlight in Flowplan** in the context menu (or press **Alt+Shift+H**). The passage is appended as a quote with a link to the source:

- If the target is a **page**, all highlights end up one below the other on that page.
- If the target is a **space**, the first highlight of a web page creates a new page for that source; further highlights of the same web page go onto the same page.
- If the target is a **database**, every highlight becomes a record.

A green check mark on the icon confirms the save, a red exclamation mark reports an error (such as an expired token).

Change the shortcuts in Chrome at `chrome://extensions/shortcuts`, in Firefox under **Add-ons → gear → Manage Extension Shortcuts**.

## Installing

The extension lives in the source code under `extensions/browser/` and needs no build step.

- **Chrome, Edge, Brave:** open `chrome://extensions`, turn on **Developer mode**, click **Load unpacked** and choose the folder `extensions/browser`.
- **Firefox:** open `about:debugging#/runtime/this-firefox` and **Load Temporary Add-on** → `extensions/browser/manifest.json`. For a permanent installation, have the ZIP signed at addons.mozilla.org.
- **Building the package:** `npm run extension:zip` writes `extensions/browser/dist/flowplan-<version>.zip` – upload this file to the Chrome Web Store, Edge Add-ons or addons.mozilla.org.

## Privacy and permissions

- The extension reads a page only when you call it (icon, context menu or shortcut) – it does not run in the background on every page.
- Permissions: `activeTab` (the current page, only after your click), `scripting` (to read it then), `contextMenus`, `storage` (address, token, the target chosen last) and access to exactly your Flowplan address, asked for only when connecting.
- It only sends to your instance. Cookies are not sent along; the token alone signs in.
- End-to-end encrypted spaces are not offered as targets: the server never writes plaintext into them.
- The server allows requests from browser extensions (CORS) only for the two clipper addresses `/api/clipper/targets` and `/api/clipper/save`, and only with a token – see [API and webhooks](/api-and-webhooks).
