// Copies two files from the app's repository (github.com/yannicschuller/flowplan)
// before the build (npm run build → prebuild):
//
//   CHANGELOG.md → content/changelog.md   the "What's new" page
//   facts.json   → content/facts.json     counts the pages state ({{facts.…}})
//
// and the latest release's tag (GitHub API, scripts/latest-release.mjs) into
// content/release.json, for the version markers {since=X.Y.Z} of the pages.
//
// Like scripts/last-modified.mjs it never fails the build: without network,
// or when a file looks wrong, the committed copy stays. FLOWPLAN_APP_RAW
// points to another base address (a branch, or file:///path/to/flowplan/).
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fetchLatestRelease, releaseFile } from "./latest-release.mjs";

const base = (process.env.FLOWPLAN_APP_RAW || "https://raw.githubusercontent.com/yannicschuller/flowplan/main/").replace(/\/?$/, "/");
const root = process.cwd();
const FACT_KEYS = ["views", "fieldTypes", "questionTypes", "languages", "templates", "templateCategories"];

async function fetchText(name) {
  const url = new URL(name, base);
  if (url.protocol === "file:") return readFileSync(url, "utf8");
  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function write(file, text, label) {
  const out = join(root, file);
  let previous = "";
  try {
    previous = readFileSync(out, "utf8");
  } catch {}
  if (previous !== text) writeFileSync(out, text);
  console.log(`app-files: ${label}${previous === text ? " (unchanged)" : " (updated)"}`);
}

async function copy(name, file, check) {
  try {
    const text = await fetchText(name);
    const result = check(text);
    write(file, result.text, result.label);
  } catch (error) {
    console.log(`app-files: could not read ${name} (${error.message}), keeping ${file}`);
  }
}

await copy("CHANGELOG.md", "content/changelog.md", (text) => {
  const releases = text.match(/^## v\d+\.\d+\.\d+/gm)?.length ?? 0;
  if (!text.startsWith("# Changelog") || releases === 0) throw new Error("not a changelog with releases");
  return { text: text.endsWith("\n") ? text : text + "\n", label: `changelog with ${releases} releases` };
});

await copy("facts.json", "content/facts.json", (text) => {
  const data = JSON.parse(text);
  const facts = {};
  for (const key of FACT_KEYS) {
    if (!Number.isInteger(data[key]) || data[key] <= 0) throw new Error(`"${key}" is missing or not a positive number`);
    facts[key] = data[key];
  }
  return { text: JSON.stringify(facts, null, 2) + "\n", label: `facts ${FACT_KEYS.map((k) => `${k} ${facts[k]}`).join(", ")}` };
});

try {
  const release = await fetchLatestRelease();
  // The release page (the fallback) has no date; keep the one we know.
  if (!release.published) {
    try {
      const known = JSON.parse(readFileSync(join(root, "content/release.json"), "utf8"));
      if (known.tag === release.tag) release.published = known.published ?? null;
    } catch {}
  }
  write("content/release.json", releaseFile(release), `latest release ${release.tag}`);
} catch (error) {
  console.log(`app-files: could not read the latest release (${error.message}), keeping content/release.json`);
}
