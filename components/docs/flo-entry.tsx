"use client";
// „Frag Flo“ on every page – as little as possible: ask the service (ASK_URL,
// lib/flo.ts) on GET /api/status whether it answers on the docs (`docs:
// true`), once the page has loaded, without cookies, remembered in the tab
// for a minute. Only then is the button (flo.tsx) loaded; off, budget or
// global limit reached, an error or no answer: nothing more is loaded and
// no button shows.
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { STATUS_MS, statusAllowsDocs } from "@/lib/flo-status";
import { FLO_KEYS, readSession, setFloAvailable, useFlo, writeSession } from "./flo-store";

const Flo = dynamic(() => import("./flo").then((m) => m.Flo), { ssr: false });

export function FloEntry({ askUrl }: { askUrl: string }) {
  const { available } = useFlo();
  // Once loaded, the button stays mounted: it hides itself, and its panel
  // can still say why Flo stopped.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (available) setLoaded(true);
  }, [available]);

  useEffect(() => {
    let cancelled = false;
    try {
      const { docs, at } = JSON.parse(readSession(FLO_KEYS.status) || "null") as { docs: boolean; at: number };
      if (typeof at === "number" && Date.now() - at < STATUS_MS && Date.now() >= at) {
        setFloAvailable(docs === true);
        return;
      }
    } catch {}
    const controller = new AbortController();
    // After the page has settled: the button is not what the reader came for.
    const timer = setTimeout(() => {
      const timeout = setTimeout(() => controller.abort(), 5000);
      fetch(`${askUrl}/api/status`, { credentials: "omit", referrerPolicy: "no-referrer", signal: controller.signal })
        .then((r) => (r.ok ? r.json() : null))
        .then(statusAllowsDocs)
        .catch(() => false)
        .then((docs) => {
          clearTimeout(timeout);
          if (cancelled) return;
          writeSession(FLO_KEYS.status, JSON.stringify({ docs, at: Date.now() }));
          setFloAvailable(docs);
        });
    }, 800);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [askUrl]);

  return loaded ? <Flo askUrl={askUrl} /> : null;
}
