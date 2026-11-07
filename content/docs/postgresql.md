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

- **PostgreSQL 16 oder neuer**, eine leere Datenbank (oder ein leeres Schema) und eine Rolle, der sie gehört. Superuser-Rechte braucht Flowplan nicht.
- **Locale mit UTF-8**, etwa `en_US.utf8` oder `de_DE.utf8` – so ist es im offiziellen `postgres`-Image und bei den meisten verwalteten Diensten. Mit der Locale `C` findet die Suche chinesischen und japanischen Text zwar weiterhin richtig, aber deutlich langsamer.
- **Erweiterung `pg_trgm`** für die Volltextsuche. Sie gehört zu jedem normalen PostgreSQL und ist „trusted“: Flowplan installiert sie selbst in ein eigenes Schema `flowplan_ext`, wenn die Rolle in der Datenbank Objekte anlegen darf (`CREATE`-Recht, als Eigentümerin der Datenbank gegeben). Sonst einmal als Administrator: `CREATE EXTENSION pg_trgm;`. Ohne `pg_trgm` funktioniert die Suche weiter, durchsucht aber jedes Mal alle Einträge (das Log sagt das).
- **Optional `pgvector`** für die [semantische KI-Suche](/ai). Ab pgvector 0.8 installiert Flowplan sie selbst wie `pg_trgm`. **Vor 0.8** ist die Erweiterung nicht „trusted“ – dann führt ein Administrator in der Datenbank von Flowplan einmal `CREATE EXTENSION vector;` aus, und Flowplan nutzt sie ab dem nächsten Start. Ohne `pgvector` rechnet Flowplan die semantische Suche selbst, wie auf SQLite; abschalten lässt sie sich mit `FLOWPLAN_PGVECTOR=off`.
- **Für die Sicherungen** `pg_dump` und `pg_restore` mindestens in der Hauptversion des Servers. Das Docker-Image bringt die Werkzeuge von PostgreSQL 18 mit und passt damit zu Servern bis Version 18. Ohne Docker das Paket `postgresql-client` passend installieren oder mit `FLOWPLAN_PG_BIN` auf den Ordner mit den Programmen zeigen.

```sql
-- als Administrator auf dem PostgreSQL-Server
CREATE ROLE flowplan LOGIN PASSWORD '<Passwort>';
CREATE DATABASE flowplan OWNER flowplan;
-- optional, nur für pgvector vor 0.8 (in der neuen Datenbank):
\c flowplan
CREATE EXTENSION IF NOT EXISTS vector;
```

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
      POSTGRES_USER: flowplan
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: flowplan
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U flowplan -d flowplan"]
      interval: 5s
      retries: 20
    restart: unless-stopped

volumes:
  flowplan-data:
  postgres-data:
