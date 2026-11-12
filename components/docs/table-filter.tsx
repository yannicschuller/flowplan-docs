"use client";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useT } from "../i18n";
import { filterWords, rowMatches } from "@/lib/table-filter";
import s from "./docs.module.css";

// The filter field above the tables of a reference page: every word typed
// must appear in a row (umlauts, case and ⌘/Cmd/Strg/Ctrl alike); rows that
// do not match are hidden, and so is every section without a matching
// row (text-only sections too). ?filter=… in the address fills the
// field, so a link can lead to a row. Escape clears it.
export default function TableFilter({ slug }: { slug: string }) {
  const t = useT();
  const id = useId();
  const [query, setQuery] = useState("");
  const [count, setCount] = useState<{ shown: number; total: number }>({ shown: 0, total: 0 });
  // The place above the first table (app/(docs)/[slug]/page.tsx).
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  useEffect(() => setSlot(document.getElementById("table-filter")), [slug]);
  useEffect(() => {
    const initial = new URLSearchParams(location.search).get("filter");
    if (initial) setQuery(initial.slice(0, 100));
  }, [slug]);
  useEffect(() => {
    const prose = document.querySelector<HTMLElement>("#inhalt [data-prose]");
    if (!prose) return;
    const words = filterWords(query);
    let shown = 0,
      total = 0;
    for (const table of prose.querySelectorAll<HTMLElement>(":scope > .table")) {
      let visible = 0;
      for (const row of table.querySelectorAll<HTMLTableRowElement>("tbody tr")) {
        total++;
        const on = rowMatches([...row.cells].map((c) => c.textContent).join(" "), words);
        row.hidden = !on;
        if (on) visible++;
      }
      table.dataset.empty = String(visible === 0);
      shown += visible;
    }
    // Sections (from one heading to the next) with tables but no row left.
    let section: HTMLElement[] = [];
    const close = () => {
      const tables = section.filter((el) => el.classList.contains("table"));
      // While filtering, a section shows only for its matching rows; text
      // before the first heading stays.
      const heading = section.length > 0 && /^H[23]$/.test(section[0].tagName);
      const hide = words.length > 0 && heading && tables.every((el) => el.dataset.empty === "true");
      for (const el of section) el.hidden = hide;
      // The section's entry in "On this page" goes with it.
      const id = section[0]?.id;
      if (id && /^H[23]$/.test(section[0].tagName))
        for (const link of document.querySelectorAll<HTMLAnchorElement>(`[data-toc] a[href="#${CSS.escape(id)}"]`)) link.parentElement!.hidden = hide;
      section = [];
    };
    for (const el of [...prose.children] as HTMLElement[]) {
      if (el.id === "table-filter") continue;
      if (/^H[23]$/.test(el.tagName)) close();
      section.push(el);
    }
    close();
    setCount({ shown, total });
    const url = new URL(location.href);
    if (words.length) url.searchParams.set("filter", query);
    else url.searchParams.delete("filter");
    if (url.href !== location.href) history.replaceState(history.state, "", url);
    window.dispatchEvent(new Event("docs:filtered"));
  }, [query, slug]);
  const active = filterWords(query).length > 0;
  if (!slot) return null;
  return createPortal(
    <div className={s.filter} role="search">
      <label htmlFor={id}>{t("Tabelle filtern", "Filter the table")}</label>
      <div className={s.filterField}>
        <MagnifyingGlass size={16} aria-hidden="true" />
        <input
          id={id}
          type="search"
          value={query}
          autoComplete="off"
          spellCheck={false}
          placeholder={t("Name, Kürzel oder Stichwort", "Name, key or keyword")}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && query) {
              e.preventDefault();
              setQuery("");
            }
          }}
        />
      </div>
      <p aria-live="polite" className={s.filterCount}>
        {active
          ? count.shown
            ? t(`${count.shown} von ${count.total} Zeilen`, `${count.shown} of ${count.total} rows`)
            : t("Keine Zeile passt.", "No row matches.")
          : t(`${count.total} Zeilen`, `${count.total} rows`)}
      </p>
    </div>,
    slot,
  );
}
