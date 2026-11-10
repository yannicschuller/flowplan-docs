# Instanz umziehen

So bringst du eine ganze Flowplan-Instanz auf einen anderen Server – etwa vom Heimserver auf einen gemieteten Server –, mit allen Konten, Arbeitsbereichen, Dateien und Schlüsseln und meist nur wenigen Minuten Ausfallzeit.

Eine Flowplan-Instanz besteht aus genau vier Dingen:

| Teil | Was | Zieht mit um |
| --- | --- | --- |
| Container | das Image `ghcr.io/yannicschuller/flowplan` (für `linux/amd64` und `linux/arm64`) | neu installieren, dieselbe oder eine neuere Version |
| Datenordner `/app/data` | `flowplan.sqlite` (+ `-wal`, `-shm`), `uploads/`, `web-push-keys.json`, `secrets.key`; `ocr/` und `tmp/` entstehen neu | ja – das ist der eigentliche Umzug |
| Umgebungsvariablen | `APP_URL`, Schlüssel, `OIDC_*`, `S3_*`, `SMTP_*` … | von Hand übernehmen, **vor allem die Schlüssel** |
| Domain und Reverse Proxy | DNS-Eintrag, HTTPS-Zertifikat | DNS umstellen, Proxy neu einrichten |

Das gilt für jede Art des Betriebs: `docker run`, Docker Compose, Kubernetes mit dem [Helm-Chart](/installation#kubernetes-helm), ohne Docker oder in einem Verwaltungs-Panel. Nutzt du ein Panel, legst du dort denselben Container mit demselben Volume und denselben Variablen neu an.

## Vorbereiten

1. **Umgebungsvariablen aufschreiben.** Alle, die die alte Instanz bekommt – je nach Betrieb aus der `.env`, mit `docker inspect <container>` (Abschnitt `Env`), `docker compose config` oder `helm get values flowplan`. Die vollständige Liste steht unter [Konfiguration](/configuration).
2. **Die Schlüssel sichern**, getrennt von den Daten (Passwortmanager):
   - `FLOWPLAN_ENCRYPTION_KEY` (oder die Datei aus `FLOWPLAN_ENCRYPTION_KEY_FILE`) und `FLOWPLAN_ENCRYPTION_KEY_PREVIOUS`: Ohne sie sind verschlüsselte Sicherungen, die verschlüsselten Dateien im Bucket und die damit verschlüsselten gespeicherten Geheimnisse unlesbar.
   - `FLOWPLAN_SECRETS_KEY` (oder `…_FILE`), falls gesetzt. Ist keiner der beiden gesetzt, liegt der Schlüssel für gespeicherte Geheimnisse als `secrets.key` im Datenordner – das eingebaute Umzugswerkzeug nimmt ihn mit, bei den anderen Wegen kopierst du ihn selbst.
   - Was davon abhängt: KI-Schlüssel, Kalenderverbindungen (Google, Microsoft 365), Chat-App-Tokens, Git-Export-Tokens und die Zwei-Faktor-Geheimnisse der Konten. Fehlt der Schlüssel, kommen Konten mit Zwei-Faktor-Anmeldung nur noch mit Wiederherstellungscodes hinein.
3. **Die Domain behalten.** Gleiche `APP_URL` heißt: Passkeys, die OIDC-Weiterleitung, CalDAV- und CardDAV-Konten, die Apps, eingehende Webhooks (Git, Tickets, E-Mail-Eingang) und Freigabelinks funktionieren nach dem DNS-Wechsel einfach weiter. Mit einer neuen Domain muss all das neu eingerichtet werden (siehe [Andere Domain](#andere-domain)).
4. **Die TTL des DNS-Eintrags senken**, mindestens so lange vorher, wie die bisherige TTL beträgt (oft 1 bis 24 Stunden), z. B. auf 300 Sekunden. Dann greift die Umstellung später in Minuten.
5. **Den neuen Server einrichten** (Beispiel: [Hetzner Cloud](#beispiel-hetzner-cloud)) mit **derselben oder einer neueren** Flowplan-Version – eine ältere kann eine neuere Datenbank nicht öffnen – und mit denselben Umgebungsvariablen. Ein eigenes S3-Bucket für die neue Instanz ist am einfachsten; mit demselben Bucket siehe [Weg C](#weg-c-s3-und-litestream).
6. **Eine Sicherung anlegen**: **Administration → Speicher & Sicherung → Gesamte Instanz → Herunterladen**. Sie schadet nie.
7. **Die Nutzer vorwarnen**: **Administration → Wartung & Hinweise** zeigt allen ein Wartungsfenster an.

## Drei Wege

| Weg | Wann | Ausfallzeit |
| --- | --- | --- |
| **A: Umzugswerkzeug** (empfohlen) | immer, wenn der neue Server den alten erreicht | Minuten (nur der letzte Abgleich) |
| **B: Sicherung herunterladen und hochladen** | kleine Instanzen, kein Netzweg zwischen den Servern | von der Sicherung bis zum Start der neuen Instanz |
| **C: S3 und Litestream** | die alte Instanz läuft schon mit S3 und Litestream | Stoppen der alten bis Start der neuen Instanz |

### Weg A: Das Umzugswerkzeug

Unter **Administration → Speicher & Sicherung** (nur für Admins) holt die neue Instanz alles direkt von der alten: von Server zu Server, fortsetzbar und mit Prüfsummen.

**Auf der alten Instanz – „Umzug vorbereiten“**

1. **Instanz umziehen → Umzug vorbereiten**. Zur Sicherheit fragt Flowplan nach deinem Passwort; bei Anmeldung über SSO muss die Anmeldung höchstens 15 Minuten alt sein (sonst einmal ab- und wieder anmelden).
2. Flowplan zeigt die **Übertragungsadresse** und das **Umzugstoken** (`fpmove_…`) – **nur dieses eine Mal**. Das Token gilt 24 Stunden und nur für den Umzug: Es darf die Instanz lesen, sie für den letzten Abgleich schreibschützen und den Umzug abschließen, sonst nichts. Gespeichert wird nur ein Hash; **Widerrufen** macht es sofort ungültig, ein neues Token ersetzt das alte. Das Erstellen, Widerrufen und jeder Schritt des Umzugs stehen im Aktivitätsprotokoll und als Sicherheitsereignis unter **Administration → Sicherheit**. Zehn falsche Token-Versuche von einer Adresse sperren sie für 15 Minuten.

**Auf der neuen Instanz – „Von anderer Instanz übernehmen“**

Die neue Instanz ist frisch: nur das erste Admin-Konto, das du beim ersten Start anlegst. Hat sie schon Inhalte, verlangt Flowplan eine ausdrückliche Bestätigung, denn alles wird ersetzt.

> [!TIP]
> **Gleiche Domain, aber DNS zeigt noch auf den alten Server?** Dann erreichst du die neue Instanz unter ihrer endgültigen Adresse noch nicht, und der Proxy bekommt dafür noch kein Zertifikat. Zwei Möglichkeiten:
> - **Vorübergehende Adresse:** einen zweiten Namen auf den neuen Server zeigen lassen (etwa `neu.flowplan.example.org`), die neue Instanz zuerst mit `APP_URL=https://neu.flowplan.example.org` starten und den Umzug dort durchführen. Die Vorabprüfung warnt dann bei `APP_URL` – das ist erwartet. Vor dem Neustart in Schritt 6 `APP_URL` auf die endgültige Adresse setzen (der Proxy darf beide Namen bedienen).
> - **Ohne Oberfläche:** die [Kommandozeile](#ohne-oberflaeche-kommandozeile) auf dem neuen Server.

1. **Instanz umziehen → Von anderer Instanz übernehmen**: die **Adresse der alten Instanz** (ihre `APP_URL`) und das **Umzugstoken** eintragen, **Übernahme starten**.
   - Steht der alte Server nur im eigenen Netz (LAN, VPN wie WireGuard oder Tailscale, z. B. `http://192.168.1.10:3000`), auf der **neuen** Instanz vorübergehend `FLOWPLAN_MOVE_ALLOW_PRIVATE=true` setzen. Ohne diese Variable sind wie bei allen Abrufen des Servers nur öffentliche `https://`-Adressen erlaubt.
2. **Erste Kopie**: ein konsistenter Datenbankstand, alle Dateien aus `uploads/` einzeln mit SHA-256-Prüfsumme, `web-push-keys.json` und `secrets.key`. Die Seite zeigt Bytes, Dateien und die geschätzte Restzeit. Die alte Instanz läuft währenddessen normal weiter. Bricht die Verbindung ab oder startet ein Server neu, geht es mit **Fortsetzen** an derselben Stelle weiter – bereits geprüfte Dateien werden nicht noch einmal geholt, eine halbe Datei wird ab ihrem letzten Byte fortgesetzt.
3. **Vorabprüfung → Prüfen**. Flowplan vergleicht die Einstellungen beider Instanzen – nur Namen und Prüfwerte (HMAC mit dem Umzugstoken), nie die Werte selbst – und prüft, ob die neue Instanz S3, SMTP und den OIDC-Anbieter erreicht. Das Ergebnis ist eine Liste mit **OK**, **Warnung** und **Fehler**:

   | Prüfung | Bedeutung |
   | --- | --- |
   | Version | Fehler, wenn die neue Instanz älter ist als die alte: zuerst aktualisieren. |
   | `FLOWPLAN_ENCRYPTION_KEY` | Fehler, wenn er fehlt oder ein anderer ist: Verschlüsselte Sicherungen, die verschlüsselten Dateien im Bucket, gespeicherte Tokens und Kalenderverbindungen wären unlesbar. Den alten Schlüssel setzen (ein neuer höchstens zusätzlich, der alte dann in `…_PREVIOUS`). |
   | Gespeicherte Geheimnisse | Fehler, wenn der Schlüssel dafür fehlt (`FLOWPLAN_SECRETS_KEY` bzw. `FLOWPLAN_ENCRYPTION_KEY`). Ein erzeugtes `secrets.key` kommt automatisch mit. |
   | `APP_URL` | Warnung bei einer anderen Adresse, mit allem, was dann neu einzurichten ist. |
   | OIDC, S3, SMTP, Push, KI, weitere | Variablen, die hier fehlen, einen anderen Wert haben oder nur hier gesetzt sind. Fehlende `OIDC_ISSUER`/`OIDC_CLIENT_ID` sind ein Fehler – sonst kommt niemand per SSO hinein. |
   | Gleicher Bucket | Warnung: Beide Instanzen schreiben sonst in denselben Ordner (siehe [Weg C](#weg-c-s3-und-litestream)). |
   | S3, SMTP, OIDC erreichbar | Fehler mit der Meldung des Dienstes. Ports 25 und 465 sperren viele Anbieter ausgehend – dann Port 587. |

   Ändere die Variablen der neuen Instanz und starte sie neu, bis keine Fehler mehr bleiben; der Umzug geht nach dem Neustart weiter.
4. **Quelle schreibschützen und letzten Stand holen**: Ab hier beginnt die Ausfallzeit. Die alte Instanz nimmt keine Änderungen mehr an – alle sehen „Umzug läuft: Diese Instanz ist schreibgeschützt“, Lesen und Anmelden gehen weiter, Änderungen (auch über API, CalDAV, Webhooks, eingehende E-Mails) werden mit einer klaren Meldung abgelehnt. Die neue Instanz holt einen frischen Datenbankstand und nur die Dateien, die seit der ersten Kopie neu sind oder sich geändert haben; entfernte fallen weg. Das dauert meist Minuten.
5. **Beim Neustart übernehmen → Übernehmen**: Flowplan prüft die Datenbank und legt alles für den nächsten Start bereit – genau wie **Aus Sicherung wiederherstellen**. Die alte Instanz bekommt Bescheid: Sie zeigt jetzt „Diese Instanz ist umgezogen nach …“, bleibt schreibgeschützt, und ihr Umzugstoken ist verbraucht.
6. **Die neue Instanz neu starten** (den Container, den Pod bzw. den Dienst). Beim Start ersetzt Flowplan Datenbank, Dateien und Schlüssel; der vorherige Stand der neuen Instanz bleibt als `pre-move-<Zeit>` im Datenordner. Im Protokoll steht `Instanz wiederhergestellt; vorheriger Stand in …/pre-move-…`.
7. **DNS umstellen** (unten) und [danach prüfen](#danach-pruefen).

Anmelden kannst du dich auf der neuen Instanz jetzt mit den Konten der alten; das erste Admin-Konto der neuen ist ersetzt. Bestehende Anmeldungen (Browser, Apps) gelten weiter, solange die Domain gleich bleibt.

Auf der alten Instanz lässt sich unter **Instanz umziehen** noch **Weboberfläche weiterleiten** einschalten: Wer sie im Browser öffnet, landet direkt auf der neuen Adresse. **Schreibschutz aufheben** macht sie wieder beschreibbar – nur, wenn der Umzug abgebrochen wird.

Solange die alte Instanz schreibgeschützt ist, pausieren ihre Hintergrunddienste: E-Mail-Eingang (das IMAP-Postfach bleibt ungelesen für die neue Instanz), Kalender- und Issue-Synchronisierung, Workflows, Erinnerungen, Zustellungen von E-Mails, Push, Webhooks und Messengern sowie geplante Sicherungen. Auch die App kann dort nichts mehr ändern.

#### Ohne Oberfläche (Kommandozeile)

Dasselbe ohne Weboberfläche auf der neuen Instanz – etwa bevor dort überhaupt ein Konto existiert, oder über SSH, solange das DNS noch auf den alten Server zeigt. Das Werkzeug liegt im Image unter `/app/move.mjs` und im Quellcode unter `scripts/move.mjs` (`npm run move`). Es holt die erste Kopie, schaltet die alte Instanz schreibgeschützt, holt den letzten Stand, legt alles für den nächsten Start bereit und meldet der alten Instanz die neue Adresse (`--target-url`, sonst `APP_URL`). Abgebrochen? Denselben Befehl noch einmal ausführen – er macht an derselben Stelle weiter.

```bash
# Docker Compose (im Ordner der neuen Instanz; gleiche .env, gleiches Volume)
docker compose run --rm flowplan node /app/move.mjs \
  --from https://flowplan.example.org --token fpmove_…
docker compose up -d          # startet und übernimmt die Kopie

# docker run
docker run --rm -v flowplan-data:/app/data -e APP_URL=https://flowplan.example.org \
  ghcr.io/yannicschuller/flowplan node /app/move.mjs --from https://flowplan.example.org --token fpmove_…

# Kubernetes (Helm-Chart)
kubectl -n flowplan exec deploy/flowplan -- node /app/move.mjs --from https://flowplan.example.org --token fpmove_…
kubectl -n flowplan rollout restart deploy/flowplan

# ohne Docker
npm run move -- --from https://flowplan.example.org --token fpmove_… --data /var/lib/flowplan
```

| Option | Bedeutung |
| --- | --- |
| `--from <Adresse>` | Adresse der alten Instanz. Auf der Kommandozeile sind auch interne Adressen und `http://` erlaubt – du entscheidest, wohin sie sich verbindet. |
| `--token <Token>` | Das Umzugstoken (oder `FLOWPLAN_MOVE_TOKEN` in der Umgebung, damit es nicht in der Shell-History landet). |
| `--data <Ordner>` | Datenordner, Standard `FLOWPLAN_DATA_DIR` bzw. `./data`. |
| `--target-url <Adresse>` | Adresse der neuen Instanz für den Hinweis auf der alten (Standard `APP_URL`). |
| `--copy-only` | Nur die erste Kopie; die alte Instanz bleibt beschreibbar. Später ohne die Option noch einmal für den letzten Abgleich. |
| `--yes` | Einen Datenordner ersetzen, der schon Inhalte hat (der bisherige Stand bleibt als `pre-move-…`). |

Die Vorabprüfung gibt es nur in der Oberfläche; auf der Kommandozeile vergleichst du die Variablen selbst (Liste oben).

### Weg B: Sicherung herunterladen und hochladen

1. Auf der alten Instanz [Wartung ankündigen](/administration#wartung-hinweise) – Änderungen nach dem Herunterladen gehen verloren.
2. **Administration → Speicher & Sicherung → Gesamte Instanz → Herunterladen**. Mit `FLOWPLAN_ENCRYPTION_KEY` ist die Datei verschlüsselt (`.zip.enc`) – die neue Instanz braucht dann denselben Schlüssel.
3. Die Instanzsicherung enthält Datenbank und Dateien, aber **nicht** `secrets.key` und `web-push-keys.json`. Beide von Hand kopieren (oder die Schlüssel als Variablen setzen):
   ```bash
   # alt
   docker compose cp flowplan:/app/data/secrets.key .
   docker compose cp flowplan:/app/data/web-push-keys.json .
   # neu
   docker compose cp secrets.key flowplan:/app/data/
   docker compose cp web-push-keys.json flowplan:/app/data/
   docker compose exec -u root flowplan chown node:node /app/data/secrets.key /app/data/web-push-keys.json
   ```
4. Auf der neuen Instanz **Aus Sicherung wiederherstellen → Sicherung auswählen**. Der Proxy davor muss so große Uploads durchlassen (Caddy von sich aus, nginx mit `client_max_body_size`, Cloudflare höchstens 100 MB); sonst die Datei per `scp` auf den Server bringen und dort hochladen. Höchstens 50 GB.
5. Neu starten; der vorherige Stand bleibt als `pre-restore-…`. Dann DNS umstellen.

### Weg C: S3 und Litestream

Läuft die alte Instanz mit S3 (Dateien im Bucket) und Litestream (laufende Kopie der Datenbank unter `<Präfix>/db/`), kann die neue Instanz direkt aus dem Bucket starten:

1. Die alte Instanz **stoppen** – Litestream beider Instanzen dürfen nie gleichzeitig in denselben Ordner schreiben.
2. Die neue Instanz mit **denselben** `S3_*`-Variablen, demselben `FLOWPLAN_ENCRYPTION_KEY` und einem **leeren** Datenordner starten. Litestream stellt die Datenbank wieder her, die Dateien holt Flowplan beim ersten Abruf sofort und alle übrigen im Hintergrund.
3. `secrets.key` und `web-push-keys.json` wie in Weg B kopieren, falls die Schlüssel nicht als Variablen gesetzt sind.
4. DNS umstellen.

Mit `FLOWPLAN_LITESTREAM=off` gibt es keine laufende Kopie: dann die neueste geplante Sicherung aus `<Präfix>/backups/` verwenden (siehe [Wiederherstellen](/storage-and-backups#wiederherstellen)). Die Vorabprüfung von Weg A erkennt eine Litestream-Kopie im Bucket und weist auf diesen Weg hin.

> [!NOTE]
> Aktive [Workflows](/workflows) kommen auf der neuen Instanz **pausiert** an – mit Entwurf, Versionen und angehaltenen Läufen. So startet nichts doppelt, solange die alte Instanz noch läuft. Prüfe sie danach und aktiviere sie wieder.

## DNS umstellen

1. Nach dem letzten Abgleich (Weg A) bzw. dem Start der neuen Instanz den **A-Eintrag** (IPv4) und den **AAAA-Eintrag** (IPv6) der Domain auf den neuen Server ändern. Am alten Standort eine Portweiterleitung oder einen Tunnel entfernen.
2. Der Proxy des neuen Servers holt das Zertifikat, sobald die Domain auf ihn zeigt (bei Let's Encrypt über Port 80) – eine Minute Geduld.
3. Mit `dig +short flowplan.example.org` (oder `nslookup`) prüfen, was die Welt sieht. Wer die alte Adresse noch im Cache hat, landet bis zum Ablauf der TTL auf der alten Instanz – dort steht dann der Hinweis auf die neue.
4. Danach die TTL wieder anheben.

## Danach prüfen

- **Anmelden**: mit Passwort, Passkey und SSO. Bestehende Sitzungen gelten weiter.
- **Administration → Überwachung**: alles grün? **Administration → Verschlüsselung** zeigt dieselbe Schlüssel-ID wie vorher.
- **Administration → Speicher & Sicherung**: S3 verbunden, Warteschlange läuft leer (mit S3 lädt Flowplan nach einer Übernahme alle Dateien einmal hoch), **Jetzt sichern** gelingt.
- **Administration → E-Mail → Test-E-Mail senden** und **Administration → Push-Benachrichtigungen → Testbenachrichtigung senden**.
- Ein paar Seiten, Bilder und Anhänge öffnen; eine Datei hochladen.
- KI, Kalenderverbindungen, Chat-Apps: funktionieren sie ohne neue Anmeldung, sind die gespeicherten Geheimnisse lesbar.
- CalDAV/CardDAV in einer App aktualisieren, die Desktop- und Mobil-Apps öffnen, eingehende Webhooks (Git, Tickets) einmal auslösen.

## Aufräumen

- Auf der neuen Instanz `FLOWPLAN_MOVE_ALLOW_PRIVATE` wieder entfernen.
- `pre-move-…` (bzw. `pre-restore-…`) im Datenordner nach ein paar Tagen löschen, z. B. `docker compose exec flowplan sh -c 'rm -rf /app/data/pre-move-*'`.
- Die alte Instanz noch einige Tage mit dem Hinweis laufen lassen, dann stoppen, das Volume sicher löschen und ihre S3-Zugangsdaten (falls eigene) widerrufen. Das Umzugstoken ist schon verbraucht.
- Eine geplante Sicherung auf der neuen Instanz einschalten bzw. prüfen ([Sicherungen](/storage-and-backups#sicherungen)).

## Zurück, falls etwas schiefgeht

Bis zum DNS-Wechsel ist nichts verloren: Auf der alten Instanz **Administration → Speicher & Sicherung → Instanz umziehen → Schreibschutz aufheben**, und alles läuft weiter wie vorher. Nach dem Wechsel: DNS zurückstellen und den Schreibschutz aufheben – was auf der neuen Instanz inzwischen geändert wurde, kommt nur mit einem Umzug in die Gegenrichtung zurück. Die neue Instanz selbst kehrt zu ihrem vorherigen Stand zurück, indem du bei gestopptem Container `flowplan.sqlite*` und `uploads/` durch den Inhalt von `pre-move-…` ersetzt.

## Andere Domain

Bekommt die Instanz eine neue Adresse, setze `APP_URL` auf die neue und richte danach neu ein:

- **Passkeys** sind an die Domain gebunden: Alle melden sich mit Passwort oder SSO an und legen sie neu an.
- **OIDC**: die Weiterleitungsadresse beim Anbieter auf `<neue APP_URL>/api/auth/callback` ändern.
- **CalDAV und CardDAV**: Konten in den Kalender- und Kontakte-Apps neu einrichten.
- **Eingehende Webhooks** (Git, Ticket-Sync, E-Mail-Eingang) und **Freigabelinks** zeigen auf die alte Adresse.
- **Desktop- und Mobil-Apps** speichern die Adresse des Servers. Sie verbinden sich weiter mit der alten Instanz; dort sehen alle den Hinweis „Diese Instanz ist umgezogen nach …“, und Änderungen werden mit einer Meldung abgelehnt, die die neue Adresse nennt. In der App abmelden und die neue Adresse eintragen (Desktop: **Profile → Profil hinzufügen …**). **Weboberfläche weiterleiten** dabei ausgeschaltet lassen: Die Apps nehmen keine Adresse an, die auf eine andere Seite weiterleitet.

## Fehlersuche

| Meldung oder Zustand | Ursache und Lösung |
| --- | --- |
| „Interne Adressen sind nur mit FLOWPLAN_MOVE_ALLOW_PRIVATE=true erlaubt“ | Die alte Instanz hat eine private Adresse (LAN, VPN, `localhost`) oder nur `http://`. Auf der neuen Instanz `FLOWPLAN_MOVE_ALLOW_PRIVATE=true` setzen, neu starten, nach dem Umzug wieder entfernen. |
| „Ungültiges oder abgelaufenes Umzugstoken“ | Falsch kopiert, älter als 24 Stunden, widerrufen, durch ein neues ersetzt oder durch einen abgeschlossenen Umzug verbraucht. Auf der alten Instanz ein neues erzeugen. |
| „Zu viele ungültige Umzugsanfragen“ | Zehn falsche Tokens von einer Adresse: 15 Minuten warten. |
| Übertragung bricht ab | **Fortsetzen** (bzw. den Befehl noch einmal ausführen). Fertige Dateien bleiben, halbe werden fortgesetzt. |
| „Prüfsumme stimmt nicht“ | Die Datei kam beschädigt an und wird automatisch neu geladen; bleibt es dabei, die Verbindung (Proxy, VPN) prüfen. |
| „Dieser Datenbankstand ist nicht mehr vorhanden“ | Die alte Instanz hat inzwischen einen neuen Stand erzeugt (neues Token, Neustart). **Fortsetzen** holt ihn. |
| Zeitüberschreitung beim Start (502/504) | Beim ersten Mal berechnet die alte Instanz die Prüfsummen aller Dateien. Ein Proxy mit kurzem Zeitlimit davor (nginx: `proxy_read_timeout` 60 s, Cloudflare 100 s) bricht ab. Zeitlimit erhöhen oder die Adresse ohne Proxy verwenden (mit `FLOWPLAN_MOVE_ALLOW_PRIVATE`). |
| Vorabprüfung: Fehler bei `FLOWPLAN_ENCRYPTION_KEY` oder gespeicherten Geheimnissen | Den Schlüssel der alten Instanz auf der neuen setzen und neu starten. Erst dann umschalten. |
| SMTP nicht erreichbar | Viele Anbieter sperren ausgehend Port 25 und 465. `SMTP_PORT=587` mit STARTTLS verwenden. |
| Nach **Übernehmen** passiert nichts | Die Übernahme braucht einen Neustart der neuen Instanz. Im Protokoll muss `Instanz wiederhergestellt` stehen. |
| Die Seite der alten Instanz zeigt „schreibgeschützt“, obwohl der Umzug abgebrochen wurde | **Instanz umziehen → Schreibschutz aufheben**. |

## Beispiel: Hetzner Cloud

Ein konkreter Weg vom Heimserver auf einen Server bei Hetzner, mit Docker Compose und Caddy. Namen und Preise der Tarife ändern sich – maßgeblich ist die Hetzner Console.

### Server

| Einstellung | Empfehlung |
| --- | --- |
| Typ | **CAX21** (Arm64, 4 vCPU, 8 GB RAM) oder **CX32** (x86, 4 vCPU, 8 GB RAM) bzw. der aktuelle Nachfolger. 4 GB reichen für kleine Teams; die Texterkennung gescannter PDFs braucht kurzzeitig CPU, lokale KI (Ollama) deutlich mehr. Das Image gibt es für `linux/arm64` und `linux/amd64`, beide Typen passen. |
| Standort | **Falkenstein** (`fsn1`) oder **Nürnberg** (`nbg1`) – dort gibt es auch Object Storage. |
| Image | **Ubuntu 24.04** |
| Netzwerk | Öffentliche IPv4 und IPv6. Eine IPv4-Adresse behalten: Nicht jede Registry und jeder Mailserver ist über IPv6 erreichbar. |
| SSH-Key | Eigenen öffentlichen Schlüssel hinterlegen; Anmeldung mit Passwort gar nicht erst nutzen. |
| Firewall | Eine **Hetzner Cloud Firewall** anlegen und zuweisen: eingehend TCP **22** nur von deiner Adresse (oder deinem VPN), TCP **80** und **443** sowie UDP **443** (HTTP/3) von überall. Docker umgeht `ufw` auf dem Server; die Cloud Firewall davor greift trotzdem. |
| Backups | **Backups** des Servers einschalten (Aufpreis auf den Serverpreis): tägliche Abbilder der ganzen Platte, zusätzlich zu Flowplans eigenen Sicherungen. |

### Object Storage als S3

1. In der Hetzner Console **Object Storage → Bucket erstellen**, Standort wie der Server (z. B. Falkenstein), Sichtbarkeit **privat**. Der Name muss eindeutig sein, z. B. `flowplan-<dein-name>`.
2. **Sicherheit → S3-Zugangsdaten → Zugangsdaten erstellen**. Das Secret wird nur einmal angezeigt.
3. In die `.env`:

```dotenv
S3_BUCKET=flowplan-beispiel
S3_ENDPOINT=https://fsn1.your-objectstorage.com
S3_REGION=fsn1
S3_ACCESS_KEY_ID=<Access Key>
S3_SECRET_ACCESS_KEY=<Secret Key>
S3_PREFIX=flowplan
```

Endpoint und Region folgen dem Standort: `https://<Standort>.your-objectstorage.com` mit `fsn1` (Falkenstein), `nbg1` (Nürnberg) oder `hel1` (Helsinki) als `S3_REGION`. Mit `FLOWPLAN_ENCRYPTION_KEY` liegen Dateien und Sicherungen dort verschlüsselt; die Litestream-Kopie nicht (siehe [Litestream und Verschlüsselung](/storage-and-backups#litestream-und-verschluesselung)). Object Storage wird monatlich abgerechnet, mit einem Grundpreis, der ein Kontingent enthält – die aktuellen Preise stehen bei Hetzner.

### Docker, Flowplan und Caddy

Docker nach der offiziellen Anleitung für Ubuntu installieren ([docs.docker.com/engine/install/ubuntu](https://docs.docker.com/engine/install/ubuntu/)), dann:

```bash
mkdir -p /opt/flowplan && cd /opt/flowplan
curl -o .env https://raw.githubusercontent.com/yannicschuller/flowplan/main/.env.example
# compose.yaml und Caddyfile von unten anlegen, .env ausfüllen
docker compose up -d
```

`compose.yaml`:

```yaml
# Flowplan mit Caddy davor (HTTPS von Let's Encrypt). Genau eine Instanz (SQLite).
services:
  flowplan:
    image: ghcr.io/yannicschuller/flowplan:${FLOWPLAN_VERSION:-latest}
    env_file: .env
    environment:
      FLOWPLAN_DATA_DIR: /app/data
      # Caddy ist der eine Proxy davor und setzt X-Forwarded-For.
      FLOWPLAN_TRUSTED_PROXIES: "1"
    volumes:
      - flowplan-data:/app/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]
      interval: 30s
      timeout: 5s
      start_period: 20s
      retries: 3

  caddy:
    image: caddy:2
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    environment:
      FLOWPLAN_DOMAIN: ${FLOWPLAN_DOMAIN}
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy-data:/data
      - caddy-config:/config
    depends_on:
      - flowplan
    restart: unless-stopped

volumes:
  flowplan-data:
  caddy-data:
  caddy-config:
```

`Caddyfile`:

```caddyfile
{$FLOWPLAN_DOMAIN} {
	encode zstd gzip
	reverse_proxy flowplan:3000
}
```

In der `.env` zusätzlich zu den Werten der alten Instanz:

```dotenv
FLOWPLAN_DOMAIN=flowplan.example.org
APP_URL=https://flowplan.example.org
# SMTP: Hetzner sperrt für neue Konten ausgehend Port 25 und 465 – 587 mit STARTTLS nehmen.
SMTP_PORT=587
SMTP_SECURE=false
# Nur für den Umzug, wenn der Heimserver nur im LAN/VPN erreichbar ist:
# FLOWPLAN_MOVE_ALLOW_PRIVATE=true
```

Für eine [vorübergehende Adresse](#weg-a-das-umzugswerkzeug) während des Umzugs `FLOWPLAN_DOMAIN=neu.flowplan.example.org` und die passende `APP_URL` setzen; nach **Übernehmen** beide auf die endgültige Domain ändern und mit `docker compose up -d` neu starten – derselbe Neustart übernimmt den Umzug. Caddy kann auch beide Namen bedienen: `{$FLOWPLAN_DOMAIN}, neu.flowplan.example.org { … }`.

Lieber Kubernetes? Das [Helm-Chart](/installation#kubernetes-helm) aus dem Repository läuft auch auf einem einzelnen Server (etwa mit k3s); der Umzug geht dann über die Oberfläche oder `kubectl exec … node /app/move.mjs` (oben).

### Ablauf mit dem Heimserver

1. Einen Tag vorher die TTL des DNS-Eintrags auf 300 Sekunden senken.
2. Den Hetzner-Server wie oben einrichten, mit denselben Variablen wie zu Hause (Schlüssel!), und mit `docker compose up -d` starten; das erste Konto anlegen.
3. Zu Hause **Umzug vorbereiten**, auf dem Hetzner-Server **Von anderer Instanz übernehmen** mit der öffentlichen Adresse des Heimservers (oder seiner VPN-Adresse mit `FLOWPLAN_MOVE_ALLOW_PRIVATE=true`).
4. Vorabprüfung, bis keine Fehler bleiben. **Quelle schreibschützen und letzten Stand holen**, **Übernehmen**, `docker compose restart flowplan`.
5. A- und AAAA-Eintrag auf die Adressen des Hetzner-Servers stellen, Portweiterleitung am Router entfernen.
6. [Danach prüfen](#danach-pruefen), nach ein paar Tagen [aufräumen](#aufraeumen).
