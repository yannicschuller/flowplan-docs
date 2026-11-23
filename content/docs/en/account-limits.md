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

### Storage as an add-on {since=0.11.2}

Next to a group's storage you choose **Limit** (as above) or **Additional (add-on)**. The storage of an add-on group is not compared with the other groups but added on top – for example for a purchased "+50 GB":

1. Base: the most generous storage of their groups set to **Limit**, else the instance default,
2. plus the sum of all add-on groups the person is in.

Example: "Flowplan Plus" with 25 GB (25600 MB) and "Flowplan +50 GB" as an add-on with 50 GB (51200 MB) give 75 GB; the add-on alone gives the default plus 50 GB, two add-ons are added up. If the base is unlimited (0), it stays unlimited. If the person has an **own value**, exactly that applies – add-ons are not added (the side panel under **Users** then says "group add-ons are not added"). An add-on needs at least 1 MB. **Own workspaces** and **Largest file** have no add-on: the most generous value still applies there. Under **Your limits** the person then sees, for example, "25 GB from group Flowplan Plus + 50 GB from group Flowplan +50 GB".

**Link for more storage or AI** (under **Storage and uploads**): an address people see under **Your limits** ("More storage or AI? →") – for example the page where they get more. A plain link without credentials; empty = no link.

Over SCIM: a service with a SCIM token can link an existing account with a confirmed address without creating one – `POST /Users` with `"urn:ietf:params:scim:schemas:extension:flowplan:2.0:User": {"linkExisting": true}` (no matching account: 404) – and then add it to or remove it from a group with `PATCH /Groups/…`. The account's name, address, password and state stay as they are as long as the request does not name them; an account is only deactivated with `"active": false` or `DELETE /Users/…`.
