# Sprachen und Übersetzungen

Flowplan gibt es in {{facts.languages|word}} Sprachen: **Deutsch, Englisch, Französisch und vereinfachtes Chinesisch** (简体中文). Weitere Sprachen lassen sich ohne Änderungen am Code der App hinzufügen – mit jedem Übersetzungswerkzeug, das JSON-Dateien versteht.

## Sprache wählen

Flowplan folgt der Sprache deines Browsers; Sprachen, die Flowplan nicht kennt, zeigen Englisch. Unter **Einstellungen → Darstellung & Sprache → Sprache** wählst du aus der Liste eine Sprache (mit Flagge) – sie gilt dann auf allen Geräten, auch für E-Mails und Push-Hinweise; **Automatisch (folgt dem Browser)** nimmt die Festlegung zurück. Auf der Anmeldeseite öffnet der kleine Knopf unten rechts (z. B. **🇩🇪 DE**) ein Menü mit allen Sprachen.

Datum, Uhrzeit und Zahlen folgen der Sprache (Französisch: `fr-FR`, z. B. „15 oct. 2026“ und „2 400,5“; Chinesisch: `zh-CN`, z. B. „2026年10月15日“). Beim Rechnen in Notizen gilt das Dezimalkomma auch für Französisch.

Was du selbst anlegst – Seiten, Datenbanken, Eigenschaften –, bleibt in der Sprache, in der es entstanden ist. Vorlagen und Beispielinhalte gibt es auf Deutsch und Englisch; französische und chinesische Konten bekommen die englischen.

## Wie die Übersetzung funktioniert

Deutsch und Englisch stehen direkt im Code nebeneinander. Jede weitere Sprache ist ein **Katalog** im Ordner `locales/` der App, der den englischen Text auf die Übersetzung abbildet:

```json
{
  "Sign in": "Se connecter",
  "{0} commented on “{1}”": "{0} a commenté « {1} »"
}
```

- `locales/en.json` enthält alle Texte der App (über 3.500) und ist die Vorlage für Übersetzungswerkzeuge. Die Datei wird erzeugt, nicht von Hand bearbeitet.
- `{0}`, `{1}` … stehen für Werte wie Namen oder Zahlen. Sie müssen in der Übersetzung vorkommen, ihre Reihenfolge darf sich ändern.
- Ein leerer oder fehlender Eintrag zeigt den englischen Text – eine Sprache kann also Schritt für Schritt wachsen, und neue Texte der App brechen nie etwas.

## Eine Sprache hinzufügen

1. Katalog anlegen, z. B. für Italienisch:

   ```sh
   npm run i18n -- --add it
   ```

   Das erzeugt `locales/it.json` mit allen Texten und leeren Übersetzungen.
2. Übersetzen – von Hand oder mit einem Werkzeug wie Weblate, Crowdin, POEditor oder Lokalise (Format „JSON key-value“ bzw. „i18next JSON“, Quelldatei `locales/en.json`). Maschinelle Übersetzung (z. B. DeepL) eignet sich als Entwurf; Platzhalter und HTML-Tags bitte unverändert lassen.
3. Sprache anmelden: in `lib/i18n.ts` unter `LANGUAGES` mit Namen und Datumsformat (`it: { name: "Italiano", tag: "it-IT" }`) und in `lib/i18n-catalogs.ts` den Katalog importieren.
4. Prüfen:

   ```sh
   npm run i18n -- --check            # Fortschritt und falsche Platzhalter
   npm run i18n -- --check --missing  # was noch fehlt, mit Fundstelle im Code
   ```

Die Sprache erscheint danach in der Auswahl auf der Anmeldeseite und im Profil, und Browser in dieser Sprache bekommen sie automatisch.

## Kataloge aktuell halten

Nach Änderungen an Texten im Code sammelt `npm run i18n` alle Texte neu: neue kommen leer in jeden Katalog, nicht mehr verwendete fallen heraus, vorhandene Übersetzungen bleiben. Die Tests melden fehlende Übersetzungen nur als Hinweis; falsche Platzhalter lassen sie fehlschlagen.

Texte für den Code gibt es als `t("Deutsch", "English")` in Komponenten, `tr()` außerhalb davon und `ct()` für Inhalte, die der Server anlegt. Tabellen mit Textpaaren bekommen eine Markierung, damit `npm run i18n` sie findet, z. B. `// i18n-table: 1` für `[Deutsch, Englisch]`-Paare.

## Texterkennung

Die Texterkennung für gescannte PDFs und Bilder ist davon unabhängig: Sie erkennt Deutsch und Englisch, mit `FLOWPLAN_OCR_LANGS=fra,eng` auch Französisch (siehe [Konfiguration](/configuration)).
