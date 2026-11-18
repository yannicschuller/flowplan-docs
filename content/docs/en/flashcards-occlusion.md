---
keywords: flashcards, image occlusion, masks, hide parts of an image, anatomy, map, label a diagram, quiz areas, Anki Image Occlusion, polygon, ellipse
---

# Flashcards: image occlusion

With **image occlusion** you learn pictures: masks cover parts of a diagram, a map or an anatomy atlas, and each card asks for one of them. The masks lie over the picture – the picture itself stays unchanged. The basics of decks are under [Flashcards](/flashcards).

## Drawing masks {since=0.10.0}

1. In the deck, set the **Card type** to **Image occlusion** under **Set up cards** – for all records or as an option of the select **Card type** (Flowplan recognises “Image occlusion” and “Bildverdeckung” by themselves).
2. Open a record and add a picture to its document.
3. Select the picture, then in the image tools **…** → **Edit image occlusion (flashcards)**.
4. Draw masks and **Save**.

| Tool | How it works |
| --- | --- |
| Rectangle, ellipse | drag over the picture |
| Polygon | tap its corners one after another; a tap on the first corner, a double click, <kbd>Enter</kbd> or **Finish polygon** closes it |
| Select and move | drag a mask; drag the selected one at its corners to resize it |
| Add a mask | puts a rectangle in the middle – without a mouse |
| Group, Ungroup | several masks become one card (“ask together”) |
| Preview of the card | shows the selected card as it comes in focus mode |

Next to the picture is the list of masks with their card number. There you give each mask a **label** – it is the answer on the back – and on a phone you pick several masks to group them. **Asking** applies to the whole picture:

- **Hide all, ask one** (default): every mask is closed, the one asked is highlighted.
- **Hide one, show the rest**: only the mask asked is closed.

With the keyboard: the arrow keys move the selection (with <kbd>Shift</kbd> further, with <kbd>Alt</kbd> they change its size), <kbd>Delete</kbd> removes, <kbd>G</kbd> groups or ungroups, ++⌘/Ctrl Z++ undoes, <kbd>Esc</kbd> cancels a polygon or the selection.

## Cards and learning state {since=0.10.0}

Each mask is a card of its own, each group one together. A record may have several pictures with masks. The cards count like the gaps of a cloze – in the counters, in **New cards per day** and **Reviews per day**, and in the statistics.

Masks keep their identity: move a mask, resize it or change its label, and its learning state stays. A new mask is a new card, a deleted one rests with its learning state. Combine masks into a group and you learn the group anew; the group keeps its state as long as it exists.

The record's front and back are still there: the front – say the title “Which region is marked?” – shows above the picture, the back comes after revealing, below the label. If a side takes the document, the picture with masks is not part of its text.

## Studying {since=0.10.0}

In [focus mode](/flashcards#studying-in-focus-mode) the card shows the picture with the masks closed, the one asked highlighted in colour. **Show answer** opens it – it keeps an outline – and shows the label. You rate it like any card. This works [offline](/flashcards-app#studying-offline) too: the pictures of the cards come to the device with the stored deck.

For screen readers: the picture is announced with its alternative text, plus “Area 3 of 7 covered”, after revealing the label. Give the picture an **alternative text** in the image occlusion editor; if it has none, the editor points it out.

## Anki {since=0.10.0}

Notes of the type **Image Occlusion** (Anki 23.10 and later) come with their masks in the [Anki import](/flashcards-import#import-from-anki): rectangles, ellipses and polygons, masks of the same number as a group, Anki's “Hide all” as **Hide all, ask one**. The learning state applies per mask. Text on the picture is not taken over; the report gives their number. The [export as an Anki package](/flashcards-import#export-as-an-anki-package) writes the cards back as Image Occlusion notes, one per picture.
