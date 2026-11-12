# Marketplace

In the **Flowplan Marketplace** (marketplace.flowplan.org) people share what they built in Flowplan: document and database templates, workflows, whiteboard templates, appearances and rules for automatic links. Browse it and take templates over into your instance with one click – or publish your own. The templates that come with Flowplan are there too (public domain, CC0).

Browsing and taking over need no marketplace account. To publish, you sign in there with GitHub or an e-mail link. Every submission is reviewed before it becomes public.

## What you can share

| Kind | Where in Flowplan | Who may publish | What taking it over creates |
| --- | --- | --- | --- |
| Document and database templates | Template gallery → **Your templates** | whoever created the template, owners | a template in the gallery (for the workspace, a space or only you) |
| Workflows | Head of the workflow page (**Marketplace** icon) | whoever may edit the workflow | a new workflow page – **paused, as a draft** |
| Whiteboard templates | Whiteboard → **Templates → Own templates** | whoever created the template, owners | an own whiteboard template of the workspace |
| Appearance | Settings → **Appearance** | owners | replaces the workspace's appearance (with its typefaces) |
| Automatic links | Settings → **Automatic links** | owners | the rules are added to the existing ones |

Guests never publish anything.

## Publishing

1. Choose **Publish to the marketplace …** on the template, the workflow or in the settings.
2. In the dialog, check the title, the summary (German and English), category, tags and language, and add up to **four preview pictures** (PNG, JPEG or WebP, 1 MB each at most). For documents and databases a screenshot pays off – Flowplan doesn't create one itself.
3. **Open in the marketplace**: Flowplan builds the file, opens the marketplace's submit page in a new window and hands it over there. You sign in, choose the **licence** (default CC BY 4.0, also CC0 and MIT), confirm that you hold the rights to the content and submit.
4. Or **Download as a file**: upload the `.flowplan-template` file on the submit page yourself.

What is never included: a workflow's credentials, runs and webhook addresses, the address of your instance, names of people, pictures uploaded to a whiteboard (only pictures with an https address go along) and record cards. A workflow's references to pages, databases and people are matched by name on import or stay empty. For appearances with own typefaces: only publish typefaces whose licence allows passing them on.

## Taking over

1. On a template's page in the marketplace, choose **Open in Flowplan** and enter your instance's address once (e.g. `https://flowplan.example.org`). It stays in your browser only.
2. Flowplan opens in a new window and receives the template. If you're not signed in, sign in first – the template waits in your browser meanwhile (up to 24 hours).
3. A preview shows the title, kind, author, licence and **what will be created**. For workflows you see every node, the external services it talks to, whether it uses AI steps or sends e-mail – and what you need to set in the editor after the import.
4. Choose the workspace and space (for workflows also the parent page) and **Take over**.

Workflows always arrive **paused, as a draft**. Check them, fill in what's missing and activate them yourself.

Take over a downloaded `.flowplan-template` file under **Settings → Import & export → Template from the marketplace**, or in the template gallery with **Import template**.

Flowplan checks every file again itself: size (25 MB at most), the file's structure, paths, compression and the content of each kind – just like an import from another instance.

## Privacy

- **Your instance never connects to the marketplace.** The hand-over runs in your browser between the two windows; Flowplan only sends to the configured marketplace address and only accepts something from there.
- The marketplace doesn't learn your instance's address. It only counts anonymously how often a template was downloaded or opened in Flowplan – without IP addresses and without cookies for visitors.
- When you publish, only the file you saw in the dialog goes to the marketplace.

## Switching it off

Administrators switch the marketplace off for the whole instance under **Administration → Extensions & domains → Marketplace**. Flowplan then shows no marketplace buttons and accepts no templates.

The environment works too: `FLOWPLAN_MARKETPLACE_URL=off` switches the marketplace off, another address (e.g. a marketplace of your own) replaces `https://marketplace.flowplan.org`.
