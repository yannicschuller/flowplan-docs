---
keywords: Hochverfügbarkeit, Ausfallsicherheit, Failover, Aktiv/Passiv, Load Balancer, Hetzner, Redundanz
---

# Hochverfügbarkeit

Flowplan weiterlaufen lassen, wenn ein Server ausfällt oder aktualisiert wird: Aktiv/Passiv mit einem Ersatzserver oder Aktiv/Aktiv im Cluster-Modus – mit einem vollständigen Beispiel bei Hetzner.

## Zwei Wege

| | Aktiv/Passiv | Aktiv/Aktiv ([Cluster-Modus](/cluster)) |
| --- | --- | --- |
| Was läuft | zwei Server, Flowplan läuft immer nur auf einem | zwei oder mehr Instanzen gleichzeitig hinter einem Load Balancer |
| Fällt ein Server aus | du startest Flowplan auf dem anderen (Minuten) | die übrigen Instanzen arbeiten weiter (Sekunden) |
| Updates | kurze Unterbrechung beim Neustart | ohne Unterbrechung, eine Instanz nach der anderen |
| Datenbank | SQLite mit Litestream oder PostgreSQL | PostgreSQL |
| Weitere Dienste | S3 (oder ein umziehbares Volume) | PostgreSQL, Redis und S3 |
| Mehr Personen | nein, eine Instanz trägt alle | ja, etwa 25–30 aktive Personen je Instanz ([Dimensionierung](/sizing)) |

Für die meisten Teams ist **Aktiv/Passiv** der bessere Anfang: wenig Neues zu betreiben, und ein Ausfall kostet Minuten statt Stunden. Der Cluster lohnt sich, wenn Updates gar nicht unterbrechen sollen oder eine Instanz nicht mehr reicht.

## Was beide brauchen

