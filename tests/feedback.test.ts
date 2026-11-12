// "War das hilfreich?": "Nein" opens a prefilled GitHub issue for the page
// (lib/docs.ts feedbackUrl) – no counter, nothing stored.
import { test } from "node:test";
import assert from "node:assert/strict";
import { feedbackUrl } from "../lib/docs";

test("feedback: a prefilled documentation issue naming the page, in the page's language", () => {
  for (const [locale, title, words] of [
    ["de", "Doku: „Installation mit Docker“ hat nicht geholfen", "Was hast du gesucht"],
    ["en", "Docs: “Installation with Docker” didn't help", "What were you looking for"],
  ] as const) {
    const page = { title: locale === "de" ? "Installation mit Docker" : "Installation with Docker", url: `https://docs.flowplan.org/${locale}/installation` };
    const url = new URL(feedbackUrl(page, locale));
    assert.equal(url.origin + url.pathname, "https://github.com/yannicschuller/flowplan-docs/issues/new");
    assert.equal(url.searchParams.get("title"), title);
    assert.equal(url.searchParams.get("labels"), "documentation");
    const body = url.searchParams.get("body") ?? "";
    assert.ok(body.includes(page.url), "names the page");
    assert.ok(body.includes(words));
  }
});

test("feedback: the issue link stays a plain link (no counter or request of its own)", async () => {
  const { readFileSync } = await import("node:fs");
  const page = readFileSync(new URL("../app/(docs)/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(page, /feedbackUrl\(/);
  assert.doesNotMatch(page.slice(page.indexOf("War das hilfreich?"), page.indexOf("War das hilfreich?") + 900), /fetch\(|onClick/);
});
