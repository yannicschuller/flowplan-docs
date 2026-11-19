// „Frag Flo“ (lib/flo.ts, lib/flo-markdown.tsx, public/flo-pow.js): the
// service's address, its status and answers, the bounded conversation,
// which links an answer may hold, answers rendered without HTML, and the
// proof of work the browser solves.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createContext, runInContext } from "node:vm";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  allowedLink,
  ASK_DEFAULT,
  askUrl,
  describeProblem,
  docsPath,
  historyFor,
  MAX_CONVERSATION_CHARS,
  parseAnswer,
  parseTurns,
  retryText,
  statusAllowsDocs,
  type FloTurn,
} from "../lib/flo";
import { renderFloMarkdown } from "../lib/flo-markdown";

test("ASK_URL changes or turns off the service", () => {
  assert.equal(askUrl({}), ASK_DEFAULT);
  assert.equal(askUrl({ ASK_URL: "https://ask.example.test/" }), "https://ask.example.test");
  assert.equal(askUrl({ ASK_URL: "http://127.0.0.1:4010" }), "http://127.0.0.1:4010");
  for (const off of ["", " ", "off", "false", "0", "no"]) assert.equal(askUrl({ ASK_URL: off }), null, off);
  assert.equal(askUrl({ ASK_URL: "http://ask.example.test" }), null, "plain http only on localhost");
  assert.equal(askUrl({ ASK_URL: "javascript:alert(1)" }), null);
  assert.equal(askUrl({ ASK_URL: "not a url" }), null);
});

test("only docs: true shows the button", () => {
  assert.equal(statusAllowsDocs({ docs: true, discord: false, name: "Flo" }), true);
  for (const data of [{ docs: false }, { docs: "true" }, {}, null, "ok", [true]]) assert.equal(statusAllowsDocs(data), false);
});

test("answers keep only allowed sources", () => {
  const parsed = parseAnswer({
    answer: "Use **Docker**.",
    sources: [
      { title: "Installation", url: "https://docs.flowplan.org/en/installation#docker" },
      { title: "Twice", url: "https://docs.flowplan.org/en/installation#docker" },
      { title: "Evil", url: "https://evil.example/phish" },
      { title: "Script", url: "javascript:alert(1)" },
      { url: "https://github.com/yannicschuller/flowplan/issues" },
      "junk",
    ],
    usage: { remainingToday: 3 },
  });
  assert.deepEqual(parsed, {
    answer: "Use **Docker**.",
    sources: [
      { title: "Installation", url: "https://docs.flowplan.org/en/installation#docker" },
      { title: "https://github.com/yannicschuller/flowplan/issues", url: "https://github.com/yannicschuller/flowplan/issues" },
    ],
  });
  assert.equal(parseAnswer({ answer: "  " }), null);
  assert.equal(parseAnswer(null), null);
  assert.deepEqual(parseAnswer({ answer: "x" })?.sources, []);
});

test("errors of the service become messages", () => {
  const at = "2026-11-19T15:30:00.000Z";
  assert.deepEqual(describeProblem(429, { error: "limit", scope: "subject", retryAt: at }), { kind: "limit", scope: "subject", retryAt: new Date(at) });
  assert.deepEqual(describeProblem(429, { error: "limit", scope: "global", retryAt: "soon" }), { kind: "limit", scope: "global", retryAt: null });
  assert.deepEqual(describeProblem(429, { error: "limit", scope: "budget", retryAt: at }), { kind: "budget" });
  assert.deepEqual(describeProblem(503, { error: "off" }), { kind: "off" });
  assert.deepEqual(describeProblem(503, null), { kind: "off" });
  assert.deepEqual(describeProblem(401, { error: "invalid_session" }), { kind: "session" });
  assert.deepEqual(describeProblem(400, { error: "too_long", max: 500 }), { kind: "too-long", max: 500 });
  assert.deepEqual(describeProblem(403, { error: "cross_origin" }), { kind: "error", status: 403 });
  assert.deepEqual(describeProblem(502, { error: "upstream" }), { kind: "error", status: 502 });
  assert.deepEqual(describeProblem(400, { error: "too_long", maxQuestionChars: 300 }), { kind: "too-long", max: 300 });
  assert.deepEqual(describeProblem(413, { error: "too_large" }), { kind: "error", status: 413 });
  assert.deepEqual(describeProblem(400, { error: "too_long" }), { kind: "too-long", max: null });
  assert.deepEqual(describeProblem(400, { error: "bad" }), { kind: "error", status: 400 });
  assert.deepEqual(describeProblem(500, "<html>"), { kind: "error", status: 500 });
});

