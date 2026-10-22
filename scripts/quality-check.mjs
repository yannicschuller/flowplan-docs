// Quality budgets for the production build: accessibility (axe-core), focus
// inside aria-hidden, horizontal overflow, JavaScript sent per page and the
// largest contentful paint. Every key page is opened at 1280 and 390 px wide
// in Chromium; the script fails when one of them breaks a rule or a budget.
//
//   npm run build && npm run quality
//
// It starts `next start` on a free port (or uses QUALITY_BASE_URL). The
// browser is Playwright's Chromium; QUALITY_CHROMIUM names another binary,
// otherwise /opt/pw-browsers/chromium is used when it exists. With
// QUALITY_OPTIONAL=1 a missing browser skips the check instead of failing it.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { chromium } from "@playwright/test";

// ---------------------------------------------------------------- settings
const PAGES = ["/de", "/en/configuration", "/de/journal", "/en/whats-new"];
const HEALTH = "/api/health";
// Measured 2026-10-22 (gzip): 137.0 KB on every page – React, Next's
// runtime and the search box (the search index itself loads on focus);
// LCP on localhost 110–260 ms. The JS budget is about 10 % above that.
const BUDGET = { jsKb: 150, lcpMs: 2500 };
const LOCALE = "de-DE";
// --------------------------------------------------------------------------

const VIEWPORTS = [
  { name: "1280", viewport: { width: 1280, height: 800 } },
  { name: "390", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
];
const require = createRequire(import.meta.url);
const AXE = require.resolve("axe-core/axe.min.js");
// WCAG 2.x A/AA plus axe's best practices; only serious and critical
// findings fail the check (color-contrast is one of them).
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

async function launch() {
  // An explicit binary is the only one tried; otherwise the local one, then
  // the one `npx playwright install chromium` put in Playwright's cache.
  const candidates = process.env.QUALITY_CHROMIUM
    ? [process.env.QUALITY_CHROMIUM]
    : [...(existsSync("/opt/pw-browsers/chromium") ? ["/opt/pw-browsers/chromium"] : []), undefined];
  let last;
  for (const executablePath of candidates) {
    try {
      return await chromium.launch({ executablePath, headless: true });
    } catch (error) {
      last = error;
    }
  }
  const message = `quality: no Chromium available (${String(last?.message || last).split("\n")[0]}). Install it with "npx playwright install chromium" or set QUALITY_CHROMIUM.`;
  if (process.env.QUALITY_OPTIONAL === "1") {
    console.log(`${message}\nquality: skipped (QUALITY_OPTIONAL=1).`);
    process.exit(0);
  }
  console.error(message);
  process.exit(1);
}

const freePort = () =>
  new Promise((resolve, reject) => {
    const srv = createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });

async function startServer() {
  if (process.env.QUALITY_BASE_URL) return { base: process.env.QUALITY_BASE_URL.replace(/\/$/, ""), stop() {} };
  if (!existsSync(".next/BUILD_ID")) {
    console.error("quality: no production build – run `npm run build` first.");
    process.exit(1);
  }
  const port = await freePort();
  const child = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "start", "-p", String(port), "-H", "127.0.0.1"], {
    env: { ...process.env, NODE_ENV: "production", NEXT_TELEMETRY_DISABLED: "1", PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let log = "";
  child.stdout.on("data", (d) => (log += d));
  child.stderr.on("data", (d) => (log += d));
  const base = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 60000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) break;
    try {
      if ((await fetch(base + HEALTH)).ok) return { base, stop: () => child.kill("SIGTERM") };
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  child.kill("SIGKILL");
  console.error(`quality: the server did not start.\n${log}`);
  process.exit(1);
}

async function checkPage(browser, base, path, vp, options = {}) {
  const context = await browser.newContext({
    viewport: vp.viewport,
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
    deviceScaleFactor: 1,
    locale: options.locale || LOCALE,
    // axe is injected as an inline script; a strict CSP would block it.
    bypassCSP: true,
    // Reveal and scroll animations would be caught half-way (text at 30 %
    // opacity); with reduced motion the page shows its settled state.
    reducedMotion: "reduce",
    storageState: options.storageState,
  });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__qualityLcp = 0;
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__qualityLcp = Math.max(window.__qualityLcp, entry.startTime);
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch {}
  });
  const sizes = [];
  page.on("requestfinished", (request) => {
    if (request.resourceType() === "script") sizes.push(request.sizes().then((s) => s.responseBodySize).catch(() => 0));
  });
  const response = await page.goto(base + path, { waitUntil: "load" });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  if (options.ready) await options.ready(page);
  // Paint once more before reading LCP.
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  const lcp = await page.evaluate(() => window.__qualityLcp);
  const jsBytes = (await Promise.all(sizes)).reduce((a, b) => a + b, 0);

  const overflow = await page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    if (scrollWidth <= width) return null;
    const describe = (el) => `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${el.classList.length ? "." + [...el.classList].slice(0, 3).join(".") : ""}`;
    const offenders = [...document.body.querySelectorAll("*")]
      .filter((el) => el.getBoundingClientRect().right > width + 1 && el.getBoundingClientRect().width > 0)
      .slice(0, 5)
      .map(describe);
    return { width, scrollWidth, offenders };
  });

  const hiddenFocus = await page.evaluate(() => {
    const focusable =
      'a[href],area[href],button,input,select,textarea,iframe,summary,[tabindex],[contenteditable=""],[contenteditable="true"],audio[controls],video[controls]';
    const describe = (el) => el.outerHTML.slice(0, 120);
    const out = [];
    for (const root of document.querySelectorAll('[aria-hidden="true"]'))
      for (const el of [root, ...root.querySelectorAll(focusable)]) {
        if (!el.matches(focusable) || el.closest("[inert]") || el.disabled) continue;
        const tabindex = el.getAttribute("tabindex");
        if (tabindex !== null && Number(tabindex) < 0) continue;
        if (el.type === "hidden" || !el.checkVisibility({ visibilityProperty: true })) continue;
        out.push(describe(el));
      }
    return [...new Set(out)];
  });

  await page.addScriptTag({ path: AXE });
  const violations = await page.evaluate(async (tags) => {
    const result = await window.axe.run(document, { runOnly: { type: "tag", values: tags }, resultTypes: ["violations"] });
    return result.violations
      .filter((v) => v.impact === "serious" || v.impact === "critical")
      .map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.slice(0, 5).map((n) => `${n.target.join(" ")}${n.failureSummary ? " – " + n.failureSummary.split("\n").slice(1, 2).join("").trim() : ""}`),
        count: v.nodes.length,
      }));
  }, AXE_TAGS);

  await context.close();
  return { status: response?.status() ?? 0, jsKb: jsBytes / 1024, lcp, overflow, hiddenFocus, violations };
}

