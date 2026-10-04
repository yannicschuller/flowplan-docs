import { BrandMark } from "@/components/brand-mark";
import { DocsNav, DocsSearch } from "@/components/docs/docs-nav";
import { docGroups, docSearchIndex } from "@/lib/docs";
import { requestLocale } from "@/lib/i18n-server";
import { translate } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/i18n";
import s from "@/components/docs/docs.module.css";
import { websiteUrl } from "@/lib/links";

// The documentation: same paper and ink as the website, calmer.
export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const locale = await requestLocale();
  const t = translate(locale);
  const index = docSearchIndex(locale);
  return (
    <div className={s.root}>
      <header className={s.header}>
        <a href={websiteUrl()} className={s.brand} aria-label={t("Flowplan, zur Startseite", "Flowplan, to the start page")}>
          <BrandMark size={26} />
          <span>flowplan</span>
        </a>
        <a href="/" className={s.section}>
          {t("Dokumentation", "Documentation")}
        </a>
        <DocsSearch index={index} />
        <LanguageSwitch className={s.lang} />
        <a href={websiteUrl()} className={s.back}>
          {t("Zur Startseite", "Start page")}
        </a>
      </header>
      <div className={s.shell}>
        <DocsNav groups={docGroups(locale)} />
        {children}
      </div>
    </div>
  );
}
