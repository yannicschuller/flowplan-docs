# Journal

Ein Journal ist eine Seite mit einer Unterseite pro Tag. Morgens liegt die heutige Seite bereit, offene Aufgaben von gestern stehen schon darauf.

## Journal anlegen

**Neue Seite → Journal**. Die Seite zeigt oben **Heute** und darunter die vergangenen Tage mit relativen Angaben wie „Gestern“. Die Tagesseiten heißen automatisch nach dem Datum, etwa „Samstag, 26. September 2026“.

## Wie ein Tag entsteht

- Beim ersten Öffnen eines neuen Tages legt Flowplan dessen Seite an. Der Tag beginnt um Mitternacht in deiner Zeitzone.
- **Offene Aufgaben** vom letzten Tag ziehen um – samt verschachtelter Unteraufgaben. Ein kleines ↻ an der Ecke des Kästchens zeigt, dass eine Aufgabe von einem früheren Tag übernommen wurde.
- Erledigte Aufgaben und der übrige Text bleiben auf ihrem Tag.
- **Leere Tage verschwinden**: Hat ein Tag außer übernommenen Aufgaben nichts Eigenes bekommen, wird er beim nächsten Tag wieder entfernt. Das Journal enthält so nur Tage, an denen etwas passiert ist.

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

## In der Seitenleiste

Auch nach Jahren mit Tausenden Tagen bleibt das Journal in der Seitenleiste kurz. Unter dem Journal stehen:

- **Heute** – auch wenn die Seite für heute noch nicht angelegt ist; ein Klick öffnet den Tag,
- die **letzten 7 Tage**,
- **Alle Tage …** mit der Zahl aller Tage: öffnet die Journalseite bei der Liste bzw. dem Kalender.

Andere Unterseiten des Journals (etwa Besprechungsnotizen oder Monatszusammenfassungen) stehen darunter wie gewohnt.

Unter **Journal einrichten → Seitenleiste** legst du für jedes Journal fest, welche **Tage in der Seitenleiste** stehen:

- **Keine**
- **Letzte 7 Tage** (Voreinstellung)
- **Nach Jahr und Monat gruppiert**: wie oben, ältere Tage zusätzlich in Ordnern nach Jahr und Monat, etwa „Oktober 2026 · 18“. Die Ordner gibt es nur in der Seitenleiste, es sind keine Seiten – man kann nichts hineinziehen.
- **Alle**: jeder Tag einzeln, wie früher.

Ist ein Tag geöffnet, zeigt die Seitenleiste ihn immer an – auch wenn er älter als 7 Tage ist; in der gruppierten Ansicht klappen sein Jahr und sein Monat auf. Tage lassen sich weiter ziehen, und die Pfeiltasten funktionieren auch in den Ordnern (→ öffnet, ← schließt oder springt zum Ordner darüber).

## Von Tag zu Tag

Über jeder Tagesseite steht eine Leiste:

- **← Vorheriger Tag** und **Nächster Tag →** springen zum vorigen bzw. nächsten Tag mit Eintrag – Lücken werden übersprungen.
- **Heute** öffnet den heutigen Tag.
- Der **Monat** (etwa „Oktober 2026“) öffnet einen kleinen Kalender: Tage mit Eintrag sind hervorgehoben und lassen sich öffnen. Mit den Pfeiltasten wanderst du um einen Tag oder eine Woche, mit <kbd>Bild ↑</kbd>/<kbd>Bild ↓</kbd> um einen Monat; <kbd>Esc</kbd> schließt ihn.

