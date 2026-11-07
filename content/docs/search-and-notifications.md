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
- gescannte PDFs und Bilder per Texterkennung (Deutsch und Englisch, auf Wunsch Französisch oder Chinesisch (Kurzzeichen) über `FLOWPLAN_OCR_LANGS`),
- Word-, Excel-, PowerPoint- und OpenDocument-Dateien.

Treffer lassen sich nach Typ und Bereich filtern. [Journaltage](/journal#tage-in-listen-suche-graph-und-export) stehen hinter allen anderen Treffern; **Ohne Journaltage** lässt sie ganz weg und bleibt für die nächste Suche eingeschaltet. Dateitexte werden im Hintergrund erfasst und sind nach wenigen Sekunden auffindbar. Die Suche zeigt nur, was du lesen darfst. <kbd>Enter</kbd> öffnet den ersten Treffer.

Aliasse von Seiten und Einträgen zählen so viel wie der Titel. Passt die Suche nur zu einem Alias, zeigt der Treffer den echten Titel mit dem Alias in Grau, etwa „Chauffage · PAC“. Dasselbe gilt im Dialog der @-Erwähnung.

### Nach Tags und Eigenschaften filtern

Diese Wörter wirken in der Suche als Filter:

| Eingabe | Findet |
| --- | --- |
| `#Kunde` | Seiten mit dem Tag „Kunde“ (Groß-/Kleinschreibung egal) und Datenbank-Einträge, die ihn in einer Mehrfachauswahl mit den Tags des Arbeitsbereichs tragen; Tags mit Leerzeichen als `#"Neue Idee"` |
| `-#Intern` | lässt Seiten und Einträge mit dem Tag weg |
| `Status:Offen` | Eigenschaft „Status“ mit dem Wert „Offen“ (Auswahl und Mehrfachauswahl: genau diese Option; Text, Webadresse, E-Mail, Telefon: enthält) |
| `Budget:>1000`, `Budget:<=50`, `Budget:10..20` | Zahlen vergleichen |
| `Fällig:2026-12`, `Fällig:>2026-11-01`, `Fällig:2026-11-01..2026-11-30` | Datum: Tag, Monat oder Jahr; nach, zwischen (auch `<`, `>=`, `<=`) |
| `Abgerechnet:ja` / `Abgerechnet:nein` | Kontrollkästchen |
| `Verantwortlich:Emil`, `Verantwortlich:ich` | Person nach Namen; `ich` (auch `me`) bist du |
| `Status:*` / `Status:-` | Eigenschaft gesetzt / leer |

Namen mit Leerzeichen stehen in Anführungszeichen: `"Nächster Schritt":Angebot`. Mehrere Filter gelten zusammen; der übrige Text wird wie gewohnt gesucht. Nur Filter ohne Text listen alle passenden Seiten, die zuletzt geänderte zuerst. Einträge zählen dabei mit ihren eigenen Tags und denen ihrer Datenbank-Seite. Wörter, die keinen Tag und keine Eigenschaft nennen (etwa `#123`), bleiben normale Suchwörter.

Tags und Eigenschaften können [nur in einem Bereich gelten](/pages-and-spaces#geltungsbereich-arbeitsbereich-oder-bereich), und zwei Bereiche dürfen gleichnamige haben. `#Dringend` ist ein Name: Es findet die Seiten mit jedem Tag dieses Namens, den du sehen darfst – in jedem Bereich den dort geltenden. Die Auswahl **Tag …** neben dem Suchfeld zeigt mit gewähltem Bereich nur dessen Tags und die des Arbeitsbereichs, für alle Bereiche alle mit dem Bereichsnamen als Hinweis. Die [Tag-Ansicht](/pages-and-spaces#tag-ansicht) zeigt dagegen genau einen Tag (gleichnamige anderer Bereiche auf Wunsch dazu).

Erkannte Filter erscheinen als Chips unter dem Suchfeld; ✕ nimmt einen wieder heraus. Die Auswahl **Tag …** neben dem Bereich fügt einen Tag-Filter ein. Sammlungen behalten die Filter. Tag-Namen und Werte sind außerdem gewöhnliche Suchwörter der Seite: „Kunde“ findet auch Seiten mit dem Tag „Kunde“.

### Verknüpfen: UND, ODER, NICHT

Bedingungen lassen sich frei kombinieren. Das geht in der Suche und in [Sammlungen](#sammlungen):

| Eingabe | Bedeutung |
| --- | --- |
| `#Kunde #Offen` | beide (UND; ein `AND` dazwischen ist erlaubt) |
| `#Offen OR #Wartet`, `#Offen \| #Wartet` | eines von beiden |
| `-#Intern`, `NOT #Intern`, `-entwurf` | ohne; `-` bzw. `NOT` geht vor jeder Bedingung und vor einer Klammer |
| `(#Offen OR #Wartet) -#Intern` | Klammern gruppieren |
| `created_by:Anna`, `creator:me` | erstellt von (Name oder `me` für dich) |
| `updated_by:Emil`, `editor:me` | zuletzt geändert von |
| `created:-7d`, `updated:this-week` | erstellt bzw. geändert in den letzten 7 Tagen, in dieser Woche |
| `created:2026-03`, `updated:>2026-01-01`, `created:2026-01-01..2026-01-31` | Jahr, Monat oder Tag; danach (`>`, `>=`), davor (`<`, `<=`), Zeitraum |
| `type:document`, `type:database\|whiteboard`, `type:record` | nur Dokumente, Datenbanken, Whiteboards oder Datenbank-Einträge (auch `notebook`, `journal`) |
| `in:"Team Marketing"` | nur in diesem Bereich |
| `title:Angebot` | nur der Titel enthält das Wort |

**Relative Zeiträume:** `-7d`, `-2w`, `-3m` und `-1y` meinen die letzten 7 Tage, 2 Wochen, 3 Monate oder ein Jahr, heute eingeschlossen. Dazu kommen `today`, `yesterday`, `this-week`, `last-week`, `this-month`, `last-month`, `this-year` und `last-year`. Wochen beginnen am Montag. „Heute“ ist der Tag in deiner Zeitzone. Diese Angaben gehen auch bei Datums-Eigenschaften: `Fällig:this-week`.

**Vorrang:** `NOT`/`-` bindet am stärksten, dann UND, dann ODER. `#A #B OR #C` heißt also `(#A #B) OR #C`. Im Zweifel setzt du Klammern. `OR`, `AND` und `NOT` gelten nur in Großbuchstaben. Kleingeschriebenes „or“ bleibt ein Suchwort.

**Wörter:** Wörter direkt hintereinander werden wie bisher als zusammenhängender Ausdruck gesucht. Mit `AND` dazwischen (`Rechnung AND offen`) dürfen sie irgendwo stehen.

**Schlüsselwörter:** `created_by`, `creator`, `updated_by`, `editor`, `created`, `updated`, `type`, `in` und `title` sind englisch. Groß- und Kleinschreibung zählt nicht. Heißt eine Eigenschaft genauso, setzt du ihren Namen in Anführungszeichen: `"Type":Buch`. Bei Datenbank-Einträgen prüft `Eigenschaft:Wert` zuerst die gleichnamige Eigenschaft des Eintrags (z. B. `Priorität:Hoch`), sonst die der Datenbankseite.

Alle bisherigen Suchen funktionieren unverändert. Suchen mit den neuen Bedingungen listen die passenden Seiten und Einträge ohne Textausschnitt, zuletzt geänderte zuerst. Ende-zu-Ende-verschlüsselte Bereiche durchsucht der Server nicht.

### Befehle

Dieselbe Schnellsuche führt auch Befehle aus: Beginnt die Eingabe mit `>`, erscheinen nur Befehle, etwa `> neue datenbank`, `> aufgaben`, `> dunkel` oder `> fokus`; <kbd>Enter</kbd> führt den ersten aus. Passende Befehle erscheinen auch ohne `>` über den Suchtreffern. Mit geöffneter Seite gibt es zusätzlich Seitenbefehle: Favorit, Folgen, Kommentare, Export, Drucken/PDF, Versionsverlauf, Teilen und Fokusmodus.

### Sammlungen

Eine **Sammlung** ist eine gespeicherte Suche mit eigenem Platz in der Seitenleiste. Öffnest du sie, sucht Flowplan jedes Mal neu. Neue und geänderte Seiten und Einträge, die passen, erscheinen von selbst.

- **Anlegen:** In der Schnellsuche **Als Sammlung speichern** (Art und Bereich der Suche werden zu `type:` und `in:`) oder in der Seitenleiste bei **Sammlungen** auf **+**.
- **Filter oder Text:** Im Editor stellst du die Abfrage unter **Filter** zusammen. Gruppen verlangen **alle Bedingungen (UND)** oder **mindestens eine (ODER)**. Jede Bedingung und jede Gruppe lässt sich ausschließen (NICHT). Zur Wahl stehen Tag, Erstellt von, Zuletzt geändert von, Eigenschaft (je nach Typ: Auswahl, Mehrfachauswahl, Text, Zahl, Datum, Kontrollkästchen, Person), Erstellt am, Geändert am (relativ oder fest), Art, Bereich, Titel enthält und Text enthält. Unter **Text** steht dieselbe Abfrage in der Suchsprache. Beide Ansichten bleiben gleich: Was du im Text änderst, zeigen die Filter wieder an. Lässt sich ein Text nicht als Filter darstellen (etwa wegen einer fehlenden Klammer), bleibt der Editor bei Text und sagt das. Darunter siehst du sofort, wie viele Treffer es gibt.
- **Ergebnisse:** Als **Liste** oder **Tabelle** mit Titel, Art, Bereich, Tags, Geändert und Erstellt von. Ein Klick auf die Spaltenüberschrift sortiert. Höchstens 500 Treffer werden gezeigt, zuletzt geänderte zuerst.
- **Verwalten:** Im Menü **…** neben einer Sammlung findest du Bearbeiten (Name, Emoji, Filter, Teilen), Duplizieren, Nach oben/Nach unten und Löschen. Sammlungen lassen sich auch per Ziehen ordnen; die Reihenfolge gilt für dich. Nach dem Löschen bietet **Rückgängig** die Sammlung wieder an.
- **Teilen:** Neue Sammlungen sind privat. Mit **Mit dem Arbeitsbereich teilen** sehen alle Mitglieder sie unter **Geteilt**, Gäste nicht. Ändern und löschen dürfen sie nur du und die Eigentümer des Arbeitsbereichs. Teilen oder das Teilen beenden kannst nur du. Die anderen können **Als meine Sammlung duplizieren**.
- **Rechte:** Jede Person sieht in einer Sammlung nur, was sie selbst lesen darf. Das gilt auch für geteilte Sammlungen: keine privaten Bereiche, keine privaten Einträge anderer, keine verborgenen Eigenschaften, keine Journale hinter einer PIN, nichts aus dem Papierkorb. Ende-zu-Ende-verschlüsselte Bereiche bleiben außen vor; die Sammlung weist darauf hin.
- **Grenzen:** 100 Sammlungen je Person und Arbeitsbereich, 100 geteilte je Arbeitsbereich.

Gespeicherte Suchen aus früheren Versionen sind beim Update zu privaten Sammlungen geworden. Suchen nach Kommentaren oder Dateien behalten ihre Wörter, aber nicht die Art.

## Posteingang

Der **Posteingang** sammelt:

- Erwähnungen,
- Kommentare, die dich betreffen (siehe [unten](#wer-von-kommentaren-erfaehrt)), und Antworten in Textkommentaren, an denen du beteiligt bist,
- Datums-Erinnerungen,
- Kommentare und Einträge von Gästen über Freigabelinks,
- mit dir geteilte Seiten und Arbeitsbereiche,
- Änderungen an Seiten, denen du folgst (eigene Seiten folgst du beim Anlegen automatisch; die Glocke oben rechts schaltet das Folgen um),
- Meldungen aus Automationen.

### Wer von Kommentaren erfährt

Ein neuer Kommentar – auf einer Seite, an einem Datenbankeintrag oder als neuer Textkommentar – benachrichtigt nicht den ganzen Arbeitsbereich, sondern nur:

- wer der Seite folgt (wer eine Seite anlegt, folgt ihr automatisch; bei einem Eintrag: wer der Datenbank folgt),
- die Besitzerin oder den Besitzer der Seite,
- bei einem Eintrag: wer ihn angelegt hat und die Personen in seinen Personen-Eigenschaften (etwa **Zugewiesen**),
- wer auf derselben Seite bzw. demselben Eintrag schon kommentiert hat,
- wer im Kommentar mit `@` erwähnt wird.

Antworten in einem Textkommentar erreichen alle, die in diesem Thread schon geschrieben haben, und die darin Erwähnten. Nie benachrichtigt werden die verfassende Person selbst und wer die Seite oder den Eintrag nicht sehen darf. Wer bei einer Seite mitlesen will, folgt ihr über die Glocke.

**Standardmäßig** kommt, was dich direkt betrifft – Erwähnungen, geteilte Seiten, Kommentare, Erinnerungen –, im Posteingang, als Push, per E-Mail und in verbundenen [Chat-Apps](#chat-apps). Gastkommentare kommen ohne E-Mail und ohne Chat-App. **Änderungen an Seiten, denen du folgst, und Automationen landen nur im Posteingang**, damit nicht jede kleine Bearbeitung eine Mitteilung oder Mail auslöst. Unter **Einstellungen → Benachrichtigungen** lässt sich das je Art und Kanal ändern; **Auf Standard zurücksetzen** stellt den Ausgangszustand wieder her.

**Aufbewahrung:** Gelesene Benachrichtigungen werden nach 90 Tagen gelöscht, ungelesene nach einem Jahr; je Person bleiben höchstens die neuesten 1.000. Der Posteingang zeigt die neuesten 100.

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
