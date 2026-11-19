---
keywords: Coolify, Reverse Proxy, nginx, Traefik, Caddy, HTTPS, Volume
new: checkliste 2026-11-18
---

# Coolify und Reverse Proxy

Flowplan braucht vor sich nur einen HTTPS-Proxy. WebSockets sind nicht nötig: Zusammenarbeit läuft über normale HTTP-Anfragen und Server-Sent Events.

## Coolify

::: steps

1. **Neue Ressource → Docker Image** (oder **Dockerfile** aus dem Git-Repository) wählen.
2. **Ports Exposes**: `3000`.
3. Domain eintragen, z. B. `https://flowplan.example.com`. Coolify holt das Zertifikat über Traefik.
4. **Persistent Storage**: Volume, Ziel `/app/data`.
5. Umgebungsvariablen aus der [Konfiguration](/configuration) setzen.
6. Bereitstellen. Nach etwa 20 Sekunden meldet der Healthcheck den Container als gesund.

:::

### Checkliste

Bevor eine Instanz in den regulären Betrieb geht, prüf die Einstellungen der Ressource:

- **Healthcheck** an, Port `3000`, Pfad `/api/health` ([Healthcheck](#healthcheck)).
- **Restart policy** auf dem Standard von Coolify (`unless-stopped`) lassen: Der Container kommt nach einem Absturz und nach **Jetzt neu starten** in der Administration wieder. Was `0` bei **Max restart count** bedeutet, sagt der Tooltip des Felds in Coolify.
- Mit SQLite: **Container naming** auf **Consistent name (no rolling updates)** und ein **Custom container name** ([SQLite ohne Überlappung ausrollen](#sqlite-ohne-ueberlappung-ausrollen)).
- **Stop grace period** 30 Sekunden oder mehr, damit Flowplan und Litestream sauber enden.
- Eine **Speichergrenze** mit Platz für Litestream neben der App – oder, ohne Grenze, genug freier Speicher auf dem Host ([Dimensionierung](/sizing), [wenn der Server keinen Speicher mehr hat](/troubleshooting#neustarts-ohne-fehler)).
- Beta und Produktion als **getrennte Ressourcen**, ausgerollt über `COOLIFY_BETA_WEBHOOK` und `COOLIFY_WEBHOOK` ([Automatisch ausrollen](#automatisch-ausrollen)).
- Die Beta-Instanz mit **eigenem Volume** und eigenem Bucket oder `S3_PREFIX` – nie dem Volume der Produktion.

### Healthcheck

Das Image bringt einen eigenen Healthcheck mit. Wird er in Coolify eingestellt:

| Feld | Wert |
| --- | --- |
| Check type | HTTP request |
| Method / Scheme / Host | `GET` / `HTTP` / `localhost` |
| Port | `3000` – leer bedeutet 80, dort lauscht nichts |
| Path | `/api/health` |
| Expected code | `200` |
| Start period | `30` Sekunden (mit S3 stellt Litestream beim ersten Start die Datenbank her) |

Flowplan sendet keinen `X-Powered-By`-Header. Der Healthcheck braucht nur den Statuscode; seine Details sind ohne Token nicht öffentlich (siehe [Healthcheck](/operations#healthcheck)).

### Volume-Rechte

Flowplan läuft standardmäßig als UID 1000 (Benutzer `node`). Ein neues Docker-Volume bekommt die Rechte automatisch. Für einen eingebundenen Host-Ordner, der jemand anderem gehört, setzt du `PUID` und `PGID` – wie bei den Images von linuxserver.io, ohne `user:`:

```yaml
services:
  flowplan:
    image: ghcr.io/yannicschuller/flowplan:latest
    environment:
      PUID: "1001"
      PGID: "1001"
    volumes:
      - /pfad/zu/flowplan-data:/app/data
```

Beim Start gibt Flowplan als Erstes den Datenordner `PUID:PGID` und startet die App dann als dieser Benutzer – nie als root. `chown` läuft nur, wenn der Ordner oder etwas direkt darin noch jemand anderem gehört – also einmal, nicht bei jedem Start. `PGID` ist ohne Angabe gleich `PUID`; beide müssen Zahlen größer als 0 sein (`0` wird abgelehnt). Ohne `PUID`/`PGID` läuft Flowplan als UID 1000 und übergibt den Ordner genauso an sie.

**Alternativ Dockers eigenes `user:`** – Flowplan läuft dann von Anfang an als dieser Benutzer und ändert keine Besitzer; der Ordner muss ihm schon gehören. Jede UID/GID geht, auch eine ohne Eintrag in `/etc/passwd` des Images. So arbeitet auch Kubernetes (`runAsUser`, das [Helm-Chart](/installation#kubernetes-helm)).

```yaml
services:
  flowplan:
    image: ghcr.io/yannicschuller/flowplan:latest
    user: "1001:1001"          # oder "${UID}:${GID}", mit UID und GID in der .env
    volumes:
      - /pfad/zu/flowplan-data:/app/data
```

Mit `user:` wirken `PUID`/`PGID` nicht; Flowplan meldet das beim Start mit einer Zeile. Oder du gibst den Ordner UID 1000: `sudo chown -R 1000:1000 /pfad/zu/flowplan-data`. Passt nichts davon, bricht der Start mit „Flowplan cannot write to its data folder …“ ab.

**Befehle im Container** (`docker exec`, `docker compose exec`/`run`, `docker run … node …`) laufen ohne `user:` als root. Flowplans eigene Werkzeuge – `/app/move.mjs`, `/app/decrypt.mjs`, `/app/scripts/db-*.mjs` – wechseln selbst zu `PUID:PGID` (Standard 1000:1000), bevor sie etwas schreiben. Bei anderen Befehlen, die in den Datenordner schreiben, den Benutzer angeben: `docker compose exec -u 1001:1001 flowplan …` (ohne `PUID` `-u 1000:1000`). Was ein Befehl als root direkt im Datenordner hinterlässt, übergibt Flowplan beim nächsten Start.

### Automatisch ausrollen

Coolify beobachtet die Registry nicht selbst. Die Image-Workflows der Repositories lösen deshalb nach dem Hochladen eines neuen Images ein Deployment über die Coolify-API aus (`POST /api/v1/deploy?uuid=…` mit einem API-Token). Der eingebaute GitHub-Webhook von Coolify passt dafür nicht: Er baut aus dem Quellcode und kommt beim Push, bevor das Image fertig ist.

::: steps

1. In Coolify unter **Settings** den API-Zugriff einschalten (und ggf. die Adresse des CI-Runners erlauben).
2. Unter **Keys & Tokens → API tokens** ein Token mit dem Recht *deploy* anlegen.
3. In der Ressource unter **Webhooks** die *Deploy Webhook*-Adresse kopieren, z. B. `https://coolify.example.com/api/v1/deploy?uuid=…&force=false`.
4. Im GitHub-Repository unter **Settings → Secrets and variables → Actions** die Secrets `COOLIFY_WEBHOOK` (die Adresse) und `COOLIFY_TOKEN` (das Token) anlegen. Für eine zweite Instanz des flowplan-Repositorys, die `:beta` folgt, deren Adresse als `COOLIFY_BETA_WEBHOOK` hinzufügen; `COOLIFY_WEBHOOK` ist dann die Instanz mit `:latest`.

:::

| Repository | Image in Coolify | Ausgerollt bei |
| --- | --- | --- |
| flowplan, Beta-Instanz (`COOLIFY_BETA_WEBHOOK`) | `ghcr.io/yannicschuller/flowplan:beta` | jedem Beta-Build (**Actions → Docker image → Run workflow**) |
| flowplan, Produktiv-Instanz (`COOLIFY_WEBHOOK`) | `ghcr.io/yannicschuller/flowplan:latest` | jedem Release |
| flowplan-website | `ghcr.io/yannicschuller/flowplan-website:latest` | jedem Push auf `main`, sobald CI grün ist und das neue Image seine Seiten ausliefert |
| flowplan-docs | `ghcr.io/yannicschuller/flowplan-docs:latest` | jedem Push auf `main`, sobald CI grün ist und das neue Image seine Seiten ausliefert |

Pull Requests und Dependabot lösen nie ein Deployment aus; ohne die Secrets (etwa in Forks) wird der Schritt übersprungen. Holt Coolify beim Deployment nicht das neue Image, in der Compose-Datei `pull_policy: always` setzen.

> [!WARNING]
> In Coolify die Anzahl der Instanzen bei 1 lassen. Mehrere Container würden dieselbe SQLite-Datei beschreiben.

### Eine Beta-Instanz, die die Replikation testet {since=0.10.2}

Eine Beta-Instanz ohne S3 startet nie Litestream – Replikation, [Selbstheilung](/restore#litestream-zustand-reparieren) und das Zurücksetzen im Bucket laufen dann erst auf der Produktion. Damit jedes `:beta` sie mittestet, bekommt die Beta-Instanz eine eigene Replikation:

::: steps

1. Lege bei deinem S3-Anbieter einen **eigenen Bucket** für die Beta-Instanz an (z. B. `flowplan-beta`) und einen Zugangsschlüssel, der nur diesen Bucket nutzen darf. Ein eigener Bucket ist am sichersten: Ein Zurücksetzen der Beta-Replik kann die Produktion nie treffen. Geht nur ein Bucket, gib der Beta-Instanz wenigstens ein eigenes `S3_PREFIX` (z. B. `flowplan-beta`) – nie das der Produktion.
2. Setze in Coolify bei den Umgebungsvariablen der Beta-Ressource `S3_BUCKET`, `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` und `S3_PREFIX` für diesen Bucket. Ihr Daten-Volume bleibt ebenfalls ihr eigenes.
3. Ausrollen. Das Log zeigt, wie Litestream wiederherstellt (ein leerer Bucket: nichts wiederherzustellen) und dann repliziert; **Administration → Überwachung** zeigt den Zustand der Replik.

:::

Dateien, die auf der Beta-Instanz hochgeladen werden, liegen dann ebenfalls im Beta-Bucket. Lösche den Bucket, wenn du die Beta-Instanz nicht mehr brauchst.

### SQLite ohne Überlappung ausrollen {since=0.10.0}

Mit SQLite (ohne `DATABASE_URL`) darf auf einem Datenvolume immer nur **ein** Flowplan-Container laufen – auch nicht für die Sekunden eines Updates. Startet ein Deployment den neuen Container, während der alte noch läuft (ein Rolling Update, das auf den Healthcheck des neuen wartet), arbeiten zwei Litestream-Prozesse auf derselben Datenbank. Das beschädigt den Replikationszustand in `.flowplan.sqlite-litestream`: im Log erst `sync error … rename …ltx.tmp …: no such file or directory`, danach alle 30 Sekunden `compaction failed … file checksum mismatch`. Wie du das reparierst, steht unter [Litestream-Zustand reparieren](/restore#litestream-zustand-reparieren).

Vermeide deshalb:

- ein Ausrollen, bei dem der neue Container startet, bevor der alte gestoppt ist – rolle mit **erst stoppen, dann starten** aus;
- mehr als eine Instanz, Replica oder Kopie der Ressource mit demselben Volume (auch eine zweite Ressource, etwa für `:beta`, braucht ihr **eigenes** Volume und ihr eigenes `S3_PREFIX`);
- `docker compose up` mit einem zweiten Projektnamen auf demselben Volume oder einen zusätzlichen `docker run … -v flowplan-data:/app/data`, während die Instanz läuft.

**In Coolify:** in den Einstellungen der Ressource, Abschnitt **Container**, bei **Container naming** **Consistent name (no rolling updates)** wählen und einen **Custom container name** eintragen (z. B. `flowplan-production`), dann einmal deployen. Coolify stoppt dann den alten Container, bevor es den neuen startet; ein Update unterbricht Flowplan ein paar Sekunden. Den Healthcheck an lassen und die **Stop grace period** bei 30 Sekunden oder mehr, damit Flowplan und Litestream sauber enden.

Brauchst du Updates ohne Unterbrechung, nimm [PostgreSQL](/postgresql) – dort darf ein Update kurz überlappen – oder den [Cluster-Modus](/cluster).

**Das Sicherheitsnetz:** Jeder Container hält beim Start eine exklusive Sperre auf `/app/data/.flowplan.lock` (`flock`), solange er läuft. Findet ein zweiter Container die Sperre belegt,

- startet er die App trotzdem, damit der Healthcheck eines Rolling Updates durchgeht und der alte Container gestoppt wird;
- startet er **kein** zweites Litestream und keine Wiederherstellung aus dem Bucket; eine anstehende Instanz-Wiederherstellung (und eine noch fehlende Datenbank, die der andere Container vielleicht gerade herstellt) wartet ganz, bevor die App startet;
- meldet er im Log `ANOTHER CONTAINER IS USING THE DATA FOLDER …`;
- startet er die Replikation von selbst, sobald der andere Container beendet ist und die Sperre frei wird. Stürzt dieses Litestream ab, läuft die App weiter, und Flowplan startet es nach `FLOWPLAN_LITESTREAM_RESTART_SECONDS` Sekunden (Standard 5) neu – bei jedem weiteren Absturz doppelt so spät, höchstens nach 300 Sekunden.

Solange er wartet, zeigt **Administration → Überwachung** auf beiden Containern die Warnung „Ein zweiter Flowplan-Container (*Host*) nutzt seit *Zeit* dasselbe Datenverzeichnis …“ (auf dem wartenden: „Dieser Container … wartet …“). Sie endet, sobald nur noch ein Container läuft. Das Netz verhindert den beschädigten Zustand, ersetzt aber kein Ausrollen ohne Überlappung: Für die Zeit der Überlappung schreiben zwei Apps in dieselbe Datei. Die Sperre braucht ein Dateisystem mit `flock` – ein lokales Docker-Volume oder einen lokalen Ordner, nicht SMB.

## Pangolin, Traefik und andere Proxys

- `APP_URL` muss exakt der Adresse entsprechen, unter der Flowplan im Browser erscheint.
- Endet TLS am vorderen Proxy (etwa Pangolin) und reicht er an Traefik weiter, dort **TLS zum Ziel ausschalten** und einen **eigenen Host-Header** mit der Flowplan-Domain setzen – sonst findet Traefik keine Route und antwortet mit 404.
- Großes Hochladen: Inhaltsarchive können bis zu 2 GB groß sein, [AFFiNE-Arbeitsbereichsdateien](/migrate-affine) so groß wie die Import-Grenze (größte Datei beim Hochladen, mindestens 100 MB, oder `FLOWPLAN_IMPORT_MAX_MB`). Traefik begrenzt die Anfragegröße von sich aus nicht – nur eine eigene `buffering`-Middleware mit `maxRequestBodyBytes`; die muss dann mindestens so groß sein. nginx braucht `client_max_body_size` (das Beispiel unten erlaubt 2 GB, Standard ist nur 1 MB), Caddy begrenzt nur mit `request_body { max_size … }`. Cloudflare (Proxy an) lässt im Free- und Pro-Tarif höchstens 100 MB je Anfrage durch – größere AFFiNE-Dateien dann über einen Weg ohne Cloudflare-Proxy importieren. Flowplan nimmt große Importe als Datenstrom an und schreibt sie auf die Platte; die Anfrage muss ihre Größe (`Content-Length`) nennen, was Browser immer tun.
- Zeitlimits: Export und Import großer Archive können Minuten dauern; Proxy-Timeouts ggf. erhöhen.
- Server-Sent Events (Live-Bearbeitung in Dokumenten, Live-Cursor auf Whiteboards, Aktualisierung von Seitenleiste und Posteingang über `/api/live`) dürfen nicht gepuffert werden; nginx: `proxy_buffering off` (siehe Beispiel unten). Flowplan sendet dafür zusätzlich `X-Accel-Buffering: no`.
- Client-Adresse: Der Proxy muss `X-Forwarded-For` setzen (Traefik und Caddy tun das von selbst, nginx braucht die Zeile aus dem Beispiel). Nur dann begrenzt Flowplan Anmeldeversuche, Demo-Starts und anonyme Formularantworten je Adresse. Fehlt der Header, gelten nur die Limits je Konto und je Link, und das Protokoll zeigt beim ersten Aufruf einen Hinweis. `FLOWPLAN_TRUSTED_PROXIES` nennt die Zahl der Proxys ([Konfiguration](/configuration)).

### nginx

```nginx
server {
  server_name flowplan.example.com;
  client_max_body_size 2g;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_buffering off;
    proxy_read_timeout 600s;
  }
}
```

### Caddy

```
flowplan.example.com {
  reverse_proxy 127.0.0.1:3000
}
```

Den internen Port `3000` nie zusätzlich öffentlich freigeben.

## Eigene Domains für Veröffentlichungen

Mit **Eigene Domains für Veröffentlichungen** unter **Administration → Erweiterungen & Domains** zeigen Eigentümer veröffentlichte Seiten unter ihrer Domain ([Teilen und Veröffentlichen](/sharing#eigene-domain)). Flowplan erkennt die Domain am `Host`-Header und liefert nur die Veröffentlichung aus. Das Zertifikat bleibt Sache des Reverse Proxy; er muss Anfragen für beliebige Hosts an Flowplan weiterreichen und den `Host` unverändert lassen.

Flowplan beantwortet `GET /api/domains/allowed?domain=<host>` mit 200 für bestätigte Domains aktiver Veröffentlichungen und sonst mit 404 – genau die Frage, die Caddy vor einem neuen Zertifikat stellt.

### Caddy mit On-Demand-TLS

```
{
  on_demand_tls {
    ask http://127.0.0.1:3000/api/domains/allowed
  }
}

flowplan.example.com {
  reverse_proxy 127.0.0.1:3000
}

# Alle anderen Hosts: nur mit Zertifikat, wenn Flowplan die Domain kennt.
https:// {
  tls {
    on_demand
  }
  reverse_proxy 127.0.0.1:3000
}
```

Caddy holt das Zertifikat beim ersten Aufruf der Domain. Domains, die Flowplan nicht bestätigt hat, bekommen keines – so kann niemand Zertifikate für fremde Namen anstoßen.

### Traefik

Traefik kennt keine Rückfrage vor dem Zertifikat. Lege je Domain einen Router an (Datei-Provider oder Labels) – nachdem die Domain in Flowplan bestätigt ist:

```yaml
http:
  routers:
    flowplan-docs-example:
      rule: Host(`docs.example.org`)
      service: flowplan
      tls:
        certResolver: letsencrypt
  services:
    flowplan:
      loadBalancer:
        servers:
          - url: http://flowplan:3000
```

Die Bestätigung hängt nicht am Router: Flowplan prüft nur den TXT-Eintrag `_flowplan-verify.<host>`.

### Coolify

In Coolify die zusätzliche Domain im Feld **Domains** der Flowplan-Ressource ergänzen (durch Komma getrennt, z. B. `https://flowplan.example.com,https://docs.example.org`) und neu ausrollen. Coolify legt Router und Zertifikat für Traefik an. `APP_URL` bleibt die Adresse der App.

### Sicherheit

- Unter einer eigenen Domain antwortet Flowplan nur auf Lesezugriffe der Veröffentlichung, ihre Dateien und die statischen Dateien der Oberfläche. Anmeldung, App und API antworten mit 404 – auch wenn jemand den `Host`-Header fälscht.
- Cookies und `Authorization`-Kopfzeilen werden dort verworfen, und Flowplan setzt nie ein Cookie.
- Die Seiten tragen `frame-ancestors 'none'` und `X-Frame-Options: DENY`.
- Ein Eintrag für die Instanz-Adresse selbst ist nicht möglich.
- Bestätigt wird eine Domain nur per DNS-TXT-Eintrag `_flowplan-verify.<host>` – dass die Domain schon auf die Instanz zeigt, reicht nicht. Unbestätigte Einträge verfallen nach 7 Tagen, damit niemand eine fremde Domain auf Dauer blockiert.
