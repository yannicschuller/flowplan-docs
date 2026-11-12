---
keywords: Import, CSV, Markdown, Frontmatter, ZIP, Versionsverlauf, wiederherstellen
---

# Import, Inhaltsarchiv und Versionen

Inhalte kommen als Markdown, CSV oder Archiv herein und gehen als Markdown, PDF oder vollständiges Archiv wieder hinaus. Der Versionsverlauf holt frühere Stände zurück.

**Mehr zum Thema:** [Exportieren](/export) · [Drucken und PDF](/print-and-pdf)

## Importieren

Alle Importe stehen unter **Einstellungen → Import & Export → Import**; oben wählst du einmal den **Zielbereich** für alle.

- **Markdown, Text oder HTML**: **Markdown-, Text- oder HTML-Dateien**. Überschriften, Listen, Aufgaben, Tabellen, Code und Formeln werden zu Blöcken; Mermaid-Code (` ```mermaid `, in HTML `<pre><code class="language-mermaid">` oder `<div class="mermaid">`) wird zu einem Codeblock, der das Diagramm zeigt – der Code ist einen Klick entfernt ([Vorschau](/math-and-code#formeln-diagramme-und-code)). Das gilt für alle Importe, auch AFFiNE, Notion, Obsidian, Confluence (Sprache der Code-Makros) und eingefügtes Markdown. Bildtitel und `Table:`-/`Listing:`-Zeilen werden zu [Beschriftungen](/formatting#beschriftungen), in HTML `<figure>`/`<figcaption>` und `<caption>`. Beim AFFiNE-Import werden die Beschriftungen von Bildern und Codeblöcken übernommen.
- **Notion-, AppFlowy- oder Markdown-Export**: **Notion, AppFlowy oder Markdown-Export (ZIP)** nimmt ein ZIP mit Markdown- und CSV-Dateien an. Markdown wird zu Seiten, CSV zu Datenbanken, Tage eines Flowplan-Journals (`…/2026/10/2026-10-27.md` unter dem Journal) wieder zu Tagen dieses Journals, Excalidraw- und draw.io-Dateien zu [Whiteboards](/whiteboard-diagrams#excalidraw-und-draw-io-importieren), Ordner zu Unterseiten; verlinkte Bilder und Dateien werden hochgeladen, Datensatzseiten aus Notion den Einträgen zugeordnet. Ein [Markdown-Export aus Flowplan](/export) (eine Seite oder ein Bereich als ZIP) kommt mit Seitenbaum, Titeln und Datenbanken samt Einträgen zurück; Kommentare und frühere Versionen aus dem Export bleiben dabei draußen. Bis 100 MB, standardmäßig 10.000 Seiten (`FLOWPLAN_IMPORT_MAX_DOCS`) und 5.000 Einträge je Tabelle; einzelne Dateien im ZIP dürfen so groß sein wie die größte Datei beim Hochladen (mindestens 10 MB), ZIPs darin – etwa die „Export-…-Part-1.zip“ großer Notion-Exporte – werden mit entpackt, solange alles zusammen in die Grenzen des Imports passt. Den Zielbereich wählst du vorher.
- **Jira oder Trello**: **Jira oder Trello** – siehe [Projekte, Tickets und Sprints](/projects-and-tickets#import-aus-jira-und-trello).
- **CSV**: in einer Datenbank **CSV oder Markdown importieren** wählen und eine CSV-Datei nehmen; die Zeilen werden zu Einträgen. Eine aus Flowplan exportierte CSV kommt unverändert zurück: Text, der wie eine Formel aussieht (`=…`, `+…`, `@…`), bekommt beim Export einen schützenden Apostroph, den der Import wieder entfernt; Tags mit Komma (etwa „Nacht, Wochenende“) bleiben ein Tag, wenn es ihn unter den Optionen der Spalte gibt. Personen, verknüpfte Einträge, Dateien und Sprints findet der Import über ihren Namen (Personen auch über die E-Mail-Adresse) und verknüpft sie wieder – aber nur, wenn der Name eindeutig ist: Heißen zwei Einträge „Meeting“, bleibt die Zelle leer, statt den falschen zu verknüpfen. Spalten, die in der Datei fehlen, lässt der Import aus, statt sie zu leeren.
  - **Werte lesen:** Leere Zahlenzellen bleiben leer (nicht 0), Summen und Filter wie „ist leer“ stimmen also nach dem Wiederimport. Zahlen dürfen ein Dezimalkomma und Tausenderpunkte haben („1,5“, „1.234,56“), Checkboxen stehen auch als Ja/Nein, x oder ✓ da, Datumswerte auch als `05.11.2026`. Eine Datei mit nur einer Spalte (etwa eine Ansicht, die nur den Titel zeigt), kurze Zeilen und Kommas am Zeilenende gehen ebenfalls; nur ein kaputtes Anführungszeichen macht die Datei unlesbar.
  - **Passt ein Wert nicht** zu einer Zahl-, Datums- oder Checkbox-Eigenschaft (etwa „2026-02-30“), lehnt Flowplan den Import ab und nennt die Eigenschaft – statt den Wert wegzulassen oder als Text zu speichern.
  - **Neue Optionen:** Werte, die eine Auswahl oder Mehrfachauswahl noch nicht als Option hat, legt der Import als neue Optionen an; bei anderer Groß- und Kleinschreibung nimmt er die vorhandene Option. Höchstens 100 neue Optionen je Import – eine Freitext-Spalte, die einer Auswahl zugeordnet ist, wird so abgelehnt, statt Tausende Optionen anzulegen. Ein Hinweis nennt, welche Optionen in welcher Eigenschaft dazugekommen sind.
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

Beim Import von Einträgen (Markdown, CSV) in eine [Mehrfachauswahl mit den Tags des Arbeitsbereichs](/database-properties#mehrfachauswahl-mit-den-tags-des-arbeitsbereichs) bleiben die Werte Namen; fehlende Tags werden angelegt, wenn du Tags anlegen darfst (Mitglieder mit Bearbeitungsrecht) – sonst bleiben solche Werte weg.

Vor dem Import zeigt eine Vorschau, welche Eigenschaften passen und welche fehlen. **Fehlende Eigenschaften anlegen** erzeugt sie mit einem passenden Typ: Liste → Mehrfachauswahl, ISO-Datum → Datum, `true`/`false` → Kontrollkästchen, Zahl → Zahl, Adresse → URL, wenige wiederkehrende Werte → Auswahl, sonst Text. Bis 5.000 Dateien und 100 MB je Import.

**Export:** Im ZIP-Export beginnt jeder Eintrag unter `records/` mit `title:` und seinen Eigenschaften: Auswahl als Text, Mehrfachauswahl und Relationen (Titel der verknüpften Einträge) als Liste, Datum als ISO-Datum. Aliasse stehen unter dem Obsidian-Schlüssel `aliases:` als Liste, so dass sie einen Weg nach Obsidian und zurück überstehen. Berechnete Werte und die Kennung des Eintrags stehen unter `flowplan:` und werden beim Import übergangen. Wird ein so exportierter Eintrag wieder in dieselbe Datenbank importiert, bietet die Vorschau **aktualisieren statt neu anlegen** an: Der Eintrag mit derselben Kennung bekommt Eigenschaften und Text der Datei, der vorige Stand bleibt als Version erhalten. Ohne diese Wahl kommt er als neuer Eintrag hinzu.

**Seiten:** [Aliasse](/page-tags#aliasse), [Tags und Eigenschaften](/page-tags#tags-und-eigenschaften) einer Seite schreibt der Markdown-Export (einzeln, im Bereichs-Export, im geplanten Export und im Git-Export) als Frontmatter an den Anfang der Datei – so, wie Obsidian sie liest:

```markdown
---
tags:
  - Kunde
  - Angebot
Status: Gesendet
Budget: 12500
Fällig: 2026-12-01
Verantwortlich: Emil Beispiel
---
# Angebot Müller GmbH
```

Personen stehen mit ihrem Namen, Mehrfachauswahlen als Liste, Kontrollkästchen als `true`/`false`; die automatischen Eigenschaften (Erstellt am …) fehlen. Seiten ohne Aliasse, Tags und Werte bleiben ohne Frontmatter.

Beim Import von Markdown-Dateien, Markdown-ZIPs und Obsidian-Tresoren unter **Einstellungen → Import & Export** wird `aliases:`/`alias:` zu den Aliassen der neuen Seite und `tags:` (oder `tag:`, als Liste oder „a, b“) zu ihren Tags; fehlende Tags werden angelegt. Weitere Schlüssel werden zu Eigenschaften: Gibt es im Arbeitsbereich schon eine Eigenschaft mit dem Namen, bekommt die Seite dort ihren Wert. Unbekannte Schlüssel legen nur **Eigentümer** des Arbeitsbereichs als neue Eigenschaften an – der Typ ergibt sich aus dem Wert (`true` → Kontrollkästchen, Zahl → Zahl, `2026-12-01` → Datum, Liste → Mehrfachauswahl, Webadresse, E-Mail, sonst Text). Schlüssel von Veröffentlichungswerkzeugen (`cssclass`, `publish`, `permalink`, `layout`, `slug`, `draft` …) werden nie zu Eigenschaften. Ist das ganze Frontmatter übernommen, verschwindet es aus dem Text; sonst bleibt es wie bisher im Text stehen. Der Git-Export liest Aliasse, Tags und Werte geänderter Seiten aus dem Repository zurück.

**Wo exportieren:** In der Leiste einer Datenbank öffnet **Exportieren** ein Menü mit **CSV (aktuelle Ansicht)**, **Markdown mit Dateien (.zip)**, **Markdown (.md)** und **Als Word (DOCX)**. Einen einzelnen Eintrag exportiert das **…**-Menü im Kopf des Eintrags: **Als Markdown exportieren (.md)** (mit Frontmatter), **Markdown mit Dateien (.zip)**, **Als Word (DOCX)** (Eigenschaften als Tabelle, dann das Dokument) oder **Drucken / PDF** – mit denselben [Druckoptionen](/print-and-pdf#drucken-und-pdf); **Eigenschaften** steht dort für die Felder des Eintrags.

**CSV (aktuelle Ansicht)** schreibt die sichtbaren Spalten der Ansicht in ihrer Reihenfolge (Board, Galerie und andere Kartenansichten immer mit dem Titel) und die Werte so, wie die Tabelle sie zeigt: Personen (auch Erstellt von / Bearbeitet von) mit Namen, verknüpfte Einträge mit ihrem Titel, hochgeladene Dateien mit ihrem Namen (Links bleiben Links), Sprints mit Namen. Zahlen, Datumswerte und Checkboxen stehen wie gespeichert drin. Ist der Name einer Person nicht eindeutig, steht ihre E-Mail-Adresse da. Die CSV im Markdown-ZIP enthält weiterhin alle Eigenschaften.

**Aus Obsidian:** Links im Text werden als normale Markdown-Links gelesen. Wikilinks (`[[…]]`, `![[…]]`) vorher umwandeln – in Obsidian unter *Einstellungen → Dateien und Links* „[[Wikilinks]] verwenden“ ausschalten und relative Pfade wählen.

## Inhaltsarchiv

Unter **Einstellungen → Import & Export → Export → Arbeitsbereich als ZIP** lädst du ein ZIP deines Arbeitsbereichs herunter. Zurückholen – auch in eine andere Flowplan-Instanz – geht unter **Sicherungen → Flowplan-Archiv wiederherstellen**: Das Archiv wird als Kopie in neuen privaten Bereichen angelegt.

Die Sicherung der ganzen Instanz (mit Konten und Rechten) ist Sache der Administration: **Administration → Speicher & Sicherung**. Die Karte **Papierkorb & Aufbewahrung** führt zum Papierkorb und sagt, wie lange was aufbewahrt wird: gelöschte Seiten und Bereiche, bis jemand sie endgültig löscht, gelöschte Datenbank-Einträge 30 Tage; wie lange frühere Versionen bleiben, legt die Administration fest.

Enthalten: zugängliche Seiten samt Papierkorb, Datenbanken mit Ansichten und Einträgen, Dokumentinhalte, Relationen, Vorlagen, Kommentare, Versionen, Favoriten und Formularoptionen, dazu alle Dateien mit Prüfsummen. Außerdem die Einstellungen der Datenbanken (Erledigt-Regel, Workflow, Automationen, Sprints, Story Points – nie das Git-Token), Zeiteinträge und der Statusverlauf hinter den Burndown-Diagrammen, die Einstellungen und Tracker der Journale samt Werten und Ort jedes Tages, Handschrift auf PDFs und deine [Startseite](/first-steps#startseite-anpassen) (übernommen nur, wenn die importierende Person noch keine eigene hat).

Auch die Tags und Eigenschaften des Arbeitsbereichs (auch ungenutzte) und die Tags und Werte jeder Seite sind dabei. Beim Einspielen werden fehlende Tags angelegt, fehlende Eigenschaften nur, wenn du Eigentümer des Ziel-Arbeitsbereichs bist; vorhandene mit gleichem Namen werden weiterverwendet.

Ebenso gehören das [Erscheinungsbild](/workspace-appearance#erscheinungsbild) samt hochgeladener Schriften und die [automatischen Links](/workspace-appearance#automatische-links) des Arbeitsbereichs dazu (der JSON-Export enthält beides ohne die Schriftdateien): Beim Einspielen übernimmt sie nur ein Eigentümer des Ziel-Arbeitsbereichs – Link-Regeln zusätzlich zu den vorhandenen (bei gleichem Muster bleibt die vorhandene, höchstens 50), das Erscheinungsbild nur, wenn dort noch Flowplans eigenes Aussehen gilt. Was die Prüfung der Einstellungen nicht besteht (ungültige Regel, keine Schriftdatei, über 5 MB, mehr als 20 Schriften, Speicherkontingent voll), wird ausgelassen und in der Meldung gezählt, ohne den Import abzubrechen.

Das Archiv enthält nur, was du selbst sehen darfst: private Einträge anderer samt ihrer Kommentare und Dateien fehlen, ebenso Journale hinter einer PIN, die du gerade nicht entsperrt hast. Versionen einer Datenbank kommen nur bei Besitzern mit, weil sie alle Einträge enthalten. Jede Version enthält die ganze Datenbank; passen bei großen Datenbanken nicht alle ins Archiv, kommen die neuesten mit und ältere bleiben zurück – die aktuellen Einträge sind immer dabei.

- Beim Import entstehen neue IDs; interne Links und Relationen werden umgeschrieben – auch eingebettete Whiteboards, synchronisierte Blöcke, Kennzahlen, Zeichenblöcke und Einträge auf Whiteboard-Karten.
- Stammt das Archiv von jemand anderem, werden dessen Zuweisungen und Erwähnungen zu deinen; Aufgaben in Dokumenten erscheinen sofort unter **Meine Aufgaben**.
- Ältere Archive lassen sich wie bisher importieren; ältere Server überspringen, was sie nicht kennen.
- Importierte Bereiche und Vorlagen sind privat, Freigaben und Formulare nicht aktiv.
- Ein fehlerhafter Import wird vollständig zurückgerollt.
- Grenzen: 2 GB ZIP, 20.000 Dateien, 50.000 Seiten, 200.000 Einträge je Datenbank und 64 MB für Seiten, Einträge, Kommentare und Versionen ohne die Dateien (die Datei `flowplan.json` im Archiv) – je nach Inhalt reicht das für rund 100.000 Einträge. Dieselbe Grenze gilt beim Export, beim Import und beim Wiederherstellen; Versionen von Datenbanken kommen nur mit, solange sie darin Platz haben.

Konten, Sitzungen und Anmeldung gehören nicht dazu – die sichert der Betrieb täglich mit der gesamten Instanz.

## Versionsverlauf

**Seitenaktionen → Versionsverlauf**:

- Dokumente sichern automatisch höchstens alle fünf Minuten, Datenbanken vor der ersten Änderung nach zehn Minuten Ruhe.
- **Aktuelle Version sichern** legt jederzeit einen Stand an; manuell gesicherte Versionen bleiben dauerhaft.
- **Änderungen** vergleicht eine Version mit dem aktuellen Stand oder mit einer beliebigen anderen Version (**Vergleichen mit**): hinzugefügter und entfernter Text, bei Datenbanken neue, geänderte und entfernte Einträge und Eigenschaften.
- **Vergleich im Detail**: Der Vergleich geht Block für Block durch das Dokument – Überschriften, Absätze, Listenpunkte, Tabellenzellen, Zitate und Code bleiben als solche erkennbar – und markiert innerhalb eines geänderten Blocks die einzelnen Wörter: Hinzugefügtes grün, Entferntes rot und durchgestrichen; unveränderte Blöcke sind abgeblendet. Eine Zusammenfassung zeigt, wie viele Wörter hinzugekommen und weggefallen sind (etwa „+120 Wörter · −35 Wörter“), und mit den Pfeilen springst du von Änderung zu Änderung – auch per Tastatur. Das Gleiche gilt für die Versionen eines Eintragsdokuments. Sehr lange Dokumente (über 60.000 Wörter auf beiden Seiten zusammen) oder Versionen, die sich an zu vielen Stellen unterscheiden, meldet Flowplan als zu groß zum Vergleichen; wiederherstellen lassen sie sich trotzdem.
- **Einzelne Absätze zurückholen**: Im Vergleich mit dem aktuellen Stand hat jeder entfernte oder geänderte Absatz den Knopf **Wiederherstellen**. Der Absatz kommt mit seiner Formatierung an seinen alten Platz zurück; der Rest der Seite bleibt, wie er ist.
- **Wiederherstellen** setzt die Seite auf diesen Stand zurück. Danach beginnt die Anzeige der [Autoren](/reading-and-presenting#autoren-anzeigen) neu; der wiederhergestellte Text erscheint als „früher“.
- **Datenbanken** kommen beim Wiederherstellen mit Eigenschaften, Optionen und Einträgen zurück – und mit den Einstellungen, die Optionen beim Namen nennen: Erledigt-Regel, Workflow, Automationen und die Status-Zuordnung der Issue-Synchronisierung, so wie sie damals waren. Die Version von vor einer [umbenannten Option](/properties-and-formulas#optionen-umbenennen-und-zusammenfuehren) lässt die Erledigt-Regel also nicht beim neuen Namen stehen. Kommt eine Automation dabei verändert zurück, handelt sie danach im Namen der Person, die wiederhergestellt hat. Ältere und importierte Versionen lassen die Einstellungen, wie sie sind.

Automatische Versionen werden nach sieben Tagen auf eine je Tag verdichtet und nach 180 Tagen gelöscht (einstellbar in der Administration).
