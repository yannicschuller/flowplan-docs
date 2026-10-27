# Journal

Ein Journal ist eine Seite mit einer Unterseite pro Tag. Morgens liegt die heutige Seite bereit, offene Aufgaben von gestern stehen schon darauf.

## Journal anlegen

**Neue Seite → Journal**. Die Seite zeigt oben **Heute** und darunter die vergangenen Tage mit relativen Angaben wie „Gestern“. Die Tagesseiten heißen automatisch nach dem Datum, etwa „Samstag, 26. September 2026“.

## Wie ein Tag entsteht

- Beim ersten Öffnen eines neuen Tages legt Flowplan dessen Seite an. Der Tag beginnt um Mitternacht in deiner Zeitzone.
- **Offene Aufgaben** vom letzten Tag ziehen um – samt verschachtelter Unteraufgaben. Ein kleines ↻ an der Ecke des Kästchens zeigt, dass eine Aufgabe von einem früheren Tag übernommen wurde.
- Erledigte Aufgaben und der übrige Text bleiben auf ihrem Tag.
- **Leere Tage verschwinden**: Hat ein Tag außer übernommenen Aufgaben nichts Eigenes bekommen, wird er beim nächsten Tag wieder entfernt. Das Journal enthält so nur Tage, an denen etwas passiert ist.

### Seite des Tages anlegen: automatisch oder beim ersten Schreiben

Unter **Journal einrichten → Tage** legst du fest, wann die heutige Seite entsteht:

- **Automatisch** (Standard): wie oben beschrieben, sobald der Tag beginnt und das Journal oder die App geöffnet wird.
- **Beim ersten Schreiben**: **Heute** zeigt zuerst einen **Entwurf** mit der Vorlage und den Aufgaben, die vom letzten Tag übernommen würden. Gespeichert ist noch nichts – oben steht „Entwurf – wird beim ersten Schreiben angelegt“. Erst der erste Tastendruck, eine abgehakte Aufgabe, ein Tracker-Wert, ein Ort oder eine Datei legt die Seite an. Bis dahin bleiben übernommene Aufgaben auf ihrem Tag, und der Entwurf erscheint weder in der Seitenleiste noch in Suche, Graph oder Export.

Der Entwurf ist auf allen Geräten derselbe: Beginnen zwei Geräte gleichzeitig zu schreiben, entsteht trotzdem genau eine Seite, und beide Texte landen darin. Hat sich inzwischen geändert, womit der Tag beginnt (etwa weil gestern auf einem anderen Gerät eine Aufgabe abgehakt wurde), öffnet Flowplan die gespeicherte Seite und sagt das. Offline Getipptes bleibt auf dem Gerät und legt die Seite an, sobald die Verbindung wieder da ist.

Jeder Tag merkt sich, aus welcher Fassung der Vorlage er entstanden ist. Ein Tag, auf dem nur diese Vorlage steht, gilt auch dann als leer, wenn die Vorlage später geändert wurde.

### Leere Tage entfernen

**Journal einrichten → Tage → Leere Tage suchen** listet alte Tage, an denen nichts geschrieben wurde: nur die Vorlage, keine eigenen offenen Aufgaben, keine Tracker-Werte oder Orte, keine Dateien, Kommentare, Unterseiten, Favoriten, Freigaben oder Links von anderen Seiten, Titel und Symbol unverändert (Groß- und Kleinschreibung oder Leerzeichen zählen nicht als Änderung). Heute bleibt immer. Du wählst ab, was bleiben soll, und verschiebst den Rest mit **… Tage in den Papierkorb** – von dort lassen sich Tage wiederherstellen. Flowplan entfernt oder fasst alte Tage nie von sich aus zusammen.

## Tagesvorlage

**Journal einrichten** (Zahnrad auf der Journalseite) → **Vorlage**: Jeder neue Tag beginnt mit diesem Inhalt, etwa „Dankbar für“, „Fokus heute“ und „Rückblick am Abend“. Zur Wahl stehen fertige Vorlagen (Dankbarkeit & Fokus, 5-Minuten-Journal, Arbeitslog, Tagesrückblick); **Heutigen Tag übernehmen** macht den aktuellen Tag zur Vorlage den aktuellen Tag. Aufgaben aus der Vorlage kommen jeden Tag neu und werden nicht zusätzlich übernommen. Ein Tag, auf dem nur die Vorlage steht, gilt als leer und verschwindet wie jeder leere Tag.

## Tracker, Ort und Termine

Über jedem Tag steht eine Leiste:

- **Tracker**: Stimmung (😞 bis 😄), Skalen von 1 bis 5, Zahlen mit Einheit (z. B. Schlaf in Stunden) oder Ja/Nein (z. B. Sport). Welche es gibt, legst du unter **Journal einrichten → Tracker** fest.
- **Ort**: frei eintragen; **Standort** speichert zusätzlich die Koordinaten des Geräts mit einem Link zur Karte.
- **Termine**: Einträge aller Datenbanken mit Datum, die du sehen darfst, samt Wiederholungen. Unter **Journal einrichten → Kalender** lässt sich zusätzlich ein Kalender per iCal-Link einbinden (Google, Apple, Outlook, Nextcloud …).

### Besprechungsnotizen

