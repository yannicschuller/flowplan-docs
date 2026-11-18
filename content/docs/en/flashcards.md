---
keywords: flashcards, cards, vocabulary, study, learning, spaced repetition, FSRS, Anki, deck
---

# Flashcards

Any database can become a deck of flashcards: a record is a card, and the view **Study** quizzes you. Flowplan uses FSRS to plan when you see a card again – shortly before you would forget it. Everyone has their own learning state; read access is enough to study.

## Creating a deck {since=0.9.9}

There are three ways to a deck:

- **New page → Database → Flashcards**: the database comes with the properties **Front** (the title), **Back** and **Tags**, and the views **Study** and **All cards**. The cards are set up already.
- **Template “Flashcard database”** (category Knowledge): as above, with a property **Example** and six sample cards to try.
- **An existing database**: **Add view → Study** gives it a study view. If nothing is set up yet, **Set up cards** opens right away.

## Setting up cards

**Set up cards** decides what goes on a card. It applies to the whole database, not to one view – so two study views of the same database study the same cards with the same learning state.

| Setting | Meaning |
| --- | --- |
| Front | a property (usually the title) or the record's document above a line |
| Back | a property, the record's whole document or the document below a line |
| Hint | a property you can show before revealing |
| Extra | a property shown under the answer after revealing |
| Also study in reverse | a second card per record: back → front |
| New cards per day | default 20 |
| Reviews per day | default 200 |
| Retention | default 90 % |

Text, number, select, multi-select, URL, email and phone properties work as sides. Front and back need different content. A record only becomes a card when both sides have something in them.

Anyone who may edit the database may set up its cards. If you change the mapping later, everybody's learning state is kept – the cards keep their keys.

### Content from the document

For images, formulas, code or longer answers, use the record's document. The simplest form: **title as the front, document as the back**. If the front needs more than a sentence too, split the document with a horizontal line – type `---`, as for [presenting](/reading-and-presenting). Everything above the first line is the question, everything below it the answer. Without a line, the whole document is the answer.

## Sub-decks through filters

A study view studies the cards that match its [filters](/views). With the filter **Tags contains “Chapter 3”** it becomes a sub-deck. Sub-decks share the deck's daily limits. In the view's settings you also choose whether new cards come between, before or after the reviews, and whether in the order they were added or at random.

## The overview

The study view shows what is left today: **new**, **in learning steps** and **due**, each already within your daily limits. Below are the number of cards, your limits and the retention.

- **Start studying** opens the focus mode.
- **Study more today** gives you **+10 new cards** or **+50 reviews** for today – on the next study day the normal limit applies again.
- **My settings**: your own limits and your own retention for this deck. An empty field takes the deck's default. Nothing changes for others.

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

The focus mode works fully with the keyboard and a screen reader: the answer is read out after revealing, every button says its rating and the next date. If you choose less motion in the settings or reduce it in your system, there are no animations.

## How Flowplan schedules

Flowplan uses **FSRS-6**, the method Anki offers as well. For every card it estimates how stable it is in your memory and puts the next review where you still know it with the chosen retention (90 %). A higher retention means reviewing more often and forgetting less.

- **New**: never studied. New cards only count against the daily limit when you rate them for the first time.
- **Learning steps**: a new card comes back after 1 and 10 minutes, a forgotten one after 10 minutes. Learning steps do not count against the limits.
- **Review**: after that, the card comes back after days, weeks or months. So that the cards of one day do not all come back on the same day, Flowplan spreads the gaps a little.
- **Siblings**: once you study one card of a record, its reverse card waits for the next study day.
- **The study day starts at 04:00** in your time zone – studying after midnight still counts for the day before. Flowplan takes the time zone from your device.

## Who sees what

- **Studying** is open to everyone who may read the database – members, guests of a [shared page](/sharing) and readers. The learning state is yours alone: nobody else sees it, not the workspace's owners and not the administration.
- **Setting up and editing cards** needs write access. A rating is no edit: it does not show in the page's activity.
- Other people's private records and [hidden properties](/database-properties) never become cards. If a side of the cards is hidden from you, there are no cards for you.
- A record in the trash leaves the deck; restore it and its learning state is back. If you leave the workspace, your learning state there is deleted. Deleting the account removes everything.
- [Encrypted spaces](/encrypted-spaces) have no flashcards.

## API and MCP

With the [API](/api-and-webhooks) you can study from your own programs too: `study.queue` (or `GET /api/pages/{id}/study`) returns the next cards with the counts, `study.review` rates, `study.undo` undoes, `study.prefs` sets your own limits, `study.settings` sets up the cards. Read-only tokens can read cards and counts but not rate. The [MCP server](/mcp) has the tool `study_decks`: your decks of a workspace with what is due today. All shapes are in the [OpenAPI description](/openapi).
