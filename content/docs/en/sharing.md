---
keywords: share, link, share link, guests, invite, password, expiry date, permissions
---

# Sharing

**Share** at the top right of every page (on a phone at the top of the `⋯` menu) opens **Share page**. A line at the top sums up how the page is shared right now – space, people, links and whether it is published. Below, three tabs handle one thing each: **People** (who in the workspace may access it), **Links** (named links for outsiders; only for those who may do more than read) and **Web** (publishing). Longer explanations sit behind the small **(i)**. At the bottom, **Copy link to page** copies the page's address for everyone with access, and **Done** closes the dialog.

To make a page public for everyone with the link, see [Publish on the web](/publishing).

## Access in the workspace

Pages inherit the permissions of their space and parent pages; below the list, the **People** tab names who comes in through the space (such as “Plus all 8 members of the space Team”, with **Manage space** for those who may). In addition, individual people or groups can be given permissions:

| Role | May |
| --- | --- |
| **View** | Read and comment |
| **Edit** | Change content, records and views |

Private spaces and pages are only visible to the people they are shared with. Guests only see what has been explicitly shared with them (see [Workspaces, members and permissions](/workspaces-and-permissions)).

### Share a page with a person

A page or database can be shared with someone who is not in the workspace – without taking them into the whole workspace. **Share → People**: enter an e-mail address (members are suggested), choose **View** or **Edit**, **Add**.

- **The person already has an account on this instance** (with a confirmed address)**:** they have access to the page and its sub-pages right away and get a notification in the inbox ("… shared “Page” with you") and – when the instance sends e-mail – right away an e-mail with a link to the page. **Settings → Notifications → Pages shared with you** turns the e-mail off. If they are not in the workspace yet, they join as a **guest** and see only what is shared with them.
- **No account yet:** they get an invitation by e-mail (when set up) and are listed as "Invited". Once they create an account with this address, the page is there. The same goes for an account whose address is not confirmed yet – then only the invitation link (**Settings → Members → Pending invitations → Copy link**) opens the page.
- Guests do not see the list of people with access; only those who may share see e-mail addresses. Each person sends at most a few dozen invitations an hour, and each address gets only a few e-mails.
- In the list, roles can be changed and people **removed**. A guest without any shared page left is no longer in the workspace either.
- Owners of the workspace and owners of the page's space may share. Everyone else only sees the list.

## Links with their own permissions

In the **Links** tab, **+ New link** creates as many named links as you like, e.g. "Feedback from the customer": choose a name and permission, optionally sub-pages, a password and an expiry date, then **Create link**. Each link in the list has a copy button and a **⋯** menu.

| Link permission | Visitors may |
| --- | --- |
| **Read** | look at the page |
| **Read and comment** | also comment; comments carry a guest note |
| **Read, comment and edit** | also change the title, text and visible properties of existing records |

- Links work without an account and can be revoked one by one (**⋯ → Revoke**).
- With **edit** links, guests write along live: changes by members and other guests appear right away, and cursors are visible both ways – guests appear as "Guest · <link name>". They write in the same editor as in the workspace: a toolbar with text style, formatting, lists, alignment, formula, diagram and file; `/` or **+** opens the block menu (headings, lists, quote, callout, code, divider, formulas, Mermaid, file). {since=0.9.6}
- Optionally they also apply to the sub-pages that exist right now; new sub-pages are not added automatically.
- Edit links cannot change permissions, members, private relations or files properties. Before every guest edit, Flowplan saves the previous content.
- A [journal with a PIN](/journal) can be neither shared by link nor published; setting the PIN revokes existing links and publications. Sharing a page above it with its sub-pages leaves it out.

### Editing whiteboards and notebooks with guests {since=0.9.6}

If you share a whiteboard or notebook via a link with **Read, comment and edit**, guests see an **Edit whiteboard** or **Edit notebook** button above the preview picture. They then work in the same editor as you, without an account and live: everyone sees the others' changes right away.

- **Whiteboard:** add, move and delete notes, text, shapes, connectors, frames, tables and emoji, draw and comment. Their pointer shows as "Guest · <link name>".
- **Notebook:** write and draw on the sheets and add, duplicate, delete and reorder sheets.
- **Not possible:** uploading files, templates, AI and facilitation features (votes, timer, private mode), linking pages and exporting. Guests see existing images and PDFs, but not references to pages outside the link.
- If the page is locked, or the link expires or is revoked, editing stops right away. Pages in encrypted spaces and journals with a PIN can't be edited this way.

### Password and expiry date

Links with their own permissions and [publications](/publishing) can have a **password** and an **expiry date** – when creating them or later: for links via **⋯ → Password and expiry date**, for the publication in the **Web** tab under **Password** and **Expires**. The list shows "Password" or "expires on …".

- Visitors enter the password once per device. It is valid for up to 12 hours and only for this link; a new password signs all visitors out.
- Ten wrong attempts within 15 minutes block that address for the link.
- Editing links have daily budgets: per link, guests upload at most 200 MB of files per day (20 files per 10 minutes) and send at most 100 MB of changes per day; a document does not grow beyond 3 MB of text through a link. For the whole instance `FLOWPLAN_ANONYMOUS_UPLOAD_MB` applies on top ([Configuration](/en/configuration)).
- After the expiry date the link only shows "expired" – no content, no files, no live updates.
- You can remove the password or extend the date at any time.
- Password-protected publications cannot be copied into other workspaces.
- The password is stored only as a hash and never shown again.

## Share a single record

A record of a database can be shared without opening the database: **Share** at the top of the record (the share icon in the dialog, the **Share** button on the record's own page) opens **Share record**. Anyone who may edit the record may share it.

- **Links**: as for pages – a name, a permission (read, comment, edit), optionally a [password and expiry date](#password-and-expiry-date); every link can be revoked on its own.
- **Web**: **Publish on the web** makes the record readable for everyone with the link, again with password and expiry date. Guest comments stay with the links; search engines do not index it.
- **Properties**: which properties visitors see – for all links and the publication of this record. Preselected are those a publication shows anyway, plus the record's files; empty ones are not shown. **Relations** (show the titles of linked records, without a link) and **people** (show names) only appear when you tick them. Properties with read permissions and rollups always stay private.
- **Include sub-pages** (when creating a link; a switch on the publication): visitors can also open the [record's sub-pages](/databases#sub-pages-of-a-record) and what lies below them – later ones too, as long as they sit below the record. Sub-pages of other records, the database and its other pages stay hidden.

Visitors see the record's title, icon, cover, the chosen properties and its document – no other records, no views, not the database; the path starts at the record (on a sub-page: record / sub-page). Links in the document to other pages or records are removed for them, and files are only visible when the record itself uses them. With **edit**, guests change the document (live) and the visible properties, but no relations.

- Members reach the record as before through the database and the [record's permissions](/databases#permissions-per-record); there are no guests of single records – that is what the link is for.
- **Private** records cannot be shared; if a shared record becomes private, is deleted, is moved to another database or its database is deleted, its links and its publication end at once.
- Your links appear under **Settings → Security**, all of them under **Settings → Instance → Security**.

## Forms

Forms have a link of their own, see [Forms](/forms#share-a-form).
