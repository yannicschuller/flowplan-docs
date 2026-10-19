# Sharing and publishing

**Share** at the top right of every page handles three things: who in the workspace may access it, named links for outsiders and publishing on the web.

## Access in the workspace

Pages inherit the permissions of their space and parent pages (**Inherited**). In addition, individual people or groups can be given permissions:

| Role | May |
| --- | --- |
| **View** | Read and comment |
| **Edit** | Change content, records and views |

Private spaces and pages are only visible to the people they are shared with. Guests only see what has been explicitly shared with them (see [Workspaces, members and permissions](/workspaces-and-permissions)).

### Share a page with a person

A page or database can be shared with someone who is not in the workspace – without taking them into the whole workspace. **Share → People with access to this page**: enter an e-mail address (members are suggested), choose **View** or **Edit**, **Add**.

- **The person already has an account on this instance** (with a confirmed address)**:** they have access to the page and its sub-pages right away and get a notification in the inbox ("… shared “Page” with you") and – when the instance sends e-mail – right away an e-mail with a link to the page. **Settings → Notifications → Pages shared with you** turns the e-mail off. If they are not in the workspace yet, they join as a **guest** and see only what is shared with them.
- **No account yet:** they get an invitation by e-mail (when set up) and are listed as "Invited". Once they create an account with this address, the page is there. The same goes for an account whose address is not confirmed yet – then only the invitation link (**Settings → Members → Pending invitations → Copy link**) opens the page.
- Guests do not see the list of people with access; only those who may share see e-mail addresses. Each person sends at most a few dozen invitations an hour, and each address gets only a few e-mails.
- In the list, roles can be changed and people **removed**. A guest without any shared page left is no longer in the workspace either.
- Owners of the workspace and owners of the page's space may share. Everyone else only sees the list.

## Links with their own permissions

Under **Links with their own permissions** you create as many named links as you like, e.g. "Feedback from the customer":

| Link permission | Visitors may |
| --- | --- |
| **View** | look at the page |
| **View and comment** | also comment; comments carry a guest note |
| **View, comment and edit** | also change the title, text and visible properties of existing records |

- Links work without an account and can be revoked one by one.
- With **edit** links, guests write along live: changes by members and other guests appear right away, and cursors are visible both ways – guests appear as "Guest · <link name>".
- Optionally they also apply to the sub-pages that exist right now; new sub-pages are not added automatically.
- Edit links cannot change permissions, members, private relations or files properties. Before every guest edit, Flowplan saves the previous content.

### Password and expiry date

Links with their own permissions and [publications](#publish-on-the-web) can have a **password** and an **expiry date** – when creating them or later via **Password and expiry date** in the share dialog. The list shows "Password" or "expires on …".

- Visitors enter the password once per device. It is valid for up to 12 hours and only for this link; a new password signs all visitors out.
- Ten wrong attempts within 15 minutes block that address for the link.
- After the expiry date the link only shows "expired" – no content, no files, no live updates.
- You can remove the password or extend the date at any time.
- Password-protected publications cannot be copied into other workspaces.
- The password is stored only as a hash and never shown again.

## Publish on the web

**Enable public link** makes the page readable for everyone with the link.

- **Also publish the current sub-pages**; new sub-pages can be added to the selection later.
- **Visitors may copy it into their workspace** – only what the publication shows.
- Databases appear with their views – table, board, gallery, list, feed, calendar, timeline and chart (also with series and more values) –, records and record documents. A view is only published if all properties it needs are public. Person properties, relations, formulas, rollups and internal comments stay private.
- Files linked in published pages are public; other uploads are not.
- Switching it off, deleting or moving a page out of the published tree revokes access immediately, including to files.

> [!WARNING]
> Embedded videos and external images load content from their provider when viewed. This also applies to published pages.

## Forms

Forms have a link of their own, see [Forms](/forms#share-a-form).
