// The reference pages and the page furniture of wave 2: reference data
// (content/reference.json, scripts/reference-data.mjs), the filter, reading
// time, "new" sections, previous/next and related pages.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import {
  areaPages,
  docAreas,
  docEnvRows,
  docMarkdown,
  docSlugs,
  freshSections,
  frontMatter,
  loadDoc,
  neighbours,
  readingMinutes,
  relatedPages,
  WORDS_PER_MINUTE,
} from "../lib/docs";
import { envRows, firstSentence, REFERENCE, slashMarkdown, undocumentedEnv } from "../lib/reference";
import { filterWords, normalizeFilter, rowMatches } from "../lib/table-filter";
import { LOCALES } from "../lib/i18n";

// ---- Reference data

test("the reference data has every part, without duplicates", () => {
  const { slash, shortcuts, workflow, env } = REFERENCE;
  assert.ok(slash.commands.length >= 30);
  assert.equal(new Set(slash.commands.map((c) => c.id)).size, slash.commands.length);
  for (const c of slash.commands) {
    assert.ok(slash.groups[c.group], `${c.id}: group`);
    assert.ok(c.name[0] && c.name[1] && c.description[0] && c.description[1], `${c.id}: names`);
  }
  assert.ok(shortcuts.global.length >= 15 && shortcuts.editor.length >= 20);
  assert.ok(workflow.nodes.length >= 30);
  assert.equal(new Set(workflow.nodes.map((n) => n.type)).size, workflow.nodes.length);
  assert.ok(env.length >= 150);
  assert.deepEqual([...env].sort(), env);
});

// With a checkout of the app next to this repository (or FLOWPLAN_DIR), the
// committed data must be what the generator reads from it now.
const app = process.env.FLOWPLAN_DIR || join(process.cwd(), "..", "flowplan");
test("content/reference.json matches the app's code", { skip: !existsSync(join(app, "lib", "keymap.ts")) && "no Flowplan checkout" }, () => {
  // --check compares without writing (the commit it was read at aside).
  execFileSync(process.execPath, [join(process.cwd(), "scripts", "reference-data.mjs"), "--check"], { env: { ...process.env, FLOWPLAN_DIR: app }, stdio: "pipe" });
});

// ---- "/" menu

test("the block menu page lists every entry of the menu, in both languages", () => {
  for (const locale of LOCALES) {
    const md = docMarkdown("slash-commands", locale);
    const i = locale === "de" ? 0 : 1;
    for (const c of REFERENCE.slash.commands) {
      assert.ok(md.includes(`| ${c.name[i]} |`), `${locale}: ${c.id}`);
      for (const child of c.children ?? []) assert.ok(md.includes(`| ${c.name[i]}: ${child.name[i]} |`), `${locale}: ${child.id}`);
    }
    assert.ok(loadDoc("slash-commands", locale)!.filter);
  }
  // Conditions stay with their entries; keywords become /words, words first.
  const md = slashMarkdown("en");
  assert.match(md, /\| AI assistant \| `\/ki`.*\(When AI writing is on\)/);
  assert.match(md, /\| Task list \| `\/todo`, `\/aufgabe`, `\/task`, `\/checkbox` \|/);
});

// ---- Keyboard shortcuts

