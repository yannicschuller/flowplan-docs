# Whiteboards

Eine unendliche Fläche für Brainstorming, Abläufe und Workshops: Notizzettel, Formen, Verbindungen, Stift, Rahmen und Tabellen – gemeinsam und live.

## Werkzeuge

| Werkzeug | Taste | Wofür |
| --- | --- | --- |
| Auswählen | <kbd>V</kbd> | Elemente markieren, verschieben, skalieren, drehen; Rahmen aufziehen für Mehrfachauswahl |
| Verschieben | <kbd>H</kbd> | Fläche bewegen (auch mit Leertaste + Ziehen oder zwei Fingern) |
| Notizzettel | <kbd>N</kbd> | Farbige Zettel mit Text |
| Text | <kbd>T</kbd> | Freier Text |
| Form | <kbd>R</kbd> | Rechteck, abgerundet, Ellipse, Raute, Dreieck, Sechseck, Stern, Pfeil, Wolke |
| Verbindungslinie | <kbd>L</kbd> | Gerade, geschwungen oder gewinkelt; haftet an Elementen und folgt ihnen |
| Stift | <kbd>P</kbd> | Freihand zeichnen |
| Radierer | <kbd>X</kbd> | Gezeichnete Striche löschen: einfach darüberfahren |
| Rahmen | <kbd>F</kbd> | Bereiche gruppieren – und Folien für die Präsentation |
| Tabelle | <kbd>G</kbd> | Einfache Tabelle auf der Fläche |
| Kommentar | <kbd>C</kbd> | Kommentar an eine Stelle heften |
| Stempel | <kbd>E</kbd> | Schnelle Reaktion (👍 ❤️ ⭐ ✅ ❓ 🔥 💡 🎉) auf ein Element; noch einmal nimmt sie zurück |
| Laserpointer | <kbd>K</kbd> | Zeigen, ohne etwas zu verändern: alle sehen eine kurz nachleuchtende rote Spur |

### So ist die Leiste aufgebaut

