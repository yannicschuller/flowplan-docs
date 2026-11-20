---
keywords: library, knowledge library, shelf, shelves, book, books, chapter, handbook, documentation, wiki, BookStack, continue reading, search, permissions, groups, SSO
---

# Library

For knowledge with hundreds of pages – handbooks, policies, documentation – show spaces as a **library**: each such space is a **shelf**, the pages at the top of the space are its **books**, their sub-pages the **chapters**. The library in the navigation shows all shelves at a glance and searches them all at once.

**More on this topic:** [Pages and spaces](/pages-and-spaces) · [Sharing and publishing](/sharing) · [Members, roles and permissions](/workspaces-and-permissions)

## A space as a library {since=0.10.0}

For documentation with hundreds of pages, show a space as a **library**: `…` next to the space → **Edit space …** → **Show as library**. There is no second structure: the pages at the top of the space are the **books**, their sub-pages the **chapters**, and theirs the **pages**.

- **Sidebar:** the space stays collapsed with just **Open library** below it. A click on the space's name still expands the page tree, to reorder pages.
- **Overview:** every book is a tile with icon, cover, number of pages and last edit, in the order of the page tree. A click shows the table of contents with collapsible chapters, **Start reading** and **Continue reading** (the page of the book you opened last).
- **Reading:** above every page you see its book and chapter and arrows to the previous and next page in reading order; at the bottom **Next** leads on.
- **Search:** the library's search field searches only this space.
- **Create:** **New book** on the overview, **New chapter** in a book, **+** on a chapter for a page.

You see only pages you may see; journal days are not part of the library. Through the API, `space.update` with `library` switches the view, and `GET /api/spaces/{spaceId}/library` returns the books and chapters.

## Books and chapters as overviews {since=0.11.0}

Books and chapters work like the compartments of a shelf: they open as an **overview**, and the editor appears only with a page.

- **New book** asks for the name only, in a small window – the shelf and the kind are given. Afterwards you see the new book's overview.
- A **book's overview** shows its title, cover, the number of pages and chapters, **Start reading** or **Continue reading** and the table of contents with collapsible chapters. **New chapter** creates a chapter, **New page** a page in a chapter you choose; **+** on a chapter creates the page right there.
- A **chapter** likewise opens as an overview of its pages, with **Start reading** and **New page**.
- A **page** opens in the editor, as usual.

If a book or chapter has text of its own – written before, or taken over as the description when importing from BookStack – it shows read-only above the table of contents. **Edit description** opens it in the editor; without text the action is **Add a description**. Nothing is lost.

Links to a book or chapter (`#page=…`), search hits and the path above a page lead to the overview; a link with `&edit=1` opens the book's text in the editor. **Start reading**, the arrows and **Next** go from page to page and skip the overviews; "Page 3 of 12" counts only the pages. Books and chapters that are not documents – a database, for example – still open as themselves. Spaces not shown as a library stay unchanged.

The window for new pages keeps its place while you type: it stays anchored at the top instead of moving with the centre when a hint such as "Similar entries already exist" appears or goes.

## All shelves at a glance {since=0.11.0}

As soon as you see at least one space shown as a library, **Library** appears in the navigation below **Home** – on a phone under **Navigation**. It shows all shelves side by side in two groups:

- **My shelves:** your private spaces shown as a library.
- **Shared shelves:** the team's spaces and private spaces shared with you.

On wide screens the two groups stand side by side, on a phone one below the other. Each shelf shows its books as tiles with cover or icon, title and the number of pages and chapters, in a row you scroll sideways; after twelve books, **All n books** leads to the shelf. A click on the shelf's name opens its overview, **All shelves** leads back.

At the top, **Continue reading** lists the books you read last, with the page you were on and its place in the book ("Page 4 of 37"). A click opens exactly that page.

The sidebar stays as it was: libraries are collapsed with **Open library** below them. The command palette knows **Open library** too.

