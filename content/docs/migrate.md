---
keywords: Umzug, Import, Notion, AppFlowy, AFFiNE, Obsidian, Evernote, Confluence, BookStack, wechseln, Migration, Notion-API, Importbericht
---

# Umzug zu Flowplan

Flowplan ist eine Open-Source-Alternative zu Notion, Confluence und AppFlowy unter der AGPL-3.0. So holst du Seiten, Datenbanken, Bilder und Dateien aus dem bisherigen Werkzeug herüber.

**Mehr zum Thema:** [Begriffe beim Umzug](/migrate-glossary) · [Von AFFiNE](/migrate-affine) · [Von Confluence, BookStack, Evernote, Google Docs und Word](/migrate-office) · [Von Obsidian und GoodNotes](/migrate-notes)

## So ziehst du um {since=0.9.7}

Drei Wege führen herüber:

- **In der Einführung:** Gleich nach dem Anlegen des Kontos fragt die [Einführung](/settings#die-einfuehrung) **Woher kommst du?** – Notion, AFFiNE, Obsidian, Evernote, Confluence, Google Docs / Word, BookStack {since=0.10.0} oder **Neu anfangen**. Sie zeigt Schritt für Schritt, wo das Werkzeug seinen Export hat, importiert die Datei gleich in deinen ersten Bereich und erklärt danach unter **So heißt das hier**, wie die gewohnten Dinge in Flowplan heißen ([Begriffe beim Umzug](/migrate-glossary)).
- **Jederzeit** unter **Einstellungen → Import & Export → Import**, mit Zielbereich, Vorschau und allen Quellen – siehe unten.
- **Notion und BookStack ohne Export:** direkt über die Notion-API mit einem Integrations-Token ([Über die Notion-API](#ueber-die-notion-api)) oder über die BookStack-API mit einem API-Token ([Von BookStack](/migrate-office#von-bookstack)). {since=0.10.0}

| Von | Was du brauchst | Anleitung |
| --- | --- | --- |
| Notion | ZIP-Export (am besten HTML) oder ein Integrations-Token | [Von Notion](#von-notion) |
| AFFiNE | `.affine`-Datei des Arbeitsbereichs oder Snapshot-ZIP | [Von AFFiNE](/migrate-affine) |
| Obsidian | den Ordner des Tresors als ZIP | [Von Obsidian](/migrate-notes#von-obsidian-und-anderen-markdown-ordnern) |
| Evernote | `.enex`-Datei oder eine ZIP mit mehreren | [Von Evernote](/migrate-office#von-evernote) |
| Confluence | ZIP des Bereichsexports | [Von Confluence](/migrate-office#von-confluence) |
| Google Docs, Word | Takeout-ZIP, `.docx`- oder HTML-Datei | [Von Google Docs](/migrate-office#von-google-docs), [Von Word](/migrate-office#von-microsoft-word) |
| BookStack | Adresse der Instanz und ein API-Token {since=0.10.0} | [Von BookStack](/migrate-office#von-bookstack) |
| AppFlowy | Markdown und CSV als ZIP | [Von AppFlowy](#von-appflowy) |
| GoodNotes | Export der Notizbücher | [Von GoodNotes](/migrate-notes#von-goodnotes) |

Was ein Import nicht oder nur angenähert übernehmen konnte, steht danach im [Importbericht](#importbericht) oben im Zielbereich.

## Confluence, Evernote, Google Docs und Obsidian

Unter **Einstellungen → Import & Export → Import** wählst du oben den Zielbereich und bei **AFFiNE, Confluence, Evernote, Google Docs, GoodNotes, Microsoft Word oder Obsidian** die Quelle (oder lässt sie erkennen) und ob eine Seitenstruktur oder eine **neue Datenbank** entstehen soll. Dann die Datei auswählen:

1. Flowplan lädt die Datei hoch (mit Fortschrittsanzeige) und zeigt eine **Vorschau**: wie viele Seiten, Ordner, Dateien (mit Größe) und Tags übernommen werden und was nicht geht – etwa verschlüsselter Text, nicht unterstützte Makros oder Bilder, die im Export fehlen.
2. **Importieren** legt alles in einem Schritt an. Schlägt etwas fehl, bleibt nichts halb importiert zurück.

Für alle Quellen gilt:

- Ende-zu-Ende-verschlüsselte Bereiche sind als Ziel ausgeschlossen (der Server sieht dort keinen Klartext).
- Du brauchst Schreibrechte im Zielbereich; Speicherkontingente des Arbeitsbereichs und deine persönliche Grenze werden vorher geprüft (die Vorschau warnt schon).
- Grenzen pro Import: standardmäßig 10.000 Seiten (Dokumente, Ordner, Datenbanken, Whiteboards und Sammlungen zählen je als Seite; als Datenbank: 10.000 Einträge) und 20.000 Dateien, 5.000 Einträge je Tabelle, je Datei im ZIP so viel wie die größte Datei beim Hochladen, mindestens 10 MB (PDFs und ZIPs im ZIP, etwa Notions „Export-…-Part-1.zip“, bis 100 MB – alles zusammen im Rahmen des Imports). Seiten und Dateien legt der Betreiber mit `FLOWPLAN_IMPORT_MAX_DOCS` und `FLOWPLAN_IMPORT_MAX_FILES` fest ([Konfiguration](/configuration#betrieb)). Bringt eine Datei mehr Seiten, zeigt die Vorschau die Anzahl, nennt die Grenze und die Variable, und **Importieren** bleibt gesperrt; Dateien über der Grenze werden ausgelassen (die Vorschau sagt, wie viele). ZIP-Exporte und einzelne Dateien dürfen höchstens 100 MB groß sein. Die **AFFiNE-Arbeitsbereichsdatei (`.affine`)** darf so groß sein wie die **größte Datei beim Hochladen** (Einstellungen → Instanz → [Grenzen & Aufbewahrung](/administration#grenzen-aufbewahrung), je Person änderbar), mindestens aber 100 MB; `FLOWPLAN_IMPORT_MAX_MB` legt die Grenze für die ganze Instanz fest ([Konfiguration](/configuration#betrieb)). Ist eine Datei zu groß, nennt die Meldung die Grenze und wo sie geändert wird.
- **Vorschau und Import laufen im Hintergrund.** Nach dem Hochladen zeigt die Seite den Fortschritt und dann Vorschau bzw. Ergebnis. Ein Zeitlimit des Reverse-Proxys (etwa ein 504) bricht den Import nicht mehr ab; lass die Seite offen, bis er fertig ist. Pro Person läuft ein Import gleichzeitig. Bei großen Importen siehst du, an welcher Seite Flowplan gerade ist („Seite 812 von 2000 wird vorbereitet“). {since=0.12.1} Während Flowplan die Seiten speichert, antwortet der Server kurz nicht – bei sehr großen Arbeitsbereichen auch länger.
- Reicht der Arbeitsspeicher für einen sehr großen Arbeitsbereich nicht, lehnt Flowplan den Import mit einer Meldung ab, die den Bedarf nennt, statt abzustürzen. Mehr Speicher bekommt Flowplan mit `NODE_OPTIONS=--max-old-space-size=<MB>` (z. B. `4096`) im Container; alternativ den Arbeitsbereich in mehreren Teilen exportieren.
- Die Datei wird nur einmal hochgeladen: Die Vorschau behält sie auf dem Server, **Importieren** verwendet sie weiter. Brichst du ab, wird sie gelöscht, sonst spätestens nach sechs Stunden.
- Der Inhalt wird wie beim Einfügen bereinigt: Skripte, Formulare und eingebettete Fremdseiten fallen weg. Dateinamen werden bereinigt; Dateien, die der Browser ausführen könnte (HTML, SVG), werden nur zum Herunterladen gespeichert.
- Links zwischen importierten Seiten zeigen auf die neuen Seiten. Bilder und Anhänge werden hochgeladen – jede Datei einmal, auch wenn mehrere Seiten sie zeigen.
- **Als neue Datenbank** wird jede Notiz ein Eintrag mit den Eigenschaften *Tags*, *Erstellt*, *Geändert*, *Ordner* (der Ordnerpfad) und – wenn vorhanden – *Quelle*. Als Seiten werden Tags zu [Tags der Seite](/page-tags#tags-und-eigenschaften); fehlende werden im Arbeitsbereich angelegt.

## Von Notion

::: steps

1. In Notion: **Einstellungen → Exportieren** (für den ganzen Arbeitsbereich) oder im Menü **…** einer Seite **Exportieren**. Als Format **HTML** (empfohlen) oder **Markdown & CSV** wählen und **Unterseiten einschließen** aktivieren. Nur der HTML-Export enthält Toggles (aufklappbare Blöcke), Toggle-Überschriften und Farben.
2. In Flowplan: **Einstellungen → Import & Export → Import**, oben den Zielbereich wählen und bei **Notion, AppFlowy oder Markdown-Export (ZIP)** das ZIP auswählen.
3. Fertig – der Import läuft in einem Schritt. Schlägt er fehl, bleibt nichts halb importiert zurück.

:::

Was daraus wird:

- Jede HTML- oder Markdown-Datei wird zu einer Seite, jeder Ordner mit dem Namen einer Seite zu ihren Unterseiten. Die Kennungen, die Notion an Datei- und Ordnernamen hängt, fallen weg.
- Aus dem HTML-Export: Toggles werden zu [aufklappbaren Blöcken](/documents#aufklappbare-bloecke), Toggle-Überschriften zu Überschriften, die sich einklappen lassen (oder, wo ihr Inhalt nicht bis zur nächsten Überschrift reicht, zu aufklappbaren Blöcken mit der Überschrift als Titel). Text- und Hintergrundfarben, Aufgaben, verschachtelte Listen, Tabellen, Formeln und Bildunterschriften bleiben erhalten.
- Jede CSV-Datei wird zu einer Datenbank. Liegen beide Fassungen vor, nimmt Flowplan `Name_all.csv` (alle Einträge) statt der aktuellen Ansicht.
- Eigenschaften bekommen ihre Art. Aus dem HTML-Export liest Flowplan sie an den Symbolen der Tabellen und den Zeilen der Eintragsseiten ab: Auswahl und Status, Mehrfachauswahl mit Notions Farben, Datum mit Uhrzeit und Zeiträumen, Zahl mit ihrem Format, Kontrollkästchen, URL, E-Mail, Telefon, Person (wenn jeder Name ein Mitglied des Arbeitsbereichs ist); Erstellt und Zuletzt bearbeitet werden zu den Zeitstempeln des Eintrags. Ohne HTML erkennt Flowplan Zahlen, Kontrollkästchen, Daten (auch im Notion-Format „September 24, 2026“), Auswahlen, Mehrfachauswahlen, Links, E-Mails und Relationen an den Werten; der Rest bleibt Text. {since=0.9.7}
- **Relationen** zeigen auf die importierten Einträge – über die Pfade der Eintragsseiten, Notion-Adressen oder Titel, auch zwischen Datenbanken desselben Exports. Formeln und Rollups enthält der Export nur als Werte: Sie kommen als Text und stehen im [Importbericht](#importbericht). {since=0.9.7}
- Die Seiten der Einträge werden ihren Einträgen als Dokument zugeordnet. Seiten, die in Notion unter einem Eintrag liegen (der Ordner mit dem Namen des Eintrags), werden zu seinen [Unterseiten](/databases#unterseiten-eines-eintrags) – keine losen Seiten und keine Ersatzseiten mehr.
- Bilder und Dateien, auf die Seiten verweisen, werden hochgeladen.
- Callouts werden zu [Hinweisen](/formatting#hinweise) und behalten ihr Emoji als Symbol.
- Links auf Überschriften (`Seite.md#ueberschrift`) führen zur Überschrift; `notion.so`-Links auf Seiten des Exports führen zur importierten Seite (Notions Markdown enthält keine Blockkennungen, Links auf einzelne Absätze führen daher zur Seite).
- Große Exporte, die Notion in mehrere ZIP-Dateien innerhalb des ZIPs aufteilt, werden erkannt.

Grenzen pro Import: 100 MB, standardmäßig 10.000 Seiten (`FLOWPLAN_IMPORT_MAX_DOCS`) und 5.000 Einträge je Tabelle. Größere Arbeitsbereiche exportierst du in Teilen, etwa Seite für Seite.

### Über die Notion-API {since=0.9.7}

Statt über eine Export-Datei holt Flowplan Seiten und Datenbanken auch direkt aus Notion – mit dem Token einer internen Integration, die du in Notion anlegst.

::: steps

1. In Notion **notion.so/profile/integrations** öffnen und mit **Neue Integration** („New integration“) eine **interne** Integration für deinen Arbeitsbereich anlegen.
2. Als Berechtigung **Inhalte lesen** („Read content“) geben; mit **Benutzerinformationen lesen** („Read user information“) kann Flowplan Personen-Eigenschaften den Mitgliedern deines Arbeitsbereichs zuordnen. Unter **Konfiguration** das Secret kopieren – es beginnt mit `ntn_`.
3. In Notion die Seiten und Datenbanken mit der Integration teilen: auf der Seite oben rechts **…** → **Verbindungen** („Connections“) → die Integration wählen. Unterseiten gehören dazu.
4. In Flowplan: **Einstellungen → Import & Export → Import**, oben den Zielbereich wählen, als Quelle **Notion (API)**, das Token in das Feld **Integrations-Token** einfügen und **Geteilte Seiten laden**.
5. Unter **Was importiert werden soll** stehen die obersten geteilten Seiten und Datenbanken, alle angehakt. Abwählen, was nicht mit soll, dann **… importieren**. Sieht die Integration nichts, sagt Flowplan, dass du die Seiten erst über **Verbindungen** teilen sollst.

:::

> [!WARNING]
> Das Token liest alles, was mit der Integration geteilt ist. Füge es nur in Flowplan in das Feld **Integrations-Token** ein – nirgendwo sonst, auch nicht in Chats, Issues oder E-Mails. Flowplan verwendet es nur für diesen Import und speichert oder protokolliert es nicht. Brauchst du die Integration danach nicht mehr, lösche sie in Notion.

Der Import läuft im Hintergrund wie ein Datei-Import und holt alles unterhalb der gewählten Seiten: Absätze, Überschriften (auch aufklappbare), Listen, Aufgaben, aufklappbare Blöcke, Zitate, Callouts, Code, Formeln, Trennlinien, Tabellen, Bilder und Dateien, Unterseiten und Datenbanken in Seiten, synchronisierte Blöcke mit dem Inhalt des Originals, Spalten untereinander, Seiten-Links und Erwähnungen als Links auf die importierten Seiten, Textauszeichnungen und Farben, Emoji-Symbole und Cover. Lesezeichen und Einbettungen werden zu Links. Dateien, die Notion selbst speichert, lädt Flowplan während des Imports herunter (bis zur Grenze für die größte Datei); Dateien von anderswo bleiben Links. Datenbanken behalten Arten, Optionen und Farben ihrer Eigenschaften; Relationen zu mitimportierten Datenbanken, Rollups mit Berechnungen, die Flowplan kennt, und Formeln, die Flowplan lesen kann, werden zu ihrem Gegenstück, der Rest zu Text – das steht im [Importbericht](#importbericht). Notion erlaubt höchstens drei Anfragen pro Sekunde; große Arbeitsbereiche brauchen deshalb eine Weile.

Antwortet Notion nicht oder mit einem Fehler, versucht Flowplan es mehrmals, bei großen Datenbanken in kleineren Paketen. Liefert Notion eine Seite, eine Datenbank oder einen Teil einer Seite trotzdem nicht, überspringt der Import nur diesen Teil und holt den Rest. Der [Importbericht](#importbericht) nennt unter **Übersprungen** jede solche Stelle mit Titel und Grund (etwa „HTTP 400 · validation_error“). Prüfe dann in Notion, ob die Seite mit der Integration geteilt ist (**… → Verbindungen**), und importiere sie noch einmal einzeln – oder nimm den ZIP-Export. Abgebrochen wird nur, wenn Notion das Token ablehnt, keine der gewählten Seiten liefert oder mehrmals hintereinander nicht antwortet. {since=0.12.0}

## Von AppFlowy

::: steps

1. In AppFlowy Seiten als **Markdown** und Datenbanken als **CSV** exportieren.
2. Die Dateien in einen Ordner legen – Unterordner werden zu Unterseiten – und als ZIP packen.
3. In Flowplan unter **Einstellungen → Import & Export → Import** importieren.

:::

Markdown wird zu Seiten, CSV zu Datenbanken; verlinkte Bilder und Dateien werden mitgenommen.

## Importbericht {since=0.9.7}

Was ein Import nicht oder nur angenähert übernehmen konnte, sammelt Flowplan auf einer Seite **Importbericht: …** mit 📋 oben im Zielbereich, etwa „Importbericht: Notion“. Sie ist nach Art gegliedert, mit der Anzahl: **Nicht übernommene Blöcke**, **Synchronisierte Blöcke (Inhalt kopiert)**, **Einbettungen und Lesezeichen als Link**, **Formeln** und **Rollups ohne Gegenstück (Werte als Text)**, **Eigenschaften mit angenähertem Typ**, **Nicht aufgelöste Verknüpfungen** und **Dateien zu groß, fehlend oder nicht geladen** – jeder Punkt mit einem Link auf die betroffene Seite oder den Eintrag. Unter **Einstellungen → Import & Export** nennt das Ergebnis die Zahl mit einem Link dorthin („12 Hinweise im Importbericht“). Gibt es nichts zu berichten, entsteht keine Seite.

Den Bericht schreiben der Notion-Import (Export und API), der Markdown-ZIP-Import und die Importe aus AFFiNE, Obsidian, Evernote und BookStack {since=0.10.0} – auch in der Einführung. Er ist eine normale Seite: Geh die Punkte durch und lösche ihn, wenn du fertig bist.

## Nach dem Umzug

- **Links prüfen:** Verweise zwischen importierten Seiten zeigen auf die neuen Seiten; Links auf Seiten außerhalb des Exports bleiben Links auf das alte Werkzeug.
- **Links auf Blöcke und Überschriften bleiben erhalten.** Zeigt ein Link in der Quelle auf eine bestimmte Stelle einer anderen (oder derselben) Seite, zeigt er nach dem Import auf denselben Block in Flowplan: Ein Klick öffnet die Seite und springt dorthin (siehe [Links auf Blöcke](/links-and-mentions#links-auf-bloecke)). Findet sich die Stelle nicht (etwa weil der Export sie nicht enthält), führt der Link zur Seite.
- **Ansichten einrichten:** Ein Import legt je Datenbank eine Tabelle an. Board, Kalender, Galerie oder Zeitleiste fügst du danach hinzu – siehe [Ansichten](/views).
- **Teilen:** Rechte werden nicht übernommen. Lade Mitglieder ein oder teile einzelne Seiten – siehe [Teilen](/sharing).
- **Daten bleiben mitnehmbar:** Flowplan exportiert jederzeit wieder als Markdown mit Frontmatter, CSV und ZIP, auf Wunsch geplant und per Git – siehe [Import, Export und Versionen](/import-export-versions).

## Warum umziehen?

- **Komplett Open Source:** Der gesamte Quellcode steht unter der AGPL-3.0 auf [GitHub](https://github.com/yannicschuller/flowplan) – ohne geschlossene Enterprise-Version und ohne Funktionen hinter einer Lizenz.
- **Deine Daten, dein Server:** gehostet auf flowplan.org in Deutschland oder als ein Docker-Container auf deinem eigenen Server – siehe [Installation](/installation).
- **Kein Tracking.**
