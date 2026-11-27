---
keywords: Fehlersuche, Neustart, Absturz, OOM, Speicher voll, docker inspect, dmesg, Litestream, checksum mismatch, Sperre, Fehlerbericht, Bug-Report, Installationsdetails, Diagnose
---

# Fehlersuche im Betrieb

Was du prüfst, wenn eine laufende Instanz ohne Fehler neu startet, Litestream Fehler meldet oder zwei Container einen Datenordner teilen – und was in einen Fehlerbericht gehört.

**Mehr zum Thema:** [Betrieb und Fehlersuche](/operations) · [Überwachung und Wartung](/monitoring) · [Speicher, S3 und Sicherung](/storage-and-backups) · [Coolify und Reverse Proxy](/coolify-and-proxy)

Probleme beim Einrichten (Anmeldung, Rechte, Proxy) stehen in der [Tabelle zur Fehlersuche](/operations#fehlersuche).

## Neustarts ohne Fehler

Flowplan startet neu, im Log steht kein Fehler, und die Leute merken nur eine kurze Unterbrechung. Fang mit Flowplans eigener Aufzeichnung an, frag dann Docker und den Kernel.

### In Flowplan

**Einstellungen → Instanz → Überwachung → Neustarts** {since=0.10.0} listet jeden Neustart der letzten 30 Tage mit Grund (sauber beendet, Absturz, vermutlich Speicher voll, ohne Spur beendet), dem Speicher beim letzten Lebenszeichen und, bei einem unerwarteten, den letzten 200 Zeilen des Server- und Litestream-Logs vor dem Ende, mit **Als .txt herunterladen**. Was die Gründe bedeuten und wo ihre Grenzen liegen, steht unter [Neustarts](/monitoring#neustarts).

### Mit Docker

```sh
# Warum der Container zuletzt endete und wie oft er neu startete
docker inspect --format 'OOMKilled={{.State.OOMKilled}} ExitCode={{.State.ExitCode}} RestartCount={{.RestartCount}} FinishedAt={{.State.FinishedAt}}' <container>
# Die letzten Healthchecks mit ihrer Ausgabe
docker inspect --format '{{json .State.Health}}' <container>
# Was in den letzten 24 Stunden mit dem Container geschah (die, oom, kill, health_status)
docker events --since 24h --until "$(date +%s)" --filter container=<container>
# Speicher und CPU jetzt, gegen die Grenze
docker stats --no-stream <container>
# Ob der Kernel einen Prozess wegen Speichermangels beendet hat
dmesg -T | grep -i oom
```

| Du siehst | Bedeutet |
| --- | --- |
| `OOMKilled=true`, `ExitCode=137` | Der Container hat seine eigene Speichergrenze erreicht, der Kernel hat ihn beendet. Grenze erhöhen oder finden, was wächst (unten, [Litestream](#litestream)). |
| `ExitCode=137` ohne OOM | `SIGKILL` von außen: `docker kill`, `kill -9` oder ein Stopp, der länger dauerte als die Wartezeit. |
| `ExitCode=143` oder `0` nach `docker stop`/einem Update | Ein normaler Stopp (`SIGTERM`). |
| `Health.Status` `unhealthy`, `FailingStreak` steigt | `/api/health` schlug mehrmals hintereinander fehl; `Health.Log` enthält die Antworten. Docker allein startet einen ungesunden Container nicht neu, ein Orchestrator vielleicht. |
| `RestartCount` steigt | Die Neustart-Richtlinie holt den Container zurück; `docker events` zeigt, wann. |
| `Out of memory: Killed process … (litestream)` oder `(node)` in `dmesg` | Der Kernel hat den Prozess beendet. `Memory cgroup out of memory` heißt: die Grenze des Containers; eine Zeile ohne `cgroup` (`constraint=CONSTRAINT_NONE`) heißt: der ganze Server hatte keinen Speicher mehr. |

**Der ganze Server hat keinen Speicher mehr.** Ohne Speichergrenze am Container wählt der globale OOM-Killer des Kernels den größten Prozess auf dem Server – das kann Litestream sein, der erste Prozess im Container. `OOMKilled` bleibt dabei `false`, weil nicht die Grenze des Containers die Ursache war; und hat Docker den Container schon neu gestartet, zeigt `docker inspect` den neuen, laufenden Container (`ExitCode=0`), nicht wie der alte endete – das sagen `docker events` oder der Eintrag unter Neustarts. Flowplan führt den Neustart als „ohne Spur beendet“ oder, wenn beim letzten Lebenszeichen höchstens 5 % des Serverspeichers frei waren, als „vermutlich Speicher voll“. Sicher sagt es nur `dmesg`. Gib dem Container eine Speichergrenze oder lass dem Server genug Platz für Flowplan, Litestream und alles andere darauf; siehe [Dimensionierung](/sizing).

## Litestream

Litestream repliziert die SQLite-Datenbank in den Bucket (nur mit S3 und ohne `DATABASE_URL`). Seine Zeilen im Log tragen `level=…`; die gespeicherte Kopie ist `/app/data/logs/litestream.log`.

| Zeile im Log | Bedeutet |
| --- | --- |
| `sync error … rename …ltx.tmp …: no such file or directory` | Zwei Litestream-Prozesse arbeiten auf derselben Datenbank – zwei Container auf einem Volume ([unten](#zwei-container-auf-einem-datenordner)). |
| `compaction failed … level=1 … file checksum mismatch`, alle 30 Sekunden | Eine Änderungsdatei (LTX) von Litestream ist kaputt, lokal oder im Bucket – meist von so einer Überlappung. Die Datenbank selbst ist in Ordnung. |

Solange die Zusammenfassung hängt, räumt Litestream seine Änderungsdateien nicht mehr auf: Sie stapeln sich lokal und im Bucket, und **der Speicher von Litestream wächst weiter** – bis der Kernel es beendet (siehe oben, der ganze Server ohne Speicher). Auch eine Wiederherstellung aus dem Bucket über die kaputte Datei bricht ab.

**Flowplan repariert das selbst.** {since=0.10.0} Alle 15 Minuten prüft es den Bucket; eine hängende Replik bringt eine Warnung in **Einstellungen → Instanz → Überwachung**, eine Nachricht an die Administratoren und, nach einer geplanten Sicherung, eine Reparatur beim nächsten Neustart (**Jetzt neu starten** erledigt es sofort). `FLOWPLAN_LITESTREAM_AUTOHEAL=off` lässt nur die Warnung.

Die Reparatur ist eine Markierungsdatei `/app/data/litestream-reset`, die der nächste Start liest, bevor Litestream repliziert:

| Inhalt | Bewirkt |
| --- | --- |
| leer (`touch`) | Setzt nur den lokalen Zustand zurück (`.flowplan.sqlite-litestream`); Litestream macht vom Bucket aus weiter. |
| `remote` als erste Zeile {since=0.10.0} | Löscht zusätzlich `<Präfix>/db/` im Bucket; Litestream beginnt neu mit einem vollständigen Snapshot. Geschrieben von der Selbstheilung und von **Replik jetzt neu aufbauen**. |

Datenbank, Dateien und Sicherungen bleiben unberührt. Die Schritte, was das Log zeigt und was ohne laufenden Container zu tun ist, stehen unter [Litestream-Zustand reparieren](/restore#litestream-zustand-reparieren).

## Zwei Container auf einem Datenordner

Mit SQLite darf auf einem Datenordner nur ein Container laufen. Jeder Container hält eine Sperre auf `/app/data/.flowplan.lock` {since=0.10.0}; ein zweiter, der sie belegt findet, antwortet trotzdem, startet kein Litestream und schreibt einen Block ins Log:

```text
==========================================================================
Flowplan: ANOTHER CONTAINER IS USING THE DATA FOLDER /app/data.
  It holds /app/data/.flowplan.lock. Two Flowplan containers on one SQLite database must not overlap:
  …
==========================================================================
```

**Einstellungen → Instanz → Überwachung** zeigt auf beiden Containern die Warnung „Ein zweiter Flowplan-Container (*Host*) nutzt seit *Zeit* dasselbe Datenverzeichnis …“. Ein paar Sekunden während eines Updates deuten auf ein Ausrollen mit Überlappung; bleibt die Warnung, läuft eine zweite Ressource, Replica oder ein `docker run` auf demselben Volume. Such den anderen Container (`docker ps`, der Hostname in der Warnung) und stopp ihn. Wie du ohne Überlappung ausrollst, auch in Coolify, steht unter [SQLite ohne Überlappung ausrollen](/coolify-and-proxy#sqlite-ohne-ueberlappung-ausrollen).

## Was in einen Fehlerbericht gehört

**Für Bug-Report kopieren** {since=0.12.2}: Unter **Einstellungen → Über Flowplan** fasst dieser Knopf die Installationsdetails in einer Zeile zusammen und zeigt sie in einem Kasten darunter, zum Beispiel `Backend: Flowplan 0.12.2 (release, build 28c0c38, built 2026-11-27T12:10Z) · Frontend: Firefox 140, Windows`. Füg sie im Issue ins Feld **Installation details** ein.

- **Alle** bekommen die Flowplan-Version, den Kanal (Beta oder Release), den Build (kurzer Commit) und sein Datum sowie den eigenen Browser und das System – in der App für iPhone, iPad und Android oder in der Desktop-App statt des Browsers die Version der App.
- **Admins** bekommen außerdem Node.js, wie Flowplan installiert ist, die Datenbank (SQLite oder PostgreSQL mit Hauptversion), den Speicher (lokale Platte oder S3) und Einzelinstanz oder Cluster. Derselbe Knopf steht unter **Einstellungen → Instanz → Name & Version**. Die Installationsart ist, was `FLOWPLAN_INSTALL_METHOD` sagt ([Konfiguration](/configuration-storage#rechtliches-und-oberflaeche)), sonst das, was Flowplan erkennt: Kubernetes, Docker, Podman oder kein Container.
- **Nie darin:** Hostnamen, IP-Adressen, die Adresse der Instanz, E-Mail-Adressen, Namen oder Geheimnisse.

Den Backend-Teil gibt es auch über `GET /api/diagnostics` und das MCP-Werkzeug [`get_diagnostics`](/mcp#werkzeuge). Ein API-Token hat nie Admin-Rechte; beide antworten ihm deshalb ohne die Admin-Angaben.

Eröffne ein [Issue](https://github.com/yannicschuller/flowplan/issues/new/choose) mit:

- der **Versionszeile**, der ersten Zeile, die Flowplan ins Log schreibt, z. B. `Flowplan 0.10.0 (release, build abc1234, built …, Node.js …)` (oder `version` aus [`/api/health`](/operations#healthcheck) mit dem Token);
- bei einem Neustart der **.txt** des Eintrags aus **Einstellungen → Instanz → Überwachung → Neustarts**;
- der Ausgabe der `docker inspect`-Zeilen oben und, falls vorhanden, den `dmesg`-Zeilen um den Zeitpunkt;
- bei Litestream den ersten Fehlerzeilen im Log und ob S3 und `S3_PREFIX` gesetzt sind (nicht ihre Werte);
- wie die Instanz läuft: Docker, Compose, Coolify, Kubernetes; SQLite oder PostgreSQL; Speichergrenze.

> [!WARNING]
> **Nie Geheimnisse posten:** keine Schlüssel, Token, Passwörter, `.env`-Dateien und kein vollständiges `docker inspect` ohne `--format` – es listet jede Umgebungsvariable mit ihrem Wert. Flowplan schwärzt seine gespeicherten Log-Dateien ([was geschwärzt wird](/monitoring#neustarts)), lies trotzdem jede Zeile, bevor du sie postest; `docker logs` ist nicht geschwärzt.
