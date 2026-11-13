"use client";
import { useEffect, useRef, useState } from "react";
import { useT } from "../i18n";
import s from "./docs.module.css";

// Under a page's title: ask Claude or ChatGPT about the page (plain links
// with the prompt in the address, lib/ask-ai.ts), copy the page as Markdown
// or open it. Nothing is counted; without JavaScript the links still work.
export function PageAi({ claude, chatgpt, markdown }: { claude: string; chatgpt: string; markdown: string }) {
  const t = useT();
  const [status, setStatus] = useState<"" | "done" | "failed">("");
  const reset = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(reset.current), []);
  const newTab = <span className="sr-only"> ({t("öffnet in neuem Tab", "opens in a new tab")})</span>;

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
    <div className={s.pageAi} role="group" aria-label={t("Diese Seite mit KI nutzen", "Use this page with AI")}>
      <a href={claude} target="_blank" rel="noopener noreferrer">
        {t("In Claude fragen", "Ask Claude")}
        {newTab}
      </a>
      <a href={chatgpt} target="_blank" rel="noopener noreferrer">
        {t("In ChatGPT fragen", "Ask ChatGPT")}
        {newTab}
      </a>
      <button type="button" onClick={copy}>
        {status === "done" ? t("Markdown kopiert", "Markdown copied") : status === "failed" ? t("Nicht kopiert", "Not copied") : t("Als Markdown kopieren", "Copy as Markdown")}
      </button>
      <a href={markdown} type="text/markdown">
        {t("Markdown öffnen", "View as Markdown")}
      </a>
      <span className="sr-only" role="status" aria-live="polite">
        {status === "done" ? t("Die Seite ist als Markdown kopiert.", "The page was copied as Markdown.") : status === "failed" ? t("Kopieren hat nicht geklappt.", "Copying did not work.") : ""}
      </span>
    </div>
  );
}
