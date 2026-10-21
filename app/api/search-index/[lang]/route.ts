import { gzipSync } from "node:zlib";
import { docSearchIndex } from "@/lib/docs";
import { isLocale, type Locale } from "@/lib/i18n";

// The search index of all pages in one language, fetched by the search box
// when it is first focused – so no page carries the whole documentation in
// its HTML. Built once per process and language, gzipped for browsers that
// accept it (Next does not compress route handler responses itself). The
// address includes a fingerprint of the content (?v=…), so the response may
// be cached for a year.
const built = new Map<string, Uint8Array>();
function body(lang: Locale, gzip: boolean) {
  const key = `${lang}:${gzip}`;
  let bytes = built.get(key);
  if (!bytes) {
    const json = Buffer.from(JSON.stringify(docSearchIndex(lang)));
    bytes = gzip ? gzipSync(json) : json;
    built.set(key, bytes);
  }
  return bytes;
}

export async function GET(request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response("Not found\n", { status: 404 });
  const gzip = /\bgzip\b/.test(request.headers.get("accept-encoding") || "");
  return new Response(body(lang, gzip) as BodyInit, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(gzip ? { "Content-Encoding": "gzip" } : {}),
      Vary: "Accept-Encoding",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Robots-Tag": "noindex",
    },
  });
}
