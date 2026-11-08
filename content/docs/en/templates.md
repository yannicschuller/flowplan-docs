# Templates

Templates are saved pages – documents, databases or whole page trees – from which new pages are created. On top of that there are record templates within a database.

## Starter templates

**Templates** in the sidebar – or **From a template** in the **New page** dialog – shows {{facts.templates}} built-in templates in {{facts.templateCategories|word}} categories, each with example records and fitting views:

| Category | Templates |
| --- | --- |
| Projects | Project planning, product roadmap, sprint board, project brief |
| Meetings | Meeting notes, meeting note, 1:1 conversation, retrospective, meeting minutes |
| Knowledge & documentation | Team wiki, how-to guide, diagram page, decision log, FAQ |
| Planning & goals | OKRs, quarterly planning, content calendar, budget planning |
| Personal | To-do list, reading list, habit tracker, travel planning |
| Other | Contacts & customers, job applications, inventory, event planning |

A click asks for a title and space and creates the page. Dates in the examples are set relative to today.

The **Diagram page** is a full-width page with one empty [draw.io diagram](/documents#formulas-diagrams-and-code); draw.io opens as soon as the page is created (if the instance uses draw.io).

As soon as there are [templates of your own](#your-own-templates), the category **My templates** comes right after **All**: it shows only the saved templates – your personal ones ("Only me"), the workspace's and those for all workspaces – without the built-in ones.

If you open the gallery from the **New page** dialog, the page goes where you were creating it – in the chosen space and under the chosen page – with your own templates too. Closing the gallery takes you back to the dialog.

## Your own templates

1. On a page, choose **Page actions → Save as template**.
2. Choose a name, category and visibility:
   - **Only me**,
   - **Workspace**: all members of this workspace,
   - **All workspaces** of the instance,
   - **Public gallery** (administrators only): visible even without an account.

### Templates of a space or of the whole workspace

Like [tags and properties](/pages-and-spaces#scope-workspace-or-space), your own template belongs **to a space** or **to the whole workspace**. When saving, **Only in this space** (the page's space) is preset; **In the whole workspace** is saved by owners only (private templates by anyone). What existed before this distinction applies to the whole workspace.

- **The gallery** first shows the templates of the space the new page is created in, and those of the workspace; **All spaces** also shows those of other spaces. A label names the space or “Workspace”. A space's templates are seen only by those who may open it.
- **Templates for the whole workspace** use only tags and properties of the whole workspace. If the page carries tags or properties of its space, Flowplan names them; **Save** then takes them out of the template (or make them workspace-wide first).
- **Using a template from another space:** if it brings tags or properties of its space, a step asks for each: **map** (to one of the same name or another tag, or a property of the same type, in the target space), **copy** (into the target space, the default without one of the same name) or **remove**.
- **Copy** makes a copy of the template for another space (or the workspace) – with the same step; copied tags and properties are created in the target space right away. **Edit → Applies** moves the template itself there.

Templates store their own copies of the files and stay usable even if the source page is deleted. The page's [tags and property values](/pages-and-spaces#tags-and-properties) come along too; new pages from the template get them (missing tags are created). Database templates contain views, records with their content, record templates and the form design. Templates can be renamed, made private or shared and moved to the trash. In the **Template trash**, **Restore** brings a template back, **Delete permanently** deletes it with its files, and **Empty template trash** deletes all you may manage (your own; as an owner all of the workspace; templates for all workspaces only admins). Pages already created are kept. After the [trash period](/pages-and-spaces#trash) (30 days by default) templates in the trash are deleted automatically.

## Record templates

In a database, **Record templates** opens the templates for records: property values and content are applied to every new record. One template can be the default, so that **New** uses it automatically.

A template is made from a record: write the content, then **Save as template**. To change a template, choose **Edit** next to it in **Record templates** – a draft opens as a record; save it with **Save as template** and, under **Save as**, **Replace “…”**. The template keeps its role as default template and in automations. You can delete the draft record afterwards.

### Placeholders

Text in double curly braces is replaced with the record's values when the template is applied – in the title, headings, text, tables and callouts, and in text properties of the template. Example: *“Kickoff {{Company}} on {{Meeting}}”*.

- **`{{Property}}`** – the value of a property of the database. Upper and lower case don't matter.
- **`{{Title}}`**, **`{{Today}}`** (also `{{Date}}`), **`{{Now}}`**, **`{{Creator}}`**, **`{{Me}}`** (whoever applies the template) and **`{{Database}}`** are built in. The German names (`{{Titel}}`, `{{Heute}}`, `{{Datum}}`, `{{Jetzt}}`, `{{Ersteller}}`, `{{Ich}}`, `{{Datenbank}}`) work too. If a property has the same name (say “Date”), the property wins.
- The **{ }** icon next to a record's **Content** (**Insert placeholder**) inserts placeholders at the cursor and lists all properties of the database.

Values appear as in the table: dates in your language and in the property's date format, multi-select joined by commas, relations as the titles of the linked records, people by name, checkboxes as ✓ or ✗. Empty properties give empty text; unknown placeholders stay as written. Values are always inserted as plain text, never as formatting or HTML. Properties only certain people may see stay empty – the text is visible to everyone who sees the record.

Renaming properties is fine: templates remember the property, not just its name. In the draft of a template the placeholders stay as written.

### Apply a template to an existing record

In the **…** menu of an open record, or by right-clicking a row, choose **Apply template …**, then the template and what happens to the existing content:

- **Apply only if the content is empty** – if the record already has text, Flowplan says so and changes nothing.
- **Append below** – the template's text goes below the existing text.

Existing text is never overwritten and filled properties stay; only empty properties get the template's values. The previous content is kept as a version, and **Undo** in the notice brings it back. This needs edit rights on the record; the database's workflow rules apply as well. To do this automatically, use an [automation](/projects-and-tickets#automations).

## Public template gallery

Under `/templates`, the built-in templates and all templates with the visibility **Public gallery** are available even without an account, filtered by category, each with a preview. **Use in my workspace** takes the template over after signing in. Only administrators can add their own templates to the gallery.

## Whiteboard templates

On a whiteboard, **Templates** inserts a retrospective, a kanban board, a mind map, a SWOT analysis or a flowchart at the current spot.

## Workflow templates

A new workflow page offers six templates – from “Link sub-pages on the overview” to “Webhook → record”. A short assistant asks for the gaps (page, database, property, person …) and creates the draft. See [Workflows](/workflows#how-a-workflow-starts).
