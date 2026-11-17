---
keywords: language, translation, German, English, French, Chinese, help translate, translate.flowplan.org, community
new: help-translate 2026-11-17
---

# Languages and translations

Flowplan is available in {{facts.languages|word}} languages: **German, English, French and Simplified Chinese** (简体中文). English also comes as **English (US)**: the same texts, but dates with the month first and weeks starting on Sunday. Further languages can be added without changing the app's code – with any translation tool that understands JSON files.

> [!TIP]
> Help bring Flowplan to your language: at [translate.flowplan.org](https://translate.flowplan.org) you translate right in the browser, signed in with GitHub – [here’s how](#help-translate).

## Choosing a language

Flowplan follows your browser's language; languages Flowplan does not know show English. Under **Settings → Appearance & language → Language** you pick a language (with its flag) from the list – it then applies on all devices, also to e-mails and push notifications; **Automatic (follows the browser)** undoes the choice and picks English (US) for browsers set to US English (`en-US`), English for other English browsers. On the sign-in page the small button in the footer (e.g. **🇬🇧 EN**) opens a menu with all languages.

Dates, times and numbers follow the language (French: `fr-FR`, e.g. “15 oct. 2026” and “2 400,5”; Chinese: `zh-CN`, e.g. “2026年10月15日”). Calculations in notes use the decimal comma in French as well. Calendars start the week on Sunday in English (US) and on Monday in every other language – unless the view sets its own week start.

What you create yourself – pages, databases, properties – stays in the language it was made in. Templates and example content exist in German and English; French and Chinese accounts get the English ones.

## Help translate

At **[translate.flowplan.org](https://translate.flowplan.org)** the community translates Flowplan right in the browser – no Git, no tools of your own, no need to touch the catalogues. It covers the texts of the web app, the app for iPhone, iPad and Android (with widgets, Siri commands and the app store texts) and the desktop app. Today that means **French** and **Simplified Chinese**; German and English are the originals and are only shown there. The tool is free, without tracking and open source ([flowplan-translate on GitHub](https://github.com/yannicschuller/flowplan-translate)).

::: steps

1. Sign in at [translate.flowplan.org](https://translate.flowplan.org) with **GitHub**. Browsing and reading need no account.
2. Pick a **part** (e.g. the web app or the App Store texts) and a **language**.
3. Translate texts or improve existing translations. Next to the English original you see the German text and the terms from the glossary; the tool checks placeholders such as `{0}` and length limits as you type.
4. A reviewer (the maintainer) reviews your suggestions. Accepted translations go to Flowplan's repositories as a **pull request** and reach the apps with the next version.

:::

Translators are credited as **co-authors** in the pull request and the commit – so your contributions show up on your GitHub profile, too.

Missing a language? Ask for it in a [GitHub issue](https://github.com/yannicschuller/flowplan/issues/new/choose) – further languages are added on request.

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

> [!TIP]
> These steps are for developers who add a language in the app's code. To improve an existing language, [translate.flowplan.org](#help-translate) is the easier way – and you ask for a new language with an issue.

::: steps

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

:::

The language then appears in the choice on the sign-in page and in the profile, and browsers in that language get it automatically.

## Keeping catalogues up to date

After texts change in the code, `npm run i18n` collects all texts again: new ones are added empty to every catalogue, unused ones drop out, existing translations stay. The tests only report missing translations; wrong placeholders make them fail.

In the code, texts are `t("Deutsch", "English")` in components, `tr()` outside of them and `ct()` for content the server creates. Tables of text pairs get a marker so `npm run i18n` finds them, e.g. `// i18n-table: 1` for `[German, English]` pairs.

## Text recognition

Text recognition for scanned PDFs and images is separate: it reads German and English, French with `FLOWPLAN_OCR_LANGS=fra,eng` and Chinese (Simplified) with `FLOWPLAN_OCR_LANGS=chi_sim,eng` (see [Configuration](/configuration)).
