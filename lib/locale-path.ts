// A docs address without its language prefix: /de, /en and the page
// languages /fr and /zh (proxy.ts rewrites them all to the bare path).
export function pathWithoutLocale(pathname: string) {
  return pathname.replace(/^\/(de|en|fr|zh)(?=\/|$)/, "") || "/";
}
