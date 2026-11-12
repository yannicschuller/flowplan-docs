---
keywords: Render, DigitalOcean, cloud-init, VPS, Installationsskript, ein Klick
---

# Mit einem Klick bereitstellen

Noch kein eigener Server? Drei Wege zu einer laufenden Instanz, ohne Docker von Hand einzurichten. Alle nutzen dasselbe Image wie die Compose-Datei weiter unten.

| Weg | Daten | HTTPS und Adresse |
| --- | --- | --- |
| [Render](#render) | SQLite auf einer dauerhaften Disk | Automatisch, `https://<name>.onrender.com` oder deine Domain |
| [DigitalOcean App Platform](#digitalocean-app-platform) | PostgreSQL (Dev-Datenbank), Dateien in einem Spaces-Bucket | Automatisch, `https://<name>.ondigitalocean.app` oder deine Domain |
| [Jeder Server](#jeder-server-cloud-init-oder-installationsskript) (Hetzner, Netcup, IONOS …) | SQLite in einem Docker-Volume auf dem Server | Caddy mit einem Let's-Encrypt-Zertifikat für deine Domain |

## Render

**[Bei Render bereitstellen →](https://render.com/deploy?repo=https://github.com/yannicschuller/flowplan)**

Der Button liest den Blueprint [`render.yaml`](https://github.com/yannicschuller/flowplan/blob/main/render.yaml) aus dem Repository: ein Webdienst aus dem Image `ghcr.io/yannicschuller/flowplan:latest` in Frankfurt, eine 5-GB-Disk auf `/app/data` und der Health Check auf `/api/health`.

1. Button anklicken, bei Render anmelden und den Blueprint bestätigen. Die SMTP-Felder dürfen leer bleiben (siehe [E-Mail](/configuration-integrations#e-mail-smtp)).
2. Render erzeugt `FLOWPLAN_SETUP_TOKEN`. Ist der Deploy fertig, kopierst du ihn im Tab **Environment** des Dienstes und öffnest `https://<name>.onrender.com/register?setup=<token>` – dieses erste Konto verwaltet die Instanz.

**Kosten:** Dauerhafte Disks gibt es nur mit einer bezahlten Instanz – der Blueprint nimmt **Starter**, die kleinste mit Disk; die Disk wird zusätzlich pro GB abgerechnet (siehe Preise bei Render). Für mehr als eine Handvoll Personen wähl eine größere Instanz ([Dimensionierung](/sizing)). Auf der kostenlosen Instanz gingen die Daten bei jedem Neustart verloren.

**Adresse:** Ohne `APP_URL` nimmt Flowplan Renders eigene Adresse (`RENDER_EXTERNAL_URL`). Für deine Domain trägst du sie unter **Settings → Custom Domains** ein und setzt unter **Environment** `APP_URL=https://flowplan.example.com` – am besten vor dem ersten Konto, denn Passkeys sind an die Adresse gebunden.

**Daten und Updates:** Alles liegt auf der Disk – einen Dienst mit Disk betreibt Render als genau eine Instanz und hält ihn bei jedem Deploy kurz an. Render hebt Snapshots der Disk auf; für Sicherungen außerhalb von Render kommt S3 dazu ([Speicher, S3 und Sicherung](/storage-and-backups)). Zum Aktualisieren startest du einen **Manual Deploy**: Render holt das Image `:latest` neu.

## DigitalOcean App Platform

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

## Jeder Server: cloud-init oder Installationsskript

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

**Ohne Domain** (`FLOWPLAN_DOMAIN=` leer gelassen oder das Skript ohne Argument) startet Flowplan unter `http://<Serveradresse>` ohne Zertifikat – gut für einen Test, siehe [Ohne HTTPS](/installation#ohne-https). Für eine Domain später den DNS-Eintrag auf den Server zeigen lassen und das Skript mit der Domain erneut ausführen: Es setzt `APP_URL` und das `Caddyfile` und behält Daten und Geheimnisse. Am besten vor dem ersten Konto, denn Passkeys sind an die Adresse gebunden.

Weitere Einstellungen (E-Mail, Single Sign-on, S3) gehören in `/opt/flowplan/.env`, danach `docker compose up -d` in `/opt/flowplan` – siehe [Konfiguration](/configuration).
