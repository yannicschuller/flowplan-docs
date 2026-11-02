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

The **Filter pages** field above the page tree hides everything that does not match; parent pages of the hits stay visible and expanded. <kbd>Esc</kbd> clears the filter. Templates, media, trash, settings and administration sit as a toolbar at the bottom of the sidebar.

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

- Reorder pages in the sidebar by drag and drop, or drag them onto another page to nest them.
- **Select pages** (the tick icon on a space) or <kbd>⇧</kbd>-click marks several pages that can be moved or deleted together.
- **Moving** to another workspace takes sub-pages, database records and files along. Shares with groups or people who are not members there are dropped. Databases with relations to databases staying behind have to be detached first.

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

Every page – document, database, whiteboard, notebook, dashboard, journal day – can carry **tags** and **properties**. Both belong to the whole workspace: a tag “Customer” is the same on every page, a property “Status” has the same options everywhere. (The properties of database records are separate, see [Properties, formulas and rollups](/properties-and-formulas).)

A slim bar under the page title holds them:

- **+ Tag** opens a field that suggests matching tags. <kbd>↑</kbd>/<kbd>↓</kbd> choose, <kbd>Enter</kbd> adds, <kbd>Esc</kbd> closes. If the name does not exist yet, <kbd>Enter</kbd> creates the tag. The field stays open so you can add several tags in a row. The ✕ on a tag removes it from the page.
- Clicking a tag opens the [tag view](#tag-view) with all pages that carry it.
- **+ Property** lists the workspace's properties the page does not have yet; owners can also choose **New property …** there. You edit values right in the bar – with the same fields as in databases. The ✕ next to a value removes it.

With neither tags nor values the bar is just a faint line with **+ Tag** and **+ Property**; in reading mode, without edit rights and on locked pages it is hidden then.

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
- **New tags** are created by members with edit rights while tagging. Guests and readers only pick existing ones.
- **Settings → Tags & properties** can only be changed by workspace owners; others see the lists. There tags are renamed, coloured (nine colours), ordered, merged and deleted, and properties are created, changed in type and options, ordered and deleted. A changed type or a removed option converts values where possible and removes the others; a deleted property disappears with its values from every page. Renaming, merging and deleting also changes the records of database properties that have the tags as options (see [Multi-select with the workspace's tags](/databases#multi-select-with-the-workspace-tags)).
- Values are read by whoever may read the page. The tag view, search and counts only show pages you may read; guests only see the tags and properties of the pages and records shared with them.

Pages in [encrypted spaces](/encrypted-spaces) have no tags or properties – the server would have to store them as plain text.

### Tag view

**Tags** (the tag icon at the bottom of the sidebar, or `> tags` in quick search) shows all tags with the number of their pages and records. A tag opens the list of its pages, most recently changed first, and below them the **records** of databases whose multi-select has the [workspace's tags](/databases#multi-select-with-the-workspace-tags) as options (with database and space; a click opens the record). Only records you may read appear – no private records of others, no properties hidden from you, nothing behind a journal PIN or in the trash. Above it you narrow the list with text or further tags (“And: + Offer”). Owners reach the settings through **Manage tags**. The view has its own address (`#tags/<id>`) to share or bookmark. In the search, `#tag` finds the same, see [Filter by tags and properties](/search-and-notifications#filter-by-tags-and-properties).

### Copies, templates and trash

Duplicating keeps tags and values (into another workspace by name: missing tags are created, values only for properties that exist there). [Page templates](/templates#your-own-templates) store tags and values and put them on new pages made from the template. In the trash they are kept and come back on restore; only deleting permanently removes them. Through the API, the command `page.properties` sets tags and values, see [API and webhooks](/api-and-webhooks#tags-and-properties-via-the-api).

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

### Collapse and expand spaces

A click on a space's name collapses its pages or expands them again. Each device remembers this for itself. Opening a page in a collapsed space expands it by itself; while filtering the page tree, every space with matches stays open.

## Trash

Deleted pages and spaces end up in the **Trash** at the bottom of the sidebar. There they can be restored or deleted permanently. Publications, share links and forms are switched off when deleting and are not switched on again automatically when restoring.

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
