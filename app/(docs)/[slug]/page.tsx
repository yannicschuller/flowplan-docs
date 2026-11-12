import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { docAnchors, docSlugs, editUrl, loadDoc } from "@/lib/docs";
import { AnchorRedirect } from "@/components/docs/anchor-redirect";
import { localePrefix, requestLocale } from "@/lib/i18n-server";
import { websiteUrl } from "@/lib/links";
import { trackAttrs } from "@/lib/track";
import { absolute, jsonLd, pageAlternates, socialMetadata, softwareJson } from "@/lib/seo";
import { translate } from "@/lib/i18n";
import s from "@/components/docs/docs.module.css";
import { CodeCopy } from "@/components/docs/code-copy";

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
  const anchors = docAnchors(slug);
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
  // The text's language, when an English address still shows the German page.
  const lang = doc.translated ? undefined : "de";
  const modified = doc.modified
    ? new Date(doc.modified).toLocaleDateString(locale === "de" ? "de-DE" : "en-GB", { dateStyle: "long" })
    : undefined;
  return (
    <main className={s.main} id="inhalt">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />
      <article className={s.article}>
        <p className={s.eyebrow}>{doc.group}</p>
        <h1 className={s.title} lang={lang}>
          {doc.title}
        </h1>
        {!doc.translated && (
          <aside className={s.untranslated} role="note">
            This page is not translated yet – you are reading the German version.
          </aside>
        )}
        <p className={s.lead} lang={lang} dangerouslySetInnerHTML={{ __html: doc.leadHtml }} />
        <div className={s.prose} lang={lang} dangerouslySetInnerHTML={{ __html: html }} />
        <CodeCopy slug={slug} />
        {anchors && <AnchorRedirect slug={slug} rows={anchors} />}
        <p className={s.meta}>
          {modified && (
            <span>
              {t("Zuletzt aktualisiert am", "Last updated on")} <time dateTime={doc.modified}>{modified}</time>
            </span>
          )}
          <a href={editUrl(doc.source)} rel="noopener" {...trackAttrs("outbound", { target: "github" })}>
            {t("Auf GitHub bearbeiten", "Edit on GitHub")}
          </a>
        </p>
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