## Search all shelves {since=0.11.0}

The library's search field searches all shelves at once and sorts the hits by level:

| Group | What is found | A click opens |
| --- | --- | --- |
| **Shelves** | Names of the spaces | the shelf's overview |
| **Books** | Titles of the pages at the top of the space | the book's table of contents |
| **Chapters** | Titles of their sub-pages | the chapter with the book navigation |
| **Pages and content** | Titles further down, then text, records, comments and files of any page of a book – with a snippet, the search word marked | the page (a record opens in its database) |

Below each hit you see its way: shelf › book › chapter. For titles, whole and leading matches come first, then the order of the page tree; a title whose text matches as well appears once, with its snippet. Each group shows at most 50 hits.

- **Collapse:** a click on a group's name collapses and expands it.
- **Keyboard:** <kbd>↓</kbd> moves from the search field to the first group, <kbd>↑</kbd> and <kbd>↓</kbd> go through groups and hits, <kbd>Home</kbd> and <kbd>End</kbd> to the first and last, <kbd>Esc</kbd> back to the search field, a second <kbd>Esc</kbd> clears it.
- **Query language:** for the content, the same as in the [search](/search-and-notifications) – `#tag`, `in:"Space"`, `OR`, `-word` and so on; titles are compared with the words you type. Journal days and spaces that are not a library stay out.

You find only what you would find anyway: the library uses the search index and the same permission checks as the normal search.

## Permissions for shelves and books {since=0.11.0}

The library has no permissions of its own. A shelf is a space, a book is a page – the [workspace's permissions](/workspaces-and-permissions#how-permissions-work-together) apply:

- **Who sees a shelf** is set by the space: **Whole team** or **Only people with access**, plus **View** or **Edit** per group under **Settings → Groups & permissions → Access to spaces**.
- **Who sees a book** is inherited from the shelf. **Share** on the book's page gives additional people or groups access; chapters and pages below inherit it. Someone who is given only one book of a private shelf sees the shelf with exactly that book.
- **Who can see this shelf?** is there for owners of the space and of the workspace – on the library's start and on the shelf's overview. It says who sees the shelf and leads to **Visibility of the space …** and – for workspace owners – to **Access for groups …**.
- **Who can see this book?** is in a book's table of contents – for owners of the shelf and for you if you created the book – and opens **Share** of the book's page: it lists who has access through the space, and you add people or groups.

For different audiences, create one shelf per audience (such as a private "Sales handbook" for the group Sales) and share single books only for exceptions.

### With SSO, SCIM or LDAP groups

Groups from the identity provider fill the workspace's groups – so who sees which shelf maintains itself:

1. **Settings → Groups & permissions → Groups:** create a group such as "Sales".
2. **SSO groups:** map the provider's group (e.g. `sales`) to that group – see [Map SSO groups](/sso-oidc#map-sso-groups-to-workspaces). SCIM groups and LDAP groups count the same way ([SCIM and LDAP](/scim-and-ldap)).
3. **Access to spaces:** set the shelf to **Only people with access** and give the group **View** – or **Edit** for those who write the books.

Whoever joins the group at the provider sees the shelf at their next sign-in (with SCIM right away, with LDAP after the hourly sync); whoever leaves no longer sees it. Single books are shared with a group the same way through **Share**.

## API and MCP {since=0.11.0}

- `GET /api/library?workspace=…` returns the shelves (`personal`, `shared`) with their books, `continueReading` and per shelf `canManage` – whether you may change its permissions.
- `GET /api/library/search?workspace=…&q=…` returns the hits by level (`shelves`, `books`, `chapters`, `pages`) with their way (`path`), snippet and `total` per group.
- `GET /api/spaces/{spaceId}/library` returns one shelf with every book's table of contents.
- Through [MCP](/mcp): `get_library` with `workspaceId` for all shelves or `spaceId` for one, `search_library` for the search by level.
