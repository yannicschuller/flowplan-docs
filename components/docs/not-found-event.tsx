"use client";
import { useEffect, useRef } from "react";
import { notFoundPath, track } from "@/lib/track";

// Counts a missing page once, with its path only (no query, nothing that
// looks personal; lib/track.ts).
export function NotFoundEvent() {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    track("not-found", { path: notFoundPath(location.pathname) });
  }, []);
  return null;
}
