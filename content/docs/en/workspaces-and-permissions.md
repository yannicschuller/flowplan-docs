# Workspaces, members and permissions

A workspace belongs to a team: its own members, groups, spaces and templates. Permissions work from the workspace via the space down to the single page and the single record.

## Workspaces

- **Create**: the name at the top of the sidebar → **Create workspace**. The administrators decide whether everyone may do this.
- **Switch**: via the same name; everyone can be a member of several workspaces.
- **Settings → General**: change the name and icon (**Name & icon**). Leaving and deleting are at the end in the **Danger zone**; when a button is greyed out, the text above it says why.

When **leaving**, a last owner has to make someone else an owner first under **Settings → Members**; your own spaces are handed over to a remaining owner of your choice. **Deleting** is only possible once you have another workspace; it removes all content, templates, files and shares for all members and cannot be undone. Both are confirmed with the workspace's name.

## Roles

| Role | May |
| --- | --- |
| **Owner** | Everything, plus managing members, groups, spaces (including their order in the sidebar), [tags and page properties](/pages-and-spaces#tags-and-properties) and the workspace itself |
| **Edit** | Create and change pages, set tags and property values, create new tags, comment, share |
| **View** | Read and comment |
| **Guest** | Only explicitly shared pages and spaces, with view or edit access |

## Invite members

**Settings → Members → Invite member** opens a sheet (from the bottom on phones): e-mail address, role and – if needed – **Invite as a guest**. If e-mail is set up on the instance, the person gets an invitation. They create an account with this address – even if sign-ups are otherwise closed – or sign in with SSO; the workspace appears as soon as the address is confirmed. Without e-mail, afterwards copy the **invitation link** under **Pending invitations** (**Copy link**) and send it to them yourself.

**Invitation link:** the link opens the sign-up form with the invited address already filled in – even if sign-ups are otherwise closed. It creates an account only for that address. Without e-mail the person needs the link; the address alone is not enough then.

**Only confirmed addresses:** an existing account takes over an invitation on its own only when its address provably belongs to it – confirmed with the e-mail link, by an administrator or by the SSO provider. Otherwise (for instance on an instance without e-mail, where any address can sign up) only the invitation link counts: whoever opens it and signs in or signs up accepts the invitation. So give the link only to the person invited.

**Where the invitation arrives:** open invitations are listed under **Settings → Members → Pending invitations** – with role, guest status and shared pages, when and by whom they were invited. There they can be **sent again** (with e-mail) or **withdrawn**. The invited person finds the workspace in the workspace switcher at the top left and a notification in the **inbox** – right away with a new account, with an existing one the next time they open Flowplan (with single sign-on, at the next sign-in). A single page can also be shared without the whole workspace: [Share a page with a person](/sharing#share-a-page-with-a-person).

Existing members can be turned into guests with **Make guest** and back with **Make member**.

## Guests

Guests are people outside the team, such as customers or freelancers. They only see pages and spaces shared with them, including sub-pages, and cannot create pages, invite anyone or change settings. They do not see the workspace's templates, only their own. For people without any account there are [links with their own permissions](/sharing#links-with-their-own-permissions) instead.

## Groups

**Settings → Groups & permissions**: under **Groups** create a group such as "Design" or "Sales" and tick members with **Manage** (with a search when there are many). Under **Access to spaces** set each space's visibility and below it **View** or **Edit** per group; single pages get a group through **Share**. New members of a group get its permissions right away.

With single sign-on, groups from the identity provider can maintain members and groups automatically – see [Map SSO groups](/sign-in#map-sso-groups-to-workspaces).

## How permissions work together

1. The **space** sets the basis: open to all members or private for the people it is shared with.
2. **Pages** inherit the permissions of their space and parent pages; under **Share**, people or groups are added.
3. **Records** of a database can be made read-only or private (see [Databases](/databases#permissions-per-record)).
4. **Properties** of a database can be made visible or editable only for editors, owners or selected groups (see [Property visibility](/properties-and-formulas#property-visibility)).
5. Linked databases, mentions and links never grant additional permissions: whoever may not read the source does not see it embedded either.

Owners of a workspace also manage other members' spaces, but do not get read access to their private pages that way.

**Encrypted spaces** go one step further: there, not only the permission on the server decides but the key. Whoever has not been given the space key reads nothing – not even workspace owners or the administrators. See [Encrypted spaces](/encrypted-spaces).

## Storage quota

Every workspace can have a quota. Uploads, copies, templates and imports beyond it are refused. Administrators see the usage under **Administration → Workspaces**.
