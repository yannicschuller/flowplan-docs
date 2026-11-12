// Writes content/reference.json from a checkout of the app's repository
// (github.com/yannicschuller/flowplan): the data of the reference pages,
// read from the app's code so they stay complete.
//
//   slash      every entry of the "/" block menu (components/editor.tsx,
//              lib/callout-types.ts, components/slash-menu.tsx)
//   shortcuts  the default keyboard shortcuts (lib/keymap.ts, names from
//              components/keyboard-shortcuts.tsx)
//   nodes      every workflow node type (lib/workflows/catalog.ts)
//   env        every environment variable the server, its scripts and the
//              image read (process.env.X, env.X, env: "X", $X in shell,
//              .env.example, Dockerfile)
//
// The pages /slash-commands and /environment-variables are written from it;
// /keyboard-shortcuts and /workflow-nodes are written by hand, and the tests
// check them against it (tests/reference.test.ts).
//
//   FLOWPLAN_DIR=../flowplan npm run reference            write it
//   npm run reference -- --check                           only compare (exit 1)
//
// The checkout is only read. The build does not run this (CI has no
// checkout): the file is committed, like content/facts.json. Run it when the
// app changes, then `npm test` names what the pages still lack.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const app = process.env.FLOWPLAN_DIR || join(process.cwd(), "..", "flowplan");
const out = join(process.cwd(), "content", "reference.json");
if (!existsSync(join(app, "lib", "keymap.ts"))) {
  console.error(`reference: no Flowplan checkout at ${app} (set FLOWPLAN_DIR)`);
  process.exit(1);
}
const read = (file) => readFileSync(join(app, file), "utf8");
const fail = (message) => {
  console.error(`reference: ${message} – has the app's code changed shape? Adjust scripts/reference-data.mjs.`);
  process.exit(1);
};
// A string literal at the start of `text` ("…", '…' or `…` without ${}).
const STRING = String.raw`"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'`;
const unquote = (literal) => JSON.parse(literal.startsWith("'") ? `"${literal.slice(1, -1).replace(/"/g, '\\"')}"` : literal);
// t("Deutsch", "English") → ["Deutsch", "English"]
const pair = (text) => {
  const m = text.match(new RegExp(String.raw`\bt\(\s*(${STRING})\s*,\s*(${STRING})\s*\)`));
  return m ? [unquote(m[1]), unquote(m[2])] : undefined;
};
const strings = (text) => [...text.matchAll(new RegExp(STRING, "g"))].map((m) => unquote(m[0]));

