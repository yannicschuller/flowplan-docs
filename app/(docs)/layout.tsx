import { BrandMark } from "@/components/brand-mark";
import { DocsNav, DocsSearch } from "@/components/docs/docs-nav";
import { docAreas, docTitle, searchIndexVersion } from "@/lib/docs";
import { POPULAR } from "@/lib/home";
import { missesEnabled } from "@/lib/search-misses";
import { localePrefix, requestLocale } from "@/lib/i18n-server";
import { translate } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/i18n";
import s from "@/components/docs/docs.module.css";
import { trackAttrs } from "@/lib/track";
import { fetchStatusSummary, type StatusState } from "@/lib/status";
import { DISCORD_URL, GITHUB_URL, imprintUrl, marketplaceUrl, privacyUrl, SPONSOR_URL, statusUrl, TRANSLATE_URL, websiteUrl } from "@/lib/links";

// The documentation: same paper and ink as the website, calmer.
export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const locale = await requestLocale();
  const t = translate(locale);
  const prefix = await localePrefix();
  const imprint = imprintUrl(),
    privacy = privacyUrl(),
    marketplace = marketplaceUrl(),
    status = statusUrl();
  // The services' state next to the link; null shows the plain link.
  const summary = status ? await fetchStatusSummary() : null;
  const stateText: Record<StatusState, string> = {
    operational: t("Alle Systeme laufen", "All systems operational"),
    degraded: t("Verlangsamt", "Degraded performance"),
    partial_outage: t("Teilweise gestört", "Partial outage"),
    major_outage: t("Gestört", "Major outage"),
    maintenance: t("Wartung", "Maintenance"),
  };
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
        <DocsSearch version={searchIndexVersion()} popular={POPULAR.map((slug) => ({ slug, title: docTitle(slug, locale) }))} misses={missesEnabled()} />
        <LanguageSwitch className={s.lang} />
        <a href={DISCORD_URL} className={s.community} rel="noopener" {...trackAttrs("outbound", { target: "discord" })}>
          {t("Community", "Community")}
        </a>
        {marketplace && (
          <a href={marketplace} className={s.community} {...trackAttrs("outbound", { target: "marketplace" })}>
            Marketplace
          </a>
        )}
        <a href={websiteUrl()} className={s.back} {...trackAttrs("outbound", { target: "website" })}>
          {t("Zur Startseite", "Start page")}
        </a>
      </header>
      <div className={s.shell}>
        <DocsNav areas={docAreas(locale)} />
        {children}
      </div>
      {/* The services' state on its own at the start; then the community
          links and the legal ones as two groups. */}
      <footer className={s.legal}>
        {status && (
          <a
            href={status}
            rel="noopener"
            className={summary ? `${s.legalStatus} ${s.status}` : s.legalStatus}
            data-state={summary?.state}
            title={summary ? t("Status von flowplan.org", "flowplan.org status") : undefined}
            {...trackAttrs("outbound", { target: "status" })}
          >
            {summary ? (
              <>
                <span className={s.statusDot} aria-hidden="true" />
                {stateText[summary.state]}
              </>
            ) : (
              t("Status", "Status")
            )}
          </a>
        )}
        <div className={s.legalLinks}>
          <span className={s.legalGroup}>
            <a href={DISCORD_URL} rel="noopener" {...trackAttrs("outbound", { target: "discord" })}>{t("Community auf Discord", "Community on Discord")}</a>
            <a href={GITHUB_URL} rel="noopener" {...trackAttrs("outbound", { target: "github" })}>
              GitHub
            </a>
            <a href={SPONSOR_URL} rel="noopener" {...trackAttrs("outbound", { target: "sponsor" })}>
              <span aria-hidden="true">♥</span> {t("Unterstützen", "Sponsor")}
            </a>
            {marketplace && (
              <a href={marketplace} {...trackAttrs("outbound", { target: "marketplace" })}>
                {t("Vorlagen im Marketplace", "Templates in the Marketplace")}
              </a>
            )}
            <a href={TRANSLATE_URL} rel="noopener" {...trackAttrs("outbound", { target: "translate" })}>
              {t("Beim Übersetzen helfen", "Help translate")}
            </a>
          </span>
          {(imprint || privacy) && (
            <span className={s.legalGroup}>
              {imprint && <a href={imprint}>{t("Impressum", "Legal notice")}</a>}
              {privacy && <a href={privacy}>{t("Datenschutz", "Privacy")}</a>}
            </span>
          )}
        </div>
      </footer>
    </div>
  );
}
