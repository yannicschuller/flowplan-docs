# First steps

From signing in for the first time to your first own page: what you do with Flowplan in the first ten minutes.

## Sign in or sign up

You sign in with your e-mail and password, with a passkey (fingerprint, face or device PIN) or – if your organisation has set it up – with **Sign in with SSO** through your organisation's login (OpenID Connect, such as Keycloak, Authentik, Zitadel or Entra ID). You create an account with **Create account**, provided the instance allows sign-ups or you have been invited. Afterwards you set up passkeys under **Settings → Account & security**. Everything else is described under [Sign-in](/sign-in).

When you sign in for the first time, Flowplan creates a private workspace with example pages. With single sign-on, your name, e-mail address and – if available – your profile picture come from the login provider.

> [!TIP]
> If the instance offers a **demo**, you can try Flowplan without an account. The demo gets its own example workspace and is deleted completely when you end it, sign out or after 45 minutes without activity.

**Language:** Flowplan follows your browser's language. Under **Settings → Appearance & language → Language** you pick German 🇩🇪, English 🇬🇧 or French 🇫🇷 from the list – it then applies on all devices, also to e-mails and push notifications. Further languages can be added: [Languages and translations](/languages).

## The introduction

After creating an account, Flowplan walks you through the essentials once. Every step can be skipped, and everything can be changed later in the settings:

1. **Welcome**: language and appearance (automatic, light or dark).
2. **What would you like to start with?** Set the workspace's name (as its owner) and, if you like, create pages right away: a **Tasks** database, a **Notes** database, a **Journal** or a **Whiteboard**.
3. **What Flowplan does**: a short tour of pages and blocks, databases, whiteboards, the journal, collaboration, sharing, search and offline – each with a tip and a link into this documentation.
4. **Notifications**: e-mail summaries (when the instance sends e-mail) and push on this device.
5. **All set**: the created pages to open and the most important shortcuts.

Later, **Settings → Appearance & language → Start introduction** (or "introduction" in the search with `⌘/Ctrl + K`) opens it again. Accounts that existed before the introduction was added do not see it automatically.

The settings open with an overview: one tile per section, grouped into **Personal**, **Connections** and **Workspace**. The search at the top (“Search settings …”) helps – “passkeys” finds **Account & security**, for example –, and every section has its own link, e.g. `/#settings/notifications`.

## The interface

- **Sidebar** on the left: workspace switcher, search, home, inbox, your spaces with the page tree, and below them templates, media, trash and settings.
- **Home**: recently edited pages, quick starts for a new idea or project, and all pages of your workspace – customizable with widgets (see [Customize your home page](#customize-your-home-page)).
- **Header** of a page: path, share, comments, favourite and the **Page actions** menu (`…`).

On a computer, drag the sidebar's right edge to make it wider or narrower (200 to 480 pixels); a double click on the edge restores the original width. Flowplan remembers the width per device. On a phone the sidebar folds away: the icon at the top left opens it, and so does a swipe to the right that starts just inside the left edge of the screen (or **Navigation** in the bar at the bottom). On the iPhone the very edge stays the back gesture. Swipe it to the left or tap beside it to close it. For iPhone and iPad there is also a **beta app on TestFlight** ([Apps for iPhone, iPad and Android](/offline-and-apps#apps-for-iphone-ipad-and-android)).

Short animations show what just moved: cards and rows glide into their new place, bars that move along in the timeline visibly follow, and the target of a jump – from the table of contents, search or a notification – lights up briefly. Moving to another page briefly cross-fades the content area; when you open a page in the page tree, its icon and title fly to their place, and a card from a board or gallery grows into its record (on a phone the record comes up as a sheet). A tap or a key ends such a transition at once, and clicking quickly from one page to the next goes without one. While uploaded images load, they show a blurred preview in their final size and then fade in – nothing below them moves. The animations follow the system setting **Reduce motion**: when it is on, everything moves to its target without motion, and jump targets are only highlighted briefly and still.

## Customize your home page

The home page is yours: **Customize** at the top right (or “Customize home page” in quick search) lets you arrange it from widgets the way you work. On phones everything sits in one column, on tablets in two, on large screens in three or four – the iPhone, iPad and Android apps and the desktop app show the same home page.

![The home page while customizing: a bar with Widget, Appearance, Cancel and Done, a header with a gradient and widgets with handle, arrows, size, settings and remove](/screenshots/home-customize.webp "The home page while customizing: greeting, my tasks, scratchpad, focus & time, agenda and journal today.")

While customizing:

- **Widget** opens the gallery: greeting, recently edited or viewed, favourites, the workspace's pages, my tasks, inbox, journal today, agenda, database view, pinned page, quick capture, focus & time, habits, counter, scratchpad, activity, this week, links and – for administrators – the instance status.
- **Move**: drag the handle, use the up/down arrows, or the keyboard – focus the handle, then the arrow keys, <kbd>Home</kbd> and <kbd>End</kbd>.
- **Size**: small (one column), medium (two), large (three) or full width. A widget never gets wider than the space there is.
- **Settings** (gear): a heading of your own and what the widget shows – for **My tasks** “Due today and overdue”, “Due today”, “Overdue” or “All open”, from your tasks or the open records of a database view; for the **Agenda** the period (today, 3 or 7 days) and which calendar and timeline views count (also those connected to Google, Microsoft 365 or CalDAV).
- **Appearance**: a header with a colour, a gradient or a page's cover image, an emoji as icon, comfortable or compact spacing, a subtle background (dots, grid, tinted) and a normal or wide page.
- **Done** saves, **Cancel** discards. In the **…** menu you save the home page **for all your workspaces** (otherwise it applies to this one only) or **reset** it.

You tick off tasks right in the widget, habits too; the journal widget adds a few lines to today's entry, and the scratchpad holds whatever fits nowhere else – it saves as you type and is the same on all devices.

Widgets only show what you may see anyway: pages of other workspaces do not appear, journals behind a PIN only show their name, and the home page sees no content of end-to-end encrypted spaces.

> [!TIP]
> Workspace owners can use **… → Set as default for members** to choose the home page new members (and everyone without their own) see. Personal notes are not passed on.

## Your first page

1. Click **+** next to a space in the sidebar or choose **New page** on the home screen.
2. Choose the type: **Document**, **Database**, **Whiteboard** or **Journal**.
3. Enter a title and start writing. Everything is saved automatically, even without a connection.

In a document, `/` opens the block menu: type `/h2`, `/todo` or `/table` and press Enter to insert. How the editor works in detail is explained under [Documents and the editor](/documents).

## Find instead of search

<kbd>⌘</kbd> <kbd>K</kbd> (Windows/Linux: <kbd>Ctrl</kbd> <kbd>K</kbd>) opens the quick search across titles, text, database records, comments and even the content of uploaded PDFs and Office files. More under [Search, inbox and push](/search-and-notifications).

## Where to go next

- [Pages and spaces](/pages-and-spaces): page tree, favourites, moving and trash.
- [Databases](/databases): tables, boards, calendars and more from the same records.
- [Collaboration and comments](/collaboration): write together, comment, mention.

## Help and community

Questions, ideas or just saying hello: in the **[Flowplan Discord](https://discord.gg/bCEdB6MPrR)** users and admins help each other. Bugs and feature requests are best filed as [GitHub issues](https://github.com/yannicschuller/flowplan/issues), so nothing gets lost.
