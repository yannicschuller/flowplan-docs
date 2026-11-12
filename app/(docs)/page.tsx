import {
  ArrowRight,
  ArrowsLeftRight,
  CheckSquare,
  CloudArrowUp,
  Database,
  DeviceMobile,
  FlowArrow,
  HardDrives,
  Kanban,
  Key,
  ShareNetwork,
  Sparkle,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { docAreas, docTitle, loadDoc, whatsNewTitle } from "@/lib/docs";
import { releases } from "@/lib/changelog";
import { POPULAR, TASKS, taskHref } from "@/lib/home";
import type { Metadata } from "next";
import { localePrefix, requestLocale } from "@/lib/i18n-server";
import { DISCORD_URL, GITHUB_URL, websiteUrl } from "@/lib/links";
import { absolute, jsonLd, pageAlternates, socialMetadata, softwareJson } from "@/lib/seo";
import { translate } from "@/lib/i18n";
import s from "@/components/docs/docs.module.css";

// Entries about the docs or translation catalogues say little on the start page.
const NOT_NEWS = /^(Help( docs| for)|Visual baselines|Sidebar state|SDK and help docs)|catalogue/i;
const ICONS = { ArrowsLeftRight, CheckSquare, CloudArrowUp, Database, DeviceMobile, FlowArrow, HardDrives, Kanban, Key, ShareNetwork, Sparkle, UsersThree };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await requestLocale();
  const t = translate(locale);
  const title = t("Flowplan-Dokumentation", "Flowplan documentation");
  const description = t(
    "Anleitung für Flowplan, den Open-Source-Arbeitsbereich (AGPL-3.0) für Dokumente, Datenbanken, Whiteboards und Journal – eine Alternative zu Notion und AppFlowy: jede Funktion, der Umzug und das Selbst-Hosten mit Docker.",
    "Guide to Flowplan, the open-source workspace (AGPL-3.0) for documents, databases, whiteboards and a journal – an alternative to Notion and AppFlowy: every feature, moving over and self-hosting with Docker.",
  );
  return {
    title: { absolute: title },
    description,
    alternates: pageAlternates("", locale),
    ...socialMetadata({ title, description, path: "", locale }),
  };
}

// The start page: tasks first ("I want to …"), then popular pages and what
// is new in the latest release, then every page by area and group.
export default async function DocsHome() {
  const locale = await requestLocale();
  const t = translate(locale);
  const prefix = await localePrefix();
  const latest = releases()[0];
  const structured = {
    "@graph": [
      {
        "@type": "WebSite",
        name: t("Flowplan-Dokumentation", "Flowplan documentation"),
        url: absolute(`/${locale}`),
        inLanguage: locale,
        publisher: { "@type": "Organization", name: "Flowplan", url: websiteUrl(), sameAs: [GITHUB_URL, DISCORD_URL] },
      },
      softwareJson(),
    ],
  };
  const pick = ([de, en]: [string, string]) => (locale === "en" ? en : de);
  return (
    <main className={s.main} id="inhalt">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />
      <article className={s.article}>
        <p className={s.eyebrow}>{t("Dokumentation", "Documentation")}</p>
        <h1 className={s.title}>{t("Flowplan Schritt für Schritt.", "Flowplan, step by step.")}</h1>
        <p className={s.lead}>
          {t(
            "Flowplan ist ein Arbeitsbereich für Dokumente, Datenbanken, Whiteboards und ein tägliches Journal – Open Source, gehostet in Deutschland oder auf deinem eigenen Server. Diese Dokumentation erklärt jede Funktion und den Betrieb einer eigenen Instanz.",
            "Flowplan is a workspace for documents, databases, whiteboards and a daily journal – open source, hosted in Germany or on your own server. This documentation explains every feature and how to run your own instance.",
          )}
        </p>

        <section aria-labelledby="ich-will" className={s.homeSection}>
          <h2 id="ich-will">{t("Ich will …", "I want to …")}</h2>
          <ul className={s.tasks}>
            {TASKS.map((task) => {
              const Icon = ICONS[task.icon as keyof typeof ICONS];
              return (
                <li key={task.title[0]}>
                  <a href={taskHref(task, prefix, locale)}>
                    <Icon size={22} aria-hidden="true" />
                    <strong>{pick(task.title)}</strong>
                    <span>{pick(task.text)}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <div className={s.homeColumns}>
          <section aria-labelledby="beliebt" className={s.homeSection}>
            <h2 id="beliebt">{t("Beliebt", "Popular")}</h2>
            <ul className={s.popular}>
              {POPULAR.map((slug) => (
                <li key={slug}>
                  <a href={`${prefix}/${slug}`}>
                    {docTitle(slug, locale)}
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
          {latest && (
            <section aria-labelledby="neu" className={s.homeSection}>
              <h2 id="neu">
                {t("Neu in", "New in")} {latest.version}
              </h2>
              <ul className={s.news} lang="en">
                {latest.entries.filter((e) => !NOT_NEWS.test(e.text)).slice(0, 5).map((entry, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: entry.html }} />
                ))}
              </ul>
              <a href={`${prefix}/whats-new#${latest.id}`} className={s.more}>
                {whatsNewTitle(locale)} <ArrowRight size={14} aria-hidden="true" />
              </a>
            </section>
          )}
        </div>

        <section aria-labelledby="alle-seiten" className={s.homeSection}>
          <h2 id="alle-seiten">{t("Alle Seiten", "All pages")}</h2>
          {docAreas(locale).map((area) => (
            <section key={area.id} className={s.area} aria-labelledby={`area-${area.id}`}>
              <h3 id={`area-${area.id}`}>{area.title}</h3>
              <p className={s.groupIntro}>{area.intro}</p>
              <div className={s.groupGrid}>
                {area.groups.map((group) => (
                  <div key={group.title} className={s.groupCard}>
                    <h4>{group.title}</h4>
                    <p>{group.intro}</p>
                    <ul>
                      {group.pages.map((page) => (
                        <li key={page.slug}>
                          <a href={`${prefix}/${page.slug}`} title={loadDoc(page.slug, locale)!.summary}>
                            {page.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </section>
      </article>
    </main>
  );
}
