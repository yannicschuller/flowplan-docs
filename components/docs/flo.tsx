"use client";
// The „Frag Flo“ button, bottom right – loaded by flo-entry.tsx once the
// service says it answers on the docs. Everything else – the panel, the
// conversation, the note when Flo stops – is in flo-panel.tsx, loaded with
// the first click (or when the pointer comes near); the search's "Flo
// fragen: …" opens it too (flo-store.ts).
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useT } from "../i18n";
import { FLO_KEYS, setFloAvailable, useFlo, writeSession } from "./flo-store";
import s from "./flo.module.css";

const loadPanel = () => import("./flo-panel");
const FloPanel = lazy(loadPanel);

export function Flo({ askUrl }: { askUrl: string }) {
  const t = useT();
  const { available, ask } = useFlo();
  const [open, setOpen] = useState(false);
  // What the panel should ask: the search's query, or nothing for the button.
  const [request, setRequest] = useState<{ query: string; n: number } | null>(null);
  const button = useRef<HTMLButtonElement>(null);

  // "Flo fragen: …" in the search.
  const lastAsk = useRef(0);
  useEffect(() => {
    if (!ask || ask.n === lastAsk.current || !available) return;
    lastAsk.current = ask.n;
    setRequest((r) => ({ query: ask.query, n: (r?.n ?? 0) + 1 }));
    setOpen(true);
  }, [ask, available]);

  // Closed by the reader: focus back on the button, once it is visible again.
  const returnFocus = useRef(false);
  const close = useCallback(() => {
    returnFocus.current = true;
    setOpen(false);
  }, []);
  useEffect(() => {
    if (open || !returnFocus.current) return;
    returnFocus.current = false;
    button.current?.focus();
  }, [open]);
  // The service stopped answering on the docs: the panel closes and says
  // why, the button goes – for this tab, until the status says otherwise.
  const stopped = useCallback(() => {
    setOpen(false);
    setFloAvailable(false);
    writeSession(FLO_KEYS.status, JSON.stringify({ docs: false, at: Date.now() }));
  }, []);

  return (
    <>
      {available && (
        <button
          ref={button}
          type="button"
          className={s.launcher}
          aria-haspopup="dialog"
          aria-expanded={open}
          onPointerEnter={() => void loadPanel()}
          onFocus={() => void loadPanel()}
          onClick={() => {
            setRequest((r) => ({ query: "", n: (r?.n ?? 0) + 1 }));
            setOpen(true);
          }}
        >
          {/* public/flo-otter.svg: the same drawing as flo-otter.tsx, light and dark. */}
          <img src="/flo-otter.svg" width={30} height={30} alt="" className={s.otter} />
          <span>{t("Frag Flo", "Ask Flo")}</span>
        </button>
      )}
      {request && (
        <Suspense fallback={null}>
          <FloPanel askUrl={askUrl} open={open && available} request={request} onClose={close} onStop={stopped} />
        </Suspense>
      )}
    </>
  );
}
