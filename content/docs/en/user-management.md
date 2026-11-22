---
keywords: users, account, lock, delete, admin, registration, invitation, create user, add user, new user, new account
new: adding-people 2026-11-22, what-administrators-can-see 2026-11-22
---

# Managing users

Create, lock, merge and delete accounts, grant admin rights and decide who may sign in and how.

## Users

All accounts as a searchable table (cards stacked on phones) with their state: **Active**, **Inactive** (30 days or more without signing in), **Disabled** (blocked), plus **Admin** (local accounts with admin rights and everyone who last signed in with the admin group, also via SSO or LDAP) and **E-mail unconfirmed**, how many workspaces the person is a member of (the tooltip shows how many of them they own), the storage used against their limit, when they were last here and when the account was created. Clicking a column header – **Person**, **Status**, **Workspaces**, **Storage**, **Last active**, **Created** – sorts by it, a second click reverses the order; at first the most recently active come first. On phones, choose the order under **Sort by**. At the bottom the table pages through 25, 50 or 100 accounts at a time (“1–25 of 112”). The filter buttons above the table (with their counts) show only active, inactive or disabled accounts, admins or who is **here now**. Several accounts at once: tick them, then **End sessions**, **Block** or **Unblock**. To give the table room, **Sign-in & SSO** and **Workspaces** sit as tabs above the heading on this page instead of beside it.

{since=0.11.1} **Unconfirmed addresses**: the filter **E-mail unconfirmed** lists accounts that never confirmed their address. **Mark for deletion …** (**⋯**, panel, selection or all filtered) shows how many, the day (in 14 days) and how many have content in shared workspaces (it stays as “Deleted account”). The person gets an e-mail with a confirmation link and a reminder 3 days before; only confirming keeps the account, signing in shows a notice. **Cancel** next to “Deletion on …” stops it. Never: admins, yourself, SSO, LDAP and SCIM accounts. Only with e-mail sending. Automatic: **Automatically mark unconfirmed accounts** under **Sign-in & SSO**.

**Who is here right now** shows in the **Last active** column and refreshes every 30 seconds: a green dot for **Active now** (Flowplan is open and was used in the last few minutes), an amber one for **Open · idle for …** (open but untouched since then – a tab in the background, too), a grey one with the time of the last visit when Flowplan is closed, and an empty circle for accounts that were never here. For this the open app only reports once a minute that it is open and how long ago it was last used (typing, clicking, scrolling, touching) – not what someone does or which page is open.

Clicking the row or the name opens the account in a side panel (from the bottom on phones). **⋯** at the end of the row is quicker: **Details and settings**, **Sign out everywhere** and **Block …** or **Unblock**. At the top the panel shows the person's workspaces (with their names, how many they own), when they were last active, when the account was created and how they sign in (e.g. “E-mail + password · SSO · Passkey”), below that the **Storage** used with a bar – everything they upload or copy, across all workspaces – and:

- **Groups from the provider (last sign-in)** (accounts with SSO): when the person last signed in through OpenID Connect, which claim was read (`OIDC_GROUPS_CLAIM`, with "missing from token and userinfo" when the provider did not send it at all), the groups as chips – the admin group highlighted – and "Admin group “…” included: yes/no". When no groups arrived, it tells you to check `OIDC_GROUPS_CLAIM` and your provider's group mapper. This shows why someone is (not) an admin ([Check the admin group](/sso-oidc#check-the-admin-group)). Until the next SSO sign-in it says "No SSO sign-in recorded yet". {since=0.9.7}

