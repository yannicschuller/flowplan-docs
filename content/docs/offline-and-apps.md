# Offline, Web-App und Desktop

Flowplan läuft im Browser, lässt sich als App installieren und funktioniert auch ohne Verbindung weiter.

## Ohne Verbindung arbeiten

Dokumente speichert Flowplan immer zuerst lokal im Browser (IndexedDB) und gleicht sie mit dem Server ab, sobald er erreichbar ist. Bricht die Verbindung ab, schreibst du einfach weiter; Änderungen anderer werden beim Wiederverbinden zusammengeführt.

### Offline-Nutzung einschalten

Unter **Einstellungen → Daten → Offline-Nutzung** speichert das Gerät zusätzlich die App, den Arbeitsbereich, alle lesbaren Seiten und später geöffnete Dateien. Dann lassen sich auch ohne Verbindung Seiten öffnen, Dokumente und Datenbanken lesen und Text bearbeiten.

- Online kommt immer der aktuelle Stand vom Server; die Kopie dient nur ohne Verbindung.
- Die Kopien enthalten private Inhalte. Sie werden beim Abmelden, beim Ausschalten und bei der Anmeldung einer anderen Person entfernt.

### Datenbank-Einträge offline

Änderungen an Einträgen ohne Verbindung erscheinen sofort in den Ansichten und werden auf dem Gerät gesammelt. Sobald die Verbindung zurück ist, gehen sie der Reihe nach an den Server. Hat jemand denselben Eintrag inzwischen geändert, führt Flowplan die Änderungen Feld für Feld zusammen; wurde dasselbe Feld auf beiden Seiten geändert oder der Eintrag gelöscht, entscheidest du im Konfliktdialog.

> [!NOTE]
> Das Schema einer Datenbank – Eigenschaften und Ansichten – lässt sich nur mit Verbindung ändern.

## Als App installieren

- **Chrome, Edge**: Installieren-Symbol in der Adressleiste.
- **Safari auf dem Mac**: **Ablage → Zum Dock hinzufügen**.
- **iPhone, iPad**: Teilen → **Zum Home-Bildschirm**. Nur so sind dort Push-Nachrichten möglich.
- **Android**: Menü → **App installieren**.

Die installierte App öffnet in einem eigenen Fenster ohne Browserleisten.

### Teilen an Flowplan

Ist Flowplan auf Android (Chrome) als App installiert, erscheint es im **Teilen**-Menü anderer Apps. Geteilte Texte und Links landen in einer Vorschau; **Als Seite speichern** legt daraus eine Seite im gewählten Bereich an. Ohne Anmeldung geht es erst zur Anmeldung und danach zurück zur Vorschau. iOS bietet Web-Apps dieses Menü nicht an.

Bei Links fragt die Vorschau, ob sie **als Seite** oder **als Lesezeichen** gespeichert werden sollen. **Artikeltext übernehmen** lädt die Webseite auf dem Server und übernimmt ihren Haupttext ohne Navigation, Werbung und Skripte (nur öffentliche Adressen).

### Web-Clipper im Browser

Unter **Einstellungen → Daten → Web-Clipper und Lesezeichen** liegt der Knopf **In Flowplan speichern**. In die Lesezeichenleiste gezogen, öffnet er auf jeder Webseite ein kleines Fenster mit Titel, Adresse und dem markierten Text – dieselbe Vorschau wie beim Teilen. Nach dem Speichern schließt sich das Fenster.

### Lesezeichen

Lesezeichen landen in der Datenbank **Lesezeichen** des gewählten Bereichs; sie entsteht beim ersten Mal von selbst, mit Link, Website, Ordner, Notiz, Datum und „Gelesen“ sowie den Ansichten Alle, Karten und Ungelesen. Der mitgenommene Artikeltext steht im Eintrag. **Lesezeichen-Datei wählen** importiert die HTML-Datei, die Chrome, Edge, Firefox und Safari beim Exportieren der Lesezeichen erzeugen – samt Ordnern und Datum; Links, die schon da sind, werden übersprungen.

## Desktop-App für macOS und Windows

Eine schlanke Desktop-App umschließt deine Flowplan-Instanz. Beim ersten Start fragt sie nach der Adresse und schlägt `https://app.flowplan.org` vor – für die eigene Instanz einfach deren Adresse eintragen (z. B. `https://flowplan.example.com`); **Server wechseln …** im Menü ändert sie später.

- Alle Daten bleiben auf dem Server.
- Die App merkt sich Fenstergröße und -position, bietet deutsche Menüs und öffnet externe Links im Standardbrowser.
- Ohne Verbindung zeigt sie eine eigene Offline-Seite; die Offline-Nutzung der Web-App funktioniert wie im Browser.
- Sie akzeptiert nur echte Flowplan-Instanzen – eine Adresse, hinter der etwas anderes läuft oder die auf eine andere Seite weiterleitet, wird abgelehnt.
- **Mit Passkey anmelden** und **Mit SSO anmelden** öffnen die Anmeldung im Standardbrowser, wo Passkeys (iCloud-Schlüsselbund, Windows Hello, Passwortmanager) zur Verfügung stehen. Nach **In der Desktop-App anmelden** übernimmt die App die Anmeldung; E-Mail und Passwort gehen direkt in der App.

