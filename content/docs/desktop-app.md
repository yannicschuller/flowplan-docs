---
keywords: Desktop, Mac, macOS, Windows, Linux, App, Profile, Fenster
---

# Desktop-App für macOS, Windows und Linux

Eine schlanke Desktop-App umschließt deine Flowplan-Instanz. Beim ersten Start fragt sie nach der Adresse und schlägt `https://app.flowplan.org` vor – für die eigene Instanz einfach deren Adresse eintragen (z. B. `https://flowplan.example.com`). Weitere Instanzen legst du als [Profile](#mehrere-instanzen-profile) an.

- Alle Daten bleiben auf dem Server.
- Die App merkt sich Fenstergröße und -position, bietet deutsche Menüs und öffnet externe Links im Standardbrowser. Rechtsklick-Menü mit Rechtschreibvorschlägen, [Schnell erfassen von überall](/desktop-capture), Symbol in Menüleiste oder Infobereich, Seiten in eigenen Fenstern und mehr: siehe [Mehr aus der Desktop-App](#mehr-aus-der-desktop-app).
- Die Offline-Nutzung funktioniert auch in der Desktop-App: **Einstellungen → Offline & Geräte** in der App einschalten – die App hat eigene Offline-Kopien, getrennt von Browser oder installierter Web-App. Ohne Verbindung öffnet sie dann die gespeicherte Kopie; ihre eigene Offline-Seite (**Erneut versuchen**, **Profile**) erscheint nur, wenn auf dem Gerät keine Kopie liegt.
- **Mitteilungen:** Die App zeigt neue Benachrichtigungen aus dem Posteingang als Mitteilungen des Systems und die Zahl der ungelesenen am App-Symbol – auch bei minimiertem oder ausgeblendetem Fenster. Mehr unter [Mitteilungen in der Desktop-App](#mitteilungen-in-der-desktop-app).
- Sie akzeptiert nur echte Flowplan-Instanzen – eine Adresse, hinter der etwas anderes läuft oder die auf eine andere Seite weiterleitet, wird abgelehnt.
- **Handoff (Mac):** Die Seite im Fenster erscheint auf deinem iPad und iPhone (gleicher Apple Account, Handoff an) und öffnet sich dort in der Flowplan-App – ohne App im Browser. Eine Seite, die in der iPad- oder iPhone-App offen ist, erscheint im Dock des Mac und öffnet sich in der Desktop-App, im Profil ihrer Instanz. Siehe [iPad: Fenster, Tastatur und Handoff](/mobile-capture#ipad-fenster-tastatur-und-handoff).
- **Mit Passkey anmelden** und **Mit SSO anmelden** öffnen die Anmeldung im Standardbrowser, wo Passkeys (iCloud-Schlüsselbund, Windows Hello, Passwortmanager) zur Verfügung stehen. Nach **In der App anmelden** übernimmt die App die Anmeldung; E-Mail und Passwort gehen direkt in der App (**Mit E-Mail und Passwort** öffnet das Formular). Das braucht Flowplan 0.3.3 oder neuer. Füllt dein Passwort-Manager in der App nichts aus, meldet dich **Im Browser anmelden** unter dem Formular ebenfalls über den Browser an (ab Flowplan 0.8.8).
- **Windows:** Mit einer aktuellen Desktop-App und Flowplan nach 0.8.13 meldet **Mit Passkey anmelden** direkt im App-Fenster mit Windows Hello an (Gesicht, Fingerabdruck, PIN oder Sicherheitsschlüssel). Klappt das nicht oder brichst du ab, führt **Im Browser anmelden** darunter über den Browser wie bisher. SSO läuft weiter über den Browser, ebenso Passkeys unter macOS und Linux.

Die Apps für macOS, Windows und Linux gibt es unter [flowplan.org/download](https://flowplan.org/download) – die Seite erkennt dein System. Updates installieren sich von selbst (macOS, Windows-Installer, Linux-AppImage). Die Mac-App ist signiert und notarisiert; wer noch 1.0.5 oder älter hat, lädt einmal die aktuelle Version herunter, danach aktualisiert sie sich selbst. Windows zeigt SmartScreen. Mehr unter [Betrieb und Fehlersuche](/operations#desktop-apps).

> [!NOTE]
> Die Umgebungsvariable `FLOWPLAN_UPDATE_URL` gibt es zweimal: Auf dem Rechner mit der Desktop-App nennt sie eine andere Quelle für App-Updates (siehe [Updates](/operations#updates)); auf dem Server nennt die gleichnamige Variable den Spiegel für den Release-Check der Instanz (siehe [Konfiguration](/configuration#betrieb)). Beide meinen verschiedene Dinge und gehören an verschiedene Orte.

## Mehrere Instanzen (Profile)

Arbeitest du mit mehr als einer Flowplan-Instanz, etwa **Arbeit – flowplan.firma.de** und **Privat – notizen.example**, speichert die Desktop-App jede als eigenes Profil:

- **Hinzufügen:** Menü **Profile → Profil hinzufügen …**, Adresse eintragen und optional einen Namen (ohne Namen zeigt die App die Adresse). Die Adresse wird geprüft wie beim ersten Start.
- **Wechseln:** im Menü **Profile** (macOS: im Menü *Flowplan*, Windows und Linux: im Menü *Datei*), mit **Nächstes Profil** (++⌘ ⇧ P++ bzw. ++Strg Umschalt P++), auf dem Mac über das Dock-Symbol und unter Windows über die Sprungliste in der Taskleiste.
- **Umbenennen und entfernen:** **Profile → Profile verwalten …** (auch von der Offline-Seite aus). Entfernen fragt nach, meldet das Profil ab und löscht, was es auf diesem Computer gespeichert hat. Deine Daten bleiben auf dem Server.

Jedes Profil hat seine eigene Anmeldung, seine eigene Offline-Kopie und eigene Cookies – auch zwei Profile auf derselben Instanz, etwa für zwei Konten. Im Fenster öffnet sich nur die Instanz des aktiven Profils; Links auf eine andere Instanz gehen in den Browser. Bei mehr als einem Profil steht der Profilname im Fenstertitel.

Wer bisher eine Adresse eingerichtet hatte, findet sie nach dem Update als erstes Profil wieder – angemeldet und mit der bisherigen Offline-Kopie.

## Mitteilungen in der Desktop-App

Browser bekommen Benachrichtigungen per Web-Push – das gibt es in der Desktop-App nicht. Sie fragt deshalb selbst bei deiner Instanz nach, etwa einmal pro Minute, solange sie läuft:

- **Was erscheint:** jede neue ungelesene Benachrichtigung einmal, mit der Zeile aus dem Posteingang als Titel und dem Eintrag darunter (bei mehreren Profilen auch der Profilname). Es gelten deine **Benachrichtigungsarten** unter **Einstellungen → Benachrichtigungen**: Mitteilungen gibt es nur für Arten, bei denen **Push** eingeschaltet ist. Kommen mehr als drei auf einmal, fasst die App sie zu einer Mitteilung zusammen, die den Posteingang öffnet.
- **Klick:** holt das Fenster nach vorn, wechselt bei Bedarf ins richtige Profil und öffnet die Seite.
- **Zahl am Symbol:** die ungelesenen Benachrichtigungen – im Dock (macOS), im Starter (Linux, wenn der Desktop Zahlen anzeigt) und als roter Punkt an der Taskleisten-Schaltfläche (Windows).
- **Einstellungen:** im Menü **Mitteilungen** (macOS: im Menü *Flowplan*, Windows und Linux: im Menü *Datei*): **Mitteilungen anzeigen**, **Nicht stören** für eine Stunde oder bis morgen früh und **Alle Profile** (sonst nur das aktive Profil). In der App zeigt **Einstellungen → Benachrichtigungen** statt Web-Push denselben Schalter.

Für das Fenster im Vordergrund erscheinen keine Mitteilungen – dort siehst du den Posteingang ohnehin. Was beim ersten Start schon da war, zeigt die App nicht noch einmal, auch nicht nach einem Neustart.

Auf dem Mac läuft die App nach dem Schließen des Fensters im Dock weiter und meldet sich weiter. Unter Windows und Linux beendet das Schließen des Fensters die App; Mitteilungen kommen, solange sie läuft (minimiert reicht) – oder mit dem [Symbol im Infobereich](#mehr-aus-der-desktop-app) auch ohne Fenster.

Das braucht einen Flowplan-Server ab 0.7.0 und die Desktop-App 1.0.7 oder neuer. Die App fragt nur die eigene Instanz des Profils, mit dessen Anmeldung; auf dem Server wird dafür nichts hinterlegt.

## Mehr aus der Desktop-App

Seit der Desktop-App 1.1.0 kommt rund um das Fenster einiges dazu. Die Schalter dafür stehen unter **Einstellungen …** (macOS: im Menü *Flowplan*, Windows und Linux: im Menü *Datei*).

- **Rechtsklick und Rechtschreibung:** Ein Rechtsklick in Feldern, auf Links und Bildern zeigt ein Menü des Systems – Vorschläge für ein falsch geschriebenes Wort, **Zum Wörterbuch hinzufügen**, Ausschneiden, Kopieren, Einsetzen, **Als reinen Text einsetzen**, Link im Browser oder in neuem Fenster öffnen, Bild kopieren oder sichern, auf dem Mac **Nachschlagen**. Im Editor bleibt das Textmenü von Flowplan; dort stehen die Vorschläge der App oben in diesem Menü (braucht einen Flowplan-Server ab 0.7.0). Die Sprachen der Prüfung – Deutsch, Englisch, Französisch – wählst du unter **Rechtschreibung** im Rechtsklick-Menü, im Menü *Bearbeiten* oder in den Einstellungen. Die Prüfung umfasst nur Deutsch, Englisch und Französisch; für Chinesisch hat Chromium, auf dem die Desktop-App aufbaut, kein Wörterbuch.
- **Schnell erfassen von überall:** ++Strg Umschalt Leertaste++ (Mac: ++⇧ ⌘ Leertaste++) öffnet über jeder App ein kleines Fenster – in den Eingang, eine Datenbank, den heutigen Journal-Eintrag oder an eine Seite, mit Kürzeln wie `morgen 15 Uhr #kunde @anna !hoch`, Links aus der Zwischenablage, Dateien, Bildschirmausschnitten und Sprachnotizen, **Rückgängig** und **Zuletzt erfasst**, Schnellaktionen mit eigenen Tastenkürzeln und einem optionalen KI-Vorschlag. Ohne Verbindung wartet die Erfassung verschlüsselt in einer Warteschlange und wird später gesendet, ohne doppelt anzukommen. Alles dazu: [Schnell erfassen (Desktop)](/desktop-capture).
- **Symbol in der Menüleiste (Mac) bzw. im Infobereich (Windows, Linux):** **Schnell erfassen**, die heute fälligen und überfälligen Aufgaben aus **Meine Aufgaben**, die ungelesenen Benachrichtigungen, Flowplan öffnen, die Profile und Beenden. Auf dem Mac standardmäßig an, unter Windows und Linux in den Einstellungen einzuschalten; dann läuft die App nach dem Schließen des Fensters im Infobereich weiter.
- **Seiten aus Links öffnen:** Links der Form `flowplan://open?instance=…&page=…` öffnen die Seite in der App, im Profil ihrer Instanz. Im Browser auf dem Computer steht dafür in den **Seitenaktionen** (**…** oben rechts) **In Desktop-App öffnen**. Für eine Instanz ohne Profil fragt die App erst, ob sie sie hinzufügen soll.
- **Seiten in eigenen Fenstern:** **Seite in neuem Fenster öffnen** (++⌘ ⇧ N++ bzw. ++Strg Umschalt N++), ein Klick mit <kbd>Umschalt</kbd> oder der mittleren Maustaste auf einen Link, oder **In neuem Fenster öffnen** im Menü einer Seite. Die App merkt sich diese Fenster mit Größe und Platz und öffnet sie beim nächsten Start wieder.
- **Zurück und vorwärts:** Menü *Navigation* → **Zurück** / **Vorwärts** (++⌘ [++ / ++⌘ ]++, Windows und Linux: ++Alt ←++ / ++Alt →++), die Seitentasten der Maus und auf dem Mac das Streichen mit drei Fingern gehen dieselben Schritte wie die [Pfeile oben links](/first-steps#zurueck-und-vorwaerts); die Menüpunkte sind ausgegraut, wenn es in der Richtung nichts gibt. Für das Streichen unter **Systemeinstellungen → Trackpad → Weitere Gesten → Zwischen Seiten streichen** die Einstellung **Mit zwei oder drei Fingern streichen** wählen.
- **Dateien hineinziehen:** PDFs, Bilder, Markdown- und Textdateien auf das Dock-Symbol ziehen, mit **Öffnen mit → Flowplan** öffnen oder ins Fenster ziehen, wo Flowplan sie nicht selbst annimmt. Die App fragt, wohin: **In den Eingang** (ein Eintrag je Datei) oder **Als neue Seiten** (Markdown wird eine echte Seite). Bilder und PDFs bis 50 MB, Text bis 5 MB, höchstens 10 Dateien auf einmal.
- **Beim Anmelden öffnen:** in den Einstellungen, auf Wunsch **Ohne Fenster starten**.
- **Drucken und PDF:** **Drucken …** zeigt eine Vorschau und druckt über den Dialog des Systems, **Als PDF sichern …** speichert die Seite als PDF – beides ohne Seitenleiste und Werkzeuge, wie beim Drucken im Browser.
- **Updates ohne Unterbrechung:** Ein neues Update lädt im Hintergrund; ein kleiner Hinweis unten im Fenster zeigt Fortschritt, Größe und Geschwindigkeit, der Fortschritt erscheint auch am App-Symbol. Ist es fertig, bietet der Hinweis (und das Menü) **Neu starten**; sonst wird es beim Beenden installiert. Kein Dialog unterbricht das Tippen. **Was ist neu?** im Hinweis klappt die Versionshinweise aller Versionen zwischen der installierten und der neuen auf, Breaking Changes hervorgehoben (ab Desktop-App 1.3.8). Die Hinweise kommen mit dem Update aus den GitHub-Releases, die die App ohnehin abfragt – keine zusätzliche Anfrage. Ob und was der Knopf zeigt, stellst du in den **Einstellungen** der App unter **Updates → Neuigkeiten nach Updates** ein: **Alle anzeigen**, **Nur Breaking Changes** oder **Nie**. Neuigkeiten von Flowplan selbst zeigt die Instanz nach ihrem Update ([Neuigkeiten nach Updates](/offline-and-apps#hell-und-dunkel)).
