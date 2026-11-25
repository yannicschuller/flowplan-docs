---
keywords: features, modules, switch off, disable, instance, workflows, AI, flashcards, forms, background jobs, admin
---

# Features of this instance

Under **Settings → Instance → Name & version → Features of this instance** you switch features off for the whole instance – the same list as in [Show and hide features](/settings#show-and-hide-features). Unlike there, the feature is then not only hidden but off. Flowplan asks before switching one off.

## Switching off and on again {since=0.11.0}

- **Hidden for everyone**, whatever they chose themselves. In their own settings the switch is off, locked and says **Switched off for this instance by the administration**; the same goes for **Features for new accounts**.
- **The server refuses it:** new pages of that kind, its commands, the matching API routes and MCP tools answer 403 with "… switched off on this instance". MCP clients are not even offered the feature's tools.
- **No background work:** whatever runs in the background for the feature pauses – every round checks the setting again, in cluster mode on every instance.
- **What exists stays unchanged:** pages of that kind still show in the sidebar, the search and the trash and open read-only, with the notice **Switched off on this instance**. Renaming, moving, deleting, restoring, exports and backups work as always.
- **Public links** to such pages show "not available".

Switch the feature on again and everything is as before: nothing was deleted or rebuilt. Every change is in the [activity log](/administration#activity-log) (`admin.modulesOff`, such as "off: workflows").

| Feature | Switched off |
| --- | --- |
| Flashcards | No flashcard commands and no studying (shared links included); existing **Study** views show a notice, cards and progress stay. The daily study reminder pauses. |
| Whiteboards, notebooks, dashboards | No new pages of that kind, existing ones read-only; whiteboard templates, racks and facilitation as well as live editing through links are locked. |
| Journal | No new journals and no journal commands; the journal and its day pages read-only. |
| Workflows | No new workflows and no runs. The queue and the schedules do not run, events are not recorded (nothing piles up for later) and webhooks answer 403. What was already queued carries on once switched on; of a missed schedule at most the latest slot runs then, as after a restart. |
| draw.io | The draw.io editor no longer opens; existing diagrams stay in the pages as pictures. |
| AI | Like the master switch under **Settings → Instance → AI**: no AI feature, on-device included. AI properties, the queue and the semantic index pause and are worked off once switched on. |
| More view types | No new views of these types; existing ones stay as they are. |
| Forms | Every form is closed – public ones too – with a notice that forms are switched off on this instance; the **Form** view shows a notice, answers stay. |
| Meetings | Nothing is recorded, transcribed or summarised, meeting reminders pause. Kept audio can still be deleted and is still removed once its retention ends. |
