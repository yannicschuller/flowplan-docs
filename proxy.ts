import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_HEADER } from "@/lib/i18n-server";

// /de/… and /en/… are the same pages in a fixed language (one address per
// language for search engines); /…/page.md is the Markdown source of a page
// for language models and tools.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(/^\/(de|en)(\/.*)?$/);
  const locale = match?.[1];
  const rest = match ? match[2] || "/" : pathname;
  const url = request.nextUrl.clone();
  const markdown = rest.match(/^\/([a-z0-9-]+)\.md$/);
  if (markdown) url.pathname = `/markdown/${markdown[1]}`;
  else if (locale) url.pathname = rest;
  else return NextResponse.next();
  const headers = new Headers(request.headers);
  headers.delete(LOCALE_HEADER);
  if (locale) headers.set(LOCALE_HEADER, locale);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/de", "/en", "/de/:path*", "/en/:path*", "/:slug.md"],
};