Von überall geht es mit <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>Y</kbd> (Windows/Linux: <kbd>Strg</kbd> <kbd>Alt</kbd> <kbd>Y</kbd>) oder dem Befehl **Journal: Heute** in der Schnellsuche (<kbd>⌘</kbd> <kbd>K</kbd>) zum heutigen Tag – des zuletzt benutzten Journals. Bei mehreren Journalen bietet die Schnellsuche einen Eintrag pro Journal an. Das Kürzel lässt sich ändern (siehe [Tastenkürzel](/keyboard-shortcuts#eigene-tastenkuerzel)).

## Überblick auf der Journalseite

- **Serie**: wie viele Tage in Folge du geschrieben hast, dazu die längste Serie, Einträge und Wörter.
- **Heatmap**: das letzte Jahr als Kästchen, je dunkler, desto mehr geschrieben. Ein Klick öffnet den Tag.
- **An diesem Tag**: Einträge von vor einer Woche, einem Monat, einem halben Jahr und vor ganzen Jahren.
- **Letzte 30 Tage**: der Verlauf jedes Trackers.
- **Liste oder Kalender**: Die Liste zeigt Auszug, Ort, Stimmung und das erste Foto jedes Tages; der Kalender einen Monat mit Fotos als Hintergrund.

## Rückblick

**Rückblick** fasst eine Woche oder einen Monat zusammen: Tage, Wörter, erledigte und noch offene Aufgaben, Durchschnitte der Tracker, Orte und Fotos. **Als Markdown kopieren** übernimmt die Zusammenfassung, etwa in einen Wochenbericht.

### Monatszusammenfassung

Im Rückblick eines Monats legt **Monatszusammenfassung erstellen** eine normale Unterseite des Journals an – keinen Tag – und öffnet sie, etwa „Monatszusammenfassung Oktober 2026“. Darauf stehen:

- Tage, Wörter, erledigte und noch offene Aufgaben in Zahlen,
- **Höhepunkte**: Durchschnitte der Tracker, Orte, Fotos und die erledigten Aufgaben mit Link zu ihrem Tag,
- **Noch offen**: Aufgaben aus diesem Monat, die bis heute offen sind, mit Link zum Tag, auf dem sie jetzt stehen,
- **Tage**: jeder Tag als Link mit dem Anfang seines Textes.

Die Seite entsteht allein aus deinen Einträgen, ohne KI, und lässt sich danach frei bearbeiten. Gibt es für den Monat schon eine Zusammenfassung, bietet der Rückblick **Monatszusammenfassung öffnen** an; **Trotzdem neu erstellen** legt bewusst eine weitere an.

## PIN-Sperre

Unter **Journal einrichten → PIN-Sperre** schützt eine PIN aus 6 bis 8 Ziffern das Journal (früher gesetzte kürzere PINs gelten weiter): Tage, Suche, Vorschauen und Bilder bleiben verborgen, bis die PIN eingegeben ist. Nach 15 Minuten oder mit dem Schloss-Knopf sperrt es sich wieder. Nach fünf falschen Versuchen folgt eine Pause von fünf Minuten, nach zwanzig an einem Tag ist bis zum nächsten Tag Schluss – auch über einen Neustart des Servers hinweg. Gibt eine andere Person fünfmal eine falsche PIN ein, bekommt die Person, die das Journal angelegt hat, eine Benachrichtigung. Ändern oder Entfernen verlangt die bisherige PIN. Die Sperre gilt auch für Unterseiten der Tage sowie für Export, Inhaltsarchiv, Kommentare, Links zum Teilen und das Duplizieren – dafür vorher entsperren. Sie schützt vor Blicken, ist aber keine Verschlüsselung: Wer Zugriff auf Sicherungen des Servers hat, sieht die Inhalte.

## Wenn die heutige Seite gelöscht wurde

Liegt die heutige Seite im Papierkorb, sagt das Journal das und bietet **Neu anlegen** (eine frische Seite für heute) oder **Aus dem Papierkorb holen** an.

## Tipps

- Mit `/todo` oder `[]` + Leerzeichen entstehen Aufgaben, die mitwandern.
- Tagesseiten sind normale Dokumente: Überschriften, Tabellen, Bilder, Erwähnungen – alles geht.
- Journale lassen sich wie jede Seite teilen. Wer nur lesen darf, sieht die Tage, legt aber keine an.
- Die Schnellsuche findet Einträge über alle Tage hinweg.
