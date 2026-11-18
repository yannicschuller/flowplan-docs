---
keywords: flashcards, FSRS, optimise parameters, optimize, optimisation, weights, memory model, recommend retention, optimal retention, CMRR, log loss, RMSE, Anki, sub-deck, card type, workload, time budget, fsrs-rs
---

# Flashcards: optimise parameters

FSRS schedules with 21 parameters that suit most people. Once you have studied enough, Flowplan fits them to your own memory – and suggests a retention. This is optional; the default parameters work well.

## Optimise parameters {since=0.10.0}

In a deck, open **My settings**; under **Memory model (FSRS)** it says which parameters the deck uses for you. **Optimise parameters …** opens the dialog.

1. Choose which ratings to learn from: **This deck** or **All my decks** – {since=0.10.2} or **Part of the deck** (see below). Only your own ratings count – imported ones and those made offline too, undone ones not.
2. **Optimise** starts the calculation. It runs in your browser and the page stays usable; with many thousand ratings it takes a few seconds. Only the 21 numbers go to the server.
3. The result is one sentence: {since=0.10.2} **The new parameters fit you better** – with them Flowplan predicts more accurately when you forget a card – or **No improvement**. **Calculation details** opens the table: how well the model predicts your ratings, with the default parameters, the current ones (if you optimised before) and the new ones. Lower is better:
   - **Log loss**: how surprised the model is by your ratings on average.
   - **RMSE (bins)**: how far the predicted chance of remembering is from your actual share of correct answers, in percentage points.
4. **Use parameters** stores the new parameters; **Keep defaults** or **Keep current** closes without a change. This is only offered when the new parameters are better; otherwise **Close** closes the dialog.

Optimising needs **at least 1,000 ratings** in the chosen scope. Below that the dialog says how many there are and offers nothing – with few ratings the parameters would be mostly chance.

What applies afterwards:

- Parameters for **this deck** come first, then those for **all decks**, then the defaults. {since=0.10.2} Before all of them come those of a **part of the deck**. Other people keep their own.
- When you apply, Flowplan works out the stability and difficulty of your cards again from their history, as Anki does. Due dates stay; from the next rating FSRS schedules with the new parameters – offline in the apps as well.
- **Reset to defaults** in the dialog brings the default parameters back.
- The deck's [statistics](/flashcards#statistics) name the memory model: the defaults or your parameters, with the date and the number of ratings.

### Parts of a deck {since=0.10.2}

If a deck mixes very different things – vocabulary and grammar, easy and hard lessons, cloze cards next to front/back –, each part can get parameters of its own. **Part of the deck** offers:

- **Sub-deck:** the values of the select chosen under **Set up cards → Sub-decks** (with the [Anki import](/flashcards-import#sub-decks-as-databases-of-their-own), the property **Deck**).
- **Card type:** each card type, when the deck has more than one.

Only the ratings of that part's cards count – here too at least 1,000. Applied parameters hold for those cards: a sub-deck before a card type, both before the whole deck. **Use the deck's parameters** takes them away again. **My settings** says how many parts have parameters of their own. The buttons of a session show the intervals with the card's parameters, offline as well.

Later, **My settings** gently suggests optimising again: after 1,000 new ratings, or after a month with at least 200 new ones. There is no notification for it.

## Recommend retention {since=0.10.0}

After optimising, the dialog names a **recommended retention** between 70 % and 95 %. To find it, Flowplan plays through a year of studying with your new parameters and looks for the retention at which you spend the least time per card remembered. The times come from your own answer times; forgotten cards count 2.5 times, because forgetting is more annoying than reviewing.

{since=0.10.2} The year is played with the deck's cards as they stand now – their stability, their due dates, the new cards – and with your daily limits: what goes beyond the review limit stays due, and new cards come only as many as allowed. Below the recommendation it says what it means: “At 84 % that is about 42 cards and 9 minutes a day on average.”

### Workload per retention {since=0.10.2}

The line **Cards per day** shows for each retention from 70 % to 95 % how many cards you would study a day on average; the retention **now** and the **recommended** one are marked. Move the mouse or a finger over it to read the values; **As a table** adds the minutes per day.

Under **Time per day (minutes, optional)** enter how much time you have each day; **Recalculate** plays the year again with that budget. If the time is not enough for everything, Flowplan recommends the retention that keeps the most in memory in your time.

{since=0.10.2} **Set retention to 84 %** (with the recommended number) sets it as your retention in **My settings**. A higher retention stays allowed: it costs more reviews, and you forget less often.

The recommendation resembles Anki's “optimal retention” and its simulator, but it is not the same calculation.

## How the optimisation works

Flowplan looks for the parameters with which FSRS-6 would have predicted your past ratings best – the same goal as Anki's optimiser, in code of its own without an extra program. Reviews count when they come at least one study day after the one before; reviews on the same day only change the card's state. The parameters stay within the bounds FSRS sets, and a short history moves them only a little from the defaults. The same ratings always give the same parameters. The numbers are similar to Anki's, but not the same.

{since=0.10.2} Like Anki's optimiser (fsrs-rs), Flowplan first estimates the initial stability per first rating (Again, Hard, Good, Easy) from the first review a day or more later, leaving out outliers: very rare intervals and intervals over 100 days (over a year for Easy). Cards with such intervals do not count for the other parameters either. Only then are all parameters fitted together.

## API

`study.history` returns your ratings of a deck (`scope: "deck"`) or of all decks (`"all"`) as the optimiser reads them; `study.params` stores 21 parameters or resets them with `weights: null`. {since=0.10.2} Both take `group` for a part of the deck (`subdeck:<value>` or `type:<card type>`; `study.history` lists the parts under `groups`).

{since=0.10.2} `study.optimize` optimises on the server – with the same optimiser as the browser – and returns the parameters, their fit, the recommended retention and the workload per retention (`minutesPerDay` for a time budget); with `apply: true` it stores the parameters when they are better. To spare the server: at most 50,000 ratings (those of the cards studied longest), one optimisation per server at a time, five per person in ten minutes, 30 seconds at most. In the [MCP server](/mcp) the tools are `optimize_flashcard_parameters` (only calculates) and `set_flashcard_parameters` (stores). See [Flashcards: API and MCP](/flashcards-app#api-and-mcp).
