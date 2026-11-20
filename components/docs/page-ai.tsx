import { requestLocale } from "@/lib/i18n-server";
import { translate } from "@/lib/i18n";
import { CopyMarkdown } from "./copy-markdown";
import s from "./docs.module.css";

// Under a page's title: ask Claude or ChatGPT about the page (plain links
// with the prompt in the address, lib/ask-ai.ts), copy the page as Markdown
// or open it. Nothing is counted; without JavaScript the links still work.
// Only the copy button (copy-markdown.tsx) runs in the browser.
export async function PageAi({ claude, chatgpt, markdown }: { claude: string; chatgpt: string; markdown: string }) {
  const t = translate(await requestLocale());
  const newTab = <span className="sr-only"> ({t("öffnet in neuem Tab", "opens in a new tab")})</span>;
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
      <CopyMarkdown markdown={markdown} />
      <a href={markdown} type="text/markdown">
        {t("Markdown öffnen", "View as Markdown")}
      </a>
    </div>
  );
}
