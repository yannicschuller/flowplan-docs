# Languages and translations

Flowplan is available in **German, English and French**. Further languages can be added without changing the app's code – with any translation tool that understands JSON files.

## Choosing a language

Flowplan follows your browser's language; languages Flowplan does not know show English. Under **Settings → General → Your profile → Language** you fix a language – it then applies on all devices, also to e-mails and push notifications. On the sign-in page you switch between **DE · EN · FR** at the bottom.

Dates, times and numbers follow the language (French: `fr-FR`, e.g. “15 oct. 2026” and “2 400,5”). Calculations in notes use the decimal comma in French as well.

What you create yourself – pages, databases, properties – stays in the language it was made in. Templates and example content exist in German and English; French accounts get the English ones.

## How translation works

German and English sit side by side in the code. Every further language is a **catalogue** in the app's `locales/` folder that maps the English text to its translation:

```json
{
  "Sign in": "Se connecter",
  "{0} commented on “{1}”": "{0} a commenté « {1} »"
}
```

- `locales/en.json` lists every text of the app (more than 3,500) and is the source for translation tools. It is generated, not edited by hand.
- `{0}`, `{1}` … stand for values such as names or numbers. They have to appear in the translation; their order may change.
- An empty or missing entry shows the English text – so a language can grow step by step, and new texts in the app never break anything.

## Adding a language

1. Create the catalogue, e.g. for Italian:

   ```sh
   npm run i18n -- --add it
   ```

   This creates `locales/it.json` with every text and empty translations.
2. Translate – by hand or with a tool such as Weblate, Crowdin, POEditor or Lokalise (format “JSON key-value” or “i18next JSON”, source file `locales/en.json`). Machine translation (e.g. DeepL) works as a draft; please keep placeholders and HTML tags unchanged.
3. Register the language: in `lib/i18n.ts` under `LANGUAGES` with its name and date format (`it: { name: "Italiano", tag: "it-IT" }`), and import the catalogue in `lib/i18n-catalogs.ts`.
4. Check:

   ```sh
   npm run i18n -- --check            # progress and wrong placeholders
   npm run i18n -- --check --missing  # what is still missing, with the place in the code
   ```

The language then appears in the choice on the sign-in page and in the profile, and browsers in that language get it automatically.

## Keeping catalogues up to date

After texts change in the code, `npm run i18n` collects all texts again: new ones are added empty to every catalogue, unused ones drop out, existing translations stay. The tests only report missing translations; wrong placeholders make them fail.

In the code, texts are `t("Deutsch", "English")` in components, `tr()` outside of them and `ct()` for content the server creates. Tables of text pairs get a marker so `npm run i18n` finds them, e.g. `// i18n-table: 1` for `[German, English]` pairs.

## Text recognition

Text recognition for scanned PDFs and images is separate: it reads German and English, and French with `FLOWPLAN_OCR_LANGS=fra,eng` (see [Configuration](/configuration)).
