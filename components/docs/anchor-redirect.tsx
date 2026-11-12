"use client";
import { useEffect } from "react";
import { resolveAnchor, type AnchorRow } from "@/lib/anchors";
import { useLocale, usePrefix } from "../i18n";

// On an old page: an anchor that is no longer here (its section moved to
// another page) leads to its new place (lib/anchors.ts). Anchors that still
// exist on the page are left alone.
export function AnchorRedirect({ slug, rows }: { slug: string; rows: AnchorRow[] }) {
  const locale = useLocale();
  const prefix = usePrefix();
  useEffect(() => {
    const follow = () => {
      let hash = location.hash.slice(1);
      try {
        hash = decodeURIComponent(hash);
      } catch {}
      if (!hash || document.getElementById(hash)) return;
      const target = resolveAnchor(rows, hash, locale);
      if (!target) return;
      const fragment = target.id ? `#${target.id}` : "";
      if (target.slug === slug) {
        if (fragment) location.replace(fragment);
      } else location.replace(`${prefix}/${target.slug}${fragment}`);
    };
    follow();
    window.addEventListener("hashchange", follow);
    return () => window.removeEventListener("hashchange", follow);
  }, [rows, slug, locale, prefix]);
  return null;
}
