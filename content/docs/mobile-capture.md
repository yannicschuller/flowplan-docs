---
keywords: erfassen, Siri, Kurzbefehle, teilen, scannen, Spotlight, iPad, Handoff, Apple Kalender
---

# Erfassen, Teilen und Scannen in den Apps

Notizen, Aufgaben und Sprachnotizen schnell erfassen, aus anderen Apps teilen, Dokumente scannen – und was die Apps auf iPhone und iPad zusätzlich können.

## Erfassen, Siri, Kontrollzentrum

Alle Wege führen in das Erfassen der App: Notiz oder Aufgabe tippen, Sprachnotiz aufnehmen (läuft auch bei gesperrtem Bildschirm weiter; wird transkribiert, wenn deine Instanz das kann) oder Foto aufnehmen/auswählen.

| Weg | Was es bietet |
| --- | --- |
| **Widget Schnellerfassung** | Notiz, Aufgabe, Sprachnotiz, Foto – in das im Widget gewählte Ziel |
| **Siri und Kurzbefehle** (Deutsch, Englisch, Französisch) | „Notiz zu Flowplan hinzufügen“ (in deinen Erfassungs-Eingang), „Aufgabe zu Flowplan hinzufügen“, „Was steht heute in Flowplan an“, „Was ist heute in Flowplan fällig“, „Seite in Flowplan öffnen“, „In Flowplan suchen“, „Timer in Flowplan starten“, „Timer in Flowplan stoppen“, „Sprachnotiz in Flowplan aufnehmen“, „Fokus in Flowplan starten“ |
| **Kontrollzentrum und Aktionstaste** (iOS 18) | Neue Notiz, Schnellerfassung, Heutige Aufgaben (zeigt, wie viele fällig sind), Sprachnotiz, Fokus starten, Timer (Schalter) |
| **App-Symbol lange drücken** (iPhone, iPad) | Posteingang, Meine Aufgaben, Suchen, Neue Notiz, Profil wechseln. Das iPhone zeigt davon die ersten vier, abgemeldet *Profil wechseln*. |
| **App-Symbol lange drücken** (Android) | *Neue Notiz* und *Schnell erfassen* (immer da, auch vor dem ersten Anmelden), dann die **zuletzt geöffneten Seiten**, Posteingang, Meine Aufgaben, Suchen, Sprachnotiz und Profil wechseln. Die meisten Launcher zeigen vier davon; jede Verknüpfung lässt sich auf den Home-Bildschirm ziehen. Verknüpfungen zu Seiten eines anderen Profils sind ausgegraut, bis das Profil wieder aktiv ist. |
| **Android-Schnelleinstellungen** | Kacheln „Neue Notiz“ und „Schnell erfassen“ (auch vom Sperrbildschirm). Ab Android 13 fügt **App-Einstellungen → Widgets → „Schnell erfassen“ zu den Schnelleinstellungen hinzufügen** die Kachel mit einem Tipp hinzu; sonst über das Stift-Symbol der Schnelleinstellungen. |

