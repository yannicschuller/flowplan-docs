# Dimensionierung

Wie viele Personen eine Flowplan-Instanz trägt, was zuerst knapp wird und welche Hardware du für kleine, mittlere und große Teams einplanen solltest – auf Grundlage der Lasttests.

## Aktive Personen statt Konten

Entscheidend ist nicht, wie viele Konten eine Instanz hat, sondern wie viele Personen **im selben Moment** arbeiten: Seiten öffnen, tippen, suchen, Einträge ändern. Ein Konto, das gerade nichts tut, kostet den Server nichts.

Die Zahlen unten zählen **aktive Personen** so, wie der Lasttest sie nachstellt: Jede schickt im Schnitt alle 1,5 Sekunden eine Anfrage oder tippt ununterbrochen in einem gemeinsam bearbeiteten Dokument. Echte Menschen lesen, denken nach und wechseln die Anwendung – sie erzeugen deutlich weniger Last. Die Zahlen sind deshalb eine vorsichtige Grenze: Eine Instanz, die 20 solche Personen trägt, kommt mit spürbar mehr echten gleichzeitig angemeldeten Personen zurecht.

Wie viele bei dir gleichzeitig aktiv sind, zeigt die Administration: **gerade aktiv** in der Übersicht und das Diagramm **Aktive Personen** je Stunde unter **Administration → Überwachung** (siehe [Betrieb](/operations#administration-ueberwachung)). Nimm die Spitzen, nicht den Durchschnitt.

## Was eine Instanz trägt

Gemessen wurde bis zur ersten Laststufe, ab der es langsamer wird: 95 % der lesenden Anfragen über 500 ms, der schreibenden über 1 s oder mehr als 1 % Fehler. „Trägt“ ist die Stufe davor.

| Aufbau | Trägt etwa | Hinweis |
| --- | ---: | --- |
| Einzelner Container mit SQLite | 20 aktive Personen | Ein Prozess, keine weiteren Dienste |
| PostgreSQL, 1 Instanz mit einem eigenen Kern | 30 aktive Personen | Darüber steigen die Lesezeiten steil an |
| PostgreSQL, 2 Instanzen mit je einem Kern (Cluster) | 40–50 aktive Personen | Bei 60 noch ohne Fehler, aber langsam |

Die **Faustregel** für die Planung: **25–30 aktive Personen je Instanz mit einem eigenen CPU-Kern.** Für mehr Personen weitere Instanzen im [Cluster-Modus](/cluster) – das wächst etwa linear, solange PostgreSQL Luft hat. Eine Instanz nutzt für die eigentliche Arbeit im Wesentlichen einen Kern (Node.js); mehr Kerne pro Instanz helfen vor allem bei Nebenarbeiten wie der Texterkennung, mehr Instanzen bei mehr Personen.

Gemessen auf 4 vCPU (Intel Xeon, 2,1 GHz) mit 16 GB RAM, PostgreSQL 16 und Redis 7 auf demselben Rechner. Auf einem Server, auf dem nichts anderes läuft, und mit schnelleren Kernen sind die Zahlen höher.

## Was zuerst knapp wird

- **Die CPU der Instanz** – und zwar beim Lesen: das Laden der Seitenleiste mit der Rechteprüfung Seite für Seite, das Öffnen großer Datenbanken (alle Einträge) und die Suche. Diese Anfragen werden zuerst langsam.
- **Schreiben und Live-Bearbeitung bleiben lange schnell.** Bei 60 aktiven Personen auf zwei Instanzen kamen Änderungen am Dokument (95 %) in 182 ms durch, und die Änderung einer Person erreichte die Mitbearbeitenden auf der anderen Instanz über Redis in 195 ms.
- **PostgreSQL** war im Test nicht der Engpass: Schreibende Anfragen blieben überall unter 500 ms.

Woran du es im Betrieb merkst: Unter **Administration → Überwachung** steigt die Antwortzeit (p95), ein Kern der Instanz läuft dauerhaft voll, und im Abschnitt **System** stehen bei den Verbindungen Anfragen auf „wartend“.

## Empfehlungen

Richtwerte für gleichzeitig aktive Personen in der Spitze. Plane Arbeitsspeicher für Importe, Exporte und die Texterkennung gescannter PDFs großzügig ein.

| | Klein | Mittel | Groß |
| --- | --- | --- | --- |
| Gleichzeitig aktiv | bis etwa 20 | etwa 20–60 | mehr als 60 |
| Aufbau | ein Container mit SQLite | [PostgreSQL](/postgresql), ein Container – ab etwa 30 aktiven Personen oder für Updates ohne Unterbrechung als [Cluster](/cluster) mit 2–3 Instanzen | Cluster mit einer Instanz je 25 aktiven Personen, plus eine Reserve |
| Flowplan | 2 vCPU, 2–4 GB RAM | je Instanz 1–2 vCPU, 2 GB RAM | je Instanz 1–2 vCPU, 2 GB RAM |
| Datenbank | SQLite auf lokaler SSD (kein NFS) | PostgreSQL mit 2 vCPU, 4 GB RAM, SSD | PostgreSQL mit 4+ vCPU, 8+ GB RAM, SSD, eigener Server oder verwalteter Dienst |
| Weitere Dienste | optional S3 | im Cluster: Redis (klein, ohne Speicherung), S3 | Redis, S3 |

**Datenbankverbindungen:** `FLOWPLAN_PG_POOL` je Instanz auf 10–20 setzen und `max_connections` von PostgreSQL auf mindestens `Instanzen × (FLOWPLAN_PG_POOL + 2)` plus Reserve. Beispiel: 4 Instanzen mit Pool 20 brauchen 88 Verbindungen; mit Reserve passen `max_connections=150`.

**Reserve einplanen:** Im Cluster mindestens eine Instanz mehr, als die Last braucht – bei einem Update oder dem Ausfall eines Knotens tragen die übrigen weiter.

## Selbst messen

Die Lasttests liegen im Quellcode unter [`scripts/loadtest`](https://github.com/yannicschuller/flowplan/blob/main/scripts/loadtest/README.md): für einen einzelnen Container und für den Cluster-Modus (`scripts/load-test-cluster.mjs`, 1, 2 … Instanzen gegen PostgreSQL und Redis). Am aussagekräftigsten ist eine Messung auf der Hardware, auf der Flowplan laufen soll.

> [!WARNING]
> Nie gegen eine Instanz messen, die Menschen nutzen: Der Test legt Hunderte Konten, Seiten und Tausende Einträge an und bremst die Instanz für alle aus. Eine frische, eigene Instanz nehmen und danach löschen.
