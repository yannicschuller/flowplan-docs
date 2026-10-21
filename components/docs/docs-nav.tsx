"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { List, MagnifyingGlass, X } from "@phosphor-icons/react";
import type { DocGroup, DocSearchEntry } from "@/lib/docs";
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
  const current = groups.flatMap((g) => g.pages).find((p) => path === `/${p.slug}`);
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

const fold = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ß/g, "ss");

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

  const results = useMemo(() => {
    const words = fold(query).split(/\s+/).filter(Boolean);
    if (!words.length || !index) return [];
    const hits: { href: string; title: string; context: string; snippet?: string; score: number }[] = [];
    const all = (text: string) => words.every((w) => text.includes(w));
    // A short excerpt around the first matching word.
    const excerpt = (text: string) => {
      const at = fold(text).indexOf(words[0]);
      if (at < 0) return undefined;
      const start = Math.max(0, text.lastIndexOf(" ", Math.max(0, at - 40)) + 1);
      return (start > 0 ? "… " : "") + text.slice(start, start + 110).trim() + (start + 110 < text.length ? " …" : "");
    };
    for (const page of index) {
      if (all(fold(`${page.title} ${page.summary}`)))
        hits.push({
          href: `${prefix}/${page.slug}`,
          title: page.title,
          context: page.group,
          score: all(fold(page.title)) ? 0 : 2,
        });
      else if (all(fold(page.text)))
        hits.push({
          href: `${prefix}/${page.slug}`,
          title: page.title,
          context: page.group,
          snippet: excerpt(page.text),
          score: 4,
        });
      for (const section of page.sections) {
        const heading = fold(`${section.text} ${page.title}`);
        if (all(heading))
          hits.push({
            href: `${prefix}/${page.slug}#${section.id}`,
            title: section.text,
            context: page.title,
            score: all(fold(section.text)) ? 1 : 3,
          });
        else if (all(fold(`${section.text} ${section.body}`)))
          hits.push({
            href: `${prefix}/${page.slug}#${section.id}`,
            title: section.text,
            context: page.title,
            snippet: excerpt(section.body),
            score: 5,
          });
      }
    }
    return hits.sort((a, b) => a.score - b.score).slice(0, 10);
  }, [index, query, prefix]);

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
            location.assign(results[active].href);
            close();
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
              <a href={hit.href} tabIndex={-1} onClick={close} onMouseEnter={() => setActive(i)}>
                <strong>{hit.title}</strong>
                <small>{hit.context}</small>
                {hit.snippet && <span>{hit.snippet}</span>}
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
