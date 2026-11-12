---
keywords: Export, Markdown, HTML, Word, docx, E-Book, EPUB, Jira, Confluence
---

# Exportieren

Seiten, Datenbanken und ganze Bereiche als Markdown, HTML, Word, PDF oder E-Book exportieren – und als Text für Jira und Confluence.

**Seitenaktionen → Exportieren**:

| Format | Inhalt |
| --- | --- |
| **Markdown (.md)** | Eine Datei mit dem Seiteninhalt; Datenbanken mit Übersicht, Eigenschaften und den Dokumenten aller Einträge. |
| **Markdown mit Dateien (.zip)** | `index.md`, Unterseiten unter `pages/`, die Tage eines Journals in seinem Ordner unter `2026/10/2026-10-27.md` (siehe unten), Eintragsdokumente unter `records/`, Datenbanken zusätzlich als CSV unter `tables/`, Anhänge unter `assets/` – alles relativ verlinkt. Jeder Eintrag unter `records/` beginnt mit seinen Eigenschaften als YAML-Frontmatter (siehe unten). Mit **Kommentare und frühere Versionen einschließen** kommen `<Datei>.comments.md` und `<Datei>.versions/` dazu. |
| **Als Word (DOCX)** | Ein Word-Dokument der Seite – siehe [Word, PDF mit Unterseiten und E-Book](#word-pdf-mit-unterseiten-und-e-book). |
| **Als PDF (mit Unterseiten)** | Die Seite mit ihren Unterseiten als ein Dokument mit Deckblatt und Inhaltsverzeichnis, das der Druckdialog als PDF sichert. |
| **Als E-Book (EPUB)** | Die Seite mit ihren Unterseiten als E-Book für Lesegeräte und E-Book-Apps. |
| **Jira (Wiki-Markup)** | Die Seite als Jira-Wiki-Markup zum Einfügen in Beschreibungen und Kommentare – siehe [Jira und Confluence](#jira-und-confluence). |
| **Confluence (Speicherformat)** | Die Seite im Speicherformat von Confluence (XHTML) – siehe [Jira und Confluence](#jira-und-confluence). |
| **HTML / JSON** | Das ältere Format für Dokumente und Datenbanken. |

**In die Zwischenablage statt als Datei.** Bei den Textformaten – Markdown (.md), Jira, Confluence und HTML / JSON – wählst du unter **Ziel** zwischen **Datei** und **Zwischenablage**. Mit **Zwischenablage** heißt der Knopf **Kopieren**: Der Text landet direkt in der Zwischenablage, eine Meldung bestätigt es, und du fügst ihn in eine Mail, einen Chat, ein Jira-Ticket oder einen Editor ein. HTML kommt dabei zugleich als formatierter Text mit, sodass Mailprogramme und Textverarbeitungen Überschriften, Listen und Tabellen übernehmen; ein Code-Editor bekommt den HTML-Quelltext. Bilder und Anhänge kommen nicht mit – sie bleiben Links auf Flowplan mit vollständiger Adresse und öffnen sich nur für Personen mit Zugang. Flowplan merkt sich deine Wahl auf diesem Gerät. Dateiformate (Markdown mit Dateien, Word, PDF, E-Book) gibt es nur als Datei. Das funktioniert im Browser, in der Desktop-App und in den Apps für iPhone, iPad und Android.

**Drucken / PDF** öffnet die Druckansicht des Browsers; dort als PDF sichern. Vorher fragt ein kleines Fenster nach den [Druckoptionen](/print-and-pdf#drucken-und-pdf). Apps auf dem Home-Bildschirm von iPhone und iPad können nicht selbst drucken: Sie öffnen die Seite 15 Minuten lang unter einer geheimen Adresse in Safari. Diese Druckansicht zeigt nur Inhalt – keine Formularfelder, Knöpfe oder Skripte – und oben, wer sie erstellt hat.

Der Export berücksichtigt Leserechte und enthält alle Einträge unabhängig von Ansichtsfiltern. Formeln und Mermaid bleiben als Quelltext erhalten.

**Beschriftungen in Markdown**: Die [Beschriftung](/formatting#beschriftungen) eines Bildes wird zu seinem Titel, die einer Tabelle zu einer Zeile `Table: …` darunter (wie in Pandoc), die eines Codeblocks zu `Listing: …`:

    ![Alternativtext](<assets/logo.png> "Das Flowplan-Logo")

    | Posten | Betrag |
    | --- | --- |
    | Server | 40 € |

    Table: Kosten im Überblick

    ```ts
    const x = 1;
    ```

    Listing: Ein Beispiel

Der Markdown-Import (auch ZIP, Git und **Als Markdown bearbeiten**) liest das wieder als Beschriftungen ein, ebenso Pandocs Kurzform `: …` unter einer Tabelle. Der Titel eines Bildes aus anderen Quellen (`![Alt](bild.png "Titel")`) wird dabei zur Beschriftung. Ein gewöhnlicher Absatz, der zufällig mit `Table:` oder `Listing:` direkt unter einer Tabelle oder einem Codeblock ohne Beschriftung steht, wird beim Export als `Table\:` geschrieben und bleibt so ein Absatz. Nummeriert die Seite ihre Beschriftungen, steht das im Frontmatter (`flowplan: captions: numbered`); die Nummern selbst stehen nicht im Text, damit sie beim Import nicht Teil der Beschriftung werden.

**Whiteboards** kommen im ZIP als SVG-Bild unter `assets/` mit: Eine Whiteboard-Seite zeigt ihr Bild, ein in ein Dokument eingebettetes Whiteboard wird zum Bild mit einem Link zum Board in Flowplan. Das Bild ist zugeschnitten wie **Als SVG exportieren** im Board, Bilder auf dem Board liegen daneben unter `assets/`. Verdeckte Elemente bleiben verdeckt, Kommentar-Pins sind nicht enthalten; ein leeres Board ergibt einen kurzen Hinweis statt eines Bildes. Weil SVG Text ist, zeigt Git Änderungen an einem Board als lesbaren Diff. Bearbeitbar ist das Board außerhalb von Flowplan nicht.

**Journaltage** liegen im ZIP sortierbar im Ordner ihres Journals: `2026/10/2026-10-27.md` neben der `index.md` eines exportierten Journals, bei einem Journal unter einer anderen Seite unter `pages/<Titel>-<Kennung>/2026/10/…`. Die Überschrift ist der Titel des Tages in der Sprache des Exports („Dienstag, 27. Oktober 2026“; ein umbenannter Tag behält seinen Titel), das Frontmatter nennt Kennung und Datum (`flowplan: id, date`). Das gilt für Seiten- und Bereichs-Export, den geplanten Export und Git. Der ZIP-Import macht daraus wieder ein Journal mit seinen Tagen, ohne Ordnerseiten „2026“ oder „10“; eine zweite Datei desselben Datums wird kein zweiter Tag.

**Blocklinks im Markdown-Export.** Links auf Blöcke werden im ZIP zu relativen Links mit Anker, wie Obsidian sie schreibt: `[Projekt › Ziele](<../index.md#^k3x9a2b1>)`. Der verlinkte Block trägt dazu seine Kennung als Markierung: ein Absatz, eine Überschrift oder ein Listenpunkt am Zeilenende (`Unsere Ziele für 2027 ^k3x9a2b1`), jeder andere Block (Tabelle, Code, Zitat, Liste …) in einer eigenen Zeile direkt darunter (`^k3x9a2b1`). Markiert werden nur Blöcke, auf die ein Link im Arbeitsbereich zeigt – der Rest des Markdowns bleibt sauber. Obsidian versteht beides als Blockverweis; andere Markdown-Programme zeigen die kurze Markierung als Text. Beim Import (ZIP, Obsidian-Tresor, [Git-Export](/markdown-git-export#in-ein-git-repository-uebertragen) mit Übernahme der Änderungen, **Als Markdown bearbeiten**) wird die Markierung wieder zur Kennung des Blocks, und die Links zeigen wieder auf ihn. Außerhalb eines ZIP (einzelne Markdown-Datei, MCP) bleibt der Link die Adresse in Flowplan mit `&block=…`.

Grenzen je Export: 500 Seiten, 200.000 Einträge, 250 MB Inhalt (davon höchstens 200 MB Text); das ZIP darf höchstens 100 MB groß sein. Die Grenzen gelten auch für den [geplanten Markdown-Export](/markdown-git-export), der ganze Datenbanken samt Kommentaren und Versionen sichert.

## Word, PDF mit Unterseiten und E-Book

Drei weitere Formate für Handbücher, Berichte und alles, was außerhalb von Flowplan gelesen oder weiterbearbeitet wird. Alle drei gehen vom selben bereinigten Seiteninhalt aus wie der Markdown-Export und berücksichtigen Leserechte genauso: Enthalten ist nur, was du lesen darfst – private Einträge, Journale mit PIN und Bilder aus Seiten, die du nicht öffnen darfst, bleiben draußen (statt eines Bildes steht dann ein Hinweis, ein Link auf eine unzugängliche Seite wird zu Text).

**Als Word (DOCX)** – **Seitenaktionen → Exportieren → Als Word (DOCX)**, bei einer Datenbank auch über **Exportieren** in der Werkzeugleiste, bei einem einzelnen Eintrag über das **…**-Menü im Kopf des Eintrags. Die Datei kommt ohne Word-Bibliothek direkt aus Flowplan und öffnet sich in Word, LibreOffice und Pages:

- Überschriften (als Word-Überschriftenstile, also mit Navigationsbereich), Absätze mit Ausrichtung, **fett**, *kursiv*, unterstrichen, durchgestrichen, Code, Markierungen, Textfarbe, Hoch- und Tiefstellung, Links.
- Aufzählungen und nummerierte Listen auch verschachtelt, Aufgaben mit ☐/☑ und Fälligkeitsdatum.
- Tabellen mit verbundenen Zellen und hervorgehobener Kopfzeile.
- Bilder (PNG, JPEG, GIF, WebP) eingebettet und auf die Textbreite verkleinert; das Titelbild der Seite oben.
- [Beschriftungen](/formatting#beschriftungen) von Bildern, Tabellen und Code im Word-Stil „Beschriftung“ unter dem Block; nummeriert die Seite ihre Beschriftungen, sind die Nummern Word-Felder (SEQ), sodass ein Abbildungsverzeichnis in Word sie aufnimmt.
- Hinweise (Notiz, Tipp, Wichtig, Warnung, Achtung) als farbig hinterlegte Absätze, Zitate mit Randlinie, Code-Blöcke, Formeln und Mermaid-Diagramme in Schreibmaschinenschrift, aufklappbare Abschnitte mit ihrem Titel, Spalten nacheinander.
- Fußnoten als echte Word-Fußnoten, Zitate und das Literaturverzeichnis als Text.
- Eine Datenbank wird zur Tabelle aller Einträge, gefolgt vom Dokument jedes Eintrags; ein einzelner Eintrag beginnt mit seinen Eigenschaften als Tabelle.
- Nicht enthalten: Whiteboards, eingebettete Videos, Audios, PDFs, Linkkarten und verknüpfte Datenbanken (sie bleiben Links auf Flowplan), Funktionsgraphen und Kennzahlen (ein Hinweis), Kommentare und Versionen.

**Als PDF (mit Unterseiten)** – **Seitenaktionen → Exportieren → Als PDF (mit Unterseiten)**: Die Seite mit allen zugänglichen Unterseiten (abwählbar) wird zu einer Druckansicht mit Deckblatt, Inhaltsverzeichnis und jeder Seite als nummeriertem Kapitel auf einer neuen Seite; Links zwischen den Seiten springen innerhalb des Dokuments. Wie bei **Drucken / PDF** öffnet sich der Druckdialog des Browsers – dort **als PDF sichern**. Apps auf dem Home-Bildschirm von iPhone und iPad öffnen die Ansicht wie gewohnt in Safari. Whiteboards kommen als Bild mit, Datenbanken als Tabelle mit den Dokumenten der Einträge. Vor dem Druckdialog lassen sich Titelseite, Inhaltsverzeichnis, Titelbilder, Seitenzahlen, Papierformat, Schriften und Links wählen ([Druckoptionen](/print-and-pdf#drucken-und-pdf)). Seitenzahlen in der Fußzeile setzen Chrome und Edge; die Seitenzahlen im Inhaltsverzeichnis zeigen nur Renderer, die `target-counter` kennen (Prince, Paged.js). Für Skripte: `GET /api/export/pdf?page=<id>&children=1` liefert das HTML der Druckansicht.

**Als E-Book (EPUB)** – **Seitenaktionen → Exportieren → Als E-Book (EPUB)**: Die Seite mit ihren Unterseiten als EPUB 3 – jede Seite ein Kapitel, das Inhaltsverzeichnis verschachtelt wie der Seitenbaum, Bilder und Whiteboards als Ressourcen, Links zwischen den Seiten innerhalb des Buchs, Fußnoten am Kapitelende. Geeignet für Apple Books, Kindle (nach Umwandlung), Calibre, Thorium und andere Reader. Für Skripte: `GET /api/export/epub?page=<id>&children=1`.

Grenzen: 200 Seiten je PDF- oder EPUB-Export, 5.000 Datensätze, 100 MB Anhänge (Dateien über 25 MB werden ausgelassen). Datenbanktabellen mit mehr als 200 Spalten lassen sich nicht nach Word exportieren.

## Jira und Confluence

Zwei Textformate für Teams, die mit Atlassian-Werkzeugen arbeiten. Beide exportieren **nur die geöffnete Seite** (oder einen einzelnen Eintrag), ohne Unterseiten – wie **Markdown (.md)**. Sie berücksichtigen Leserechte wie die anderen Exporte: Bilder aus Seiten, die du nicht öffnen darfst, werden zu einem Hinweis, Links auf unzugängliche Seiten zu Text. Links und Bilder behalten ihre vollständige Adresse in Flowplan; Jira und Confluence zeigen Bilder aus Flowplan nur, wenn der Browser dort angemeldet ist.

**Jira (Wiki-Markup)** – zum Einfügen in Beschreibungen und Kommentare von Jira Server/Data Center (und in Felder von Jira Cloud, die Wiki-Markup annehmen):

- Überschriften als `h1.` bis `h6.`, `*fett*`, `_kursiv_`, `-durchgestrichen-`, `+unterstrichen+`, `{{Code}}`, Hoch- und Tiefstellung, Textfarbe, Links als `[Text|Adresse]`.
- Aufzählungen und nummerierte Listen mit `*` und `#`, auch verschachtelt (`*#`); Aufgaben als `* [ ]` und `* [x]` (abgesagte durchgestrichen).
- Tabellen mit `||Kopf||` und `|Zelle|`; verbundene Zellen werden zu leeren Zellen.
- Code-Blöcke als `{code:sprache}`, ohne Sprache als `{noformat}`; Formeln als `{noformat}`, Mermaid als `{code}`.
- Zitate als `{quote}`, Hinweise als `{info}` (Notiz, Wichtig), `{tip}`, `{note}` (Warnung) und `{warning}` (Achtung), aufklappbare Abschnitte und Besprechungen als `{panel}`, Trennlinien als `----`.
- Bilder als `!Adresse!`, Erwähnungen als Name, Fußnoten als hochgestellte Nummern mit einer Liste am Ende.
- Zeichen, die in Jira Formatierung auslösen (`* _ { } [ ] | ! ^ ~ +`, Striche am Wortrand, `??`, `(y)` …), werden maskiert und erscheinen so, wie du sie geschrieben hast.

**Confluence (Speicherformat)** – das XHTML, in dem Confluence seine Seiten speichert: für den Quelltext-Editor, die REST-API (`representation: storage`) oder Werkzeuge, die nach Confluence veröffentlichen. Code-Blöcke werden zum Code-Makro mit Sprache, Hinweise zu den Makros Info, Tipp, Notiz und Warnung, aufklappbare Abschnitte zu „Erweitern“ (expand), Besprechungen zu Panels, Aufgaben zu Confluence-Aufgabenlisten (mit Fälligkeitsdatum), Bilder zu `<ac:image>` mit ihrer Adresse in Flowplan. Tabellen, Listen, Links, Zitate und Fußnoten bleiben gewöhnliches XHTML.

Als Datei heißen die Exporte `<Titel>.jira.txt` und `<Titel>.confluence.xhtml`. Für Skripte: `GET /api/export/jira?page=<id>` bzw. `GET /api/export/confluence?page=<id>`, mit `&row=<id>` für einen einzelnen Eintrag einer Datenbank; persönliche API-Tokens mit Lesezugriff genügen.

## Einen ganzen Bereich exportieren

Das Download-Symbol neben dem Namen eines Bereichs in der Seitenleiste (oder **Einstellungen → Import & Export → Export → Einen Bereich**) öffnet den Export des Bereichs. Neben dem Markdown-ZIP stehen dort **Bereich als PDF** (eine Druckansicht aller Seiten des Bereichs mit Deckblatt und Inhaltsverzeichnis, siehe oben) und **Bereich als E-Book (EPUB)** zur Wahl – jeweils mit allem, was du lesen darfst, bis 200 Seiten (`GET /api/export/pdf?space=<id>` bzw. `/api/export/epub?space=<id>`). Das Markdown-ZIP lädt den ganzen Bereich als **ein** Archiv herunter – zum Archivieren, offline Lesen oder für ein eigenes Git-Repository:

- Jede Seite der obersten Ebene liegt mit allem, was darunter hängt, in einem eigenen Ordner `<Titel>-<Kennung>/` – derselbe Aufbau wie beim [geplanten Markdown-Export](/markdown-git-export). Darin gilt das Format von **Markdown mit Dateien (.zip)**.
- `index.md` oben listet die Seiten des Bereichs; Links zwischen Seiten des Bereichs sind relativ, Links in andere Bereiche zeigen weiter auf Flowplan.
- Exportieren darf jede Person, die den Bereich lesen kann, ohne Administrator. Enthalten ist nur, was sie lesen darf: private Einträge und Journale mit PIN anderer bleiben draußen, private Bereiche anderer lassen sich nicht exportieren.
- **Kommentare und frühere Versionen einschließen** wie beim Seitenexport; es gelten dieselben Grenzen, für den ganzen Bereich.
- Für Skripte mit einem Lese-Token: `{"spaceId":"…","format":"zip","history":true}` an `/api/markdown-export` (siehe [API-Tokens](/api-and-webhooks)). Die Kennung des Bereichs steht im Export-Dialog.
- Regelmäßig in ein Git-Repository, ohne eigenes Skript: der [Git-Export eines Bereichs](/markdown-git-export#git-export-eines-bereichs), den die Eigentümerin oder der Eigentümer des Bereichs einrichtet.
