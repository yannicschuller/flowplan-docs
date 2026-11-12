---
keywords: footnote, citation, bibliography, bibtex, zotero, doi, source, thesis
---

# Footnotes, citations and bibliography

For papers and theses: footnotes, citing sources in the text and a bibliography that writes itself.

## Footnotes

`/footnote`, ++⌘ ⌥ F++ (++Ctrl Alt F++) or **Footnote** in the text menu inserts a footnote at the cursor and opens its text.

- The notes appear numbered under **Footnotes** at the end of the page. Numbers follow the order in the text and update by themselves when you move, copy or delete markers.
- Clicking a number jumps to its note, ↩ jumps back. Double-click the number (or press ++⌘ ⌥ F++ with a footnote selected) to edit or remove it.
- Notes are plain text; web addresses in them become links.
- Footnotes also show on shared and published pages, in print and in the HTML export, and search finds their text.
- In the Markdown export they become `[^1]` with `[^1]: text` at the end; the import reads them back – including Obsidian's short form `^[text]`.

## Citations and bibliography

For papers, theses and research notes you cite sources right in the text:

::: steps

1. `/cite` (or `/zitat`) opens the workspace's **bibliography**.
2. Search a title, paste a **DOI** (e.g. `10.1000/xyz123` – Flowplan fetches authors, title and year from Crossref and other DOI services) or bring in a whole list via **Import BibTeX or CSL-JSON (Zotero) …**.
3. Optionally add a page and insert.

:::

The text then reads "(Müller 2021)", "(Müller & Schmidt 2021, p. 12)" or "(Müller et al. 2021)"; hovering shows the full reference. `/bibliography` inserts a **bibliography**: all works cited on the page in an APA-like style, updating itself as you cite – also on shared and published pages.

- The bibliography belongs to the workspace; guests don't see it. Each citation carries its details along, so copies, exports and shared pages are complete without the list.
- **Zotero:** export a collection from Zotero as *BibTeX* or *CSL JSON* and import it in the dialog.
- In the **Markdown export** citations become Pandoc citations (`[@key]`, `[@key, p. 12]`) and the bibliography a section of its own – so a text can be processed further with Pandoc.
