---
keywords: flashcards, card types, cloze, cloze deletion, type the answer, multiple choice, Anki cloze, c1, answer options
---

# Flashcards: card types

Besides front and back, Flowplan knows cloze, type the answer and multiple choice – here is how you write them and how Flowplan asks them. Which type applies to a record and how you create a deck is under [Flashcards](/flashcards#card-types); pictures you learn with [image occlusion](/flashcards-occlusion).

## Cloze

In a text property you write a cloze as in Anki: `{{c1::Paris}} lies on the {{c2::Seine::river}}`. The number is the cloze's number; after a second `::` comes a hint shown in the gap. Every number becomes a card of its own; the same number twice asks both places on one card. The card for `c1` shows “[…] lies on the Seine” – the other clozes as plain text –, after revealing the answer is highlighted.

In a record's document you select the text and choose **As cloze (new number)** or **As cloze (same number as before)** under **…** in the text menu – or type <kbd>/</kbd> **Cloze**. With the keyboard: ++⌘⌥G++ / ++Ctrl+Alt+G++ for a new number, with ++Shift++ for the number of the cloze before it; on a cloze the same shortcut removes it. In the editor clozes are tinted and carry their number (c1, c2 …); when reading the page they are covered like a spoiler, a click shows them. In the Markdown export they are written as `{{c1::…}}`, and the Markdown import turns them back into clozes.

- A front/back record with clozes on a side becomes cloze cards by itself – so imported cards need no type of their own.
- With the clozes in the document (the back), the card shows the title above it; with the clozes on the front, the back comes as a note after revealing.
- Learning states belong to the number: renumber clozes and the learning state goes with the new number.
- Nested clozes (`{{c1::… {{c2::…}} …}}`) are read flat: the inner one counts as text of the outer one.
- {since=0.10.0} **Cloze (flashcard)** in the formatting toolbar does the same; it starts hidden ([customize the toolbar](/formatting#format-text)).
- {since=0.10.0} [Search](/search-and-notifications#quick-search) reads `{{c2::Seine::river}}` as “Seine”.

## Type the answer

A field sits under the front; <kbd>Enter</kbd> checks. Flowplan compares with the back (for a document its first paragraph) and shows the differences character by character – what you typed too much struck through, what is missing underlined. Separate several right answers in the back with `|`, such as `colour | color`.

- **Correct** suggests **Good**, **Almost** (one character different, for answers of six characters or more) **Hard**, otherwise **Again**. The suggestion is highlighted, <kbd>Enter</kbd> or <kbd>Space</kbd> take it – but you may choose any rating.
- What the comparison passes over is set per deck: upper and lower case, accents (é = e, off by default because they matter in languages) and punctuation. Spaces at the ends and double spaces never count.
- <kbd>Esc</kbd> in a field with text first leaves the field; a second <kbd>Esc</kbd> ends the session.
- {since=0.11.0} If the back holds only the expected answer, Flowplan does not show it a second time after checking; extra and note stay.

## Multiple choice

The card shows the right answer (the back) among wrong ones. The wrong ones come from the property under **Answer options** (one option per line, on one line separated by `;`, or the values of a multi-select) – if some are missing, Flowplan adds backs of other cards of the same deck, preferably with the same tags and a similar length. Only cards you may study yourself come into question: no private records of others, no hidden properties, in a sub-deck only its cards.

- The order of the answers is shuffled anew for every review and stays while the card is shown.
- Pick with a tap or the keys <kbd>A</kbd> to <kbd>E</kbd> (before revealing also <kbd>1</kbd> to <kbd>5</kbd>). Right suggests **Good**, wrong **Again**; you may rate otherwise.
- {since=0.11.0} After your pick the right answer carries ✓ “correct” and a wrong pick ✗ “your choice, wrong” – not just a colour. If the back is only the right answer, it is not repeated below.
- Multiple choice is easier than free recall – good to start with; for remembering, front/back and type the answer work better.
