// German and English. The language comes from the "flowplan-lang" cookie
// (the reader's choice) or the browser: German for German browsers,
// English for everyone else. Texts sit next to each other in the code:
// t("Anmelden", "Sign in").
export type Locale = "de" | "en";
export const LOCALES: Locale[] = ["de", "en"];
export const LOCALE_COOKIE = "flowplan-lang";

export function isLocale(value: unknown): value is Locale {
  return value === "de" || value === "en";
}

// The first supported language of an Accept-Language header, by weight.
export function pickLocale(cookie?: string | null, acceptLanguage?: string | null): Locale {
  if (isLocale(cookie)) return cookie;
  const wanted = (acceptLanguage || "")
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = Number(params.find((p) => p.trim().startsWith("q="))?.split("=")[1] ?? 1);
      return { lang: tag.trim().toLowerCase().slice(0, 2), q: Number.isFinite(q) ? q : 0, index };
    })
    .filter((x) => x.lang && x.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  for (const { lang } of wanted) {
    if (lang === "de") return "de";
    if (lang === "en") return "en";
  }
  return "en";
}

export const translate = (locale: Locale) => (de: string, en: string) => (locale === "de" ? de : en);

// Partial languages (#367): single pages translated into a further language
// of the app (content/docs/fr, content/docs/zh), at /fr/… and /zh/…. The
// site around them – navigation, search, labels – stays English; a page
// without a translation shows the English one with a note in the reader's
// language. `tag` is the language of the text (lang, hreflang).
export type PageLocale = "fr" | "zh";
export const PAGE_LOCALES: PageLocale[] = ["fr", "zh"];
export const PAGE_LOCALE_TAGS: Record<PageLocale, string> = { fr: "fr", zh: "zh-Hans" };
export function isPageLocale(value: unknown): value is PageLocale {
  return value === "fr" || value === "zh";
}
// The notes above such a page, in its language.
export const PAGE_LOCALE_NOTES: Record<PageLocale, { only: string; missing: string; english: string }> = {
  fr: {
    only: "Cette page est traduite en français ; le reste de la documentation est en anglais pour l’instant.",
    missing: "Cette page n’est pas encore traduite en français – vous lisez la version anglaise.",
    english: "Version anglaise",
  },
  zh: {
    only: "本页已翻译成简体中文；文档的其余部分目前为英文。",
    missing: "本页尚未翻译成简体中文——你正在阅读英文版本。",
    english: "英文版本",
  },
};
