# Cluster-Modus

Im Cluster-Modus bedienen mehrere Flowplan-Instanzen eine Installation: eine PostgreSQL-Datenbank, ein Redis, ein S3-Bucket und beliebig viele Instanzen hinter einem Load Balancer – für mehr gleichzeitig aktive Personen und Updates ohne Unterbrechung.

## Brauchst du ihn?

Für die meisten Teams nicht: Ein einzelner Container trägt mit SQLite etwa 20, mit PostgreSQL etwa 30 gleichzeitig aktive Personen (siehe [Dimensionierung](/sizing)). Der Cluster-Modus lohnt sich, wenn regelmäßig mehr Personen gleichzeitig arbeiten oder wenn Flowplan bei Updates und beim Ausfall eines Servers weiterlaufen soll. Er bringt dafür drei Dienste mit, die du betreiben (oder mieten) und sichern musst.

## Voraussetzungen

Eingeschaltet wird er mit `FLOWPLAN_CLUSTER=1`. Dann sind Pflicht:

| Was | Variable | Wofür |
| --- | --- | --- |
| **PostgreSQL** 16+ | `DATABASE_URL=postgres://…` | Alle Daten. SQLite ist eine Datei auf einem Host und geht nicht. Siehe [PostgreSQL](/postgresql). |
| **Redis** (getestet mit 7) | `REDIS_URL=redis://…` oder `rediss://…` (TLS) | Live-Bearbeitung, Präsenz und Rate-Limits zwischen den Instanzen. Nichts davon muss Redis dauerhaft speichern. |
| **S3-Speicher** | `S3_BUCKET`, `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | Alle Dateien; der lokale Ordner `uploads/` ist nur noch ein Zwischenspeicher. Siehe [Speicher, S3 und Sicherung](/storage-and-backups). |

Fehlt eines davon, startet eine Instanz nicht und nennt im Log alle Probleme auf einmal. `REDIS_URL` ohne Cluster-Modus wird mit einer Warnung ignoriert.

Ebenfalls Pflicht – auch hier startet eine Instanz ohne sie nicht: **Schlüssel, die auf allen Instanzen gleich sind.** Ein einzelner Container legt manche Schlüssel selbst im Datenordner an – im Cluster hat jede Instanz ihren eigenen Ordner, und jede würde andere erzeugen. Setze deshalb überall dieselben Werte:

- `FLOWPLAN_ENCRYPTION_KEY` oder `FLOWPLAN_SECRETS_KEY` (oder ihre Varianten `…_FILE`, etwa für Docker-Secrets) – sonst kann eine Instanz gespeicherte Geheimnisse und Signaturen der anderen nicht lesen (Zwei-Faktor-Anmeldung, KI-Schlüssel, entsperrte Freigabelinks). Siehe [Gespeicherte Geheimnisse](/configuration#gespeicherte-geheimnisse).
- `WEB_PUSH_PUBLIC_KEY` und `WEB_PUSH_PRIVATE_KEY` (ein VAPID-Schlüsselpaar, z. B. aus `npx web-push generate-vapid-keys`) – sonst passen Push-Abos nur zu einer Instanz. Siehe [Push-Benachrichtigungen](/configuration#push-benachrichtigungen).

Kommst du von einem einzelnen Container ohne diese Variablen, übernimm die Werte aus seinem Datenordner, damit gespeicherte Geheimnisse und Push-Abos gültig bleiben: den Inhalt von `secrets.key` als `FLOWPLAN_SECRETS_KEY` (zusätzlich zu einem `FLOWPLAN_ENCRYPTION_KEY`, beide werden gelesen) und `publicKey`/`privateKey` aus `web-push-keys.json` als `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`.

## Was die Instanzen teilen

- **Live-Bearbeitung und Präsenz:** Änderungen an Dokumenten, Datensätzen und Whiteboards, Cursor und „wer ist gerade hier“ gehen über Redis an alle Instanzen. Zwei Personen auf verschiedenen Instanzen arbeiten also gemeinsam wie auf einer. Die Daten selbst stehen in PostgreSQL; geht eine Nachricht verloren, holt der Browser den Stand beim nächsten Abgleich nach. **Sticky Sessions braucht es nicht.**
- **Rate-Limits:** Grenzen etwa für KI-Anfragen zählen über alle Instanzen (über Redis). Grenzen, die schon in der Datenbank stehen (fehlgeschlagene Anmeldungen, Demos, MCP), galten ohnehin für alle.
- **Aufgaben der leitenden Instanz:** Genau eine Instanz ist jeweils die leitende (bestimmt über eine Sperre in PostgreSQL). Nur sie erledigt die zeitgesteuerten Aufgaben: Erinnerungen, Automationen, Seitenprüfungen, Suchindex, Texterkennung von Dateien, Aufräumen und Aufbewahrung, Zusammenfassungen, geplante Sicherungen und Markdown-Exporte, LDAP-, Kalender- und Issue-Abgleich, E-Mail-Eingang, Telegram, KI-Hintergrundarbeit und die Warnungen der Überwachung. Fällt sie aus, übernimmt innerhalb weniger Sekunden eine andere.
- **Warteschlangen:** E-Mails, Push, Webhooks und Chat-Apps verschickt jede Instanz; jede Nachricht wird genau einmal von einer Instanz übernommen.
- **Dateien:** Eine hochgeladene Datei landet zuerst im Zwischenspeicher der Instanz, die sie angenommen hat, und diese lädt sie sofort in den Bucket (meist in deutlich unter einer Sekunde). Andere Instanzen holen sie bei Bedarf aus dem Bucket und warten dafür bis zu 5 Sekunden.

## Gesundheit, Bereitschaft und Herunterfahren

| Adresse | Antwortet | Gedacht für |
| --- | --- | --- |
| `/api/health/live` | `200`, solange der Prozess antwortet – ohne Datenbank-Prüfung, denn ein Neustart behebt keinen Datenbankausfall | Liveness-Probe |
| `/api/health/ready` | `200`, wenn Datenbank, Redis und Bucket erreichbar sind; sonst `503`, ebenso beim Herunterfahren | Readiness-Probe, Load Balancer |
| `/api/health` | wie bisher, siehe [Healthcheck](/operations#healthcheck) | Docker-Healthcheck, Apps |

Ohne Token antwortet `/api/health/ready` nur mit `ok`/`error` je Prüfung; mit `FLOWPLAN_METRICS_TOKEN` als Bearer-Token kommen Antwortzeiten und Fehlermeldungen dazu.

Welche Prüfungen über die Bereitschaft entscheiden, legt `FLOWPLAN_READY_REQUIRE` fest – eine Liste aus `database`, `redis` und `objectStorage`, Standard: alle drei. Die Datenbank zählt immer. Fällt Redis aus, werden mit dem Standard alle Instanzen zugleich „nicht bereit“, und der Load Balancer hat nichts mehr. Mit `FLOWPLAN_READY_REQUIRE=database,objectStorage` bleiben sie bereit: Bearbeiten und Speichern funktionieren weiter, nur Live-Änderungen zwischen den Instanzen kommen erst beim nächsten Abgleich an, und Rate-Limits zählt jede Instanz für sich.

**Herunterfahren:** Auf `SIGTERM` meldet die Instanz sofort `503` auf `/api/health/ready`, schließt die Live-Verbindungen (die Browser verbinden sich über den Load Balancer mit einer anderen Instanz), beantwortet offene Anfragen, gibt die Leitung ab und meldet sich bei den anderen ab. Gib ihr dafür 30 Sekunden (`stop_grace_period`, `terminationGracePeriodSeconds`).

## Schema vor dem Start

Jede Instanz bringt das Datenbankschema beim Start selbst auf ihren Stand (unter einer Sperre, sie warten aufeinander). Sauberer ist ein eigener Schritt vor dem Start der Instanzen, der bei einem Fehler laut abbricht:

```bash
DATABASE_URL=postgres://… node /app/scripts/db-schema.mjs
```

Dann `FLOWPLAN_PG_SCHEMA_AUTO=off` für die Instanzen setzen. Das Docker-Compose-Beispiel und das Helm-Chart machen es so. Das Schema wird nur ergänzt, nie verkleinert: Während eines Rolling Updates laufen alte und neue Instanzen nebeneinander.

## Docker Compose

Ein vollständiges Beispiel liegt unter [`deploy/compose/cluster`](https://github.com/yannicschuller/flowplan/tree/main/deploy/compose/cluster): PostgreSQL 16, Redis 7 mit Passwort und ohne Speicherung, MinIO als S3 samt Bucket-Anlage, der Schema-Schritt, zwei Flowplan-Instanzen und Caddy als Load Balancer. Es ist zum Ausprobieren auf einem Host gedacht und ein Ausgangspunkt; für den Betrieb gehören Datenbank, Redis und Speicher auf eigene, gesicherte Dienste.

```bash
git clone https://github.com/yannicschuller/flowplan.git
cd flowplan/deploy/compose/cluster
cp .env.example .env    # jeden Wert „change-me“ ersetzen
docker compose up -d
```

Darin:

- `.env` enthält `APP_URL`, `FLOWPLAN_SETUP_TOKEN` und die Passwörter für PostgreSQL (`POSTGRES_PASSWORD` und `POSTGRES_ADMIN_PASSWORD`), Redis und MinIO – nur Platzhalter, die du ersetzt. Pflicht sind außerdem `FLOWPLAN_ENCRYPTION_KEY`, `WEB_PUSH_PUBLIC_KEY` und `WEB_PUSH_PRIVATE_KEY` – in der `.env.example` leer; ohne sie bricht `docker compose up` mit einem Hinweis ab (siehe [Voraussetzungen](#voraussetzungen)).
- Der Dienst `schema` läuft einmal vor den Instanzen (`node /app/scripts/db-schema.mjs`); die Instanzen haben `FLOWPLAN_PG_SCHEMA_AUTO=off`.
- `flowplan-1` und `flowplan-2` haben je ein eigenes Volume als Zwischenspeicher, `FLOWPLAN_PG_POOL=20` und einen Healthcheck auf `/api/health/ready`. Mehr Instanzen: den Dienst `flowplan-2` kopieren und im `Caddyfile` ergänzen.
- Caddy verteilt reihum auf bereite Instanzen (Health-Check auf `/api/health/ready`) und reicht Live-Verbindungen ungepuffert durch (`flush_interval -1`). Für HTTPS `:8080` im `Caddyfile` durch deinen Hostnamen ersetzen.
- PostgreSQL läuft mit `max_connections=200`. Flowplan verbindet sich als Rolle `flowplan`, der die Datenbank gehört, die aber kein Superuser ist: `POSTGRES_PASSWORD` ist ihr Passwort, `POSTGRES_ADMIN_PASSWORD` das des Superusers `postgres` aus dem Image, nur für die Verwaltung. Beim ersten Start der Datenbank legt `postgres-init.sh` die Rolle an und installiert `pg_trgm` (und `pgvector`, wenn das Image es hat) in `flowplan_ext`. Ein Volume aus einer älteren Fassung des Beispiels behält seine Rollen – dort ist `flowplan` noch Superuser, bis du ihn [zurückstufst](/postgresql#rolle-ohne-superuser-rechte).

Ein anderer Load Balancer (nginx, Traefik, HAProxy) braucht dasselbe: Health-Check auf `/api/health/ready`, keine Pufferung für Server-Sent Events (`/api/documents/live` und die Cursor-Kanäle), lange Lese-Timeouts, Uploads bis 110 MB und `FLOWPLAN_TRUSTED_PROXIES` passend zur Zahl der Proxys.

## Kubernetes (Helm)

Das Chart unter [`deploy/helm/flowplan`](https://github.com/yannicschuller/flowplan/tree/main/deploy/helm/flowplan) hat den Cluster-Modus eingebaut (`cluster.enabled=true`). PostgreSQL, Redis und S3 legt es nicht an – nimm verwaltete Dienste oder eigene Charts. Die Verbindungsadressen stehen nur in Secrets, die du selbst anlegst:

```bash
kubectl create namespace flowplan
kubectl -n flowplan create secret generic flowplan-cluster \
  --from-literal=DATABASE_URL='postgres://flowplan:<Passwort>@postgres:5432/flowplan' \
  --from-literal=REDIS_URL='redis://:<Passwort>@redis-master:6379/0'
