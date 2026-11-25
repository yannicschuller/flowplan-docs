---
keywords: starter content, onboarding, new accounts, templates, welcome page, default pages, admin
---

# Starter content for new accounts

New accounts get the page **Welcome to Flowplan** and two examples (a product roadmap and a team handbook) in their personal workspace. Instead of the examples you can hand out your own starter pages – an introduction, guidelines or an onboarding checklist, say:

## Setting the starter content {since=0.11.0}

1. Create a space in one of your workspaces, e.g. "Onboarding", and fill it with the pages everyone should get.
2. Choose it under **Settings → Instance → Instance → Starter content for new accounts → Space**. You can choose the spaces you can read; end-to-end encrypted spaces are not offered.
3. **Keep the built-in welcome page** (default: on) puts "Welcome to Flowplan" before the space's pages; off, new accounts get only the space's pages.

## What is copied {since=0.11.0}

Every account whose personal workspace is created afterwards gets a copy of the space's pages – on the first sign-in with e-mail and password as well as through [SSO](/sso-oidc), [LDAP or SCIM](/scim-and-ldap). The copy works like duplicating a page: sub-pages in their order, databases with their records, fields, views and templates, whiteboards, dashboards, notebooks, workflows (as drafts) and uploaded files and images, which belong to the new account. Links between the pages point to the copies. Comments, versions, shares and public links, permissions and who is on a page right now are not copied, and neither are pages in the trash.

The pages are copied as you can read them – what is hidden from you reaches nobody else either. Changes to the space only reach accounts created afterwards; existing accounts and their workspaces stay as they are. Accounts that join a workspace straight away through an [SSO group](/sso-oidc) get no personal workspace and so no starter content. Demo guests keep getting their own example pages.

If the chosen space no longer exists (deleted or in the trash), the person who chose it can no longer read it, or the copy fails, the account is still created – with the built-in welcome page and examples. The server log gives the reason, and a notice shows under **Starter content for new accounts**. **None – built-in welcome page and examples** goes back to the built-in pages. Every change of the space is recorded in the [activity log](/administration#activity-log).
