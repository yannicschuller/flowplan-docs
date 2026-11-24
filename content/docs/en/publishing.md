---
keywords: publish, public, website, web, public link, custom domain, appearance, search engines, veröffentlichen
---

# Publish on the web

Make a page and its sub-pages readable for everyone with the link – with a look of its own and, if you like, under your own domain. People and links with their own permissions are covered in [Sharing](/sharing).

In the **Web** tab, the **Publish on the web** switch makes the page readable for everyone with the link. Then come the public link (**Copy** or open it) and the options:

- **Also publish the current sub-pages**; **Add new sub-pages to the selection** brings in ones created later.
- **Publish new sub-pages automatically** (only together with the sub-pages): pages that are later created under the published page, moved there, duplicated there or restored there – also by others and at any depth – are public without another step, with this publication's password, expiry, copy setting and look. If such a page is moved out again, it is no longer published. Never published automatically: pages you could not publish yourself (without your edit rights), journals with a PIN, workflow pages and pages of encrypted spaces. If you switch the option off, the sub-pages that joined until then stay published; new ones no longer join.
- **Visitors may copy it into their workspace** – only what the publication shows.
- **Show ↗ arrow after links:** whether links to the web on the published page carry the small arrow. Preset from your setting [Icon on external links](/links-and-mentions#page-links-and-mentions); publications from before this version keep the arrow. {since=0.9.7}
- Databases appear with their views – table, board, gallery, list, feed, calendar, timeline and chart (also with series and more values) –, records and record documents. A view is only published if all properties it needs are public. Person properties, relations, formulas, rollups and internal comments stay private. Database pages use the window's full width, as in the app. {since=0.11.0}
- The **timeline** looks as in the app, read-only: with the period and zoom you saved in the view, the two-row axis, milestones as diamonds, titles that stay at the left edge and the chosen public properties beside them, weekends, today's line and the view's sorting. Records outside the period stay as empty rows, cut bars are marked. Dependency arrows and the critical path appear as set up – only between published records, and not when a read rule protects the dependency property. Visitors can scroll and zoom; nothing is saved. {since=0.11.0}
- Files linked in published pages are public; other uploads are not.
- Switching it off, deleting or moving a page out of the published tree revokes access immediately, including to files.
- If a page has headings, visitors show its **outline** with the list icon to the right of the text (on a phone, the round button at the bottom right). It marks where you are reading and jumps to a heading on click. The browser remembers whether it is open – as in the editor.

## Who can publish {since=0.11.6}

Publishing needs edit rights on the page, just like creating links – someone who may only read the page can't make it public. It also works while the page is open in reading mode.

When the **Publish on the web** switch is greyed out, the reason is shown below it:

- **The page is locked:** unlock it in the page menu ([Page actions](/pages-and-spaces#page-actions)). A locked page is protected against every change, including changes to who can see it.
- **The feature is switched off for the instance** (**Administration → Instance → [Features of this instance](/instance-features)**): pages of a switched-off feature open read-only and can't be published.
- **You don't have edit rights** on the page.

Anyone who has the link can pass it on – a published page is public. To control who sees it, use a link with a [password and expiry date](/sharing#password-and-expiry-date) or [invite people](/sharing#share-a-page-with-a-person).

## Light, dark and back to the view {since=0.11.0}

Shared and published pages – [single shared records](/sharing#share-a-single-record) too – have a small sun or moon button at the top right. It cycles through **automatic** (like the visitor's device), **light** and **dark**. The browser remembers the choice on this device, like [Light and dark](/offline-and-apps#light-and-dark) in the app (in local storage under `flowplan-theme`, no cookie). The publisher cannot preset it: without a choice of their own, the page follows the device.

- **Back to the view:** when a visitor opens a record from a view of a database, **← Back to <view>** appears above the path. It returns to the same view, month (calendar, timeline) and scroll position. For this the view and its month are part of the record's address (`?row=…&view=…&month=…`); the scroll position stays in this tab only (session storage). This works for links and publications alike. Opened from a link in a document, a relation or an address without a view, the record shows just the path.
- **Record beside the view:** in windows from 1000 pixels wide, a record opened from a view shows in the side panel beside it – with title, public properties and text; <kbd>↑</kbd>/<kbd>↓</kbd> step through the view's records, **Open as page** leads to the record's own page. Narrower windows and ⌘/Ctrl-click open it as a page, as before. {since=0.11.0}
- **Title in the path:** the path ends with the record's title instead of "Record"; long titles are shortened with "…", the full one is in the tooltip. If visitors may not read the title property (for example because of a restricted [visibility](/properties-and-formulas#property-visibility)), it stays "Record".

## Flashcards through a link {since=0.10.0}

A [flashcard deck](/flashcards) shows its **Study** view through a link with its own permissions or as a publication:

- **Browse**: every card as a grid, 100 per page; a click or **Turn over** shows the back. Without JavaScript, **Turn over** folds the back open below the card. {since=0.11.0}
- **Practise**: the focus mode with ratings, without an account. The learning state lives in the visitor's browser only (in local storage under `flowplan-study:` and the link) – no cookie, nothing goes to the server. A note says so once; **Delete progress** removes it. If the browser allows no storage, the practice lasts for that session only.
- A study view is public only when every property of the card mapping is public; private records never become cards. Pictures come through the link, password and end date apply as to everything else.
- Someone signed in to the workspace who may read the deck gets **Study in Flowplan** with their own learning state. A copy of the publication keeps the card mapping.
- **Study in Flowplan** opens the deck in the app on the same study view and starts the focus mode right away – in the phone app too. If the view no longer exists, the deck's first study view opens with a note. On a custom domain there is no such button. {since=0.11.0}

## How the page looks to others {since=0.11.6}

Published and link-shared pages look the way you see them: where the page icon sits (above or next to the title), your font and whether done tasks are struck through come from your settings under **Appearance & language** when you publish or create the link. In the share dialog's **Web** tab you can change them for one publication (**Page icon**, **Font**, **Strike through done tasks**) without changing your own settings. Light or dark mode and language are the visitor's own.

## Previews in messengers and social networks {since=0.11.6}

When you share the address of a publication in a messenger or social network, the preview shows the page's title, the start of its text (about 200 characters) and its cover image. A page without text, or with a cover colour instead of an image, shows only the title. If the publication is behind a password or has expired, the preview shows nothing of the page, only Flowplan's general one. The same goes for named links from the **Links** tab.

## Appearance

In the **Web** tab, **Appearance** folds open below the options. There you set the look of the publication: **logo** and **favicon** (an HTTPS address or an uploaded file the publication shows), **accent colour**, **footer text** and **hide “Published with Flowplan”** – applied with **Save appearance**.

## Custom domain

When the administration switched it on (**Custom domains for publications**), a publication can also be shown under your domain, such as `docs.example.org`:

::: steps

1. In the **Web** tab, open **Custom domain**, enter the domain and choose **Add domain**.
2. At your DNS provider create the TXT record shown: name `_flowplan-verify.docs.example.org`, value `flowplan-verify-…`. Only this TXT record verifies the domain.
3. Point the domain at the Flowplan instance with a CNAME (or A/AAAA) record.
4. Choose **Check now**. The reverse proxy obtains the HTTPS certificate – see [Custom domains for publications](/coolify-and-proxy#custom-domains-for-publications).

:::

A verified domain stays verified until you remove it – including domains verified another way in the past. A domain that is still not verified after 7 days is released again; after that someone else may enter it.

Under the domain there are short addresses (`/` for the start page, `/<page ID>` for sub-pages), a `sitemap.xml` and `robots.txt` of its own, and search engines may index the pages; the `/share/…` link names them as the canonical address. The domain shows only this publication: no sign-in, no app, no API apart from the publication's read access, no cookies, and the pages cannot be embedded in other sites.

Publications with a password cannot be shown under a custom domain. When the publication ends, the domain answers with 404.

> [!WARNING]
> Embedded videos and external images load content from their provider when viewed. This also applies to published pages.