- **Dateien nicht nur auf einem Server:** ein S3-Bucket ([Speicher, S3 und Sicherung](/storage-and-backups)). Im Cluster ist er Pflicht, bei Aktiv/Passiv der einfachste Weg; sonst ein Volume, das du an den anderen Server hängen kannst (für SQLite nie eine Netzwerkfreigabe wie NFS).
- **Dieselben Schlüssel als Variablen** auf allen Servern: `FLOWPLAN_ENCRYPTION_KEY` (oder `FLOWPLAN_SECRETS_KEY`) sowie `WEB_PUSH_PUBLIC_KEY` und `WEB_PUSH_PRIVATE_KEY`. Ohne sie legt jede Instanz eigene im Datenordner an, und Zwei-Faktor-Anmeldung, gespeicherte Geheimnisse und Push-Abos passen nur zu einem Server. Wie du sie erzeugst oder aus einem bestehenden Datenordner übernimmst: [Cluster-Modus](/cluster#voraussetzungen).
- **Eine Adresse:** ein Load Balancer oder eine Floating IP davor, dieselbe `APP_URL` überall und `FLOWPLAN_TRUSTED_PROXIES` passend zur Zahl der Proxys.
- **Dieselbe Version:** dasselbe Image-Tag (`FLOWPLAN_VERSION`) auf allen Servern.

## Aktiv/Passiv

Zwei Server mit derselben `compose.yaml` und derselben `.env`. Auf dem aktiven läuft Flowplan, auf dem passiven ist der Container gestoppt. Davor steht ein Load Balancer, der `/api/health/ready` prüft und nur zum laufenden Server leitet – dann musst du beim Umschalten an der Adresse nichts ändern. Mit einer Floating IP statt Load Balancer ziehst du die IP beim Umschalten auf den anderen Server um.

> [!WARNING]
> Ohne Cluster-Modus darf immer nur **eine** Instanz laufen. Zwei Instanzen erledigen geplante Aufgaben doppelt (Erinnerungen, Zusammenfassungen, Sicherungen, Workflows), und Live-Änderungen erreichen die andere nicht. Mit SQLite und Litestream verderben zwei laufende Instanzen die Kopie im Bucket.

### Mit PostgreSQL

Beide Server zeigen mit `DATABASE_URL` auf dieselbe Datenbank und mit `S3_*` auf denselben Bucket. Startet versehentlich eine zweite Instanz, merkt Flowplan das über eine Sperre in der Datenbank: Sie startet trotzdem, schreibt alle zehn Minuten eine deutliche Warnung ins Log, und **Administration → Überwachung** zeigt auf jeder Instanz, bis nur noch eine läuft: {since=0.9.9}

> „Eine zweite Flowplan-Instanz läuft ohne Cluster-Modus gegen dieselbe Datenbank (*Instanz*, seit *Zeit*). Geplante Aufgaben wie Erinnerungen, Zusammenfassungen, Sicherungen und Workflows laufen dann doppelt, und Live-Änderungen erreichen die andere Instanz nicht. Schalte auf allen Instanzen den Cluster-Modus ein (FLOWPLAN_CLUSTER=1 mit Redis und S3) oder beende eine der Instanzen. Während eines Neustarts im laufenden Betrieb ist das kurz normal.“

Umschalten, wenn der aktive Server ausfällt:

::: steps

1. **Sicherstellen, dass der alte Server wirklich steht:** Container stoppen oder den Server in der Konsole des Anbieters ausschalten. Ein Server, der nur nicht erreichbar ist, läuft sonst womöglich weiter.
2. Auf dem passiven Server `docker compose up -d`.
3. Warten, bis `/api/health/ready` mit `200` antwortet; der Load Balancer leitet dann von selbst dorthin (mit Floating IP: die IP jetzt umziehen).
4. Unter **Administration → Überwachung** prüfen, dass keine Warnung über eine zweite Instanz steht.

:::

Zurück geht es genauso. Ein gestoppter Server darf erst wieder starten, wenn der andere gestoppt ist.

### Mit SQLite und Litestream

Die Datenbank liegt als Datei auf dem aktiven Server; Litestream kopiert jede Änderung laufend in den Bucket (unter `<Präfix>/db/`, im Sekundentakt), die Dateien liegen ebenfalls dort. Der passive Server hat dieselben `S3_*`-Variablen und Schlüssel und einen **leeren** Datenordner. Die Warnung über eine zweite Instanz gibt es hier nicht – jede Instanz hätte ihre eigene Datei.

::: steps

1. Den alten Server **stoppen** – zwei Litestream dürfen nie gleichzeitig in denselben Ordner im Bucket schreiben.
2. Auf dem passiven Server darf keine alte Datenbank liegen: Litestream stellt nur her, wenn `flowplan.sqlite` fehlt. Einen Datenordner von einem früheren Einsatz vorher leeren (oder ein neues Volume nehmen).
3. `docker compose up -d`: Litestream holt die Datenbank aus dem Bucket, Flowplan die Dateien beim ersten Abruf.
4. Adresse umstellen wie oben; danach den Datenordner des alten Servers leeren, bevor er wieder passiver Server wird.

:::

Verloren gehen höchstens die Änderungen der letzten Sekunde vor dem Ausfall, die Litestream noch nicht kopiert hatte. Der Ablauf entspricht [Weg C des Instanzumzugs](/move-instance#weg-c-s3-und-litestream). Ohne S3 geht es auch mit einem Block-Volume, das du vom ausgefallenen an den passiven Server hängst (bei Hetzner: **Volumes**, nur innerhalb eines Standorts) – nie mit einer Netzwerkfreigabe.

**Automatisch umschalten** (etwa mit keepalived) nur mit sicherem Abschalten des alten Servers: Nach einer Netzstörung laufen sonst beide.

## Aktiv/Aktiv: Cluster-Modus

Im [Cluster-Modus](/cluster) laufen alle Instanzen gleichzeitig. Live-Bearbeitung, Präsenz, Rate-Limits und die gleichzeitigen KI-Antworten teilen sie über Redis, alle Daten liegen in PostgreSQL, alle Dateien im Bucket; Importe und Druckansichten beantwortet jede Instanz. **Sticky Sessions braucht es nicht.** Fällt eine Instanz aus, nimmt der Load Balancer sie nach dem nächsten Health-Check heraus, und eine andere übernimmt binnen Sekunden die geplanten Aufgaben.

Bleiben zwei einzelne Punkte: **PostgreSQL** (siehe [Failover und Replica](/postgresql#failover-und-replica) und [unten](#postgresql)) und **Redis**. Fällt Redis aus, arbeiten alle weiter, nur Live-Änderungen zwischen den Instanzen kommen verzögert an. Setze dafür `FLOWPLAN_READY_REQUIRE=database,objectStorage` – sonst meldet sich jede Instanz „nicht bereit“, und der Load Balancer hat kein Ziel mehr.

### Updates ohne Unterbrechung

Eine Instanz nach der anderen: stoppen, neues Image starten, warten, bis sie bereit ist, dann die nächste. Auf `SIGTERM` meldet eine Instanz sofort `503` auf `/api/health/ready`, beantwortet offene Anfragen und gibt Live-Verbindungen und Leitung ab (`stop_grace_period: 30s`). Die neue Version ergänzt das Schema nur, alte Instanzen arbeiten damit weiter.

Damit Browser die Versionen nicht mischen, trägt jedes Image eine **Deployment-ID** (`v<Version>-<Commit>`, beim Bauen fest). Die App fragt ihre Dateien mit `?dpl=<ID>` an, sodass Caches unterwegs nichts Altes liefern, und erreicht eine Seite der alten Version eine neue Instanz, lädt der Browser beim nächsten Seitenwechsel die ganze Seite neu. Fehlt einer Instanz trotzdem eine Datei der anderen Version, repariert Flowplans eigene Prüfung des Builds die Seite. Baust du das Image selbst, setzt du die ID mit `FLOWPLAN_DEPLOYMENT_ID` (`--build-arg FLOWPLAN_DEPLOYMENT_ID=…`) – gleich für alle Instanzen desselben Images – oder schaltest sie mit `off` ab. {since=0.9.9}

## Beispiel: Hetzner Cloud

Ein Cluster mit zwei Flowplan-Servern hinter dem **Hetzner Load Balancer**, Redis und PostgreSQL in einem privaten Netz und Dateien im **Hetzner Object Storage**. Die Dateien dazu liegen im Repository unter [`deploy/compose/hetzner`](https://github.com/yannicschuller/flowplan/tree/main/deploy/compose/hetzner). Namen, Tarife und Menüs ändern sich – maßgeblich ist die Hetzner Console.

```text
Internet ── HTTPS ──▶ Load Balancer (öffentliche IP, Zertifikat)
                          │  privates Netz 10.0.0.0/16
              ┌───────────┴───────────┐
          app-1 :3000             app-2 :3000      Flowplan (FLOWPLAN_CLUSTER=1)
              └─────┬───────────┬─────┘
               redis :6379   postgres :5432        nur im privaten Netz
              Object Storage (S3, über HTTPS)
```

### Server und Netz

Alle Server am selben Standort (etwa Falkenstein, `fsn1`), mit Ubuntu 24.04 und deinem SSH-Schlüssel.

| Server | Größe | Hinweis |
| --- | --- | --- |
| `app-1`, `app-2` | je 2 vCPU, 4 GB RAM (der kleinste Typ dieser Größe, Arm oder x86) | trägt je etwa 25–30 aktive Personen; für mehr Personen weitere App-Server |
| `redis` | der kleinste Typ | speichert nichts dauerhaft |
| `postgres` | 2 vCPU, 4 GB RAM; ab etwa 60 aktiven Personen 4 vCPU, 8 GB, gern mit dedizierten vCPU | oder eine der Varianten [unten](#postgresql) |

- **Netzwerk:** unter **Networks** ein privates Netz (etwa `10.0.0.0/16`) anlegen und alle Server sowie den Load Balancer anhängen. Flowplan, Redis und PostgreSQL lauschen nur auf ihrer privaten Adresse.
- **Platzierungsgruppe:** `app-1` und `app-2` in eine **Placement Group** vom Typ *spread*, damit sie nicht auf demselben physischen Host laufen.
- **Firewall:** eine **Cloud Firewall** für alle Server: eingehend nur TCP 22 von deiner Adresse. Die App-Server brauchen keine öffentlichen Ports – der Load Balancer erreicht sie über das private Netz. Die Cloud Firewall wirkt nur auf die öffentliche Schnittstelle; schütze Redis und PostgreSQL deshalb zusätzlich mit Passwort und binde sie an die private Adresse (Docker umgeht `ufw`).

### Object Storage

Unter **Object Storage** einen privaten Bucket am selben Standort anlegen und unter **S3-Zugangsdaten** einen Schlüssel erzeugen (das Secret steht nur einmal da). Endpoint und Region folgen dem Standort, etwa `S3_ENDPOINT=https://fsn1.your-objectstorage.com` und `S3_REGION=fsn1` – nimm den Endpoint, den die Console bei deinem Bucket zeigt. Mit `FLOWPLAN_ENCRYPTION_KEY` liegen Dateien und Sicherungen dort verschlüsselt.

### PostgreSQL

| Variante | Ausfall des Datenbankservers | Aufwand |
| --- | --- | --- |
| **Ein PostgreSQL-Server mit Sicherungen** (`postgres.yaml` im Beispiel) | Flowplan steht, bis der Server wieder läuft oder aus der Sicherung neu aufgesetzt ist | gering: ein Server, Sicherungen wie unten |
| **Patroni auf drei kleinen Servern** mit etcd, HAProxy lokal auf jedem App-Server | ein anderer Server übernimmt in Sekunden | hoch: Patroni, etcd und HAProxy betreiben und überwachen |
| **Verwalteter Dienst** eines Anbieters mit Rechenzentrum in der Nähe | der Anbieter schaltet um | gering, aber die Datenbank liegt außerhalb des privaten Netzes: nur mit TLS (`sslmode=require`) und Zugriff nur von den Adressen deiner Server |

Hat Hetzner an deinem Standort keinen verwalteten PostgreSQL-Dienst, nimm einen Anbieter in der Nähe – jede Abfrage geht über diese Strecke. Wie Flowplan mit einem Failover umgeht und welche Adresse in `DATABASE_URL` gehört, steht unter [Failover und Replica](/postgresql#failover-und-replica). Mit Patroni zeigt `DATABASE_URL` auf `127.0.0.1:5000`, wo HAProxy nur den Primärserver anbietet.

### Redis

Ein kleiner Server mit `redis.yaml` aus dem Beispiel: Passwort, keine Speicherung, nur auf der privaten Adresse. Ein verwalteter Redis mit fester Adresse geht auch (`rediss://` mit TLS); Redis Sentinel und Redis Cluster nicht. Mit `FLOWPLAN_READY_REQUIRE=database,objectStorage` (so in der `.env.example`) bleibt Flowplan bereit, wenn Redis kurz fehlt.

### Load Balancer

Unter **Load Balancers** einen Load Balancer am selben Standort anlegen (der kleinste Typ reicht) und an das private Netz hängen:

| Einstellung | Wert |
| --- | --- |
| Ziele | `app-1` und `app-2`, über das **private Netz** |
| Dienst | **HTTPS**, Port 443 → Zielport 3000; Zertifikat von Hetzner verwaltet (Let's Encrypt, dafür muss die DNS-Zone bei Hetzner liegen) oder ein eigenes hochgeladen |
| HTTP → HTTPS | **Umleitung einschalten** |
| Health-Check | HTTP, Port 3000, Pfad `/api/health/ready`, alle 5–10 Sekunden, Zeitlimit 5 Sekunden, Antwort `200` |
| Sticky Sessions | **aus** – nicht nötig |
| Proxy Protocol | aus |
| Algorithmus | Round Robin oder Least Connections |

Der Load Balancer setzt `X-Forwarded-For`; deshalb steht in der `.env` `FLOWPLAN_TRUSTED_PROXIES=1`. Die Live-Verbindungen sind Server-Sent Events: Der Load Balancer muss sie ungepuffert durchreichen, Flowplan schickt regelmäßig ein Lebenszeichen, damit sie nicht wegen Stille geschlossen werden. Prüfe nach dem Einrichten, dass Änderungen einer zweiten Person sofort erscheinen und ein großer Import (bis 100 MB) durchgeht. Zum Schluss A- und AAAA-Eintrag deiner Domain auf die Adressen des Load Balancers stellen.

### App-Server einrichten

::: steps

1. Docker nach der [offiziellen Anleitung](https://docs.docker.com/engine/install/ubuntu/) installieren.
2. Die Beispieldateien holen: `git clone https://github.com/yannicschuller/flowplan.git` und den Inhalt von `deploy/compose/hetzner` nach `/opt/flowplan` kopieren.
3. Die Schlüssel **einmal** erzeugen – `openssl rand -base64 32` für `FLOWPLAN_ENCRYPTION_KEY`, `npx web-push generate-vapid-keys` für die Push-Schlüssel – und eine Kopie getrennt von den Sicherungen aufbewahren.
4. `cp .env.example .env` und ausfüllen: Domain, Datenbank, Redis, Bucket, Schlüssel, Setup-Token. Die `.env` ist auf beiden App-Servern gleich, bis auf `PRIVATE_IP` und `FLOWPLAN_INSTANCE_ID`.
5. `docker compose up -d` erst auf `app-1`, wenn er bereit ist auf `app-2`; dann über `https://<Domain>/register?setup=<Token>` das erste Konto anlegen.

:::

### Sicherungen

- **Geplante Sicherung** unter **Administration → Speicher & Sicherung** einschalten: Die leitende Instanz schreibt täglich (oder stündlich) ein `pg_dump`-Archiv in den Bucket unter `<Präfix>/backups/`, mit `FLOWPLAN_ENCRYPTION_KEY` verschlüsselt ([Sicherungen mit pg_dump](/postgresql#sicherungen-mit-pg-dump)).
- **Eine zweite Kopie außerhalb des Buckets**, etwa per [SFTP](/storage-and-backups#sicherung-per-sftp) auf eine Hetzner Storage Box – ein Fehler im Bucket trifft dann nicht beides.
- **Den Datenbankserver** zusätzlich mit den Backups von Hetzner (Abbilder der Platte); mit Patroni oder für Wiederherstellung auf jeden Zeitpunkt WAL-Archivierung (etwa pgBackRest) in einen eigenen Bucket.
- Die App-Server halten nichts, was nicht im Bucket oder in der Datenbank steht – ein neuer Server mit derselben `.env` ersetzt einen alten.

### Updates

::: steps

1. Die Versionshinweise lesen und in der `.env` auf beiden Servern `FLOWPLAN_VERSION` auf die neue Version setzen.
2. Auf `app-1`: `docker compose pull && docker compose up -d`. Die alte Instanz meldet `503`, der Load Balancer nimmt sie heraus, die neue bringt das Schema auf ihren Stand.
3. Warten, bis der Load Balancer `app-1` wieder als gesund zeigt (oder `curl http://<private IP>:3000/api/health/ready`).
4. Dasselbe auf `app-2`.

:::

Wer ganz sicher gehen will, nimmt den Server vor Schritt 2 im Load Balancer als Ziel heraus und danach wieder hinein. Die [Deployment-ID](#updates-ohne-unterbrechung) sorgt dafür, dass Browser in der Zwischenzeit nicht beide Versionen mischen.

## Weiter

- [Cluster-Modus](/cluster): alle Voraussetzungen und Variablen.
- [PostgreSQL](/postgresql#failover-und-replica): Failover, Replica und Zeitlimits.
- [Dimensionierung](/sizing): wie viele Instanzen und welche Hardware.
- [Kubernetes](/kubernetes): dasselbe mit dem Helm-Chart.
