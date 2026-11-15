---
keywords: Begriffe, Glossar, Umzug, Notion, AFFiNE, Obsidian, Evernote, Confluence, Google Docs, Word, Entsprechung
---

# Begriffe beim Umzug

Was du aus Notion, AFFiNE, Obsidian, Evernote, Confluence oder Google Docs kennst – und wie es in Flowplan heißt.

Dieselbe Übersicht zeigt die [Einführung](/settings#die-einfuehrung) im Schritt **So heißt das hier**, nachdem du unter **Woher kommst du?** ein Werkzeug gewählt hast. **Gleich** heißt: dieselbe Idee unter diesem Namen; **ähnlich**: nah dran, mit dem Unterschied im Hinweis; **keine Entsprechung**: Flowplan hat nichts Vergleichbares – der Hinweis sagt, was du stattdessen nimmst. Wie du die Inhalte herüberholst, steht unter [Umzug zu Flowplan](/migrate).

## Was überall gleich bleibt {since=0.9.7}

- „/“ in einer leeren Zeile öffnet alle Blöcke – wie gewohnt.
- „@“ erwähnt Seiten, Einträge, Personen und Daten; „[[“ verlinkt eine Seite.
- Markdown-Kürzel wie #, - und [] funktionieren beim Tippen; „>“ macht einen aufklappbaren Block (oder ein Zitat, einstellbar).

## Notion {since=0.9.7}

So ziehst du um: [Notion](/migrate#von-notion).

| In Notion | Flowplan | Passt | Hinweis |
| --- | --- | --- | --- |
| Workspace | Arbeitsbereich | gleich |  |
| Teamspace | Bereich | gleich | Bereiche sind für ein Team oder privat. |
| Page | Seite | gleich | Seiten lassen sich beliebig tief verschachteln. |
| Database | Datenbank | gleich | Tabelle, Board, Kalender, Galerie, Liste, Zeitleiste, Formular, Diagramm und Feed als Ansichten. |
| Linked view of database | Verknüpfte Datenbank | gleich |  |
| Relation / Rollup | Relation / Rollup | gleich | Relationen zwischen Datenbanken desselben Imports werden verbunden. Rollups kommen aus dem Export nur als Werte (Text); über die Notion-API werden sie zu Rollups, wo Flowplan die Berechnung kennt. |
| Formula | Formel | gleich | Der Export bringt nur die Ergebnisse (als Text); die Formel legst du neu an. Über die Notion-API werden Formeln übernommen, die Flowplan lesen kann. |
| Synced block | Synchronisierter Block | gleich |  |
| Toggle / toggle heading | Aufklappbarer Block | gleich |  |
| Callout | Callout | gleich |  |
| Database templates | Vorlagen | gleich | Einen Eintrag als Vorlage speichern, mit Platzhaltern wie `{{Heute}}`. |
| Database automations | Automationen | gleich |  |
| Buttons | Workflow-Knopf | ähnlich | Ein Knopf im Dokument startet einen Workflow. |
| Sub-items | Unteraufgaben | gleich |  |
| Inbox / Updates | Posteingang | gleich |  |
| Page history | Versionen | gleich |  |
| Publish / Sites | Im Web veröffentlichen | ähnlich | Seiten einzeln veröffentlichen, mit oder ohne Unterseiten; keine eigenen Websites mit Navigation. |
| Notion Calendar / Mail | – | keine Entsprechung | Keine eigenen Apps dafür – Datenbanken haben eine Kalenderansicht und lassen sich als Kalender abonnieren. |

## AFFiNE {since=0.9.7}

So ziehst du um: [AFFiNE](/migrate-affine).

| In AFFiNE | Flowplan | Passt | Hinweis |
| --- | --- | --- | --- |
| Workspace | Arbeitsbereich | gleich |  |
| Doc / Page mode | Seite | gleich |  |
| Edgeless mode | Whiteboard | ähnlich | In Flowplan ist ein Whiteboard eine eigene Seite, kein zweiter Modus desselben Dokuments; der Import macht daraus Whiteboards. |
| Frame (Edgeless) | Rahmen | gleich | Auch für Präsentationen. |
| Collections | Sammlungen | ähnlich | Sammlungen sind gespeicherte Suchen in der Seitenleiste; der Import legt AFFiNE-Sammlungen als Seiten mit Links an. |
| Folders (Organize) | Unterseiten | ähnlich | Ordner werden zu Seiten, unter denen ihre Dokumente liegen. |
| Journals | Journal | gleich |  |
| Database block | Datenbank | gleich |  |
| Doc properties | Eigenschaften | gleich |  |
| Tags | Tags | gleich |  |
| Linked doc | Seitenlink (@ oder [[) | gleich |  |
| Templates | Vorlagen | gleich |  |
| Favorites | Favoriten | gleich |  |
| Trash | Papierkorb | gleich |  |

## Obsidian {since=0.9.7}

So ziehst du um: [Obsidian](/migrate-notes#von-obsidian-und-anderen-markdown-ordnern).

| In Obsidian | Flowplan | Passt | Hinweis |
| --- | --- | --- | --- |
| Vault | Bereich | ähnlich | Ein Tresor wird ein Seitenbaum in einem Bereich; mehrere Tresore passen in einen Arbeitsbereich. |
| Note | Seite | gleich |  |
| Folder | Unterseiten | ähnlich | Ein Ordner wird eine Seite mit seinen Notizen als Unterseiten. |
| `[[Wikilinks]]` | Seitenlink ([[ oder @) | gleich | Links folgen Umbenennungen. |
| Backlinks | Verlinkt von | gleich |  |
| Graph view | Graph | gleich |  |
| Daily notes | Journal | gleich |  |
| Canvas | Whiteboard | ähnlich | Canvas-Dateien werden nicht übernommen; ein Whiteboard ist eine eigene Seite. |
| Callouts (`> [!note]`) | Callout | gleich |  |
| Properties (frontmatter) | Eigenschaften | gleich |  |
| `#tags` | Tags | gleich |  |
| Embeds (`![[…]]`) | Synchronisierter Block | ähnlich | Eingebettete Bilder und Dateien bleiben; eine Notiz in eine andere einbetten geht mit einem synchronisierten Block. |
| Community plugins | Erweiterungen | ähnlich | Obsidian-Plugins laufen nicht in Flowplan; Erweiterungen gibt es im Marketplace. |
| Local files | – | keine Entsprechung | Flowplan speichert auf dem Server, nicht als Markdown-Dateien; Export als Markdown jederzeit möglich, offline auf Wunsch. |

## Evernote {since=0.9.7}

So ziehst du um: [Evernote](/migrate-office#von-evernote).

| In Evernote | Flowplan | Passt | Hinweis |
| --- | --- | --- | --- |
| Notebook | Seite | ähnlich | Ein Notizbuch wird eine Seite mit seinen Notizen als Unterseiten. |
| Stack | Bereich | ähnlich | Gruppiere Notizbücher in einem Bereich oder unter einer Seite. |
| Note | Seite | gleich |  |
| Tags | Tags | gleich |  |
| Shortcuts | Favoriten | gleich |  |
| Tasks | Aufgabenliste | gleich | Aufgabenlisten in Seiten; was dir zugewiesen ist, sammelt „Meine Aufgaben“. |
| Reminders | Erinnerung | ähnlich | Erinnerungen hängen an Daten und Fälligkeiten. |
| Web Clipper | Web-Clipper | gleich |  |
| Spaces | Bereich | gleich |  |
| Search in images and PDFs | Suchen | gleich | Die Volltextsuche findet auch Text in PDFs und Bildern. |

## Confluence {since=0.9.7}

So ziehst du um: [Confluence](/migrate-office#von-confluence).

| In Confluence | Flowplan | Passt | Hinweis |
| --- | --- | --- | --- |
| Space | Bereich | gleich |  |
| Page / page tree | Seite | gleich |  |
| Blog post | – | keine Entsprechung | Keine eigene Blog-Art – nimm eine Datenbank mit Datum und Feed-Ansicht. |
| Info / note / warning panel | Callout | gleich |  |
| Expand macro | Aufklappbarer Block | gleich |  |
| Macros | Blöcke (/) | ähnlich | Info-, Code- und Aufklapp-Makros werden zu Blöcken; was andere Makros zeigen, kommt als normaler Inhalt oder fehlt. |
| Labels | Tags | gleich |  |
| Page restrictions | Rechte (Teilen) | gleich |  |
| Page history | Versionen | gleich |  |
| Inline comments | Kommentare | gleich |  |
| Whiteboards | Whiteboard | gleich |  |
| Jira issue macro | – | keine Entsprechung | Kein Jira-Makro; Jira-Vorgänge lassen sich als CSV in eine Datenbank importieren. |

## Google Docs / Word {since=0.9.7}

So ziehst du um: [Google Docs / Word](/migrate-office#von-google-docs).

| In Google Docs / Word | Flowplan | Passt | Hinweis |
| --- | --- | --- | --- |
| Document | Seite | gleich |  |
| Folder (Drive) | Unterseiten | ähnlich | Ordner werden zu Seiten mit den Dokumenten darunter. |
| Suggesting / Track changes | Als Änderungsvorschlag einfügen | gleich |  |
| Comments | Kommentare | gleich |  |
| Version history | Versionen | gleich |  |
| Footnotes | Fußnote | gleich |  |
| Smart chips (@) | @-Erwähnungen | gleich |  |
| Page setup / print layout | Drucken / PDF | ähnlich | Seiten fließen am Bildschirm; Papierformat, Seitenzahlen und Seitenumbrüche gibt es beim Drucken. |
| Google Sheets / Excel | Datenbank | ähnlich | Eine Datenbank hat Eigenschaften je Spalte und Formeln je Eintrag, aber keine freien Zellformeln. |
| Google Forms | Formular | gleich |  |
