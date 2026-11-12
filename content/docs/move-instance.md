---
keywords: Umzug, neuer Server, Hetzner, DNS, Instanz umziehen
---

# Instanz umziehen

So bringst du eine ganze Flowplan-Instanz auf einen anderen Server – etwa vom Heimserver auf einen gemieteten Server –, mit allen Konten, Arbeitsbereichen, Dateien und Schlüsseln und meist nur wenigen Minuten Ausfallzeit.

Eine Flowplan-Instanz besteht aus genau vier Dingen:

| Teil | Was | Zieht mit um |
| --- | --- | --- |
| Container | das Image `ghcr.io/yannicschuller/flowplan` (für `linux/amd64` und `linux/arm64`) | neu installieren, dieselbe oder eine neuere Version |
| Datenordner `/app/data` | `flowplan.sqlite` (+ `-wal`, `-shm`), `uploads/`, `web-push-keys.json`, `secrets.key`; `ocr/` und `tmp/` entstehen neu | ja – das ist der eigentliche Umzug |
| Umgebungsvariablen | `APP_URL`, Schlüssel, `OIDC_*`, `S3_*`, `SMTP_*` … | von Hand übernehmen, **vor allem die Schlüssel** |
| Domain und Reverse Proxy | DNS-Eintrag, HTTPS-Zertifikat | DNS umstellen, Proxy neu einrichten |