Die Apps für macOS, Windows und Linux gibt es unter [flowplan.org/download](https://flowplan.org/download) – die Seite erkennt dein System; Updates installieren sich von selbst. Solange sie nicht signiert sind, fragt macOS beim ersten Öffnen nach (Rechtsklick → Öffnen) und Windows zeigt SmartScreen. Mehr unter [Betrieb und Fehlersuche](/operations#desktop-apps).

## Apps für iPhone, iPad und Android (in Vorbereitung)

> [!NOTE]
> Die Apps sind in Vorbereitung und noch nicht im App Store und bei Google Play erhältlich. Bis dahin lässt sich Flowplan wie oben beschrieben als Web-App installieren.

Wie die Desktop-App zeigen die mobilen Apps deine Flowplan-Instanz; alle Daten bleiben auf dem Server, neue Funktionen kommen ohne App-Update. Dazu kommt, was nur eine App kann:

- **Mitteilungen:** Erwähnungen, Kommentare, Aufgaben und Erinnerungen kommen als Mitteilung, die Zahl der ungelesenen steht am App-Symbol. Die App fragt nach dem ersten Anmelden einmal nach der Erlaubnis; ein Tipp öffnet die betroffene Seite. Welche Arten kommen, regelst du wie im Browser unter **Einstellungen → Benachrichtigungen**.
- **Widgets** für den Home-Bildschirm (auf dem iPhone auch für den Sperrbildschirm): fällige Aufgaben, der Posteingang und die laufende Zeiterfassung. Ein Tipp öffnet die Aufgabe bzw. Seite. Sie aktualisieren sich im Hintergrund.
- **Laufende Zeiterfassung:** Auf dem iPhone erscheint ein laufender Timer als Live-Aktivität auf dem Sperrbildschirm und in der Dynamic Island, auf Android als Mitteilung mit laufender Uhr.
- **Schnellaktionen:** Langes Drücken auf das App-Symbol öffnet Posteingang, Meine Aufgaben, die Suche oder eine neue Seite.
- **App-Sperre:** Auf Wunsch entsperrt sich Flowplan nur mit Face ID, Touch ID, Fingerabdruck oder dem Gerätecode.
- **Exporte und Downloads** gehen in das Teilen-Menü des Systems (z. B. „In Dateien sichern“).
- **iPad und Tablets:** alle Ausrichtungen, Split View, Slide Over und Stage Manager, Tastatur und Trackpad. Mit dem **Apple Pencil** zeichnest du auf Whiteboards mit Druckstärke, während Finger die Fläche bewegen; Doppeltippen und Drücken wechseln das Werkzeug, Scribble schreibt in jedes Textfeld (siehe [Whiteboards](/whiteboards#stift-und-formerkennung)).

Außerdem:

- Beim ersten Start fragen sie nach der Adresse und schlagen `https://app.flowplan.org` vor. Sie akzeptieren nur echte Flowplan-Instanzen, die nicht auf eine andere Seite weiterleiten. Die **App-Einstellungen** (über **Einstellungen → Benachrichtigungen → App-Einstellungen öffnen** oder langes Drücken auf das App-Symbol → **Server wechseln**) ändern den Server; **Abmelden und Server vergessen** meldet die App ab und entfernt sie von der Instanz.
- **Mit Passkey anmelden** und **Mit SSO anmelden** öffnen das Anmeldefenster des Systems (iOS) bzw. einen Browser-Tab (Android); danach übernimmt die App die Anmeldung. E-Mail und Passwort gehen direkt in der App. Das braucht einen Flowplan-Server neuer als 0.3.4; Mitteilungen und Widgets einen Server mit der App-Schnittstelle (ab der nächsten Version).
- Links zu anderen Seiten öffnen im Browser; ohne Verbindung zeigt die App eine eigene Seite und verbindet sich von selbst wieder.
- Auf Android erscheint Flowplan im **Teilen**-Menü anderer Apps.

### Was die App auf der Instanz hinterlegt

Nach dem Anmelden meldet sich die App bei der Instanz an: Der Eintrag gehört zu dieser Anmeldung und verschwindet mit dem Abmelden, dem Ende der Sitzung oder dem Löschen des Kontos. Die Widgets lesen damit im Hintergrund nur eine kurze Übersicht (ungelesene Benachrichtigungen, offene Aufgaben, laufender Timer). Mitteilungen laufen über den Push-Dienst von Expo, der sie an Apple bzw. Google weitergibt – wie bei Web-Push steht darin nur, dass etwas Neues im Posteingang liegt. Betreiber können das abschalten oder den Text mitschicken, siehe [Konfiguration](/configuration#push-benachrichtigungen).

## Hell und dunkel

Unter **Einstellungen → Allgemein → Erscheinungsbild** wählst du hell oder dunkel. Die Webseite und diese Dokumentation folgen der Einstellung deines Systems.