// Key groups written on a page: "<kbd>⌘</kbd> <kbd>B</kbd> / <kbd>I</kbd>"
// is ⌘ B and ⌘ I, "<kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>1</kbd>–<kbd>3</kbd>" is
// ⌘ ⌥ 1 to 3. Each group as its sorted keys.
function keyGroups(markdown: string) {
  const groups = new Set<string>();
  const kbd = /<kbd>([^<]+)<\/kbd>/g;
  for (const run of markdown.matchAll(/<kbd>[^<]+<\/kbd>(?:\s*(?:\/|–|-)?\s*<kbd>[^<]+<\/kbd>)*/g)) {
    const parts = run[0].split(/\s*\/\s*(?=<kbd>)/);
    const first = [...parts[0].matchAll(kbd)].map((m) => m[1]);
    const add = (keys: string[]) => groups.add([...keys].sort().join(" "));
    const range = parts[0].match(/<kbd>(\d)<\/kbd>–<kbd>(\d)<\/kbd>/);
    if (range) {
      const base = first.slice(0, -2);
      for (let n = Number(range[1]); n <= Number(range[2]); n++) add([...base, String(n)]);
    } else add(first);
    // The alternatives after "/" take the modifiers of the first group.
    const modifiers = first.filter((k) => /^[⌘⌥⇧⌃]$/.test(k));
    // ("⌘ Z / ⌘ ⇧ Z" spells out its own).
    for (const alt of parts.slice(1)) {
      const keys = [...alt.matchAll(kbd)].map((m) => m[1]);
      add(keys.some((k) => modifiers.includes(k) || /^[⌘⌥⇧⌃]$/.test(k)) ? keys : [...modifiers, ...keys]);
    }
  }
  return groups;
}
const KEY: Record<string, string> = { Mod: "⌘", Alt: "⌥", Shift: "⇧", Ctrl: "⌃", ArrowLeft: "←", ArrowRight: "→", ArrowUp: "↑", ArrowDown: "↓" };
// TipTap's own ⌘ ⌥ 4–6 (headings 4–6): the app's overview lists only 1–3 as well.
const UNLISTED_SHORTCUTS = new Set(["Mod+Alt+4", "Mod+Alt+5", "Mod+Alt+6"]);

test("the keyboard shortcuts page names every default shortcut of the app", () => {
  for (const locale of LOCALES) {
    const groups = keyGroups(docMarkdown("keyboard-shortcuts", locale));
    const combos = [...REFERENCE.shortcuts.global.flatMap((g) => g.combos), ...REFERENCE.shortcuts.editor.map((e) => e.combo)];
    const missing = combos.filter(
      (c) => !UNLISTED_SHORTCUTS.has(c) && !groups.has(c.split("+").map((k) => KEY[k] ?? k).sort().join(" ")),
    );
    assert.deepEqual(missing, [], `${locale}: shortcuts missing on /keyboard-shortcuts`);
    assert.ok(loadDoc("keyboard-shortcuts", locale)!.filter);
  }
});
test("key groups understand alternatives and ranges", () => {
  const g = keyGroups("| <kbd>⌘</kbd> <kbd>B</kbd> / <kbd>I</kbd> | x |\n| <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>1</kbd>–<kbd>3</kbd> | y |");
  assert.ok(g.has("B ⌘") && g.has("I ⌘") && g.has("2 ⌘ ⌥") && g.has("3 ⌘ ⌥"));
});

// ---- Workflow nodes

test("the workflow nodes page has every node type with its name, and no other", () => {
  for (const locale of LOCALES) {
    const md = docMarkdown("workflow-nodes", locale);
    const listed = [...md.matchAll(/^\| (.+?) \| `([a-z]+\.[a-z.]+)` \|/gm)].map((m) => ({ name: m[1].replace(/\s*⚡$/, ""), type: m[2] }));
    const i = locale === "de" ? 0 : 1;
    assert.deepEqual(listed.map((l) => l.type).sort(), REFERENCE.workflow.nodes.map((n) => n.type).sort(), `${locale}: node types`);
    for (const node of REFERENCE.workflow.nodes) assert.equal(listed.find((l) => l.type === node.type)!.name, node.name[i], `${locale}: ${node.type}`);
  }
});

// ---- Environment variables

