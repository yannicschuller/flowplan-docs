---
keywords: Lernkarten, Karteikarten, Lernerinnerung, Erinnerung, Push, Mitteilung, offline lernen, ohne Verbindung, Flugmodus, Widget, Karten fällig, Kurzbefehle, Siri, Schnellaktion, App, API, MCP
---

# Lernkarten: Erinnerung, App, offline und API

Damit du dranbleibst: eine tägliche Erinnerung, [Lernkarten](/flashcards) in den Apps für iPhone, iPad und Android und Lernen ohne Verbindung – dazu die Befehle für eigene Programme.

## Lernerinnerung {since=0.9.9}

Unter **Lernen** schaltet **Lernerinnerung** eine tägliche Erinnerung ein: **Täglich erinnern um** und eine Uhrzeit (Vorgabe 18:00), in der Zeitzone deines Geräts. Sie kommt nur an Tagen, an denen Karten fällig sind – neue Karten innerhalb deiner Grenzen zählen mit – und du noch nicht gelernt hast, höchstens einmal am Tag. Der Text nennt die Zahl und den Stapel mit den meisten Karten, etwa „12 Karten warten auf dich – „Spanisch A1“ und 2 weitere Stapel.“; ein Tipp öffnet **Lernen**.

- Die Erinnerung ist die Benachrichtigungsart **Lernerinnerungen**: standardmäßig als **Push** aufs Telefon und an den Desktop, nicht im Posteingang und nicht per E-Mail. Unter **Einstellungen → Benachrichtigungen** stellst du das um ([Benachrichtigungen](/notifications#lernerinnerungen)).
- Kein Drängeln: Hast du 30 Tage nicht gelernt, kommt einmal „Lernerinnerungen pausiert“ und danach nichts mehr – bis du wieder eine Karte bewertest. Die Uhrzeit neu zu speichern zählt auch als Lebenszeichen.
- Liegt die Uhrzeit beim Einschalten heute schon hinter dir, beginnt die Erinnerung morgen.
- Die Uhrzeit gilt für alle Arbeitsbereiche; die Erinnerung zählt die Stapel aller deiner Arbeitsbereiche zusammen.
- Kann die Instanz keine Mitteilungen schicken, erinnert die App für iPhone, iPad und Android selbst zur eingestellten Uhrzeit, solange Karten fällig sind ([In der App](#in-der-app)).

## Offline lernen {since=0.9.9}

Mit eingeschalteter [Offline-Nutzung](/offline-and-apps#offline-nutzung-einschalten) – im Browser und in den Apps – speichert das Gerät jeden Stapel, in dem du in den letzten 14 Tagen gelernt hast, ganz: alle Karten mit Inhalt, deinen Lernstand, die heutigen Wertungen und deine Grenzen (bis zu 5.000 Karten je Stapel, die nächsten zuerst). Nach jeder Sitzung mit Verbindung bringt das Gerät seine Kopie auf den Stand.

- Ohne Verbindung öffnen sich Übersicht und Fokusmodus wie gewohnt. Das Gerät stellt die Karten selbst zusammen und plant mit FSRS – mit denselben Regeln wie der Server, auch Teilstapel über Filter, Tagesgrenzen und Lernschritte.
- Deine Wertungen bleiben auf dem Gerät und werden gesendet, sobald die Verbindung zurück ist; bis dahin steht in der Übersicht, unter **Lernen** und im Fokusmodus etwa **2 Wertungen warten auf Verbindung**. **Rückgängig** nimmt eine wartende Wertung direkt auf dem Gerät zurück.
- Wertungen gehen nie doppelt ein, auch nach Tagen nicht. Hast du dieselbe Karte inzwischen auf einem anderen Gerät gelernt, ordnet Flowplan die Wertungen nach ihrer Zeit und rechnet den Lernstand daraus neu – ohne Rückfrage. Zwei Wertungen am selben Tag zählen beide.
- Eine Wertung mit einer Uhrzeit in der Zukunft gilt höchstens fünf Minuten voraus. Wurde eine Karte inzwischen gelöscht oder ist sie für dich nicht mehr sichtbar, bleibt die Wertung nur in deiner Statistik.
- Stapel, die das Gerät nicht gespeichert hat, sagen offline „Dieser Stapel ist auf diesem Gerät nicht offline verfügbar.“
- Nur mit Verbindung: [Karten mit KI erstellen](/flashcards-ai), der [Anki-Import](/flashcards-import#aus-anki-importieren) und der Export als CSV oder Anki-Paket, eigene Einstellungen und **Heute mehr lernen**.

Siehe auch [Was offline geht](/what-works-offline).

## In der App {since=0.9.9}

Der Fokusmodus läuft in den Apps für iPhone, iPad und Android wie im Browser. Dazu kommen:

- das Widget **Karten fällig** für den Home-Bildschirm (iPhone und iPad auch für den Sperrbildschirm): wie viele Karten heute dran sind, der Stapel mit den meisten und deine Serie. Ein Tipp öffnet **Lernen**.
- **Lernen** unter den Schnellaktionen am App-Symbol (iPhone, iPad) und den App-Verknüpfungen (Android), sobald du Lernkarten hast.
- die Aktion **Fällige Karten lernen** in der Kurzbefehle-App (iPhone, iPad); mit einem eigenen Kurzbefehl startest du sie auch per Siri.
- die [Lernerinnerung](#lernerinnerung) als Mitteilung – oder, wenn die Instanz keine Mitteilungen schicken kann, als Erinnerung der App selbst.

## API und MCP

Über die [API](/api-and-webhooks) lernst du auch aus eigenen Programmen: `study.queue` (oder `GET /api/pages/{id}/study`) liefert die nächsten Karten mit Zählern, `study.review` bewertet, `study.undo` macht rückgängig, `study.prefs` setzt eigene Grenzen, `study.settings` richtet die Karten ein. {since=0.9.9} `study.due` (oder `GET /api/study/due`) zählt die fälligen Karten aller Stapel eines Arbeitsbereichs, `study.stats` (oder `GET /api/study/stats`) liefert die Statistik, `GET /api/pages/{id}/study/export` die CSV (mit `format=apkg` das Anki-Paket); `study.queue` mit `ahead` holt Lernkarten, die erst später heute dran wären. {since=0.9.9} `GET /api/pages/{id}/study?offline=1` liefert den ganzen Stapel für das Lernen ohne Verbindung, `study.reviews` nimmt bis zu 500 später gesendete Wertungen auf einmal (idempotent über ihre ID, nach ihrer Zeit eingeordnet), `study.reminder` stellt die tägliche Lernerinnerung (`remindAt` als `HH:MM` oder `null`). Tokens mit Nur-Lesen-Recht können Karten und Zähler lesen, aber nicht bewerten. Der [MCP-Server](/mcp) hat das Werkzeug `study_decks`: deine Stapel eines Arbeitsbereichs mit dem, was heute fällig ist. Alle Formen stehen in der [OpenAPI-Beschreibung](/openapi).
