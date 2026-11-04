import { BrandMark } from "@/components/brand-mark";
import { DocsNav, DocsSearch } from "@/components/docs/docs-nav";
import { docGroups, searchIndexVersion } from "@/lib/docs";
import { localePrefix, requestLocale } from "@/lib/i18n-server";
import { translate } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/i18n";
import s from "@/components/docs/docs.module.css";
import { trackAttrs } from "@/lib/track";
import { DISCORD_URL, GITHUB_URL, imprintUrl, privacyUrl, SPONSOR_URL, websiteUrl } from "@/lib/links";

// The documentation: same paper and ink as the website, calmer.
export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const locale = await requestLocale();
  const t = translate(locale);
  const prefix = await localePrefix();
  const imprint = imprintUrl(),
    privacy = privacyUrl();
  return (
    <div className={s.root}>
      <a href="#inhalt" className={s.skip}>
        {t("Zum Inhalt", "Skip to content")}
      </a>
      <header className={s.header}>
        <a href={websiteUrl()} className={s.brand} {...trackAttrs("outbound", { target: "website" })} aria-label={t("Flowplan, zur Startseite", "Flowplan, to the start page")}>
          <BrandMark size={26} />
          <span>flowplan</span>
        </a>
        <a href={prefix || "/"} className={s.section}>
          {t("Dokumentation", "Documentation")}
        </a>
        <DocsSearch version={searchIndexVersion()} />
        <LanguageSwitch className={s.lang} />
        <a href={DISCORD_URL} className={s.community} rel="noopener" {...trackAttrs("outbound", { target: "discord" })}>
          {t("Community", "Community")}
        </a>
        <a href={websiteUrl()} className={s.back} {...trackAttrs("outbound", { target: "website" })}>
          {t("Zur Startseite", "Start page")}
        </a>
      </header>
      <div className={s.shell}>
        <DocsNav groups={docGroups(locale)} />
        {children}
      </div>
      <footer className={s.legal}>
        <a href={DISCORD_URL} rel="noopener" {...trackAttrs("outbound", { target: "discord" })}>{t("Community auf Discord", "Community on Discord")}</a>
        <a href={GITHUB_URL} rel="noopener" {...trackAttrs("outbound", { target: "github" })}>
          GitHub
        </a>
        <a href={SPONSOR_URL} rel="noopener" {...trackAttrs("outbound", { target: "sponsor" })}>
          <span aria-hidden="true">♥</span> {t("Unterstützen", "Sponsor")}
        </a>
        {imprint && <a href={imprint}>{t("Impressum", "Legal notice")}</a>}
        {privacy && <a href={privacy}>{t("Datenschutz", "Privacy")}</a>}
      </footer>
    </div>
  );
}
