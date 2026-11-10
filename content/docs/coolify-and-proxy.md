# Coolify und Reverse Proxy

Flowplan braucht vor sich nur einen HTTPS-Proxy. WebSockets sind nicht nötig: Zusammenarbeit läuft über normale HTTP-Anfragen und Server-Sent Events.

## Coolify

1. **Neue Ressource → Docker Image** (oder **Dockerfile** aus dem Git-Repository) wählen.
2. **Ports Exposes**: `3000`.
3. Domain eintragen, z. B. `https://flowplan.example.com`. Coolify holt das Zertifikat über Traefik.
4. **Persistent Storage**: Volume, Ziel `/app/data`.
5. Umgebungsvariablen aus der [Konfiguration](/configuration) setzen.
6. Bereitstellen. Nach etwa 20 Sekunden meldet der Healthcheck den Container als gesund.

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

1. In Coolify unter **Settings** den API-Zugriff einschalten (und ggf. die Adresse des CI-Runners erlauben).
2. Unter **Keys & Tokens → API tokens** ein Token mit dem Recht *deploy* anlegen.
3. In der Ressource unter **Webhooks** die *Deploy Webhook*-Adresse kopieren, z. B. `https://coolify.example.com/api/v1/deploy?uuid=…&force=false`.
4. Im GitHub-Repository unter **Settings → Secrets and variables → Actions** zwei Secrets anlegen: `COOLIFY_WEBHOOK` (die Adresse) und `COOLIFY_TOKEN` (das Token).

| Repository | Image in Coolify | Ausgerollt bei |
| --- | --- | --- |
| flowplan | `ghcr.io/yannicschuller/flowplan:beta` (oder `:latest` ohne Automatik) | jedem manuellen Build (**Actions → Docker image → Run workflow**) und jedem Release, das neuer ist als die aktuelle Beta |
| flowplan-website | `ghcr.io/yannicschuller/flowplan-website:latest` | jedem Push auf `main` |
| flowplan-docs | `ghcr.io/yannicschuller/flowplan-docs:latest` | jedem Push auf `main` |

Pull Requests und Dependabot lösen nie ein Deployment aus; ohne die Secrets (etwa in Forks) wird der Schritt übersprungen. Holt Coolify beim Deployment nicht das neue Image, in der Compose-Datei `pull_policy: always` setzen.

> [!WARNING]
> In Coolify die Anzahl der Instanzen bei 1 lassen. Mehrere Container würden dieselbe SQLite-Datei beschreiben.

## Pangolin, Traefik und andere Proxys

- `APP_URL` muss exakt der Adresse entsprechen, unter der Flowplan im Browser erscheint.
- Endet TLS am vorderen Proxy (etwa Pangolin) und reicht er an Traefik weiter, dort **TLS zum Ziel ausschalten** und einen **eigenen Host-Header** mit der Flowplan-Domain setzen – sonst findet Traefik keine Route und antwortet mit 404.
- Großes Hochladen: Inhaltsarchive können bis zu 2 GB groß sein, [AFFiNE-Arbeitsbereichsdateien](/migrate#von-affine) so groß wie die Import-Grenze (größte Datei beim Hochladen, mindestens 100 MB, oder `FLOWPLAN_IMPORT_MAX_MB`). Traefik begrenzt die Anfragegröße von sich aus nicht – nur eine eigene `buffering`-Middleware mit `maxRequestBodyBytes`; die muss dann mindestens so groß sein. nginx braucht `client_max_body_size` (das Beispiel unten erlaubt 2 GB, Standard ist nur 1 MB), Caddy begrenzt nur mit `request_body { max_size … }`. Cloudflare (Proxy an) lässt im Free- und Pro-Tarif höchstens 100 MB je Anfrage durch – größere AFFiNE-Dateien dann über einen Weg ohne Cloudflare-Proxy importieren. Flowplan nimmt große Importe als Datenstrom an und schreibt sie auf die Platte; die Anfrage muss ihre Größe (`Content-Length`) nennen, was Browser immer tun.
- Zeitlimits: Export und Import großer Archive können Minuten dauern; Proxy-Timeouts ggf. erhöhen.
- Server-Sent Events (Live-Bearbeitung in Dokumenten, Live-Cursor auf Whiteboards) dürfen nicht gepuffert werden; nginx: `proxy_buffering off` (siehe Beispiel unten). Flowplan sendet dafür zusätzlich `X-Accel-Buffering: no`.
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
