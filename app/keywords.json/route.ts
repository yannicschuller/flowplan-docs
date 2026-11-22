import { headers } from "next/headers";
import { keywordsIndex } from "@/lib/docs";
import { isLocale } from "@/lib/i18n";
import { LOCALE_HEADER } from "@/lib/i18n-server";

// Every page's search keywords: English at /keywords.json, German at
// /de/keywords.json (proxy.ts), as {slug: [keywords]}.
export async function GET() {
  const fixed = (await headers()).get(LOCALE_HEADER);
  return Response.json(keywordsIndex(isLocale(fixed) ? fixed : "en"), {
    headers: { "Cache-Control": "public, max-age=600" },
  });
}
