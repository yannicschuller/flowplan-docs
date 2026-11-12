import { test } from "node:test";
import assert from "node:assert/strict";
import {
  codeLanguage,
  looksSensitive,
  notFoundPath,
  outboundTarget,
  REDACTED,
  resultBucket,
  searchTerm,
  track,
  trackAttrs,
} from "../lib/track";

test("search terms are trimmed, lowercase, single-spaced and at most 50 characters", () => {
  assert.equal(searchTerm("  Passkeys   Anmelden \n"), "passkeys anmelden");
  assert.equal(searchTerm("FLOWPLAN_TRUSTED_PROXIES"), "flowplan_trusted_proxies");
  assert.equal(searchTerm("Datenschutzerklärung Einstellungen"), "datenschutzerklärung einstellungen");
  assert.equal(searchTerm("v0.5 passkeys"), "v0.5 passkeys");
  const long = searchTerm("word ".repeat(30))!;
  assert.ok(long.length <= 50);
  assert.ok(!long.endsWith(" "));
});

test("search terms shorter than 2 characters are not sent", () => {
  assert.equal(searchTerm(""), null);
  assert.equal(searchTerm("   "), null);
  assert.equal(searchTerm(" a "), null);
  assert.equal(searchTerm("ai"), "ai");
});

test("search terms that look personal or secret are redacted", () => {
  for (const q of [
    "max.mustermann@example.com",
    "contact Max@Example.org please",
    "https://user:secret@flowplan.example.com",
    "postgres://admin@db.local/flowplan",
    "+49 170 1234567",
    "DE89370400440532013000",
    "12345678",
    "ghp_a1B2c3D4e5F6g7H8i9J0kLmN",
    "sk-ant-api03-AbCdEf0123456789xyz",
    "dGhpcyBpcyBhIHNlY3JldA==",
    "6140978f-a7bc-420a-809c-e64bc70b6f71",
    "0123456789abcdef0123",
  ])
    assert.equal(searchTerm(q), REDACTED, q);
  // Everyday searches stay.
  for (const q of ["export pdf", "FLOWPLAN_S3_ACCESS_KEY_ID", "port 3000", "2026", "oidc client", "@mention", "v0.12.3"])
    assert.notEqual(searchTerm(q), REDACTED, q);
  // Redaction looks at the whole input, before it is cut to 50 characters.
  assert.equal(searchTerm(`${"x ".repeat(30)}someone@example.com`), REDACTED);
});

test("looksSensitive", () => {
  assert.ok(looksSensitive("a@b.co"));
  assert.ok(!looksSensitive("a @ b"));
  assert.ok(!looksSensitive("authentifizierungsverfahren"));
  assert.ok(!looksSensitive("https://docs.flowplan.org/en/mcp"));
});

test("result counts go into three buckets", () => {
  assert.equal(resultBucket(0), "0");
  assert.equal(resultBucket(1), "1-5");
  assert.equal(resultBucket(5), "1-5");
  assert.equal(resultBucket(6), "6+");
  assert.equal(resultBucket(10), "6+");
});

test("the 404 path has no query, at most 100 characters and nothing personal", () => {
  assert.equal(notFoundPath("/en/does-not-exist"), "/en/does-not-exist");
  assert.equal(notFoundPath("/old-page?email=a@b.co#x"), "/old-page");
  assert.equal(notFoundPath(`/${"a".repeat(200)}`).length, 100);
  assert.equal(notFoundPath("/user/max%40example.com"), REDACTED);
  assert.equal(notFoundPath("/reset/a1b2c3d4e5f6a7b8c9d0"), REDACTED);
  assert.equal(notFoundPath("/%E0%A4%A"), "/%E0%A4%A", "undecodable paths are kept as they are");
  assert.equal(notFoundPath(""), "/");
});

test("code languages are plain names, otherwise text", () => {
  assert.equal(codeLanguage("bash"), "bash");
  assert.equal(codeLanguage("YAML"), "yaml");
  assert.equal(codeLanguage("dotenv"), "dotenv");
  assert.equal(codeLanguage(""), "text");
  assert.equal(codeLanguage(undefined), "text");
  assert.equal(codeLanguage('x" onclick="'), "text");
});

test("trackAttrs gives Umami's data attributes", () => {
  assert.deepEqual(trackAttrs("outbound", { target: "github" }), {
    "data-umami-event": "outbound",
    "data-umami-event-target": "github",
  });
  assert.deepEqual(trackAttrs("x"), { "data-umami-event": "x" });
  assert.throws(() => trackAttrs("x", { "Bad Key": "v" }));
});

test("links to Flowplan's places are recognised", () => {
  const sites = { app: "https://app.flowplan.org", website: "https://flowplan.org" };
  assert.equal(outboundTarget("https://app.flowplan.org", sites), "app");
  assert.equal(outboundTarget("https://app.flowplan.org/demo", sites), "demo");
  assert.equal(outboundTarget("https://app.flowplan.org/demonstration", sites), "app");
  assert.equal(outboundTarget("https://flowplan.org/download", sites), "website");
  assert.equal(outboundTarget("https://github.com/yannicschuller/flowplan/issues", sites), "github");
  assert.equal(outboundTarget("https://github.com/sponsors/yannicschuller", sites), "sponsor");
  assert.equal(outboundTarget("https://discord.gg/bCEdB6MPrR", sites), "discord");
  assert.equal(outboundTarget("https://n8n.io", sites), null);
  assert.equal(outboundTarget("/en/mcp", sites), null);
  assert.equal(outboundTarget("https://docs.flowplan.org/en", sites), null);
  assert.equal(outboundTarget("https://marketplace.flowplan.org/t/kanban", sites), null);
  const withMarketplace = { ...sites, marketplace: "https://marketplace.flowplan.org" };
  assert.equal(outboundTarget("https://marketplace.flowplan.org/t/kanban", withMarketplace), "marketplace");
});

test("track is safe without Umami and passes events on when it is there", async () => {
  // No window at all (server, tests).
  await track("search", { term: "x" });
  const g = globalThis as unknown as { window?: unknown };
  const events: unknown[][] = [];
  try {
    g.window = {};
    await track("search", { term: "x" }); // Umami not loaded (blocked, not configured)
    g.window = { umami: { track: () => { throw new Error("boom"); } } };
    await track("search", { term: "x" });
    g.window = { umami: { track: (...a: unknown[]) => events.push(a) } };
    await track("copy", { page: "mcp", lang: "bash" });
    // A hanging send does not hold up a navigation for long.
    g.window = { umami: { track: () => new Promise(() => {}) } };
    const start = Date.now();
    await track("language", { to: "en" }, 50);
    assert.ok(Date.now() - start < 1000);
  } finally {
    delete g.window;
  }
  assert.deepEqual(events, [["copy", { page: "mcp", lang: "bash" }]]);
});

test("the marketplace link: default, own address, or switched off", async () => {
  const { marketplaceUrl } = await import("../lib/links");
  const before = process.env.MARKETPLACE_URL;
  try {
    delete process.env.MARKETPLACE_URL;
    assert.equal(marketplaceUrl(), "https://marketplace.flowplan.org");
    process.env.MARKETPLACE_URL = "https://templates.example.test/";
    assert.equal(marketplaceUrl(), "https://templates.example.test");
    for (const off of ["", "off", "false"]) {
      process.env.MARKETPLACE_URL = off;
      assert.equal(marketplaceUrl(), null);
    }
  } finally {
    if (before === undefined) delete process.env.MARKETPLACE_URL;
    else process.env.MARKETPLACE_URL = before;
  }
});
