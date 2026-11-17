// Addresses of the other Flowplan sites. Set at runtime (Coolify, Docker):
// APP_URL, DOCS_URL and WEBSITE_URL; the defaults are flowplan.org's.
const clean = (value: string | undefined, fallback: string) => (value || fallback).replace(/\/$/, "");
export const appUrl = () => clean(process.env.APP_URL, "https://app.flowplan.org");
export const docsUrl = () => clean(process.env.DOCS_URL, "https://docs.flowplan.org");
export const websiteUrl = () => clean(process.env.WEBSITE_URL, "https://flowplan.org");
// The template marketplace. MARKETPLACE_URL changes the address; set to
// empty, "off" or "false" it hides the links in the header, the footer and
// llms.txt (links inside the pages' text stay).
export const MARKETPLACE_DEFAULT = "https://marketplace.flowplan.org";
export function marketplaceUrl(): string | null {
  const value = process.env.MARKETPLACE_URL;
  if (value === undefined) return MARKETPLACE_DEFAULT;
  const trimmed = value.trim();
  if (!trimmed || /^(off|false|0|no)$/i.test(trimmed)) return null;
  return trimmed.replace(/\/$/, "");
}
// The status page of the hosted service (app.flowplan.org). STATUS_URL
// changes the address; empty, "off" or "false" hides the footer link.
export const STATUS_DEFAULT = "https://status.flowplan.org";
export function statusUrl(): string | null {
  const value = process.env.STATUS_URL;
  if (value === undefined) return STATUS_DEFAULT;
  const trimmed = value.trim();
  if (!trimmed || /^(off|false|0|no)$/i.test(trimmed)) return null;
  return trimmed.replace(/\/$/, "");
}
export const GITHUB_URL = "https://github.com/yannicschuller/flowplan";
export const DISCORD_URL = "https://discord.gg/bCEdB6MPrR";
// The community translation tool: anyone signs in with GitHub and suggests
// translations of the apps' texts (/languages#help-translate).
export const TRANSLATE_URL = "https://translate.flowplan.org";
// GitHub Sponsors, for anyone who wants to support the development.
export const SPONSOR_URL = "https://github.com/sponsors/yannicschuller";
// The operator's legal notice and privacy policy (IMPRINT_URL, PRIVACY_URL);
// the footer shows only what is set.
const legal = (value: string | undefined) => (/^https?:\/\/\S+$/i.test((value || "").trim()) ? (value || "").trim() : undefined);
export const imprintUrl = () => legal(process.env.IMPRINT_URL);
export const privacyUrl = () => legal(process.env.PRIVACY_URL);
