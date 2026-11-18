---
keywords: flashcards, cards, AI, artificial intelligence, generate cards, cards from PDF, cards from text, cloze, multiple choice, vocabulary, study material, learn a summary
---

# Create flashcards with AI

The AI proposes [flashcards](/flashcards) from your study material – from a page, a selected passage, a PDF or pasted text. You review every card before anything is added.

> [!NOTE]
> This needs the [AI](/ai) switched on and the feature **Create flashcards** allowed – by the administration and in your own AI settings.

## How it works {since=0.9.9}

Three ways open the dialog **Create flashcards with AI**:

- **Create with AI** in a deck's study view – the cards go into this deck.
- **Create flashcards** in the text menu when you select text in a document.
- **Create flashcards with AI** in the quick search (++⌘ K++, then `>`) – for the open page.

In the dialog you choose:

1. **Source:** **This page** (or the record), **Selected text**, **PDF or file** (PDFs, Word and other documents of the page – their text, which Flowplan reads for the search, scanned ones through text recognition too) or **Paste text**.
2. **Deck:** an existing flashcard deck or **New deck …** with a name and a space – it becomes a database of the kind **Flashcards**.
3. **At most** how many cards (up to 200), which **card types** (front/back, cloze, type the answer, multiple choice) and, if you like, a **focus** such as “only terms and definitions”.

Before anything is sent you see about how many tokens the request needs. **Propose cards** sends the source to the AI; long sources go in parts.

## Review and add

The suggestions are listed with checkboxes:

- **Edit** changes front and back, the hint and, for multiple choice, the wrong answers.
- **similar to an existing card** – the deck has this card already (case, accents and punctuation do not count); **Yes/no question** – such cards are poor to learn. Both start unticked.
- **Source** names the passage the card comes from – to check it.
- **Regenerate** asks the AI again without repeating the cards suggested so far.
- **Tags for all** gives every card the same tags, such as “Chapter 3”.

Only **Add … cards** creates the ticked cards as records of the deck – with your permissions, like an import. Clozes are written as `{{c1::…}}` on the front, the card type into the property **Card type**, wrong answers into the answer options when the deck has such a property. Decks whose front or back comes from the record's document take no AI cards.

## What the AI keeps to

- **Only from the source:** the AI is told not to invent anything or add knowledge from elsewhere; if the source holds little, fewer cards come.
- **One fact per card**, short answers, no yes/no questions, no cards from examples or footnotes; gaps only around key terms.
- **The source's language** – the cards are in the language of the material.
- **No duplicates:** the deck's fronts go along so the AI does not repeat them; afterwards the server compares once more itself.

Still: read the cards before adding them – an AI can be wrong.

## Privacy and limits

- The AI only reads what you may read and what it may read: no pages [closed to AI](/ai#close-pages-and-spaces-to-ai), no [encrypted spaces](/encrypted-spaces), no private records of others. Secrets such as passwords and keys are redacted first.
- The deck's fronts only go along when the AI may read the deck. Nothing from your study sessions – ratings, times, learning state – ever goes to the AI.
- Your instance's provider applies, a local one such as Ollama too; the dialog's footer names it.
- At most 200 cards per run and 400,000 characters of source – for longer ones choose a section. Each part counts towards the instance's limit like every AI request.
- Cards are only added with write access to the deck; the audit log records `ai.cards`.
