---
keywords: Vorschau, 3D, CAD, STL, STEP, OBJ, glTF, 3MF, IGES, DXF, DWG, Zeichnung, Layer, Messen, HTML, Skripte, Tabelle, CSV, Excel, XLSX
---

# Dateien ansehen

3D-Modelle, CAD- und 2D-Zeichnungen, HTML-Dateien und Tabellen öffnest du direkt in Flowplan – ohne Herunterladen und ohne zusätzliches Programm.

## 3D- und CAD-Dateien {since=0.11.0}

**STL**, **OBJ**, **glTF/GLB**, **3MF**, **STEP/STP** und **IGES/IGS** zeigt Flowplan im 3D-Viewer, statt sie nur zum Herunterladen anzubieten. Lädst du eine solche Datei in ein Dokument, erscheint eine Karte mit Würfel-Symbol und **Im 3D-Viewer öffnen**; ein Klick öffnet den Viewer. Dasselbe gilt für 3D-Dateien in den **Medien** (Filter **3D/CAD**), in Dateien-Eigenschaften von Datenbanken, in Links auf solche Dateien und auf veröffentlichten Seiten. In bearbeitbarem Text öffnet ein Link den Viewer mit <kbd>⌘</kbd>-Klick.

- **Drehen, verschieben, zoomen**: Ziehen mit der Maus dreht das Modell, die rechte Maustaste (oder <kbd>Strg</kbd>/<kbd>⌘</kbd> beim Ziehen) verschiebt es, das Mausrad zoomt an der Stelle des Mauszeigers. Auf Touch-Geräten dreht ein Finger, zwei Finger zoomen und verschieben. Hat die 3D-Ansicht den Tastaturfokus, verschieben die Pfeiltasten; <kbd>+</kbd>/<kbd>−</kbd> zoomen, <kbd>0</kbd> geht zur Startansicht, <kbd>Esc</kbd> schließt den Viewer.
- **Ansichten**: **Vorne**, **Oben**, **Seite** und **Iso** zeigen das ganze Modell von vorn, von oben, von rechts und schräg von oben (isometrisch). Bei STL, 3MF, STEP und IGES zeigt Z nach oben (wie in CAD-Programmen), bei glTF und OBJ Y. Das Haus-Symbol (**Startansicht**) kehrt zur isometrischen Ansicht zurück, **Einpassen** zeigt das ganze Modell aus der aktuellen Richtung.
- **Abmessungen**: Unten stehen die Kanten des umgebenden Quaders (Breite × Tiefe × Höhe) und die Zahl der Dreiecke.
- **Messen**: Nach **Messen** klickst (oder tippst) du zwei Punkte auf der Oberfläche an; eine Linie verbindet sie, ein Etikett nennt den Abstand, und die Liste unten sammelt alle Messungen. Ziehen dreht weiterhin. Das Papierkorb-Symbol löscht alle Messungen, das **×** an einer Messung nur diese.
- **Drahtgitter** zeigt die Dreiecke des Modells statt der Flächen.
- **Einheiten**: STEP und IGES rechnet der CAD-Leser in Millimeter um, glTF/GLB ist in Metern, 3MF nennt seine Einheit selbst. STL und OBJ speichern keine Einheit – Flowplan nimmt Millimeter an und sagt es dazu.
- **Größe**: Der Viewer öffnet Netze (STL, OBJ, glTF/GLB, 3MF) bis 200 MB und STEP/IGES bis 100 MB; größere Dateien lassen sich weiterhin herunterladen. Was du hochladen darfst, bestimmt die maximale Dateigröße der Administration. glTF-Dateien müssen alles enthalten (am besten als GLB); mit Draco oder KTX2 komprimierte Modelle zeigt der Viewer nicht.
- **Offline**: Für STEP und IGES lädt Flowplan beim ersten Öffnen den CAD-Leser (OpenCascade, etwa 7 MB) vom eigenen Server – nie von einem fremden. Er ist nicht Teil der [Offline-Kopie](/offline-and-apps); ohne Verbindung öffnen sich STEP- und IGES-Dateien also erst, wenn der Leser einmal geladen wurde. STL, OBJ, glTF und 3MF gehen auch offline, sobald die Datei auf dem Gerät ist.

Gelesen wird die Datei im Browser, die großen in einem eigenen Thread, damit die Seite bedienbar bleibt; das Original bleibt unverändert, **Herunterladen** lädt es.

### 2D-Zeichnungen: DXF und DWG {since=0.11.0}

Technische Zeichnungen im **DXF**- und **DWG**-Format (AutoCAD und viele andere CAD-Programme) öffnet Flowplan im Zeichnungs-Viewer. Die Karte im Dokument trägt ein Blaupausen-Symbol und **Im Zeichnungs-Viewer öffnen**; sonst gilt dasselbe wie für 3D-Dateien – auch in den **Medien** (Filter **3D/CAD**), in Dateien-Eigenschaften und auf veröffentlichten Seiten.

