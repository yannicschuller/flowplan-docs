"use client";
import { lazy, Suspense, useEffect, useState } from "react";
import { useT } from "../i18n";
import { Icon, MAGNIFYING_GLASS } from "../icons";

// The search dialog (search-dialog.tsx) loads with its first opening (or
// when the pointer or focus comes near the field), so pages do not carry it
// in their first JavaScript. React.lazy rather than next/dynamic: the same
// split, without next/dynamic's loader in every page.
const loadDialog = () => import("./search-dialog");
const SearchDialog = lazy(loadDialog);

// The field in the header opens the search dialog; so do ⌘K / Ctrl+K and "/".
// misses: count searches without results (lib/search-misses.ts). className
// comes from the server (docs.module.css), so the stylesheet's class names
// stay out of this chunk.
export function DocsSearch({
  version,
  popular,
  misses = false,
  className,
}: {
  version: string;
  popular: { slug: string; title: string }[];
  misses?: boolean;
  className: string;
}) {
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
      <button type="button" className={className} onClick={() => setOpens((n) => n + 1)}
        // Fetched ahead when the pointer or focus comes near.
        onPointerEnter={() => void loadDialog()}
        onFocus={() => void loadDialog()}
        aria-haspopup="dialog" aria-keyshortcuts="Meta+K Control+K /">
        <Icon path={MAGNIFYING_GLASS} size={16} aria-hidden="true" />
        <span>{t("Doku durchsuchen", "Search docs")}</span>
        <kbd aria-hidden="true">{mac ? "⌘K" : "Ctrl K"}</kbd>
      </button>
      {opens > 0 && (
        <Suspense fallback={null}>
          <SearchDialog version={version} popular={popular} opens={opens} misses={misses} />
        </Suspense>
      )}
    </>
  );
}
