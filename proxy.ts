import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_HEADER, PAGE_LOCALE_HEADER } from "@/lib/i18n-server";
import { isMcpRequest } from "@/lib/mcp-request";
import { contentSecurityPolicy, createNonce, isLocalHttp } from "@/lib/csp";

// /de/… and /en/… are the same pages in a fixed language (one address per
// language for search engines); /…/page.md is the Markdown source of a page
// for language models and tools.
//
// /mcp is two things: the page about Flowplan's own MCP server for people,
// and the docs' MCP server (app/api/mcp, lib/mcp.ts) for AI assistants.
// Browsers ask for HTML with GET; MCP clients POST, send a CORS preflight
// or ask for an event stream – those go to the server.
//
// Every response gets the Content Security Policy with a fresh nonce
// (lib/csp.ts). Next.js reads the nonce from the request's
// Content-Security-Policy header and puts it on its scripts; the pages are
// rendered per request anyway, so this costs nothing. The other security
// headers are the same everywhere and come from next.config.ts.

export function proxy(request: NextRequest) {
  const policy = contentSecurityPolicy({
    nonce: createNonce(),
    dev: process.env.NODE_ENV === "development",
    local: isLocalHttp(request.headers.get("host"), request.headers.get("x-forwarded-proto")),
  });
  const response = route(request, policy);
  response.headers.set("Content-Security-Policy", policy);
  return response;
}

function route(request: NextRequest, policy: string) {
  const { pathname } = request.nextUrl;
  const headers = new Headers(request.headers);
  headers.set("Content-Security-Policy", policy);
  if (pathname === "/mcp") {
    if (!isMcpRequest(request.method, request.headers.get("accept"))) return NextResponse.next({ request: { headers } });
    const url = request.nextUrl.clone();
    url.pathname = "/api/mcp";
    return NextResponse.rewrite(url, { request: { headers } });
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
  else return NextResponse.next({ request: { headers } });
  headers.delete(LOCALE_HEADER);
  headers.delete(PAGE_LOCALE_HEADER);
  if (locale) headers.set(LOCALE_HEADER, locale);
  if (page) headers.set(PAGE_LOCALE_HEADER, page);
  return NextResponse.rewrite(url, { request: { headers } });
}

// Everything but Next.js's own files (hashed bundles and styles, the image
// optimiser), which are no documents.
export const config = {
  matcher: ["/((?!_next/static/|_next/image).*)"],
};
