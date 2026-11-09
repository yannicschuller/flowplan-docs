# Pages and spaces

Everything in Flowplan is a page in a tree. Spaces structure the tree, workspaces keep teams apart.

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
| Full width | The content uses the whole window width. |
| Change font | Default, serif or mono for this page. |
| Lock page | Protects against accidental changes until someone unlocks it. |
| Duplicate | A copy including sub-pages, databases and files; internal links point to the copies. |
| Move | Below another page, into another space or workspace. |
| Save as template | See [Templates](/templates). |
| Export, print / PDF | See [Import, export and versions](/import-export-versions). |
| Present | Show a document as full-screen slides, see [Present](/documents#present). |
| Open a page beside it … | Open a second page on the right in the [split view](#split-view). |
| Owner and review … | Who looks after the page and when it should be checked again, see [Owner and review date](#owner-and-review-date). |
| Version history | Compare and restore earlier states. |
| Move to trash | Removes the page with its sub-pages; restorable. |

### Right-click in the sidebar

Right-clicking a page in the page tree or under favourites – a long press on a phone – opens its actions directly: **Open in new tab**, **Open in split view**, **Copy link**, **Add to favourites**, **Share**, **Add sub-page**, **Change icon**, **Duplicate**, **Move**, **Export**, **Lock page** and **Move to trash**. Actions with a dialog open the page first.

### Filter pages

The **Filter pages** field above the page tree hides everything that does not match; parent pages of the hits stay visible and expanded. <kbd>Esc</kbd> clears the filter. Templates, media, tags, graph, trash, settings, help and administration sit as a toolbar at the bottom of the sidebar. On a phone they are gathered behind **More** next to your name: a tap opens a list of all of them with labels, and the page tree keeps its height.

## Split view

Two pages side by side – say notes on the left and the task database on the right. A page opens on the right with:

- **Open in split view** in the right-click menu of a page in the page tree,
- <kbd>⌘</kbd>-click (Windows/Linux: <kbd>Ctrl</kbd>-click) on a page in the page tree, under favourites or on a page link in the text,
- dragging a page from the page tree to the **right edge of the window** (a drop area appears there),
- <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>S</kbd> or **Open a page beside it …** in the `…` menu: the quick search opens the chosen page on the right.

Each half has its own header with the title and **×**. The **×** on the left closes the left page and the right one moves into the main view; the arrow on the right brings the right page into the main view. Documents can be edited in both halves; databases, whiteboards and dashboards work as usual.

Drag the **divider** between the halves with the mouse; with the keyboard, tab to it, then <kbd>←</kbd> / <kbd>→</kbd> (with <kbd>⇧</kbd> in large steps), <kbd>Home</kbd> / <kbd>End</kbd> for the narrowest and widest position, <kbd>Enter</kbd> or a double-click for half and half. The device remembers the width.

Dragging a page from the page tree into a document in the other half inserts a **link** to it there; selected text and blocks can be dragged between the two documents (they are copied).

The right page is part of the address (`?split=…`): reloading and bookmarks keep the split view. Windows up to 1024 pixels wide and phones do not have it – there, the same ways open the page as usual.

> [!NOTE]
> Since <kbd>⌘</kbd>/<kbd>Ctrl</kbd>-click in the page tree now opens the split view, a multiple selection starts with <kbd>⇧</kbd>-click or the tick icon of the space; after that, <kbd>⌘</kbd>/<kbd>Ctrl</kbd>-click adds more pages too.

## Arrange and move

- Reorder pages in the sidebar by drag and drop, or drag them onto another page to nest them. On touch screens a handle only picks something up after a short hold (about 0.3 seconds, with a short vibration); swiping before that scrolls the page, and a quick tap works as usual. The same goes for blocks in a document, home page widgets and records, cards and columns in databases. With a mouse or pen it starts right away.
- **Select pages** (the tick icon on a space) or <kbd>⇧</kbd>-click marks several pages that can be moved or deleted together.
- **Moving** to another workspace takes sub-pages, database records and files along. Shares with groups or people who are not members there are dropped. Databases with relations to databases staying behind have to be detached first.
- **Moved to another space** (or workspace), pages keep the [tags and properties of the whole workspace](#scope-workspace-or-space). If they (or their sub-pages and the records of their databases) carry tags or properties that apply **only in their current space**, a step **Bring tags and properties along** asks for each one:
  - **Map** to a tag or a property of the same type at the destination – the one with the same name is suggested if there is one,
  - **Copy to “destination”** – a tag or property of its own in the destination space, with all values (the default when there is nothing of the same name there; if the name is taken there, the copy gets the old space's name added, e.g. “Phase (Sales)”),
  - **Remove** – the values are lost then.

  Without this choice nothing moves – not by drag and drop, not when moving several pages, not through the API: values are never dropped silently. **Undo** brings the pages back and maps their tags to the ones of the same name in the old space again. The originals in the old space stay.

> [!NOTE]
> Pages keep their address when moved. Links to the page keep working as long as the reader has access in the new workspace.

## Owner and review date

So that guides, policies and knowledge pages do not go stale unnoticed, every page can have an **owner** and a **review date**. Set both under **… → Owner and review …** (edit rights needed):

- **Owner**: a member of the workspace (not a guest) who can read the page.
- **Next review on**: a fixed date, once, or
- **Then every … days**: a rhythm such as 30, 90, 180 days or yearly. Without a date it starts today.

Once the review date has come, the page shows the hint “This page is waiting for a review (owner: …)” at the top. **Reviewed** moves the date on by the rhythm, counted from today; a one-off date disappears. The owner gets a reminder on the due day (““Title” is waiting for your review”) – once per review date, in the inbox and, depending on the settings, as push or e-mail (kind “Date reminders”).

> [!NOTE]
> Through the API, the commands `page.owner` and `page.review` set owner and review date. A restore archive keeps review date and rhythm but not the owner, who belongs to the old workspace.

## Aliases

Under **… → Aliases …** a page gets further names, such as abbreviations ("PAC" for "Chauffage"). Up to 10 aliases of up to 100 characters each; <kbd>Enter</kbd> or a comma separates them, duplicates are dropped. Everyone with edit rights may change them.

@ mentions, the quick search and **Unlinked mentions** find the page by its aliases like by its title; hits show "Title · alias". When you pick a hit found by an alias in an @ mention, the alias becomes the link text. The Markdown export writes aliases as frontmatter (`aliases: [PAC]`) at the top of the page – only for pages that have some. Records use the property type [Aliases](/properties-and-formulas#aliases); a page that becomes a record takes its aliases there, and the other way round.

> [!NOTE]
> Through the API, the command `page.aliases` (`{ pageId, aliases: [...] }`) sets the aliases of a page; an empty list removes them. A restore archive keeps them.

## Tags and properties

Every page – document, database, whiteboard, notebook, dashboard, journal day – can carry **tags** and **properties**. A tag “Customer” is the same on every page it applies to; a property “Status” has the same options everywhere there. Whether they apply in the whole workspace or only in one space is their [scope](#scope-workspace-or-space). (The properties of database records are separate, see [Properties, formulas and rollups](/properties-and-formulas).)

A slim bar under the page title holds them:

- **+ Tag** opens a field that suggests the tags that apply to the page (the workspace's and those of its space; a space's tags with a small folder icon). <kbd>↑</kbd>/<kbd>↓</kbd> choose, <kbd>Enter</kbd> adds, <kbd>Esc</kbd> closes. If the name does not exist yet, **Create “name” in this space** (<kbd>Enter</kbd>) creates the tag for the page's space; owners can **create it for the whole workspace** instead. The field stays open so you can add several tags in a row. The ✕ on a tag removes it from the page.
- Clicking a tag opens the [tag view](#tag-view) with all pages that carry it.
- **+ Property** lists the properties that apply to the page and that it does not have yet; owners of the workspace and of the space can also choose **New property …** there – with the choice **Only in this space** (the default) or **In the whole workspace** (workspace owners only). You edit values right in the bar – with the same fields as in databases. The ✕ next to a value removes it.

With neither tags nor values the bar is just a faint line with **+ Tag** and **+ Property**; in reading mode, without edit rights and on locked pages it is hidden then.

### Collapsing the bar

With many tags and properties the bar gets long. The arrow at its far left collapses it into one line: the first tags as small chips (two on a phone, three otherwise), “+3” for the rest and the number of properties, e.g. “6 properties”. Clicking the line – or <kbd>Enter</kbd>/<kbd>Space</kbd> while it has focus – expands the bar again.

- **Your choice is per page and only yours.** It is stored in your account, so it applies on all your devices; others keep seeing the page the way they chose. This works in reading mode and without edit rights too.
- **Until you choose**, the bar is expanded while it is small and collapsed when the page shows **more than four properties** (properties with a value and the automatic ones such as “Created at” count; empty ones do not). This is decided when the page opens – the bar never folds away while you are filling in values.
- An empty bar (only **+ Tag** and **+ Property**) cannot be collapsed.
- **Printing and exports** always show all tags and properties, even when the bar is collapsed.
- Guests without an account who open a shared link see no bar, so there is nothing to remember there.
- Through the API the command `page.collapseProperties` sets your choice: `{ "action": "page.collapseProperties", "pageId": "…", "collapsed": true }` – `false` expands, `null` forgets the choice (the rule above applies again).

| Property type | Value |
| --- | --- |
| Text, URL, email, phone | Text up to 2,000 characters; URL, email and phone as links |
| Number | a number |
| Date | a day, optionally with a time |
| Select / multi-select | one or several of the defined options |
| Checkbox | yes or no |
| Person | a member of the workspace |
| Created at, edited at, created by, edited by | read from the page automatically |

**Who may do what:**

- **A page's tags and values** are set by whoever may edit the page – including guests with edit rights on it.
- **New tags** are created by members with edit rights while tagging – for the page's space. Tags for the whole workspace are created by owners only. Guests and readers only pick existing ones.
- **Settings → Tags & properties** is changed by workspace owners (everything) and a space's owners (their space's tags and properties); others see the lists. There tags are renamed, coloured (nine colours), ordered, merged and deleted, and properties are created, changed in type and options, ordered and deleted. A changed type or a removed option converts values where possible and removes the others; a deleted property disappears with its values from every page. Renaming, merging and deleting also changes the records of database properties that have the tags as options (see [Multi-select with the workspace's tags](/databases#multi-select-with-the-workspace-tags)).
- Values are read by whoever may read the page. The tag view, search and counts only show pages you may read; guests only see the tags and properties of the pages and records shared with them.

Pages in [encrypted spaces](/encrypted-spaces) have no tags or properties – the server would have to store them as plain text.

### Scope: workspace or space

Spaces separate topics and permissions – tags and properties can too. Every tag and every property applies either

- **in the whole workspace** – to all pages of all spaces, or
- **only in one space** – only pages of that space (and the databases in it) use it.

New tags and properties belong **to the space** you create them in; what existed before this distinction keeps applying to the whole workspace. Lists show the scope with a small label: the space's name (dashed) or “Workspace”.

- **Same names:** two spaces may each have their own tag “Urgent” – they are different tags. Within what a page sees (its space plus the workspace) a name is unique, ignoring case: a space cannot create a tag “customer” when “Customer” exists for the whole workspace. Same-named items are never merged on their own.
- **Visibility:** a space's tags and properties are seen by whoever may open that space (and whoever may read a page carrying them), and by the workspace owners.
- **Databases** with the [tags as options](/databases#multi-select-with-the-workspace-tags) offer the tags of their space and of the workspace.
- **Settings → Tags & properties** filters by scope. A new tag or property gets a scope there (a space's owners: only their space). Merging works only into a tag of the whole workspace or of the same space.

**Change scope** (arrow icon in the settings, workspace owners only):

- **From a space to the workspace** (promote) always works. If other spaces have a tag of the same name, the dialog names them; **Merge same-named** moves their pages to the promoted tag (properties only with the same type) – otherwise everything stays as it is.
- **From the workspace to a space** (or to another space) first shows where the tag or property is used **outside the target space** (spaces, pages, records). Then you choose: **Copy for the other spaces** (each space gets its own tag or property of the same name, with the values), **Remove there**, or **Do not change while it is used there**.

> [!NOTE]
> Through the API: `tag.save` and `property.save` take `spaceId` (missing or `null`: the whole workspace), `tag.scope`/`property.scope` change the scope (`resolve`: `block`, `copy`, `remove`; `mergeSameName`), `meta.usage` shows first where something is used. `GET /api/tags` returns `spaceId` for every tag and property. See [API and webhooks](/api-and-webhooks#tags-and-properties-via-the-api).

### Tag view

**Tags** (the tag icon at the bottom of the sidebar, or `> tags` in quick search) shows all tags with the number of their pages and records. A tag opens the list of its pages, most recently changed first, and below them the **records** of databases whose multi-select has the [workspace's tags](/databases#multi-select-with-the-workspace-tags) as options (with database and space; a click opens the record). Only records you may read appear – no private records of others, no properties hidden from you, nothing behind a journal PIN or in the trash. Above it you narrow the list with text or further tags (“And: + Offer”). A tag is exactly that tag: if other spaces have one of the same name, **Also the tag of the same name in another space** adds its pages and records. Owners reach the settings through **Manage tags**. The view has its own address (`#tags/<id>`) to share or bookmark. In the search, `#tag` finds the same, see [Filter by tags and properties](/search-and-notifications#filter-by-tags-and-properties).

### Copies, templates and trash

Duplicating keeps tags and values (into another space or workspace by name: the ones of the same name there; a space's missing tags and properties are created in the target space). [Page templates](/templates#your-own-templates) store tags and values and put them on new pages made from the template; templates of another space ask what becomes of that space's tags and properties. In the trash they are kept and come back on restore; only deleting permanently removes them. Through the API, the command `page.properties` sets tags and values, see [API and webhooks](/api-and-webhooks#tags-and-properties-via-the-api).

## Favourites and "Linked from"

The star in the header puts a page under **Favourites** in the sidebar – personal, others do not see your favourites. At the bottom of every page, **Linked from** shows which pages and database records refer to it.

## Manage spaces

Via `…` next to a space → **Edit space …** or **Settings → Spaces**:

- rename it, give it an emoji or symbol and one of nine colours,
- switch the visibility between open (all members) and private,
- **Duplicate space**: an independent copy of all active pages, records and attachments; comments, versions and shares are not copied,
- **Git export** (only for the owner of the space, when the administration has switched it on): push the space into a Git repository daily or weekly, see [Git export of a space](/storage-and-backups#git-export-of-a-space),
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

Deleted pages and spaces end up in the **Trash** at the bottom of the sidebar, deleted [database records](/databases) below them under **Deleted records**. Files deleted from [Media](/documents#deleting-media) are listed under **Deleted files**. There they can be restored or deleted permanently. Publications, share links and forms are switched off when deleting and are not switched on again automatically when restoring.

- **Delete permanently** next to a page deletes it together with its sub-pages in the trash. The dialog names the page and how many sub-pages go with it. You need the same right as for deleting it: editing the page. Sub-pages you may not edit stay in the trash on their own.
- **Empty trash** deletes everything in the trash you may delete: pages you may edit, spaces you manage and deleted records you may edit. The dialog shows the counts first. Pages from other people's private spaces and pages you can only read are left untouched.
- Deleted permanently are the page with its content, versions, comments and inline comments, for databases the properties, views and records, plus uploaded files, favorites, publications, share links, notifications and search results. Links from other pages then point to a deleted page. This cannot be undone; a [backup](/storage-and-backups) is the only way back.
- After **30 days** in the trash everything is deleted permanently by itself – pages, spaces, records, files and [templates](/templates#your-own-templates). The line at the top names the period, and every page shows how many days it has left. Admins change the period under [Limits & retention](/administration#limits-retention) (0 = never automatically).

Right after deleting, Flowplan shows a notice at the bottom such as “‘Notes’ moved to the trash” with **Undo** – for about six seconds, longer while the pointer or the focus rests on it. **Undo** or <kbd>⌘</kbd> <kbd>Z</kbd> (outside text fields) brings the page back with its sub-pages and opens it again. The same goes for moving pages in the page tree and for several pages at once.

## Graph of links

The network icon at the bottom of the sidebar (or `> graph` in the quick search) shows all pages as dots and their links as lines. Database records appear as dots of their own once they link or are linked; a click opens the record. Large dots have many connections; colours tell documents, databases, records, whiteboards and journals apart.

- Drag to pan, scroll or use two fingers to zoom, click to open a page.
- Hovering highlights a page and its neighbours; **Highlight** marks pages by title.
- **Connect sub-pages** also shows the page hierarchy (dashed), **Pages without links** shows or hides single pages.
- **Journal days** controls the days of [journals](/journal): **hide**, **one dot per month** (default; the dot gathers the links of all days of the month, a click opens the journal) or **show each day**. The line at the top counts pages and journal days separately.
- Links to pages and records (also from a record's text), embedded whiteboards, linked databases and synced blocks count as connections. The graph only shows what you may see.

## Unlinked mentions

Below **Linked from** at the end of a page, **Unlinked mentions** lists documents and records in which the title of this page appears without being linked (titles of four characters or more), or one of its [aliases](#aliases) as a whole word (two characters or more); the alias found is shown in grey next to the hit. **Link** turns the first mention there into a link to this page, by the title first, else by an alias – the text stays as written. An open record shows the same for its title and aliases below its properties.
