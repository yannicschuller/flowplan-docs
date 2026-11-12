---
keywords: SQLite, PostgreSQL, wechseln, Migration, Datenbank
---

# Datenbank wechseln: SQLite und PostgreSQL

Mit dem mitgelieferten Werkzeug ziehst du eine Instanz von SQLite nach PostgreSQL um – oder zurück. Die Ausfallzeit ist das Kopieren selbst, meist wenige Minuten; jede Tabelle wird danach Zeile für Zeile verglichen.

## Wie es abläuft

Das Werkzeug `db-migrate.mjs` liegt im Docker-Image unter `/app/scripts/` (im Quellcode unter `scripts/`). Es kopiert alle Tabellen von der Quelle in ein leeres Ziel und vergleicht danach jede Tabelle anhand der Zeilenzahl und einer Prüfsumme über alle Werte. Die Quelle bleibt dabei unverändert – darum ist der Weg zurück jederzeit möglich, solange niemand im Ziel weitergearbeitet hat.

Nicht kopiert, sondern beim ersten Start neu aufgebaut werden der Suchindex und die `pgvector`-Tabelle. Die KI-Embeddings selbst werden kopiert; die semantische Suche braucht danach also keine neuen Aufrufe beim KI-Anbieter.

Die **Dateien** zieht das Werkzeug nicht um, sie bleiben, wo sie sind: im Ordner `uploads/` des Datenordners oder im S3-Bucket. Behalte deshalb denselben Datenordner (dasselbe Volume) bzw. dieselben `S3_*`-Werte. Auch `secrets.key` und `web-push-keys.json` bleiben im Datenordner und werden weiter gebraucht.

