// The Content Security Policy (lib/csp.ts, proxy.ts): strict by default,
// following ASK_URL and UMAMI_URL, and no style attributes in the pages.
import { test } from "node:test";
import assert from "node:assert/strict";
import { contentSecurityPolicy, createNonce, isLocalHttp, SECURITY_HEADERS } from "../lib/csp";
import { docSlugs, loadDoc, renderMarkdown } from "../lib/docs";

const NONCE = "AAAAAAAAAAAAAAAAAAAAAA==";
const directives = (policy: string) =>
  new Map(policy.split("; ").map((part) => {
    const [name, ...values] = part.split(" ");
    return [name, values] as const;
  }));

test("the policy allows only this site, the nonce and what is configured", () => {
  const csp = directives(contentSecurityPolicy({ nonce: NONCE, env: {} }));
  assert.deepEqual(csp.get("default-src"), ["'self'"]);
  assert.deepEqual(csp.get("script-src"), ["'self'", `'nonce-${NONCE}'`]);
  assert.deepEqual(csp.get("style-src"), ["'self'"]);
  assert.deepEqual(csp.get("img-src"), ["'self'", "data:"]);
  assert.deepEqual(csp.get("font-src"), ["'self'"]);
  // ASK_URL's default.
  assert.deepEqual(csp.get("connect-src"), ["'self'", "https://ask.flowplan.org"]);
  assert.deepEqual(csp.get("worker-src"), ["'self'"]);
  assert.deepEqual(csp.get("object-src"), ["'none'"]);
  assert.deepEqual(csp.get("base-uri"), ["'none'"]);
  assert.deepEqual(csp.get("frame-ancestors"), ["'none'"]);
  assert.deepEqual(csp.get("form-action"), ["'self'"]);
  assert.ok(csp.has("upgrade-insecure-requests"));
  for (const values of csp.values()) {
    assert.ok(!values.includes("'unsafe-inline'"));
    assert.ok(!values.includes("'unsafe-eval'"));
    assert.ok(!values.includes("*"));
  }
});

test("connect-src follows ASK_URL, script-src and connect-src follow Umami", () => {
  const env = { ASK_URL: "http://127.0.0.1:4100/ask/", UMAMI_URL: "https://stats.example.com/umami/script.js", UMAMI_WEBSITE_ID: "0b9f0d3c-5c4e-4d6a-9a8e-2f1e3d4c5b6a" };
  const csp = directives(contentSecurityPolicy({ nonce: NONCE, env, local: true }));
  assert.deepEqual(csp.get("connect-src"), ["'self'", "http://127.0.0.1:4100", "https://stats.example.com"]);
  assert.deepEqual(csp.get("script-src"), ["'self'", `'nonce-${NONCE}'`, "https://stats.example.com"]);
  assert.ok(!csp.has("upgrade-insecure-requests"));
  // Flo off, Umami incomplete: nothing extra.
  const off = directives(contentSecurityPolicy({ nonce: NONCE, env: { ASK_URL: "off", UMAMI_URL: "https://stats.example.com" } }));
  assert.deepEqual(off.get("connect-src"), ["'self'"]);
  assert.deepEqual(off.get("script-src"), ["'self'", `'nonce-${NONCE}'`]);
});

test("next dev gets eval and inline styles, nothing else changes", () => {
  const csp = directives(contentSecurityPolicy({ nonce: NONCE, env: {}, dev: true }));
  assert.deepEqual(csp.get("script-src"), ["'self'", `'nonce-${NONCE}'`, "'unsafe-eval'"]);
  assert.deepEqual(csp.get("style-src"), ["'self'", "'unsafe-inline'"]);
});

test("nonces are fresh and well-formed", () => {
  const a = createNonce(), b = createNonce();
  assert.notEqual(a, b);
  assert.match(a, /^[A-Za-z0-9+/]{22}==$/);
  assert.throws(() => contentSecurityPolicy({ nonce: "x'; script-src *", env: {} }));
  assert.ok(isLocalHttp("127.0.0.1:3000"));
  assert.ok(isLocalHttp("localhost"));
  assert.ok(!isLocalHttp("localhost", "https"));
  assert.ok(!isLocalHttp("docs.flowplan.org"));
  assert.ok(!isLocalHttp("localhost.example.com"));
  assert.ok(!isLocalHttp(null));
});

test("the other security headers", () => {
  const headers = Object.fromEntries(SECURITY_HEADERS.map((h) => [h.key, h.value]));
  assert.equal(headers["Referrer-Policy"], "strict-origin-when-cross-origin");
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
  assert.equal(headers["X-Frame-Options"], "DENY");
  assert.match(headers["Permissions-Policy"], /camera=\(\)/);
});

// style-src 'self' blocks style attributes: the rendered pages have none.
test("no style attributes and no inline scripts in the rendered pages", () => {
  for (const locale of ["de", "en"] as const)
    for (const slug of docSlugs) {
      const doc = loadDoc(slug, locale);
      if (!doc) continue;
      for (const html of [doc.html, doc.leadHtml]) {
        assert.doesNotMatch(html, /<[a-z][^>]*\sstyle\s*=/i, `${locale}/${slug}: style attribute`);
        assert.doesNotMatch(html, /<style[\s>]/i, `${locale}/${slug}: <style>`);
        assert.doesNotMatch(html, /<script(?![^>]*type="application\/ld\+json")/i, `${locale}/${slug}: <script>`);
        assert.doesNotMatch(html, /<[a-z][^>]*\son[a-z]+\s*=/i, `${locale}/${slug}: event handler attribute`);
      }
    }
  const table = renderMarkdown("| a | b | c |\n| :-- | :-: | --: |\n| 1 | 2 | 3 |\n", "en").html;
  assert.match(table, /<th data-align="center">b<\/th>/);
  assert.match(table, /<td data-align="right">3<\/td>/);
  assert.doesNotMatch(table, /style=/);
});