test("the time to ask again is local and short", () => {
  const now = new Date("2026-11-19T10:00:00Z");
  assert.equal(retryText(new Date("2026-11-19T14:30:00Z"), "de", now, "Europe/Berlin"), "15:30");
  assert.equal(retryText(new Date("2026-11-19T14:30:00Z"), "en", now, "UTC"), "14:30");
  assert.match(retryText(new Date("2026-11-20T08:05:00Z"), "de", now, "Europe/Berlin"), /^Fr\.?, 09:05$/);
  assert.match(retryText(new Date("2026-12-01T00:00:00Z"), "en", now, "UTC"), /^1 Dec, 00:00$/);
});

test("follow-ups send a bounded history: the newest six entries, at most 4,000 characters", () => {
  const turn = (i: number, size = 100): FloTurn => ({ question: `q${i}`.padEnd(size, "."), answer: `a${i}`.padEnd(size, "."), sources: [] });
  const ten = Array.from({ length: 10 }, (_, i) => turn(i));
  const history = historyFor(ten);
  assert.equal(history.length, 6, "six entries, not six exchanges");
  assert.deepEqual(
    history.map((h) => `${h.role}:${h.text.slice(0, 2)}`),
    ["user:q7", "assistant:a7", "user:q8", "assistant:a8", "user:q9", "assistant:a9"],
  );
  // Over the characters: the oldest entries go, one at a time.
  const long = historyFor([turn(1, 1000), turn(2, 1500)]);
  assert.deepEqual(
    long.map((h) => h.text.slice(0, 2)),
    ["a1", "q2", "a2"],
  );
  assert.ok(long.reduce((n, h) => n + h.text.length, 0) <= MAX_CONVERSATION_CHARS);
  assert.equal(long.reduce((n, h) => n + h.text.length, 0), 4000, "exactly the limit fits");
  assert.deepEqual(
    historyFor([turn(1, 1500), turn(2, 1500)]).map((h) => h.text.slice(0, 2)),
    ["q2", "a2"],
  );
  assert.deepEqual(historyFor([{ question: "q", answer: "a".repeat(4001), sources: [] }]), []);
  assert.deepEqual(historyFor([]), []);
});

test("the stored conversation is checked when read back", () => {
  assert.deepEqual(parseTurns(null), []);
  assert.deepEqual(parseTurns("{broken"), []);
  assert.deepEqual(parseTurns('{"question":"x"}'), []);
  const raw = JSON.stringify([
    {
      question: "q",
      answer: "a",
      sources: [
        { title: "Bad", url: "javascript:alert(1)" },
        { title: "Ok", url: "/sign-in" },
      ],
    },
    { question: 1 },
  ]);
  assert.deepEqual(parseTurns(raw), [{ question: "q", answer: "a", sources: [{ title: "Ok", url: "https://docs.flowplan.org/sign-in" }] }]);
  assert.equal(parseTurns(JSON.stringify(Array.from({ length: 30 }, () => ({ question: "q", answer: "a" })))).length, 12);
});

test("answers link only to Flowplan's places", () => {
  for (const ok of [
    "https://docs.flowplan.org/en/installation#docker",
    "https://flowplan.org/download",
    "https://github.com/yannicschuller/flowplan/issues/1",
    "https://github.com/yannicschuller/flowplan-docs",
    "https://discord.gg/bCEdB6MPrR",
  ])
    assert.ok(allowedLink(ok), ok);
  assert.equal(allowedLink("/installation"), "https://docs.flowplan.org/installation");
  for (const bad of [
    "javascript:alert(1)",
    "JAVASCRIPT:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:x",
    "http://docs.flowplan.org/en",
    "https://docs.flowplan.org.evil.example/",
    "https://evil.example/?https://docs.flowplan.org",
    "https://user@docs.flowplan.org/",
    "https://docs.flowplan.org:8443/",
    "https://github.com/someone/flowplan",
    "https://github.com/yannicschuller/other",
    "https://discord.gg/other",
    "//evil.example/x",
    "mailto:a@b.c",
  ])
    assert.equal(allowedLink(bad), null, bad);
});

test("no answer link can leave the site through a protocol-relative path (F1)", () => {
  for (const bad of [
    "//evil.com",
    "//evil.com/login",
    "/\\evil.com",
    "\\\\evil.com",
    "/%2F%2Fevil.com",
    "/%2f%5cevil.com",
    "https://docs.flowplan.org//evil.com/login",
    "https://docs.flowplan.org/en//evil.com",
    "https://docs.flowplan.org/\\evil.com",
    "https://docs.flowplan.org/%2F%2Fevil.com",
    "https://docs.flowplan.org@evil.com",
    "https://docs.flowplan.org@evil.com/login",
    "https://docs.flowplan.org.evil.com",
    "https://docs.flowplan.org.evil.com/en/installation",
  ])
    assert.equal(allowedLink(bad), null, bad);
  // Even when handed such an address directly, the local path is never //host.
  assert.equal(docsPath("https://docs.flowplan.org//evil.com/login", ""), null);
  assert.equal(docsPath("https://docs.flowplan.org//evil.com/login", "/de"), null);
  const out = html("[Login](https://docs.flowplan.org//evil.com/login) [x](//evil.com) [y](/\\evil.com)");
  assert.doesNotMatch(out, /<a /);
  assert.equal(out, "<p>Login x y</p>");
});