// ------------------------------------------------------------ "/" menu
function slashCommands() {
  const editor = read("components/editor.tsx");
  const start = editor.indexOf("const commands: SlashItem[] = [");
  if (start < 0) fail("components/editor.tsx has no `const commands: SlashItem[]`");
  const end = editor.indexOf("\n  ];\n", start);
  const lines = editor.slice(start, end).split("\n");
  // Conditional entries: ...(condition ? [ … ] : []) or ...(c ? [] : [ … ]).
  const notes = {
    "aiWrite !== \"hidden\" && !embedded": ["Wenn KI zum Schreiben eingeschaltet ist", "When AI writing is on"],
    "drawioEditor()": ["Wenn die Instanz draw.io anbietet", "When the instance offers draw.io"],
    rowId: ["Nicht in Einträgen einer Datenbank", "Not in database records"],
    "editable && nativeScanAvailable()": ["In den Apps für iPhone, iPad und Android", "In the apps for iPhone, iPad and Android"],
  };
  const labels = read("lib/callout-types.ts");
  const calloutNames = Object.fromEntries([...labels.matchAll(/^\s*(\w+): (t\(.*\)),$/gm)].map((m) => [m[1], pair(m[2])]));
  const calloutDescriptions = {};
  {
    const block = labels.slice(labels.indexOf("calloutDescriptions"));
    for (const m of block.slice(0, block.indexOf("});")).matchAll(/^\s*(\w+): (t\(.*\)),$/gm)) calloutDescriptions[m[1]] = pair(m[2]);
  }
  const menu = read("components/slash-menu.tsx");
  const groupBlock = menu.slice(menu.indexOf("slashGroupLabels"));
  const groups = Object.fromEntries([...groupBlock.slice(0, groupBlock.indexOf("});")).matchAll(/^\s*(\w+): (t\(.*\)),$/gm)].map((m) => [m[1], pair(m[2])]));

  const commands = [];
  let condition, current;
  const finish = () => {
    if (!current) return;
    if (!current.name || !current.group || !current.description) fail(`slash entry "${current.id}" lacks a name, group or description`);
    commands.push(current);
    current = undefined;
  };
  for (const line of lines) {
    const opens = line.match(/^\s*\.\.\.\((.+?)\s*$/);
    if (opens) {
      finish();
      condition = opens[1].replace(/\s*\?\s*(\[\s*\]\s*)?$/, "");
      continue;
    }
    if (/^\s*:\s*\[\s*\]\),?\s*$/.test(line) || /^\s*\](\)?),?\s*$/.test(line)) {
      // `: [])` or `])` closes a conditional; a lone `]` closes its list.
      if (/:\s*\[\s*\]|\]\)/.test(line)) {
        finish();
        condition = undefined;
      }
      continue;
    }
    const id = line.match(/^\s*id: "([^"]+)",/);
    if (id) {
      finish();
      current = { id: id[1], ...(condition ? { condition } : {}) };
      continue;
    }
    if (!current) continue;
    const group = line.match(/^\s*group: "(\w+)"/);
    if (group && !current.group) current.group = group[1];
    const name = line.match(/^\s*name: (.+),\s*$/);
    if (name && !current.name) current.name = pair(name[1]) ?? (/^"[^"]*"$/.test(name[1]) ? [unquote(name[1]), unquote(name[1])] : undefined);
    const keywords = line.match(/^\s*keywords: \[(.*)\],\s*$/);
    if (keywords && !current.keywords) current.keywords = strings(keywords[1]);
    const description = line.match(/^\s*description: (.+),\s*$/);
    if (description && !current.description) current.description = pair(description[1]);
    // The callout kinds: the second level of "callout".
    if (current.id === "callout" && /children: CALLOUT_TYPES\.map/.test(line)) {
      const kinds = editor.slice(start).match(/(note: \[[^\]]*\],\s*tip: [\s\S]*?caution: \[[^\]]*\]),?\s*\}\[type\]/);
      if (!kinds) fail("the keywords of the callout kinds are missing");
      const words = Object.fromEntries([...kinds[1].matchAll(/(\w+): \[([^\]]*)\]/g)].map((m) => [m[1], strings(m[2])]));
      current.children = Object.keys(words).map((kind) => {
        if (!calloutNames[kind] || !calloutDescriptions[kind]) fail(`callout kind "${kind}" has no name or description`);
        return { id: `callout-${kind}`, name: calloutNames[kind], keywords: words[kind], description: calloutDescriptions[kind] };
      });
    }
  }
  finish();
  for (const c of commands) {
    if (c.condition) {
      const note = notes[c.condition];
      if (!note) fail(`slash entry "${c.id}" has a condition the generator does not know: ${c.condition}`);
      c.note = note;
      delete c.condition;
    }
    if (!groups[c.group]) fail(`slash group "${c.group}" has no name`);
  }
  if (commands.length < 30 || new Set(commands.map((c) => c.id)).size !== commands.length) fail("fewer than 30 slash entries, or duplicate ids");
  if (!/pluginCommands\.map/.test(editor.slice(start, end))) fail("the block extensions' entries moved");
  return { groups, commands };
}

