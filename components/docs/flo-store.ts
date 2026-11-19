"use client";
// Shared between the „Frag Flo“ button (flo.tsx), its panel (flo-panel.tsx)
// and the search dialog: whether Flo is available here, and requests to
// open the panel with a question ("Flo fragen: …" in the search). Kept in
// memory only.
import { useSyncExternalStore } from "react";

type State = { available: boolean; ask: { query: string; n: number } | null };
let state: State = { available: false, ask: null };
const listeners = new Set<() => void>();
const emit = (next: Partial<State>) => {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const setFloAvailable = (available: boolean) => state.available !== available && emit({ available });
// Opens the panel with this question in the box (sent only by the reader).
export const askFlo = (query = "") => emit({ ask: { query: query.trim(), n: (state.ask?.n ?? 0) + 1 } });
export function useFlo() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => state,
  );
}

// sessionStorage – per tab, gone when the tab closes; may be blocked.
export function readSession(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
export function writeSession(key: string, value: string | null) {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, value);
  } catch {}
}
export const FLO_KEYS = { status: "flo:status", session: "flo:session", turns: "flo:turns", max: "flo:max" } as const;