- **Verschieben und zoomen**: Ziehen (mit der Maus oder einem Finger) verschiebt die Zeichnung, das Mausrad oder zwei Finger zoomen. Mit dem Tastaturfokus auf der Zeichnung verschieben die Pfeiltasten; <kbd>+</kbd>/<kbd>−</kbd> zoomen, <kbd>0</kbd> passt die ganze Zeichnung ein, <kbd>Esc</kbd> schließt.
- **Layer**: **Layer** öffnet die Liste aller Layer mit Farbe und Zahl der Objekte; ein Häkchen blendet einen Layer ein oder aus, **Alle ein** und **Alle aus** schalten alle. Layer, die in der Zeichnung ausgeschaltet oder gefroren sind, sind zuerst ausgeblendet. **Einpassen** zeigt alles, was gerade sichtbar ist.
- **Dargestellt** werden Linien, Polylinien (auch mit Bögen), Kreise, Bögen, Ellipsen, Splines (angenähert), Texte und Mehrzeilentexte (ohne Schriftarten), Blöcke mit Verschiebung, Drehung, Skalierung und Anordnungen, Bemaßungen (so, wie das CAD-Programm sie gezeichnet hat), Schraffuren (Volltonfüllungen voll, Muster als helle Fläche) und gefüllte Flächen (SOLID). Farben kommen aus der Zeichnung (Farbindex, Echtfarben, VONLAYER, VONBLOCK), ebenso Linientypen wie gestrichelt. Weiß gezeichnete Objekte erscheinen auf weißem Papier schwarz. 3D-Körper, Bilder und Tabellen zeigt der Viewer nicht – unten steht, wie viele Objekte das betrifft; das Layout (Papierbereich) bleibt außen vor, gezeigt wird der Modellbereich.
- **Papier**: Das Mond-Symbol wechselt auf dunkles Papier, die Sonne zurück auf weißes.
- **Messen**: Nach **Messen** klickst (oder tippst) du zwei Punkte an. Jeder Punkt rastet am nächsten Endpunkt, Eckpunkt oder Mittelpunkt in der Nähe ein, damit Maße genau werden; die Liste unten nennt den Abstand und die Abstände entlang X und Y.
- **Einheit und Größe**: Die Einheit nennt die Zeichnung selbst (Millimeter, Zoll, Meter …); ohne Angabe misst der Viewer in Zeichnungseinheiten und sagt es dazu. Unten steht die Größe der sichtbaren Zeichnung.
- **Dateigröße**: DXF bis 100 MB, DWG bis 50 MB. Sehr große Zeichnungen zeigt der Viewer nur zum Teil und sagt es dazu. Binäre DXF-Dateien liest er nicht – speichere sie als DXF im Textformat.
- **DWG**: Für DWG lädt Flowplan beim ersten Öffnen einen DWG-Leser (LibreDWG, etwa 11 MB) vom eigenen Server; er ist nicht Teil der [Offline-Kopie](/offline-and-apps), DWG-Dateien brauchen beim ersten Mal also eine Verbindung. DXF geht auch offline. Gelesen werden DWG-Dateien von AutoCAD R14 bis zum aktuellen Format (seit AutoCAD 2018 unverändert), ältere aus R11/R12 meist ebenfalls. Lässt sich eine Datei nicht lesen, sagt der Viewer es – **exportiere die Zeichnung dann in deinem CAD-Programm als DXF** und lade diese Datei hoch; DXF liest der Viewer aus jeder Version.

## HTML-Dateien {since=0.11.0}

Eine hochgeladene **HTML-Datei** (`.html`, `.htm`) öffnest du mit **Vorschau öffnen** – in Dokumenten, den **Medien**, Dateien-Eigenschaften und veröffentlichten Seiten. Die Vorschau ist abgeschottet: **Skripte und externe Inhalte sind abgeschaltet**, und die Seite kommt nicht an deine Daten; eingebettete Bilder und eigene Stile werden gezeigt. **Skripte ausführen** lässt sie abgeschottet laufen, ohne Netzwerk; `FLOWPLAN_HTML_PREVIEW_SCRIPTS=0` blendet das aus. {since=0.11.1} Mit **Bei dieser Datei immer zulassen** merkt sich Flowplan das in deinem Konto: Die Datei startet dann auf all deinen Geräten gleich mit laufenden Skripten (genauso abgeschottet), andere werden weiter gefragt. Ändert sich die Datei, fragt Flowplan erneut; Häkchen weg, und es ist vergessen. Deine Liste siehst und leerst du unter **Einstellungen → Sicherheitscheck → HTML-Dateien mit Skripten**. In Freigabelinks und auf veröffentlichten Seiten gilt das nicht, und auf Instanzen mit abgeschalteten Skripten auch nicht. Bis 5 MB (`FLOWPLAN_HTML_PREVIEW_MB`), sonst lädst du sie herunter – im Browser geöffnet gilt dieser Schutz nicht mehr.

## Tabellen {since=0.11.0}

Eine **CSV**- oder **Excel-Datei** (`.xlsx`) öffnest du mit **Vorschau öffnen** – in Dokumenten, den **Medien**, Dateien-Eigenschaften und veröffentlichten Seiten. Die Ansicht ist schreibgeschützt: Blätter als Reiter, ein Filter für Zeilen, Sortieren per Klick auf den Spaltenbuchstaben. Bis 5.000 Zeilen und 200 Spalten aus Dateien bis 20 MB (`FLOWPLAN_SHEET_PREVIEW_MB`); Formeln zeigen ihr gespeichertes Ergebnis. Alte `.xls`-Dateien lädst du herunter.
