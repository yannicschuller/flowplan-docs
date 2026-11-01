# Templates

Templates are saved pages – documents, databases or whole page trees – from which new pages are created. On top of that there are record templates within a database.

## Starter templates

**Templates** in the sidebar shows {{facts.templates}} built-in templates in {{facts.templateCategories|word}} categories, each with example records and fitting views:

| Category | Templates |
| --- | --- |
| Projects | Project planning, product roadmap, sprint board, project brief |
| Meetings | Meeting notes, meeting note, 1:1 conversation, retrospective, meeting minutes |
| Knowledge & documentation | Team wiki, how-to guide, decision log, FAQ |
| Planning & goals | OKRs, quarterly planning, content calendar, budget planning |
| Personal | To-do list, reading list, habit tracker, travel planning |
| Other | Contacts & customers, job applications, inventory, event planning |

A click asks for a title and space and creates the page. Dates in the examples are set relative to today.

## Your own templates

1. On a page, choose **Page actions → Save as template**.
2. Choose a name, category and visibility:
   - **Only me**,
   - **Workspace**: all members of this workspace,
   - **All workspaces** of the instance,
   - **Public gallery** (administrators only): visible even without an account.

Templates store their own copies of the files and stay usable even if the source page is deleted. The page's [tags and property values](/pages-and-spaces#tags-and-properties) come along too; new pages from the template get them (missing tags are created). Database templates contain views, records with their content, record templates and the form design. Templates can be renamed, made private or shared and moved to the trash.

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
