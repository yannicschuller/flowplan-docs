---
keywords: limits, storage, storage limit, quota, group, directory group, SCIM, largest file, upload limit, own workspaces, more storage, storage & AI
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

Admins are not limited. Under [Settings → Storage & AI](#storage-ai-in-the-settings) the person sees where a value comes from ("from group Plus"). Changes apply at once, also to the next upload; when the storage is full or a file is too large, the message names the limit ("The file is too large: you can upload files up to 10 MB.").

### Storage as an add-on {since=0.11.2}

Next to a group's storage you choose **Limit** (as above) or **Additional (add-on)**. The storage of an add-on group is not compared with the other groups but added on top – for example for a purchased "+50 GB":

1. Base: the most generous storage of their groups set to **Limit**, else the instance default,
2. plus the sum of all add-on groups the person is in.

Example: "Flowplan Plus" with 25 GB (25600 MB) and "Flowplan +50 GB" as an add-on with 50 GB (51200 MB) give 75 GB; the add-on alone gives the default plus 50 GB, two add-ons are added up. If the base is unlimited (0), it stays unlimited. If the person has an **own value**, exactly that applies – add-ons are not added (the side panel under **Users** then says "group add-ons are not added"). An add-on needs at least 1 MB. **Own workspaces** and **Largest file** have no add-on: the most generous value still applies there. Under **Storage & AI** the person then sees, for example, "25 GB from group Flowplan Plus + 50 GB from group Flowplan +50 GB".

**Link for more storage or AI** (under **Storage and uploads**): an address people see under **Storage & AI** and in the notice at 80 % as the button **More storage or AI?** – for example the page where they get more. A plain link without credentials; empty = no link.

### Members by hand {since=0.11.4}

You can also change who is in a directory group in Flowplan – for example to give someone a plan by hand:

- **Per person:** in their side panel under [Users](/user-management#users), section **Directory groups**. It lists all of the person's groups; **Add to group** puts them into an existing or new group, **Remove** takes them out.
- **Per group:** for a directory group under **Limits per group** or in the [AI quotas](/ai-quotas), via **Members** – with **Add a person**.

Members added by hand are marked "by hand" and apply in addition to those from the directory: an LDAP sync, the next SSO sign-in or a SCIM client sending the members again does not remove them. Members from LDAP or the SSO sign-in you keep changing there. For a SCIM group, SCIM clients only see the members added by hand that they provisioned themselves.

## Storage & AI in the settings {since=0.11.3}

Everyone sees everything in one place under **Settings → Storage & AI** (the first tile under **Personal**, at every [settings level](/settings#settings-levels)). The tile already shows two bars – say "4.2 of 25 GB" storage and "340 of 1,000 tokens this month" AI – and where the storage comes from ("Flowplan Plus", "Default"). "unlimited" means no limit; "AI off": AI is switched off for you; without AI on the instance there is no AI bar.

The page shows:

- **Storage**: used and limit with a bar and where it comes from ("from group Flowplan Plus", with add-ons "25 GB from group Flowplan Plus + 50 GB from group Flowplan +50 GB"), **By workspace** (when your files lie in several), **Largest upload** and **Own workspaces** ("1 of 3").
- **AI quota**: per period what is left and when it starts again, and what happens afterwards – "After that, AI goes on with …." or "After that, AI is off – until …". The whole instance's limit only appears when it is nearly reached. Plus **Your AI models** (the instance's model, one set for you or your own provider's). See [AI quotas](/ai-quotas#for-users).
- **More storage or AI?** as a button when the administrators entered a [link](#storage-as-an-add-on).

**Notice at 80 %:** when your storage or your personal AI quota reaches 80 % (for AI the administrators' note share) and once more at 100 %, a calm notice appears at the top with **View storage & AI** and, if set, **More storage or AI?**. Once closed it stays closed on this device – for storage until the usage drops below the threshold and rises again, for AI until the next period.

Old links to **Account & security → Your limits** and **AI → AI quota** lead to the new page.

Over SCIM: a service with a SCIM token can link an existing account with a confirmed address without creating one – `POST /Users` with `"urn:ietf:params:scim:schemas:extension:flowplan:2.0:User": {"linkExisting": true}` (no matching account: 404) – and then add it to or remove it from a group with `PATCH /Groups/…`. The account's name, address, password and state stay as they are as long as the request does not name them; an account is only deactivated with `"active": false` or `DELETE /Users/…`.

## Export / import {since=0.11.3}

Under **Limits & retention → Export / import** you set everything for the plans in one go – limits per group, AI quotas, AI models and the defaults – with one JSON file. It is the same format as the billing service's plan import: each side reads its fields and skips the other's (prices, names, descriptions, order, `_ids` …). **AI → Quotas** links here.

- **Export** downloads the current settings as a file and shows them in the text field. What cannot be represented (rules for roles or single people, exempt groups, limits for other periods) is listed under `_skipped`. When the quotas count in tokens, the export writes the limits as `aiTokens` and `defaultTokens`, otherwise as `aiActions` and `defaultActions`.
- **Open file** or paste, then **Check**: the whole file is checked without saving anything. Errors show with their place in the file ("plans[1].aiAfter: the instance does not know the model “gpt-9” – allowed: …"), otherwise every change in words ("Group Flowplan Plus: storage 2,000 MB → 25,600 MB", "AI rule for Flowplan Pro: new, 5,000 actions (100.00 USD) a month, then claude-haiku-4-5").
- **Apply** saves all changes at once after a confirmation – all or none. Each one is in the activity log. The same file again gives "No changes".

What is not in the file stays as it is; a missing field changes nothing, `null` removes the value. With `"removeMissing": true` (under `flowplan`) directory groups that are not in the file lose their limits, AI rules and AI models.

Each entry under `plans` is a [directory group](#limits-per-group) named by `group`:

- `storageMb` – storage; with `"kind": "addon"` as an [add-on](#storage-as-an-add-on), otherwise as a limit (0 = unlimited). `uploadMb` – largest file (add-ons: none; 0 = not set by the group; above 10240 MB (10 GB) it is capped at 10240 MB with a note {since=0.11.3}). `workspaces` – own workspaces.
- `aiTokens` – the group's [AI limit](/ai-quotas) in tokens per period, without a conversion; this is how the billing service writes it. Only when the quotas count in tokens (`"unit": "tokens"`); when they count in cost, `aiTokens` alone is an error that tells you to set the unit to `tokens` or to give the limit as cost. {since=0.11.3}
- `aiActions` – the same limit in actions per period, as in older files, converted into the quotas' unit: `tokensPerAction` (default 5,000 tokens) or `costPerAction` (default 0.02 in the prices' currency). With both, `aiTokens` applies for tokens and `aiActions` for cost – **Check** says so. `aiAfter` – "Afterwards": `"off"` (AI off), `"haiku"`, `"sonnet"`, `"opus"` (the instance's model of that family) or a model ID of the instance. `aiAfterTokens` – how many tokens per period may go with that model afterwards ([at most … for afterwards](/ai-quotas)); `null` = unlimited, only with `"unit": "tokens"`. {since=0.11.3} Add-ons only get an AI rule with `aiTokens` or `aiActions` above 0.
- `aiModels` – the group's [AI model](/ai-quotas): `"haiku"` or `"sonnet"` (the model of that family), `"all"` (the most capable: Opus, else Sonnet, else Haiku); or exactly one model with `aiModel`. If the instance knows none, that is an error listing the allowed models.

Under `flowplan`: `defaults` (storage per person, largest file, own workspaces), `moreLimitsUrl` (the [link for more storage or AI](#storage-as-an-add-on)), `aiQuota` with `period` (`day`, `week`, `month` – the default –, `year`), `unit` (`tokens` or `cost`; another unit clears the numbers of the other rules), `defaultTokens` or `defaultActions` (like `aiTokens` and `aiActions`) and `defaultAfter` with `defaultAfterTokens` (the default per person) and the whole instance's ceiling: `instanceCapUsd` (cost in USD), `instanceCap` (cost in the prices' currency) or `instanceCapTokens`. `groups` lists further groups with the same fields – also a workspace group as `"workspaceGroup": { "workspace": "…", "group": "…" }`.

```json
{
  "version": 1,
  "plans": [
    {
      "group": "Flowplan Plus",
      "kind": "plan",
      "storageMb": 25600,
      "uploadMb": 1024,
      "aiTokens": 5000000,
      "aiModels": "sonnet",
      "aiAfter": "haiku"
    },
    {
      "group": "Flowplan Pro",
      "kind": "plan",
      "storageMb": 102400,
      "uploadMb": 1024,
      "workspaces": 50,
      "aiTokens": 25000000,
      "aiModels": "all",
      "aiAfter": "haiku",
      "aiAfterTokens": 20000000
    },
    {
      "group": "Flowplan +50 GB",
      "kind": "addon",
      "storageMb": 51200
    }
  ],
  "flowplan": {
    "defaults": { "storageMb": 500, "uploadMb": 10 },
    "aiQuota": {
      "period": "month",
      "unit": "tokens",
      "defaultTokens": 150000,
      "defaultAfter": "off",
      "instanceCapTokens": 1000000000
    },
    "moreLimitsUrl": "https://billing.example.org/preise",
    "removeMissing": false,
    "groups": [
      { "workspaceGroup": { "workspace": "Agentur", "group": "Design" }, "storageMb": 3000 }
    ]
  }
}
```
