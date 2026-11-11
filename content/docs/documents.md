# Dokumente und Editor

Der Editor arbeitet mit Blöcken: Jeder Absatz, jede Liste, Tabelle oder Einbettung ist ein Block, den du einfügen, formatieren, einrücken und verschieben kannst. Gespeichert wird laufend, auch ohne Verbindung.

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
| KI | `/ki`, `/ai` | Text mit der [KI](/ai#schreibassistent) schreiben lassen (wenn eingeschaltet) |
| Fußnote | `/fußnote`, `/footnote` | Nummerierte Anmerkung am Seitenende ([Fußnoten](#fussnoten)) |
| Literaturzitat | `/zitat`, `/cite` | Quelle zitieren – DOI, BibTeX oder Zotero ([Zitate](#zitate-und-literaturverzeichnis)) |
| Literaturverzeichnis | `/literatur`, `/bibliography` | Alle zitierten Werke als Liste |

**Tabellen:** Steht der Cursor in einer Tabelle, erscheint direkt darunter eine kleine Leiste: Zeile darüber oder darunter, Spalte links oder rechts einfügen; unter **…** Kopfzeile ein/aus, Zeile, Spalte oder die ganze Tabelle löschen. Ist das Ende der Tabelle nicht zu sehen, bleibt die Leiste unten im sichtbaren Bereich – auf dem Handy über der Tastatur. <kbd>Tab</kbd> springt zur nächsten Zelle und legt in der letzten Zelle eine neue Zeile an.

**Tabelle in Datenbank umwandeln:** Wird aus einer Tabelle mehr, wählst du in der Tabellenleiste unter **…** den Punkt **In Datenbank umwandeln**. Flowplan legt daraus eine [Datenbank](/databases) unter dem Dokument an und setzt an die Stelle der Tabelle eine eingebettete Ansicht davon. Die erste Zeile liefert die Spaltennamen, die erste Spalte wird zum Titel der Einträge. Die übrigen Spalten bekommen ihren Typ aus den ausgefüllten Zellen: Zahl (mit deutschem oder englischem Trennzeichen), Datum (`2026-11-04` oder `04.11.2026`), Checkbox (✓, x, ja/nein, yes/no, true/false), URL, sonst Text. Benannt wird die Datenbank nach der Beschriftung der Tabelle, sonst nach der nächsten Überschrift darüber, sonst „Tabelle“. Mit <kbd>⌘</kbd>/<kbd>Strg</kbd>+<kbd>Z</kbd> kommt die Tabelle zurück. Grenzen wie beim CSV-Import: bis 80 Spalten und 5.000 Zeilen. In verschlüsselten Bereichen gibt es den Punkt nicht; in einem Datenbankeintrag landet die neue Datenbank oben im Bereich.

**Tastatur ausblenden (Handy):** Beim Schreiben sitzt die Formatierungsleiste über der Bildschirmtastatur. Der letzte Knopf rechts, **Tastatur ausblenden**, schließt die Tastatur, damit du mehr vom Dokument siehst; Text und Cursorposition bleiben. Ein Tipp in den Text holt sie zurück. Im Inhalt eines Datenbank-Eintrags sitzt die Leiste beim Schreiben genauso über der Tastatur. Bei allen anderen Textfeldern – Titel von Seiten, Datenbanken und Einträgen, Tags, Eigenschaften, der Name im Dialog **Neue Seite**, Suchfelder, Kommentare – erscheint derselbe Knopf als runder Knopf rechts direkt über der Tastatur. Das gilt im Browser und in den Apps.

## Sprachnotizen und Besprechungen

`/sprachnotiz` öffnet die Aufnahme: Mikrofon antippen, sprechen, **Aufnahme beenden** – bis zu **zwei Stunden**, genug für eine Besprechung. Die Aufnahme lässt sich anhören oder verwerfen; **Einfügen** legt sie als Audio in die Seite (im Rahmen der Upload-Grenze der Instanz). Ist die Spracherkennung eingerichtet, folgt darunter das Gesprochene als Text; sonst bietet der Dialog nur das Audio an.

- **Lange Aufnahmen** gehen in Teilen an den Server, der sie zusammensetzt und an die Spracherkennung schickt. Die Größe begrenzt `WHISPER_MAX_MB` (Standard 200).
- **Transkript mit Zeitmarken:** Liefert die Spracherkennung Abschnitte mit Zeiten (OpenAI-kompatibles `verbose_json`, etwa faster-whisper-server, speaches oder whisper.cpp), erscheint ein aufklappbarer Block **Transkript · Dauer** mit einem Absatz je Passage und ihrer Zeitmarke (`00:04`, `1:02:05`).
- **Sprecher:** Nur wenn der Dienst selbst Sprecher trennt (Diarisierung, einzuschalten mit `WHISPER_DIARIZE=on` bei Servern, die `diarize` kennen) und je Abschnitt einen Sprecher zurückgibt, steht vor jeder Passage **Sprecher 1**, **Sprecher 2** … Flowplan rät keine Sprecher aus Pausen. Kennt der Dienst nur einfaches JSON, wird der Text wie bisher als Absätze eingefügt.
- **Danach mit KI zusammenfassen** fasst das Transkript zusammen ([Zusammenfassungen](/ai#zusammenfassungen)).
- **In den Apps** für iPhone, iPad und Android nimmt die App auf; iPhone und iPad machen auf dem Gerät Text daraus, ohne Spracherkennung auf dem Server ([Sprachnotizen in Seiten](/offline-and-apps#sprachnotizen-in-seiten)).
- **Aufgaben und Zusammenfassung erzeugen** (wenn [KI-Aktionen](/ai#ki-aktionen) für dich eingeschaltet sind): Die KI schlägt eine Zusammenfassung mit Beschlüssen und eine Aufgabenliste mit verantwortlichen Personen und Terminen vor – als Vorschau mit Kästchen; erst **Ausführen** fügt sie in die Seite ein.

## Inhaltsverzeichnis

Das Listen-Symbol oben rechts im Dokument öffnet das **Inhaltsverzeichnis** neben dem Text – in allen Dokumenten, auch in Journal-Tagen und Einträgen einer Datenbank. Es entsteht aus den Überschriften und wächst beim Schreiben mit, markiert den Abschnitt, in dem du gerade liest, und springt per Klick zur Überschrift. Ob es offen ist, merkt sich Flowplan in diesem Browser für alle Dokumente. Auf dem Handy öffnet es ein runder Knopf unten rechts.

## Abschnitte einklappen

Jede Überschrift lässt sich **einklappen**: Der kleine Pfeil links neben der Überschrift (erscheint beim Darüberfahren; auf Touch-Geräten und bei eingeklappten Überschriften immer) blendet alles darunter aus – bis zur nächsten Überschrift derselben oder einer höheren Ebene. Eine eingeklappte Überschrift zeigt dahinter, wie viel verborgen ist (**… 3 Blöcke**); ein zweiter Klick klappt wieder aus. Steht der Cursor in der Überschrift, geht das auch mit <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>Enter</kbd>. Auf dem Handy sitzt der Pfeil am Ende der Überschrift, in Texten von rechts nach links auf der anderen Seite.

- **Alle Abschnitte einklappen / ausklappen:** im Seitenmenü `⋯` eines Dokuments, oben im [Inhaltsverzeichnis](#inhaltsverzeichnis), in der Schnellsuche (`> abschnitte`) oder mit <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>X</kbd> bzw. <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>O</kbd> ([änderbar](/keyboard-shortcuts#eigene-tastenkuerzel)). Ist ein Datenbank-Eintrag offen, gilt es für seinen Text.
- **Nur für dich:** Was eingeklappt ist, merkt sich dieses Gerät (pro Seite bzw. Eintrag) – es ändert das Dokument nicht, andere sehen alles wie bisher. Neu geöffnete Dokumente sind ausgeklappt.
- **Nichts geht verloren:** Kommt der Cursor in einen eingeklappten Teil (Pfeiltasten, Rückgängig, ein Klick im Inhaltsverzeichnis), klappt er auf. Ebenso, wenn **Auf der Seite suchen** (<kbd>⌘</kbd> <kbd>F</kbd>) einen Treffer darin anspringt oder ein Suchtreffer, Rückverweis oder eine Benachrichtigung dorthin führt. In der eingeklappten Überschrift selbst kannst du weiterschreiben, sie bleibt eingeklappt.
- **Verschieben:** Ziehst du eine eingeklappte Überschrift am Griff `⋮⋮` (oder verschiebst sie mit <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>↑</kbd>/<kbd>↓</kbd>), wandert ihr ganzer Abschnitt mit.
- **Drucken und PDF** zeigen immer alles; ebenso Export, Präsentation und veröffentlichte Seiten.
- Einklappen lassen sich Überschriften direkt im Dokument – auch im Lesemodus und in [verschlüsselten Bereichen](/encrypted-spaces). Überschriften in Hinweisen, Toggles, Tabellen, Spalten oder Listen haben keinen Pfeil; solche Blöcke gehören einfach zum Abschnitt, in dem sie stehen.

## Aufklappbare Blöcke

Ein **aufklappbarer Block** (`/toggle`) hat einen Titel und darunter Inhalt, der sich ein- und ausklappen lässt.

- **Ein- und ausklappen:** Klick (oder Tipp) auf den Pfeil vor dem Titel. Mit der Tastatur: <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>Enter</kbd> (Windows/Linux: <kbd>Strg</kbd> <kbd>Alt</kbd> <kbd>Enter</kbd>) im Inhalt klappt ein und setzt den Cursor in den Titel, dort klappen dieselben Tasten wieder auf.
- **Titel bearbeiten:** Ein Klick in den Titel setzt den Cursor hinein. <kbd>Enter</kbd> oder <kbd>↓</kbd> springt in den Inhalt (und klappt ihn auf), <kbd>↑</kbd> am Anfang des Inhalts zurück in den Titel.
- **Nichts geht verloren:** Kommt der Cursor in einen eingeklappten Block (Pfeiltasten, Rückgängig) oder springt **Auf der Seite suchen** zu einem Treffer darin, klappt er auf. Klappst du ein, während der Cursor darin steht, wandert der Cursor vor den Block.
- **Nur für dich:** Wie bei [eingeklappten Abschnitten](#abschnitte-einklappen) ändert das Einklappen das Dokument nicht – andere, die gleichzeitig bearbeiten, sehen ihren eigenen Zustand, und beim nächsten Öffnen ist der Block wieder aufgeklappt. Gespeichert, exportiert (Markdown `<details>`, HTML) und veröffentlicht wird er immer aufgeklappt; Lesende klappen dort selbst ein.
- Im **Lesemodus** klappt ein Klick auf die ganze Titelzeile ein und aus.

## Antworten aus ChatGPT einfügen

Text, den du aus ChatGPT oder einem anderen Assistenten kopierst, wird beim Einfügen formatiert: Formeln in LaTeX (`\[ … \]`, `\( … \)`, `$$ … $$`) werden zu Formelblöcken und Formeln im Satz, Markdown (Überschriften, **fett**, Listen, Tabellen) wird umgesetzt, Zeilen mit Tabulatoren werden zur Tabelle, `☐` zur Aufgabenliste, und jede Zeile wird ein eigener Absatz. Aus der Webseite kopierte, bereits gerenderte Formeln bleiben als Formel erhalten. Das gilt auch für das Kopieren direkt aus der ChatGPT-Webseite. Stehen Formeln schon als Text im Dokument (etwa `\[ A(3;2;1) \]`), markiere sie – oder alles mit <kbd>⌘</kbd>/<kbd>Strg</kbd>+<kbd>A</kbd> – und wähle im Textmenü **In Formeln umwandeln**. Gewöhnlicher Text wird wie bisher eingefügt.

## Hinweise

Hinweise gibt es in fünf Arten, wie bei GitHub, Forgejo und Obsidian: **Hinweis** (blau), **Tipp** (grün), **Wichtig** (lila), **Warnung** (gelb) und **Achtung** (rot). Jede Art hat ihr Symbol und ihren Titel in der Sprache der Lesenden. Steht der Cursor in einem Hinweis, ändert `/tipp`, `/warnung` usw. seine Art; ebenso das Blockmenü (Klick auf den Griff `⋮⋮`) → **Hinweistyp**.

### Eigenes Symbol und eigene Farbe

Damit ein Hinweis auch für anderes taugt – eine Idee 💡, ein Termin 📅, ein Merksatz ★ –, bekommt er im Blockmenü ein eigenes Symbol und eine eigene Farbe:

- **Symbol** → **Emoji oder Zeichen wählen …** öffnet die Emoji-Auswahl (dieselbe wie für Seitensymbole, mit Suche, Kategorien und Hautton). Unter **Oder ein eigenes Zeichen** tippst du auch ein Zeichen wie ★, → oder ✓ ein – erlaubt ist genau ein Emoji oder Symbolzeichen, keine Buchstaben, Ziffern, Satzzeichen oder Leerzeichen. **Symbol entfernen** stellt das Symbol der Art wieder her.
- **Farbe** bietet die neun Textfarben (Grau, Braun, Orange, Gelb, Grün, Blau, Lila, Pink, Rot); **Standard** nimmt wieder die Farbe der Art. Die Farben sind im hellen und im dunklen Design gut lesbar.

Die Art bleibt dabei erhalten: Sie gibt den Titel („Tipp“, „Warnung“ …) und gilt beim Markdown-Export. Symbol und Farbe bleiben beim Kopieren, Duplizieren, in Vorlagen, Versionen, veröffentlichten Seiten, beim Drucken sowie im PDF-, EPUB- und Word-Export erhalten. In [verschlüsselten Bereichen](/encrypted-spaces) gibt es keine Hinweise.

### Hinweise in Markdown

Beim Markdown-Export werden Hinweise zu GitHub-Hinweisen (`> [!WARNING]`). Ein eigenes Symbol steht am Anfang des Textes, eine eigene Farbe als Kommentar am Ende, den GitHub nicht anzeigt:

```markdown
> [!TIP]
>
> 💡 Mit / geht es schneller.
>
> <!-- flowplan:callout color=green -->
```

Beim Import (Markdown, ZIP, Notion) werden `> [!NOTE]` bis `> [!CAUTION]` wieder zu Hinweisen der passenden Art; die weiteren Arten von Obsidian landen bei der nächstliegenden (etwa `danger` → Achtung, `hint` → Tipp), ein eigener Titel (`> [!WARNING] Vorher lesen`) wird zur fetten ersten Zeile. Steht am Anfang des Textes ein einzelnes Emoji oder Symbol mit Leerzeichen dahinter, wird es zum Symbol des Hinweises; der Farbkommentar stellt die Farbe wieder her. Hinweise aus Notions Markdown-Export (`<aside>💡 …</aside>`) werden zu Hinweisen mit ihrem Emoji.

## Lesemodus

Das Buch-Symbol oben in der Leiste (auf dem Telefon **Lesemodus** im Menü `⋯`, oder <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>E</kbd>, Schnellsuche → `> lesemodus`) öffnet ein Dokument **nur zum Lesen**: Nichts lässt sich versehentlich ändern, Griffe und Blockmenü verschwinden – praktisch auf dem Handy und beim Vorlesen oder Präsentieren. Der Stift wechselt zurück zum Bearbeiten. Das Gerät merkt sich den Modus pro Seite; die Rechte ändern sich dadurch nicht, und andere sehen weiter ihren eigenen Modus. Datenbank-Einträge haben dasselbe Buch-Symbol oben im Eintrag (siehe [Datenbanken](/databases)).

Der Lesemodus gilt auch für alles, was in der Seite eingebettet ist: In **verknüpften Datenbanken** lassen sich keine Zellen bearbeiten, keine Einträge anlegen, löschen oder verschieben und keine Ansichten ändern; ein von dort geöffneter Eintrag ist ebenfalls nur lesbar. Änderungen anderer erscheinen weiter live. Synchronisierte Blöcke, Zeichnungen, Kennzahlen, Funktionsgraphen und Erweiterungsblöcke sind im Lesemodus ebenfalls gesperrt.

## Fokusmodus

**Fokusmodus** (Schnellsuche → `> fokus`) blendet Seitenleiste, Werkzeugleiste und Seitenrand aus; die obere Leiste erscheint erst beim Darüberfahren. Unten zählt eine Leiste die Wörter der Seite und die in dieser Sitzung hinzugekommenen. Mit einem **Ziel** (z. B. 500 Wörter) zeigt ein Balken den Fortschritt; das Ziel merkt sich das Gerät pro Seite. <kbd>Esc</kbd> beendet den Modus.

## Präsentieren

**Präsentieren** im Menü `…` oben rechts (oder <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>P</kbd>, Schnellsuche → `> präsentieren`) zeigt ein Dokument als Folien im Vollbild – ohne es umzubauen:

- Jede **Überschrift 1** beginnt eine neue Folie. Hat das Dokument keine, beginnt jede **Überschrift 2** eine. Eine **Trennlinie** (`---`) beginnt immer eine neue Folie.
- Was vor der ersten Überschrift steht, wird zur Titelfolie mit dem Seitentitel.
- Bilder, Tabellen, Code, Formeln und Diagramme werden so verkleinert, dass die Folie ganz auf den Bildschirm passt.

| Taste | Wirkung |
| --- | --- |
| <kbd>→</kbd>, <kbd>↓</kbd>, <kbd>Leertaste</kbd>, <kbd>Bild ↓</kbd> | Nächste Folie |
| <kbd>←</kbd>, <kbd>↑</kbd>, <kbd>Bild ↑</kbd> | Vorherige Folie |
| <kbd>Pos1</kbd> / <kbd>Ende</kbd> | Erste / letzte Folie |
| <kbd>Esc</kbd> | Präsentation beenden |

Ein Klick ins rechte Zwei-Drittel der Folie blättert weiter, ins linke Drittel zurück. Unten zeigen ein Zähler und ein Balken, wo du bist; die Leiste mit den Knöpfen blendet sich aus, solange die Maus ruht. Dort wechselst du auch zwischen **hellen und dunklen Folien**. Wer im System „Bewegung reduzieren“ eingestellt hat, sieht die Folien ohne Überblendung.

### Sprechernotizen und Referentenansicht

Ein **Hinweis** (`/hinweis`, Art „Hinweis“) als letzter Block einer Folie enthält die **Sprechernotizen**: Auf der Folie erscheint er nicht. **Referentenansicht** (Notizblock-Symbol in der Leiste) öffnet ein zweites Fenster mit der aktuellen und der nächsten Folie, den Notizen und der verstrichenen Zeit – praktisch auf dem Laptop, während der Beamer die Folien zeigt. Beide Fenster bleiben im Gleichschritt: Blättern geht in jedem von beiden.

### Folien als PDF

Das Drucker-Symbol in der Leiste druckt die Folien – jede auf eine eigene Seite im **Querformat**. Im Druckdialog **Als PDF sichern** wählen, um die Folien weiterzugeben.

## Synchronisierte Blöcke

Ein synchronisierter Block (`/sync` → **Synchronisierter Block**) ist Inhalt, der an mehreren Stellen derselbe ist – etwa Kontaktdaten, eine Checkliste oder ein Statushinweis. **Synchronisierten Block einfügen** zeigt ihn auf einer weiteren Seite. Bearbeiten geht überall; die Änderung erscheint auf allen Seiten, bei geöffneten Seiten live.

- Der orange Rahmen kennzeichnet den Block, oben stehen die Zahl der Seiten und die Seite, auf der er entstanden ist.
- Der Papierkorb im Rahmen entfernt den Block nur an dieser Stelle; an den anderen bleibt er.
- Die Rechte kommen von der Seite, auf der der Block entstanden ist: Wer dort nicht lesen darf, sieht statt des Inhalts einen Hinweis.
- Die Suche findet den Text auf der Ursprungsseite. Auf veröffentlichten Seiten erscheint der Block nicht.

## Aufgaben mit Person und Datum

Eine Aufgabe (`/todo` oder `[]` + Leerzeichen) mit einer Erwähnung wie `@Anna` ist Anna zugewiesen: Sie bekommt eine Benachrichtigung und findet die Aufgabe unter **Meine Aufgaben** in der Seitenleiste. Ein Datum setzt du, während der Cursor in der Aufgabe steht, mit dem Kalender-Knopf in der Werkzeugleiste oder über das Textmenü (Text markieren oder Rechtsklick → **Fälligkeit**). Das Datum erscheint als Chip rechts in der Zeile (heute hervorgehoben, überfällig rot); ein Klick darauf ändert es oder entfernt es mit **Datum entfernen**. Eine neue Aufgabe per <kbd>Enter</kbd> beginnt ohne Datum.

**Meine Aufgaben** sammelt alle Aufgaben, die dir gegeben wurden, deine eigenen Aufgaben mit Datum und alle Aufgaben aus deinen Journalen (auch ohne @Name und ohne Datum) – gruppiert nach Überfällig, Heute, Nächste 7 Tage, Später und Ohne Datum. Darunter folgen unter **Aus anderen Arbeitsbereichen** deine Aufgaben aus den übrigen Arbeitsbereichen, je Arbeitsbereich; ein Klick auf die Seite wechselt dorthin. Abhaken und Datum ändern wirkt direkt im Dokument, auch bei anderen, die es gerade geöffnet haben. Am Fälligkeitstag kommt morgens eine Erinnerung; die Zahl neben „Meine Aufgaben“ zeigt, wie viele heute fällig oder überfällig sind.

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

## Text formatieren

Text markieren öffnet die Formatierungsleiste: Überschrift, **Fett**, *Kursiv*, Unterstrichen, Durchgestrichen, Code, Link, Farbe und Hintergrundfarbe, Hoch- und Tiefgestellt, Inline-Formel, **Verdecken (Spoiler)** und **Text kommentieren**.

- Formatierungen gelten nur für die aktuelle Zeile. Nach <kbd>Enter</kbd> beginnt die neue Zeile als normaler Text – nur Listen und Aufgaben setzen sich mit einem neuen Eintrag fort, nach einer Überschrift folgt ein Absatz.
- **Umwandeln in**: Im Textmenü (auch per Rechtsklick in eine Zeile) wechselt eine Zeile ihren Typ, ohne dass der Text verloren geht – Text, Überschrift 1–3, Aufzählung, nummerierte Liste, Aufgabe, Zitat oder Codeblock. Der aktuelle Typ ist hervorgehoben.

### Spoiler

Verdeckter Text bleibt auch beim Schreiben verdeckt. Ein Klick auf die Fläche deckt ihn auf, ein weiterer verdeckt ihn wieder. <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>H</kbd> verdeckt die Auswahl. Auch auf Whiteboards lassen sich Zettel und Texte verdecken.

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

## Bilder, Dateien und Einbettungen

- **Einfügen aus der Zwischenablage** (<kbd>⌘</kbd> <kbd>V</kbd>) oder Hineinziehen lädt Bilder und Dateien hoch. Bilder lassen sich an den Rändern in der Größe ändern.
- **Fotos werden vor dem Hochladen verkleinert**: höchstens 2560 px an der längeren Seite, gespeichert als WebP. Die Kameradrehung bleibt erhalten, Metadaten wie der Aufnahmeort werden entfernt. GIFs, SVGs und Dateien, die kaum kleiner würden, bleiben unverändert. Anhänge in Dateien-Eigenschaften und Formularen werden im Original gespeichert.
- **PDFs** erscheinen als Karte mit einer Vorschau der ersten Seite. Ein Klick öffnet den PDF-Viewer mit allen Seiten, Zoom und **Herunterladen**. Mit zwei Fingern zoomst du stufenlos an der Stelle zwischen den Fingern und verschiebst die Seiten – wie in [Notizbüchern](/notebooks), auch beim bloßen Lesen; auf dem Trackpad mit der Pinch-Geste oder Strg + Scrollen. Die Knöpfe und <kbd>⌘</kbd> <kbd>+</kbd>/<kbd>−</kbd> ändern den Zoom in Schritten von 25 %. <kbd>Esc</kbd> schließt den Viewer. Dasselbe gilt für PDFs in den Medien, in Dateien-Eigenschaften von Datenbanken und auf veröffentlichten Seiten. In bearbeitbarem Text öffnet ein Link auf ein PDF den Viewer mit <kbd>⌘</kbd>-Klick. Im Viewer lässt sich auf dem PDF schreiben – siehe [PDFs anmerken](#pdfs-anmerken).
- **Bilder markieren**: Doppelklick auf ein Bild (oder den Stift in der Werkzeugleiste, solange das Bild ausgewählt ist) öffnet es zum Bearbeiten – mit **Stift**, **Textmarker**, **Pfeil**, **Rechteck**, **Kreis** und **Text**, sieben Farben und drei Strichstärken, Rückgängig mit <kbd>⌘</kbd> <kbd>Z</kbd>. **Speichern** legt ein neues Bild mit den Markierungen an; das Original und die Markierungen bleiben am Bild, sodass sie sich später ändern oder ganz entfernen lassen.
- Die **Medien** in der Seitenleiste sammeln alle Uploads des Arbeitsbereichs zum Wiederverwenden.

### Medien löschen

In den **Medien** wählst du Dateien über ihr Kästchen aus und legst sie mit **In den Papierkorb** (oder dem Papierkorb-Symbol an der Datei) in den Papierkorb. Das geht ohne Rückfrage, weil es sich rückgängig machen lässt. Löschen darf, wer die Seite der Datei bearbeiten darf; Leser und Gäste können es nicht.

- **Nicht verwendet**: Dateien, die in keiner Seite, keinem Eintrag, Whiteboard oder Kommentar des Arbeitsbereichs mehr vorkommen, tragen dieses Kennzeichen. Der Filter **Nicht verwendet** zeigt nur sie, **Alle unbenutzten löschen** legt sie nach einer Rückfrage gesammelt in den Papierkorb. Ältere Versionen im Versionsverlauf zählen nicht als Verwendung und können solche Dateien noch zeigen.
- Ein Bild aus einem Dokument zu entfernen, löscht die Datei nicht – sie gilt danach nur als nicht verwendet.
- Solange eine Datei im Papierkorb liegt, ist sie nirgends mehr abrufbar, auch nicht über Freigaben und Veröffentlichungen. Seiten, die sie noch zeigen, haben an ihrer Stelle einen Platzhalter **Datei fehlt**. Beim Wiederherstellen kommt sie unverändert zurück.
- Endgültig gelöscht wird sie – auch im Ordner `uploads` und in [Objektspeicher](/storage-and-backups) wie S3 – erst beim Leeren des Papierkorbs, mit **Endgültig löschen** oder nach Ablauf der Frist, siehe [Papierkorb](/pages-and-spaces#papierkorb). Bis dahin zählt sie zum Speicherplatz.
- **Einbetten** (`/embed`) nimmt eine Adresse entgegen: YouTube, Vimeo, Loom, Spotify, Figma und CodePen erscheinen als Player mit wählbarer Breite, andere Seiten als Linkkarte mit Titel und Vorschaubild.
- Links auf Seiten und Erwähnungen von Personen zeigen beim Überfahren eine Vorschau.
- Die maximale Dateigröße legt die Administration fest (Standard 10 MB).

### PDFs anmerken

Wer die Seite bearbeiten darf, zu der ein PDF gehört, findet im PDF-Viewer **Anmerken** (nicht in [verschlüsselten Bereichen](/encrypted-spaces) und auf gesperrten Seiten). Darunter erscheint eine Werkzeugleiste: **Stift** (mit dem Apple Pencil oder einem anderen Tablet-Stift folgt die Strichstärke dem Druck), **Textmarker** (durchscheinend, liegt unter der Schrift und der Tinte), **Radierer** (**Ganze Striche** oder **Teilweise** – dann verschwindet nur, was unter dem Radierer liegt), **Lasso**, **Text** und **Laserpointer** (zeigt etwas, ohne zu bleiben). Dazu Farben, drei Breiten, Rückgängig und Wiederholen (<kbd>⌘</kbd> <kbd>Z</kbd>, <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>Z</kbd>).

![Ein Fachartikel im PDF-Viewer beim Anmerken: markierte Sätze, eine eingekreiste Zahl in einer Tabelle und handschriftliche Notizen](/screenshots/pdf-annotate.webp "Ein PDF mit Textmarker und Stift angemerkt – gespeichert als Version.")

- **Lieblingsstifte**: Die drei Stifte neben den Werkzeugen merken sich Farbe und Breite; änderst du sie, während einer gewählt ist, ändert sich der Lieblingsstift mit. Sie gelten auf diesem Gerät.
- **Formen**: Halte den Stift am Ende eines Strichs kurz still – aus einer gezeichneten Linie wird eine gerade, aus einem Rechteck, Kreis, Dreieck oder einer Raute die saubere Form. Abschalten lässt sich das in den **Stifteinstellungen** (Zahnrad).
- **Lasso**: Umkreise Striche und Text, um sie zu verschieben, am Griff unten rechts zu vergrößern oder zu verkleinern, umzufärben, zu kopieren (<kbd>⌘</kbd> <kbd>C</kbd>, Einfügen mit <kbd>⌘</kbd> <kbd>V</kbd> – auch auf einer anderen Seite), zu duplizieren oder zu löschen.
- **Text** setzt du mit einem Tipp auf die Seite; ein Tipp auf vorhandenen Text ändert ihn. Mit Scribble schreibst du auf dem iPad mit dem Stift hinein.
- **Nur mit dem Stift zeichnen**: Sobald du auf einem Gerät mit dem Stift geschrieben hast, schreibt nur noch der Stift – Finger blättern und zoomen, eine aufliegende Hand hinterlässt keine Spuren. Die Einstellung teilen sich PDFs, Whiteboards und Bilder; abschalten lässt sie sich in den **Stifteinstellungen**, dann schreibt auch ein Finger, und zwei Finger blättern und zoomen.
- **Apple Pencil**: Das Radierer-Ende eines Stifts radiert. In der iPad-App wechselt Doppeltippen oder Drücken zum Radierer und zurück – wie in den iPad-Einstellungen festgelegt, oder in den **Stifteinstellungen** fest auf Radierer, letztes Werkzeug oder nichts.

Die Anmerkungen gehören zur Seite des PDFs, nicht zum Bildschirm: Sie bleiben bei jedem Zoom an ihrer Stelle und gelten für alle, die das PDF öffnen – wer nur lesen darf, sieht sie, kann sie aber nicht ändern. Das PDF selbst bleibt unverändert. **Fertig** (oder <kbd>⌘</kbd> <kbd>S</kbd>) speichert; jedes Speichern ist eine Version, die du über das Uhr-Symbol wieder laden kannst. Hat jemand anderes die Anmerkungen inzwischen gespeichert, gewinnt deine Fassung, und ein Hinweis nennt, wer; die andere bleibt als Version erhalten. Text, den du auf ein PDF schreibst, findet die Suche – in der App für iPhone und iPad auch die Handschrift selbst, und **In Text umwandeln** macht aus ausgewählter Handschrift getippten Text (siehe [Handschrift erkennen](/notebooks#handschrift-erkennen-iphone-und-ipad)).

Soll ein PDF zum Heft werden, in dem du Seite für Seite schreibst und Blätter ergänzt, öffne es als [Notizbuch](/notebooks#notizbuch-anlegen): Jede PDF-Seite wird ein Blatt.

**Herunterladen** lädt weiterhin das Original. **Mit Anmerkungen herunterladen** (daneben, sobald es Anmerkungen gibt) erzeugt ein neues PDF mit denselben Seiten, auf denen die Anmerkungen als Vektorgrafik liegen – sie bleiben beim Vergrößern scharf. Geschützte (verschlüsselte) PDFs lassen sich nur ohne Anmerkungen herunterladen; Text erscheint in Helvetica, Zeichen außerhalb des westeuropäischen Zeichensatzes als „?“.

## Beschriftungen

Bilder, Tabellen und Codeblöcke können eine kurze **Beschriftung** bekommen – eine Zeile, die beschreibt, was der Block zeigt. Sie steht klein und gedämpft unter dem Block.

- **Hinzufügen**: Fahre mit der Maus über den Block oder setze den Cursor hinein (ein Bild antippen genügt), dann erscheint darunter **Beschriftung hinzufügen**. Alternativ im Blockmenü (Griff `⋮⋮`) → **Beschriftung hinzufügen**.
- **Tippen**: Die Beschriftung ist reiner Text in einer Zeile (bis 500 Zeichen). <kbd>Enter</kbd> oder <kbd>↓</kbd> gehen unter dem Block weiter, <kbd>Esc</kbd> oder <kbd>↑</kbd> zurück in den Block. Andere sehen die Beschriftung beim gemeinsamen Bearbeiten sofort; <kbd>⌘</kbd> <kbd>Z</kbd> im Dokument macht Änderungen rückgängig.
- **Entfernen**: Text löschen und das Feld verlassen (oder <kbd>⌫</kbd> im leeren Feld), oder Blockmenü → **Beschriftung entfernen**.
- **Bilder**: Die Beschriftung ersetzt nicht den Alternativtext für Screenreader. Hat ein Bild eine Beschriftung, bietet das Blockmenü **Beschriftung als Alternativtext** an.
- Beschriftungen bleiben beim Kopieren und Einfügen, Verschieben, Duplizieren, in Vorlagen, Versionen, auf veröffentlichten Seiten, beim Drucken und in allen Exporten erhalten, und die Suche findet sie. Aus HTML (etwa beim Einfügen von Webseiten oder dem Notion-HTML-Export) werden `<figure>` mit `<figcaption>` und Tabellen mit `<caption>` zu Beschriftungen.

### Beschriftungen nummerieren

**Seitenaktionen (…) → Beschriftungen nummerieren** stellt den Beschriftungen einer Seite eine Nummer voran: „Abbildung 1“, „Tabelle 1“, „Listing 1“ (für Code). Gezählt wird je Art in der Reihenfolge des Dokuments, und nur Blöcke, die eine Beschriftung haben. Die Bezeichnung folgt der Sprache, in der Flowplan angezeigt wird (Deutsch: Abbildung/Tabelle/Listing, Englisch: Figure/Table/Listing, Französisch: Figure/Tableau/Listing). Der Schalter gilt für die ganze Seite und für alle, die sie lesen – auch auf veröffentlichten Seiten, beim Drucken und in den Exporten. Kopien der Seite übernehmen ihn. In Eintragsdokumenten von Datenbanken gibt es ihn nicht.

## Formeln, Diagramme und Code

- **Formeln** in LaTeX: Block mit `/math`, im Text mit `/inlinemath`. Die Vorschau erscheint beim Tippen. Über dem Eingabefeld stehen Bausteine wie Bruch, Wurzel, Hoch- und Tiefstellung, Vektor, Kreuzprodukt, ±, π und Summe.
- **Brüche** fügt `/Bruch` als Formel im Satz ein.
- **Mermaid-Diagramme**: Klick oder <kbd>Enter</kbd> öffnet Quelltext und Vorschau. Bis 20.000 Zeichen und 500 Kanten.
- **draw.io-Diagramme** (`/drawio`): öffnen den Editor von draw.io in einem großen Fenster; **Speichern** übernimmt das Diagramm als einen Schritt, den du rückgängig machen kannst. Doppelklick, <kbd>Enter</kbd> oder der Stift am Block öffnen es wieder. Gespeichert werden die Zeichnung und ein Bild davon: Beim Ansehen – auch auf geteilten Seiten, in Präsentationen und offline – lädt Flowplan draw.io gar nicht, es zeigt nur das Bild (bereinigt, ohne Skripte und ohne Inhalte von außen). Zeichnung und Bild dürfen je bis 800 kB groß sein.
  - **Maximieren:** Der Knopf mit den Pfeilen oben rechts im Fenster (neben dem Schließen-Knopf) vergrößert draw.io auf das ganze Browserfenster, derselbe Knopf (**Verkleinern**) holt das Fenster zurück. Er lässt sich auch per Tastatur bedienen. Das Diagramm bleibt dabei offen, ungespeicherte Änderungen gehen nicht verloren; <kbd>Esc</kbd> und **Schließen** fragen wie gewohnt, bevor sie Änderungen verwerfen. Die Wahl merkt sich das Gerät: Das nächste Diagramm öffnet so, wie du das letzte verlassen hast. Auf dem Telefon füllt draw.io den Bildschirm ohnehin (Notch und Home-Leiste bleiben frei), dort gibt es den Knopf nicht.
  - **Eine Seite für ein Diagramm:** Die Vorlage **Diagramm-Seite** (unter [Vorlagen](/templates#startervorlagen), Kategorie *Wissen & Dokumentation*) legt eine Seite in voller Breite mit einem leeren draw.io-Diagramm an und öffnet draw.io gleich. Auf einer Seite in voller Breite nutzt das gespeicherte Bild die ganze Breite, und ein leeres Diagramm ist eine große Fläche statt eines schmalen Streifens. Eine eigene Seitenart wie beim Whiteboard gibt es dafür nicht – die Diagramm-Seite ist ein Dokument, du kannst also Text, weitere Diagramme oder andere Blöcke dazuschreiben.
  - **Wo draw.io läuft:** Ohne Einstellung nutzt Flowplan `embed.diagrams.net`. Während du zeichnest, geht der Inhalt des Diagramms an diesen Dienst; das Fenster weist darauf hin. Mit `DRAWIO_URL` zeigt die Instanz auf ein eigenes draw.io (etwa den Container `jgraph/drawio`), dann bleibt alles bei dir (siehe [Konfiguration](/configuration#rechtliches-und-oberflaeche)).
  - **Aussehen:** unter **Einstellungen → Darstellung → Editor**: **draw.io-Design** *Automatisch* (folgt Flowplan), *Hell* oder *Dunkel* und **draw.io-Oberfläche** *Standard*, *Minimal* oder *Skizze*. Die Wahl gilt für dieses Gerät.
  - **Export:** Im ZIP-Export wird jedes Diagramm eine Datei `.drawio.svg`, die draw.io wieder öffnen kann; in einer einzelnen Markdown-Datei und im Git-Export steht es als Block ` ```drawio ` mit der Zeichnung, den der Import wieder zum Diagramm macht (das Bild entsteht beim nächsten Speichern). PDF und EPUB zeigen das Bild.
- **Codeblöcke**: Die Sprache steht im Kopf des Blocks mit ihrem vollen Namen („JavaScript“, „C++“, „Angular TypeScript“, „Klartext“). Ein Klick öffnet eine Liste mit Suche – sie findet Namen, Kürzel und Dateiendungen (`ts`, `py`, `yml`, `tf`, `.rs` …). Oben stehen die Sprachen, die du zuletzt gewählt hast (in diesem Browser gemerkt). Zur Auswahl stehen über 240 Sprachen mit denselben Grammatiken wie in VS Code – darunter Svelte, Vue, Astro, JSX/TSX, Terraform, TOML, Typst, Zig, Prisma, GDScript, Nushell, Systemd-Units, SSH-Konfiguration, Git-Commit-Nachrichten, Logdateien, CSV/TSV und .env-Dateien. **Zeilenumbruch** und **Kopieren** stehen bereit. <kbd>Tab</kbd> rückt um zwei Leerzeichen ein.
- **Sprache erkennen**: Fügst du Code in einen Block ohne Sprache (Klartext) ein, schlägt Flowplan eine Sprache vor, wenn sie eindeutig erkennbar ist – „Sieht aus wie Python – übernehmen?“. Ein Klick übernimmt sie, das × blendet den Vorschlag aus. Von selbst ändert Flowplan die Sprache nie.
- **Vorschau**: Codeblöcke in HTML, SVG (Sprache XML mit `<svg>`), Markdown, Mermaid, LaTeX und Typst zeigen im Kopf den Schalter **Code / Vorschau / Geteilt**. *Geteilt* stellt Code und Vorschau nebeneinander, auf dem Telefon untereinander. Die Ansicht wird im Block gespeichert; wer eine Seite nur liest (Leserechte, veröffentlichte Seiten, Präsentationen), sieht ohne eigene Einstellung des Blocks die Vorschau und kann für sich umschalten, ohne etwas zu ändern. Fehler (etwa ein Tippfehler im Diagramm oder in Typst, mit Zeilennummer) erscheinen an Stelle der Vorschau.
  - **HTML** läuft in einem abgeschotteten Rahmen: keine Skripte, keine Formulare, kein Zugriff auf Flowplan oder das Netz. Bilder aus dem Netz bleiben leer, eingebettete Bilder (`data:`) und Stile funktionieren. Die Höhe passt sich dem Inhalt an.
  - **SVG**, **Mermaid** und **Typst** erscheinen als Bild – ohne Skripte und Links.
  - **Markdown** wird wie beim Import umgesetzt, **LaTeX** zeigt Formeln mit KaTeX (durch Leerzeilen getrennt, mit oder ohne `$$ … $$`; ganze LaTeX-Dokumente mit `\documentclass` nicht).
  - **Typst** wird beim ersten Mal nachgeladen (einige MB, vom eigenen Server, nicht aus dem Netz); Typst-Pakete (`@preview/…`) und Dateien stehen nicht zur Verfügung.
  - Neue Mermaid-Codeblöcke (` ```mermaid ` oder Sprache *Mermaid* gewählt) zeigen gleich das Diagramm, leere Blöcke Code und Diagramm nebeneinander. Den eigenständigen Mermaid-Block (`/mermaid`) gibt es weiterhin.
- **Zeilennummern**: Das Menü **…** im Kopf eines Codeblocks schaltet **Zeilennummern** für diesen Block ein oder aus, legt die **erste Zeilennummer** fest (etwa 10 für einen Ausschnitt) und **hebt Zeilen hervor** – z. B. `3-5, 8`, gezählt wie angezeigt. Die Nummern lassen sich nicht markieren und werden nicht mitkopiert; bei Zeilenumbruch stehen sie an der ersten Zeile eines umbrochenen Zeilenstücks. Für Blöcke ohne eigene Einstellung gilt **Einstellungen → Darstellung & Sprache → Editor → Zeilennummern standardmäßig anzeigen** (auf diesem Gerät).
- **Einklappen**: Codeblöcke mit mehr als 25 Zeilen erscheinen eingeklappt – 10 Zeilen hoch, darin scrollbar, unten ausgeblendet. **Alle N Zeilen anzeigen** klappt sie auf, **Einklappen** wieder zu (beides per Tastatur erreichbar). Wer bearbeiten darf, speichert den Zustand im Block; Lesende klappen nur für sich auf. Im Menü **…** lassen sich **Eingeklappt** und die **Höhe eingeklappt** (5, 10, 15, 20 oder 30 Zeilen) einstellen. Drucken und alle Exporte zeigen immer den ganzen Code.
- Die Hervorhebung einer Sprache wird beim ersten Codeblock dieser Sprache nachgeladen; bis dahin steht der Code kurz ohne Farben da. Sehr lange Codeblöcke (über 50 000 Zeichen) bleiben ohne Hervorhebung.

![Ein Markdown-Codeblock in der geteilten Ansicht: links der Code mit Zeilennummern und einer hervorgehobenen Zeile, rechts die gerenderten Release Notes](/screenshots/code-preview.webp "Ein Codeblock in Markdown, mit Zeilennummern, hervorgehobener Zeile und der Vorschau daneben.")

## Rechnen im Text

Flowplan rechnet nur, wenn du es möchtest – exakt mit Brüchen, in deutscher Schreibweise (`2,5`, `2.400`, `3 : 4`, `×`, `²`, `√`, `€`):

- **Hinweis nach „=“**: Tippst du eine Rechnung und dann `=`, etwa `12 × 2.400 € =` oder `3/4 + 1/6 =`, erscheint das Ergebnis grau dahinter. <kbd>Tab</kbd> übernimmt es, <kbd>Esc</kbd> oder Weiterschreiben verwirft es.
- **Markierter Text**: Markiere eine Rechnung, einen Term oder eine Gleichung; das Textmenü (auch per Rechtsklick) zeigt unter **Rechnen**, was möglich ist, und fügt das Ergebnis per Klick dahinter ein:
  - **Ergebnis** und **Kürzen** als exakter Bruch, dazu **Als Dezimalzahl** – `12/18 = 2/3`
  - **Ausmultiplizieren**, auch die binomischen Formeln – `(a + b)² = a² + 2ab + b²`
  - **Faktorisieren** – `x² − 9 = (x − 3)(x + 3)`, `4x² − 12x + 9 = (2x − 3)²`, `6x² + 9x = 3x(2x + 3)`, auch mit mehreren Variablen: `a³ − b³ = (a − b)(a² + ab + b²)`, `x² + 2xy + y² − 1 = (x + y − 1)(x + y + 1)`, durch Ausklammern in Gruppen `ax + ay + bx + by = (x + y)(a + b)`; **Faktorisieren mit Wurzeln** zerlegt weiter in reelle Faktoren: `x² − 2 = (x − √2)(x + √2)`
  - **Vereinfachen** von Bruchtermen – `(x² − 1)/(x − 1) = x + 1`, `1/x + 1/(x + 1) = (2x + 1)/(x(x + 1))`
  - **Nach x auflösen** – lineare und quadratische Gleichungen exakt (`x² + 2x − 4 = 0 ⇒ x = −1 ± √5`), höhere Grade exakt, wo es geht (`x³ = 2 ⇒ x = ∛2`, `x⁴ − 5x² + 6 = 0 ⇒ x = ±√2, ±√3`), sonst als gerundete Dezimalzahlen (`x³ + x − 1 = 0 ⇒ x ≈ 0,682328`); bei mehreren Variablen nach jeder, die linear vorkommt. Gleichungen mit x im Nenner werden mit dem Hauptnenner gelöst; Werte, für die ein Nenner 0 wäre, entfallen und werden genannt (`x/(x − 1) = 1/(x − 1) ⇒ keine Lösung (x = 1 entfällt)`).
- **Funktionsgraph**: Markiere einen Term mit x, etwa `x² − 2` oder `f(x) = 2x + 1`, und wähle im Textmenü **Graph zeichnen** – darunter erscheint ein Graph mit Achsen, Gitter und markierten Nullstellen. Auch `/Funktionsgraph` fügt einen ein. Unter dem Graphen stehen die Funktionen zum Bearbeiten: Der Graph ändert sich beim Tippen, **+ Funktion** fügt bis zu sechs Funktionen in eigenen Farben hinzu (`sin(x)`, `cos`, `tan`, `exp`, `ln`, `abs`, `√` und `π` sind möglich). Ziehen verschiebt den Ausschnitt, **+**/**−** oder <kbd>⌘</kbd>/<kbd>Strg</kbd> + Scrollen zoomen, **⟲** stellt die Ansicht zurück. Auf veröffentlichten Seiten lässt sich der Graph verschieben und zoomen, aber nicht ändern.
- **Vektoren**: Schreibe Vektoren als `(1 | 2 | 3)`, `(1; 2; 3)` oder `(1, 2, 3)` – in deutscher Schreibweise ist ein Komma zwischen Ziffern sonst ein Dezimalkomma, `(1,5; 2)` ist also (1,5 | 2). Flowplan rechnet Summen und Vielfache (`2 · (1; −2) − (3; 1) = (−1; −5)`), das **Skalarprodukt** mit `·` samt **Winkel** (`(1; 0) · (0; 1) = 0 ⇒ ∠ = 90°`), das **Kreuzprodukt** mit `×` (`(1|0|0) × (0|1|0) = (0 | 0 | 1)`) und den **Betrag** mit `|…|` (`|(1; 1)| = √2`). Ein markierter Vektor allein zeigt seinen Betrag und den **Einheitsvektor** (`(3; 4) ⇒ v⁰ = (3/5; 4/5)`). **Vektoren zeichnen** im Textmenü stellt Vektoren der Ebene als Pfeile im Koordinatensystem dar – bei `(1; 2) + (3; 1)` beide Vektoren und ihre Summe. Im Graphen lassen sich weitere Vektoren wie `(3; 2)` neben Funktionen eintragen. **Vektoren im Raum** wie `(1 | 2 | 3)` – auch Kreuzprodukte – zeichnet Flowplan in einem 3D-Koordinatensystem mit x-, y- und z-Achse, Bodenraster und gestrichelten Hilfslinien zum Boden; **Ziehen dreht die Ansicht**, die Drehung wird mit der Seite gespeichert. Im Formel-Editor gibt es die Bausteine **Vektor** (Spaltenvektor), **Vektorpfeil** und **Kreuzprodukt**; Spaltenvektoren in Formeln werden genauso berechnet.
- **In Formeln**: Der Formel-Editor zeigt dieselben Möglichkeiten unter **Rechnen** und hängt das Ergebnis in LaTeX an, etwa `\frac{3}{4} + \frac{1}{6} = \frac{11}{12}`.

## Dashboards und Kennzahlen

**/Kennzahl** fügt eine Karte mit einer Zahl aus einer Datenbank ein, **/Dashboard** gleich drei nebeneinander. Über das Zahnrad wählst du:

- die **Datenbank** (alle Datenbanken des Arbeitsbereichs, die du lesen darfst),
- optional eine **Ansicht** – dann zählen nur die Einträge, die ihre Filter zeigen, etwa „Offene Tickets“,
- die **Berechnung**: Anzahl Einträge, Summe, Durchschnitt, Minimum oder Maximum einer Zahl-, Formel- oder Rollup-Eigenschaft,
- eine **Beschriftung**.

Die Zahl rechnet der Server für die Person aus, die die Seite ansieht, und aktualisiert sie jede Minute; private Einträge zählen nur für die, die sie sehen dürfen. Auf veröffentlichten Seiten sehen Besucher ohne Zugriff einen Strich. Diagramme kommen dazu, indem du unter den Kennzahlen eine **verknüpfte Datenbank** einfügst und dort eine Diagramm-Ansicht wählst – so entsteht ein Dashboard aus mehreren Datenbanken.

## Seitenlinks und Erwähnungen

`@` sucht Seiten, Einträge aus Datenbanken und Personen – einfach weitertippen, um die Liste zu filtern. Die Pfeiltasten wandern durch die Treffer, <kbd>Enter</kbd> fügt den markierten ein. `@` öffnet die Liste am Zeilenanfang, nach einem Leerzeichen oder nach einer öffnenden Klammer oder einem Anführungszeichen; mitten im Wort – etwa in einer E-Mail-Adresse wie `ada@example.org` – wird `@` einfach geschrieben. <kbd>Esc</kbd> (oder <kbd>Enter</kbd> ohne Treffer) schließt die Liste und schreibt `@` und den gesuchten Text in den Text. Journaltage stehen hinter den übrigen Seiten. `@heute`, `@gestern` oder ein Datum wie `@2026-10-27` bieten unter **Journal** einen Link auf diesen Tag des [Journals](/journal#tage-in-listen-suche-graph-und-export) an. Einträge erscheinen mit ihrer Datenbank, etwa „Heizung – Wartung · Notizen“; angeboten werden nur Einträge, die du lesen darfst. Eine Erwähnung einer Person benachrichtigt sie im Posteingang.

Links auf Seiten und Einträge bleiben gültig, auch wenn sie umbenannt oder verschoben werden. Steht im Link der alte Titel, wird er beim Umbenennen durch den neuen ersetzt – in allen Dokumenten und Einträgen, die du bearbeiten darfst; ein Link mit eigenem Text behält ihn. Das Ziel zeigt alle Links darauf unter **Verlinkt von** (Seiten) bzw. **Verknüpft von** (Einträge). Dort stehen auch Einträge, in deren Text der Link steht. Wer einen verlinkenden Eintrag oder seine Seite nicht lesen darf, sieht ihn dort nicht.

Ein Link auf eine Seite oder einen Eintrag zeigt vor dem Text das Icon des Ziels: sein Emoji, sein Symbol oder sein eigenes Bild – ohne eigenes Icon das Zeichen seiner Art (Dokument, Datenbank, Whiteboard, Eintrag). Ändert jemand das Icon, ändert es sich in allen Links mit, wie der Titel beim Umbenennen. Das gilt auch im Lesemodus, in Kommentaren, auf veröffentlichten Seiten, in der Vorschau beim Darüberfahren, in der `@`-Liste, unter **Verlinkt von**, bei **Verwandte Seiten** und in der Suche. Ein Link auf einen Block behält sein Absatzzeichen, solange die Seite kein eigenes Icon hat. Für Seiten und Einträge, die du nicht lesen darfst, zeigt der Link nur das allgemeine Link-Zeichen. Beim Drucken erscheinen die Icons mit; Markdown-Exporte enthalten nur den Linktext.

## Links auf Blöcke

Jeder Block lässt sich verlinken: ein Absatz, eine Überschrift, ein Listenpunkt, eine Tabelle, ein Bild, ein Diagramm … Der Link ist die Adresse der Seite mit dem Block, etwa `https://flowplan.example.org/#page=…&block=k3x9a2b1` (bei Einträgen mit `&row=…`), und funktioniert überall im selben Arbeitsbereich.

**Link kopieren**

- im Blockmenü (Griff ⠿ links neben dem Block, auf dem Handy antippen): **Link zum Block kopieren**,
- bei Überschriften über das Link-Symbol, das beim Darüberfahren hinter der Überschrift erscheint,
- im [Inhaltsverzeichnis](#inhaltsverzeichnis) über das Link-Symbol neben jeder Überschrift (auf dem Handy immer sichtbar),
- mit <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>L</kbd> (Windows/Linux: <kbd>Strg</kbd> <kbd>Umschalt</kbd> <kbd>L</kbd>) für den Block, in dem der Cursor steht.

Kopiert wird die Adresse; in andere Programme eingefügt (Mail, Chat, Word) erscheint sie als Link mit dem Text „Seite › Anfang des Blocks“.

**Link einfügen**

Einen kopierten Blocklink einfach in ein Dokument oder einen Eintrag desselben Arbeitsbereichs einfügen (<kbd>⌘</kbd> <kbd>V</kbd>): Er wird zu einem Link wie ein Seitenlink, mit dem Text „Seite › Anfang des Blocks“. Ist vorher Text markiert, wird dieser Text zum Link. Über `@` lassen sich auch Überschriften und Blöcke anderer Seiten suchen: `@Projekt › Ziele` (oder `@Projekt#Ziele`) zeigt die Überschriften der Seite „Projekt“, die „Ziele“ enthalten; ein Suchwort allein findet auch Absätze mit diesem Text. Überschriften der eigenen Seite stehen als „Diese Seite › …“ dabei.

Wird die verlinkte Seite (oder der Eintrag) umbenannt, ändert sich der Seitentitel im Linktext mit; der Teil hinter „›“ bleibt, wie er ist. Beim Darüberfahren zeigt die Vorschau den aktuellen Text des Blocks.

**Link öffnen**

Ein Klick öffnet die Seite (bei einem Eintrag den Eintrag im Dialog), scrollt zum Block und hebt ihn kurz hervor. Ein Block in einem eingeklappten Abschnitt wird dabei aufgeklappt. Gibt es den Block nicht mehr, öffnet sich die Seite mit dem Hinweis „Diesen Block gibt es nicht mehr – die Seite ist geöffnet.“

**Gut zu wissen**

- Ein Block behält seinen Link beim Bearbeiten, Verschieben (auch Ausschneiden und Einfügen) und Umwandeln. Kopien – **Duplizieren** oder Kopieren und Einfügen im selben Dokument – bekommen einen eigenen Link. Wird ein Block mit Enter geteilt, bleibt der Link beim ersten Teil.
- Vorschau und Linktext zeigen nur, was du lesen darfst: Für eine Seite ohne Leserecht erscheint nur „Verlinkter Block“, ohne Text.
- In [verschlüsselten Bereichen](/encrypted-spaces) funktionieren Blocklinks innerhalb des Bereichs ebenso; der Server kennt den Text dort nicht, deshalb gibt es keine Textvorschau.
- Auch wer eine Seite nur lesen darf, kann Links auf ihre Blöcke kopieren.
- Für **Text links ausrichten** gibt es kein Tastenkürzel mehr (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>L</kbd> kopiert jetzt den Blocklink); links ist die Standardausrichtung, die Werkzeugleiste bietet sie weiter an.

## Fußnoten

`/fußnote`, <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>F</kbd> (<kbd>Strg</kbd> <kbd>Alt</kbd> <kbd>F</kbd>) oder **Fußnote** im Textmenü fügt an der Schreibmarke eine Fußnote ein und öffnet ihren Text.

- Die Anmerkungen stehen nummeriert unter **Fußnoten** am Ende der Seite. Die Nummern folgen der Reihenfolge im Text und passen sich beim Verschieben, Kopieren und Löschen von selbst an.
- Ein Klick auf die Nummer springt zur Anmerkung, ↩ wieder zurück. Doppelklick auf die Nummer (oder <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>F</kbd> bei ausgewählter Fußnote) bearbeitet oder entfernt sie.
- Anmerkungen sind reiner Text; Webadressen darin werden zu Links.
- Fußnoten erscheinen auch auf geteilten und veröffentlichten Seiten, beim Drucken und im HTML-Export, und die Suche findet ihren Text.
- Im Markdown-Export werden sie zu `[^1]` mit `[^1]: Text` am Ende; der Import liest das wieder ein – auch Obsidians Kurzform `^[Text]`.

## Zitate und Literaturverzeichnis

Für Haus-, Abschluss- und Forschungsarbeiten zitierst du Quellen direkt im Text:

1. `/zitat` (oder `/cite`) öffnet die **Literaturliste** des Arbeitsbereichs.
2. Einen Titel suchen, eine **DOI** einfügen (z. B. `10.1000/xyz123` – Flowplan holt Autoren, Titel und Jahr bei Crossref und anderen DOI-Diensten) oder über **BibTeX oder CSL-JSON importieren (Zotero) …** eine ganze Literaturliste übernehmen.
3. Optional eine Seite angeben und einfügen.

Im Text steht dann „(Müller 2021)“, „(Müller & Schmidt 2021, S. 12)“ oder „(Müller et al. 2021)“; beim Überfahren zeigt Flowplan die vollständige Angabe. `/literatur` fügt ein **Literaturverzeichnis** ein: alle auf der Seite zitierten Werke in einem APA-ähnlichen Stil, das sich beim Zitieren selbst aktualisiert – auch auf geteilten und veröffentlichten Seiten.

- Die Literaturliste gehört zum Arbeitsbereich; Gäste sehen sie nicht. Jedes Zitat trägt seine Angaben mit, sodass Kopien, Exporte und geteilte Seiten auch ohne die Liste vollständig sind.
- **Zotero:** In Zotero eine Sammlung als *BibTeX* oder *CSL JSON* exportieren und im Dialog importieren.
- Im **Markdown-Export** werden Zitate zu Pandoc-Zitaten (`[@schlüssel]`, `[@schlüssel, p. 12]`) und das Verzeichnis zu einem eigenen Abschnitt – so lässt sich ein Text mit Pandoc weiterverarbeiten.

## Autoren anzeigen

**Autoren anzeigen** (in der Symbolleiste oder im Seitenmenü **…**) färbt den Text nach der Person, die ihn geschrieben hat – jede Person immer in derselben Farbe. Eine Legende zeigt Namen und Anteile; **Autoren ausblenden** schaltet die Färbung wieder ab.

- Am Inhalt ändert sich nichts; die Färbung ist nur eine Ansicht.
- Aufgezeichnet wird, seit es die Funktion gibt: Älterer, importierter oder aus einer Version wiederhergestellter Text erscheint als „früher“, ebenso Text von Gästen über Links mit eigenen Berechtigungen.
- Bilder, Erwähnungen und andere eingebettete Objekte werden nicht eingefärbt.
- Namen sehen nur Personen, die die Seite lesen dürfen.

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
