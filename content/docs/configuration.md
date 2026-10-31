# Konfiguration

Alle Umgebungsvariablen auf einen Blick. Viele Werte lassen sich zusätzlich in der Oberfläche der **Administration** setzen (siehe [In der Oberfläche](#in-der-oberflaeche)); dort gesetzte Werte haben Vorrang.

## Pflicht

| Variable | Beispiel | Bedeutung |
| --- | --- | --- |
| `APP_URL` | `https://flowplan.example.com` | Öffentliche Adresse genau so, wie sie im Browser steht – Schema, Host, ggf. Port, ohne Schrägstrich am Ende. Grundlage für Login-Weiterleitung, Cookies, Passkeys, Links in E-Mails und Push-Nachrichten und die Origin-Prüfung. |

## Anmeldung

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_LOCAL_LOGIN` | an | `false` schaltet E-Mail, Passwort und Passkeys ab; dann bleibt nur Single Sign-on. |
| `OIDC_ISSUER` | *leer* | Login-Anbieter für Single Sign-on. Ohne ihn gibt es nur E-Mail, Passwort und Passkeys. |
| `OIDC_CLIENT_ID` | – | Client-ID. |
| `OIDC_CLIENT_SECRET` | – | Client-Secret. Nie ins Image oder ins Git. |
| `SESSION_HOURS` | `8` | Dauer einer Sitzung in Stunden (1–24). Ohne `SESSION_REMEMBER` gilt das für alle Sitzungen, auch die der Apps. |
| `SESSION_REMEMBER` | aus | `true` bietet beim Anmelden **Angemeldet bleiben** an – siehe [Anmeldung](/sign-in#angemeldet-bleiben). Empfohlen, wenn die Desktop- oder Handy-Apps und ihre Widgets genutzt werden. |
| `SESSION_IDLE_HOURS` | `168` | Mit „angemeldet bleiben“: Sitzung endet so viele Stunden nach der letzten Nutzung (1–2160, höchstens `SESSION_MAX_DAYS`). |
| `SESSION_MAX_DAYS` | `30` | Mit „angemeldet bleiben“: spätestens nach so vielen Tagen neu anmelden (1–365) – mit SSO genauso wie mit Passwort und Passkey. |
| `SESSION_GROUPS_HOURS` | *leer* | Nur wenn gesetzt: SSO-Sitzungen mit „angemeldet bleiben“ enden schon nach so vielen Stunden, damit Gruppenänderungen beim Anbieter mit der neuen Anmeldung wirken. Ohne die Variable wirken sie über SCIM, den LDAP-Abgleich oder die nächste Anmeldung. |
| `LDAP_URL` | *leer* | Anmeldung mit einem LDAP-Verzeichnis (`ldap://` oder `ldaps://`) – siehe [Anmeldung mit LDAP](/sign-in#anmeldung-mit-ldap). |
| `LDAP_BIND_DN` / `LDAP_BIND_PASSWORD` | *leer* | Suchkonto für LDAP; ohne es anonyme Suche. |
| `LDAP_BASE_DN` | – | Wo LDAP-Konten gesucht werden. |
| `LDAP_USER_FILTER` | `(\|(uid={user})(mail={user}))` | Suchfilter; `{user}` ist der maskierte Anmeldename. |
| `LDAP_GROUP_ATTRIBUTE` | `memberOf` | Gruppen für SSO-Zuordnungen und Admin-Gruppe, stündlich abgeglichen. |
| `LDAP_TLS_CA` | *leer* | CA für `ldaps://`/StartTLS (Pfad oder PEM). |
| `LDAP_STARTTLS` | `false` | `ldap://` mit StartTLS. |
| `LDAP_TIMEOUT_MS` | `8000` | Zeitlimit je LDAP-Operation. |

Die übrigen OIDC-Variablen und alles zu Passwörtern und Passkeys stehen unter [Anmeldung](/sign-in).

## Betrieb

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_DATA_DIR` | `/app/data` im Image, sonst `./data` | Datenverzeichnis für SQLite, Uploads, Push-Schlüssel und Texterkennungsdaten. |
| `FLOWPLAN_WORKSPACE_QUOTA_MB` | unbegrenzt | Standard-Speicherkontingent je Arbeitsbereich in MB (`0` = unbegrenzt). |
| `FLOWPLAN_SNAPSHOT_RETENTION_DAYS` | `180` | Aufbewahrung automatischer Versionen in Tagen (`0` = unbegrenzt). |
| `FLOWPLAN_OCR` | an | `0` schaltet die Texterkennung für gescannte PDFs und Bilder ab. |
| `FLOWPLAN_OCR_LANGS` | `deu,eng` | Sprachen der Texterkennung, z. B. `fra,eng`; die erste ist die Hauptsprache. Mitgeliefert sind `deu`, `eng` und `fra`. Jede weitere Sprache kostet Speicher und Zeit pro Seite. |
| `FLOWPLAN_METRICS` | an | `off` schaltet die Nutzungsstatistik der [Überwachung](/operations#statistik) aus: Anfragen, Fehler und Antwortzeiten je Minute, aktive Personen je Stunde, Speicherverlauf und KI-Tokens. Erfasst werden nur Zahlen – keine IP-Adressen, Pfade oder Namen; Minuten bleiben 48 Stunden, Stunden 35 Tage, Tage 400 Tage. Mit `off` wird nichts erfasst, und der Schalter **Nutzungsstatistik erfassen** unter **Administration → Überwachung → Statistik** ist gesperrt. `/api/metrics` hängt davon nicht ab. |
| `FLOWPLAN_METRICS_TOKEN` | *leer* | Mindestens 16 Zeichen; aktiviert `/api/metrics` im Prometheus-Format. Als `Authorization: Bearer …` mitgeschickt, liefert `/api/health` damit auch die Details (siehe [Healthcheck](/operations#healthcheck)). |
| `FLOWPLAN_PUBLIC_API_DOCS` | `false` | `true` macht `/api/openapi.json` und `/api/docs` ohne Anmeldung lesbar; Besucher sehen darin nur die Hauptversion (`0.x`). Sonst nur für Angemeldete und API-Tokens. |
| `FLOWPLAN_UPDATE_CHECK` | an | `false` schaltet die Suche nach neuen Versionen ab (für Instanzen ohne Internet). Sonst fragt der Server höchstens alle 12 Stunden bei GitHub nach dem neuesten Release und zeigt Admins in der Administration einen Hinweis. |
| `FLOWPLAN_UPDATE_URL` | GitHub-API | Andere Adresse für das neueste Release (gleiches Format wie `api.github.com/repos/yannicschuller/flowplan/releases/latest`), etwa ein interner Spiegel. Nicht zu verwechseln mit der gleichnamigen Variable der [Desktop-App](/offline-and-apps#desktop-app-fuer-macos-windows-und-linux), die auf dem Rechner der App deren Update-Quelle nennt. |
| `FLOWPLAN_TRUSTED_PROXIES` | `1` | Anzahl der Proxys vor Flowplan (Traefik allein: `1`, Pangolin vor Traefik: `2`, `0` = keinem Header vertrauen). Bestimmt, welcher Eintrag in `X-Forwarded-For` die echte Adresse ist – für die Begrenzung von Anmeldeversuchen, Demo-Starts und anonymen Formularantworten. Frei erfundene Einträge des Browsers werden so ignoriert. Kommt gar keine Adresse an (der Proxy setzt den Header nicht), gelten nur die Limits je Konto und je Link, und das Protokoll zeigt einmalig einen Hinweis. |
| `FLOWPLAN_SECURITY_LOG` | `on` | Sicherheitsereignisse als JSON-Zeile auf stdout: `on` (mit Adresse, für fail2ban/CrowdSec), `anonymous`, `off` ([Sicherheit](/operations#sicherheit)). |
| `FLOWPLAN_SECURITY_RETENTION_DAYS` | `90` | Wie lange Sicherheitsereignisse in der Datenbank bleiben (mindestens 7). |
| `FLOWPLAN_COUNTRY_HEADER` | *leer* | Header des Proxys mit dem Land der Anfrage (z. B. `CF-IPCountry`); schaltet die Regel „zwei Länder kurz nacheinander“ ein. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | *leer* | OTLP-Collector (HTTP); Sicherheitsereignisse gehen als OpenTelemetry-Logs dorthin. Dazu `OTEL_EXPORTER_OTLP_HEADERS` und `OTEL_SERVICE_NAME`. |
| `FLOWPLAN_ANONYMOUS_UPLOAD_MB` | `1024` | Wie viele MB Besucher ohne Konto pro Tag auf der ganzen Instanz hochladen dürfen – über anonyme Formulare und Bearbeiten-Links (`0` = unbegrenzt). Je Formular bzw. Link gelten zusätzlich 200 MB pro Tag, unabhängig vom Speicherkontingent des Arbeitsbereichs. |

## S3 und Datenbanksicherung

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `S3_BUCKET` | *leer* | Schaltet S3 ein. Ohne diese Variable bleibt alles lokal. |
| `S3_ENDPOINT` | AWS | API-Adresse des Speichers, z. B. `http://minio:9000`. |
| `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | – | Zugangsschlüssel mit Lese- und Schreibrecht auf den Bucket. |
| `S3_REGION` | `us-east-1` | Region. Garage verlangt seinen eigenen Wert (oft `garage`). |
| `S3_PREFIX` | `flowplan` | Ordner im Bucket; Dateien unter `<Präfix>/uploads/`, Datenbank unter `<Präfix>/db/`. |
| `FLOWPLAN_LITESTREAM` | an | `off`: nur Dateien spiegeln, Datenbank nicht sichern. |
| `LITESTREAM_SSE_C_KEY` | *leer* | Optional: der Speicheranbieter verschlüsselt die Litestream-Kopie (SSE-C, 32 Bytes base64, nur über https und bei Anbietern, die SSE-C können). |

Details: [Speicher, S3 und Sicherung](/storage-and-backups).

## Verschlüsselung

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_ENCRYPTION_KEY` | *leer* | 32 Bytes, base64 (`openssl rand -base64 32`). Verschlüsselt Dateien im Bucket, geplante Sicherungen, Markdown-Exporte und die Instanzsicherung. Ohne Schlüssel ändert sich nichts. |
| `FLOWPLAN_ENCRYPTION_KEY_FILE` | *leer* | Statt der Variablen: Pfad zu einer Datei mit dem Schlüssel (Docker-Secret). |
| `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS` | *leer* | Frühere Schlüssel, durch Komma getrennt – nur zum Lesen nach einem Schlüsselwechsel. |

Details: [Verschlüsselung](/storage-and-backups#verschluesselung).

## Gespeicherte Geheimnisse

Schlüssel von KI-Anbietern, die Schlüssel der Authenticator-Apps ([Zwei-Faktor-Anmeldung](/sign-in#zwei-faktor-anmeldung)) die Zugangstokens des [Git-Exports der Bereiche](/storage-and-backups#git-export-eines-bereichs) und die Tokens der [Chat-Apps](/search-and-notifications#chat-apps) speichert Flowplan nur verschlüsselt (AES-256-GCM, an ihren Platz gebunden). Der Schlüssel dafür kommt, in dieser Reihenfolge, aus:

| Quelle | Bedeutung |
| --- | --- |
| `FLOWPLAN_ENCRYPTION_KEY` | Wenn gesetzt, verschlüsselt er auch die gespeicherten Geheimnisse. |
| `FLOWPLAN_SECRETS_KEY` / `FLOWPLAN_SECRETS_KEY_FILE` | Ein eigener Schlüssel nur dafür: 32 Bytes, base64 oder hex (`openssl rand -base64 32`), oder Pfad zu einer Datei (Docker-Secret). |
| `secrets.key` im Datenordner | Ohne die beiden Variablen legt Flowplan diese Datei beim ersten Bedarf selbst an (nur für den Besitzer lesbar). |

> [!IMPORTANT]
> Die Instanzsicherung enthält `secrets.key` bewusst nicht – sie gehört nicht neben die Daten, die sie schützt. Sichere die Datei getrennt oder setze den Schlüssel als Variable. Fehlt er nach einer Wiederherstellung, geben Admins und Nutzer ihre KI-Schlüssel und Chat-App-Tokens neu ein, und für die Zwei-Faktor-Anmeldung helfen Wiederherstellungscodes oder ein Zurücksetzen durch die Administration.

## E-Mail (SMTP)

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `SMTP_HOST` | *leer* | Schaltet den E-Mail-Versand ein: Einladungen und Zusammenfassungen ungelesener Benachrichtigungen. |
| `SMTP_PORT` | `587` | Port. Bei `465` spricht Flowplan direkt TLS, sonst STARTTLS. |
| `SMTP_SECURE` | nach Port | `true`/`false` erzwingt TLS ab Verbindungsbeginn. |
| `SMTP_USER` / `SMTP_PASSWORD` | *leer* | Anmeldung am Mailserver. |
| `SMTP_FROM` | `Flowplan <SMTP_USER>` | Absender, z. B. `Flowplan <flowplan@example.com>`. |

Den Versand prüfst du unter **Administration → E-Mail → Test-E-Mail senden**.

## E-Mail-Eingang (IMAP)

Für den [E-Mail-Eingang](/api-and-webhooks#e-mail-eingang) per Webhook (Mailgun, Postmark, SendGrid, Cloudflare) ist nichts zu setzen. Ein eigenes Postfach fragt Flowplan alle zwei Minuten per IMAP ab:

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `INBOUND_MAIL_DOMAIN` | *leer* | Domain der Eingangsadressen, z. B. `mail.example.com`. Die Einstellungen zeigen dann je Adresse `inbox+<token>@mail.example.com`. |
| `INBOUND_IMAP_HOST` | *leer* | Schaltet die IMAP-Abfrage ein (zusammen mit `INBOUND_IMAP_USER`). |
| `INBOUND_IMAP_PORT` | `993` | Port (`143`, wenn `INBOUND_IMAP_TLS=false`). |
| `INBOUND_IMAP_USER` / `INBOUND_IMAP_PASSWORD` | *leer* | Anmeldung am Postfach. Der Teil vor `@` ist auch der Teil vor `+` in den Adressen. |
| `INBOUND_IMAP_FOLDER` | `INBOX` | Ordner, der abgefragt wird. |
| `INBOUND_IMAP_TLS` | `true` | `false` nur für einen Mailserver auf demselben Rechner oder im selben Netz (ohne Verschlüsselung). |

Der Mailserver muss Plus-Adressierung unterstützen (`inbox+irgendwas@…` landet in `inbox@…`); das tun z. B. Dovecot, Postfix, Gmail/Google Workspace und Microsoft 365 (dort einschalten). Flowplan markiert verarbeitete E-Mails als gelesen und löscht nichts.

## Integrationen

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE` | *leer* | `true` erlaubt Webhooks an interne Adressen und `http://` – etwa Home Assistant oder n8n im selben Netz. Ohne diese Variable sind nur öffentliche HTTPS-Adressen erlaubt. |
| `SPACE_GIT_EXPORT` | *leer* | `true` schaltet den [Git-Export der Bereiche](/storage-and-backups#git-export-eines-bereichs) ein: Bereichseigentümer übertragen ihren Bereich täglich oder wöchentlich in ein eigenes Repository. |
| `SPACE_GIT_ALLOWED_HOSTS` | *leer* | Erlaubte Git-Server dafür, durch Komma getrennt (z. B. `git.example.org`). Ohne die Variable ist jeder öffentliche `https://`-Server erlaubt; interne Adressen nie. |
| `SPACE_GIT_ALLOW_PRIVATE` | *leer* | `true` erlaubt den in `SPACE_GIT_ALLOWED_HOSTS` genannten Servern auch interne Adressen – etwa ein Forgejo auf demselben Host, den der Container über `--add-host git.example.org:host-gateway` erreicht. Wirkt nur zusammen mit der Liste; alle anderen Server bleiben auf öffentliche Adressen beschränkt. |
| `ISSUE_SYNC_ALLOWED_HOSTS` | *leer* | Eigene Server für die [Synchronisierung von GitHub- und GitLab-Issues](/projects-and-tickets#github-und-gitlab-issues-synchronisieren), durch Komma getrennt (z. B. `gitlab.example.org`). github.com und gitlab.com sind immer erlaubt; andere Server nur, wenn sie hier stehen. |
| `ISSUE_SYNC_ALLOW_PRIVATE` | *leer* | `true` erlaubt den in `ISSUE_SYNC_ALLOWED_HOSTS` genannten Servern auch interne Adressen – etwa ein GitLab im selben Netz. Wirkt nur zusammen mit der Liste. |
| `PLUGIN_ALLOWED_ORIGINS` | *leer* | HTTPS-Ursprünge, von denen Eigentümer [Block-Erweiterungen](/plugins) registrieren dürfen, durch Komma getrennt (z. B. `https://plugins.example.org`). Ohne die Variable nur, wenn die Administration **Block-Erweiterungen von jeder HTTPS-Adresse** einschaltet. Die Ursprünge werden auch in die `frame-src` der Content Security Policy aufgenommen. |
| `GIPHY_API_KEY` / `TENOR_API_KEY` | *leer* | Schlüssel für die [GIF-Suche auf Whiteboards](/whiteboards#bilder-symbole-und-eintraege) bei GIPHY bzw. Tenor (ist beides gesetzt, gilt GIPHY). Ohne Schlüssel fehlt der Reiter **GIFs**. Gesucht wird über den Server; gewählte GIFs werden bis 8 MB auf dem Server gespeichert. |
| `EXPORT_GIT_*` | *leer* | Veraltet: der Git-Export der ganzen Instanz, siehe [In ein Git-Repository übertragen](/storage-and-backups#in-ein-git-repository-uebertragen). Läuft weiter; besser ist der Git-Export der Bereiche. |

## Kalender-Sync

Zwei-Wege-Synchronisierung von Datenbankansichten mit [Google Kalender und Microsoft Outlook / 365](/views#mit-google-kalender-oder-outlook-synchronisieren). Jede Person verbindet ihr eigenes Konto; ohne Client-ID bleibt der jeweilige Anbieter ausgeblendet. Flowplan fragt alle zehn Minuten nach Änderungen (Push-Benachrichtigungen der Anbieter werden nicht genutzt – sie bräuchten eine öffentlich erreichbare, beim Anbieter bestätigte HTTPS-Adresse).

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `GOOGLE_CALENDAR_CLIENT_ID` / `GOOGLE_CALENDAR_CLIENT_SECRET` | *leer* | OAuth-Client (Typ „Webanwendung“) aus der Google Cloud Console, mit aktivierter Google Calendar API und dem Bereich `…/auth/calendar`. Weiterleitungs-URI: `<APP_URL>/api/calendar-sync/callback/google`. |
| `MS_CALENDAR_CLIENT_ID` / `MS_CALENDAR_CLIENT_SECRET` | *leer* | App-Registrierung in Microsoft Entra ID (Web-Plattform) mit den delegierten Berechtigungen `Calendars.ReadWrite` und `offline_access`. Weiterleitungs-URI: `<APP_URL>/api/calendar-sync/callback/microsoft`. |
| `MS_CALENDAR_TENANT` | `common` | `common` (Geschäfts- und private Konten), `organizations` oder die ID eines Mandanten. |

Die Aktualisierungs-Tokens der Personen liegen versiegelt in der Datenbank (wie alle [gespeicherten Geheimnisse](#gespeicherte-geheimnisse)).

## Rechtliches und Oberfläche

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `IMPRINT_URL` | *leer* | Link zum Impressum, z. B. `https://example.com/impressum`. Erscheint auf der Anmeldeseite, unter geteilten Seiten und Formularen und im Kontomenü – nur, wenn gesetzt. |
| `PRIVACY_URL` | *leer* | Link zur Datenschutzerklärung, an denselben Stellen und ebenfalls nur, wenn gesetzt. |

## Sprachnotizen (Whisper)

Sprachnotizen im Editor werden immer als Audio gespeichert. Mit einem Whisper-Dienst im eigenen Netz macht Flowplan daraus zusätzlich Text; die Aufnahme verlässt dabei deinen Server nicht.

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `WHISPER_URL` | *leer* | Adresse eines OpenAI-kompatiblen Whisper-Servers (`POST /v1/audio/transcriptions`), z. B. `http://whisper:8000`. Schaltet die Transkription ein. |
| `WHISPER_MODEL` | `Systran/faster-whisper-small` | Modellname, wie ihn der Dienst erwartet. |
| `WHISPER_LANGUAGE` | `de` | Sprache der Aufnahmen. |
| `WHISPER_API_KEY` | *leer* | Nur falls der Dienst einen Schlüssel verlangt. |
| `WHISPER_MAX_MB` | `200` | Größte Aufnahme in MB. |
| `WHISPER_RESPONSE_FORMAT` | `verbose_json` | Antwortformat der Spracherkennung; bei Fehler einmal `json`. |
| `WHISPER_DIARIZE` | *leer* | `on`: Sprechertrennung anfragen (`diarize=true`), nur bei Diensten, die es können. |

Beispiel mit [speaches](https://github.com/speaches-ai/speaches) (früher faster-whisper-server) im selben Compose-Projekt:

```yaml
  whisper:
    image: ghcr.io/speaches-ai/speaches:latest-cpu
    volumes:
      - whisper-models:/home/ubuntu/.cache/huggingface/hub
    restart: unless-stopped
```

Bei Flowplan dann `WHISPER_URL=http://whisper:8000` setzen. Neuere speaches-Versionen laden Modelle nicht selbst; einmalig herunterladen, etwa aus dem Flowplan-Container:

```sh
node -e "fetch('http://whisper:8000/v1/models/Systran/faster-whisper-small',{method:'POST'}).then(r=>console.log(r.status))"
```

`small` braucht rund 1 GB Arbeitsspeicher und transkribiert auf einer normalen CPU etwa in Echtzeit; `base` ist schneller und ungenauer, `medium` genauer und deutlich langsamer. Den Whisper-Dienst nicht öffentlich erreichbar machen – nur Flowplan spricht mit ihm.

## KI

Alles optional; die Werte gelten, bis ein Admin unter **Administration → KI** speichert. Details: [KI](/ai).

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_AI` | *aus* | `on` schaltet KI ein. |
| `FLOWPLAN_AI_PROVIDER` | *leer* | `ollama`, `openai` (OpenAI-kompatibel), `anthropic` oder `gemini`. Ist nur `OLLAMA_URL` gesetzt, gilt Ollama. |
| `OLLAMA_URL` | *leer* | Adresse von Ollama, z. B. `http://ollama:11434` mit dem Compose-Dienst. |
| `FLOWPLAN_AI_BASE_URL` | *je Anbieter* | Adresse des Anbieters, z. B. `https://api.mistral.ai/v1` für einen OpenAI-kompatiblen Dienst. |
| `FLOWPLAN_AI_MODEL` | *leer* | Modell, z. B. `llama3.1` oder `gpt-4o-mini`. |
| `FLOWPLAN_AI_EMBEDDING_MODEL` | *leer* | Modell für die Suche nach Bedeutung, z. B. `nomic-embed-text` (Ollama). Ohne: nur Volltextsuche. |
| `FLOWPLAN_AI_API_KEY` / `FLOWPLAN_AI_API_KEY_FILE` | *leer* | Schlüssel des Anbieters. Wird nie in der Datenbank gespeichert und nur für den Anbieter aus den Variablen verwendet. |
| `FLOWPLAN_AI_ACCESS` | `everyone` | `selected`: nur freigeschaltete Personen. |
| `FLOWPLAN_AI_GUESTS` | *aus* | `on`: auch Gäste dürfen KI nutzen. |
| `FLOWPLAN_AI_USER_PROVIDERS` | *aus* | `on`: Personen dürfen eigene Anbieter und Schlüssel hinterlegen. |
| `FLOWPLAN_AI_FEATURES` | *alle* | Erlaubte Funktionen, durch Komma getrennt: `write`, `summarize`, `ask`, `database`, `actions`, `whiteboard`. |
| `FLOWPLAN_AI_DEVICE` | *an* | `off`: keine [KI auf dem Gerät](/ai#ki-auf-dem-geraet-apple) in den Apps für iPhone, iPad und Mac. Unabhängig von `FLOWPLAN_AI`. |
| `FLOWPLAN_AI_SEMANTIC_SEARCH` | *aus* | `on`: [Suche nach Bedeutung](/ai#suche-nach-bedeutung-optional) mit dem Embedding-Modell. |
| `FLOWPLAN_AI_EMBED_PER_HOUR` | `5000` | Höchstzahl eingebetteter Abschnitte pro Stunde für die Suche nach Bedeutung. |
| `FLOWPLAN_AI_REQUESTS_PER_HOUR` | `300` | Höchstzahl an KI-Anfragen pro Person und Stunde (zusätzlich 30 pro Minute, 3 gleichzeitig). |

## Push-Benachrichtigungen

| Variable | Bedeutung |
| --- | --- |
| `WEB_PUSH_SUBJECT` | Kontakt für die Push-Dienste, z. B. `mailto:admin@example.com`. |
| `WEB_PUSH_PUBLIC_KEY` / `WEB_PUSH_PRIVATE_KEY` | VAPID-Schlüsselpaar. Ohne Angabe erzeugt Flowplan eines unter `FLOWPLAN_DATA_DIR/web-push-keys.json`. |
| `MOBILE_PUSH` | Mitteilungen an die Apps für iPhone, iPad und Android. Nichts einzurichten; `off` schaltet sie ganz ab. Standard: `on`. |
| `PUSH_RELAY_URL` | Das [Push-Relay](#push-relay-und-ende-zu-ende-verschluesselung), über das Mitteilungen an die Apps gehen. Nur ein HTTPS-Origin (`http` nur für `localhost`), ohne Pfad. Standard: `https://push.flowplan.org`. |
| `PUSH_RELAY` | `off`: kein Relay. Apps bekommen Mitteilungen dann nur noch, wenn sie ein Expo-Token haben (ältere App-Versionen), über den Push-Dienst von Expo. Standard: `on`. |
| `MOBILE_PUSH_CONTENT` | Ob der Text der Benachrichtigung mitkommt – und damit die Knöpfe **Erledigt** und **Morgen** an fälligen Aufgaben und **Antworten** an Kommentaren ([Knöpfe an Mitteilungen](/offline-and-apps#knoepfe-an-mitteilungen)); **Als gelesen markieren** gibt es immer. *Leer* (Standard): nur, wo er Ende-zu-Ende-verschlüsselt ist, also über das Relay; über Expo (ältere Apps) wie bei Web-Push nur „Neues im Posteingang“, Live-Aktivitäten nur mit Zeiten, ohne Titel. `on`: auch über Expo und mit Titeln in Live-Aktivitäten – lesbar für Expo, Apple und Google. `off`: nie, auch nicht über das Relay. |

Die VAPID-Schlüssel dürfen sich nicht ändern, sonst verlieren alle Browser ihr Abonnement. Ausgehendes HTTPS zu den Push-Diensten von Apple, Google und Mozilla (Web-Push) und zum Push-Relay muss möglich sein.

### Push-Relay und Ende-zu-Ende-Verschlüsselung

Mitteilungen an die Apps gehen über das Flowplan-Push-Relay (`push.flowplan.org`). Nur das Relay hat die Zugangsdaten für Apple (APNs) und Google (Firebase); deine Instanz braucht keine eigenen – auch selbst gehostete Instanzen schicken so an die Apps aus dem App Store und Google Play.

- **Ende-zu-Ende-verschlüsselt:** Jede App-Installation erzeugt pro Instanz ein Schlüsselpaar (X25519) und gibt der Instanz nur den öffentlichen Schlüssel. Die Instanz verschlüsselt jede Mitteilung damit (HKDF-SHA256, AES-256-GCM, ein neuer Einmalschlüssel je Mitteilung); erst die App auf dem Gerät entschlüsselt sie. Relay, Apple und Google sehen nur Chiffretext – dazu die Art der Mitteilung, welche Knöpfe sie hat, die Zahl am App-Symbol und wann sie geschickt wurde. Lässt sich eine Mitteilung nicht entschlüsseln, zeigt die App „Neue Mitteilung“.
- **Signiert:** Die Instanz hat ein eigenes Signaturschlüsselpaar (Ed25519), das beim ersten Gebrauch entsteht. Der private Schlüssel liegt nur verschlüsselt in der Datenbank (wie gespeicherte Geheimnisse, siehe oben); den öffentlichen veröffentlicht die Instanz unter `/.well-known/flowplan-push`. Das Relay nimmt nur signierte Anfragen an und nur für Geräte, die sich für genau diese Instanz angemeldet haben. Dafür muss `APP_URL` die öffentliche HTTPS-Adresse sein, und `/.well-known/flowplan-push` muss von außen erreichbar sein.
- **Was gespeichert wird:** Pro App-Installation das Relay-Token (nur verschlüsselt) und der öffentliche Schlüssel. Beides verschwindet mit dem Abmelden, dem Entfernen unter *Angemeldete Geräte* oder wenn das Relay meldet, dass das Gerät nicht mehr erreichbar ist. Protokolliert werden weder Tokens noch Schlüssel noch Inhalte.
- **Live-Aktivitäten** (iPhone) für Zeiterfassung und Fokus aktualisiert die Instanz ebenfalls über das Relay, wenn sich der Zustand ändert. Ihren Inhalt zeichnet iOS selbst – er lässt sich nicht verschlüsseln. Deshalb enthält er standardmäßig nur Zeiten und die Phase, keine Titel (`MOBILE_PUSH_CONTENT=on` schickt den Titel mit).
- **Ältere App-Versionen** ohne Relay bekommen Mitteilungen weiter über den Push-Dienst von Expo (`exp.host`), standardmäßig ohne Text.
- **Signaturschlüssel wechseln:** `node --import tsx scripts/push-relay-key.mjs rotate` im Repository bzw. als Administrator `POST /api/admin/operations` mit `{"action":"pushRelay.rotate"}`. Der neue Schlüssel wird sofort veröffentlicht und signiert nach gut einer Stunde; der alte bleibt 7 Tage gelistet (`--grace-days` bzw. `graceDays`). Bei einem womöglich bekannt gewordenen Schlüssel `--immediate` bzw. `"immediate": true`: der neue signiert sofort, alle alten verschwinden. `{"action":"pushRelay.keys"}` listet die Schlüssel (nur IDs und Daten). Oder unter **Administration → Push-Benachrichtigungen → Schlüssel wechseln …**.
- **Eigenes Relay:** nur zusammen mit einer eigenen App-Version – siehe [Eigenes Push-Relay betreiben](#eigenes-push-relay-betreiben).
- **Prüfen:** **Einstellungen → Benachrichtigungen → Testbenachrichtigung senden** schickt sofort über Relay, Expo und Web-Push an die eigenen Geräte und zeigt je Gerät das Ergebnis – etwa dass das Relay die Instanz nicht verifizieren konnte (`/.well-known/flowplan-push` nicht erreichbar) oder nicht erreichbar ist. Administratoren sehen dazu Relay-Adresse, ob `/.well-known/flowplan-push` aktiv ist, und die verwendete `APP_URL`. Siehe [Testbenachrichtigung](/search-and-notifications#testbenachrichtigung).
- **Zustand in der Administration:** **Administration → Push-Benachrichtigungen** zeigt das verwendete Relay (offiziell oder eigenes), ob es an ist und sonst warum, ob es gerade erreichbar ist (`/healthz`, mit Antwortzeit), ob die Instanz ihr `/.well-known/flowplan-push` unter `APP_URL` selbst abrufen kann, die Signaturschlüssel mit **Schlüssel wechseln …**, die Zustellungen der letzten 24 Stunden je Kanal und den letzten Fehler. Siehe [Administration → Push-Benachrichtigungen](/administration#push-benachrichtigungen).

**Für die Datenschutzerklärung** einer Instanz etwa: „Push-Mitteilungen an die Flowplan-Apps werden Ende-zu-Ende-verschlüsselt über den Push-Dienst von Flowplan (push.flowplan.org) und die Dienste von Apple (APNs) bzw. Google (Firebase Cloud Messaging) zugestellt. Diese Dienste erhalten ein Geräte-Token, die Adresse dieser Instanz, den Zeitpunkt und die Art der Mitteilung, nicht aber ihren Inhalt.“ – mit `MOBILE_PUSH_CONTENT=on` oder Mitteilungen über Expo entsprechend ergänzen.

### Eigenes Push-Relay betreiben

Das Relay ist Open Source ([github.com/yannicschuller/flowplan-push](https://github.com/yannicschuller/flowplan-push)) und lässt sich selbst betreiben. **Für die offiziellen Flowplan-Apps (iPhone und iPad über TestFlight, Android von [flowplan.org/download](https://flowplan.org/download)) brauchst du das nicht** – sie nehmen nur Mitteilungen über `push.flowplan.org` an, denn Apple und Google stellen an diese Apps nur mit Flowplans Schlüsseln zu. Ein eigenes Relay ist sinnvoll, wenn du **eine eigene App-Version** baust (eigene Bundle-ID, eigenes Apple-Team) oder Instanzen im internen Netz erreichen willst.

1. **Relay starten** – als Docker-Image `ghcr.io/yannicschuller/flowplan-push:latest` (oder selbst aus dem Repository gebaut), z. B. in Coolify unter `https://push.example.com`, Port `8080`, ein Volume auf `/data`. Umgebungsvariablen:

   | Variable | Wert |
   | --- | --- |
   | `RELAY_STORAGE_KEY` | `openssl rand -base64 32` – verschlüsselt die gespeicherten Geräte-Tokens |
   | `RELAY_PUBLIC_URL` | die öffentliche Adresse des Relays ohne Pfad, z. B. `https://push.example.com` (sonst gilt `https://push.flowplan.org`) |
   | `APNS_KEY_ID`, `APNS_TEAM_ID`, `APNS_KEY` | APNs-Schlüssel (`.p8`) deines Apple-Teams: Key ID, Team ID und Inhalt der Datei (auch als Base64) |
   | `ALLOWED_BUNDLE_IDS` | die Bundle-ID deiner App, z. B. `com.example.notes` |
   | `FCM_SERVICE_ACCOUNT` | optional, Dienstkonto-JSON deines Firebase-Projekts für Android |
   | `TRUST_PROXY` | `1` hinter Coolify/Traefik |
   | `ALLOW_PRIVATE_INSTANCES` | `true`, wenn Instanzen im internen Netz (private Adressen, `http://localhost`) Mitteilungen schicken sollen – laut README des Relays nur für Entwicklung und geschlossene Netze gedacht |

   `https://push.example.com/healthz` antwortet mit `{"status":"ok"}`; im Log steht beim Start, ob APNs und FCM eingerichtet sind.
2. **App bauen** – mit deiner Bundle-ID und deinem Apple-Team sowie `PUSH_RELAY_URL=https://push.example.com` (Build-Variable der App) und für Android deiner `google-services.json`. Die App meldet sich nur bei dem Relay an, mit dem sie gebaut wurde.
3. **Instanz einstellen** – `PUSH_RELAY_URL=https://push.example.com`. `APP_URL` muss die HTTPS-Adresse der Instanz sein und `/.well-known/flowplan-push` für das Relay erreichbar. Eine Instanz kann nur ein Relay nutzen: Zeigt sie auf dein Relay, bekommen die Store-Apps von ihr keine Mitteilungen mehr über das Relay.
4. **Prüfen** – mit der [Testbenachrichtigung](/search-and-notifications#testbenachrichtigung).

Betrieb, Schlüsselwechsel, Sperren missbräuchlicher Instanzen (`node dist/src/cli.js block <origin>` im Container) und Sicherungen beschreibt die README des Relays.

## Chat-Apps

Benachrichtigungen an [Telegram, Gotify, ntfy und Matrix](/search-and-notifications#chat-apps). Alles lässt sich auch unter **Administration → Chat-Apps** einstellen; dort gespeicherte Werte haben Vorrang.

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_MESSENGERS` | *alle* | Dienste, die Personen verbinden dürfen, durch Komma getrennt: `telegram`, `gotify`, `ntfy`, `matrix`; `off` für keinen. |
| `FLOWPLAN_TELEGRAM_BOT_TOKEN` | *leer* | Token des Telegram-Bots der Instanz (von @BotFather). Damit verbinden Personen Telegram über einen Link mit Einmal-Code, ohne eigenen Bot. |
| `FLOWPLAN_TELEGRAM_API_URL` | `https://api.telegram.org` | Adresse der Bot-API für den Bot der Instanz – ein selbst betriebener [Telegram-Bot-API-Server](https://github.com/tdlib/telegram-bot-api) oder ein Relay/Proxy. Darf im eigenen Netz liegen und `http://` sein. |
| `FLOWPLAN_MESSENGER_ALLOW_PRIVATE` | wie `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE` | `true`: Personen dürfen Server im eigenen Netz angeben (interne Adressen, `http://`) – etwa Gotify oder ntfy im Heimnetz. Sonst sind interne Adressen gesperrt, auch wenn ein Name später auf eine umgestellt wird. |

**Bot der Instanz ohne öffentliche Adresse:** Flowplan nutzt keinen Webhook, sondern fragt die Nachrichten des Bots mit `getUpdates` ab – nur solange ein Verbindungscode wartet (höchstens 15 Minuten). Ausgehendes HTTPS zur Bot-API genügt. Der Bot darf deshalb nicht gleichzeitig einen Webhook haben oder von einem anderen Programm abgefragt werden (Telegram meldet dann einen Konflikt, die Administration zeigt ihn an) – nimm einen eigenen Bot nur für Flowplan.

**Ausgehende Verbindungen:** zu `api.telegram.org` (oder der eigenen API-Adresse), `ntfy.sh` und den Servern, die Personen angeben. Sie laufen über dieselbe Prüfung wie Link-Vorschauen und Webhooks: Adresse auflösen, interne Adressen abweisen, genau die geprüfte Adresse verwenden, keine Weiterleitungen. Abgewiesene Versuche erscheinen als Sicherheitsereignis „Interne Adresse abgewiesen (SSRF)“.

Die Tokens der Personen und des Bots speichert Flowplan verschlüsselt wie andere [gespeicherte Geheimnisse](#gespeicherte-geheimnisse). Fehlt der Schlüssel nach einer Wiederherstellung, muss die Administration den Bot-Token neu eingeben; Verbindungen mit eigenem Token werden nach drei Fehlversuchen ausgeschaltet, und ihre Besitzer erfahren es im Posteingang.

## Nicht setzen

`NODE_ENV`, `PORT`, `HOSTNAME` und `NEXT_TELEMETRY_DISABLED` setzt das Image selbst. `FLOWPLAN_DIST_DIR` ist nur für parallele Entwicklungsserver gedacht, `OIDC_ALLOW_LOCAL_HTTP` nur für Tests mit einem Anbieter auf `http://localhost`, `FLOWPLAN_GIT_ALLOW_HTTP` nur für Tests des Git-Exports mit einem `http://`-Server (in Produktion wirkungslos). Version und Commit (`FLOWPLAN_VERSION`, `GIT_COMMIT`, `SOURCE_COMMIT`) kommen aus dem Build; `FLOWPLAN_VERSION` in der `.env` wählt nur das Image-Tag in `compose.yaml`.

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
