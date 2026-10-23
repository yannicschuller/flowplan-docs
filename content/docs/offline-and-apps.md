# Offline, Web-App und Desktop

Flowplan läuft im Browser, lässt sich als App installieren und funktioniert auch ohne Verbindung weiter.

## Ohne Verbindung arbeiten

Dokumente speichert Flowplan immer zuerst lokal im Browser (IndexedDB) und gleicht sie mit dem Server ab, sobald er erreichbar ist. Bricht die Verbindung ab, schreibst du einfach weiter; Änderungen anderer werden beim Wiederverbinden zusammengeführt.

### Offline-Nutzung einschalten

Unter **Einstellungen → Offline & Geräte** speichert das Gerät zusätzlich die App, den Arbeitsbereich, alle lesbaren Seiten und später geöffnete Einträge und Dateien. Dann lassen sich auch ohne Verbindung Seiten öffnen, Dokumente und Datenbanken lesen und Text bearbeiten.

- Online kommt immer der aktuelle Stand vom Server; die Kopie dient nur ohne Verbindung.
- Ist die Anmeldung abgelaufen, zeigt Flowplan online die Anmeldeseite – ohne Verbindung öffnet die gespeicherte Kopie trotzdem.
- Die Kopien enthalten private Inhalte. Sie werden beim Abmelden, beim Ausschalten und bei der Anmeldung einer anderen Person entfernt.

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
- Die App merkt sich Fenstergröße und -position, bietet deutsche Menüs und öffnet externe Links im Standardbrowser.
- Die Offline-Nutzung funktioniert auch in der Desktop-App: **Einstellungen → Offline & Geräte** in der App einschalten – die App hat eigene Offline-Kopien, getrennt von Browser oder installierter Web-App. Ohne Verbindung öffnet sie dann die gespeicherte Kopie; ihre eigene Offline-Seite (**Erneut versuchen**, **Profile**) erscheint nur, wenn auf dem Gerät keine Kopie liegt.
- **Mitteilungen:** Die App zeigt neue Benachrichtigungen aus dem Posteingang als Mitteilungen des Systems und die Zahl der ungelesenen am App-Symbol – auch bei minimiertem oder ausgeblendetem Fenster. Mehr unter [Mitteilungen in der Desktop-App](#mitteilungen-in-der-desktop-app).
- Sie akzeptiert nur echte Flowplan-Instanzen – eine Adresse, hinter der etwas anderes läuft oder die auf eine andere Seite weiterleitet, wird abgelehnt.
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

Auf dem Mac läuft die App nach dem Schließen des Fensters im Dock weiter und meldet sich weiter. Unter Windows und Linux beendet das Schließen des Fensters die App; Mitteilungen kommen, solange sie läuft (minimiert reicht).

Das braucht einen Flowplan-Server neuer als 0.6.0 (derzeit das Beta-Image) und die Desktop-App 1.0.7 oder neuer. Die App fragt nur die eigene Instanz des Profils, mit dessen Anmeldung; auf dem Server wird dafür nichts hinterlegt.

## Apps für iPhone, iPad und Android

> [!NOTE]
> Stand heute sind die Apps in Vorbereitung und noch nicht im App Store und bei Google Play erhältlich. Bis dahin lässt sich Flowplan wie oben beschrieben als Web-App installieren.

Wie die Desktop-App zeigen die mobilen Apps deine Flowplan-Instanz; alle Daten bleiben auf dem Server, neue Funktionen kommen ohne App-Update. Dazu kommt, was nur eine App kann:

- **Mitteilungen:** Erwähnungen, Kommentare, Aufgaben und Erinnerungen kommen als Mitteilung, die Zahl der ungelesenen steht am App-Symbol. Die App fragt nach dem ersten Anmelden einmal nach der Erlaubnis; ein Tipp öffnet die betroffene Seite. Welche Arten kommen, regelst du wie im Browser unter **Einstellungen → Benachrichtigungen**.
- **[Widgets](#widgets)** für den Home-Bildschirm (auf dem iPhone auch für den Sperrbildschirm), jedes mit eigenen Einstellungen – Aufgaben zum Abhaken, Termine, Zähler, Zeiterfassung und mehr; dazu [Widgets für Administratoren](#widgets-fuer-administratoren).
- **[Live-Aktivitäten](#live-aktivitaeten-und-laufende-mitteilungen):** Zeiterfassung, Fokus, Besprechung, Import/Export und Sprachnotiz auf dem Sperrbildschirm und in der Dynamic Island bzw. als laufende Mitteilung.
- **[Erfassen, Siri, Kontrollzentrum](#erfassen-siri-kontrollzentrum):** Notizen, Aufgaben, Sprachnotizen und Fotos aus Widgets, Siri, Kontrollzentrum, App-Symbol und Android-Kachel.
- **App-Sperre:** Auf Wunsch entsperrt sich Flowplan nur mit Face ID, Touch ID, Fingerabdruck oder dem Gerätecode.
- **Zurück:** Wischen vom linken Rand (iOS) bzw. die Zurück-Geste oder -Taste (Android) schließt zuerst, was gerade offen ist (Menü, Dialog, Seitenleiste), und geht dann eine Ebene nach oben: von einem Abschnitt der Einstellungen zur Übersicht, von einem Eintrag zur Datenbank, von einer Seite zur vorherigen Seite.
- **Exporte und Downloads** gehen in das Teilen-Menü des Systems (z. B. „In Dateien sichern“).
- **iPad und Tablets:** alle Ausrichtungen, Split View, Slide Over und Stage Manager, Tastatur und Trackpad. Mit dem **Apple Pencil** zeichnest du auf Whiteboards mit Druckstärke, während Finger die Fläche bewegen; Doppeltippen und Drücken wechseln das Werkzeug, Scribble schreibt in jedes Textfeld (siehe [Whiteboards](/whiteboards#stift-und-formerkennung)).

Außerdem:

- Beim ersten Start fragen sie nach der Adresse und schlagen `https://app.flowplan.org` vor. Sie akzeptieren nur echte Flowplan-Instanzen, die nicht auf eine andere Seite weiterleiten. Weitere Instanzen speicherst du als [Profile](#profile-in-den-mobilen-apps). **Abmelden und Profil entfernen** in den **App-Einstellungen** (über **Einstellungen → Benachrichtigungen → App-Einstellungen öffnen**) meldet die App bei der Instanz des aktiven Profils ab und entfernt sie dort.
- **Verwaltete Geräte (MDM/EMM):** Über die verwaltete App-Konfiguration (iOS Managed App Configuration bzw. Android App Restrictions) gibt der Schlüssel `server` die Adresse der eigenen Instanz vor; die App schlägt sie beim ersten Start vor.
- **Mit Passkey anmelden** und **Mit SSO anmelden** öffnen das Anmeldefenster des Systems (iOS) bzw. einen Browser-Tab (Android); nach **In der App anmelden** übernimmt die App die Anmeldung. E-Mail und Passwort gehen direkt in der App. Die Anmeldung über den Browser sowie Mitteilungen und Widgets (die App-Schnittstelle) brauchen Flowplan 0.4.0 oder neuer.
- Links zu anderen Seiten öffnen im Browser; ohne Verbindung zeigt die App eine eigene Seite und verbindet sich von selbst wieder.
- Auf Android erscheint Flowplan im **Teilen**-Menü anderer Apps.

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
- **Aktualisierung:** wenn du in Flowplan etwas änderst, wenn die App in den Vordergrund kommt, im Hintergrund etwa alle 30 Minuten (iOS entscheidet selbst, wie oft).
- **Voraussetzung:** Die einstellbaren Widgets, Live-Aktivitäten außer der Zeiterfassung sowie Siri und Kurzbefehle brauchen einen Flowplan-Server neuer als 0.6.0 (derzeit das Beta-Image). *Flowplan*, *Flowplan Posteingang* und die laufende Zeiterfassung gehen ab 0.4.0.

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

### Erfassen, Siri, Kontrollzentrum

Alle Wege führen in das Erfassen der App: Notiz oder Aufgabe tippen, Sprachnotiz aufnehmen (läuft auch bei gesperrtem Bildschirm weiter; wird transkribiert, wenn deine Instanz das kann) oder Foto aufnehmen/auswählen.

| Weg | Was es bietet |
| --- | --- |
| **Widget Schnellerfassung** | Notiz, Aufgabe, Sprachnotiz, Foto – in das im Widget gewählte Ziel |
| **Siri und Kurzbefehle** (Deutsch, Englisch, Französisch) | „Notiz zu Flowplan hinzufügen“, „Was steht heute in Flowplan an“, „Timer in Flowplan starten“, „Timer in Flowplan stoppen“, „Sprachnotiz in Flowplan aufnehmen“, „Fokus in Flowplan starten“ |
| **Kontrollzentrum und Aktionstaste** (iOS 18) | Neue Notiz, Sprachnotiz, Fokus starten, Timer (Schalter) |
| **App-Symbol lange drücken** | Posteingang, Meine Aufgaben, Suchen, Neue Notiz, Profil wechseln; auf Android zusätzlich Sprachnotiz. Das iPhone zeigt davon die ersten vier, abgemeldet *Profil wechseln*. |
| **Android-Schnelleinstellungen** | Kachel „Neue Notiz“ |

### Profile in den mobilen Apps

Auch die Apps für iPhone, iPad und Android merken sich mehrere Instanzen als Profile:

- **Wechseln:** in den **App-Einstellungen** unter **Profile** auf ein Profil tippen, oder langes Drücken auf das App-Symbol → **Profil wechseln** (auf dem iPhone, solange du abgemeldet bist). Dieselbe Liste erscheint auf der Offline-Seite.
- **Hinzufügen:** **App-Einstellungen → Profil hinzufügen**, Adresse und optional einen Namen eintragen. Ist für die Adresse schon ein Profil gespeichert, wechselt die App einfach dorthin – je Instanz gibt es ein Profil.
- **Umbenennen:** in den App-Einstellungen bei einem Profil auf **Umbenennen** tippen.
- **Entfernen:** **Abmelden und Profil entfernen** gilt für das aktive Profil; danach wird das nächste Profil aktiv.

Mitteilungen, Widgets, Live-Aktivitäten, die Zahl am App-Symbol und die laufende Zeiterfassung gehören immer zum **aktiven** Profil. Beim Wechsel meldet die App das Gerät bei der bisherigen Instanz für Mitteilungen ab; die Anmeldung dort bleibt erhalten, sodass du beim Zurückwechseln weiterhin angemeldet bist. Was die App für ein Profil speichert (das Geräte-Token für Widgets, die letzte Übersicht), liegt getrennt im Schlüsselbund bzw. Keystore und geht nie an eine andere Instanz. Eine bisher eingerichtete Adresse wird nach dem Update zum ersten Profil.

### Was die App auf der Instanz hinterlegt

Nach dem Anmelden meldet sich die App bei der Instanz an: Der Eintrag gehört zu dieser Anmeldung; meldest du dich auf dem Gerät neu an, geht er auf die neue Sitzung über. Er verschwindet mit dem Abmelden, dem Entfernen unter *Angemeldete Geräte* oder dem Löschen des Kontos. Mit dem Geräte-Token lesen Widgets, Live-Aktivitäten und Kurzbefehle im Hintergrund nur, was du auch in Flowplan sehen darfst – in kleinen Antworten von höchstens zehn Einträgen je Widget – und führen ihre Knöpfe aus (Aufgabe oder Gewohnheit abhaken, Timer starten/stoppen, als gelesen markieren, Erfasstes sichern). Mitteilungen laufen über den Push-Dienst von Expo, der sie an Apple bzw. Google weitergibt – wie bei Web-Push steht darin nur, dass etwas Neues im Posteingang liegt. Betreiber können das abschalten oder den Text mitschicken, siehe [Konfiguration](/configuration#push-benachrichtigungen).

## Hell und dunkel

Flowplan folgt von sich aus dem Hell- oder Dunkelmodus deines Geräts – auch wenn er sich ändert, während Flowplan offen ist (etwa abends automatisch). Unter **Einstellungen → Darstellung & Sprache → Erscheinungsbild** wählst du stattdessen fest **Hell** oder **Dunkel**; **Automatisch** folgt wieder dem Gerät. Die Wahl gilt pro Gerät. Anmeldung, öffentliche Seiten und Formulare, die Webseite und diese Dokumentation folgen ebenfalls dem Gerät, die Apps auch mit ihren eigenen Bildschirmen und Widgets.
