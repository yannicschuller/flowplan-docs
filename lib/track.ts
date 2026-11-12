// Events for the visitor statistics (Umami, lib/analytics.ts): what is
// searched, copied, missed and where readers go next – never who. Values
// are constant strings, except the search term and the path of a missing
// page, which pass through the sanitisers below first.
//
//   search         term, results ("0" | "1-5" | "6+"), lang   settled search query
//   search-open    slug                                       search result opened
//   copy           page, lang                                 code block copied
//   not-found      path                                       404 page shown
//   outbound       target (app | demo | website | marketplace | github | discord | sponsor)
//   language       to                                         language switched
//
// Without Umami (not configured, blocked, Do Not Track) nothing happens.
export type TrackProps = Record<string, string>;

type Umami = { track: (name: string, data?: TrackProps) => unknown };
const umami = (): Umami | undefined =>
  typeof window === "undefined" ? undefined : (window as unknown as { umami?: Umami }).umami;

// Sends an event. The promise settles once Umami has sent it, or after
// `wait` ms at the latest – for a navigation that should not cut it off.
export function track(name: string, props?: TrackProps, wait = 300): Promise<void> {
  try {
    const u = umami();
    if (!u || typeof u.track !== "function") return Promise.resolve();
    const sent = Promise.resolve(u.track(name, props)).then(
      () => undefined,
      () => undefined,
    );
    return Promise.race([sent, new Promise<void>((done) => setTimeout(done, wait))]);
  } catch {
    return Promise.resolve();
  }
}

// The same as attributes for a link or button; Umami's script tracks the
// click itself (data-umami-event="Name", data-umami-event-<key>="value").
export function trackAttrs(name: string, props: TrackProps = {}): Record<string, string> {
  const attrs: Record<string, string> = { "data-umami-event": name };
  for (const [key, value] of Object.entries(props)) {
    if (!/^[a-z][a-z0-9-]*$/.test(key)) throw new Error(`event property "${key}": lowercase letters, digits and "-" only`);
    attrs[`data-umami-event-${key}`] = value;
  }
  return attrs;
}

export const REDACTED = "[redacted]";

// Looks like something personal or secret: an e-mail address, an address
// with user name or password, a long number (phone, IBAN, customer number)
// or a token / key / ID.
export function looksSensitive(text: string): boolean {
  if (/[^\s@/]+@[^\s@/]+\.[^\s@/]+/.test(text)) return true;
  if (/[a-z][a-z0-9+.-]*:\/\/[^\s/?#]*@/i.test(text)) return true;
  if ((text.match(/\d/g) || []).length >= 8) return true;
  if (/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(text)) return true;
  // 16+ characters in a row that mix in digits or base64 signs. Words
  // alone (German compounds, FLOWPLAN_SOME_SETTING, a/path) are fine.
  for (const run of text.match(/[A-Za-z0-9+/=_-]{16,}/g) || [])
    for (const part of run.split(/[_/-]/))
      if (part.length >= 16 && /[\d+=]/.test(part)) return true;
  return false;
}

// The search term as sent: trimmed, lowercase, single spaces, at most 50
// characters; "[redacted]" for anything that looks personal; null when
// shorter than 2 characters (not worth an event).
export function searchTerm(query: string): string | null {
  const term = query.trim().replace(/\s+/g, " ");
  if (term.length < 2) return null;
  if (looksSensitive(term)) return REDACTED;
  return term.toLowerCase().slice(0, 50).trim();
}

// The number of results in three buckets.
export function resultBucket(count: number): "0" | "1-5" | "6+" {
  return count <= 0 ? "0" : count <= 5 ? "1-5" : "6+";
}

// The path of a missing page: no query or fragment, at most 100 characters.
export function notFoundPath(pathname: string): string {
  const path = (pathname.split(/[?#]/)[0] || "/").slice(0, 100);
  let decoded = path;
  try {
    decoded = decodeURIComponent(path);
  } catch {}
  return looksSensitive(decoded) ? REDACTED : path;
}

// The code language of a block, if it is a plain name (bash, yaml, dotenv).
export function codeLanguage(lang: string | null | undefined): string {
  const l = (lang || "").trim().toLowerCase();
  return /^[a-z0-9+#-]{1,20}$/.test(l) ? l : "text";
}

export type OutboundTarget = "app" | "demo" | "website" | "marketplace" | "github" | "discord" | "sponsor";

// Which of Flowplan's places a link leads to, or null for any other one.
export function outboundTarget(href: string, sites: { app: string; website: string; marketplace?: string | null }): OutboundTarget | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  const host = (address: string) => {
    try {
      return new URL(address).host;
    } catch {
      return "";
    }
  };
  if (url.host === "github.com") return url.pathname.startsWith("/sponsors/") ? "sponsor" : "github";
  if (url.host === "discord.gg" || url.host === "discord.com") return "discord";
  if (url.host === host(sites.app)) return /^\/demo(\/|$)/.test(url.pathname) ? "demo" : "app";
  if (url.host === host(sites.website)) return "website";
  if (sites.marketplace && url.host === host(sites.marketplace)) return "marketplace";
  return null;
}
