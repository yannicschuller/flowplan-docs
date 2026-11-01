# Umzug von Notion, AppFlowy, AFFiNE, Obsidian, Confluence, Evernote und Google Docs

Flowplan ist eine Open-Source-Alternative zu Notion, Confluence und AppFlowy unter der AGPL-3.0. So holst du Seiten, Datenbanken, Bilder und Dateien aus dem bisherigen Werkzeug herüber.

## Confluence, Evernote, Google Docs und Obsidian

Unter **Einstellungen → Import & Export → Import** wählst du oben den Zielbereich und bei **AFFiNE, Confluence, Evernote, Google Docs oder Obsidian** die Quelle (oder lässt sie erkennen) und ob eine Seitenstruktur oder eine **neue Datenbank** entstehen soll. Dann die Datei auswählen:

1. Flowplan lädt die Datei hoch (mit Fortschrittsanzeige) und zeigt eine **Vorschau**: wie viele Seiten, Ordner, Dateien (mit Größe) und Tags übernommen werden und was nicht geht – etwa verschlüsselter Text, nicht unterstützte Makros oder Bilder, die im Export fehlen.
2. **Importieren** legt alles in einem Schritt an. Schlägt etwas fehl, bleibt nichts halb importiert zurück.

Für alle Quellen gilt:

