# Speicher, S3 und Sicherung

Alle Daten liegen in einem Verzeichnis. Mit einem S3-Speicher werden Dateien gespiegelt und die Datenbank laufend gesichert – der Container hält dann nichts Unersetzliches mehr.

## Was wo liegt

| Pfad in `/app/data` | Inhalt |
| --- | --- |
| `flowplan.sqlite` (+ `-wal`, `-shm`) | Alle Inhalte, Konten, Sitzungen, Einstellungen |
| `uploads/` | Hochgeladene Dateien |
| `web-push-keys.json` | Push-Schlüssel, falls nicht per Umgebung gesetzt |
| `ocr/` | Sprachdaten der Texterkennung, werden bei Bedarf neu angelegt |

## S3-Speicher einschalten

Mit `S3_BUCKET` und Zugangsdaten (siehe [Konfiguration](/configuration#s3-und-datenbanksicherung)):

- **Dateien**: Jede hochgeladene Datei geht direkt nach dem Speichern in den Bucket, gelöschte Dateien werden dort entfernt. `uploads/` bleibt Arbeitskopie. Fehlt dort eine Datei – neuer Host, verlorenes Volume –, holt Flowplan sie aus dem Bucket: beim Abruf sofort, alle übrigen im Hintergrund.
- **Datenbank**: [Litestream](https://litestream.io) überträgt Änderungen der SQLite-Datei etwa im Sekundentakt nach `<Präfix>/db`. Startet der Container ohne Datenbank, stellt Litestream sie zuerst aus dem Bucket wieder her.

Beim ersten Start mit S3 lädt Flowplan alle vorhandenen Dateien hoch. Den Fortschritt zeigt `/api/health` unter `objectStorage.pending`, die Verbindung und die Verteilung lokal/S3 die **Administration → Betrieb**.

Geeignet sind MinIO, Garage, SeaweedFS, AWS S3 und andere S3-kompatible Dienste.

### Garage

Garage legt weder Bucket noch Schlüssel selbst an:

```bash
garage status                                  # Knoten-ID ablesen
garage layout assign -z dc1 -c 10G <Knoten-ID>
garage layout apply --version 1
garage bucket create flowplan
garage key create flowplan
garage bucket allow --read --write --owner flowplan --key flowplan
garage key info flowplan --show-secret         # Key-ID und Secret
```

`S3_REGION` muss dem Wert `s3_region` aus der `garage.toml` entsprechen.

### SeaweedFS

Den S3-Dienst so starten, dass er auf allen Schnittstellen lauscht (`-ip.bind=0.0.0.0`), sonst ist er aus anderen Containern nicht erreichbar. Endpoint ist der S3-Port, standardmäßig `8333`.

> [!NOTE]
> Warum kein Postgres und kein Redis? Flowplan arbeitet in einem Prozess direkt auf SQLite – für eine Instanz pro Organisation schneller und einfacher. Sitzungen, Präsenz und Live-Abgleich laufen über die Datenbank und den Prozess selbst; Redis hätte nichts zu tun.

## Sicherungen

1. **Instanzsicherung in Flowplan** (empfohlen): **Administration → Instanz → Sicherung der gesamten Instanz** lädt Datenbank und Dateien konsistent im laufenden Betrieb herunter.
2. **S3 mit Litestream**: laufende Sicherung; ein früherer Zeitpunkt lässt sich wiederherstellen (unten).
3. **Volume-Backup** des Hosts oder in Coolify. Für eine konsistente Kopie den Container vorher stoppen.
4. **Von Hand** im laufenden Betrieb:

```bash
sqlite3 /app/data/flowplan.sqlite "VACUUM INTO '/backup/flowplan.sqlite'"
```

Dazu `uploads/` und `web-push-keys.json` mitsichern.

Das Inhaltsarchiv unter **Einstellungen → Daten** sichert einen Arbeitsbereich, ersetzt aber keine Instanzsicherung mit Konten und Rechten.

## Markdown-Export und Git

Eine lesbare Kopie außerhalb von Flowplan – für den Notfall, wenn die Instanz nicht läuft, oder als Archiv in einem Git-Repository. **Administration → Instanz → Markdown-Export** wählt Seiten und Datenbanken; mit jeder geplanten Sicherung (und mit **Jetzt sichern**) wird jede davon samt Unterseiten, Kommentaren und früheren Versionen zu einem Markdown-ZIP:

- mit S3 im Bucket unter `<S3_PREFIX>/exports/`, sonst im Datenordner unter `exports/`; es bleiben so viele wie Sicherungen (**Aufbewahrte Sicherungen**);
- exportiert wird mit den Leserechten der Person, die die Auswahl gespeichert hat – private Einträge und Journale mit PIN bleiben draußen;
- Dateinamen und Pfade im ZIP enthalten Kennungen, damit sie zwischen zwei Läufen gleich bleiben (sauberer Git-Diff). Einträge beginnen mit YAML-Frontmatter, Kommentare stehen in `<Datei>.comments.md`, frühere Versionen unter `<Datei>.versions/`.

### In ein Git-Repository übertragen

Mit diesen Variablen überträgt Flowplan jeden Export selbst in ein Repository (Forgejo, Gitea, GitHub, GitLab) – jede Seite in einem eigenen Ordner, ein Commit pro Lauf mit Änderungen:

| Variable | Bedeutung |
| --- | --- |
| `EXPORT_GIT_URL` | `https://`-Adresse des Repositorys, ohne Zugangsdaten. |
| `EXPORT_GIT_TOKEN` | Token mit Schreibrecht auf dieses Repository. Steht nur in der Umgebung, nie in der Datenbank oder einer Sicherung. |
| `EXPORT_GIT_USERNAME` | Benutzername zum Token (Standard `flowplan`; GitLab: `oauth2`). |
| `EXPORT_GIT_BRANCH` | Zweig, Standard `main`. Ein leeres Repository bekommt ihn beim ersten Lauf. |
| `EXPORT_GIT_AUTHOR`, `EXPORT_GIT_EMAIL` | Autor der Commits. |
| `EXPORT_GIT_IMPORT` | `true`: Änderungen, die seit dem letzten Lauf im Repository gemacht wurden, übernimmt Flowplan vor dem Export. |

Mit `EXPORT_GIT_IMPORT=true` gilt für geänderte Dateien:

- **Einträge** (`records/<Datenbank>/…md`) werden über `flowplan.id` im Frontmatter aktualisiert; neue Dateien werden neue Einträge.
- **Dokumentseiten** (`index.md`, `pages/…-<Kennung>.md`) bekommen den Text der Datei; der vorige Stand bleibt als Version erhalten.
- Datenbanktabellen, Kommentare und Versionen sind Kopien und werden nicht zurückgelesen.

Markdown kennt nicht alle Blöcke von Flowplan (etwa Spalten oder eingebettete Whiteboards). Wer in Git Seiten mit solchen Blöcken bearbeitet, findet den vorigen Stand im Versionsverlauf. Den Stand der letzten Übertragung (Commit, übernommene Änderungen, Fehler) zeigt die Administration.

## Wiederherstellen

- **Aus einer Instanzsicherung**: in **Administration → Instanz** hochladen. Flowplan prüft sie und übernimmt sie beim nächsten Neustart; der vorherige Stand bleibt unter `pre-restore-…` im Datenverzeichnis.
- **Auf einem neuen Host mit S3**: neue Installation mit **denselben** `S3_*`-Variablen und leerem Volume starten. Litestream stellt die Datenbank her, die Dateien folgen im Hintergrund.
- **Einen früheren Zeitpunkt** bei gestoppter App:

```bash
litestream restore -config /etc/litestream.yml \
  -timestamp 2026-09-26T12:00:00Z -o /app/data/flowplan.sqlite
```

Vorher die bestehende `flowplan.sqlite` samt `-wal` und `-shm` beiseitelegen.

## Kontingente

`FLOWPLAN_WORKSPACE_QUOTA_MB` oder **Administration → Instanz** legt ein Standard-Kontingent je Arbeitsbereich fest; unter **Administration → Arbeitsbereiche** lässt es sich je Arbeitsbereich überschreiben. Uploads, Kopien, Vorlagen und Importe über dem Kontingent werden abgelehnt.
