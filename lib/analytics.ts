// Visitor statistics with a self-hosted Umami (https://umami.is): no
// cookies, nothing stored in the browser, no IP addresses kept – it counts
// visits with a hash whose key changes regularly. Set at runtime (Coolify):
//
//   UMAMI_URL         Address of the Umami instance, e.g. https://stats.example.com
//   UMAMI_WEBSITE_ID  The website's ID in Umami
//
// Without both there are no statistics at all.
//
// The pages load /analytics.js from this site, which adds Umami's script
// only when it is configured. Browsers that send "Do Not Track" are not
// counted.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type Analytics = { script: string; origin: string; websiteId: string };

export function analytics(env: Record<string, string | undefined> = process.env): Analytics | null {
  const raw = (env.UMAMI_URL || "").trim();
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) return null;
  const websiteId = (env.UMAMI_WEBSITE_ID || "").trim();
  if (!UUID.test(websiteId)) return null;
  // The instance's address, or the script itself (…/script.js).
  const script = url.pathname.endsWith(".js") ? url.href : new URL("script.js", url.href.endsWith("/") ? url.href : `${url.href}/`).href;
  return { script, origin: url.origin, websiteId };
}

// The loader served as /analytics.js.
export function analyticsLoader(config: Analytics | null) {
  if (!config) return "/* Statistics are off (UMAMI_URL and UMAMI_WEBSITE_ID are not set). */\n";
  return `(function(){var s=document.createElement("script");s.defer=true;s.src=${JSON.stringify(config.script)};s.setAttribute("data-website-id",${JSON.stringify(config.websiteId)});s.setAttribute("data-do-not-track","true");document.head.appendChild(s);})();\n`;
}
