---
keywords: Editor, Blöcke, Blockmenü, Slash, Markdown, schreiben, Absatz
---

# Dokumente und Editor

Der Editor arbeitet mit Blöcken: Jeder Absatz, jede Liste, Tabelle oder Einbettung ist ein Block, den du einfügen, formatieren, einrücken und verschieben kannst. Gespeichert wird laufend, auch ohne Verbindung.

**Mehr zum Thema:** [Formatieren, Hinweise und Beschriftungen](/formatting) · [Aufgaben in Dokumenten](/tasks-in-documents) · [Bilder, Dateien und Sprachnotizen](/media-and-files) · [Formeln, Diagramme, Code und Rechnen](/math-and-code) · [Links, Erwähnungen und Graph](/links-and-mentions) · [Fußnoten, Zitate und Literatur](/academic-writing) · [Lesen, Präsentieren und Überblick](/reading-and-presenting) · [Drucken und PDF](/print-and-pdf)

## Das Blockmenü mit /

Am Zeilenanfang oder nach einem Leerzeichen öffnet `/` das Blockmenü direkt an der Schreibmarke. Weitertippen filtert: `/h2`, `/todo`, `/code`, `/tab`. Pfeiltasten wählen, <kbd>Enter</kbd> oder <kbd>Tab</kbd> fügt ein, <kbd>Esc</kbd> schließt.

> [!TIP]
> Einen normalen Schrägstrich schreibst du, indem du nach `/` ein Leerzeichen tippst oder das Menü mit <kbd>Esc</kbd> schließt. In Codeblöcken ist `/` immer ein gewöhnliches Zeichen.

