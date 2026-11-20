"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon, LIST, X } from "../icons";

// The interactive part of the sidebar (docs-nav.tsx renders the links on
// the server): the menu button on small screens and the area tabs, which
// show one area's groups – the current page's, until the reader picks
// another one. The links arrive as finished elements, so they cost no
// JavaScript here; the docs pages are plain links (full page loads), so the
// state starts afresh on every page.
export type NavClasses = { nav: string; toggle: string; list: string; tabs: string };
export function NavMenu({
  label,
  current,
  tabsLabel,
  areas,
  initial,
  top,
  panels,
  classes,
}: {
  label: string;
  // The current page's title on the menu button.
  current: string;
  tabsLabel: string;
  areas: { id: string; short: string; title: string }[];
  initial: string;
  // "Overview" and "What's new" above the tabs.
  top: ReactNode;
  // The groups of each area, by area id.
  panels: Record<string, ReactNode>;
  classes: NavClasses;
}) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(initial);
  // The current page's link in view in the sidebar, without moving the page.
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = list.current?.closest("nav");
    const link = list.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!box || !link || box.scrollHeight <= box.clientHeight) return;
    const top = link.getBoundingClientRect().top - box.getBoundingClientRect().top;
    if (top > box.clientHeight - 60) box.scrollTop += top - box.clientHeight / 3;
  }, []);
  return (
    <nav className={classes.nav} aria-label={label} data-open={open}>
      <button type="button" className={classes.toggle} aria-expanded={open} onClick={() => setOpen(!open)}>
        <Icon path={open ? X : LIST} size={18} aria-hidden="true" />
        <span>{current}</span>
      </button>
      <div className={classes.list} ref={list}>
        {top}
        <div className={classes.tabs} role="group" aria-label={tabsLabel}>
          {areas.map((area) => (
            <button key={area.id} type="button" aria-pressed={area.id === shown} onClick={() => setShown(area.id)} title={area.title}>
              {area.short}
            </button>
          ))}
        </div>
        {panels[shown]}
      </div>
    </nav>
  );
}
