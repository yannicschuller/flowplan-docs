# Installation mit Docker

Flowplan läuft als ein einziger Container mit SQLite und einem Datenverzeichnis. Postgres, Redis oder ein separater Suchdienst werden nicht gebraucht – PostgreSQL und mehrere Instanzen sind möglich, aber optional.

## Voraussetzungen

- Ein Server mit Docker und einem dauerhaften Volume. Die Texterkennung gescannter PDFs braucht beim Hochladen kurzzeitig spürbar CPU.
- Schon eine Instanz auf einem anderen Server? Dann nach der Installation [umziehen](/move-instance) statt neu anfangen.
- Eine Domain mit HTTPS über einen Reverse Proxy (Traefik, Caddy, nginx, Coolify, Pangolin …). Zum reinen Ausprobieren geht es auch ohne, siehe [Ohne HTTPS](#ohne-https).
- Optional ein OpenID-Connect-Anbieter für Single Sign-on. Ohne ihn melden sich Personen mit E-Mail und Passwort oder Passkey an, siehe [Anmeldung](/sign-in).
- Optional: ein S3-kompatibler Speicher für Dateien und die laufende Datenbanksicherung, siehe [Speicher, S3 und Sicherung](/storage-and-backups).
- Optional: eine PostgreSQL-Datenbank statt SQLite, siehe [PostgreSQL](/postgresql). Wie viel Hardware du für wie viele Personen brauchst, steht unter [Dimensionierung](/sizing).

## Mit einem Klick bereitstellen

Noch kein eigener Server? Drei Wege zu einer laufenden Instanz, ohne Docker von Hand einzurichten. Alle nutzen dasselbe Image wie die Compose-Datei weiter unten.

| Weg | Daten | HTTPS und Adresse |
| --- | --- | --- |
| [Render](#render) | SQLite auf einer dauerhaften Disk | Automatisch, `https://<name>.onrender.com` oder deine Domain |
| [DigitalOcean App Platform](#digitalocean-app-platform) | PostgreSQL (Dev-Datenbank), Dateien in einem Spaces-Bucket | Automatisch, `https://<name>.ondigitalocean.app` oder deine Domain |
| [Jeder Server](#jeder-server-cloud-init-oder-installationsskript) (Hetzner, Netcup, IONOS …) | SQLite in einem Docker-Volume auf dem Server | Caddy mit einem Let's-Encrypt-Zertifikat für deine Domain |

### Render

**[Bei Render bereitstellen →](https://render.com/deploy?repo=https://github.com/yannicschuller/flowplan)**

Der Button liest den Blueprint [`render.yaml`](https://github.com/yannicschuller/flowplan/blob/main/render.yaml) aus dem Repository: ein Webdienst aus dem Image `ghcr.io/yannicschuller/flowplan:latest` in Frankfurt, eine 5-GB-Disk auf `/app/data` und der Health Check auf `/api/health`.

1. Button anklicken, bei Render anmelden und den Blueprint bestätigen. Die SMTP-Felder dürfen leer bleiben (siehe [E-Mail](/configuration#e-mail-smtp)).
2. Render erzeugt `FLOWPLAN_SETUP_TOKEN`. Ist der Deploy fertig, kopierst du ihn im Tab **Environment** des Dienstes und öffnest `https://<name>.onrender.com/register?setup=<token>` – dieses erste Konto verwaltet die Instanz. Enthält der Token ein `+`, schreib es in der Adresse als `%2B`.

**Kosten:** Dauerhafte Disks gibt es nur mit einer bezahlten Instanz – der Blueprint nimmt **Starter**, die kleinste mit Disk; die Disk wird zusätzlich pro GB abgerechnet (siehe Preise bei Render). Für mehr als eine Handvoll Personen wähl eine größere Instanz ([Dimensionierung](/sizing)). Auf der kostenlosen Instanz gingen die Daten bei jedem Neustart verloren.

**Adresse:** Ohne `APP_URL` nimmt Flowplan Renders eigene Adresse (`RENDER_EXTERNAL_URL`). Für deine Domain trägst du sie unter **Settings → Custom Domains** ein und setzt unter **Environment** `APP_URL=https://flowplan.example.com` – am besten vor dem ersten Konto, denn Passkeys sind an die Adresse gebunden.

**Daten und Updates:** Alles liegt auf der Disk – einen Dienst mit Disk betreibt Render als genau eine Instanz und hält ihn bei jedem Deploy kurz an. Render hebt Snapshots der Disk auf; für Sicherungen außerhalb von Render kommt S3 dazu ([Speicher, S3 und Sicherung](/storage-and-backups)). Zum Aktualisieren startest du einen **Manual Deploy**: Render holt das Image `:latest` neu.

### DigitalOcean App Platform

**[Bei DigitalOcean bereitstellen →](https://cloud.digitalocean.com/apps/new?repo=https://github.com/yannicschuller/flowplan/tree/main)**

Der Button liest [`.do/deploy.template.yaml`](https://github.com/yannicschuller/flowplan/blob/main/.do/deploy.template.yaml): ein Dienst aus dem Image, eine PostgreSQL-16-Dev-Datenbank und der Health Check auf `/api/health`, in Frankfurt (`fra`).

App Platform hat **keine dauerhaften Volumes**: Die Disk des Containers wird bei jedem Deploy und Neustart zurückgesetzt. Deshalb nutzt die Vorlage PostgreSQL statt SQLite (`DATABASE_URL` zeigt auf die Datenbank) und erwartet einen Bucket für Dateien:

- **Uploads:** Leg einen Spaces-Bucket und einen Spaces-Zugangsschlüssel an und trag `S3_BUCKET`, `S3_ACCESS_KEY_ID` und `S3_SECRET_ACCESS_KEY` ein (`S3_ENDPOINT` ist für Frankfurt vorbelegt, `https://fra1.digitaloceanspaces.com`). Flowplan legt dann jede Datei in den Bucket und holt fehlende nach einem Deploy von dort zurück. **Ohne Bucket gehen hochgeladene Dateien beim nächsten Deploy verloren.**
- **`FLOWPLAN_SETUP_TOKEN`** (erzeugen mit `openssl rand -hex 24`): das erste Konto nur über `<Adresse>/register?setup=<token>`.
- **`FLOWPLAN_ENCRYPTION_KEY`** (erzeugen mit `openssl rand -base64 32`): verschlüsselt die Dateien im Bucket und schützt gespeicherte Geheimnisse wie API-Schlüssel. Er muss hier gesetzt sein, weil eine `secrets.key` auf der Disk des Containers bei jedem Deploy neu entstünde. Bewahr eine Kopie im Passwortmanager auf.
- Optional `WEB_PUSH_PUBLIC_KEY` und `WEB_PUSH_PRIVATE_KEY` (`npx web-push generate-vapid-keys`): Ohne sie entstehen bei jedem Deploy neue Schlüssel, und Push im Browser schweigt, bis man ihn wieder einschaltet. Push an die Apps ist davon nicht betroffen.

App Platform kann keine Geheimnisse selbst erzeugen, deshalb trägst du diese Werte beim Anlegen der App ein (oder später in den **Settings → Environment Variables** der Komponente). `APP_URL` ist App Platforms `${APP_URL}`: die Adresse unter `ondigitalocean.app` oder deine Domain, sobald du sie unter **Settings → Domains** eingetragen hast – danach einmal neu deployen.

**Datenbank:** Eine Dev-Datenbank hat **keine Sicherungen** und ist zum Ausprobieren gedacht. Für den Betrieb rüstest du sie zu einem verwalteten Datenbank-Cluster auf oder hängst einen vorhandenen mit PostgreSQL 16 oder neuer an ([PostgreSQL](/postgresql)). Das Image bringt `pg_dump` und `pg_restore` mit, Flowplans eigene geplante Sicherungen laufen also auch mit PostgreSQL – mit Bucket landen sie dort ([Speicher, S3 und Sicherung](/storage-and-backups)). Die Verbindung ist verschlüsselt; `uselibpqcompat=true` in `DATABASE_URL` akzeptiert DigitalOceans eigene Zertifizierungsstelle, so wie `psql` mit `sslmode=require`. Meldet das Log `permission denied for schema public`, darf die Rolle der Dev-Datenbank keine Tabellen anlegen – dann einen verwalteten Datenbank-Cluster nehmen, dort darf es der Eigentümer der Datenbank ([Rolle ohne Superuser-Rechte](/postgresql#rolle-ohne-superuser-rechte)).

**Updates:** Starte einen neuen Deploy (**Actions → Force Rebuild and Deploy**); App Platform holt das Image `:latest` neu.

### Jeder Server: cloud-init oder Installationsskript

Für einen virtuellen Server (VPS) mit **Ubuntu 24.04 oder Debian 12** bei einem beliebigen Anbieter. Die meisten – Hetzner Cloud, Netcup, IONOS, DigitalOcean Droplets, Vultr, Scaleway, OVHcloud – nehmen beim Anlegen des Servers eine cloud-init-Datei als **„User Data“** oder **„Cloud Config“** an.

1. Den DNS-Eintrag deiner Domain (A, für IPv6 auch AAAA) auf den Server zeigen lassen – bei einem neuen Server, sobald du seine Adresse kennst.
2. [`deploy/cloud-init.yaml`](https://github.com/yannicschuller/flowplan/blob/main/deploy/cloud-init.yaml) kopieren, die eine Zeile `FLOWPLAN_DOMAIN=flowplan.example.com` setzen und beim Anlegen des Servers als User Data einfügen.
3. Nach ein paar Minuten per SSH anmelden und `/root/flowplan-README.txt` lesen: Dort stehen die Adresse und der Link für das erste Konto. Den Fortschritt protokolliert `/var/log/flowplan-install.log`.

Auf einem Server, der schon läuft, erledigt das Installationsskript dasselbe:

```bash
curl -fsSL https://raw.githubusercontent.com/yannicschuller/flowplan/main/deploy/install.sh | sudo bash -s -- flowplan.example.com
```

Was das Skript einrichtet:

- **Docker** mit dem Compose-Plugin aus Dockers eigenem Paket-Repository (übersprungen, wenn es schon da ist).
- **`/opt/flowplan`** mit `compose.yaml` (Flowplan und [Caddy](https://caddyserver.com), das sich das HTTPS-Zertifikat selbst holt und erneuert), dem `Caddyfile` und einer `.env`, die nur root lesen darf. Ihre Geheimnisse erzeugt `openssl` auf dem Server: `FLOWPLAN_SETUP_TOKEN` und `FLOWPLAN_ENCRYPTION_KEY` – bewahr eine Kopie des Schlüssels im Passwortmanager auf, verschlüsselte Sicherungen lassen sich ohne ihn nicht lesen.
- **Die Daten** im Docker-Volume `flowplan-data`. Sie überstehen Updates und Neustarts; für Sicherungen außerhalb des Servers kommt S3 oder SFTP dazu ([Speicher, S3 und Sicherung](/storage-and-backups)).
- **Firewall** (ufw): Nur SSH, 80 und 443 bleiben offen. Auf einem Server mit eigener Firewall startest du das Skript mit `FLOWPLAN_FIREWALL=off`. Die Ports 80 und 443 müssen frei sein – belegt sie schon ein anderer Webserver, stell Flowplan stattdessen hinter ihn ([Coolify und Reverse Proxys](/coolify-and-proxy)).
- **Automatische Sicherheitsupdates** des Systems (unattended-upgrades).
- **Image-Updates sind anfangs aus:** Du aktualisierst, wann es dir passt, mit `cd /opt/flowplan && docker compose pull && docker compose up -d` – die Administration meldet neue Releases. Für ein automatisches Update jede Woche (Sonntagnacht) setzt du `FLOWPLAN_AUTO_UPDATE=weekly` in der cloud-init-Datei (oder vor `bash` im Befehl) oder später `systemctl enable --now flowplan-update.timer`.

**Ohne Domain** (`FLOWPLAN_DOMAIN=` leer gelassen oder das Skript ohne Argument) startet Flowplan unter `http://<Serveradresse>` ohne Zertifikat – gut für einen Test, siehe [Ohne HTTPS](#ohne-https). Für eine Domain später den DNS-Eintrag auf den Server zeigen lassen und das Skript mit der Domain erneut ausführen: Es setzt `APP_URL` und das `Caddyfile` und behält Daten und Geheimnisse. Am besten vor dem ersten Konto, denn Passkeys sind an die Adresse gebunden.

Weitere Einstellungen (E-Mail, Single Sign-on, S3) gehören in `/opt/flowplan/.env`, danach `docker compose up -d` in `/opt/flowplan` – siehe [Konfiguration](/configuration).

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
# Empfohlen, sobald die Adresse aus dem Internet erreichbar ist: openssl rand -hex 24
FLOWPLAN_SETUP_TOKEN=
```

Mit `FLOWPLAN_SETUP_TOKEN` legst du das erste Konto über `https://flowplan.example.com/register?setup=<token>` an; ohne den Link bietet die neue Instanz weder Registrierung noch Wiederherstellen an. Fehlt der Token und ist `APP_URL` keine lokale Adresse, warnt Flowplan beim Start im Log und auf dem Einrichtungsbildschirm.

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

**Umzug oder Neuinstallation?** Statt des ersten Kontos bietet der Einrichtungsbildschirm **Aus Sicherung wiederherstellen**: eine Sicherungsdatei hochladen oder die neueste Sicherung aus S3 oder per SFTP holen, verschlüsselte mit dem Schlüssel der alten Instanz. Danach meldest du dich mit den Konten der Sicherung an ([Beim Einrichten wiederherstellen](/storage-and-backups#beim-einrichten-wiederherstellen)). Für einen Umzug von einer laufenden Instanz gibt es außerdem [Instanz umziehen](/move-instance).

> [!WARNING]
> Mit SQLite läuft **genau eine Instanz**. Mehrere Replikate würden dieselbe SQLite-Datei beschreiben. Nicht einfach horizontal skalieren; bei Updates den alten Container vor dem neuen stoppen. Mehrere Instanzen gehen nur im [Cluster-Modus](/cluster) mit PostgreSQL, Redis und S3.

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
- Das Chart erzeugt einen zufälligen `FLOWPLAN_SETUP_TOKEN` (bleibt bei Upgrades erhalten; eigener Wert mit `setupToken` oder im `existingSecret`). Das erste Konto legst du über den Einrichtungslink an, den `helm install` am Ende ausgibt: `https://flowplan.example.org/register?setup=<token>`, den Token liest `kubectl -n flowplan get secret flowplan -o jsonpath='{.data.FLOWPLAN_SETUP_TOKEN}' | base64 -d`.
- Ein Block- oder lokales Volume verwenden, kein NFS (SQLite).
- Health-Checks laufen über `/api/health`; der Pod läuft als Nutzer 1000 ohne zusätzliche Rechte. `helm test flowplan` prüft die Erreichbarkeit.
- Das Volume bleibt beim Deinstallieren erhalten.
- Aktualisieren: im Repository `git pull`, dann `helm upgrade flowplan deploy/helm/flowplan -n flowplan --reuse-values`.

Alle Werte erklärt das README des Charts. Mehrere Pods mit PostgreSQL, Redis und S3 (`cluster.enabled=true`): siehe [Cluster-Modus](/cluster#kubernetes-helm). Die Datenbankrolle in `DATABASE_URL` sollte dabei die Datenbank besitzen, aber kein Superuser sein ([Rolle ohne Superuser-Rechte](/postgresql#rolle-ohne-superuser-rechte)).

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
- [PostgreSQL](/postgresql) und [Cluster-Modus](/cluster): für größere Teams.
