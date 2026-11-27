---
keywords: appearance, logo, colours, font, branding, automatic links, print template
new: print-presets 2026-11-12
---

# Customizing a workspace

A workspace's name, icon, colours and font, automatic links for recurring terms and your own print templates – set by its owners.

## Appearance

Owners give the workspace a look of its own under **Settings → Appearance**, for example in your organisation's colours and typefaces. It applies to all members and guests while this workspace is open – switching to another workspace switches the look too – and also to its [published pages](/publishing) and [forms](/forms). Two preview cards show the changes in light and dark before you save; **Reset to default** brings back Flowplan's own look.

- **Accent colour**: one from the selection or your own. Flowplan derives the colours for links, buttons, selections and highlights from it, separately for light and dark mode. So that text on the colour and the colour as text stay easy to read (at least 4.5 : 1 as WCAG asks), Flowplan darkens a colour that is too light (in dark mode it lightens one that is too dark) and shows you which colour it actually uses. The accent colour also colours the Flowplan logo in the sidebar, the icon in the browser tab, the workspace tile, initials avatars (the initials are white or dark automatically, whichever reads better) and badges such as "E-mail account" in Settings → Account & security. {since=0.9.6} Charts of a single colour – sparklines, single-series charts, usage rings and bars – are drawn in the accent colour too, in its readable version for light and dark. {since=0.12.1} Colours with a meaning – warnings, errors, callouts, tag colours and charts with several series, whose colours are checked for colour blindness – stay as they are; the sign-in page and the icons of installed apps stay Flowplan blue.
- **Logo colour**: the default is **Follows the accent**. If you pick a colour of its own, it colours only the logo at the top of the sidebar and the icon in the browser tab; everything else keeps the accent colour. The glyph in the logo turns white or dark automatically, whichever reads better. {since=0.12.1}
- **Background**: Standard (warm), Neutral, Cool or Sepia – each with a matching dark counterpart. There are no free background colours, so text stays readable everywhere.
- **Typefaces**: one each for the interface, for large headings and for code. You can choose Flowplan's own typefaces, the system font and about fifteen others, among them Inter, Atkinson Hyperlegible Next, IBM Plex, Source Sans/Serif/Code, Lora, Literata, Merriweather, EB Garamond and Fira Code. All of them are on your Flowplan server: the browser loads only the chosen ones, and no request goes to an outside font service. Pages whose font was changed to serif use the heading typeface.
- **Own fonts**: a house font can be uploaded as WOFF2, WOFF, TTF or OTF (up to 5 MB, up to 20 per workspace) and then chosen for any of the three. It counts toward the workspace's [storage quota](/workspaces-and-permissions#storage-quota) and is deleted with the workspace. Only upload fonts whose licence allows use on the web.

Light or dark stays each person's own choice. Anyone who prefers to keep Flowplan's own look turns off **Settings → Appearance & language → Use the workspace's appearance**; this applies to your account in every workspace and on all devices.

**Your own font:** Under **Settings → Appearance & language → Font** you choose a different typeface for menus, text and pages, just for you – the system font or one of the bundled typefaces, sans serif or serif. Large headings, code and pages set in serif or mono keep theirs. **Default** is the workspace's typeface or Flowplan's own. The choice applies only to you, on all devices and in the apps; others, published pages and forms still see the workspace's typeface. {since=0.11.5}

Custom CSS is deliberately not possible: CSS could quietly send content elsewhere, and it would break with updates of the app.

The look and the uploaded fonts are part of the workspace's [content archive](/import-export-versions#content-archive). On import, an owner takes it over into a workspace that still has Flowplan's own look; a look that was already chosen stays.

You'll find ready-made appearances, fonts included, in the [Flowplan Marketplace](https://marketplace.flowplan.org).

## Automatic links

Owners set up rules under **Settings → Workspace → Automatic links** that turn text like `ABC-123` into a link while you write – to the ticket in Jira or the issue on GitHub, for example. The rules apply to every member and guest of the workspace. Each rule has an optional name, a **pattern** (a regular expression, at most 200 characters), a **link template** and a switch to turn it off and on; up to 50 rules are possible.

In the template, `{match}` stands for the whole match, `$1` to `$9` (or `{1}` to `{9}`) for the groups in parentheses. The values are inserted URL-encoded, and the template must start with `https://`, `http://` or `mailto:`. Examples:

| Pattern | Link template | Text | becomes |
| --- | --- | --- | --- |
| `\bABC-\d+\b` | `https://jira.example.com/browse/{match}` | ABC-123 | https://jira.example.com/browse/ABC-123 |
| `#(\d+)` | `https://github.com/acme/app/issues/$1` | #42 | https://github.com/acme/app/issues/42 |

Under **Try it** you enter a sample text and see right away which parts become which link. Invalid patterns, patterns that match empty text, nested repeats like `(a+)+` (they can slow the browser down) and templates without a valid address are marked and not saved.

You'll find ready-made link rules for common services in the [Flowplan Marketplace](https://marketplace.flowplan.org).

## Print presets

Under **Settings → Workspace → Print presets** owners create [print presets](/print-and-pdf#print-presets) for everyone in the workspace – named print options such as “Clean for external” – and pick a default preset with the star. Members and guests pick them in the print window but cannot change them.
