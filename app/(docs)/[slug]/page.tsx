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
import { TableFilterSlot, TocSpy } from "@/components/docs/page-tools";
import c from "@/components/docs/content.module.css";

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
  const dateText = (iso: string) => new Date(iso).toLocaleDateString(locale === "de" ? "de-DE" : "en-GB", { dateStyle: "long", timeZone: "UTC" });
  // Links between pages stay in the language of the address.
  let html = prefix ? doc.html.replace(/href="\/(?=[a-z0-9-]+(?:#[^"]*)?")/g, `href="${prefix}/`) : doc.html;
  // "Neu" after the heading of a recently added section (front matter "new").
  const newLabel = t("Neu", "New");
  const fresh = new Map(doc.fresh.map((m) => [m.id, m.date]));
  for (const [id, date] of fresh)
    html = html.replace(
      new RegExp(`(<h([23]) id="${id}">[\\s\\S]*?)(</h\\2>)`),
      `$1 <span class="new-badge" title="${t("Neu seit", "New since")} ${dateText(date)}">${newLabel}</span>$3`,
    );
  // The filter field of a reference page goes right above its first table
  // or section (table-filter.tsx renders into this place).
  if (doc.filter) {
    const at = html.search(/<h[23] id=|<div class="table"/);
    if (at >= 0) html = `${html.slice(0, at)}<div id="table-filter" class="filter-slot"></div>${html.slice(at)}`;
  }
  const freshTitles = doc.fresh.map((m) => ({ id: m.id, text: doc.toc.find((e) => e.id === m.id)?.text ?? m.id }));
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
  const modified = doc.modified ? dateText(doc.modified) : undefined;
  const tocList = (where: "side" | "inline") => (
    <ol data-toc={where}>
      {doc.toc.map((entry) => (
        <li key={entry.id} data-depth={entry.depth}>
          <a href={`#${entry.id}`}>
            {entry.text}
            {fresh.has(entry.id) && <span className={s.tocNew}>{newLabel}</span>}
          </a>
        </li>
      ))}
    </ol>
  );
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
        {(!doc.filter || modified || freshTitles.length > 0) && (
          <p className={s.pageMeta}>
            {/* Reference pages are looked up, not read through. */}
            {!doc.filter && <span>{t(`${doc.minutes} Min. Lesezeit`, `${doc.minutes} min read`)}</span>}
            {modified && (
              <span>
                {t("Aktualisiert am", "Updated on")} <time dateTime={doc.modified}>{modified}</time>
              </span>
            )}
            {freshTitles.length > 0 && (
              <span>
                <span className={s.newBadge}>{newLabel}</span>{" "}
                {freshTitles.map((f, i) => (
                  <span key={f.id}>
                    {i > 0 && ", "}
                    <a href={`#${f.id}`}>{f.text}</a>
                  </span>
                ))}
              </span>
            )}
          </p>
        )}
        {doc.toc.length > 2 && (
          <details className={s.tocInline}>
            <summary>{t("Auf dieser Seite", "On this page")}</summary>
            {tocList("inline")}
          </details>
        )}
        {doc.filter && <TableFilterSlot slug={slug} />}
        <div className={`${s.prose} ${c.content}`} lang={lang} data-prose="" dangerouslySetInnerHTML={{ __html: html }} />
        {/* Tabs ("::: tabs") become tabs only on pages that have them. */}
        {html.includes("data-tabs") && <script src="/tabs.js" async />}
        <CodeCopy slug={slug} />
        {anchors && <AnchorRedirect slug={slug} rows={anchors} />}
        <TocSpy slug={slug} />
        {doc.related.length > 0 && (
          <nav className={s.related} aria-labelledby="verwandte-seiten">
            <h2 id="verwandte-seiten">{t("Verwandte Seiten", "Related pages")}</h2>
            <ul>
              {doc.related.map((page) => (
                <li key={page.slug}>
                  <a href={`${prefix}/${page.slug}`}>{page.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <p className={s.meta}>
          <span>{t("Fehler gefunden oder etwas fehlt?", "Found a mistake or something missing?")}</span>
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
          {tocList("side")}
        </aside>
      )}
    </main>
  );
}
