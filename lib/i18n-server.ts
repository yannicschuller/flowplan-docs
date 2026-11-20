// The reader's language on the server. Addresses under /de and /en fix the
// language (proxy.ts sets a header); other addresses follow the cookie or
// the browser.
import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, isLocale, isPageLocale, pickLocale, translate, type Locale, type PageLocale } from "./i18n";

export const LOCALE_HEADER = "x-flowplan-locale";
// Set by proxy.ts on /fr/… and /zh/… (lib/i18n.ts, PAGE_LOCALES), which are
// English addresses otherwise.
export const PAGE_LOCALE_HEADER = "x-flowplan-page-locale";
export async function pageLocale(): Promise<PageLocale | undefined> {
  const value = (await headers()).get(PAGE_LOCALE_HEADER);
  return isPageLocale(value) ? value : undefined;
}

export async function requestLocale(): Promise<Locale> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const fixed = headerStore.get(LOCALE_HEADER);
  if (isLocale(fixed)) return fixed;
  return pickLocale(cookieStore.get(LOCALE_COOKIE)?.value, headerStore.get("accept-language"));
}
// "/en" on English addresses, "/de" on German ones, "" on adaptive ones, so
// links stay in the language the page was opened in.
export async function localePrefix(): Promise<string> {
  const store = await headers();
  // On /fr/… links stay under /fr, so every page says it is not translated.
  const page = store.get(PAGE_LOCALE_HEADER);
  if (isPageLocale(page)) return `/${page}`;
  const fixed = store.get(LOCALE_HEADER);
  return isLocale(fixed) ? `/${fixed}` : "";
}
// The address the reader opened, without its language (/de/journal and
// /journal are both "/journal"); set by proxy.ts on every request, so the
// sidebar can mark the current page on the server.
export const PATH_HEADER = "x-flowplan-path";
export async function requestPath(): Promise<string> {
  return (await headers()).get(PATH_HEADER) || "/";
}
export async function serverT() {
  return translate(await requestLocale());
}
