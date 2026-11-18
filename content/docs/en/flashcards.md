---
keywords: flashcards, cards, vocabulary, study, learning, spaced repetition, FSRS, Anki, deck, cloze, multiple choice, Quizlet, CSV, statistics
---

# Flashcards

Any database can become a deck of flashcards: a record is a card, and the view **Study** quizzes you. Flowplan uses FSRS to plan when you see a card again – shortly before you would forget it. Everyone has their own learning state; read access is enough to study.

## Creating a deck {since=0.10.0}

There are several ways to a deck:

- **New page → Database → Flashcards**: the database comes with the properties **Front** (the title), **Back**, **Tags** and {since=0.10.0} **Card type**, and the views **Study** and **All cards**. The cards are set up already.
- **Template “Flashcard database”** (category Knowledge): as above, with the properties **Example** and **Wrong answers** and {since=0.10.0} one sample card per card type. More decks: [templates](/templates#flashcards-as-templates).
- {since=0.10.0} **Import cards** in the study view brings cards from CSV, Quizlet and other text ([Import and export flashcards](/flashcards-import)), **Import from Anki** on the [Study](#all-decks-study) page whole Anki decks ([Import from Anki](/flashcards-import#import-from-anki)).
- {since=0.10.0} **Create with AI** proposes cards from a page, a selection or a PDF ([Flashcards with AI](/flashcards-ai)).
- **An existing database**: **Add view → Study** gives it a study view. If nothing is set up yet, **Set up cards** opens right away.

## Setting up cards

**Set up cards** decides what goes on a card. It applies to the whole database, not to one view – so two study views of the same database study the same cards with the same learning state.

| Setting | Meaning |
| --- | --- |
| Front | a property (usually the title) or the record's document above a line |
| Back | a property, the record's whole document or the document below a line |
| Hint | a property you can show before revealing |
| Extra | a property shown under the answer after revealing |
| Card type {since=0.10.0} | the same for all records or from a select property ([card types](#card-types)) |
| Answer options {since=0.10.0} | for multiple choice: a property with the wrong answers; without one, Flowplan takes the backs of other cards |
| Tags {since=0.10.0} | a select or multi-select property; generated answer options prefer cards with the same tags |
| Typed answers: ignore {since=0.10.0} | what the comparison passes over: upper and lower case (on), accents (off), punctuation (on) |
| Also study in reverse | a second card per record: back → front |
| New cards per day | default 20 |
| Reviews per day | default 200 |
| Retention | default 90 % |

Text, number, select, multi-select, URL, email and phone properties work as sides. Front and back need different content. A record only becomes a card when both sides have something in them.

Anyone who may edit the database may set up its cards. If you change the mapping later, everybody's learning state is kept – the cards keep their keys.

### Content from the document

For images, formulas, code or longer answers, use the record's document. The simplest form: **title as the front, document as the back**. If the front needs more than a sentence too, split the document with a horizontal line – type `---`, as for [presenting](/reading-and-presenting). Everything above the first line is the question, everything below it the answer. Without a line, the whole document is the answer.

## Card types {since=0.10.0}

| Card type | How Flowplan asks | Cards per record |
| --- | --- | --- |
| Front/back | show the front, reveal the answer, rate yourself | 1, with reverse 2 |
| Cloze | show the text with a gap | one per cloze number |
| Type the answer | type the answer into a field, Flowplan compares | 1, with reverse 2 |
| Multiple choice | three to five answers to pick from | 1 |
| Image occlusion | a picture with covered areas ([image occlusion](/flashcards-occlusion)) | one per mask or group |

Under **Card type** in **Set up cards**, one type applies to all records, or it comes from a select property: options named “Cloze”, “Type the answer”, “Multiple choice” or “Image occlusion” (German names too) are recognised by themselves, others you map to a type in the dialog; empty means front/back. Switching between front/back and type the answer keeps the learning state.

How you write gaps and how Flowplan compares typed answers or offers choices is under [Card types](/flashcards-card-types).

## Sub-decks through filters

A study view studies the cards that match its [filters](/views). With the filter **Tags contains “Chapter 3”** it becomes a sub-deck. Sub-decks share the deck's daily limits. In the view's settings you also choose whether new cards come between, before or after the reviews, and whether in the order they were added or at random.

## The overview

The study view shows what is left today: **new**, **learning** and **due**, each already within your daily limits. Below are the number of cards, your limits and the retention.

{since=0.10.2} A study view has no sorting and no search – FSRS plans the order. The filter stays; on a phone it is an icon on one line with the other buttons, with **Start studying** right below.

- **Start studying** opens the focus mode.
- **Study more today** gives you **+10 new cards** or **+50 reviews** for today – on the next study day the normal limit applies again.
- **My settings**: your own limits and your own retention for this deck. An empty field takes the deck's default. Nothing changes for others.
- {since=0.10.0} **Statistics** opens the deck's [statistics](#statistics), **Import cards** the [import](/flashcards-import), **Create with AI** the [AI suggestions](/flashcards-ai), **Export** downloads the cards as CSV or an Anki package.

## Studying in focus mode

The focus mode fills the screen with one card. {since=0.10.2} At the top are the counts as three coloured numbers – **New** · **Learning** · **Due** –, the kind of the card you see underlined. On a phone a tap on the numbers shows their names. Below them the progress shows as a bar with “1 / 20”, at the top right **Undo**.

1. Read the front and recall the answer.
2. Reveal it: <kbd>Space</kbd>, <kbd>Enter</kbd>, a tap on the card or **Show answer**.
3. Rate yourself honestly. Each button shows when the card comes back, such as “10 min” or “10 days”.

| Rating | Key | Swipe | Meaning |
| --- | --- | --- | --- |
| Again | <kbd>1</kbd> | left | not known – comes back in a few minutes |
| Hard | <kbd>2</kbd> | down | known with effort |
| Good | <kbd>3</kbd>, <kbd>Space</kbd> | right | known |
| Easy | <kbd>4</kbd> | up | known at once – the gap grows more |

- <kbd>Z</kbd> (or ++⌘/Ctrl Z++) undoes the last rating; the card comes back unrated. This works for the last ratings of the session, at most 24 hours back.
- <kbd>H</kbd> shows the hint, <kbd>Esc</kbd> ends the session.
- **Swiping** on phones and tablets works after revealing. A gesture that starts at the edge of the screen (24 pixels) belongs to the system or the app – such as “back” – and does not move the card. The buttons are always there.
- {since=0.10.2} While you swipe, the card takes the rating's colour and shows the rating large in its middle. On touch devices a line above the buttons recalls the directions: “← Again · ↑ Easy · ↓ Hard · Good →”.
- {since=0.10.2} At the end a summary shows how many cards you studied (each card counted once, with how many of them were new), the study time, the share known (Good or Easy) and your streak. Below, your ratings spread over Again, Hard, Good and Easy, and how many cards are due tomorrow.
- {since=0.10.0} When only cards in the learning phase are left that come back later, the session shows **Next card in 25 min** and loads it by itself when it is time. **Show sooner** (or <kbd>Space</kbd>) brings it at once.

The focus mode works fully with the keyboard and a screen reader: the answer is read out after revealing, every button says its rating and the next date. {since=0.10.2} On revealing, the answer briefly folds down below the question; the question stays in its place. If you choose less motion in the settings or reduce it in your system, there are no animations.

## How Flowplan schedules

Flowplan uses **FSRS-6**, the method Anki offers as well. For every card it estimates how stable it is in your memory and puts the next review where you still know it with the chosen retention (90 %). A higher retention means reviewing more often and forgetting less. [Optimising](/flashcards-optimize) fits FSRS to you.

- **New**: never studied. New cards only count against the daily limit when you rate them for the first time.
- **Learning steps**: a new card comes back after 1 and 10 minutes, a forgotten one after 10 minutes. Learning steps do not count against the limits.
- **Review**: after that, the card comes back after days, weeks or months. So that the cards of one day do not all come back on the same day, Flowplan spreads the gaps a little.
- **Siblings**: once you study one card of a record, its reverse card waits for the next study day.
- **The study day starts at 04:00** in your time zone – studying after midnight still counts for the day before. Flowplan takes the time zone from your device.

## All decks: Study {since=0.10.0}

**Study** at the bottom of the sidebar (or “Study: due cards” in quick search, a shortcut of your own in the [keyboard shortcuts](/keyboard-shortcuts)) shows all decks of the workspace with what is left today: new, learning, due – within your daily limits. {since=0.10.2} At the top, **Today: … cards** counts all three together; **due** means the reviews only. **Study** next to a deck starts it, **Study all decks** goes through the decks one after the other, each with its limits; at the end of a deck **Continue with …** moves on to the next. Below are the statistics of all decks, at the top your streak.

The numbers are for the whole deck. A study view with filters studies only part of it, and siblings of a card studied today wait until tomorrow – so a session may show a few cards less.

On the [home page](/first-steps#customize-your-home-page) the widget **Due cards** shows the same: how many cards are due today, the decks with new and due cards, your streak and **Study**. In the widget's settings you choose all decks or certain ones.

{since=0.10.0} [Quick search](/search-and-notifications#commands) offers every deck with cards for today as a command, such as **Study: Spanish A1**.

## Reminder, app and offline {since=0.10.0}

Study reminder, widget **Cards due**, studying without a connection, and API and MCP: [Flashcards: reminder, app, offline and API](/flashcards-app).

## Statistics {since=0.10.0}

The statistics show your own numbers only – for one deck (**Statistics** in the study view) or for all (under **Study**):

| Figure | Meaning |
| --- | --- |
| Today | ratings, new cards, minutes and share correct |
| Streak | study days in a row up to today; if you have not studied yet today, the streak counts on up to yesterday |
| Ratings per day | a year as squares, the darker the more; as a table per month |
| Due in the next 30 days | cards per study day; overdue ones count today |
| True retention | the share of reviews you did not rate “Again”, over 7, 30 and 365 days – next to your target. {since=0.10.2} With fewer than 20 reviews in 30 days the tile shows **Too few reviews yet** instead of a number |
| Cards by state | new, learning, young (remembered under 21 days, that is stability under 21 days), mature (21 days or more), suspended |

Days are study days (starting at 04:00). Every chart has a table for screen readers.

## In the journal {since=0.10.0}

Below every journal day, [Completed this day](/journal#completed-this-day) has one line per deck you studied that day, such as **Studied 32 cards** in Spanish A1 – with the time of the last rating and a link to the deck. The journal counts by the **calendar day** in your time zone like all its entries, not by the study day: study at 01:30 and the line is on the new day, while the statistics still count the cards for the day before. The line is always yours – under **All** too, nobody sees what others studied. A day on which you only studied is not empty and stays.

## Import and export {since=0.10.0}

CSV, TSV, Quizlet and Anki in, CSV and Anki packages out: [Import and export flashcards](/flashcards-import).

## Sharing and publishing {since=0.10.0}

Shared or published, a deck can be browsed and practised without an account: [Flashcards through a link](/sharing#flashcards-through-a-link).

## Who sees what

- **Studying** is open to everyone who may read the database – members, guests of a [shared page](/sharing) and readers. The learning state is yours alone: nobody else sees it, not the workspace's owners and not the administration.
- **Setting up and editing cards** needs write access. A rating is no edit: it does not show in the page's activity.
- Other people's private records and [hidden properties](/database-properties) never become cards. If a side of the cards is hidden from you, there are no cards for you.
- A record in the trash leaves the deck; restore it and its learning state is back. If you leave the workspace, your learning state there is deleted. Deleting the account removes everything.
- [Encrypted spaces](/encrypted-spaces) have no flashcards.