function report(rows, budget) {
  const failures = [];
  console.log(`\n${"page".padEnd(34)} ${"width".padStart(5)} ${"JS KB".padStart(7)} ${"LCP ms".padStart(7)}  axe  aria-hidden  overflow`);
  for (const { path, vp, r, jsBudget } of rows) {
    const limit = jsBudget ?? budget.jsKb;
    console.log(
      `${path.padEnd(34)} ${vp.name.padStart(5)} ${r.jsKb.toFixed(1).padStart(7)} ${Math.round(r.lcp).toString().padStart(7)}  ${String(r.violations.length).padStart(3)}  ${String(r.hiddenFocus.length).padStart(11)}  ${r.overflow ? r.overflow.scrollWidth + "px" : "–"}`,
    );
    const where = `${path} @ ${vp.name}px`;
    if (r.status >= 400) failures.push(`${where}: HTTP ${r.status}`);
    if (r.jsKb > limit) failures.push(`${where}: ${r.jsKb.toFixed(1)} KB JavaScript (gzip), budget ${limit} KB`);
    if (!(r.lcp > 0)) failures.push(`${where}: no largest-contentful-paint entry`);
    else if (r.lcp > budget.lcpMs) failures.push(`${where}: LCP ${Math.round(r.lcp)} ms, budget ${budget.lcpMs} ms`);
    if (r.overflow) failures.push(`${where}: page is ${r.overflow.scrollWidth}px wide in a ${r.overflow.width}px viewport (${r.overflow.offenders.join(", ")})`);
    for (const el of r.hiddenFocus) failures.push(`${where}: focusable inside aria-hidden: ${el}`);
    for (const v of r.violations) failures.push(`${where}: axe ${v.impact} ${v.id} (${v.count}×) – ${v.help}\n      ${v.nodes.join("\n      ")}`);
  }
  if (failures.length) {
    console.error(`\nquality: ${failures.length} problem(s)\n  - ${failures.join("\n  - ")}`);
    return false;
  }
  console.log(`\nquality: all ${rows.length} checks within budget (JS ≤ ${budget.jsKb} KB gzip, LCP ≤ ${budget.lcpMs} ms, no serious axe findings).`);
  return true;
}

async function main() {
  const browser = await launch();
  const server = await startServer();
  const rows = [];
  try {
    for (const path of PAGES)
      for (const vp of VIEWPORTS) {
        // A first visit warms the server (rendering, file cache); the
        // numbers come from the second.
        if (vp === VIEWPORTS[0]) await checkPage(browser, server.base, path, vp).catch(() => {});
        rows.push({ path, vp, r: await checkPage(browser, server.base, path, vp) });
      }
  } finally {
    await browser.close();
    server.stop();
  }
  process.exit(report(rows, BUDGET) ? 0 : 1);
}

await main();
