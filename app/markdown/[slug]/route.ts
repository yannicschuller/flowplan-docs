import { headers } from "next/headers";
import { docMarkdown, docSlugs, translationMarkdown } from "@/lib/docs";
import { isLocale, isPageLocale } from "@/lib/i18n";
import { LOCALE_HEADER, PAGE_LOCALE_HEADER } from "@/lib/i18n-server";
import { absolute } from "@/lib/seo";

// /de/first-steps.md, /en/first-steps.md (and /first-steps.md in English):
// the page as Markdown, for language models and tools.
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!docSlugs.includes(slug)) return new Response("Not found\n", { status: 404 });
  const store = await headers();
  const fixed = store.get(LOCALE_HEADER);
  const locale = isLocale(fixed) ? fixed : "en";
  // /fr/first-steps.md: the translation, where there is one (lib/i18n.ts).
  const page = store.get(PAGE_LOCALE_HEADER);
  const translated = isPageLocale(page) ? translationMarkdown(slug, page) : null;
  const canonical = translated ? `/${page}/${slug}` : `/${locale}/${slug}`;
  return new Response(translated ?? docMarkdown(slug, locale), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=600",
      // The HTML page is the one to index.
      "X-Robots-Tag": "noindex",
      Link: `<${absolute(canonical)}>; rel="canonical"`,
    },
  });
}
