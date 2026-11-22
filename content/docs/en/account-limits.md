---
keywords: limits, storage, storage limit, quota, group, directory group, SCIM, largest file, upload limit, own workspaces, more storage
---

# Account limits

How much storage someone gets, how many workspaces they may own and how large a file they may upload – as the instance default, for the members of a group or for a single person.

**More on this topic:** [Managing users](/user-management) · [AI quotas](/ai-quotas)

You set the default under **Administration → Limits & retention** ([Limits & retention](/administration#limits-retention)), a person's own values in their side panel under [Users](/user-management#users): **Storage limit** and, under **More**, **Own workspaces** and **Largest file**. How much AI someone may use is set by the [AI quotas](/ai-quotas) – with the same choice of groups.

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
