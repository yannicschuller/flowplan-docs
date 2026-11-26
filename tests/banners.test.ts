// The announcement bar (lib/banners.ts): the website's list read
// defensively, kept a minute, nothing when the website does not answer,
// BANNERS_URL, and the bar's component without inline styles.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { bannersUrl, countdownText, fetchBanners, parseBanners, resetBanners } from "../lib/banners";

const ID = "6f1c2d3e-4b5a-4c6d-8e9f-0a1b2c3d4e5f";
const banner = { id: ID, version: 2, tone: "gradient", emoji: "🎉", lang: "de", title: "Black Friday", message: "30 % auf Pro", link: { label: "Zu den Tarifen", url: "https://billing.flowplan.org/preise" }, dismissible: true, countdown: true, endsAt: "2026-11-29T12:00:00.000Z" };

test("BANNERS_URL: the website by default, off, https only", () => {
  assert.equal(bannersUrl({}), "https://flowplan.org");
  assert.equal(bannersUrl({ WEBSITE_URL: "https://www.example.org/" }), "https://www.example.org");
  assert.equal(bannersUrl({ BANNERS_URL: "off" }), null);
  assert.equal(bannersUrl({ BANNERS_URL: "" }), null);
  assert.equal(bannersUrl({ BANNERS_URL: "http://flowplan.org" }), null);
  assert.equal(bannersUrl({ BANNERS_URL: "http://127.0.0.1:3001/x" }), "http://127.0.0.1:3001");
});

test("the list is read defensively", () => {
  assert.deepEqual(parseBanners({ banners: [banner] }), [banner]);
  const [b] = parseBanners({ banners: [{ ...banner, tone: "<x>", lang: "es", link: { label: "Go", url: "javascript:alert(1)" }, countdown: true, endsAt: null }] });
  assert.equal(b.tone, "info");
  assert.equal(b.lang, "en");
  assert.equal(b.link, null);
  assert.equal(b.countdown, false, "a countdown needs an end");
  assert.deepEqual(parseBanners({ banners: [{ ...banner, id: "../x" }, { ...banner, message: "" }, null, 5] }), []);
  assert.deepEqual(parseBanners("nope"), []);
  assert.equal(parseBanners({ banners: [{ ...banner, link: { label: "Docs", url: "/de/first-steps" } }] })[0].link?.url, "/de/first-steps");
});

test("fetched for the docs in the language, kept a minute, nothing when the website fails", async () => {
  resetBanners();
  let t = 0;
  const asked: string[] = [];
  const ok: typeof fetch = async (url) => {
    asked.push(String(url));
    return new Response(JSON.stringify({ banners: [banner] }), { status: 200 });
  };
  assert.equal((await fetchBanners("de", "https://flowplan.org", ok, () => t)).length, 1);
  assert.equal(asked[0], "https://flowplan.org/api/banners?site=docs&lang=de");
  await fetchBanners("de", "https://flowplan.org", ok, () => (t = 30_000));
  assert.equal(asked.length, 1, "kept a minute");
  await fetchBanners("en", "https://flowplan.org", ok, () => t);
  assert.equal(asked.length, 2, "per language");
  resetBanners();
  let calls = 0;
  const down: typeof fetch = async () => {
    calls++;
    throw new Error("unreachable");
  };
  assert.deepEqual(await fetchBanners("en", "https://flowplan.org", down, () => 0), []);
  assert.deepEqual(await fetchBanners("en", "https://flowplan.org", down, () => 10_000), []);
  assert.equal(calls, 1, "not asked again during the pause");
  resetBanners();
  const bad: typeof fetch = async () => new Response("<html>", { status: 200 });
  assert.deepEqual(await fetchBanners("en", "https://flowplan.org", bad, () => 0), []);
  assert.deepEqual(await fetchBanners("en", null, ok, () => 0), []);
  resetBanners();
});

test("countdown words as on the website", () => {
  assert.equal(countdownText("2026-11-29T12:00:00Z", "de", Date.parse("2026-11-26T12:00:00Z")), "noch 3 Tage");
  assert.equal(countdownText("2026-11-29T12:00:00Z", "en", Date.parse("2026-11-29T07:00:00Z")), "5 hours left");
});

test("the bar renders text only, no inline styles or HTML", () => {
  const source = readFileSync(new URL("../components/site-banner.tsx", import.meta.url), "utf8");
  assert.ok(!/dangerouslySetInnerHTML|style=\{/.test(source));
  assert.match(source, /sendBeacon/);
  assert.match(source, /localStorage/);
  assert.ok(!/document\.cookie/.test(source));
});
