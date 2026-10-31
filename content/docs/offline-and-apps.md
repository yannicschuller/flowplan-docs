# Offline, Web-App und Desktop

Flowplan läuft im Browser, lässt sich als App installieren und funktioniert auch ohne Verbindung weiter.

## Ohne Verbindung arbeiten

Dokumente speichert Flowplan immer zuerst lokal im Browser (IndexedDB) und gleicht sie mit dem Server ab, sobald er erreichbar ist. Bricht die Verbindung ab, schreibst du einfach weiter; Änderungen anderer werden beim Wiederverbinden zusammengeführt.

### Offline-Nutzung einschalten

Unter **Einstellungen → Offline & Geräte** speichert das Gerät zusätzlich die App, den Arbeitsbereich, alle lesbaren Seiten und später geöffnete Einträge und Dateien. Dann lassen sich auch ohne Verbindung Seiten öffnen, Dokumente und Datenbanken lesen und Text bearbeiten.

- Online kommt immer der aktuelle Stand vom Server; die Kopie dient nur ohne Verbindung.
- Ist die Anmeldung abgelaufen, zeigt Flowplan online die Anmeldeseite – ohne Verbindung öffnet die gespeicherte Kopie trotzdem.
- Die Kopien enthalten private Inhalte. Sie werden beim Abmelden, beim Ausschalten und bei der Anmeldung einer anderen Person entfernt.

#### Die ganze App auf dem Gerät

Zur Kopie gehört die ganze App – nicht nur die Teile, die du online schon geöffnet hast. Auch Editor, Kalender-, Zeitleisten- und Galerieansichten, Dashboards, Diagramme, Whiteboards, Notizbücher, Formeln, Mermaid-Diagramme und der PDF-Viewer laden dann ohne Verbindung.

- **Speicherbedarf:** etwa 18 MB auf dem Gerät (rund 5 MB Download), einmal je Version. Flowplan speichert die App-Dateien nur, wenn das Gerät genug Platz hat.
- **Neue Version:** Nach einem Update lädt Flowplan beim nächsten Abgleich die Dateien der neuen Version; was sich nicht geändert hat, wird übernommen statt neu geladen. Sobald die neue Version vollständig gespeichert ist, entfernt es die alte.
- Unter **Einstellungen → Offline & Geräte** steht dazu eine Zeile wie „Die App ist für die Offline-Nutzung gespeichert (Version 0.7.0) · 18 MB“ – oder wie viele Dateien noch fehlen.
- Fehlt ohne Verbindung doch einmal ein Teil, zeigt Flowplan an seiner Stelle „Nicht offline verfügbar – versuche es wieder, wenn du online bist“ mit **Erneut versuchen**; der Rest der App bleibt bedienbar, und sobald die Verbindung zurück ist, lädt der Teil von selbst. Ein Eintrag, dessen Inhalt nicht in der Kopie liegt, zeigt „Dieser Eintrag ist offline nicht verfügbar.“

#### Die Kopie bleibt aktuell

Solange Flowplan geöffnet ist, gleicht es die Kopie selbst ab: beim Start, wenn die Verbindung zurückkommt, wenn du die App wieder in den Vordergrund holst, und alle 6 Stunden. Dabei lädt es nur, was sich seit dem letzten Abgleich geändert hat – meist zwei kleine Anfragen.

- **Neue Seiten** kommen dazu, **geänderte** Seiten, Einträge und Dokumente werden neu geladen.
- **Gelöschte Seiten** und Seiten, die du nicht mehr lesen darfst (auch ein Journal hinter einer PIN), verschwinden samt ihren Einträgen und Dateien aus der Kopie.
- Läuft ein Abgleich länger, steht unten links kurz **Offline-Kopie wird aktualisiert …**.
- Ist die Anmeldung abgelaufen, gleicht Flowplan nicht ab – die vorhandene Kopie bleibt unverändert.

Unter **Einstellungen → Offline & Geräte** steht der Stand, etwa „Offline-Kopie aktualisiert vor 2 Std. · 312 Seiten · 85 MB“. **Jetzt aktualisieren** lädt alle Seiten neu.

**Auch Eintragsinhalte und Dateien speichern** legt zusätzlich die Dokumente aller Datenbank-Einträge und die Dateien der Seiten ab, auch wenn du sie noch nie geöffnet hast – höchstens 200 MB und nur, solange das Gerät genug Platz hat. Ohne Haken bleiben nur Einträge und Dateien, die du schon einmal geöffnet hast. Ausschalten entfernt die zusätzlich gespeicherten Einträge und Dateien.

Ohne Verbindung zeigt Flowplan unter dem Offline-Hinweis das Datum der Kopie, wenn sie älter als 7 Tage ist („Offline-Kopie vom 12. Okt.“).

> [!NOTE]
> Als App installiert (Chrome, Edge, Android), gleicht Flowplan die Kopie auf Wunsch des Browsers auch im Hintergrund ab, wenn die App geschlossen ist (Periodic Background Sync). Ob und wie oft, entscheidet der Browser – meist nur bei häufig genutzten Apps. Einträge und Dateien, die noch nie geöffnet wurden, lädt erst die geöffnete App.

### Datenbank-Einträge offline

Änderungen an Einträgen ohne Verbindung erscheinen sofort in den Ansichten und werden auf dem Gerät gesammelt. Sobald die Verbindung zurück ist, gehen sie der Reihe nach an den Server. Hat jemand denselben Eintrag inzwischen geändert, führt Flowplan die Änderungen Feld für Feld zusammen; wurde dasselbe Feld auf beiden Seiten geändert oder der Eintrag gelöscht, entscheidest du im Konfliktdialog.

> [!NOTE]
> Das Schema einer Datenbank – Eigenschaften und Ansichten – lässt sich nur mit Verbindung ändern.

### Offline in der App für iPhone und iPad

Die App für iPhone und iPad hält die Offline-Kopie selbst – für jede Instanz, auch eine selbst gehostete. (iOS erlaubt Apps keinen Service Worker für frei gewählte Adressen; in Safari und in der Android-App arbeitet Flowplan offline wie im Browser.)

- **Einschalten** wie überall unter **Einstellungen → Offline & Geräte** – je Profil der App. Dort steht zusätzlich „In der Flowplan-App gespeichert“; Stand, Größe, Version, **Jetzt aktualisieren**, **Auch Eintragsinhalte und Dateien speichern** und **Offline-Kopien entfernen** funktionieren wie im Browser.
- **Ohne Verbindung** – beim Start oder wenn die Instanz nicht erreichbar ist – öffnet die App die gespeicherte Kopie: dieselbe Seite, auf der du warst, mit dem Hinweis „Offline – du siehst den zuletzt gespeicherten Stand“. Seiten, Datenbanken, Einträge, Kalender, Dashboards und der Editor laufen aus der Kopie. Den Bildschirm „Keine Verbindung“ zeigt die App nur noch, wenn es für das Profil keine Kopie gibt.
- **Offline ändern:** Text in Dokumenten und Änderungen an Einträgen werden wie im Browser auf dem Gerät gesammelt und abgeglichen, sobald die Instanz wieder antwortet. Danach wechselt die App von selbst zur aktuellen Seite – erst, wenn du gerade nicht tippst.
- **Aktuell halten:** wie im Browser, solange die App offen ist, und zusätzlich jedes Mal, wenn sie in den Vordergrund kommt; nur Geändertes wird geladen.
- **Speicherort:** im Container der App, verschlüsselt bis zum ersten Entsperren nach einem Neustart und nicht in Backups. Die Kopie gehört zum Profil: **Abmelden** in Flowplan und **Abmelden und Profil entfernen** in den Einstellungen der App löschen sie; ein anderes Profil sieht sie nie.
- **Grenzen:** Dateien über 25 MB, der PDF-Viewer und die Texterkennung (OCR) brauchen in der App eine Verbindung; pro Profil höchstens 2 GB, und die App lässt immer 300 MB frei. Die Kopie braucht einen Flowplan-Server mit dieser Offline-Unterstützung (ab 0.7.0); mit älteren Servern zeigt die App ohne Verbindung ihren Bildschirm „Keine Verbindung“ wie bisher.

## Als App installieren

- **Chrome, Edge**: Installieren-Symbol in der Adressleiste.
- **Safari auf dem Mac**: **Ablage → Zum Dock hinzufügen**.
- **iPhone, iPad**: Teilen → **Zum Home-Bildschirm**. Nur so sind dort Push-Nachrichten möglich.
- **Android**: Menü → **App installieren**.

Die installierte App öffnet in einem eigenen Fenster ohne Browserleisten.

