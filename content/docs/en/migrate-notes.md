---
keywords: Obsidian, vault, markdown, Logseq, GoodNotes, handwriting, import
---

# From Obsidian and GoodNotes

Markdown folders such as an Obsidian vault become pages or databases, handwritten notebooks from GoodNotes become Flowplan notebooks.

## From Obsidian and other Markdown folders

- **A vault as pages:** make a ZIP of the vault folder (with its `.obsidian` folder) and import it under **Settings → Import & export → Import** – via **AFFiNE, Confluence, Evernote, Google Docs, GoodNotes, Microsoft Word or Obsidian** with a preview, or via the Notion/Markdown import, which recognises a vault as well.
  - **Folders** become pages with their notes below. A **folder note** (`Projects/Projects.md` or `Projects.md` next to the folder) becomes the folder's page itself.
  - **Wikilinks** `[[Page]]`, `[[Page|text]]`, `[[Folder/Page]]` and `[[Page#Heading]]` become links to the imported pages – resolved like Obsidian does, by path or file name. Links to notes that do not exist stay text.
  - `[[Page#Heading]]`, `[[Page#^id]]`, `[[#Heading]]` and Markdown links with `#^id` become links to that heading or block; the `^id` markers at line ends leave the text and become the block's id.
  - **Embedded files** `![[image.png]]` become images, `![[file.pdf]]` file links; embedded notes `![[Note]]` become links.
  - **Callouts** such as `> [!note]` or `> [!warning] Title` become callouts of the matching kind.
  - **Tasks** keep their [status](/tasks-in-documents#task-status): `- [ ]` open, `- [/]` in progress, `- [x]`/`- [X]` done, `- [-]` cancelled, `- [>]` deferred. Other symbols from Obsidian themes or the Tasks plugin (`[?]`, `[!]`, `[*]`, `["]`, `[<]` …) are kept: the task counts as open, shows the symbol small in its box and is written back with the same symbol in the Markdown export and in Git. Digits such as `[1]` stay plain text.
  - **Tags** from the frontmatter (`tags:`) and in the text (`#tag`, not in code) are collected: on pages as the page's tags, in a new database in the *Tags* property – together with *Folder* for where a note came from. Further frontmatter keys become [properties](/import-export-versions#frontmatter-records-as-markdown-files) on pages.
- **Notes with frontmatter into an existing database:** in a database choose **Import CSV or Markdown** and pick the `.md` files or a ZIP. The YAML properties become columns – see [Frontmatter](/import-export-versions#frontmatter-records-as-markdown-files).
- **Aliases:** `aliases: [PAC, Pompe à chaleur]` (or `alias:`) in the frontmatter becomes the page's [aliases](/page-tags#aliases) or the record's [Aliases](/properties-and-formulas#aliases) property. @ mentions, search and unlinked mentions then also find "Chauffage" by "PAC", and the Markdown export writes them back as `aliases:`.

## From GoodNotes

Bring notebooks over from GoodNotes (5 and 6, on iPad, iPhone and Mac) as **PDF**. Every PDF becomes a [notebook](/notebooks) titled by its file name, every page a sheet with that page as its background – in the same size and orientation. You keep writing on it in Flowplan.

### Export from GoodNotes

**One notebook:**

::: steps

1. Open the notebook in GoodNotes.
2. Tap **Share** or **Export** at the top (depending on the version, the icon with the arrow or in the **⋯** menu) and choose **Export this notebook** – not just the current page.
3. Choose **PDF** as the format. If GoodNotes offers **Include page templates**, leave it on; otherwise ruling, grids and inserted PDF pages are missing from the background.
4. Save the PDF to **Files**, AirDrop it to your Mac, or open Flowplan in the browser and import it right away.

:::

**Several notebooks:** in GoodNotes' document overview, mark several notebooks with **Select** and export them together as PDF. Whether GoodNotes hands you single PDFs or a ZIP depends on the version – Flowplan takes both.

**All notebooks at once:** in GoodNotes' settings, turn on **Auto-Backup**, choose a cloud service (iCloud Drive, Google Drive, Dropbox or OneDrive) and set the format to **PDF**. GoodNotes then puts every notebook as a PDF into the backup folder, with your folders. Download that folder as a ZIP (Google Drive and Dropbox offer this in the browser; on a Mac, use **Compress** on the folder in Finder). The menus are named slightly differently depending on the GoodNotes version.

### Import into Flowplan

::: steps

1. Open **Settings → Import & export → Import** and choose the target space.
2. Choose **GoodNotes** as the source (a PDF is also detected automatically).
3. Click **Choose and check file** and pick the PDF – or several PDFs at once, or a ZIP of PDFs.
4. The preview shows how many notebooks and sheets will be created and what is skipped. **Import** creates the notebooks and opens the first one.

:::

Good to know:

- **Several PDFs** give several notebooks. **Folders** in the ZIP (such as the backup's folders) become parent pages; notebooks are listed in natural order ("Book 2" before "Book 10").
- **Handwriting and highlights** from GoodNotes are part of the PDF and stay sharp, but in Flowplan they belong to the background: you can write over them, but you cannot move or erase the old strokes one by one.
- **Search:** the PDF's text – typed text and, when GoodNotes exports it, the recognised handwriting – is indexed as for every PDF (the first 200 pages of each PDF). New handwriting in Flowplan is [recognised](/notebooks#recognising-handwriting-iphone-and-ipad) on iPhone and iPad.
- **Limits:** up to 500 pages per PDF (the preview names further pages and leaves them out), 1000 sheets per notebook, a PDF or ZIP of up to 100 MB. Damaged or password-protected PDFs and other files in the ZIP are skipped and named in the preview.
- Notebooks are only created when importing **as pages**, not as a new database.

Flowplan cannot read **the GoodNotes format (`.goodnotes`)** and backups in that format: it is GoodNotes' own, undocumented format and changes between versions. Flowplan recognises such files and tells you what to do – export the notebook as PDF, or switch Auto-Backup to PDF. When a ZIP holds `.goodnotes` files next to PDFs, the PDFs are imported and the others are listed in the preview.

PDFs from other note apps such as Notability, Noteshelf or OneNote become notebooks the same way.
