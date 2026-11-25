---
keywords: invite team, members, roles, guests, groups, permissions, workspace
---

# Members, roles and permissions

A workspace belongs to a team: its own members, groups, spaces and templates. Permissions work from the workspace via the space down to the single page and the single record.

**More on this topic:** [Customizing a workspace](/workspace-appearance)

## Workspaces

- **Create**: the name at the top of the sidebar → **Create workspace**. The administrators decide whether everyone may do this.
- **Switch**: via the same name; everyone can be a member of several workspaces.
- **Settings → General**: change the name and icon (**Name & icon**). Leaving and deleting are at the end in the **Danger zone**; when a button is greyed out, the text above it says why.

When **leaving**, a last owner has to make someone else an owner first under **Settings → Members**; your own spaces are handed over to a remaining owner of your choice. **Deleting** is only possible once you have another workspace; it removes all content, templates, files and shares for all members and cannot be undone. Both are confirmed with the workspace's name.

## Roles

| Role | May |
| --- | --- |
| **Owner** | Everything, plus managing members, groups, spaces (including their order in the sidebar), [tags and page properties](/page-tags#tags-and-properties) and the workspace itself |
| **Edit** | Create and change pages, set tags and property values, create new tags, comment, share |
| **View** | Read and comment |
| **Guest** | Only explicitly shared pages and spaces, with view or edit access |

## Invite members

**Settings → Members → Invite member** opens a sheet (from the bottom on phones): e-mail address, role and – if needed – **Invite as a guest**. If e-mail is set up on the instance, the person gets an invitation. They create an account with this address – even if sign-ups are otherwise closed – or sign in with SSO; the workspace appears as soon as the address is confirmed. Without e-mail, afterwards copy the **invitation link** under **Pending invitations** (**Copy link**) and send it to them yourself.

**Invitation link:** the link opens the sign-up form with the invited address already filled in – even if sign-ups are otherwise closed. It creates an account only for that address. Without e-mail the person needs the link; the address alone is not enough then.

**Only confirmed addresses:** an existing account takes over an invitation on its own only when its address provably belongs to it – confirmed with the e-mail link, by an administrator or by the SSO provider. Otherwise (for instance on an instance without e-mail, where any address can sign up) only the invitation link counts: whoever opens it and signs in or signs up accepts the invitation. So give the link only to the person invited.

**Where the invitation arrives:** open invitations are listed under **Settings → Members → Pending invitations** – with role, guest status and shared pages, when and by whom they were invited. There they can be **sent again** (with e-mail) or **withdrawn**. The invited person finds the workspace in the workspace switcher at the top left and a notification in the **inbox** – right away with a new account, with an existing one the next time they open Flowplan (with single sign-on, at the next sign-in). A single page can also be shared without the whole workspace: [Share a page with a person](/sharing#share-a-page-with-a-person).

**Registered people are added right away:** if the address belongs to an account whose address is confirmed, the person becomes a member at once – no pending invitation, they appear under **Members**. Within a few seconds the workspace shows in their switcher, and the inbox says “Ada added you to ‘Team’”, with **Open** and **Leave** (leaving asks for the workspace name, as under **Settings → General**). For you the answer looks the same either way, so inviting doesn't reveal which addresses have an account. Unconfirmed addresses keep the invitation as described above. {since=0.9.8}

### Invite links for several people {since=0.9.8}

**Settings → Members → Create invite link** makes one link for several people: choose the role (**Edit** or **View**, optionally **Join as a guest** – never owner), how long it is valid (**24 hours**, **7 days** or **30 days**) and, if you like, **At most this many joins**. Only owners create links. Whoever opens the link signs in or creates an account – even if sign-ups are otherwise closed – and joins the workspace with the link's role. Opening it again as a member changes nothing and counts no join.

Under **Invite links**, the open links show with their joins (“1 of 5 joins”), expiry and creator; **Copy** copies a link again, **Revoke** ends it at once – people who already joined stay members. An expired, revoked or used-up link says so when opened. Anyone who has the link can join while it is valid, so share it only where it belongs. Administrators can switch invite links off for the whole instance ([Sign-up & access](/user-management#sign-in-sso)).

Existing members can be turned into guests with **Make guest** and back with **Make member**.

## Guests

Guests are people outside the team, such as customers or freelancers. They only see pages and spaces shared with them, including sub-pages, and cannot create pages, invite anyone or change settings. They do not see the workspace's templates, only their own. For people without any account there are [links with their own permissions](/sharing#links-with-their-own-permissions) instead.

## Groups

**Settings → Groups & permissions**: under **Groups** create a group such as "Design" or "Sales" and tick members with **Manage** (with a search when there are many). Under **Access to spaces** set each space's visibility and below it **View** or **Edit** per group; single pages get a group through **Share**. New members of a group get its permissions right away. Only someone who can see a private space can make it visible or give groups rights on it – owners included (see [How permissions work together](#how-permissions-work-together)). {since=0.11.5}

With single sign-on, groups from the identity provider can maintain members and groups automatically – see [Map SSO groups](/sso-oidc#map-sso-groups-to-workspaces).

Shelves and books of the [library](/library#permissions-for-shelves-and-books) follow the same permissions: a shelf is a space, a book a page. {since=0.11.0}

## How permissions work together

1. The **space** sets the basis: open to all members or private for the people it is shared with.
2. **Pages** inherit the permissions of their space and parent pages; under **Share**, people or groups are added.
3. **Records** of a database can be made read-only or private (see [Databases](/databases#permissions-per-record)). A detached occurrence and the next record of a [repeating task](/databases#repeating-tasks) keep the original's creator, record permissions and grants. {since=0.11.5}
4. **Properties** of a database can be made visible or editable only for editors, owners or selected groups (see [Property visibility](/properties-and-formulas#property-visibility)).
5. Linked databases, mentions and links never grant additional permissions: whoever may not read the source does not see it embedded either.

Owners of a workspace also manage other members' spaces, but do not get read access to their private pages that way. They can rename, reorder, trash and restore other members' private spaces and manage the groups. Making such a space visible to the team, giving rights on it or adding themselves to a group with rights on it only works if they can see the space themselves. {since=0.11.5}

The instance's admin rights give no access to content either: admins see only what membership and permissions allow them – what **Settings → Instance** shows about accounts and workspaces is under [What administrators can see](/user-management#what-administrators-can-see).

**Encrypted spaces** go one step further: there, not only the permission on the server decides but the key. Whoever has not been given the space key reads nothing – not even workspace owners or the administrators. See [Encrypted spaces](/encrypted-spaces).

## Workflows: permissions and “runs as”

[Workflow pages](/workflows) follow the normal page permissions: readers see the status, the flow and the runs; editors (full members with edit rights) build, test, activate and pause. **Guests** do not see workflow pages and cannot start or approve a workflow. An active workflow **runs as** the person who last activated it – it only sees and changes what they may, and pauses when they lose their rights.

## Storage quota

Every workspace can have a quota. Uploads, copies, templates and imports beyond it are refused. Administrators see the usage under **Settings → Instance → Workspaces**.
