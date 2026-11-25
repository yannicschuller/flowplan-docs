---
keywords: Administration, Admin, Instanz, Einstellungen, Instanz auf einen Blick, Live, Demo, Wartung
---

# Die Instanz verwalten

Wer die Instanz verwaltet, findet ihre Einstellungen unter **Einstellungen → Instanz**: das erste Konto der Instanz und alle, denen es das Admin-Recht gibt – bei Single Sign-on zusätzlich die Mitglieder der Gruppe aus `OIDC_ADMIN_GROUP`.

**Mehr zum Thema:** [Benutzer verwalten](/user-management) · [Grenzen für Konten](/account-limits) · [Einstellungen](/settings#einstellungen-uebersicht-und-suche)

## Übersicht {since=0.11.6}

Eine eigene Administration gibt es nicht mehr: Die Instanz ist ein Teil der [Einstellungen](/settings#einstellungen-uebersicht-und-suche). Admins sehen in deren Seitenleiste unter den persönlichen Gruppen die Überschrift **Instanz – nur für Admins** und darunter die Abschnitte der Instanz. Die alten Einstiege – das Symbol unten in der Seitenleiste, **Administration** hinter **Mehr** und der Eintrag in der Befehlspalette – sind weggefallen; die Befehlspalette (++⌘/Strg K++) bietet jetzt **Einstellungen: Instanz**.

Die Abschnitte sind gruppiert in **Personen** (Benutzer, Anmeldung & SSO, Arbeitsbereiche), **Daten** (Speicher & Sicherung, Grenzen & Aufbewahrung, Markdown- & Git-Export), **Dienste** (E-Mail, Push-Benachrichtigungen, Chat-Apps, KI, Erweiterungen & Domains), **Sicherheit** (Angriffe & Vorfälle, Verschlüsselung, Aktivitätsprotokoll – siehe [Sicherheit](/security-monitoring#sicherheit)) und **Betrieb** (Überwachung, Wartung & Hinweise, Instanz). Ein Punkt in der Seitenleiste markiert Abschnitte mit Warnungen. Jeder Abschnitt beginnt oben mit einer **Zustandszeile** – etwa „Geplante Sicherung aus“ mit dem Link zum Schalter oder „S3 aus“ mit dem Link zur Anleitung. Jede Einstellung hat genau einen Ort. Schalter und Auswahlfelder speichern sofort, daneben steht „Speichert …“ bzw. „Gespeichert“; einzelne Textfelder zeigen **Speichern**, sobald du sie geändert hast.

Jeder Abschnitt hat eine eigene Adresse, z. B. `/#settings/instance/storage` oder `/#settings/instance/monitoring`, auch mit einer Stelle darin wie `/#settings/instance/threats/incident/<id>` für einen Sicherheitsvorfall. `/#settings/instance` öffnet die Startseite der Einstellungen bei **Instanz auf einen Blick**. Alte Adressen mit `#admin` führen weiter an die neue Stelle, Lesezeichen und Links in E-Mails funktionieren also weiter.

### Instanz auf einen Blick {since=0.11.6}

Auf der Startseite der Einstellungen folgt für Admins unter **Für dich** der Teil **Instanz auf einen Blick**. Jede Kachel ist ein Link in ihren Abschnitt:

- **Konten & Sitzungen**, mit dem Verlauf der aktiven Personen der letzten 24 Stunden.
- **Speicher & Sicherung**: belegter Speicher, die letzte Sicherung und ein Balken, der Datenbank und Dateien zeigt.
- **Überwachung**: Fehler und Warnungen.
- **Fehlgeschlagene Anmeldungen** der letzten 24 Stunden.
- **Funktionen**: wie viele [Funktionen dieser Instanz](/instance-features) eingeschaltet sind („9 von 11 an“).
- **Version**: die laufende Version, ob ein Update bereitsteht, und wie lange der Server schon läuft.

Fehler sind rot markiert, Hinweise gelb.

Darunter steht der **Live-Streifen**: Störungen und Hinweise der Abschnitte (mit Link zum betroffenen Abschnitt), die Live-Zahlen – gerade aktive Personen, heute aktive Personen (verschiedene Personen seit Mitternacht), Anfragen pro Minute, Fehlerquote der letzten Stunde, Anmeldungen heute und die Antwortzeit (p95: so lange brauchten die langsamsten 5 % der Anfragen der letzten Stunde) – und die Anfragen der letzten 24 Stunden als Diagramm. Er aktualisiert sich alle 15 Sekunden, solange die Seite sichtbar ist („Live“). Auf dem Telefon stehen die Kacheln zu zweit nebeneinander, darunter der Live-Streifen ([Einstellungen auf dem Telefon](/settings#auf-dem-telefon)).

### Instanz einrichten {since=0.9.7}

Admins sehen in der [Einführung](/settings#die-einfuehrung) zuerst den Schritt **Instanz einrichten**: eine Ampel für die Grundlagen, in der Reihenfolge, in der man eine neue Instanz einrichtet – **Adresse und HTTPS (APP_URL)**, **E-Mail-Versand**, **Sicherung**, **Anmeldung (SSO)** und **KI-Anbieter**. Rot heißt: zuerst angehen (etwa keine geplante Sicherung, kein E-Mail-Versand oder Flowplan über unverschlüsseltes http); Gelb ist optional oder einen Blick wert (kein `APP_URL` gesetzt, die erste Sicherung steht noch aus, nur Konten mit E-Mail und Passwort, keine KI); Grün ist eingerichtet. Jede Zeile führt mit **Einrichten** (bei Grün **Ansehen**) in den passenden Abschnitt unter **Einstellungen → Instanz**. {since=0.11.6} Später öffnet die Befehlspalette (++⌘/Strg K++) die Übersicht mit „Instanz einrichten“ wieder.

## Arbeitsbereiche

Alle Arbeitsbereiche mit Mitgliedern, Seiten, Belegung (Balken bei einem Kontingent) und **Eigenes Kontingent** – gespeichert, sobald du das Feld verlässt. Leer = Standard, 0 = unbegrenzt. Den Standard stellst du unter [Grenzen & Aufbewahrung](#grenzen-aufbewahrung) ein.

## Speicher & Sicherung

Der eine Ort für Sicherungen:

- **Sicherungen**: **S3-Spiegel** und **Litestream** mit ihrem Zustand, die geplante **Tägliche Datenbanksicherung** – eine konsistente Kopie der Datenbank pro Tag, mit S3 in den Bucket unter `backups/`, sonst in den Datenordner –, **Stündlich statt täglich** (gedacht für verschlüsselte Sicherungen anstelle von Litestream, siehe [Verschlüsselung](/storage-encryption#verschluesselung); dann mehr Kopien aufbewahren, etwa 72 für drei Tage), **Aufbewahrte Sicherungen**, die letzte Sicherung und **Jetzt sichern**. Der Markdown-Export läuft weiterhin einmal am Tag.
- **Belegung**: was lokal und was im Bucket liegt, nach Art, und die Aufteilung der Datenbank. Darüber zeigt ein Balken live, wie viel auf Datenbank und Dateien entfällt, daneben die fünf Konten mit den meisten Dateien. {since=0.11.6}
- **Gesamte Instanz → Herunterladen** erzeugt im laufenden Betrieb eine geprüfte Kopie von Datenbank und Dateien. Mit `FLOWPLAN_ENCRYPTION_KEY` ist die Datei verschlüsselt (`.zip.enc`).
- **Inhalte**: wie viele Arbeitsbereiche, Seiten, Datenbanken, Einträge, Dateien, Konten und Kommentare es gibt.
- **Instanz umziehen**: auf der alten Instanz **Umzug vorbereiten** (ein Umzugstoken, einmal sichtbar, 24 Stunden gültig, widerrufbar; Bestätigung mit Passwort bzw. frischer Anmeldung), danach Schreibschutz, „umgezogen nach …“ und **Weboberfläche weiterleiten**. Auf der neuen Instanz, ebenfalls in Rot, **Von anderer Instanz übernehmen**: erste Kopie mit Fortschritt, **Vorabprüfung** der Einstellungen (nur Namen und Prüfwerte), **Quelle schreibschützen und letzten Stand holen** und **Übernehmen** beim nächsten Neustart (vorheriger Stand als `pre-move-…`). Anleitung: [Instanz umziehen](/move-instance).
- Ganz unten, in Rot: **Aus Sicherung wiederherstellen**. Eine hochgeladene Sicherung wird geprüft und beim nächsten Neustart übernommen; der vorherige Stand bleibt als `pre-restore-…` im Datenverzeichnis. Eine verschlüsselte Sicherung wird mit dem aktuellen oder einem früheren Schlüssel entschlüsselt. Mit [PostgreSQL](/postgresql#wiederherstellen) nimmt die Stelle auch eine geplante Sicherung (`flowplan-….dump`) an – dann wird nur die Datenbank ersetzt, die Dateien bleiben.

Details: [Speicher und Sicherungen](/storage-and-backups).

## Grenzen & Aufbewahrung

| Einstellung | Wirkung |
| --- | --- |
| Speicher je Arbeitsbereich | Für Arbeitsbereiche ohne eigenes Kontingent. |
| Speicher je Person | Für Personen ohne eigene Grenze; alles, was sie hochladen oder kopieren. |
| Eigene Arbeitsbereiche je Person | Wie viele Arbeitsbereiche eine Person besitzen darf. |
| Größte Datei beim Hochladen | Grenze je Datei in MB, höchstens 10 GB ([große Dateien](/coolify-and-proxy#grosse-dateien-hochladen)) {since=0.11.3}. Gilt auch für den [Import einer AFFiNE-Arbeitsbereichsdatei](/migrate-affine) (100–1024 MB; `FLOWPLAN_IMPORT_MAX_MB` hat Vorrang). |
| Versionen aufbewahren | Tage, nach denen automatische Versionen gelöscht werden. |
| Papierkorb leeren nach | Tage, nach denen gelöschte Seiten, Bereiche, Datenbankeinträge und Vorlagen samt Dateien endgültig gelöscht werden (1–3650, Standard 30, 0 = nie automatisch). Siehe [Papierkorb](/pages-and-spaces#papierkorb). |

Leere Felder fallen auf die [Umgebungsvariablen](/configuration) zurück. Jede Person sieht ihre Grenzen und den belegten Speicher unter [Einstellungen → Speicher & KI](/account-limits#speicher-ki-in-den-einstellungen).

### Workflows

Unter **Grenzen & Aufbewahrung → Workflows** stehen die Grenzen für [Workflows](/workflows): Läufe je Minute (je Workflow und Arbeitsbereich), Schritte je Lauf, Kaskadentiefe, Elemente je „Für jedes“, KI-Tokens und E-Mails je Workflow und Tag, Aufbewahrung der Läufe, längstes Warten, aktive Workflows je Arbeitsbereich, HTTP-Knoten (an/aus, nur bestimmte Hosts, interne Adressen) und E-Mails an Adressen außerhalb der Mitglieder. **… auch an Adressen aus Platzhaltern** {since=0.10.0} erlaubt solche E-Mails auch an Adressen aus Formularantworten, eingehenden E-Mails oder KI-Antworten – standardmäßig aus, weil sonst jeder, der diese Daten schickt, die E-Mails der Instanz an eine Adresse seiner Wahl lenken könnte. Beim Update auf 0.10.0 bleibt der Schalter eingeschaltet, wenn aktive oder pausierte Workflows solche E-Mails schon schicken; ein Hinweis nennt sie, bis du hier entscheidest. Ein Wert aus der Umgebung oder eine frühere Entscheidung bleibt unangetastet. Leer gelassen gilt der Wert aus der [Umgebung](/configuration-integrations#workflows). Daneben zeigt die Überwachung die Auslastung: aktive Workflows, Läufe je Minute, wartende und laufende Schritte, die älteste fällige Aufgabe, Fehlerquote und KI-Tokens von heute.

## Markdown- & Git-Export

Seiten und Datenbanken für den Markdown-Export wählen, den Git-Export der Bereiche einschalten und das (veraltete) Git-Repository der Instanz – siehe [Markdown-Export und Git](/markdown-git-export).

## E-Mail

**E-Mail-Versand** zeigt den eingerichteten Server, den Absender, die Warteschlange und den letzten Fehler; ohne SMTP einen Hinweis mit den Variablen ([E-Mail (SMTP)](/configuration-integrations#e-mail-smtp)). **Test-E-Mail** prüft die Verbindung sofort.

## Push-Benachrichtigungen

Ob Mitteilungen an die Apps ankommen können und über welchen Dienst (`/#settings/instance/push`). Die Kachel unter **Überwachung → Zustand** zeigt das Relay mit einem grünen, gelben oder roten Hinweis – etwa „Erreichbar (85 ms)“ – und die Zustellungen der letzten 24 Stunden.

Relay, Erreichbarkeit, Signaturschlüssel und Zustellungen im Einzelnen: [Zustand in den Einstellungen der Instanz](/configuration-ai-push#zustand-in-den-einstellungen-der-instanz).

## Chat-Apps

**Einstellungen → Instanz → Chat-Apps** regelt die [Benachrichtigungen an Chat-Apps](/notifications#chat-apps). Oben stehen erlaubte Dienste, der Bot der Instanz, aktive und nach Fehlern ausgeschaltete Verbindungen und die Zustellungen der letzten 24 Stunden.

- **Erlaubte Dienste:** Telegram, Gotify, ntfy und Matrix lassen sich einzeln ausschalten (Vorgabe: `FLOWPLAN_MESSENGERS`). Ausgeschaltete Dienste bekommen keine Nachrichten mehr; die Verbindungen der Personen bleiben gespeichert und laufen wieder, wenn der Dienst eingeschaltet wird.
- **Telegram-Bot der Instanz:** Bot-Token von @BotFather und optional eine eigene API-Adresse (Bot-API-Server oder Relay/Proxy, auch im eigenen Netz). **Prüfen und speichern** fragt Telegram mit `getMe` nach dem Bot und speichert den Token nur, wenn er angenommen wird – verschlüsselt, angezeigt wird nur „…abcd“. **Bot entfernen** löscht ihn (ein Token aus `FLOWPLAN_TELEGRAM_BOT_TOKEN` gilt dann wieder). Ein Konflikt mit einem Webhook oder einem anderen Programm, das den Bot abfragt, steht unter **Letzter Fehler**.
- **Server-Adressen:** leer erlaubt jeden öffentlichen Server; sonst nur die eingetragenen Hosts, einer pro Zeile (`*.example.org` für Subdomains). `api.telegram.org` und `ntfy.sh` gehen immer. Interne Adressen erlaubt nur `FLOWPLAN_MESSENGER_ALLOW_PRIVATE=true`.

Das Ändern des Bots wird als Sicherheitsereignis „Telegram-Bot der Instanz geändert“ festgehalten, das Ändern der Dienste und Hosts als „Sicherheitsrelevante Einstellung geändert“ – beides auch im [Aktivitätsprotokoll](#aktivitaetsprotokoll).

## KI

Optional und standardmäßig aus: Anbieter (Ollama, OpenAI-kompatibel, Anthropic, Gemini), wer KI nutzen darf, einzelne Funktionen und eigene Schlüssel der Nutzer. Eigener Schalter: **KI auf dem Gerät (Apple)** – standardmäßig erlaubt, weil nichts das Gerät verlässt. Alles dazu unter [KI](/ai#fuer-admins).

**Kontingente** begrenzen die KI über den Anbieter der Instanz je Tag, Woche, Monat und Jahr – für die ganze Instanz, Gruppen und Personen ([KI-Kontingente](/ai-quotas)). {since=0.11.0}

## Erweiterungen & Domains

**Block-Erweiterungen von jeder HTTPS-Adresse** (aus: nur aus `PLUGIN_ALLOWED_ORIGINS`) und **Eigene Domains für Veröffentlichungen** – siehe [Block-Erweiterungen](/plugins) und [Coolify und Reverse Proxy](/coolify-and-proxy#eigene-domains-fuer-veroeffentlichungen).

**Marketplace**: Veröffentlichen im und Übernehmen aus dem [Flowplan Marketplace](/marketplace) für die ganze Instanz ein- oder ausschalten.

## Verschlüsselung

Die Schlüssel-ID, frühere Schlüssel, wie viele Dateien im Bucket noch nicht mit diesem Schlüssel verschlüsselt sind (**Bestehende verschlüsseln** holt das nach), und was trotzdem unverschlüsselt den Server verlässt (Litestream, Git-Export). Siehe [Verschlüsselung](/storage-encryption#verschluesselung).

## Aktivitätsprotokoll

Die letzten Änderungen mit Person, Aktion und betroffener Ressource – etwa Freigaben, Rollenwechsel, Löschungen, Einstellungen und Abrechnungsstatus von Zeiten –, durchsuchbar und nach Person und Art gefiltert, auf dem Telefon als Liste. Unter **Exportieren** wählst du optional ein Von- und Bis-Datum (UTC, wie gespeichert) und lädst das Protokoll als **CSV** (Semikolon, mit BOM, für Excel) oder als **JSON** herunter. Werte, die eine Tabellenkalkulation als Formel ausführen würde, beginnen im CSV mit einem Apostroph. Der Export ist nur angemeldeten Admins zugänglich, nie API-Tokens.

## Überwachung

Zustand, Nutzung und Ereignisse der Instanz – live: oben fünf Kennzahlen (**Aktiv 24 Std.**, **Speicher**, **Zustellungen 7 Tage**, **KI-Tokens 14 Tage**, **Fehler 24 Std.**) mit Verlauf und, wo es passt, dem Vergleich zum Zeitraum davor, darunter Karten in zwei Spalten mit Diagrammen, Warteschlangen, Hintergrunddiensten, abgewiesenen Anfragen, Warnungen per Webhook und der Nutzungsstatistik. Details unter [Betrieb und Fehlersuche](/monitoring#einstellungen-instanz-ueberwachung).

## Wartung & Hinweise

**Hinweis für alle Personen** – ein Banner für alle, bis du ihn leerst – der **Wartungshinweis** mit Beginn und Ende, der nach dem Ende von selbst verschwindet, und **Banner zum Wegklicken**, die jede Person einmal sieht, bis sie sie schließt – etwa für die Apps oder euren Discord-Server ([Wartung & Hinweise](/monitoring#wartung-hinweise)).

## Instanz

Der Abschnitt **Instanz** steht in der Gruppe **Betrieb** (`/#settings/instance/general`).

| Einstellung | Wirkung |
| --- | --- |
| Name der Instanz | Erscheint bei der Anmeldung, in der Seitenleiste und im Browser-Tab. |
| Öffentliche Demo | Besucher probieren Flowplan ohne Konto aus, siehe [Demo](#demo). |
| Version | Laufende **Version**, **Commit** (verlinkt auf GitHub) und Build-Datum. Docker-Images aus unserem Workflow kennen ihren Commit; bei Coolify kommt er aus `SOURCE_COMMIT`. Bei einem eigenen Build `--build-arg GIT_COMMIT=$(git rev-parse HEAD)` mitgeben, sonst steht dort „Commit unbekannt“. Ist eine neuere Version da, steht dort ein Hinweis mit **So aktualisierst du**. |
| Admin-Gruppe | Die SSO- oder LDAP-Gruppe aus `OIDC_ADMIN_GROUP`. |
| Neuigkeiten nach Updates für neue Konten | Womit neue Konten bei **Neuigkeiten nach Updates** beginnen: **Alle anzeigen** (Standard), **Nur Breaking Changes** oder **Nie**. Gilt nur für Konten, die danach angelegt werden; bestehende Konten behalten ihre Einstellung, und jede Person kann sie unter **Darstellung & Sprache** ändern. Pro Person legst du sie unter [Benutzer](/user-management#benutzer) fest; Konten auf **Instanz-Standard** folgen dieser Einstellung. {since=0.9.7} |
| Einstellungsstufe für neue Konten | Welche Einstellungen neue Konten sehen: **Einsteiger** das Wichtigste, **Normal** (Standard) die meisten, **Experte** alle ([Einstellungsstufen](/settings#einstellungsstufen)). Die Suche in den Einstellungen findet immer alle, und jede Person kann ihre Stufe oben in den Einstellungen ändern; pro Person legst du sie unter [Benutzer](/user-management#benutzer) fest. Konten, die es schon vor dieser Einstellung gab, sehen weiter alles (Experte). {since=0.9.7} |
| Standard-Formatierungsleiste | Die [Formatierungsleiste](/formatting#text-formatieren), die alle bekommen, die ihre nicht selbst angepasst haben – mit demselben Editor wie in den eigenen Einstellungen. **Zurücksetzen** führt sie dorthin zurück; hier stellt es die eingebaute Leiste wieder her. {since=0.9.7} |
| Startinhalt für neue Konten | Ein Bereich, dessen Seiten jedes neue Konto in seinem persönlichen Arbeitsbereich bekommt, statt der eingebauten Beispiele; siehe [Startinhalt für neue Konten](/starter-content). {since=0.11.0} |
| Funktionen dieser Instanz | Je Funktion eine Kachel, die zugleich ihr Schalter ist („an“ / „aus“). {since=0.11.6} Ausgeschaltet ist die Funktion für alle aus – auch auf dem Server; siehe [Funktionen dieser Instanz](/instance-features). {since=0.11.0} Daneben zeigt eine Vorschau, wie **Neue Seite** dann für alle aussieht, und nennt, was für alle verschwindet. {since=0.11.6} |
| Funktionen für neue Konten | Welche [Funktionen](/settings#funktionen-ein-und-ausblenden) neue Konten sehen, je Funktion ein Schalter. Ausgeblendet fehlt nur der Einstieg; vorhandene Seiten und Rechte bleiben. Jede Person kann es selbst ändern; bestehende Konten sehen alles. **Allen zuweisen** setzt nach einer Rückfrage alle bestehenden Konten auf diese Vorgabe, eigene Auswahlen gehen dabei verloren. {since=0.11.0} |

Version, Lizenz und Quellcode sehen alle Personen unter **Einstellungen → Über Flowplan**; dort steht bei unseren Images auch, ob es eine Beta oder ein Release ist (eigene Builds: `--build-arg FLOWPLAN_CHANNEL=beta` oder `release`). Wer veränderten Code betreibt, nennt dessen Quellcode mit `FLOWPLAN_SOURCE_URL`; den Link zu GitHub Sponsors blendet `FLOWPLAN_HIDE_SPONSOR=true` aus ([Konfiguration](/configuration-storage#rechtliches-und-oberflaeche)).

Darunter führt **Weitere Einstellungen der Instanz** zu den Bereichen, in die frühere Einstellungen der Instanz umgezogen sind.

## Demo

Die Demo ist auf jeder Instanz ausgeschaltet, bis ein Admin sie unter **Einstellungen → Instanz → Name & Version → Öffentliche Demo** einschaltet.

Dann startet die Adresse `/demo` deiner Instanz eine Demo (auf flowplan.org verlinkt der Knopf **Demo ausprobieren** dorthin). Sie legt ohne Konto einen Demo-Gast mit eigenem Beispiel-Arbeitsbereich an. Jede Demo bekommt frische Beispielseiten, die alle Funktionen zeigen: eine Willkommensseite, einen Editor-Rundgang mit allen Blöcken, eine Projektdatenbank mit Beziehung, Rollup, Formel, Wiederholung und allen Ansichten (Tabelle, Board, Kalender, Zeitleiste, Galerie, Liste, Feed, Diagramm, Formular), ein Whiteboard, ein Journal und ein kleines Wiki.

- Die Demo endet mit **Demo beenden**, beim Abmelden, nach 45 Minuten ohne Aktivität, spätestens nach drei Stunden. Dann werden Konto, Arbeitsbereich, Seiten und Dateien vollständig gelöscht.
- Demo-Gäste können nichts nach außen tragen: nicht veröffentlichen, keine Freigabelinks, keine Einladungen, keine weiteren Arbeitsbereiche, keine öffentlichen Formulare, keine Einstellungen der Instanz.
- Jeder Demo-Arbeitsbereich hat 25 MB Speicher. Neue Demos sind auf fünf pro Stunde und Adresse sowie 40 gleichzeitig begrenzt.
- Laufende und insgesamt gestartete Demos zeigt **Einstellungen → Instanz → Überwachung → Instanz in Zahlen**.
