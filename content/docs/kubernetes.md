---
keywords: Kubernetes, Helm, Chart, Pods, Replikas, Hochverfügbarkeit, Ingress, Readiness, Rolling Update, k8s
---

# Kubernetes

Flowplan auf Kubernetes mit dem Helm-Chart: von einem Pod mit SQLite auf einem Volume bis zu mehreren Pods mit Hochverfügbarkeit gegen PostgreSQL, Redis und S3.

## Zwei Betriebsarten {since=0.9.9}

| | Ein Pod | Mehrere Pods (Cluster-Modus) |
| --- | --- | --- |
| Für | bis etwa 20 gleichzeitig aktive Personen | mehr Personen, Updates ohne Unterbrechung, Ausfall eines Knotens |
| Daten | SQLite und Dateien auf einem Volume (PVC) | PostgreSQL, Dateien in S3, Redis zwischen den Pods |
| Updates | kurze Unterbrechung (`Recreate`) | rollierend, Pod für Pod |
| Beispielwerte | [`values-small.yaml`](https://github.com/yannicschuller/flowplan/blob/main/deploy/helm/flowplan/values-small.yaml) | [`values-ha.yaml`](https://github.com/yannicschuller/flowplan/blob/main/deploy/helm/flowplan/values-ha.yaml) |

Wie viele Pods und wie viel CPU und Speicher: siehe [Dimensionierung](/sizing). Was die Pods teilen und wie sie zusammenarbeiten: siehe [Cluster-Modus](/cluster).

## Voraussetzungen {since=0.9.9}

- **Kubernetes 1.23** oder neuer, **Helm 3**, ein Ingress-Controller (ingress-nginx ist vorbereitet) und ein Zertifikat für deine Adresse (etwa cert-manager).
- **Ein Pod:** ein Block- oder lokales Volume (`ReadWriteOnce`) – kein NFS, SQLite kann darauf kaputtgehen.
- **Mehrere Pods:** **PostgreSQL 16** oder neuer, **Redis** (getestet mit 7, ohne Persistenz) und ein **S3-Bucket** (MinIO, Garage, AWS …). Das Chart installiert nichts davon – nimm verwaltete Dienste oder deren eigene Charts oder Operatoren. Die PostgreSQL-Rolle sollte die Datenbank besitzen, aber kein Superuser sein ([Rolle ohne Superuser-Rechte](/postgresql#rolle-ohne-superuser-rechte)); `max_connections` muss über `replicas × (cluster.poolSize + 3)` liegen.

> [!IMPORTANT]
> Das Chart nimmt kein Geheimnis als Wert. Passwörter, Schlüssel und Verbindungsadressen kommen in Secrets, die du anlegst; das Chart nennt nur ihre Namen. Nur den Einrichtungs-Token kann das Chart selbst erzeugen.

## Installation mit Helm {since=0.9.9}

Das Chart liegt im Repository unter [`deploy/helm/flowplan`](https://github.com/yannicschuller/flowplan/tree/main/deploy/helm/flowplan); sein README beschreibt jeden Wert.

::: tabs

== Ein Pod

```bash
git clone https://github.com/yannicschuller/flowplan.git && cd flowplan
kubectl create namespace flowplan
kubectl -n flowplan create secret generic flowplan-env \
  --from-literal=FLOWPLAN_ENCRYPTION_KEY="$(openssl rand -base64 32)"
cp deploy/helm/flowplan/values-small.yaml my-values.yaml   # Adresse, Host, SMTP, S3
helm install flowplan deploy/helm/flowplan -n flowplan -f my-values.yaml
```

Das Chart legt das Secret `flowplan-setup` mit einem zufälligen Einrichtungs-Token an, behält es bei Upgrades und löscht es beim Deinstallieren nicht.

== Mehrere Pods

```bash
kubectl create namespace flowplan
kubectl -n flowplan create secret generic flowplan-cluster \
  --from-literal=DATABASE_URL='postgres://flowplan:<passwort>@postgres:5432/flowplan' \
  --from-literal=REDIS_URL='redis://:<passwort>@redis-master:6379/0'
kubectl -n flowplan create secret generic flowplan-s3 \
  --from-literal=S3_ACCESS_KEY_ID='<schlüssel-id>' \
  --from-literal=S3_SECRET_ACCESS_KEY='<geheimnis>'
# die Schlüssel, die alle Pods teilen (Push-Schlüssel: npx web-push generate-vapid-keys)
kubectl -n flowplan create secret generic flowplan-keys \
  --from-literal=FLOWPLAN_ENCRYPTION_KEY="$(openssl rand -base64 32)" \
  --from-literal=WEB_PUSH_PUBLIC_KEY='<öffentlicher VAPID-Schlüssel>' \
  --from-literal=WEB_PUSH_PRIVATE_KEY='<privater VAPID-Schlüssel>'
kubectl -n flowplan create secret generic flowplan-env \
  --from-literal=OIDC_CLIENT_SECRET='<client-secret>' \
  --from-literal=FLOWPLAN_METRICS_TOKEN="$(openssl rand -hex 24)"
kubectl -n flowplan create secret generic flowplan-setup \
  --from-literal=FLOWPLAN_SETUP_TOKEN="$(openssl rand -hex 20)"
cp deploy/helm/flowplan/values-ha.yaml my-values.yaml   # Adresse, Hosts, Bucket, Replikas
helm install flowplan deploy/helm/flowplan -n flowplan -f my-values.yaml
```

Bevor die Pods starten, bringt ein Job das Datenbankschema auf diese Version. Bereit ist ein Pod erst, wenn Schema und Datenschritte durch sind.

:::

Danach:

```bash
helm test flowplan -n flowplan
echo "https://flowplan.example.org/register?setup=$(kubectl -n flowplan get secret flowplan-setup \
  -o jsonpath='{.data.FLOWPLAN_SETUP_TOKEN}' | base64 -d)"
```

Öffne den Link und lege das erste Konto an – es verwaltet die Instanz. Bewahre eine Kopie von `FLOWPLAN_ENCRYPTION_KEY` getrennt von den Sicherungen auf: ohne ihn lassen sich verschlüsselte Dateien und Sicherungen nicht mehr lesen.

### Was das Chart einrichtet

- **Prüfungen:** ein Pod auf `/api/health`; mehrere Pods mit Start- und Lebendprüfung auf `/api/health/live` und Bereitschaft auf `/api/health/ready` – bereit erst, wenn Schema und Datenschritte durch sind und Datenbank und Bucket antworten. Redis zählt standardmäßig nicht mit (`cluster.readyRequire: database,objectStorage`): fällt Redis aus, bleiben alle Pods in der Verteilung und das Bearbeiten geht weiter.
- **Ingress:** für ingress-nginx keine Pufferung, Lese- und Sendezeitlimits von einer Stunde für die Live-Verbindungen und Uploads bis `ingress.bodySize` (110 MB). Andere Controller: siehe README des Charts.
- **Sicherheit:** der Pod läuft als Nutzer 1000 ohne Rechte auf einem schreibgeschützten Root-Dateisystem; `/tmp`, `/app/.next/cache` und `/home/node` sind `emptyDir`s.
- **Ressourcen:** pro Pod 1 CPU und 2 GiB angefordert, höchstens 4 GiB (aus der [Dimensionierung](/sizing)); kein CPU-Limit, weil Drosselung das gemeinsame Bearbeiten bremst.
- **Mehrere Pods:** rollierende Updates ohne fehlenden Pod, ein PodDisruptionBudget, Verteilung über die Knoten, ein Zwischenspeicher pro Pod (`cluster.cacheSizeLimit`), der sich unter 70 % seiner Grenze hält.
- **Optional:** ein `ServiceMonitor` für den Prometheus Operator (`metrics.serviceMonitor.enabled`) und eine `NetworkPolicy` (`networkPolicy.enabled`).

Nicht Teil des Charts: PostgreSQL, Redis oder MinIO als Subcharts, ein HorizontalPodAutoscaler und eigene Worker-Pods – jeder Pod beantwortet Anfragen und nimmt Aufträge aus den Warteschlangen, der Leader die zeitgesteuerten.

## Umzug von einem SQLite-Container {since=0.9.9}

Die Daten bringst du mit dem Migrationswerkzeug in PostgreSQL, die Dateien mit dem S3-Spiegel des einzelnen Containers in den Bucket – beides ohne Verlust; nur das Kopieren selbst braucht eine kurze Unterbrechung.

::: steps

1. **Gleiche Version.** Bring den einzelnen Pod auf die Flowplan-Version, die der Cluster fahren wird (`helm upgrade` mit dem neuen Chart oder `image.tag`), und lass ihn einmal starten.
2. **Dateien in den Bucket.** Schalte im einzelnen Pod S3 ein (`s3.bucket`, `s3.endpoint`, die Schlüssel in `s3.existingSecret` oder `existingSecret`) und warte, bis alle Dateien dort sind: **Administration → Speicher & Sicherung**, oder `objectStorage.pending` auf `0` in [`/api/health`](/operations#healthcheck). Nimm im Cluster später denselben Bucket und dasselbe Präfix.
3. **Schlüssel behalten.** Ohne `FLOWPLAN_ENCRYPTION_KEY` und Push-Schlüssel hat der einzelne Container sie selbst erzeugt. Übernimm sie aus seinem Datenordner ins Secret `flowplan-keys`: den Inhalt von `secrets.key` als `FLOWPLAN_SECRETS_KEY` (zusätzlich zu einem `FLOWPLAN_ENCRYPTION_KEY`), `publicKey`/`privateKey` aus `web-push-keys.json` als `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`:

   ```bash
   kubectl -n flowplan exec deploy/flowplan -- cat /app/data/secrets.key
   kubectl -n flowplan exec deploy/flowplan -- cat /app/data/web-push-keys.json
   ```

4. **Ziel vorbereiten:** eine leere PostgreSQL-Datenbank und eine Rolle, der sie gehört ([Voraussetzungen](/postgresql#voraussetzungen)), und das Secret `flowplan-cluster` wie oben.
5. **Sichern:** **Administration → Speicher & Sicherung → Gesamte Instanz → Herunterladen**.
6. **Flowplan anhalten:** `kubectl -n flowplan scale deploy/flowplan --replicas=0`. Das Volume bleibt.
7. **Kopieren und prüfen** mit einem Pod auf demselben Volume (`flowplan-data` ist das PVC des Charts):

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: flowplan-migrate
   spec:
     restartPolicy: Never
     securityContext: { runAsUser: 1000, runAsGroup: 1000, fsGroup: 1000 }
     containers:
       - name: migrate
         image: ghcr.io/yannicschuller/flowplan:0.9.9
         command: ["node", "/app/scripts/db-migrate.mjs"]
         args: ["--from", "sqlite:/app/data/flowplan.sqlite", "--to", "$(DATABASE_URL)"]
         env:
           - name: DATABASE_URL
             valueFrom: { secretKeyRef: { name: flowplan-cluster, key: DATABASE_URL } }
         volumeMounts: [{ name: data, mountPath: /app/data }]
     volumes:
       - name: data
         persistentVolumeClaim: { claimName: flowplan-data }
   ```

   `kubectl -n flowplan apply -f migrate.yaml`, dann `kubectl -n flowplan logs -f flowplan-migrate`. Die letzte Zeile muss `verified: every table has the same rows` lauten. Lösche den Pod danach. Einzelheiten und Optionen des Werkzeugs: [Datenbank wechseln](/database-migration).
8. **In den Cluster-Modus wechseln:** `helm upgrade flowplan deploy/helm/flowplan -n flowplan -f my-values.yaml` mit `cluster.enabled: true` und demselben Bucket. Das PVC bleibt erhalten – lösch es erst, wenn der Cluster läuft und seine erste Sicherung da ist.
9. **Prüfen:** anmelden, eine Seite mit Bildern öffnen, suchen, und unter **Administration → Überwachung → System** die Pods, den Leader und **PostgreSQL** sehen.

:::

## Updates {since=0.9.9}

```bash
git pull
helm upgrade flowplan deploy/helm/flowplan -n flowplan -f my-values.yaml
```

Mit mehreren Pods läuft zuerst der Schema-Job (er ergänzt nur, er entfernt nie), dann werden die Pods einer nach dem anderen ersetzt: ein neuer Pod bekommt Anfragen erst, wenn er bereit ist, ein alter hält erst danach an. Browser eines anhaltenden Pods verbinden sich von selbst mit einem anderen. Schlägt der Job fehl, wird nichts ersetzt – `kubectl -n flowplan logs job/flowplan-schema` sagt warum. Zurück mit `helm rollback` geht: eine ältere Version läuft auf dem neueren Schema.

Ein Pod, der anhält, bekommt `terminationGracePeriodSeconds` (30): offene Anfragen und laufende Aufgaben werden fertig, Uploads, die noch unterwegs sind, erreichen den Bucket, die Leitung geht an einen anderen Pod. Für lange Importe oder Exporte erhöhst du den Wert.

## Sicherungen {since=0.9.9}

- **Ein Pod:** wie mit Docker – geplante Sicherungen in der Administration, mit S3 zusätzlich Litestream ([Speicher, S3 und Sicherung](/storage-and-backups)). Sichere auch das Volume, wenn deine Plattform das kann.
- **Mehrere Pods:** PostgreSQL hält alle Daten: die geplanten Sicherungen der Administration sind `pg_dump`-Archive im Bucket ([Sicherungen mit pg_dump](/postgresql#sicherungen-mit-pg-dump)); dazu die Sicherungen oder die Wiederherstellung auf einen Zeitpunkt deines Anbieters. Die Dateien liegen im Bucket – schalte dort die Versionierung ein oder repliziere ihn. Redis braucht keine Sicherung.
- **Immer:** die Secrets (vor allem `FLOWPLAN_ENCRYPTION_KEY` und die Push-Schlüssel) getrennt von den Sicherungen aufbewahren.
- **Wiederherstellen** ersetzt alle Tabellen: zuerst auf **einen Pod** verkleinern (`cluster.replicas: 1`), wiederherstellen, dann wieder vergrößern.

## Skalieren {since=0.9.9}

`cluster.replicas` setzen und `helm upgrade` – ein Pod pro etwa 25 gleichzeitig aktive Personen, dazu eine Reserve. Mehr Pods brauchen mehr Datenbankverbindungen: jeder öffnet bis zu `cluster.poolSize` und drei eigene. Das PodDisruptionBudget (`cluster.podDisruptionBudget.minAvailable`) hält Pods am Laufen, während Knoten geleert werden; halte es unter `replicas`.

Worauf du achtest: Antwortzeiten und CPU pro Pod unter **Administration → Überwachung**, „wartende“ Verbindungen unter **System** (`cluster.poolSize` erhöhen oder Pods ergänzen), und mit Prometheus die Metriken jedes Pods (Label `instance_id`; die Zahlen der Installation nur vom Leader).

## Grenzen {since=0.9.9}

- **Wiederherstellungen und Instanzumzüge mit einem Pod** – siehe Sicherungen.
- **Importe** liegen im Zwischenspeicher des Pods (`cluster.cacheSizeLimit`, 5 GiB) und im Bucket bereit; für Importe von mehreren Gigabyte erhöhst du die Grenze und `ingress.bodySize`.
- **Redis:** nur eine Adresse, kein Sentinel und kein Redis Cluster. Solange Redis weg ist, kommen Änderungen zwischen den Pods mit der nächsten Prüfung des Browsers (innerhalb von etwa 20 Sekunden) statt sofort, und Ratenlimits zählen pro Pod.
- **Besprechungsnotizen:** eine Aufnahme transkribiert der Pod, der ihr Ende bekommen hat; hält er währenddessen an, startest du die Verarbeitung im Block erneut.
- **Nicht auf jeder Plattform getestet:** das Chart wird gegen die Kubernetes-API geprüft; melde, was dein Controller braucht.

## Fehlersuche {since=0.9.9}

| Anzeichen | Ursache und Abhilfe |
| --- | --- |
| Pods bleiben „nicht bereit“ | Frag den Pod, was fehlt: `kubectl -n flowplan exec deploy/flowplan -- node -e "fetch('http://127.0.0.1:3000/api/health/ready',{headers:{authorization:'Bearer '+process.env.FLOWPLAN_METRICS_TOKEN}}).then(r=>r.text()).then(console.log)"` – `opening` nennt einen fehlgeschlagenen Datenschritt oder ein älteres Schema, `database` und `objectStorage` ihre Fehler. |
| Der Schema-Job schlägt fehl | `kubectl -n flowplan logs job/flowplan-schema`: meist Adresse, Passwort oder fehlende Rechte der Rolle. |
| Pods starten nicht: „Cluster mode cannot start“ | Ein Secret oder Schlüssel fehlt; das Log nennt alle Probleme auf einmal. |
| Live-Änderungen kommen spät oder die Verbindung bricht alle paar Sekunden ab | Der Ingress puffert oder kappt den Stream: mit ingress-nginx `ingress.nginxDefaults` lassen; für andere siehe README des Charts. |
| Uploads scheitern mit 503 | Der Bucket antwortet nicht – eine Datei gilt erst als gespeichert, wenn sie im Bucket liegt. Endpoint, Schlüssel und Network Policy prüfen. |
| Pods werden verdrängt („ephemeral-storage“) | Zwischenspeicher oder `/tmp` zu klein für große Dateien: `cluster.cacheSizeLimit` oder `scratch.tmpSizeLimit` erhöhen. |
| „remaining connection slots are reserved“ | Zu viele Verbindungen: `cluster.poolSize` senken oder `max_connections` erhöhen. |
| „Shutdown: not finished in time“ im Log | `terminationGracePeriodSeconds` erhöhen. |
| Zwei-Faktor-Anmeldung oder Push klappen nur manchmal | Die Pods haben verschiedene Schlüssel: `cluster.keys.existingSecret` muss für alle dasselbe Secret sein. |
