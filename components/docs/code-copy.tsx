"use client";
import { useEffect } from "react";
import { codeLanguage, track } from "@/lib/track";
import { useT } from "../i18n";

// A "Copy" button on every code block of the page. The blocks come from the
// Markdown as HTML, so the buttons are added here, in the browser; without
// JavaScript the code can still be selected by hand.
export function CodeCopy({ slug }: { slug: string }) {
  const t = useT();
  const label = t("Kopieren", "Copy");
  const done = t("Kopiert", "Copied");
  const failed = t("Nicht kopiert", "Not copied");
  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>("#inhalt .code");
    const added: HTMLButtonElement[] = [];
    for (const block of blocks) {
      if (block.querySelector(":scope > button.copy")) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy";
      button.textContent = label;
      let reset: ReturnType<typeof setTimeout> | undefined;
      button.addEventListener("click", async () => {
        const text = block.querySelector("code")?.textContent ?? "";
        let ok = false;
        try {
          await navigator.clipboard.writeText(text);
          ok = true;
        } catch {}
        if (ok) track("copy", { page: slug, lang: codeLanguage(block.dataset.lang) });
        button.textContent = ok ? done : failed;
        clearTimeout(reset);
        reset = setTimeout(() => (button.textContent = label), 2000);
      });
      block.appendChild(button);
      added.push(button);
    }
    return () => added.forEach((b) => b.remove());
  }, [slug, label, done, failed]);
  return null;
}
