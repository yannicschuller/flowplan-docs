"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { List, MagnifyingGlass, X } from "@phosphor-icons/react";
import type { AreaId, DocArea } from "@/lib/docs";
import { usePrefix, useT } from "../i18n";
import s from "./docs.module.css";

// Sidebar of the documentation: the three areas as tabs, the groups of one
// area below; on small screens it folds into a menu. The area shown is the
// current page's, until the reader picks another one.
export function DocsNav({ areas }: { areas: DocArea[] }) {
  const t = useT();
  const prefix = usePrefix();
  // The address without /de or /en.
  const path = usePathname().replace(/^\/(de|en)(?=\/|$)/, "") || "/";
  const [open, setOpen] = useState(false);
  const pageArea = areas.find((a) => a.groups.some((g) => g.pages.some((p) => path === `/${p.slug}`)))?.id;
  const [chosen, setChosen] = useState<AreaId | undefined>(undefined);
  useEffect(() => {
    setOpen(false);
    setChosen(undefined);
  }, [path]);
  // The current page's link in view in the sidebar, without moving the page.
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = list.current?.closest("nav");
    const link = list.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!box || !link || box.scrollHeight <= box.clientHeight) return;
    const top = link.getBoundingClientRect().top - box.getBoundingClientRect().top;
    if (top > box.clientHeight - 60) box.scrollTop += top - box.clientHeight / 3;
  }, [path]);
  const shown = areas.find((a) => a.id === (chosen ?? pageArea ?? "use")) ?? areas[0];
  const whatsNew = t("Was ist neu", "What's new");
  const current =
    areas.flatMap((a) => a.groups.flatMap((g) => g.pages)).find((p) => path === `/${p.slug}`) ?? (path === "/whats-new" ? { title: whatsNew } : undefined);
  return (
    <nav className={s.nav} aria-label={t("Dokumentation", "Documentation")} data-open={open}>
      <button type="button" className={s.navToggle} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X size={18} /> : <List size={18} />}
        <span>{current?.title || t("Übersicht", "Overview")}</span>
      </button>
      <div className={s.navList} ref={list}>
        <a href={prefix || "/"} aria-current={path === "/" ? "page" : undefined}>
          {t("Übersicht", "Overview")}
        </a>
        <a href={`${prefix}/whats-new`} aria-current={path === "/whats-new" ? "page" : undefined}>
          {whatsNew}
        </a>
        <div className={s.areaTabs} role="group" aria-label={t("Bereich der Dokumentation", "Part of the documentation")}>
          {areas.map((area) => (
            <button key={area.id} type="button" aria-pressed={area.id === shown.id} onClick={() => setChosen(area.id)} title={area.title}>
              {area.short}
            </button>
          ))}
        </div>
        {shown.groups.map((group) => (
          <div key={group.title} className={s.navGroup}>
            <p>{group.title}</p>
            {group.pages.map((page) => (
              <a key={page.slug} href={`${prefix}/${page.slug}`} aria-current={path === `/${page.slug}` ? "page" : undefined}>
                {page.title}
              </a>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}

// The search dialog (search-dialog.tsx) loads with its first opening, so
// pages do not carry it in their first JavaScript.
const loadDialog = () => import("./search-dialog");
const SearchDialog = dynamic(loadDialog, { ssr: false });

// The field in the header opens the search dialog; so do ⌘K / Ctrl+K and "/".
export function DocsSearch({ version, popular }: { version: string; popular: { slug: string; title: string }[] }) {
  const t = useT();
  const [opens, setOpens] = useState(0);
  const [mac, setMac] = useState(true);
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)), []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const typing = target.closest("input, textarea, select, [contenteditable]");
      if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpens((n) => n + 1);
      } else if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setOpens((n) => n + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <>
      <button type="button" className={s.search} onClick={() => setOpens((n) => n + 1)}
        // Fetched ahead when the pointer or focus comes near.
        onPointerEnter={() => void loadDialog()}
        onFocus={() => void loadDialog()}
        aria-haspopup="dialog" aria-keyshortcuts="Meta+K Control+K /">
        <MagnifyingGlass size={16} aria-hidden="true" />
        <span>{t("Doku durchsuchen", "Search docs")}</span>
        <kbd aria-hidden="true">{mac ? "⌘K" : "Ctrl K"}</kbd>
      </button>
      {opens > 0 && <SearchDialog version={version} popular={popular} opens={opens} />}
    </>
  );
}