Grob dauert das Kopieren eine Sekunde je einige zehntausend Zeilen; Dokumente und Embeddings machen den größten Teil aus. Dazu kommt der erste Start mit dem Aufbau des Suchindex (siehe [Suche auf PostgreSQL](/postgresql#suche-auf-postgresql)).

## Von SQLite zu PostgreSQL

Die Befehle gehen von der Installation mit Docker Compose aus (Dienst `flowplan`, Volume auf `/app/data`) und von einem PostgreSQL, das der Container unter dem Namen `postgres` erreicht. Ersetze `<Passwort>` und die Adresse durch deine Werte.

1. **Gleiche Version.** Aktualisiere Flowplan auf die Version, die danach laufen soll, und starte es einmal. Das Werkzeug lehnt eine Datenbank aus einer anderen Version ab.
2. **Ziel vorbereiten:** eine leere Datenbank auf PostgreSQL 16 oder neuer und eine Rolle, der sie gehört – siehe [Voraussetzungen](/postgresql#voraussetzungen), dort auch zu `pg_trgm` und `pgvector`.
3. **Sichern:** **Administration → Speicher & Sicherung → Gesamte Instanz → Herunterladen**. Bewahre die Datei auf, bis die neue Instanz läuft.
4. **Flowplan stoppen** – das Werkzeug liest nur dann einen stimmigen Stand, wenn niemand schreibt:

   ```bash
   docker compose stop flowplan
   ```

5. **Kopieren und prüfen:**

   ```bash
   docker compose run --rm --no-deps --entrypoint node flowplan \
     /app/scripts/db-migrate.mjs \
     --from sqlite:/app/data/flowplan.sqlite \
     --to postgres://flowplan:<Passwort>@postgres:5432/flowplan
   ```

   Die Ausgabe zeigt den Fortschritt je Tabelle und am Ende eine Tabelle mit Zeilenzahl und den Prüfsummen von Quelle und Ziel. Die letzte Zeile lautet `verified: every table has the same rows` (Exit-Code 0). Bei `DIFFERENCES found` (Exit-Code 1) sind die betroffenen Tabellen mit `DIFFERENT` markiert; noch nutzt niemand das Ziel – Ursache beheben, Zieldatenbank leeren und neu starten.

6. **Umstellen:** In der `.env` `DATABASE_URL=postgres://flowplan:<Passwort>@postgres:5432/flowplan` setzen (und `FLOWPLAN_PG_SCHEMA`, falls nicht `public`). Datenordner und `S3_*`-Werte bleiben, wie sie sind.
7. **Starten und prüfen:**

   ```bash
   docker compose up -d
   ```

   Anmelden, eine Seite öffnen, etwas suchen (der Index füllt sich in Sekunden bis Minuten) und unter **Administration → Überwachung → System** nachsehen, dass dort **PostgreSQL** steht.
8. **Aufräumen, aber nicht sofort:** Die alte `flowplan.sqlite` bleibt im Datenordner liegen und wird ignoriert, solange `DATABASE_URL` gesetzt ist. Lösche sie erst, wenn die erste geplante Sicherung der neuen Instanz gelaufen ist.

Mit S3: Litestream läuft mit PostgreSQL nicht mehr; die geplanten Sicherungen werden zu `pg_dump`-Archiven ([Sicherungen mit pg_dump](/postgresql#sicherungen-mit-pg-dump)). Die alte Litestream-Kopie unter `<Präfix>/db/` im Bucket kannst du später löschen.

Ohne Docker Compose geht dasselbe mit `docker run` – Volume und Netzwerk des Containers mitgeben:

```bash
docker run --rm --network <Netzwerk> -v flowplan-data:/app/data --entrypoint node \
  ghcr.io/yannicschuller/flowplan:latest /app/scripts/db-migrate.mjs \
  --from sqlite:/app/data/flowplan.sqlite \
  --to postgres://flowplan:<Passwort>@postgres:5432/flowplan
```

## Von PostgreSQL zu SQLite

Derselbe Weg in der anderen Richtung. Die Zieldatei darf noch nicht existieren – liegt im Datenordner noch eine `flowplan.sqlite` aus der Zeit vor PostgreSQL, schiebe sie zuerst beiseite.

1. Gleiche Version auf beiden Seiten, Instanzsicherung herunterladen (wie oben).
2. Flowplan stoppen: `docker compose stop flowplan`.
3. Eine alte SQLite-Datei beiseitelegen:

   ```bash
   docker compose run --rm --no-deps --entrypoint sh flowplan -c \
     'mkdir -p /app/data/sqlite-old && for f in /app/data/flowplan.sqlite*; do [ -e "$f" ] && mv "$f" /app/data/sqlite-old/; done; true'
   ```

4. Kopieren und prüfen:

   ```bash
   docker compose run --rm --no-deps --entrypoint node flowplan \
     /app/scripts/db-migrate.mjs \
     --from postgres://flowplan:<Passwort>@postgres:5432/flowplan \
     --to sqlite:/app/data/flowplan.sqlite
   ```

5. `DATABASE_URL` (und `FLOWPLAN_PG_SCHEMA`) aus der `.env` entfernen, dann `docker compose up -d` und prüfen wie oben.
6. Mit S3: Litestream sichert die neue Datei ab dem Start wieder laufend. Liegt im Bucket unter `<Präfix>/db/` noch eine Kopie aus der Zeit vor PostgreSQL, lösche oder verschiebe sie vor dem Start – sonst könnte ein späteres Wiederherstellen aus dem Bucket bei diesem alten Stand landen.

Die PostgreSQL-Datenbank bleibt unverändert; behalte sie, bis die erste geplante Sicherung der SQLite-Instanz gelaufen ist.

## Optionen des Werkzeugs

| Option | Bedeutung |
| --- | --- |
| `--from`, `--to` | Quelle und Ziel: `sqlite:<Datei>` auf der einen, `postgres://…` auf der anderen Seite. |
| `--schema <Name>` | Schema in PostgreSQL (Standard `public`; wird angelegt, wenn es fehlt). Gehört zu `FLOWPLAN_PG_SCHEMA`. |
| `--verify-only` | Nichts kopieren, nur Zeilenzahlen und Prüfsummen beider Seiten vergleichen. |
| `--batch <Zahl>` | Zeilen je Lesevorgang (Standard 1000). |
| `--quiet` | Keine Fortschrittszeilen. |

Was das Werkzeug ablehnt: eine Quelle aus einer anderen Flowplan-Version, eine Zieltabelle, die schon Zeilen enthält, eine Zieldatei, die schon existiert, und Werte, die nicht in die PostgreSQL-Spalte passen (SQLite nimmt in jeder Spalte alles an) – dann mit der betroffenen Zeile.

## Nachprüfen

Solange noch niemand in der neuen Instanz gearbeitet hat, kannst du den Vergleich jederzeit wiederholen:

```bash
docker compose run --rm --no-deps --entrypoint node flowplan \
  /app/scripts/db-migrate.mjs --verify-only \
  --from sqlite:/app/data/flowplan.sqlite \
  --to postgres://flowplan:<Passwort>@postgres:5432/flowplan
```

Je Tabelle stehen Zeilenzahl und die Prüfsummen von Quelle und Ziel nebeneinander. Die Prüfsumme hängt nicht von der Reihenfolge ab und vergleicht die Werte so, wie beide Datenbanken sie speichern.

## Zurück, falls etwas schiefgeht

- **Vor dem ersten Arbeiten in der neuen Instanz:** Flowplan stoppen, die Einstellung zurücknehmen (`DATABASE_URL` entfernen bzw. wieder setzen) und starten. Die Quelle ist unverändert.
- **Wenn schon gearbeitet wurde:** in die Gegenrichtung umziehen (Abschnitt oben), damit nichts verloren geht.
- **Notfalls:** die heruntergeladene Instanzsicherung unter **Administration → Speicher & Sicherung → Aus Sicherung wiederherstellen** oder auf dem Einrichtungsbildschirm einspielen – sie passt auf beide Datenbanken.

Ist ein Kopiervorgang abgebrochen, setzt das Werkzeug nicht fort: Zieldatenbank leeren (bzw. die angefangene Datei löschen) und neu beginnen.

## Suchindex neu aufbauen

Nach dem Wechsel baut Flowplan den Suchindex beim ersten Start von selbst neu auf. Von Hand geht es so:

```bash
docker compose exec flowplan node /app/scripts/db-search-rebuild.mjs
```

Mit `DATABASE_URL` in der Umgebung betrifft es PostgreSQL, sonst die SQLite-Datei im Datenordner (`--sqlite <Datei>` für eine andere).

## Andere Wege

- Die **Instanzsicherung** (ZIP) und das [Umzugswerkzeug](/move-instance) übertragen die Datenbank im portablen SQLite-Format und lassen sich auf SQLite wie auf PostgreSQL einspielen. Für einen Umzug auf einen anderen Server samt Wechsel der Datenbank ist das oft der bequemere Weg.
- Für den [Cluster-Modus](/cluster) müssen die Dateien vorher im S3-Bucket liegen – siehe dort.
