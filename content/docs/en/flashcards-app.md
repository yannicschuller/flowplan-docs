---
keywords: flashcards, cards, study reminder, reminder, push, notification, study offline, without a connection, airplane mode, widget, cards due, Shortcuts, Siri, quick action, app, API, MCP
---

# Flashcards: reminder, app, offline and API

To keep you going: a daily reminder, [flashcards](/flashcards) in the apps for iPhone, iPad and Android and studying without a connection – plus the commands for your own programs.

## Study reminder {since=0.9.9}

Under **Study**, **Study reminder** switches on a daily reminder: **Remind me daily at** and a time (default 18:00), in your device's time zone. It comes only on days with cards due – new cards within your limits count – that you have not studied yet, at most once a day. The text names the number and the deck with the most cards, such as “12 cards are waiting for you – “Spanish A1” and 2 more decks.”; a tap opens **Study**.

- The reminder is the notification kind **Study reminders**: by default as **push** to your phone and desktop, not in the inbox and not by e-mail. Change that under **Settings → Notifications** ([notifications](/notifications#study-reminders)).
- No nagging: after 30 days without studying, “Study reminders paused” comes once and then nothing – until you rate a card again. Saving the time again also counts as a sign of life.
- If the time has already passed today when you switch it on, the reminder starts tomorrow.
- The time applies to all workspaces; the reminder counts the decks of all your workspaces together.
- If the instance cannot send notifications, the app for iPhone, iPad and Android reminds you itself at the time you set, as long as cards are due ([in the app](#in-the-app)).

## Studying offline {since=0.9.9}

With [offline use](/offline-and-apps#turn-on-offline-use) switched on – in the browser and in the apps – the device keeps every deck you studied in the last 14 days whole: all cards with their content, your learning state, today's ratings and your limits (up to 5,000 cards per deck, the next ones first). After every session with a connection the device brings its copy up to date.

- Without a connection the overview and the focus mode open as usual. The device puts the cards together itself and schedules with FSRS – by the same rules as the server, sub-decks through filters, daily limits and learning steps included.
- Your ratings stay on the device and are sent once the connection is back; until then the overview, **Study** and the focus mode say, for example, **2 ratings are waiting for the connection**. **Undo** takes a waiting rating back right on the device.
- Ratings never arrive twice, not even after days. If you studied the same card on another device meanwhile, Flowplan orders the ratings by their time and works out the learning state from them – without asking. Two ratings on the same day both count.
- A rating with a time in the future counts at most five minutes ahead. If a card was deleted meanwhile or you may no longer see it, the rating stays in your statistics only.
- Decks the device has not kept say offline “This deck is not available offline on this device.”
- Only with a connection: [creating cards with AI](/flashcards-ai), the [Anki import](/flashcards-import#import-from-anki) and the export as CSV or Anki package, your own settings and **Study more today**.

See also [What works offline](/what-works-offline).

## In the app {since=0.9.9}

The focus mode runs in the apps for iPhone, iPad and Android as in the browser. On top of that:

- the widget **Cards due** for the home screen (on iPhone and iPad also for the lock screen): how many cards are up today, the deck with the most and your streak. A tap opens **Study**.
- **Study** among the quick actions on the app icon (iPhone, iPad) and the app shortcuts (Android), once you have flashcards.
- the action **Study due cards** in the Shortcuts app (iPhone, iPad); with a shortcut of your own you start it with Siri too.
- the [study reminder](#study-reminder) as a notification – or, when the instance cannot send notifications, as a reminder of the app itself.

## API and MCP

With the [API](/api-and-webhooks) you can study from your own programs too: `study.queue` (or `GET /api/pages/{id}/study`) returns the next cards with the counts, `study.review` rates, `study.undo` undoes, `study.prefs` sets your own limits, `study.settings` sets up the cards. {since=0.9.9} `study.due` (or `GET /api/study/due`) counts the due cards of all decks of a workspace, `study.stats` (or `GET /api/study/stats`) returns the statistics, `GET /api/pages/{id}/study/export` the CSV (with `format=apkg` the Anki package); `study.queue` with `ahead` brings learning cards that would only be due later today. {since=0.9.9} `GET /api/pages/{id}/study?offline=1` returns the whole deck for studying without a connection, `study.reviews` takes up to 500 ratings sent later at once (idempotent by their id, ordered by their time), `study.reminder` sets the daily study reminder (`remindAt` as `HH:MM` or `null`). Read-only tokens can read cards and counts but not rate. The [MCP server](/mcp) has the tool `study_decks`: your decks of a workspace with what is due today. All shapes are in the [OpenAPI description](/openapi).
