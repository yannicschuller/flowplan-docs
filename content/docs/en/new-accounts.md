---
keywords: create account, create user, add user, new user, new account, adding people, registration, sign-up, invitation, family member
new: adding-people 2026-11-22
---

# New accounts

How people get an account – they sign up themselves, are invited, sign in through SSO or LDAP, are provisioned by their identity provider over SCIM, or you create the account for them.

**More on this topic:** [Managing users](/user-management) · [Account limits](/account-limits)

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

## Create account

**Create account** above the [table of users](/user-management#users) sets up an account with e-mail and password for someone else – even with sign-up closed. You enter **Name**, **E-mail address** and **Role** (**Member** or **Admin**); **Also create a workspace for this person** (on) creates a workspace of their own right away, with the [starter content](/starter-content) of new accounts, prefilled with “Ada's workspace” – you can change the name. Without it the person gets “My workspace” at the first sign-in like every new account, unless they are a member of one by then. The rules of sign-up apply: an address that already has an account (in any spelling, however it signs in) is refused, and the instance's limits apply here too. {since=0.11.1}

The account has no password yet. The person sets it with a link that is valid for **7 days** and only once, and is signed in right afterwards:

- **If the instance sends e-mail**, the person gets the link by e-mail (“Your Flowplan account was created”). Opening it proves they own the mailbox: the address then counts as confirmed, and invitations to it are taken over.
- **Without e-mail**, the dialog shows the link to copy (**Copy link**) – hand it to the person yourself. A link handed over proves nothing about the address: it stays **unconfirmed**, as with any sign-up without e-mail, until you confirm it in the account with **Mark as confirmed** (see [Only confirmed addresses](/workspaces-and-permissions#invite-members)).

Until the first sign-in the account shows as **Invited** in the table; in its side panel, **Resend link** makes a new link (by e-mail or to hand over), and the previous one stops working. Creating the account is recorded in the activity log (“Account created” with the address) and in the security events. With password sign-in turned off (`FLOWPLAN_LOCAL_LOGIN=false`, SSO only) there is no **Create account** – new people then come through SSO. API tokens cannot create accounts, like every Administration action.
