---
keywords: flashcards, cards, import, export, CSV, TSV, Quizlet, Anki, Brainscape, import vocabulary, export learning state
---

# Import and export flashcards

Cards for a [flashcard deck](/flashcards) need not come one by one: the wizard **Import cards** reads text from CSV, TSV, Quizlet and other study apps, **Export** gives a deck's cards back as CSV – with your learning state if you like.

## Import cards: CSV and Quizlet {since=0.9.9}

**Import cards** in the study view (with write access) creates records from text:

1. Paste text or choose a file (CSV, TSV, TXT, up to 5 MB).
2. Flowplan detects the separators – between term and definition tab, comma or semicolon, between cards a new line or a semicolon – and whether the first line names the columns. Both can be changed, to separators of your own too.
3. Map every column to a property or skip it. Front and back, hint, extra, tags, card type and answer options are suggested by the column names (“Front”, “Back”, “Term”, “Definition”, the names of your properties …), without a header the first column as the front and the second as the back.
4. The preview shows the first cards and every line that will not become a card – with its number and the reason (front or back missing, value too long). Duplicate lines come only once.
5. **Import … cards** creates the records, at most 5000 at once.

**Quizlet**: open the set, choose **Export** and copy the text – tab between term and definition, new line or semicolon between cards. Images do not come along this way. The same form fits the text export of Anki, Brainscape and others. Clozes in Anki's syntax (`{{c1::…}}`) are kept and become cloze cards. Separate tags in a column with commas or semicolons, otherwise with spaces (as in Anki).

The import writes into properties; it does not fill a side that comes from the record's document. Values that are no option of a select become new options.

### Export as CSV

**Export → Cards as CSV** downloads one line per card you may study (suspended ones too): front, back, hint, extra, tags, card type and card (empty for the card, `r` for the reverse one, `c1`, `c2` … for clozes). Documents are written as Markdown, clozes as `{{c1::…}}`. **Cards with my learning state as CSV** adds your own state: state, due, stability, difficulty, reviews, lapses, suspended – never anyone else's. **Import cards** reads the file back; the lines of a card's siblings become one record.
