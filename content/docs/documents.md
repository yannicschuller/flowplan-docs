---
keywords: Editor, Blöcke, Blockmenü, Slash, Markdown, schreiben, Absatz, Griff, Tabelle, Auswahl, verschieben
new: aufklappbare-bloecke 2026-11-12
---

# Dokumente und Editor

Der Editor arbeitet mit Blöcken: Jeder Absatz, jede Liste, Tabelle oder Einbettung ist ein Block, den du einfügen, formatieren, einrücken und [verschieben](/blocks) kannst. Gespeichert wird laufend, auch ohne Verbindung.

![Eine Projektseite im Editor: oben die Werkzeugleiste, darunter ein blauer Hinweis-Block mit dem Ziel, eine Zeile mit vier erwähnten Personen und Datum, Überschriften und eine Aufzählung; links der Seitenbaum des Bereichs](/screenshots/document-light.webp "Ein Dokument mit Werkzeugleiste, Hinweis-Block, Erwähnungen und Überschriften.")

**Mehr zum Thema:** [Blöcke bearbeiten](/blocks) · [Markdown im Editor](/markdown-editor) · [Formatieren, Hinweise und Beschriftungen](/formatting) · [Aufgaben in Dokumenten](/tasks-in-documents) · [Bilder, Dateien und Sprachnotizen](/media-and-files) · [Formeln, Diagramme, Code und Rechnen](/math-and-code) · [Links, Erwähnungen und Graph](/links-and-mentions) · [Fußnoten, Zitate und Literatur](/academic-writing) · [Lesen, Präsentieren und Überblick](/reading-and-presenting) · [Drucken und PDF](/print-and-pdf)

## Das Blockmenü mit /

Am Zeilenanfang oder nach einem Leerzeichen öffnet `/` das Blockmenü direkt an der Schreibmarke. Weitertippen filtert: `/h2`, `/todo`, `/code`, `/tab`. Pfeiltasten wählen, <kbd>Enter</kbd> oder <kbd>Tab</kbd> fügt ein, <kbd>Esc</kbd> schließt.

> [!TIP]
> Einen normalen Schrägstrich schreibst du, indem du nach `/` ein Leerzeichen tippst oder das Menü mit <kbd>Esc</kbd> schließt. In Codeblöcken ist `/` immer ein gewöhnliches Zeichen.

| Block | Kürzel im Menü | Wofür |
| --- | --- | --- |
| Text | `/text` | Normaler Absatz |
| Überschrift 1–4 | `/h1`, `/h2`, `/h3`, `/h4` | Gliederung; erscheinen im Inhaltsverzeichnis |
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

**Tabellen:** Tabellen sind kompakt – niedrige Zeilen, linksbündige Kopfzeile, so breit wie ihr Inhalt (gezogene Spaltenbreiten bleiben). Zeigst du auf eine Spaltengrenze, erscheint eine blaue Linie; zieh sie, um die Spalte breiter oder schmaler zu machen. Zeigst du auf eine Zelle, erscheinen zwei Griffe ⋮⋮: links am Rand ihrer Zeile und oben am Rand ihrer Spalte. Ein Klick wählt die Zeile oder Spalte aus (blau umrandet) und öffnet ihr Menü: Suchfeld, **Farbe** (Text oder Hintergrund), **Zeile darüber/darunter einfügen** bzw. **Spalte links/rechts einfügen**, **Duplizieren** (++⌘ D++), **Inhalt löschen**, **Zeile/Spalte löschen**, **Kopfzeile** bzw. **Kopfspalte**, **Beschriftung** und **In Datenbank umwandeln**. Ziehst du einen Griff, verschiebst du die Zeile oder Spalte – eine Linie zeigt, wo sie landet; die Kopfzeile bleibt dabei die erste Zeile. Mit ausgewählter Zeile verschiebt ++⌘ ⇧ ↑/↓++ sie (++⌘ ⇧ ←/→++ eine Spalte). Die **+**-Leisten unter der Tabelle und an ihrem rechten Rand fügen eine Zeile bzw. Spalte am Ende an. Ziehst du über mehrere Zellen, bekommt die Auswahl oben rechts einen Knopf mit **Farbe**, **Inhalt löschen**, **Zellen verbinden** und **Zelle teilen**. Zeilen über verbundene Zellen hinweg und Spalten in Tabellen mit verbundenen Zellen lassen sich nicht verschieben. Auf Smartphone und Tablet erscheinen Griffe und **+**-Leisten an der Zelle, in die du tippst; das Menü öffnet sich als Blatt von unten. Zellfarben bleiben im Markdown-Export erhalten (als Kommentar vor der Tabelle, den andere Programme ignorieren) und werden beim Import wieder zu Farben. <kbd>Tab</kbd> springt zur nächsten Zelle und legt in der letzten Zelle eine neue Zeile an.