### Teilen an Flowplan

Ist Flowplan auf Android (Chrome) als App installiert, erscheint es im **Teilen**-Menü anderer Apps. Geteilte Texte und Links landen in einer Vorschau; **Als Seite speichern** legt daraus eine Seite im gewählten Bereich an. Ohne Anmeldung geht es erst zur Anmeldung und danach zurück zur Vorschau. iOS bietet Web-Apps dieses Menü nicht an.

Die Vorschau fragt, ob gespeichert wird **als Seite**, **als Eintrag** in einer Datenbank oder – bei Links – **als Lesezeichen**. Als Eintrag kommen Titel, Text und Link (bzw. der Artikeltext) in den Eintrag; der Link landet in der ersten URL-Eigenschaft der Datenbank, sonst im Text, und die Standardvorlage der Datenbank wird übernommen. Gibt es eine Standard-Datenbank zum Erfassen (siehe unten), ist **als Eintrag** mit ihr vorgewählt. **Artikeltext übernehmen** lädt die Webseite auf dem Server und übernimmt ihren Haupttext ohne Navigation, Werbung und Skripte (nur öffentliche Adressen).

### Web-Clipper im Browser

Unter **Einstellungen → Web-Clipper** liegt der Knopf **In Flowplan speichern**. In die Lesezeichenleiste gezogen, öffnet er auf jeder Webseite ein kleines Fenster mit Titel, Adresse und dem markierten Text – dieselbe Vorschau wie beim Teilen. Nach dem Speichern schließt sich das Fenster.

### Erfassen in eine Datenbank

Für einen Eingang („Inbox“), etwa nach PARA: **Schnell erfassen** auf der Startseite, <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>N</kbd>, `> erfassen` in der Schnellsuche oder – bei der installierten App – ein langer Druck auf das App-Symbol → **Erfassen** öffnen ein kleines Fenster mit Titel und Text. Gespeichert wird als Eintrag in der gewählten Datenbank; ohne Verbindung wartet er auf dem Gerät und wird angelegt, sobald die Verbindung zurück ist.

**Als Standard zum Erfassen verwenden** (im Fenster) oder **Einstellungen → Web-Clipper → Erfassen** legt die Datenbank fest, die Teilen, Web-Clipper und Schnell erfassen vorwählen – je Person und Arbeitsbereich. Die Standardvorlage der Datenbank wird übernommen, so landen neue Einträge zum Beispiel direkt in der Ansicht „Eingang“.

### Lesezeichen

Lesezeichen landen in der Datenbank **Lesezeichen** des gewählten Bereichs; sie entsteht beim ersten Mal von selbst, mit Link, Website, Ordner, Notiz, Datum und „Gelesen“ sowie den Ansichten Alle, Karten und Ungelesen. Der mitgenommene Artikeltext steht im Eintrag. **Lesezeichen-Datei wählen** importiert die HTML-Datei, die Chrome, Edge, Firefox und Safari beim Exportieren der Lesezeichen erzeugen – samt Ordnern und Datum; Links, die schon da sind, werden übersprungen.

## Desktop-App für macOS, Windows und Linux

