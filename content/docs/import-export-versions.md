# Import, Export und Versionen

Inhalte kommen als Markdown, CSV oder Archiv herein und gehen als Markdown, PDF oder vollständiges Archiv wieder hinaus. Der Versionsverlauf holt frühere Stände zurück.

## Exportieren

**Seitenaktionen → Exportieren**:

| Format | Inhalt |
| --- | --- |
| **Markdown (.md)** | Eine Datei mit dem Seiteninhalt; Datenbanken mit Übersicht, Eigenschaften und den Dokumenten aller Einträge. |
| **Markdown mit Dateien (.zip)** | `index.md`, Unterseiten unter `pages/`, Eintragsdokumente unter `records/`, Datenbanken zusätzlich als CSV unter `tables/`, Anhänge unter `assets/` – alles relativ verlinkt. Jeder Eintrag unter `records/` beginnt mit seinen Eigenschaften als YAML-Frontmatter (siehe unten). Mit **Kommentare und frühere Versionen einschließen** kommen `<Datei>.comments.md` und `<Datei>.versions/` dazu. |
| **Als Word (DOCX)** | Ein Word-Dokument der Seite – siehe [Word, PDF mit Unterseiten und E-Book](#word-pdf-mit-unterseiten-und-e-book). |
| **Als PDF (mit Unterseiten)** | Die Seite mit ihren Unterseiten als ein Dokument mit Deckblatt und Inhaltsverzeichnis, das der Druckdialog als PDF sichert. |
| **Als E-Book (EPUB)** | Die Seite mit ihren Unterseiten als E-Book für Lesegeräte und E-Book-Apps. |
| **HTML / JSON** | Das ältere Format für Dokumente und Datenbanken. |

**Drucken / PDF** öffnet die Druckansicht des Browsers; dort als PDF sichern. Apps auf dem Home-Bildschirm von iPhone und iPad können nicht selbst drucken: Sie öffnen die Seite 15 Minuten lang unter einer geheimen Adresse in Safari. Diese Druckansicht zeigt nur Inhalt – keine Formularfelder, Knöpfe oder Skripte – und oben, wer sie erstellt hat.

Der Export berücksichtigt Leserechte und enthält alle Einträge unabhängig von Ansichtsfiltern. Formeln und Mermaid bleiben als Quelltext erhalten.

**Whiteboards** kommen im ZIP als SVG-Bild unter `assets/` mit: Eine Whiteboard-Seite zeigt ihr Bild, ein in ein Dokument eingebettetes Whiteboard wird zum Bild mit einem Link zum Board in Flowplan. Das Bild ist zugeschnitten wie **Als SVG exportieren** im Board, Bilder auf dem Board liegen daneben unter `assets/`. Verdeckte Elemente bleiben verdeckt, Kommentar-Pins sind nicht enthalten; ein leeres Board ergibt einen kurzen Hinweis statt eines Bildes. Weil SVG Text ist, zeigt Git Änderungen an einem Board als lesbaren Diff. Bearbeitbar ist das Board außerhalb von Flowplan nicht.

Grenzen je Export: 500 Seiten, 5.000 Einträge, 250 MB Inhalt.

### Word, PDF mit Unterseiten und E-Book

Drei weitere Formate für Handbücher, Berichte und alles, was außerhalb von Flowplan gelesen oder weiterbearbeitet wird. Alle drei gehen vom selben bereinigten Seiteninhalt aus wie der Markdown-Export und berücksichtigen Leserechte genauso: Enthalten ist nur, was du lesen darfst – private Einträge, Journale mit PIN und Bilder aus Seiten, die du nicht öffnen darfst, bleiben draußen (statt eines Bildes steht dann ein Hinweis, ein Link auf eine unzugängliche Seite wird zu Text).

**Als Word (DOCX)** – **Seitenaktionen → Exportieren → Als Word (DOCX)**, bei einer Datenbank auch über **Exportieren** in der Werkzeugleiste, bei einem einzelnen Eintrag über das **…**-Menü im Kopf des Eintrags. Die Datei kommt ohne Word-Bibliothek direkt aus Flowplan und öffnet sich in Word, LibreOffice und Pages:

- Überschriften (als Word-Überschriftenstile, also mit Navigationsbereich), Absätze mit Ausrichtung, **fett**, *kursiv*, unterstrichen, durchgestrichen, Code, Markierungen, Textfarbe, Hoch- und Tiefstellung, Links.
- Aufzählungen und nummerierte Listen auch verschachtelt, Aufgaben mit ☐/☑ und Fälligkeitsdatum.
- Tabellen mit verbundenen Zellen und hervorgehobener Kopfzeile.
- Bilder (PNG, JPEG, GIF, WebP) eingebettet und auf die Textbreite verkleinert; das Titelbild der Seite oben.
- Hinweise (Notiz, Tipp, Wichtig, Warnung, Achtung) als farbig hinterlegte Absätze, Zitate mit Randlinie, Code-Blöcke, Formeln und Mermaid-Diagramme in Schreibmaschinenschrift, aufklappbare Abschnitte mit ihrem Titel, Spalten nacheinander.
- Fußnoten als echte Word-Fußnoten, Zitate und das Literaturverzeichnis als Text.
- Eine Datenbank wird zur Tabelle aller Einträge, gefolgt vom Dokument jedes Eintrags; ein einzelner Eintrag beginnt mit seinen Eigenschaften als Tabelle.
- Nicht enthalten: Whiteboards, eingebettete Videos, Audios, PDFs, Linkkarten und verknüpfte Datenbanken (sie bleiben Links auf Flowplan), Funktionsgraphen und Kennzahlen (ein Hinweis), Kommentare und Versionen.

**Als PDF (mit Unterseiten)** – **Seitenaktionen → Exportieren → Als PDF (mit Unterseiten)**: Die Seite mit allen zugänglichen Unterseiten (abwählbar) wird zu einer Druckansicht mit Deckblatt, Inhaltsverzeichnis und jeder Seite als nummeriertem Kapitel auf einer neuen Seite; Links zwischen den Seiten springen innerhalb des Dokuments. Wie bei **Drucken / PDF** öffnet sich der Druckdialog des Browsers – dort **als PDF sichern**. Apps auf dem Home-Bildschirm von iPhone und iPad öffnen die Ansicht wie gewohnt in Safari. Whiteboards kommen als Bild mit, Datenbanken als Tabelle mit den Dokumenten der Einträge. Seitenzahlen im Inhaltsverzeichnis und in der Fußzeile zeigen nur Renderer, die `target-counter` kennen (Prince, Paged.js); Browser lassen sie weg. Für Skripte: `GET /api/export/pdf?page=<id>&children=1` liefert das HTML der Druckansicht.

**Als E-Book (EPUB)** – **Seitenaktionen → Exportieren → Als E-Book (EPUB)**: Die Seite mit ihren Unterseiten als EPUB 3 – jede Seite ein Kapitel, das Inhaltsverzeichnis verschachtelt wie der Seitenbaum, Bilder und Whiteboards als Ressourcen, Links zwischen den Seiten innerhalb des Buchs, Fußnoten am Kapitelende. Geeignet für Apple Books, Kindle (nach Umwandlung), Calibre, Thorium und andere Reader. Für Skripte: `GET /api/export/epub?page=<id>&children=1`.

Grenzen: 200 Seiten je PDF- oder EPUB-Export, 5.000 Datensätze, 100 MB Anhänge (Dateien über 25 MB werden ausgelassen). Datenbanktabellen mit mehr als 200 Spalten lassen sich nicht nach Word exportieren.

### Einen ganzen Bereich exportieren

Das Download-Symbol neben dem Namen eines Bereichs in der Seitenleiste (oder **Einstellungen → Daten → Bereich als Markdown exportieren**) öffnet den Export des Bereichs. Neben dem Markdown-ZIP stehen dort **Bereich als PDF** (eine Druckansicht aller Seiten des Bereichs mit Deckblatt und Inhaltsverzeichnis, siehe oben) und **Bereich als E-Book (EPUB)** zur Wahl – jeweils mit allem, was du lesen darfst, bis 200 Seiten (`GET /api/export/pdf?space=<id>` bzw. `/api/export/epub?space=<id>`). Das Markdown-ZIP lädt den ganzen Bereich als **ein** Archiv herunter – zum Archivieren, offline Lesen oder für ein eigenes Git-Repository:

- Jede Seite der obersten Ebene liegt mit allem, was darunter hängt, in einem eigenen Ordner `<Titel>-<Kennung>/` – derselbe Aufbau wie beim [geplanten Markdown-Export](/storage-and-backups#markdown-export-und-git). Darin gilt das Format von **Markdown mit Dateien (.zip)**.
- `index.md` oben listet die Seiten des Bereichs; Links zwischen Seiten des Bereichs sind relativ, Links in andere Bereiche zeigen weiter auf Flowplan.
- Exportieren darf jede Person, die den Bereich lesen kann, ohne Administrator. Enthalten ist nur, was sie lesen darf: private Einträge und Journale mit PIN anderer bleiben draußen, private Bereiche anderer lassen sich nicht exportieren.
- **Kommentare und frühere Versionen einschließen** wie beim Seitenexport; es gelten dieselben Grenzen, für den ganzen Bereich.
- Für Skripte mit einem Lese-Token: `{"spaceId":"…","format":"zip","history":true}` an `/api/markdown-export` (siehe [API-Tokens](/api-and-webhooks)). Die Kennung des Bereichs steht im Export-Dialog.
- Regelmäßig in ein Git-Repository, ohne eigenes Skript: der [Git-Export eines Bereichs](/storage-and-backups#git-export-eines-bereichs), den die Eigentümerin oder der Eigentümer des Bereichs einrichtet.

### Drucken und PDF

**Seitenaktionen → Drucken** (oder `> drucken` in der Schnellsuche) druckt die Seite als sauberes Dokument auf A4 – im Druckdialog lässt sie sich auch **als PDF sichern**. Dabei verschwinden Seitenleiste, Werkzeugleisten, Griffe, Kommentarleisten und Hinweise; die Farben sind immer hell, Blöcke werden nicht mitten auf der Seite getrennt, lange Codezeilen umbrochen und externe Links mit ihrer Adresse ausgeschrieben.

## Importieren

- **Markdown, Text oder HTML**: **Einstellungen → Daten → Markdown oder Text importieren**. Überschriften, Listen, Aufgaben, Tabellen, Code (auch `mermaid`) und Formeln werden zu Blöcken.
- **Notion-, AppFlowy- oder Markdown-Export**: **Einstellungen → Daten** nimmt ein ZIP mit Markdown- und CSV-Dateien an. Markdown wird zu Seiten, CSV zu Datenbanken, Excalidraw- und draw.io-Dateien zu [Whiteboards](/whiteboards#excalidraw-und-draw-io-importieren), Ordner zu Unterseiten; verlinkte Bilder und Dateien werden hochgeladen, Datensatzseiten aus Notion den Einträgen zugeordnet. Bis 100 MB, 500 Seiten und 5.000 Einträge je Tabelle; den Zielbereich wählst du vorher.
- **Jira oder Trello**: **Einstellungen → Daten → Aus Jira oder Trello importieren** – siehe [Projekte, Tickets und Sprints](/projects-and-tickets#import-aus-jira-und-trello).
- **CSV**: in einer Datenbank **CSV oder Markdown importieren** wählen und eine CSV-Datei nehmen; die Zeilen werden zu Einträgen.
- **Markdown mit Frontmatter in eine Datenbank** (etwa Notizen aus Obsidian): in der Datenbank **CSV oder Markdown importieren** wählen und eine oder mehrere `.md`-Dateien oder ein ZIP nehmen – siehe unten.
- **Inhaltsarchiv** (siehe unten).

### Frontmatter: Einträge als Markdown-Dateien

Notizen aus Obsidian, Logseq, Jekyll oder Hugo tragen ihre Eigenschaften als YAML-Frontmatter am Anfang der Datei:

```markdown
---
para: Resource
area: House
tags: [heating, maintenance]
created: 2026-03-14
---
# Heating – maintenance
…
```

**Import in eine Datenbank:** Jede Datei wird ein Eintrag. Der Titel kommt aus `title:`, sonst aus der ersten `#`-Überschrift oder dem Dateinamen; der übrige Text wird zum Dokument des Eintrags, verlinkte Bilder und Dateien aus dem ZIP werden hochgeladen und Links zwischen den importierten Dateien zu Links auf die neuen Einträge. Schlüssel werden Eigenschaften gleichen Namens zugeordnet (Groß- und Kleinschreibung egal):

- Auswahl und Mehrfachauswahl übernehmen die Werte und legen unbekannte als neue Optionen an (`tags:` landet so in **Tags**);
- Relationen finden den verknüpften Eintrag über seinen Titel (auch als `[[Titel]]`), Personen über Name oder E-Mail;
- Datumswerte werden als ISO-Datum gelesen, `true`/`false` als Kontrollkästchen, Zahlen als Zahl;
- `aliases:` (Liste oder ein Text, durch Kommas getrennt) und `alias:` füllen zusammen die Eigenschaft vom Typ [Aliasse](/properties-and-formulas#aliasse), wie auch immer sie heißt; fehlt sie, legt **Fehlende Eigenschaften anlegen** eine an. Hat die Datenbank keine Alias-Eigenschaft, aber eine Eigenschaft namens „aliases“, landen die Werte dort wie bisher;
- berechnete Eigenschaften (Formeln, Rollups, Zeitstempel) werden nicht überschrieben.

Vor dem Import zeigt eine Vorschau, welche Eigenschaften passen und welche fehlen. **Fehlende Eigenschaften anlegen** erzeugt sie mit einem passenden Typ: Liste → Mehrfachauswahl, ISO-Datum → Datum, `true`/`false` → Kontrollkästchen, Zahl → Zahl, Adresse → URL, wenige wiederkehrende Werte → Auswahl, sonst Text. Bis 5.000 Dateien und 100 MB je Import.

**Export:** Im ZIP-Export beginnt jeder Eintrag unter `records/` mit `title:` und seinen Eigenschaften: Auswahl als Text, Mehrfachauswahl und Relationen (Titel der verknüpften Einträge) als Liste, Datum als ISO-Datum. Aliasse stehen unter dem Obsidian-Schlüssel `aliases:` als Liste, so dass sie einen Weg nach Obsidian und zurück überstehen. Berechnete Werte und die Kennung des Eintrags stehen unter `flowplan:` und werden beim Import übergangen. Wird ein so exportierter Eintrag wieder in dieselbe Datenbank importiert, bietet die Vorschau **aktualisieren statt neu anlegen** an: Der Eintrag mit derselben Kennung bekommt Eigenschaften und Text der Datei, der vorige Stand bleibt als Version erhalten. Ohne diese Wahl kommt er als neuer Eintrag hinzu.

**Seiten:** Hat eine Seite [Aliasse](/pages-and-spaces#aliasse), beginnt ihre Markdown-Datei (einzeln, im Bereichs-Export und im geplanten Export) mit einem Frontmatter, das nur `aliases:` enthält; Seiten ohne Aliasse bleiben ohne Frontmatter. Der ZIP-Import unter **Einstellungen → Daten** liest `aliases:`/`alias:` einer Notiz als Aliasse der neuen Seite; ein Frontmatter, das nur Aliasse enthält, verschwindet dabei aus dem Text, anderes Frontmatter bleibt wie bisher im Text stehen. Der Git-Export liest Aliasse geänderter Seiten ebenfalls zurück.

**Wo exportieren:** In der Leiste einer Datenbank öffnet **Exportieren** ein Menü mit **CSV (aktuelle Ansicht)**, **Markdown mit Dateien (.zip)**, **Markdown (.md)** und **Als Word (DOCX)**. Einen einzelnen Eintrag exportiert das **…**-Menü im Kopf des Eintrags: **Als Markdown exportieren (.md)** (mit Frontmatter), **Markdown mit Dateien (.zip)**, **Als Word (DOCX)** (Eigenschaften als Tabelle, dann das Dokument) oder **Drucken / PDF**.

**Aus Obsidian:** Links im Text werden als normale Markdown-Links gelesen. Wikilinks (`[[…]]`, `![[…]]`) vorher umwandeln – in Obsidian unter *Einstellungen → Dateien und Links* „[[Wikilinks]] verwenden“ ausschalten und relative Pfade wählen.

## Inhaltsarchiv

Unter **Einstellungen → Daten** lädst du ein ZIP deines Arbeitsbereichs herunter und importierst es an anderer Stelle – auch in eine andere Flowplan-Instanz.

Enthalten: zugängliche Seiten samt Papierkorb, Datenbanken mit Ansichten und Einträgen, Dokumentinhalte, Relationen, Vorlagen, Kommentare, Versionen, Favoriten und Formularoptionen, dazu alle Dateien mit Prüfsummen.

Das Archiv enthält nur, was du selbst sehen darfst: private Einträge anderer samt ihrer Kommentare und Dateien fehlen, ebenso Journale hinter einer PIN, die du gerade nicht entsperrt hast. Versionen einer Datenbank kommen nur bei Besitzern mit, weil sie alle Einträge enthalten.

- Beim Import entstehen neue IDs; interne Links und Relationen werden umgeschrieben.
- Importierte Bereiche und Vorlagen sind privat, Freigaben und Formulare nicht aktiv.
- Ein fehlerhafter Import wird vollständig zurückgerollt.
- Grenzen: 2 GB ZIP, 500 Seiten, 20.000 Dateien, 5.000 Einträge je Datenbank.

Konten, Sitzungen und Anmeldung gehören nicht dazu – die sichert der Betrieb täglich mit der gesamten Instanz.

## Versionsverlauf

**Seitenaktionen → Versionsverlauf**:

- Dokumente sichern automatisch höchstens alle fünf Minuten, Datenbanken vor der ersten Änderung nach zehn Minuten Ruhe.
- **Aktuelle Version sichern** legt jederzeit einen Stand an; manuell gesicherte Versionen bleiben dauerhaft.
- **Änderungen** vergleicht eine Version mit dem aktuellen Stand oder mit einer beliebigen anderen Version (**Vergleichen mit**): hinzugefügter und entfernter Text, bei Datenbanken neue, geänderte und entfernte Einträge und Eigenschaften.
- **Vergleich im Detail**: Der Vergleich geht Block für Block durch das Dokument – Überschriften, Absätze, Listenpunkte, Tabellenzellen, Zitate und Code bleiben als solche erkennbar – und markiert innerhalb eines geänderten Blocks die einzelnen Wörter: Hinzugefügtes grün, Entferntes rot und durchgestrichen; unveränderte Blöcke sind abgeblendet. Eine Zusammenfassung zeigt, wie viele Wörter hinzugekommen und weggefallen sind (etwa „+120 Wörter · −35 Wörter“), und mit den Pfeilen springst du von Änderung zu Änderung – auch per Tastatur. Das Gleiche gilt für die Versionen eines Eintragsdokuments. Sehr lange Dokumente (über 60.000 Wörter auf beiden Seiten zusammen) oder Versionen, die sich an zu vielen Stellen unterscheiden, meldet Flowplan als zu groß zum Vergleichen; wiederherstellen lassen sie sich trotzdem.
- **Einzelne Absätze zurückholen**: Im Vergleich mit dem aktuellen Stand hat jeder entfernte oder geänderte Absatz den Knopf **Wiederherstellen**. Der Absatz kommt mit seiner Formatierung an seinen alten Platz zurück; der Rest der Seite bleibt, wie er ist.
- **Wiederherstellen** setzt die Seite auf diesen Stand zurück. Danach beginnt die Anzeige der [Autoren](/documents#autoren-anzeigen) neu; der wiederhergestellte Text erscheint als „früher“.

Automatische Versionen werden nach sieben Tagen auf eine je Tag verdichtet und nach 180 Tagen gelöscht (einstellbar in der Administration).
