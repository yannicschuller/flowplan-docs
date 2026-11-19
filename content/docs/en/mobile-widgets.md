---
keywords: widget, home screen, lock screen, notification, live activity, dynamic island, focus
---

# Widgets and notifications in the apps

On iPhone, iPad and Android: home screen widgets, buttons on notifications, Live Activities and Focus filters.

## Widgets

Each widget shows **one thing** and has **settings of its own**. A widget you just added works right away with sensible defaults; small sizes show less. A tap opens the task or page in the app.

**Change the settings:**

::: tabs
== iPhone and iPad
Long-press the widget → *Edit Widget* (iOS 17 or later).
== Android
Long-press the widget → *Settings* (you can skip this step when adding it).
:::

The lists to choose from (databases, views, properties, calendars, forms …) come straight from your Flowplan instance.

| Widget | What it shows | Settings |
| --- | --- | --- |
| **Quick capture** | Buttons for note, task, voice memo, photo | Where to save (default: your capture inbox), which buttons |
| **Tasks** | Open tasks – **check them off right in the widget** | My tasks, records of a database (with view) or to-dos of a page; all open, due today or overdue; number |
| **Today** | Appointments and tasks due | Calendars, range (today, 3 days, week), tasks due on/off |
| **Page and favorites** | Your favorites, or one page / database view | Page, view, up to two properties |
| **Database counter** | One number (count, sum, average) with its last 14 days | Database, view, value, group, history |
| **Journal and habits** | Whether today is written, your streak; habits **to check off** | Journal, habit database |
| **Time this week** | Hours this week and today; **start/stop the timer** | Which timer "Start" starts |
| **Mentions** | Who mentioned you or gave you a task; **mark as read** | Mentions and/or new tasks, unread only |
| **Form responses** | New responses to a form | Form |
| **Flowplan** | Tasks due at a glance | With or without the inbox, running timer on/off |
| **Flowplan Inbox** | Number of unread notifications | – |
| **Flowplan Instance, Live, Storage** | [Administrators](#widgets-for-administrators) only: state, one live number, storage | What to show or which metric |

"My tasks" shows, besides tasks from documents, the open records of databases in which you are in a person property (such as "Assignee") – with the database and due date (the [database's due date](/projects-and-tickets#when-is-a-record-due)), and you can check them off right away if you may edit the record. By the same rules these records also appear in the **Flowplan** widget (including the count on the app icon and the reminders without push), with their due date in the **Today** widget and so in Siri's "What's on today in Flowplan", and in Spotlight on iPhone and iPad. Private records of others, databases behind a journal PIN, end-to-end encrypted spaces and properties hidden from you stay out everywhere; a record that a chosen calendar view in the **Today** widget already shows appears there only once.

Good to know:

- **Counter history:** Flowplan keeps the value of every day. Days before the widget was set up are estimated and drawn lighter and dashed.
- **Privacy:** widgets only show what you may see in Flowplan. Pages behind a journal PIN or end-to-end encrypted only show their state in a widget, never content.
- **Signed out?** When your session ends (e.g. a short SSO session), every widget shows *Open Flowplan to sign in*. Its settings stay; after signing in, the widgets fill again at once.
- **Profiles:** every widget shows the profile set in its settings (see [Colour and profile per widget](#colour-and-profile-per-widget)).
- **Colours:** every widget has a colour of its own (see [Colour and profile per widget](#colour-and-profile-per-widget)). Red, amber and green always keep their meaning.
- **Check off today's tasks:** add the **Tasks** widget and choose *Due today* in its settings.
- **Updates:** when you change something in Flowplan, when the app comes to the foreground, and in the background about every 30 minutes (iOS decides how often). On iPhone with iOS 26 also [right away by push](#instant-updates-on-iphone).
- **Requirements:** the configurable widgets, the Live Activities other than the timer, and Siri and Shortcuts need a Flowplan server 0.7.0 or newer. *Flowplan*, *Flowplan Inbox* and the running timer work from 0.4.0.

### Next appointment, Continue reading, Key figure and Deadline {since=0.10.2}

| Widget | What it shows | Settings |
| --- | --- | --- |
| **Next appointment** | The next one to three appointments with a countdown and the location; a **Join** button for a video link | Calendars (as in **Today**), range (today, 48 hours, week), *Join* on/off |
| **Continue reading** | Pages you opened last, or the books of the [library](/library) with your reading progress | Source (recently opened or library), number (1–6) |
| **Key figure** | One number tile of a [dashboard](/dashboards) with its history as a line and the change since the day before | Dashboard, tile |
| **Deadline** | A countdown to the due date of a record or task; red when overdue | Database and record, or one of your tasks |

- **Join** appears only for links of known video services – Zoom, Microsoft Teams, Google Meet, Webex, Jitsi Meet and Whereby – in the location, a link or text property or the appointment's description (where synced Google and Microsoft calendars put them). Administrators add their own services (such as BigBlueButton or their own Jitsi) as host names in `MEETING_HOSTS`, comma-separated: `MEETING_HOSTS=bbb.example.org,meet.example.org`. Other links never get a Join button.
- **Reading progress:** for library books, the page you read last, measured against all pages of the book.
- **Key figure:** Flowplan keeps the value of every day; the line shows up to 30 days, from the day the widget was set up.
- As everywhere: pages behind a journal PIN and end-to-end encrypted spaces only show their state, and properties hidden from you (such as a hidden due date) stay empty.

### Colour and profile per widget

In the settings of every widget:

- **Profile:** which profile the widget shows – by default the active one. So a widget can show your work tasks while the personal profile is open in the app. A profile that is not active stays signed in for this; only the active profile gets notifications. Its widgets go only when you remove the profile or sign out.
- **Colour:** *Accent* (default: the accent colour of the workspace the content comes from), *Profile colour* (the profile's colour dot), *System* (Material You from the wallpaper or theme on Android 12 and later, the system tint on iPhone) or *Flowplan*. You choose the profile colour in the app under *Manage profiles*; it also shows in the profile list and when switching.
- On iPhone the widgets also look right tinted, accented and in the clear Liquid Glass look of iOS 26.

### Accent colour, "Widgets only" and instant updates {since=0.10.2}

- **Accent colour:** the instance sends every widget the accent colour of its workspace (*Settings → Workspace → Appearance*), checked for legibility in light and dark mode like the web app. Workspaces without their own colour, and people who chose Flowplan's own look, get Flowplan's colours. Older servers send no accent colour; the widgets then use Flowplan's colours.
- **"Widgets only":** under *Settings → Account → Signed-in devices*, a profile that is not active in the app right now shows as *Widgets only*; the test notification sends it nothing.

#### Instant updates on iPhone

From iOS 26 the instance tells your iPhones as soon as something changes that your widgets could show – new notifications, tasks, records and pages in your workspaces, time tracking, focus, flashcards, dashboards. The widgets then reload. To stay within what iOS allows, the instance collects changes for about 30 seconds and sends **at most one push per device every 5 minutes**; when nothing changes, none is sent. The push goes through the [push relay](/configuration-ai-push) like notifications and carries **no content** – only the signal to reload; the widget fetches its data from your instance itself. Without the push relay (`PUSH_RELAY=off`, `MOBILE_PUSH=off`) the background updates remain.

## Widgets for administrators

People who administer the instance (members of the admin group, `OIDC_ADMIN_GROUP`, default `flowplan-admins`) get three more widgets in the app for iPhone, iPad and Android. Each shows one thing big; on the iPhone you choose which in the widget's settings.

| Widget | Sizes (iOS) | Setting (default first) | Tapping opens |
| --- | --- | --- | --- |
| **Flowplan Instance** | small, medium, lock screen | *Show:* state (*All fine*, notices or problems with the most important one), last backup, or version with available update | Administration (Monitoring when there are notices or problems) |
| **Flowplan Live** | small, medium, large, lock screen | *Metric:* active now, requests/min, error rate (1 h) or sign-ins today; from medium up the other numbers small and the requests of the last 24 hours as a chart | Administration → Monitoring |
| **Flowplan Storage** | small, medium, lock screen (ring) | *Metric:* disk used, database and files, or fullest workspace (quota) | Administration → Storage |

- Everyone else sees *Administrators only* in these widgets; without a sign-in they say *Open Flowplan to sign in*.
- Like the other widgets they read their data with the app's device token (`GET /api/mobile/admin-summary`). The instance checks on every call that the person of the session the device is bound to is an administrator right now – leaving the admin group, signing out or removing the device under *Signed-in devices* stops it. API tokens never get this data.
- Only numbers and states are sent – no names, e-mail addresses or workspace names.
- With the statistics switched off (`FLOWPLAN_METRICS=off` or in the administration under *Monitoring → Statistics*), *Flowplan Live* says "Statistics switched off"; state and storage stay.
- Older instances without this endpoint show *Administrators only*.

## Buttons on notifications

Long-press a notification (or pull it down) for its buttons. They do their work in the background; the app does not open.

| Notification | Buttons |
| --- | --- |
| **A task is due** (a task assigned to you is due today, a [date reminder](/databases#date-reminders) of a record) | **Done** ticks it off; **Tomorrow** moves its date to tomorrow – the time of day stays, a date further ahead moves one day on |
| **Comment, reply, mention in a comment** | **Reply** – type the answer right in the notification; it goes into the thread (or comments on the page) under your name. **Mark as read** |
| **Everything else** | **Mark as read** |

- Each button also marks the notification as read; the number on the app icon follows.
- **Done**, **Tomorrow** and **Reply** need the phone unlocked; **Mark as read** works on the lock screen.
- **Done** on a record uses the database's “done” state (a status option such as *Done*, or a checkbox *Done*); databases without one only offer **Mark as read**. If the task changed meanwhile, nothing is ticked off – a notification says so, and a tap opens the page.
- Your rights apply as in the browser, and the change shows in the activity, versions and automations like any other.
- **Done**, **Tomorrow** and **Reply** only appear when the notification brings its text along – without it, nobody could tell which task a button acts on. Through the [push relay](/configuration-ai-push#push-relay-and-end-to-end-encryption) that is the default, because the text is end-to-end encrypted (operators can turn it off with `MOBILE_PUSH_CONTENT=off`); older app versions through Expo only get it with `MOBILE_PUSH_CONTENT=on`. Otherwise there is **Mark as read** only.

**Reminders without push:** if your instance does not send push notifications to the app (switched off by the operators, or a test build without push), the app reminds you of your tasks itself – at 09:00 on the day a task is due, as long as notifications are allowed for Flowplan. It uses the tasks the app knows from its summary (the next eight).

## Live Activities and ongoing notifications

On iPhone what is running appears on the lock screen and in the Dynamic Island, on Android as a notification (a Live Update on Android 16):

| What runs | Shows | Button |
| --- | --- | --- |
| **Timer** | a running clock | – |
| **Focus** | e.g. 25 minutes of focus, then the break | *End* |
| **Meeting now** | the time left | *Open notes* – creates the meeting note in your journal if there is none yet |
| **Imports and exports** | their progress | – |
| **Voice memo** | recording | *Stop recording* |
| **Incident of the instance** | administrators only, only while it lasts | – |

Meetings, imports/exports and incidents can be switched off in the app settings under *Live Activities*; the timer, focus and voice memos always appear while they run.

If you start or stop the timer or focus elsewhere – in the browser, on another device – or focus moves on to the break, the instance updates the Live Activity on the iPhone by push through the [push relay](/configuration-ai-push#push-relay-and-end-to-end-encryption), even when the app is not open. By default this push holds only times and the phase; the Live Activity already knows the title and link from when it started on the device.

## Focus filters

On the iPhone and iPad, a Focus (Settings → Focus → e.g. *Work* → **Add filter** → **Flowplan**) can choose:

- **Profile or workspace:** a profile ("all workspaces") or one workspace of a profile. When the Focus starts, the app switches to that profile and opens the workspace; when it ends, it goes back to the profile you had before – unless you switched yourself in the meantime.
- **Hide notifications from other workspaces:** while the Focus is on, your instance does not send this phone push notifications from other workspaces – or none at all if the Focus belongs to another profile. They still arrive in the inbox. If the Focus is never switched off, the rule ends by itself after a day.

Workspaces appear in the list once the app has been signed in to that profile; open the app on the profile once if one is missing.