**Tabelle in Datenbank umwandeln:** Wird aus einer Tabelle mehr, wählst du im Menü eines Zeilen- oder Spaltengriffs **In Datenbank umwandeln**. Flowplan legt daraus eine [Datenbank](/databases) unter dem Dokument an und setzt an die Stelle der Tabelle eine eingebettete Ansicht davon. Die erste Zeile liefert die Spaltennamen, die erste Spalte wird zum Titel der Einträge. Die übrigen Spalten bekommen ihren Typ aus den ausgefüllten Zellen: Zahl (mit deutschem oder englischem Trennzeichen), Datum (`2026-11-04` oder `04.11.2026`), Checkbox (✓, x, ja/nein, yes/no, true/false), URL, sonst Text. Benannt wird die Datenbank nach der Beschriftung der Tabelle, sonst nach der nächsten Überschrift darüber, sonst „Tabelle“. Mit ++⌘/Strg Z++ kommt die Tabelle zurück. Grenzen wie beim CSV-Import: bis 80 Spalten und 5.000 Zeilen. In verschlüsselten Bereichen gibt es den Punkt nicht; in einem Datenbankeintrag landet die neue Datenbank oben im Bereich.

**Tastatur ausblenden (Handy):** Beim Schreiben sitzt die Formatierungsleiste über der Bildschirmtastatur. Der letzte Knopf rechts, **Tastatur ausblenden**, schließt die Tastatur, damit du mehr vom Dokument siehst; Text und Cursorposition bleiben. Ein Tipp in den Text holt sie zurück. Im Inhalt eines Datenbank-Eintrags sitzt die Leiste beim Schreiben genauso über der Tastatur. Bei allen anderen Textfeldern – Titel von Seiten, Datenbanken und Einträgen, Tags, Eigenschaften, der Name im Dialog **Neue Seite**, Suchfelder, Kommentare – erscheint derselbe Knopf als runder Knopf rechts direkt über der Tastatur. Das gilt im Browser und in den Apps.

## Aufklappbare Blöcke

Ein **aufklappbarer Block** hat einen Titel und darunter Inhalt, der sich ein- und ausklappen lässt. Du legst ihn mit `/toggle` an oder tippst am Anfang einer leeren Zeile `>` und ein Leerzeichen. Der Cursor steht dann im leeren Titel (grau „Aufklappbarer Block“); Text, der schon hinter `>` steht, wird zum Titel.

