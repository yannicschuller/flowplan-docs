---
keywords: flashcards, cards, import, export, CSV, TSV, Quizlet, Anki, apkg, colpkg, Anki deck, Brainscape, import vocabulary, export learning state, take over learning state
---

# Import and export flashcards

Cards for a [flashcard deck](/flashcards) need not come one by one: the wizard **Import cards** reads text from CSV, TSV, Quizlet and other study apps, **Import from Anki** takes over whole Anki decks with images, sounds and, if you like, your learning state. **Export** gives a deck's cards back as CSV – with your learning state if you like – or as an Anki package. Cards from a page or a PDF are proposed by the [AI](/flashcards-ai).

## Import cards: CSV and Quizlet {since=0.10.0}

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

## Import from Anki {since=0.10.0}

**Import from Anki** at the top of the [Study](/flashcards#all-decks-study) page – or under **Settings → Import & Export → Import** with the source **Anki (flashcards)** – turns Anki decks into flashcard databases:

1. In Anki, export an **Anki Deck Package (.apkg)** via **File → Export …**, or the whole collection (**.colpkg**). Flowplan reads the old and the new format (Anki 2.1.50 and later), with or without “Support older Anki versions”.
2. Choose the file and the target space. The preview shows the decks with their sub-decks, the number of notes, cards and media files, and notes on what changes. {since=0.11.0} If the package has sub-decks, choose under **Sub-decks** what they become: **Into the property “Deck”** (the default) or **As databases of their own**.
3. Check per note type what its fields become – **Front**, **Back**, **Hint**, **Extra** or **skip** – plus the card type and **Also ask in reverse** (not for cloze and image occlusion). The suggestion is what Anki itself shows on front and back; a sample card is shown below. {since=0.11.0} It shows gaps as **[…]** and, revealed, marked; the masks of an image occlusion as **Mask 1** and so on – not as `{{c1::…}}`.
4. If you like, **Take over my learning state**.
5. **Import … notes**. Then **Open the deck** opens the first deck. {since=0.11.0} If the package has no notes, the wizard says so instead of offering a button.

| Anki | Flowplan |
| --- | --- |
| top-level deck | a flashcard database with the views **Study** and **All cards** |
| sub-deck (`Spanish::Lesson 1`) | a value of the select **Deck** (`Lesson 1`) – to filter a [study view](/flashcards#sub-decks-through-filters); or a database of its own (see below) |
| Basic, Basic (and reversed card) | front/back, with the reverse card |
| Basic (type in the answer) | type the answer |
| Cloze | cloze, `{{c1::…}}` is kept |
| Image Occlusion {since=0.10.0} | [image occlusion](/flashcards-occlusion#anki) with the masks; on request front/back with the image, without masks |
| own note type | by its templates: fields of the question on the front, fields only of the answer on the back, `{{hint:…}}` as the hint |
| tags | the multi-select **Tags** |
| images, sounds (`[sound:…]`) | files of the deck, sounds as an audio block |

- **Property or document:** a side with simple formatting (bold, italic, links) becomes a property. If it has images, sounds, formulas (`\(…\)`), lists, tables or super- and subscript anywhere in the deck, it goes into the record's document – the front above a rule, the back below.
- **Cleaned:** scripts, styles, fonts and colours from Anki are dropped, images from the web stay a link.
- **Reverse cards** apply to the whole deck in Flowplan. If a deck mixes notes with and without a reverse card, the majority decides – the preview says so.
- **Learning state:** Flowplan replays Anki's review log with FSRS and so knows every card's stability, difficulty and due date – for you only; nobody else gets a learning state. If Anki has stored FSRS values already, those apply. Suspended cards stay suspended, new cards stay new. {since=0.11.0} A suspended card you never studied stays suspended too – as a new card that does not come up in a session; the statistics count it as suspended. The checkbox then shows for packages without reviews as well.
- **Limits:** packages up to 100 MB and 50,000 notes. Each media file may be as large as an upload and counts towards the storage; unused ones are left out. Missing files and what was only approximated are listed in the import report.

### Sub-decks as databases of their own {since=0.11.0}

With **As databases of their own**, every deck with notes becomes a flashcard database of its own, nested as in Anki: `Languages::Spanish::Lesson 1` sits below **Spanish**, which sits below **Languages**. A deck without notes of its own – often the top-level one – becomes a plain page holding the databases below it. Each database has its own [limits](/flashcards#how-flowplan-schedules), statistics and [parameters](/flashcards-optimize); there is no property **Deck** then. This works for up to 200 decks per import – with more, the property **Deck** is used.

With the property **Deck** (the default), a deck stays one database and you study its sub-decks through [filters](/flashcards#sub-decks-through-filters). The property is set up as the cards' **Sub-decks**, so each sub-deck can get [parameters of its own](/flashcards-optimize#parts-of-a-deck).

### Export as an Anki package {since=0.10.0}

**Export → As an Anki package (.apkg)** downloads the view's cards as a package every Anki version (desktop, AnkiDroid, AnkiMobile) imports: one note per record with the note types Basic, Basic with reverse card, Type the answer and Cloze, multiple choice as Basic with the options on the front, image occlusion as Image Occlusion (one note per picture, Anki 23.10 and later). Hint and extra become fields of their own, tags stay tags, the select **Deck** becomes sub-decks, images and sounds of the deck come along as media. The learning state stays in Flowplan – in Anki the cards are new.
