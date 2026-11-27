---
keywords: introduction, onboarding, getting started, checklist, sample space, settings, settings level, beginner, normal, expert
---

# Introduction and settings

The introduction after your first sign-in, the “Getting started” list and how to find what you need in Settings.

## The introduction

After creating an account, Flowplan walks you through the essentials once. Every step can be skipped, and everything can be changed later in the settings:

::: steps

1. **Welcome**: language and appearance (automatic, light or dark).
2. **Set up the instance** (admins only): a traffic light for address and HTTPS, e-mail delivery, backup, sign-in and AI, each with the way to the matching section under **Settings → Instance** ([Set up the instance](/administration#set-up-the-instance)). {since=0.9.7}
3. **Where are you coming from?** **Notion**, **AFFiNE**, **Obsidian**, **Evernote**, **Confluence**, **Google Docs / Word**, **BookStack** {since=0.10.0} or **Start fresh**. When you pick a tool, Flowplan shows step by step where its export is and which file you need, and with **Choose file and import** imports it right into your first space – with progress and result ([Moving to Flowplan](/migrate)). {since=0.9.7} For BookStack you enter its address and an API token instead ([From BookStack](/migrate-office#from-bookstack)). {since=0.10.0}
4. **What it's called here** (only after picking a tool): what you know from the tool and what it is called in Flowplan – the same, similar or without a counterpart ([Terms when moving](/migrate-glossary)). {since=0.9.7}
5. **What would you like to start with?** Set the workspace's name (as its owner) and say **what you mainly use Flowplan for**: **Personal**, **Team & knowledge**, **Projects & tickets**, **Study & writing** or **Something else**. Flowplan then suggests matching pages – such as a task list, journal, habit tracker and reading list for yourself, or a team wiki, meeting log, decision log and project plan for a team – which you click and create as you go on (for example **Create 2 and continue**). **Create sample space** makes a private space with sample pages (a project, a wiki with a meeting note, a whiteboard); **Remove sample space** takes exactly these pages out again, pages of your own in it stay. If you have no [settings level](#settings-levels) of your own yet, the answer sets one: **Personal** Beginner, team, projects and study Normal; **Something else** keeps the instance's default. {since=0.9.7}
6. **What Flowplan does**: a short tour of pages and blocks, databases, whiteboards, the journal, collaboration, sharing, search and offline – each with a tip and a link into this documentation.
7. **Notifications**: e-mail summaries (when the instance sends e-mail) and push on this device.
8. **Work without a connection too?** offers [offline use](/offline-and-apps#turn-on-offline-use) on this device, with what gets stored for it: **Use offline**, **Later** or **Don't ask again**. Left out where offline cannot work, in the apps (they ask themselves) and when it is on already. {since=0.9.7}
9. **All set**: the created and imported pages to open and the most important shortcuts.

:::

Later, **Settings → Appearance & language → Show introduction** (or "introduction" in the search with ++⌘/Ctrl K++) opens it again. Accounts that existed before the introduction was added do not see it automatically.

> [!TIP]
> Moving from Notion, AFFiNE, Obsidian, Evernote, Confluence or Google Docs? You can do it in the introduction (step **Where are you coming from?**) and at any time under **Settings → Import & export**. What comes along and how best to go about it is in [Moving to Flowplan](/migrate).

### Getting started in the sidebar {since=0.9.7}

After the introduction, the **Getting started** list waits in the sidebar with its progress ("2 of 6"): **Write a first page**, **Create a task**, **Invite someone** (for owners), **Install the app**, **Try search and commands** and **Import content** – the last one not if you already imported in the introduction. Every item has a button that takes you there (such as **New page** or **Open import**). Page, task, invitation and import tick themselves once you have done them; the app and the search are reported by the browser, and you can tick any item by hand. The list can be folded (the browser remembers it) and hidden for good with **Hide the list**; **Show getting started** in the command palette (++⌘/Ctrl K++) brings it back. If there is a sample space, you can remove it here too. Only people who went through the introduction get the list.

## Settings: overview and search

You open **Settings** in the sidebar. Your personal settings and – if you are an admin – the instance's share one screen: the sidebar with every section on the left, and the start page or the section you opened on the right. {since=0.11.6} Every section has its own link, e.g. `/#settings/notifications`; the instance's sections start with `/#settings/instance/` ([Administering the instance](/administration)).

### The sidebar {since=0.11.6}

At the very top is **Overview**, the start page. Below it come the sections in the groups **Personal**, **Connections**, **Workspace** and **Help & info** – each up to your [level](#settings-levels). Admins then see the heading **Instance – admins only** with the groups **People**, **Data**, **Services**, **Security** and **Operations**. A dot next to a section means a warning is waiting there. While a section is open, the sidebar has a search field of its own. There is no separate administration any more; in the command palette (++⌘/Ctrl K++), **Settings: Instance** takes you to the instance's settings.

### The start page {since=0.11.6}

- **Search** (“Search settings …”): finds single settings in every section, also those above your level (see below); hits from the instance are labelled “Instance”.
- **For you**: your storage and your AI quota as rings ([Storage & AI](/account-limits#storage-ai-in-the-settings)) and **Your setup** with **Appearance** (with a small preview that shows your choice right away), **Notifications** and **This device** (offline use here).
- **Instance at a glance** (admins only): tiles for accounts, storage, monitoring, failed sign-ins, features and version, with a live strip below ([Instance at a glance](/administration#instance-at-a-glance)).
- **Settings level**: the switch for your [level](#settings-levels).

Every tile leads into its section.

### Previews {since=0.11.6}

What you set, you see at once: **Appearance & language** shows a sample page that picks up theme, accent colour, the place of the page icon, width and struck-through tasks as you change them. **Notifications** shows an example message per channel, labelled “Example”. Sections of the instance have previews too, such as the [features of this instance](/administration#instance) and the usage under [Storage & backup](/administration#storage-backup).

### On a phone {since=0.11.6}

On a phone the start page is stacked: search, the rings, **Your setup**, for admins the instance's tiles – two to a row – and the live strip, then the level switch and **All sections**. Below follows the list of all sections by group, with one line of facts per section and a dot for warnings. A section opens full screen; **← Settings** stays at the top and takes you back.

## Settings levels {since=0.9.7}

So that not everything is there at once at the start, every personal setting belongs to one of three **levels**: **Beginner** (the essentials to start with – such as language, appearance, name, password, passkeys, the basics of notifications and capturing), **Normal** (most settings) and **Expert** (all of them, also those for developers and advanced use – such as API tokens, webhooks, block extensions or customizing the formatting toolbar). You see the settings up to your level; higher ones are hidden.

- **Switch level:** on the settings start page under **Settings level**. {since=0.11.6} The choice applies to your account on all devices.
- **Marks:** settings with a level of their own carry a sign – a green circle for Beginner, a yellow diamond for Normal, a red triangle for Expert (the tooltip says "Level: …").
- **What is missing:** below a section it says how many settings belong to higher levels ("3 more settings belong to higher levels."); **Show anyway** shows them for now. Sections that lie entirely above your level are left out of the start page and the sidebar.
- **The search finds everything:** settings above your level also appear in the search, with their sign and, for example, "Expert level". When you open one, Flowplan says "This setting belongs to the Expert level." and offers **Switch level: Expert** and **Show anyway**.

New accounts start with the instance's default – **Normal**, unless admins set another one ([Settings level for new accounts](/administration#instance)); the answer in the [introduction](#the-introduction) can adjust it. Accounts that existed before the levels are on **Expert** and so see everything as before. Admins can set a person's level under [Users](/user-management#users). The **Instance**'s sections have no levels: admins always see everything there.

## Symbols at the bottom of the sidebar {since=0.12.1}

You choose which symbols sit at the bottom: under **Settings → Appearance & language → Sidebar** with a checkbox per symbol, or right-click a symbol – a long press on touch screens – and pick **Hide from toolbar**. **Customize toolbar…** in the same menu leads to the setting, **Show all** brings everything back. The choice applies to you on all devices.

Hidden places stay reachable through the [quick search](/search-and-notifications). On a phone they are left out under **More** as well; only **Settings** always stays there. If you hide **Settings**, it shows in the workspace menu at the top left. What the workspace hides for everyone (Study, Graph) stays hidden.

## Show and hide features {since=0.11.0}

If you don't need something, hide it under **Settings → Appearance & language → Features** (Normal level). There is a switch per feature: **Flashcards**, **Whiteboards**, **Notebooks**, **Journal**, **Dashboards**, **Workflows**, **draw.io**, **AI**, **More view types** (board, calendar, timeline, gallery, chart, feed and sprints – table and list always stay), **Forms** and **Meetings**.

Hidden means: the feature is left out of **New page**, the "/" menu and the formatting toolbar, the quick search, the sidebar (such as **Study**), the home page widgets and **Add view**. With **AI**, every way into the AI goes. **What exists stays:** pages, records and views of that kind – also other people's – still show and open from links, the sidebar and the search, and permissions do not change. The choice applies to your account on all devices.

New accounts start with the choice admins set ([Features for new accounts](/administration#instance)); as long as you switch nothing, it says **Instance default** there. Once you have chosen yourself, **Default** goes back to it. Accounts that existed before see everything.

If admins switched a feature off for the whole instance ([Features of this instance](/instance-features)), its switch is off and locked, with the notice **Switched off for this instance by the administration** – it is then not only hidden: existing pages of that kind open read-only. Your own choice is kept and applies again once the feature is switched on.
