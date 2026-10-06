import { headers } from "next/headers";
import { llmsIndex } from "@/lib/docs";
import { isLocale } from "@/lib/i18n";
import { LOCALE_HEADER } from "@/lib/i18n-server";
import { docsUrl } from "@/lib/links";

// English at /llms.txt, German at /de/llms.txt.
export async function GET() {
  const fixed = (await headers()).get(LOCALE_HEADER);
  return new Response(llmsIndex(docsUrl(), isLocale(fixed) ? fixed : "en"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=600" },
  });
}
