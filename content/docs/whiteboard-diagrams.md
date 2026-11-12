---
keywords: Mindmap, Flussdiagramm, UML, BPMN, Mermaid, PlantUML, Excalidraw, draw.io, Wireframe, Roadmap
---

# Diagramme, Mindmaps und Prototypen

Auf dem Whiteboard: Mindmaps per Tab, Formenbibliotheken für Flussdiagramme und Netzwerke, Mermaid, PlantUML, Excalidraw und draw.io, Wireframes und Roadmaps.

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

## Excalidraw und draw.io importieren

Über **Importieren …** unter **+** – oder indem du die Datei aufs Board ziehst – übernimmst du Zeichnungen aus:

- **Excalidraw** (`.excalidraw`),
- **draw.io / diagrams.net** (`.drawio`, `.xml`, auch komprimiert und mit mehreren Seiten) sowie **SVG-Exporte von draw.io** mit eingebettetem Diagramm.

Formen, Texte, Pfeile mit ihren Verbindungen und Beschriftungen, Freihandstriche, Rahmen, Farben, Linienstärken, Strichelungen und Drehungen werden zu Whiteboard-Elementen. Mehrere draw.io-Seiten landen nebeneinander, jede in einem eigenen Rahmen. Was Flowplan nicht kennt (Schablonen, Einbettungen, externe Bilder), wird zu einer Notiz mit seinem Text. Eingebettete Bilder (PNG, JPEG, GIF, WebP) werden als Dateien der Seite gespeichert und zählen zum Speicherkontingent.

- Ziehst du eine solche Datei in ein **Dokument**, entsteht darunter ein neues Whiteboard, das gleich eingebettet wird.
- Im **ZIP-Import** (siehe [Importieren](/import-export-versions#importieren)) werden `.excalidraw`- und `.drawio`-Dateien zu Whiteboard-Seiten.
- Grenzen: 20 MB je Datei (30 MB entpackt), 3.000 Elemente, 50 Seiten. Flowplan lädt beim Import nichts aus dem Internet; Texte werden als reiner Text übernommen.

## Wireframes und klickbare Prototypen

Mit den Wireframe-Formen skizzierst du Bildschirme, am besten je Bildschirm einen **Rahmen** (z. B. mit dem Smartphone-Rahmen darin). Wähle ein Element aus – eine Schaltfläche, eine Form, einen Zettel – und stelle in der Leiste **Bei Klick → Rahmen** ein, oder **Bei Klick → zurück**. Ein kleines Pfeilsymbol am Element zeigt die Verknüpfung.

**Prototyp abspielen** (erscheint, sobald es Rahmen gibt) zeigt den ausgewählten Rahmen – oder den ersten – bildschirmfüllend. Klicks auf verknüpfte Elemente wechseln den Bildschirm; ein Klick daneben oder der Knopf **Klickbare Stellen zeigen** hebt kurz alle klickbaren Stellen hervor. **Zurück** (<kbd>←</kbd>), **Neu starten** (<kbd>Pos1</kbd>) und <kbd>Esc</kbd> zum Beenden. Verknüpfte Elemente sind auch per Tastatur erreichbar (<kbd>Tab</kbd>, <kbd>Enter</kbd>).

Beim Kopieren, Duplizieren und Einfügen zeigen Verknüpfungen auf die mitkopierten Rahmen; Archive und Exporte behalten sie.

## Zeitleisten (Roadmaps)

**Zeitleiste** unter **+** (oder in der Formenbibliothek unter „Planung“) legt eine Roadmap mit Zeitskala, Spuren und Balken an. Ist die Zeitleiste ausgewählt, verschiebst du Balken direkt auf dem Board – auch in eine andere Spur – und ziehst an ihren Enden, um Beginn oder Ende zu ändern. Eine rote Linie markiert heute.

Doppelklick oder **Zeitleiste bearbeiten** öffnet die Einstellungen: Titel, Skala (**Wochen**, **Monate**, **Quartale**), Zeitraum (bis etwa drei Jahre), Heute-Markierung, Spuren und Balken mit Titel, Spur, Daten und Farbe (bis 40 Spuren und 400 Balken).

Als **Quelle** kannst du statt eigener Balken eine **Datenbank** wählen: Die Einträge mit Datum werden zu Balken (Beginn, optional Ende), eine Auswahl-Eigenschaft liefert die Spuren. Die Zeitleiste ist live: Sie zeigt den aktuellen Stand, und wer die Einträge bearbeiten darf, verschiebt mit einem Balken die Daten des Eintrags (eine Uhrzeit bleibt erhalten). Jede Person sieht nur die Einträge, die sie in der Datenbank lesen darf; die Einträge werden nicht im Board gespeichert und erscheinen deshalb nicht in Exporten oder der Suche des Boards.
