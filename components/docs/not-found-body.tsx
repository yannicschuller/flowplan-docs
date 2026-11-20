import { localePrefix, requestLocale } from "@/lib/i18n-server";
import { translate } from "@/lib/i18n";
import s from "@/components/docs/docs.module.css";

// What an address without a page shows: a way back and the search in the
// header. The layout's NotFoundEvent counts it (data-not-found). Used inside
// the documentation's frame – by app/(docs)/[slug]/not-found.tsx, which the
// frame already wraps, and by app/not-found.tsx, which brings the frame.
export async function NotFoundBody() {
  const t = translate(await requestLocale());
  const prefix = await localePrefix();
  return (
    <main className={s.main} id="inhalt" data-not-found="">
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
    </main>
  );
}
