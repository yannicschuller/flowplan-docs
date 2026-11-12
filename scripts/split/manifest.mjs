// The restructuring of the documentation in November 2026 ("wave 1"): the
// long pages were split into pages with one topic each. This file says where
// every section of the old pages went; scripts/split/split-docs.ts applies it
// to the pages as they were at BASE and writes the new pages, the anchor map
// (content/anchor-map.json) and the completeness fixture
// (tests/fixtures/pre-split.json).
//
// A page is one of
//   { slug, kw }                               an old page, kept as it was
//   { slug, hub: true, kw, title?, lead? }     an old page that keeps its intro
//                                              and every section not taken by
//                                              another page
//   { slug, title, lead, sections, kw }        a new page made of sections
//   { slug, page, lead?, kw }                  a new page made of one old
//                                              section: its heading becomes the
//                                              title, its subsections the
//                                              sections
// Sections are named "old-slug#German heading"; a level-3 heading moves on
// its own and becomes a level-2 heading. The English page has the same
// structure, so the same position is taken there.
// kw: keywords in German and English (front matter "keywords"), for the
// search.

export const BASE = "5761cd5";

const p = (slug, rest) => ({ slug, ...rest });

export const PAGES = [
  // ------------------------------------------------------------ Getting started
  p("first-steps", { kw: ["Start, Einstieg, Konto, Oberfläche, Startseite, Hilfe", "start, getting started, account, interface, home page, help"] }),
  p("pages-and-spaces", {
    hub: true,
    kw: ["Seitenbaum, Seitenleiste, Bereich, Papierkorb, Favoriten, verschieben, Geteilte Ansicht", "page tree, sidebar, space, trash, favorites, move, split view"],
  }),
  p("page-tags", {
    title: ["Tags, Eigenschaften und Aliasse", "Tags, properties and aliases"],
    lead: [
      "Tags und Eigenschaften ordnen jede Seite quer zu Bereichen und Seitenbaum; Aliasse geben ihr weitere Namen, ein Besitzer und ein Prüfdatum halten sie aktuell.",
      "Tags and properties organise every page across spaces and the page tree; aliases give it more names, an owner and a review date keep it current.",
    ],
    sections: ["pages-and-spaces#Besitzer und Prüfdatum", "pages-and-spaces#Aliasse", "pages-and-spaces#Tags und Eigenschaften"],
    kw: ["Tags, Schlagwörter, Etiketten, Eigenschaften, Alias, Prüfdatum, Besitzer, Wiki", "tags, labels, properties, alias, review date, owner, verification, wiki"],
  }),
  p("workspaces-and-permissions", {
    hub: true,
    title: ["Mitglieder, Rollen und Rechte", "Members, roles and permissions"],
    kw: ["Team einladen, Mitglieder, Rollen, Gäste, Gruppen, Rechte, Arbeitsbereich", "invite team, members, roles, guests, groups, permissions, workspace"],
  }),
  p("workspace-appearance", {
    title: ["Arbeitsbereich gestalten", "Customizing a workspace"],
    lead: [
      "Name, Symbol, Farben und Schrift eines Arbeitsbereichs, automatische Links für wiederkehrende Begriffe und eigene Druckvorlagen – eingestellt von den Eigentümern.",
      "A workspace's name, icon, colours and font, automatic links for recurring terms and your own print templates – set by its owners.",
    ],
    sections: ["workspaces-and-permissions#Erscheinungsbild", "workspaces-and-permissions#Automatische Links", "workspaces-and-permissions#Druckvorlagen"],
    kw: ["Erscheinungsbild, Logo, Farben, Schrift, Branding, automatische Links, Druckvorlage", "appearance, logo, colours, font, branding, automatic links, print template"],
  }),
  p("encrypted-spaces", { kw: ["Ende-zu-Ende, E2E, Verschlüsselung, Passwort, privat", "end-to-end, e2e, encryption, password, private"] }),
  p("keyboard-shortcuts", { kw: ["Tastatur, Kürzel, Hotkeys, Cmd, Strg", "keyboard, shortcuts, hotkeys, cmd, ctrl"] }),
  p("languages", { kw: ["Sprache, Übersetzung, Deutsch, Englisch, Französisch, Chinesisch", "language, translation, German, English, French, Chinese"] }),

  // ------------------------------------------------------------ Moving over
  p("migrate", {
    hub: true,
    title: ["Umzug zu Flowplan", "Moving to Flowplan"],
    kw: ["Umzug, Import, Notion, AppFlowy, wechseln, Migration", "move, import, Notion, AppFlowy, switch, migration"],
  }),
  p("migrate-affine", {
    page: "migrate#Von AFFiNE",
    lead: [
      "Aus AFFiNE kommen Dokumente, Datenbanken und Whiteboards samt Bildern und Anhängen nach Flowplan – über den Export des Arbeitsbereichs.",
      "Documents, databases and whiteboards come over from AFFiNE with their images and attachments – through the workspace export.",
    ],
    kw: ["AFFiNE, Import, Umzug, Snapshot, Whiteboard", "AFFiNE, import, move, snapshot, whiteboard"] }),
  p("migrate-office", {
    title: ["Von Confluence, Evernote, Google Docs und Word", "From Confluence, Evernote, Google Docs and Word"],
    lead: [
      "Schritt für Schritt aus Confluence, Evernote, Google Docs, Microsoft Word und OneNote nach Flowplan – mit Seitenbaum, Bildern und Anhängen.",
      "Step by step from Confluence, Evernote, Google Docs, Microsoft Word and OneNote to Flowplan – with the page tree, images and attachments.",
    ],
    sections: ["migrate#Von Confluence", "migrate#Von Evernote", "migrate#Von Google Docs", "migrate#Von Microsoft Word"],
    kw: ["Confluence, Evernote, ENEX, Google Docs, Takeout, Word, docx, OneNote, Import", "Confluence, Evernote, ENEX, Google Docs, Takeout, Word, docx, OneNote, import"],
  }),
  p("migrate-notes", {
    title: ["Von Obsidian und GoodNotes", "From Obsidian and GoodNotes"],
    lead: [
      "Markdown-Ordner wie ein Obsidian-Tresor werden zu Seiten oder Datenbanken, handschriftliche Notizbücher aus GoodNotes zu Flowplan-Notizbüchern.",
      "Markdown folders such as an Obsidian vault become pages or databases, handwritten notebooks from GoodNotes become Flowplan notebooks.",
    ],
    sections: ["migrate#Von Obsidian und anderen Markdown-Ordnern", "migrate#Von GoodNotes"],
    kw: ["Obsidian, Tresor, Vault, Markdown, Logseq, GoodNotes, Handschrift, Import", "Obsidian, vault, markdown, Logseq, GoodNotes, handwriting, import"],
  }),
  p("import-export-versions", {
    hub: true,
    title: ["Import, Inhaltsarchiv und Versionen", "Import, content archive and versions"],
    kw: ["Import, CSV, Markdown, Frontmatter, ZIP, Versionsverlauf, wiederherstellen", "import, csv, markdown, front matter, zip, version history, restore"],
  }),
  p("export", {
    page: "import-export-versions#Exportieren",
    lead: [
      "Seiten, Datenbanken und ganze Bereiche als Markdown, HTML, Word, PDF oder E-Book exportieren – und als Text für Jira und Confluence.",
      "Export pages, databases and whole spaces as Markdown, HTML, Word, PDF or e-book – and as text for Jira and Confluence.",
    ],
    kw: ["Export, Markdown, HTML, Word, docx, E-Book, EPUB, Jira, Confluence", "export, markdown, html, word, docx, e-book, epub, jira, confluence"] }),
  p("print-and-pdf", {
    title: ["Drucken und PDF", "Printing and PDF"],
    lead: [
      "Seiten drucken oder als PDF sichern – mit Druckoptionen, Vorlagen und Seitenumbrüchen dort, wo du sie haben willst.",
      "Print pages or save them as PDF – with print options, presets and page breaks where you want them.",
    ],
    sections: ["import-export-versions#Drucken und PDF", "documents#Seitenumbruch"],
    kw: ["Drucken, PDF, Seitenumbruch, Druckvorlage, Querformat", "print, pdf, page break, print preset, landscape"],
  }),

  // ------------------------------------------------------------ Documents
  p("documents", {
    hub: true,
    title: ["Dokumente und Editor", "Documents and the editor"],
    kw: ["Editor, Blöcke, Blockmenü, Slash, Markdown, schreiben, Absatz", "editor, blocks, block menu, slash command, markdown, write, paragraph"],
  }),
  p("formatting", {
    title: ["Formatieren, Hinweise und Beschriftungen", "Formatting, callouts and captions"],
    lead: [
      "Text formatieren, Hinweise in fünf Arten und mit eigenem Symbol, Bilder und Tabellen beschriften und nummerieren.",
      "Format text, use callouts in five kinds and with your own icon, caption and number images and tables.",
    ],
    sections: ["documents#Text formatieren", "documents#Hinweise", "documents#Beschriftungen"],
    kw: ["fett, kursiv, Farbe, Markieren, Spoiler, Hinweis, Callout, Beschriftung, Abbildung", "bold, italic, colour, highlight, spoiler, callout, admonition, caption, figure"],
  }),
  p("tasks-in-documents", {
    title: ["Aufgaben in Dokumenten", "Tasks in documents"],
    lead: [
      "Aufgaben mitten im Text: abhaken, einer Person zuweisen, mit Fälligkeitsdatum versehen und mit fünf Status wie in Obsidian.",
      "Tasks right in the text: tick them off, assign them to a person, give them a due date and one of five statuses as in Obsidian.",
    ],
    sections: ["documents#Aufgaben mit Person und Datum", "documents#Status einer Aufgabe"],
    kw: ["Aufgabe, To-do, Checkliste, abhaken, zuweisen, fällig, Meine Aufgaben", "task, to-do, todo, checklist, check off, assign, due date, my tasks"],
  }),
  p("media-and-files", {
    title: ["Bilder, Dateien und Sprachnotizen", "Images, files and voice notes"],
    lead: [
      "Bilder, Dateien, PDFs und Einbettungen in Dokumenten – hochladen, anmerken, wieder löschen – und Sprachnotizen, die Flowplan auf Wunsch abschreibt.",
      "Images, files, PDFs and embeds in documents – upload, annotate, delete again – and voice notes that Flowplan can transcribe.",
    ],
    sections: ["documents#Bilder, Dateien und Einbettungen", "documents#Sprachnotizen und Besprechungen"],
    kw: ["Bild, Datei, Anhang, Upload, PDF, Einbettung, YouTube, Medien, Sprachnotiz, Transkription", "image, file, attachment, upload, pdf, embed, youtube, media, voice note, transcription"],
  }),
  p("math-and-code", {
    title: ["Formeln, Diagramme, Code und Rechnen", "Math, diagrams, code and calculations"],
    lead: [
      "LaTeX-Formeln, Mermaid-Diagramme und Codeblöcke mit Hervorhebung, Rechnen direkt im Text und Kennzahlen aus Datenbanken.",
      "LaTeX formulas, Mermaid diagrams and code blocks with highlighting, calculating right in the text and figures from databases.",
    ],
    sections: ["documents#Formeln, Diagramme und Code", "documents#Rechnen im Text", "documents#Dashboards und Kennzahlen"],
    kw: ["LaTeX, Formel, Mathe, Mermaid, Diagramm, Code, Syntax, Rechner, Kennzahl", "latex, formula, math, mermaid, diagram, code, syntax highlighting, calculator, metric"],
  }),
  p("links-and-mentions", {
    title: ["Links, Erwähnungen und Graph", "Links, mentions and the graph"],
    lead: [
      "Seiten, Einträge und Personen mit @ verlinken, auf einzelne Blöcke zeigen und im Graph sehen, wie alles zusammenhängt.",
      "Link pages, records and people with @, point at single blocks and see in the graph how everything connects.",
    ],
    sections: ["documents#Seitenlinks und Erwähnungen", "documents#Links auf Blöcke", "pages-and-spaces#Graph der Verlinkungen", "pages-and-spaces#Nicht verlinkte Erwähnungen"],
    kw: ["Link, Erwähnung, @, Backlinks, Wikilink, Blocklink, Graph, Verlinkt von", "link, mention, @, backlinks, wikilink, block link, graph, linked from"],
  }),
  p("academic-writing", {
    title: ["Fußnoten, Zitate und Literatur", "Footnotes, citations and bibliography"],
    lead: [
      "Für Haus-, Abschluss- und Forschungsarbeiten: Fußnoten, Quellen im Text zitieren und ein Literaturverzeichnis, das sich selbst schreibt.",
      "For papers and theses: footnotes, citing sources in the text and a bibliography that writes itself.",
    ],
    sections: ["documents#Fußnoten", "documents#Zitate und Literaturverzeichnis"],
    kw: ["Fußnote, Zitat, Literaturverzeichnis, BibTeX, Zotero, DOI, Quelle, Abschlussarbeit", "footnote, citation, bibliography, bibtex, zotero, doi, source, thesis"],
  }),
  p("reading-and-presenting", {
    title: ["Lesen, Präsentieren und Überblick", "Reading, presenting and overview"],
    lead: [
      "Inhaltsverzeichnis, einklappbare Abschnitte, Lese- und Fokusmodus, Autoren anzeigen – und ein Dokument als Folien präsentieren.",
      "Table of contents, collapsible sections, reading and focus mode, showing authors – and presenting a document as slides.",
    ],
    sections: [
      "documents#Inhaltsverzeichnis",
      "documents#Abschnitte einklappen",
      "documents#Lesemodus",
      "documents#Fokusmodus",
      "documents#Präsentieren",
      "documents#Autoren anzeigen",
    ],
    kw: ["Inhaltsverzeichnis, einklappen, Lesemodus, Fokusmodus, Präsentation, Folien, Autoren", "table of contents, collapse, reading mode, focus mode, presentation, slides, authors"],
  }),

  // ------------------------------------------------------------ Whiteboards, notebooks, journal
  p("whiteboards", { hub: true, kw: ["Whiteboard, Canvas, Zettel, Formen, Stift, zeichnen, Miro", "whiteboard, canvas, sticky notes, shapes, pen, draw, miro"] }),
  p("whiteboard-diagrams", {
    title: ["Diagramme, Mindmaps und Prototypen", "Diagrams, mind maps and prototypes"],
    lead: [
      "Auf dem Whiteboard: Mindmaps per Tab, Formenbibliotheken für Flussdiagramme und Netzwerke, Mermaid, PlantUML, Excalidraw und draw.io, Wireframes und Roadmaps.",
      "On the whiteboard: mind maps with Tab, shape libraries for flowcharts and networks, Mermaid, PlantUML, Excalidraw and draw.io, wireframes and roadmaps.",
    ],
    sections: [
      "whiteboards#Mindmaps",
      "whiteboards#Diagramme: Formenbibliotheken",
      "whiteboards#Automatisch anordnen",
      "whiteboards#Mermaid und PlantUML importieren",
      "whiteboards#Excalidraw und draw.io importieren",
      "whiteboards#Wireframes und klickbare Prototypen",
      "whiteboards#Zeitleisten (Roadmaps)",
    ],
    kw: ["Mindmap, Flussdiagramm, UML, BPMN, Mermaid, PlantUML, Excalidraw, draw.io, Wireframe, Roadmap", "mind map, flowchart, uml, bpmn, mermaid, plantuml, excalidraw, draw.io, wireframe, roadmap"],
  }),
  p("whiteboard-collaboration", {
    title: ["Whiteboards: gemeinsam, mit KI und präsentieren", "Whiteboards: together, with AI and presenting"],
    lead: [
      "Live mit anderen auf einem Board, Zettel als Datenbankeinträge, KI für Ideen und Gruppen, Rahmen als Folien präsentieren und mit Vorlagen starten.",
      "Live on one board with others, sticky notes as database records, AI for ideas and clusters, presenting frames as slides and starting from templates.",
    ],
    sections: [
      "whiteboards#Gemeinsam arbeiten",
      "whiteboards#Zettel als Datenbankeinträge",
      "whiteboards#KI auf dem Whiteboard",
      "whiteboards#Rahmen-Übersicht",
      "whiteboards#Präsentieren",
      "whiteboards#Vorlagen",
    ],
    kw: ["Brainstorming, Live-Cursor, Abstimmung, Timer, Retro, Präsentation, Rahmen, Vorlage", "brainstorming, live cursors, voting, timer, retro, presentation, frames, template"],
  }),
  p("whiteboard-racks", { page: "whiteboards#Racks und Verkabelung", kw: ["Rack, Server, Rechenzentrum, Verkabelung, Ports, Switch, Patchpanel, HE", "rack, server, data centre, cabling, ports, switch, patch panel, rack unit"] }),
  p("notebooks", { kw: ["Notizbuch, Handschrift, Apple Pencil, Stift, GoodNotes, Papier", "notebook, handwriting, apple pencil, stylus, goodnotes, paper"] }),
  p("journal", { kw: ["Tagebuch, Daily Note, Tagesnotiz, Tracker, Gewohnheiten, Rückblick", "diary, daily note, tracker, habits, review"] }),
  p("dashboards", { kw: ["Dashboard, Kennzahlen, Widgets, Übersicht, KPI", "dashboard, metrics, widgets, overview, kpi"] }),

  // ------------------------------------------------------------ Databases
  p("databases", { hub: true, kw: ["Datenbank, Tabelle, Einträge, Notion-Datenbank, Airtable, wiederkehrend, Erinnerung", "database, table, records, rows, airtable, recurring, reminder"] }),
  p("database-properties", {
    title: ["Eigenschaften von Datenbanken", "Database properties"],
    lead: [
      "Die Eigenschaftstypen einer Datenbank im Überblick, formatierter Text in Feldern und Mehrfachauswahlen mit den Tags des Arbeitsbereichs.",
      "A database's property types at a glance, formatted text in fields and multi-selects with the workspace's tags.",
    ],
    sections: ["databases#Eigenschaften"],
    kw: ["Eigenschaft, Feld, Spalte, Typ, Auswahl, Mehrfachauswahl, Rich Text", "property, field, column, type, select, multi-select, rich text"],
  }),
  p("views", { kw: ["Ansicht, Kanban, Board, Kalender, Timeline, Gantt, Galerie, Liste", "view, kanban, board, calendar, timeline, gantt, gallery, list"] }),
  p("properties-and-formulas", { kw: ["Formel, Rollup, Relation, Verknüpfung, Berechnung", "formula, rollup, relation, link, calculation"] }),
  p("forms", { kw: ["Formular, Umfrage, Fragebogen, Typeform, Google Forms, öffentlich", "form, survey, questionnaire, typeform, google forms, public"] }),
  p("contacts", { kw: ["Kontakte, CRM, Adressbuch, vCard, CardDAV, LDAP", "contacts, crm, address book, vcard, carddav, ldap"] }),

  // ------------------------------------------------------------ Projects and automation
  p("projects-and-tickets", { hub: true, kw: ["Projekt, Ticket, Sprint, Scrum, Jira, Epic, Zeiterfassung, Automation", "project, ticket, sprint, scrum, jira, epic, time tracking, automation"] }),
  p("git-and-issues", {
    title: ["Git und Issues", "Git and issues"],
    lead: [
      "Datenbanken mit GitHub, GitLab und Forgejo verbinden: Branches, Commits und Pull Requests am Eintrag, Issues in beide Richtungen synchronisiert.",
      "Connect databases to GitHub, GitLab and Forgejo: branches, commits and pull requests on the record, issues synced both ways.",
    ],
    sections: ["projects-and-tickets#Git-Anbindung", "projects-and-tickets#GitHub-, GitLab- und Forgejo-Issues synchronisieren"],
    kw: ["GitHub, GitLab, Forgejo, Gitea, Issues, Pull Request, Commit, Branch", "github, gitlab, forgejo, gitea, issues, pull request, commit, branch"],
  }),
  p("workflows", { kw: ["Workflow, Automatisierung, Zapier, n8n, Auslöser, Canvas", "workflow, automation, zapier, n8n, trigger, canvas"] }),
  p("workflow-nodes", { kw: ["Knoten, Auslöser, Aktion, Bedingung, Schleife, HTTP", "nodes, trigger, action, condition, loop, http"] }),
  p("templates", { kw: ["Vorlage, Template, Tagesvorlage, Platzhalter", "template, daily template, placeholder"] }),
  p("marketplace", { kw: ["Marketplace, Vorlagen teilen, Community, veröffentlichen", "marketplace, share templates, community, publish"] }),

  // ------------------------------------------------------------ Collaboration and search
  p("collaboration", { kw: ["Kommentare, gemeinsam, Live, Echtzeit, Erwähnung, Vorschläge", "comments, together, live, real time, mention, suggestions"] }),
  p("sharing", { kw: ["Teilen, veröffentlichen, Link, öffentlich, Website, Gäste", "share, publish, link, public, website, guests"] }),
  p("search-and-notifications", {
    hub: true,
    title: ["Schnellsuche und Sammlungen", "Quick search and collections"],
    kw: ["Suche, Schnellsuche, Cmd K, Filter, Sammlung, gespeicherte Suche, Befehle", "search, quick search, cmd k, filter, collection, saved search, commands"],
  }),
  p("notifications", {
    title: ["Posteingang und Benachrichtigungen", "Inbox and notifications"],
    lead: [
      "Was im Posteingang landet und wie du davon erfährst: per E-Mail, als Push auf Telefon und Desktop oder in Telegram, Gotify, ntfy und Matrix.",
      "What lands in the inbox and how you hear about it: by e-mail, as a push on phone and desktop or in Telegram, Gotify, ntfy and Matrix.",
    ],
    sections: ["search-and-notifications#Posteingang", "search-and-notifications#E-Mail", "search-and-notifications#Push-Benachrichtigungen", "search-and-notifications#Chat-Apps"],
    kw: ["Posteingang, Inbox, Benachrichtigung, Push, E-Mail, Telegram, ntfy, Matrix, Gotify", "inbox, notification, push, e-mail, telegram, ntfy, matrix, gotify"],
  }),

  // ------------------------------------------------------------ Apps and devices
  p("offline-and-apps", {
    hub: true,
    title: ["Offline und Web-App", "Offline and web app"],
    kw: ["offline, ohne Internet, PWA, installieren, Web-App, dunkler Modus", "offline, no internet, pwa, install, web app, dark mode"],
  }),
  p("desktop-app", { page: "offline-and-apps#Desktop-App für macOS, Windows und Linux", kw: ["Desktop, Mac, macOS, Windows, Linux, App, Profile, Fenster", "desktop, mac, macos, windows, linux, app, profiles, window"] }),
  p("mobile-apps", {
    page: "offline-and-apps#Apps für iPhone, iPad und Android",
    lead: [
      "Die Apps für iPhone, iPad und Android: installieren und aktualisieren, mit der eigenen Instanz verbinden, mehrere Instanzen als Profile.",
      "The apps for iPhone, iPad and Android: install and update them, connect them to your own instance, several instances as profiles.",
    ],
    kw: ["iPhone, iPad, Android, App, APK, App Store, mobil, Telefon, Handy", "iphone, ipad, android, app, apk, app store, mobile, phone"],
  }),
  p("mobile-widgets", {
    title: ["Widgets und Mitteilungen in den Apps", "Widgets and notifications in the apps"],
    lead: [
      "Auf iPhone, iPad und Android: Widgets für den Startbildschirm, Knöpfe an Mitteilungen, Live-Aktivitäten und Fokus-Filter.",
      "On iPhone, iPad and Android: home screen widgets, buttons on notifications, Live Activities and Focus filters.",
    ],
    sections: [
      "offline-and-apps#Widgets",
      "offline-and-apps#Widgets für Administratoren",
      "offline-and-apps#Knöpfe an Mitteilungen",
      "offline-and-apps#Live-Aktivitäten und laufende Mitteilungen",
      "offline-and-apps#Fokus-Filter",
    ],
    kw: ["Widget, Startbildschirm, Sperrbildschirm, Mitteilung, Live-Aktivität, Dynamic Island, Fokus", "widget, home screen, lock screen, notification, live activity, dynamic island, focus"],
  }),
  p("mobile-capture", {
    title: ["Erfassen, Teilen und Scannen in den Apps", "Capturing, sharing and scanning in the apps"],
    lead: [
      "Notizen, Aufgaben und Sprachnotizen schnell erfassen, aus anderen Apps teilen, Dokumente scannen – und was die Apps auf iPhone und iPad zusätzlich können.",
      "Capture notes, tasks and voice notes quickly, share from other apps, scan documents – and what the apps on iPhone and iPad can do on top.",
    ],
    sections: [
      "offline-and-apps#Erfassen, Siri, Kontrollzentrum",
      "offline-and-apps#Teilen aus anderen Apps",
      "offline-and-apps#Dokumente scannen und Spotlight (iPhone und iPad)",
      "offline-and-apps#Sprachnotizen in Seiten",
      "offline-and-apps#KI auf dem Gerät und Schreibtools (iPhone und iPad)",
      "offline-and-apps#Kalender in Apple Kalender",
      "offline-and-apps#iPad: Fenster, Tastatur und Handoff",
    ],
    kw: ["erfassen, Siri, Kurzbefehle, teilen, scannen, Spotlight, iPad, Handoff, Apple Kalender", "capture, siri, shortcuts, share sheet, scan, spotlight, ipad, handoff, apple calendar"],
  }),
  p("desktop-capture", { kw: ["schnell erfassen, Tastenkürzel, global, Desktop, Notiz", "quick capture, global shortcut, desktop, note"] }),
  p("browser-extension", { kw: ["Browser, Erweiterung, Chrome, Firefox, Web-Clipper, Lesezeichen", "browser, extension, chrome, firefox, web clipper, bookmarks"] }),

  // ------------------------------------------------------------ AI
  p("ai", { hub: true, title: ["KI einrichten", "Setting up AI"], kw: ["KI, AI, Ollama, OpenAI, Anthropic, Gemini, Anbieter, einrichten, Datenschutz", "ai, ollama, openai, anthropic, gemini, provider, set up, privacy"] }),
  p("ai-writing", {
    title: ["Schreibassistent und Zusammenfassungen", "Writing assistant and summaries"],
    lead: [
      "Die KI schreibt, kürzt, übersetzt und verbessert Text an der Schreibmarke und fasst Seiten, Besprechungen und Kommentare zusammen.",
      "The AI writes, shortens, translates and improves text at the cursor and summarises pages, meetings and comments.",
    ],
    sections: ["ai#Schreibassistent", "ai#Zusammenfassungen"],
    kw: ["Schreibassistent, umschreiben, übersetzen, Zusammenfassung, ChatGPT", "writing assistant, rewrite, translate, summary, chatgpt"],
  }),
  p("ask-ai", { page: "ai#Fragen an den Arbeitsbereich", kw: ["KI fragen, Fragen, Chat, Antworten, Quellen, semantische Suche, verwandte Seiten", "ask ai, questions, chat, answers, sources, semantic search, related pages"] }),
  p("ai-actions", {
    title: ["KI-Aktionen, Datenbanken und Workflows", "AI actions, databases and workflows"],
    lead: [
      "Aus einer Antwort der KI werden Aufgaben, Einträge und Seiten; dazu KI-Eigenschaften in Datenbanken, KI auf Whiteboards und KI-Knoten in Workflows.",
      "An AI answer becomes tasks, records and pages; plus AI properties in databases, AI on whiteboards and AI nodes in workflows.",
    ],
    sections: ["ai#KI-Aktionen", "ai#KI auf Whiteboards", "ai#KI in Datenbanken", "ai#KI in Workflows"],
    kw: ["KI-Aktion, KI-Eigenschaft, automatisch ausfüllen, KI-Knoten, Agent", "ai action, ai property, autofill, ai node, agent"],
  }),
  p("meetings", { page: "ai#Besprechungen", kw: ["Besprechung, Meeting, Protokoll, Transkript, Aufnahme, Zoom, Teams", "meeting, minutes, transcript, recording, zoom, teams"] }),

  // ------------------------------------------------------------ Extending
  p("api-and-webhooks", { hub: true, kw: ["API, REST, Token, Webhook, Idempotenz, n8n, Integration", "api, rest, token, webhook, idempotency, n8n, integration"] }),
  p("openapi", { page: "api-and-webhooks#OpenAPI und SDKs", kw: ["OpenAPI, SDK, TypeScript, Python, Client, Swagger", "openapi, sdk, typescript, python, client, swagger"] }),
  p("inbound-email", { page: "api-and-webhooks#E-Mail-Eingang", kw: ["E-Mail, Mail an Flowplan, Mailgun, Postmark, IMAP, Posteingang", "e-mail, mail to flowplan, mailgun, postmark, imap, inbound"] }),
  p("chat-notifications", { page: "api-and-webhooks#Chat-Benachrichtigungen", kw: ["Slack, Microsoft Teams, Discord, Mattermost, Chat, Webhook", "slack, microsoft teams, discord, mattermost, chat, webhook"] }),
  p("mcp", { kw: ["MCP, Claude, ChatGPT, Cursor, KI-Assistent, Model Context Protocol", "mcp, claude, chatgpt, cursor, ai assistant, model context protocol"] }),
  p("plugins", { kw: ["Plugin, Erweiterung, eigener Block, iframe, Entwickler", "plugin, extension, custom block, iframe, developer"] }),

  // ------------------------------------------------------------ Installing
  p("installation", { hub: true, kw: ["Docker, Compose, installieren, Self-Hosting, Server, Update, Helm, Kubernetes", "docker, compose, install, self-hosting, server, update, helm, kubernetes"] }),
  p("one-click-deploy", { page: "installation#Mit einem Klick bereitstellen", kw: ["Render, DigitalOcean, cloud-init, VPS, Installationsskript, ein Klick", "render, digitalocean, cloud-init, vps, install script, one click"] }),
  p("coolify-and-proxy", { kw: ["Coolify, Reverse Proxy, nginx, Traefik, Caddy, HTTPS, Volume", "coolify, reverse proxy, nginx, traefik, caddy, https, volume"] }),
  p("move-instance", { hub: true, kw: ["Umzug, neuer Server, Hetzner, DNS, Instanz umziehen", "move, new server, hetzner, dns, migrate instance"] }),
  p("move-instance-tool", {
    title: ["Umzug mit dem Umzugswerkzeug", "Moving with the move tool"],
    lead: [
      "Das Umzugswerkzeug holt die neue Instanz alles von der alten – Datenbank, Dateien, Schlüssel – mit kurzer Ausfallzeit; dazu die Fehlersuche beim Umzug.",
      "The move tool has the new instance fetch everything from the old one – database, files, keys – with a short downtime; plus troubleshooting a move.",
    ],
    sections: ["move-instance#Weg A: Das Umzugswerkzeug", "move-instance#Fehlersuche"],
    kw: ["Umzugswerkzeug, Abgleich, Ausfallzeit, Fehlersuche, Umzug", "move tool, sync, downtime, troubleshooting, move"],
  }),

  // ------------------------------------------------------------ Sign-in and administration
  p("administration", { hub: true, kw: ["Administration, Admin, Instanz, Einstellungen, Demo, Wartung", "administration, admin, instance, settings, demo, maintenance"] }),
  p("user-management", {
    title: ["Benutzer verwalten", "Managing users"],
    lead: [
      "Konten anlegen, sperren, zusammenführen und löschen, Admin-Rechte vergeben und festlegen, wer sich wie anmelden darf.",
      "Create, lock, merge and delete accounts, grant admin rights and decide who may sign in and how.",
    ],
    sections: ["administration#Benutzer", "administration#Anmeldung & SSO"],
    kw: ["Benutzer, Konto, sperren, löschen, Admin, Registrierung, Einladung", "users, account, lock, delete, admin, registration, invitation"],
  }),
  p("sign-in", {
    hub: true,
    title: ["Anmeldung: Passwort, Passkeys und Zwei-Faktor", "Sign-in: password, passkeys and two-factor"],
    kw: ["Anmeldung, Login, Passwort, Passkey, 2FA, Sitzung, Passwort vergessen", "sign-in, login, password, passkey, 2fa, session, forgot password"],
  }),
  p("sessions", { page: "sign-in#Angemeldet bleiben", kw: ["Sitzung, angemeldet bleiben, abgemeldet, Ablauf, Geräte, Session", "session, stay signed in, signed out, expiry, devices, remember me"] }),
  p("sso-oidc", {
    page: "sign-in#Single Sign-on mit OIDC",
    lead: [
      "Anmeldung über den eigenen Identitätsanbieter – Keycloak, Authentik, Entra ID, Google, Okta oder jeden OpenID-Connect-Dienst –, mit Gruppen für Admins und Arbeitsbereiche.",
      "Sign in through your own identity provider – Keycloak, Authentik, Entra ID, Google, Okta or any OpenID Connect service – with groups for admins and workspaces.",
    ],
    kw: ["SSO, OIDC, Keycloak, Authentik, Entra ID, Azure AD, Google, Okta", "sso, oidc, keycloak, authentik, entra id, azure ad, google, okta"] }),
  p("scim-and-ldap", {
    title: ["Benutzer aus dem Verzeichnis: SCIM und LDAP", "Users from a directory: SCIM and LDAP"],
    lead: [
      "Konten aus dem Identitätsanbieter per SCIM anlegen und entfernen lassen oder die Anmeldung gegen ein LDAP-Verzeichnis wie Active Directory prüfen.",
      "Have the identity provider create and remove accounts via SCIM, or check sign-ins against an LDAP directory such as Active Directory.",
    ],
    sections: ["sign-in#Benutzer bereitstellen mit SCIM", "sign-in#Anmeldung mit LDAP"],
    kw: ["SCIM, LDAP, Active Directory, Okta, Entra ID, Provisionierung, Verzeichnis", "scim, ldap, active directory, okta, entra id, provisioning, directory"],
  }),

  // ------------------------------------------------------------ Configuration
  p("configuration", { hub: true, kw: ["Umgebungsvariablen, env, Konfiguration, APP_URL, Docker", "environment variables, env, configuration, app_url, docker"] }),
  p("configuration-storage", {
    title: ["Konfiguration: Speicher, Datenbank und Sicherheit", "Configuration: storage, database and security"],
    lead: [
      "Die Umgebungsvariablen für S3 und Datenbanksicherung, PostgreSQL und Cluster, Verschlüsselung, gespeicherte Geheimnisse, Instanzumzug und Rechtliches.",
      "The environment variables for S3 and database backups, PostgreSQL and cluster, encryption, stored secrets, moving an instance and legal pages.",
    ],
    sections: [
      "configuration#S3 und Datenbanksicherung",
      "configuration#Datenbank und Cluster",
      "configuration#Verschlüsselung",
      "configuration#Gespeicherte Geheimnisse",
      "configuration#Instanzumzug",
      "configuration#Rechtliches und Oberfläche",
    ],
    kw: ["S3_BUCKET, DATABASE_URL, FLOWPLAN_ENCRYPTION_KEY, Impressum, Datenschutz, Variablen", "s3_bucket, database_url, flowplan_encryption_key, imprint, privacy, variables"],
  }),
  p("configuration-integrations", {
    title: ["Konfiguration: E-Mail, Integrationen und Workflows", "Configuration: e-mail, integrations and workflows"],
    lead: [
      "Die Umgebungsvariablen für Mailversand und E-Mail-Eingang, Integrationen wie GitHub und Kalender, Chat-Apps und Workflows.",
      "The environment variables for sending mail and inbound e-mail, integrations such as GitHub and calendars, chat apps and workflows.",
    ],
    sections: [
      "configuration#E-Mail (SMTP)",
      "configuration#E-Mail-Eingang (IMAP)",
      "configuration#Integrationen",
      "configuration#Kalender-Sync",
      "configuration#Chat-Apps",
      "configuration#Workflows",
    ],
    kw: ["SMTP, IMAP, Mailserver, GitHub, Google Kalender, Outlook, Telegram, Workflows, Variablen", "smtp, imap, mail server, github, google calendar, outlook, telegram, workflows, variables"],
  }),
  p("configuration-ai-push", {
    title: ["Konfiguration: KI, Sprachnotizen und Push", "Configuration: AI, voice notes and push"],
    lead: [
      "Die Umgebungsvariablen für KI-Anbieter, die Transkription von Sprachnotizen mit Whisper und Push-Benachrichtigungen bis zum eigenen Push-Relay.",
      "The environment variables for AI providers, transcribing voice notes with Whisper and push notifications up to running your own push relay.",
    ],
    sections: ["configuration#Sprachnotizen (Whisper)", "configuration#KI", "configuration#Push-Benachrichtigungen"],
    kw: ["Whisper, Transkription, KI, OpenAI, Ollama, Push, VAPID, APNs, Push-Relay, Variablen", "whisper, transcription, ai, openai, ollama, push, vapid, apns, push relay, variables"],
  }),

  // ------------------------------------------------------------ Storage and operations
  p("storage-and-backups", { hub: true, kw: ["Speicher, S3, Sicherung, Backup, SFTP, wiederherstellen, MinIO, Garage", "storage, s3, backup, sftp, restore, minio, garage"] }),
  p("storage-encryption", {
    title: ["Verschlüsselung von Dateien und Sicherungen", "Encrypting files and backups"],
    lead: [
      "Mit einem eigenen Schlüssel verschlüsselt Flowplan alles, was den Server verlässt – Dateien im Bucket, Sicherungen und die Datenbank-Kopie –, auch für bestehende Daten.",
      "With a key of your own, Flowplan encrypts everything that leaves the server – files in the bucket, backups and the database copy – existing data too.",
    ],
    sections: ["storage-and-backups#Verschlüsselung"],
    kw: ["Verschlüsselung, FLOWPLAN_ENCRYPTION_KEY, Schlüssel wechseln, entschlüsseln, Litestream", "encryption, flowplan_encryption_key, key rotation, decrypt, litestream"],
  }),
  p("markdown-git-export", { page: "storage-and-backups#Markdown-Export und Git", kw: ["Markdown, Git, Export, Repository, GitHub, Notfall, lesbare Kopie", "markdown, git, export, repository, github, emergency, readable copy"] }),
  p("operations", { hub: true, kw: ["Betrieb, Healthcheck, Fehlersuche, Logs, Desktop-Apps, Prometheus", "operations, healthcheck, troubleshooting, logs, desktop apps, prometheus"] }),
  p("monitoring", {
    title: ["Überwachung und Wartung", "Monitoring and maintenance"],
    lead: [
      "Die Instanz live beobachten: Kennzahlen, Statistik, Warnungen per Webhook, Wartungshinweise und Prometheus.",
      "Watch the instance live: figures, statistics, alerts via webhook, maintenance notices and Prometheus.",
    ],
    sections: ["operations#Administration → Überwachung", "operations#Prometheus"],
    kw: ["Überwachung, Monitoring, Statistik, Warnung, Webhook, Prometheus, Grafana, Wartung", "monitoring, statistics, alert, webhook, prometheus, grafana, maintenance"],
  }),
  p("security-monitoring", {
    title: ["Sicherheit und Angriffserkennung", "Security and attack detection"],
    lead: [
      "Welche sicherheitsrelevanten Ereignisse Flowplan festhält, wie es Angriffe erkennt und wie du sie in Logs, OpenTelemetry, fail2ban oder CrowdSec weitergibst.",
      "Which security events Flowplan records, how it detects attacks and how to pass them on to logs, OpenTelemetry, fail2ban or CrowdSec.",
    ],
    sections: ["operations#Sicherheit"],
    kw: ["Sicherheit, Angriffe, Brute Force, fail2ban, CrowdSec, OpenTelemetry, Audit, Logs", "security, attacks, brute force, fail2ban, crowdsec, opentelemetry, audit, logs"],
  }),

  // ------------------------------------------------------------ Scaling
  p("postgresql", { kw: ["PostgreSQL, Postgres, Datenbank, DATABASE_URL", "postgresql, postgres, database, database_url"] }),
  p("database-migration", { kw: ["SQLite, PostgreSQL, wechseln, Migration, Datenbank", "sqlite, postgresql, switch, migration, database"] }),
  p("cluster", { kw: ["Cluster, mehrere Instanzen, Hochverfügbarkeit, Redis, Kubernetes, Skalierung", "cluster, several instances, high availability, redis, kubernetes, scaling"] }),
  p("sizing", { kw: ["Dimensionierung, RAM, CPU, Speicherplatz, Nutzerzahl, Hardware", "sizing, ram, cpu, disk space, number of users, hardware"] }),
];

