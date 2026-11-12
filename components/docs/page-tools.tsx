"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// "On this page" follows the reading position: the link of the section at
// the top of the window gets aria-current="location" (both lists – the
// sticky one beside the article and the folded one on small screens) and
// stays in view inside the sticky list. Without JavaScript the lists are
// plain links.
export function TocSpy({ slug }: { slug: string }) {
  useEffect(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>("[data-toc] a[href^='#']")];
    const ids = [...new Set(links.map((a) => decodeURIComponent(a.hash.slice(1))))];
    const headings = ids.map((id) => document.getElementById(id)).filter((h): h is HTMLElement => !!h);
    if (!headings.length) return;
    let frame = 0,
      current: string | undefined;
    const update = () => {
      frame = 0;
      // A heading counts once it is in the upper part of the window – where
      // a click in the list puts it (scroll-padding-top in docs.module.css).
      const line = Math.max(140, window.innerHeight * 0.3);
      let active: HTMLElement | undefined;
      for (const h of headings) {
        if (!h.offsetParent) continue;
        if (h.getBoundingClientRect().top <= line) active = h;
        else break;
      }
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (bottom) active = headings.filter((h) => h.offsetParent && h.getBoundingClientRect().top < window.innerHeight).at(-1) ?? active;
      const id = active?.id;
      if (id === current) return;
      current = id;
      for (const a of links) {
        const on = id !== undefined && decodeURIComponent(a.hash.slice(1)) === id;
        if (on) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
        // Keep the active link visible in the sticky list.
        const box = on ? a.closest<HTMLElement>("[data-toc='side']")?.parentElement : null;
        if (box && box.scrollHeight > box.clientHeight) {
          const top = a.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop;
          if (top < box.scrollTop || top > box.scrollTop + box.clientHeight - 40) box.scrollTop = top - box.clientHeight / 3;
        }
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    // The table filter hides sections; the positions change.
    window.addEventListener("docs:filtered", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      window.removeEventListener("docs:filtered", schedule);
    };
  }, [slug]);
  return null;
}

// The filter field of the reference pages (table-filter.tsx) loads only on
// those pages, in its own small chunk; without JavaScript the tables stand
// as they are.
const TableFilter = dynamic(() => import("./table-filter"), { ssr: false });
export function TableFilterSlot({ slug }: { slug: string }) {
  return <TableFilter slug={slug} />;
}
