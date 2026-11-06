# Eigenschaften, Formeln und Rollups

Relationen verbinden Datenbanken, Rollups rechnen über verknüpfte Einträge, Formeln berechnen Werte aus Eigenschaften desselben Eintrags.

> [!NOTE]
> Hier geht es um die Eigenschaften von Datenbank-Einträgen. Die [Eigenschaften von Seiten](/pages-and-spaces#tags-und-eigenschaften) (unter dem Seitentitel) gelten im ganzen Arbeitsbereich oder nur in einem Bereich, siehe [Geltungsbereich](/pages-and-spaces#geltungsbereich-arbeitsbereich-oder-bereich).

## Eigenschaften bearbeiten

Ein Klick auf den Spaltenkopf oder **Ansicht und Eigenschaften** öffnet den Eigenschaftsdialog: Name, Typ (einer von {{facts.fieldTypes}} Eigenschaftstypen), Optionen und Format. Typwechsel übernehmen vorhandene Werte, soweit sie passen. Formate für Zahlen umfassen Währungen, Prozent, Dezimalstellen und Tausendertrennzeichen und gelten auch für Formeln mit Zahlenergebnis; Datumsfelder zeigen kurz, lang oder ISO und optional Uhrzeiten; **Datum entfernen** unter dem Feld leert es wieder.

**URL, E-Mail und Telefon** erscheinen in Tabelle, Liste, Board, Galerie und im Eintrag als Link: Webadressen öffnen sich in einem neuen Tab (gekürzt auf Host und Pfad, die volle Adresse steht im Tooltip), E-Mail-Adressen im Mailprogramm, Telefonnummern in der Telefon-App. Zum Ändern klickst du auf den Stift neben dem Link (am Computer beim Überfahren oder mit der Tab-Taste, am Handy immer sichtbar) oder auf die freie Fläche der Zelle; <kbd>Enter</kbd> speichert, <kbd>Esc</kbd> verwirft. Nur `http://`- und `https://`-Adressen, E-Mail-Adressen und Telefonnummern werden zu Links – alles andere bleibt einfacher Text.

## Aliasse

Der Eigenschaftstyp **Aliasse (andere Namen)** hält weitere Namen eines Eintrags, etwa „PAC“ und „Pompe à chaleur“ für den Eintrag „Chauffage“. Eine Datenbank hat höchstens eine solche Eigenschaft. Im Eintrag trägst du die Namen durch Kommas getrennt ein; es zählen bis zu 10 Aliasse mit je bis zu 100 Zeichen, Leerzeichen am Rand und doppelte Namen (Groß- und Kleinschreibung egal) fallen weg.

Aliasse wirken wie der Titel:

- **@-Erwähnungen** und die [Schnellsuche](/search-and-notifications#schnellsuche) finden den Eintrag auch über einen Alias und zeigen dann den echten Titel mit dem Alias in Grau: „Chauffage · PAC“. Aliasse zählen in der Suche so viel wie der Titel.
- **Nicht verlinkte Erwähnungen** suchen auch nach jedem Alias – als ganzes Wort, ab zwei Zeichen, ohne Rücksicht auf Groß- und Kleinschreibung. **Verlinken** lässt den Text, wie er dasteht: Aus „PAC“ wird ein Link auf „Chauffage“ mit der Beschriftung „PAC“.
- Der **Markdown-Export** schreibt sie als `aliases:` ins Frontmatter, der Markdown-Import liest `aliases:` und `alias:` zurück ([Frontmatter](/import-export-versions#frontmatter-eintraege-als-markdown-dateien)).

Filter („enthält“, „ist“), Sortierung, Formeln (als Liste wie Mehrfachauswahl), CSV und die übrigen Exporte behandeln Aliasse wie eine Liste von Texten. Ein Alias darf bei mehreren Einträgen vorkommen; dann erscheinen beide. Aliasse findet nur, wer den Eintrag ohnehin lesen darf.

Seiten haben ihre Aliasse unter **… → Aliasse …** – siehe [Seiten und Bereiche](/pages-and-spaces#aliasse).

## Sichtbarkeit von Eigenschaften

Einzelne Eigenschaften wie „Gehalt“ oder „Interne Notiz“ lassen sich auf bestimmte Personen beschränken. Im Eigenschaftsdialog legt der Abschnitt **Sichtbarkeit** fest, wer die Eigenschaft **sieht** und wer sie **bearbeitet**:

| Auswahl | Sehen | Bearbeiten |
| --- | --- | --- |
| **Alle mit Zugriff** (Standard beim Sehen) | Alle, die die Datenbank lesen dürfen | – |
| **Bearbeiter und Besitzer** (Standard beim Bearbeiten) | Rollen Bearbeiten und Eigentümer | Rollen Bearbeiten und Eigentümer |
| **Nur Besitzer** | Eigentümer der Datenbank | Eigentümer der Datenbank |
| **Ausgewählte Gruppen** | Mitglieder dieser [Gruppen](/workspaces-and-permissions#gruppen) | Mitglieder dieser Gruppen mit Bearbeitungsrecht |

- Nur **Eigentümer der Datenbank** ändern die Sichtbarkeit; sie sehen und bearbeiten selbst immer alles.
- Eingeschränkte Eigenschaften tragen im Spaltenkopf ein **Schloss**. Wer eine Eigenschaft nicht sehen darf, bekommt die Spalte gar nicht; Zellen, die jemand nur sehen darf, sind schreibgeschützt und nennen beim Überfahren, wer sie bearbeiten darf („Nur für … bearbeitbar“).
- Die Regeln engen Seiten- und Eintragsrechte nur ein: Wer die Datenbank nur ansehen darf, bearbeitet auch eine Eigenschaft für „ausgewählte Gruppen“ nicht.
- Die **Titeleigenschaft** (die erste) sehen immer alle mit Zugriff.
- Der Server setzt die Regeln überall durch: in der Datenbank selbst, in verknüpften Ansichten, Dashboards, Whiteboard-Karten, Exporten (Markdown, CSV, JSON, Word, EPUB, Druck), Versionen, über die API und den [MCP-Server](/mcp), für die [KI](/ai) und in Kalender-Abos. Änderungen an Eigenschaften, die jemand nicht bearbeiten darf – im Eintrag, per Mehrfachbearbeitung, Import, API, KI oder CalDAV –, lehnt er mit einer Meldung ab.
- **Öffentlich** sind eingeschränkte Eigenschaften nie: Veröffentlichungen, Links mit eigenen Berechtigungen, Formulare, das Kundenportal und Webhooks lassen sie weg, auch wenn ein Link Bearbeiten erlaubt.
- Die **Volltextsuche** und die semantische Suche der KI nehmen eingeschränkte Eigenschaften nicht auf, für niemanden.
- **Formeln, Rollups, KI-Eigenschaften, Fortschritt und Zeit**, die eine verborgene Eigenschaft lesen, gelten für diese Person ebenfalls als verborgen – ihr Ergebnis würde den Wert sonst verraten. Eine Formel mit berechnetem `prop()`-Namen hängt von allen Eigenschaften ab. Ein Rollup ist verborgen, wenn die Person die Eigenschaft in der Zieldatenbank nicht sehen darf.
- Wer eine Eigenschaft nicht sieht, kann sie beim Ändern des Schemas weder verlieren noch löschen. Versionen einer Datenbank mit eingeschränkten Eigenschaften stellen nur Eigentümer wieder her, und Einträge mit verborgenen Eigenschaften lassen sich nicht in eine Seite umwandeln oder in eine andere Datenbank verschieben (Kopieren lässt die verborgenen Werte weg).

Filter und Sortierungen einer Ansicht, die eine verborgene Eigenschaft nutzen, wirken für diese Person wie auf leere Werte; die Bedingung selbst (etwa der Vergleichswert) bleibt in der Ansicht gespeichert.

## Relationen

1. **Eigenschaft hinzufügen → Relation** und die Zieldatenbank wählen.
2. Optional **in beide Richtungen**: Die Zieldatenbank erhält eine Gegen-Eigenschaft, Änderungen werden auf beiden Seiten gepflegt.
3. In der Zelle Einträge suchen und verknüpfen; mehrere Verknüpfungen lassen sich einzeln entfernen oder gemeinsam leeren.

Relationen erscheinen im Eintrag als Links. Die Datenbanksuche findet Einträge auch über die Namen verknüpfter Einträge, Relationsfilter bieten diese Namen direkt an.

## Rollups

1. Zuerst eine Relation anlegen.
2. **Eigenschaft hinzufügen → Rollup**, dann Relation und Eigenschaft der Zieldatenbank wählen.
3. Berechnung wählen – 22 stehen zur Verfügung, passend zum Typ: Originalwerte, eindeutige Werte, Anzahl, leer/gefüllt (auch als Anteil), Summe, Mittelwert, Median, Minimum, Maximum, Spannweite, abgehakt/nicht abgehakt, frühestes und spätestes Datum, Zeitraum.

Frühestes und spätestes Datum über **Erstellt am** oder **Bearbeitet am** ergeben einen Zeitpunkt in UTC, angezeigt in deiner Zeitzone. Zahlen-Rollups erscheinen als Zahl, Fortschrittsbalken, Fortschrittsring oder Bewertung, mit einstellbarem Zielwert. Werte aus Datenbanken, die jemand nicht lesen darf, werden für diese Person nicht geladen.

## KI-Eigenschaften

Ist die [KI](/ai) eingeschaltet, kann eine Eigenschaft ihren Wert aus einem Auftrag an die KI beziehen – etwa eine Zusammenfassung oder eine Kategorie aus anderen Eigenschaften. Alles dazu unter [KI in Datenbanken](/ai#ki-in-datenbanken).

## Formeln

Im Eigenschaftsdialog den Typ **Formel** wählen. Der Editor bietet 58 Funktionen mit Suche, Kategorien, Signaturen und Beispielen, Vorschläge beim Tippen und eine Live-Vorschau an einem wählbaren Eintrag.

```
round(prop("Aufwand") * prop("Stundensatz"), 2)
```

```
if(prop("Erledigt"), "✓", concat(format(dateBetween(prop("Fällig"), today(), "days")), " Tage"))
```

- Bezüge mit `prop("Name")` bleiben beim Umbenennen der Eigenschaft gültig.
- Syntaxfehler zeigen ihre Position und verhindern das Speichern.
- Zahlenergebnisse stehen in Filtern, Sortierungen, Diagrammen und Spaltenberechnungen zur Verfügung.
- Datumsfunktionen rechnen ohne ausdrückliche Zone in UTC; `now()` und `today()` aktualisieren sich minütlich.
- Ist ein Datum leer, liefern Datumsfunktionen ein leeres Ergebnis statt `#ERROR`. Bei Vergleichen zählt ein leerer Wert als 0 – `dateBetween(prop("Fällig"), today()) < 3` trifft also auch Einträge ohne Datum; dagegen hilft `!empty(prop("Fällig")) && dateBetween(prop("Fällig"), today()) < 3`.
- **Erstellt am** und **Bearbeitet am** lesen Formeln als Zeitpunkt in UTC (etwa `2026-11-05T17:39:02Z`), sodass alle Datumsfunktionen damit rechnen, z. B. `formatDate(prop("Erstellt am"), "DD.MM.", "Europe/Berlin")`.
- Formeln führen kein JavaScript aus; Länge, Verschachtelung und Ergebnisgröße sind begrenzt.

### Funktionsgruppen

| Gruppe | Beispiele |
| --- | --- |
| Logik | `if`, `ifs`, `coalesce`, `and`, `or`, `not`, `empty` |
| Zahlen | `sum`, `average`, `min`, `max`, `round`, `ceil`, `floor`, `abs`, `mod`, `pow`, `sqrt` |
| Text | `concat`, `length`, `contains`, `replace`, `replaceAll`, `trim`, `slice`, `lower`, `upper`, `format`, `toNumber` |
| Datum | `now`, `today`, `parseDate`, `formatDate`, `dateAdd`, `dateSubtract`, `dateBetween`, `year`, `month`, `day`, `hour`, `timestamp` |
| Listen | `list`, `count`, `at`, `first`, `last`, `join`, `split`, `unique`, `sort`, `reverse` |

Die vollständige Liste zeigt der Formeleditor.
