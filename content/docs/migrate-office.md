---
keywords: Confluence, Evernote, ENEX, Google Docs, Takeout, Word, docx, OneNote, Import
---

# Von Confluence, Evernote, Google Docs und Word

Schritt für Schritt aus Confluence, Evernote, Google Docs, Microsoft Word und OneNote nach Flowplan – mit Seitenbaum, Bildern und Anhängen.

## Von Confluence

::: steps

1. In Confluence: **Bereichseinstellungen → Exportieren** (Confluence Cloud: **Bereichseinstellungen → Bereich exportieren**). Wähle **HTML** oder **XML**, jeweils mit allen Seiten.
2. In Flowplan das ZIP wie oben importieren (Quelle **Confluence** oder automatisch).

:::

Was daraus wird:

- Der **Seitenbaum** des Bereichs wird zum Seitenbaum in Flowplan (aus `index.html` bzw. den Elternseiten in `entities.xml`; fehlt eine Seite dort, helfen die Brotkrumen).
- **Info-, Tipp-, Hinweis- und Warnungs-Makros** werden zu Hinweisblöcken (Info → Hinweis, Tipp → Tipp, Hinweis → Warnung, Warnung → Achtung), **Code-Makros** zu Codeblöcken, **Aufklappen** zu Aufklappblöcken, **Aufgabenlisten** zu Aufgaben mit ihrem Status.
- **Bilder** und **Anhänge** werden hochgeladen; Anhänge, die im Text nicht vorkommen, stehen als Links am Ende der Seite. **Links auf andere Seiten** des Bereichs zeigen auf die importierten Seiten. Anker-Links (`Seite.html#Seite-Ueberschrift`, `#…` auf derselben Seite, im XML-Export `ac:anchor`) führen zur Überschrift bzw. zum Anker.
- Im XML-Export zählt nur die aktuelle Fassung jeder Seite; ältere Versionen und Blogbeiträge werden übersprungen. Erstellungs- und Änderungsdatum werden übernommen.
- Makros ohne Entsprechung (etwa Inhaltsverzeichnis, Jira-Abfragen) fallen weg; die Vorschau nennt sie.

## Von Evernote

::: steps

1. In Evernote ein Notizbuch über **… → Notizbuch exportieren** als **ENEX** speichern. Mehrere Notizbücher packst du zusammen in ein ZIP.
2. In Flowplan die `.enex`-Datei oder das ZIP importieren.

:::

Was daraus wird:

- Jede **Notiz** wird eine Seite; bei mehreren Notizbüchern wird jedes Notizbuch eine Seite mit seinen Notizen darunter.
- Der Notiztext (ENML) wird zu normalem Text mit Formatierung, Listen und Tabellen; **Kontrollkästchen** werden zu Aufgaben.
- **Bilder und Anhänge** (in der ENEX-Datei eingebettet) werden hochgeladen und an ihrer Stelle im Text gezeigt; PDFs und andere Dateien als Link. Anhänge ohne Platz im Text kommen ans Ende.
- **Tags**, **Erstellt**/**Geändert** und die **Quelladresse** bleiben erhalten – am besten als neue Datenbank importieren, dann sind es Eigenschaften zum Filtern und Sortieren.
- Verschlüsselter Text lässt sich nicht übernehmen; die Vorschau warnt.

## Von Google Docs

::: steps

1. Unter [takeout.google.com](https://takeout.google.com) **Drive** wählen und bei den Formaten für Dokumente **HTML** (empfohlen) oder **Microsoft Word** einstellen. Einzelne Dokumente gehen auch über **Datei → Herunterladen → Webseite (.html, gezippt)** oder **Microsoft Word (.docx)**.
2. In Flowplan das Takeout-ZIP, das ZIP der Webseite oder die `.docx`-Datei importieren (Quelle **Google Docs**; einzelne `.docx`-Dateien gehen auch über [Microsoft Word](#von-microsoft-word)).

:::

Was daraus wird:

- Jedes Dokument wird eine Seite, **Drive-Ordner** werden zu übergeordneten Seiten.
- Überschriften, Fett, Kursiv, Unterstrichen, Durchgestrichen, **verschachtelte Listen**, Tabellen und Links werden übernommen; Googles Umleitungslinks zeigen wieder direkt auf ihr Ziel. Links auf Überschriften und Lesezeichen im selben Dokument (`#h.…`, `#kix.…`) bleiben Links auf diese Stelle.
- **Bilder** werden hochgeladen – auch die, die im HTML eingebettet sind.
- Word-Dateien: Absätze, Überschriften, Listen (nummeriert und mit Aufzählungszeichen, auch verschachtelt), Tabellen (mit verbundenen Spalten), Links und Bilder. Kommentare, Fußnoten und Kopf-/Fußzeilen fallen weg.

## Von Microsoft Word

Word-Dokumente (`.docx`) importierst du unter **Einstellungen → Import & Export → Import** mit der Quelle **Microsoft Word** (eine `.docx`-Datei wird auch automatisch erkannt):

- **Ein Dokument:** die `.docx`-Datei auswählen. Sie wird eine Seite mit dem Dateinamen als Titel.
- **Mehrere Dokumente:** die `.docx`-Dateien als ZIP packen und das ZIP auswählen. Jedes Dokument wird eine Seite, **Ordner** im ZIP werden zu übergeordneten Seiten. Liegt alles in einem einzigen Ordner, entfällt dieser.

Übernommen werden Absätze, Überschriften, Fett, Kursiv, Unterstrichen, Durchgestrichen, Listen (nummeriert und mit Aufzählungszeichen, auch verschachtelt), Tabellen (mit verbundenen Spalten), Links und Bilder. Kommentare, Fußnoten, Kopf- und Fußzeilen fallen weg. Word-Sperrdateien (`~$….docx`) werden übergangen.

**Ältere Word-Dateien (`.doc`, Word 97–2003)** kann Flowplan nicht lesen. Öffne die Datei in Word, LibreOffice oder Pages und speichere sie als `.docx`; dann importieren. Enthält ein ZIP neben `.docx`- auch `.doc`- oder OneNote-Dateien, werden die `.docx`-Dateien importiert und die übrigen in der Vorschau mit Grund aufgeführt.

### OneNote

OneNote-Dateien (`.one`, `.onetoc2`, `.onepkg`) liest Flowplan nicht direkt – Flowplan erkennt sie und sagt, was zu tun ist. Der Weg führt über OneNotes eigenen Export:

::: steps

1. In OneNote für Windows die Seite oder den Abschnitt öffnen und **Datei → Exportieren** wählen; als Format **Word-Dokument (.docx)**.
2. Die `.docx`-Datei (oder mehrere als ZIP) in Flowplan über **Microsoft Word** importieren.

:::

Bietet deine OneNote-Version keinen Export als Word-Dokument an, sondern nur PDF, importiere das PDF als Notizbuch (wie [aus GoodNotes](/migrate-notes#von-goodnotes)) oder lade es als Datei auf eine Seite hoch.
