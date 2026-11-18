---
keywords: flashcards, FSRS, optimise parameters, optimize, optimisation, weights, memory model, recommend retention, optimal retention, CMRR, log loss, RMSE, Anki
---

# Flashcards: optimise parameters

FSRS schedules with 21 parameters that suit most people. Once you have studied enough, Flowplan fits them to your own memory – and suggests a retention. This is optional; the default parameters work well.

## Optimise parameters {since=0.9.9}

In a deck, open **My settings**; under **Memory model (FSRS)** it says which parameters the deck uses for you. **Optimise parameters …** opens the dialog.

1. Choose which ratings to learn from: **This deck** or **All my decks**. Only your own ratings count – imported ones and those made offline too, undone ones not.
2. **Optimise** starts the calculation. It runs in your browser and the page stays usable; with many thousand ratings it takes a few seconds. Only the 21 numbers go to the server.
3. The table shows how well the model predicts your ratings – with the default parameters, the current ones (if you optimised before) and the new ones. Lower is better:
   - **Log loss**: how surprised the model is by your ratings on average.
   - **RMSE (bins)**: how far the predicted chance of remembering is from your actual share of correct answers, in percentage points.
4. **Apply** stores the new parameters; **Keep defaults** or **Keep current** closes without a change. Apply is only offered when the new parameters are better.

Optimising needs **at least 1,000 ratings** in the chosen scope. Below that the dialog says how many there are and offers nothing – with few ratings the parameters would be mostly chance.

What applies afterwards:

- Parameters for **this deck** come first, then those for **all decks**, then the defaults. Other people keep their own.
- When you apply, Flowplan works out the stability and difficulty of your cards again from their history, as Anki does. Due dates stay; from the next rating FSRS schedules with the new parameters – offline in the apps as well.
- **Reset to defaults** in the dialog brings the default parameters back.
- The deck's [statistics](/flashcards#statistics) name the memory model: the defaults or your parameters, with the date and the number of ratings.

Later, **My settings** gently suggests optimising again: after 1,000 new ratings, or after a month with at least 200 new ones. There is no notification for it.

## Recommend retention {since=0.9.9}

After optimising, the dialog names a **recommended retention** between 70 % and 95 %. To find it, Flowplan plays through a year of studying with your new parameters and looks for the retention at which you spend the least time per card remembered. The times come from your own answer times; forgotten cards count 2.5 times, because forgetting is more annoying than reviewing.

**Use 84 % for this deck** (with the recommended number) sets it as your retention in **My settings**. A higher retention stays allowed: it costs more reviews, and you forget less often.

The recommendation is a simplified form of Anki's “optimal retention”: it does not simulate the deck's daily limits or a time budget.

## How the optimisation works

Flowplan looks for the parameters with which FSRS-6 would have predicted your past ratings best – the same goal as Anki's optimiser, in code of its own without an extra program. Reviews count when they come at least one study day after the one before; reviews on the same day only change the card's state. The parameters stay within the bounds FSRS sets, and a short history moves them only a little from the defaults. The same ratings always give the same parameters. The numbers are similar to Anki's, but not the same.

## API

`study.history` returns your ratings of a deck (`scope: "deck"`) or of all decks (`"all"`) as the optimiser reads them; `study.params` stores 21 parameters or resets them with `weights: null`. Optimising itself works only in the browser. See [Flashcards: API and MCP](/flashcards-app#api-and-mcp).