kubectl -n flowplan create secret generic flowplan-env \
  --from-literal=S3_ACCESS_KEY_ID='<Key-ID>' \
  --from-literal=S3_SECRET_ACCESS_KEY='<Secret>'
# die Schlüssel, die alle Pods teilen (Push-Schlüssel: npx web-push generate-vapid-keys)
kubectl -n flowplan create secret generic flowplan-keys \
  --from-literal=FLOWPLAN_ENCRYPTION_KEY="$(openssl rand -base64 32)" \
  --from-literal=WEB_PUSH_PUBLIC_KEY='<öffentlicher VAPID-Schlüssel>' \
  --from-literal=WEB_PUSH_PRIVATE_KEY='<privater VAPID-Schlüssel>'

helm install flowplan deploy/helm/flowplan -n flowplan \
  --set appUrl=https://flowplan.example.org \
  --set existingSecret=flowplan-env \
  --set cluster.enabled=true \
  --set cluster.replicas=3 \
  --set cluster.database.existingSecret=flowplan-cluster \
  --set cluster.redis.existingSecret=flowplan-cluster \
  --set cluster.keys.existingSecret=flowplan-keys \
  --set s3.bucket=flowplan --set s3.endpoint=https://s3.example.org
```

Was das Chart im Cluster-Modus tut:

- **Schema-Job** als `pre-install`/`pre-upgrade`-Hook (`node /app/scripts/db-schema.mjs`), bevor Pods einer neuen Version starten. Ohne ihn (`cluster.migration.enabled=false`) erledigen die Pods das beim Start.
- **Rolling Updates** ohne Unterbrechung (`maxUnavailable: 0`), ein **PodDisruptionBudget** (`cluster.podDisruptionBudget.minAvailable`, Standard 1) und Pods möglichst auf verschiedenen Knoten.
- **Probes:** Liveness auf `/api/health/live`, Readiness auf `/api/health/ready`; vor dem Stoppen wartet ein Pod `cluster.preStopSeconds` (5), damit der Load Balancer ihn herausnimmt.
- **Kein Volume:** `/app/data` ist ein `emptyDir` je Pod (`cluster.cacheSizeLimit`, 5 Gi); Dateien liegen im Bucket, Sicherungen macht PostgreSQL (`pg_dump`).
- **Datenbankrolle:** Die Rolle in `DATABASE_URL` sollte die Datenbank besitzen, aber kein Superuser sein. Viele PostgreSQL-Charts machen ihren Benutzer zum Superuser – lege dann eine eigene Rolle an, siehe [Rolle ohne Superuser-Rechte](/postgresql#rolle-ohne-superuser-rechte).
- **Verbindungen:** `cluster.poolSize` (10) je Pod plus zwei eigene; `replicas × (poolSize + 2)` muss unter `max_connections` des Servers bleiben.
- **Gemeinsame Schlüssel:** Aus dem Secret in `cluster.keys.existingSecret` bekommt jeder Pod `FLOWPLAN_ENCRYPTION_KEY`, `WEB_PUSH_PUBLIC_KEY` und `WEB_PUSH_PRIVATE_KEY`. Heißen die Schlüssel im Secret anders, nennst du sie mit `cluster.keys.encryptionKey`, `cluster.keys.webPushPublicKey` und `cluster.keys.webPushPrivateKey`. Bewahre eine Kopie des Verschlüsselungsschlüssels getrennt von den Sicherungen auf.
- Das Chart verweigert die Installation, wenn Datenbank, Redis, Bucket oder `cluster.keys.existingSecret` fehlen.

Mit ingress-nginx für die Live-Verbindungen die Annotationen `nginx.ingress.kubernetes.io/proxy-buffering: "off"` und `nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"` setzen, für Uploads `nginx.ingress.kubernetes.io/proxy-body-size: 110m`. Alle Werte erklärt das README des Charts.

