// „Frag Flo“: what the button needs on every page (components/docs/flo.tsx);
// the rest of the contract is in lib/flo.ts, loaded with the panel.

// GET /api/status is cacheable for 60 s; the tab keeps its answer as long.
export const STATUS_MS = 60 * 1000;

// GET /api/status → { docs, discord, name }. Anything but docs: true hides
// the button (off, budget or global limit reached, error, junk).
export function statusAllowsDocs(data: unknown): boolean {
  return !!data && typeof data === "object" && (data as { docs?: unknown }).docs === true;
}