// --------------------------------------------------------- shortcuts
function shortcuts() {
  const keymap = read("lib/keymap.ts");
  const component = read("components/keyboard-shortcuts.tsx");
  const actionsText = keymap.match(/SHORTCUT_ACTIONS = \[([\s\S]*?)\] as const/)?.[1];
  if (!actionsText) fail("SHORTCUT_ACTIONS not found");
  const actions = strings(actionsText);
  const defaults = keymap.slice(keymap.indexOf("DEFAULT_KEYMAP: Keymap = {"));
  const combos = Object.fromEntries(
    [...defaults.slice(0, defaults.indexOf("\n};")).matchAll(/^\s*(\w+): \[(.*)\],/gm)].map((m) => [m[1], strings(m[2])]),
  );
  const labelOf = Object.fromEntries([...component.matchAll(/case "(\w+)":\s*return (t\(.*\));/g)].map((m) => [m[1], pair(m[2])]));
  const global = actions.map((id) => {
    if (!combos[id] || !labelOf[id]) fail(`shortcut "${id}" has no default or no name`);
    return { id, name: labelOf[id], combos: combos[id] };
  });
  const editorText = keymap.match(/EDITOR_SHORTCUTS[^=]*= \[([\s\S]*?)\n\];/)?.[1];
  if (!editorText) fail("EDITOR_SHORTCUTS not found");
  const editorList = [];
  for (const line of editorText.split("\n")) {
    const one = line.match(/\{ combo: "([^"]+)", id: "(\w+)" \}/);
    if (one) editorList.push({ combo: one[1], id: one[2] });
    const range = line.match(/\.\.\.\[([\d, ]+)\]\.map\(\(n\) => \(\{ combo: `([^`]*)\$\{n\}`, id: "(\w+)" \}\)\)/);
    if (range) for (const n of range[1].split(",").map((x) => x.trim())) editorList.push({ combo: `${range[2]}${n}`, id: range[3] });
  }
  const labelBlock = component.slice(component.indexOf("const editorLabels"));
  const editorLabels = Object.fromEntries(
    [...labelBlock.slice(0, labelBlock.indexOf("\n};")).matchAll(/^\s*(\w+): \[(.*)\],$/gm)].map((m) => [m[1], strings(m[2])]),
  );
  const editor = editorList.map((e) => {
    if (!editorLabels[e.id]) fail(`editor shortcut "${e.id}" has no name`);
    return { ...e, name: editorLabels[e.id] };
  });
  if (global.length < 10 || editor.length < 20) fail("too few shortcuts");
  return { global, editor };
}

// -------------------------------------------------------- workflow nodes
function nodes() {
  const catalog = read("lib/workflows/catalog.ts");
  const categoriesText = catalog.match(/NODE_CATEGORIES = \[(.*)\] as const/)?.[1];
  if (!categoriesText) fail("NODE_CATEGORIES not found");
  const categories = strings(categoriesText);
  const text = catalog.slice(catalog.indexOf("const NODE_TEXT"), catalog.indexOf("\n};", catalog.indexOf("const NODE_TEXT")));
  const names = {};
  for (const m of text.matchAll(/^ {2}"([a-z.]+)": \{([\s\S]*?)^ {2}\},?$/gm)) {
    const name = m[2].match(/name: \[([\s\S]*?)\],/);
    const description = m[2].match(/description: \[([\s\S]*?)\],/);
    names[m[1]] = { name: strings(name?.[1] ?? ""), description: strings(description?.[1] ?? "") };
  }
  const types = catalog.slice(catalog.indexOf("export const NODE_TYPES"));
  const list = [...types.matchAll(/^ {4}type: "([a-z.]+)",\s*\n\s*category: "(\w+)"/gm)].map((m) => ({ type: m[1], category: m[2] }));
  const result = list.map(({ type, category }) => {
    const t = names[type];
    if (!t || t.name.length !== 2 || t.description.length !== 2) fail(`node "${type}" has no German and English name and description`);
    if (!categories.includes(category)) fail(`node "${type}" has an unknown category`);
    return { type, category, name: t.name, description: t.description };
  });
  if (result.length < 30 || result.length !== Object.keys(names).length) fail(`${result.length} node types, ${Object.keys(names).length} names`);
  return { categories, nodes: result };
}

// ------------------------------------------------- environment variables
function environment() {
  const NAME = "[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+|[A-Z]{3,}";
  const patterns = [
    new RegExp(String.raw`\benv\.(${NAME})\b`, "g"),
    new RegExp(String.raw`\benv\[\s*["'\`](${NAME})["'\`]\s*\]`, "g"),
    new RegExp(String.raw`\benv: "(${NAME})"`, "g"),
    new RegExp(String.raw`\b\w*[eE]nv\w*\(\s*["'](${NAME})["']`, "g"),
  ];
  const shell = [new RegExp(String.raw`\$\{?(${NAME})\b`, "g")];
  // Set by Node, Next.js, the test runner or the build itself – not settings.
  const internal = new Set([
    "NODE_ENV", "NODE_OPTIONS", "NODE_TEST_CONTEXT", "NEXT_PHASE", "NEXT_RUNTIME", "NEXT_MANUAL_SIG_HANDLE", "PATH", "HOME", "PWD", "TZ",
    "FLOWPLAN_BUILT_AT", "FLOWPLAN_COMMIT", "FLOWPLAN_CHANNEL", "FLOWPLAN_LITESTREAM_ACTIVE", "CI", "GITHUB_ACTIONS", "TMPDIR", "USER", "HOSTNAME_OVERRIDE",
  ]);
  const found = new Map();
  const add = (name, file) => {
    if (internal.has(name)) return;
    if (!found.has(name)) found.set(name, new Set());
    found.get(name).add(file);
  };
  const walk = (dir) => {
    const full = join(app, dir);
    if (!existsSync(full)) return [];
    if (statSync(full).isFile()) return [dir];
    return readdirSync(full).flatMap((name) => (name === "node_modules" || name.startsWith(".") ? [] : walk(join(dir, name))));
  };
  const files = ["lib", "app", "components", "instrumentation.ts", "proxy.ts", "server.ts", "scripts/production-server.mjs", "docker"]
    .flatMap(walk)
    .filter((f) => /\.(ts|tsx|mjs|js|sh)$/.test(f) && !/\.test\.|\/tests?\//.test(f));
  for (const file of files) {
    const text = read(file);
    for (const re of file.endsWith(".sh") ? shell : patterns) for (const m of text.matchAll(re)) add(m[1], file);
  }
  for (const m of read(".env.example").matchAll(/^#?\s*([A-Z][A-Z0-9_]+)=/gm)) add(m[1], ".env.example");
  for (const m of read("Dockerfile").matchAll(/^\s*(?:ENV|ARG)\s+([A-Z][A-Z0-9_]+)/gm)) add(m[1], "Dockerfile");
  // Lowercase shell variables and proxies the system reads are not Flowplan's.
  for (const name of [...found.keys()]) if (!/_/.test(name) && !["PORT", "HOSTNAME", "PUID", "PGID", "INBOX"].includes(name)) found.delete(name);
  const variables = [...found.keys()].sort().map((name) => ({ name, read: [...found.get(name)].sort() }));
  if (variables.length < 100) fail(`only ${variables.length} environment variables`);
  return variables.map((v) => v.name);
}

let commit = "";
try {
  commit = execFileSync("git", ["-C", app, "rev-parse", "--short", "HEAD"], { encoding: "utf8" }).trim();
} catch {}
const data = { source: `github.com/yannicschuller/flowplan${commit ? `@${commit}` : ""}`, slash: slashCommands(), shortcuts: shortcuts(), workflow: nodes(), env: environment() };
const text = JSON.stringify(data, null, 2) + "\n";
let previous = "";
try {
  previous = readFileSync(out, "utf8");
} catch {}
if (process.argv.includes("--check")) {
  // Up to date when only the commit differs.
  const strip = (t) => t.replace(/^  "source": .*\n/m, "");
  if (strip(previous) === strip(text)) {
    console.log("reference: content/reference.json is up to date.");
    process.exit(0);
  }
  console.error("reference: content/reference.json is out of date – run `npm run reference`.");
  process.exit(1);
}
writeFileSync(out, text);
console.log(
  `reference: ${data.slash.commands.length} "/" entries, ${data.shortcuts.global.length}+${data.shortcuts.editor.length} shortcuts, ${data.workflow.nodes.length} workflow nodes, ${data.env.length} environment variables from ${relative(process.cwd(), app) || app}${previous === text ? " (unchanged)" : ""}`,
);