Das gilt für jede Art des Betriebs: `docker run`, Docker Compose, Kubernetes mit dem [Helm-Chart](/installation#kubernetes-helm), ohne Docker oder in einem Verwaltungs-Panel. Nutzt du ein Panel, legst du dort denselben Container mit demselben Volume und denselben Variablen neu an.

**Mehr zum Thema:** [Umzug mit dem Umzugswerkzeug](/move-instance-tool)

## Vorbereiten

::: steps

1. **Umgebungsvariablen aufschreiben.** Alle, die die alte Instanz bekommt – je nach Betrieb aus der `.env`, mit `docker inspect <container>` (Abschnitt `Env`), `docker compose config` oder `helm get values flowplan`. Die vollständige Liste steht unter [Konfiguration](/configuration).
2. **Die Schlüssel sichern**, getrennt von den Daten (Passwortmanager):
   - `FLOWPLAN_ENCRYPTION_KEY` (oder die Datei aus `FLOWPLAN_ENCRYPTION_KEY_FILE`) und `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS`: Ohne sie sind verschlüsselte Sicherungen, die verschlüsselten Dateien im Bucket und die damit verschlüsselten gespeicherten Geheimnisse unlesbar.
   - `FLOWPLAN_SECRETS_KEY` (oder `…_FILE`), falls gesetzt. Ist keiner der beiden gesetzt, liegt der Schlüssel für gespeicherte Geheimnisse als `secrets.key` im Datenordner – das eingebaute Umzugswerkzeug nimmt ihn mit, bei den anderen Wegen kopierst du ihn selbst.
   - Was davon abhängt: KI-Schlüssel, Kalenderverbindungen (Google, Microsoft 365), Chat-App-Tokens, Git-Export-Tokens und die Zwei-Faktor-Geheimnisse der Konten. Fehlt der Schlüssel, kommen Konten mit Zwei-Faktor-Anmeldung nur noch mit Wiederherstellungscodes hinein.
3. **Die Domain behalten.** Gleiche `APP_URL` heißt: Passkeys, die OIDC-Weiterleitung, CalDAV- und CardDAV-Konten, die Apps, eingehende Webhooks (Git, Tickets, E-Mail-Eingang) und Freigabelinks funktionieren nach dem DNS-Wechsel einfach weiter. Mit einer neuen Domain muss all das neu eingerichtet werden (siehe [Andere Domain](#andere-domain)).
4. **Die TTL des DNS-Eintrags senken**, mindestens so lange vorher, wie die bisherige TTL beträgt (oft 1 bis 24 Stunden), z. B. auf 300 Sekunden. Dann greift die Umstellung später in Minuten.
5. **Den neuen Server einrichten** (Beispiel: [Hetzner Cloud](#beispiel-hetzner-cloud)) mit **derselben oder einer neueren** Flowplan-Version – eine ältere kann eine neuere Datenbank nicht öffnen – und mit denselben Umgebungsvariablen. Ein eigenes S3-Bucket für die neue Instanz ist am einfachsten; mit demselben Bucket siehe [Weg C](#weg-c-s3-und-litestream).
6. **Eine Sicherung anlegen**: **Administration → Speicher & Sicherung → Gesamte Instanz → Herunterladen**. Sie schadet nie.
7. **Die Nutzer vorwarnen**: **Administration → Wartung & Hinweise** zeigt allen ein Wartungsfenster an.

:::

## Drei Wege

| Weg | Wann | Ausfallzeit |
| --- | --- | --- |
| **A: Umzugswerkzeug** (empfohlen) | immer, wenn der neue Server den alten erreicht | Minuten (nur der letzte Abgleich) |
| **B: Sicherung herunterladen und hochladen** | kleine Instanzen, kein Netzweg zwischen den Servern | von der Sicherung bis zum Start der neuen Instanz |
| **C: S3 und Litestream** | die alte Instanz läuft schon mit S3 und Litestream | Stoppen der alten bis Start der neuen Instanz |

### Weg B: Sicherung herunterladen und hochladen

::: steps

1. Auf der alten Instanz [Wartung ankündigen](/administration#wartung-hinweise) – Änderungen nach dem Herunterladen gehen verloren.
2. **Administration → Speicher & Sicherung → Gesamte Instanz → Herunterladen**. Mit `FLOWPLAN_ENCRYPTION_KEY` ist die Datei verschlüsselt (`.zip.enc`) – die neue Instanz braucht dann denselben Schlüssel.
3. Die Instanzsicherung enthält Datenbank und Dateien, aber **nicht** `secrets.key` und `web-push-keys.json`. Beide von Hand kopieren (oder die Schlüssel als Variablen setzen):
   ```bash
   # alt
   docker compose cp flowplan:/app/data/secrets.key .
   docker compose cp flowplan:/app/data/web-push-keys.json .
   # neu
   docker compose cp secrets.key flowplan:/app/data/
   docker compose cp web-push-keys.json flowplan:/app/data/
   docker compose exec -u root flowplan chown 1000:1000 /app/data/secrets.key /app/data/web-push-keys.json
   # mit PUID/PGID oder user: deren Benutzer und Gruppe statt 1000:1000
   ```
4. Auf der neuen Instanz **Aus Sicherung wiederherstellen → Sicherung auswählen**. Der Proxy davor muss so große Uploads durchlassen (Caddy von sich aus, nginx mit `client_max_body_size`, Cloudflare höchstens 100 MB); sonst die Datei per `scp` auf den Server bringen und dort hochladen. Höchstens 50 GB.
5. Neu starten; der vorherige Stand bleibt als `pre-restore-…`. Dann DNS umstellen.

:::

### Weg C: S3 und Litestream

Läuft die alte Instanz mit S3 (Dateien im Bucket) und Litestream (laufende Kopie der Datenbank unter `<Präfix>/db/`), kann die neue Instanz direkt aus dem Bucket starten:

::: steps

1. Die alte Instanz **stoppen** – Litestream beider Instanzen dürfen nie gleichzeitig in denselben Ordner schreiben.
2. Die neue Instanz mit **denselben** `S3_*`-Variablen, demselben `FLOWPLAN_ENCRYPTION_KEY` und einem **leeren** Datenordner starten. Litestream stellt die Datenbank wieder her, die Dateien holt Flowplan beim ersten Abruf sofort und alle übrigen im Hintergrund.
3. `secrets.key` und `web-push-keys.json` wie in Weg B kopieren, falls die Schlüssel nicht als Variablen gesetzt sind.
4. DNS umstellen.

:::

Mit `FLOWPLAN_LITESTREAM=off` gibt es keine laufende Kopie: dann die neueste geplante Sicherung aus `<Präfix>/backups/` verwenden (siehe [Wiederherstellen](/storage-and-backups#wiederherstellen)). Die Vorabprüfung von Weg A erkennt eine Litestream-Kopie im Bucket und weist auf diesen Weg hin.

> [!NOTE]
> Aktive [Workflows](/workflows) kommen auf der neuen Instanz **pausiert** an – mit Entwurf, Versionen und angehaltenen Läufen. So startet nichts doppelt, solange die alte Instanz noch läuft. Prüfe sie danach und aktiviere sie wieder.

## DNS umstellen

::: steps

1. Nach dem letzten Abgleich (Weg A) bzw. dem Start der neuen Instanz den **A-Eintrag** (IPv4) und den **AAAA-Eintrag** (IPv6) der Domain auf den neuen Server ändern. Am alten Standort eine Portweiterleitung oder einen Tunnel entfernen.
2. Der Proxy des neuen Servers holt das Zertifikat, sobald die Domain auf ihn zeigt (bei Let's Encrypt über Port 80) – eine Minute Geduld.
3. Mit `dig +short flowplan.example.org` (oder `nslookup`) prüfen, was die Welt sieht. Wer die alte Adresse noch im Cache hat, landet bis zum Ablauf der TTL auf der alten Instanz – dort steht dann der Hinweis auf die neue.
4. Danach die TTL wieder anheben.

:::

## Danach prüfen

- **Anmelden**: mit Passwort, Passkey und SSO. Bestehende Sitzungen gelten weiter.
- **Administration → Überwachung**: alles grün? **Administration → Verschlüsselung** zeigt dieselbe Schlüssel-ID wie vorher.
- **Administration → Speicher & Sicherung**: S3 verbunden, Warteschlange läuft leer (mit S3 lädt Flowplan nach einer Übernahme alle Dateien einmal hoch), **Jetzt sichern** gelingt.
- **Administration → E-Mail → Test-E-Mail senden** und **Administration → Push-Benachrichtigungen → Testbenachrichtigung senden**.
- Ein paar Seiten, Bilder und Anhänge öffnen; eine Datei hochladen.
- KI, Kalenderverbindungen, Chat-Apps: funktionieren sie ohne neue Anmeldung, sind die gespeicherten Geheimnisse lesbar.
- CalDAV/CardDAV in einer App aktualisieren, die Desktop- und Mobil-Apps öffnen, eingehende Webhooks (Git, Tickets) einmal auslösen.

## Aufräumen

- Auf der neuen Instanz `FLOWPLAN_MOVE_ALLOW_PRIVATE` wieder entfernen.
- `pre-move-…` (bzw. `pre-restore-…`) im Datenordner nach ein paar Tagen löschen, z. B. `docker compose exec flowplan sh -c 'rm -rf /app/data/pre-move-*'`.
- Die alte Instanz noch einige Tage mit dem Hinweis laufen lassen, dann stoppen, das Volume sicher löschen und ihre S3-Zugangsdaten (falls eigene) widerrufen. Das Umzugstoken ist schon verbraucht.
- Eine geplante Sicherung auf der neuen Instanz einschalten bzw. prüfen ([Sicherungen](/storage-and-backups#sicherungen)).

## Zurück, falls etwas schiefgeht

Bis zum DNS-Wechsel ist nichts verloren: Auf der alten Instanz **Administration → Speicher & Sicherung → Instanz umziehen → Schreibschutz aufheben**, und alles läuft weiter wie vorher. Nach dem Wechsel: DNS zurückstellen und den Schreibschutz aufheben – was auf der neuen Instanz inzwischen geändert wurde, kommt nur mit einem Umzug in die Gegenrichtung zurück. Die neue Instanz selbst kehrt zu ihrem vorherigen Stand zurück, indem du bei gestopptem Container `flowplan.sqlite*` und `uploads/` durch den Inhalt von `pre-move-…` ersetzt.

## Andere Domain

Bekommt die Instanz eine neue Adresse, setze `APP_URL` auf die neue und richte danach neu ein:

- **Passkeys** sind an die Domain gebunden: Alle melden sich mit Passwort oder SSO an und legen sie neu an.
- **OIDC**: die Weiterleitungsadresse beim Anbieter auf `<neue APP_URL>/api/auth/callback` ändern.
- **CalDAV und CardDAV**: Konten in den Kalender- und Kontakte-Apps neu einrichten.
- **Eingehende Webhooks** (Git, Ticket-Sync, E-Mail-Eingang) und **Freigabelinks** zeigen auf die alte Adresse.
- **Desktop- und Mobil-Apps** speichern die Adresse des Servers. Sie verbinden sich weiter mit der alten Instanz; dort sehen alle den Hinweis „Diese Instanz ist umgezogen nach …“, und Änderungen werden mit einer Meldung abgelehnt, die die neue Adresse nennt. In der App abmelden und die neue Adresse eintragen (Desktop: **Profile → Profil hinzufügen …**). **Weboberfläche weiterleiten** dabei ausgeschaltet lassen: Die Apps nehmen keine Adresse an, die auf eine andere Seite weiterleitet.

## Beispiel: Hetzner Cloud

Ein konkreter Weg vom Heimserver auf einen Server bei Hetzner, mit Docker Compose und Caddy. Namen und Preise der Tarife ändern sich – maßgeblich ist die Hetzner Console.

### Server

| Einstellung | Empfehlung |
| --- | --- |
| Typ | **CAX21** (Arm64, 4 vCPU, 8 GB RAM) oder **CX32** (x86, 4 vCPU, 8 GB RAM) bzw. der aktuelle Nachfolger. 4 GB reichen für kleine Teams; die Texterkennung gescannter PDFs braucht kurzzeitig CPU, lokale KI (Ollama) deutlich mehr. Das Image gibt es für `linux/arm64` und `linux/amd64`, beide Typen passen. |
| Standort | **Falkenstein** (`fsn1`) oder **Nürnberg** (`nbg1`) – dort gibt es auch Object Storage. |
| Image | **Ubuntu 24.04** |
| Netzwerk | Öffentliche IPv4 und IPv6. Eine IPv4-Adresse behalten: Nicht jede Registry und jeder Mailserver ist über IPv6 erreichbar. |
| SSH-Key | Eigenen öffentlichen Schlüssel hinterlegen; Anmeldung mit Passwort gar nicht erst nutzen. |
| Firewall | Eine **Hetzner Cloud Firewall** anlegen und zuweisen: eingehend TCP **22** nur von deiner Adresse (oder deinem VPN), TCP **80** und **443** sowie UDP **443** (HTTP/3) von überall. Docker umgeht `ufw` auf dem Server; die Cloud Firewall davor greift trotzdem. |
| Backups | **Backups** des Servers einschalten (Aufpreis auf den Serverpreis): tägliche Abbilder der ganzen Platte, zusätzlich zu Flowplans eigenen Sicherungen. |

### Object Storage als S3

::: steps

1. In der Hetzner Console **Object Storage → Bucket erstellen**, Standort wie der Server (z. B. Falkenstein), Sichtbarkeit **privat**. Der Name muss eindeutig sein, z. B. `flowplan-<dein-name>`.
2. **Sicherheit → S3-Zugangsdaten → Zugangsdaten erstellen**. Das Secret wird nur einmal angezeigt.
3. In die `.env`:

:::

```dotenv
S3_BUCKET=flowplan-beispiel
S3_ENDPOINT=https://fsn1.your-objectstorage.com
S3_REGION=fsn1
S3_ACCESS_KEY_ID=<Access Key>
S3_SECRET_ACCESS_KEY=<Secret Key>
S3_PREFIX=flowplan
```

Endpoint und Region folgen dem Standort: `https://<Standort>.your-objectstorage.com` mit `fsn1` (Falkenstein), `nbg1` (Nürnberg) oder `hel1` (Helsinki) als `S3_REGION`. Mit `FLOWPLAN_ENCRYPTION_KEY` liegen Dateien und Sicherungen dort verschlüsselt; die Litestream-Kopie nicht (siehe [Litestream und Verschlüsselung](/storage-encryption#litestream-und-verschluesselung)). Object Storage wird monatlich abgerechnet, mit einem Grundpreis, der ein Kontingent enthält – die aktuellen Preise stehen bei Hetzner.

### Docker, Flowplan und Caddy

Docker nach der offiziellen Anleitung für Ubuntu installieren ([docs.docker.com/engine/install/ubuntu](https://docs.docker.com/engine/install/ubuntu/)), dann:

```bash
mkdir -p /opt/flowplan && cd /opt/flowplan
curl -o .env https://raw.githubusercontent.com/yannicschuller/flowplan/main/.env.example
# compose.yaml und Caddyfile von unten anlegen, .env ausfüllen
docker compose up -d
```

`compose.yaml`:

```yaml
# Flowplan mit Caddy davor (HTTPS von Let's Encrypt). Genau eine Instanz (SQLite).
services:
  flowplan:
    image: ghcr.io/yannicschuller/flowplan:${FLOWPLAN_VERSION:-latest}
    env_file: .env
    environment:
      FLOWPLAN_DATA_DIR: /app/data
      # Caddy ist der eine Proxy davor und setzt X-Forwarded-For.
      FLOWPLAN_TRUSTED_PROXIES: "1"
    volumes:
      - flowplan-data:/app/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]
      interval: 30s
      timeout: 5s
      start_period: 20s
      retries: 3

  caddy:
    image: caddy:2
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    environment:
      FLOWPLAN_DOMAIN: ${FLOWPLAN_DOMAIN}
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy-data:/data
      - caddy-config:/config
    depends_on:
      - flowplan
    restart: unless-stopped

volumes:
  flowplan-data:
  caddy-data:
  caddy-config:
```

`Caddyfile`:

```caddyfile
{$FLOWPLAN_DOMAIN} {
	encode zstd gzip
	reverse_proxy flowplan:3000
}
```

In der `.env` zusätzlich zu den Werten der alten Instanz:

```dotenv
FLOWPLAN_DOMAIN=flowplan.example.org
APP_URL=https://flowplan.example.org
# SMTP: Hetzner sperrt für neue Konten ausgehend Port 25 und 465 – 587 mit STARTTLS nehmen.
SMTP_PORT=587
SMTP_SECURE=false
# Nur für den Umzug, wenn der Heimserver nur im LAN/VPN erreichbar ist:
# FLOWPLAN_MOVE_ALLOW_PRIVATE=true
```

Für eine [vorübergehende Adresse](/move-instance-tool#weg-a-das-umzugswerkzeug) während des Umzugs `FLOWPLAN_DOMAIN=neu.flowplan.example.org` und die passende `APP_URL` setzen; nach **Übernehmen** beide auf die endgültige Domain ändern und mit `docker compose up -d` neu starten – derselbe Neustart übernimmt den Umzug. Caddy kann auch beide Namen bedienen: `{$FLOWPLAN_DOMAIN}, neu.flowplan.example.org { … }`.

Lieber Kubernetes? Das [Helm-Chart](/installation#kubernetes-helm) aus dem Repository läuft auch auf einem einzelnen Server (etwa mit k3s); der Umzug geht dann über die Oberfläche oder `kubectl exec … node /app/move.mjs` (oben).

### Ablauf mit dem Heimserver

::: steps

1. Einen Tag vorher die TTL des DNS-Eintrags auf 300 Sekunden senken.
2. Den Hetzner-Server wie oben einrichten, mit denselben Variablen wie zu Hause (Schlüssel!), und mit `docker compose up -d` starten; das erste Konto anlegen.
3. Zu Hause **Umzug vorbereiten**, auf dem Hetzner-Server **Von anderer Instanz übernehmen** mit der öffentlichen Adresse des Heimservers (oder seiner VPN-Adresse mit `FLOWPLAN_MOVE_ALLOW_PRIVATE=true`).
4. Vorabprüfung, bis keine Fehler bleiben. **Quelle schreibschützen und letzten Stand holen**, **Übernehmen**, `docker compose restart flowplan`.
5. A- und AAAA-Eintrag auf die Adressen des Hetzner-Servers stellen, Portweiterleitung am Router entfernen.
6. [Danach prüfen](#danach-pruefen), nach ein paar Tagen [aufräumen](#aufraeumen).

:::

