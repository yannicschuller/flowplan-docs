# Workspaces, members and permissions

A workspace belongs to a team: its own members, groups, spaces and templates. Permissions work from the workspace via the space down to the single page and the single record.

## Workspaces

- **Create**: the name at the top of the sidebar → **Create workspace**. The administrators decide whether everyone may do this.
- **Switch**: via the same name; everyone can be a member of several workspaces.
- **Settings → General**: change the name and icon (**Name & icon**). Leaving and deleting are at the end in the **Danger zone**; when a button is greyed out, the text above it says why.

When **leaving**, a last owner has to make someone else an owner first under **Settings → Members**; your own spaces are handed over to a remaining owner of your choice. **Deleting** is only possible once you have another workspace; it removes all content, templates, files and shares for all members and cannot be undone. Both are confirmed with the workspace's name.

## Appearance

Owners give the workspace a look of its own under **Settings → Appearance**, for example in your organisation's colours and typefaces. It applies to all members and guests while this workspace is open – switching to another workspace switches the look too – and also to its [published pages](/sharing) and [forms](/forms). Two preview cards show the changes in light and dark before you save; **Reset to default** brings back Flowplan's own look.

- **Accent colour**: one from the selection or your own. Flowplan derives the colours for links, buttons, selections and highlights from it, separately for light and dark mode. So that text on the colour and the colour as text stay easy to read (at least 4.5 : 1 as WCAG asks), Flowplan darkens a colour that is too light (in dark mode it lightens one that is too dark) and shows you which colour it actually uses.
- **Background**: Standard (warm), Neutral, Cool or Sepia – each with a matching dark counterpart. There are no free background colours, so text stays readable everywhere.
- **Typefaces**: one each for the interface, for large headings and for code. You can choose Flowplan's own typefaces, the system font and about fifteen others, among them Inter, Atkinson Hyperlegible Next, IBM Plex, Source Sans/Serif/Code, Lora, Literata, Merriweather, EB Garamond and Fira Code. All of them are on your Flowplan server: the browser loads only the chosen ones, and no request goes to an outside font service. Pages whose font was changed to serif use the heading typeface.
- **Own fonts**: a house font can be uploaded as WOFF2, WOFF, TTF or OTF (up to 5 MB, up to 20 per workspace) and then chosen for any of the three. It counts toward the workspace's [storage quota](#storage-quota) and is deleted with the workspace. Only upload fonts whose licence allows use on the web.

Light or dark stays each person's own choice. Anyone who prefers to keep Flowplan's own look turns off **Settings → Appearance & language → Use the workspace's appearance**; this applies to your account in every workspace and on all devices.

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

## Workflows: permissions and “runs as”

[Workflow pages](/workflows) follow the normal page permissions: readers see the status, the flow and the runs; editors (full members with edit rights) build, test, activate and pause. **Guests** do not see workflow pages and cannot start or approve a workflow. An active workflow **runs as** the person who last activated it – it only sees and changes what they may, and pauses when they lose their rights.

## Storage quota

Every workspace can have a quota. Uploads, copies, templates and imports beyond it are refused. Administrators see the usage under **Administration → Workspaces**.