// The app reads these, but no page describes them yet. A new variable of the
// app fails here until a page describes it (or it is added to this list).
const UNDOCUMENTED_ENV: string[] = [];
test("every environment variable of the app is on the reference page, with a link to its section", () => {
  for (const locale of LOCALES) {
    const rows = docEnvRows(locale);
    const missing = undocumentedEnv(rows).filter((n) => !UNDOCUMENTED_ENV.includes(n));
    // A name in the list that a page describes now, or the app no longer reads, leaves it.
    const stale = UNDOCUMENTED_ENV.filter((n) => !undocumentedEnv(rows).includes(n));
    assert.deepEqual(stale, [], `${locale}: remove from UNDOCUMENTED_ENV`);
    assert.deepEqual(missing, [], `${locale}: variables the docs do not describe`);
    const md = docMarkdown("environment-variables", locale);
    for (const row of rows) {
      assert.ok(md.includes(`| \`${row.name}\` |`), `${locale}: ${row.name}`);
      assert.ok(row.meaning.length > 3, `${locale}: ${row.name} has a meaning`);
    }
    assert.equal(new Set(rows.map((r) => r.name)).size, rows.length);
    // Sorted A–Z, and the core variables are there with their section.
    assert.deepEqual(rows.map((r) => r.name), [...rows.map((r) => r.name)].sort((a, b) => a.localeCompare(b)));
    const appUrl = rows.find((r) => r.name === "APP_URL")!;
    assert.equal(appUrl.slug, "configuration");
  }
});
test("variables come from tables first, then from the sentence that names them", () => {
  const rows = envRows(
    [
      {
        slug: "a",
        title: "A",
        body: "## Teil eins\n\nSetze `X_ONE=1`, dann geht es. Noch ein Satz.\n\n| Variable | Standard | Bedeutung |\n| --- | --- | --- |\n| `X_TWO` / `X_TWO_FILE` | *leer* | Ein Wert, z. B. `a.b`. Mehr dazu [unten](#teil-eins). |\n",
      },
    ],
    (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    { ...REFERENCE, env: ["X_ONE", "X_TWO", "X_TWO_FILE"] },
  );
  assert.deepEqual(
    rows.map((r) => [r.name, r.section, r.fallback, r.meaning]),
    [
      ["X_ONE", "teil-eins", undefined, "Setze `X_ONE=1`, dann geht es."],
      ["X_TWO", "teil-eins", "*leer*", "Ein Wert, z. B. `a.b`."],
      ["X_TWO_FILE", "teil-eins", "*leer*", "Ein Wert, z. B. `a.b`."],
    ],
  );
  assert.equal(firstSentence("Address, e.g. `https://x.y`. More."), "Address, e.g. `https://x.y`.");
});

// ---- Filter

test("the table filter ignores case, umlauts and the names of modifier keys", () => {
  assert.equal(normalizeFilter("Überschrift ⌘ ⌥"), "ueberschrift mod alt");
  assert.deepEqual(filterWords("  Strg  L "), ["mod", "l"]);
  assert.ok(rowMatches("⌘ L Zeile zur Aufgabe machen", filterWords("ctrl l aufgabe")));
  assert.ok(rowMatches("Cmd ⇧ 8 Aufzählung", filterWords("shift aufzaehlung")));
  assert.ok(!rowMatches("⌘ B Fett", filterWords("kursiv")));
  // One letter is a key, not part of a word.
  assert.ok(!rowMatches("⌘ K Schnellsuche", filterWords("strg l")));
  assert.ok(rowMatches("⌘ [ oder ⌥ ← Zurück", filterWords("[")));
  assert.ok(rowMatches("anything", []));
});
test("pages with a reference table or 'filter: true' get the filter, others do not", () => {
  for (const slug of ["slash-commands", "environment-variables", "keyboard-shortcuts", "workflow-nodes"]) assert.ok(loadDoc(slug, "de")!.filter, slug);
  assert.ok(!loadDoc("journal", "de")!.filter);
});

// ---- Reading time and new sections

test("reading time: words at 200 a minute, rounded, at least one minute", () => {
  const words = (n: number) => `<p>${Array.from({ length: n }, () => "Wort").join(" ")}</p>`;
  assert.equal(WORDS_PER_MINUTE, 200);
  assert.equal(readingMinutes(words(30)), 1);
  assert.equal(readingMinutes(words(1000)), 5);
  assert.equal(readingMinutes(words(1100) + "<pre><code>a = 1</code></pre>"), 6);
  // Symbols and tags are not words.
  assert.equal(readingMinutes(`<table><tr><td>–</td><td>·</td></tr></table>${words(400)}`), 2);
  for (const locale of LOCALES)
    for (const slug of docSlugs) {
      const m = loadDoc(slug, locale)!.minutes;
      assert.ok(Number.isInteger(m) && m >= 1 && m <= 40, `${locale}/${slug}: ${m} min`);
    }
});
test("'new' marks in the front matter name existing sections with a date", () => {
  assert.deepEqual(frontMatter("---\nkeywords: a\nnew: x 2026-11-12, y 2026-01-02\n---\n# T").fresh, [
    { id: "x", date: "2026-11-12" },
    { id: "y", date: "2026-01-02" },
  ]);
  assert.throws(() => frontMatter("---\nnew: x\n---\n# T"));
  const now = Date.parse("2026-11-20T12:00:00Z");
  assert.deepEqual(
    freshSections([{ id: "old", date: "2026-08-01" }, { id: "a", date: "2026-11-01" }, { id: "b", date: "2026-11-12" }, { id: "future", date: "2026-12-01" }], now).map((m) => m.id),
    ["b", "a"],
  );
  let marks = 0;
  for (const locale of LOCALES)
    for (const slug of docSlugs) {
      const doc = loadDoc(slug, locale)!;
      const { fresh } = frontMatter(readFileSync(join(process.cwd(), doc.source), "utf8"));
      for (const m of fresh) {
        marks++;
        assert.ok(doc.toc.some((e) => e.id === m.id), `${locale}/${slug}: "new: ${m.id}" is not a level-2 or level-3 heading`);
        assert.ok(Date.parse(m.date) <= Date.now(), `${locale}/${slug}: ${m.id} is dated in the future`);
      }
    }
  assert.ok(marks > 0);
});

// ---- Previous, next and related pages

test("previous and next follow the sidebar and stay within the area", () => {
  for (const area of docAreas("de")) {
    const order = area.groups.flatMap((g) => g.pages.map((p) => p.slug));
    assert.deepEqual(areaPages(order[0]), order);
    order.forEach((slug, i) => {
      const { prev, next } = neighbours(slug);
      assert.equal(prev, order[i - 1], `${slug}: previous`);
      assert.equal(next, order[i + 1], `${slug}: next`);
    });
    const first = loadDoc(order[0], "en")!;
    const last = loadDoc(order.at(-1)!, "en")!;
    assert.equal(first.prev, undefined, `${area.id}: nothing before the first page`);
    assert.equal(last.next, undefined, `${area.id}: nothing after the last page`);
  }
  const doc = loadDoc("formatting", "en")!;
  assert.deepEqual([doc.prev?.slug, doc.next?.slug], ["markdown-editor", "tasks-in-documents"]);
  assert.equal(doc.next?.title, "Tasks in documents");
});
test("related pages: at most four, existing, not the page or its neighbours, most related first", () => {
  for (const locale of LOCALES)
    for (const slug of docSlugs) {
      const related = relatedPages(slug, locale);
      const { prev, next } = neighbours(slug);
      assert.ok(related.length <= 4, slug);
      assert.equal(new Set(related).size, related.length);
      for (const other of related) {
        assert.ok(docSlugs.includes(other));
        assert.ok(other !== slug && other !== prev && other !== next, `${slug}: ${other}`);
      }
      assert.deepEqual(loadDoc(slug, locale)!.related.map((p) => p.slug), related);
    }
  // Same group and links between them: the configuration pages belong together.
  assert.deepEqual(relatedPages("environment-variables", "de").slice(0, 3), ["configuration", "configuration-storage", "configuration-integrations"]);
  // Almost every page finds some.
  assert.ok(docSlugs.filter((slug) => relatedPages(slug, "de").length >= 2).length >= docSlugs.length * 0.9);
});
