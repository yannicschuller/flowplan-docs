---
keywords: page tree, sidebar, space, trash, favorites, move, split view
---

# Pages and spaces

Everything in Flowplan is a page in a tree. Spaces structure the tree, workspaces keep teams apart.

**More on this topic:** [Tags, properties and aliases](/page-tags) · [Links, mentions and the graph](/links-and-mentions)

## Structure

| Level | What it is |
| --- | --- |
| **Workspace** | A separate world with its own members, groups, templates and storage quota. Switch with the name at the top of the sidebar. |
| **Space** | A section in the sidebar, e.g. "Teamspace" or "Private". Open to all members or private. |
| **Page** | Document, database, whiteboard, journal or dashboard. Pages can have sub-pages at any depth. |

## Page types

- **Document**: text made of blocks – headings, lists, tasks, tables, code, formulas, diagrams, embeds. See [Documents and the editor](/documents).
- **Database**: records with properties, shown as a table, board, calendar, timeline, gallery, list, feed, chart or form. See [Databases](/databases).
- **Whiteboard**: an infinite canvas with sticky notes, shapes, connectors, pen and frames. See [Whiteboards](/whiteboards).
- **Journal**: one page per day, open tasks move along. See [Journal](/journal).
- **Dashboard**: tiles with metrics, charts, database views, tasks due and notes. See [Dashboards](/dashboards).
- **Workflow**: a flow of trigger, logic and actions that runs in the background. Guests do not see workflow pages. See [Workflows](/workflows).

## Page actions

The `…` menu at the top right of every page offers:

| Action | Effect |
| --- | --- |
| Change icon, change cover | Emoji, symbol or your own image; upload a cover image or choose an existing one and set its position. |
| Full width | The content uses the whole window width – for everyone who opens the page. If you turned on [Show pages at full width](/offline-and-apps#light-and-dark) under **Settings → Appearance & language → Editor**, you see every page this way; the entry then says "Your setting". |
| Change font | Default, serif or mono for this page. |
| Lock page | Protects against accidental changes until someone unlocks it. |
| Duplicate | A copy including sub-pages, databases and files; internal links point to the copies. |
| Move | Below another page, into another space or workspace. |
| Save as template | See [Templates](/templates). |
| Export, print / PDF | See [Import, export and versions](/import-export-versions). |
| Present | Show a document as full-screen slides, see [Present](/reading-and-presenting#present). |
| Open a page beside it … | Open a second page on the right in the [split view](#split-view). |
| Owner and review … | Who looks after the page and when it should be checked again, see [Owner and review date](/page-tags#owner-and-review-date). |
| Version history | Compare and restore earlier states. |
| Move to trash | Removes the page with its sub-pages; restorable. |

Clicking a page's icon also opens the picker for an emoji, a symbol or your own picture; **Add cover** appears when the pointer is over the title (always on a phone). If you prefer the icon small next to the title rather than large above it, choose **Next to the title** under **Settings → Appearance & language → Page icon** – **Add cover** then sits in a narrow row above the title. There is no need for an emoji in the title itself, so export file names stay free of emoji. The icon size you choose (small, medium, large) applies to the view above the title; next to the title the icon is as high as a line of the title. Printing shows the page as you see it.

**On a phone** a page's top bar holds only ☰ (sidebar), the title – fully readable, long titles wrap – and `⋯`. **Follow** (bell), **Favourite** (star) and **Share** sit at the top of the `⋯` menu with their state, **Reading mode** below them. The comments button shows in the bar only when the page has open comments, with their count; otherwise **Comments** is in the menu. The cloud for the saving state appears only when there is something to report: offline, while changes are on their way, or after an error.

### Right-click in the sidebar

Right-clicking a page in the page tree or under favourites – a long press on a phone – opens its actions directly: **Open in new tab**, **Open in split view**, **Copy link**, **Add to favourites**, **Share**, **Add sub-page**, **Change icon**, **Duplicate**, **Move**, **Export**, **Lock page** and **Move to trash**. Actions with a dialog open the page first.

### Filter pages

The **Filter pages** field above the page tree hides everything that does not match; parent pages of the hits stay visible and expanded. <kbd>Esc</kbd> clears the filter. Templates, media, tags, graph, trash, settings, help and administration sit as a toolbar at the bottom of the sidebar. On a phone they are gathered behind **More** next to your name – the only button in that row, so your name and the connection status stay fully readable: a tap opens a list of all of them with labels, and the page tree keeps its height. Below a line it also holds what the account menu **⋯** offers on a computer: light or dark theme, **About Flowplan**, **Legal notice** and **Privacy** (when the instance has set them up) and, last and set apart, **Sign out**.

## Split view

Two pages side by side – say notes on the left and the task database on the right. A page opens on the right with:

- **Open in split view** in the right-click menu of a page in the page tree,
- <kbd>⌘</kbd>-click (Windows/Linux: <kbd>Ctrl</kbd>-click) on a page in the page tree, under favourites or on a page link in the text,
- dragging a page from the page tree to the **right edge of the window** (a drop area appears there),
- ++⌘ ⌥ S++ or **Open a page beside it …** in the `…` menu: the quick search opens the chosen page on the right.

Each half has its own header with the title and **×**. The **×** on the left closes the left page and the right one moves into the main view; the arrow on the right brings the right page into the main view. Documents can be edited in both halves; databases, whiteboards and dashboards work as usual.

Drag the **divider** between the halves with the mouse; with the keyboard, tab to it, then <kbd>←</kbd> / <kbd>→</kbd> (with <kbd>⇧</kbd> in large steps), <kbd>Home</kbd> / <kbd>End</kbd> for the narrowest and widest position, <kbd>Enter</kbd> or a double-click for half and half. The device remembers the width.

Dragging a page from the page tree into a document in the other half inserts a **link** to it there; selected text and blocks can be dragged between the two documents (they are copied).

The right page is part of the address (`?split=…`): reloading and bookmarks keep the split view. Windows up to 1024 pixels wide and phones do not have it – there, the same ways open the page as usual.

> [!NOTE]
> Since <kbd>⌘</kbd>/<kbd>Ctrl</kbd>-click in the page tree now opens the split view, a multiple selection starts with <kbd>⇧</kbd>-click or the tick icon of the space; after that, <kbd>⌘</kbd>/<kbd>Ctrl</kbd>-click adds more pages too.

## Arrange and move

- Reorder pages in the sidebar by drag and drop, or drag them onto another page to nest them. Dropped onto a record with sub-pages (below its database) or onto the sub-pages of an open record, the page becomes its [sub-page](/databases#sub-pages-of-a-record). On touch screens a handle only picks something up after a short hold (about 0.3 seconds, with a short vibration); swiping before that scrolls the page, and a quick tap works as usual. The same goes for blocks in a document, home page widgets and records, cards and columns in databases. With a mouse or pen it starts right away.
- **Select pages** (the tick icon on a space) or <kbd>⇧</kbd>-click marks several pages that can be moved or deleted together.
- **Moving** to another workspace takes sub-pages, database records and files along. Shares with groups or people who are not members there are dropped. Databases with relations to databases staying behind have to be detached first.
- **Moved to another space** (or workspace), pages keep the [tags and properties of the whole workspace](/page-tags#scope-workspace-or-space). If they (or their sub-pages and the records of their databases) carry tags or properties that apply **only in their current space**, a step **Bring tags and properties along** asks for each one:
  - **Map** to a tag or a property of the same type at the destination – the one with the same name is suggested if there is one,
  - **Copy to “destination”** – a tag or property of its own in the destination space, with all values (the default when there is nothing of the same name there; if the name is taken there, the copy gets the old space's name added, e.g. “Phase (Sales)”),
  - **Remove** – the values are lost then.

  Without this choice nothing moves – not by drag and drop, not when moving several pages, not through the API: values are never dropped silently. **Undo** brings the pages back and maps their tags to the ones of the same name in the old space again. The originals in the old space stay.

> [!NOTE]
> Pages keep their address when moved. Links to the page keep working as long as the reader has access in the new workspace.

## Favourites and "Linked from"

The star in the header (on a phone **Favourite** in the `⋯` menu) puts a page under **Favourites** in the sidebar – personal, others do not see your favourites. At the bottom of every page, **Linked from** shows which pages and database records refer to it.

## Manage spaces

Via `…` next to a space → **Edit space …** or **Settings → Spaces**:

- rename it, give it an emoji or symbol and one of nine colours, or an image of your own: **Upload image** next to **Choose icon** crops a PNG, JPEG, WebP or GIF to a small square (as for the workspace image); only people who can see the space receive it, and **Remove** goes back to the default folder icon,
- switch the visibility between open (all members) and private,
- **Duplicate space**: an independent copy of all active pages, records and attachments; comments, versions and shares are not copied,
- **Git export** (only for the owner of the space, when the administration has switched it on): push the space into a Git repository daily or weekly, see [Git export of a space](/markdown-git-export#git-export-of-a-space),
- move it to the trash. The last active space stays until there is another one.

### Order of spaces

Workspace owners decide in which order the spaces appear in the sidebar – the same for every member:

- **Drag**: grab a space by its header (name and symbol) and drop it above or below another space. A blue line shows where it lands.
- **Keyboard and phone**: `…` next to the space → **Move up** or **Move down**. Screen readers announce the new position.
- **Settings → Spaces** lists the spaces in the same order, with arrows to move them.

Other members see the new order within a few seconds, without reloading. Wherever spaces are offered for choice – moving, sharing, the browser extension, record to page – the same order applies.

- New spaces go to the end, a **duplicated** space right after its original.
- A space restored from the **trash** returns to its old place.
- A **restore archive** keeps the order of its spaces; on import they go to the end. Older archives without an order keep their previous one.
- Spaces you cannot see – private spaces of others, encrypted spaces without the key – keep their place. Their names appear nowhere; reordering changes nothing about visibility.

> [!NOTE]
> Through the API the command `space.reorder` (`{ workspaceId, order: [spaceIds] }`) sets the order of the spaces you see in the sidebar; only workspace owners may do this. The answer lists the visible spaces in their new order.

### Collapse and expand the sidebar

A click on a space's name collapses its pages or expands them again, and the same works for **Favourites** and **Collections**; the arrow in front of a page shows or hides its sub-pages. Pages with sub-pages start collapsed.

Flowplan remembers what you expanded and collapsed – in your account, per workspace, so it is the same on all your devices (browser, phone, desktop app) and after reloading. This covers pages, spaces, favourites, collections and the year and month folders of journals. Others do not see your choice.

- **Open page:** opening a page expands its space and the pages above it so it is visible in the sidebar; nothing else collapses. This only lasts for the visit – after a reload, only what you expanded yourself stays open (plus the way to the page that is open).
- **Expand all / Collapse all:** in a space's **…** menu, for all pages of the space.
- While filtering the page tree, everything with matches is open.
- Deleted pages and spaces drop out of what is remembered.

> [!NOTE]
> Through the API, the command `sidebar.state` (`{ workspaceId, changes: { "<key>": true|false } }`) saves changes; the keys are `p:<page>` (expanded), `s:<space>` (collapsed), `g:favorites`, `g:collections` and `jo:`/`jc:` for journal folders. The bootstrap returns the state as `sidebar`.

## Trash

Deleted pages and spaces end up in the **Trash** at the bottom of the sidebar, deleted [database records](/databases) below them under **Deleted records**. Files deleted from [Media](/media-and-files#deleting-media) are listed under **Deleted files**. There they can be restored or deleted permanently. Publications, share links and forms are switched off when deleting and are not switched on again automatically when restoring.

- **Restore** brings a page back with the sub-pages that were deleted together with it. Sub-pages that were already in the trash before stay there – with their own retention period.
- **Delete permanently** next to a page deletes it together with its sub-pages in the trash. The dialog names the page and how many sub-pages go with it. You need the same right as for deleting it: editing the page. Sub-pages you may not edit stay in the trash on their own.
- **Empty trash** deletes everything in the trash you may delete: pages you may edit, spaces you manage and deleted records you may edit. The dialog shows the counts first. Pages from other people's private spaces and pages you can only read are left untouched.
- Deleted permanently are the page with its content, versions, comments and inline comments, for databases the properties, views and records, plus uploaded files, favorites, publications, share links, notifications and search results. Links from other pages then point to a deleted page. This cannot be undone; a [backup](/storage-and-backups) is the only way back.
- After **30 days** in the trash everything is deleted permanently by itself – pages, spaces, records, files and [templates](/templates#your-own-templates). The line at the top names the period, and every page shows how many days it has left. Admins change the period under [Limits & retention](/administration#limits-retention) (0 = never automatically).

Right after deleting, Flowplan shows a notice at the bottom such as “‘Notes’ moved to the trash” with **Undo** – for about six seconds, longer while the pointer or the focus rests on it. **Undo** or ++⌘ Z++ (outside text fields) brings the page back with its sub-pages and opens it again. The same goes for moving pages in the page tree and for several pages at once.
