import type { Metadata } from "next";
import { CHANGELOG_URL, releases } from "@/lib/changelog";
import { WHATS_NEW, whatsNewTitle } from "@/lib/docs";
import { requestLocale } from "@/lib/i18n-server";
import { translate, type Locale } from "@/lib/i18n";
import { absolute, jsonLd, pageAlternates, socialMetadata } from "@/lib/seo";
import s from "@/components/docs/docs.module.css";

// "Was ist neu" / "What's new": every release from the app's CHANGELOG.md,
// read at build time (scripts/app-files.mjs). The entries are in English.
const path = `/${WHATS_NEW.slug}`;
const description = (locale: Locale) =>
  translate(locale)(
    "Was sich in jeder Flowplan-Version geändert hat, die neueste zuerst – aus dem Changelog der App.",
    "What changed in every Flowplan release, newest first – from the app's changelog.",
  );

export async function generateMetadata(): Promise<Metadata> {
  const locale = await requestLocale();
  const title = whatsNewTitle(locale);
  return {
    title,
    description: description(locale),
    alternates: { ...pageAlternates(path, locale), types: undefined },
    ...socialMetadata({ title, description: description(locale), path, locale }),
  };
}

export default async function WhatsNewPage() {
  const locale = await requestLocale();
  const t = translate(locale);
  const all = releases();
  const date = (iso: string) =>
    new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale === "de" ? "de-DE" : "en-GB", { dateStyle: "long", timeZone: "UTC" });
  const structured = {
    "@type": "WebPage",
    name: whatsNewTitle(locale),
    description: description(locale),
    inLanguage: locale,
    url: absolute(`/${locale}${path}`),
    ...(all[0] ? { dateModified: all[0].date } : {}),
  };
  return (
    <main className={s.main} id="inhalt">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />
      <article className={s.article}>
        <p className={s.eyebrow}>{t("Versionen", "Releases")}</p>
        <h1 className={s.title}>{whatsNewTitle(locale)}</h1>
        <p className={s.lead}>{description(locale)}</p>
        {locale === "de" && (
          <aside className={s.untranslated} role="note">
            Die Einträge stammen aus den Commits und sind deshalb auf Englisch.
          </aside>
        )}
        <div className={s.prose}>
          {all.length === 0 && <p>{t("Noch keine Versionen.", "No releases yet.")}</p>}
          {all.map((release) => (
            <section key={release.id} aria-labelledby={release.id}>
              <h2 id={release.id}>
                <a className="anchor" href={`#${release.id}`} aria-hidden="true" tabIndex={-1}>
                  #
                </a>
                {release.version} <span className={s.releaseDate}>{date(release.date)}</span>
              </h2>
              <ul lang="en">
                {release.entries.map((entry, i) => (
                  <li key={entry.commit?.hash ?? i}>
                    <span dangerouslySetInnerHTML={{ __html: entry.html }} />
                    {entry.commit && (
                      <>
                        {" "}
                        <a className={s.commit} href={entry.commit.url} rel="noopener">
                          <span className="sr-only">{t("Commit ", "Commit ")}</span>
                          {entry.commit.hash.slice(0, 7)}
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <p className={s.releaseMeta}>
                {release.hidden > 0 &&
                  t(
                    `Dazu ${release.hidden} interne Änderungen (Tests, CI, README). `,
                    `Plus ${release.hidden} internal change${release.hidden === 1 ? "" : "s"} (tests, CI, README). `,
                  )}
                <a href={release.url} rel="noopener">
                  {t(`${release.version} auf GitHub`, `${release.version} on GitHub`)}
                </a>
              </p>
            </section>
          ))}
        </div>
        <p className={s.meta}>
          <a href={CHANGELOG_URL} rel="noopener">
            {t("Vollständiger Changelog auf GitHub", "Full changelog on GitHub")}
          </a>
        </p>
      </article>
      {all.length > 2 && (
        <aside className={s.toc} aria-label={t("Auf dieser Seite", "On this page")}>
          <p>{t("Auf dieser Seite", "On this page")}</p>
          <ol>
            {all.map((release) => (
              <li key={release.id} data-depth={2}>
                <a href={`#${release.id}`}>{release.version}</a>
              </li>
            ))}
          </ol>
        </aside>
      )}
    </main>
  );
}