// Later splits, made by hand on the pages as they were then (split-docs.ts
// does not apply these: it rebuilds wave 1 from BASE). Same format as
// PAGES; their old anchors are in content/anchor-map.json as well.
export const LATER = [
  // Wave 4 (November 2026): pages near the word limit.
  p("markdown-editor", {
    title: ["Markdown im Editor", "Markdown in the editor"],
    sections: ["documents#Markdown-Kürzel", "documents#Als Markdown bearbeiten", "documents#Antworten aus ChatGPT einfügen"],
    kw: ["Markdown, Kürzel, Markdown-Kürzel, Quelltext, ChatGPT, einfügen, Codeblock", "markdown, shortcuts, markdown shortcuts, source, ChatGPT, paste, code block"],
  }),
  p("notebook-tools", {
    title: ["Werkzeuge im Notizbuch", "Notebook tools"],
    // The level-3 sections under "Schreiben"; its intro stays on /notebooks.
    sections: [
      "notebooks#Tastenkürzel",
      "notebooks#Werkzeuge, Lieblingsstifte und Radierer",
      "notebooks#Formen und Lineal",
      "notebooks#Auswählen mit dem Lasso",
      "notebooks#Handschrift in Text umwandeln",
      "notebooks#Bilder, Sticker und eigene Papiervorlagen",
      "notebooks#Audio aufnehmen",
    ],
    kw: ["Notizbuch, Stift, Radierer, Lasso, Lineal, Sticker, Tastenkürzel, Audio", "notebook, pen, eraser, lasso, ruler, stickers, keyboard shortcuts, audio"],
  }),
  p("journal-review", {
    title: ["Überblick und Rückblick im Journal", "Overview and review in the journal"],
    sections: ["journal#Überblick auf der Journalseite", "journal#Rückblick"],
    kw: ["Journal, Rückblick, Wochenrückblick, Monatszusammenfassung, Serie, Heatmap, Statistik", "journal, review, weekly review, monthly summary, streak, heatmap, statistics"],
  }),
];
