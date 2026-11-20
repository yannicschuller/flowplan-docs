// The Content Security Policy and the other security headers (proxy.ts,
// next.config.ts). Free of Next.js, so tests/csp.test.ts can check it.
//
// Scripts: the pages are rendered per request anyway (the language follows
// the cookie and Accept-Language, the footer shows the live status, ASK_URL
// and FLOWPLAN_RELEASE are read at runtime), so proxy.ts gives every
// response a fresh nonce: Next.js puts it on its own inline scripts (the
// RSC payload) and its bundles. Scripts from this site ('self': the
// bundles, /analytics.js, /tabs.js) and Umami's script load by address;
// any other inline script, event handler attribute or javascript: link is
// blocked. The JSON-LD blocks are data, not scripts, and need nothing.
//
// Styles only from files: no <style> elements and no style attributes in
// the HTML (lib/docs.ts writes table alignment as data-align). Styles set
// from script (element.style) are not affected.
//
// connect-src follows the addresses read at runtime: the „Frag Flo“
// service (ASK_URL, lib/flo.ts) and Umami (UMAMI_URL, lib/analytics.ts:
// its script sends to /api/send next to itself).
import { analytics } from "./analytics";
import { askUrl } from "./flo";

type Env = Record<string, string | undefined>;

export type CspOptions = {
  nonce: string;
  // `next dev`: React needs eval for its error stacks, and styles arrive
  // inline.
  dev?: boolean;
  // Plain http on localhost (tests, `next start` on a laptop): no
  // upgrade-insecure-requests, which would ask the local services
  // (a mock of ASK_URL) over https.
  local?: boolean;
  env?: Env;
};

const origin = (url: string | null | undefined) => {
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
};

export function contentSecurityPolicy({ nonce, dev = false, local = false, env = process.env }: CspOptions): string {
  if (!/^[A-Za-z0-9+/_-]{16,}={0,2}$/.test(nonce)) throw new Error("csp: the nonce must be at least 16 base64 characters");
  const ask = origin(askUrl(env));
  const stats = origin(analytics(env)?.origin);
  const list = (...sources: (string | null | false)[]) => sources.filter(Boolean).join(" ");
  const directives: [string, string][] = [
    ["default-src", "'self'"],
    ["script-src", list("'self'", `'nonce-${nonce}'`, stats, dev && "'unsafe-eval'")],
    ["style-src", list("'self'", dev && "'unsafe-inline'")],
    ["img-src", "'self' data:"],
    ["font-src", "'self'"],
    ["connect-src", list("'self'", ask, stats)],
    ["worker-src", "'self'"],
    ["manifest-src", "'self'"],
    ["frame-src", "'none'"],
    ["object-src", "'none'"],
    ["base-uri", "'none'"],
    ["form-action", "'self'"],
    ["frame-ancestors", "'none'"],
  ];
  const policy = directives.map(([name, value]) => `${name} ${value}`);
  if (!local) policy.push("upgrade-insecure-requests");
  return policy.join("; ");
}

// A fresh nonce for one response: 128 random bits, base64.
export function createNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return btoa(String.fromCharCode(...bytes));
}

// Whether the request is plain http to this machine (see `local` above),
// from the Host header: the request's own URL carries the address the
// server listens on, not the one the browser asked for.
export function isLocalHttp(host: string | null, forwardedProto: string | null = null): boolean {
  if (!host || /^https$/i.test(forwardedProto?.split(",")[0].trim() || "")) return false;
  const name = host.replace(/:\d+$/, "").toLowerCase();
  return name === "localhost" || name === "127.0.0.1" || name === "[::1]";
}

// The same on every response, pages and files alike (next.config.ts).
export const SECURITY_HEADERS: { key: string; value: string }[] = [
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // For browsers without frame-ancestors.
  { key: "X-Frame-Options", value: "DENY" },
];
