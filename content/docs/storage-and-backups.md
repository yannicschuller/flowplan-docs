---
keywords: Speicher, S3, Sicherung, Backup, SFTP, wiederherstellen, MinIO, Garage
---

# Speicher, S3 und Sicherung

Alle Daten liegen in einem Verzeichnis. Mit einem S3-Speicher werden Dateien gespiegelt und die Datenbank laufend gesichert – der Container hält dann nichts Unersetzliches mehr.

**Mehr zum Thema:** [Verschlüsselung von Dateien und Sicherungen](/storage-encryption) · [Markdown-Export und Git](/markdown-git-export)

## Was wo liegt

| Pfad in `/app/data` | Inhalt |
| --- | --- |
| `flowplan.sqlite` (+ `-wal`, `-shm`) | Alle Inhalte, Konten, Sitzungen, Einstellungen |
| `uploads/` | Hochgeladene Dateien |
| `web-push-keys.json` | Push-Schlüssel, falls nicht per Umgebung gesetzt |
| `secrets.key` | Schlüssel für gespeicherte Geheimnisse, nur ohne `FLOWPLAN_ENCRYPTION_KEY` und `FLOWPLAN_SECRETS_KEY` ([Konfiguration](/configuration-storage#gespeicherte-geheimnisse)) |
| `pre-restore-…`, `pre-move-…` | Vorheriger Stand nach einer Wiederherstellung bzw. einem [Umzug](/move-instance); nach ein paar Tagen löschen |
| `ocr/` | Sprachdaten der Texterkennung, werden bei Bedarf neu angelegt |

## S3-Speicher einschalten

Mit `S3_BUCKET` und Zugangsdaten (siehe [Konfiguration](/configuration-storage#s3-und-datenbanksicherung)):

- **Dateien**: Jede hochgeladene Datei geht direkt nach dem Speichern in den Bucket, gelöschte Dateien wandern dort nach `<Präfix>/.deleted/uploads/` und werden erst entfernt, wenn keine aufbewahrte geplante Sicherung im Bucket sie mehr braucht, frühestens nach einem Tag ([verzögertes Löschen](#verzoegertes-loeschen)). `uploads/` bleibt Arbeitskopie. Fehlt dort eine Datei – neuer Host, verlorenes Volume –, holt Flowplan sie aus dem Bucket: beim Abruf sofort, alle übrigen im Hintergrund.
- **Datenbank**: [Litestream](https://litestream.io) überträgt Änderungen der SQLite-Datei etwa im Sekundentakt nach `<Präfix>/db`. Startet der Container ohne Datenbank, stellt Litestream sie zuerst aus dem Bucket wieder her.

Beim ersten Start mit S3 lädt Flowplan alle vorhandenen Dateien hoch. Den Fortschritt zeigen **Administration → Speicher & Sicherung** (Karten **Sicherungen** und **Belegung**, dazu die Verbindung und die Verteilung lokal/S3) und – mit `FLOWPLAN_METRICS_TOKEN` oder als Admin angemeldet – `/api/health` unter `objectStorage.pending`.

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
> Warum standardmäßig kein Postgres und kein Redis? Flowplan arbeitet in einem Prozess direkt auf SQLite – für eine Instanz pro Organisation schneller und einfacher. Sitzungen, Präsenz und Live-Abgleich laufen über die Datenbank und den Prozess selbst; Redis hätte nichts zu tun. Für größere Teams gibt es [PostgreSQL](/postgresql) und den [Cluster-Modus](/cluster) mit Redis.

## Sicherungen

1. **Instanzsicherung in Flowplan** (empfohlen): **Administration → Speicher & Sicherung → Gesamte Instanz → Herunterladen** lädt Datenbank und Dateien konsistent im laufenden Betrieb herunter.
2. **S3 mit Litestream**: laufende Sicherung; ein früherer Zeitpunkt lässt sich wiederherstellen (unten).
3. **Geplante Sicherung**: täglich oder stündlich eine konsistente Kopie der Datenbank, mit S3 in den Bucket unter `backups/`, sonst in den Datenordner – mit Schlüssel verschlüsselt ([Verschlüsselung](/storage-encryption#verschluesselung)). Zusätzlich auf einen eigenen Server per [SFTP](#sicherung-per-sftp), auf Wunsch mit allen Dateien, oder über eine [SMB- oder NFS-Freigabe](#smb-oder-nfs-freigabe). Vor dem ersten Konto entsteht keine geplante Sicherung (Demo-Konten und das Entwicklungskonto zählen nicht) – so legt eine neue Instanz keine leere Kopie neben die Sicherungen einer alten.
4. **Volume-Backup** des Hosts oder in Coolify. Für eine konsistente Kopie den Container vorher stoppen.
5. **Von Hand** im laufenden Betrieb:

```bash
sqlite3 /app/data/flowplan.sqlite "VACUUM INTO '/backup/flowplan.sqlite'"
```

Dazu `uploads/` und `web-push-keys.json` mitsichern.

Mit **PostgreSQL** werden die geplanten Sicherungen und **Jetzt sichern** zu `pg_dump`-Archiven (`flowplan-….dump`), Litestream entfällt; Ziele, Verschlüsselung und Aufbewahrung bleiben gleich. Siehe [Sicherungen mit pg_dump](/postgresql#sicherungen-mit-pg-dump).

Das Inhaltsarchiv unter **Einstellungen → Import & Export → Export → Arbeitsbereich als ZIP** sichert einen Arbeitsbereich, ersetzt aber keine Instanzsicherung mit Konten und Rechten.

## Sicherung per SFTP

Die geplante Sicherung kann zusätzlich auf einen eigenen Server gehen – ein NAS, einen Backup-Server oder einen gemieteten Speicher mit SSH-Zugang. Einrichten unter **Administration → Speicher & Sicherung → SFTP-Ziel**:

- **Server**, **Port** (22) und **Benutzer**, Anmeldung mit **Passwort** oder **privatem Schlüssel** (OpenSSH oder PEM, optional mit Passphrase). Passwort, Schlüssel und Passphrase speichert Flowplan nur verschlüsselt ([gespeicherte Geheimnisse](/configuration-storage#gespeicherte-geheimnisse)); die Oberfläche zeigt danach nur noch, dass eines gespeichert ist.
- **Ordner auf dem Server**: relativ zum Anmeldeordner oder absolut (`/srv/backups/flowplan`); `..` ist nicht erlaubt. Fehlt er, legt Flowplan ihn an.
- **Aufbewahren**: so viele Sicherungen bleiben im Ordner, ältere werden entfernt.
- **Dateien mitsichern**: spiegelt die hochgeladenen Dateien nach `uploads/` im Ordner. Neue Dateien kommen bei jeder Sicherung dazu; Dateien, die in Flowplan endgültig gelöscht sind, wandern nach `.deleted/uploads/` ([verzögertes Löschen](#verzoegertes-loeschen)). Dateien, die die Datenbank noch verzeichnet, werden dort nie weggeräumt. Fehlt der Ordner `uploads/` oder ist er leer, obwohl die Datenbank Dateien verzeichnet (etwa ein nicht eingehängtes Volume), lässt die Sicherung das Spiegeln mit einem Fehler aus; die Datenbank wird trotzdem übertragen.
- Mit `FLOWPLAN_ENCRYPTION_KEY` ist alles auf dem Server verschlüsselt – die Datenbank wie in S3 und im Datenordner (`flowplan-….sqlite.enc`), jede Datei einzeln ([Verschlüsselung](/storage-encryption#verschluesselung)).

**Hostschlüssel:** Beim ersten **Verbindung testen** zeigt Flowplan den Fingerabdruck des Servers (`SHA256:…`), noch bevor es Zugangsdaten sendet. Vergleiche ihn auf dem Server mit `ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub` und bestätige ihn mit **Schlüssel vertrauen**. Meldet sich der Server später mit einem anderen Schlüssel (Neuinstallation – oder jemand schaltet sich dazwischen), stoppt jede Übertragung, und die Administration zeigt alten und neuen Fingerabdruck; erst nach **Neuen Schlüssel annehmen** geht es weiter. Ein anderer Server oder Port braucht immer eine neue Bestätigung.

Die SFTP-Sicherung läuft mit jeder geplanten Sicherung (täglich oder stündlich, **Geplante Datenbanksicherung** muss an sein); **Jetzt sichern** im SFTP-Ziel überträgt sofort. Letzte Übertragung und letzter Fehler stehen darunter und in der Statuszeile oben.

Auf dem Server reicht ein eingeschränkter Zugang, etwa mit OpenSSH:

```text
Match User flowplan
  ChrootDirectory /srv/sftp/flowplan
  ForceCommand internal-sftp
  AllowTcpForwarding no
```

### Verzögertes Löschen

Eine aufbewahrte Sicherung soll sich immer vollständig wiederherstellen lassen – auch mit den Dateien, die seitdem gelöscht wurden. Deshalb entfernt Flowplan gelöschte Dateien auf dem SFTP-Server (mit **Dateien mitsichern**) und im S3-Bucket nicht sofort:

- Sie wandern nach `.deleted/uploads/` (SFTP: im Ordner, S3: unter `<Präfix>/`). Der Name bekommt den Zeitpunkt des Verschiebens angehängt (`<Datei>.<Millisekunden seit 1970>`), damit er auch nach dem Kopieren des Ordners oder auf einer anderen Instanz erhalten bleibt.
- Endgültig entfernt werden sie bei einer späteren Sicherung, sobald sie vor der ältesten noch aufbewahrten Sicherung verschoben wurden – dann braucht sie keine mehr. Im Bucket zusätzlich frühestens nach einem Tag, so weit reicht der Verlauf von Litestream zurück. Mehr **Aufbewahren** heißt also auch: gelöschte Dateien bleiben länger.
- Taucht eine gelöschte Datei wieder auf (etwa nach einer Wiederherstellung), holt die SFTP-Sicherung sie aus `.deleted/uploads/` zurück, statt sie neu zu übertragen.
- Beim [Wiederherstellen](#beim-einrichten-wiederherstellen) sucht Flowplan eine Datei, die in `uploads/` fehlt, in `.deleted/uploads/`.

Ohne geplante Sicherung (**Geplante Datenbanksicherung** aus) löscht Flowplan im Bucket sofort – es gäbe keine Sicherung, die die Datei braucht.

### SMB- oder NFS-Freigabe

SMB und NFS spricht Flowplan nicht selbst – dafür bräuchte der Container Mount-Rechte. Stattdessen hängt Docker die Freigabe als Volume ein, und die geplante Sicherung schreibt in den Ordner `backups/` des Datenordners (das lokale Ziel, also ohne `S3_BUCKET`):

```yaml
services:
  flowplan:
    volumes:
      - flowplan-data:/app/data
      # Die Freigabe über den Ordner der Sicherungen legen.
      - nas-backups:/app/data/backups

volumes:
  flowplan-data:
  # SMB/CIFS (auf dem Docker-Host wird cifs-utils gebraucht)
  nas-backups:
    driver: local
    driver_opts:
      type: cifs
      device: "//nas.example.lan/flowplan"
      o: "username=flowplan,password=${NAS_PASSWORD},uid=1000,gid=1000,file_mode=0600,dir_mode=0700,vers=3.0"
```

Für NFS stattdessen:

```yaml
  nas-backups:
    driver: local
    driver_opts:
      type: nfs
      o: "addr=nas.example.lan,nfsvers=4,rw"
      device: ":/export/flowplan"
```

`uid=1000` ist der Benutzer `node`, unter dem Flowplan läuft; bei NFS muss der Export für diese UID beschreibbar sein. Das Passwort kommt aus einer `.env`-Datei neben der `compose.yaml`. In Panels wie 1Panel oder Portainer heißt das „Volume mit Treiber local und Optionen“ bzw. „CIFS/NFS-Volume“.

> [!WARNING]
> Nur den Ordner `backups/` auf die Freigabe legen, nie den ganzen Datenordner: SQLite braucht zuverlässige Dateisperren, die SMB und NFS nicht garantieren. Die Freigabe erhält nur die Datenbank – für die Dateien die [Instanzsicherung](#sicherungen) herunterladen oder das SFTP-Ziel mit **Dateien mitsichern** nutzen.

## Wiederherstellen

- **Aus einer Instanzsicherung**: unter **Administration → Speicher & Sicherung → Aus Sicherung wiederherstellen** (ganz unten) hochladen. Flowplan prüft sie und übernimmt sie beim nächsten Neustart; der vorherige Stand bleibt unter `pre-restore-…` im Datenverzeichnis.
- **Aus einer geplanten Sicherung** bei gestoppter App: eine verschlüsselte erst [entschlüsseln](/storage-encryption#notfall-ohne-laufende-instanz-entschluesseln), dann die bestehende `flowplan.sqlite` samt `-wal` und `-shm` beiseitelegen und die Sicherung als `/app/data/flowplan.sqlite` einsetzen. Mit S3 kommen die Dateien aus dem Bucket nach.
- **Auf einem neuen Host mit S3**: neue Installation mit **denselben** `S3_*`-Variablen und leerem Volume starten. Litestream stellt die Datenbank her, die Dateien folgen im Hintergrund. Die alte Instanz vorher stoppen; `secrets.key` und `web-push-keys.json` liegen nicht im Bucket (siehe [Instanz umziehen, Weg C](/move-instance#weg-c-s3-und-litestream)).
- **Auf einen anderen Server umziehen**: siehe [Instanz umziehen](/move-instance) – das eingebaute Umzugswerkzeug holt Datenbank, Dateien und Schlüssel direkt von der alten Instanz, mit wenigen Minuten Ausfallzeit.
- **Aus einer geplanten Sicherung einer Instanz mit PostgreSQL** (`flowplan-….dump`, `.dump.enc`): ebenfalls unter **Aus Sicherung wiederherstellen** hochladen oder auf dem Einrichtungsbildschirm einer neuen Instanz mit PostgreSQL. Nur die Datenbank wird ersetzt, die Dateien bleiben. Eingespielt werden nur die Daten der Tabellen von Flowplan; ein Archiv mit eigenen Funktionen, Views oder Triggern im Schema von Flowplan lehnt Flowplan ab – siehe [PostgreSQL, Wiederherstellen](/postgresql#wiederherstellen).
- **Einen früheren Zeitpunkt** bei gestoppter App:

```bash
litestream restore -config /etc/litestream.yml \
  -timestamp 2026-09-26T12:00:00Z -o /app/data/flowplan.sqlite
```

Vorher die bestehende `flowplan.sqlite` samt `-wal` und `-shm` beiseitelegen.

### Beim Einrichten wiederherstellen

Eine neue, noch leere Instanz übernimmt eine Sicherung direkt auf dem Einrichtungsbildschirm: unter **Konto erstellen** auf **Aus Sicherung wiederherstellen** klicken ([Installation, Erster Start](/installation#erster-start)). Möglich sind

- **Datei**: eine geplante Sicherung (`flowplan-….sqlite`, `.sqlite.enc`) oder die Sicherung der gesamten Instanz (`flowplan-instanz-….zip`, `.zip.enc`), bis 50 GB. Der Upload wird direkt auf die Festplatte geschrieben und zeigt seinen Fortschritt. Fehlen danach Anhänge, die weder in der Sicherung noch im Dateispeicher der Instanz liegen, nennt die Seite ihre Zahl – lagen die Dateien der alten Instanz in S3 oder auf einem SFTP-Server, stelle von dort wieder her.
- **S3**: die neueste geplante Sicherung aus `<Präfix>/backups/` eines Buckets, dazu die Dateien aus `<Präfix>/uploads/` – fehlt dort eine, aus `<Präfix>/.deleted/uploads/`.
- **SFTP**: die neueste Sicherung aus dem Ordner, dazu die Dateien aus `uploads/` (wenn **Dateien mitsichern** an war) – fehlt dort eine, aus `.deleted/uploads/`. Zuerst zeigt Flowplan den Hostschlüssel; erst wenn du **Der Fingerabdruck stimmt** bestätigst, meldet es sich an.

Ist die Sicherung verschlüsselt, frag die Seite nach dem Schlüssel der alten Instanz (`FLOWPLAN_ENCRYPTION_KEY`) – oder er ist auf der neuen schon gesetzt. Flowplan prüft die Datenbank (unbeschädigt, eine Flowplan-Datenbank, nicht aus einer neueren Version – ältere werden beim Öffnen wie bei einem Update aktualisiert), legt den leeren Anfangsstand als `pre-restore-…` beiseite und übernimmt die Sicherung sofort. Danach meldest du dich mit einem Konto aus der Sicherung an. Läuft Litestream (S3 ohne `FLOWPLAN_LITESTREAM=off`), wird die Sicherung erst beim nächsten Neustart des Containers übernommen – die Seite sagt das.

Die Möglichkeit gibt es nur, solange die Instanz kein Konto hat, und mit gesetztem `FLOWPLAN_SETUP_TOKEN` nur über den Einrichtungslink. Sobald ein Konto existiert, lehnt der Server jede Anfrage dazu ab; dann bleibt **Administration → Speicher & Sicherung → Aus Sicherung wiederherstellen**.

> [!NOTE]
> Gespeicherte Geheimnisse (Authenticator-Apps, KI- und Messenger-Schlüssel, das SFTP-Passwort) lassen sich nur mit demselben `FLOWPLAN_ENCRYPTION_KEY` oder `FLOWPLAN_SECRETS_KEY` wie auf der alten Instanz lesen; ohne beide liegt der Schlüssel in `secrets.key` im Datenordner, der in keiner Sicherung steckt. Hast du beim Wiederherstellen einen Schlüssel eingegeben, trage ihn danach als `FLOWPLAN_ENCRYPTION_KEY` ein.

## Kontingente

`FLOWPLAN_WORKSPACE_QUOTA_MB` oder **Administration → Grenzen & Aufbewahrung** legt ein Standard-Kontingent je Arbeitsbereich fest; unter **Administration → Arbeitsbereiche** lässt es sich je Arbeitsbereich überschreiben. Uploads, Kopien, Vorlagen und Importe über dem Kontingent werden abgelehnt.
