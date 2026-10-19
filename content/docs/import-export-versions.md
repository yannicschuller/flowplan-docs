# Import, Export und Versionen

Inhalte kommen als Markdown, CSV oder Archiv herein und gehen als Markdown, PDF oder vollständiges Archiv wieder hinaus. Der Versionsverlauf holt frühere Stände zurück.

## Exportieren

**Seitenaktionen → Exportieren**:

| Format | Inhalt |
| --- | --- |
| **Markdown (.md)** | Eine Datei mit dem Seiteninhalt; Datenbanken mit Übersicht, Eigenschaften und den Dokumenten aller Einträge. |
| **Markdown mit Dateien (.zip)** | `index.md`, Unterseiten unter `pages/`, Eintragsdokumente unter `records/`, Datenbanken zusätzlich als CSV unter `tables/`, Anhänge unter `assets/` – alles relativ verlinkt. Jeder Eintrag unter `records/` beginnt mit seinen Eigenschaften als YAML-Frontmatter (siehe unten). Mit **Kommentare und frühere Versionen einschließen** kommen `<Datei>.comments.md` und `<Datei>.versions/` dazu. |
| **HTML / JSON** | Das ältere Format für Dokumente und Datenbanken. |

**Drucken / PDF** öffnet die Druckansicht des Browsers; dort als PDF sichern. Apps auf dem Home-Bildschirm von iPhone und iPad können nicht selbst drucken: Sie öffnen die Seite 15 Minuten lang unter einer geheimen Adresse in Safari. Diese Druckansicht zeigt nur Inhalt – keine Formularfelder, Knöpfe oder Skripte – und oben, wer sie erstellt hat.

Der Export berücksichtigt Leserechte und enthält alle Einträge unabhängig von Ansichtsfiltern. Formeln und Mermaid bleiben als Quelltext erhalten.

**Whiteboards** kommen im ZIP als SVG-Bild unter `assets/` mit: Eine Whiteboard-Seite zeigt ihr Bild, ein in ein Dokument eingebettetes Whiteboard wird zum Bild mit einem Link zum Board in Flowplan. Das Bild ist zugeschnitten wie **Als SVG exportieren** im Board, Bilder auf dem Board liegen daneben unter `assets/`. Verdeckte Elemente bleiben verdeckt, Kommentar-Pins sind nicht enthalten; ein leeres Board ergibt einen kurzen Hinweis statt eines Bildes. Weil SVG Text ist, zeigt Git Änderungen an einem Board als lesbaren Diff. Bearbeitbar ist das Board außerhalb von Flowplan nicht.

Grenzen je Export: 500 Seiten, 5.000 Einträge, 250 MB Inhalt.

### Einen ganzen Bereich exportieren

Das Download-Symbol neben dem Namen eines Bereichs in der Seitenleiste (oder **Einstellungen → Daten → Bereich als Markdown exportieren**) lädt den ganzen Bereich als **ein** Markdown-ZIP herunter – zum Archivieren, offline Lesen oder für ein eigenes Git-Repository:

- Jede Seite der obersten Ebene liegt mit allem, was darunter hängt, in einem eigenen Ordner `<Titel>-<Kennung>/` – derselbe Aufbau wie beim [geplanten Markdown-Export](/storage-and-backups#markdown-export-und-git). Darin gilt das Format von **Markdown mit Dateien (.zip)**.
- `index.md` oben listet die Seiten des Bereichs; Links zwischen Seiten des Bereichs sind relativ, Links in andere Bereiche zeigen weiter auf Flowplan.
- Exportieren darf jede Person, die den Bereich lesen kann, ohne Administrator. Enthalten ist nur, was sie lesen darf: private Einträge und Journale mit PIN anderer bleiben draußen, private Bereiche anderer lassen sich nicht exportieren.
- **Kommentare und frühere Versionen einschließen** wie beim Seitenexport; es gelten dieselben Grenzen, für den ganzen Bereich.
- Für Skripte mit einem Lese-Token: `{"spaceId":"…","format":"zip","history":true}` an `/api/markdown-export` (siehe [API-Tokens](/api-and-webhooks)). Die Kennung des Bereichs steht im Export-Dialog.

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
- berechnete Eigenschaften (Formeln, Rollups, Zeitstempel) werden nicht überschrieben.

Vor dem Import zeigt eine Vorschau, welche Eigenschaften passen und welche fehlen. **Fehlende Eigenschaften anlegen** erzeugt sie mit einem passenden Typ: Liste → Mehrfachauswahl, ISO-Datum → Datum, `true`/`false` → Kontrollkästchen, Zahl → Zahl, Adresse → URL, wenige wiederkehrende Werte → Auswahl, sonst Text. Bis 5.000 Dateien und 100 MB je Import.

**Export:** Im ZIP-Export beginnt jeder Eintrag unter `records/` mit `title:` und seinen Eigenschaften: Auswahl als Text, Mehrfachauswahl und Relationen (Titel der verknüpften Einträge) als Liste, Datum als ISO-Datum. Berechnete Werte und die Kennung des Eintrags stehen unter `flowplan:` und werden beim Import übergangen. Wird ein so exportierter Eintrag wieder in dieselbe Datenbank importiert, bietet die Vorschau **aktualisieren statt neu anlegen** an: Der Eintrag mit derselben Kennung bekommt Eigenschaften und Text der Datei, der vorige Stand bleibt als Version erhalten. Ohne diese Wahl kommt er als neuer Eintrag hinzu.

**Wo exportieren:** In der Leiste einer Datenbank öffnet **Exportieren** ein Menü mit **CSV (aktuelle Ansicht)**, **Markdown mit Dateien (.zip)** und **Markdown (.md)**. Einen einzelnen Eintrag exportiert das **…**-Menü im Kopf des Eintrags: **Als Markdown exportieren (.md)** (mit Frontmatter), **Markdown mit Dateien (.zip)** oder **Drucken / PDF**.

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
- **Einzelne Absätze zurückholen**: Im Vergleich mit dem aktuellen Stand hat jeder entfernte oder geänderte Absatz den Knopf **Wiederherstellen**. Der Absatz kommt mit seiner Formatierung an seinen alten Platz zurück; der Rest der Seite bleibt, wie er ist.
- **Wiederherstellen** setzt die Seite auf diesen Stand zurück. Danach beginnt die Anzeige der [Autoren](/documents#autoren-anzeigen) neu; der wiederhergestellte Text erscheint als „früher“.

Automatische Versionen werden nach sieben Tagen auf eine je Tag verdichtet und nach 180 Tagen gelöscht (einstellbar in der Administration).
