// Flo's answers as React elements: the service sends a small Markdown subset
// (paragraphs, lists, bold and italic, inline code, code blocks, links),
// already cleaned – but the browser does not rely on that. marked only
// splits the text into tokens; every token becomes a React element or plain
// text, so nothing from an answer is ever parsed as HTML (no
// dangerouslySetInnerHTML). HTML in an answer shows as the text it is, and
// a link renders only when lib/flo.ts allows its address: links into these
// docs open on this site in the same tab, the others in a new one.
import { Fragment, type ReactNode } from "react";
import { Lexer, type Token, type Tokens } from "marked";
import { allowedLink, docsPath } from "./flo";

export type FloMarkdownOptions = { prefix: string; newTab: string };

const lexer = (text: string) => new Lexer({ gfm: true, breaks: false }).lex(text);

export function renderFloMarkdown(text: string, options: FloMarkdownOptions): ReactNode {
  let tokens: Token[];
  try {
    tokens = lexer(text);
  } catch {
    return <p>{text}</p>;
  }
  return blocks(tokens, options);
}

function blocks(tokens: Token[], o: FloMarkdownOptions): ReactNode[] {
  return tokens.map((token, i) => <Fragment key={i}>{block(token, o)}</Fragment>);
}

function block(token: Token, o: FloMarkdownOptions): ReactNode {
  switch (token.type) {
    case "space":
    case "def":
      return null;
    case "paragraph":
      return <p>{inline((token as Tokens.Paragraph).tokens, o)}</p>;
    case "heading":
      return (
        <p>
          <strong>{inline((token as Tokens.Heading).tokens, o)}</strong>
        </p>
      );
    case "code":
      // Wide code scrolls and takes keyboard focus for it.
      return (
        <pre tabIndex={0}>
          <code>{(token as Tokens.Code).text}</code>
        </pre>
      );
    case "blockquote":
      return <blockquote>{blocks((token as Tokens.Blockquote).tokens, o)}</blockquote>;
    case "hr":
      return <hr />;
    case "list": {
      const list = token as Tokens.List;
      const items = list.items.map((item, i) => <li key={i}>{blocks(item.tokens, o)}</li>);
      return list.ordered ? <ol start={typeof list.start === "number" && list.start !== 1 ? list.start : undefined}>{items}</ol> : <ul>{items}</ul>;
    }
    case "text": {
      // Text directly in a tight list item.
      const t = token as Tokens.Text;
      return t.tokens ? inline(t.tokens, o) : t.text;
    }
    default:
      // Tables, HTML and anything else: as the plain text it was written as.
      return <p>{"raw" in token && typeof token.raw === "string" ? token.raw.trim() : ""}</p>;
  }
}

function inline(tokens: Token[] | undefined, o: FloMarkdownOptions): ReactNode[] {
  return (tokens || []).map((token, i) => <Fragment key={i}>{span(token, o)}</Fragment>);
}

function span(token: Token, o: FloMarkdownOptions): ReactNode {
  switch (token.type) {
    case "text": {
      const t = token as Tokens.Text;
      return t.tokens ? inline(t.tokens, o) : t.text;
    }
    case "escape":
      return (token as Tokens.Escape).text;
    case "strong":
      return <strong>{inline((token as Tokens.Strong).tokens, o)}</strong>;
    case "em":
      return <em>{inline((token as Tokens.Em).tokens, o)}</em>;
    case "del":
      return <del>{inline((token as Tokens.Del).tokens, o)}</del>;
    case "codespan":
      return <code>{(token as Tokens.Codespan).text}</code>;
    case "br":
      return <br />;
    case "image":
      return (token as Tokens.Image).text;
    case "link": {
      const link = token as Tokens.Link;
      const label = inline(link.tokens, o);
      const href = allowedLink(link.href);
      if (!href) return label;
      const local = docsPath(href, o.prefix);
      if (local) return <a href={local}>{label}</a>;
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
          <span className="sr-only"> ({o.newTab})</span>
        </a>
      );
    }
    default:
      // Inline HTML and the rest: shown as text.
      return "raw" in token && typeof token.raw === "string" ? token.raw : "";
  }
}
