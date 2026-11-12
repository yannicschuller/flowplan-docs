---
keywords: Bild, Datei, Anhang, Upload, PDF, Einbettung, YouTube, Medien, Sprachnotiz, Transkription
---

# Bilder, Dateien und Sprachnotizen

Bilder, Dateien, PDFs und Einbettungen in Dokumenten – hochladen, anmerken, wieder löschen – und Sprachnotizen, die Flowplan auf Wunsch abschreibt.

## Bilder, Dateien und Einbettungen

- **Einfügen aus der Zwischenablage** (++⌘ V++) oder Hineinziehen lädt Bilder und Dateien hoch. Bilder lassen sich an den Rändern in der Größe ändern.
- **Fotos werden vor dem Hochladen verkleinert**: höchstens 2560 px an der längeren Seite, gespeichert als WebP. Die Kameradrehung bleibt erhalten, Metadaten wie der Aufnahmeort werden entfernt. GIFs, SVGs und Dateien, die kaum kleiner würden, bleiben unverändert. Anhänge in Dateien-Eigenschaften und Formularen werden im Original gespeichert.
- **PDFs** erscheinen als Karte mit einer Vorschau der ersten Seite. Ein Klick öffnet den PDF-Viewer mit allen Seiten, Zoom und **Herunterladen**. Mit zwei Fingern zoomst du stufenlos an der Stelle zwischen den Fingern und verschiebst die Seiten – wie in [Notizbüchern](/notebooks), auch beim bloßen Lesen; auf dem Trackpad mit der Pinch-Geste oder Strg + Scrollen. Die Knöpfe und <kbd>⌘</kbd> <kbd>+</kbd>/<kbd>−</kbd> ändern den Zoom in Schritten von 25 %. <kbd>Esc</kbd> schließt den Viewer. Dasselbe gilt für PDFs in den Medien, in Dateien-Eigenschaften von Datenbanken und auf veröffentlichten Seiten. In bearbeitbarem Text öffnet ein Link auf ein PDF den Viewer mit <kbd>⌘</kbd>-Klick. Im Viewer lässt sich auf dem PDF schreiben – siehe [PDFs anmerken](#pdfs-anmerken).
- **Bilder markieren**: Doppelklick auf ein Bild (oder den Stift in der Werkzeugleiste, solange das Bild ausgewählt ist) öffnet es zum Bearbeiten – mit **Stift**, **Textmarker**, **Pfeil**, **Rechteck**, **Kreis** und **Text**, sieben Farben und drei Strichstärken, Rückgängig mit ++⌘ Z++. **Speichern** legt ein neues Bild mit den Markierungen an; das Original und die Markierungen bleiben am Bild, sodass sie sich später ändern oder ganz entfernen lassen.
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

Wer die Seite bearbeiten darf, zu der ein PDF gehört, findet im PDF-Viewer **Anmerken** (nicht in [verschlüsselten Bereichen](/encrypted-spaces) und auf gesperrten Seiten). Darunter erscheint eine Werkzeugleiste: **Stift** (mit dem Apple Pencil oder einem anderen Tablet-Stift folgt die Strichstärke dem Druck), **Textmarker** (durchscheinend, liegt unter der Schrift und der Tinte), **Radierer** (**Ganze Striche** oder **Teilweise** – dann verschwindet nur, was unter dem Radierer liegt), **Lasso**, **Text** und **Laserpointer** (zeigt etwas, ohne zu bleiben). Dazu Farben, drei Breiten, Rückgängig und Wiederholen (++⌘ Z++, ++⇧ ⌘ Z++).

![Ein Fachartikel im PDF-Viewer beim Anmerken: markierte Sätze, eine eingekreiste Zahl in einer Tabelle und handschriftliche Notizen](/screenshots/pdf-annotate.webp "Ein PDF mit Textmarker und Stift angemerkt – gespeichert als Version.")

- **Lieblingsstifte**: Die drei Stifte neben den Werkzeugen merken sich Farbe und Breite; änderst du sie, während einer gewählt ist, ändert sich der Lieblingsstift mit. Sie gelten auf diesem Gerät.
- **Formen**: Halte den Stift am Ende eines Strichs kurz still – aus einer gezeichneten Linie wird eine gerade, aus einem Rechteck, Kreis, Dreieck oder einer Raute die saubere Form. Abschalten lässt sich das in den **Stifteinstellungen** (Zahnrad).
- **Lasso**: Umkreise Striche und Text, um sie zu verschieben, am Griff unten rechts zu vergrößern oder zu verkleinern, umzufärben, zu kopieren (++⌘ C++, Einfügen mit ++⌘ V++ – auch auf einer anderen Seite), zu duplizieren oder zu löschen.
- **Text** setzt du mit einem Tipp auf die Seite; ein Tipp auf vorhandenen Text ändert ihn. Mit Scribble schreibst du auf dem iPad mit dem Stift hinein.
- **Nur mit dem Stift zeichnen**: Sobald du auf einem Gerät mit dem Stift geschrieben hast, schreibt nur noch der Stift – Finger blättern und zoomen, eine aufliegende Hand hinterlässt keine Spuren. Die Einstellung teilen sich PDFs, Whiteboards und Bilder; abschalten lässt sie sich in den **Stifteinstellungen**, dann schreibt auch ein Finger, und zwei Finger blättern und zoomen.
- **Apple Pencil**: Das Radierer-Ende eines Stifts radiert. In der iPad-App wechselt Doppeltippen oder Drücken zum Radierer und zurück – wie in den iPad-Einstellungen festgelegt, oder in den **Stifteinstellungen** fest auf Radierer, letztes Werkzeug oder nichts.

Die Anmerkungen gehören zur Seite des PDFs, nicht zum Bildschirm: Sie bleiben bei jedem Zoom an ihrer Stelle und gelten für alle, die das PDF öffnen – wer nur lesen darf, sieht sie, kann sie aber nicht ändern. Das PDF selbst bleibt unverändert. **Fertig** (oder ++⌘ S++) speichert; jedes Speichern ist eine Version, die du über das Uhr-Symbol wieder laden kannst. Hat jemand anderes die Anmerkungen inzwischen gespeichert, gewinnt deine Fassung, und ein Hinweis nennt, wer; die andere bleibt als Version erhalten. Text, den du auf ein PDF schreibst, findet die Suche – in der App für iPhone und iPad auch die Handschrift selbst, und **In Text umwandeln** macht aus ausgewählter Handschrift getippten Text (siehe [Handschrift erkennen](/notebooks#handschrift-erkennen-iphone-und-ipad)).

Soll ein PDF zum Heft werden, in dem du Seite für Seite schreibst und Blätter ergänzt, öffne es als [Notizbuch](/notebooks#notizbuch-anlegen): Jede PDF-Seite wird ein Blatt.

**Herunterladen** lädt weiterhin das Original. **Mit Anmerkungen herunterladen** (daneben, sobald es Anmerkungen gibt) erzeugt ein neues PDF mit denselben Seiten, auf denen die Anmerkungen als Vektorgrafik liegen – sie bleiben beim Vergrößern scharf. Geschützte (verschlüsselte) PDFs lassen sich nur ohne Anmerkungen herunterladen; Text erscheint in Helvetica, Zeichen außerhalb des westeuropäischen Zeichensatzes als „?“.

## Sprachnotizen und Besprechungen

`/sprachnotiz` öffnet die Aufnahme: Mikrofon antippen, sprechen, **Aufnahme beenden** – bis zu **zwei Stunden**, genug für eine Besprechung. Die Aufnahme lässt sich anhören oder verwerfen; **Einfügen** legt sie als Audio in die Seite (im Rahmen der Upload-Grenze der Instanz). Ist die Spracherkennung eingerichtet, folgt darunter das Gesprochene als Text; sonst bietet der Dialog nur das Audio an.

- **Lange Aufnahmen** gehen in Teilen an den Server, der sie zusammensetzt und an die Spracherkennung schickt. Die Größe begrenzt `WHISPER_MAX_MB` (Standard 200).
- **Transkript mit Zeitmarken:** Liefert die Spracherkennung Abschnitte mit Zeiten (OpenAI-kompatibles `verbose_json`, etwa faster-whisper-server, speaches oder whisper.cpp), erscheint ein aufklappbarer Block **Transkript · Dauer** mit einem Absatz je Passage und ihrer Zeitmarke (`00:04`, `1:02:05`).
- **Sprecher:** Nur wenn der Dienst selbst Sprecher trennt (Diarisierung, einzuschalten mit `WHISPER_DIARIZE=on` bei Servern, die `diarize` kennen) und je Abschnitt einen Sprecher zurückgibt, steht vor jeder Passage **Sprecher 1**, **Sprecher 2** … Flowplan rät keine Sprecher aus Pausen. Kennt der Dienst nur einfaches JSON, wird der Text wie bisher als Absätze eingefügt.
- **Danach mit KI zusammenfassen** fasst das Transkript zusammen ([Zusammenfassungen](/ai-writing#zusammenfassungen)).
- **In den Apps** für iPhone, iPad und Android nimmt die App auf; iPhone und iPad machen auf dem Gerät Text daraus, ohne Spracherkennung auf dem Server ([Sprachnotizen in Seiten](/mobile-capture#sprachnotizen-in-seiten)).
- **Aufgaben und Zusammenfassung erzeugen** (wenn [KI-Aktionen](/ai-actions#ki-aktionen) für dich eingeschaltet sind): Die KI schlägt eine Zusammenfassung mit Beschlüssen und eine Aufgabenliste mit verantwortlichen Personen und Terminen vor – als Vorschau mit Kästchen; erst **Ausführen** fügt sie in die Seite ein.