## Administration → Überwachung → System

Der Abschnitt **System** unter **Administration → Überwachung** zeigt, wie die Installation läuft:

- **Betriebsart** (einzelner Container oder Cluster mit Zahl der Instanzen), **Datenbank** mit Version und Erreichbarkeit,
- **Verbindungen dieser Instanz** (offen, frei, wartend) und die **Zeitlimits**,
- **Redis** mit Version und gesendeten, empfangenen und fehlgeschlagenen Nachrichten, **Objektspeicher** mit Bucket und Erreichbarkeit,
- die **leitende Instanz** und seit wann sie leitet,
- die **gemeinsamen Warteschlangen** (Dateien, E-Mail, Push, Webhooks, Chat-Apps),
- im Cluster eine Tabelle aller **Instanzen** mit Status (leitend, bereit, fährt herunter), belegten und wartenden Verbindungen, Arbeitsspeicher und letzter Meldung. Eine Instanz, die sich 30 Sekunden nicht meldet, verschwindet aus der Liste.

„Wartend“ bei den Verbindungen heißt: Anfragen warten auf eine freie Datenbankverbindung – mehr `FLOWPLAN_PG_POOL` oder mehr Instanzen.

## Weitere Variablen

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_CLUSTER` | *leer* | `1` (oder `true`, `on`) schaltet den Cluster-Modus ein. Gleichwertig: `FLOWPLAN_MODE=cluster`. |
| `REDIS_URL` | *leer* | `redis://:<Passwort>@host:6379/0`, mit TLS `rediss://…`. Benutzer, Passwort und Datenbanknummer stehen in der Adresse. |
| `FLOWPLAN_READY_REQUIRE` | `database,redis,objectStorage` | Prüfungen, die über `/api/health/ready` entscheiden (oben). |
| `FLOWPLAN_INSTANCE_ID` | Hostname + Zufall | Name der Instanz in der Übersicht und in `application_name` der Datenbankverbindungen. Das Helm-Chart nimmt den Pod-Namen. |
| `FLOWPLAN_REDIS_PREFIX` | `flowplan:` | Präfix für Schlüssel und Kanäle, wenn sich mehrere Installationen ein Redis teilen. |
| `FLOWPLAN_LEADER_INTERVAL` | `5000` | Wie oft (ms) die Instanzen die Leitung prüfen; bestimmt, wie schnell eine ausgefallene leitende Instanz ersetzt wird. |

