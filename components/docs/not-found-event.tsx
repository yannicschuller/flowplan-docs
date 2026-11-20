"use client";
import { useEffect, useRef } from "react";
import { notFoundPath, track } from "@/lib/track";

// Counts a missing page once, with its path only (no query, nothing that
// looks personal; lib/track.ts). In the docs layout on every page; it acts
// only where app/not-found.tsx marked the content data-not-found.
export function NotFoundEvent() {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current || !document.querySelector("#inhalt[data-not-found]")) return;
    sent.current = true;
    track("not-found", { path: notFoundPath(location.pathname) });
  }, []);
  return null;
}
