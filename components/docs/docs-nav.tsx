"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { List, MagnifyingGlass, X } from "@phosphor-icons/react";
import type { DocGroup, DocSearchEntry } from "@/lib/docs";
import { excerpt, expandWord, fold, highlight } from "@/lib/search";
import { resultBucket, searchTerm, track } from "@/lib/track";
import { useLocale, usePrefix, useT } from "../i18n";
import s from "./docs.module.css";

// Sidebar of the documentation; on small screens it folds into a menu.
export function DocsNav({ groups }: { groups: DocGroup[] }) {
  const t = useT();
  const prefix = usePrefix();
  // The address without /de or /en.
  const path = usePathname().replace(/^\/(de|en)(?=\/|$)/, "") || "/";
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const whatsNew = t("Was ist neu", "What's new");
  const current = groups.flatMap((g) => g.pages).find((p) => path === `/${p.slug}`) ?? (path === "/whats-new" ? { title: whatsNew } : undefined);
  return (
    <nav className={s.nav} aria-label={t("Dokumentation", "Documentation")} data-open={open}>
      <button
        type="button"
        className={s.navToggle}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={18} /> : <List size={18} />}
        <span>{current?.title || t("Übersicht", "Overview")}</span>
      </button>
      <div className={s.navList}>
        <a href={prefix || "/"} aria-current={path === "/" ? "page" : undefined}>
          {t("Übersicht", "Overview")}
        </a>
        <a href={`${prefix}/whats-new`} aria-current={path === "/whats-new" ? "page" : undefined}>
          {whatsNew}
        </a>
        {groups.map((group) => (
          <div key={group.title} className={s.navGroup}>
            <p>{group.title}</p>
            {group.pages.map((page) => (
              <a
                key={page.slug}
                href={`${prefix}/${page.slug}`}
                aria-current={path === `/${page.slug}` ? "page" : undefined}
              >
                {page.title}
              </a>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}

// Marks the matched terms of a title or snippet.
function Marked({ text, terms }: { text: string; terms: string[] }) {
  return (
    <>
      {highlight(text, terms).map((piece, i) => (piece.hit ? <mark key={i}>{piece.text}</mark> : piece.text))}
    </>
  );
}

const LISTBOX_ID = "docs-search-results";
const optionId = (i: number) => `docs-search-option-${i}`;

// Search over page titles, summaries, section headings and text. "/" focuses
// it. The index of all pages is fetched once, when the box is first focused
// (version: a fingerprint of the content, so the response can be cached).
export function DocsSearch({ version }: { version: string }) {
  const t = useT();
  const locale = useLocale();
  const prefix = usePrefix();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState<DocSearchEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const loading = useRef(false);
  const input = useRef<HTMLInputElement>(null);
  // Search terms already counted on this page view (lib/track.ts).
  const reported = useRef(new Set<string>());

  const load = useCallback(() => {
    if (loading.current) return;
    loading.current = true;
    fetch(`/api/search-index/${locale}?v=${encodeURIComponent(version)}`)
      .then((r) => (r.ok ? (r.json() as Promise<DocSearchEntry[]>) : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        setIndex(data);
        setFailed(false);
      })
      .catch(() => {
        // Try again on the next focus.
        loading.current = false;
        setFailed(true);
      });
  }, [locale, version]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key !== "/" || target.closest("input, textarea, [contenteditable]")) return;
      event.preventDefault();
      input.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Each query word stands for itself and its synonyms (lib/search.ts):
  // "login" also finds "Anmeldung", whose synonyms the index lists under
  // "keywords". All words have to match; the snippet marks every hit.
  const { results, terms } = useMemo(() => {
    const words = fold(query).split(/\s+/).filter(Boolean);
    if (!words.length || !index) return { results: [], terms: [] };
    const expanded = words.map(expandWord);
    const terms = [...new Set(expanded.flat())];
    const hits: { href: string; slug: string; title: string; context: string; snippet?: string; score: number }[] = [];
    const all = (text: string) => words.every((w) => text.includes(w));
    // Synonyms count only after the words themselves: in a title through the
    // expanded query, in a text through the keywords of the index.
    const named = (text: string) => expanded.every((alternatives) => alternatives.some((t) => text.includes(t)));
    const loose = (text: string, keywords: string) => all(`${text} ${keywords}`);
    for (const page of index) {
      const head = fold(`${page.title} ${page.summary}`);
      const body = fold(page.text);
      if (all(head) || named(fold(page.title)))
        hits.push({ href: `${prefix}/${page.slug}`, slug: page.slug, title: page.title, context: page.group, score: all(fold(page.title)) ? 0 : all(head) ? 2 : 2.5 });
      else if (all(body) || loose(`${head} ${body}`, page.keywords))
        hits.push({
          href: `${prefix}/${page.slug}`,
          slug: page.slug,
          title: page.title,
          context: page.group,
          snippet: excerpt(page.text, terms) ?? excerpt(page.summary, terms),
          score: all(body) ? 4 : 6,
        });
      for (const section of page.sections) {
        const heading = fold(`${section.text} ${page.title}`);
        const text = fold(`${section.text} ${section.body}`);
        if (all(heading) || named(fold(section.text)))
          hits.push({
            href: `${prefix}/${page.slug}#${section.id}`,
            slug: page.slug,
            title: section.text,
            context: page.title,
            score: all(fold(section.text)) ? 1 : all(heading) ? 3 : 3.5,
          });
        else if (all(text) || loose(text, section.keywords))
          hits.push({
            href: `${prefix}/${page.slug}#${section.id}`,
            slug: page.slug,
            title: section.text,
            context: page.title,
            snippet: excerpt(section.body, terms),
            score: all(text) ? 5 : 7,
          });
      }
    }
    return { results: hits.sort((a, b) => a.score - b.score).slice(0, 10), terms };
  }, [index, query, prefix]);

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
  const opened = (slug: string) => {
    report();
    return track("search-open", { slug });
  };

  const open = query.trim().length > 0;
  const listed = open && results.length > 0;
  const close = () => {
    setQuery("");
    setActive(0);
  };
  return (
    <div className={s.search}>
      <MagnifyingGlass size={16} aria-hidden="true" />
      <input
        ref={input}
        type="search"
        role="combobox"
        autoComplete="off"
        placeholder={t("Doku durchsuchen", "Search docs")}
        aria-label={t("Dokumentation durchsuchen", "Search the documentation")}
        aria-expanded={listed}
        aria-controls={listed ? LISTBOX_ID : undefined}
        aria-activedescendant={listed && results[active] ? optionId(active) : undefined}
        aria-autocomplete="list"
        value={query}
        onFocus={load}
        onChange={(e) => {
          load();
          setQuery(e.target.value);
          setActive(0);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            if (!results.length) return;
            e.preventDefault();
            const step = e.key === "ArrowDown" ? 1 : -1;
            setActive((i) => (i + step + results.length) % results.length);
          } else if (e.key === "Home" && results.length) {
            e.preventDefault();
            setActive(0);
          } else if (e.key === "End" && results.length) {
            e.preventDefault();
            setActive(results.length - 1);
          } else if (e.key === "Enter" && results[active]) {
            e.preventDefault();
            const href = results[active].href;
            opened(results[active].slug).then(() => location.assign(href));
            close();
          } else if (e.key === "Enter") {
            report();
          } else if (e.key === "Escape") {
            if (open) e.preventDefault();
            close();
          }
        }}
      />
      <kbd aria-hidden="true">/</kbd>
      {listed && (
        <ul className={s.results} role="listbox" id={LISTBOX_ID} aria-label={t("Treffer", "Results")}>
          {results.map((hit, i) => (
            <li key={hit.href} role="option" id={optionId(i)} aria-selected={i === active}>
              <a
                href={hit.href}
                tabIndex={-1}
                onClick={() => {
                  opened(hit.slug);
                  close();
                }}
                onMouseEnter={() => setActive(i)}
              >
                <strong>
                  <Marked text={hit.title} terms={terms} />
                </strong>
                <small>{hit.context}</small>
                {hit.snippet && (
                  <span>
                    <Marked text={hit.snippet} terms={terms} />
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
      {open && !listed && (
        <div className={s.results} role="status">
          <p className={s.noHits}>
            {failed
              ? t("Die Suche ist gerade nicht erreichbar.", "Search is not available right now.")
              : index
                ? t("Nichts gefunden.", "Nothing found.")
                : t("Lädt …", "Loading …")}
          </p>
        </div>
      )}
    </div>
  );
}
