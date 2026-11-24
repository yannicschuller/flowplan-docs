---
keywords: Sprache, Übersetzung, Deutsch, Englisch, Französisch, Chinesisch, Russisch, übersetzen helfen, translate.flowplan.org, Community
new: beim-uebersetzen-helfen 2026-11-17
---

# Sprachen und Übersetzungen

Flowplan gibt es in {{facts.languages|word}} Sprachen: **Deutsch, Englisch, Französisch, vereinfachtes Chinesisch** (简体中文) **und Russisch** (Русский). Englisch gibt es zusätzlich als **English (US)**: dieselben Texte, aber Datumsangaben mit dem Monat zuerst und Wochen ab Sonntag. Weitere Sprachen lassen sich ohne Änderungen am Code der App hinzufügen – mit jedem Übersetzungswerkzeug, das JSON-Dateien versteht.

> [!TIP]
> Hilf mit, Flowplan in deine Sprache zu bringen: Auf [translate.flowplan.org](https://translate.flowplan.org) übersetzt du direkt im Browser, angemeldet mit GitHub – [so geht’s](#beim-uebersetzen-helfen).

## Sprache wählen

Flowplan folgt der Sprache deines Browsers; Sprachen, die Flowplan nicht kennt, zeigen Englisch. Unter **Einstellungen → Darstellung & Sprache → Sprache** wählst du aus der Liste eine Sprache (mit Flagge) – sie gilt dann auf allen Geräten, auch für E-Mails und Push-Hinweise; **Automatisch (folgt dem Browser)** nimmt die Festlegung zurück und wählt für Browser auf amerikanischem Englisch (`en-US`) English (US), für andere englische Browser Englisch. Auf der Anmeldeseite öffnet der kleine Knopf in der Fußzeile (z. B. **🇩🇪 DE**) ein Menü mit allen Sprachen.

Datum, Uhrzeit und Zahlen folgen der Sprache (Französisch: `fr-FR`, z. B. „15 oct. 2026“ und „2 400,5“; Chinesisch: `zh-CN`, z. B. „2026年10月15日“; Russisch: `ru-RU`, z. B. „15 окт. 2026 г.“ und „2 400,5“). Beim Rechnen in Notizen gilt das Dezimalkomma auch für Französisch und Russisch. Kalender beginnen die Woche in English (US) am Sonntag, in allen anderen Sprachen am Montag – sofern die Ansicht keinen eigenen Wochenbeginn hat.

Was du selbst anlegst – Seiten, Datenbanken, Eigenschaften –, bleibt in der Sprache, in der es entstanden ist. Vorlagen und Beispielinhalte gibt es auf Deutsch und Englisch; französische, chinesische und russische Konten bekommen die englischen.

## Beim Übersetzen helfen

Auf **[translate.flowplan.org](https://translate.flowplan.org)** übersetzt die Community Flowplan direkt im Browser – ohne Git, ohne eigene Werkzeuge und ohne die Kataloge selbst anzufassen. Übersetzt werden die Texte der Web-App, der App für iPhone, iPad und Android (mit Widgets, Siri-Befehlen und den Texten in den App-Stores) und der Desktop-App. Heute sind das **Französisch** und **vereinfachtes Chinesisch** sowie **Russisch** für die Web-App (dort steht es auch im Sprachmenü); Deutsch und Englisch sind die Originale und werden dort nur angezeigt. Das Werkzeug ist kostenlos, ohne Tracking und Open Source ([flowplan-translate auf GitHub](https://github.com/yannicschuller/flowplan-translate)).

::: steps

1. Auf [translate.flowplan.org](https://translate.flowplan.org) mit **GitHub** anmelden. Zum Stöbern und Lesen brauchst du kein Konto.
2. Einen **Teil** (z. B. die Web-App oder die Texte im App Store) und eine **Sprache** wählen.
3. Texte übersetzen oder vorhandene Übersetzungen verbessern. Neben dem englischen Original siehst du den deutschen Text und die Begriffe aus dem Glossar; Platzhalter wie `{0}` und Längengrenzen prüft das Werkzeug schon beim Tippen.
4. Deine Vorschläge prüft ein Reviewer (der Maintainer). Angenommene Übersetzungen gehen als **Pull Request** in die Repositorys von Flowplan und kommen mit der nächsten Version in die Apps.

:::

Wer übersetzt, steht im Pull Request und im Commit als **Co-Autor** – deine Beiträge erscheinen also auch in deinem GitHub-Profil.

Du vermisst eine Sprache? Wünsch sie dir mit einem [Issue auf GitHub](https://github.com/yannicschuller/flowplan/issues/new/choose) – weitere Sprachen kommen auf Anfrage dazu.

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

> [!TIP]
> Diese Schritte sind für Entwicklerinnen und Entwickler, die eine Sprache im Code der App anlegen. Um eine vorhandene Sprache zu verbessern, ist [translate.flowplan.org](#beim-uebersetzen-helfen) der einfachere Weg – und eine neue Sprache wünschst du dir mit einem Issue.

::: steps

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

:::

Die Sprache erscheint danach in der Auswahl auf der Anmeldeseite und im Profil, und Browser in dieser Sprache bekommen sie automatisch.

## Kataloge aktuell halten

Nach Änderungen an Texten im Code sammelt `npm run i18n` alle Texte neu: neue kommen leer in jeden Katalog, nicht mehr verwendete fallen heraus, vorhandene Übersetzungen bleiben. Die Tests melden fehlende Übersetzungen nur als Hinweis; falsche Platzhalter lassen sie fehlschlagen.

Texte für den Code gibt es als `t("Deutsch", "English")` in Komponenten, `tr()` außerhalb davon und `ct()` für Inhalte, die der Server anlegt. Tabellen mit Textpaaren bekommen eine Markierung, damit `npm run i18n` sie findet, z. B. `// i18n-table: 1` für `[Deutsch, Englisch]`-Paare.

## Texterkennung

Die Texterkennung für gescannte PDFs und Bilder ist davon unabhängig: Sie erkennt Deutsch und Englisch, mit `FLOWPLAN_OCR_LANGS=fra,eng` auch Französisch und mit `FLOWPLAN_OCR_LANGS=chi_sim,eng` chinesische Kurzzeichen (siehe [Konfiguration](/configuration)).
