# Sharing and publishing

**Share** at the top right of every page opens **Share page**. A line at the top sums up how the page is shared right now – space, people, links and whether it is published. Below, three tabs handle one thing each: **People** (who in the workspace may access it), **Links** (named links for outsiders; only for those who may do more than read) and **Web** (publishing). Longer explanations sit behind the small **(i)**. At the bottom, **Copy link to page** copies the page's address for everyone with access, and **Done** closes the dialog.

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
- With **edit** links, guests write along live: changes by members and other guests appear right away, and cursors are visible both ways – guests appear as "Guest · <link name>".
- Optionally they also apply to the sub-pages that exist right now; new sub-pages are not added automatically.
- Edit links cannot change permissions, members, private relations or files properties. Before every guest edit, Flowplan saves the previous content.
- A [journal with a PIN](/journal) can be neither shared by link nor published; setting the PIN revokes existing links and publications. Sharing a page above it with its sub-pages leaves it out.

### Password and expiry date

Links with their own permissions and [publications](#publish-on-the-web) can have a **password** and an **expiry date** – when creating them or later: for links via **⋯ → Password and expiry date**, for the publication in the **Web** tab under **Password** and **Expires**. The list shows "Password" or "expires on …".

- Visitors enter the password once per device. It is valid for up to 12 hours and only for this link; a new password signs all visitors out.
- Ten wrong attempts within 15 minutes block that address for the link.
- Editing links have daily budgets: per link, guests upload at most 200 MB of files per day (20 files per 10 minutes) and send at most 100 MB of changes per day; a document does not grow beyond 3 MB of text through a link. For the whole instance `FLOWPLAN_ANONYMOUS_UPLOAD_MB` applies on top ([Configuration](/en/configuration)).
- After the expiry date the link only shows "expired" – no content, no files, no live updates.
- You can remove the password or extend the date at any time.
- Password-protected publications cannot be copied into other workspaces.
- The password is stored only as a hash and never shown again.

## Publish on the web

In the **Web** tab, the **Publish on the web** switch makes the page readable for everyone with the link. Then come the public link (**Copy** or open it) and the options:

- **Also publish the current sub-pages**; **Add new sub-pages to the selection** brings in ones created later.
- **Visitors may copy it into their workspace** – only what the publication shows.
- Databases appear with their views – table, board, gallery, list, feed, calendar, timeline and chart (also with series and more values) –, records and record documents. A view is only published if all properties it needs are public. Person properties, relations, formulas, rollups and internal comments stay private.
- Files linked in published pages are public; other uploads are not.
- Switching it off, deleting or moving a page out of the published tree revokes access immediately, including to files.
- If a page has headings, visitors show its **outline** with the list icon to the right of the text (on a phone, the round button at the bottom right). It marks where you are reading and jumps to a heading on click. The browser remembers whether it is open – as in the editor.

### Appearance

In the **Web** tab, **Appearance** folds open below the options. There you set the look of the publication: **logo** and **favicon** (an HTTPS address or an uploaded file the publication shows), **accent colour**, **footer text** and **hide “Published with Flowplan”** – applied with **Save appearance**.

### Custom domain

When the administration switched it on (**Custom domains for publications**), a publication can also be shown under your domain, such as `docs.example.org`:

1. In the **Web** tab, open **Custom domain**, enter the domain and choose **Add domain**.
2. At your DNS provider create the TXT record shown: name `_flowplan-verify.docs.example.org`, value `flowplan-verify-…`. Only this TXT record verifies the domain.
3. Point the domain at the Flowplan instance with a CNAME (or A/AAAA) record.
4. Choose **Check now**. The reverse proxy obtains the HTTPS certificate – see [Custom domains for publications](/coolify-and-proxy#custom-domains-for-publications).

A verified domain stays verified until you remove it – including domains verified another way in the past. A domain that is still not verified after 7 days is released again; after that someone else may enter it.

Under the domain there are short addresses (`/` for the start page, `/<page ID>` for sub-pages), a `sitemap.xml` and `robots.txt` of its own, and search engines may index the pages; the `/share/…` link names them as the canonical address. The domain shows only this publication: no sign-in, no app, no API apart from the publication's read access, no cookies, and the pages cannot be embedded in other sites.

Publications with a password cannot be shown under a custom domain. When the publication ends, the domain answers with 404.

> [!WARNING]
> Embedded videos and external images load content from their provider when viewed. This also applies to published pages.

## Forms

Forms have a link of their own, see [Forms](/forms#share-a-form).