Neben jedem Termin steht **Besprechungsnotiz anlegen**. Flowplan legt eine Seite unter dem Journal an – mit Titel und Datum des Termins, den **Teilnehmenden**, einer **Agenda**, **Notizen** und **Aufgaben** – und öffnet sie. Danach steht neben dem Termin **Notiz öffnen**.

- **Teilnehmende**: aus dem verbundenen Google- oder Outlook-Kalender, aus dem iCal-Link und aus Personen-Eigenschaften des Eintrags. Wer mit seiner E-Mail-Adresse Mitglied des Arbeitsbereichs ist, wird erwähnt; andere stehen mit Name und Adresse da.
- **Aufgaben** mit @Person erscheinen bei dieser Person sofort unter **Meine Aufgaben**.
- Bei Einträgen aus einer Datenbank verlinkt die Notiz den Eintrag. Eine PIN-Sperre des Journals gilt auch für seine Besprechungsnotizen.
- Dieselbe Gliederung gibt es als Vorlage **Besprechungsnotiz** unter **Vorlagen → Meetings**.

## Überblick auf der Journalseite

- **Serie**: wie viele Tage in Folge du geschrieben hast, dazu die längste Serie, Einträge und Wörter.
- **Heatmap**: das letzte Jahr als Kästchen, je dunkler, desto mehr geschrieben. Ein Klick öffnet den Tag.
- **An diesem Tag**: Einträge von vor einer Woche, einem Monat, einem halben Jahr und vor ganzen Jahren.
- **Letzte 30 Tage**: der Verlauf jedes Trackers.
- **Liste oder Kalender**: Die Liste zeigt Auszug, Ort, Stimmung und das erste Foto jedes Tages; der Kalender einen Monat mit Fotos als Hintergrund.

## Rückblick

**Rückblick** fasst eine Woche oder einen Monat zusammen: Tage, Wörter, erledigte und noch offene Aufgaben, Durchschnitte der Tracker, Orte und Fotos. **Als Markdown kopieren** übernimmt die Zusammenfassung, etwa in einen Wochenbericht.

## PIN-Sperre

Unter **Journal einrichten → PIN-Sperre** schützt eine PIN aus 6 bis 8 Ziffern das Journal (früher gesetzte kürzere PINs gelten weiter): Tage, Suche, Vorschauen und Bilder bleiben verborgen, bis die PIN eingegeben ist. Nach 15 Minuten oder mit dem Schloss-Knopf sperrt es sich wieder. Nach fünf falschen Versuchen folgt eine Pause von fünf Minuten, nach zwanzig an einem Tag ist bis zum nächsten Tag Schluss – auch über einen Neustart des Servers hinweg. Gibt eine andere Person fünfmal eine falsche PIN ein, bekommt die Person, die das Journal angelegt hat, eine Benachrichtigung. Ändern oder Entfernen verlangt die bisherige PIN. Die Sperre gilt auch für Unterseiten der Tage sowie für Export, Inhaltsarchiv, Kommentare, Links zum Teilen und das Duplizieren – dafür vorher entsperren. Sie schützt vor Blicken, ist aber keine Verschlüsselung: Wer Zugriff auf Sicherungen des Servers hat, sieht die Inhalte.

## Wenn die heutige Seite gelöscht wurde

Liegt die heutige Seite im Papierkorb, sagt das Journal das und bietet **Neu anlegen** (eine frische Seite für heute; bei **Beim ersten Schreiben** ein neuer Entwurf) oder **Aus dem Papierkorb holen** an.

## Tage in Listen, Suche, Graph und Export

Ein Journal hat schnell Hunderte Tage. Damit sie andere Seiten nicht verdrängen:

- **Suche und @-Erwähnung**: Tage stehen hinter allen anderen Treffern. Der Filter **Ohne Journaltage** in der Schnellsuche lässt sie ganz weg (er bleibt für die nächste Suche eingeschaltet).
- **@heute**, **@gestern** und **@2026-10-27** (auch `@today`, `@yesterday`) setzen beim Schreiben einen Link auf diesen Tag des Journals – des Journals im Bereich der Seite, sonst des zuletzt beschriebenen. Für heute gilt dasselbe wie beim Öffnen: Die Seite wird angelegt oder, bei **Beim ersten Schreiben**, auf den Entwurf verlinkt. Tage ohne Eintrag lassen sich nicht verlinken.
- **Graph**: Unter **Journaltage** zeigt der Graph die Tage gar nicht, **je Monat ein Punkt** (Standard) oder **einzeln**.
- **Zählen**: Startseite, Bereichsverwaltung und Administration zählen Tage getrennt, etwa „120 Seiten · 340 Journaltage“.
- **Export**: Im Markdown-ZIP, im geplanten Export und in Git liegen die Tage sortierbar im Ordner ihres Journals unter `2026/10/2026-10-27.md` – siehe [Import, Export und Versionen](/import-export-versions).

Journale hinter einer PIN, die du nicht eingegeben hast, tauchen in keinem davon auf – auch nicht in den Zahlen.

## Tipps

- Mit `/todo` oder `[]` + Leerzeichen entstehen Aufgaben, die mitwandern.
- Tagesseiten sind normale Dokumente: Überschriften, Tabellen, Bilder, Erwähnungen – alles geht.
- Journale lassen sich wie jede Seite teilen. Wer nur lesen darf, sieht die Tage, legt aber keine an.
- Die Schnellsuche findet Einträge über alle Tage hinweg; **Ohne Journaltage** blendet sie aus.
