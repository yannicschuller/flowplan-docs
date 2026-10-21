# Umzug von Notion, AppFlowy und Obsidian

Flowplan ist eine Open-Source-Alternative zu Notion und AppFlowy unter der AGPL-3.0. So holst du Seiten, Datenbanken, Bilder und Dateien aus dem bisherigen Werkzeug herüber.

## Von Notion

1. In Notion: **Einstellungen → Exportieren** (für den ganzen Arbeitsbereich) oder im Menü **…** einer Seite **Exportieren**. Als Format **Markdown & CSV** wählen und **Unterseiten einschließen** aktivieren.
2. In Flowplan: **Einstellungen → Daten**, das ZIP auswählen und den Bereich, in den es kommt.
3. Fertig – der Import läuft in einem Schritt. Schlägt er fehl, bleibt nichts halb importiert zurück.

Was daraus wird:

- Jede Markdown-Datei wird zu einer Seite, jeder Ordner mit dem Namen einer Seite zu ihren Unterseiten. Die Kennungen, die Notion an Datei- und Ordnernamen hängt, fallen weg.
- Jede CSV-Datei wird zu einer Datenbank. Liegen beide Fassungen vor, nimmt Flowplan `Name_all.csv` (alle Einträge) statt der aktuellen Ansicht.
- Spalten bekommen eine passende Art: Zahlen, Kontrollkästchen, Daten (auch im Notion-Format „September 24, 2026“) und Auswahlen mit ihren Optionen; der Rest bleibt Text.
- Die Seiten der Einträge werden ihren Einträgen als Dokument zugeordnet.
- Bilder und Dateien, auf die Seiten verweisen, werden hochgeladen.
- Große Exporte, die Notion in mehrere ZIP-Dateien innerhalb des ZIPs aufteilt, werden erkannt.

Grenzen pro Import: 100 MB, 500 Seiten und 5.000 Einträge je Tabelle. Größere Arbeitsbereiche exportierst du in Teilen, etwa Seite für Seite.

## Von AppFlowy

1. In AppFlowy Seiten als **Markdown** und Datenbanken als **CSV** exportieren.
2. Die Dateien in einen Ordner legen – Unterordner werden zu Unterseiten – und als ZIP packen.
3. In Flowplan unter **Einstellungen → Daten** importieren.

Markdown wird zu Seiten, CSV zu Datenbanken; verlinkte Bilder und Dateien werden mitgenommen.

## Von Obsidian und anderen Markdown-Ordnern

- **Ein Notizordner als Seiten:** den Ordner als ZIP packen und unter **Einstellungen → Daten** importieren.
- **Notizen mit Frontmatter als Datenbank:** in einer Datenbank **CSV oder Markdown importieren** wählen und die `.md`-Dateien oder ein ZIP nehmen. Die YAML-Eigenschaften werden zu Spalten – siehe [Frontmatter](/import-export-versions#frontmatter-eintraege-als-markdown-dateien).
- **Aliasse:** `aliases: [PAC, Pompe à chaleur]` (oder `alias:`) im Frontmatter wird zu den [Aliassen](/pages-and-spaces#aliasse) der Seite bzw. zur Eigenschaft [Aliasse](/properties-and-formulas#aliasse) des Eintrags. @-Erwähnungen, Suche und nicht verlinkte Erwähnungen finden „Chauffage“ dann auch über „PAC“, und der Markdown-Export schreibt sie wieder als `aliases:` zurück.
- Hinweise wie `> [!WARNING]` werden zu Hinweisblöcken der passenden Art.

## Nach dem Umzug

- **Links prüfen:** Verweise zwischen importierten Seiten zeigen auf die neuen Seiten; Links auf Seiten außerhalb des Exports bleiben Links auf das alte Werkzeug.
- **Ansichten einrichten:** Ein Import legt je Datenbank eine Tabelle an. Board, Kalender, Galerie oder Zeitleiste fügst du danach hinzu – siehe [Ansichten](/views).
- **Teilen:** Rechte werden nicht übernommen. Lade Mitglieder ein oder teile einzelne Seiten – siehe [Teilen und Veröffentlichen](/sharing).
- **Daten bleiben mitnehmbar:** Flowplan exportiert jederzeit wieder als Markdown mit Frontmatter, CSV und ZIP, auf Wunsch geplant und per Git – siehe [Import, Export und Versionen](/import-export-versions).

## Warum umziehen?

- **Komplett Open Source:** Der gesamte Quellcode steht unter der AGPL-3.0 auf [GitHub](https://github.com/yannicschuller/flowplan) – ohne geschlossene Enterprise-Version und ohne Funktionen hinter einer Lizenz.
- **Deine Daten, dein Server:** gehostet auf flowplan.org in Deutschland oder als ein Docker-Container auf deinem eigenen Server – siehe [Installation](/installation).
- **Kein Tracking.**
