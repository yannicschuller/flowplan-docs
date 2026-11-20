import type { DocArea } from "@/lib/docs";
import { localePrefix, requestLocale, requestPath } from "@/lib/i18n-server";
import { translate } from "@/lib/i18n";
import { NavMenu } from "./nav-menu";
import s from "./docs.module.css";

// Sidebar of the documentation: the three areas as tabs, the groups of one
// area below; on small screens it folds into a menu (nav-menu.tsx, the only
// part that needs JavaScript). Rendered on the server, which knows the
// address the reader opened from proxy.ts (without its language), so the
// current page is marked before any script runs.
export async function DocsNav({ areas }: { areas: DocArea[] }) {
  const [locale, prefix, path] = await Promise.all([requestLocale(), localePrefix(), requestPath()]);
  const t = translate(locale);
  const pageArea = areas.find((a) => a.groups.some((g) => g.pages.some((p) => path === `/${p.slug}`)))?.id;
  const whatsNew = t("Was ist neu", "What's new");
  const current =
    areas.flatMap((a) => a.groups.flatMap((g) => g.pages)).find((p) => path === `/${p.slug}`) ?? (path === "/whats-new" ? { title: whatsNew } : undefined);
  const panels = Object.fromEntries(
    areas.map((area) => [
      area.id,
      area.groups.map((group) => (
        <div key={group.title} className={s.navGroup}>
          <p>{group.title}</p>
          {group.pages.map((page) => (
            <a key={page.slug} href={`${prefix}/${page.slug}`} aria-current={path === `/${page.slug}` ? "page" : undefined}>
              {page.title}
            </a>
          ))}
        </div>
      )),
    ]),
  );
  return (
    <NavMenu
      label={t("Dokumentation", "Documentation")}
      current={current?.title || t("Übersicht", "Overview")}
      tabsLabel={t("Bereich der Dokumentation", "Part of the documentation")}
      areas={areas.map(({ id, short, title }) => ({ id, short, title }))}
      initial={pageArea ?? "use"}
      top={
        <>
          <a href={prefix || "/"} aria-current={path === "/" ? "page" : undefined}>
            {t("Übersicht", "Overview")}
          </a>
          <a href={`${prefix}/whats-new`} aria-current={path === "/whats-new" ? "page" : undefined}>
            {whatsNew}
          </a>
        </>
      }
      panels={panels}
      classes={{ nav: s.nav, toggle: s.navToggle, list: s.navList, tabs: s.areaTabs }}
    />
  );
}
