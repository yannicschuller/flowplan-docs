"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import type { DocSearchEntry } from "@/lib/docs";
import { highlight, searchDocs, suggest, type SearchHit } from "@/lib/search";
import { looksSensitive, resultBucket, searchTerm, track } from "@/lib/track";
import { useLocale, usePrefix, useT } from "../i18n";
import s from "./docs.module.css";

// Marks the matched terms of a title or snippet.
function Marked({ text, terms }: { text: string; terms: string[] }) {
  return <>{highlight(text, terms).map((piece, i) => (piece.hit ? <mark key={i}>{piece.text}</mark> : piece.text))}</>;
}

const LISTBOX_ID = "docs-search-results";
const optionId = (i: number) => `docs-search-option-${i}`;
const ISSUE_URL = "https://github.com/yannicschuller/flowplan-docs/issues/new";

// The search: the field in the header opens a dialog, so do ⌘K / Ctrl+K and
// "/". Results are pages and sections ("Page › Section") with the matching
// sentence; Enter or a click jumps to the heading, which lights up briefly
// (CSS :target). The index of all pages is fetched once, when the dialog
// first opens (version: a fingerprint of the content, so the response can
// be cached). Nothing leaves the browser except the anonymous counters of
// lib/track.ts.
export default function SearchDialog({ version, popular, opens }: { version: string; popular: { slug: string; title: string }[]; opens: number }) {
  const t = useT();
  const locale = useLocale();
  const prefix = usePrefix();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState<DocSearchEntry[] | null>(null);
  // Why the index could not be loaded (HTTP status or error), shown as the
  // message's tooltip and in the console for diagnosis.
  const [failed, setFailed] = useState<string | null>(null);
  const loading = useRef(false);
  // Search terms already counted on this page view (lib/track.ts).
  const reported = useRef(new Set<string>());

  const load = useCallback(() => {
    if (loading.current) return;
    loading.current = true;
    const url = `/api/search-index/${locale}?v=${encodeURIComponent(version)}`;
    const get = () =>
      fetch(url).then((r) =>
        r.ok
          ? (r.json() as Promise<DocSearchEntry[]>).catch((error: unknown) => Promise.reject(new Error(`HTTP ${r.status}, unreadable JSON: ${error}`)))
          : Promise.reject(new Error(`HTTP ${r.status}`)),
      );
    // One retry after a short pause covers a dropped connection or a
    // restarting server.
    get()
      .catch(() => new Promise((resolve) => setTimeout(resolve, 1000)).then(get))
      .then((data) => {
        setIndex(data);
        setFailed(null);
      })
      .catch((error: unknown) => {
        // Try again on the next opening.
        loading.current = false;
        const reason = error instanceof Error ? error.message : String(error);
        console.warn(`Search index ${url}: ${reason}`);
        setFailed(reason);
      });
  }, [locale, version]);

  // Every request to open (the field, ⌘K, "/") counts up "opens".
  useEffect(() => {
    load();
    const d = dialog.current;
    if (!d) return;
    if (!d.open) d.showModal();
    requestAnimationFrame(() => input.current?.select());
  }, [opens, load]);

  const { results, terms } = useMemo(() => (index ? searchDocs(index, query, prefix) : { results: [] as SearchHit[], terms: [] as string[] }), [index, query, prefix]);
  const suggestions = useMemo(() => (index && query.trim() && !results.length ? suggest(index, query) : []), [index, query, results.length]);

  // The statistics count a query once it has settled: 1.2 s after the last
  // keystroke, or when a result is opened – each term once per page view.
  const report = useCallback(() => {
    const term = searchTerm(query);
    if (!term || !index || reported.current.has(term)) return;
    reported.current.add(term);
    track("search", { term, results: resultBucket(results.length), lang: locale });
  }, [query, index, results, locale]);
  useEffect(() => {
    const timer = setTimeout(report, 1200);
    return () => clearTimeout(timer);
  }, [report]);

  const close = () => dialog.current?.close();
  const go = (hit: { href: string; slug: string }) => {
    report();
    track("search-open", { slug: hit.slug }).then(() => {
      close();
      const url = new URL(hit.href, location.href);
      // Same page: jump without reloading, and light the heading up again
      // even when it is the one already shown.
      if (url.pathname === location.pathname && url.hash) {
        if (location.hash === url.hash) {
          history.replaceState(null, "", url.pathname);
        }
        location.hash = url.hash;
      } else location.assign(hit.href);
    });
  };

  const typed = query.trim().length > 0;
  const listed = typed && results.length > 0;
  // A prefilled issue on GitHub for a search that found nothing – the term
  // only if it does not look personal.
  const term = query.trim().slice(0, 80);
  const issue = `${ISSUE_URL}?${new URLSearchParams({
    title: looksSensitive(term) ? t("Doku: nichts gefunden", "Docs: nothing found") : t(`Doku: nichts gefunden zu „${term}“`, `Docs: nothing found for “${term}”`),
    labels: "documentation",
  })}`;

  return (
      <dialog
        ref={dialog}
        className={s.searchDialog}
        aria-label={t("Dokumentation durchsuchen", "Search the documentation")}
        onClick={(e) => {
          // A click on the backdrop closes it.
          if (e.target === dialog.current) close();
        }}
        onClose={() => report()}
      >
        <div className={s.searchPanel}>
          <div className={s.searchField}>
            <MagnifyingGlass size={18} aria-hidden="true" />
            <input
              ref={input}
              type="search"
              role="combobox"
              autoComplete="off"
              spellCheck={false}
              placeholder={t("Wonach suchst du? Etwa „Kanban“ oder „Backup“", "What are you looking for? E.g. “kanban” or “backup”")}
              aria-label={t("Suchbegriff", "Search term")}
              aria-expanded={listed}
              aria-controls={listed ? LISTBOX_ID : undefined}
              aria-activedescendant={listed && results[active] ? optionId(active) : undefined}
              aria-autocomplete="list"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  if (!results.length) return;
                  e.preventDefault();
                  const step = e.key === "ArrowDown" ? 1 : -1;
                  setActive((i) => (i + step + results.length) % results.length);
                } else if (e.key === "Home" && results.length && e.ctrlKey) {
                  e.preventDefault();
                  setActive(0);
                } else if (e.key === "End" && results.length && e.ctrlKey) {
                  e.preventDefault();
                  setActive(results.length - 1);
                } else if (e.key === "Enter" && results[active]) {
                  e.preventDefault();
                  go(results[active]);
                } else if (e.key === "Enter") report();
              }}
            />
            <button type="button" className={s.searchClose} onClick={close}>
              <kbd aria-hidden="true">Esc</kbd>
              <span>{t("Schließen", "Close")}</span>
            </button>
          </div>
          {listed && (
            <ul className={s.hits} role="listbox" id={LISTBOX_ID} aria-label={t("Treffer", "Results")}>
              {results.map((hit, i) => (
                <li key={hit.href} role="presentation">
                  <a
                    role="option"
                    id={optionId(i)}
                    aria-selected={i === active}
                    href={hit.href}
                    tabIndex={-1}
                    onClick={(e) => {
                      e.preventDefault();
                      go(hit);
                    }}
                    onMouseMove={() => setActive(i)}
                  >
                    <span className={s.crumb}>
                      {hit.section ? (
                        <>
                          <span>{hit.page}</span>
                          {hit.parent && hit.parent !== hit.section && <span>{hit.parent}</span>}
                          <strong>
                            <Marked text={hit.section} terms={terms} />
                          </strong>
                        </>
                      ) : (
                        <>
                          <span>{hit.group}</span>
                          <strong>
                            <Marked text={hit.page} terms={terms} />
                          </strong>
                        </>
                      )}
                    </span>
                    {hit.snippet && (
                      <span className={s.snippet}>
                        <Marked text={hit.snippet} terms={terms} />
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {typed && !listed && (
            <div className={s.noResults} role="status">
              {failed !== null ? (
                <p title={failed}>{t("Die Suche ist gerade nicht erreichbar.", "Search is not available right now.")}</p>
              ) : !index ? (
                <p>{t("Lädt …", "Loading …")}</p>
              ) : (
                <>
                  <p>
                    <strong>{t(`Nichts gefunden zu „${query.trim()}“.`, `Nothing found for “${query.trim()}”.`)}</strong>
                  </p>
                  {suggestions.length > 0 && (
                    <p className={s.suggestions}>
                      {t("Meintest du", "Did you mean")}{" "}
                      {suggestions.map((q, i) => (
                        <span key={q}>
                          {i > 0 && ", "}
                          <button type="button" onClick={() => (setQuery(q), setActive(0), input.current?.focus())}>
                            {q}
                          </button>
                        </span>
                      ))}
                      ?
                    </p>
                  )}
                  <p className={s.noResultsLinks}>
                    <a href={`${prefix || ""}/#alle-seiten`} onClick={close}>
                      {t("Alle Seiten ansehen", "Browse all pages")} <ArrowRight size={14} aria-hidden="true" />
                    </a>
                    <a href={issue} target="_blank" rel="noreferrer" data-umami-event="outbound" data-umami-event-target="github">
                      {t("Fehlt etwas? Issue auf GitHub öffnen", "Something missing? Open an issue on GitHub")}
                      <span className="sr-only"> ({t("öffnet in neuem Tab", "opens in a new tab")})</span>
                    </a>
                  </p>
                </>
              )}
            </div>
          )}
          {!typed && (
            <div className={s.searchStart}>
              <p>{t("Beliebt", "Popular")}</p>
              <ul>
                {popular.map((page) => (
                  <li key={page.slug}>
                    <a href={`${prefix}/${page.slug}`}>{page.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className={s.searchKeys} aria-hidden="true">
            <span>
              <kbd>↑</kbd> <kbd>↓</kbd> {t("auswählen", "select")}
            </span>
            <span>
              <kbd>↵</kbd> {t("öffnen", "open")}
            </span>
            <span>
              <kbd>Esc</kbd> {t("schließen", "close")}
            </span>
          </p>
        </div>
      </dialog>
  );
}
