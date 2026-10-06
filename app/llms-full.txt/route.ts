import { headers } from "next/headers";
import { llmsFull } from "@/lib/docs";
import { isLocale } from "@/lib/i18n";
import { LOCALE_HEADER } from "@/lib/i18n-server";
import { docsUrl } from "@/lib/links";

// English at /llms-full.txt, German at /de/llms-full.txt.
export async function GET() {
  const fixed = (await headers()).get(LOCALE_HEADER);
  return new Response(llmsFull(docsUrl(), isLocale(fixed) ? fixed : "en"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=600" },
  });
}
