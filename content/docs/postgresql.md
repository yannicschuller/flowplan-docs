---
keywords: PostgreSQL, Postgres, Datenbank, DATABASE_URL
---

# PostgreSQL

Statt SQLite kann Flowplan eine PostgreSQL-Datenbank nutzen – wenn du ohnehin einen gepflegten Datenbankserver betreibst, mehr Personen gleichzeitig arbeiten oder du mehrere Instanzen im [Cluster-Modus](/cluster) laufen lassen willst.

## SQLite oder PostgreSQL?

**SQLite bleibt der Standard** und für die meisten Instanzen die beste Wahl: ein Container, ein Datenordner, nichts weiter zu betreiben. Eine einzelne Abfrage ist auf SQLite sogar schneller, weil sie im selben Prozess läuft.

PostgreSQL lohnt sich, wenn

- du einen Datenbankserver schon betreibst oder mietest (mit eigener Überwachung, Replikation und Point-in-Time-Recovery) und Flowplan dort einordnen willst,
- regelmäßig mehr als etwa 20 Personen **gleichzeitig** in Flowplan arbeiten (siehe [Dimensionierung](/sizing)),
- du mehrere Flowplan-Instanzen hinter einem Load Balancer betreiben willst – der [Cluster-Modus](/cluster) setzt PostgreSQL voraus.

Funktional gibt es keinen Unterschied: Alle Funktionen, die Suche und die Sicherungen arbeiten mit beiden Datenbanken. Wechseln kannst du jederzeit in beide Richtungen, siehe [Datenbank wechseln](/database-migration).

Auch mit PostgreSQL braucht Flowplan seinen Datenordner (`/app/data`): Dort liegen die hochgeladenen Dateien (ohne S3), `secrets.key`, die Push-Schlüssel und Zwischendateien von Sicherungen. Nur die Datenbank wandert nach PostgreSQL.

## Voraussetzungen