- **Ein- und ausklappen:** Klick (oder Tipp) auf den Pfeil vor dem Titel. Mit der Tastatur: ++⌘ ⌥ Enter++ (Windows/Linux: ++Strg Alt Enter++) im Inhalt klappt ein und setzt den Cursor in den Titel, dort klappen dieselben Tasten wieder auf.
- **Titel bearbeiten:** Ein Klick in den Titel setzt den Cursor hinein. Bei einem aufgeklappten Block springen <kbd>Enter</kbd> oder <kbd>↓</kbd> in den Inhalt, <kbd>↑</kbd> am Anfang des Inhalts zurück in den Titel. Bei einem eingeklappten Block klappt <kbd>↓</kbd> ihn auf und springt in den Inhalt.
- **Liste aus aufklappbaren Blöcken:** <kbd>Enter</kbd> am Ende des Titels eines **eingeklappten** Blocks legt direkt darunter einen neuen, eingeklappten Block an, der Cursor steht in seinem Titel – praktisch für häufige Fragen. <kbd>Enter</kbd> in einem **leeren** Titel beendet die Liste: Der Block wird ein normaler Absatz, sein Inhalt bleibt darunter stehen.
- **Aus vorhandenem Text:** Im Blockmenü macht **Umwandeln in … → Aufklappbarer Block** aus einem Absatz einen aufklappbaren Block mit dem Text als Titel. Aus einem Listenpunkt wird ein Block mit dem Text des Punkts als Titel, seine eingerückten Unterpunkte kommen in den Inhalt. Ein Mal **Rückgängig** macht das wieder rückgängig.
- **Aufklappbare Überschrift:** **Umwandeln in … → Aufklappbare Überschrift 1–4** zeigt den Titel als Überschrift. In Markdown steht er dann als Überschrift in `<summary>` (`<summary><h2>Titel</h2></summary>`), wie GitHub es darstellt.
- **Zurück zu Text:** **Umwandeln in** macht aus einem aufklappbaren Block wieder Text, eine Überschrift, eine Liste, ein Zitat, einen Hinweis oder Code: Der Titel wird der Block, der Inhalt folgt darunter. <kbd>⌫</kbd> am Anfang des Titels macht ihn ebenso zu normalem Text.
- **Hineinschieben mit Tab:** <kbd>Tab</kbd> am Anfang eines Blocks direkt unter einem aufklappbaren Block schiebt ihn hinein, als letzten Block des Inhalts. Das geht mit Absätzen, Überschriften, Zitaten, Hinweisen, weiteren aufklappbaren Blöcken und den ersten Punkten einer Liste; ein eingeklappter Block klappt dabei auf. Was eingerückt ist, gehört also dazu und verschwindet beim Einklappen mit. ++⇧ Tab++ schiebt einen Block wieder heraus, direkt unter den aufklappbaren Block; die Blöcke darunter bleiben drin. Ein Mal **Rückgängig** nimmt jeden Schritt zurück.
- **Verschachteln:** <kbd>Tab</kbd> im Titel schiebt den ganzen aufklappbaren Block in den aufklappbaren Block darüber (oder unter den letzten Punkt einer Liste darüber), ++⇧ Tab++ holt ihn wieder heraus. Der Cursor bleibt im Titel, und <kbd>Tab</kbd> verlässt von dort nie das Dokument. Zum Rückgängigmachen erst <kbd>Esc</kbd> drücken – im Titel nimmt ++⌘/Strg Z++ nur das Tippen im Titel zurück.
- **Was dazugehört:** Fährst du mit der Maus über den Pfeil oder den Griff ⋮⋮ eines aufklappbaren Blocks, wird der ganze Block (Titel und Inhalt) leicht hinterlegt. Der Inhalt ist genau um eine Tab-Stufe eingerückt.
- **Nichts geht verloren:** Kommt der Cursor in einen eingeklappten Block (Pfeiltasten, Rückgängig) oder springt **Auf der Seite suchen** zu einem Treffer darin, klappt er auf. Klappst du ein, während der Cursor darin steht, wandert der Cursor vor den Block.
- **Nur für dich:** Wie bei [eingeklappten Abschnitten](/reading-and-presenting#abschnitte-einklappen) ändert das Einklappen das Dokument nicht – andere, die gleichzeitig bearbeiten, sehen ihren eigenen Zustand. Was du eingeklappt hast, merkt sich dein Browser bzw. die App auf diesem Gerät für dein Konto: Beim nächsten Öffnen der Seite ist es wieder eingeklappt. Auf einem anderen Gerät sind die Blöcke aufgeklappt. Gespeichert, exportiert (Markdown `<details>`, HTML) und veröffentlicht wird ein Block immer aufgeklappt; Lesende klappen dort selbst ein. Auch bei importierten oder per API erstellten Seiten merkt sich Flowplan, was du eingeklappt hast. Ein Block ohne Titel wird in Markdown mit leerem `<summary></summary>` exportiert und kommt beim Import genauso zurück.
- Im **Lesemodus** klappt ein Klick auf die ganze Titelzeile ein und aus.

## Synchronisierte Blöcke

Ein synchronisierter Block (`/sync` → **Synchronisierter Block**) ist Inhalt, der an mehreren Stellen derselbe ist – etwa Kontaktdaten, eine Checkliste oder ein Statushinweis. **Synchronisierten Block einfügen** zeigt ihn auf einer weiteren Seite. Bearbeiten geht überall; die Änderung erscheint auf allen Seiten, bei geöffneten Seiten live.

- Der orange Rahmen kennzeichnet den Block, oben stehen die Zahl der Seiten und die Seite, auf der er entstanden ist.
- Der Papierkorb im Rahmen entfernt den Block nur an dieser Stelle; an den anderen bleibt er.
- Die Rechte kommen von der Seite, auf der der Block entstanden ist: Wer dort nicht lesen darf, sieht statt des Inhalts einen Hinweis.
- Die Suche findet den Text auf der Ursprungsseite. Auf veröffentlichten Seiten erscheint der Block nicht.

## Weitere Blöcke

- **Inhaltsverzeichnis**: listet die Überschriften der Seite und springt per Klick dorthin.
- **Zwei Spalten**: Blöcke nebeneinander; auf dem Smartphone untereinander.
- **Verknüpfte Datenbank**: eine Ansicht einer vorhandenen Datenbank mit eigenen Filtern und Sortierungen; Änderungen an Einträgen landen in der Quelle. Siehe [Ansichten](/views#verknuepfte-datenbanken).
- **Whiteboard**: ein Whiteboard direkt im Dokument; der Knopf oben rechts öffnet es groß.
- **Zeichnen** (`/zeichnen`): ein Block für Handschrift über die ganze Breite, leer, liniert oder kariert, in der Höhe ziehbar; mehrere Personen zeichnen gleichzeitig, ohne sich zu überschreiben. Siehe [Handschrift in Dokumenten](/notebooks#handschrift-in-dokumenten).
