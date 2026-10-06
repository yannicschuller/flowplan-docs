import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { docSlugs, loadDoc } from "@/lib/docs";
import { localePrefix, requestLocale } from "@/lib/i18n-server";
import { websiteUrl } from "@/lib/links";
import { absolute, jsonLd, pageAlternates, socialMetadata, softwareJson } from "@/lib/seo";
import { translate } from "@/lib/i18n";
import s from "@/components/docs/docs.module.css";

export const dynamicParams = false;
export function generateStaticParams() {
  return docSlugs.map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const locale = await requestLocale();
  const doc = loadDoc(slug, locale);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.summary,
    alternates: pageAlternates(`/${slug}`, locale),
    ...socialMetadata({ title: doc.title, description: doc.summary, path: `/${slug}`, locale, type: "article" }),
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const locale = await requestLocale();
  const t = translate(locale);
  const doc = loadDoc(slug, locale);
  if (!doc) notFound();
  const prefix = await localePrefix();
  // Links between pages stay in the language of the address.
  const html = prefix ? doc.html.replace(/href="\/(?=[a-z0-9-]+(?:#[^"]*)?")/g, `href="${prefix}/`) : doc.html;
  const structured = {
    "@graph": [
      {
        "@type": "TechArticle",
        headline: doc.title,
        description: doc.summary,
        inLanguage: locale,
        url: absolute(`/${locale}/${slug}`),
        articleSection: doc.group,
        isPartOf: { "@type": "WebSite", name: t("Flowplan-Dokumentation", "Flowplan documentation"), url: absolute(`/${locale}`) },
        about: softwareJson(),
        publisher: { "@type": "Organization", name: "Flowplan", url: websiteUrl() },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("Dokumentation", "Documentation"), item: absolute(`/${locale}`) },
          { "@type": "ListItem", position: 2, name: doc.title, item: absolute(`/${locale}/${slug}`) },
        ],
      },
    ],
  };
  return (
    <main className={s.main} id="inhalt">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />
      <article className={s.article}>
        <p className={s.eyebrow}>{doc.group}</p>
        <h1 className={s.title}>{doc.title}</h1>
        <p className={s.lead} dangerouslySetInnerHTML={{ __html: doc.leadHtml }} />
        <div className={s.prose} dangerouslySetInnerHTML={{ __html: html }} />
        <nav className={s.pager} aria-label={t("Weiterlesen", "Continue reading")}>
          {doc.prev ? (
            <a href={`${prefix}/${doc.prev.slug}`} data-dir="prev">
              <small>{t("Zurück", "Previous")}</small>
              {doc.prev.title}
            </a>
          ) : (
            <span />
          )}
          {doc.next && (
            <a href={`${prefix}/${doc.next.slug}`} data-dir="next">
              <small>{t("Weiter", "Next")}</small>
              {doc.next.title}
            </a>
          )}
        </nav>
      </article>
      {doc.toc.length > 2 && (
        <aside className={s.toc} aria-label={t("Auf dieser Seite", "On this page")}>
          <p>{t("Auf dieser Seite", "On this page")}</p>
          <ol>
            {doc.toc.map((entry) => (
              <li key={entry.id} data-depth={entry.depth}>
                <a href={`#${entry.id}`}>{entry.text}</a>
              </li>
            ))}
          </ol>
        </aside>
      )}
    </main>
  );
}
