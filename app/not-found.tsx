import DocsLayout from "./(docs)/layout";
import { NotFoundEvent } from "@/components/docs/not-found-event";
import { localePrefix, requestLocale } from "@/lib/i18n-server";
import { translate } from "@/lib/i18n";
import s from "@/components/docs/docs.module.css";

// Addresses without a page: the documentation's frame with a way back and
// the search in the header.
export default async function NotFound() {
  const t = translate(await requestLocale());
  const prefix = await localePrefix();
  return (
    <DocsLayout>
      <main className={s.main} id="inhalt">
        <article className={s.article}>
          <p className={s.eyebrow}>404</p>
          <h1 className={s.title}>{t("Seite nicht gefunden", "Page not found")}</h1>
          <p className={s.lead}>
            {t(
              "Diese Seite gibt es nicht (mehr). Die Suche oben oder die Übersicht helfen weiter.",
              "This page does not exist (any more). The search above or the overview will help.",
            )}
          </p>
          <p>
            <a href={prefix || "/"}>{t("Zur Übersicht", "To the overview")}</a>
          </p>
        </article>
        <NotFoundEvent />
      </main>
    </DocsLayout>
  );
}
