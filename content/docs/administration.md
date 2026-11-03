# Administration der Instanz

Wer die Instanz verwaltet, sieht **Administration** in der Seitenleiste: das erste Konto der Instanz und alle, denen es das Admin-Recht gibt – bei Single Sign-on zusätzlich die Mitglieder der Gruppe aus `OIDC_ADMIN_GROUP`.

## Übersicht

Die Administration öffnet mit einer Übersicht. Oben steht der Zustand der Instanz: Störungen und Hinweise (mit Link zum betroffenen Bereich), fünf Live-Zahlen – gerade aktive Personen, heute aktive Personen (verschiedene Personen seit Mitternacht), Anfragen pro Minute, Fehlerquote der letzten Stunde, Anmeldungen heute – und die Anfragen der letzten 24 Stunden als Diagramm. Die Zahlen aktualisieren sich alle 15 Sekunden, solange die Seite sichtbar ist („Live“). Darunter je Bereich eine Kachel mit seinem Zustand und, wo es passt, einer Zahl mit Verlauf: aktive Personen (Benutzer), das vollste Kontingent (Arbeitsbereiche), der Speicher der letzten 30 Tage, KI-Tokens heute, Änderungen im Aktivitätsprotokoll, Anfragen bzw. Fehler (Überwachung). Fehler sind rot markiert, Hinweise gelb. Auf dem Telefon sind die Kacheln eine Liste mit einem kleinen Verlauf rechts.

