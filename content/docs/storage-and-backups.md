# Speicher, S3 und Sicherung

Alle Daten liegen in einem Verzeichnis. Mit einem S3-Speicher werden Dateien gespiegelt und die Datenbank laufend gesichert – der Container hält dann nichts Unersetzliches mehr.

## Was wo liegt

| Pfad in `/app/data` | Inhalt |
| --- | --- |
| `flowplan.sqlite` (+ `-wal`, `-shm`) | Alle Inhalte, Konten, Sitzungen, Einstellungen |
| `uploads/` | Hochgeladene Dateien |
| `web-push-keys.json` | Push-Schlüssel, falls nicht per Umgebung gesetzt |
| `secrets.key` | Schlüssel für gespeicherte Geheimnisse, nur ohne `FLOWPLAN_ENCRYPTION_KEY` und `FLOWPLAN_SECRETS_KEY` ([Konfiguration](/configuration#gespeicherte-geheimnisse)) |
| `pre-restore-…`, `pre-move-…` | Vorheriger Stand nach einer Wiederherstellung bzw. einem [Umzug](/move-instance); nach ein paar Tagen löschen |
| `ocr/` | Sprachdaten der Texterkennung, werden bei Bedarf neu angelegt |

## S3-Speicher einschalten

Mit `S3_BUCKET` und Zugangsdaten (siehe [Konfiguration](/configuration#s3-und-datenbanksicherung)):

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
3. **Geplante Sicherung**: täglich oder stündlich eine konsistente Kopie der Datenbank, mit S3 in den Bucket unter `backups/`, sonst in den Datenordner – mit Schlüssel verschlüsselt ([Verschlüsselung](#verschluesselung)). Zusätzlich auf einen eigenen Server per [SFTP](#sicherung-per-sftp), auf Wunsch mit allen Dateien, oder über eine [SMB- oder NFS-Freigabe](#smb-oder-nfs-freigabe). Vor dem ersten Konto entsteht keine geplante Sicherung (Demo-Konten und das Entwicklungskonto zählen nicht) – so legt eine neue Instanz keine leere Kopie neben die Sicherungen einer alten.
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

- **Server**, **Port** (22) und **Benutzer**, Anmeldung mit **Passwort** oder **privatem Schlüssel** (OpenSSH oder PEM, optional mit Passphrase). Passwort, Schlüssel und Passphrase speichert Flowplan nur verschlüsselt ([gespeicherte Geheimnisse](/configuration#gespeicherte-geheimnisse)); die Oberfläche zeigt danach nur noch, dass eines gespeichert ist.
- **Ordner auf dem Server**: relativ zum Anmeldeordner oder absolut (`/srv/backups/flowplan`); `..` ist nicht erlaubt. Fehlt er, legt Flowplan ihn an.
- **Aufbewahren**: so viele Sicherungen bleiben im Ordner, ältere werden entfernt.
- **Dateien mitsichern**: spiegelt die hochgeladenen Dateien nach `uploads/` im Ordner. Neue Dateien kommen bei jeder Sicherung dazu; Dateien, die in Flowplan endgültig gelöscht sind, wandern nach `.deleted/uploads/` ([verzögertes Löschen](#verzoegertes-loeschen)). Dateien, die die Datenbank noch verzeichnet, werden dort nie weggeräumt. Fehlt der Ordner `uploads/` oder ist er leer, obwohl die Datenbank Dateien verzeichnet (etwa ein nicht eingehängtes Volume), lässt die Sicherung das Spiegeln mit einem Fehler aus; die Datenbank wird trotzdem übertragen.
- Mit `FLOWPLAN_ENCRYPTION_KEY` ist alles auf dem Server verschlüsselt – die Datenbank wie in S3 und im Datenordner (`flowplan-….sqlite.enc`), jede Datei einzeln ([Verschlüsselung](#verschluesselung)).

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

## Verschlüsselung

Auf Wunsch verschlüsselt Flowplan alles, was es aus dem Server hinausgibt, mit einem Schlüssel, den nur der Server kennt (AES-256-GCM). Wer an den Bucket oder an eine Sicherung kommt – der Speicheranbieter, jemand mit geleakten Zugangsdaten, ein versehentlich öffentlicher Bucket –, sieht nur unlesbare Daten.

| Was | Verschlüsselt |
| --- | --- |
| Dateien im Bucket (`<Präfix>/uploads/`) | ja |
| Geplante Sicherungen (`flowplan-….sqlite.enc`) | ja, im Bucket und im Datenordner |
| Markdown-Exporte (`….zip.enc`) | ja, im Bucket und im Datenordner |
| Heruntergeladene Instanzsicherung (`….zip.enc`) | ja |
| Litestream-Kopie der Datenbank (`<Präfix>/db/`) | nein – siehe [Litestream](#litestream-und-verschluesselung) |
| Git-Export | nein – dort soll lesbares Markdown liegen |
| Datenordner auf dem Server (`flowplan.sqlite`, `uploads/`) | nein – dafür die Festplattenverschlüsselung des Hosts |

### Einschalten

Einen Schlüssel erzeugen und als Umgebungsvariable setzen, dann neu starten:

```bash
openssl rand -base64 32
# oder ohne openssl:
docker run --rm ghcr.io/yannicschuller/flowplan node /app/decrypt.mjs --new-key
```

```env
FLOWPLAN_ENCRYPTION_KEY=<32 Bytes, base64>
# oder als Docker-Secret:
FLOWPLAN_ENCRYPTION_KEY_FILE=/run/secrets/flowplan-key
```

**Administration → Verschlüsselung** zeigt danach „Verschlüsselung an“ mit der Schlüssel-ID (die ersten Bytes eines Hashes, nicht der Schlüssel selbst). Ein falsch geformter Schlüssel erscheint dort als Fehler; Sicherungen schlagen dann fehl, statt unverschlüsselt zu landen.

> [!CAUTION]
> Ohne den Schlüssel sind verschlüsselte Sicherungen und Dateien verloren – auch für dich. Bewahre ihn getrennt von den Sicherungen auf (Passwortmanager, Tresor), nicht im selben Bucket und nicht nur auf demselben Server.

### Bestehende Daten

Es gibt keinen Migrationsschritt, und beim Start wird nichts umgeschrieben. Flowplan erkennt verschlüsselte Daten an den ersten Bytes, unverschlüsselte und verschlüsselte liegen problemlos nebeneinander:

- **Ab dem Einschalten** werden neue Dateien, jede neue Sicherung und jeder neue Export verschlüsselt.
- **Dateien, die schon im Bucket liegen**, bleiben lesbar und zunächst unverschlüsselt. Die Administration zählt sie; **Bestehende verschlüsseln** lädt sie im Hintergrund noch einmal hoch, diesmal verschlüsselt, und ersetzt dabei das alte Objekt. Die App läuft währenddessen normal weiter.
- **Ältere Sicherungen und Exporte** werden nicht umgeschrieben. Sie fallen mit der Zeit aus der Aufbewahrung (**Aufbewahrte Sicherungen**) heraus oder lassen sich von Hand löschen.
- **Wiederherstellen** geht mit beiden: Eine unverschlüsselte Instanzsicherung lässt sich weiter hochladen, eine verschlüsselte wird vorher entschlüsselt.
- Hat der Bucket **Versionierung**, bleiben ältere, unverschlüsselte Versionen der Objekte erhalten. Diese per Lebenszyklus-Regel oder von Hand entfernen.

**Ausschalten** geht auch: Verschiebe den Schlüssel nach `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS`. Dann wird nichts mehr verschlüsselt, das bereits Verschlüsselte bleibt aber lesbar.

### Schlüssel wechseln

1. Den neuen Schlüssel als `FLOWPLAN_ENCRYPTION_KEY` setzen und den alten nach `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS` verschieben (mehrere durch Komma getrennt), dann neu starten.
2. Unter **Administration → Verschlüsselung** **Bestehende verschlüsseln** wählen. Alle Dateien im Bucket werden mit dem neuen Schlüssel neu verschlüsselt.
3. Den alten Schlüssel aufheben, bis die letzte damit verschlüsselte Sicherung aus der Aufbewahrung gefallen ist.

Jede verschlüsselte Datei nennt die ID ihres Schlüssels. Fehlt dieser Schlüssel, sagt Flowplan genau das, statt still kaputte Daten zu liefern.

### Litestream und Verschlüsselung

Litestream (0.5) kann die Datenbank-Kopie selbst nicht verschlüsseln. Mit eingeschaltetem Schlüssel warnt die Administration deshalb, dass unter `<Präfix>/db/` eine unverschlüsselte Kopie liegt. Zwei Wege:

1. **Nur verschlüsselte Sicherungen** (empfohlen bei einem Bucket, dem du nicht traust): `FLOWPLAN_LITESTREAM=off` setzen und unter **Administration → Speicher & Sicherung → Sicherungen** die Option **Stündlich statt täglich** einschalten, dazu mehr Kopien aufbewahren (z. B. 72). Danach den Ordner `<Präfix>/db/` im Bucket löschen. Der Preis: Im schlimmsten Fall geht die letzte Stunde verloren statt der letzten Sekunden, und auf einem neuen Host stellst du die Datenbank aus der neuesten Sicherung her (unten).
2. **Serverseitige Verschlüsselung beim Anbieter (SSE-C)**: `LITESTREAM_SSE_C_KEY` auf einen eigenen Schlüssel setzen (32 Bytes, base64). Der Anbieter verschlüsselt die Kopie und bekommt den Schlüssel dafür bei jeder Anfrage mit. Das schützt also vor geleakten Datenträgern oder Buckets, nicht vor dem Anbieter selbst. Das funktioniert nur über https und nur bei Anbietern, die SSE-C unterstützen (vorher prüfen). Vor dem Einschalten den Ordner `<Präfix>/db/` leeren, denn eine Kopie aus unverschlüsselten und SSE-C-Teilen lässt sich nicht wiederherstellen.

### Notfall: ohne laufende Instanz entschlüsseln

`decrypt.mjs` braucht nur Node.js, keine Datenbank und keinen laufenden Server. Es liegt im Docker-Image unter `/app/decrypt.mjs` und im Quellcode unter `scripts/decrypt.mjs`:

```bash
# im Ordner mit der Sicherung
docker run --rm --user "$(id -u)" -v "$PWD:/work" -w /work -e FLOWPLAN_ENCRYPTION_KEY='<Schlüssel>' \
  ghcr.io/yannicschuller/flowplan node /app/decrypt.mjs flowplan-2026-10-19-03-00.sqlite.enc
# → flowplan-2026-10-19-03-00.sqlite
```

Das funktioniert genauso für Markdown-Exporte (`.zip.enc` wird zu `.zip`), für die Instanzsicherung und für einzelne Objekte aus `uploads/` im Bucket (Ausgabe `<Name>.decrypted`). Frühere Schlüssel kommen über `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS` dazu; mit `--key-file <Pfad>` wird der Schlüssel aus einer Datei gelesen. Die Ausgabe entsteht erst, wenn die Prüfsumme stimmt.

Das Format ist offen dokumentiert: `FPE1` (4 Bytes) · Schlüssel-ID (8 Bytes) · IV (12 Bytes) · Daten · GCM-Tag (16 Bytes). Die ersten 12 Bytes sind mit authentifiziert.

### Mehr Schutz

Die Verschlüsselung betrifft das, was den Server verlässt. Auf dem Server selbst liegen Datenbank und Dateien unverschlüsselt, denn Flowplan muss sie lesen, um sie anzuzeigen. Wer auch das abdecken will:

- **Festplattenverschlüsselung** des Hosts (LUKS, verschlüsseltes Volume beim Anbieter). Das lässt sich jederzeit nachrüsten und ist unabhängig von Flowplan.
- Das Format trägt eine Version (`FPE1`) und eine Schlüssel-ID. Ein späterer Wechsel auf ein anderes Verfahren oder einen anderen Schlüssel läuft deshalb über denselben Weg wie oben, ohne dass alte Sicherungen unlesbar werden.
- Eine Verschlüsselung der laufenden Datenbank (SQLCipher) gehört bewusst nicht dazu, siehe die Begründung in [Issue #32](https://github.com/yannicschuller/flowplan/issues/32).
- Für einzelne vertrauliche Inhalte gibt es **[verschlüsselte Bereiche](/encrypted-spaces)**: Sie werden schon im Browser verschlüsselt, sodass auch Datenbank, Uploads-Ordner und Sicherungen auf dem Server nur Chiffretext enthalten – unabhängig von `FLOWPLAN_ENCRYPTION_KEY`.

## Markdown-Export und Git

Eine lesbare Kopie außerhalb von Flowplan – für den Notfall, wenn die Instanz nicht läuft, oder als Archiv in einem Git-Repository. **Administration → Markdown- & Git-Export** wählt Seiten und Datenbanken; mit jeder geplanten Sicherung (und mit **Jetzt sichern**) wird jede davon samt Unterseiten, Kommentaren und früheren Versionen zu einem Markdown-ZIP:

- mit S3 im Bucket unter `<S3_PREFIX>/exports/`, sonst im Datenordner unter `exports/`; es bleiben so viele wie Sicherungen (**Aufbewahrte Sicherungen**). Mit `FLOWPLAN_ENCRYPTION_KEY` sind die ZIPs verschlüsselt (`.zip.enc`), die Übertragung nach Git nicht;
- exportiert wird mit den Leserechten der Person, die die Auswahl gespeichert hat – private Einträge und Journale mit PIN bleiben draußen;
- Dateinamen und Pfade im ZIP enthalten Kennungen, damit sie zwischen zwei Läufen gleich bleiben (sauberer Git-Diff). Einträge beginnen mit YAML-Frontmatter, Kommentare stehen in `<Datei>.comments.md`, frühere Versionen unter `<Datei>.versions/`.

### In ein Git-Repository übertragen

> [!IMPORTANT]
> Der Git-Export der Instanz (`EXPORT_GIT_*`) ist veraltet. Er läuft weiter, wird aber durch den [Git-Export eines Bereichs](#git-export-eines-bereichs) ersetzt, den Bereichseigentümer selbst einrichten; die Administration zeigt dazu einen Hinweis. Der geplante Markdown-Export nach S3 oder in den Datenordner bleibt unverändert.

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
- **Journaltage** (`<Journalordner>/2026/10/2026-10-27.md`) werden über ihr Journal (den Ordner) und das Datum gefunden; `flowplan.id` im Frontmatter zählt nur, wenn sie einen Tag desselben Journals nennt. Repositorys aus älteren Versionen, in denen Tage noch als `pages/<Titel>-<Kennung>.md` lagen, funktionieren weiter: Änderungen an diesen Dateien werden vor dem Export noch übernommen, danach schreibt der Export die Tage an die neuen Pfade und entfernt die alten Dateien. Dabei entsteht kein Tag doppelt; ein umbenanntes Journal behält seine Tage, weil der Ordner über die Kennung zugeordnet wird.
- Datenbanktabellen, Kommentare und Versionen sind Kopien und werden nicht zurückgelesen.

Markdown kennt nicht alle Blöcke von Flowplan (etwa Spalten). Whiteboards liegen als SVG-Bild im Repository; ein eingebettetes Board trägt eine unsichtbare Markierung (`<!-- flowplan:whiteboard … -->`), mit der es beim Übernehmen aus Git wieder eingebettet wird – Bild und Link darunter bitte stehen lassen. Wer in Git Seiten mit anderen solchen Blöcken bearbeitet, findet den vorigen Stand im Versionsverlauf. Den Stand der letzten Übertragung (Commit, übernommene Änderungen, Fehler) zeigt die Administration.

### Git-Export eines Bereichs

Statt eines Repositorys für die ganze Instanz richtet die Eigentümerin oder der Eigentümer eines Bereichs selbst ein Repository für diesen Bereich ein: **Bereich verwalten → Git-Export** (über `…` neben dem Bereich oder **Einstellungen → Bereiche**). Die Administration schaltet die Funktion nur ein:

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `SPACE_GIT_EXPORT` | *leer* | `true` schaltet den Git-Export der Bereiche ein. Ohne die Variable sehen Bereichseigentümer ihn nicht, und eingerichtete Exporte laufen nicht. |
| `SPACE_GIT_ALLOWED_HOSTS` | *leer* | Git-Server, durch Komma getrennt, z. B. `git.example.org,codeberg.org`. Gesetzt sind nur diese erlaubt; ohne die Variable jeder öffentliche `https://`-Server. |
| `SPACE_GIT_ALLOW_PRIVATE` | *leer* | `true` erlaubt den in `SPACE_GIT_ALLOWED_HOSTS` genannten Servern auch interne Adressen – etwa ein Forgejo auf demselben Host, den der Container über `--add-host git.example.org:host-gateway` erreicht. Wirkt nur zusammen mit der Liste; alle anderen Server bleiben auf öffentliche Adressen beschränkt. |

Im Bereich trägt die Eigentümerin oder der Eigentümer ein:

- **Repository-Adresse** (`https://`, ohne Zugangsdaten), **Branch** (Standard `main`), **Benutzername** und ein **Zugangstoken mit Schreibrechten** (GitLab: Benutzername `oauth2`);
- **Häufigkeit**: täglich oder wöchentlich, dazu **Jetzt ausführen**;
- auf Wunsch **Kommentare und frühere Versionen** (`<Datei>.comments.md`, `<Datei>.versions/`).

Was dabei passiert:

- Ins Repository kommt der [Markdown-Export des Bereichs](/import-export-versions) – jede Seite der obersten Ebene in einem eigenen Ordner (`<Titel>-<Kennung>/`), dazu `index.md` und `README.txt`. Andere Dateien im Repository (etwa `LICENSE` oder CI-Dateien) bleiben unberührt.
- Ein Commit je Lauf, und nur, wenn sich etwas geändert hat; Seiten, die nicht mehr im Bereich sind, werden im selben Commit gelöscht.
- Anhänge über 10 MB gehen mit, wie im Markdown-Export.
- Exportiert wird mit den Leserechten der Eigentümerin oder des Eigentümers: private Einträge anderer und Journale mit PIN bleiben draußen.
- Nur Export: Änderungen im Repository übernimmt Flowplan nicht.
- Die Einstellungen zeigen den letzten Lauf (Commit, geänderte Dateien, Fehler) und ab wann der nächste fällig ist. Ein fehlgeschlagener Lauf wird nach einer Stunde wiederholt.

Sicherheit:

- Das Token speichert Flowplan nur verschlüsselt (wie die anderen [gespeicherten Geheimnisse](/configuration#gespeicherte-geheimnisse), an den Bereich gebunden). Nach dem Speichern zeigt die Oberfläche nur noch, ob eines gespeichert ist; in Exporten steht es nicht, in der Instanzsicherung nur verschlüsselt. Eine neue Repository-Adresse braucht das Token erneut.
- Jede Adresse wird aufgelöst und geprüft: Interne Adressen (localhost, private Netze) sind nicht erreichbar, Weiterleitungen werden nicht verfolgt. Einzige Ausnahme: Server, die die Administration in `SPACE_GIT_ALLOWED_HOSTS` nennt, wenn zusätzlich `SPACE_GIT_ALLOW_PRIVATE=true` gesetzt ist – etwa ein Git-Server auf demselben Host. Auch dann bleibt es bei HTTPS, festgelegter Adresse und ohne Weiterleitungen.
- Der Export endet, und Token und Arbeitskopie (`git-export/spaces/<Bereich>/` im Datenordner) werden gelöscht, wenn die Eigentümerin oder der Eigentümer ihn ausschaltet, den Arbeitsbereich verlässt, Gast wird oder das Konto löscht – oder wenn der Bereich eine neue Eigentümerin oder einen neuen Eigentümer bekommt oder in den Papierkorb wandert.

**Administration → Markdown- & Git-Export** zeigt, wie viele Bereiche den Git-Export nutzen, und ihre letzten Fehler – ohne Adressen und Inhalte.

## Wiederherstellen

- **Aus einer Instanzsicherung**: unter **Administration → Speicher & Sicherung → Aus Sicherung wiederherstellen** (ganz unten) hochladen. Flowplan prüft sie und übernimmt sie beim nächsten Neustart; der vorherige Stand bleibt unter `pre-restore-…` im Datenverzeichnis.
- **Aus einer geplanten Sicherung** bei gestoppter App: eine verschlüsselte erst [entschlüsseln](#notfall-ohne-laufende-instanz-entschluesseln), dann die bestehende `flowplan.sqlite` samt `-wal` und `-shm` beiseitelegen und die Sicherung als `/app/data/flowplan.sqlite` einsetzen. Mit S3 kommen die Dateien aus dem Bucket nach.
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