Eine schlanke Desktop-App umschließt deine Flowplan-Instanz. Beim ersten Start fragt sie nach der Adresse und schlägt `https://app.flowplan.org` vor – für die eigene Instanz einfach deren Adresse eintragen (z. B. `https://flowplan.example.com`). Weitere Instanzen legst du als [Profile](#mehrere-instanzen-profile) an.

- Alle Daten bleiben auf dem Server.
- Die App merkt sich Fenstergröße und -position, bietet deutsche Menüs und öffnet externe Links im Standardbrowser. Rechtsklick-Menü mit Rechtschreibvorschlägen, [Schnell erfassen von überall](/desktop-capture), Symbol in Menüleiste oder Infobereich, Seiten in eigenen Fenstern und mehr: siehe [Mehr aus der Desktop-App](#mehr-aus-der-desktop-app).
- Die Offline-Nutzung funktioniert auch in der Desktop-App: **Einstellungen → Offline & Geräte** in der App einschalten – die App hat eigene Offline-Kopien, getrennt von Browser oder installierter Web-App. Ohne Verbindung öffnet sie dann die gespeicherte Kopie; ihre eigene Offline-Seite (**Erneut versuchen**, **Profile**) erscheint nur, wenn auf dem Gerät keine Kopie liegt.
- **Mitteilungen:** Die App zeigt neue Benachrichtigungen aus dem Posteingang als Mitteilungen des Systems und die Zahl der ungelesenen am App-Symbol – auch bei minimiertem oder ausgeblendetem Fenster. Mehr unter [Mitteilungen in der Desktop-App](#mitteilungen-in-der-desktop-app).
- Sie akzeptiert nur echte Flowplan-Instanzen – eine Adresse, hinter der etwas anderes läuft oder die auf eine andere Seite weiterleitet, wird abgelehnt.
- **Handoff (Mac):** Die Seite im Fenster erscheint auf deinem iPad und iPhone (gleicher Apple Account, Handoff an) und öffnet sich dort in der Flowplan-App – ohne App im Browser. Eine Seite, die in der iPad- oder iPhone-App offen ist, erscheint im Dock des Mac und öffnet sich in der Desktop-App, im Profil ihrer Instanz. Siehe [iPad: Fenster, Tastatur und Handoff](#ipad-fenster-tastatur-und-handoff).
- **Mit Passkey anmelden** und **Mit SSO anmelden** öffnen die Anmeldung im Standardbrowser, wo Passkeys (iCloud-Schlüsselbund, Windows Hello, Passwortmanager) zur Verfügung stehen. Nach **In der App anmelden** übernimmt die App die Anmeldung; E-Mail und Passwort gehen direkt in der App. Das braucht Flowplan 0.3.3 oder neuer.

Die Apps für macOS, Windows und Linux gibt es unter [flowplan.org/download](https://flowplan.org/download) – die Seite erkennt dein System. Updates installieren sich von selbst (macOS, Windows-Installer, Linux-AppImage). Die Mac-App ist signiert und notarisiert; wer noch 1.0.5 oder älter hat, lädt einmal die aktuelle Version herunter, danach aktualisiert sie sich selbst. Windows zeigt SmartScreen. Mehr unter [Betrieb und Fehlersuche](/operations#desktop-apps).

> [!NOTE]
> Die Umgebungsvariable `FLOWPLAN_UPDATE_URL` gibt es zweimal: Auf dem Rechner mit der Desktop-App nennt sie eine andere Quelle für App-Updates (siehe [Updates](/operations#updates)); auf dem Server nennt die gleichnamige Variable den Spiegel für den Release-Check der Instanz (siehe [Konfiguration](/configuration#betrieb)). Beide meinen verschiedene Dinge und gehören an verschiedene Orte.

### Mehrere Instanzen (Profile)

Arbeitest du mit mehr als einer Flowplan-Instanz, etwa **Arbeit – flowplan.firma.de** und **Privat – notizen.example**, speichert die Desktop-App jede als eigenes Profil:

- **Hinzufügen:** Menü **Profile → Profil hinzufügen …**, Adresse eintragen und optional einen Namen (ohne Namen zeigt die App die Adresse). Die Adresse wird geprüft wie beim ersten Start.
- **Wechseln:** im Menü **Profile** (macOS: im Menü *Flowplan*, Windows und Linux: im Menü *Datei*), mit **Nächstes Profil** (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>P</kbd> bzw. <kbd>Strg</kbd> <kbd>Umschalt</kbd> <kbd>P</kbd>), auf dem Mac über das Dock-Symbol und unter Windows über die Sprungliste in der Taskleiste.
- **Umbenennen und entfernen:** **Profile → Profile verwalten …** (auch von der Offline-Seite aus). Entfernen fragt nach, meldet das Profil ab und löscht, was es auf diesem Computer gespeichert hat. Deine Daten bleiben auf dem Server.

Jedes Profil hat seine eigene Anmeldung, seine eigene Offline-Kopie und eigene Cookies – auch zwei Profile auf derselben Instanz, etwa für zwei Konten. Im Fenster öffnet sich nur die Instanz des aktiven Profils; Links auf eine andere Instanz gehen in den Browser. Bei mehr als einem Profil steht der Profilname im Fenstertitel.

Wer bisher eine Adresse eingerichtet hatte, findet sie nach dem Update als erstes Profil wieder – angemeldet und mit der bisherigen Offline-Kopie.

### Mitteilungen in der Desktop-App

Browser bekommen Benachrichtigungen per Web-Push – das gibt es in der Desktop-App nicht. Sie fragt deshalb selbst bei deiner Instanz nach, etwa einmal pro Minute, solange sie läuft:

- **Was erscheint:** jede neue ungelesene Benachrichtigung einmal, mit der Zeile aus dem Posteingang als Titel und dem Eintrag darunter (bei mehreren Profilen auch der Profilname). Es gelten deine **Benachrichtigungsarten** unter **Einstellungen → Benachrichtigungen**: Mitteilungen gibt es nur für Arten, bei denen **Push** eingeschaltet ist. Kommen mehr als drei auf einmal, fasst die App sie zu einer Mitteilung zusammen, die den Posteingang öffnet.
- **Klick:** holt das Fenster nach vorn, wechselt bei Bedarf ins richtige Profil und öffnet die Seite.
- **Zahl am Symbol:** die ungelesenen Benachrichtigungen – im Dock (macOS), im Starter (Linux, wenn der Desktop Zahlen anzeigt) und als roter Punkt an der Taskleisten-Schaltfläche (Windows).
- **Einstellungen:** im Menü **Mitteilungen** (macOS: im Menü *Flowplan*, Windows und Linux: im Menü *Datei*): **Mitteilungen anzeigen**, **Nicht stören** für eine Stunde oder bis morgen früh und **Alle Profile** (sonst nur das aktive Profil). In der App zeigt **Einstellungen → Benachrichtigungen** statt Web-Push denselben Schalter.

Für das Fenster im Vordergrund erscheinen keine Mitteilungen – dort siehst du den Posteingang ohnehin. Was beim ersten Start schon da war, zeigt die App nicht noch einmal, auch nicht nach einem Neustart.

Auf dem Mac läuft die App nach dem Schließen des Fensters im Dock weiter und meldet sich weiter. Unter Windows und Linux beendet das Schließen des Fensters die App; Mitteilungen kommen, solange sie läuft (minimiert reicht) – oder mit dem [Symbol im Infobereich](#mehr-aus-der-desktop-app) auch ohne Fenster.

Das braucht einen Flowplan-Server ab 0.7.0 und die Desktop-App 1.0.7 oder neuer. Die App fragt nur die eigene Instanz des Profils, mit dessen Anmeldung; auf dem Server wird dafür nichts hinterlegt.

### Mehr aus der Desktop-App

Seit der Desktop-App 1.1.0 kommt rund um das Fenster einiges dazu. Die Schalter dafür stehen unter **Einstellungen …** (macOS: im Menü *Flowplan*, Windows und Linux: im Menü *Datei*).

- **Rechtsklick und Rechtschreibung:** Ein Rechtsklick in Feldern, auf Links und Bildern zeigt ein Menü des Systems – Vorschläge für ein falsch geschriebenes Wort, **Zum Wörterbuch hinzufügen**, Ausschneiden, Kopieren, Einsetzen, **Als reinen Text einsetzen**, Link im Browser oder in neuem Fenster öffnen, Bild kopieren oder sichern, auf dem Mac **Nachschlagen**. Im Editor bleibt das Textmenü von Flowplan; dort stehen die Vorschläge der App oben in diesem Menü (braucht einen Flowplan-Server ab 0.7.0). Die Sprachen der Prüfung – Deutsch, Englisch, Französisch – wählst du unter **Rechtschreibung** im Rechtsklick-Menü, im Menü *Bearbeiten* oder in den Einstellungen.
- **Schnell erfassen von überall:** <kbd>Strg</kbd> <kbd>Umschalt</kbd> <kbd>Leertaste</kbd> (Mac: <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>Leertaste</kbd>) öffnet über jeder App ein kleines Fenster – in den Eingang, eine Datenbank, den heutigen Journal-Eintrag oder an eine Seite, mit Kürzeln wie `morgen 15 Uhr #kunde @anna !hoch`, Links aus der Zwischenablage, Dateien, Bildschirmausschnitten und Sprachnotizen, **Rückgängig** und **Zuletzt erfasst**, Schnellaktionen mit eigenen Tastenkürzeln und einem optionalen KI-Vorschlag. Ohne Verbindung wartet die Erfassung verschlüsselt in einer Warteschlange und wird später gesendet, ohne doppelt anzukommen. Alles dazu: [Schnell erfassen (Desktop)](/desktop-capture).
- **Symbol in der Menüleiste (Mac) bzw. im Infobereich (Windows, Linux):** **Schnell erfassen**, die heute fälligen und überfälligen Aufgaben aus **Meine Aufgaben**, die ungelesenen Benachrichtigungen, Flowplan öffnen, die Profile und Beenden. Auf dem Mac standardmäßig an, unter Windows und Linux in den Einstellungen einzuschalten; dann läuft die App nach dem Schließen des Fensters im Infobereich weiter.
- **Seiten aus Links öffnen:** Links der Form `flowplan://open?instance=…&page=…` öffnen die Seite in der App, im Profil ihrer Instanz. Im Browser auf dem Computer steht dafür in den **Seitenaktionen** (**…** oben rechts) **In Desktop-App öffnen**. Für eine Instanz ohne Profil fragt die App erst, ob sie sie hinzufügen soll.
- **Seiten in eigenen Fenstern:** **Seite in neuem Fenster öffnen** (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>N</kbd> bzw. <kbd>Strg</kbd> <kbd>Umschalt</kbd> <kbd>N</kbd>), ein Klick mit <kbd>Umschalt</kbd> oder der mittleren Maustaste auf einen Link, oder **In neuem Fenster öffnen** im Menü einer Seite. Die App merkt sich diese Fenster mit Größe und Platz und öffnet sie beim nächsten Start wieder.
- **Dateien hineinziehen:** PDFs, Bilder, Markdown- und Textdateien auf das Dock-Symbol ziehen, mit **Öffnen mit → Flowplan** öffnen oder ins Fenster ziehen, wo Flowplan sie nicht selbst annimmt. Die App fragt, wohin: **In den Eingang** (ein Eintrag je Datei) oder **Als neue Seiten** (Markdown wird eine echte Seite). Bilder und PDFs bis 50 MB, Text bis 5 MB, höchstens 10 Dateien auf einmal.
- **Beim Anmelden öffnen:** in den Einstellungen, auf Wunsch **Ohne Fenster starten**.
- **Drucken und PDF:** **Drucken …** zeigt eine Vorschau und druckt über den Dialog des Systems, **Als PDF sichern …** speichert die Seite als PDF – beides ohne Seitenleiste und Werkzeuge, wie beim Drucken im Browser.
- **Updates ohne Unterbrechung:** Ein neues Update lädt im Hintergrund; ein kleiner Hinweis unten im Fenster zeigt Fortschritt, Größe und Geschwindigkeit, der Fortschritt erscheint auch am App-Symbol. Ist es fertig, bietet der Hinweis (und das Menü) **Neu starten**; sonst wird es beim Beenden installiert. Kein Dialog unterbricht das Tippen.

## Apps für iPhone, iPad und Android

> [!NOTE]
> **Für iPhone und iPad gibt es eine Beta-App über TestFlight:** [testflight.apple.com/join/Yjy9aZAE](https://testflight.apple.com/join/Yjy9aZAE) – erst die App **TestFlight** von Apple aus dem App Store installieren, dann den Link auf dem iPhone oder iPad öffnen. Im App Store sind die Apps noch nicht.
>
> **Die Android-App gibt es direkt von uns, ohne Play Store:** [flowplan.org/download/android.apk](https://flowplan.org/download/android.apk) bzw. auf [flowplan.org/download](https://flowplan.org/download). Siehe [Android-App installieren und aktualisieren](#android-app-installieren-und-aktualisieren).

### Android-App installieren und aktualisieren

1. Auf dem Android-Gerät [flowplan.org/download](https://flowplan.org/download) öffnen und **App herunterladen** tippen.
2. Die heruntergeladene Datei öffnen (Mitteilung des Browsers oder *Downloads*).
3. Beim ersten Mal fragt Android, ob der Browser Apps installieren darf: **Einstellungen** → **Aus dieser Quelle zulassen**, dann zurück und **Installieren**.
4. Warnt Google Play Protect vor einer unbekannten App: **Weitere Details** → **Trotzdem installieren**. Die App ist mit unserem Schlüssel signiert, nur eben nicht über Google Play verteilt.

**Updates:** Einmal am Tag schaut die App nach, ob es eine neue Version gibt, und fragt dann: **Herunterladen** lädt sie im Browser, die Datei öffnen und **Aktualisieren** installiert sie über die alte – Anmeldung, Profile und Einstellungen bleiben. **Später** fragt für diese Version erst nach einer Woche wieder. Neue Funktionen von Flowplan selbst kommen ohnehin über den Server, dafür braucht es kein App-Update.

Die Android-App lässt sich auch weiterhin weglassen: Flowplan lässt sich auf Android wie oben beschrieben als Web-App installieren.

**Voraussetzungen:** iPhone und iPad mit iOS/iPadOS 16.4 oder neuer (das Teilen-Fenster und die einstellbaren Widgets ab iOS 17), Android 8.0 oder neuer.

Wie die Desktop-App zeigen die mobilen Apps deine Flowplan-Instanz; alle Daten bleiben auf dem Server, neue Funktionen kommen ohne App-Update. Dazu kommt, was nur eine App kann:

- **Mitteilungen:** Erwähnungen, Kommentare, Aufgaben und Erinnerungen kommen als Mitteilung, die Zahl der ungelesenen steht am App-Symbol. Die App fragt nach dem ersten Anmelden einmal nach der Erlaubnis; ein Tipp öffnet die betroffene Seite. Welche Arten kommen, regelst du wie im Browser unter **Einstellungen → Benachrichtigungen**; dort prüft **Testbenachrichtigung senden**, ob Mitteilungen auf allen deinen Geräten ankommen, und sagt sonst, woran es liegt ([mehr](/search-and-notifications#testbenachrichtigung)). [Knöpfe](#knoepfe-an-mitteilungen) haken eine Aufgabe ab, schieben sie auf morgen, beantworten einen Kommentar oder markieren ihn als gelesen – ohne die App zu öffnen.
- **[Widgets](#widgets)** für den Home-Bildschirm (auf dem iPhone auch für den Sperrbildschirm), jedes mit eigenen Einstellungen – Aufgaben zum Abhaken, Termine, Zähler, Zeiterfassung und mehr; dazu [Widgets für Administratoren](#widgets-fuer-administratoren).
- **[Live-Aktivitäten](#live-aktivitaeten-und-laufende-mitteilungen):** Zeiterfassung, Fokus, Besprechung, Import/Export und Sprachnotiz auf dem Sperrbildschirm und in der Dynamic Island bzw. als laufende Mitteilung.
- **[Erfassen, Siri, Kontrollzentrum](#erfassen-siri-kontrollzentrum):** Notizen, Aufgaben, Sprachnotizen und Fotos aus Widgets, Siri, Kontrollzentrum, App-Symbol und Android-Kacheln; Siri fragen, was fällig ist, eine Seite öffnen oder suchen.
- **[Fokus-Filter](#fokus-filter)** (iPhone, iPad): ein Profil oder Arbeitsbereich je Fokus, auf Wunsch ohne Mitteilungen der anderen.
- **[Teilen aus anderen Apps](#teilen-aus-anderen-apps):** Texte, Links, Fotos und PDFs aus jeder App direkt in den Eingang, eine Datenbank oder auf eine Seite.
- **[Scanner und Spotlight](#dokumente-scannen-und-spotlight-iphone-und-ipad)** (iPhone, iPad): Dokumente als durchsuchbare PDFs scannen, deine Seiten und Aufgaben in der Suche des Telefons.
- **[Sprachnotizen](#sprachnotizen-in-seiten)** in Seiten nimmt die App auf; auf iPhone und iPad werden sie auf dem Gerät selbst zu Text.
- **[KI auf dem Gerät](#ki-auf-dem-geraet-und-schreibtools-iphone-und-ipad)** (iPhone, iPad, optional): Schreibassistent und Zusammenfassungen mit Apple Intelligence, ohne dass der Text das Gerät verlässt; Apples Schreibtools im Editor.
- **[Kalender in Apple Kalender](#kalender-in-apple-kalender)** mit einem Konfigurationsprofil, statt CalDAV-Zugangsdaten abzutippen.
- **App-Sperre:** Auf Wunsch entsperrt sich Flowplan nur mit Face ID, Touch ID, Fingerabdruck oder dem Gerätecode.
- **Zurück:** Wischen vom linken Rand (iOS) bzw. die Zurück-Geste oder -Taste (Android) schließt zuerst, was gerade offen ist (Menü, Dialog, Seitenleiste), und geht dann eine Ebene nach oben: von einem Abschnitt der Einstellungen zur Übersicht, von einem Eintrag zur Datenbank, von einer Seite zur vorherigen Seite.
- **Exporte und Downloads** gehen in das Teilen-Menü des Systems (z. B. „In Dateien sichern“).
- **Ohne Verbindung:** Die App öffnet die Offline-Kopie des Profils, auch auf iPhone und iPad – siehe [Offline in der App für iPhone und iPad](#offline-in-der-app-fuer-iphone-und-ipad).
- **iPad und Tablets:** alle Ausrichtungen, Split View, Slide Over und Stage Manager, mehrere Fenster, Hardware-Tastatur mit den Tastenkürzeln, die erscheinen, wenn du <kbd>⌘</kbd> hältst, Trackpad und Handoff zum Mac – siehe [iPad: Fenster, Tastatur und Handoff](#ipad-fenster-tastatur-und-handoff). Mit dem **Apple Pencil** schreibst du in [Notizbücher](/notebooks) und Zeichenblöcke, zeichnest auf Whiteboards und schreibst auf PDFs (siehe [PDFs anmerken](/documents#pdfs-anmerken)) mit Druckstärke, während Finger die Fläche bewegen und eine aufliegende Hand keine Spuren hinterlässt; Doppeltippen und Drücken wechseln das Werkzeug, Scribble schreibt in jedes Textfeld (siehe [Whiteboards](/whiteboards#stift-und-formerkennung)). Die App erkennt deine Handschrift auf dem Gerät: Die Suche findet sie, und **In Text umwandeln** macht aus ausgewählten Strichen Text (siehe [Handschrift erkennen](/notebooks#handschrift-erkennen-iphone-und-ipad)).
- **iPhone Duo:** Auf- und Zuklappen während der Arbeit – die Seite bleibt, wie sie ist (kein Neuladen, dieselbe Stelle, der Text, den du gerade tippst) und ordnet sich neu: Telefon-Layout mit der unteren Leiste auf dem zugeklappten Display und auf dem aufgeklappten im Hochformat, die Seitenleiste auf dem aufgeklappten Display im Querformat. Inhalte bleiben frei von Statusleiste und Kamera am Rand des zugeklappten Displays. Auf dem aufgeklappten Display gibt es **mehrere Fenster** wie auf dem iPad (siehe [unten](#ipad-fenster-tastatur-und-handoff)); das zugeklappte hat eines. Den ganzen Bildschirm nutzt auf dem iPhone Duo eine App, die für iOS 27.1 oder neuer gebaut ist.

Außerdem:

- Beim ersten Start fragen sie nach der Adresse und schlagen `https://app.flowplan.org` vor. Sie akzeptieren nur echte Flowplan-Instanzen, die nicht auf eine andere Seite weiterleiten. Weitere Instanzen speicherst du als [Profile](#profile-in-den-mobilen-apps). **Abmelden und Profil entfernen** in den **App-Einstellungen** (über **Einstellungen → Benachrichtigungen → App-Einstellungen öffnen**) meldet die App bei der Instanz des aktiven Profils ab und entfernt sie dort.
- **Verwaltete Geräte (MDM/EMM):** Über die verwaltete App-Konfiguration (iOS Managed App Configuration bzw. Android App Restrictions) gibt der Schlüssel `server` die Adresse der eigenen Instanz vor; die App schlägt sie beim ersten Start vor.
- **Mit Passkey anmelden** und **Mit SSO anmelden** öffnen das Anmeldefenster des Systems (iOS) bzw. einen Browser-Tab (Android); nach **In der App anmelden** übernimmt die App die Anmeldung. E-Mail und Passwort gehen direkt in der App. Die Anmeldung über den Browser sowie Mitteilungen und Widgets (die App-Schnittstelle) brauchen Flowplan 0.4.0 oder neuer.
- Links zu anderen Seiten öffnen im Browser; ohne Verbindung zeigt die App eine eigene Seite und verbindet sich von selbst wieder.
- Flowplan erscheint im **Teilen**-Menü anderer Apps – auf iPhone und iPad als **Flowplan**, auf Android als **In Flowplan speichern**, siehe [Teilen aus anderen Apps](#teilen-aus-anderen-apps).

### Knöpfe an Mitteilungen

Eine Mitteilung lange drücken (oder herunterziehen) zeigt ihre Knöpfe. Sie erledigen ihre Arbeit im Hintergrund; die App öffnet sich nicht.

| Mitteilung | Knöpfe |
| --- | --- |
| **Eine Aufgabe ist fällig** (eine dir gegebene Aufgabe ist heute fällig, eine [Datums-Erinnerung](/databases#datums-erinnerungen) eines Eintrags) | **Erledigt** hakt sie ab; **Morgen** setzt ihr Datum auf morgen – die Uhrzeit bleibt, ein späteres Datum rückt einen Tag weiter |
| **Kommentar, Antwort, Erwähnung in einem Kommentar** | **Antworten** – die Antwort direkt in der Mitteilung tippen; sie landet in deinem Namen im Thread (bzw. als Kommentar an der Seite). **Als gelesen markieren** |
| **Alles andere** | **Als gelesen markieren** |

- Jeder Knopf markiert die Mitteilung auch als gelesen; die Zahl am App-Symbol folgt.
- **Erledigt**, **Morgen** und **Antworten** brauchen ein entsperrtes Telefon; **Als gelesen markieren** geht auf dem Sperrbildschirm.
- **Erledigt** bei einem Eintrag nutzt den „Erledigt“-Zustand der Datenbank (eine Status-Option wie *Erledigt* oder ein Kontrollkästchen *Erledigt*); Datenbanken ohne bieten nur **Als gelesen markieren**. Hat sich die Aufgabe inzwischen geändert, wird nichts abgehakt – eine Mitteilung sagt das, ein Tipp öffnet die Seite.
- Es gelten deine Rechte wie im Browser, und die Änderung erscheint in Aktivität, Versionen und Automationen wie jede andere.
- **Erledigt**, **Morgen** und **Antworten** erscheinen nur, wenn die Mitteilung ihren Text mitbringt – ohne ihn wüsste niemand, auf welche Aufgabe ein Knopf wirkt. Über das [Push-Relay](/configuration#push-relay-und-ende-zu-ende-verschluesselung) ist das der Standard, weil der Text Ende-zu-Ende-verschlüsselt ist (Betreiber können es mit `MOBILE_PUSH_CONTENT=off` abschalten); ältere App-Versionen über Expo bekommen ihn nur mit `MOBILE_PUSH_CONTENT=on`. Sonst gibt es nur **Als gelesen markieren**.

**Erinnerungen ohne Push:** Schickt deine Instanz keine Mitteilungen an die App (von den Betreibern abgeschaltet oder eine Testversion ohne Push), erinnert die App selbst an deine Aufgaben – um 9:00 Uhr am Tag, an dem eine Aufgabe fällig ist, sofern Mitteilungen für Flowplan erlaubt sind. Sie nimmt die Aufgaben, die die App aus ihrer Übersicht kennt (die nächsten acht).

### Widgets

Jedes Widget zeigt **eine Sache** und hat **eigene Einstellungen**. Ein neu hinzugefügtes Widget funktioniert sofort mit sinnvollen Vorgaben; kleine Größen zeigen weniger. Ein Tipp öffnet die Aufgabe bzw. Seite in der App.

- **Einstellungen ändern:** iPhone/iPad (iOS 17 oder neuer): Widget lange drücken → *Widget bearbeiten*. Android: Widget lange drücken → *Einstellungen* (beim Hinzufügen kann man den Schritt überspringen).
- Die Auswahllisten (Datenbanken, Ansichten, Eigenschaften, Kalender, Formulare …) kommen direkt von deiner Flowplan-Instanz.

| Widget | Was es zeigt | Einstellungen |
| --- | --- | --- |
| **Schnellerfassung** | Knöpfe für Notiz, Aufgabe, Sprachnotiz, Foto | Ziel (Standard: dein Erfassungs-Eingang), welche Knöpfe |
| **Aufgaben** | Offene Aufgaben – **direkt im Widget abhaken** | Meine Aufgaben, Einträge einer Datenbank (mit Ansicht) oder To-dos einer Seite; alle offenen, heute fällig oder überfällig; Anzahl |
| **Heute** | Termine und fällige Aufgaben | Kalender, Zeitraum (heute, 3 Tage, Woche), fällige Aufgaben ein/aus |
| **Seite und Favoriten** | Deine Favoriten oder eine Seite / Datenbank-Ansicht | Seite, Ansicht, bis zu zwei Eigenschaften |
| **Datenbank-Zähler** | Eine Zahl (Anzahl, Summe, Durchschnitt) mit Verlauf der letzten 14 Tage | Datenbank, Ansicht, Wert, Gruppe, Verlauf |
| **Tagebuch und Gewohnheiten** | Ob heute geschrieben ist, Serie; Gewohnheiten **zum Abhaken** | Journal, Gewohnheiten-Datenbank |
| **Zeit diese Woche** | Stunden der Woche und von heute; **Timer starten/stoppen** | welcher Timer „Starten“ startet |
| **Erwähnungen** | Wer dich erwähnt oder dir eine Aufgabe gegeben hat; **als gelesen markieren** | Erwähnungen und/oder neue Aufgaben, nur ungelesene |
| **Formular-Eingänge** | Neue Antworten eines Formulars | Formular |
| **Flowplan** | Fällige Aufgaben im Überblick | mit oder ohne Posteingang, laufende Zeiterfassung ein/aus |
| **Flowplan Posteingang** | Zahl der ungelesenen Mitteilungen | – |
| **Flowplan Instanz, Live, Speicher** | Nur für [Administratoren](#widgets-fuer-administratoren): Zustand, eine Live-Zahl, Speicher | was es zeigt bzw. welche Kennzahl |

Gut zu wissen:

- **Verlauf des Zählers:** Flowplan merkt sich den Wert jeden Tag. Tage, bevor das Widget eingerichtet war, werden geschätzt und heller/gestrichelt gezeichnet.
- **Datenschutz:** Widgets zeigen nur, was du auch in Flowplan sehen darfst. Seiten hinter einer Journal-PIN oder mit Ende-zu-Ende-Verschlüsselung zeigen im Widget nur ihren Zustand, nie Inhalte.
- **Abgemeldet?** Endet deine Sitzung (z. B. bei kurzer SSO-Sitzung), zeigen alle Widgets *Flowplan öffnen und anmelden*. Ihre Einstellungen bleiben; nach dem Anmelden füllen sie sich sofort wieder.
- **Profile:** Widgets gehören zum aktiven Profil. Beim Wechsel verschwinden die Inhalte des vorigen Profils; auf Android behält jedes Widget seine Einstellungen pro Profil.
- **Farben auf Android:** Ab Android 12 übernehmen alle Widgets die Systemfarben (Material You, aus dem Hintergrundbild oder dem gewählten Design), hell und dunkel. Rot, Gelb und Grün behalten ihre Bedeutung. Nach einem neuen Hintergrundbild passen sich die Widgets mit der nächsten Aktualisierung an.
- **Heutige Aufgaben abhaken:** Widget **Aufgaben** hinzufügen und in seinen Einstellungen *Heute fällig* wählen.
- **Aktualisierung:** wenn du in Flowplan etwas änderst, wenn die App in den Vordergrund kommt, im Hintergrund etwa alle 30 Minuten (iOS entscheidet selbst, wie oft).
- **Voraussetzung:** Die einstellbaren Widgets, Live-Aktivitäten außer der Zeiterfassung sowie Siri und Kurzbefehle brauchen einen Flowplan-Server ab 0.7.0. *Flowplan*, *Flowplan Posteingang* und die laufende Zeiterfassung gehen ab 0.4.0.

### Widgets für Administratoren

Wer die Instanz administriert (Mitglied der Admin-Gruppe, `OIDC_ADMIN_GROUP`, Standard `flowplan-admins`), bekommt in der App für iPhone, iPad und Android drei weitere Widgets. Jedes zeigt eine Sache groß; welche, wählst du auf dem iPhone in den Einstellungen des Widgets.

| Widget | Größen (iOS) | Einstellung (Standard zuerst) | Tippen öffnet |
| --- | --- | --- | --- |
| **Flowplan Instanz** | klein, mittel, Sperrbildschirm | *Zeigen:* Zustand (*Alles in Ordnung*, Hinweise oder Störungen mit der wichtigsten), letzte Sicherung oder Version mit verfügbarem Update | Administration (bei Hinweisen/Störungen die Überwachung) |
| **Flowplan Live** | klein, mittel, groß, Sperrbildschirm | *Kennzahl:* gerade aktiv, Anfragen/Min., Fehlerrate (1 Std.) oder Anmeldungen heute; ab mittel die übrigen Zahlen klein und die Anfragen der letzten 24 Stunden als Kurve | Administration → Überwachung |
| **Flowplan Speicher** | klein, mittel, Sperrbildschirm (Ring) | *Kennzahl:* Festplatte belegt, Datenbank und Dateien oder vollster Arbeitsbereich (Kontingent) | Administration → Speicher |

- Alle anderen sehen in diesen Widgets *Nur für Administratoren*; ohne Anmeldung steht dort *Flowplan öffnen und anmelden*.
- Die Daten kommen wie bei den anderen Widgets mit dem Geräte-Token der App (`GET /api/mobile/admin-summary`). Die Instanz prüft bei jedem Abruf, ob die Person der Sitzung, an die das Gerät gebunden ist, gerade Administrator ist – wer aus der Admin-Gruppe fällt, sich abmeldet oder das Gerät unter *Angemeldete Geräte* entfernt, bekommt nichts mehr. API-Tokens bekommen diese Daten nie.
- Übertragen werden nur Zahlen und Zustände – keine Namen, E-Mail-Adressen oder Namen von Arbeitsbereichen.
- Ist die Statistik ausgeschaltet (`FLOWPLAN_METRICS=off` oder in der Administration unter *Überwachung → Statistik*), zeigt *Flowplan Live* „Statistik ausgeschaltet“; Zustand und Speicher bleiben.
- Ältere Instanzen ohne diesen Endpunkt zeigen *Nur für Administratoren*.

### Live-Aktivitäten und laufende Mitteilungen

Auf dem iPhone erscheinen laufende Vorgänge auf dem Sperrbildschirm und in der Dynamic Island, auf Android als Mitteilung (auf Android 16 als Live-Update):

| Vorgang | Zeigt | Knopf |
| --- | --- | --- |
| **Zeiterfassung** | laufende Uhr | – |
| **Fokus** | z. B. 25 Minuten Fokus, dann die Pause | *Beenden* |
| **Laufende Besprechung** | Restzeit | *Notizen öffnen* – legt die Besprechungsnotiz im Journal an, falls es sie noch nicht gibt |
| **Import und Export** | Fortschritt | – |
| **Sprachnotiz** | Aufnahme läuft | *Aufnahme beenden* |
| **Störung der Instanz** | nur für Administratoren, nur solange sie besteht | – |

Besprechungen, Import/Export und Störungen lassen sich in den App-Einstellungen unter *Live-Aktivitäten* ausschalten; Zeiterfassung, Fokus und Sprachnotizen erscheinen immer, solange sie laufen.

Startest oder stoppst du Zeiterfassung oder Fokus anderswo – im Browser, auf einem anderen Gerät – oder geht der Fokus in die Pause über, aktualisiert die Instanz die Live-Aktivität auf dem iPhone per Push über das [Push-Relay](/configuration#push-relay-und-ende-zu-ende-verschluesselung), auch wenn die App nicht offen ist. Dieser Push enthält standardmäßig nur Zeiten und die Phase; Titel und Link kennt die Live-Aktivität schon vom Start auf dem Gerät.

### Erfassen, Siri, Kontrollzentrum

Alle Wege führen in das Erfassen der App: Notiz oder Aufgabe tippen, Sprachnotiz aufnehmen (läuft auch bei gesperrtem Bildschirm weiter; wird transkribiert, wenn deine Instanz das kann) oder Foto aufnehmen/auswählen.

| Weg | Was es bietet |
| --- | --- |
| **Widget Schnellerfassung** | Notiz, Aufgabe, Sprachnotiz, Foto – in das im Widget gewählte Ziel |
| **Siri und Kurzbefehle** (Deutsch, Englisch, Französisch) | „Notiz zu Flowplan hinzufügen“ (in deinen Erfassungs-Eingang), „Aufgabe zu Flowplan hinzufügen“, „Was steht heute in Flowplan an“, „Was ist heute in Flowplan fällig“, „Seite in Flowplan öffnen“, „In Flowplan suchen“, „Timer in Flowplan starten“, „Timer in Flowplan stoppen“, „Sprachnotiz in Flowplan aufnehmen“, „Fokus in Flowplan starten“ |
| **Kontrollzentrum und Aktionstaste** (iOS 18) | Neue Notiz, Schnellerfassung, Heutige Aufgaben (zeigt, wie viele fällig sind), Sprachnotiz, Fokus starten, Timer (Schalter) |
| **App-Symbol lange drücken** (iPhone, iPad) | Posteingang, Meine Aufgaben, Suchen, Neue Notiz, Profil wechseln. Das iPhone zeigt davon die ersten vier, abgemeldet *Profil wechseln*. |
| **App-Symbol lange drücken** (Android) | *Neue Notiz* und *Schnell erfassen* (immer da, auch vor dem ersten Anmelden), dann die **zuletzt geöffneten Seiten**, Posteingang, Meine Aufgaben, Suchen, Sprachnotiz und Profil wechseln. Die meisten Launcher zeigen vier davon; jede Verknüpfung lässt sich auf den Home-Bildschirm ziehen. Verknüpfungen zu Seiten eines anderen Profils sind ausgegraut, bis das Profil wieder aktiv ist. |
| **Android-Schnelleinstellungen** | Kacheln „Neue Notiz“ und „Schnell erfassen“ (auch vom Sperrbildschirm). Ab Android 13 fügt **App-Einstellungen → Widgets → „Schnell erfassen“ zu den Schnelleinstellungen hinzufügen** die Kachel mit einem Tipp hinzu; sonst über das Stift-Symbol der Schnelleinstellungen. |

**Schnell erfassen** (Kachel und Verknüpfung auf Android) öffnet ein kompaktes Fenster: Ziel wählen – den **Eingang** (deine Standard-Datenbank zum Erfassen, siehe [Erfassen in eine Datenbank](#erfassen-in-eine-datenbank)) oder eine andere Seite oder Datenbank, mit Suche –, Titel und Text tippen, auf Wunsch Fotos aufnehmen oder auswählen, **Sichern**.

Was Siri erledigt, ohne die App zu öffnen:

- **Aufgabe hinzufügen:** Siri fragt nach der Aufgabe; in der Kurzbefehle-App legst du zusätzlich ein **Fälligkeitsdatum** und die **Liste oder Datenbank** fest (sonst dein Erfassungs-Ziel). In einer Datenbank landet das Datum in ihrer ersten Datums-Eigenschaft.
- **Was ist heute fällig:** Siri sagt, wie viele Aufgaben heute fällig und überfällig sind, nennt die ersten drei und zeigt die Liste.
- **In Flowplan suchen:** durchsucht Seiten, Einträge und Kommentare in allen deinen Arbeitsbereichen und zeigt die besten Treffer; in einem Kurzbefehl lassen sie sich weitergeben (etwa an *Seite öffnen*). Die Aktion *In der App suchen* öffnet stattdessen die Suche von Flowplan mit dem Text.
- **Seite öffnen:** Siri fragt nach der Seite – nenne einen Teil des Titels – und öffnet sie in der App. In Kurzbefehlen wählst du die Seite aus einer Liste.

Siri, Kurzbefehle und Steuerelemente nutzen das **aktive** Profil. Seiten aus Ende-zu-Ende-verschlüsselten Bereichen erscheinen nicht (auch nicht ihre Titel). Aufgaben hinzufügen, Fälliges, Seiten öffnen, Suchen, die neuen Steuerelemente und Fokus-Filter brauchen einen Flowplan-Server ab 0.7.0.

### Fokus-Filter

Auf iPhone und iPad kann ein Fokus (Einstellungen → Fokus → z. B. *Arbeiten* → **Filter hinzufügen** → **Flowplan**) festlegen:

- **Profil oder Arbeitsbereich:** ein Profil („Alle Arbeitsbereiche“) oder einen Arbeitsbereich eines Profils. Beginnt der Fokus, wechselt die App in dieses Profil und öffnet den Arbeitsbereich; endet er, geht sie zurück zum Profil von vorher – außer du hast inzwischen selbst gewechselt.
- **Mitteilungen anderer Arbeitsbereiche ausblenden:** Solange der Fokus läuft, schickt deine Instanz diesem Gerät keine Push-Mitteilungen aus anderen Arbeitsbereichen – oder gar keine, wenn der Fokus zu einem anderen Profil gehört. Im Posteingang kommen sie trotzdem an. Wird der Fokus nie beendet, endet die Regel nach einem Tag von selbst.

Arbeitsbereiche erscheinen in der Liste, sobald die App in diesem Profil angemeldet war; fehlt einer, öffne die App einmal in dem Profil.

### Teilen aus anderen Apps

In jeder App, die etwas teilen kann (Browser, Fotos bzw. Galerie, Dateien, Mail, Scanner …), öffnet **Teilen → Flowplan** (iPhone, iPad) bzw. **Teilen → In Flowplan speichern** (Android) ein kleines Fenster mit Titel, Text, Link und Dateien.

- **Was geht:** Text, Links, Fotos und PDFs – auch mehrere Dateien auf einmal (höchstens 10). Andere Dateitypen werden nicht übernommen.
- **Wohin:** vorgewählt ist der **Eingang**, deine Standard-Datenbank zum Erfassen (im Browser mit **Als Standard zum Erfassen verwenden** festgelegt, siehe [Erfassen in eine Datenbank](#erfassen-in-eine-datenbank)). **Sichern in** (iPhone, iPad) bzw. **Ändern** (Android) zeigt alle Seiten und Datenbanken, in die du schreiben darfst, mit Suche.
- **Was entsteht:** In einer Datenbank (auch dem Eingang) ein **Eintrag** – der Link in der ersten URL-Eigenschaft (falls vorhanden), die Dateien in der ersten Datei-Eigenschaft und im Eintrag selbst. Auf einer Seite eine **Unterseite** mit Text, Link, Fotos und PDFs.

**Auf iPhone und iPad** bleibst du in der App, aus der du teilst. Flowplan merkt sich die letzte Wahl des Ziels je Profil. Das Fenster nutzt die Anmeldung der App: Öffne Flowplan einmal und melde dich an, sonst weist es darauf hin. Fotos im HEIC-Format werden zu JPEG.

**Auf Android** nennt das Fenster unter *Nicht übernommen*, was es nicht übernehmen kann (andere Dateitypen, mehr als 10 Dateien). PDFs bekommen im Eintrag eine Vorschau der ersten Seite. Den Titel kannst du ändern; leer bleibt er die erste Zeile des Texts, die Adresse des Links oder der erste Dateiname. Nach **Sichern** führt **Zurück zur App** in die App, aus der du geteilt hast; **Öffnen** zeigt das Ergebnis in Flowplan. Noch nicht angemeldet? Texte und Links gehen dann wie im Browser zur Vorschau der Instanz und nach dem Anmelden weiter.

Das Teilen-Fenster auf iPhone und iPad sowie Fotos und PDFs auf Android brauchen einen Flowplan-Server ab 0.7.0. Bis 0.6.0 nimmt Android nur Text und Links an, über die Vorschau der Instanz.

### Dokumente scannen und Spotlight (iPhone und iPad)

**Dokumente scannen.** Tippe in einer Seite `/` und wähle **Dokument scannen** (nur in der App für iPhone und iPad). Die Kamera findet die Ränder und richtet jede Seite gerade aus; nimm so viele Seiten auf, wie du möchtest. Flowplan erkennt den Text auf dem Gerät (Deutsch, Englisch, Französisch) und fügt ein PDF am Ende der Seite ein – oder des Eintrags, in dem du gerade bist. Das PDF trägt den Text unsichtbar mit, sodass du ihn in jedem PDF-Programm markieren und durchsuchen kannst, und **die Suche in Flowplan findet den Scan sofort über seinen Text**. Der Link `flowplan://scan` (z. B. in einem Kurzbefehl) öffnet den Scanner mit der Wahl zwischen Eingang, Seite und Datenbank. Nach dem Sichern bleibt das PDF nicht auf dem Telefon.

**Spotlight.** Die App legt die Titel deiner zuletzt geänderten Seiten (bis zu 500, mit Ort und einer Zeile Inhalt) und deine offenen Aufgaben in die Suche des Telefons. Ein Tipp auf einen Treffer öffnet ihn in Flowplan. Nichts aus Ende-zu-Ende-verschlüsselten Bereichen, hinter einer Journal-PIN oder aus Journaltagen landet dort; Abmelden oder ein Profilwechsel leert die Suche. Der Index bleibt auf dem Telefon.

Scanner und Spotlight brauchen einen Flowplan-Server ab 0.7.0.

### Sprachnotizen in Seiten

In der App nimmt **Sprachnotiz** (`/sprachnotiz`) in einem Dokument mit dem Mikrofon des Telefons auf – bis zu 30 Minuten, auch bei gesperrtem Bildschirm. **Einfügen** legt die Aufnahme als Audio in die Seite:

- **Als Text einfügen** (iPhone und iPad): Das Gesprochene wird auf dem Gerät mit der Spracherkennung von Apple zu Text – die Aufnahme verlässt dafür das Telefon nicht. Der Text folgt unter dem Audio als **Transkript** mit Zeitmarken. Die App fragt einmal nach der Erlaubnis für die Spracherkennung. Das geht für die Sprachen, die das Gerät selbst erkennt (nach der Sprache des Geräts; die meisten großen Sprachen, je nach iOS-Version).
- Wo das Gerät es nicht kann (Android, andere Sprachen), macht die Spracherkennung deiner Instanz daraus Text, wenn sie eingerichtet ist ([Sprachnotizen](/documents#sprachnotizen-und-besprechungen)); sonst bleibt das Audio allein.
- **Danach mit KI zusammenfassen** setzt eine Zusammenfassung unter den Text, wenn dir die [KI](/ai#zusammenfassungen) zur Verfügung steht.

Das braucht einen Flowplan-Server ab 0.7.0. Im Browser nimmt `/sprachnotiz` wie bisher auf.

### KI auf dem Gerät und Schreibtools (iPhone und iPad)

**Optional:** Auf einem iPhone oder iPad mit **iOS/iPadOS 26** oder neuer, das Apple Intelligence unterstützt, und mit **eingeschaltetem Apple Intelligence** (Einstellungen → Apple Intelligence & Siri) laufen der Schreibassistent und die Zusammenfassung offener Seiten mit dem Sprachmodell von Apple **auf dem Gerät**. Der Text verlässt das Gerät nicht, auch nicht in verschlüsselten Bereichen; die Instanz braucht dafür keinen KI-Anbieter. Ergebnisse tragen das Kennzeichen **Auf diesem Gerät**. Das braucht einen Flowplan-Server neuer als 0.7.0 (derzeit das Beta-Image).

- **Abschalten:** **Einstellungen → KI → Auf diesem Gerät (Apple) → Aus** – dann fragt Flowplan das Gerät nie. Dort steht auch, ob Apple Intelligence auf diesem Gerät verfügbar, in den Einstellungen ausgeschaltet oder nicht unterstützt ist. Die Administration kann es für die ganze Instanz abschalten.
- **Server-KI bleibt:** Fragen an den Arbeitsbereich, KI in Datenbanken und KI-Aktionen laufen weiter über die Instanz, wenn sie eingerichtet ist; zu lange Texte übernimmt sie ebenfalls.
- **Ältere Geräte und iOS-Versionen** (ab iOS 16.4) nutzen die App wie bisher, nur ohne diesen Weg.
- **Schreibtools:** Apples Schreibtools (Korrekturlesen, Umschreiben, Zusammenfassen) funktionieren direkt im Editor – Text markieren und im Textmenü **Schreibtools** wählen (ab iOS 18 mit Apple Intelligence).

Mehr: [KI auf dem Gerät](/ai#ki-auf-dem-geraet-apple).

### Kalender in Apple Kalender

**Einstellungen → Kalender & Issues → Kalender auf iPhone, iPad und Mac**: Kalenderansichten wählen und **In Apple Kalender einrichten** tippen. Die App öffnet ein Konfigurationsprofil in Safari; den Download bestätigen und es dann unter **Einstellungen → Profil geladen** installieren (auf dem Mac: Systemeinstellungen → Profile). Jede Ansicht wird ein CalDAV-Account in Apple Kalender, in beide Richtungen – siehe [In beide Richtungen synchronisieren](/views#in-beide-richtungen-synchronisieren-caldav). Am Computer zeigt die Seite stattdessen einen QR-Code; ihn mit der Kamera des iPhones scannen. Der Link gilt einmal und zehn Minuten lang.

### iPad: Fenster, Tastatur und Handoff

- **Mehrere Fenster:** Im Menü einer Seite (Rechtsklick oder lange drücken in der Seitenleiste) gibt **In neuem Fenster öffnen** der Seite ein eigenes Fenster – nebeneinander in Split View, in Slide Over oder im Stage Manager. Auf dem iPhone Duo geht das auf dem aufgeklappten Display; auf dem zugeklappten fehlt der Menüpunkt. Links, die einen neuen Tab öffnen würden, tun dasselbe. App-Symbol lange drücken → **Alle Fenster einblenden** listet sie. Das erste Fenster hat die App-Einstellungen, Mitteilungen und Widgets; die anderen zeigen eine Seite und kommen nach einem Neustart mit ihr zurück. Alle Fenster nutzen das aktive Profil und die App-Sperre.
- **Hardware-Tastatur:** Halte <kbd>⌘</kbd>, und das iPad listet die Tastenkürzel von Flowplan – Suche <kbd>⌘</kbd> <kbd>K</kbd>, neue Seite <kbd>⌘</kbd> <kbd>N</kbd>, schnell erfassen <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>N</kbd>, die Übersicht <kbd>⌘</kbd> <kbd>/</kbd> und die anderen mit <kbd>⌘</kbd>, <kbd>⌃</kbd> oder <kbd>⌥</kbd>, auch [deine eigenen](/keyboard-shortcuts#eigene-tastenkuerzel). Ein Kürzel wirkt im Fenster im Vordergrund. Die Kürzel des Editors (Fett, Rückgängig …) wirken wie im Browser.
- **Trackpad und Maus:** Der Zeiger reagiert auf Knöpfe und Links wie in Safari.
- **Handoff:** Die Seite im Vordergrund wird deinem Mac und deinen anderen Geräten angeboten (gleicher Apple Account, Handoff an unter Einstellungen → Allgemein → AirPlay & Kontinuität). Auf dem Mac öffnet sie sich in der [Desktop-App](#desktop-app-fuer-macos-windows-und-linux), ohne sie im Browser. Seiten vom Mac oder einem anderen Gerät öffnen sich in der App im Profil ihrer Instanz; Seiten einer Instanz ohne Profil öffnen sich in Safari. Solange die App-Sperre sperrt, wird nichts angeboten.

### Instanz im eigenen Netz ohne HTTPS

Beim ersten Start (oder unter **Profil hinzufügen**) gibst du die Adresse deiner Instanz ein. Ohne `http://` davor nimmt die App immer HTTPS an. Eine reine `http://`-Adresse nimmt sie nur an, wenn die Instanz **im lokalen Netz** läuft – öffentliche Domains und Adressen brauchen immer HTTPS.

| Funktioniert mit `http://` | iPhone und iPad | Android |
| --- | --- | --- |
| Private IP-Adressen: `192.168.x.x`, `10.x.x.x`, `172.16.x.x`–`172.31.x.x` | ja | ja |
| Tailscale- und CGNAT-Adressen `100.64.x.x`–`100.127.x.x`, Link-local `169.254.x.x` | ja | ja |
| IPv6 im lokalen Netz (`fd…`, `fe80…`), `localhost` | ja | ja |
| Namen ohne Punkt, z. B. `http://nas:3000` | ja | ja |
| `.local`-Namen, z. B. `http://flowplan.local:3000` | ja | ja |
| `.lan`, `.home.arpa`, `.internal`, z. B. `http://flowplan.lan` | **nein** | ja |
| Öffentliche Domains und IPs, auch Tailscale-Namen `*.ts.net` | nein (nur HTTPS) | nein (nur HTTPS) |

Auf iPhone und iPad erlaubt iOS unverschlüsselte Verbindungen nur zu IP-Adressen, Namen ohne Punkt und `.local`-Namen. Für eine Instanz unter `flowplan.lan` gibst du dort die IP-Adresse ein (`http://192.168.1.20:3000`) – oder richtest HTTPS ein. Die App sagt das beim Verbinden, statt eine leere Seite zu zeigen. Beim ersten Verbinden fragt iOS außerdem, ob Flowplan auf Geräte im lokalen Netz zugreifen darf: **Erlauben** tippen.

Sobald eine `http://`-Adresse im Feld steht, warnt die App vor dem Verbinden:

- **Passwörter und alle Inhalte gehen unverschlüsselt durchs Netz.** Das ist nur in einem Netz in Ordnung, dem du vertraust.
- **Ohne HTTPS fehlen** Passkeys, verschlüsselte Bereiche, Sprachnotizen in Seiten und auf Android die Offline-Kopie (auf iPhone und iPad hält die App die Offline-Kopie selbst, sie funktioniert auch so).
- **Mitteilungen** kommen von einer Instanz, die nur im lokalen Netz erreichbar ist, meist nicht an: Das [Push-Relay](/configuration#push-relay-und-ende-zu-ende-verschluesselung) muss die Instanz aus dem Internet erreichen.

Für den echten Betrieb richte HTTPS ein, siehe [Ohne HTTPS](/installation#ohne-https). Mit einem Tailscale-Namen (`*.ts.net`) bekommst du HTTPS auch ohne öffentliche Domain.

### Profile in den mobilen Apps

Auch die Apps für iPhone, iPad und Android merken sich mehrere Instanzen als Profile:

- **Wechseln:** in den **App-Einstellungen** unter **Profile** auf ein Profil tippen, oder langes Drücken auf das App-Symbol → **Profil wechseln** (auf dem iPhone, solange du abgemeldet bist). Dieselbe Liste erscheint auf der Offline-Seite.
- **Hinzufügen:** **App-Einstellungen → Profil hinzufügen**, Adresse und optional einen Namen eintragen. Ist für die Adresse schon ein Profil gespeichert, wechselt die App einfach dorthin – je Instanz gibt es ein Profil.
- **Umbenennen:** in den App-Einstellungen bei einem Profil auf **Umbenennen** tippen.
- **Entfernen:** **Abmelden und Profil entfernen** gilt für das aktive Profil; danach wird das nächste Profil aktiv.

Mitteilungen, Widgets, Live-Aktivitäten, die Zahl am App-Symbol und die laufende Zeiterfassung gehören immer zum **aktiven** Profil. Beim Wechsel meldet die App das Gerät bei der bisherigen Instanz für Mitteilungen ab; die Anmeldung dort bleibt erhalten, sodass du beim Zurückwechseln weiterhin angemeldet bist. Was die App für ein Profil speichert (das Geräte-Token für Widgets, die letzte Übersicht), liegt getrennt im Schlüsselbund bzw. Keystore und geht nie an eine andere Instanz. Eine bisher eingerichtete Adresse wird nach dem Update zum ersten Profil.

### Was die App auf der Instanz hinterlegt

Nach dem Anmelden meldet sich die App bei der Instanz an: Der Eintrag gehört zu dieser Anmeldung; meldest du dich auf dem Gerät neu an, geht er auf die neue Sitzung über. Er verschwindet mit dem Abmelden, dem Entfernen unter *Angemeldete Geräte* oder dem Löschen des Kontos. Mit dem Geräte-Token lesen Widgets, Live-Aktivitäten und Kurzbefehle im Hintergrund nur, was du auch in Flowplan sehen darfst – in kleinen Antworten von höchstens zehn Einträgen je Widget – und führen ihre Knöpfe aus (Aufgabe oder Gewohnheit abhaken, Timer starten/stoppen, als gelesen markieren, Erfasstes sichern) – ebenso die Knöpfe an Mitteilungen, die nur die Mitteilung nennen: worauf sie wirken, weiß die Instanz. Auch das Teilen-Fenster und der Scanner sichern damit, und Spotlight liest damit Seitentitel und offene Aufgaben. Für Mitteilungen hinterlegt die App ein Token des [Push-Relays](/configuration#push-relay-und-ende-zu-ende-verschluesselung) (die Instanz speichert es nur verschlüsselt) und einen öffentlichen Schlüssel; den privaten behält sie im Schlüsselbund bzw. Keystore. Mitteilungen kommen damit Ende-zu-Ende-verschlüsselt: Relay, Apple und Google sehen ihren Inhalt nicht, erst die App entschlüsselt ihn. Ältere App-Versionen bekommen sie über den Push-Dienst von Expo – dort steht wie bei Web-Push nur, dass etwas Neues im Posteingang liegt. Betreiber können Mitteilungen abschalten oder ihren Text auch über Expo mitschicken, siehe [Konfiguration](/configuration#push-benachrichtigungen). Ein [Fokus-Filter](#fokus-filter), der Mitteilungen ausblendet, hinterlegt dort eine Regel für dieses Gerät: welcher Arbeitsbereich ihm noch Mitteilungen schicken darf, höchstens für einen Tag.

## Hell und dunkel

Flowplan folgt von sich aus dem Hell- oder Dunkelmodus deines Geräts – auch wenn er sich ändert, während Flowplan offen ist (etwa abends automatisch). Unter **Einstellungen → Darstellung & Sprache → Erscheinungsbild** wählst du stattdessen fest **Hell** oder **Dunkel**; **Automatisch** folgt wieder dem Gerät. Die Wahl gilt pro Gerät. Anmeldung, öffentliche Seiten und Formulare, die Webseite und diese Dokumentation folgen ebenfalls dem Gerät, die Apps auch mit ihren eigenen Bildschirmen und Widgets.
