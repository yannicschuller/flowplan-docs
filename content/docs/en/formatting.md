---
keywords: bold, italic, colour, highlight, spoiler, callout, admonition, caption, figure
---

# Formatting, callouts and captions

Format text, use callouts in five kinds and with your own icon, caption and number images and tables.

## Format text

The **toolbar** above the text has all formatting and blocks: bold, italic, underline, strikethrough, highlight, colour and background colour, superscript and subscript, **Hide (spoiler)**, link, heading, task, alignment, lists, inline formulas and more blocks. Selecting text – or right-clicking it – opens the **text menu** with the quick actions right at the text: reactions for the paragraph, **bold**, *italic*, link, code, **Comment**, **Footnote** and **Copy**, the results of a selected calculation, and in tasks also **Due date**. The text menu appears above the selection – right under the toolbar it appears below it, so it never covers the toolbar. Underline, strikethrough and highlight are in the toolbar and on their shortcuts (<kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>U</kbd>, <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>S</kbd>, <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>H</kbd>); where no toolbar is shown (e.g. in focus mode), the text menu offers them as well.

- **Menu on text selection**: under **Settings → Appearance & language → Editor → Menu on text selection** you choose when selecting shows the text menu – **Always**, **Only on a computer** (the default) or **Never**. "Only on a computer" depends on what you select with: with a mouse, trackpad or the keyboard (<kbd>⇧</kbd> + arrow keys) the menu appears, with a finger on a phone or tablet it does not – there the system's selection menu (cut, copy, paste) and the toolbar above the keyboard, with formatting and **Comment**, take over. On an iPad with a trackpad it appears when you select with the trackpad, not with your finger. A **right click** opens the text menu with every setting, also with "Never". The setting applies to your account on all devices.
- **On a phone**: **Comment** is in the toolbar above the keyboard (and as **Comment on text** below the document), **Footnote** in the **+** menu or with `/footnote`. Reactions are in the text menu – with **Always** when selecting, and on Android also by a long press where the browser reports it as a right click.

- Formatting only applies to the current line. After <kbd>Enter</kbd> the new line starts as normal text – only lists and tasks continue with a new item, and a heading is followed by a paragraph.
- **Turn into**: in the text menu (also on right-click in a line) a line changes its type without losing its text – text, heading 1–3, bulleted list, numbered list, task, quote or code block. The current type is highlighted.

### Spoiler

Hidden text stays hidden while you write. A click on the area reveals it, another one hides it again. <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>H</kbd> hides the selection. Sticky notes and text on whiteboards can be hidden too.

## Callouts

Callouts come in five kinds, as on GitHub, Forgejo and Obsidian: **Note** (blue), **Tip** (green), **Important** (purple), **Warning** (yellow) and **Caution** (red). Each kind has its icon and a title in the reader's language. With the cursor in a callout, `/tip`, `/warning` etc. change its kind; so does the block menu (click the handle `⋮⋮`) → **Callout type**.

### Your own symbol and colour

So that a callout serves other purposes too – an idea 💡, a date 📅, a key point ★ –, the block menu gives it a symbol and a colour of its own:

- **Symbol** → **Choose emoji or character …** opens the emoji picker (the same as for page icons, with search, categories and skin tone). Under **Or a character of your own** you can also type a character such as ★, → or ✓ – exactly one emoji or symbol character is allowed, no letters, digits, punctuation or spaces. **Remove symbol** brings back the icon of the kind.
- **Colour** offers the nine text colours (grey, brown, orange, yellow, green, blue, purple, pink, red); **Default** goes back to the kind's colour. The colours read well in the light and the dark theme.

The kind stays: it gives the title (“Tip”, “Warning” …) and is used for the Markdown export. Symbol and colour are kept when copying, duplicating, in templates, versions, published pages, when printing and in the PDF, EPUB and Word export. [Encrypted spaces](/encrypted-spaces) have no callouts.

### Callouts in Markdown

Markdown export writes callouts as GitHub alerts (`> [!WARNING]`). A symbol of its own leads the text, a colour of its own follows as a comment at the end that GitHub does not show:

```markdown
> [!TIP]
>
> 💡 The / menu is quicker.
>
> <!-- flowplan:callout color=green -->
```

Import (Markdown, ZIP, Notion) turns `> [!NOTE]` to `> [!CAUTION]` back into callouts of that kind; Obsidian's further kinds map to the nearest one (e.g. `danger` → Caution, `hint` → Tip), and a custom title (`> [!WARNING] Read first`) becomes a bold first line. A single emoji or symbol followed by a space at the start of the text becomes the callout's symbol; the colour comment restores the colour. Callouts from Notion's Markdown export (`<aside>💡 …</aside>`) become callouts with their emoji.

## Captions

Images, tables and code blocks can have a short **caption** – one line that says what the block shows. It appears small and muted below the block.

- **Add**: point at the block or put the cursor in it (tapping an image is enough), and **Add caption** appears below it. Or use the block menu (handle `⋮⋮`) → **Add caption**.
- **Typing**: a caption is plain text on one line (up to 500 characters). <kbd>Enter</kbd> or <kbd>↓</kbd> continue below the block, <kbd>Esc</kbd> or <kbd>↑</kbd> go back into it. Others see the caption right away when editing together; <kbd>⌘</kbd> <kbd>Z</kbd> in the document undoes changes.
- **Remove**: delete the text and leave the field (or press <kbd>⌫</kbd> in the empty field), or block menu → **Remove caption**.
- **Images**: the caption does not replace the alt text for screen readers. When an image has a caption, the block menu offers **Use caption as alt text**.
- Captions are kept when copying and pasting, moving, duplicating, in templates, versions, on published pages, when printing and in every export, and search finds them. From HTML (for example pasted web pages or Notion's HTML export), `<figure>` with `<figcaption>` and tables with `<caption>` become captions.

### Numbering captions

**Page actions (…) → Number captions** puts a number in front of the captions of a page: "Figure 1", "Table 1", "Listing 1" (for code). Each kind is counted separately in document order, and only blocks that have a caption count. The label follows the language Flowplan is shown in (English: Figure/Table/Listing, German: Abbildung/Tabelle/Listing, French: Figure/Tableau/Listing). The switch applies to the whole page and everyone who reads it – also on published pages, when printing and in the exports. Copies of the page keep it. Record documents in databases don't have it.
