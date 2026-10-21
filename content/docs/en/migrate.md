# Moving from Notion, AppFlowy and Obsidian

Flowplan is an open-source alternative to Notion and AppFlowy under the AGPL-3.0. This is how you bring over pages, databases, images and files from the tool you use now.

## From Notion

1. In Notion: **Settings → Export** (for the whole workspace) or **Export** in a page's **…** menu. Choose the format **Markdown & CSV** and turn on **Include subpages**.
2. In Flowplan: **Settings → Data**, choose the ZIP and the space it goes into.
3. Done – the import runs in one step. If it fails, nothing is left half imported.

What it turns into:

- Every Markdown file becomes a page, every folder named like a page holds its sub-pages. The IDs Notion appends to file and folder names are dropped.
- Every CSV file becomes a database. When both versions are there, Flowplan takes `Name_all.csv` (all records) instead of the current view.
- Columns get a fitting type: numbers, checkboxes, dates (also in Notion's format "September 24, 2026") and selects with their options; the rest stays text.
- Record pages are matched to their records as their document.
- Images and files the pages refer to are uploaded.
- Large exports that Notion splits into several ZIP files inside the ZIP are recognised.

Limits per import: 100 MB, 500 pages and 5,000 records per table. Export larger workspaces in parts, for instance page by page.

## From AppFlowy

1. In AppFlowy, export pages as **Markdown** and databases as **CSV**.
2. Put the files into one folder – sub-folders become sub-pages – and make a ZIP of it.
3. Import it in Flowplan under **Settings → Data**.

Markdown becomes pages, CSV becomes databases; linked images and files come along.

## From Obsidian and other Markdown folders

- **A notes folder as pages:** make a ZIP of the folder and import it under **Settings → Data**.
- **Notes with frontmatter as a database:** in a database choose **Import CSV or Markdown** and pick the `.md` files or a ZIP. The YAML properties become columns – see [Frontmatter](/import-export-versions#frontmatter-records-as-markdown-files).
- **Aliases:** `aliases: [PAC, Pompe à chaleur]` (or `alias:`) in the frontmatter becomes the page's [aliases](/pages-and-spaces#aliases) or the record's [Aliases](/properties-and-formulas#aliases) property. @ mentions, search and unlinked mentions then also find "Chauffage" by "PAC", and the Markdown export writes them back as `aliases:`.
- Alerts such as `> [!WARNING]` become callouts of the matching kind.

## After the move

- **Check links:** links between imported pages point to the new pages; links to pages outside the export still point to the old tool.
- **Set up views:** an import creates one table per database. Add board, calendar, gallery or timeline afterwards – see [Views](/views).
- **Sharing:** permissions are not carried over. Invite members or share single pages – see [Sharing and publishing](/sharing).
- **Your data stays portable:** Flowplan exports again at any time as Markdown with frontmatter, CSV and ZIP, scheduled and pushed to Git if you like – see [Import, export and versions](/import-export-versions).

## Why move?

- **Completely open source:** all of the source code is on [GitHub](https://github.com/yannicschuller/flowplan) under the AGPL-3.0 – with no closed enterprise edition and no features behind a licence.
- **Your data, your server:** hosted on flowplan.org in Germany or as one Docker container on your own server – see [Installation](/installation).
- **No tracking.**
