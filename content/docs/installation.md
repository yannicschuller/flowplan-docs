# Installation mit Docker

Flowplan läuft als ein einziger Container mit SQLite und einem Datenverzeichnis. Postgres, Redis oder ein separater Suchdienst werden nicht gebraucht.

## Voraussetzungen

- Ein Server mit Docker und einem dauerhaften Volume. Die Texterkennung gescannter PDFs braucht beim Hochladen kurzzeitig spürbar CPU.
- Schon eine Instanz auf einem anderen Server? Dann nach der Installation [umziehen](/move-instance) statt neu anfangen.
- Eine Domain mit HTTPS über einen Reverse Proxy (Traefik, Caddy, nginx, Coolify, Pangolin …). Zum reinen Ausprobieren geht es auch ohne, siehe [Ohne HTTPS](#ohne-https).
- Optional ein OpenID-Connect-Anbieter für Single Sign-on. Ohne ihn melden sich Personen mit E-Mail und Passwort oder Passkey an, siehe [Anmeldung](/sign-in).
- Optional: ein S3-kompatibler Speicher für Dateien und die laufende Datenbanksicherung, siehe [Speicher, S3 und Sicherung](/storage-and-backups).

## Mit Docker Compose

Flowplan ist Open Source (AGPL-3.0). Das fertige Image liegt in der GitHub Container Registry, für `linux/amd64` und `linux/arm64`:

| Tag | Inhalt |
| --- | --- |
| `ghcr.io/yannicschuller/flowplan:latest` | Neueste Version (Release) |
| `ghcr.io/yannicschuller/flowplan:0.7.0` | Feste Version (derzeit 0.7.0), auch als `:0.7` und `:0` |
| `ghcr.io/yannicschuller/flowplan:beta` | Letzter manuell gestarteter Entwicklungsstand oder ein neueres Release – zum Ausprobieren, nicht für den Betrieb |

Compose-Datei und Beispielkonfiguration herunterladen:

```bash
mkdir flowplan && cd flowplan
curl -O https://raw.githubusercontent.com/yannicschuller/flowplan/main/compose.yaml
curl -o .env https://raw.githubusercontent.com/yannicschuller/flowplan/main/.env.example
```

In `.env` mindestens die öffentliche Adresse setzen:

```dotenv
APP_URL=https://flowplan.example.com
```

Für Single Sign-on zusätzlich `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET` und `OIDC_ADMIN_GROUP` (siehe [Anmeldung](/sign-in)); für E-Mails (Einladungen, Passwort vergessen) die `SMTP_*`-Werte aus der [Konfiguration](/configuration#e-mail-smtp).

```bash
docker compose up -d
```

Der Container lauscht auf Port `3000` (in der Compose-Datei nur an `127.0.0.1` gebunden, damit der Proxy davor sitzt). Das Volume `flowplan-data` auf `/app/data` hält alle Inhalte unabhängig vom Container. Eine feste Version wählst du mit `FLOWPLAN_VERSION=0.7.0` in der `.env`.

> [!NOTE]
> Eine Instanz öffnet direkt mit der Anmeldung. Die Webseite [flowplan.org](https://flowplan.org) und diese Dokumentation sind eigene Projekte; die gehostete Instanz läuft unter [app.flowplan.org](https://app.flowplan.org).

## Image selbst bauen

Aus dem Quellcode ([github.com/yannicschuller/flowplan](https://github.com/yannicschuller/flowplan)):

```bash
git clone https://github.com/yannicschuller/flowplan.git && cd flowplan
cp .env.example .env
docker compose up -d --build
```

Oder ohne Compose:

```bash
docker build -t flowplan:latest .
docker run -d --name flowplan \
  -p 127.0.0.1:3000:3000 \
  -v flowplan-data:/app/data \
  --env-file .env \
  flowplan:latest
```

Das Image enthält Node, Litestream für die S3-Sicherung und `curl` für den Healthcheck. Es läuft als Benutzer `node` (UID 1000).

## Erster Start

1. `https://flowplan.example.com/api/health` aufrufen – die Antwort ist `200` mit `"status":"ok"`.
2. Die Adresse im Browser öffnen: Eine neue Instanz bietet **Konto erstellen** an. Dieses erste Konto verwaltet die Instanz. Ist die Adresse aus dem Internet erreichbar, setze vorher `FLOWPLAN_SETUP_TOKEN` und lege das Konto über `/register?setup=<token>` an – sonst könnte dir jemand zuvorkommen ([Anmeldung](/sign-in#e-mail-und-passwort)). (Mit Single Sign-on: **Mit SSO anmelden**; Admin ist, wer in der Gruppe aus `OIDC_ADMIN_GROUP` ist.)
3. In der Seitenleiste unter **Administration** Instanzname, Upload-Grenze, Registrierung und die [weiteren Einstellungen](/administration) setzen.

> [!WARNING]
> Flowplan ist für **genau eine laufende Instanz** gebaut. Mehrere Replikate würden dieselbe SQLite-Datei beschreiben. Nicht horizontal skalieren; bei Updates den alten Container vor dem neuen stoppen.

## Ohne HTTPS

Nur zum Ausprobieren: Flowplan läuft auch unter einer reinen `http://`-Adresse, etwa `APP_URL=http://192.168.1.20:3000` im eigenen Netz. `APP_URL` muss dann genau diese Adresse sein – mit `http://` und Port.

Die Anmeldeseite und **Administration → Instanz** zeigen dann den Hinweis „Diese Instanz läuft ohne HTTPS“. Für einen Test ist das in Ordnung, für den echten Betrieb nicht:

- **Passwörter gehen unverschlüsselt durchs Netz** – jeder im selben Netz kann sie mitlesen.
- **Passkeys, die Offline-Kopie, Push sowie Kamera, Mikrofon und Zwischenablage** gibt es im Browser nur über HTTPS. Flowplan blendet sie dann aus oder sagt, warum sie fehlen.
- **Die Apps für iPhone, iPad und Android** verbinden sich ohne HTTPS nur mit einer Instanz im lokalen Netz (z. B. `http://192.168.1.20:3000`, `http://nas` oder `http://nas.local`) und warnen vorher. Auf iPhone und iPad gehen `.lan`- oder `.home.arpa`-Namen nicht – dort die IP-Adresse eintragen. Siehe [Instanz im eigenen Netz ohne HTTPS](/offline-and-apps#instanz-im-eigenen-netz-ohne-https).
- Cookies tragen kein `Secure`-Kennzeichen, und der Browser stuft Anfragen nicht auf HTTPS hoch.

Unter `http://localhost` oder `http://127.0.0.1` auf dem eigenen Rechner erscheint kein Hinweis: Browser behandeln diese Adressen wie eine sichere Verbindung.

Für den echten Betrieb einen Reverse Proxy mit Zertifikat davorsetzen (siehe [Coolify und Reverse Proxy](/coolify-and-proxy)) und `APP_URL` auf die `https://`-Adresse umstellen. Mit Caddy reichen zwei Zeilen; Caddy holt das Zertifikat selbst.

> [!NOTE]
> Bis 0.8.0 verlangte Flowplan HTTPS stillschweigend: Unter einer `http://`-Adresse fehlten Gestaltung und Skripte, und das Registrierungsformular blieb einfach stehen. Das ist behoben – Formulare mit Passwort senden außerdem nie mehr Zugangsdaten in der Adresszeile.

## Aktualisieren

Gibt es ein neueres Release, zeigt die **Administration** einen Hinweis mit der neuen Versionsnummer und einem Link zu den Änderungen (abschaltbar mit `FLOWPLAN_UPDATE_CHECK=false`, siehe [Konfiguration](/configuration)). Mit dem Image-Tag `:latest` genügt dann:

```bash
docker compose pull
docker compose up -d
```

Beim selbst gebauten Image stattdessen `git pull` und `docker compose up -d --build`.

Beim Start migriert Flowplan die Datenbank selbst. Vorher eine Sicherung anlegen (siehe [Speicher, S3 und Sicherung](/storage-and-backups)); ein Zurückgehen auf eine ältere Version nach einer Migration ist nicht vorgesehen.

### Auf 0.7.0 aktualisieren

Von Hand ist nichts zu tun; die neuen Tabellen (etwa für Idempotenz-Schlüssel und den Push-Relay) legt Flowplan beim Start an. Was sich für den Betrieb ändert:

- **API-Beschreibung nur noch mit Anmeldung:** `/api/openapi.json` und `/api/docs` brauchen eine Anmeldung oder ein API-Token. Öffentlich wie bisher mit `FLOWPLAN_PUBLIC_API_DOCS=true` (siehe [OpenAPI und SDKs](/api-and-webhooks#openapi-und-sdks)).
- **Gesundheitsprüfung knapper:** `/api/health` antwortet ohne Token nur noch mit `{"service":"flowplan","status":"ok"}`; Details gibt es mit `FLOWPLAN_METRICS_TOKEN` (siehe [Healthcheck](/operations#healthcheck)).
- **Push an die Apps über den Push-Relay:** Benachrichtigungen an die Apps laufen Ende-zu-Ende-verschlüsselt über `push.flowplan.org`. Dafür muss `APP_URL` die öffentliche HTTPS-Adresse sein und ausgehendes HTTPS zum Relay möglich – siehe [Push-Relay](/configuration#push-relay-und-ende-zu-ende-verschluesselung).
- **Nutzungsstatistik:** Die Überwachung zählt Anfragen, aktive Personen und Speicher – nur Zahlen. Abschalten mit `FLOWPLAN_METRICS=off` oder in der Administration (siehe [Statistik](/operations#statistik)).

## Kubernetes (Helm)

Das Chart liegt im Repository unter [`deploy/helm/flowplan`](https://github.com/yannicschuller/flowplan/tree/main/deploy/helm/flowplan). Flowplan läuft dort als **genau ein Pod** (SQLite) mit einem Volume für `/app/data`; Updates ersetzen den Pod mit kurzer Unterbrechung (Strategie `Recreate`). Das Chart (Version 0.1.0) installiert Flowplan 0.7.0 (`appVersion`); eine andere Version wählst du mit `--set image.tag=…`.

```bash
kubectl create namespace flowplan
kubectl -n flowplan create secret generic flowplan-env \
  --from-literal=FLOWPLAN_ENCRYPTION_KEY="$(openssl rand -base64 32)"
helm install flowplan deploy/helm/flowplan -n flowplan \
  --set appUrl=https://flowplan.example.org \
  --set existingSecret=flowplan-env \
  --set ingress.enabled=true \
  --set ingress.hosts[0].host=flowplan.example.org
```

- OIDC, SMTP und S3 setzt du über `oidc.*`, `smtp.*` und `s3.*`; Geheimnisse besser im `existingSecret` (Schlüssel = Namen der [Umgebungsvariablen](/configuration)). Weitere Variablen über `env`.
- `appUrl` ist Pflicht (oder kommt aus dem ersten Ingress-Host).
- Ein Block- oder lokales Volume verwenden, kein NFS (SQLite).
- Health-Checks laufen über `/api/health`; der Pod läuft als Nutzer 1000 ohne zusätzliche Rechte. `helm test flowplan` prüft die Erreichbarkeit.
- Das Volume bleibt beim Deinstallieren erhalten.
- Aktualisieren: im Repository `git pull`, dann `helm upgrade flowplan deploy/helm/flowplan -n flowplan --reuse-values`.

Alle Werte erklärt das README des Charts.

## Ohne Docker

Node.js 22.13 oder neuer (Node 24 LTS empfohlen):

```bash
npm ci
npm run build
FLOWPLAN_DATA_DIR=/var/lib/flowplan npm start
```

Für die lokale Entwicklung reicht `npm run dev`. Der Entwicklungsmodus bietet zusätzlich **Lokalen Arbeitsbereich öffnen** an, ein gemeinsames Beispielkonto; im Produktionsmodus gibt es diesen Zugang nicht.

## Weiter

- [Konfiguration](/configuration): alle Umgebungsvariablen.
- [Coolify und Reverse Proxy](/coolify-and-proxy): Betrieb hinter Traefik, Coolify oder Pangolin.
- [Instanz umziehen](/move-instance): auf einen anderen Server, mit Beispiel für Hetzner Cloud.
