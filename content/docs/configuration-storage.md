---
keywords: S3_BUCKET, DATABASE_URL, FLOWPLAN_ENCRYPTION_KEY, Impressum, Datenschutz, Variablen
---

# Konfiguration: Speicher, Datenbank und Sicherheit

Die Umgebungsvariablen für S3 und Datenbanksicherung, PostgreSQL und Cluster, Verschlüsselung, gespeicherte Geheimnisse, Instanzumzug und Rechtliches.

## S3 und Datenbanksicherung

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `S3_BUCKET` | *leer* | Schaltet S3 ein. Ohne diese Variable bleibt alles lokal. |
| `S3_ENDPOINT` | AWS | API-Adresse des Speichers, z. B. `http://minio:9000`. |
| `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | – | Zugangsschlüssel mit Lese- und Schreibrecht auf den Bucket. |
| `S3_REGION` | `us-east-1` | Region. Garage verlangt seinen eigenen Wert (oft `garage`). |
| `S3_PREFIX` | `flowplan` | Ordner im Bucket; Dateien unter `<Präfix>/uploads/`, Datenbank unter `<Präfix>/db/`. |
| `FLOWPLAN_LITESTREAM` | an | `off`: nur Dateien spiegeln, Datenbank nicht sichern. |
| `LITESTREAM_SSE_C_KEY` | *leer* | Optional: der Speicheranbieter verschlüsselt die Litestream-Kopie (SSE-C, 32 Bytes base64, nur über https und bei Anbietern, die SSE-C können). |

Details: [Speicher, S3 und Sicherung](/storage-and-backups).

## Datenbank und Cluster

Ohne diese Variablen nutzt Flowplan SQLite in einem Container. Kommentiert stehen sie auch in der [`.env.example`](https://github.com/yannicschuller/flowplan/blob/main/.env.example). Alle Werte mit Standard und Erklärung stehen unter [PostgreSQL](/postgresql#variablen) und [Cluster-Modus](/cluster#weitere-variablen).

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `DATABASE_URL` | *leer* | `postgres://…` schaltet auf PostgreSQL um. Die Rolle darin sollte die Datenbank besitzen, aber kein Superuser sein ([PostgreSQL](/postgresql#rolle-ohne-superuser-rechte)). |
| `FLOWPLAN_PG_SCHEMA`, `FLOWPLAN_PG_POOL`, `FLOWPLAN_PG_*_TIMEOUT` | `public`, `10`, … | Schema, Verbindungen je Instanz und Zeitlimits. |
| `FLOWPLAN_PG_PREPARE` | an | `off`: Abfragen ohne Namen statt benannter Prepared Statements – für PgBouncer im Modus `transaction` ohne `max_prepared_statements`. |
| `DATABASE_SESSION_URL` | `DATABASE_URL` | Direkte Verbindung (oder Pool im Modus `session`) für Benachrichtigungen, die Leitung im Cluster und `pg_dump`/`pg_restore`, wenn `DATABASE_URL` auf PgBouncer im Modus `transaction` zeigt. |
| `FLOWPLAN_BACKUP_FORMAT` | `pg_dump` | `sqlite`: geplante Sicherungen auf PostgreSQL im portablen SQLite-Format. |
| `FLOWPLAN_CLUSTER` | *leer* | `1`: mehrere Instanzen; verlangt `DATABASE_URL`, `REDIS_URL`, `S3_BUCKET`, `FLOWPLAN_ENCRYPTION_KEY` (oder `FLOWPLAN_SECRETS_KEY`) und `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`. |
| `REDIS_URL` | *leer* | Redis für den Cluster-Modus, `redis://…` oder `rediss://…`. |
| `FLOWPLAN_READY_REQUIRE` | alle | Welche Prüfungen über `/api/health/ready` entscheiden. |

