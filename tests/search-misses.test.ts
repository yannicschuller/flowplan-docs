// Searches without results (#366, lib/search-misses.ts): only a normalised
// term, its language and a counter; capped, rate-limited, off without a token.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRateLimiter } from "../lib/mcp";
import { countMiss, emptyStore, missDelete, missesToken, missGet, missPost, missReport, missTerm, MISS_LIMITS, parseStore, storeText } from "../lib/search-misses";

const post = (body: unknown, ip = "203.0.113.7") =>
  new Request("http://docs.test/api/search-misses", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": ip }, body: typeof body === "string" ? body : JSON.stringify(body) });
const TOKEN = "a-test-token-made-up-here";
async function withEnv(env: Record<string, string | undefined>, fn: () => Promise<void>) {
  const before = Object.fromEntries(Object.keys(env).map((k) => [k, process.env[k]]));
  for (const [k, v] of Object.entries(env)) v === undefined ? delete process.env[k] : (process.env[k] = v);
  try {
    await fn();
  } finally {
    for (const [k, v] of Object.entries(before)) v === undefined ? delete process.env[k] : (process.env[k] = v);
  }
}

test("terms are normalised and capped; personal-looking ones are not counted", () => {
  assert.equal(missTerm("  Kanban   SWIMLANE "), "kanban swimlane");
  assert.equal(missTerm("x"), null);
  assert.equal(missTerm("mail me at someone@example.com"), null);
  assert.equal(missTerm("call 0049 170 1234567"), null);
  assert.equal(missTerm("a".repeat(MISS_LIMITS.input + 1)), null);
  assert.equal(missTerm("wort ".repeat(30))!.length <= MISS_LIMITS.termLength, true);
  assert.equal(missTerm(42), null);
});

test("the store keeps at most MISS_LIMITS.terms distinct terms and counts the rest as dropped", () => {
  const store = emptyStore();
  for (let i = 0; i < MISS_LIMITS.terms + 5; i++) countMiss(store, "en", `term ${i}`);
  countMiss(store, "en", "term 0");
  const report = missReport(store);
  assert.equal(report.distinct, MISS_LIMITS.terms);
  assert.equal(report.dropped, 5);
  assert.deepEqual(report.terms[0], { term: "term 0", lang: "en", count: 2 });
  // Written and read back; broken entries are left out.
  const again = parseStore(storeText(store));
  assert.deepEqual(missReport(again), report);
  const broken = parseStore(JSON.stringify({ since: "x", terms: [{ term: "ok term", lang: "de", count: 3 }, { term: "y", lang: "fr", count: 1 }, { term: "bad", lang: "en", count: -1 }] }));
  assert.deepEqual(missReport(broken).terms, [{ term: "ok term", lang: "de", count: 3 }]);
  assert.equal(parseStore("not json").terms.size, 0);
});

test("POST counts only searches the docs really find nothing for, and says nothing back", async () => {
  const store = emptyStore();
  const limit = createRateLimiter(MISS_LIMITS.perMinute);
  for (const body of [{ term: "qwzx flarbnog", lang: "en" }, { term: "qwzx flarbnog", lang: "en" }, { term: "kanban", lang: "en" }, { term: "qwzx flarbnog", lang: "xx" }, "{broken"]) {
    const res = await missPost(post(body), limit, store);
    assert.equal(res.status, 204);
    assert.equal(res.headers.get("set-cookie"), null);
  }
  assert.deepEqual(missReport(store).terms, [{ term: "qwzx flarbnog", lang: "en", count: 2 }], "kanban has results");
  assert.equal((await missPost(post("x".repeat(MISS_LIMITS.body + 1)), limit, store)).status, 413);
  // No address is kept: the limiter's keys are keyed hashes.
  assert.ok(limit.keys().every((k) => !k.includes("203.0.113.7")));
  const tight = createRateLimiter(2);
  const statuses = [];
  for (let i = 0; i < 3; i++) statuses.push((await missPost(post({ term: "qwzx", lang: "de" }), tight, store)).status);
  assert.deepEqual(statuses, [204, 204, 429]);
});

test("off without a token; reading and resetting need the token", async () => {
  await withEnv({ SEARCH_MISSES_TOKEN: undefined, SEARCH_MISSES_FILE: undefined }, async () => {
    assert.equal(missesToken(), "");
    assert.equal(missGet(new Request("http://docs.test/api/search-misses")).status, 404);
    assert.equal((await missPost(post({ term: "qwzx flarbnog", lang: "en" }))).status, 204);
  });
  assert.equal(missesToken("too-short"), "", "a short token does not switch it on");
  const dir = mkdtempSync(join(tmpdir(), "misses-"));
  try {
    await withEnv({ SEARCH_MISSES_TOKEN: TOKEN, SEARCH_MISSES_FILE: join(dir, "misses.json") }, async () => {
      await missPost(post({ term: "qwzx flarbnog", lang: "de" }, "198.51.100.1"));
      assert.equal(missGet(new Request("http://docs.test/api/search-misses")).status, 401);
      assert.equal(missGet(new Request("http://docs.test/api/search-misses", { headers: { authorization: "Bearer wrong-token-of-length" } })).status, 401);
      const res = missGet(new Request("http://docs.test/api/search-misses", { headers: { authorization: `Bearer ${TOKEN}` } }));
      assert.equal(res.status, 200);
      assert.equal(res.headers.get("cache-control"), "no-store");
      const data = await res.json();
      assert.deepEqual(data.terms, [{ term: "qwzx flarbnog", lang: "de", count: 1 }]);
      assert.ok(!JSON.stringify(data).includes("198.51.100.1"));
      assert.equal(missDelete(new Request("http://docs.test/api/search-misses", { method: "DELETE", headers: { authorization: `Bearer ${TOKEN}` } })).status, 204);
      assert.deepEqual(JSON.parse(readFileSync(join(dir, "misses.json"), "utf8")).terms, [], "the reset is written to the file");
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
