import { createHash } from "node:crypto";

// A block of Markdown as a short hash of its text, link targets left out
// (links may point elsewhere after the split). Used by split-docs.ts and
// tests/split.test.ts.
export const blockKey = (raw: string) =>
  createHash("sha1")
    .update(raw.replace(/\]\([^)]*\)/g, "]()").replace(/\s+/g, " ").trim())
    .digest("hex")
    .slice(0, 10);
