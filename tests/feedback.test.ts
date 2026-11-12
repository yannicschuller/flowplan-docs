// "War das hilfreich?": "Nein" opens the flowplan repository's "Documentation" issue form for the page
// (lib/docs.ts feedbackUrl) – no counter, nothing stored.
import { test } from "node:test";
import assert from "node:assert/strict";
import { feedbackUrl } from "../lib/docs";

test("feedback: the Documentation form of the flowplan repository, naming the page, in the page's language", () => {
  for (const [locale, title] of [
    ["de", "Doku: „Installation mit Docker“ hat nicht geholfen"],
    ["en", "Docs: “Installation with Docker” didn't help"],
  ] as const) {
    const page = { title: locale === "de" ? "Installation mit Docker" : "Installation with Docker", url: `https://docs.flowplan.org/${locale}/installation` };
    const url = new URL(feedbackUrl(page, locale));
    assert.equal(url.origin + url.pathname, "https://github.com/yannicschuller/flowplan/issues/new");
    assert.equal(url.searchParams.get("title"), title);
    // The flowplan repository's "Documentation" form (it sets the labels; blank issues are off).
    assert.equal(url.searchParams.get("template"), "documentation.yml");
    assert.equal(url.searchParams.get("page"), page.url, "names the page");
    assert.equal(url.searchParams.get("labels"), null);
  }
});

test("feedback: the issue link stays a plain link (no counter or request of its own)", async () => {
  const { readFileSync } = await import("node:fs");
  const page = readFileSync(new URL("../app/(docs)/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(page, /feedbackUrl\(/);
  assert.doesNotMatch(page.slice(page.indexOf("War das hilfreich?"), page.indexOf("War das hilfreich?") + 900), /fetch\(|onClick/);
});
