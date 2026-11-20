---
keywords: offline, ohne Verbindung, kein Internet, Flugmodus, Journal offline, neue Seite offline, hochladen offline, nicht synchronisiert, Bild offline, Vorlage offline
---

# Was offline geht

Was du ohne Verbindung bearbeiten und anlegen kannst – und was erst wieder mit Verbindung geht.

## Ohne Verbindung {since=0.10.0}

Offline arbeitest du mit dem weiter, was das Gerät hat – im Browser mit eingeschalteter [Offline-Nutzung](/offline-and-apps#offline-nutzung-einschalten), in der Desktop-App und in den Apps für iPhone, iPad und Android:

- **Seiten und Einträge** der Offline-Kopie öffnen sich; du bearbeitest Text in Dokumenten und die Eigenschaften von Einträgen.
- **Neue Einträge** in einer Datenbank – **Neue Zeile** in der Tabelle, eine neue Karte im Board – erscheinen sofort und werden angelegt, sobald die Verbindung zurück ist (siehe [Datenbank-Einträge offline](/offline-and-apps#datenbank-eintraege-offline)). Auch das [Erfassen](/offline-and-apps#erfassen-in-eine-datenbank) wartet auf dem Gerät.
- {since=0.11.0} **Neue Seiten:** Dokumente (auch Unterseiten), Datenbanken, Whiteboards und Notizbücher legst du offline wie gewohnt über **Neue Seite** an – siehe [Offline neu anlegen](#offline-neu-anlegen).
- {since=0.11.0} **Bilder und Dateien** in Dokumenten – neue und bestehende Seiten – bis 25 MB je Datei warten auf dem Gerät und werden hochgeladen, sobald die Verbindung zurück ist.
- **Der heutige Journal-Eintrag:** **Heute** in der Seitenleiste, das **+** neben einem Journal, **Heute** auf der Journalseite und die Tagesauswahl öffnen den Tag – seine gespeicherte Seite, wenn die Offline-Kopie sie hat, sonst einen Eintrag auf diesem Gerät. Oben steht dann „Offline-Entwurf – wird angelegt, sobald die Verbindung zurück ist“. Was du dort schreibst, bleibt auf dem Gerät, auch wenn du die App schließt. Sobald die Verbindung zurück ist, legt Flowplan den Tag wie gewohnt an – mit Vorlage und übernommenen Aufgaben – und fügt deinen Text darin ein; die Seite des Tages öffnet sich an seiner Stelle. Siehe auch [Journal](/journal).
- {since=0.10.0} **Lernkarten:** Stapel, in denen du in den letzten 14 Tagen gelernt hast, lernst du offline weiter; die Wertungen warten auf dem Gerät („2 Wertungen warten auf Verbindung“) und gehen mit der Verbindung an den Server ([Offline lernen](/flashcards-app#offline-lernen)).

## Offline neu anlegen {since=0.11.0}

**Neue Seite** öffnet sich auch ohne Verbindung. Ein **Dokument**, eine **Datenbank**, ein **Whiteboard** oder ein **Notizbuch** entsteht dann auf diesem Gerät:

- Die neue Seite öffnet sich sofort und steht in der Seitenleiste – mit einer kleinen Wolke und oben dem Hinweis **Noch nicht synchronisiert**. Du schreibst, legst Einträge in der neuen Datenbank an, zeichnest auf dem Whiteboard oder im Notizbuch, benennst die Seite um und legst Unterseiten darunter an. Alles bleibt auf dem Gerät, auch wenn du die App schließt.
- **Aus Vorlage:** Die eingebauten Vorlagen – etwa Meeting-Notizen oder Projektplanung – gehen offline, ihr Inhalt kommt mit der App. Gespeicherte Vorlagen, Umfragen und der Marketplace brauchen die Verbindung; in der Galerie sind sie offline ausgegraut.
- **Bilder, Dateien und PDFs** fügst du wie gewohnt ein (einfügen, hineinziehen, über das Menü). Ein Bild zeigt sofort seine Kopie auf dem Gerät. Bis 25 MB je Datei und 200 MB insgesamt warten auf dem Gerät; größere Dateien gehen nur mit Verbindung.
- **Sobald die Verbindung zurück ist**, legt Flowplan alles der Reihe nach auf dem Server an: erst die Seite, dann ihre Bilder und Dateien, dann ihren Inhalt, ihre Einträge und Unterseiten. Die Wolke verschwindet, und die Seite ist für alle mit Zugriff da. Ein Dokument bekommt die Bilder erst, wenn sie hochgeladen sind – andere sehen nie ein Bild, das es auf dem Server noch nicht gibt.

Die Rechte prüft der Server beim Anlegen. Lehnt er eine Seite ab – der Bereich wurde inzwischen gelöscht, du darfst dort nichts mehr anlegen –, scheitert alles mit, was in ihr entstanden ist: Einträge, Unterseiten, Bilder. Die Seite trägt dann ein rotes Warnzeichen und oben den Grund. Ihr Inhalt bleibt auf dem Gerät: **Erneut versuchen**, **Text kopieren** oder **Verwerfen**. Ein Bild, das nicht hochgeladen werden konnte, kannst du mit **Datei speichern** auf dem Gerät sichern.

> [!NOTE]
> Journale, Dashboards und Workflows, Seiten in [verschlüsselten Bereichen](/encrypted-spaces), Datenbanken mit KI und Notizbücher aus einem PDF brauchen den Server – offline sagt **Neue Seite** das beim Erstellen.

## Nur mit Verbindung {since=0.10.0}

Manches braucht den Server. Offline sagt Flowplan dann **Geht nur mit Verbindung – du bist gerade offline.**, statt nichts zu tun:

- {since=0.11.0} neue Journale, Dashboards und Workflows, Seiten in verschlüsselten Bereichen, neue Bereiche und Sammlungen
- gespeicherte Vorlagen und das Duplizieren einer Seite
- {since=0.11.0} Dateien über 25 MB, Titelbilder und Seiten-Icons hochladen, Bilder auf Whiteboards und in Notizbüchern, PDFs in Notizbücher
- Importe (Export-ZIP, Notion, BookStack, Jira, Trello und andere)
- Antworten über das Formular einer Datenbank
- Änderungen am Schema einer Datenbank (Eigenschaften und Ansichten)
- {since=0.10.0} Lernkarten mit KI erstellen, der Anki-Import und der Export von Karten (CSV, Anki-Paket)
