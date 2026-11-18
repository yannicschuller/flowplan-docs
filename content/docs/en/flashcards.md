---
keywords: flashcards, cards, vocabulary, study, learning, spaced repetition, FSRS, Anki, deck, cloze, multiple choice, Quizlet, CSV, statistics
---

# Flashcards

Any database can become a deck of flashcards: a record is a card, and the view **Study** quizzes you. Flowplan uses FSRS to plan when you see a card again – shortly before you would forget it. Everyone has their own learning state; read access is enough to study.

## Creating a deck {since=0.9.9}

There are several ways to a deck:

- **New page → Database → Flashcards**: the database comes with the properties **Front** (the title), **Back**, **Tags** and {since=0.9.9} **Card type**, and the views **Study** and **All cards**. The cards are set up already.
- **Template “Flashcard database”** (category Knowledge): as above, with a property **Example** and six sample cards to try – among them a cloze and a card to type the answer.
- {since=0.9.9} **Import cards** in the study view brings cards from CSV, Quizlet and other text ([Import and export flashcards](/flashcards-import)), **Import from Anki** on the [Study](#all-decks-study) page whole Anki decks ([Import from Anki](/flashcards-import#import-from-anki)).
- {since=0.9.9} **Create with AI** proposes cards from a page, a selection or a PDF ([Flashcards with AI](/flashcards-ai)).
- **An existing database**: **Add view → Study** gives it a study view. If nothing is set up yet, **Set up cards** opens right away.

## Setting up cards

**Set up cards** decides what goes on a card. It applies to the whole database, not to one view – so two study views of the same database study the same cards with the same learning state.

| Setting | Meaning |
| --- | --- |
| Front | a property (usually the title) or the record's document above a line |
| Back | a property, the record's whole document or the document below a line |
| Hint | a property you can show before revealing |
| Extra | a property shown under the answer after revealing |
| Card type {since=0.9.9} | the same for all records or from a select property ([card types](#card-types)) |
| Answer options {since=0.9.9} | for multiple choice: a property with the wrong answers; without one, Flowplan takes the backs of other cards |
| Tags {since=0.9.9} | a select or multi-select property; generated answer options prefer cards with the same tags |
| Typed answers: ignore {since=0.9.9} | what the comparison passes over: upper and lower case (on), accents (off), punctuation (on) |
| Also study in reverse | a second card per record: back → front |
| New cards per day | default 20 |
| Reviews per day | default 200 |
| Retention | default 90 % |

Text, number, select, multi-select, URL, email and phone properties work as sides. Front and back need different content. A record only becomes a card when both sides have something in them.

Anyone who may edit the database may set up its cards. If you change the mapping later, everybody's learning state is kept – the cards keep their keys.

### Content from the document

For images, formulas, code or longer answers, use the record's document. The simplest form: **title as the front, document as the back**. If the front needs more than a sentence too, split the document with a horizontal line – type `---`, as for [presenting](/reading-and-presenting). Everything above the first line is the question, everything below it the answer. Without a line, the whole document is the answer.

## Card types {since=0.9.9}

| Card type | How Flowplan asks | Cards per record |
| --- | --- | --- |
| Front/back | show the front, reveal the answer, rate yourself | 1, with reverse 2 |
| Cloze | show the text with a gap | one per cloze number |
| Type the answer | type the answer into a field, Flowplan compares | 1, with reverse 2 |
| Multiple choice | three to five answers to pick from | 1 |
| Image occlusion | a picture with covered areas ([image occlusion](/flashcards-occlusion)) | one per mask or group |

Under **Card type** in **Set up cards**, one type applies to all records, or it comes from a select property: options named “Cloze”, “Type the answer”, “Multiple choice” or “Image occlusion” (German names too) are recognised by themselves, others you map to a type in the dialog; empty means front/back. Switching between front/back and type the answer keeps the learning state.

### Cloze

In a text property you write a cloze as in Anki: `{{c1::Paris}} lies on the {{c2::Seine::river}}`. The number is the cloze's number; after a second `::` comes a hint shown in the gap. Every number becomes a card of its own; the same number twice asks both places on one card. The card for `c1` shows “[…] lies on the Seine” – the other clozes as plain text –, after revealing the answer is highlighted.

In a record's document you select the text and choose **As cloze (new number)** or **As cloze (same number as before)** under **…** in the text menu – or type <kbd>/</kbd> **Cloze**. With the keyboard: ++⌘⌥G++ / ++Ctrl+Alt+G++ for a new number, with ++Shift++ for the number of the cloze before it; on a cloze the same shortcut removes it. In the editor clozes are tinted and carry their number (c1, c2 …); when reading the page they are covered like a spoiler, a click shows them. In the Markdown export they are written as `{{c1::…}}`, and the Markdown import turns them back into clozes.

- A front/back record with clozes on a side becomes cloze cards by itself – so imported cards need no type of their own.
- With the clozes in the document (the back), the card shows the title above it; with the clozes on the front, the back comes as a note after revealing.
- Learning states belong to the number: renumber clozes and the learning state goes with the new number.
- Nested clozes (`{{c1::… {{c2::…}} …}}`) are read flat: the inner one counts as text of the outer one.
- {since=0.9.9} **Cloze (flashcard)** in the formatting toolbar does the same; it starts hidden ([customize the toolbar](/formatting#format-text)).
- {since=0.9.9} [Search](/search-and-notifications#quick-search) reads `{{c2::Seine::river}}` as “Seine”.

### Type the answer

A field sits under the front; <kbd>Enter</kbd> checks. Flowplan compares with the back (for a document its first paragraph) and shows the differences character by character – what you typed too much struck through, what is missing underlined. Separate several right answers in the back with `|`, such as `colour | color`.

- **Correct** suggests **Good**, **Almost** (one character different, for answers of six characters or more) **Hard**, otherwise **Again**. The suggestion is highlighted, <kbd>Enter</kbd> or <kbd>Space</kbd> take it – but you may choose any rating.
- What the comparison passes over is set per deck: upper and lower case, accents (é = e, off by default because they matter in languages) and punctuation. Spaces at the ends and double spaces never count.
- <kbd>Esc</kbd> in a field with text first leaves the field; a second <kbd>Esc</kbd> ends the session.

### Multiple choice

The card shows the right answer (the back) among wrong ones. The wrong ones come from the property under **Answer options** (one option per line, on one line separated by `;`, or the values of a multi-select) – if some are missing, Flowplan adds backs of other cards of the same deck, preferably with the same tags and a similar length. Only cards you may study yourself come into question: no private records of others, no hidden properties, in a sub-deck only its cards.

- The order of the answers is shuffled anew for every review and stays while the card is shown.
- Pick with a tap or the keys <kbd>A</kbd> to <kbd>E</kbd> (before revealing also <kbd>1</kbd> to <kbd>5</kbd>). Right suggests **Good**, wrong **Again**; you may rate otherwise.
- Multiple choice is easier than free recall – good to start with; for remembering, front/back and type the answer work better.

## Sub-decks through filters

A study view studies the cards that match its [filters](/views). With the filter **Tags contains “Chapter 3”** it becomes a sub-deck. Sub-decks share the deck's daily limits. In the view's settings you also choose whether new cards come between, before or after the reviews, and whether in the order they were added or at random.

## The overview

The study view shows what is left today: **new**, **in learning steps** and **due**, each already within your daily limits. Below are the number of cards, your limits and the retention.

- **Start studying** opens the focus mode.
- **Study more today** gives you **+10 new cards** or **+50 reviews** for today – on the next study day the normal limit applies again.
- **My settings**: your own limits and your own retention for this deck. An empty field takes the deck's default. Nothing changes for others.
- {since=0.9.9} **Statistics** opens the deck's [statistics](#statistics), **Import cards** the [import](/flashcards-import), **Create with AI** the [AI suggestions](/flashcards-ai), **Export** downloads the cards as CSV or an Anki package.

## Studying in focus mode

The focus mode fills the screen with one card. At the top are the counts (new · learning · due), on the right **Undo**.

1. Read the front and recall the answer.
2. Reveal it: <kbd>Space</kbd>, <kbd>Enter</kbd>, a tap on the card or **Show answer**.
3. Rate yourself honestly. Each button shows when the card comes back.

| Rating | Key | Swipe | Meaning |
| --- | --- | --- | --- |
| Again | <kbd>1</kbd> | left | not known – comes back in a few minutes |
| Hard | <kbd>2</kbd> | down | known with effort |
| Good | <kbd>3</kbd>, <kbd>Space</kbd> | right | known |
| Easy | <kbd>4</kbd> | up | known at once – the gap grows more |

- <kbd>Z</kbd> (or ++⌘/Ctrl Z++) undoes the last rating; the card comes back unrated. This works for the last ratings of the session, at most 24 hours back.
- <kbd>H</kbd> shows the hint, <kbd>Esc</kbd> ends the session.
- **Swiping** on phones and tablets works after revealing. A gesture that starts at the edge of the screen (24 pixels) belongs to the system or the app – such as “back” – and does not move the card. The buttons are always there.
- At the end a summary shows how many cards you studied in how many minutes, how often “Again” and how many are due tomorrow.
- {since=0.9.9} When only cards in learning steps are left that come back later, the session shows **Next card in 25 min** and loads it by itself when it is time. **Show sooner** (or <kbd>Space</kbd>) brings it at once.

The focus mode works fully with the keyboard and a screen reader: the answer is read out after revealing, every button says its rating and the next date. If you choose less motion in the settings or reduce it in your system, there are no animations.

## How Flowplan schedules

Flowplan uses **FSRS-6**, the method Anki offers as well. For every card it estimates how stable it is in your memory and puts the next review where you still know it with the chosen retention (90 %). A higher retention means reviewing more often and forgetting less.

- **New**: never studied. New cards only count against the daily limit when you rate them for the first time.
- **Learning steps**: a new card comes back after 1 and 10 minutes, a forgotten one after 10 minutes. Learning steps do not count against the limits.
- **Review**: after that, the card comes back after days, weeks or months. So that the cards of one day do not all come back on the same day, Flowplan spreads the gaps a little.
- **Siblings**: once you study one card of a record, its reverse card waits for the next study day.
- **The study day starts at 04:00** in your time zone – studying after midnight still counts for the day before. Flowplan takes the time zone from your device.

## All decks: Study {since=0.9.9}

**Study** at the bottom of the sidebar (or “Study: due cards” in quick search, a shortcut of your own in the [keyboard shortcuts](/keyboard-shortcuts)) shows all decks of the workspace with what is left today: new, in learning steps, due – within your daily limits. **Study** next to a deck starts it, **Study all due** goes through the decks one after the other, each with its limits; at the end of a deck **Continue with …** moves on to the next. Below are the statistics of all decks, at the top your streak.

The numbers are for the whole deck. A study view with filters studies only part of it, and siblings of a card studied today wait until tomorrow – so a session may show a few cards less.

On the [home page](/first-steps#customize-your-home-page) the widget **Due cards** shows the same: how many cards are due today, the decks with new and due cards, your streak and **Study**. In the widget's settings you choose all decks or certain ones.

{since=0.9.9} [Quick search](/search-and-notifications#commands) offers every deck with cards for today as a command, such as **Study: Spanish A1**.

## Reminder, app and offline {since=0.9.9}

Study reminder, widget **Cards due**, studying without a connection, and API and MCP: [Flashcards: reminder, app, offline and API](/flashcards-app).

## Statistics {since=0.9.9}

The statistics show your own numbers only – for one deck (**Statistics** in the study view) or for all (under **Study**):

| Figure | Meaning |
| --- | --- |
| Today | ratings, new cards, minutes and share correct |
| Streak | study days in a row up to today; if you have not studied yet today, the streak counts on up to yesterday |
| Ratings per day | a year as squares, the darker the more; as a table per month |
| Due in the next 30 days | cards per study day; overdue ones count today |
| True retention | the share of reviews you did not rate “Again”, over 7, 30 and 365 days – next to your target |
| Cards by state | new, in learning steps, young (stability under 21 days), mature (21 days or more), suspended |

Days are study days (starting at 04:00). Every chart has a table for screen readers.

## In the journal {since=0.9.9}

Below every journal day, [Completed this day](/journal#completed-this-day) has one line per deck you studied that day, such as **Studied 32 cards** in Spanish A1 – with the time of the last rating and a link to the deck. The journal counts by the **calendar day** in your time zone like all its entries, not by the study day: study at 01:30 and the line is on the new day, while the statistics still count the cards for the day before. The line is always yours – under **All** too, nobody sees what others studied. A day on which you only studied is not empty and stays.

## Import and export {since=0.9.9}

CSV, TSV, Quizlet and Anki in, CSV and Anki packages out: [Import and export flashcards](/flashcards-import).

## Who sees what

- **Studying** is open to everyone who may read the database – members, guests of a [shared page](/sharing) and readers. The learning state is yours alone: nobody else sees it, not the workspace's owners and not the administration.
- **Setting up and editing cards** needs write access. A rating is no edit: it does not show in the page's activity.
- Other people's private records and [hidden properties](/database-properties) never become cards. If a side of the cards is hidden from you, there are no cards for you.
- A record in the trash leaves the deck; restore it and its learning state is back. If you leave the workspace, your learning state there is deleted. Deleting the account removes everything.
- [Encrypted spaces](/encrypted-spaces) have no flashcards.