## Verschlüsselung

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_ENCRYPTION_KEY` | *leer* | 32 Bytes, base64 (`openssl rand -base64 32`). Verschlüsselt Dateien im Bucket, geplante Sicherungen, Markdown-Exporte und die Instanzsicherung. Ohne Schlüssel ändert sich nichts. |
| `FLOWPLAN_ENCRYPTION_KEY_FILE` | *leer* | Statt der Variablen: Pfad zu einer Datei mit dem Schlüssel (Docker-Secret). |
| `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS` | *leer* | Frühere Schlüssel, durch Komma getrennt – nur zum Lesen nach einem Schlüsselwechsel. |

Details: [Verschlüsselung](/storage-encryption#verschluesselung).

## Gespeicherte Geheimnisse

Schlüssel von KI-Anbietern, die Schlüssel der Authenticator-Apps ([Zwei-Faktor-Anmeldung](/sign-in#zwei-faktor-anmeldung)) die Zugangstokens des [Git-Exports der Bereiche](/markdown-git-export#git-export-eines-bereichs) und die Tokens der [Chat-Apps](/notifications#chat-apps) speichert Flowplan nur verschlüsselt (AES-256-GCM, an ihren Platz gebunden). Der Schlüssel dafür kommt, in dieser Reihenfolge, aus:

| Quelle | Bedeutung |
| --- | --- |
| `FLOWPLAN_ENCRYPTION_KEY` | Wenn gesetzt, verschlüsselt er auch die gespeicherten Geheimnisse. |
| `FLOWPLAN_SECRETS_KEY` / `FLOWPLAN_SECRETS_KEY_FILE` | Ein eigener Schlüssel nur dafür: 32 Bytes, base64 oder hex (`openssl rand -base64 32`), oder Pfad zu einer Datei (Docker-Secret). |
| `secrets.key` im Datenordner | Ohne die beiden Variablen legt Flowplan diese Datei beim ersten Bedarf selbst an (nur für den Besitzer lesbar). |

> [!IMPORTANT]
> Die Instanzsicherung enthält `secrets.key` bewusst nicht – sie gehört nicht neben die Daten, die sie schützt. Sichere die Datei getrennt oder setze den Schlüssel als Variable. Fehlt er nach einer Wiederherstellung, geben Admins und Nutzer ihre KI-Schlüssel und Chat-App-Tokens neu ein, und für die Zwei-Faktor-Anmeldung helfen Wiederherstellungscodes oder ein Zurücksetzen durch die Administration.
> Das [Umzugswerkzeug](/move-instance) nimmt `secrets.key` dagegen mit, denn es zieht die ganze Instanz um.

## Instanzumzug

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_MOVE_ALLOW_PRIVATE` | *leer* | Auf der **neuen** Instanz: `true` erlaubt, eine Instanz unter einer internen Adresse (LAN, VPN, `localhost`) und über `http://` zu übernehmen – etwa einen Heimserver. Ohne diese Variable nur öffentliche HTTPS-Adressen. Nach dem Umzug wieder entfernen. |

Details: [Instanz umziehen](/move-instance).

## Rechtliches und Oberfläche

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `IMPRINT_URL` | *leer* | Link zum Impressum, z. B. `https://example.com/impressum`. Erscheint auf der Anmeldeseite, unter geteilten Seiten und Formularen und im Kontomenü (auf dem Telefon unter **Mehr** in der Seitenleiste) – nur, wenn gesetzt. |
| `PRIVACY_URL` | *leer* | Link zur Datenschutzerklärung, an denselben Stellen und ebenfalls nur, wenn gesetzt. |
| `FLOWPLAN_SOURCE_URL` | GitHub-Repository von Flowplan | Adresse des Quellcodes, der auf dieser Instanz läuft (http oder https). Die AGPL-3.0 verlangt: Wer eine **veränderte** Fassung für andere betreibt, bietet ihnen deren Quellcode an (§ 13). Gesetzt, verlinken **Einstellungen → Über Flowplan** und die Anmeldeseite (Fußzeile „Quellcode“) diese Adresse statt `github.com/yannicschuller/flowplan`; der Commit ist dann nicht mehr auf GitHub verlinkt. |
| `DRAWIO_URL` | `https://embed.diagrams.net` | Adresse des draw.io-Editors für den Block `/drawio`, z. B. ein eigener Container `jgraph/drawio`. Nur https (http nur für `localhost`); ein ungültiger Wert schaltet draw.io aus. Beim Ansehen wird draw.io nie geladen. |
| `FLOWPLAN_HIDE_SPONSOR` | `false` | `true` blendet unter **Einstellungen → Über Flowplan** nur den Teil **Flowplan unterstützen ♥** (Link zu GitHub Sponsors) aus. Lizenz und Quellcode bleiben immer sichtbar. In den Apps für iPhone, iPad und Android ist der Link unabhängig davon nie zu sehen; in Browsern und der Desktop-App schon. |
