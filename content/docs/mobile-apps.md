---
keywords: iPhone, iPad, Android, App, APK, App Store, mobil, Telefon, Handy
---

# Apps für iPhone, iPad und Android

Die Apps für iPhone, iPad und Android: installieren und aktualisieren, mit der eigenen Instanz verbinden, mehrere Instanzen als Profile.

![Flowplan auf zwei Telefonen: links die Roadmap als Board mit den Spalten Backlog und Planned, rechts das Team-Wiki mit einer Aufgabenliste; unten jeweils die Leiste mit Start, Suche, Neue Seite, Posteingang und Navigation](/screenshots/phone-light.webp "Board und Wiki in der App, mit der unteren Leiste des Telefons.")

::: tabs

== iPhone und iPad

**Die App für iPhone und iPad gibt es im App Store:** [Flowplan im App Store](https://apps.apple.com/app/id6825801344) – den Link auf dem iPhone oder iPad öffnen und die App laden oder im App Store nach „Flowplan“ suchen. Neue Versionen kommen wie bei jeder App über den App Store.

== Android

**Die Android-App gibt es direkt von uns, ohne Play Store:** [flowplan.org/download/android.apk](https://flowplan.org/download/android.apk) bzw. auf [flowplan.org/download](https://flowplan.org/download). Siehe [Android-App installieren und aktualisieren](#android-app-installieren-und-aktualisieren).

:::

## Android-App installieren und aktualisieren

::: steps

1. Auf dem Android-Gerät [flowplan.org/download](https://flowplan.org/download) öffnen und **App herunterladen** tippen.
2. Die heruntergeladene Datei öffnen (Mitteilung des Browsers oder *Downloads*).
3. Beim ersten Mal fragt Android, ob der Browser Apps installieren darf: **Einstellungen** → **Aus dieser Quelle zulassen**, dann zurück und **Installieren**.
4. Warnt Google Play Protect vor einer unbekannten App: **Weitere Details** → **Trotzdem installieren**. Die App ist mit unserem Schlüssel signiert, nur eben nicht über Google Play verteilt.

:::

**Updates:** Einmal am Tag schaut die App nach, ob es eine neue Version gibt, und fragt dann. **Aktualisieren** lädt sie in der App (mit Fortschritt, abbrechbar), prüft die Datei und öffnet den Installer von Android – Anmeldung, Profile und Einstellungen bleiben, die Datei wird danach gelöscht und landet nicht in *Downloads*. Beim ersten Mal fragt Android, ob Flowplan Apps installieren darf: **Aus dieser Quelle zulassen**, dann zurück – das Update läuft weiter. **Später** fragt für diese Version erst nach einer Woche wieder. Klappt etwas nicht, zeigt die App den Grund und bietet **Im Browser laden** an. Neue Funktionen von Flowplan selbst kommen ohnehin über den Server, dafür braucht es kein App-Update.

**Obtainium:** Wer Apps lieber mit [Obtainium](https://github.com/ImranR98/Obtainium) aktuell hält, trägt dort die [GitHub-Releases von flowplan-app](https://github.com/yannicschuller/flowplan-app/releases) ein; jedes Release enthält die signierte `Flowplan-<version>-android.apk`.

Die Android-App lässt sich auch weiterhin weglassen: Flowplan lässt sich auf Android wie oben beschrieben als Web-App installieren.

**Voraussetzungen:** iPhone und iPad mit iOS/iPadOS 16.4 oder neuer (das Teilen-Fenster und die einstellbaren Widgets ab iOS 17), Android 8.0 oder neuer.

Wie die Desktop-App zeigen die mobilen Apps deine Flowplan-Instanz; alle Daten bleiben auf dem Server, neue Funktionen kommen ohne App-Update. Dazu kommt, was nur eine App kann:

- **Mitteilungen:** Erwähnungen, Kommentare, Aufgaben und Erinnerungen kommen als Mitteilung, die Zahl der ungelesenen steht am App-Symbol. Die App fragt nach dem ersten Anmelden einmal nach der Erlaubnis; ein Tipp öffnet die betroffene Seite. Welche Arten kommen, regelst du wie im Browser unter **Einstellungen → Benachrichtigungen**; dort prüft **Testbenachrichtigung senden**, ob Mitteilungen auf allen deinen Geräten ankommen, und sagt sonst, woran es liegt ([mehr](/notifications#testbenachrichtigung)). [Knöpfe](/mobile-widgets#knoepfe-an-mitteilungen) haken eine Aufgabe ab, schieben sie auf morgen, beantworten einen Kommentar oder markieren ihn als gelesen – ohne die App zu öffnen.
- **[Widgets](/mobile-widgets#widgets)** für den Home-Bildschirm (auf dem iPhone auch für den Sperrbildschirm), jedes mit eigenen Einstellungen – Aufgaben zum Abhaken, Termine, Zähler, Zeiterfassung und mehr; dazu [Widgets für Administratoren](/mobile-widgets#widgets-fuer-administratoren).
- **[Live-Aktivitäten](/mobile-widgets#live-aktivitaeten-und-laufende-mitteilungen):** Zeiterfassung, Fokus, Besprechung, Import/Export und Sprachnotiz auf dem Sperrbildschirm und in der Dynamic Island bzw. als laufende Mitteilung.
- **[Erfassen, Siri, Kontrollzentrum](/mobile-capture#erfassen-siri-kontrollzentrum):** Notizen, Aufgaben, Sprachnotizen und Fotos aus Widgets, Siri, Kontrollzentrum, App-Symbol und Android-Kacheln; Siri fragen, was fällig ist, eine Seite öffnen oder suchen.
- **[Fokus-Filter](/mobile-widgets#fokus-filter)** (iPhone, iPad): ein Profil oder Arbeitsbereich je Fokus, auf Wunsch ohne Mitteilungen der anderen.
- **[Teilen aus anderen Apps](/mobile-capture#teilen-aus-anderen-apps):** Texte, Links, Fotos und PDFs aus jeder App direkt in den Eingang, eine Datenbank oder auf eine Seite.
- **[Scanner und Spotlight](/mobile-capture#dokumente-scannen-und-spotlight-iphone-und-ipad)** (iPhone, iPad): Dokumente als durchsuchbare PDFs scannen, deine Seiten und Aufgaben in der Suche des Telefons.
- **[Sprachnotizen](/mobile-capture#sprachnotizen-in-seiten)** in Seiten nimmt die App auf; auf iPhone und iPad werden sie auf dem Gerät selbst zu Text.
- **[KI auf dem Gerät](/mobile-capture#ki-auf-dem-geraet-und-schreibtools-iphone-und-ipad)** (iPhone, iPad, optional): Schreibassistent und Zusammenfassungen mit Apple Intelligence, ohne dass der Text das Gerät verlässt; Apples Schreibtools im Editor.
- **[Kalender in Apple Kalender](/mobile-capture#kalender-in-apple-kalender)** mit einem Konfigurationsprofil, statt CalDAV-Zugangsdaten abzutippen.
- **Angemeldet bleiben und App-Sperre:** Die App bleibt angemeldet, solange du sie oder ihre Widgets nutzt (Standard: 90 Tage ohne Nutzung, siehe [Angemeldet bleiben](/sessions)). Auf Wunsch entsperrt sich Flowplan nur mit Face ID, Touch ID, Fingerabdruck oder dem Gerätecode – auf iPhone, iPad und Android, nach mehr als einer Minute im Hintergrund erneut.
- **Wischen vom linken Rand** (iPhone, iPad, Android): öffnet die Seitenleiste über der aktuellen Seite, statt zurückzugehen – zurück geht es mit den Pfeilen oben links. Unter **Einstellungen → Darstellung & Sprache → Wischen vom linken Rand** stellst du pro Gerät **Zurück** ein: Dann geht das Wischen ganz am Rand wie bisher einen Schritt zurück, und die Seitenleiste öffnet ein Wischen etwas weiter innen. Braucht auf iPhone und iPad eine App-Version nach 1.0.12. In der Android-App {since=0.9.7} hält die App bei **Seitenleiste öffnen** einen Streifen am linken Rand (in der Mitte der Höhe) von der Zurück-Geste des Systems frei, damit das Wischen die Seite erreicht; mit **Zurück** bleibt der Rand die Zurück-Geste des Systems. Das braucht eine Android-App nach 1.0.13; älteren Android-Apps bietet Flowplan die Wahl nicht an.
- **Zurück:** Die Zurück-Geste oder -Taste (Android) – und auf iPhone und iPad das Wischen vom linken Rand, wenn du **Zurück** gewählt hast – schließt zuerst, was gerade offen ist (Menü, Dialog, Seitenleiste), und geht dann eine Ebene nach oben: von einem Abschnitt der Einstellungen zur Übersicht, von einem Eintrag zur Datenbank, von einer Seite zur vorherigen Seite.
- **Exporte und Downloads** gehen in das Teilen-Menü des Systems (z. B. „In Dateien sichern“).
- **Ohne Verbindung:** Die App öffnet die Offline-Kopie des Profils, auch auf iPhone und iPad – siehe [Offline in der App für iPhone und iPad](/offline-and-apps#offline-in-der-app-fuer-iphone-und-ipad).
- **iPad und Tablets:** alle Ausrichtungen, Split View, Slide Over und Stage Manager, mehrere Fenster, Hardware-Tastatur mit den Tastenkürzeln, die erscheinen, wenn du <kbd>⌘</kbd> hältst, Trackpad und Handoff zum Mac – siehe [iPad: Fenster, Tastatur und Handoff](/mobile-capture#ipad-fenster-tastatur-und-handoff). Mit dem **Apple Pencil** schreibst du in [Notizbücher](/notebooks) und Zeichenblöcke, zeichnest auf Whiteboards und schreibst auf PDFs (siehe [PDFs anmerken](/media-and-files#pdfs-anmerken)) mit Druckstärke, während Finger die Fläche bewegen und eine aufliegende Hand keine Spuren hinterlässt; Doppeltippen und Drücken wechseln das Werkzeug, Scribble schreibt in jedes Textfeld (siehe [Whiteboards](/whiteboards#stift-und-formerkennung)). Die App erkennt deine Handschrift auf dem Gerät: Die Suche findet sie, und **In Text umwandeln** macht aus ausgewählten Strichen Text (siehe [Handschrift erkennen](/notebooks#handschrift-erkennen-iphone-und-ipad)).
- **iPhone Duo:** Auf- und Zuklappen während der Arbeit – die Seite bleibt, wie sie ist (kein Neuladen, dieselbe Stelle, der Text, den du gerade tippst) und ordnet sich neu: Telefon-Layout mit der unteren Leiste auf dem zugeklappten Display und auf dem aufgeklappten im Hochformat, die Seitenleiste auf dem aufgeklappten Display im Querformat. Inhalte bleiben frei von Statusleiste und Kamera am Rand des zugeklappten Displays. Auf dem aufgeklappten Display gibt es **mehrere Fenster** wie auf dem iPad (siehe [unten](/mobile-capture#ipad-fenster-tastatur-und-handoff)); das zugeklappte hat eines. Den ganzen Bildschirm nutzt auf dem iPhone Duo eine App, die für iOS 27.1 oder neuer gebaut ist.

Außerdem:

- Beim ersten Start fragen sie nach der Adresse und schlagen `https://app.flowplan.org` vor. Sie akzeptieren nur echte Flowplan-Instanzen, die nicht auf eine andere Seite weiterleiten. Weitere Instanzen speicherst du als [Profile](#profile-in-den-mobilen-apps). **Abmelden und Profil entfernen** in den **App-Einstellungen** (über **Einstellungen → Benachrichtigungen → App-Einstellungen öffnen**) meldet die App bei der Instanz des aktiven Profils ab und entfernt sie dort.
- **Verwaltete Geräte (MDM/EMM):** Über die verwaltete App-Konfiguration (iOS Managed App Configuration bzw. Android App Restrictions) gibt der Schlüssel `server` die Adresse der eigenen Instanz vor; die App schlägt sie beim ersten Start vor.
- **Mit Passkey anmelden** und **Mit SSO anmelden** öffnen das Anmeldefenster des Systems (iOS) bzw. einen Browser-Tab (Android); nach **In der App anmelden** übernimmt die App die Anmeldung. E-Mail und Passwort gehen direkt in der App: **Mit E-Mail und Passwort** öffnet das Formular.
- **Passkey hinzufügen** {since=0.10.2}: **Einstellungen → Konto → Passkeys → Passkey hinzufügen** öffnet über einen Einmal-Link (fünf Minuten gültig) das Anmeldefenster des Systems (iOS) bzw. einen Browser-Tab (Android). Dort wird der Passkey gespeichert (iCloud-Schlüsselbund, Google-Passwortmanager oder dein Passwort-Manager), danach geht es zurück in die App. Das braucht eine App-Version nach 1.0.17; ältere Apps bieten **Im Browser hinzufügen** (Safari oder Chrome) an – in der App selbst bieten iOS und Android Passkeys nur für fest eingetragene Adressen an. Anmelden geht danach über **Mit Passkey anmelden**.
- **Passwort-Manager füllt nichts aus?** Dann tippe zuerst auf **Mit E-Mail und Passwort** und unter dem Formular (oder beim Zwei-Faktor-Code) auf **Im Browser anmelden**. Die Anmeldung öffnet sich im selben Fenster wie bei Passkey und SSO; dort erkennt dein Passwort-Manager die Adresse deiner Instanz und füllt Passwort und Code aus. In der App selbst ordnet iOS gespeicherte Passwörter nur Adressen zu, die fest in der App eingetragen sind – bei selbst gehosteten Instanzen geht das nicht. Das braucht Flowplan 0.8.8 oder neuer; die App muss dafür nicht aktualisiert werden.
- Die Anmeldung über den Browser sowie Mitteilungen und Widgets (die App-Schnittstelle) brauchen Flowplan 0.4.0 oder neuer.
- Links zu anderen Seiten öffnen im Browser; ohne Verbindung zeigt die App eine eigene Seite und verbindet sich von selbst wieder.
- Flowplan erscheint im **Teilen**-Menü anderer Apps – auf iPhone und iPad als **Flowplan**, auf Android als **In Flowplan speichern**, siehe [Teilen aus anderen Apps](/mobile-capture#teilen-aus-anderen-apps).

Instanzen im eigenen Netz ohne HTTPS und eigene Zertifikate stehen unter [Apps: eigenes Netz und Zertifikate](/app-network).

## Profile in den mobilen Apps

Auch die Apps für iPhone, iPad und Android merken sich mehrere Instanzen als Profile:

- **Wechseln:** in den **App-Einstellungen** unter **Profile** auf ein Profil tippen, oder langes Drücken auf das App-Symbol → **Profil wechseln** (auf dem iPhone, solange du abgemeldet bist). Dieselbe Liste erscheint auf der Offline-Seite.
- **Schnell wechseln:** Oben in der Seitenleiste öffnet das Menü des Arbeitsbereichs **Instanz wechseln …** {since=0.10.0}, oder du drückst lange auf deinen Namen unten in der Seitenleiste. Die App zeigt dann ihre Profile als Liste von unten (auf dem iPad als Fenster in der Mitte): Name und Adresse, das aktive mit Häkchen. Ein Tipp auf ein anderes Profil wechselt dorthin, darunter stehen **Profil hinzufügen …** und **Profile verwalten** (die App-Einstellungen). Die Instanz erfährt dabei nichts über deine anderen Profile. Dieselbe Liste öffnet die Aktion **Profil wechseln** am App-Symbol und auf dem iPad mit Tastatur **⇧⌘P**. Das braucht eine App-Version nach 1.0.16; ältere Apps öffnen unter **Instanz wechseln …** den Profil-Bildschirm.
- **Vor der Anmeldung:** unten auf der Anmelde- und Registrierungsseite (auch bei „Passwort vergessen“, beim Zwei-Faktor-Code und beim neuen Passwort) steht **Anderer Server? Profil wechseln**. *Abbrechen* (auf Android auch die Zurück-Taste) bringt dich zurück auf die Seite.
- **Falsche Adresse:** Ein Profil, das noch nie angemeldet war, kannst du im Profil-Bildschirm mit **Adresse ändern** korrigieren oder mit **Profil entfernen** löschen. Antwortet unter der Adresse kein Flowplan, zeigt die App ihre eigene Seite mit **Erneut versuchen** und **Profil wechseln**.
- **Hinzufügen:** **App-Einstellungen → Profil hinzufügen**, Adresse und optional einen Namen eintragen. Ist für die Adresse schon ein Profil gespeichert, wechselt die App einfach dorthin – je Instanz gibt es ein Profil.
- **Umbenennen:** in den App-Einstellungen bei einem Profil auf **Umbenennen** tippen.
- **Entfernen:** **Abmelden und Profil entfernen** gilt für das aktive Profil; danach wird das nächste Profil aktiv.

Mitteilungen, Widgets, Live-Aktivitäten, die Zahl am App-Symbol und die laufende Zeiterfassung gehören immer zum **aktiven** Profil. Beim Wechsel meldet die App das Gerät bei der bisherigen Instanz für Mitteilungen ab; die Anmeldung dort bleibt erhalten, sodass du beim Zurückwechseln weiterhin angemeldet bist. Was die App für ein Profil speichert (das Geräte-Token für Widgets, die letzte Übersicht), liegt getrennt im Schlüsselbund bzw. Keystore und geht nie an eine andere Instanz. Eine bisher eingerichtete Adresse wird nach dem Update zum ersten Profil.

## Was die App auf der Instanz hinterlegt

Nach dem Anmelden meldet sich die App bei der Instanz an: Der Eintrag gehört zu dieser Anmeldung; meldest du dich auf dem Gerät neu an, geht er auf die neue Sitzung über. Er verschwindet mit dem Abmelden, dem Entfernen unter *Angemeldete Geräte* oder dem Löschen des Kontos. Mit dem Geräte-Token lesen Widgets, Live-Aktivitäten und Kurzbefehle im Hintergrund nur, was du auch in Flowplan sehen darfst – in kleinen Antworten von höchstens zehn Einträgen je Widget – und führen ihre Knöpfe aus (Aufgabe oder Gewohnheit abhaken, Timer starten/stoppen, als gelesen markieren, Erfasstes sichern) – ebenso die Knöpfe an Mitteilungen, die nur die Mitteilung nennen: worauf sie wirken, weiß die Instanz. Auch das Teilen-Fenster und der Scanner sichern damit, und Spotlight liest damit Seitentitel und offene Aufgaben. Für Mitteilungen hinterlegt die App ein Token des [Push-Relays](/configuration-ai-push#push-relay-und-ende-zu-ende-verschluesselung) (die Instanz speichert es nur verschlüsselt) und einen öffentlichen Schlüssel; den privaten behält sie im Schlüsselbund bzw. Keystore. Mitteilungen kommen damit Ende-zu-Ende-verschlüsselt: Relay, Apple und Google sehen ihren Inhalt nicht, erst die App entschlüsselt ihn. Ältere App-Versionen bekommen sie über den Push-Dienst von Expo – dort steht wie bei Web-Push nur, dass etwas Neues im Posteingang liegt. Betreiber können Mitteilungen abschalten oder ihren Text auch über Expo mitschicken, siehe [Konfiguration](/configuration-ai-push#push-benachrichtigungen). Ein [Fokus-Filter](/mobile-widgets#fokus-filter), der Mitteilungen ausblendet, hinterlegt dort eine Regel für dieses Gerät: welcher Arbeitsbereich ihm noch Mitteilungen schicken darf, höchstens für einen Tag.
