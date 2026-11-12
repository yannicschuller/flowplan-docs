---
keywords: Widget, Startbildschirm, Sperrbildschirm, Mitteilung, Live-Aktivität, Dynamic Island, Fokus
---

# Widgets und Mitteilungen in den Apps

Auf iPhone, iPad und Android: Widgets für den Startbildschirm, Knöpfe an Mitteilungen, Live-Aktivitäten und Fokus-Filter.

## Widgets

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

„Meine Aufgaben“ zeigt neben den Aufgaben aus Dokumenten auch offene Einträge aus Datenbanken, in denen du in einer Personen-Eigenschaft (z. B. „Verantwortlich“) stehst – mit Datenbank und Fälligkeit, direkt abhakbar, wenn du den Eintrag bearbeiten darfst. Nach denselben Regeln erscheinen diese Einträge auch im Widget **Flowplan** (samt der Zahl am App-Symbol und den Erinnerungen ohne Push), mit ihrem Fälligkeitsdatum im Widget **Heute** und damit bei Siri „Was steht heute in Flowplan an“ sowie in Spotlight auf iPhone und iPad. Private Einträge anderer, Datenbanken hinter einer Journal-PIN, Ende-zu-Ende-verschlüsselte Bereiche und für dich ausgeblendete Eigenschaften bleiben überall draußen; einen Eintrag, den eine gewählte Kalender-Ansicht im Widget **Heute** schon zeigt, gibt es dort nur einmal.

Gut zu wissen:

- **Verlauf des Zählers:** Flowplan merkt sich den Wert jeden Tag. Tage, bevor das Widget eingerichtet war, werden geschätzt und heller/gestrichelt gezeichnet.
- **Datenschutz:** Widgets zeigen nur, was du auch in Flowplan sehen darfst. Seiten hinter einer Journal-PIN oder mit Ende-zu-Ende-Verschlüsselung zeigen im Widget nur ihren Zustand, nie Inhalte.
- **Abgemeldet?** Endet deine Sitzung (z. B. bei kurzer SSO-Sitzung), zeigen alle Widgets *Flowplan öffnen und anmelden*. Ihre Einstellungen bleiben; nach dem Anmelden füllen sie sich sofort wieder.
- **Profile:** Widgets gehören zum aktiven Profil. Beim Wechsel verschwinden die Inhalte des vorigen Profils; auf Android behält jedes Widget seine Einstellungen pro Profil.
- **Farben auf Android:** Ab Android 12 übernehmen alle Widgets die Systemfarben (Material You, aus dem Hintergrundbild oder dem gewählten Design), hell und dunkel. Rot, Gelb und Grün behalten ihre Bedeutung. Nach einem neuen Hintergrundbild passen sich die Widgets mit der nächsten Aktualisierung an.
- **Heutige Aufgaben abhaken:** Widget **Aufgaben** hinzufügen und in seinen Einstellungen *Heute fällig* wählen.
- **Aktualisierung:** wenn du in Flowplan etwas änderst, wenn die App in den Vordergrund kommt, im Hintergrund etwa alle 30 Minuten (iOS entscheidet selbst, wie oft).
- **Voraussetzung:** Die einstellbaren Widgets, Live-Aktivitäten außer der Zeiterfassung sowie Siri und Kurzbefehle brauchen einen Flowplan-Server ab 0.7.0. *Flowplan*, *Flowplan Posteingang* und die laufende Zeiterfassung gehen ab 0.4.0.

## Widgets für Administratoren

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

## Knöpfe an Mitteilungen

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
- **Erledigt**, **Morgen** und **Antworten** erscheinen nur, wenn die Mitteilung ihren Text mitbringt – ohne ihn wüsste niemand, auf welche Aufgabe ein Knopf wirkt. Über das [Push-Relay](/configuration-ai-push#push-relay-und-ende-zu-ende-verschluesselung) ist das der Standard, weil der Text Ende-zu-Ende-verschlüsselt ist (Betreiber können es mit `MOBILE_PUSH_CONTENT=off` abschalten); ältere App-Versionen über Expo bekommen ihn nur mit `MOBILE_PUSH_CONTENT=on`. Sonst gibt es nur **Als gelesen markieren**.

**Erinnerungen ohne Push:** Schickt deine Instanz keine Mitteilungen an die App (von den Betreibern abgeschaltet oder eine Testversion ohne Push), erinnert die App selbst an deine Aufgaben – um 9:00 Uhr am Tag, an dem eine Aufgabe fällig ist, sofern Mitteilungen für Flowplan erlaubt sind. Sie nimmt die Aufgaben, die die App aus ihrer Übersicht kennt (die nächsten acht).

## Live-Aktivitäten und laufende Mitteilungen

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

Startest oder stoppst du Zeiterfassung oder Fokus anderswo – im Browser, auf einem anderen Gerät – oder geht der Fokus in die Pause über, aktualisiert die Instanz die Live-Aktivität auf dem iPhone per Push über das [Push-Relay](/configuration-ai-push#push-relay-und-ende-zu-ende-verschluesselung), auch wenn die App nicht offen ist. Dieser Push enthält standardmäßig nur Zeiten und die Phase; Titel und Link kennt die Live-Aktivität schon vom Start auf dem Gerät.

## Fokus-Filter

Auf iPhone und iPad kann ein Fokus (Einstellungen → Fokus → z. B. *Arbeiten* → **Filter hinzufügen** → **Flowplan**) festlegen:

- **Profil oder Arbeitsbereich:** ein Profil („Alle Arbeitsbereiche“) oder einen Arbeitsbereich eines Profils. Beginnt der Fokus, wechselt die App in dieses Profil und öffnet den Arbeitsbereich; endet er, geht sie zurück zum Profil von vorher – außer du hast inzwischen selbst gewechselt.
- **Mitteilungen anderer Arbeitsbereiche ausblenden:** Solange der Fokus läuft, schickt deine Instanz diesem Gerät keine Push-Mitteilungen aus anderen Arbeitsbereichen – oder gar keine, wenn der Fokus zu einem anderen Profil gehört. Im Posteingang kommen sie trotzdem an. Wird der Fokus nie beendet, endet die Regel nach einem Tag von selbst.

Arbeitsbereiche erscheinen in der Liste, sobald die App in diesem Profil angemeldet war; fehlt einer, öffne die App einmal in dem Profil.
