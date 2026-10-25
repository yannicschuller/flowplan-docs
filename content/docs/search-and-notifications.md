# Suche, Posteingang und Push

Die Schnellsuche findet Inhalte bis in Dateianhänge hinein. Posteingang und Push-Nachrichten sagen dir, wenn jemand dich braucht.

## Schnellsuche

<kbd>⌘</kbd> <kbd>K</kbd> (Windows/Linux <kbd>Strg</kbd> <kbd>K</kbd>) oder **Suchen** in der Seitenleiste.

Durchsucht werden:

- Seitentitel und [Aliasse](/pages-and-spaces#aliasse) sowie Dokumenttexte,
- Datenbankeinträge und ihre Inhalte,
- Kommentare,
- Dateinamen,
- der Text von PDF-Anhängen (bis 50 MB, die ersten 100.000 Zeichen),
- gescannte PDFs und Bilder per Texterkennung (Deutsch und Englisch, auf Wunsch Französisch über `FLOWPLAN_OCR_LANGS`),
- Word-, Excel-, PowerPoint- und OpenDocument-Dateien.

Treffer lassen sich nach Typ und Bereich filtern. Dateitexte werden im Hintergrund erfasst und sind nach wenigen Sekunden auffindbar. Die Suche zeigt nur, was du lesen darfst. <kbd>Enter</kbd> öffnet den ersten Treffer.

Aliasse von Seiten und Einträgen zählen so viel wie der Titel. Passt die Suche nur zu einem Alias, zeigt der Treffer den echten Titel mit dem Alias in Grau, etwa „Chauffage · PAC“. Dasselbe gilt im Dialog der @-Erwähnung.

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

**Standardmäßig** kommt, was dich direkt betrifft – Erwähnungen, geteilte Seiten, Kommentare, Erinnerungen –, im Posteingang, als Push und per E-Mail. Gastkommentare kommen ohne E-Mail. **Änderungen an Seiten, denen du folgst, und Automationen landen nur im Posteingang**, damit nicht jede kleine Bearbeitung eine Mitteilung oder Mail auslöst. Unter **Einstellungen → Benachrichtigungen** lässt sich das je Art und Kanal ändern; **Auf Standard zurücksetzen** stellt den Ausgangszustand wieder her.

Ungelesenes ist markiert und lässt sich filtern. Ein Klick öffnet die Stelle, bei Textkommentaren direkt den Thread.

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
