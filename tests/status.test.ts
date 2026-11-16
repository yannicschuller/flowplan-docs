// The services' state in the footer (lib/status.ts): only a valid, recent
// summary counts; anything else shows the plain link, and a source that
// fails is not asked again for a while.
import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchStatusSummary, MAX_AGE_MS, parseStatusSummary, resetStatusPause, statusSummaryUrl, STATUS_SUMMARY_DEFAULT } from "../lib/status";

const NOW = Date.parse("2026-11-16T12:00:00Z");
const fresh = { status: "operational", updatedAt: "2026-11-16T11:55:00Z", url: "https://status.flowplan.org", services: { app: "up" }, incidents: [], maintenance: [] };

test("a recent summary with a known state is used", () => {
  for (const status of ["operational", "degraded", "partial_outage", "major_outage", "maintenance"])
    assert.deepEqual(parseStatusSummary({ ...fresh, status }, NOW), { state: status, updatedAt: fresh.updatedAt });
});

test("unknown states, broken data and old or future times are ignored", () => {
  assert.equal(parseStatusSummary({ ...fresh, status: "on_fire" }, NOW), null);
  assert.equal(parseStatusSummary({ ...fresh, updatedAt: "yesterday-ish" }, NOW), null);
  assert.equal(parseStatusSummary({ status: "operational" }, NOW), null);
  assert.equal(parseStatusSummary(null, NOW), null);
  assert.equal(parseStatusSummary("operational", NOW), null);
  assert.equal(parseStatusSummary({ ...fresh, updatedAt: new Date(NOW - MAX_AGE_MS - 1000).toISOString() }, NOW), null);
  assert.equal(parseStatusSummary({ ...fresh, updatedAt: new Date(NOW + 60 * 60 * 1000).toISOString() }, NOW), null);
});

test("STATUS_SUMMARY_URL changes or turns off the source", () => {
  assert.equal(statusSummaryUrl({}), STATUS_SUMMARY_DEFAULT);
  assert.equal(statusSummaryUrl({ STATUS_SUMMARY_URL: "off" }), null);
  assert.equal(statusSummaryUrl({ STATUS_SUMMARY_URL: "" }), null);
  assert.equal(statusSummaryUrl({ STATUS_SUMMARY_URL: "http://insecure.example/s.json" }), null);
  assert.equal(statusSummaryUrl({ STATUS_SUMMARY_URL: "https://example.org/s.json" }), "https://example.org/s.json");
});

const answer = (body: string, status = 200) => (async () => new Response(body, { status })) as unknown as typeof fetch;

test("a good answer gives the state", async () => {
  resetStatusPause();
  assert.deepEqual(await fetchStatusSummary("https://x.test/s.json", answer(JSON.stringify(fresh)), () => NOW), {
    state: "operational",
    updatedAt: fresh.updatedAt,
  });
});

test("an unreachable or broken source gives null and pauses further tries", async () => {
  resetStatusPause();
  let calls = 0;
  const failing = (async () => {
    calls++;
    throw new Error("network down");
  }) as unknown as typeof fetch;
  assert.equal(await fetchStatusSummary("https://x.test/s.json", failing, () => NOW), null);
  assert.equal(await fetchStatusSummary("https://x.test/s.json", failing, () => NOW + 60_000), null);
  assert.equal(calls, 1, "no second try during the pause");
  // After the pause, the next page view asks again.
  assert.equal((await fetchStatusSummary("https://x.test/s.json", answer(JSON.stringify(fresh)), () => NOW + 3 * 60_000))?.state, "operational");
});

test("an error status or invalid JSON gives null", async () => {
  resetStatusPause();
  assert.equal(await fetchStatusSummary("https://x.test/s.json", answer("not found", 404), () => NOW), null);
  resetStatusPause();
  assert.equal(await fetchStatusSummary("https://x.test/s.json", answer("{oops"), () => NOW), null);
  resetStatusPause();
  assert.equal(await fetchStatusSummary(null, answer(JSON.stringify(fresh)), () => NOW), null, "turned off");
});
