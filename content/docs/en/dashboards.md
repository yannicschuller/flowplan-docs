---
keywords: dashboard, metrics, widgets, overview, kpi, tiles, chart, home page
---

# Dashboards

A page made of tiles: metrics, charts and views of your databases, tasks due, your journal streak and notes – at a glance, and for everyone with exactly the data they may see.

## Creating a dashboard

::: steps

1. **New page → Dashboard**, or `> New dashboard` in the quick search. Like any page, the dashboard sits in a space of the page tree and can have subpages.
2. A new dashboard is empty: **Add the first tile** switches to edit mode and opens the settings of the first tile.
3. Choose the **Type**, an optional **Title** and the **Size**, then the source and what the tile shows (below). **Add** places the tile; further tiles come with **Add tile**.

:::

A dashboard holds up to 48 tiles. Without a title of its own a tile is named after its source – “Projects · Board” for a view, the database's or journal's name for charts and the streak, otherwise the tile's type.

## Tiles

| Tile | Shows |
| --- | --- |
| **Database view** | A view of a database, as the linked database in a document shows it. With **Records editable here** records can be changed right on the dashboard, otherwise they are read-only. |
| **Metric** | The number of records of a view (with its filters) or the sum, average, minimum or maximum of a number property. With a **target** a progress bar appears. |
| **Chart** | Columns, bars, line or donut over a property – drawn like the chart view; a click on a record opens it. |
| **Journal streak** | How many days in a row you have written in a journal, plus today's entry or **Write today**. |
| **My due tasks** | Your tasks from **My tasks** that are due today or overdue. |
| **Recently changed** | The most recently changed pages and the number of unread notifications in the [inbox](/notifications#inbox). |
| **Text** | Free text in Markdown – for headings, notes or links. |

## Sources and settings

The settings of a tile offer only what you may read yourself: the databases and journals of the dashboard's workspace, without those behind a journal PIN you have not entered. If there is no database you can read, the dialog says so.

| Tile | What you choose |
| --- | --- |
| **Database view** | The **Database** and one of its **Views** (forms are left out; empty means the first view), and whether **Records editable here**. The view keeps its own filters, sorting and layout. |
| **Metric** | The database, the view whose **filters** count (or **All records**), the **Value** – number of records, sum, average, minimum or maximum – with the **Number property** it is calculated from, and an optional **Target**. |
| **Chart** | The database and the view whose records it draws (or all records), the **Chart type** (columns, bars, line, donut), **Group by** (a property, or automatic) and the value per group – number of records or the sum, average, minimum or maximum of a number property. Donuts get a legend. |
| **Journal streak** | The **Journal**. A day counts once something is written or tracked in it. |
| **Recently changed** | The **Number of pages** (1 to 20, six by default). The dashboard itself and pages you may not read are left out. |
| **Text** | The **Text (Markdown)**. |

**My due tasks** needs no source: it shows up to twelve of your own tasks due today or overdue, with a link to **All tasks**.

## Arranging and sizing

**Edit** at the top right switches to edit mode:

- **Add tile** creates a new tile.
- **Drag** tiles to change their order – or use **Move earlier**/**Move later** in the tile menu (**…**).
- Choose the **size** in the tile menu: Small (a quarter), Medium (half), Large (two thirds) or Full width. On phones all tiles stack.
- **Configure …** changes source, title and values; **Remove** deletes the tile.

Tiles of different heights leave no gaps: the first row follows the order from left to right, then each tile moves up into the column with the least above it. Wide tiles sit under the lowest point of the columns they cover. Edit mode shows the same arrangement.

**Done** leaves edit mode. Every change is saved right away.

## Permissions

- People with edit rights on the page add and change tiles; readers only look at the dashboard.
- Every tile is calculated with the rights of the person looking: private records only count for those who may see them. A tile over a database or journal someone may not read (or that is locked with a PIN) shows that person only **Not available** – no title, no values.
- Sources must be in the same workspace.

## Dashboard or home page?

The [home page](/first-steps#customize-your-home-page) is built from widgets too, and some look alike – tasks, journal, a database view. The difference is whose page it is:

| | Dashboard | Home page |
| --- | --- | --- |
| **What it is** | A page in a space, with a title, a place in the page tree, a link and the trash | Your personal start, under **Home** in the sidebar |
| **Who sees it** | Everyone who may read the page – each with the values they may see | Only you; owners can set a default for members |
| **Who arranges it** | Everyone with edit rights on the page | You, per workspace or for all your workspaces |
| **Contents** | Database views, metrics with target, charts, journal streak, due tasks, recently changed, text | Greeting, tasks, agenda, journal, database view, pinned page, habits, focus & time, scratchpad, my activity, due flashcards and more |
| **Export, duplicate, API** | Yes (see below) | No – the layout is a setting |

Use a dashboard for figures a team looks at together – a project's progress, a sales pipeline, open tickets by status – and the home page for your own day. A dashboard you open often can be added to the home page as a **Pinned page** or to the [favourites](/pages-and-spaces).

## Copying, export and trash

- **Duplicate** copies the dashboard with all tiles; when a database is copied along, the tile in the copy points to the copy.
- The Markdown export contains a text overview of the tiles (title, type, source, texts), and so do PDF, Word and EPUB. The values themselves depend on who is looking and are therefore not exported.
- Deleted dashboards go to the trash like any page and come back with all their tiles.
- Through the [API](/api-and-webhooks), the `dashboard.save` action stores the tiles of a dashboard page.
