---
keywords: tags, labels, properties, alias, review date, owner, verification, wiki
---

# Tags, properties and aliases

Tags and properties organise every page across spaces and the page tree; aliases give it more names, an owner and a review date keep it current.

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
- **Settings → Tags & properties** is changed by workspace owners (everything) and a space's owners (their space's tags and properties); others see the lists. There tags are renamed, coloured (nine colours), ordered, merged and deleted, and properties are created, changed in type and options, ordered and deleted. A changed type or a removed option converts values where possible and removes the others; a deleted property disappears with its values from every page. Renaming, merging and deleting also changes the records of database properties that have the tags as options (see [Multi-select with the workspace's tags](/database-properties#multi-select-with-the-workspace-tags)).
- Values are read by whoever may read the page. The tag view, search and counts only show pages you may read; guests only see the tags and properties of the pages and records shared with them.

Pages in [encrypted spaces](/encrypted-spaces) have no tags or properties – the server would have to store them as plain text.

### Scope: workspace or space

Spaces separate topics and permissions – tags and properties can too. Every tag and every property applies either

- **in the whole workspace** – to all pages of all spaces, or
- **only in one space** – only pages of that space (and the databases in it) use it.

New tags and properties belong **to the space** you create them in; what existed before this distinction keeps applying to the whole workspace. Lists show the scope with a small label: the space's name (dashed) or “Workspace”.

- **Same names:** two spaces may each have their own tag “Urgent” – they are different tags. Within what a page sees (its space plus the workspace) a name is unique, ignoring case: a space cannot create a tag “customer” when “Customer” exists for the whole workspace. Same-named items are never merged on their own.
- **Visibility:** a space's tags and properties are seen by whoever may open that space (and whoever may read a page carrying them), and by the workspace owners.
- **Databases** with the [tags as options](/database-properties#multi-select-with-the-workspace-tags) offer the tags of their space and of the workspace.
- **Settings → Tags & properties** filters by scope. A new tag or property gets a scope there (a space's owners: only their space). Merging works only into a tag of the whole workspace or of the same space.

**Change scope** (arrow icon in the settings, workspace owners only):

- **From a space to the workspace** (promote) always works. If other spaces have a tag of the same name, the dialog names them; **Merge same-named** moves their pages to the promoted tag (properties only with the same type) – otherwise everything stays as it is.
- **From the workspace to a space** (or to another space) first shows where the tag or property is used **outside the target space** (spaces, pages, records). Then you choose: **Copy for the other spaces** (each space gets its own tag or property of the same name, with the values), **Remove there**, or **Do not change while it is used there**.

> [!NOTE]
> Through the API: `tag.save` and `property.save` take `spaceId` (missing or `null`: the whole workspace), `tag.scope`/`property.scope` change the scope (`resolve`: `block`, `copy`, `remove`; `mergeSameName`), `meta.usage` shows first where something is used. `GET /api/tags` returns `spaceId` for every tag and property. See [API and webhooks](/openapi#tags-and-properties-via-the-api).

### Tag view

**Tags** (the tag icon at the bottom of the sidebar, or `> tags` in quick search) shows all tags with the number of their pages and records. A tag opens the list of its pages, most recently changed first, and below them the **records** of databases whose multi-select has the [workspace's tags](/database-properties#multi-select-with-the-workspace-tags) as options (with database and space; a click opens the record). Only records you may read appear – no private records of others, no properties hidden from you, nothing behind a journal PIN or in the trash. Above it you narrow the list with text or further tags (“And: + Offer”). A tag is exactly that tag: if other spaces have one of the same name, **Also the tag of the same name in another space** adds its pages and records. Owners reach the settings through **Manage tags**. The view has its own address (`#tags/<id>`) to share or bookmark. In the search, `#tag` finds the same, see [Filter by tags and properties](/search-and-notifications#filter-by-tags-and-properties).

### Copies, templates and trash

Duplicating keeps tags and values (into another space or workspace by name: the ones of the same name there; a space's missing tags and properties are created in the target space). [Page templates](/templates#your-own-templates) store tags and values and put them on new pages made from the template; templates of another space ask what becomes of that space's tags and properties. In the trash they are kept and come back on restore; only deleting permanently removes them. Through the API, the command `page.properties` sets tags and values, see [API and webhooks](/openapi#tags-and-properties-via-the-api).
