import type { MetadataRoute } from "next";

// Addresses come from DOCS_URL at runtime.
export const dynamic = "force-dynamic";
import { docModified, docSlugs } from "@/lib/docs";
import { absolute } from "@/lib/seo";

// Every page in German and English, each pointing to the other. The dates
// are those of the last commit per file (content/last-modified.json, written
// before the build); without them lastModified is left out.
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...docSlugs.map((slug) => `/${slug}`)].flatMap((path) =>
    (["de", "en"] as const).map((locale) => {
      const modified = path ? docModified(path.slice(1), locale) : undefined;
      return {
        url: absolute(`/${locale}${path}`),
        ...(modified ? { lastModified: new Date(modified) } : {}),
        changeFrequency: "weekly" as const,
        priority: path ? 0.7 : 1,
        alternates: { languages: { de: absolute(`/de${path}`), en: absolute(`/en${path}`), "x-default": absolute(path || "/") } },
      };
    }),
  );
}
