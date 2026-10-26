# Schnell erfassen (Desktop)

Ein Tastenkürzel öffnet über jeder App ein kleines Fenster: Gedanke, Aufgabe, Link, Datei, Bildschirmausschnitt oder Sprachnotiz – in den Eingang, eine Datenbank, den heutigen Journal-Eintrag oder an eine Seite. Auch ohne Verbindung.

Schnell erfassen gehört zur [Desktop-App für macOS, Windows und Linux](/offline-and-apps#desktop-app-fuer-macos-windows-und-linux). Es speichert mit der Anmeldung des aktiven Profils direkt auf deiner Instanz; nichts geht an Dritte.

## Auf einen Blick

| Taste | Was passiert |
| --- | --- |
| <kbd>Strg</kbd> <kbd>Umschalt</kbd> <kbd>Leertaste</kbd> (Mac: <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>Leertaste</kbd>) | öffnet das Fenster über jeder App – auch wenn Flowplan minimiert, ausgeblendet oder (Mac, Symbol im Infobereich) geschlossen ist |
| <kbd>Enter</kbd> | speichert |
| <kbd>Umschalt</kbd> <kbd>Enter</kbd> | neue Zeile |
| <kbd>Tab</kbd> | Ziel wählen: tippen filtert, <kbd>↑</kbd> <kbd>↓</kbd> wählt, <kbd>Enter</kbd> übernimmt |
| <kbd>Alt</kbd> <kbd>↑</kbd> / <kbd>↓</kbd> | voriges / nächstes Ziel, ohne die Liste zu öffnen |
| <kbd>⌘</kbd>/<kbd>Strg</kbd> <kbd>Umschalt</kbd> <kbd>V</kbd> | Zwischenablage einfügen – ein Link bekommt seinen Titel |
| <kbd>⌘</kbd>/<kbd>Strg</kbd> <kbd>Umschalt</kbd> <kbd>R</kbd> gedrückt halten | Sprachnotiz aufnehmen, loslassen beendet |
| <kbd>↓</kbd> im leeren Feld | **Zuletzt erfasst** |
| <kbd>Esc</kbd> | schließt die offene Liste, sonst das Fenster – der Text bleibt als Entwurf |

Die Knöpfe im Fenster machen dasselbe: **Einfügen**, **Anhängen …**, **Ausschnitt**, **Halten zum Sprechen**, **Vorschlag** und **Als Aufgabe für heute**. Die erste Zeile wird zum Titel, der Rest zum Text.

## Wohin: Ziele

Oben rechts steht, wohin gespeichert wird. Zur Wahl stehen:

| Ziel | Was entsteht |
| --- | --- |
| **Eingang** (Standard) | ein Eintrag in deiner Datenbank zum Erfassen – die unter **Erfassen** als Standard festgelegte (siehe [Erfassen in eine Datenbank](/offline-and-apps#erfassen-in-eine-datenbank)) |
| eine **Datenbank** | ein neuer Eintrag; ihre Standardvorlage gilt, Kürzel füllen ihre Eigenschaften |
| ein **Journal** | angehängt an den **heutigen Eintrag** – fehlt der Tag noch, legt Flowplan ihn an |
| eine **Seite** | unten an die Seite angehängt, als neuer Absatz (oder als Aufgabe) |

Die Liste zeigt nur, wo du schreiben darfst. Zuletzt benutzte Ziele stehen oben; die App merkt sich das je Profil und startet beim nächsten Mal mit dem zuletzt gewählten Ziel.

> [!NOTE]
> **Ende-zu-Ende-verschlüsselte Bereiche fehlen in der Liste.** In sie kann der Server nicht schreiben, und das Erfassen-Fenster hat – anders als das Flowplan-Fenster – keine Schlüssel. Die Liste sagt, wie viele Seiten deshalb fehlen. Für verschlüsselte Bereiche erfasse direkt im Flowplan-Fenster. Journale hinter einer PIN fehlen ebenfalls.

**Als Aufgabe für heute** macht aus der ersten Zeile eine offene Aufgabe – fällig heute oder am Tag aus dem Text, zugewiesen dir oder der Person aus dem Text. Sie erscheint sofort unter **Meine Aufgaben** und im Symbol der App.

## Kürzel im Text

Was du tippst, liest Flowplan beim Tippen mit und zeigt es als **Chips** unter dem Text, etwa für „Angebot schreiben morgen 15 Uhr #kunde @anna !hoch“:

`Fällig: Di., 27. Okt., 15:00` · `Tags: Kunde` · `Zuständig: Anna Schmidt` · `Priorität: Hoch`

Was ein Chip übernimmt, verschwindet aus dem Titel. Ein **×** am Chip lässt den Text so stehen, wie du ihn getippt hast. Kürzel füllen nur Eigenschaften, die das Ziel hat – sonst bleibt der Text, der Chip sagt dann „bleibt Text“.

| Kürzel | Beispiele (Deutsch · Englisch · Französisch) | Wird zu |
| --- | --- | --- |
| Tage | `heute`, `morgen`, `übermorgen` · `today`, `tomorrow`, `day after tomorrow` · `aujourd'hui`, `demain`, `après-demain` | Fälligkeitsdatum |
| Wochentage | `Freitag`, `am Fr.`, `nächsten Montag` · `friday`, `next monday` · `vendredi`, `lundi prochain` | der nächste solche Tag |
| Abstände | `in 3 Tagen`, `nächste Woche` · `in two weeks`, `next week` · `dans une semaine`, `la semaine prochaine` | Tag (nächste Woche: deren Montag) |
| Daten | `24.12.`, `24.12.2026`, `2026-12-24`, `24. Dezember` · `12/24`, `Dec 24th` · `24/12`, `le 5 novembre` | dieser Tag (ohne Jahr: der nächste) |
| Uhrzeit | `15 Uhr`, `um 15:30` · `3pm`, `at 3:30 pm` · `15h`, `à 9h30` | Uhrzeit zum Datum (allein: heute) |
| Schlagwort | `#kunde` | Option einer Mehrfachauswahl (zuerst „Tags“), wenn es sie gibt |
| Person | `@anna` | Personen-Eigenschaft (zuerst „Zuständig“) – Vorname, Name ohne Leerzeichen oder E-Mail-Name, wenn genau eine Person passt |
| Priorität | `!hoch`, `!dringend`, `!niedrig` · `!high`, `!urgent`, `!low` · `!haute`, `!basse` · `!1`–`!4`, `!!!`, `!!` | Option einer Auswahl „Priorität“ (oder mit Prioritäts-Optionen) |

- Fällig wird die erste Datums-Eigenschaft (zuerst eine namens „Fällig“, „Due“, „Échéance“ …). Eine Uhrzeit gilt in der Zeitzone deines Computers, auch wenn der Eintrag erst später aus der Warteschlange gesendet wird.
- `#27` ist eine Nummer, kein Schlagwort; `name@example.org` bleibt eine E-Mail-Adresse; ein Ausrufezeichen am Satzende bleibt eines.
- Ohne Verbindung zeigt das Fenster keine Chips; die Kürzel werden beim Senden ausgewertet – mit dem Tag und der Zeitzone des Erfassens.
- Die Kürzel liest der Server (eine Stelle für alle Apps). Ältere Server ohne diese Funktion nehmen nur Text in den Eingang – das Fenster sagt das.

## Zwischenablage und Links

<kbd>⌘</kbd>/<kbd>Strg</kbd> <kbd>Umschalt</kbd> <kbd>V</kbd> oder **Einfügen** setzt den Text der Zwischenablage ein. Ist es ein Link (`https://…`), erscheint er als Link-Chip mit Titel und Anbieter – die **Vorschau holt deine Instanz** (wie die Link-Karten im Editor, mit Schutz vor internen Adressen), nie die App selbst. Gespeichert wird er in die Link-Eigenschaft der Datenbank (sonst in den Text) und als Link-Karte; ist der Text leer, wird der Titel der Seite zum Titel. Ohne Verbindung wird der Link ohne Titel gespeichert.

## Dateien, Bildschirmausschnitt und Sprachnotiz

- **Dateien:** Bilder (PNG, JPEG, GIF, WebP, AVIF, HEIC), PDFs, Markdown- und Textdateien ins Fenster ziehen oder mit **Anhängen …** wählen. Geprüft wird wie beim [Hineinziehen ins Hauptfenster](/offline-and-apps#mehr-aus-der-desktop-app): Endung **und** Inhalt, Bilder und PDFs bis 50 MB, Text bis 5 MB (die Instanz kann weniger erlauben), höchstens 10 Anhänge. Die Liste unter dem Text zeigt sie, **×** entfernt einen. Bilder und PDFs landen in der Datei-Eigenschaft der Datenbank und im Text; Markdown und Text werden zu Text.
- **Bildschirmausschnitt:** **Ausschnitt** – das Fenster tritt zur Seite, du ziehst einen Bereich auf; er wird als PNG angehängt. Auf dem Mac nimmt das die Bildschirmaufnahme des Systems auf (Leertaste wählt ein Fenster, <kbd>Esc</kbd> bricht ab); unter Windows und Linux zeigt Flowplan den Bildschirm unter dem Mauszeiger, du ziehst den Bereich, <kbd>Enter</kbd> nimmt den ganzen Bildschirm, <kbd>Esc</kbd> bricht ab. Zwischendateien liegen nur kurz im Datenordner der App und werden sofort gelöscht.
- **Sprachnotiz:** **Halten zum Sprechen** gedrückt halten (oder <kbd>⌘</kbd>/<kbd>Strg</kbd> <kbd>Umschalt</kbd> <kbd>R</kbd>), loslassen beendet. Hat deine Instanz eine Transkription (Whisper, siehe [Konfiguration](/configuration)), wird die Aufnahme dort zu Text und erscheint im Feld – zum Prüfen vor dem Speichern. Ohne Transkription, ohne Verbindung oder wenn sie scheitert, wird die Aufnahme angehängt; die Instanz versucht es beim Speichern noch einmal.

### Berechtigungen je System

| System | Bildschirmausschnitt | Mikrofon |
| --- | --- | --- |
| **macOS** | **Systemeinstellungen → Datenschutz & Sicherheit → Bildschirm- & Systemaudioaufnahme** → Flowplan einschalten, dann Flowplan neu starten. Fehlt sie, sagt das Fenster es und öffnet die Seite mit **Systemeinstellungen öffnen**. | Beim ersten Mal fragt macOS („Flowplan verwendet das Mikrofon für Sprachnotizen.“). Abgelehnt: **Systemeinstellungen → Datenschutz & Sicherheit → Mikrofon**. |
| **Windows** | keine Freigabe nötig | **Einstellungen → Datenschutz & Sicherheit → Mikrofon** muss Desktop-Apps erlauben |
| **Linux** | X11: keine Freigabe. Wayland: der Desktop fragt (Portal) und bietet oft Bildschirm oder Fenster an – Flowplan nimmt, was er übergibt. | je nach Desktop (PipeWire/PulseAudio) |

Die Kamera nutzt Flowplan nie, und das Erfassen-Fenster darf nur das Mikrofon – und das nur, solange du die Taste hältst.

## Ohne Verbindung: die Warteschlange

Ist die Instanz nicht erreichbar, landet die Erfassung in einer **Warteschlange** – mit Text, Ziel, Kürzeln, Link und Anhängen. Das Fenster sagt „Ohne Verbindung … – in der Warteschlange, wird automatisch gesendet“, oben steht „1 in der Warteschlange“, das Symbol im Infobereich und die Einstellungen zeigen die Zahl ebenfalls.

- **Gesendet wird von selbst:** sobald die Verbindung zurück ist, der Computer aufwacht oder entsperrt wird, sonst mit wachsenden Pausen (5 s, 15 s, 30 s … höchstens alle 15 Minuten). **Jetzt senden** (Fenster, Symbol, Einstellungen) versucht es sofort.
- **Nichts doppelt:** Jede Erfassung hat vom ersten Moment an einen eigenen Schlüssel (`Idempotency-Key`), und jeder Versuch schickt genau dieselbe Anfrage. Geht eine Antwort unterwegs verloren, nachdem die Instanz schon gespeichert hat, bekommt der nächste Versuch die gespeicherte Antwort statt eines zweiten Eintrags.
- **Nichts geht verloren:** Lehnt die Instanz etwas endgültig ab (Ziel gelöscht, Datei zu groß), bleibt es in der Warteschlange und das Fenster zeigt es mit **Kopieren** (zurück ins Feld) und **Verwerfen**. Abgemeldet wartet die Erfassung, bis du wieder angemeldet bist.
- **Verschlüsselt gespeichert:** Warteschlange und „Zuletzt erfasst“ liegen je Profil im Datenordner der App (`capture/`), verschlüsselt mit dem Schlüsselbund des Systems (macOS-Schlüsselbund, Windows DPAPI, unter Linux Secret Service/KWallet). Gibt es unter Linux keinen Schlüsselbund, liegen sie unverschlüsselt, nur für dein Benutzerkonto lesbar – die Einstellungen sagen, was gilt. Beim Entfernen eines Profils werden sie gelöscht.

## Rückgängig und „Zuletzt erfasst“

Nach dem Speichern zeigt das Fenster „✓ Gespeichert in …“ mit **Öffnen** (der Eintrag oder die Seite im Flowplan-Fenster) und **Rückgängig** – zehn Sekunden lang. Danach geht das Fenster, wenn du nichts Neues begonnen hast.

- **Rückgängig** legt einen erfassten Eintrag in den Papierkorb der Datenbank (von dort wiederherstellbar) und entfernt Angehängtes von einer Seite oder aus dem Journal wieder – solange es unverändert am Ende steht. Hat jemand inzwischen weitergeschrieben, bleibt es, und das Fenster sagt das. Eine Erfassung aus der Warteschlange wird einfach nicht gesendet.
- **Zuletzt erfasst:** <kbd>↓</kbd> im leeren Feld zeigt die letzten 20 Erfassungen des Profils mit Ziel und Uhrzeit, <kbd>Enter</kbd> oder **Öffnen** öffnet sie. Dieselbe Liste (die letzten 8) steht im Symbol in Menüleiste oder Infobereich unter **Zuletzt erfasst**; wartende sind mit ⏳ markiert.

## Schnellaktionen

Unter **Einstellungen → Schnellaktionen** legst du weitere Tastenkürzel an, die das Fenster passend vorbereitet öffnen:

| Schnellaktion | Öffnet das Fenster … |
| --- | --- |
| **Aufgabe** | mit **Als Aufgabe für heute** und dem gewählten Ziel |
| **Journal-Eintrag** | mit dem gewählten Journal – angehängt an den heutigen Eintrag |
| **Lesezeichen** | mit dem Link aus der Zwischenablage samt Titel |
| **Besprechungsnotiz** | mit einer gewählten Datenbank und einer ihrer Vorlagen (Standard oder z. B. „Besprechung“), Text beginnt mit „Besprechung: “ |
| **Notiz** | mit einem festen Ziel, auf Wunsch als Aufgabe |

Jede hat Name, Ziel, Tastenkürzel (**Ändern**, **Aus**), **Ausprobieren** und **Entfernen**. Ohne Tastenkürzel ist keine aktiv – nach dem Update ist nur das Haupt-Tastenkürzel an. Ist ein Kürzel schon von einer anderen App belegt, steht das an der Aktion; ein Kürzel gehört immer nur einer Aktion und nie zugleich dem Haupt-Kürzel. Höchstens acht Schnellaktionen.

## KI-Vorschlag (optional)

**Vorschlag** fragt eine KI, wohin der Text gehört: Datenbank, kurzer Titel und Eigenschaften, die der Text eindeutig nennt. Das Ergebnis erscheint als Chips mit **✓** (übernehmen) und **×** (ignorieren) – **nichts wird von selbst übernommen**. Geprüft wird jeder Vorschlag auf dem Server: nur Datenbanken, in die du schreiben darfst, nur vorhandene Optionen, nur echte Personen und Tage.

- **Wo die KI läuft:** über die KI deiner Instanz (Funktion **KI-Aktionen**, siehe [KI](/ai)) – oder auf einem Mac mit macOS 26 und eingeschalteter Apple Intelligence **auf dem Mac selbst** ([KI auf dem Gerät](/ai#ki-auf-dem-geraet-apple)): Dann baut die Instanz nur die Frage, der Mac beantwortet sie, und der Text geht an keine KI des Servers. Was bevorzugt wird, folgt deiner Einstellung zur KI auf dem Gerät.
- **Was die KI sieht:** den Text im Fenster und die Namen der Datenbanken, ihrer Eigenschaften und Optionen – keinen Inhalt. Für die KI gesperrte Datenbanken fehlen.
- **Aus:** Der Knopf fehlt, wenn die Administration oder du KI (oder KI-Aktionen) ausgeschaltet habt.

## Einrichtung und einmaliger Hinweis

Nach der ersten Anmeldung zeigt die App noch einen Schritt: **So soll Flowplan auf diesem Computer laufen** – **Schnell erfassen aktivieren** (mit dem Kürzel, **Ändern**, **Jetzt ausprobieren**; ein belegtes Kürzel wird gemeldet), **Symbol in der Menüleiste / im Infobereich**, **Beim Anmelden am Computer starten** und **Minimiert / im Hintergrund starten** (nur zusammen mit dem Start beim Anmelden). Die Schalter beginnen mit den Voreinstellungen deines Systems (Symbol: Mac an, Windows und Linux aus), alles lässt sich überspringen und später unter **Einstellungen** ändern – es sind dieselben Einstellungen.

Wer die App schon vorher hatte und noch nie erfasst hat, sieht einmal unten links im Fenster „Neu: Schnell erfassen mit …“ mit **Ausprobieren** und **Einstellungen**. Nach dem Schließen, einem Klick oder der ersten Erfassung kommt der Hinweis nie wieder.

## Datenschutz

- Gespeichert wird nur auf deiner Instanz, mit der Anmeldung des Profils und ihrer Herkunftsprüfung. Link-Vorschau, Transkription und KI laufen über die Instanz (oder auf dem Mac); die App selbst ruft keine fremden Adressen ab.
- Auf dem Computer bleiben nur die Warteschlange und „Zuletzt erfasst“ (verschlüsselt, siehe oben), die zuletzt benutzten Ziele (nur Kennungen) und kurzzeitig Bildschirmausschnitte. Das Fenster hat eine eigene Sitzung ohne Cookies und ohne Speicher.
- Ende-zu-Ende-verschlüsselte Bereiche sind nie Ziel.

## Voraussetzungen

Die Desktop-App nach 1.2.0 und ein Flowplan-Server neuer als 0.7.0. Mit einem älteren Server nimmt das Fenster Text (und **Als Aufgabe für heute**) in den Eingang und sagt, dass Ziele, Kürzel, Links und Anhänge ein Update des Servers brauchen. Sprachnotizen als Text brauchen eine Transkription auf dem Server, der KI-Vorschlag eingeschaltete KI-Aktionen oder Apple Intelligence auf dem Mac.
