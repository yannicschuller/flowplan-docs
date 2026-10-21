// Writes content/last-modified.json: for every Markdown page the date of the
// last commit that touched it, so the sitemap and the "last updated" line
// come from the history rather than from file times (which are all the same
// in a Docker image). Runs before the build (npm run build → prebuild).
//
// Without git or in a shallow clone the dates would be wrong, so then an
// existing file is kept and otherwise an empty one is written: the pages
// simply show no date.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "content", "last-modified.json");
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

let usable = false;
try {
  usable = git("rev-parse", "--is-inside-work-tree") === "true" && git("rev-parse", "--is-shallow-repository") === "false";
} catch {
  usable = false;
}
if (!usable) {
  if (existsSync(out)) console.log("last-modified: no full git history, keeping content/last-modified.json");
  else {
    writeFileSync(out, "{}\n");
    console.log("last-modified: no full git history, wrote an empty content/last-modified.json");
  }
  process.exit(0);
}

const files = [];
for (const dir of ["content/docs", "content/docs/en"])
  for (const name of readdirSync(join(root, dir)).filter((f) => f.endsWith(".md")).sort()) files.push(`${dir}/${name}`);

const dates = {};
for (const file of files) {
  const date = git("log", "-1", "--format=%cI", "--", file);
  if (date) dates[file] = date;
}
writeFileSync(out, JSON.stringify(dates, null, 2) + "\n");
console.log(`last-modified: ${Object.keys(dates).length} files`);
