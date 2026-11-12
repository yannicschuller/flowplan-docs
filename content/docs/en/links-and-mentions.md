---
keywords: link, mention, @, backlinks, wikilink, block link, graph, linked from
---

# Links, mentions and the graph

Link pages, records and people with @, point at single blocks and see in the graph how everything connects.

## Page links and mentions

`@` searches pages, database records and people – keep typing to narrow the list. The arrow keys move through the hits, <kbd>Enter</kbd> inserts the highlighted one. `@` opens the list at the start of a line, after a space or after an opening bracket or quote; inside a word – such as an e-mail address like `ada@example.org` – `@` is simply typed. <kbd>Esc</kbd> (or <kbd>Enter</kbd> without a hit) closes the list and types the `@` and what you searched for into the text. Journal days come after the other pages. `@today`, `@yesterday` (also `@heute`, `@gestern`) or a date such as `@2026-10-27` offer a link to that day of the [journal](/journal#days-in-lists-search-graph-and-export) under **Journal**. Records appear with their database, such as "Heating – maintenance · Notes"; only records you may read are offered. Mentioning a person notifies them in the inbox.

Links to pages and records stay valid even if they are renamed or moved. A link that shows the old title gets the new one on a rename – in all documents and records you may edit; a link with its own text keeps it. The target lists all links to it under **Linked from** – including records whose text contains the link. Records and pages you may not read do not appear there.

A link to a page or record shows the target's icon in front of its text: its emoji, symbol or own picture – without one, the sign of its kind (document, database, whiteboard, record). When someone changes the icon, every link follows, just as the title does on a rename. This also applies in reading mode, comments, published pages, the hover preview, the `@` list, **Linked from**, **Related pages** and search. A link to a block keeps its paragraph mark unless the page has its own icon. For pages and records you may not read, the link shows only the general link sign. Printing includes the icons; Markdown exports contain only the link text.

Links to the web are underlined and carry a small outward arrow after their text. If you'd rather not see the arrow, switch off **Settings → Appearance & language → Icon on external links** – links then stay coloured and underlined, only the arrow is gone, in documents, records, comments and reading mode. The setting applies to your account on all devices and only to how you see things: published pages keep showing the arrow to their visitors. The arrow is never printed; a printout shows the link's address after it instead.

### Automatic links

When an owner has set up [automatic links](/workspace-appearance#automatic-links), matching text becomes a link as soon as you type a space, a punctuation mark or <kbd>Enter</kbd> after it, and also when you paste it – in pages, in documents of database records and in comments. It is an ordinary link: it stays when you collaborate, work offline or use the apps, and you edit or remove it like any other. <kbd>⌘</kbd> <kbd>Z</kbd> (<kbd>Ctrl</kbd> <kbd>Z</kbd>) right after takes back only the link; the text stays. Text that is already there does not change; nothing is linked in code, existing links, formulas, titles or database table cells.

## Links to blocks

Every block can be linked: a paragraph, a heading, a list item, a table, an image, a diagram … The link is the page's address with the block, such as `https://flowplan.example.org/#page=…&block=k3x9a2b1` (records add `&row=…`), and works anywhere in the same workspace.

**Copying a link**

- in the block menu (the ⠿ handle left of the block, tap it on a phone): **Copy link to block**,
- for headings via the link symbol that appears after the heading on hover,
- in the [table of contents](/reading-and-presenting#table-of-contents) via the link symbol next to each heading (always visible on phones),
- with <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>L</kbd> (Windows/Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>L</kbd>) for the block the cursor is in.

The address is copied; pasted into other apps (mail, chat, Word) it shows as a link with the text "Page › start of the block".

**Pasting a link**

Paste a copied block link into a document or record of the same workspace (<kbd>⌘</kbd> <kbd>V</kbd>): it becomes a link styled like a page link, with the text "Page › start of the block". If text is selected, that text becomes the link. `@` also finds headings and blocks of other pages: `@Project › Goals` (or `@Project#Goals`) shows the headings of the page "Project" that contain "Goals"; a single search word also finds paragraphs with that text. Headings of the current page are listed as "This page › …".

When the linked page (or record) is renamed, the page title in the link text changes along; the part after "›" stays as it is. On hover, the preview shows the block's current text.

**Opening a link**

A click opens the page (for a record, the record in its dialog), scrolls to the block and briefly highlights it. A block in a collapsed section is expanded. If the block no longer exists, the page opens with the notice "This block no longer exists – the page is open."

**Good to know**

- A block keeps its link when it is edited, moved (also cut and pasted) or turned into another kind. Copies – **Duplicate** or copy and paste within the same document – get a link of their own. When Enter splits a block, the link stays with the first part.
- Preview and link text only show what you may read: for a page you cannot read, only "Linked block" appears, without text.
- In [encrypted spaces](/encrypted-spaces) block links work within the space as well; the server does not know the text there, so there is no text preview.
- People who may only read a page can copy links to its blocks, too.
- **Align left** no longer has a keyboard shortcut (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>L</kbd> now copies the block link); left is the default alignment and stays in the toolbar.

## Graph of links

The network icon at the bottom of the sidebar (or `> graph` in the quick search) shows all pages as dots and their links as lines. Database records appear as dots of their own once they link or are linked; a click opens the record. Large dots have many connections; colours tell documents, databases, records, whiteboards and journals apart.

- Drag to pan, scroll or use two fingers to zoom, click to open a page.
- Hovering highlights a page and its neighbours; **Highlight** marks pages by title.
- **Connect sub-pages** also shows the page hierarchy (dashed), **Pages without links** shows or hides single pages.
- **Journal days** controls the days of [journals](/journal): **hide**, **one dot per month** (default; the dot gathers the links of all days of the month, a click opens the journal) or **show each day**. The line at the top counts pages and journal days separately.
- Links to pages and records (also from a record's text), embedded whiteboards, linked databases and synced blocks count as connections. The graph only shows what you may see.

## Unlinked mentions

Below **Linked from** at the end of a page, **Unlinked mentions** lists documents and records in which the title of this page appears without being linked (titles of four characters or more), or one of its [aliases](/page-tags#aliases) as a whole word (two characters or more); the alias found is shown in grey next to the hit. **Link** turns the first mention there into a link to this page, by the title first, else by an alias – the text stays as written. An open record shows the same for its title and aliases below its properties.
