---
keywords: block, handle, block menu, move, drag, select, duplicate, indent, text direction
new: selecting-several-blocks 2026-11-13
---

# Working with blocks

Every block has a handle on its left: drag it to move the block, click it to open the block menu for turning it into something else, colouring, duplicating and moving. Select several blocks at once with the mouse or the keyboard.

**More on this topic:** [Documents and the editor](/documents) · [Formatting, callouts and captions](/formatting) · [Keyboard shortcuts](/keyboard-shortcuts#in-a-document)

## Handle and dragging

**+** and a handle (`⋮⋮`) appear to the left of a block – to keep the page calm, only where you are: at the block under the mouse pointer (anywhere on its row, the margin to its left included) and at the block with the cursor. Blocks inside toggles, callouts and quotes have a handle of their own; the box keeps its handle too. You can still reach the handles by keyboard (<kbd>Tab</kbd> outside the text); a handle with keyboard focus always shows, with a ring. On touch devices only the block with the cursor has a handle, large enough to tap – so tap into the block first. Empty paragraphs have no handle unless the cursor is in them. To see every handle, turn on **Settings → Appearance & language → Editor → Always show block handles** (on this device). Reading mode and locked pages have no handles.

- **+** adds an empty block below and opens the [block menu with /](/documents#the-block-menu-with) right away; hold <kbd>⌥</kbd>/<kbd>Alt</kbd> to add it above.
- **Dragging** the handle shows an insertion line – also into callouts, quotes or columns. How far left or right you drag picks the level: to the right over a list item the block becomes its sub-item (the line indents), to the left it lands one level up – that's how you nest lists and move blocks into or out of toggles. At the left or right edge of a block you get columns. Hold <kbd>⌥</kbd>/<kbd>Alt</kbd> when you let go to drop a **copy**; the original stays.

List items and tasks stay what they are when moved: outside their list they form a list of the same kind of their own, and a numbered item keeps its number. Right next to a matching list they become part of it; in another kind of list they adapt.

++⌘ ⇧ ↑/↓++ moves the current block past its neighbour. Every block action can be undone on its own.

## Block menu

A click on the handle highlights the block and opens the **block menu** (from the bottom on phones). At its top is a **search field**: typing filters every action and block type, <kbd>Enter</kbd> runs the first hit. With a mouse, submenus open to the side; on phones in place. Entries show their keyboard shortcuts.

- **Turn into …** – text, heading 1–4, bulleted list, numbered list, task list, [toggle](/documents#toggles), toggle heading 1–4, quote, callout, code, block equation, **page** (the block becomes a sub-page, a link to it stays) or **2 or 3 columns**; list items become a toggle with their sub-items as its content, quotes and callouts can be dissolved
- **Colour** – text or background colour for the whole block (see [block colours](/formatting#block-colours))
- **Duplicate** (++⌘ D++), **Move** (up, down, below a heading of the page, to the top or to the end), **Comment**, **Ask AI**, **Copy link to block** and **Delete**
- **Callout type**, **Symbol** and **Colour** (callouts), **Width** (videos and embeds) and **Text direction** where they fit
- **Select several** – the selection mode on touch devices

## Selecting several blocks

With a mouse, drag a **rectangle** from the margin or an empty spot: every block it touches is selected and tinted light blue. <kbd>Esc</kbd> in a block selects it, ++↑++/++↓++ select the block before or after, ++⇧ ↑++/++⇧ ↓++ or ++⇧++-click on a handle extend the selection, ++⌘ A++ twice selects all blocks. On the selection, <kbd>Delete</kbd>, ++⌘ D++ (duplicate), ++⌘ ⇧ ↑/↓++ (move), <kbd>Tab</kbd>/++⇧ Tab++ (indent), ++⌘ C++/++⌘ X++/++⌘ V++ (copy, cut, paste blocks after it) and `/` (block menu for all) work; dragging any of their handles moves all. A click into the text or <kbd>Esc</kbd> ends the selection.

On touch devices **Select several** in the block menu starts the **selection mode**: circles take the place of the handles, a tap selects a block, another one extends the selection up to it; when all items of a list are chosen, the whole list is. The bar at the bottom moves, duplicates, moves below a heading or deletes the selection, **⋯** holds the rest of the block menu. **Done** or <kbd>Esc</kbd> ends the mode.

## Indent

- <kbd>Tab</kbd> at the start of a paragraph or heading indents it (up to eight levels), ++⇧ Tab++ outdents it. If a [toggle](/documents#toggles) is directly above, <kbd>Tab</kbd> moves the block into it instead, and ++⇧ Tab++ moves it back out. Lines indented before stay as they are.
- <kbd>Backspace</kbd> at the start of an indented line first removes one level.
- In lists <kbd>Tab</kbd> nests the item below the previous one; in code blocks it inserts two spaces, in tables it moves to the next cell. With a [block selection](#selecting-several-blocks), <kbd>Tab</kbd> also moves code blocks and tables into a toggle.

## Text direction

Paragraphs, headings, lists, quotes, callouts and table cells in Arabic, Hebrew or Persian run **right to left automatically**: the direction follows the block's first letter. Bullets, checkboxes, quote bars, callout icons and block handles are then on the right.

In the block menu (click the handle `⋮⋮`) → **Text direction** you set **Automatic**, **Left to right** or **Right to left** for a block and everything inside it. The direction is kept in the HTML export; Markdown has no place for it.