- **Links** stehen die Werkzeuge zum Erstellen: Auswählen, Verschieben, Notizzettel, Text, Form, Verbindungslinie, **Zeichnen**, Rahmen, Tabelle und Kommentar. **Zeichnen** fasst Stift, Radierer und Laserpointer zusammen: Der Knopf zeigt das zuletzt benutzte, oben im Optionsfenster schaltest du um. Die Tasten aus der Tabelle gelten weiter für alle Werkzeuge.
- **+** (**Einfügen und mehr**) öffnet ein Fenster mit Suche – tippen filtert, <kbd>Enter</kbd> nimmt den ersten Treffer:
  - **Einfügen:** Bild, Bilder und Symbole, Emoji, Stempel, Seite verknüpfen (Karte mit Link auf eine Flowplan-Seite), Einbetten (Video, Webseite oder PDF, siehe [unten](#videos-webseiten-und-pdfs-einbetten)), Zeitleiste und Importieren (Excalidraw, draw.io, Mermaid, PlantUML)
  - **Vorlagen & Bibliothek:** [Vorlagen](#vorlagen), Formenbibliothek und Racks (siehe [Racks und Verkabelung](#racks-und-verkabelung))
  - **KI**, wenn sie für dich eingeschaltet ist
- **Moderation** oben rechts: Abstimmung, Timer, Privater Modus, Schätzen, Alle zu mir holen und Folge mir (siehe [Gemeinsam arbeiten](#gemeinsam-arbeiten)). Ein Punkt am Knopf zeigt, dass gerade etwas läuft.
- **Unten links** eine Leiste mit Rückgängig und Wiederholen, Zoom, den Pfeilen zum vorigen und nächsten Rahmen, **Präsentieren** (beides, sobald es Rahmen gibt) und **…** (**Ansicht und Aktionen**: Raster, Einpassen, Vollbild, Kommentare, Rahmen-Übersicht, Minikarte, Suche, Prototyp und Export).
- **Auf dem Handy** steht die Leiste unten: Auswählen, Verschieben, Notizzettel, Text, Form, Zeichnen und **Weitere Werkzeuge** – darin dasselbe wie unter **+**, ebenfalls mit Suche. **Moderation** ist das Symbol oben rechts.

Wer nur lesen darf, sieht Auswählen, Verschieben, den Laserpointer und die Leiste unten.

## Elemente gestalten

Ausgewählte Elemente zeigen eine Leiste mit Farbe, Schriftgröße, Fett, Ausrichtung, Linienstärke und -verlauf, **Nach vorne**/**Nach hinten**, **Duplizieren** (<kbd>⌘</kbd> <kbd>D</kbd>) und **Löschen** (<kbd>Entf</kbd>). Zettel und Texte lassen sich auch **verdecken** – wie ein Spoiler im Dokument, per Klick aufdecken.

Doppelklick bearbeitet den Text eines Elements. Kopieren und Einfügen funktioniert innerhalb und zwischen Whiteboards. **Kursiv** und **Unterstrichen** gelten wie **Fett** für den ganzen Text eines Elements.

## Gruppieren

Mehrere Elemente auswählen und <kbd>⌘</kbd> <kbd>G</kbd> drücken (oder **Gruppieren** in der Leiste): Die Elemente verhalten sich danach wie eines. Ein Klick wählt die ganze Gruppe, und sie wird gemeinsam verschoben, an den Ecken skaliert, dupliziert, kopiert, gesperrt und gelöscht. Gruppen lassen sich wieder zu größeren Gruppen zusammenfassen.

- **Doppelklick** auf ein gruppiertes Element betritt die Gruppe: Eine gestrichelte Linie zeigt sie, und Klicks wählen nun einzelne Elemente darin (bei verschachtelten Gruppen die nächste Ebene). <kbd>Esc</kbd> oder ein Klick daneben verlässt die Gruppe.
- <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>G</kbd> oder **Gruppierung aufheben** löst die äußerste Gruppe der Auswahl auf.
- Kopien einer Gruppe sind eine eigene, neue Gruppe. Wie jede Änderung wird das Gruppieren live geteilt und lässt sich mit <kbd>⌘</kbd> <kbd>Z</kbd> zurücknehmen.

## Listen, Links und Schlagwörter

In Zetteln, Formen und Texten gibt es einfache Formatierungen im Text selbst:

| Schreibweise | Ergebnis |
| --- | --- |
| `- Punkt` | Aufzählung (die Knöpfe **Aufzählung** und **Nummerierte Liste** in der Leiste setzen sie für die markierten Zeilen) |
| `1. Punkt` | Nummerierte Liste; <kbd>Enter</kbd> setzt die Liste fort, eine leere Zeile beendet sie |
| `**fett**`, `*kursiv*`, `__unterstrichen__` | Einzelne Wörter hervorheben – beim Schreiben mit <kbd>⌘</kbd> <kbd>B</kbd>, <kbd>⌘</kbd> <kbd>I</kbd>, <kbd>⌘</kbd> <kbd>U</kbd> |
| `[Text](https://…)` | Link – **Link in den Text einfügen** in der Leiste fügt ihn um die Markierung ein |

Links dürfen nur auf `https://`, `http://` und `mailto:` zeigen oder auf ein Element desselben Boards (siehe unten); andere Adressen bleiben einfacher Text. Web-Links öffnen sich in einem neuen Tab. Daneben kann jedes Element einen eigenen **Link** tragen (Kettensymbol in der Leiste); ein kleines Symbol an der Ecke führt dorthin.

**Schlagwörter** an Zetteln erscheinen als farbige Chips an der Unterkante – jedes Schlagwort hat immer dieselbe Farbe. In der Board-Suche hebt **Nur Zettel mit Schlagwort** alle Zettel mit diesem Schlagwort hervor und blendet den Rest ab.

## Links zu Rahmen und Elementen

**Link zu diesem Element kopieren** (in der Leiste eines ausgewählten Elements oder in der Rahmen-Übersicht) kopiert eine Adresse wie `…/#page=…&item=…`. Wer sie öffnet, sieht das Board, auf das Element gezoomt und ausgewählt – sofern sie das Board lesen darf.

Innerhalb des Boards führen Links auf Elemente per Kamerafahrt dorthin: im Link-Feld eines Elements oder im Text als `[Zum Ziel](#item=…)`. Fehlt das Element inzwischen, sagt ein Hinweis das.

## Mindmaps

Einen Zettel, eine Form oder einen Text auswählen und <kbd>Tab</kbd> drücken: Rechts entsteht ein verbundener Zweig, der sofort beschriftet werden kann. <kbd>Tab</kbd> am neuen Zweig verzweigt weiter, <kbd>⌥</kbd> <kbd>Enter</kbd> legt ein Geschwister an. Die Mindmap ordnet sich dabei selbst: Zweige stehen rechts neben ihrem Elternteil, gleichmäßig verteilt und mittig ausgerichtet. **Mindmap anordnen** in der Leiste eines Elements ordnet den ganzen Baum neu. Tippen auf einem ausgewählten Zettel beginnt direkt mit dem Schreiben.

## Diagramme: Formenbibliotheken

**Formenbibliothek** unter **+** (oder **Weitere Formen …** im Formmenü) öffnet ein durchsuchbares Seitenfeld, auf dem Telefon als Blatt von unten. Ein Klick oder <kbd>Enter</kbd> legt die Form in die Mitte der Ansicht, oder du ziehst sie an die gewünschte Stelle; Pfeiltasten wandern durch die Formen. Gesucht wird auf Deutsch und Englisch („Raute“, „decision“, „Gateway“ …).

| Bibliothek | Formen |
| --- | --- |
| Flussdiagramm | Prozess, Entscheidung, Start/Ende, Daten, Dokument(e), vordefinierter Prozess, manuelle Eingabe und Operation, Datenbank, Vorbereitung, Verzögerung, Anzeige, Verbindungsstelle, Seitenverbinder, interner Speicher, Zusammenführung, Schleifengrenze, Anmerkung |
| BPMN | Start-, Zwischen-, End-, Zeit- und Nachrichtenereignis, Aufgabe, Teilprozess, Benutzer- und Serviceaufgabe, exklusives, paralleles und inklusives Gateway, Datenobjekt, Datenspeicher, Pool, Lane, Gruppe |
| UML | Klasse (mit Abschnitten), Schnittstelle, Aufzählung, Akteur, Anwendungsfall, Komponente, Paket, Notiz, Lebenslinien, Aktivierung, Start- und Endknoten, Zustand, Verzweigung, Gabelung, Knoten, kombiniertes Fragment |
| ER-Diagramm | Entität mit Attributzeilen, schwache Entität, Beziehung, (Schlüssel-, mehrwertiges) Attribut |
| Organigramm | Person, Team, offene Stelle |
| Netzwerk | Server, Datenbankserver, Internet, Firewall, Router, Switch, Laptop, Arbeitsplatz, Smartphone, Tablet, Benutzer, WLAN, Drucker, Web |
| Cloud-Architektur | Rechenleistung, Objektspeicher, verwaltete Datenbank, Warteschlange, Funktion, CDN, Lastverteiler, Container, API-Gateway, Cache, Überwachung, Geheimnisse, virtuelles Netzwerk, Ereignisse |
| Wireframes | Browser-, Smartphone- und Tablet-Rahmen, Dialog, Schaltflächen, Eingabe- und Suchfeld, Kontrollkästchen, Optionsfeld, Schalter, Auswahlliste, Reiter, Navigationsleiste, Karte, Liste, Bild- und Symbolplatzhalter, Avatar, Text, Schieberegler, Fortschrittsbalken |

Alle Formen sind Vektorgrafiken, übernehmen Füllung, Linienfarbe und -stärke aus der Leiste, lassen sich verbinden und erscheinen genauso im SVG-, PNG- und Markdown-Export. Doppelklick bearbeitet den Text; bei Klassen und Entitäten trennt eine Zeile `--` die Abschnitte (Name, Attribute, Methoden). Die Cloud-Symbole sind neutrale, eigens für Flowplan gezeichnete Symbole – keine Logos oder Symbolsätze von AWS, Azure oder Google Cloud.

**Linienenden**: Bei ausgewählten Verbindungslinien wählst du Anfang und Ende getrennt: Pfeil, offener Pfeil, Dreieck (Vererbung), Raute (Aggregation), gefüllte Raute (Komposition), Kreis, Punkt, Kreuz und die Krähenfuß-Enden für ER-Diagramme (eins, genau eins, null oder eins, viele, eins oder viele, null oder viele).

## Automatisch anordnen

Mehrere verbundene Formen auswählen → **Automatisch anordnen** → **Von oben nach unten** oder **Von links nach rechts**. Flowplan ordnet das Diagramm in Ebenen an (mit möglichst wenig Kreuzungen), die linke obere Ecke bleibt, wo sie war, und die Verbindungslinien bleiben angeheftet. Ein <kbd>⌘</kbd> <kbd>Z</kbd> macht alles auf einmal rückgängig. Gesperrte Elemente bleiben stehen.

## Mermaid und PlantUML importieren

Füge Mermaid- oder PlantUML-Text einfach auf dem Board ein (<kbd>⌘</kbd> <kbd>V</kbd>), zieh eine `.mmd`- oder `.puml`-Datei darauf oder wähle **Mermaid/PlantUML importieren …** unter **+**. Daraus werden bearbeitbare Formen und Verbindungslinien, automatisch angeordnet:

- **Mermaid**: `flowchart`/`graph` (mit Formen, Beschriftungen, Untergraphen als Rahmen), `sequenceDiagram`, `classDiagram`, `erDiagram` (mit Krähenfüßen), `stateDiagram`, `mindmap`.
- **PlantUML**: Aktivitätsdiagramme (`start`, `:Aktion;`, `if`/`else`, `while`, `fork` …), Sequenz-, Klassen-, Anwendungsfall- und Komponentendiagramme sowie `@startmindmap`.

Alles wird auf deinem Gerät gelesen – kein PlantUML-Server, kein Java. Der Dialog zeigt vorab, was erkannt wurde. Zeilen, die Flowplan nicht versteht, werden übersprungen und mit Zeilennummer aufgelistet; reine Gestaltung (`style`, `skinparam`, Themes) wird stillschweigend ignoriert. Grenzen: 100.000 Zeichen, 400 Formen, 800 Verbindungen, 40 Teilnehmer im Sequenzdiagramm, Dateien bis 200 KB.

**Als Mermaid kopieren** (im Exportmenü) kopiert die ausgewählten Formen samt Verbindungen – oder das ganze Board – als Mermaid-Flussdiagramm in die Zwischenablage, etwa für ein Mermaid-Diagramm in einem Dokument.

## Wireframes und klickbare Prototypen

Mit den Wireframe-Formen skizzierst du Bildschirme, am besten je Bildschirm einen **Rahmen** (z. B. mit dem Smartphone-Rahmen darin). Wähle ein Element aus – eine Schaltfläche, eine Form, einen Zettel – und stelle in der Leiste **Bei Klick → Rahmen** ein, oder **Bei Klick → zurück**. Ein kleines Pfeilsymbol am Element zeigt die Verknüpfung.

**Prototyp abspielen** (erscheint, sobald es Rahmen gibt) zeigt den ausgewählten Rahmen – oder den ersten – bildschirmfüllend. Klicks auf verknüpfte Elemente wechseln den Bildschirm; ein Klick daneben oder der Knopf **Klickbare Stellen zeigen** hebt kurz alle klickbaren Stellen hervor. **Zurück** (<kbd>←</kbd>), **Neu starten** (<kbd>Pos1</kbd>) und <kbd>Esc</kbd> zum Beenden. Verknüpfte Elemente sind auch per Tastatur erreichbar (<kbd>Tab</kbd>, <kbd>Enter</kbd>).

Beim Kopieren, Duplizieren und Einfügen zeigen Verknüpfungen auf die mitkopierten Rahmen; Archive und Exporte behalten sie.

## Zeitleisten (Roadmaps)

**Zeitleiste** unter **+** (oder in der Formenbibliothek unter „Planung“) legt eine Roadmap mit Zeitskala, Spuren und Balken an. Ist die Zeitleiste ausgewählt, verschiebst du Balken direkt auf dem Board – auch in eine andere Spur – und ziehst an ihren Enden, um Beginn oder Ende zu ändern. Eine rote Linie markiert heute.

Doppelklick oder **Zeitleiste bearbeiten** öffnet die Einstellungen: Titel, Skala (**Wochen**, **Monate**, **Quartale**), Zeitraum (bis etwa drei Jahre), Heute-Markierung, Spuren und Balken mit Titel, Spur, Daten und Farbe (bis 40 Spuren und 400 Balken).

Als **Quelle** kannst du statt eigener Balken eine **Datenbank** wählen: Die Einträge mit Datum werden zu Balken (Beginn, optional Ende), eine Auswahl-Eigenschaft liefert die Spuren. Die Zeitleiste ist live: Sie zeigt den aktuellen Stand, und wer die Einträge bearbeiten darf, verschiebt mit einem Balken die Daten des Eintrags (eine Uhrzeit bleibt erhalten). Jede Person sieht nur die Einträge, die sie in der Datenbank lesen darf; die Einträge werden nicht im Board gespeichert und erscheinen deshalb nicht in Exporten oder der Suche des Boards.

## Racks und Verkabelung

Auf einem Whiteboard planst du Server-Racks: Racks mit ihren Höheneinheiten (HE), Geräte darin, Ports an den Geräten und Kabel von Port zu Port. Racks und Geräte sind Elemente wie Zettel und Formen – du kombinierst sie frei mit Notizen, Text, Rahmen und Netzwerkdiagrammen aus der [Formenbibliothek](#diagramme-formenbibliotheken). Gemeinsames Arbeiten, Rückgängig, Kommentare, Präsentieren und der Export als SVG, PNG oder PDF funktionieren wie bei allen anderen Elementen.

### Racks anlegen

**Racks** unter **+** öffnet die Gerätebibliothek (auf dem Smartphone unter **Weitere Werkzeuge** als Blatt). Oben legst du ein **Rack 42 HE**, **Rack 24 HE** oder einen **Wandschrank 12 HE** an – per Klick neben das letzte Rack oder per Ziehen an eine Stelle. Mehrere Racks stehen so nebeneinander.

Ein ausgewähltes Rack zeigt rechts seine **Details**: Name, Standort, Höhe in HE (1–60), Breite (10″, 19″ oder 23″), **Ansicht** Vorder- oder Rückseite, **Max. Leistung** (W) und **Max. Gewicht** (kg), dazu die belegten HE, die Summe aus Leistung und Gewicht und die Liste der Geräte. Die Höhe änderst du auch mit den Griffen oben und unten am Rack. **Vorne/Hinten** in der Leiste über dem Rack dreht es um.

### Geräte einbauen

Die Bibliothek enthält Server (1, 2 und 4 HE), Speicher/NAS, Switches (24 und 48 Ports, 24 × SFP+, jeweils mit SFP-Uplinks und Konsole), Patchfelder (24 und 48 Ports, LWL mit 24 × LC), Router, Firewall, USV, PDU (1 HE und senkrecht als 0 HE), Blindplatten, Kabelführung und Fachböden – jeweils mit Höhe, Ports, Leistung und Gewicht.

- **Ziehen** legt ein Gerät an eine Stelle: über einem Rack rastet es an ganzen HE ein, daneben liegt es frei auf dem Board.
- **Klicken** (oder <kbd>Enter</kbd> im Suchfeld) setzt es in das ausgewählte Rack – oder in das Rack in der Mitte der Ansicht – an den obersten freien Platz. Ist das Rack voll, liegt das Gerät daneben.
- Eingebaute Geräte verschiebst du mit der Maus in andere HE oder in ein anderes Rack; mit <kbd>↑</kbd>/<kbd>↓</kbd> um eine HE (<kbd>⇧</kbd>: fünf HE), mit <kbd>⌥</kbd> <kbd>↑</kbd>/<kbd>↓</kbd> änderst du die Höhe. Die Griffe oben und unten ändern die Höhe ebenfalls in ganzen HE.
- **Duplizieren** (<kbd>⌘</kbd> <kbd>D</kbd>) setzt die Kopie an den nächsten freien Platz desselben Racks. Wird ein Rack gelöscht, gehen seine Geräte mit.
- Überschneiden sich zwei Geräte oder ragt eines aus dem Rack, werden beide rot schraffiert und mit **!** markiert; das Rack zählt sie in seinen Details.

Geräte können **halbe Tiefe** haben (vorne oder hinten eingebaut): Ein vorderes und ein hinteres Gerät teilen sich dann dieselben HE. In der anderen Ansicht erscheinen sie nur als gestrichelter Umriss. Senkrechte PDUs baust du als **0 HE links/rechts** in den seitlichen Kanal.

Die **Details** eines Geräts: Name, Art, Hersteller, Modell, Seriennummer, Höhe, Position (unterste HE), Einbau, Tiefe, Farbe, Leistung (W), Gewicht (kg), Notizen – bei PDU und USV auch **Belastbar bis** (W) mit der aktuellen Last. **Aus dem Rack nehmen** legt es neben das Rack.

**Als eigenes Gerät speichern** legt das Gerät mit seinen Ports und Werten in der Bibliothek des Arbeitsbereichs ab (Abschnitt **Eigene Geräte**). Löschen dürfen es die Person, die es gespeichert hat, und Besitzer des Arbeitsbereichs.

### Ports

Jedes Gerät hat Ports mit Name, Typ (RJ45, SFP, SFP+, SFP28, QSFP+, QSFP28, LC, SC, MPO, Konsole, USB, C13, C14, C19, C20, Schuko, DC), Seite (vorne oder hinten), Bezeichnung und VLAN. Gezeichnet werden die Ports der Seite, die das Rack zeigt; verbundene Ports tragen die Farbe ihres Kabels, ein Tooltip nennt Name, Typ und Bezeichnung. In den Details änderst oder entfernst du Ports und fügst mit **Ports hinzufügen** mehrere auf einmal hinzu (Anzahl, Typ, Seite, Präfix wie `Gi1/0/`). Ein Klick auf einen Port auf dem Board zeigt ihn in den Details.

### Kabel

Kabel sind Verbindungslinien, deren Enden auf Ports sitzen: Mit dem **Verbindungswerkzeug** (<kbd>L</kbd>) ziehst du von einem Port zu einem anderen – auch zwischen zwei Racks. Eine Linie, die auf einem Port beginnt oder endet, wird zum Kabel; der Typ richtet sich nach den Ports (Strom, Konsole, Glasfaser, DAC oder Cat6a). Ohne Zeichnen geht es in den Details eines Geräts: **Verbinden …** am Port, dann Gerät und freien Port wählen.

Kabel laufen wie in einem aufgeräumten Rack: vom Port zur Kante des Geräts, durch den seitlichen Kanal und zwischen Racks über die Racks hinweg; jedes Kabel hat seine eigene Spur. Liegen sich zwei Ports direkt gegenüber – an der Unterkante des oberen und der Oberkante des unteren Geräts, oder an derselben Kante eines Geräts – und steht kein anderes Gerät dazwischen, läuft das Kabel gerade hinüber statt durch den Kanal. Farbe und Strich richten sich nach dem Typ (z. B. OM3 türkis, OM4 violett, OS2 gelb, Strom dick, DAC gestrichelt), eine eigene Farbe hat Vorrang. Fährst du über ein Kabel oder wählst es aus, leuchten beide Enden auf. **Kabel zeigen** im Menü der Ansicht blendet alle Kabel aus und wieder ein (die Wahl gilt in diesem Browser).

Die **Details** eines Kabels: die beiden Enden (ein Klick springt zum Gerät und Port), Kabeltyp (Cat5e, Cat6, Cat6a, Cat7, Cat8, OM3, OM4, OM5, OS2, DAC, AOC, Strom, Konsole, Sonstiges), Farbe, Beschriftung, Länge in Metern, VLAN und Notizen. Steckt auf einem Port mehr als ein Kabel, weisen die Details darauf hin.

### Strom und Gewicht

Leistung und Gewicht der Geräte ergeben die Summen je Rack (im Rack-Kopf und in den Details). Stromkabel von einer PDU oder USV zu einem Gerät ergeben die Last der PDU: Ein Gerät mit zwei Netzteilen an zwei PDUs verteilt seine Leistung auf beide, eine PDU an einer USV gibt ihre ganze Last an die USV weiter. Überschreitet ein Rack seine **Max. Leistung** oder sein **Max. Gewicht** oder eine PDU/USV ihre Belastbarkeit, erscheint eine Warnung im Rack-Kopf, am Gerät und in den Details.

### Ports und Kabel im Überblick

**Ports und Kabel** (im Menü der Ansicht und in der Gerätebibliothek) zeigt alle Ports des Boards als Tabelle – Rack, Gerät, Port, Typ, verbunden mit, Kabel, VLAN – und alle Kabel mit Beschriftung, Typ, Enden, Länge und VLAN. Filtern nach Text, Kategorie (Netzwerk, Glasfaser, Strom) und Belegung (verbunden, frei), Sortieren per Klick auf die Spaltenköpfe; ein Klick auf eine Zeile zeigt das Gerät oder Kabel auf dem Board. **Als CSV exportieren** lädt die gefilterte Liste herunter, **Etiketten drucken** druckt für jedes Kabel ein Etikett je Ende (Beschriftung, dieses Ende, das andere Ende, Typ, Länge, VLAN).

### Importieren und exportieren

- **JSON exportieren** (Gerätebibliothek) speichert die Racks mit Geräten, Ports und Kabeln – die ausgewählten oder alle – als Datei; **JSON importieren** legt sie auf ein Board. So übernimmst du Racks in andere Boards und Arbeitsbereiche.
- **Aus NetBox …** holt Racks aus [NetBox](https://netboxlabs.com/): NetBox-Adresse, ein API-Token (Lesen genügt) und optional Standort (Slug) und Racknamen eingeben. Flowplan fragt Racks, Geräte, Gerätetypen (Höhe, Tiefe, Gewicht), Schnittstellen, Front- und Rear-Ports, Konsole, Strom-Ports und Kabel einmal ab und legt sie auf das Board (bis 20 Racks). Adresse und Token werden nur für diese Abfrage verwendet und nicht auf dem Server gespeichert; **Adresse und Token in diesem Browser merken** speichert sie nur in deinem Browser. NetBox muss über eine öffentliche HTTPS-Adresse erreichbar sein – für ein NetBox im internen Netz siehe `NETBOX_ALLOW_PRIVATE` in der [Konfiguration](/configuration#integrationen).
- Der **SVG-, PNG- und PDF-Export** des Boards zeigt die Racks, wie sie auf dem Board stehen. Der **Markdown-Export** enthält zum SVG-Bild des Boards einen Abschnitt **Racks und Verkabelung** mit den Geräten je Rack, der Portbelegung und der Kabelliste als Tabellen.

Die KI und [MCP](/mcp) (`read_page`) lesen die Racks, Geräte, Ports und Kabel eines Boards als Text mit. Auf dem Smartphone siehst du Racks und bearbeitest sie: Tippen wählt ein Gerät, **Details** in der Leiste öffnet die Details als Blatt, die Gerätebibliothek liegt unter **Weitere Werkzeuge**.

## Ausrichten, stapeln und sortieren

- Beim Verschieben rasten Kanten und Mitten an anderen Elementen ein; orange **Hilfslinien** zeigen, woran. <kbd>⌥</kbd> beim Ziehen schaltet das Einrasten ab.
- **Am Raster ausrichten** (Rasterknopf unten) lässt Elemente ohne Nachbarn am 24-Punkte-Raster einrasten.
- Mehrere Elemente auswählen → **Anordnen**: links, mittig, rechts, oben, mittig oder unten ausrichten, gleichmäßig verteilen oder als Zeile bzw. Spalte stapeln.
- Für Workshops: **Nach Farbe gruppieren**, **Nach Person gruppieren** (mit Überschriften), **Nach Stimmen sortieren** oder **Als Raster anordnen**.

## Stift und Formerkennung

Mit einem Tablet-Stift (etwa Apple Pencil) folgt die Strichstärke dem Druck. Im Stiftmenü wählst du die Farbe; mit **Formen erkennen** werden gezeichnete Linien, Rechtecke, Kreise, Dreiecke und Rauten zu sauberen Formen (<kbd>⌥</kbd> beim Loslassen behält den Strich).

Sobald du auf einem Gerät mit dem Stift gezeichnet hast, zeichnet nur noch der Stift: Finger verschieben und zoomen die Fläche, eine aufliegende Hand hinterlässt keine Striche. Liegt die Hand auf, während der Stift zeichnet, unterbricht oder verschiebt sie den Strich nicht. **Nur mit dem Stift zeichnen** im Stiftmenü schaltet das ab – dann zeichnen auch Finger, nur nicht die Hand, die den Stift hält: Eine Berührung, während der Stift zeichnet oder schwebt oder kurz nachdem er abgesetzt wurde, verschiebt stattdessen die Fläche. Setzt der Stift leicht auf, beginnt der Strich nicht dick, und die Breite folgt dem Druck gleichmäßig. Mit Scribble darfst du über den Rand eines offenen Textes auf der Fläche hinausschreiben; der Text bleibt offen. Ein schwebender Apple Pencil (iPad Pro, iPad Air ab M2) zeigt, wo der Strich beginnt; das Radierer-Ende eines Stifts löscht wie der **Radierer**. In der [iPad-App](/offline-and-apps#apps-fuer-iphone-ipad-und-android) wechselt Doppeltippen oder Drücken des Apple Pencil je nach iPad-Einstellung zum Radierer und zurück, zum vorigen Werkzeug oder zum Stift. Dasselbe gilt beim Markieren von Bildern in Dokumenten.

## Bilder, Symbole und Einträge

- **Bilder und Symbole** (unter **+**) sucht frei lizenzierte Bilder bei Openverse; ausgewählte Bilder werden auf den Server geladen, der Bildnachweis steht als Tooltip am Bild. Außerdem gibt es die Symbolbibliothek in zehn Farben.
- **Zuschneiden** (in der Leiste eines Bildes): Ausschnitt mit Maus, Finger oder Pfeiltasten wählen (<kbd>⇧</kbd> ändert die Größe). Das Bild selbst bleibt unverändert – **Ganzes Bild zeigen** macht den Zuschnitt jederzeit rückgängig, und auch Exporte zeigen den Ausschnitt.
- **GIFs**: Hat die Instanz einen Schlüssel für GIPHY oder Tenor (siehe [Konfiguration](/configuration#integrationen)), gibt es in **Bilder und Symbole** einen Reiter **GIFs**. Die Suche läuft über den Server; ein gewähltes GIF wird wie die Openverse-Bilder auf den Server geladen (bis 8 MB), danach lädt das Board nichts mehr vom Anbieter. Ohne Schlüssel fehlt der Reiter.
- **Seite verknüpfen → Eintrag aus „…“** legt einen Datenbankeintrag als Karte ab. Die Karte zeigt Titel und bis zu drei Eigenschaften und bleibt aktuell, wenn sich der Eintrag ändert; ein Doppelklick öffnet ihn.

Karten verknüpfter Dokumente zeigen, wenn sie hoch genug sind, die ersten Zeilen der Seite als kleine Vorschau.

## Videos, Webseiten und PDFs einbetten

**Einbetten** unter **+** (am Handy unter **Weitere Werkzeuge**) nimmt einen Link auf:

- **Videos und Webseiten** von YouTube, Vimeo, Loom, Spotify, Figma und CodePen – dieselbe Liste wie für Einbettungen in Dokumenten. Andere Adressen werden abgelehnt. Das Board zeigt zuerst nur eine Vorschau mit dem Anbieter; der Inhalt lädt erst nach einem Klick auf **Laden**, in einem abgeschotteten Rahmen (Sandbox), und **Einbettung schließen** entlädt ihn wieder. YouTube läuft über `youtube-nocookie.com`.
- **PDFs**: **PDF hochladen …** oder eine PDF-Datei aufs Board ziehen. Die Datei wird in der Seite gespeichert und zählt zum Speicherkontingent; das Board zeigt eine Seite als Vorschau, mit Pfeilen zum Blättern. Ein Doppelklick öffnet den PDF-Betrachter.

Exporte zeigen statt des Players eine Karte mit Anbieter und Link.

## Zettel als Datenbankeinträge

Aus einem Brainstorming wird ein Backlog: Zettel auswählen → in der Leiste **Als Einträge in Datenbank …** (Datenbank-Symbol). Ohne Auswahl nimmt der Dialog die Zettel im sichtbaren Bereich, mit einem ausgewählten Rahmen dessen Zettel. Das funktioniert auch ganz ohne KI.

1. **Ziel-Datenbank** wählen – angeboten werden Datenbanken, in die du Einträge schreiben darfst.
2. **Zuordnung:** Die erste Zeile des Zettels wird zum **Titel**, weitere Zeilen zum Inhalt des Eintrags. Optional wird die **Farbe** zu einer Auswahl-Eigenschaft (für jede Zettelfarbe eine Option; gleichnamige Optionen wie „Gelb“ oder „Rot“ sind vorbelegt) und der **Autor** des Zettels zu einer Personen-Eigenschaft.
3. **Durch Karten ersetzen** tauscht die Zettel gegen Eintragskarten an derselben Stelle – Verbindungslinien hängen danach an der Karte. **Behalten und verknüpfen** lässt die Zettel stehen und legt die Karten daneben, mit einer gestrichelten Linie verbunden.

Die Karten sind live: Ändert jemand den Eintrag in der Datenbank, zeigt das Board es sofort. Andere sehen die neuen Karten wie jede Änderung; ein <kbd>⌘</kbd> <kbd>Z</kbd> nimmt die Änderung am Board in einem Schritt zurück (die Einträge bleiben in der Datenbank).

- Höchstens 500 Zettel auf einmal; der Server legt sie in Paketen zu 100 an, ein Fortschritt zeigt den Stand, **Abbrechen** hält an – was schon angelegt ist, kommt aufs Board.
- Ein zweiter Versuch nach einem Fehler legt nichts doppelt an.
- Werte werden geprüft wie jede Bearbeitung: gesperrte Eigenschaften, vorhandene Optionen, nur Mitglieder als Personen.
- **Mit KI aufteilen** (wenn KI für dich verfügbar ist): Die KI liest den Text der Zettel und füllt weitere Eigenschaften – etwa Verantwortlich, Fälligkeit oder Priorität. Erst eine **Vorschau** zeigt die Werte je Zettel, Unpassendes steht mit Grund daneben; angelegt wird erst danach.
- Über die [API](/api-and-webhooks) heißt der Befehl `whiteboard.toRecords`.

## KI auf dem Whiteboard

Ist [KI](/ai) für dich eingeschaltet, öffnet **KI** unter **+** (am Handy unter **Weitere Werkzeuge**) diese Funktionen. Ohne KI fehlt der Knopf, alles andere funktioniert wie gewohnt; auf Boards, die die KI nicht lesen darf, sind die Einträge ausgegraut mit dem Grund.

- **Nach Thema gruppieren (KI)** – auch im Menü **Anordnen**, sobald zwei Zettel ausgewählt sind: Die KI findet Themen in den ausgewählten Zetteln (ohne Auswahl: im sichtbaren Bereich) und ordnet sie in beschrifteten Spalten an, wie **Nach Farbe gruppieren**. Zettel ohne Text und solche, die nirgends passen, landen unter „Sonstiges“.
- **Zusammenfassen als Seite** – liest das Board (oder die Auswahl bzw. den ausgewählten Rahmen) und legt daneben eine Seite an: Zusammenfassung, Themen, **Entscheidungen**, **Offene Fragen** und **Aufgaben**, mit einem Link zurück zum Board. Mit **Aufgaben übernehmen** werden die Aufgaben echte Aufgaben mit Person und Termin, wenn das Board sie nennt – sie erscheinen in **Meine Aufgaben**. Rahmen werden zu Abschnitten; große Boards liest die KI in Teilen, und die Seite nennt, was über die Grenze von 2.000 Elementen hinaus weggelassen wurde.
- **Mit KI erzeugen …** – eine **Mindmap** oder ein **Flussdiagramm** aus einer Beschreibung, etwa „Ablauf einer Urlaubsanfrage mit Genehmigung“. Es entsteht in der Mitte des sichtbaren Bereichs (oder rechts daneben, wenn dort schon etwas liegt) aus normalen Formen und Verbindungslinien; die Mindmap nutzt das Layout von **Mindmap anordnen**. Höchstens 60 bzw. 40 Knoten.

Jede Aktion zeigt ihren Fortschritt und lässt sich **abbrechen**; ein Fehler steht mit **Erneut versuchen** im Dialog. Das Ergebnis ist eine gewöhnliche Änderung am Board: Alle sehen sie live, und **ein** <kbd>⌘</kbd> <kbd>Z</kbd> nimmt sie ganz zurück. Verdeckte Zettel bleiben vor der KI verborgen, verknüpfte Seiten und Einträge liest sie nur, wenn sie sie lesen darf.

## Navigieren

- Zoomen mit <kbd>⌘</kbd> + Mausrad, Trackpad-Geste oder den Knöpfen in der Leiste unten links.
- **Alles anzeigen** (<kbd>⇧</kbd> <kbd>1</kbd>) passt die Ansicht an alle Elemente an, <kbd>⇧</kbd> <kbd>2</kbd> an die Auswahl – mit einer weichen Kamerafahrt, die jede Eingabe sofort beendet.
- Rückgängig <kbd>⌘</kbd> <kbd>Z</kbd>, Wiederholen <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>Z</kbd>.
- **Minikarte** (im Menü **…** der Leiste unten, **Ansicht und Aktionen**): eine kleine Übersicht aller Elemente mit dem sichtbaren Ausschnitt. Klicken oder Ziehen springt dorthin; mit dem Fokus auf der Minikarte verschieben die Pfeiltasten die Ansicht. Ob sie offen ist, merkt sich der Browser.
- **Auf dem Board suchen** (<kbd>⌘</kbd> <kbd>F</kbd> auf dem Board, oder im Menü **…** unten): durchsucht Zettel, Formen, Texte, Tabellen, Rahmen, Kommentare, Einbettungen sowie Seiten- und Eintragskarten. <kbd>Enter</kbd> und <kbd>⇧</kbd> <kbd>Enter</kbd> (oder die Pfeile) springen zum nächsten bzw. vorigen Treffer, der hervorgehoben wird; <kbd>Esc</kbd> schließt die Suche.

## Gemeinsam arbeiten

- **Live-Cursor**: Du siehst die Mauszeiger der anderen mit Namen in Echtzeit, wie in Miro. Wer außerhalb deines Ausschnitts arbeitet, erscheint als Markierung am Rand; ein Klick darauf springt hin.
- Änderungen erscheinen bei allen innerhalb von Sekunden, auch nach einer Unterbrechung ohne Verbindung.
- **Timer** für Workshop-Phasen, sichtbar für alle. Auf Wunsch läuft dazu **Hintergrundmusik** (Ruhig, Fokus oder Lo-fi): im Timer-Fenster unter **Musik während des Timers** wählen. Sie startet und endet mit dem Timer für alle; Lautstärke und Stumm stellt jede Person für sich über das Lautsprecher-Symbol im Timer ein. Blockiert der Browser den Ton, weil auf der Seite noch nichts angeklickt wurde, erscheint **Ton an**. Die Musik entsteht im Browser, ohne Audiodateien und ohne externe Dienste.
- **Abstimmung**: Stimmen pro Person festlegen, starten; alle vergeben Punkte auf Elemente, das **Ergebnis** zeigt die Reihenfolge. **Verdeckt abstimmen** zeigt jeder Person nur die eigenen Stimmen, bis die Abstimmung endet – so beeinflusst niemand die anderen.
- **Folge mir** (unter **Moderation**): Alle anderen sehen deinen Ausschnitt und folgen dir beim Verschieben und Zoomen. Wer selbst schiebt oder zoomt, hört auf zu folgen und kann mit **Folgen** zurück. **Beenden** hebt es für alle auf.
- **Kommentare** an Stellen der Fläche, mit Antworten und Erwähnungen.
- **Privater Modus** (Auge-durchgestrichen-Symbol) für stilles Brainstorming: Wer das Whiteboard bearbeiten darf, startet ihn für das ganze Whiteboard oder nur für einen **Rahmen**. Solange er läuft, sieht jede Person nur ihre eigenen neuen Zettel und Elemente in diesem Bereich (gestrichelt markiert, „nur für dich“); von den anderen erscheint nur die **Anzahl** als verdeckte Platzhalter – ohne Text und ohne Namen. **Aufdecken** zeigt alle Beiträge gleichzeitig allen und beendet den Modus; das kann jede Person mit Bearbeitungsrecht, auch wenn die Moderation den Raum verlassen hat. Private Inhalte bleiben auf dem Server getrennt gespeichert und erreichen bis zum Aufdecken weder die Browser der anderen noch Suche, Exporte, Vorschauen, API oder KI-Funktionen. Neu laden, ein zweiter Tab oder später Dazukommende sind kein Problem; Änderungen ohne Verbindung werden nachgereicht.
- **Schätzen (Planning Poker)**: Zettel oder Datensatzkarten auswählen – oder einen Rahmen, dann alle darin – und **Schätzen** wählen. Als Kartensatz gibt es Fibonacci (1, 2, 3, 5, 8, 13, 21, ?, ☕), T-Shirt-Größen (XS–XL) oder eigene Werte. Alle wählen verdeckt eine Karte; zu sehen ist nur, wer schon geschätzt hat. **Karten aufdecken** zeigt die Verteilung, Durchschnitt, Median und ob es einen **Konsens** gibt. **Ergebnis übernehmen** schreibt den Wert als Etikett an den Zettel – bei Datensatzkarten in eine Zahl-, Auswahl- oder Text-Eigenschaft des Eintrags (mit den üblichen Rechten). Danach **Nächstes Element** oder **Neu schätzen**.
- **Alle zu mir holen**: Alle anderen springen einmal zu deinem aktuellen Ausschnitt – anders als bei „Folge mir“ bewegen sie sich danach wieder frei. Mit einem ausgewählten Rahmen holt das Magnet-Symbol alle **zu diesem Rahmen**. Die anderen sehen einen Hinweis („Mara hat alle hierher geholt“) und kommen mit **Zurück** an ihre vorige Stelle.

## Rahmen-Übersicht

**Rahmenübersicht** (im Menü **…** der Leiste unten, **Ansicht und Aktionen**) listet alle Rahmen mit kleiner Vorschau – auf dem Handy als Blatt von unten.

- Ein Klick auf die Vorschau fährt zum Rahmen; der Name lässt sich direkt umbenennen.
- **Ziehen** am Griff (oder <kbd>⌥</kbd> + Pfeiltasten) ändert die Reihenfolge – sie ist die Reihenfolge der Präsentation und wird mit dem Board gespeichert. Solange niemand sortiert, gilt die Leserichtung (von oben nach unten, links nach rechts).
- **In der Präsentation ausblenden** (Augensymbol) lässt einen Rahmen beim Präsentieren aus, ohne ihn zu löschen.
- **Sprechernotizen** je Rahmen, sichtbar nur in der Präsentation.
- Außerdem: **Link zu diesem Element kopieren**, **Rahmen exportieren** und **Ab hier präsentieren**.

## Präsentieren

Sobald es Rahmen gibt, erscheint **Präsentieren** in der Leiste unten links; die Pfeile daneben fahren auch ohne Präsentation zum vorigen bzw. nächsten Rahmen. Die Rahmen werden in der Reihenfolge der Rahmen-Übersicht nacheinander bildschirmfüllend gezeigt, ausgeblendete Rahmen fehlen; alles außerhalb des aktuellen Rahmens tritt zurück. Pfeiltasten oder die Knöpfe blättern, **Präsentation beenden** oder <kbd>Esc</kbd> schließt.

- **Sprechernotizen** blendet die Notizen des Rahmens ein.
- **Referentenansicht** öffnet dieselbe zweite Ansicht wie bei [Dokumenten](/documents#sprechernotizen-und-referentenansicht): aktuelle und nächste Folie, die Notizen und die verstrichene Zeit. Beide Fenster bleiben im Gleichschritt – Blättern geht in jedem von beiden.

## Vorlagen

**Vorlagen** öffnet eine durchsuchbare Galerie mit Vorschau, nach Kategorien sortiert:

| Kategorie | Vorlagen |
| --- | --- |
| Retrospektiven | Retrospektive, 4L-Retrospektive, Seestern-Retrospektive |
| Planung | Kanban, User Story Map, Sprint-Planung, Projektzeitplan, Eisenhower-Matrix, Aufwand-Nutzen-Matrix |
| Strategie | OKR, SWOT-Analyse, Lean Canvas, Business Model Canvas, Customer Journey |
| Ideen | Empathy Map, Brainstorming, Mindmap |
| Diagramme | Flussdiagramm, Entscheidungsbaum, Organigramm |
| Besprechungen | Besprechungsagenda, Eisbrecher |

Eine Vorlage landet in der Mitte der Ansicht und ist danach normaler Inhalt des Boards.

**Eigene Vorlagen**: Unter **Als Vorlage speichern** wird das ganze Board oder die Auswahl zur Vorlage – **Für den Arbeitsbereich** oder **Nur für mich**. Kommentare, Stimmen und Stempel bleiben draußen, Bilder und PDFs bleiben Dateien des Arbeitsbereichs. Eigene Vorlagen stehen im Reiter **Eigene Vorlagen**; löschen können sie die Person, die sie gespeichert hat, und Besitzer. Höchstens 500 Vorlagen je Arbeitsbereich.

## Excalidraw und draw.io importieren

Über **Importieren …** unter **+** – oder indem du die Datei aufs Board ziehst – übernimmst du Zeichnungen aus:

- **Excalidraw** (`.excalidraw`),
- **draw.io / diagrams.net** (`.drawio`, `.xml`, auch komprimiert und mit mehreren Seiten) sowie **SVG-Exporte von draw.io** mit eingebettetem Diagramm.

Formen, Texte, Pfeile mit ihren Verbindungen und Beschriftungen, Freihandstriche, Rahmen, Farben, Linienstärken, Strichelungen und Drehungen werden zu Whiteboard-Elementen. Mehrere draw.io-Seiten landen nebeneinander, jede in einem eigenen Rahmen. Was Flowplan nicht kennt (Schablonen, Einbettungen, externe Bilder), wird zu einer Notiz mit seinem Text. Eingebettete Bilder (PNG, JPEG, GIF, WebP) werden als Dateien der Seite gespeichert und zählen zum Speicherkontingent.

- Ziehst du eine solche Datei in ein **Dokument**, entsteht darunter ein neues Whiteboard, das gleich eingebettet wird.
- Im **ZIP-Import** (siehe [Importieren](/import-export-versions#importieren)) werden `.excalidraw`- und `.drawio`-Dateien zu Whiteboard-Seiten.
- Grenzen: 20 MB je Datei (30 MB entpackt), 3.000 Elemente, 50 Seiten. Flowplan lädt beim Import nichts aus dem Internet; Texte werden als reiner Text übernommen.

## Einbetten und exportieren

- Mit `/board` im Dokument wird ein Whiteboard Teil einer Seite; der Knopf oben rechts öffnet es groß.
- **Als PNG exportieren** oder **Als SVG exportieren** speichert das Whiteboard als Bild.
- **Exportieren … (PNG, SVG, PDF)** öffnet den Export-Dialog: Was (**Ganzes Board**, **Auswahl** oder ein einzelner Rahmen), Format und bei PNG die **Auflösung** 1×, 2× oder 4×. Als **PDF** kommt das Board **Alles auf einer Seite** oder mit **Eine Seite pro Rahmen** in der Reihenfolge der Präsentation (ausgeblendete Rahmen fehlen). Der Export entsteht im Browser; der Server sieht davon nichts.
- Im [Markdown-Export](/import-export-versions#exportieren) kommt jedes Whiteboard automatisch als SVG mit.
- Die Texte auf dem Board sind durchsuchbar und erscheinen in Exporten.
- **Als Mermaid kopieren** übernimmt Formen und Verbindungen als Mermaid-Flussdiagramm (siehe oben).