## Workflows im Cluster

Die Schritte von [Workflows](/workflows) stehen in einer Warteschlange in der Datenbank. Jede Instanz holt sich fällige Schritte mit einer **Lease** (2 Minuten); ein Fencing-Token sorgt dafür, dass eine Instanz, deren Lease abgelaufen ist, nichts mehr festschreibt. Fällt eine Instanz aus, übernimmt eine andere ihre Schritte nach Ablauf der Lease. Neue Schritte wecken die anderen Instanzen über Redis; ohne Bus prüfen sie im Takt. Zeitpläne und Datums-Auslöser laufen nur auf der Leader-Instanz und genau einmal je Termin. `FLOWPLAN_WORKFLOW_WORKERS` legt fest, wie viele Schritte eine Instanz gleichzeitig ausführt.

## Grenzen

- **Dateien lädt die Instanz hoch, die sie angenommen hat.** Bis dahin – normalerweise deutlich unter einer Sekunde – warten andere Instanzen bis zu 5 Sekunden. Einige Wege lesen den lokalen Ordner direkt (Exporte und Archive, manche Importe, Kopien beim Veröffentlichen) und können eine gerade auf einer anderen Instanz hochgeladene Datei noch verpassen. Fällt eine Instanz aus, bevor sie hochgeladen hat, ist die Datei verloren.
- **Wiederherstellen und Instanzumzug mit einer Instanz.** Eine hochgeladene Sicherung liegt im Zwischenspeicher der Instanz, die sie angenommen hat, und wird erst eingespielt, wenn diese leitet. Das Einspielen ersetzt alle Tabellen in einer Transaktion; Anfragen anderer Instanzen warten so lange und schlagen nach `FLOWPLAN_PG_LOCK_TIMEOUT` fehl. Im Kubernetes geht ein `emptyDir` beim Neustart verloren. Daher: vorher auf **eine Instanz** herunterskalieren (`cluster.replicas=1` bzw. nur `flowplan-1`), wiederherstellen, dann wieder hochskalieren. Dasselbe gilt für das [Umzugswerkzeug](/move-instance).
- **Redis ist ein Single Point:** Fällt es aus, funktionieren Bearbeiten und Speichern weiter, aber Live-Änderungen zwischen den Instanzen kommen erst beim nächsten Abgleich an, Rate-Limits zählt jede Instanz für sich, und mit dem Standard von `FLOWPLAN_READY_REQUIRE` werden alle Instanzen „nicht bereit“ (oben).
- **Kein Redis Sentinel und kein Redis Cluster:** Flowplan spricht mit genau einer Redis-Adresse. Ein verwalteter Redis mit fester Adresse funktioniert.
- **Pro Instanz** bleiben die Fortschrittsanzeigen von Wiederherstellen und Umzug sowie die Rückstandszahlen des Suchindex.

## Weiter

- [Dimensionierung](/sizing): wie viele Instanzen und welche Hardware.
- [Datenbank wechseln](/database-migration): eine bestehende Instanz nach PostgreSQL bringen. Für den Cluster vorher S3 im einzelnen Container einschalten und warten, bis alle Dateien im Bucket sind (**Administration → Speicher & Sicherung**, oder `objectStorage.pending` auf `0` unter [`/api/health`](/operations#healthcheck)).
