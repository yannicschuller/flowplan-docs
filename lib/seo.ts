// Addresses, language versions and structured data for search engines and
// language models. Every page exists three times: /de/…, /en/… (fixed
// language, these are indexed) and /… (follows the reader, x-default).
import type { Metadata } from "next";
import { docsUrl, GITHUB_URL, websiteUrl } from "./links";
import type { Locale } from "./i18n";

export const ogLocale = (locale: Locale) => (locale === "de" ? "de_DE" : "en_US");

// path: "" for the start page, "/first-steps" for a page.
export function pageAlternates(path: string, locale: Locale): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: { de: `/de${path}`, en: `/en${path}`, "x-default": path || "/" },
    types: path ? { "text/markdown": `/${locale}${path}.md` } : undefined,
  };
}

export function socialMetadata(input: { title: string; description: string; path: string; locale: Locale; type?: "website" | "article" }): Metadata {
  return {
    openGraph: {
      type: input.type || "website",
      siteName: input.locale === "de" ? "Flowplan-Dokumentation" : "Flowplan documentation",
      title: input.title,
      description: input.description,
      url: `/${input.locale}${input.path}`,
      locale: ogLocale(input.locale),
      alternateLocale: [ogLocale(input.locale === "de" ? "en" : "de")],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Flowplan" }],
    },
    twitter: { card: "summary_large_image", title: input.title, description: input.description, images: ["/opengraph-image"] },
  };
}

// The software the documentation is about, as schema.org data.
export const softwareJson = () => ({
  "@type": "SoftwareApplication",
  "@id": `${websiteUrl()}/#software`,
  name: "Flowplan",
  url: websiteUrl(),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, macOS, Windows, Linux (Docker)",
  license: "https://www.gnu.org/licenses/agpl-3.0.html",
  sameAs: [GITHUB_URL],
});

export function jsonLd(data: object) {
  // "<" escaped so the data can never end the script element.
  return { __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") };
}
export const absolute = (path: string) => `${docsUrl()}${path}`;
