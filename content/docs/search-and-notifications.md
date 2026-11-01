# Suche, Posteingang und Push

Die Schnellsuche findet Inhalte bis in Dateianhänge hinein. Posteingang und Push-Nachrichten sagen dir, wenn jemand dich braucht.

## Schnellsuche

<kbd>⌘</kbd> <kbd>K</kbd> (Windows/Linux <kbd>Strg</kbd> <kbd>K</kbd>) oder **Suchen** in der Seitenleiste.

Durchsucht werden:

- Seitentitel und [Aliasse](/pages-and-spaces#aliasse) sowie Dokumenttexte,
- [Tags und Eigenschaftswerte](/pages-and-spaces#tags-und-eigenschaften) von Seiten,
- Datenbankeinträge und ihre Inhalte,
- Kommentare,
- Dateinamen,
- der Text von PDF-Anhängen (bis 50 MB, die ersten 100.000 Zeichen),
- gescannte PDFs und Bilder per Texterkennung (Deutsch und Englisch, auf Wunsch Französisch über `FLOWPLAN_OCR_LANGS`),
- Word-, Excel-, PowerPoint- und OpenDocument-Dateien.

Treffer lassen sich nach Typ und Bereich filtern. [Journaltage](/journal#tage-in-listen-suche-graph-und-export) stehen hinter allen anderen Treffern; **Ohne Journaltage** lässt sie ganz weg und bleibt für die nächste Suche eingeschaltet. Dateitexte werden im Hintergrund erfasst und sind nach wenigen Sekunden auffindbar. Die Suche zeigt nur, was du lesen darfst. <kbd>Enter</kbd> öffnet den ersten Treffer.

Aliasse von Seiten und Einträgen zählen so viel wie der Titel. Passt die Suche nur zu einem Alias, zeigt der Treffer den echten Titel mit dem Alias in Grau, etwa „Chauffage · PAC“. Dasselbe gilt im Dialog der @-Erwähnung.

### Nach Tags und Eigenschaften filtern

Diese Wörter wirken in der Suche als Filter:

| Eingabe | Findet |
| --- | --- |
| `#Kunde` | Seiten mit dem Tag „Kunde“ (Groß-/Kleinschreibung egal); Tags mit Leerzeichen als `#"Neue Idee"` |
| `-#Intern` | lässt Seiten mit dem Tag weg |
| `Status:Offen` | Eigenschaft „Status“ mit dem Wert „Offen“ (Auswahl und Mehrfachauswahl: genau diese Option; Text, Webadresse, E-Mail, Telefon: enthält) |
| `Budget:>1000`, `Budget:<=50`, `Budget:10..20` | Zahlen vergleichen |
| `Fällig:2026-12`, `Fällig:>2026-11-01`, `Fällig:2026-11-01..2026-11-30` | Datum: Tag, Monat oder Jahr; nach, zwischen (auch `<`, `>=`, `<=`) |
| `Abgerechnet:ja` / `Abgerechnet:nein` | Kontrollkästchen |
| `Verantwortlich:Emil`, `Verantwortlich:ich` | Person nach Namen; `ich` (auch `me`) bist du |
| `Status:*` / `Status:-` | Eigenschaft gesetzt / leer |

Namen mit Leerzeichen stehen in Anführungszeichen: `"Nächster Schritt":Angebot`. Mehrere Filter gelten zusammen; der übrige Text wird wie gewohnt gesucht. Nur Filter ohne Text listen alle passenden Seiten, die zuletzt geänderte zuerst. Wörter, die keinen Tag und keine Eigenschaft nennen (etwa `#123`), bleiben normale Suchwörter.

Erkannte Filter erscheinen als Chips unter dem Suchfeld; ✕ nimmt einen wieder heraus. Die Auswahl **Tag …** neben dem Bereich fügt einen Tag-Filter ein. Gespeicherte Suchen behalten die Filter. Tag-Namen und Werte sind außerdem gewöhnliche Suchwörter der Seite: „Kunde“ findet auch Seiten mit dem Tag „Kunde“.

### Befehle

Dieselbe Schnellsuche führt auch Befehle aus: Beginnt die Eingabe mit `>`, erscheinen nur Befehle, etwa `> neue datenbank`, `> aufgaben`, `> dunkel` oder `> fokus`; <kbd>Enter</kbd> führt den ersten aus. Passende Befehle erscheinen auch ohne `>` über den Suchtreffern. Mit geöffneter Seite gibt es zusätzlich Seitenbefehle: Favorit, Folgen, Kommentare, Export, Drucken/PDF, Versionsverlauf, Teilen und Fokusmodus.

### Gespeicherte Suchen

Häufige Suchen legst du mit **Suche speichern** samt Filtern ab. Gespeicherte Suchen sind persönlich und erscheinen beim Öffnen der Suche.

## Posteingang

Der **Posteingang** sammelt:

- Erwähnungen,
- Kommentare und Antworten auf deine Beiträge,
- Datums-Erinnerungen,
- Kommentare und Einträge von Gästen über Freigabelinks,
- mit dir geteilte Seiten und Arbeitsbereiche,
- Änderungen an Seiten, denen du folgst (eigene Seiten folgst du beim Anlegen automatisch; die Glocke oben rechts schaltet das Folgen um),
- Meldungen aus Automationen.

**Standardmäßig** kommt, was dich direkt betrifft – Erwähnungen, geteilte Seiten, Kommentare, Erinnerungen –, im Posteingang, als Push, per E-Mail und in verbundenen [Chat-Apps](#chat-apps). Gastkommentare kommen ohne E-Mail und ohne Chat-App. **Änderungen an Seiten, denen du folgst, und Automationen landen nur im Posteingang**, damit nicht jede kleine Bearbeitung eine Mitteilung oder Mail auslöst. Unter **Einstellungen → Benachrichtigungen** lässt sich das je Art und Kanal ändern; **Auf Standard zurücksetzen** stellt den Ausgangszustand wieder her.

**Für Administratoren: Sicherheitsvorfälle der Instanz.** Admins sehen bei den Benachrichtigungsarten eine eigene Zeile **Sicherheitsvorfälle der Instanz**: was die [Erkennungsregeln](/operations#sicherheit) auf der ganzen Instanz finden (Passwort-Raten, neue Adminrechte, Abtasten …). Jeder Admin stellt selbst ein, wie die Vorfälle ankommen – Posteingang, Push, E-Mail und Chat-Apps sind standardmäßig an – und welche: **Alle Vorfälle** (Standard) oder **Nur kritische**. Die Auswahl gilt für alle Kanäle dieser Art; unter **Administration → Angriffe & Vorfälle** erscheint jeder Vorfall trotzdem. Ein Klick oder Tipp auf die Mitteilung öffnet die Seite des Vorfalls. Die Zeile **Sicherheitshinweise** betrifft nur das eigene Konto (neue Anmeldung, falsche Journal-PIN, abgeschaltete Chat-App); wer dort vor dem Update Kanäle ausgeschaltet hatte, hat sie für Sicherheitsvorfälle ebenfalls aus. Andere Personen sehen die Zeile nicht.

Ungelesenes ist markiert und lässt sich filtern. Ein Klick öffnet die Stelle, bei Textkommentaren direkt den Thread. Mitteilungen ohne Seite führen an ihren Ort in der App: ein Sicherheitsvorfall auf seine Seite unter **Administration → Angriffe & Vorfälle**, eine neue Anmeldung zu den angemeldeten Geräten, eine abgeschaltete Chat-App zu ihren Verbindungen – auch beim Tipp auf die Push-Mitteilung und über den Link in E-Mail und Chat-App.

## E-Mail

Ist auf der Instanz ein Mailserver eingerichtet, kommen ungelesene Benachrichtigungen nach zehn Minuten als Zusammenfassung per E-Mail – eine Mail für alles, was sich angesammelt hat, jede Benachrichtigung höchstens einmal. Unter **Einstellungen → Benachrichtigungen** lässt sich die Spalte **E-Mail** je Art ein- und ausschalten. Einladungen in einen Arbeitsbereich und mit dir geteilte Seiten kommen sofort per E-Mail.

### Wöchentliche Zusammenfassung

Unter **Einstellungen → Benachrichtigungen → Wöchentliche Zusammenfassung** bestellst du eine E-Mail, die jeden **Montag um 7 Uhr** in deiner Zeitzone kommt (gespeichert wird die Zeitzone deines Browsers beim Einschalten):

- **Geändert in Seiten, denen du folgst** – mit Arbeitsbereich und wer geändert hat (Änderungen der letzten sieben Tage, nur von anderen),
- **Überfällige Aufgaben** und **Offene Aufgaben** – wie in **Meine Aufgaben**, über alle Arbeitsbereiche.

**Mit kurzer KI-Zusammenfassung der Änderungen** (nur sichtbar, wenn [KI](/ai) für dich eingeschaltet ist) stellt der Liste ein paar Stichpunkte voran. Die KI liest dafür nur Seiten, die sie für dich lesen darf, mit deinem KI-Anbieter. Ist KI aus oder schlägt die Anfrage fehl, kommt die E-Mail als einfache Liste. Gibt es in einer Woche nichts zu berichten, kommt keine E-Mail. Die Zusammenfassung braucht einen eingerichteten Mailserver.

## Push-Benachrichtigungen

Unter **Einstellungen → Benachrichtigungen**:

1. **Push aktivieren** – der Browser fragt nach der Erlaubnis. Das gilt pro Gerät.
2. In der Karte **Benachrichtigungsarten** je Art die Schalter **Posteingang**, **Push** und **E-Mail** setzen – jede Änderung wird sofort gespeichert. Auf dem Handy steht jede Art als eigene Karte mit drei beschrifteten Schaltern.
3. Mit **Testbenachrichtigung senden** prüfen, ob alles ankommt (siehe [unten](#testbenachrichtigung)).

Push-Nachrichten öffnen die betroffene Seite. Auf dem Sperrbildschirm erscheinen keine Dokumentinhalte.

> [!NOTE]
> **iPhone und iPad** (ab iOS 16.4): Flowplan in Safari über HTTPS öffnen, **Zum Home-Bildschirm** hinzufügen und aus diesem Symbol starten. Erst dort lässt sich Push aktivieren.

Abmelden, Sitzungsende oder eine Kontosperre beenden das Push-Abonnement; nach dem nächsten Anmelden bei Bedarf wieder aktivieren.

In den [Apps für iPhone, iPad und Android](/offline-and-apps#apps-fuer-iphone-ipad-und-android) kommen Mitteilungen über die App: Sie fragt nach dem ersten Anmelden nach der Erlaubnis, die Zahl der ungelesenen steht am App-Symbol. **Benachrichtigungsarten** gelten dort genauso. Diese Mitteilungen sind Ende-zu-Ende-verschlüsselt und zeigen deshalb ihren Text – Relay, Apple und Google lesen ihn nicht mit, siehe [Push-Relay](/configuration#push-relay-und-ende-zu-ende-verschluesselung).

### Testbenachrichtigung

**Einstellungen → Benachrichtigungen → Testbenachrichtigung senden** schickt sofort eine Mitteilung „Testbenachrichtigung – alles funktioniert.“ an alle deine Push-Ziele: jeden Browser mit aktiviertem Push und jede [App](/offline-and-apps#apps-fuer-iphone-ipad-und-android) mit erlaubten Mitteilungen. Sie geht denselben Weg wie jede Benachrichtigung – Web-Push, [Push-Relay](/configuration#push-relay-und-ende-zu-ende-verschluesselung) oder Expo –, legt aber nichts im Posteingang ab. Ein Tipp darauf öffnet diese Einstellungen.

Nach höchstens zehn Sekunden steht darunter je Gerät, über welchen Kanal es ging (**Relay · Ende-zu-Ende-verschlüsselt**, **Expo** oder **Web Push**) und was passiert ist:

- **Zugestellt** – an Apple, Google oder den Push-Dienst des Browsers übergeben. Kommt trotzdem nichts an, liegt es am Gerät: Mitteilungen für Flowplan erlaubt? Ist ein Fokus aktiv, steht das dabei.
- **Registrierung abgelaufen** – die App einmal öffnen, sie meldet sich neu an. Beim abgelaufenen Abonnement eines Browsers dort Push erneut aktivieren.
- **Benachrichtigungen ausgeschaltet** – in der App bzw. den Systemeinstellungen des Geräts erlauben.
- **Push-Relay nicht eingerichtet, nicht erreichbar oder Instanz nicht verifiziert** – das betrifft die Instanz, nicht dein Gerät; die Meldung nennt den Grund (z. B. `PUSH_RELAY=off`, `APP_URL` ohne HTTPS, `/.well-known/flowplan-push` nicht erreichbar). Siehe [Konfiguration](/configuration#push-relay-und-ende-zu-ende-verschluesselung).
- **Keine Geräte registriert** – Push oben aktivieren oder die App öffnen und Mitteilungen erlauben.

Der Test geht nur an deine eigenen Geräte, ungeachtet der **Benachrichtigungsarten** und eines Fokus-Filters – Erlaubnis und Fokus des Geräts selbst gelten weiter. Höchstens fünf Tests in zehn Minuten. Tokens oder Schlüssel zeigt das Ergebnis nie; Administratoren sehen zusätzlich eine Diagnosezeile mit Relay-Adresse, ob `/.well-known/flowplan-push` aktiv ist, und der Adresse der Instanz (`APP_URL`).

In der [Desktop-App](/offline-and-apps#mitteilungen-in-der-desktop-app) gibt es kein Web-Push. Die App fragt selbst nach neuen Benachrichtigungen und zeigt sie als Mitteilungen des Systems, die Zahl der ungelesenen steht am App-Symbol. **Einstellungen → Benachrichtigungen** zeigt dort statt **Push aktivieren** einen Schalter für die Mitteilungen der App; **Nicht stören** und **Alle Profile** stehen im Menü **Mitteilungen** der App. **Benachrichtigungsarten** gelten auch hier: Mitteilungen gibt es nur für Arten mit Push.

## Chat-Apps

Statt (oder neben) Push und E-Mail kommen Benachrichtigungen sofort in einer Chat-App an: **Telegram**, **Gotify**, **ntfy** oder **Matrix**. Unter **Einstellungen → Benachrichtigungen → Chat-Apps** verbindest du je Dienst ein Ziel; welche Arten dort ankommen, stellst du in der Karte **Benachrichtigungsarten** in der Spalte **Chat-Apps** ein. Standardmäßig sind das Erwähnungen, geteilte Seiten, Kommentare, Erinnerungen und Sicherheitshinweise – Gastkommentare, Änderungen an Seiten, denen du folgst, und Automationen nicht. Was im Posteingang ausgeschaltet ist, kommt auch nicht in der Chat-App an.

| Dienst | Was du angibst |
| --- | --- |
| **Telegram – Bot der Instanz** | Nichts: **Verbindungslink erzeugen**, den Link auf dem Gerät mit Telegram öffnen und **Starten** tippen (oder dem Bot `/start <Code>` schicken). Der Code gilt 15 Minuten und nur einmal. Nur verfügbar, wenn die Administration einen Bot eingerichtet hat. |
| **Telegram – eigener Bot** | Bot-Token (von @BotFather), deine Chat-ID (z. B. von @userinfobot) oder `@kanalname`, optional eine eigene API-Adresse – für einen selbst betriebenen Bot-API-Server oder ein Relay/Proxy. Schreib deinem Bot einmal, damit er dir antworten darf. |
| **Gotify** | Server-Adresse und App-Token (in Gotify unter *Apps* anlegen). Ein Tipp auf die Mitteilung öffnet Flowplan. |
| **ntfy** | Server (leer: `https://ntfy.sh`), Thema, optional ein Zugriffstoken oder Benutzer und Passwort. Auf ntfy.sh ist jedes Thema öffentlich – wähle einen schwer zu ratenden Namen oder einen eigenen Server mit Anmeldung. |
| **Matrix** | Homeserver, Raum-ID (`!abc:example.org`, in Element unter *Raumeinstellungen → Erweitert*) und das Zugriffstoken eines Kontos, das im Raum ist – am besten eines eigenen Bot-Kontos. |

**Testnachricht senden** schickt sofort eine Nachricht und zeigt das Ergebnis: angekommen, *Zugangsdaten abgelehnt (HTTP 401)*, *Nicht gefunden (HTTP 404)* (Adresse, Thema, Raum oder Chat-ID), *Server nicht erreichbar* oder *Interne Adressen sind gesperrt*. **Ändern** übernimmt neue Angaben; ein leeres Token-Feld behält das gespeicherte Token. **Trennen** löscht die Verbindung mit ihren Zugangsdaten.

**Was in der Nachricht steht:** wie bei Push die Art, ein kurzer Auszug der Benachrichtigung und ein Link zur Stelle. Mit **Text mitschicken** aus kommt nur „Neue Benachrichtigung in Flowplan“ mit dem Link. Benachrichtigungen aus [Ende-zu-Ende-verschlüsselten Bereichen](/encrypted-spaces) kommen **immer** ohne Inhalt. Tokens oder andere Geheimnisse stehen nie in einer Nachricht.

**Zugangsdaten** (Bot-, App- und Zugriffstokens, Passwörter) speichert Flowplan nur verschlüsselt wie andere [gespeicherte Geheimnisse](/configuration#gespeicherte-geheimnisse) und zeigt sie nie wieder an – nur „Token gesetzt (…abcd)“. Verbinden und Trennen erscheinen unter **Einstellungen → Sicherheitscheck → Anmeldungen & Änderungen**.

**Zustellung:** Nachrichten gehen über eine Warteschlange wie Push und E-Mail. Antwortet der Dienst nicht, versucht Flowplan es mit wachsenden Pausen erneut und gibt nach sechs Versuchen auf; bremst der Dienst (HTTP 429), wartet Flowplan so lange wie verlangt. Pro Ziel gehen höchstens 20 Nachrichten pro Minute hinaus. Was du in der App schon gelesen hast, wird nicht mehr geschickt. Lehnt der Dienst ein Ziel dreimal hintereinander ab (401/403/404 oder eine gesperrte interne Adresse), **schaltet Flowplan es aus** und sagt dir im Posteingang Bescheid; **Wieder einschalten** nimmt es nach der Korrektur wieder in Betrieb.

**Für Administratoren:** Der Schalter **Betriebswarnungen** schickt fehlgeschlagene Backups, vollen Speicher, Fehler von Hintergrunddiensten und viele fehlgeschlagene Anmeldungen (höchstens einmal am Tag je Warnung) an deine Chat-Apps – auch ohne Webhook unter [Überwachung](/administration#ueberwachung). Sicherheitsvorfälle kommen über die Zeile **Sicherheitsvorfälle der Instanz** der Benachrichtigungsarten, nicht doppelt.

Welche Dienste und Server erlaubt sind, bestimmt die Administration ([Administration → Chat-Apps](/administration#chat-apps)).