| Block | Kürzel im Menü | Wofür |
| --- | --- | --- |
| Text | `/text` | Normaler Absatz |
| Überschrift 1–3 | `/h1`, `/h2`, `/h3` | Gliederung; erscheinen im Inhaltsverzeichnis |
| Aufgabenliste | `/todo` | Abhakbare Aufgaben |
| Aufzählung, Nummerierte Liste | `/ul`, `/ol` | Listen, beliebig verschachtelt |
| Zitat | `/quote` | Hervorgehobenes Zitat (bei `/zitat` erscheint zuerst das Literaturzitat) |
| Hinweis, Tipp, Wichtig, Warnung, Achtung | `/hinweis`, `/tipp`, `/wichtig`, `/warnung`, `/achtung` | Farbiger Kasten mit Symbol und Titel – die fünf Arten der GitHub-Hinweise |
| Aufklappbarer Block | `/toggle` | Inhalt, der sich ein- und ausklappen lässt |
| Code | `/code` | Syntaxhervorhebung für über 240 Sprachen (wie in VS Code), Vorschau für HTML, SVG, Markdown, Mermaid, LaTeX und Typst |
| Tabelle | `/table` | Einfache Tabelle im Text |
| Bild oder Datei | `/bild`, `/datei` | Upload oder Auswahl aus der Mediathek |
| Mermaid-Diagramm | `/mermaid` | Ablauf-, Sequenz-, Klassendiagramme als Text |
| draw.io-Diagramm | `/drawio` | Diagramme zeichnen mit dem Editor von draw.io |
| Formel, Inline-Formel | `/math`, `/inlinemath` | LaTeX, dargestellt mit KaTeX |
| Seite, Eintrag oder Person erwähnen | `/mention` oder `@` | Verweis auf Seite, Datenbank-Eintrag oder Person |
| Whiteboard | `/board` | Whiteboard im Dokument einbetten |
| Zeichnen | `/zeichnen`, `/draw`, `/handschrift` | Handschrift und Skizzen mit Stift oder Finger ([Handschrift in Dokumenten](/notebooks#handschrift-in-dokumenten)) |
| Verknüpfte Datenbank | `/db` | Ansicht einer vorhandenen Datenbank |
| Zwei Spalten | `/spalten` | Inhalte nebeneinander |
| Einbetten | `/embed` | Player für YouTube, Vimeo, Loom, Spotify, Figma, CodePen; sonst Linkkarte |
| Spoiler | `/spoiler` | Verdeckter Text, per Klick sichtbar |
| Sprachnotiz | `/sprachnotiz` | Aufnehmen (bis zu zwei Stunden) und als Audio, auf Wunsch auch als Transkript einfügen |
| Synchronisierter Block | `/sync` | Inhalt, der auf mehreren Seiten gleich bleibt |
| Synchronisierten Block einfügen | `/sync` | Einen bestehenden synchronisierten Block zeigen |
| Trennlinie | `/hr` | Horizontale Linie |
| Seitenumbruch | `/seitenumbruch`, `/pagebreak` | Beim Drucken, im PDF und in Word geht es auf einer neuen Seite weiter ([Seitenumbruch](/print-and-pdf#seitenumbruch)) |
| KI | `/ki`, `/ai` | Text mit der [KI](/ai-writing#schreibassistent) schreiben lassen (wenn eingeschaltet) |
| Fußnote | `/fußnote`, `/footnote` | Nummerierte Anmerkung am Seitenende ([Fußnoten](/academic-writing#fussnoten)) |
| Literaturzitat | `/zitat`, `/cite` | Quelle zitieren – DOI, BibTeX oder Zotero ([Zitate](/academic-writing#zitate-und-literaturverzeichnis)) |
| Literaturverzeichnis | `/literatur`, `/bibliography` | Alle zitierten Werke als Liste |

**Tabellen:** Steht der Cursor in einer Tabelle, erscheint direkt darunter eine kleine Leiste: Zeile darüber oder darunter, Spalte links oder rechts einfügen; unter **…** Kopfzeile ein/aus, Zeile, Spalte oder die ganze Tabelle löschen. Ist das Ende der Tabelle nicht zu sehen, bleibt die Leiste unten im sichtbaren Bereich – auf dem Handy über der Tastatur. <kbd>Tab</kbd> springt zur nächsten Zelle und legt in der letzten Zelle eine neue Zeile an.

**Tabelle in Datenbank umwandeln:** Wird aus einer Tabelle mehr, wählst du in der Tabellenleiste unter **…** den Punkt **In Datenbank umwandeln**. Flowplan legt daraus eine [Datenbank](/databases) unter dem Dokument an und setzt an die Stelle der Tabelle eine eingebettete Ansicht davon. Die erste Zeile liefert die Spaltennamen, die erste Spalte wird zum Titel der Einträge. Die übrigen Spalten bekommen ihren Typ aus den ausgefüllten Zellen: Zahl (mit deutschem oder englischem Trennzeichen), Datum (`2026-11-04` oder `04.11.2026`), Checkbox (✓, x, ja/nein, yes/no, true/false), URL, sonst Text. Benannt wird die Datenbank nach der Beschriftung der Tabelle, sonst nach der nächsten Überschrift darüber, sonst „Tabelle“. Mit <kbd>⌘</kbd>/<kbd>Strg</kbd>+<kbd>Z</kbd> kommt die Tabelle zurück. Grenzen wie beim CSV-Import: bis 80 Spalten und 5.000 Zeilen. In verschlüsselten Bereichen gibt es den Punkt nicht; in einem Datenbankeintrag landet die neue Datenbank oben im Bereich.

**Tastatur ausblenden (Handy):** Beim Schreiben sitzt die Formatierungsleiste über der Bildschirmtastatur. Der letzte Knopf rechts, **Tastatur ausblenden**, schließt die Tastatur, damit du mehr vom Dokument siehst; Text und Cursorposition bleiben. Ein Tipp in den Text holt sie zurück. Im Inhalt eines Datenbank-Eintrags sitzt die Leiste beim Schreiben genauso über der Tastatur. Bei allen anderen Textfeldern – Titel von Seiten, Datenbanken und Einträgen, Tags, Eigenschaften, der Name im Dialog **Neue Seite**, Suchfelder, Kommentare – erscheint derselbe Knopf als runder Knopf rechts direkt über der Tastatur. Das gilt im Browser und in den Apps.

## Aufklappbare Blöcke

Ein **aufklappbarer Block** (`/toggle`) hat einen Titel und darunter Inhalt, der sich ein- und ausklappen lässt.

- **Ein- und ausklappen:** Klick (oder Tipp) auf den Pfeil vor dem Titel. Mit der Tastatur: <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>Enter</kbd> (Windows/Linux: <kbd>Strg</kbd> <kbd>Alt</kbd> <kbd>Enter</kbd>) im Inhalt klappt ein und setzt den Cursor in den Titel, dort klappen dieselben Tasten wieder auf.
- **Titel bearbeiten:** Ein Klick in den Titel setzt den Cursor hinein. <kbd>Enter</kbd> oder <kbd>↓</kbd> springt in den Inhalt (und klappt ihn auf), <kbd>↑</kbd> am Anfang des Inhalts zurück in den Titel.
- **Nichts geht verloren:** Kommt der Cursor in einen eingeklappten Block (Pfeiltasten, Rückgängig) oder springt **Auf der Seite suchen** zu einem Treffer darin, klappt er auf. Klappst du ein, während der Cursor darin steht, wandert der Cursor vor den Block.
- **Nur für dich:** Wie bei [eingeklappten Abschnitten](/reading-and-presenting#abschnitte-einklappen) ändert das Einklappen das Dokument nicht – andere, die gleichzeitig bearbeiten, sehen ihren eigenen Zustand, und beim nächsten Öffnen ist der Block wieder aufgeklappt. Gespeichert, exportiert (Markdown `<details>`, HTML) und veröffentlicht wird er immer aufgeklappt; Lesende klappen dort selbst ein.
- Im **Lesemodus** klappt ein Klick auf die ganze Titelzeile ein und aus.

## Antworten aus ChatGPT einfügen

Text, den du aus ChatGPT oder einem anderen Assistenten kopierst, wird beim Einfügen formatiert: Formeln in LaTeX (`\[ … \]`, `\( … \)`, `$$ … $$`) werden zu Formelblöcken und Formeln im Satz, Markdown (Überschriften, **fett**, Listen, Tabellen) wird umgesetzt, Zeilen mit Tabulatoren werden zur Tabelle, `☐` zur Aufgabenliste, und jede Zeile wird ein eigener Absatz. Aus der Webseite kopierte, bereits gerenderte Formeln bleiben als Formel erhalten. Das gilt auch für das Kopieren direkt aus der ChatGPT-Webseite. Stehen Formeln schon als Text im Dokument (etwa `\[ A(3;2;1) \]`), markiere sie – oder alles mit <kbd>⌘</kbd>/<kbd>Strg</kbd>+<kbd>A</kbd> – und wähle im Textmenü **In Formeln umwandeln**. Gewöhnlicher Text wird wie bisher eingefügt.

## Synchronisierte Blöcke

Ein synchronisierter Block (`/sync` → **Synchronisierter Block**) ist Inhalt, der an mehreren Stellen derselbe ist – etwa Kontaktdaten, eine Checkliste oder ein Statushinweis. **Synchronisierten Block einfügen** zeigt ihn auf einer weiteren Seite. Bearbeiten geht überall; die Änderung erscheint auf allen Seiten, bei geöffneten Seiten live.

- Der orange Rahmen kennzeichnet den Block, oben stehen die Zahl der Seiten und die Seite, auf der er entstanden ist.
- Der Papierkorb im Rahmen entfernt den Block nur an dieser Stelle; an den anderen bleibt er.
- Die Rechte kommen von der Seite, auf der der Block entstanden ist: Wer dort nicht lesen darf, sieht statt des Inhalts einen Hinweis.
- Die Suche findet den Text auf der Ursprungsseite. Auf veröffentlichten Seiten erscheint der Block nicht.

## Markdown-Kürzel

Beim Tippen wandelt der Editor um:

| Tippen | Ergebnis |
| --- | --- |
| `#`, `##`, `###` + Leerzeichen | Überschrift 1–3 |
| `-` oder `*` + Leerzeichen | Aufzählung |
| `1.` + Leerzeichen | Nummerierte Liste |
| `[]` + Leerzeichen | Aufgabe |
| `>` + Leerzeichen | Zitat |
| ` ``` ` | Codeblock |
| `---` | Trennlinie |
| `**fett**`, `*kursiv*`, `` `code` ``, `~~durch~~` | Formatierung im Text |

Codeblöcke tragen ihre Sprache im Zaun: ` ```python `, ` ```typescript `, ` ```terraform `. Der Export schreibt die Kennungen von VS Code bzw. Shiki; der Import versteht auch Kürzel und ältere Namen (`js`, `ts`, `py`, `sh`, `yml`, `cpp`, `csharp`, `plaintext` …) und speichert sie mit der vollen Kennung (` ```js ` wird zu JavaScript, beim nächsten Export ` ```javascript `). Unbekannte Sprachen bleiben erhalten und erscheinen im Block als „(importiert)“, ohne Hervorhebung.

Zeilennummern, hervorgehobene Zeilen, Ansicht und Einklappen stehen hinter der Sprache im Zaun, in der üblichen Schreibweise: ` ```ts {3-5} showLineNumbers startLine=10 `, dazu `view=preview`/`view=split`/`view=code`, `collapsed` und `collapsedLines=15`. Der Import versteht auch `showLineNumbers{10}` (rehype-pretty-code), `showLineNumbers=10` und `hl_lines="3 4"`/`linenums="10"` (MkDocs). Die Nummern in `{…}` zählen ab der ersten Zeile des Blocks, unabhängig von der Startnummer. ` ```mermaid `-Zäune werden zu Codeblöcken, die das Diagramm zeigen.

## Einrücken

- <kbd>Tab</kbd> am Anfang eines Absatzes oder einer Überschrift rückt ein (bis zu acht Stufen), <kbd>⇧</kbd> <kbd>Tab</kbd> rückt zurück.
- <kbd>Backspace</kbd> am Anfang einer eingerückten Zeile nimmt zuerst eine Stufe weg.
- In Listen verschachtelt <kbd>Tab</kbd> den Eintrag unter den vorigen, in Codeblöcken fügt es zwei Leerzeichen ein.

## Blöcke verschieben

Links neben einem Block erscheint ein Griff (`⋮⋮`) – damit die Seite ruhig bleibt, nur dort, wo du gerade bist: am Block unter dem Mauszeiger und am Block mit dem Cursor. Mit der Tastatur erreichst du die Griffe weiterhin (<kbd>Tab</kbd> außerhalb des Textes); ein Griff mit Tastaturfokus ist immer sichtbar und umrandet. Auf Touch-Geräten hat nur der Block mit dem Cursor einen Griff, groß genug zum Antippen – tippe also zuerst in den Block. Leere Absätze haben keinen Griff, solange der Cursor nicht darin steht. Wer alle Griffe wie früher sehen möchte, schaltet **Einstellungen → Darstellung & Sprache → Editor → Griffe immer anzeigen** ein (auf diesem Gerät). Im Lesemodus und auf gesperrten Seiten gibt es keine Griffe.

Ziehen zeigt eine Einfügelinie – auch in Hinweise, Zitate oder Spalten hinein; nach dem Loslassen gleitet der Block an die neue Stelle.

Ein Klick auf den Griff öffnet das **Blockmenü** (am Handy von unten):

- **Nach oben** / **Nach unten** – am Nachbarn vorbei
- **Verschieben unter …** – direkt unter eine Überschrift der Seite, an den Anfang oder ans Ende
- **Duplizieren** und **Löschen**
- **Umwandeln in …** – Text, Überschrift 1–3, Aufzählung, nummerierte Liste, Aufgabenliste, Zitat, Hinweis oder Code; Listenpunkte wechseln die Listenart, Zitate und Hinweise lassen sich auflösen
- **Hinweistyp**, **Symbol** und **Farbe** (Hinweise), **Breite** (Videos und Einbettungen) und **Textrichtung**, wo sie passen
- **Mehrere auswählen** – der Auswahlmodus

Im **Auswahlmodus** stehen Kreise statt der Griffe. Ein Tipp wählt einen Block aus, ein weiterer erweitert die Auswahl bis dorthin; sind alle Punkte einer Liste gewählt, gilt die ganze Liste. Die Leiste unten verschiebt, dupliziert, verschiebt unter eine Überschrift oder löscht die Auswahl, **⋯** hat den Rest des Blockmenüs. **Fertig** oder <kbd>Esc</kbd> beendet den Modus.

Listenpunkte und Aufgaben bleiben beim Verschieben, was sie sind: Außerhalb ihrer Liste bilden sie eine eigene Liste derselben Art, ein nummerierter Punkt behält seine Nummer. Direkt neben einer passenden Liste werden sie Teil davon; in einer anderen Listenart passen sie sich an.

<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>↑</kbd>/<kbd>↓</kbd> verschiebt den aktuellen Block unter seinen Nachbarn. Jede Blockaktion lässt sich einzeln rückgängig machen.

## Als Markdown bearbeiten

**Seitenmenü … → Als Markdown bearbeiten** zeigt die ganze Seite als Markdown-Text mit Zeilennummern – praktisch für große Umbauten, Suchen und Ersetzen oder wenn du lieber in Markdown schreibst.

- **Übernehmen** (<kbd>⌘</kbd> <kbd>Enter</kbd>) speichert vorher eine Version und ersetzt den Inhalt in einem Schritt; **Rückgängig** nimmt die Änderung zurück.
- Blöcke ohne Markdown-Form – Einbettungen, Whiteboards, verknüpfte Datenbanken, synchronisierte Blöcke, Spalten, Tabellen mit verbundenen Zellen oder Breiten, Bilder mit Größe, Funktionsgraphen, Kennzahlen und Literaturverzeichnisse – stehen als Markierung `<!-- flowplan:block … -->` im Text. Du kannst sie verschieben oder löschen, aber nicht ändern; sie kommen unverändert zurück. Wird eine gelöscht, fragt Flowplan vor dem Übernehmen nach.
- Formatierungen ohne Markdown-Form (Farben, Hochstellen, Spoiler, Erwähnungen, Zitate) bleiben als HTML im Text erhalten.
- **Ausrichtung, Einzug, Textrichtung und Reaktionen** gehen beim Übernehmen verloren; die Ansicht nennt vorher, was betroffen ist.
- Ändert jemand die Seite, während du im Markdown schreibst, erscheint ein Hinweis; **Trotzdem übernehmen** überschreibt dann deren Änderungen.
- Wer nur lesen darf – auch bei gesperrten Seiten und im Lesemodus –, sieht **Als Markdown anzeigen** ohne Übernehmen.

## Textrichtung

Absätze, Überschriften, Listen, Zitate, Hinweise und Tabellenzellen in Arabisch, Hebräisch oder Persisch laufen **automatisch von rechts nach links**: Die Richtung folgt dem ersten Buchstaben des Blocks. Aufzählungszeichen, Kästchen, Zitatbalken, Hinweissymbole und Blockgriffe stehen dann rechts.

Im Blockmenü (Klick auf den Griff `⋮⋮`) → **Textrichtung** legst du für einen Block und alles darin **Automatisch**, **Links nach rechts** oder **Rechts nach links** fest. Die Richtung bleibt im HTML-Export erhalten; Markdown kennt sie nicht.

## Weitere Blöcke

- **Inhaltsverzeichnis**: listet die Überschriften der Seite und springt per Klick dorthin.
- **Zwei Spalten**: Blöcke nebeneinander; auf dem Smartphone untereinander.
- **Verknüpfte Datenbank**: eine Ansicht einer vorhandenen Datenbank mit eigenen Filtern und Sortierungen; Änderungen an Einträgen landen in der Quelle. Siehe [Ansichten](/views#verknuepfte-datenbanken).
- **Whiteboard**: ein Whiteboard direkt im Dokument; der Knopf oben rechts öffnet es groß.
- **Zeichnen** (`/zeichnen`): ein Block für Handschrift über die ganze Breite, leer, liniert oder kariert, in der Höhe ziehbar; mehrere Personen zeichnen gleichzeitig, ohne sich zu überschreiben. Siehe [Handschrift in Dokumenten](/notebooks#handschrift-in-dokumenten).
