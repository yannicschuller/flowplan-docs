import { docSearchIndex } from "@/lib/docs";
import { isLocale, type Locale } from "@/lib/i18n";

// The search index of all pages in one language, fetched by the search box
// when it is first focused – so no page carries the whole documentation in
// its HTML. Built once per process and language. The address includes a
// fingerprint of the content (?v=…), so the response may be cached for a
// year.
//
// The body is plain JSON, not gzipped here: Next drops a route handler's
// Content-Encoding header (FORBIDDEN_HEADERS in next/dist/server/
// send-response.js, seen with Next 16.4.5) but sends the bytes, so browsers
// got gzip they could not read as JSON and the search box said search was
// not available. Next does not compress route handler responses either;
// the reverse proxy may.
const built = new Map<Locale, Uint8Array>();
function searchIndexBody(lang: Locale) {
  let bytes = built.get(lang);
  if (!bytes) {
    bytes = Buffer.from(JSON.stringify(docSearchIndex(lang)));
    built.set(lang, bytes);
  }
  return bytes;
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response("Not found\n", { status: 404 });
  return new Response(searchIndexBody(lang) as BodyInit, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Robots-Tag": "noindex",
    },
  });
}