test("docs links stay on this site and in the reader's language", () => {
  assert.equal(docsPath("https://docs.flowplan.org/en/installation#docker", "/de"), "/en/installation#docker");
  assert.equal(docsPath("https://docs.flowplan.org/installation", "/de"), "/de/installation");
  assert.equal(docsPath("https://docs.flowplan.org/installation", ""), "/installation");
  assert.equal(docsPath("https://docs.flowplan.org/de", ""), "/de");
  assert.equal(docsPath("https://docs.flowplan.org/", ""), "/");
  assert.equal(docsPath("https://flowplan.org/download", ""), null);
});

const html = (md: string) => renderToStaticMarkup(createElement(Fragment, null, renderFloMarkdown(md, { prefix: "/en", newTab: "opens in a new tab" })));

test("answers render as safe Markdown", () => {
  assert.equal(html("Use **Docker** and `docker compose up`."), "<p>Use <strong>Docker</strong> and <code>docker compose up</code>.</p>");
  assert.equal(html("- one\n- *two*"), "<ul><li>one</li><li><em>two</em></li></ul>");
  assert.equal(html("3. three\n4. four"), '<ol start="3"><li>three</li><li>four</li></ol>');
  assert.equal(html("```bash\necho <hi> && rm\n```"), '<pre tabindex="0"><code>echo &lt;hi&gt; &amp;&amp; rm</code></pre>');
  assert.equal(html("See [Installation](https://docs.flowplan.org/en/installation)."), '<p>See <a href="/en/installation">Installation</a>.</p>');
  assert.equal(
    html("[Issues](https://github.com/yannicschuller/flowplan/issues)"),
    '<p><a href="https://github.com/yannicschuller/flowplan/issues" target="_blank" rel="noopener noreferrer">Issues<span class="sr-only"> (opens in a new tab)</span></a></p>',
  );
});

test("HTML and foreign links in an answer stay harmless text", () => {
  const out = html(
    'Hi <script>alert(1)</script> <b onclick="x()">bold</b>\n\n<img src=x onerror=alert(1)>\n\n[click](javascript:alert(1)) [phish](https://evil.example/login) ![x](https://evil.example/t.gif) <a href="javascript:alert(2)">a</a>',
  );
  // No element but paragraphs, and no link at all: the rest is escaped text.
  assert.deepEqual([...new Set(out.match(/<\/?[a-z]+/gi))].sort(), ["</p", "<p"]);
  assert.doesNotMatch(out, /href="|src="|https:\/\/evil/);
  assert.match(out, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(out, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.match(out, /click phish x/);
});

test("the proof of work finds a nonce the service can check", () => {
  type Pow = { sha256: (b: Uint8Array) => Uint32Array; solve: (c: string, d: number) => number };
  const posted: unknown[] = [];
  const sandbox: Record<string, unknown> = {
    TextEncoder,
    DataView,
    Uint8Array,
    Uint32Array,
    Math,
    String,
    Number,
    Date,
    postMessage: (m: unknown) => posted.push(m),
  };
  sandbox.self = sandbox;
  createContext(sandbox);
  runInContext(readFileSync(join(process.cwd(), "public", "flo-pow.js"), "utf8"), sandbox);
  const pow = sandbox.floPow as Pow;
  for (const text of ["", "abc", "x".repeat(55), "x".repeat(56), "x".repeat(64), "ä€".repeat(40)]) {
    const words = pow.sha256(new TextEncoder().encode(text));
    const hex = [...words].map((w) => (w >>> 0).toString(16).padStart(8, "0")).join("");
    assert.equal(hex, createHash("sha256").update(text).digest("hex"), `${text.length} chars`);
  }
  const nonce = pow.solve("challenge-1", 12);
  const digest = createHash("sha256").update(`challenge-1${nonce}`).digest();
  assert.ok(digest.readUInt16BE(0) >> 4 === 0, "12 leading zero bits");
  for (let n = 0; n < nonce; n++) assert.ok(createHash("sha256").update(`challenge-1${n}`).digest().readUInt16BE(0) >> 4 !== 0, "the smallest one");
  (sandbox.onmessage as (e: { data: unknown }) => void)({ data: { challenge: "challenge-1", difficulty: 12 } });
  (sandbox.onmessage as (e: { data: unknown }) => void)({ data: { challenge: "", difficulty: 99 } });
  assert.equal((posted[0] as { nonce: number }).nonce, nonce);
  assert.equal((posted[1] as { error: string }).error, "invalid challenge");
});
