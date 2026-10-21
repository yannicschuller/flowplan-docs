# Properties, formulas and rollups

Relations connect databases, rollups calculate across linked records, formulas calculate values from the properties of the same record.

## Edit properties

A click on the column header or **View and properties** opens the property dialog: name, type, options and format. Changing the type keeps existing values as far as they fit. Number formats cover currencies, percent, decimal places and thousands separators and also apply to formulas with a numeric result; date fields show short, long or ISO dates and optionally times; **Remove date** below the field clears it again.

## Property visibility

Single properties such as "Salary" or "Internal note" can be limited to certain people. In the property dialog, the **Visibility** section sets who may **read** the property and who may **edit** it:

| Choice | Read | Edit |
| --- | --- | --- |
| **Everyone with access** (default for reading) | Everyone who may read the database | – |
| **Editors and owners** (default for editing) | Edit and owner roles | Edit and owner roles |
| **Owners only** | Owners of the database | Owners of the database |
| **Selected groups** | Members of these [groups](/workspaces-and-permissions#groups) | Members of these groups with edit rights |

- Only **owners of the database** change the visibility; they always see and edit everything themselves.
- Restricted properties show a **lock** in the column header. Whoever may not read a property does not get the column at all; cells someone may only read are read-only and say on hover who may edit them ("Editable only by …").
- The rules only narrow page and record permissions: whoever may only view the database does not edit a property for "selected groups" either.
- Everyone with access always sees the **title property** (the first one).
- The server enforces the rules everywhere: in the database itself, in linked views, dashboards, whiteboard cards, exports (Markdown, CSV, JSON, Word, EPUB, print), versions, through the API and the [MCP server](/mcp), for the [AI](/ai) and in calendar subscriptions. It refuses changes to properties someone may not edit – in the record, through bulk editing, import, API, AI or CalDAV – with a message.
- Restricted properties are never **public**: publications, links with their own permissions, forms, the customer portal and webhooks leave them out, even when a link allows editing.
- **Full-text search** and the AI's semantic search do not index restricted properties, for anyone.
- **Formulas, rollups, AI properties, progress and time** that read a hidden property count as hidden for that person as well – their result would otherwise give the value away. A formula with a computed `prop()` name depends on every property. A rollup is hidden when the person may not read the property in the target database.
- Whoever does not see a property can neither lose nor delete it when changing the schema. Versions of a database with restricted properties are restored by owners only, and records with hidden properties cannot be turned into a page or moved to another database (copying leaves the hidden values out).

Filters and sorting of a view that use a hidden property work on empty values for that person; the condition itself (such as the value compared with) stays stored in the view.

## Relations

1. **Add property → Relation** and choose the target database.
2. Optionally **in both directions**: the target database gets a counterpart property, and changes are kept in sync on both sides.
3. In the cell, search for records and link them; several links can be removed one by one or cleared together.

Relations appear as links in the record. The database search also finds records by the names of linked records, and relation filters offer these names directly.

## Rollups

1. Create a relation first.
2. **Add property → Rollup**, then choose the relation and a property of the target database.
3. Choose a calculation – 22 are available, depending on the type: original values, unique values, count, empty/not empty (also as a percentage), sum, average, median, minimum, maximum, range, checked/unchecked, earliest and latest date, date range.

Number rollups appear as a number, progress bar, progress ring or rating, with an adjustable target value. Values from databases someone may not read are not loaded for that person.

## AI properties

When [AI](/ai) is switched on, a property can take its value from an instruction to the AI – such as a summary or a category from other properties. Everything about it under [AI in databases](/ai#ai-in-databases).

## Formulas

Choose the type **Formula** in the property dialog. The editor offers 58 functions with search, categories, signatures and examples, suggestions while you type and a live preview on a record of your choice.

```
round(prop("Effort") * prop("Hourly rate"), 2)
```

```
if(prop("Done"), "✓", concat(format(dateBetween(prop("Due"), today(), "days")), " days"))
```

- References with `prop("Name")` stay valid when the property is renamed.
- Syntax errors show their position and prevent saving.
- Numeric results are available in filters, sorting, charts and column calculations.
- Date functions calculate in UTC unless a zone is given; `now()` and `today()` update every minute.
- Formulas do not run JavaScript; length, nesting and result size are limited.

### Function groups

| Group | Examples |
| --- | --- |
| Logic | `if`, `ifs`, `coalesce`, `and`, `or`, `not`, `empty` |
| Numbers | `sum`, `average`, `min`, `max`, `round`, `ceil`, `floor`, `abs`, `mod`, `pow`, `sqrt` |
| Text | `concat`, `length`, `contains`, `replace`, `replaceAll`, `trim`, `slice`, `lower`, `upper`, `format`, `toNumber` |
| Date | `now`, `today`, `parseDate`, `formatDate`, `dateAdd`, `dateSubtract`, `dateBetween`, `year`, `month`, `day`, `hour`, `timestamp` |
| Lists | `list`, `count`, `at`, `first`, `last`, `join`, `split`, `unique`, `sort`, `reverse` |

The formula editor shows the complete list.
