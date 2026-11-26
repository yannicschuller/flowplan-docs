// The announcement bar above the header: flowplan-website keeps the banners
// (edited in flowplan-admin) and lists the active ones per site and language
// at /api/banners – a contract with flowplan-website (its README, "Banners").
// The docs read them on the server when a page renders (kept a minute per
// language, 1.5 s timeout); unreachable or invalid → no bar, and the site is
// not asked again for a minute, so a slow website never slows the docs.
// The browser counts views, clicks and dismissals straight at the website's
// /api/banners/event (connect-src, lib/csp.ts).

export type BannerSite = "website" | "docs";
export type BannerLang = "de" | "en" | "fr" | "zh";
export type BannerTone = "accent" | "info" | "success" | "warning" | "gradient";
export type PublicBanner = {
  id: string;
  version: number;
  tone: BannerTone;
  emoji: string;
  lang: BannerLang;
  title: string;
  message: string;
  link: { label: string; url: string } | null;
  dismissible: boolean;
  countdown: boolean;
  endsAt: string | null;
};

const TONES: BannerTone[] = ["accent", "info", "success", "warning", "gradient"];
const LANGS: BannerLang[] = ["de", "en", "fr", "zh"];
const TIMEOUT_MS = 1500;
const TTL_MS = 60_000;
const PAUSE_MS = 60_000;

type Env = Record<string, string | undefined>;

// BANNERS_URL: the website that keeps the banners (default WEBSITE_URL,
// else flowplan.org); empty, "off" or "false" turns the bar off. https only
// (http on localhost for development and tests).
export function bannersUrl(env: Env = process.env): string | null {
  const value = env.BANNERS_URL;
  const raw = value === undefined ? env.WEBSITE_URL?.trim() || "https://flowplan.org" : value.trim();
  if (!raw || /^(off|false|0|no)$/i.test(raw)) return null;
  try {
    const url = new URL(raw);
    const local = url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (url.protocol !== "https:" && !local) return null;
    return url.origin;
  } catch {
    return null;
  }
}

// A link the bar may show: https, or a path on this site.
const safeLink = (v: unknown) => {
  if (typeof v !== "string" || v.length > 500 || /[\s\\<>"]/.test(v)) return null;
  if (/^#/.test(v) || /^\/(?!\/)/.test(v)) return v;
  try {
    return new URL(v).protocol === "https:" ? v : null;
  } catch {
    return null;
  }
};
const text = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

// Reads the website's answer defensively: anything that does not fit is dropped.
export function parseBanners(data: unknown): PublicBanner[] {
  const list = data && typeof data === "object" && Array.isArray((data as { banners?: unknown }).banners) ? (data as { banners: unknown[] }).banners : [];
  const out: PublicBanner[] = [];
  for (const raw of list.slice(0, 50)) {
    if (!raw || typeof raw !== "object") continue;
    const b = raw as Record<string, unknown>;
    if (typeof b.id !== "string" || !/^[a-z0-9-]{8,64}$/.test(b.id)) continue;
    const message = text(b.message, 300);
    if (!message) continue;
    const link = b.link && typeof b.link === "object" ? (b.link as Record<string, unknown>) : null;
    const url = link ? safeLink(link.url) : null;
    const label = link ? text(link.label, 40) : "";
    const endsAt = typeof b.endsAt === "string" && Number.isFinite(Date.parse(b.endsAt)) ? b.endsAt : null;
    out.push({
      id: b.id,
      version: Number.isInteger(b.version) ? (b.version as number) : 1,
      tone: TONES.includes(b.tone as BannerTone) ? (b.tone as BannerTone) : "info",
      emoji: text(b.emoji, 16),
      lang: LANGS.includes(b.lang as BannerLang) ? (b.lang as BannerLang) : "en",
      title: text(b.title, 80),
      message,
      link: url && label ? { label, url } : null,
      dismissible: b.dismissible !== false,
      countdown: b.countdown === true && !!endsAt,
      endsAt,
    });
  }
  return out;
}

const cache = new Map<string, { at: number; banners: PublicBanner[] }>();
let pausedUntil = 0;

export async function fetchBanners(lang: BannerLang, base: string | null = bannersUrl(), fetcher: typeof fetch = fetch, now: () => number = Date.now): Promise<PublicBanner[]> {
  if (!base) return [];
  const key = `${base} ${lang}`;
  const hit = cache.get(key);
  if (hit && now() - hit.at < TTL_MS) return hit.banners;
  if (now() < pausedUntil) return hit?.banners ?? [];
  try {
    const response = await fetcher(`${base}/api/banners?site=docs&lang=${lang}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { accept: "application/json" },
    } as RequestInit);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = await response.text();
    if (body.length > 200_000) throw new Error("too large");
    const banners = parseBanners(JSON.parse(body));
    cache.set(key, { at: now(), banners });
    return banners;
  } catch {
    pausedUntil = now() + PAUSE_MS;
    return [];
  }
}

// For tests.
export function resetBanners() {
  cache.clear();
  pausedUntil = 0;
}

// The countdown's words (the same as flowplan-website's lib/banners.ts).
export function countdownText(endsAt: string | null, lang: BannerLang, now: number = Date.now()): string | null {
  if (!endsAt) return null;
  const left = Date.parse(endsAt) - now;
  if (!Number.isFinite(left) || left <= 0) return null;
  const hours = Math.ceil(left / 3_600_000);
  if (left > 86_400_000) {
    const days = Math.ceil(left / 86_400_000);
    return { de: `noch ${days} Tage`, en: `${days} days left`, fr: `plus que ${days} jours`, zh: `还剩 ${days} 天` }[lang];
  }
  if (left < 3_600_000) return { de: "noch weniger als eine Stunde", en: "less than an hour left", fr: "moins d’une heure", zh: "不到 1 小时" }[lang];
  return {
    de: hours === 1 ? "noch 1 Stunde" : `noch ${hours} Stunden`,
    en: hours === 1 ? "1 hour left" : `${hours} hours left`,
    fr: hours === 1 ? "plus qu’une heure" : `plus que ${hours} heures`,
    zh: `还剩 ${hours} 小时`,
  }[lang];
}
