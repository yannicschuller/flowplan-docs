---
keywords: Umzug, Import, Notion, AppFlowy, wechseln, Migration
---

# Umzug zu Flowplan

Flowplan ist eine Open-Source-Alternative zu Notion, Confluence und AppFlowy unter der AGPL-3.0. So holst du Seiten, Datenbanken, Bilder und Dateien aus dem bisherigen Werkzeug herüber.

**Mehr zum Thema:** [Von AFFiNE](/migrate-affine) · [Von Confluence, Evernote, Google Docs und Word](/migrate-office) · [Von Obsidian und GoodNotes](/migrate-notes)

## Confluence, Evernote, Google Docs und Obsidian

Unter **Einstellungen → Import & Export → Import** wählst du oben den Zielbereich und bei **AFFiNE, Confluence, Evernote, Google Docs, GoodNotes, Microsoft Word oder Obsidian** die Quelle (oder lässt sie erkennen) und ob eine Seitenstruktur oder eine **neue Datenbank** entstehen soll. Dann die Datei auswählen:

1. Flowplan lädt die Datei hoch (mit Fortschrittsanzeige) und zeigt eine **Vorschau**: wie viele Seiten, Ordner, Dateien (mit Größe) und Tags übernommen werden und was nicht geht – etwa verschlüsselter Text, nicht unterstützte Makros oder Bilder, die im Export fehlen.
2. **Importieren** legt alles in einem Schritt an. Schlägt etwas fehl, bleibt nichts halb importiert zurück.

Für alle Quellen gilt:

