---
keywords: dashboard, metrics, widgets, overview, kpi
---

# Dashboards

A page made of tiles: metrics, charts and views of your databases, tasks due, your journal streak and notes – at a glance, and for everyone with exactly the data they may see.

## Creating a dashboard

**New page → Dashboard** (or `> New dashboard` in the quick search). A new dashboard is empty; **Add the first tile** opens the settings of the first tile.

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

## Copying, export and trash

- **Duplicate** copies the dashboard with all tiles; when a database is copied along, the tile in the copy points to the copy.
- The Markdown export contains a text overview of the tiles (title, type, source, texts), and so do PDF, Word and EPUB. The values themselves depend on who is looking and are therefore not exported.
- Deleted dashboards go to the trash like any page and come back with all their tiles.
- Through the [API](/api-and-webhooks), the `dashboard.save` action stores the tiles of a dashboard page.
