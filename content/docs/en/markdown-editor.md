---
keywords: markdown, shortcuts, markdown shortcuts, source, ChatGPT, paste, code block
---

# Markdown in the editor

The editor understands Markdown: shortcuts as you type, whole pages edited as Markdown text, and answers from ChatGPT that arrive formatted when you paste them.

## Markdown shortcuts

While you type, the editor converts:

| Type | Result |
| --- | --- |
| `#`, `##`, `###` + space | Heading 1–3 |
| `-` or `*` + space | Bulleted list |
| `1.` + space | Numbered list |
| `[]` + space | Task |
| `>` + space | [Toggle](/documents#toggles) (or quote, see below) |
| `"` + space | Quote (also with „ “ ”) |
| ` ``` ` | Code block |
| `---` | Divider |
| `**bold**`, `*italic*`, `` `code` ``, `~~strike~~` | Formatting in the text |

**`>` as a quote:** if you are used to `>` for quotes from Markdown, switch **Settings → Appearance & language → Editor → “>” creates** to **Quote**. The setting applies to your account on all devices. It only affects typing: in imported Markdown files and in answers pasted from ChatGPT & co., `> text` becomes a quote as before, and the Markdown export still writes quotes as `> text`.

Code blocks carry their language in the fence: ` ```python `, ` ```typescript `, ` ```terraform `. The export writes the ids of VS Code/Shiki; the import also understands aliases and older names (`js`, `ts`, `py`, `sh`, `yml`, `cpp`, `csharp`, `plaintext` …) and stores them with the full id (` ```js ` becomes JavaScript, exported again as ` ```javascript `). Unknown languages are kept and show as "(imported)" in the block, without highlighting.

Line numbers, highlighted lines, the view and collapsing follow the language in the fence, in the usual notation: ` ```ts {3-5} showLineNumbers startLine=10 `, plus `view=preview`/`view=split`/`view=code`, `collapsed` and `collapsedLines=15`. The import also understands `showLineNumbers{10}` (rehype-pretty-code), `showLineNumbers=10` and `hl_lines="3 4"`/`linenums="10"` (MkDocs). The numbers in `{…}` count from the block's first line, whatever its start number. ` ```mermaid ` fences become code blocks that show the diagram.

## Edit as Markdown

**Page menu … → Edit as Markdown** shows the whole page as Markdown text with line numbers – handy for big rearrangements, find and replace, or if you prefer writing Markdown.

- **Apply** (++⌘ Enter++) saves a version first and replaces the content in one step; **Undo** takes the change back.
- Blocks without a Markdown form – embeds, whiteboards, linked databases, synced blocks, columns, tables with merged cells or widths, sized images, function graphs, metrics and bibliographies – appear as a marker `<!-- flowplan:block … -->`. You can move or delete them but not change them; they come back unchanged. If one is deleted, Flowplan asks before applying.
- Formatting without a Markdown form (colours, superscript, spoilers, mentions, citations) is kept as HTML in the text.
- **Alignment, indent, text direction and reactions** are lost when applying; the view says beforehand what is affected.
- If someone changes the page while you write in Markdown, a notice appears; **Apply anyway** then overwrites their changes.
- People who may only read – also on locked pages and in reading mode – see **View as Markdown** without Apply.

## Pasting answers from ChatGPT

Text copied from ChatGPT or another assistant is formatted when pasted: LaTeX formulas (`\[ … \]`, `\( … \)`, `$$ … $$`) become formula blocks and inline formulas, Markdown (headings, **bold**, lists, tables) is applied, lines with tabs become a table, `☐` a task list, and each line becomes its own paragraph. Formulas already rendered on a copied web page stay formulas. This also applies when copying straight from the ChatGPT web page. If formulas are already in the document as text (such as `\[ A(3;2;1) \]`), select them – or everything with ++⌘/Ctrl A++ – and choose **Turn into formulas** in the text menu. Ordinary text is pasted as before.