- Ende-zu-Ende-verschlüsselte Bereiche sind als Ziel ausgeschlossen (der Server sieht dort keinen Klartext).
- Du brauchst Schreibrechte im Zielbereich; Speicherkontingente des Arbeitsbereichs und deine persönliche Grenze werden vorher geprüft (die Vorschau warnt schon).
- Grenzen pro Import: standardmäßig 10.000 Seiten (Dokumente, Ordner, Datenbanken, Whiteboards und Sammlungen zählen je als Seite; als Datenbank: 10.000 Einträge) und 20.000 Dateien, 5.000 Einträge je Tabelle, je Datei im ZIP so viel wie die größte Datei beim Hochladen, mindestens 10 MB (PDFs und ZIPs im ZIP, etwa Notions „Export-…-Part-1.zip“, bis 100 MB – alles zusammen im Rahmen des Imports). Seiten und Dateien legt der Betreiber mit `FLOWPLAN_IMPORT_MAX_DOCS` und `FLOWPLAN_IMPORT_MAX_FILES` fest ([Konfiguration](/configuration#betrieb)). Bringt eine Datei mehr Seiten, zeigt die Vorschau die Anzahl, nennt die Grenze und die Variable, und **Importieren** bleibt gesperrt; Dateien über der Grenze werden ausgelassen (die Vorschau sagt, wie viele). ZIP-Exporte und einzelne Dateien dürfen höchstens 100 MB groß sein. Die **AFFiNE-Arbeitsbereichsdatei (`.affine`)** darf so groß sein wie die **größte Datei beim Hochladen** (Administration → [Grenzen & Aufbewahrung](/administration#grenzen-aufbewahrung), je Person änderbar), mindestens aber 100 MB; `FLOWPLAN_IMPORT_MAX_MB` legt die Grenze für die ganze Instanz fest ([Konfiguration](/configuration#betrieb)). Ist eine Datei zu groß, nennt die Meldung die Grenze und wo sie geändert wird.
- **Vorschau und Import laufen im Hintergrund.** Nach dem Hochladen zeigt die Seite den Fortschritt und dann Vorschau bzw. Ergebnis. Ein Zeitlimit des Reverse-Proxys (etwa ein 504) bricht den Import nicht mehr ab; lass die Seite offen, bis er fertig ist. Pro Person läuft ein Import gleichzeitig. Während Flowplan die Seiten anlegt, antwortet der Server kurz nicht – bei sehr großen Arbeitsbereichen auch länger.
- Reicht der Arbeitsspeicher für einen sehr großen Arbeitsbereich nicht, lehnt Flowplan den Import mit einer Meldung ab, die den Bedarf nennt, statt abzustürzen. Mehr Speicher bekommt Flowplan mit `NODE_OPTIONS=--max-old-space-size=<MB>` (z. B. `4096`) im Container; alternativ den Arbeitsbereich in mehreren Teilen exportieren.
- Die Datei wird nur einmal hochgeladen: Die Vorschau behält sie auf dem Server, **Importieren** verwendet sie weiter. Brichst du ab, wird sie gelöscht, sonst spätestens nach sechs Stunden.
- Der Inhalt wird wie beim Einfügen bereinigt: Skripte, Formulare und eingebettete Fremdseiten fallen weg. Dateinamen werden bereinigt; Dateien, die der Browser ausführen könnte (HTML, SVG), werden nur zum Herunterladen gespeichert.
- Links zwischen importierten Seiten zeigen auf die neuen Seiten. Bilder und Anhänge werden hochgeladen – jede Datei einmal, auch wenn mehrere Seiten sie zeigen.
- **Als neue Datenbank** wird jede Notiz ein Eintrag mit den Eigenschaften *Tags*, *Erstellt*, *Geändert*, *Ordner* (der Ordnerpfad) und – wenn vorhanden – *Quelle*. Als Seiten werden Tags zu [Tags der Seite](/page-tags#tags-und-eigenschaften); fehlende werden im Arbeitsbereich angelegt.

## Von Notion

1. In Notion: **Einstellungen → Exportieren** (für den ganzen Arbeitsbereich) oder im Menü **…** einer Seite **Exportieren**. Als Format **Markdown & CSV** wählen und **Unterseiten einschließen** aktivieren.
2. In Flowplan: **Einstellungen → Import & Export → Import**, oben den Zielbereich wählen und bei **Notion, AppFlowy oder Markdown-Export (ZIP)** das ZIP auswählen.
3. Fertig – der Import läuft in einem Schritt. Schlägt er fehl, bleibt nichts halb importiert zurück.

Was daraus wird:

- Jede Markdown-Datei wird zu einer Seite, jeder Ordner mit dem Namen einer Seite zu ihren Unterseiten. Die Kennungen, die Notion an Datei- und Ordnernamen hängt, fallen weg.
- Jede CSV-Datei wird zu einer Datenbank. Liegen beide Fassungen vor, nimmt Flowplan `Name_all.csv` (alle Einträge) statt der aktuellen Ansicht.
- Spalten bekommen eine passende Art: Zahlen, Kontrollkästchen, Daten (auch im Notion-Format „September 24, 2026“) und Auswahlen mit ihren Optionen; der Rest bleibt Text.
- Die Seiten der Einträge werden ihren Einträgen als Dokument zugeordnet.
- Bilder und Dateien, auf die Seiten verweisen, werden hochgeladen.
- Callouts werden zu [Hinweisen](/formatting#hinweise) und behalten ihr Emoji als Symbol.
- Links auf Überschriften (`Seite.md#ueberschrift`) führen zur Überschrift; `notion.so`-Links auf Seiten des Exports führen zur importierten Seite (Notions Markdown enthält keine Blockkennungen, Links auf einzelne Absätze führen daher zur Seite).
- Große Exporte, die Notion in mehrere ZIP-Dateien innerhalb des ZIPs aufteilt, werden erkannt.

Grenzen pro Import: 100 MB, standardmäßig 10.000 Seiten (`FLOWPLAN_IMPORT_MAX_DOCS`) und 5.000 Einträge je Tabelle. Größere Arbeitsbereiche exportierst du in Teilen, etwa Seite für Seite.

## Von AppFlowy

1. In AppFlowy Seiten als **Markdown** und Datenbanken als **CSV** exportieren.
2. Die Dateien in einen Ordner legen – Unterordner werden zu Unterseiten – und als ZIP packen.
3. In Flowplan unter **Einstellungen → Import & Export → Import** importieren.

Markdown wird zu Seiten, CSV zu Datenbanken; verlinkte Bilder und Dateien werden mitgenommen.

## Nach dem Umzug

- **Links prüfen:** Verweise zwischen importierten Seiten zeigen auf die neuen Seiten; Links auf Seiten außerhalb des Exports bleiben Links auf das alte Werkzeug.
- **Links auf Blöcke und Überschriften bleiben erhalten.** Zeigt ein Link in der Quelle auf eine bestimmte Stelle einer anderen (oder derselben) Seite, zeigt er nach dem Import auf denselben Block in Flowplan: Ein Klick öffnet die Seite und springt dorthin (siehe [Links auf Blöcke](/links-and-mentions#links-auf-bloecke)). Findet sich die Stelle nicht (etwa weil der Export sie nicht enthält), führt der Link zur Seite.
- **Ansichten einrichten:** Ein Import legt je Datenbank eine Tabelle an. Board, Kalender, Galerie oder Zeitleiste fügst du danach hinzu – siehe [Ansichten](/views).
- **Teilen:** Rechte werden nicht übernommen. Lade Mitglieder ein oder teile einzelne Seiten – siehe [Teilen und Veröffentlichen](/sharing).
- **Daten bleiben mitnehmbar:** Flowplan exportiert jederzeit wieder als Markdown mit Frontmatter, CSV und ZIP, auf Wunsch geplant und per Git – siehe [Import, Export und Versionen](/import-export-versions).

## Warum umziehen?

- **Komplett Open Source:** Der gesamte Quellcode steht unter der AGPL-3.0 auf [GitHub](https://github.com/yannicschuller/flowplan) – ohne geschlossene Enterprise-Version und ohne Funktionen hinter einer Lizenz.
- **Deine Daten, dein Server:** gehostet auf flowplan.org in Deutschland oder als ein Docker-Container auf deinem eigenen Server – siehe [Installation](/installation).
- **Kein Tracking.**
