# Eigenschaften, Formeln und Rollups

Relationen verbinden Datenbanken, Rollups rechnen über verknüpfte Einträge, Formeln berechnen Werte aus Eigenschaften desselben Eintrags.

## Eigenschaften bearbeiten

Ein Klick auf den Spaltenkopf oder **Ansicht und Eigenschaften** öffnet den Eigenschaftsdialog: Name, Typ, Optionen und Format. Typwechsel übernehmen vorhandene Werte, soweit sie passen. Formate für Zahlen umfassen Währungen, Prozent, Dezimalstellen und Tausendertrennzeichen und gelten auch für Formeln mit Zahlenergebnis; Datumsfelder zeigen kurz, lang oder ISO und optional Uhrzeiten; **Datum entfernen** unter dem Feld leert es wieder.

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

Zahlen-Rollups erscheinen als Zahl, Fortschrittsbalken, Fortschrittsring oder Bewertung, mit einstellbarem Zielwert. Werte aus Datenbanken, die jemand nicht lesen darf, werden für diese Person nicht geladen.

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
