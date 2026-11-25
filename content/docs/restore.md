---
keywords: Wiederherstellen, Sicherung, Backup, Litestream, Zeitpunkt, Notfall, S3, SFTP, Einrichtung
---

# Wiederherstellen

Eine Instanz aus einer Sicherung, aus dem S3-Bucket oder zu einem früheren Zeitpunkt zurückholen – und Litestream reparieren, wenn seine Replik feststeckt.

## Wege zur Wiederherstellung

- **Aus einer Instanzsicherung**: unter **Einstellungen → Instanz → Speicher & Sicherung → Aus Sicherung wiederherstellen** (ganz unten) hochladen. Flowplan prüft sie und übernimmt sie beim nächsten Neustart; der vorherige Stand bleibt unter `pre-restore-…` im Datenverzeichnis.
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

## Litestream-Zustand reparieren {since=0.10.0}

Haben zwei Container gleichzeitig auf demselben Volume repliziert (siehe [SQLite ohne Überlappung ausrollen](/coolify-and-proxy#sqlite-ohne-ueberlappung-ausrollen)), meldet das Log alle 30 Sekunden `compaction failed … level=1 … close reader 0: file checksum mismatch`. Die Datenbank selbst ist in Ordnung – kaputt ist eine Änderungsdatei (LTX) von Litestream. Litestream repariert sie nicht von selbst: Die Zusammenfassung der Änderungen bleibt an dieser Datei hängen, alte Änderungsdateien werden nicht mehr aufgeräumt und eine Wiederherstellung aus dem Bucket, die über diese Datei läuft, bricht ab.

**Flowplan erkennt und repariert das selbst.** {since=0.10.0} Alle 15 Minuten listet der Container, der repliziert, einmal `<Präfix>/db/0000/` im Bucket. Liegen dort Änderungsdateien, die älter als eine Stunde sind, während Litestream in diesem Container schon länger als 30 Minuten läuft, hängt die Replik. {since=0.11.0} Noch früher verrät sie der Arbeitsspeicher von Litestream: Jede gescheiterte Zusammenfassung hält alle Änderungsdateien seit der kaputten im Speicher, bis das System Litestream beendet und damit den Container. Deshalb liest Flowplan diesen Speicher jede Minute; liegt er über max(512 MB, 25 % des Speichers von Container oder Host) und steigt 10 Minuten lang stetig, gilt die Replik ebenfalls als hängend. Dann zeigt **Einstellungen → Instanz → Überwachung** eine Warnung, Administratoren bekommen eine Nachricht je Vorfall ([Warnungen per Webhook](/monitoring#warnungen-per-webhook), Ereignis `ops.litestream_stuck`, und ihre Chat-Apps), und das Aktivitätsprotokoll einen Eintrag. Flowplan legt eine geplante Sicherung an, wenn sie eingeschaltet sind, und merkt die Reparatur für den **nächsten Neustart** vor; scheitert die Sicherung, merkt es nichts vor und versucht es nach sechs Stunden wieder.

Bei diesem Start löscht Flowplan im Bucket nur `<Präfix>/db/`, setzt den lokalen Zustand zurück, und Litestream beginnt mit einem vollständigen Snapshot. Dateien, Sicherungen und die Datenbank im Volume bleiben; ohne Datenbank im Volume bleibt auch die Replik. Scheitert das Löschen, startet Flowplan normal, meldet es im Log und versucht es beim nächsten Start wieder.

Von selbst startet Flowplan nicht neu: Die Reparatur wartet auf das nächste Update oder den nächsten Neustart. **Jetzt neu starten** erledigt es sofort – der Container kommt über seine Neustart-Richtlinie wieder (`restart: unless-stopped`, in Coolify Standard). **Reparatur abbrechen** nimmt es zurück. Mit `FLOWPLAN_LITESTREAM_AUTOHEAL=off` gibt es nur Warnung und Nachricht; **Replik jetzt neu aufbauen** in der Warnung merkt die Reparatur von Hand vor.

**Von Hand, Schritt 1 – den lokalen Zustand zurücksetzen.** Das entfernt nur die lokalen Änderungsdateien in `.flowplan.sqlite-litestream/ltx`, nie die Datenbank (`litestream reset`):

::: steps

1. Im laufenden Container (in Coolify unter **Terminal**): `touch /app/data/litestream-reset`.
2. Den Container **stoppen** und danach wieder **starten** – nicht als Rolling Update.
3. Beim Start meldet das Log `Litestream: resetting the local replication state` und danach `detected database behind replica` und `fetched latest L0 file from replica`: Litestream übernimmt die letzte Position aus dem Bucket und schreibt dann weiter. Die Datei `litestream-reset` löscht Flowplan danach selbst.

:::

Ohne laufenden Container geht dasselbe von Hand: Container stoppen, im Volume nur den Ordner `.flowplan.sqlite-litestream` löschen (nie `flowplan.sqlite`, `-wal` oder `-shm`), Container starten.

**Schritt 2 – nur wenn die Meldung danach weiter kommt:** Dann liegt die kaputte Datei auch im Bucket, und Litestream liest sie beim Zusammenfassen von dort. Starte die Replikation neu:

::: steps

1. Zur Vorsicht unter **Einstellungen → Instanz → Speicher & Sicherung** eine Sicherung erstellen und herunterladen.
2. In der laufenden Instanz `echo remote > /app/data/litestream-reset` (dasselbe wie **Replik jetzt neu aufbauen**), dann den Container **stoppen** und wieder **starten**. {since=0.10.0}
3. Beim Start löscht Flowplan im Bucket nur `<Präfix>/db/`, setzt den lokalen Zustand zurück und startet Litestream. Litestream findet keinen Stand im Bucket, beginnt von vorn und lädt sofort einen vollständigen Snapshot der Datenbank hoch (`<Präfix>/db/0009/`).

:::

Ohne `remote` (eine leere Datei `litestream-reset`) setzt Flowplan wie in Schritt 1 nur den lokalen Zustand zurück. Den Ordner `<Präfix>/db/` kannst du auch selbst im Bucket löschen, während der Container gestoppt ist – **nicht** `<Präfix>/uploads/` oder `<Präfix>/backups/`, das sind die Dateien und Sicherungen.

Bis dieser Snapshot im Bucket liegt, gibt es dort keinen früheren Zeitpunkt zum Wiederherstellen; die Datenbank im Volume und deine Sicherungen bleiben unberührt.

## Beim Einrichten wiederherstellen

Eine neue, noch leere Instanz übernimmt eine Sicherung direkt auf dem Einrichtungsbildschirm: unter **Konto erstellen** auf **Aus Sicherung wiederherstellen** klicken ([Installation, Erster Start](/installation#erster-start)). Möglich sind

- **Datei**: eine geplante Sicherung (`flowplan-….sqlite`, `.sqlite.enc`) oder die Sicherung der gesamten Instanz (`flowplan-instanz-….zip`, `.zip.enc`), bis 50 GB. Der Upload wird direkt auf die Festplatte geschrieben und zeigt seinen Fortschritt. Fehlen danach Anhänge, die weder in der Sicherung noch im Dateispeicher der Instanz liegen, nennt die Seite ihre Zahl – lagen die Dateien der alten Instanz in S3 oder auf einem SFTP-Server, stelle von dort wieder her.
- **S3**: die neueste geplante Sicherung aus `<Präfix>/backups/` eines Buckets, dazu die Dateien aus `<Präfix>/uploads/` – fehlt dort eine, aus `<Präfix>/.deleted/uploads/`.
- **SFTP**: die neueste Sicherung aus dem Ordner, dazu die Dateien aus `uploads/` (wenn **Dateien mitsichern** an war) – fehlt dort eine, aus `.deleted/uploads/`. Zuerst zeigt Flowplan den Hostschlüssel; erst wenn du **Der Fingerabdruck stimmt** bestätigst, meldet es sich an.

Ist die Sicherung verschlüsselt, frag die Seite nach dem Schlüssel der alten Instanz (`FLOWPLAN_ENCRYPTION_KEY`) – oder er ist auf der neuen schon gesetzt. Flowplan prüft die Datenbank (unbeschädigt, eine Flowplan-Datenbank, nicht aus einer neueren Version – ältere werden beim Öffnen wie bei einem Update aktualisiert), legt den leeren Anfangsstand als `pre-restore-…` beiseite und übernimmt die Sicherung sofort. Danach meldest du dich mit einem Konto aus der Sicherung an. Läuft Litestream (S3 ohne `FLOWPLAN_LITESTREAM=off`), wird die Sicherung erst beim nächsten Neustart des Containers übernommen – die Seite sagt das.

Die Möglichkeit gibt es nur, solange die Instanz kein Konto hat, und mit gesetztem `FLOWPLAN_SETUP_TOKEN` nur über den Einrichtungslink. Sobald ein Konto existiert, lehnt der Server jede Anfrage dazu ab; dann bleibt **Einstellungen → Instanz → Speicher & Sicherung → Aus Sicherung wiederherstellen**.

> [!NOTE]
> Gespeicherte Geheimnisse (Authenticator-Apps, KI- und Messenger-Schlüssel, das SFTP-Passwort) lassen sich nur mit demselben `FLOWPLAN_ENCRYPTION_KEY` oder `FLOWPLAN_SECRETS_KEY` wie auf der alten Instanz lesen; ohne beide liegt der Schlüssel in `secrets.key` im Datenordner, der in keiner Sicherung steckt. Hast du beim Wiederherstellen einen Schlüssel eingegeben, trage ihn danach als `FLOWPLAN_ENCRYPTION_KEY` ein.
