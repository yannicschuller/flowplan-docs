import type { MetadataRoute } from "next";

// Addresses come from DOCS_URL at runtime.
export const dynamic = "force-dynamic";
import { statSync } from "node:fs";
import { join } from "node:path";
import { docSlugs } from "@/lib/docs";
import { absolute } from "@/lib/seo";

// Every page in German and English, each pointing to the other.
export default function sitemap(): MetadataRoute.Sitemap {
  const modified = (slug: string) => {
    try {
      return statSync(join(process.cwd(), "content", "docs", `${slug}.md`)).mtime;
    } catch {
      return undefined;
    }
  };
  return ["", ...docSlugs.map((slug) => `/${slug}`)].flatMap((path) =>
    (["de", "en"] as const).map((locale) => ({
      url: absolute(`/${locale}${path}`),
      lastModified: path ? modified(path.slice(1)) : undefined,
      changeFrequency: "weekly" as const,
      priority: path ? 0.7 : 1,
      alternates: { languages: { de: absolute(`/de${path}`), en: absolute(`/en${path}`), "x-default": absolute(path || "/") } },
    })),
  );
}