- **PostgreSQL 16 oder neuer**, eine leere Datenbank (oder ein leeres Schema) und eine Rolle, der sie gehört. Superuser-Rechte braucht Flowplan nicht – und sollte sie auch nicht haben, siehe [Rolle ohne Superuser-Rechte](#rolle-ohne-superuser-rechte).
- **Locale mit UTF-8**, etwa `en_US.utf8` oder `de_DE.utf8` – so ist es im offiziellen `postgres`-Image und bei den meisten verwalteten Diensten. Mit der Locale `C` findet die Suche chinesischen und japanischen Text zwar weiterhin richtig, aber deutlich langsamer.
- **Erweiterung `pg_trgm`** für die Volltextsuche. Sie gehört zu jedem normalen PostgreSQL und ist „trusted“: Flowplan installiert sie selbst in ein eigenes Schema `flowplan_ext`, wenn die Rolle in der Datenbank Objekte anlegen darf (`CREATE`-Recht, als Eigentümerin der Datenbank gegeben). Sonst einmal als Administrator: `CREATE EXTENSION pg_trgm;`. Ohne `pg_trgm` funktioniert die Suche weiter, durchsucht aber jedes Mal alle Einträge (das Log sagt das).
- **Optional `pgvector`** für die [semantische KI-Suche](/ai). Ab pgvector 0.8 installiert Flowplan sie selbst wie `pg_trgm`. **Vor 0.8** ist die Erweiterung nicht „trusted“ – dann führt ein Administrator in der Datenbank von Flowplan einmal `CREATE EXTENSION vector;` aus, und Flowplan nutzt sie ab dem nächsten Start. Ohne `pgvector` rechnet Flowplan die semantische Suche selbst, wie auf SQLite; abschalten lässt sie sich mit `FLOWPLAN_PGVECTOR=off`.
- **Für die Sicherungen** `pg_dump` und `pg_restore` mindestens in der Hauptversion des Servers. Das Docker-Image bringt die Werkzeuge von PostgreSQL 18 mit; sie sichern und spielen auf Servern von Version 16 bis 18 ein. Ohne Docker das Paket `postgresql-client` passend installieren oder mit `FLOWPLAN_PG_BIN` auf den Ordner mit den Programmen zeigen.

```sql
-- als Administrator (Superuser) auf dem PostgreSQL-Server
CREATE ROLE flowplan LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD '<Passwort>';
CREATE DATABASE flowplan OWNER flowplan;
-- in der neuen Datenbank die Erweiterungen in ein eigenes Schema:
\c flowplan
CREATE SCHEMA IF NOT EXISTS flowplan_ext AUTHORIZATION flowplan;
CREATE EXTENSION IF NOT EXISTS pg_trgm SCHEMA flowplan_ext;
-- optional, für die semantische Suche (vor pgvector 0.8 nur so):
CREATE EXTENSION IF NOT EXISTS vector SCHEMA flowplan_ext;
```

### Rolle ohne Superuser-Rechte

Lass Flowplan mit einer Rolle verbinden, der die Datenbank gehört, die aber **kein Superuser** ist. Flowplan legt in seiner Datenbank Tabellen, Funktionen und Trigger an und ändert sie – dafür reicht die Eigentümerschaft. Ein Superuser dagegen kann Dateien auf dem Datenbankserver lesen und dort Programme starten (`COPY … TO PROGRAM`); eine Lücke in Flowplan oder ein Administrator, der sie ausnutzt, käme damit bis auf den Host.

Viele Images und Charts machen den eingestellten Benutzer zum Superuser – das offizielle `postgres`-Image etwa `POSTGRES_USER`. Lege dann wie oben eine eigene Rolle an. Die Erweiterungen installiert der Administrator am besten gleich mit, in das Schema `flowplan_ext`: Flowplan nutzt eine installierte Erweiterung dort, wo sie liegt, und legt `pg_trgm` (und `pgvector` ab 0.8) sonst selbst in `flowplan_ext` an. `pgvector` vor 0.8 kann nur ein Administrator installieren; ohne läuft die semantische Suche langsamer.

Eine bestehende Rolle, die Superuser ist, stuft ein anderer Superuser zurück:

```sql
-- einmalig, solange flowplan noch Superuser ist (als flowplan):
CREATE ROLE admin LOGIN SUPERUSER PASSWORD '<Passwort>';
-- dann als admin:
ALTER ROLE flowplan NOSUPERUSER NOCREATEROLE NOCREATEDB;
```

Datenbank und Tabellen gehören weiter `flowplan`, und die bisher installierten Erweiterungen bleiben nutzbar. Den Zugang `admin` hebst du für die Verwaltung auf; Flowplan braucht ihn nicht.

## Einrichten

PostgreSQL wählst du mit `DATABASE_URL`. Beginnt der Wert mit `postgres://` oder `postgresql://`, nutzt Flowplan PostgreSQL; fehlt er, bleibt es bei SQLite.

```dotenv
DATABASE_URL=postgres://flowplan:<Passwort>@db.example.internal:5432/flowplan
# mit TLS zum Datenbankserver:
# DATABASE_URL=postgres://flowplan:<Passwort>@db.example.internal:5432/flowplan?sslmode=require
```

Sonderzeichen im Passwort (`@`, `:`, `/`, `#` …) müssen in der Adresse prozentkodiert sein, z. B. `%40` für `@`.

Beim **ersten Start** legt Flowplan alle Tabellen, Indizes und Trigger selbst an. Bei jedem Update ergänzt es, was die neue Version braucht – es löscht nie etwas, und mehrere Instanzen stimmen sich dabei über eine Sperre ab. Ein Update geht also wie gewohnt: neues Image holen, Container neu starten.

### Mit Docker Compose

Ein Beispiel für einen einzelnen Container mit PostgreSQL daneben. Für `pgvector` statt `postgres:16` das Image `pgvector/pgvector:0.8.0-pg16` nehmen.

```yaml
services:
  flowplan:
    image: ghcr.io/yannicschuller/flowplan:latest
    env_file: .env
    environment:
      FLOWPLAN_DATA_DIR: /app/data
      DATABASE_URL: postgres://flowplan:${POSTGRES_PASSWORD}@postgres:5432/flowplan
    ports:
      - "127.0.0.1:3000:3000"
    volumes:
      - flowplan-data:/app/data
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${POSTGRES_ADMIN_PASSWORD}
      FLOWPLAN_DB_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./postgres-init.sh:/docker-entrypoint-initdb.d/10-flowplan.sh:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -h 127.0.0.1 -U flowplan -d flowplan"]
      interval: 5s
      retries: 20
    restart: unless-stopped

volumes:
  flowplan-data:
  postgres-data:
```

`POSTGRES_PASSWORD` (das Passwort der Rolle `flowplan`) und `POSTGRES_ADMIN_PASSWORD` (das des Superusers `postgres` aus dem Image, nur für die Verwaltung) stehen in der `.env` neben der `compose.yaml` (je `openssl rand -hex 24`). Das Skript [`postgres-init.sh`](https://github.com/yannicschuller/flowplan/blob/main/deploy/compose/cluster/postgres-init.sh) aus dem Cluster-Beispiel legt beim ersten Start der Datenbank die Rolle `flowplan` ohne Superuser-Rechte an, gibt ihr die Datenbank `flowplan` und installiert die Erweiterungen in `flowplan_ext` – leg es neben die `compose.yaml`. Ein Volume aus einer älteren Fassung dieses Beispiels (`POSTGRES_USER: flowplan`) behält seine Rollen: Dort ist `flowplan` der Superuser, bis du ihn [zurückstufst](#rolle-ohne-superuser-rechte).

### Variablen

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `DATABASE_URL` | *leer* (SQLite) | Adresse der PostgreSQL-Datenbank, `postgres://…` oder `postgresql://…`. |
| `DATABASE_SESSION_URL` | `DATABASE_URL` | Eigene Verbindung für Benachrichtigungen, die Leitung im Cluster und `pg_dump`/`pg_restore`/`psql` – nur nötig, wenn `DATABASE_URL` auf PgBouncer im Modus `transaction` zeigt ([unten](#pgbouncer)). |
| `FLOWPLAN_PG_SCHEMA` | `public` | Schema innerhalb der Datenbank, falls Flowplan sich die Datenbank mit anderem teilt. Wird angelegt, wenn es fehlt. |
| `FLOWPLAN_PG_POOL` | `10` | Verbindungen je Instanz (1–500). |
| `FLOWPLAN_PG_STATEMENT_TIMEOUT` | `120000` | Höchstdauer einer Abfrage in Millisekunden; `0` = kein Limit. |
| `FLOWPLAN_PG_LOCK_TIMEOUT` | `10000` | So lange wartet eine Abfrage höchstens auf eine Sperre (ms). |
| `FLOWPLAN_PG_IDLE_TX_TIMEOUT` | `60000` | Eine Transaktion, die so lange nichts tut, wird beendet (ms). |
| `FLOWPLAN_PG_CONNECT_TIMEOUT` | `30000` | So lange wartet eine Anfrage auf eine freie Verbindung aus dem Pool (ms). |
| `FLOWPLAN_PG_PREPARE` | an | `off` schickt jede Abfrage ohne Namen statt als benanntes Prepared Statement – für PgBouncer im Modus `transaction` vor 1.21 oder ohne `max_prepared_statements`. |
| `FLOWPLAN_PG_SCHEMA_AUTO` | an | `off`: Die Instanz legt das Schema nicht selbst an oder aktualisiert es – das übernimmt ein eigener Schritt (`node /app/scripts/db-schema.mjs`, siehe [Cluster-Modus](/cluster#schema-vor-dem-start)). |
| `FLOWPLAN_PGVECTOR` | an | `off` nutzt `pgvector` nicht, auch wenn es installiert ist. |
| `FLOWPLAN_BACKUP_FORMAT` | `pg_dump` | `sqlite`: geplante Sicherungen im portablen SQLite-Format statt mit `pg_dump` (unten). |
| `FLOWPLAN_PG_BIN` | *leer* | Ordner mit `pg_dump`, `pg_restore` und `psql`, wenn sie nicht im `PATH` liegen. |

Alle Variablen stehen auch kommentiert in der [`.env.example`](https://github.com/yannicschuller/flowplan/blob/main/.env.example) des Repositorys.

Lange Arbeiten wie Sicherungen, Wiederherstellungen und Schema-Änderungen heben die Zeitlimits für sich selbst auf.

**Verbindungen:** Jede Instanz öffnet bis zu `FLOWPLAN_PG_POOL` Verbindungen und bis zu zwei eigene (Benachrichtigungen, im Cluster die Wahl der leitenden Instanz). `max_connections` des Servers muss also mindestens `Instanzen × (FLOWPLAN_PG_POOL + 2)` plus Reserve für Sicherungen und Administration betragen. Der PostgreSQL-Standard von 100 reicht für eine Instanz mit dem Standardpool bequem.

## Suche auf PostgreSQL

Die Suche liefert auf PostgreSQL dieselben Treffer in derselben Reihenfolge wie auf SQLite: Teile von Wörtern („plan“ in „Projektplanung“), chinesischer und japanischer Text ohne Leerzeichen, Umlaute und Akzente, Titel vor Text, dieselben Ausschnitte. Technisch arbeitet sie mit Trigramm-Indizes aus `pg_trgm`.

> [!NOTE]
> **Erster Start nach dem Update oder Wechsel:** Flowplan baut die beiden Suchindizes beim Öffnen der Datenbank. Auf großen Instanzen kann das einige Minuten dauern; so lange antwortet die Instanz noch nicht. Gib Healthchecks entsprechend Zeit (`start_period`, `startupProbe`). Danach füllt sich der Index im Hintergrund – die Suche funktioniert schon und findet mit der Zeit mehr.

Den Suchindex komplett neu aufbauen, etwa nach dem Einspielen von `pg_trgm` oder wenn Treffer fehlen:

```bash
docker compose exec flowplan node /app/scripts/db-search-rebuild.mjs
```

Das Skript liest `DATABASE_URL` und `FLOWPLAN_PG_SCHEMA` aus der Umgebung des Containers; die laufende Instanz indexiert danach alles neu (Seiten, Einträge, Kommentare, Nachrichten und Dateien). Auf SQLite funktioniert derselbe Befehl.

## Sicherungen mit pg_dump

Auf PostgreSQL schreiben die **geplante Sicherung** und **Jetzt sichern** (Administration → Speicher & Sicherung) ein Archiv von `pg_dump` im Custom-Format: `flowplan-2026-11-07-03-00.dump`, mit `FLOWPLAN_ENCRYPTION_KEY` verschlüsselt als `.dump.enc`. Sonst bleibt alles wie bei SQLite:

- Ziele: S3 unter `<Präfix>/backups/`, [SFTP](/storage-and-backups#sicherung-per-sftp) oder der Datenordner – mit derselben Aufbewahrung und demselben [verzögerten Löschen](/storage-and-backups#verzoegertes-loeschen) der Dateien.
- [Verschlüsselung](/storage-encryption#verschluesselung) wie gehabt; `decrypt.mjs` entschlüsselt auch `.dump.enc`.
- Das Archiv enthält nur das Schema von Flowplan, ohne Suchindex und `pgvector`-Tabelle – beide baut Flowplan nach dem Einspielen neu auf. Es ist dadurch kleiner und lässt sich auch auf einem Server ohne `pg_trgm` oder `pgvector` einspielen.
- `pg_dump` läuft außerhalb von Flowplan und belastet die Instanz kaum.

**Ausweichen auf SQLite:** Fehlt ein passendes `pg_dump` (zu alt oder nicht installiert), schreibt die geplante Sicherung stattdessen eine portable SQLite-Datei (`flowplan-….sqlite`) und vermerkt das im Log. Mit `FLOWPLAN_BACKUP_FORMAT=sqlite` ist das immer so. Eine solche Datei lässt sich auf SQLite **und** PostgreSQL einspielen.

Die **Instanzsicherung** (Administration → Speicher & Sicherung → Gesamte Instanz → Herunterladen) enthält die Datenbank immer im portablen SQLite-Format und lässt sich deshalb auf beiden Datenbanken wiederherstellen. Litestream läuft mit PostgreSQL nicht – für eine laufende Sicherung mit beliebigem Zeitpunkt nutze die Mittel deines Datenbankservers (WAL-Archivierung, Point-in-Time-Recovery des Anbieters).

### Wiederherstellen

- **Ein `pg_dump`-Archiv auf einer laufenden Instanz** (`flowplan-….dump`, `.dump.enc`): unter **Administration → Speicher & Sicherung → Aus Sicherung wiederherstellen** hochladen. Flowplan prüft es sofort und spielt es beim nächsten Neustart ein – im Cluster-Modus die leitende Instanz, siehe [Grenzen](/cluster#grenzen). Nur die Datenbank wird ersetzt; die Dateien bleiben, wie sie sind.
- **Auf einer neuen Instanz** mit PostgreSQL geht dasselbe auf dem Einrichtungsbildschirm: hochladen oder aus S3 bzw. per SFTP holen, wie unter [Beim Einrichten wiederherstellen](/storage-and-backups#beim-einrichten-wiederherstellen).
- Eine Instanz mit SQLite lehnt solche Archive ab – dafür gibt es die Instanzsicherung oder den [Wechsel der Datenbank](/database-migration).
- Flowplan prüft das Archiv vorher (eine Flowplan-Datenbank, nicht aus einer neueren Version), ersetzt dann das ganze Schema in einer Transaktion und baut den Suchindex neu. Aus dem Archiv kommen dabei nur die Daten der Tabellen von Flowplan; Tabellen, Funktionen und Trigger legt die laufende Version selbst an. Ältere Archive passen so in die aktuellen Tabellen.
- Enthält das Archiv Objekte, die Flowplan nicht selbst anlegt – eigene Funktionen, Views, Trigger oder Regeln im Schema von Flowplan –, lehnt Flowplan es ab: „Die Sicherung enthält Datenbankobjekte, die Flowplan nicht selbst anlegt (etwa Funktionen oder Trigger), und wird deshalb nicht wiederhergestellt.“ Eigene Objekte gehören in ein anderes Schema; das sichert `pg_dump` von Flowplan nicht mit. Der vorherige Stand bleibt als `pre-restore-<Zeit>/flowplan.dump` im Datenordner – plane dafür Platz für ein weiteres Archiv ein. Schlägt das Einspielen fehl, kommt der vorherige Stand zurück.
- Ein Archiv aus einem anderen Schema (`FLOWPLAN_PG_SCHEMA`) lässt sich ebenfalls einspielen.
- **Die Instanzsicherung** (ZIP) stellst du wie bisher an derselben Stelle wieder her; sie passt auf beide Datenbanken.

## PgBouncer

Flowplan hält seine Verbindungen selbst im Pool; eine direkte Verbindung zum Server ist der einfachste Weg. PgBouncer davor sollte so funktionieren – mit einem echten PgBouncer getestet ist es bisher nicht:

- **Benannte Prepared Statements:** Flowplan nutzt sie standardmäßig. Im Modus `transaction` braucht PgBouncer dafür Version 1.21 oder neuer mit `max_prepared_statements` größer als `0`. Sonst `FLOWPLAN_PG_PREPARE=off` setzen: Flowplan schickt dann jede Abfrage ohne Namen (kostet rund ein Drittel des Durchsatzes).
- **Eine eigene Sitzung für Benachrichtigungen, Leitung und Sicherungen:** `LISTEN`, die Sperre der leitenden Instanz im Cluster und `pg_dump`, `pg_restore` und `psql` brauchen eine Verbindung, die ihnen allein gehört. Sie nutzen `DATABASE_SESSION_URL` – zeig damit direkt auf den Server oder auf einen Pool im Modus `session`. Ohne die Variable nehmen sie `DATABASE_URL`.
- **Startparameter `options`:** Flowplan übergibt Schema (`search_path`) und Zeitlimits beim Verbindungsaufbau als `options`. Lehnt PgBouncer das ab, hilft `ignore_startup_parameters = options` – dann muss das Schema `public` sein, und die Zeitlimits setzt du an der Rolle (`ALTER ROLE flowplan SET statement_timeout = '120s'` usw.).

```dotenv
# Pool über PgBouncer im Modus transaction, eigene Sitzungen direkt zum Server
DATABASE_URL=postgres://flowplan:<Passwort>@pgbouncer:6432/flowplan
DATABASE_SESSION_URL=postgres://flowplan:<Passwort>@postgres:5432/flowplan
# nur ohne max_prepared_statements bzw. vor PgBouncer 1.21:
# FLOWPLAN_PG_PREPARE=off
```

## Weiter

- [Datenbank wechseln](/database-migration): von SQLite zu PostgreSQL und zurück.
- [Cluster-Modus](/cluster): mehrere Instanzen mit Redis und S3.
- [Dimensionierung](/sizing): wie viele Personen eine Instanz trägt.
