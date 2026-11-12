---
keywords: Verschlüsselung, FLOWPLAN_ENCRYPTION_KEY, Schlüssel wechseln, entschlüsseln, Litestream
---

# Verschlüsselung von Dateien und Sicherungen

Mit einem eigenen Schlüssel verschlüsselt Flowplan alles, was den Server verlässt – Dateien im Bucket, Sicherungen und die Datenbank-Kopie –, auch für bestehende Daten.

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
