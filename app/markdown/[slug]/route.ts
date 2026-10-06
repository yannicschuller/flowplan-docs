import { headers } from "next/headers";
import { readFileSync } from "node:fs";
import { docSlugs, docSource } from "@/lib/docs";
import { isLocale } from "@/lib/i18n";
import { LOCALE_HEADER } from "@/lib/i18n-server";
import { absolute } from "@/lib/seo";

// /de/first-steps.md, /en/first-steps.md (and /first-steps.md in English):
// the page as Markdown, for language models and tools.
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!docSlugs.includes(slug)) return new Response("Not found\n", { status: 404 });
  const fixed = (await headers()).get(LOCALE_HEADER);
  const locale = isLocale(fixed) ? fixed : "en";
  return new Response(readFileSync(docSource(slug, locale), "utf8"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=600",
      // The HTML page is the one to index.
      "X-Robots-Tag": "noindex",
      Link: `<${absolute(`/${locale}/${slug}`)}>; rel="canonical"`,
    },
  });
}
