---
keywords: Umgebungsvariablen, env, Konfiguration, APP_URL, Docker
---

# Konfiguration

Alle Umgebungsvariablen auf einen Blick. Viele Werte lassen sich zusätzlich in der Oberfläche der **Administration** setzen (siehe [In der Oberfläche](#in-der-oberflaeche)); dort gesetzte Werte haben Vorrang.

**Mehr zum Thema:** [Konfiguration: Speicher, Datenbank und Sicherheit](/configuration-storage) · [Konfiguration: E-Mail, Integrationen und Workflows](/configuration-integrations) · [Konfiguration: KI, Sprachnotizen und Push](/configuration-ai-push)

## Pflicht

| Variable | Beispiel | Bedeutung |
| --- | --- | --- |
| `APP_URL` | `https://flowplan.example.com` | Öffentliche Adresse genau so, wie sie im Browser steht – Schema, Host, ggf. Port, ohne Schrägstrich am Ende. Grundlage für Login-Weiterleitung, Cookies, Passkeys, Links in E-Mails und Push-Nachrichten und die Origin-Prüfung. |

## Anmeldung

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_LOCAL_LOGIN` | an | `false` schaltet E-Mail, Passwort und Passkeys ab; dann bleibt nur Single Sign-on. |
| `FLOWPLAN_SETUP_TOKEN` | *leer* (Helm: zufällig erzeugt) | Empfohlen für Instanzen, die aus dem Internet erreichbar sind: Das erste Konto und das Wiederherstellen beim Einrichten gehen nur über `/register?setup=<token>`. Danach ohne Wirkung. Fehlt er und ist `APP_URL` keine lokale Adresse, warnt Flowplan beim Start im Log und auf dem Einrichtungsbildschirm. Siehe [Anmeldung](/sign-in#e-mail-und-passwort). |
| `OIDC_ISSUER` | *leer* | Login-Anbieter für Single Sign-on. Ohne ihn gibt es nur E-Mail, Passwort und Passkeys. |
| `OIDC_CLIENT_ID` | – | Client-ID. |
| `OIDC_CLIENT_SECRET` | – | Client-Secret. Nie ins Image oder ins Git. Leer: öffentlicher Client, nur mit PKCE. |
| `OIDC_LINKED_SSO_ONLY` | aus | `true`: Konten, die mit SSO verbunden sind, melden sich nur noch über SSO an. Anmelden mit Passwort oder Passkey wird mit einem Hinweis abgelehnt; Passkeys und die Authenticator-App bleiben zum Bestätigen wichtiger Schritte. Siehe [Bestehendes Konto mit SSO verbinden](/sso-oidc#bestehendes-konto-mit-sso-verbinden). |
| `OIDC_NEW_ACCOUNTS` | an | `false`: Die SSO-Anmeldung legt keine neuen Konten an – nur bestehende, verbundene oder per SCIM bereitgestellte Konten melden sich an. Bei der ersten SSO-Anmeldung mit bekannter Adresse fehlt dann „Stattdessen ein eigenes Konto anlegen“. |
| `SESSION_HOURS` | `8` | Browser-Sitzung ohne „Angemeldet bleiben“: endet so viele Stunden nach der Anmeldung (1–24). Auch unter **Administration → Anmeldung & SSO → Sitzungen**; ein dort gespeicherter Wert hat Vorrang (gilt für alle `SESSION_*` außer `SESSION_MAX_DAYS` und `SESSION_GROUPS_HOURS`). |
| `SESSION_REMEMBER` | aus | `true` bietet im Browser beim Anmelden **Angemeldet bleiben** an – siehe [Anmeldung](/sessions). Die Apps bleiben unabhängig davon angemeldet. |
| `SESSION_IDLE_HOURS` | `168` | Mit „angemeldet bleiben“ im Browser: Sitzung endet so viele Stunden nach der letzten Nutzung (1–8760). |
| `SESSION_APP_REMEMBER` | an | Desktop- und Handy-Apps bleiben angemeldet, solange sie (oder ihre Widgets) genutzt werden – bei Anmeldungen, die die App belegt (Übergabe über den Browser oder Passwort mit dem Geräteschlüssel der App; siehe [Anmeldung](/sessions)). `false`: Ihre Sitzungen enden wie eine Browser-Sitzung ohne „Angemeldet bleiben“. |
| `SESSION_APP_DAYS` | `90` | App-Sitzung endet nach so vielen Tagen ohne Nutzung (1–365). |
| `SESSION_MAX_DAYS` | `30` / `365` | Sitzungen, die angemeldet bleiben, enden spätestens so viele Tage nach der Anmeldung (1–365; Standard 30 im Browser, 365 in den Apps; nie kürzer als die Zeit ohne Nutzung) – mit SSO genauso wie mit Passwort und Passkey. |
| `SESSION_GROUPS_HOURS` | *leer* | Nur wenn gesetzt: SSO-Sitzungen mit „angemeldet bleiben“ enden schon nach so vielen Stunden, damit Gruppenänderungen beim Anbieter mit der neuen Anmeldung wirken. Ohne die Variable wirken sie über SCIM, den LDAP-Abgleich oder die nächste Anmeldung. |
| `LDAP_URL` | *leer* | Anmeldung mit einem LDAP-Verzeichnis (`ldap://` oder `ldaps://`) – siehe [Anmeldung mit LDAP](/scim-and-ldap#anmeldung-mit-ldap). |
| `LDAP_BIND_DN` / `LDAP_BIND_PASSWORD` | *leer* | Suchkonto für LDAP; ohne es anonyme Suche. |
| `LDAP_BASE_DN` | – | Wo LDAP-Konten gesucht werden. |
| `LDAP_USER_FILTER` | `(\|(uid={user})(mail={user}))` | Suchfilter; `{user}` ist der maskierte Anmeldename. |
| `LDAP_GROUP_ATTRIBUTE` | `memberOf` | Gruppen für SSO-Zuordnungen und Admin-Gruppe, stündlich abgeglichen. |
| `LDAP_TLS_CA` | *leer* | CA für `ldaps://`/StartTLS (Pfad oder PEM). |
| `LDAP_STARTTLS` | `false` | `ldap://` mit StartTLS. |
| `LDAP_TIMEOUT_MS` | `8000` | Zeitlimit je LDAP-Operation. |
| `LDAP_CONTACTS_BASE_DN` | `LDAP_BASE_DN` | Basis für [Kontakte aus LDAP](/scim-and-ldap#kontakte-aus-ldap); der OU-Baum beginnt hier. |
| `LDAP_CONTACTS_FILTER` | Personen ohne Computer | Welche Einträge als Kontakte gelten. |
| `LDAP_CONTACTS_SYNC_MINUTES` | `60` | Abgleich der Kontakte aus dem Verzeichnis (15–1440 Minuten). |
| `LDAP_CONTACTS_ATTRIBUTES` | – | Weitere LDAP-Attribute, die Kontakte-Datenbanken zuordnen dürfen (durch Komma oder Leerzeichen getrennt), zusätzlich zu denen der Standardzuordnung. |
| `LDAP_CONTACTS` | an | `off` schaltet Kontakte aus LDAP ab. |

Die übrigen OIDC-Variablen und alles zu Passwörtern und Passkeys stehen unter [Anmeldung](/sign-in).

## Betrieb

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_DATA_DIR` | `/app/data` im Image, sonst `./data` | Datenverzeichnis für SQLite, Uploads, Push-Schlüssel und Texterkennungsdaten. |
| `PUID` / `PGID` | `1000` / wie `PUID` | Nur im Image, ohne `user:` (wie bei linuxserver.io): Flowplan gibt den Datenordner beim Start diesem Benutzer und dieser Gruppe und läuft als sie, nie als root; `0` wird abgelehnt. Mit `user: "UID:GID"` läuft Flowplan stattdessen gleich als dieser Benutzer – siehe [Volume-Rechte](/coolify-and-proxy#volume-rechte). |
| `FLOWPLAN_WORKSPACE_QUOTA_MB` | unbegrenzt | Standard-Speicherkontingent je Arbeitsbereich in MB (`0` = unbegrenzt). |
| `FLOWPLAN_IMPORT_MAX_MB` | *leer* | Größte Datei für [Importe aus AFFiNE](/migrate-affine) und anderen Werkzeugen in MB, für alle Personen. Ohne die Variable gilt die **größte Datei beim Hochladen** (Administration → Grenzen & Aufbewahrung bzw. die Grenze der Person), mindestens 100 MB. Größer als 100 MB darf nur die AFFiNE-Arbeitsbereichsdatei (`.affine`) sein; ZIP-Exporte bleiben bei 100 MB. Ein Proxy davor muss so große Anfragen durchlassen. |
| `FLOWPLAN_MAX_DOCUMENT_MB` | `16` | Größe eines gemeinsam bearbeiteten Dokuments (Seite oder Datensatz-Dokument) in MB. Änderungen, die ein Dokument darüber hinaus wachsen lassen, werden abgelehnt („Das Dokument ist zu groß …“); größere Inhalte auf mehrere Seiten verteilen. Schützt den Server davor, dass jede Bearbeitung eines riesigen Dokuments ihn ausbremst. |
| `FLOWPLAN_IMPORT_MAX_DOCS` | `10000` | Höchstzahl der Seiten je [Import](/migrate) aus AFFiNE, Confluence, Evernote, Google Docs, Obsidian und Notion/Markdown: Dokumente, Ordner, Datenbanken, Whiteboards und Sammlungen; beim Import als neue Datenbank die Zahl der Einträge. Darüber zeigt die Vorschau die Anzahl und der Import wird abgelehnt (die Meldung nennt die Variable). Dokumente werden einzeln umgewandelt; ein höherer Wert kostet Zeit, kaum Speicher. |
| `FLOWPLAN_IMPORT_MAX_FILES` | `20000` | Höchstzahl der Dateien (Bilder, Anhänge) je Import aus einem AFFiNE-Arbeitsbereich oder -Snapshot; weitere werden ausgelassen, die Vorschau nennt ihre Zahl und die Variable. ZIP-Exporte dürfen so viele Einträge haben wie Seiten und Dateien zusammen (mindestens 12.000). |
| `FLOWPLAN_SNAPSHOT_RETENTION_DAYS` | `180` | Aufbewahrung automatischer Versionen in Tagen (`0` = unbegrenzt). |
| `FLOWPLAN_OCR` | an | `0` schaltet die Texterkennung für gescannte PDFs und Bilder ab. |
| `FLOWPLAN_OCR_LANGS` | `deu,eng` | Sprachen der Texterkennung, z. B. `fra,eng`; die erste ist die Hauptsprache. Mitgeliefert sind `deu`, `eng`, `fra` und `chi_sim` (Chinesisch, Kurzzeichen, z. B. `chi_sim,eng`). Jede weitere Sprache kostet Speicher und Zeit pro Seite; Chinesisch am meisten (rund 100 MB mehr Arbeitsspeicher, etwa anderthalbmal so lange pro Seite). |
| `FLOWPLAN_METRICS` | an | `off` schaltet die Nutzungsstatistik der [Überwachung](/monitoring#statistik) aus: Anfragen, Fehler und Antwortzeiten je Minute, aktive Personen je Stunde, Speicherverlauf und KI-Tokens. Erfasst werden nur Zahlen – keine IP-Adressen, Pfade oder Namen; Minuten bleiben 48 Stunden, Stunden 35 Tage, Tage 400 Tage. Mit `off` wird nichts erfasst, und der Schalter **Nutzungsstatistik erfassen** unter **Administration → Überwachung → Statistik** ist gesperrt. `/api/metrics` hängt davon nicht ab. |
| `FLOWPLAN_METRICS_TOKEN` | *leer* | Mindestens 16 Zeichen; aktiviert `/api/metrics` im Prometheus-Format. Als `Authorization: Bearer …` mitgeschickt, liefert `/api/health` damit auch die Details (siehe [Healthcheck](/operations#healthcheck)). |
| `FLOWPLAN_PUBLIC_API_DOCS` | `false` | `true` macht `/api/openapi.json` und `/api/docs` ohne Anmeldung lesbar; Besucher sehen darin nur die Hauptversion (`0.x`). Sonst nur für Angemeldete und API-Tokens. |
| `FLOWPLAN_UPDATE_CHECK` | an | `false` schaltet die Suche nach neuen Versionen ab (für Instanzen ohne Internet). Sonst fragt der Server höchstens alle 12 Stunden bei GitHub nach dem neuesten Release und zeigt Admins in der Administration einen Hinweis. |
| `FLOWPLAN_MARKETPLACE_URL` | `https://marketplace.flowplan.org` | Adresse des Flowplan Marketplace (Standard `https://marketplace.flowplan.org`); `off` schaltet ihn ab. Die Instanz verbindet sich nie selbst damit – die Adresse legt nur fest, mit welchem Fenster der Browser Vorlagen austauscht. Siehe [Marketplace](/marketplace). |
| `FLOWPLAN_UPDATE_URL` | GitHub-API | Andere Adresse für das neueste Release (gleiches Format wie `api.github.com/repos/yannicschuller/flowplan/releases/latest`), etwa ein interner Spiegel. Nicht zu verwechseln mit der gleichnamigen Variable der [Desktop-App](/desktop-app), die auf dem Rechner der App deren Update-Quelle nennt. |
| `FLOWPLAN_TRUSTED_PROXIES` | `1` | Anzahl der Proxys vor Flowplan (Traefik allein: `1`, Pangolin vor Traefik: `2`, `0` = keinem Header vertrauen). Bestimmt, welcher Eintrag in `X-Forwarded-For` die echte Adresse ist – für die Begrenzung von Anmeldeversuchen, Demo-Starts und anonymen Formularantworten. Frei erfundene Einträge des Browsers werden so ignoriert. Kommt gar keine Adresse an (der Proxy setzt den Header nicht), gelten nur die Limits je Konto und je Link, und das Protokoll zeigt einmalig einen Hinweis. |
| `FLOWPLAN_SECURITY_LOG` | `on` | Sicherheitsereignisse als JSON-Zeile auf stdout: `on` (mit Adresse, für fail2ban/CrowdSec), `anonymous`, `off` ([Sicherheit](/security-monitoring#sicherheit)). |
| `FLOWPLAN_SECURITY_RETENTION_DAYS` | `90` | Wie lange Sicherheitsereignisse in der Datenbank bleiben (mindestens 7). |
| `FLOWPLAN_COUNTRY_HEADER` | *leer* | Header des Proxys mit dem Land der Anfrage (z. B. `CF-IPCountry`); schaltet die Regel „zwei Länder kurz nacheinander“ ein. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | *leer* | OTLP-Collector (HTTP); Sicherheitsereignisse gehen als OpenTelemetry-Logs dorthin. Dazu `OTEL_EXPORTER_OTLP_HEADERS` und `OTEL_SERVICE_NAME`. |
| `FLOWPLAN_ANONYMOUS_UPLOAD_MB` | `1024` | Wie viele MB Besucher ohne Konto pro Tag auf der ganzen Instanz hochladen dürfen – über anonyme Formulare und Bearbeiten-Links (`0` = unbegrenzt). Je Formular bzw. Link gelten zusätzlich 200 MB pro Tag, unabhängig vom Speicherkontingent des Arbeitsbereichs. |

Die Typst-Vorschau lädt Compiler und Schriften (WebAssembly, etwa 11 MB komprimiert) beim ersten Gebrauch von `/typst/…` des eigenen Servers; es gibt keine Verbindung zu einem CDN.

## Nicht setzen

`NODE_ENV`, `PORT`, `HOSTNAME` und `NEXT_TELEMETRY_DISABLED` setzt das Image selbst, ebenso `FLOWPLAN_DROP_ROOT=1` (Flowplans Werkzeuge im Container geben root ab und laufen als `PUID:PGID`). `FLOWPLAN_LITESTREAM_SSE_C` setzt der Start des Containers, wenn `LITESTREAM_SSE_C_KEY` gesetzt ist; die Administration zeigt daran, ob die Litestream-Kopie verschlüsselt ist. `FLOWPLAN_DIST_DIR` ist nur für parallele Entwicklungsserver gedacht, `OIDC_ALLOW_LOCAL_HTTP` nur für Tests mit einem Anbieter auf `http://localhost`, `FLOWPLAN_GIT_ALLOW_HTTP` nur für Tests des Git-Exports mit einem `http://`-Server (in Produktion wirkungslos). Version und Commit (`FLOWPLAN_VERSION`, `GIT_COMMIT`, `SOURCE_COMMIT`) kommen aus dem Build; `FLOWPLAN_VERSION` in der `.env` wählt nur das Image-Tag in `compose.yaml`.

## In der Oberfläche

In der **Administration** stellen Admins ein (siehe [Administration der Instanz](/administration)):

- **Instanz**: Name der Instanz und ob die Instanz eine öffentliche **Demo** anbietet (laufende und insgesamt gestartete Demos zeigt **Administration → Überwachung → Instanz in Zahlen**),
- **Anmeldung & SSO**: ob sich jede Person mit E-Mail und Passwort registrieren darf, ob alle Personen eigene Arbeitsbereiche anlegen dürfen, nach wie vielen Tagen ohne Anmeldung Konten gesperrt werden, Zwei-Faktor-Pflicht,
- **Grenzen & Aufbewahrung**: Standard-Speicherkontingent, Speicher und eigene Arbeitsbereiche je Person, maximale Uploadgröße, Aufbewahrung von Versionen,
- **Speicher & Sicherung**: tägliche oder stündliche Datenbanksicherung und wie viele Kopien bleiben,
- **Wartung & Hinweise**: ein Hinweisbanner für alle und der Wartungshinweis,
- **Erweiterungen & Domains**: **Eigene Domains für Veröffentlichungen** (aus) und **Block-Erweiterungen von jeder HTTPS-Adresse** (aus) – siehe [Coolify und Reverse Proxy](/coolify-and-proxy#eigene-domains-fuer-veroeffentlichungen) und [Block-Erweiterungen](/plugins),
- **Überwachung → Statistik**: ob die Nutzungsstatistik erfasst wird (gesperrt mit `FLOWPLAN_METRICS=off`).

Leere Felder fallen auf die Umgebungsvariablen zurück.
