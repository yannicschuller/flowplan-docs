---
keywords: Confluence, BookStack, Evernote, ENEX, Google Docs, Takeout, Word, docx, OneNote, Import
---

# Von Confluence, BookStack, Evernote, Google Docs und Word

Schritt für Schritt aus Confluence, BookStack, Evernote, Google Docs, Microsoft Word und OneNote nach Flowplan – mit Seitenbaum, Bildern und Anhängen.

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

## Von BookStack {since=0.10.0}

Seiten aus BookStack holt Flowplan einmalig über die REST-API von BookStack – ohne Export-Datei, mit Regalen, Büchern, Kapiteln, Bildern, Anhängen und Tags. Ein laufender Abgleich findet nicht statt: Was du danach in BookStack änderst, kommt nicht mehr herüber.

::: steps

1. In BookStack braucht die Rolle deines Kontos die Berechtigung **Access system API** (**Settings → Roles**, bei den Systemberechtigungen). Importiert wird genau das, was dein Konto sehen darf.
2. In deinem Profil (oben rechts → **My Account** → **Access & Security**, in älteren Versionen **Edit Profile**) unter **API Tokens** mit **Create Token** ein Token anlegen und **Token ID** und **Token Secret** kopieren – das Secret zeigt BookStack nur einmal.
3. In Flowplan: **Einstellungen → Import & Export → Import**, oben den Zielbereich wählen, als Quelle **BookStack (API)**, die **Adresse von BookStack** (etwa `https://wiki.example.org`, auch mit Pfad wie `https://example.org/wiki`), **Token-ID** und **Token-Secret** eintragen und **Regale und Bücher laden**.
4. Unter **Was importiert werden soll** stehen die Regale mit ihren Büchern und die **Bücher ohne Regal**, alle angehakt. Abwählen, was nicht mit soll – ein Regal ab- oder anhaken nimmt seine Bücher mit –, dann **Prüfen**.
5. Die **Vorschau** zählt Regale, Bücher, Kapitel, Seiten, Bilder, Anhänge und Tags und nennt Hinweise, etwa Bücher in mehreren Regalen. **Importieren** legt alles an; danach öffnet sich die erste importierte Seite.

:::

> [!WARNING]
> Das Token darf alles, was dein Konto in BookStack darf. Gib es nur in Flowplan in die Felder **Token-ID** und **Token-Secret** ein – nirgendwo sonst. Flowplan schickt es nur an die angegebene Adresse, verwendet es nur für diesen Import und speichert oder protokolliert es nicht. Brauchst du es danach nicht mehr, lösche es in BookStack.

### Was daraus wird {since=0.10.0}

- Jedes **Regal** wird eine Seite auf oberster Ebene mit seinen **Büchern** darunter, in der Reihenfolge des Regals. Steht ein Buch in mehreren Regalen, kommt es nur einmal unter das erste (die Regale nach Namen); die Vorschau nennt diese Bücher. Bücher ohne Regal werden Seiten auf oberster Ebene.
- **Kapitel** werden Unterseiten ihres Buchs, **Seiten** Unterseiten ihres Kapitels oder Buchs – in der Reihenfolge aus BookStack. Die **Beschreibung** eines Regals, Buchs oder Kapitels wird der Text seiner Seite.
- **Inhalt:** Überschriften, Listen, Aufgabenlisten, Tabellen, Codeblöcke mit ihrer Sprache, Zitate, aufklappbare Blöcke und Hinweisboxen (Info, Success, Warning, Danger werden zu Hinweis, Tipp, Warnung und Achtung) werden zu ihren Blöcken. Seiten aus dem Markdown-Editor kommen über ihr Markdown, solange es kein HTML enthält, sonst wie die übrigen über ihr HTML.
- **Bilder** aus BookStack (Galerie und draw.io-Zeichnungen, in Originalgröße) und **Dateianhänge** werden heruntergeladen und als Dateien der Seite gespeichert, jede höchstens so groß wie die größte Datei beim Hochladen. Im Text verlinkte Anhänge verlinken auf die Datei, die übrigen stehen unter dem Text; **Link-Anhänge** bleiben Links, Bilder von anderen Adressen bleiben, wo sie sind. Was sich nicht laden lässt, nennt das Ergebnis als Hinweis und der [Importbericht](/migrate#importbericht) – der Import läuft trotzdem weiter.
- **Links** auf Seiten (`/books/…/page/…`, `/link/123`), Kapitel, Bücher und Regale des Imports zeigen auf die neuen Seiten, Links auf einen Absatz (`#bkmrk-…`) auf denselben Block. Links auf nicht Importiertes bleiben Links auf BookStack.
- **Tags** werden zu [Tags der Seite](/page-tags#tags-und-eigenschaften): `Name` bleibt `Name`, ein Tag mit Wert wird `Name: Wert`.
- Nicht übernommen werden Entwürfe, frühere Fassungen (Revisions), Kommentare, Rechte und der Papierkorb; Vorlagen kommen als normale Seiten.

### Dauer und Grenzen {since=0.10.0}

Vorschau und Import laufen im Hintergrund, pro Person einer gleichzeitig; die Vorschau lädt noch keine Bilder und Anhänge. BookStack begrenzt die API-Anfragen je Minute (standardmäßig 180) – meldet es „zu viele Anfragen“, wartet Flowplan so lange wie verlangt (höchstens eine Minute je Anfrage). Einige hundert Seiten brauchen daher ein paar Minuten. Es gelten die Grenzen jedes Imports (`FLOWPLAN_IMPORT_MAX_DOCS`, `FLOWPLAN_IMPORT_MAX_FILES`); Regale, Bücher und Kapitel zählen als Seiten.

### BookStack im eigenen Netz {since=0.10.0}

Flowplan ruft für den Import nur öffentliche HTTPS-Adressen auf. Läuft BookStack im lokalen Netz oder einem VPN (etwa `http://192.168.1.20`), muss die Administration `FLOWPLAN_IMPORT_ALLOW_PRIVATE=true` setzen ([Konfiguration](/configuration#betrieb)) – dann sind auch interne Adressen und `http://` erlaubt. Ohne die Variable lehnt Flowplan solche Adressen mit einem Hinweis darauf ab.

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
