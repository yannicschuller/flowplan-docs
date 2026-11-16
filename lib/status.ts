// The state of Flowplan's hosted services for the footer: the summary the
// status page publishes (yannicschuller/flowplan-status, branch status-data,
// at most ~10 minutes old). Loaded on the server with a short revalidation,
// so the page needs no script and no CSP change and nothing jumps.
// Anything unexpected – no answer within 3 s, invalid JSON, an unknown
// state, a summary older than 30 minutes – gives `null`, and the footer
// shows the plain "Status" link instead. A failure never fails or slows
// the page more than once per pause (see `pausedUntil`).

export const STATUS_SUMMARY_DEFAULT =
  "https://raw.githubusercontent.com/yannicschuller/flowplan-status/status-data/summary.json";

export const STATUS_STATES = ["operational", "degraded", "partial_outage", "major_outage", "maintenance"] as const;
export type StatusState = (typeof STATUS_STATES)[number];

export type StatusSummary = { state: StatusState; updatedAt: string };

// Older than this, the summary no longer says anything about now.
export const MAX_AGE_MS = 30 * 60 * 1000;
const TIMEOUT_MS = 3000;
// Revalidation of the fetched summary (seconds), within the 2–5 minutes the
// status page allows.
const REVALIDATE_S = 180;
// After a failed fetch, don't try again for this long: a source that hangs
// would otherwise add the timeout to every page view.
const PAUSE_MS = 2 * 60 * 1000;

// STATUS_SUMMARY_URL changes the source (https only); empty, "off" or
// "false" turns the coloured state off (the plain link stays).
export function statusSummaryUrl(env: Record<string, string | undefined> = process.env): string | null {
  const value = env.STATUS_SUMMARY_URL;
  if (value === undefined) return STATUS_SUMMARY_DEFAULT;
  const trimmed = value.trim();
  if (!trimmed || /^(off|false|0|no)$/i.test(trimmed)) return null;
  return /^https:\/\/\S+$/i.test(trimmed) ? trimmed : null;
}

// Validates a parsed summary: a known state and a recent, valid updatedAt.
export function parseStatusSummary(data: unknown, now: number = Date.now()): StatusSummary | null {
  if (!data || typeof data !== "object") return null;
  const { status, updatedAt } = data as { status?: unknown; updatedAt?: unknown };
  if (typeof status !== "string" || !(STATUS_STATES as readonly string[]).includes(status)) return null;
  if (typeof updatedAt !== "string") return null;
  const at = Date.parse(updatedAt);
  if (!Number.isFinite(at)) return null;
  // A clock a little ahead is fine; a time far in the future is not.
  if (now - at > MAX_AGE_MS || at - now > 5 * 60 * 1000) return null;
  return { state: status as StatusState, updatedAt };
}

let pausedUntil = 0;

export async function fetchStatusSummary(
  url: string | null = statusSummaryUrl(),
  fetcher: typeof fetch = fetch,
  now: () => number = Date.now,
): Promise<StatusSummary | null> {
  if (!url || now() < pausedUntil) return null;
  try {
    const response = await fetcher(url, {
      next: { revalidate: REVALIDATE_S },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { accept: "application/json" },
    } as RequestInit);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    // The summary is small; a much larger answer is not it.
    const text = await response.text();
    if (text.length > 100_000) throw new Error("too large");
    return parseStatusSummary(JSON.parse(text), now());
  } catch {
    pausedUntil = now() + PAUSE_MS;
    return null;
  }
}

// For tests.
export function resetStatusPause() {
  pausedUntil = 0;
}