- **Role**: for accounts with e-mail and password **Member** or **Admin** (someone always administers the instance); for SSO accounts it comes from the sign-in group.
- **Storage limit** for this person.
- **Sessions**: on how many devices the person is signed in; **Sign out** ends all sessions.
- **Password** (accounts with e-mail and password): **Create link** makes a reset link valid for two hours – to hand over when the instance does not send e-mails.
- **E-mail address**: **Mark as confirmed** for accounts that have not opened the link from the confirmation e-mail yet.
- **Changing the e-mail address** (accounts with e-mail and password, only without e-mail sending): **Change e-mail …** sets the new address right away; the person stays signed in and then signs in with it. An address that already belongs to another account is refused. The change is recorded with the old and the new address in the activity log. When the instance sends e-mail, the person changes their address themselves and confirms it by link ([Changing the e-mail address](/sign-in#e-mail-and-password)). {since=0.11.1}
- Folded under **More: …** (the line names what is inside):
  - **Own workspaces** and **Largest file** as further limits. Empty = the groups' value or the instance default {since=0.11.1}, 0 = unlimited; admins are not limited. When a value comes from a group, it says so below the field ("From group …") and below the storage bar ("from group …"). {since=0.11.1} As soon as you change one of these limits or the storage limit, the **Save limits** bar appears at the bottom.
  - **What's new after updates**: whether the person sees "New in Flowplan" once after an update – **Instance default**, **Show all**, **Only breaking changes** or **Never**; the choice shows the current value. It is the same setting the person has under **Appearance & language**: they see your choice and can change it again. With **Instance default** the account follows the setting [for new accounts](/administration#instance). {since=0.9.7}
  - **Settings level**: which settings the person sees – **Instance default**, **Beginner**, **Normal** or **Expert** ([Settings levels](/settings#settings-levels)). Here too the person can change their level at the top of Settings. {since=0.9.7}
  - **Features**: which [features](/settings#show-and-hide-features) the person has hidden – their own choice or the instance default. **Instance default** puts an own choice back on the default; only the person chooses themselves. {since=0.11.0}
  - **AI features**: if [Administration → AI](/ai#for-admins) is set to "Selected people", you allow or deny AI per person here.
  - **Two-factor sign-in** (for accounts with an authenticator app): **Reset** (e.g. for a lost phone) turns off the account's authenticator app; this is recorded in the activity log, and the person gets an e-mail if the instance sends e-mail.
  - **Sign-in methods**: whether the account has a password (or removed it), whether it signs in through LDAP and which SSO identities are connected – with issuer, address, when connected and last used. The person connects and disconnects them under **Settings → Account & security**.
  - **Merge accounts**: **Merge …** combines the account with a second account of the same person (see [Merge accounts](#merge-accounts)).
- At the end: **Block** blocks the account at once and ends all sessions; **Unblock** releases it again. **Delete account** (**Delete …**) is possible only once an account is blocked. The dialog says beforehand what happens: name, e-mail, password, passkeys, sessions and personal settings are deleted, as are workspaces where only this person was a member and their private spaces. Shared workspaces get another member as owner if needed; contributions there stay and appear as "Deleted account". Even when the account stays as an empty placeholder for that, the personal data goes: calendar connections and their syncing, CalDAV and CardDAV links, guest access, own keys for encrypted spaces, grants on single records, devices, drafts, widget and sidebar settings, the quick search's visit history, stickers and reactions. What stays is content, version history and authorship as well as tracked time (a running timer stops); share links the person created keep working. Your own account and the last admin account cannot be deleted.

How new accounts come about is described under [Adding people](#adding-people); whether people may sign up themselves is set under [Sign-in & SSO](#sign-in-sso).

### Create account

**Create account** above the table sets up an account with e-mail and password for someone else – even with sign-up closed. You enter **Name**, **E-mail address** and **Role** (**Member** or **Admin**); **Also create a workspace for this person** (on) creates a workspace of their own right away, with the [starter content](/starter-content) of new accounts, prefilled with “Ada's workspace” – you can change the name. Without it the person gets “My workspace” at the first sign-in like every new account, unless they are a member of one by then. The rules of sign-up apply: an address that already has an account (in any spelling, however it signs in) is refused, and the instance's limits apply here too. {since=0.11.1}

The account has no password yet. The person sets it with a link that is valid for **7 days** and only once, and is signed in right afterwards:

- **If the instance sends e-mail**, the person gets the link by e-mail (“Your Flowplan account was created”). Opening it proves they own the mailbox: the address then counts as confirmed, and invitations to it are taken over.
- **Without e-mail**, the dialog shows the link to copy (**Copy link**) – hand it to the person yourself. A link handed over proves nothing about the address: it stays **unconfirmed**, as with any sign-up without e-mail, until you confirm it in the account with **Mark as confirmed** (see [Only confirmed addresses](/workspaces-and-permissions#invite-members)).

Until the first sign-in the account shows as **Invited** in the table; in its side panel, **Resend link** makes a new link (by e-mail or to hand over), and the previous one stops working. Creating the account is recorded in the activity log (“Account created” with the address) and in the security events. With password sign-in turned off (`FLOWPLAN_LOCAL_LOGIN=false`, SSO only) there is no **Create account** – new people then come through SSO. API tokens cannot create accounts, like every Administration action.

### Merge accounts

When a person has two accounts – such as a local one and one created at their first SSO sign-in – merge them with **Merge …** under **More** in their account's side panel. Choose the other account (accounts with the same e-mail address are listed first) and, with the arrow, which one stays. The preview lists what moves before anything happens.

Everything of the account taken over moves to the one that stays: own pages and spaces, memberships of workspaces and spaces with their shares (the **higher role** stays; guest only if the person was a guest everywhere), groups, comments and reactions, mentions in comments and documents, assignments and person properties in databases, favourites, collections, sidebar, journal, notifications and their settings, webhooks, calendar and contact connections, time tracking, passkeys, SSO identities, the LDAP and SCIM link and the history in the activity and security logs. Where both accounts have the same thing (a favourite, or the sidebar of a workspace), the one of the account that stays wins.

- **Sessions** of the account taken over end; its **API tokens** are revoked (scripts need a new token of the remaining account – so no token suddenly reads another account's data).
- **Password**: if the remaining account has none, it takes over the other's; otherwise it keeps its own. A local account's admin right goes along.
- **Authenticator app**: taken over when the remaining account has none; recovery codes must then be created again.
- **End-to-end encryption**: if only the account taken over has keys, they move. If both have keys, those of the remaining account stay; encrypted spaces only the other account had must be shared again.
- Older versions of documents keep their mentions as they were.

The merge runs as one step – all or nothing –, is recorded in the activity log and as "Accounts merged" in the security log. The account taken over is deleted afterwards. Your own account can only be the one that stays.

## Limits per group {since=0.11.1}

Under **Limits & retention → Limits per group** you give the members of a group more (or less) than the [default](/administration#limits-retention): **Storage**, **Own workspaces** and **Largest file**. You choose the group under **Add a group** – the same choice as for the [AI quotas](/ai#for-admins):

- **Workspace groups**: count for their members whichever workspace the group is in. Groups filled through the [SSO mappings](/sso-oidc) too.
- **Directory groups (SCIM, LDAP, SSO)**: a group of your identity provider directly by its name – a group provisioned over [SCIM](/scim-and-ldap#user-provisioning-scim), an LDAP group or a group of the SSO sign-in. It needs neither a workspace nor a mapping and also applies to accounts with e-mail and password that the directory lists as members. Under **Directory group by name** you can also enter a group the directory has not sent yet.

Empty means: the group does not set this limit. For a person, per limit:

1. their own value (in the side panel under **Users**),
2. else the most generous value of their groups – 0 (unlimited) beats any number,
3. else the instance default.

Admins are not limited. Under **Settings → Account & security → Your limits** the person sees where a value comes from ("from group Plus"). Changes apply at once, also to the next upload; when the storage is full or a file is too large, the message names the limit ("The file is too large: you can upload files up to 10 MB.").

**Link for more storage or AI** (under **Storage and uploads**): an address people see under **Your limits** ("More storage or AI? →") – for example the page where they get more. A plain link without credentials; empty = no link.

Over SCIM: a service with a SCIM token can link an existing account with a confirmed address without creating one – `POST /Users` with `"urn:ietf:params:scim:schemas:extension:flowplan:2.0:User": {"linkExisting": true}` (no matching account: 404) – and then add it to or remove it from a group with `PATCH /Groups/…`. The account's name, address, password and state stay as they are as long as the request does not name them; an account is only deactivated with `"active": false` or `DELETE /Users/…`.

## Adding people

An account comes about in one of these ways:

- **Signing up**: with **Sign-up with email and password** on under **Sign-in & SSO**, anyone can create an account with **Create account** on the sign-in page. Without this setting, only the instance's first account and invited addresses can ([E-mail and password](/sign-in#e-mail-and-password)).
- **Invitation to a workspace**: an owner invites an e-mail address under **Settings → Members → Invite member**. The invitation creates an account for exactly this address, even if sign-ups are otherwise closed ([Invite members](/workspaces-and-permissions#invite-members)). With an [invite link for several people](/workspaces-and-permissions#invite-links-for-several-people), anyone who has it can create an account while it is valid.
- **Single sign-on**: with an OIDC provider, the account comes about at the first sign-in via **Sign in with SSO**; the admin right comes from the group at the provider. `OIDC_NEW_ACCOUNTS=false` lets in existing accounts only ([SSO with OIDC](/sso-oidc)).
- **LDAP and SCIM**: with an LDAP directory, the account comes about at the first sign-in with the directory's credentials ([Sign-in with LDAP](/scim-and-ldap#sign-in-with-ldap)); with SCIM, your identity provider creates accounts before anyone signs in, and deactivates them again ([SCIM](/scim-and-ldap#user-provisioning-scim)).

Whoever is in no workspace yet at their first sign-in gets one of their own – "My workspace", with the welcome page or the [starter content](/starter-content) you chose. New accounts with e-mail and password get no admin right – except the instance's first account; you grant it under **Users** with **Role**.

### Set up an account for someone

For a family member, say, who should get a place of their own:

::: steps

1. Create a workspace for them: the workspace's name at the top of the sidebar → **Create workspace**.
2. Invite them there under **Settings → Members → Invite member** with their e-mail address. If your instance doesn't send e-mail, copy the invitation link under **Pending invitations** with **Copy link** and send it to them yourself.
3. They open the invitation, choose a password and land in the workspace.
4. Under **Settings → Members**, give them the role **Owner**. If you don't want to be able to read their pages, leave the workspace afterwards under **Settings → General** (**Danger zone**).

:::

Or they sign up themselves: switch on sign-up with email and password for that (and off again afterwards if you like). They then get "My workspace", where they are the only member.

Afterwards you find the account under **Users**; in its side panel you can adjust **Storage limit** and **Settings level** if needed.

## What administrators can see

Admin rights manage the instance, not its content. What someone may read is decided only by membership in a workspace and the permissions in it ([How permissions work together](/workspaces-and-permissions#how-permissions-work-together)) – for admins just as for everyone else:

- In workspaces you are not a member of, you see no pages, databases or files.
- Other people's private spaces you see only when they are explicitly shared with you – not even as the workspace's owner.
- End-to-end encrypted spaces can be read only by those who were given the key – neither owners nor admins ([Encrypted spaces](/encrypted-spaces)).

About accounts and workspaces, the Administration shows only management data:

- **Users**: name, e-mail address, status, sign-in methods, sessions, storage used, when someone was last around and the names of their workspaces.
- **Workspaces**: name, owner, number of members and pages, usage and quota.
- **Activity log**: action, person, time and the ID of the resource concerned – no content.

> [!IMPORTANT]
> Whoever runs the server or downloads the whole instance under **Storage & backup** holds the database with all content – only encrypted spaces stay unreadable then. So give admin rights and access to the server only to people everyone on the instance trusts.

## Sign-in & SSO

- **Sign-up & access**: **Sign-up with email and password** (anyone may create an account; without this setting only invited addresses and the instance's first account), **Allow invite links** (default: on; off, owners can't create [invite links for several people](/workspaces-and-permissions#invite-links-for-several-people) and existing ones don't open; `FLOWPLAN_INVITE_LINKS=off` switches them off for good) {since=0.9.8}, **Everyone may create workspaces** and **Block inactive accounts** after a number of days without signing in. Blocked accounts lose their sessions and their API tokens stop working; the block appears in the activity log and can be lifted under **Users**. **Delete inactive accounts** goes one step further: after a number of days without any use (at least 60, and more than for blocking) an account is deleted – as when an admin deletes it: personal data and the workspaces and private spaces only this person belongs to go, contributions to shared workspaces stay under “Deleted account”. 14 and 3 days before, the person gets an e-mail with the date; signing in before then keeps the account. If it is already blocked, the e-mail asks them to contact the administrators – unblocking it under **Users** cancels the deletion. Without e-mail delivery set up, for admin accounts and for accounts without an e-mail address nothing is ever deleted. Under **Users**, “Deleted on …” shows where a deletion is pending; every deletion appears in the activity log.
- **Two-factor sign-in**: **Require two-factor sign-in** – not required, only for admins or for all local accounts –, plus how many local accounts already have a second factor. Accounts without an authenticator app and without a passkey set up a second factor right after signing in ([Two-factor sign-in](/sign-in#two-factor-sign-in)). SSO accounts are not affected.
- **Sessions**: how long people stay signed in – **Browser without “Stay signed in”** (hours after signing in, default 8), **Offer “Stay signed in” in the browser** (default off), **Browser with “Stay signed in”** (7, 30, 90 or 365 days without use, default 7), **Desktop and mobile apps** (default: stay signed in; or as in the browser without “Stay signed in”) and **Apps: end without use** (30, 90 or 365 days, default 90). **Default** follows the `SESSION_*` environment variables ([Configuration](/configuration)); a value chosen here takes precedence. The apps' lifetime applies only to sign-ins the app proves – the hand-off through the browser, or the password with the app's device key; the user agent alone does not count, and older app versions sign in with a password like a browser. See [Stay signed in](/sessions).
- **Single sign-on (OIDC)**: whether a provider is set up, the admin group and **Map SSO groups centrally** – provider groups get roles and groups in any workspace ([SSO groups](/sso-oidc#map-sso-groups-to-workspaces)).
- **SCIM tokens** and the **LDAP directory** with their state ([User provisioning (SCIM)](/scim-and-ldap#user-provisioning-scim), [Sign-in with LDAP](/scim-and-ldap#sign-in-with-ldap)).
- **Contacts from LDAP**: base DN, people filter, sync and **More attributes** (which LDAP attributes may be mapped beyond the default mapping, on top of `LDAP_CONTACTS_ATTRIBUTES`) for [contacts databases](/contacts#contacts-from-the-ldap-directory); changes are recorded as security events. See [Contacts from LDAP](/scim-and-ldap#contacts-from-ldap).