- Ende-zu-Ende-verschlüsselte Bereiche sind als Ziel ausgeschlossen (der Server sieht dort keinen Klartext).
- Du brauchst Schreibrechte im Zielbereich; Speicherkontingente des Arbeitsbereichs und deine persönliche Grenze werden vorher geprüft (die Vorschau warnt schon).
- Grenzen pro Import: 500 Seiten (als Datenbank: 5.000 Einträge), 10 MB je Datei im ZIP. ZIP-Exporte und einzelne Dateien dürfen höchstens 100 MB groß sein. Die **AFFiNE-Arbeitsbereichsdatei (`.affine`)** darf so groß sein wie die **größte Datei beim Hochladen** (Administration → [Grenzen & Aufbewahrung](/administration#grenzen-aufbewahrung), je Person änderbar), mindestens aber 100 MB; `FLOWPLAN_IMPORT_MAX_MB` legt die Grenze für die ganze Instanz fest ([Konfiguration](/configuration#betrieb)). Ist eine Datei zu groß, nennt die Meldung die Grenze und wo sie geändert wird.
- Die Datei wird nur einmal hochgeladen: Die Vorschau behält sie auf dem Server, **Importieren** verwendet sie weiter. Brichst du ab, wird sie gelöscht, sonst spätestens nach sechs Stunden.
- Der Inhalt wird wie beim Einfügen bereinigt: Skripte, Formulare und eingebettete Fremdseiten fallen weg. Dateinamen werden bereinigt; Dateien, die der Browser ausführen könnte (HTML, SVG), werden nur zum Herunterladen gespeichert.
- Links zwischen importierten Seiten zeigen auf die neuen Seiten. Bilder und Anhänge werden hochgeladen – jede Datei einmal, auch wenn mehrere Seiten sie zeigen.
- **Als neue Datenbank** wird jede Notiz ein Eintrag mit den Eigenschaften *Tags*, *Erstellt*, *Geändert*, *Ordner* (der Ordnerpfad) und – wenn vorhanden – *Quelle*. Als Seiten werden Tags zu [Tags der Seite](/pages-and-spaces#tags-und-eigenschaften); fehlende werden im Arbeitsbereich angelegt.

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
- Callouts werden zu [Hinweisen](/documents#hinweise) und behalten ihr Emoji als Symbol.
- Große Exporte, die Notion in mehrere ZIP-Dateien innerhalb des ZIPs aufteilt, werden erkannt.

Grenzen pro Import: 100 MB, 500 Seiten und 5.000 Einträge je Tabelle. Größere Arbeitsbereiche exportierst du in Teilen, etwa Seite für Seite.

## Von AppFlowy

1. In AppFlowy Seiten als **Markdown** und Datenbanken als **CSV** exportieren.
2. Die Dateien in einen Ordner legen – Unterordner werden zu Unterseiten – und als ZIP packen.
3. In Flowplan unter **Einstellungen → Import & Export → Import** importieren.

Markdown wird zu Seiten, CSV zu Datenbanken; verlinkte Bilder und Dateien werden mitgenommen.

## Von AFFiNE

1. In der AFFiNE-Desktop-App in den **Einstellungen des Arbeitsbereichs** den Export **Full Backup** („Export a complete workspace backup“) wählen. Es entsteht eine Datei `Name_….affine` – die ganze Datenbank des Arbeitsbereichs mit Dokumenten, Ordnern, Sammlungen, Journal und Dateien.
   In der Web-App gibt es diese Datei nicht; dort exportierst du Dokumente als **Snapshot** (ZIP) – dafür muss in den Einstellungen des Arbeitsbereichs unter den experimentellen Funktionen **Enable Snapshot Import Export** eingeschaltet sein. Ein Snapshot enthält Dokumente, Datenbanken, Whiteboards und Dateien, aber keine Ordner, Sammlungen und Journal-Zuordnungen.
2. In Flowplan: **Einstellungen → Import & Export → Import**, den Zielbereich wählen und bei **AFFiNE, Confluence, Evernote, Google Docs oder Obsidian** die `.affine`-Datei oder das Snapshot-ZIP auswählen (Quelle **AFFiNE** oder automatisch).
3. Die Vorschau zeigt, was kommt: Seiten, Ordner, Dateien, Tags, Whiteboards, Datenbanken, Sammlungen und Tage fürs Journal – und was nicht übernommen werden kann. **Importieren** legt alles in einem Schritt an.

Was daraus wird:

- **Wohin es kommt:** Aus einer Arbeitsbereichsdatei (`.affine`) mit mehreren Einträgen auf oberster Ebene – Ordner, Dokumente ohne Ordner, Sammlungen – entsteht **eine Seite mit dem Namen des AFFiNE-Arbeitsbereichs**, unter der alles liegt; die Vorschau nennt sie („Alles unter einer Seite …“). Ein **Snapshot** und ein Arbeitsbereich mit nur einem Eintrag auf oberster Ebene kommen **direkt in den Zielbereich** – ohne leere Seite darüber. Ein Whiteboard zählt dabei zu seinem Dokument; Journal-Dokumente gehen ins Journal.
- **Ordner** werden zu Seiten mit ihren Dokumenten darunter. Steht ein Dokument in mehreren Ordnern, liegt es im ersten; die anderen Ordner verlinken es. Dokumente ohne Ordner liegen auf oberster Ebene – unter der Arbeitsbereichsseite, wenn es sie gibt.
- **Text:** Überschriften, Absätze, Aufzählungen, nummerierte Listen, **To-dos** mit ihrem Haken, Aufklapplisten, Zitate, Codeblöcke mit Sprache, Hinweisblöcke (Callouts, Art nach Farbe: Rot → Achtung, Orange/Gelb → Warnung, Grün → Tipp, Lila → Wichtig, sonst Hinweis; ihr Emoji wird zum [Symbol des Hinweises](/documents#eigenes-symbol-und-eigene-farbe)), Trennlinien, Tabellen, LaTeX (Block und im Text), Fett, Kursiv, Unterstrichen, Durchgestrichen, Code, Links, Text- und Hervorhebungsfarben.
- **Links zwischen Dokumenten** – im Text (@-Verweise), als Karten verlinkter oder synchronisierter Dokumente und als AFFiNE-App-Links – zeigen auf die importierten Seiten. Synchronisierte Dokumente werden dabei zu Links.
- **Tags** werden zu Tags der Seite, mit ihren Farben aus AFFiNE (als neue Datenbank: Eigenschaft *Tags*).
- **Bilder und Anhänge** werden hochgeladen und an ihrer Stelle gezeigt (Bilder als Bild, andere Dateien als Link). Lesezeichen und Einbettungen (YouTube, Figma, GitHub …) werden zu Links.
- **Datenbanken** werden zu einer Datenbank-Seite unter ihrem Dokument und erscheinen im Dokument an derselben Stelle als eingebettete Datenbank. Spalten: Titel, Text, Zahl, Auswahl, Mehrfachauswahl, Datum, Kontrollkästchen, Link (Adresse), Fortschritt (Zahl in Prozent) und Erstellt. Zeilen behalten ihren Inhalt als Dokument des Eintrags. Tabellenansichten bleiben Tabellen, Kanban-Ansichten werden Boards nach derselben Spalte. Bild-Spalten werden nicht übernommen.
- **Whiteboards (Edgeless):** Der Text eines Dokuments wird immer ein Dokument. Liegt auf seiner Edgeless-Fläche mehr als die Notiz mit dem Text – Formen, Verbinder, Texte, Bilder, Rahmen, weitere Notizen, Zeichnungen, Mindmaps – oder öffnet AFFiNE das Dokument im Edgeless-Modus, entsteht daneben ein Whiteboard **„Name – Whiteboard“**. Dokument und Whiteboard sind verlinkt: oben im Dokument steht der Link zum Whiteboard, auf dem Whiteboard zeigt eine Karte auf das Dokument (dort, wo die Notiz lag). Formen (Rechteck, abgerundet, Ellipse, Raute, Dreieck) mit Text und Farben, Verbinder (gerade, gewinkelt, gebogen, mit Pfeilen und Beschriftung, an ihren Formen befestigt), Texte, Pinselstriche, Bilder, Rahmen, weitere Notizen (als Haftnotizen), Gruppen und Mindmaps (Knoten als Formen, Äste als Verbinder) werden übernommen. Was keine Entsprechung hat, fällt weg; die Vorschau nennt die Zahl.
- **Sammlungen** werden je zu einer Seite **„Sammlung: Name“** mit Links auf ihre Dokumente zum Zeitpunkt des Imports: die von Hand hinzugefügten und die, auf die die Regeln passen (Tags, Erstellt/Geändert, Titel, Favoriten, Journal). Die Regeln stehen als Text auf der Seite. Lassen sich nicht alle Regeln auswerten (etwa Regeln auf eigene Eigenschaften), stehen nur die von Hand hinzugefügten Dokumente darin, mit einem Hinweis. Eine Sammlung in einem Ordner liegt in diesem Ordner.
- **Journal:** Journal-Dokumente von AFFiNE kommen in das [Journal](/journal) des Arbeitsbereichs, jeweils in den passenden Tag – ins Journal im Zielbereich, sonst in eines im Arbeitsbereich, in das du schreiben darfst; gibt es keines, legt der Import eines an. Fehlt der Tag, wird er angelegt; gibt es ihn schon, wird der Text unten angehängt (mit dem Titel des AFFiNE-Dokuments als Überschrift).
- Dokumente im **Papierkorb** von AFFiNE werden nicht übernommen. HTML-Einbettungen und Data Views fallen weg; die Vorschau nennt sie.
- Whiteboards, Datenbanken und Journal-Tage gibt es nur beim Import **als Seiten**; als neue Datenbank wird jedes Dokument ein Eintrag.
- **Große Arbeitsbereiche:** Die `.affine`-Datei darf größer als 100 MB sein (siehe [Grenzen oben](#confluence-evernote-google-docs-und-obsidian)). Der Server schreibt sie beim Hochladen direkt auf die Platte und liest Bilder und Anhänge erst beim Import einzeln – der Arbeitsspeicher wächst mit den Dokumenten, nicht mit den Dateien. Steht ein Reverse-Proxy davor, muss er so große Anfragen durchlassen (siehe [Coolify und Reverse Proxy](/coolify-and-proxy#pangolin-traefik-und-andere-proxys)).
- Sicherheit: Die Datei wird nur gelesen; Größe, Anzahl und Verschachtelung der Dokumente sind begrenzt, Text wird nie als HTML übernommen, Links behalten nur `http`, `https` und `mailto`.

## Von Confluence

1. In Confluence: **Bereichseinstellungen → Exportieren** (Confluence Cloud: **Bereichseinstellungen → Bereich exportieren**). Wähle **HTML** oder **XML**, jeweils mit allen Seiten.
2. In Flowplan das ZIP wie oben importieren (Quelle **Confluence** oder automatisch).

Was daraus wird:

- Der **Seitenbaum** des Bereichs wird zum Seitenbaum in Flowplan (aus `index.html` bzw. den Elternseiten in `entities.xml`; fehlt eine Seite dort, helfen die Brotkrumen).
- **Info-, Tipp-, Hinweis- und Warnungs-Makros** werden zu Hinweisblöcken (Info → Hinweis, Tipp → Tipp, Hinweis → Warnung, Warnung → Achtung), **Code-Makros** zu Codeblöcken, **Aufklappen** zu Aufklappblöcken, **Aufgabenlisten** zu Aufgaben mit ihrem Status.
- **Bilder** und **Anhänge** werden hochgeladen; Anhänge, die im Text nicht vorkommen, stehen als Links am Ende der Seite. **Links auf andere Seiten** des Bereichs zeigen auf die importierten Seiten.
- Im XML-Export zählt nur die aktuelle Fassung jeder Seite; ältere Versionen und Blogbeiträge werden übersprungen. Erstellungs- und Änderungsdatum werden übernommen.
- Makros ohne Entsprechung (etwa Inhaltsverzeichnis, Jira-Abfragen) fallen weg; die Vorschau nennt sie.

## Von Evernote

1. In Evernote ein Notizbuch über **… → Notizbuch exportieren** als **ENEX** speichern. Mehrere Notizbücher packst du zusammen in ein ZIP.
2. In Flowplan die `.enex`-Datei oder das ZIP importieren.

Was daraus wird:

- Jede **Notiz** wird eine Seite; bei mehreren Notizbüchern wird jedes Notizbuch eine Seite mit seinen Notizen darunter.
- Der Notiztext (ENML) wird zu normalem Text mit Formatierung, Listen und Tabellen; **Kontrollkästchen** werden zu Aufgaben.
- **Bilder und Anhänge** (in der ENEX-Datei eingebettet) werden hochgeladen und an ihrer Stelle im Text gezeigt; PDFs und andere Dateien als Link. Anhänge ohne Platz im Text kommen ans Ende.
- **Tags**, **Erstellt**/**Geändert** und die **Quelladresse** bleiben erhalten – am besten als neue Datenbank importieren, dann sind es Eigenschaften zum Filtern und Sortieren.
- Verschlüsselter Text lässt sich nicht übernehmen; die Vorschau warnt.

## Von Google Docs

1. Unter [takeout.google.com](https://takeout.google.com) **Drive** wählen und bei den Formaten für Dokumente **HTML** (empfohlen) oder **Microsoft Word** einstellen. Einzelne Dokumente gehen auch über **Datei → Herunterladen → Webseite (.html, gezippt)** oder **Microsoft Word (.docx)**.
2. In Flowplan das Takeout-ZIP, das ZIP der Webseite oder die `.docx`-Datei importieren (Quelle **Google Docs**).

Was daraus wird:

- Jedes Dokument wird eine Seite, **Drive-Ordner** werden zu übergeordneten Seiten.
- Überschriften, Fett, Kursiv, Unterstrichen, Durchgestrichen, **verschachtelte Listen**, Tabellen und Links werden übernommen; Googles Umleitungslinks zeigen wieder direkt auf ihr Ziel.
- **Bilder** werden hochgeladen – auch die, die im HTML eingebettet sind.
- Word-Dateien: Absätze, Überschriften, Listen (nummeriert und mit Aufzählungszeichen, auch verschachtelt), Tabellen (mit verbundenen Spalten), Links und Bilder. Kommentare, Fußnoten und Kopf-/Fußzeilen fallen weg.

## Von Obsidian und anderen Markdown-Ordnern

- **Ein Tresor als Seiten:** den Tresor-Ordner (mit dem Ordner `.obsidian`) als ZIP packen und unter **Einstellungen → Import & Export → Import** importieren – über **AFFiNE, Confluence, Evernote, Google Docs oder Obsidian** mit Vorschau oder über den Notion-/Markdown-Import, der einen Tresor ebenfalls erkennt.
  - **Ordner** werden zu Seiten mit ihren Notizen darunter. Eine **Ordnernotiz** (`Projekte/Projekte.md` oder `Projekte.md` neben dem Ordner) wird selbst zur Seite des Ordners.
  - **Wikilinks** `[[Seite]]`, `[[Seite|Text]]`, `[[Ordner/Seite]]` und `[[Seite#Überschrift]]` werden zu Links auf die importierten Seiten – aufgelöst wie in Obsidian über den Pfad oder den Dateinamen. Links auf Notizen, die es nicht gibt, bleiben Text.
  - **Eingebettete Dateien** `![[bild.png]]` werden zu Bildern, `![[datei.pdf]]` zu Dateilinks; eingebettete Notizen `![[Notiz]]` werden zu Links.
  - **Callouts** wie `> [!note]` oder `> [!warning] Titel` werden zu Hinweisblöcken der passenden Art.
  - **Tags** aus dem Frontmatter (`tags:`) und im Text (`#tag`, nicht in Code) werden gesammelt: als Seiten als Tags der Seite, als neue Datenbank in der Eigenschaft *Tags* – zusammen mit *Ordner* für die Herkunft. Weitere Schlüssel des Frontmatters werden als Seiten zu [Eigenschaften](/import-export-versions#frontmatter-eintraege-als-markdown-dateien).
- **Notizen mit Frontmatter in eine vorhandene Datenbank:** in einer Datenbank **CSV oder Markdown importieren** wählen und die `.md`-Dateien oder ein ZIP nehmen. Die YAML-Eigenschaften werden zu Spalten – siehe [Frontmatter](/import-export-versions#frontmatter-eintraege-als-markdown-dateien).
- **Aliasse:** `aliases: [PAC, Pompe à chaleur]` (oder `alias:`) im Frontmatter wird zu den [Aliassen](/pages-and-spaces#aliasse) der Seite bzw. zur Eigenschaft [Aliasse](/properties-and-formulas#aliasse) des Eintrags. @-Erwähnungen, Suche und nicht verlinkte Erwähnungen finden „Chauffage“ dann auch über „PAC“, und der Markdown-Export schreibt sie wieder als `aliases:` zurück.

## Nach dem Umzug

- **Links prüfen:** Verweise zwischen importierten Seiten zeigen auf die neuen Seiten; Links auf Seiten außerhalb des Exports bleiben Links auf das alte Werkzeug.
- **Ansichten einrichten:** Ein Import legt je Datenbank eine Tabelle an. Board, Kalender, Galerie oder Zeitleiste fügst du danach hinzu – siehe [Ansichten](/views).
- **Teilen:** Rechte werden nicht übernommen. Lade Mitglieder ein oder teile einzelne Seiten – siehe [Teilen und Veröffentlichen](/sharing).
- **Daten bleiben mitnehmbar:** Flowplan exportiert jederzeit wieder als Markdown mit Frontmatter, CSV und ZIP, auf Wunsch geplant und per Git – siehe [Import, Export und Versionen](/import-export-versions).

## Warum umziehen?

- **Komplett Open Source:** Der gesamte Quellcode steht unter der AGPL-3.0 auf [GitHub](https://github.com/yannicschuller/flowplan) – ohne geschlossene Enterprise-Version und ohne Funktionen hinter einer Lizenz.
- **Deine Daten, dein Server:** gehostet auf flowplan.org in Deutschland oder als ein Docker-Container auf deinem eigenen Server – siehe [Installation](/installation).
- **Kein Tracking.**
