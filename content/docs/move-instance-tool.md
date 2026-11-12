---
keywords: Umzugswerkzeug, Abgleich, Ausfallzeit, Fehlersuche, Umzug
---

# Umzug mit dem Umzugswerkzeug

Das Umzugswerkzeug holt die neue Instanz alles von der alten – Datenbank, Dateien, Schlüssel – mit kurzer Ausfallzeit; dazu die Fehlersuche beim Umzug.

## Weg A: Das Umzugswerkzeug

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
   | Gleicher Bucket | Warnung: Beide Instanzen schreiben sonst in denselben Ordner (siehe [Weg C](/move-instance#weg-c-s3-und-litestream)). |
   | S3, SMTP, OIDC erreichbar | Fehler mit der Meldung des Dienstes. Ports 25 und 465 sperren viele Anbieter ausgehend – dann Port 587. |

   Ändere die Variablen der neuen Instanz und starte sie neu, bis keine Fehler mehr bleiben; der Umzug geht nach dem Neustart weiter.
4. **Quelle schreibschützen und letzten Stand holen**: Ab hier beginnt die Ausfallzeit. Die alte Instanz nimmt keine Änderungen mehr an – alle sehen „Umzug läuft: Diese Instanz ist schreibgeschützt“, Lesen und Anmelden gehen weiter, Änderungen (auch über API, CalDAV, Webhooks, eingehende E-Mails) werden mit einer klaren Meldung abgelehnt. Die neue Instanz holt einen frischen Datenbankstand und nur die Dateien, die seit der ersten Kopie neu sind oder sich geändert haben; entfernte fallen weg. Das dauert meist Minuten.
5. **Beim Neustart übernehmen → Übernehmen**: Flowplan prüft die Datenbank und legt alles für den nächsten Start bereit – genau wie **Aus Sicherung wiederherstellen**. Die alte Instanz bekommt Bescheid: Sie zeigt jetzt „Diese Instanz ist umgezogen nach …“, bleibt schreibgeschützt, und ihr Umzugstoken ist verbraucht.
6. **Die neue Instanz neu starten** (den Container, den Pod bzw. den Dienst). Beim Start ersetzt Flowplan Datenbank, Dateien und Schlüssel; der vorherige Stand der neuen Instanz bleibt als `pre-move-<Zeit>` im Datenordner. Im Protokoll steht `Instanz wiederhergestellt; vorheriger Stand in …/pre-move-…`.
7. **DNS umstellen** (unten) und [danach prüfen](/move-instance#danach-pruefen).

Anmelden kannst du dich auf der neuen Instanz jetzt mit den Konten der alten; das erste Admin-Konto der neuen ist ersetzt. Bestehende Anmeldungen (Browser, Apps) gelten weiter, solange die Domain gleich bleibt.

Auf der alten Instanz lässt sich unter **Instanz umziehen** noch **Weboberfläche weiterleiten** einschalten: Wer sie im Browser öffnet, landet direkt auf der neuen Adresse. **Schreibschutz aufheben** macht sie wieder beschreibbar – nur, wenn der Umzug abgebrochen wird.

Solange die alte Instanz schreibgeschützt ist, pausieren ihre Hintergrunddienste: E-Mail-Eingang (das IMAP-Postfach bleibt ungelesen für die neue Instanz), Kalender- und Issue-Synchronisierung, Workflows, Erinnerungen, Zustellungen von E-Mails, Push, Webhooks und Messengern sowie geplante Sicherungen. Auch die App kann dort nichts mehr ändern.

### Ohne Oberfläche (Kommandozeile)

Dasselbe ohne Weboberfläche auf der neuen Instanz – etwa bevor dort überhaupt ein Konto existiert, oder über SSH, solange das DNS noch auf den alten Server zeigt. Das Werkzeug liegt im Image unter `/app/move.mjs` und im Quellcode unter `scripts/move.mjs` (`npm run move`). Es holt die erste Kopie, schaltet die alte Instanz schreibgeschützt, holt den letzten Stand, legt alles für den nächsten Start bereit und meldet der alten Instanz die neue Adresse (`--target-url`, sonst `APP_URL`). Abgebrochen? Denselben Befehl noch einmal ausführen – er macht an derselben Stelle weiter.

```bash
# Docker Compose (im Ordner der neuen Instanz; gleiche .env, gleiches Volume)
docker compose run --rm flowplan node /app/move.mjs \
  --from https://flowplan.example.org --token fpmove_…
docker compose up -d          # startet und übernimmt die Kopie

# docker run
docker run --rm -v flowplan-data:/app/data -e APP_URL=https://flowplan.example.org \
  ghcr.io/yannicschuller/flowplan node /app/move.mjs --from https://flowplan.example.org --token fpmove_…
# (schreibt als UID 1000; mit PUID/PGID -e PUID=… -e PGID=… ergänzen, mit user: --user UID:GID)

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