Die Bereiche sind gruppiert in **Personen** (Benutzer, Anmeldung & SSO, Arbeitsbereiche), **Daten** (Speicher & Sicherung, Grenzen & Aufbewahrung, Markdown- & Git-Export), **Dienste** (E-Mail, Push-Benachrichtigungen, KI, Erweiterungen & Domains), **Sicherheit** (Angriffe & Vorfälle, Verschlüsselung, Aktivitätsprotokoll – siehe [Sicherheit](/operations#sicherheit)) und **Betrieb** (Überwachung, Wartung & Hinweise, Instanz). Jeder Bereich beginnt oben mit einer **Zustandszeile** – etwa „Geplante Sicherung aus“ mit dem Link zum Schalter oder „S3 aus“ mit dem Link zur Anleitung. Jede Einstellung hat genau einen Ort. Schalter und Auswahlfelder speichern sofort, daneben steht „Speichert …“ bzw. „Gespeichert“; einzelne Textfelder zeigen **Speichern**, sobald du sie geändert hast. Jeder Bereich hat eine eigene Adresse, z. B. `/#admin/storage` oder `/#admin/monitoring`.

## Benutzer

Alle Konten als durchsuchbare Liste (auf dem Telefon untereinander) mit ihrem Zustand: **Aktiv**, **Inaktiv** (30 Tage oder länger ohne Anmeldung), **Deaktiviert**, dazu **Admin** (lokale Konten mit Admin-Recht und alle, die zuletzt mit der Admin-Gruppe angemeldet waren, auch per SSO oder LDAP) und **E-Mail unbestätigt**, wann die Person zuletzt da war und der belegte Speicher. Die Filter-Knöpfe über der Liste (mit der Anzahl) zeigen nur Aktive, Inaktive, Deaktivierte, Admins oder wer **gerade da** ist. Mehrere Konten auf einmal: Häkchen setzen, dann **Sitzungen beenden**, **Deaktivieren** oder **Aktivieren**.

**Wer gerade da ist** steht in der Spalte **Zuletzt aktiv** und aktualisiert sich alle 30 Sekunden: ein grüner Punkt für **Jetzt aktiv** (Flowplan ist offen und wurde in den letzten Minuten benutzt), ein gelber für **Geöffnet · inaktiv seit …** (offen, aber seit dieser Zeit nicht berührt – auch ein Tab im Hintergrund), ein grauer mit der Zeit des letzten Besuchs, wenn Flowplan geschlossen ist, und ein leerer Kreis für Konten, die noch nie da waren. Dafür meldet die geöffnete App einmal pro Minute nur, dass sie offen ist und wie lange die letzte Eingabe her ist (Tippen, Klicken, Scrollen, Tippen auf dem Bildschirm) – nicht, was jemand tut oder welche Seite offen ist.

**Verwalten** öffnet ein Konto in einem Seitenfenster (auf dem Telefon bildschirmfüllend):

- **Belegung und Grenzen** für diese Person: Speicher (alles, was sie hochlädt oder kopiert – über alle Arbeitsbereiche), Anzahl eigener Arbeitsbereiche und größte Datei. Balken zeigen, wie viel davon belegt ist. Leer = Standard der Instanz, 0 = unbegrenzt; für Admins gelten keine Grenzen. **Grenzen speichern** übernimmt sie.
- **Anmeldemethoden**: ob das Konto ein Passwort hat (oder es entfernt wurde), ob es sich über LDAP anmeldet und welche SSO-Konten verbunden sind – mit Issuer, Adresse, wann verbunden und wann zuletzt benutzt. Verbinden und trennen kann die Person selbst unter **Einstellungen → Konto & Sicherheit**. Die Liste zeigt die Methoden auch in der Spalte **Person · Anmeldung** (z. B. „E-Mail · SSO · Passkey“).
- **Zugang**:
  - **KI-Funktionen**: Steht unter [Administration → KI](/ai#fuer-admins) „Ausgewählte Personen“, schaltest du hier die KI pro Person frei oder ab.
  - **Sitzungen beenden** meldet die Person auf allen Geräten ab.
  - Bei Konten mit E-Mail und Passwort: **Zum Admin machen** bzw. **Admin entziehen** (eine Person verwaltet die Instanz immer) und **Link zum Zurücksetzen** – ein zwei Stunden gültiger Link für ein neues Passwort, zum Weitergeben, wenn die Instanz keine E-Mails verschickt.
  - **Zwei-Faktor-Anmeldung**: „2FA an“, „2FA per Passkey“ oder „2FA aus“. **Zwei-Faktor zurücksetzen** (etwa bei verlorenem Telefon) schaltet die Authenticator-App des Kontos aus; das steht im Aktivitätsprotokoll, und die Person bekommt eine E-Mail, wenn die Instanz E-Mails versendet.
  - **E-Mail als bestätigt markieren** für Konten, die den Link aus der Bestätigungs-E-Mail noch nicht geöffnet haben.
- **Gefahrenzone**: **Zusammenführen …** legt das Konto mit einem zweiten derselben Person zusammen (siehe [Konten zusammenführen](#konten-zusammenfuehren)). **Deaktivieren** sperrt das Konto sofort und beendet alle Sitzungen; **Aktivieren** gibt es wieder frei. **Konto löschen …** geht, sobald ein Konto deaktiviert ist. Der Dialog nennt vorher, was passiert: Name, E-Mail, Passwort, Passkeys, Sitzungen und persönliche Einstellungen werden gelöscht, ebenso Arbeitsbereiche, in denen nur diese Person Mitglied war, und ihre privaten Bereiche. Gemeinsame Arbeitsbereiche bekommen bei Bedarf ein anderes Mitglied als Eigentümer; Beiträge darin bleiben und erscheinen als „Gelöschtes Konto“. Das eigene Konto und das letzte Admin-Konto lassen sich nicht löschen.

Konten mit E-Mail und Passwort entstehen über **Konto erstellen** (siehe [Anmeldung](/sign-in)); SSO-Konten beim ersten Anmelden über OIDC, ihr Admin-Recht kommt aus der Gruppe beim Anbieter. Ob sich Personen selbst registrieren dürfen, stellst du unter [Anmeldung & SSO](#anmeldung-sso) ein.

### Konten zusammenführen

Hat eine Person zwei Konten – etwa ein lokales und eines, das bei der ersten SSO-Anmeldung entstanden ist –, führst du sie in der **Gefahrenzone** ihres Kontos mit **Zusammenführen …** zusammen. Du wählst das andere Konto (Konten mit derselben E-Mail-Adresse stehen oben) und mit dem Pfeil, welches bestehen bleibt. Die Vorschau nennt, was wechselt, bevor etwas passiert.

Alles des übernommenen Kontos geht auf das bleibende über: eigene Seiten und Bereiche, Mitgliedschaften in Arbeitsbereichen und Bereichen samt Freigaben (die **höhere Rolle** bleibt; Gast nur, wenn die Person überall Gast war), Gruppen, Kommentare und Reaktionen, Erwähnungen in Kommentaren und Dokumenten, Zuweisungen und Personen-Eigenschaften in Datenbanken, Favoriten, Sammlungen, Seitenleiste, Journal, Benachrichtigungen und ihre Einstellungen, Webhooks, Kalender- und Kontakt-Verbindungen, Zeiterfassung, Passkeys, SSO-Konten, das LDAP- und SCIM-Konto und der Verlauf im Aktivitäts- und Sicherheitsprotokoll. Wo beide Konten dasselbe haben (etwa einen Favoriten oder die Seitenleiste eines Arbeitsbereichs), gilt das des bleibenden Kontos.

- **Sitzungen** des übernommenen Kontos enden; **API-Tokens** werden widerrufen (Skripte brauchen ein neues Token des bleibenden Kontos – so liest kein Token plötzlich die Daten eines anderen Kontos).
- **Passwort**: Hat das bleibende Konto keins, übernimmt es das des anderen; sonst bleibt sein eigenes. Ein Admin-Recht eines lokalen Kontos geht mit.
- **Authenticator-App**: wird übernommen, wenn das bleibende Konto keine hat; Wiederherstellungscodes müssen dann neu erzeugt werden.
- **Ende-zu-Ende-Verschlüsselung**: Hat nur das übernommene Konto Schlüssel, gehen sie mit. Haben beide welche, bleiben die des bleibenden Kontos; verschlüsselte Bereiche, die nur das andere Konto hatte, müssen neu freigegeben werden.
- Ältere Versionen von Dokumenten behalten ihre Erwähnungen, wie sie waren.

Das Zusammenführen läuft in einem Schritt – ganz oder gar nicht –, steht im Aktivitätsprotokoll und als „Konten zusammengeführt“ im Sicherheitsprotokoll. Das übernommene Konto wird danach gelöscht. Das eigene Konto kann nur das bleibende sein.

## Anmeldung & SSO

- **Registrierung & Zugang**: **Registrierung mit E-Mail und Passwort** (jede Person darf ein Konto anlegen; ohne diese Einstellung nur eingeladene Adressen und das erste Konto der Instanz), **Alle dürfen Arbeitsbereiche anlegen** und **Inaktive Konten sperren** nach einer Zahl von Tagen ohne Anmeldung. Gesperrte Konten verlieren ihre Sitzungen, ihre API-Tokens funktionieren nicht mehr; die Sperre steht im Aktivitätsprotokoll und lässt sich unter **Benutzer** aufheben. **Inaktive Konten löschen** geht einen Schritt weiter: Nach einer Zahl von Tagen ohne jede Nutzung (mindestens 60 und mehr als beim Sperren) wird ein Konto gelöscht – wie beim Löschen durch einen Admin: persönliche Daten, Arbeitsbereiche und private Bereiche, die nur dieser Person gehören, verschwinden, Beiträge in gemeinsamen Arbeitsbereichen bleiben unter „Gelöschtes Konto“. 14 und 3 Tage vorher bekommt die Person eine E-Mail mit dem Datum; meldet sie sich vorher an, bleibt das Konto. Ist es schon gesperrt, bittet die E-Mail, sich an die Administration zu wenden – schaltest du es unter **Benutzer** wieder frei, ist die Löschung abgesagt. Ohne eingerichteten E-Mail-Versand, für Admin-Konten und für Konten ohne E-Mail-Adresse wird nie gelöscht. Unter **Benutzer** zeigt „Wird am … gelöscht“, wo eine Löschung ansteht; jede Löschung steht im Aktivitätsprotokoll.
- **Zwei-Faktor-Anmeldung**: **Zwei-Faktor-Anmeldung verlangen** – nicht verlangen, nur für Admins oder für alle lokalen Konten –, dazu wie viele lokale Konten schon einen zweiten Faktor haben. Konten ohne Authenticator-App und ohne Passkey richten direkt nach der Anmeldung einen zweiten Faktor ein ([Zwei-Faktor-Anmeldung](/sign-in#zwei-faktor-anmeldung)). SSO-Konten sind nicht betroffen.
- **Single Sign-on (OIDC)**: ob ein Anbieter eingerichtet ist, die Admin-Gruppe und **SSO-Gruppen zentral zuordnen** – Gruppen des Anbieters bekommen Rollen und Gruppen in jedem Arbeitsbereich ([SSO-Gruppen](/sign-in#sso-gruppen-arbeitsbereichen-zuordnen)).
- **SCIM-Token** und **LDAP-Verzeichnis** mit ihrem Zustand ([Benutzer bereitstellen mit SCIM](/sign-in#benutzer-bereitstellen-mit-scim), [Anmeldung mit LDAP](/sign-in#anmeldung-mit-ldap)).
- **Kontakte aus LDAP**: Basis-DN, Personenfilter und Abgleich für [Kontakte-Datenbanken](/contacts#kontakte-aus-dem-ldap-verzeichnis); Änderungen werden als Sicherheitsereignis protokolliert. Siehe [Kontakte aus LDAP](/sign-in#kontakte-aus-ldap).

## Arbeitsbereiche

Alle Arbeitsbereiche mit Mitgliedern, Seiten, Belegung (Balken bei einem Kontingent) und **Eigenes Kontingent** – gespeichert, sobald du das Feld verlässt. Leer = Standard, 0 = unbegrenzt. Den Standard stellst du unter [Grenzen & Aufbewahrung](#grenzen-aufbewahrung) ein.

## Speicher & Sicherung

Der eine Ort für Sicherungen:

- **Sicherungen**: **S3-Spiegel** und **Litestream** mit ihrem Zustand, die geplante **Tägliche Datenbanksicherung** – eine konsistente Kopie der Datenbank pro Tag, mit S3 in den Bucket unter `backups/`, sonst in den Datenordner –, **Stündlich statt täglich** (gedacht für verschlüsselte Sicherungen anstelle von Litestream, siehe [Verschlüsselung](/storage-and-backups#verschluesselung); dann mehr Kopien aufbewahren, etwa 72 für drei Tage), **Aufbewahrte Sicherungen**, die letzte Sicherung und **Jetzt sichern**. Der Markdown-Export läuft weiterhin einmal am Tag.
- **Belegung**: was lokal und was im Bucket liegt, nach Art, und die Aufteilung der Datenbank.
- **Gesamte Instanz → Herunterladen** erzeugt im laufenden Betrieb eine geprüfte Kopie von Datenbank und Dateien. Mit `FLOWPLAN_ENCRYPTION_KEY` ist die Datei verschlüsselt (`.zip.enc`).
- **Inhalte**: wie viele Arbeitsbereiche, Seiten, Datenbanken, Einträge, Dateien, Konten und Kommentare es gibt.
- Ganz unten, in Rot: **Aus Sicherung wiederherstellen**. Eine hochgeladene Sicherung wird geprüft und beim nächsten Neustart übernommen; der vorherige Stand bleibt als `pre-restore-…` im Datenverzeichnis. Eine verschlüsselte Sicherung wird mit dem aktuellen oder einem früheren Schlüssel entschlüsselt.

Details: [Speicher und Sicherungen](/storage-and-backups).

## Grenzen & Aufbewahrung

| Einstellung | Wirkung |
| --- | --- |
| Speicher je Arbeitsbereich | Für Arbeitsbereiche ohne eigenes Kontingent. |
| Speicher je Person | Für Personen ohne eigene Grenze; alles, was sie hochladen oder kopieren. |
| Eigene Arbeitsbereiche je Person | Wie viele Arbeitsbereiche eine Person besitzen darf. |
| Größte Datei beim Hochladen | Grenze je Datei in MB. Gilt auch für den [Import einer AFFiNE-Arbeitsbereichsdatei](/migrate#von-affine) (mindestens 100 MB; `FLOWPLAN_IMPORT_MAX_MB` hat Vorrang). |
| Versionen aufbewahren | Tage, nach denen automatische Versionen gelöscht werden. |

Leere Felder fallen auf die [Umgebungsvariablen](/configuration) zurück. Jede Person sieht ihre Grenzen und den belegten Speicher unter **Einstellungen → Konto & Sicherheit → Deine Grenzen**.

## Markdown- & Git-Export

Seiten und Datenbanken für den Markdown-Export wählen, den Git-Export der Bereiche einschalten und das (veraltete) Git-Repository der Instanz – siehe [Markdown-Export und Git](/storage-and-backups#markdown-export-und-git).

## E-Mail

**E-Mail-Versand** zeigt den eingerichteten Server, den Absender, die Warteschlange und den letzten Fehler; ohne SMTP einen Hinweis mit den Variablen ([E-Mail (SMTP)](/configuration#e-mail-smtp)). **Test-E-Mail** prüft die Verbindung sofort.

## Push-Benachrichtigungen

Ob Mitteilungen an die Apps ankommen können und über welchen Dienst (`/#admin/push`). Die Kachel der Übersicht zeigt das Relay mit einem grünen, gelben oder roten Hinweis – etwa „Erreichbar (85 ms)“ – und die Zustellungen der letzten 24 Stunden; dieselbe Kachel steht unter **Überwachung → Zustand**.

- **Push-Relay**: die verwendete Adresse – das offizielle `https://push.flowplan.org` oder ein eigenes aus `PUSH_RELAY_URL` (Zugangsdaten in der Adresse werden nie angezeigt) –, ob es an ist und sonst genau warum (`PUSH_RELAY=off`, `APP_URL` keine HTTPS-Adresse, `PUSH_RELAY_URL` ungültig), die `APP_URL`, unter der das Relay die Instanz kennt, und ob `/.well-known/flowplan-push` veröffentlicht ist.
- **Erreichbarkeit**: Die Instanz ruft `GET <Relay>/healthz` ab – höchstens 5 Sekunden, nur HTTPS, ohne Weiterleitungen zu folgen – und zeigt „Erreichbar“ mit der Antwortzeit (und der Version des Relays, falls es eine nennt) oder den Grund: Zeitüberschreitung, Verbindung abgelehnt, DNS, TLS, Weiterleitung, HTTP-Status. Außerdem ruft sie ihr eigenes `/.well-known/flowplan-push` unter `APP_URL` ab, wie das Relay es tut, und prüft, dass der aktuelle Signaturschlüssel darin steht. Klappt das von innen nicht, ist das nur ein Hinweis: Hinter NAT oder einem Proxy, der die eigene Adresse intern nicht auflöst, ist das normal – entscheidend ist, dass das Relay sie von außen erreicht ([Testbenachrichtigung](/search-and-notifications#testbenachrichtigung)). Das Ergebnis gilt eine Minute; **Erreichbarkeit prüfen** prüft sofort neu.
- **Signaturschlüssel**: Schlüssel-IDs mit Status (signiert, wartet, auslaufend) und Daten. **Schlüssel wechseln …** fragt nach und wechselt wie in [Push-Relay und Ende-zu-Ende-Verschlüsselung](/configuration#push-relay-und-ende-zu-ende-verschluesselung) beschrieben, wahlweise sofort.
- **Zustellungen der letzten 24 Stunden** je Kanal (Relay, Expo, Web Push) und Ergebnis (zugestellt, abgemeldet, abgewiesen, ungültig, gedrosselt, Fehler), die letzte Zustellung über das Relay, der letzte Fehler als Code (etwa `signature HTTP 401` oder `unreachable`), die Warteschlange und die registrierten Geräte je Kanal. Gezählt wird nur mit eingeschalteter Statistik (siehe [Überwachung](#ueberwachung)).
- **Expo und Web Push**: `MOBILE_PUSH` an oder aus, was `MOBILE_PUSH_CONTENT` mitschickt, woher die VAPID-Schlüssel kommen und ob `WEB_PUSH_SUBJECT` gesetzt ist.

Die Antworten enthalten nie Tokens, Schlüssel oder Push-Adressen. `/api/admin/push` ist nur für angemeldete Administratoren, nicht für API-Tokens.

## Chat-Apps

**Administration → Chat-Apps** regelt die [Benachrichtigungen an Chat-Apps](/search-and-notifications#chat-apps). Oben stehen erlaubte Dienste, der Bot der Instanz, aktive und nach Fehlern ausgeschaltete Verbindungen und die Zustellungen der letzten 24 Stunden.

- **Erlaubte Dienste:** Telegram, Gotify, ntfy und Matrix lassen sich einzeln ausschalten (Vorgabe: `FLOWPLAN_MESSENGERS`). Ausgeschaltete Dienste bekommen keine Nachrichten mehr; die Verbindungen der Personen bleiben gespeichert und laufen wieder, wenn der Dienst eingeschaltet wird.
- **Telegram-Bot der Instanz:** Bot-Token von @BotFather und optional eine eigene API-Adresse (Bot-API-Server oder Relay/Proxy, auch im eigenen Netz). **Prüfen und speichern** fragt Telegram mit `getMe` nach dem Bot und speichert den Token nur, wenn er angenommen wird – verschlüsselt, angezeigt wird nur „…abcd“. **Bot entfernen** löscht ihn (ein Token aus `FLOWPLAN_TELEGRAM_BOT_TOKEN` gilt dann wieder). Ein Konflikt mit einem Webhook oder einem anderen Programm, das den Bot abfragt, steht unter **Letzter Fehler**.
- **Server-Adressen:** leer erlaubt jeden öffentlichen Server; sonst nur die eingetragenen Hosts, einer pro Zeile (`*.example.org` für Subdomains). `api.telegram.org` und `ntfy.sh` gehen immer. Interne Adressen erlaubt nur `FLOWPLAN_MESSENGER_ALLOW_PRIVATE=true`.

Das Ändern des Bots wird als Sicherheitsereignis „Telegram-Bot der Instanz geändert“ festgehalten, das Ändern der Dienste und Hosts als „Sicherheitsrelevante Einstellung geändert“ – beides auch im [Aktivitätsprotokoll](#aktivitaetsprotokoll).

## KI

Optional und standardmäßig aus: Anbieter (Ollama, OpenAI-kompatibel, Anthropic, Gemini), wer KI nutzen darf, einzelne Funktionen und eigene Schlüssel der Nutzer. Eigener Schalter: **KI auf dem Gerät (Apple)** – standardmäßig erlaubt, weil nichts das Gerät verlässt. Alles dazu unter [KI](/ai#fuer-admins).

## Erweiterungen & Domains

**Block-Erweiterungen von jeder HTTPS-Adresse** (aus: nur aus `PLUGIN_ALLOWED_ORIGINS`) und **Eigene Domains für Veröffentlichungen** – siehe [Block-Erweiterungen](/plugins) und [Coolify und Reverse Proxy](/coolify-and-proxy#eigene-domains-fuer-veroeffentlichungen).

## Verschlüsselung

Die Schlüssel-ID, frühere Schlüssel, wie viele Dateien im Bucket noch nicht mit diesem Schlüssel verschlüsselt sind (**Bestehende verschlüsseln** holt das nach), und was trotzdem unverschlüsselt den Server verlässt (Litestream, Git-Export). Siehe [Verschlüsselung](/storage-and-backups#verschluesselung).

## Aktivitätsprotokoll

Die letzten Änderungen mit Person, Aktion und betroffener Ressource – etwa Freigaben, Rollenwechsel, Löschungen, Einstellungen und Abrechnungsstatus von Zeiten –, durchsuchbar und nach Person und Art gefiltert, auf dem Telefon als Liste. Unter **Exportieren** wählst du optional ein Von- und Bis-Datum (UTC, wie gespeichert) und lädst das Protokoll als **CSV** (Semikolon, mit BOM, für Excel) oder als **JSON** herunter. Werte, die eine Tabellenkalkulation als Formel ausführen würde, beginnen im CSV mit einem Apostroph. Der Export ist nur angemeldeten Admins zugänglich, nie API-Tokens.

## Überwachung

Zustand, Nutzung und Ereignisse der Instanz – live, mit Diagrammen, Warteschlangen, Hintergrunddiensten, abgewiesenen Anfragen, Warnungen per Webhook und der Nutzungsstatistik. Details unter [Betrieb und Fehlersuche](/operations#administration-ueberwachung).

## Wartung & Hinweise

**Hinweis für alle Personen** – ein Banner für alle, bis du ihn leerst – der **Wartungshinweis** mit Beginn und Ende, der nach dem Ende von selbst verschwindet, und **Banner zum Wegklicken**, die jede Person einmal sieht, bis sie sie schließt – etwa für die Apps oder euren Discord-Server ([Wartung & Hinweise](/operations#wartung-hinweise)).

## Instanz

| Einstellung | Wirkung |
| --- | --- |
| Name der Instanz | Erscheint bei der Anmeldung, in der Seitenleiste und im Browser-Tab. |
| Öffentliche Demo | Besucher probieren Flowplan ohne Konto aus, siehe [Demo](#demo). |
| Version | Laufende **Version**, **Commit** (verlinkt auf GitHub) und Build-Datum. Docker-Images aus unserem Workflow kennen ihren Commit; bei Coolify kommt er aus `SOURCE_COMMIT`. Bei einem eigenen Build `--build-arg GIT_COMMIT=$(git rev-parse HEAD)` mitgeben, sonst steht dort „Commit unbekannt“. Ist eine neuere Version da, steht dort ein Hinweis mit **So aktualisierst du**. |
| Admin-Gruppe | Die SSO- oder LDAP-Gruppe aus `OIDC_ADMIN_GROUP`. |

Darunter führt **Weitere Einstellungen der Instanz** zu den Bereichen, in die frühere Einstellungen der Instanz umgezogen sind.

## Demo

Die Demo ist auf jeder Instanz ausgeschaltet, bis ein Admin sie unter **Administration → Instanz → Öffentliche Demo** einschaltet.

Dann startet die Adresse `/demo` deiner Instanz eine Demo (auf flowplan.org verlinkt der Knopf **Demo ausprobieren** dorthin). Sie legt ohne Konto einen Demo-Gast mit eigenem Beispiel-Arbeitsbereich an. Jede Demo bekommt frische Beispielseiten, die alle Funktionen zeigen: eine Willkommensseite, einen Editor-Rundgang mit allen Blöcken, eine Projektdatenbank mit Beziehung, Rollup, Formel, Wiederholung und allen Ansichten (Tabelle, Board, Kalender, Zeitleiste, Galerie, Liste, Feed, Diagramm, Formular), ein Whiteboard, ein Journal und ein kleines Wiki.

- Die Demo endet mit **Demo beenden**, beim Abmelden, nach 45 Minuten ohne Aktivität, spätestens nach drei Stunden. Dann werden Konto, Arbeitsbereich, Seiten und Dateien vollständig gelöscht.
- Demo-Gäste können nichts nach außen tragen: nicht veröffentlichen, keine Freigabelinks, keine Einladungen, keine weiteren Arbeitsbereiche, keine öffentlichen Formulare, keine Administration.
- Jeder Demo-Arbeitsbereich hat 25 MB Speicher. Neue Demos sind auf fünf pro Stunde und Adresse sowie 40 gleichzeitig begrenzt.
- Laufende und insgesamt gestartete Demos zeigt **Administration → Überwachung → Instanz in Zahlen**.