```

`POSTGRES_PASSWORD` steht in der `.env` neben der `compose.yaml` (`openssl rand -hex 24`).

### Variablen

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `DATABASE_URL` | *leer* (SQLite) | Adresse der PostgreSQL-Datenbank, `postgres://…` oder `postgresql://…`. |
| `FLOWPLAN_PG_SCHEMA` | `public` | Schema innerhalb der Datenbank, falls Flowplan sich die Datenbank mit anderem teilt. Wird angelegt, wenn es fehlt. |
| `FLOWPLAN_PG_POOL` | `10` | Verbindungen je Instanz (1–500). |
| `FLOWPLAN_PG_STATEMENT_TIMEOUT` | `120000` | Höchstdauer einer Abfrage in Millisekunden; `0` = kein Limit. |
| `FLOWPLAN_PG_LOCK_TIMEOUT` | `10000` | So lange wartet eine Abfrage höchstens auf eine Sperre (ms). |
| `FLOWPLAN_PG_IDLE_TX_TIMEOUT` | `60000` | Eine Transaktion, die so lange nichts tut, wird beendet (ms). |
| `FLOWPLAN_PG_CONNECT_TIMEOUT` | `30000` | So lange wartet eine Anfrage auf eine freie Verbindung aus dem Pool (ms). |
| `FLOWPLAN_PG_SCHEMA_AUTO` | an | `off`: Die Instanz legt das Schema nicht selbst an oder aktualisiert es – das übernimmt ein eigener Schritt (`node /app/scripts/db-schema.mjs`, siehe [Cluster-Modus](/cluster#schema-vor-dem-start)). |
| `FLOWPLAN_PGVECTOR` | an | `off` nutzt `pgvector` nicht, auch wenn es installiert ist. |
| `FLOWPLAN_BACKUP_FORMAT` | `pg_dump` | `sqlite`: geplante Sicherungen im portablen SQLite-Format statt mit `pg_dump` (unten). |
| `FLOWPLAN_PG_BIN` | *leer* | Ordner mit `pg_dump`, `pg_restore` und `psql`, wenn sie nicht im `PATH` liegen. |

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
- [Verschlüsselung](/storage-and-backups#verschluesselung) wie gehabt; `decrypt.mjs` entschlüsselt auch `.dump.enc`.
- Das Archiv enthält nur das Schema von Flowplan, ohne Suchindex und `pgvector`-Tabelle – beide baut Flowplan nach dem Einspielen neu auf. Es ist dadurch kleiner und lässt sich auch auf einem Server ohne `pg_trgm` oder `pgvector` einspielen.
- `pg_dump` läuft außerhalb von Flowplan und belastet die Instanz kaum.

**Ausweichen auf SQLite:** Fehlt ein passendes `pg_dump` (zu alt oder nicht installiert), schreibt die geplante Sicherung stattdessen eine portable SQLite-Datei (`flowplan-….sqlite`) und vermerkt das im Log. Mit `FLOWPLAN_BACKUP_FORMAT=sqlite` ist das immer so. Eine solche Datei lässt sich auf SQLite **und** PostgreSQL einspielen.

Die **Instanzsicherung** (Administration → Speicher & Sicherung → Gesamte Instanz → Herunterladen) enthält die Datenbank immer im portablen SQLite-Format und lässt sich deshalb auf beiden Datenbanken wiederherstellen. Litestream läuft mit PostgreSQL nicht – für eine laufende Sicherung mit beliebigem Zeitpunkt nutze die Mittel deines Datenbankservers (WAL-Archivierung, Point-in-Time-Recovery des Anbieters).

### Wiederherstellen

- **Ein `pg_dump`-Archiv** (`.dump`, `.dump.enc`) spielst du auf dem Einrichtungsbildschirm einer neuen Instanz mit PostgreSQL ein: hochladen oder aus S3 bzw. per SFTP holen, wie unter [Beim Einrichten wiederherstellen](/storage-and-backups#beim-einrichten-wiederherstellen). Eine Instanz mit SQLite lehnt solche Archive ab – dafür gibt es die Instanzsicherung oder den [Wechsel der Datenbank](/database-migration).
- Flowplan prüft das Archiv vorher (keine neuere Version), ersetzt dann das ganze Schema in einer Transaktion und baut den Suchindex neu. Der vorherige Stand bleibt als `pre-restore-<Zeit>/flowplan.dump` im Datenordner – plane dafür Platz für ein weiteres Archiv ein. Schlägt das Einspielen fehl, kommt der vorherige Stand zurück.
- Ein Archiv aus einem anderen Schema (`FLOWPLAN_PG_SCHEMA`) lässt sich ebenfalls einspielen.
- **Die Instanzsicherung** (ZIP) stellst du wie bisher unter **Administration → Speicher & Sicherung → Aus Sicherung wiederherstellen** wieder her.

## PgBouncer

Flowplan hält seine Verbindungen selbst im Pool; eine direkte Verbindung zum Server ist der einfachste Weg. Mit PgBouncer davor gilt:

- **Version 1.21 oder neuer** mit `max_prepared_statements` größer als `0`: Flowplan nutzt benannte Prepared Statements.
- **Session-Pooling im Cluster-Modus:** Über eine eigene Verbindung empfängt Flowplan Benachrichtigungen (`LISTEN`) und bestimmt die leitende Instanz (eine Sperre, die so lange hält wie die Verbindung). Dafür nutzt es dieselbe `DATABASE_URL` wie für den Pool – im Cluster muss PgBouncer für Flowplan deshalb im Modus `session` laufen, sonst könnten sich mehrere Instanzen gleichzeitig für die leitende halten.
- Ein einzelner Container kommt auch mit dem Modus `transaction` aus. Mit S3 gehen dann die Benachrichtigungen über neue Dateien verloren, und Uploads in den Bucket starten erst mit der Abfrage alle 15 Sekunden.

## Weiter

- [Datenbank wechseln](/database-migration): von SQLite zu PostgreSQL und zurück.
- [Cluster-Modus](/cluster): mehrere Instanzen mit Redis und S3.
- [Dimensionierung](/sizing): wie viele Personen eine Instanz trägt.