**Schnell erfassen** (Kachel und Verknüpfung auf Android) öffnet ein kompaktes Fenster: Ziel wählen – den **Eingang** (deine Standard-Datenbank zum Erfassen, siehe [Erfassen in eine Datenbank](/offline-and-apps#erfassen-in-eine-datenbank)) oder eine andere Seite oder Datenbank, mit Suche –, Titel und Text tippen, auf Wunsch Fotos aufnehmen oder auswählen, **Sichern**.

Was Siri erledigt, ohne die App zu öffnen:

- **Aufgabe hinzufügen:** Siri fragt nach der Aufgabe; in der Kurzbefehle-App legst du zusätzlich ein **Fälligkeitsdatum** und die **Liste oder Datenbank** fest (sonst dein Erfassungs-Ziel). In einer Datenbank landet das Datum in ihrer ersten Datums-Eigenschaft.
- **Was ist heute fällig:** Siri sagt, wie viele Aufgaben heute fällig und überfällig sind, nennt die ersten drei und zeigt die Liste.
- **In Flowplan suchen:** durchsucht Seiten, Einträge und Kommentare in allen deinen Arbeitsbereichen und zeigt die besten Treffer; in einem Kurzbefehl lassen sie sich weitergeben (etwa an *Seite öffnen*). Die Aktion *In der App suchen* öffnet stattdessen die Suche von Flowplan mit dem Text.
- **Seite öffnen:** Siri fragt nach der Seite – nenne einen Teil des Titels – und öffnet sie in der App. In Kurzbefehlen wählst du die Seite aus einer Liste.

Siri, Kurzbefehle und Steuerelemente nutzen das **aktive** Profil. Seiten aus Ende-zu-Ende-verschlüsselten Bereichen erscheinen nicht (auch nicht ihre Titel). Aufgaben hinzufügen, Fälliges, Seiten öffnen, Suchen, die neuen Steuerelemente und Fokus-Filter brauchen einen Flowplan-Server ab 0.7.0.

## Teilen aus anderen Apps

In jeder App, die etwas teilen kann (Browser, Fotos bzw. Galerie, Dateien, Mail, Scanner …), öffnet **Teilen → Flowplan** (iPhone, iPad) bzw. **Teilen → In Flowplan speichern** (Android) ein kleines Fenster mit Titel, Text, Link und Dateien.

- **Was geht:** Text, Links, Fotos und PDFs – auch mehrere Dateien auf einmal (höchstens 10). Andere Dateitypen werden nicht übernommen.
- **Wohin:** vorgewählt ist der **Eingang**, deine Standard-Datenbank zum Erfassen (im Browser mit **Als Standard zum Erfassen verwenden** festgelegt, siehe [Erfassen in eine Datenbank](/offline-and-apps#erfassen-in-eine-datenbank)). **Sichern in** (iPhone, iPad) bzw. **Ändern** (Android) zeigt alle Seiten und Datenbanken, in die du schreiben darfst, mit Suche.
- **Was entsteht:** In einer Datenbank (auch dem Eingang) ein **Eintrag** – der Link in der ersten URL-Eigenschaft (falls vorhanden), die Dateien in der ersten Datei-Eigenschaft und im Eintrag selbst. Auf einer Seite eine **Unterseite** mit Text, Link, Fotos und PDFs.

**Auf iPhone und iPad** bleibst du in der App, aus der du teilst. Flowplan merkt sich die letzte Wahl des Ziels je Profil. Das Fenster nutzt die Anmeldung der App: Öffne Flowplan einmal und melde dich an, sonst weist es darauf hin. Fotos im HEIC-Format werden zu JPEG.

**Auf Android** nennt das Fenster unter *Nicht übernommen*, was es nicht übernehmen kann (andere Dateitypen, mehr als 10 Dateien). PDFs bekommen im Eintrag eine Vorschau der ersten Seite. Den Titel kannst du ändern; leer bleibt er die erste Zeile des Texts, die Adresse des Links oder der erste Dateiname. Nach **Sichern** führt **Zurück zur App** in die App, aus der du geteilt hast; **Öffnen** zeigt das Ergebnis in Flowplan. Noch nicht angemeldet? Texte und Links gehen dann wie im Browser zur Vorschau der Instanz und nach dem Anmelden weiter.

Das Teilen-Fenster auf iPhone und iPad sowie Fotos und PDFs auf Android brauchen einen Flowplan-Server ab 0.7.0. Bis 0.6.0 nimmt Android nur Text und Links an, über die Vorschau der Instanz.

## Dokumente scannen und Spotlight (iPhone und iPad)

**Dokumente scannen.** Tippe in einer Seite `/` und wähle **Dokument scannen** (nur in der App für iPhone und iPad). Die Kamera findet die Ränder und richtet jede Seite gerade aus; nimm so viele Seiten auf, wie du möchtest. Flowplan erkennt den Text auf dem Gerät (Deutsch, Englisch, Französisch) und fügt ein PDF am Ende der Seite ein – oder des Eintrags, in dem du gerade bist. Das PDF trägt den Text unsichtbar mit, sodass du ihn in jedem PDF-Programm markieren und durchsuchen kannst, und **die Suche in Flowplan findet den Scan sofort über seinen Text**. Der Link `flowplan://scan` (z. B. in einem Kurzbefehl) öffnet den Scanner mit der Wahl zwischen Eingang, Seite und Datenbank. Nach dem Sichern bleibt das PDF nicht auf dem Telefon.

**Spotlight.** Die App legt die Titel deiner zuletzt geänderten Seiten (bis zu 500, mit Ort und einer Zeile Inhalt) und deine offenen Aufgaben – auch Datenbank-Einträge, die dir zugewiesen sind, die mit Fälligkeit zuerst – in die Suche des Telefons. Ein Tipp auf einen Treffer öffnet ihn in Flowplan. Nichts aus Ende-zu-Ende-verschlüsselten Bereichen, hinter einer Journal-PIN oder aus Journaltagen landet dort; Abmelden oder ein Profilwechsel leert die Suche. Der Index bleibt auf dem Telefon.

Scanner und Spotlight brauchen einen Flowplan-Server ab 0.7.0.

## Sprachnotizen in Seiten

In der App nimmt **Sprachnotiz** (`/sprachnotiz`) in einem Dokument mit dem Mikrofon des Telefons auf – bis zu 30 Minuten, auch bei gesperrtem Bildschirm. **Einfügen** legt die Aufnahme als Audio in die Seite:

- **Als Text einfügen** (iPhone und iPad): Das Gesprochene wird auf dem Gerät mit der Spracherkennung von Apple zu Text – die Aufnahme verlässt dafür das Telefon nicht. Der Text folgt unter dem Audio als **Transkript** mit Zeitmarken. Die App fragt einmal nach der Erlaubnis für die Spracherkennung. Das geht für die Sprachen, die das Gerät selbst erkennt (nach der Sprache des Geräts; die meisten großen Sprachen, je nach iOS-Version).
- Wo das Gerät es nicht kann (Android, andere Sprachen), macht die Spracherkennung deiner Instanz daraus Text, wenn sie eingerichtet ist ([Sprachnotizen](/media-and-files#sprachnotizen-und-besprechungen)); sonst bleibt das Audio allein.
- **Danach mit KI zusammenfassen** setzt eine Zusammenfassung unter den Text, wenn dir die [KI](/ai-writing#zusammenfassungen) zur Verfügung steht.

Das braucht einen Flowplan-Server ab 0.7.0. Im Browser nimmt `/sprachnotiz` wie bisher auf.

## KI auf dem Gerät und Schreibtools (iPhone und iPad)

**Optional:** Auf einem iPhone oder iPad mit **iOS/iPadOS 26** oder neuer, das Apple Intelligence unterstützt, und mit **eingeschaltetem Apple Intelligence** (Einstellungen → Apple Intelligence & Siri) laufen der Schreibassistent und die Zusammenfassung offener Seiten mit dem Sprachmodell von Apple **auf dem Gerät**. Der Text verlässt das Gerät nicht, auch nicht in verschlüsselten Bereichen; die Instanz braucht dafür keinen KI-Anbieter. Ergebnisse tragen das Kennzeichen **Auf diesem Gerät**. Das braucht einen Flowplan-Server neuer als 0.7.0 (derzeit das Beta-Image).

- **Abschalten:** **Einstellungen → KI → Auf diesem Gerät (Apple) → Aus** – dann fragt Flowplan das Gerät nie. Dort steht auch, ob Apple Intelligence auf diesem Gerät verfügbar, in den Einstellungen ausgeschaltet oder nicht unterstützt ist. Die Administration kann es für die ganze Instanz abschalten.
- **Server-KI bleibt:** Fragen an den Arbeitsbereich, KI in Datenbanken und KI-Aktionen laufen weiter über die Instanz, wenn sie eingerichtet ist; zu lange Texte übernimmt sie ebenfalls.
- **Ältere Geräte und iOS-Versionen** (ab iOS 16.4) nutzen die App wie bisher, nur ohne diesen Weg.
- **Schreibtools:** Apples Schreibtools (Korrekturlesen, Umschreiben, Zusammenfassen) funktionieren direkt im Editor – Text markieren und im Textmenü **Schreibtools** wählen (ab iOS 18 mit Apple Intelligence).

Mehr: [KI auf dem Gerät](/ai#ki-auf-dem-geraet-apple).

## Kalender in Apple Kalender

**Einstellungen → Kalender & Issues → Kalender auf iPhone, iPad und Mac**: Kalenderansichten wählen und **In Apple Kalender einrichten** tippen. Die App öffnet ein Konfigurationsprofil in Safari; den Download bestätigen und es dann unter **Einstellungen → Profil geladen** installieren (auf dem Mac: Systemeinstellungen → Profile). Jede Ansicht wird ein CalDAV-Account in Apple Kalender, in beide Richtungen – siehe [In beide Richtungen synchronisieren](/views#in-beide-richtungen-synchronisieren-caldav). Am Computer zeigt die Seite stattdessen einen QR-Code; ihn mit der Kamera des iPhones scannen. Der Link gilt einmal und zehn Minuten lang.

## iPad: Fenster, Tastatur und Handoff

- **Mehrere Fenster:** Im Menü einer Seite (Rechtsklick oder lange drücken in der Seitenleiste) gibt **In neuem Fenster öffnen** der Seite ein eigenes Fenster – nebeneinander in Split View, in Slide Over oder im Stage Manager. Auf dem iPhone Duo geht das auf dem aufgeklappten Display; auf dem zugeklappten fehlt der Menüpunkt. Links, die einen neuen Tab öffnen würden, tun dasselbe. App-Symbol lange drücken → **Alle Fenster einblenden** listet sie. Das erste Fenster hat die App-Einstellungen, Mitteilungen und Widgets; die anderen zeigen eine Seite und kommen nach einem Neustart mit ihr zurück. Alle Fenster nutzen das aktive Profil und die App-Sperre.
- **Hardware-Tastatur:** Halte <kbd>⌘</kbd>, und das iPad listet die Tastenkürzel von Flowplan – Suche ++⌘ K++, neue Seite ++⌘ N++, schnell erfassen ++⌘ ⌥ N++, die Übersicht ++⌘ /++ und die anderen mit <kbd>⌘</kbd>, <kbd>⌃</kbd> oder <kbd>⌥</kbd>, auch [deine eigenen](/keyboard-shortcuts#eigene-tastenkuerzel). Ein Kürzel wirkt im Fenster im Vordergrund. Die Kürzel des Editors (Fett, Rückgängig …) wirken wie im Browser.
- **Trackpad und Maus:** Der Zeiger reagiert auf Knöpfe und Links wie in Safari.
- **Handoff:** Die Seite im Vordergrund wird deinem Mac und deinen anderen Geräten angeboten (gleicher Apple Account, Handoff an unter Einstellungen → Allgemein → AirPlay & Kontinuität). Auf dem Mac öffnet sie sich in der [Desktop-App](/desktop-app), ohne sie im Browser. Seiten vom Mac oder einem anderen Gerät öffnen sich in der App im Profil ihrer Instanz; Seiten einer Instanz ohne Profil öffnen sich in Safari. Solange die App-Sperre sperrt, wird nichts angeboten.
