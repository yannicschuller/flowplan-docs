---
keywords: block, handle, block menu, move, drag, select, duplicate, indent, text direction, tabs
new: selecting-several-blocks 2026-11-13
---

# Working with blocks

Every block has a handle on its left: drag it to move the block, click it to open the block menu for turning it into something else, colouring, duplicating and moving. Select several blocks at once with the mouse or the keyboard.

**More on this topic:** [Documents and the editor](/documents) · [Formatting, callouts and captions](/formatting) · [Keyboard shortcuts](/keyboard-shortcuts#in-a-document)

## Handle and dragging

**+** and a handle (`⋮⋮`) appear to the left of a block – to keep the page calm, only at the block under the mouse pointer (anywhere on its row, the margin to its left included); while you type, they stay hidden until you move the mouse again. The handle sits where the block's text starts, so an indented paragraph has it next to its text. Blocks inside toggles, callouts and quotes have a handle of their own; the box keeps its handle too. A [meeting block](/meetings) has one handle at its title row for the whole block; the blocks in its summary keep theirs. Blocks inside a closed toggle have no handle until it is opened. You can still reach the handles by keyboard (<kbd>Tab</kbd> outside the text); a handle with keyboard focus always shows, with a ring. On touch devices only the block with the cursor has a handle, large enough to tap – so tap into the block first. Empty paragraphs have no handle unless the cursor is in them. To see every handle, turn on **Settings → Appearance & language → Editor → Always show block handles** (on this device). Reading mode and locked pages have no handles.

- **+** adds an empty block below and opens the [block menu with /](/documents#the-block-menu-with) right away; hold <kbd>⌥</kbd>/<kbd>Alt</kbd> to add it above. This works below any block, including tables, images, embeds and columns. Blocks inside columns have no **+** of their own – <kbd>Enter</kbd> and `/` work there.
- **Dragging** the handle shows an insertion line – also into callouts, quotes or columns. How far left or right you drag picks the level: to the right over a list item the block becomes its sub-item (the line indents), to the left it lands one level up – that's how you nest lists and move blocks into or out of toggles. The block that will receive the drop – a list item, list, toggle, callout, quote or column – is lightly tinted while you drag. At the left or right edge of a block you get columns. Hold <kbd>⌥</kbd>/<kbd>Alt</kbd> when you let go to drop a **copy**; the original stays.

List items and tasks stay what they are when moved: outside their list they form a list of the same kind of their own, and a numbered item keeps its number. Right next to a matching list they become part of it; in another kind of list they adapt. Dropped into a list, blocks land at the level of the drop line without empty items: paragraphs become items, other blocks such as tables become part of the item before them.

++⌘ ⇧ ↑/↓++ moves the current block past its neighbour. Every block action can be undone on its own.

**Between two blocks without text** (such as a table and an image), click into the gap or on the edge. With the keyboard, use the arrow keys until the blinking line appears, then type or press <kbd>Enter</kbd>. <kbd>Enter</kbd> on a selected image adds a paragraph below it. The **+** in the [toolbar](/formatting#format-text) above the text inserts the chosen block below the current one – only in an empty paragraph does it replace it. To convert a block, use **Turn into …** in the block menu.

## Block menu

A click on the handle selects the block and opens the **block menu** (from the bottom on phones). <kbd>Esc</kbd> closes the menu and keeps the block [selected](#selecting-several-blocks). With a mouse it opens to the left of the handle, so the block stays visible; only without room on the left does it open to the right. Its heading names the kind of block. At its top is a **search field**: typing filters every action and block type, <kbd>Enter</kbd> runs the first hit. With a mouse, submenus open to the side – further left, or over the menu when there is no room, never over the block; on phones in place. Entries show their keyboard shortcuts.

- **Turn into …** – text, heading 1–4, bulleted list, numbered list, task list, [toggle](/documents#toggles), toggle heading 1–4, quote, callout, code, block equation, **page** (the block becomes a sub-page, a link to it stays) or **2 or 3 columns**; list items become a toggle with their sub-items as its content, quotes and callouts can be dissolved
- **Colour** – text or background colour for the whole block (see [block colours](/formatting#block-colours))
- **Add block below** and **Add block above** – an empty block with the block menu with /, also on touch devices
- **Copy** (++⌘ C++), **Cut** (++⌘ X++), **Duplicate** (++⌘ D++), **Move** (up, down, below a heading of the page, to the top or to the end), **Comment**, **Ask AI**, **Copy link to block** and **Delete**
- **Callout type**, **Symbol** and **Colour** (callouts), **Width** (videos and embeds) and **Text direction** where they fit
- **Select several** – the selection mode on touch devices

## Selecting several blocks

With a mouse, drag a **rectangle** from the margin or an empty spot: every block it touches is selected and tinted light blue. <kbd>Esc</kbd> in a block or a click on its handle selects it (after the click, <kbd>Esc</kbd> first closes the block menu and the selection stays). ++↑++/++↓++ select the block before or after, ++⇧ ↑++/++⇧ ↓++ or ++⇧++-click on a handle extend the selection, ++⌘ A++ (++Ctrl A++) selects all blocks. In text, the first ++⌘ A++ selects the block's text, the second all blocks. On the selection, <kbd>Delete</kbd>, ++⌘ D++ (duplicate), ++⌘ ⇧ ↑/↓++ (move), <kbd>Tab</kbd>/++⇧ Tab++ (indent), ++⌘ C++/++⌘ X++/++⌘ V++ (copy, cut, paste blocks after it) and `/` (block menu for all) work; dragging any of their handles moves all. Copied or cut blocks are pasted back as blocks, also in another page; other apps get the text. A click into the text or <kbd>Esc</kbd> ends the selection.

On touch devices **Select several** in the block menu starts the **selection mode**: circles take the place of the handles, a tap selects a block, another one extends the selection up to it; when all items of a list are chosen, the whole list is. The bar at the bottom moves, copies, duplicates, moves below a heading or deletes the selection, **⋯** holds the rest of the block menu, **Cut** included. **Done** or <kbd>Esc</kbd> ends the mode.

## Indent

- <kbd>Tab</kbd> at the start of a paragraph or heading indents it (up to eight levels), ++⇧ Tab++ outdents it. If a [toggle](/documents#toggles) is directly above, <kbd>Tab</kbd> moves the block into it instead, and ++⇧ Tab++ moves it back out. Lines indented before stay as they are.
- <kbd>Backspace</kbd> at the start of an indented line first removes one level.
- In lists <kbd>Tab</kbd> nests the item below the previous one; if it can't be indented, nothing happens – <kbd>Tab</kbd> never leaves the text. <kbd>Enter</kbd> in an empty list item moves only that item one level up, one level per <kbd>Enter</kbd>; at the top level it becomes a normal paragraph. <kbd>Enter</kbd> at the end of an item with sub-items starts a new first sub-item. In code blocks <kbd>Tab</kbd> inserts two spaces, in tables it moves to the next cell. With a [block selection](#selecting-several-blocks), <kbd>Tab</kbd> also moves code blocks and tables into a toggle.

## Tabs

The **Tabs** block stacks content in tabs – for example instructions for different systems or variants of a text. Type `/tabs` to insert it. Each tab has a title and can hold any blocks: paragraphs, lists, tables, images, toggles and even more tabs.

- **Add:** **+** at the right of the tab strip – type its name right away.
- **Rename:** double-click the tab or press <kbd>F2</kbd>.
- **Reorder:** drag the tab or press ++⌘ ⇧ ←++/++⌘ ⇧ →++ (Windows/Linux: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>←</kbd>/<kbd>→</kbd>).
- **Delete:** <kbd>Delete</kbd> on the tab; **Undo** brings it back. The last tab stays – delete the whole block from its block menu.
- **On phones:** swipe the tab strip; every action is in the **⋯** menu.
- **Keyboard:** <kbd>←</kbd>/<kbd>→</kbd>, <kbd>Home</kbd> and <kbd>End</kbd> switch tabs, <kbd>Enter</kbd> jumps into the tab's content.

Flowplan remembers which tab you're looking at, for you on this device. Others see their own tab, and switching never creates a new version. You can write in different tabs at the same time.

**Turn into → Tabs** makes tabs from selected blocks, each heading starting a new tab. **Turn into → Headings with content** turns them back into plain text.

Printing, PDF, e-books, the HTML export and published pages show all tabs one after another, each with its title as a heading; Word, Confluence and Jira also get a heading per tab.

**Markdown:** Flowplan writes and reads the format of the Obsidian "Tabs" plugin:

````markdown
```tabs
tab: Windows
Download the installer.

tab: Linux
Install the package with your package manager.
```
````

If a tab contains code blocks itself, the outer fence gets longer (`` ````tabs ``) – or use `~~~tabs`. A plugin options line such as `top, multi` is ignored on import.

## Text direction

Paragraphs, headings, lists, quotes, callouts and table cells in Arabic, Hebrew or Persian run **right to left automatically**: the direction follows the block's first letter. Bullets, checkboxes, quote bars, callout icons and block handles are then on the right.

In the block menu (click the handle `⋮⋮`) → **Text direction** you set **Automatic**, **Left to right** or **Right to left** for a block and everything inside it. The direction is kept in the HTML export; Markdown has no place for it.
