import { test } from "node:test";
import assert from "node:assert/strict";
import { analytics, analyticsLoader } from "../lib/analytics";

const id = "f336e7c2-7bdd-496b-8087-b7bd144e58d2";

test("statistics only with both an https address and a website ID", () => {
  assert.equal(analytics({}), null);
  assert.equal(analytics({ UMAMI_URL: "https://stats.example.com" }), null);
  assert.equal(analytics({ UMAMI_WEBSITE_ID: id }), null);
  assert.equal(analytics({ UMAMI_URL: "http://stats.example.com", UMAMI_WEBSITE_ID: id }), null, "no plain http");
  assert.equal(analytics({ UMAMI_URL: "https://stats.example.com", UMAMI_WEBSITE_ID: "x\"};alert(1)//" }), null);
  assert.deepEqual(analytics({ UMAMI_URL: " https://stats.example.com/ ", UMAMI_WEBSITE_ID: id }), {
    script: "https://stats.example.com/script.js",
    origin: "https://stats.example.com",
    websiteId: id,
  });
  // A script address of its own (e.g. a renamed tracker script) is kept.
  assert.equal(analytics({ UMAMI_URL: "https://stats.example.com/u/s.js", UMAMI_WEBSITE_ID: id })!.script, "https://stats.example.com/u/s.js");
});

test("the loader adds Umami's script with Do Not Track respected, or nothing", () => {
  assert.match(analyticsLoader(null), /^\/\* Statistics are off/);
  const js = analyticsLoader(analytics({ UMAMI_URL: "https://stats.example.com", UMAMI_WEBSITE_ID: id }));
  assert.ok(js.includes('"https://stats.example.com/script.js"'));
  assert.ok(js.includes(`"${id}"`));
  assert.ok(js.includes('"data-do-not-track","true"'));
});
