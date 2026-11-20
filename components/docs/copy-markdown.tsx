"use client";
import { useEffect, useRef, useState } from "react";
import { useT } from "../i18n";

// "Copy as Markdown" under a page's title (page-ai.tsx), with the result
// announced to screen readers.
export function CopyMarkdown({ markdown }: { markdown: string }) {
  const t = useT();
  const [status, setStatus] = useState<"" | "done" | "failed">("");
  const reset = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(reset.current), []);

  async function copy() {
    const text = () =>
      fetch(markdown, { headers: { Accept: "text/markdown" } }).then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      });
    let ok = false;
    try {
      // Safari allows writing only during the click: hand over a promise.
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write)
        await navigator.clipboard.write([new ClipboardItem({ "text/plain": text().then((md) => new Blob([md], { type: "text/plain" })) })]);
      else await navigator.clipboard.writeText(await text());
      ok = true;
    } catch {
      try {
        await navigator.clipboard.writeText(await text());
        ok = true;
      } catch {}
    }
    setStatus(ok ? "done" : "failed");
    clearTimeout(reset.current);
    reset.current = setTimeout(() => setStatus(""), 2500);
  }

  return (
    <>
      <button type="button" onClick={copy}>
        {status === "done" ? t("Markdown kopiert", "Markdown copied") : status === "failed" ? t("Nicht kopiert", "Not copied") : t("Als Markdown kopieren", "Copy as Markdown")}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {status === "done" ? t("Die Seite ist als Markdown kopiert.", "The page was copied as Markdown.") : status === "failed" ? t("Kopieren hat nicht geklappt.", "Copying did not work.") : ""}
      </span>
    </>
  );
}
