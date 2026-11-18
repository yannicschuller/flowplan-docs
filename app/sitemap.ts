import type { MetadataRoute } from "next";

// Addresses come from DOCS_URL at runtime.
export const dynamic = "force-dynamic";
import { docModified, docSlugs, lastModified, pageTranslations, translationSource } from "@/lib/docs";
import { PAGE_LOCALE_TAGS } from "@/lib/i18n";
import { absolute } from "@/lib/seo";

// Every page in German and English, each pointing to the other. The dates
// are those of the last commit per file (content/last-modified.json, written
// before the build); without them lastModified is left out.
// Pages translated further (/fr/first-steps, lib/i18n.ts) are listed too.
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...docSlugs.map((slug) => `/${slug}`), "/whats-new"].flatMap((path) => {
    const slug = path.slice(1);
    const more = slug && docSlugs.includes(slug) ? pageTranslations(slug) : [];
    const languages = {
      de: absolute(`/de${path}`),
      en: absolute(`/en${path}`),
      ...Object.fromEntries(more.map((lang) => [PAGE_LOCALE_TAGS[lang], absolute(`/${lang}${path}`)])),
      "x-default": absolute(path || "/"),
    };
    const entry = (url: string, modified?: string) => ({
      url: absolute(url),
      ...(modified ? { lastModified: new Date(modified) } : {}),
      changeFrequency: "weekly" as const,
      priority: path ? 0.7 : 1,
      alternates: { languages },
    });
    return [
      ...(["de", "en"] as const).map((locale) => entry(`/${locale}${path}`, path ? docModified(slug, locale) : undefined)),
      ...more.map((lang) => entry(`/${lang}${path}`, lastModified(translationSource(slug, lang)))),
    ];
  });
}
