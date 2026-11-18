import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_HEADER, PAGE_LOCALE_HEADER } from "@/lib/i18n-server";
import { isMcpRequest } from "@/lib/mcp-request";

// /de/… and /en/… are the same pages in a fixed language (one address per
// language for search engines); /…/page.md is the Markdown source of a page
// for language models and tools.
//
// /mcp is two things: the page about Flowplan's own MCP server for people,
// and the docs' MCP server (app/api/mcp, lib/mcp.ts) for AI assistants.
// Browsers ask for HTML with GET; MCP clients POST, send a CORS preflight
// or ask for an event stream – those go to the server.

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/mcp") {
    if (!isMcpRequest(request.method, request.headers.get("accept"))) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = "/api/mcp";
    return NextResponse.rewrite(url);
  }
  // /fr/… and /zh/… are English addresses with single translated pages
  // (lib/i18n.ts, PAGE_LOCALES).
  const match = pathname.match(/^\/(de|en|fr|zh)(\/.*)?$/);
  const page = match?.[1] === "fr" || match?.[1] === "zh" ? match[1] : undefined;
  const locale = page ? "en" : match?.[1];
  const rest = match ? match[2] || "/" : pathname;
  const url = request.nextUrl.clone();
  const markdown = rest.match(/^\/([a-z0-9-]+)\.md$/);
  if (markdown) url.pathname = `/markdown/${markdown[1]}`;
  else if (locale) url.pathname = rest;
  else return NextResponse.next();
  const headers = new Headers(request.headers);
  headers.delete(LOCALE_HEADER);
  headers.delete(PAGE_LOCALE_HEADER);
  if (locale) headers.set(LOCALE_HEADER, locale);
  if (page) headers.set(PAGE_LOCALE_HEADER, page);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/mcp", "/de", "/en", "/fr", "/zh", "/de/:path*", "/en/:path*", "/fr/:path*", "/zh/:path*", "/:slug.md"],
};
