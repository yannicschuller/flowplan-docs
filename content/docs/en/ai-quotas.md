---
keywords: ai, quota, limit, tokens, cost, budget, usage, groups, exemption, workflows, remaining
---

# AI quotas

Administrators can limit how much AI is used through the [instance's provider](/ai#providers) – for the whole instance, as a default per person, for roles and groups and for single accounts, per day, week, month and year. Everyone sees how much they have left.

> [!NOTE]
> **Only the instance's provider counts.** An [own provider](/ai#for-users) with your own key and [on-device AI](/ai#on-device-ai-apple) never count and keep working when a quota is used up.

## What counts {since=0.10.2}

- **Tokens:** input and output together, as the provider reports them – otherwise Flowplan estimates them from the length of the text.
- **Or cost:** with prices per model entered under **Administration → AI → Prices** (per million tokens, input and output separately), limits can also be set as estimated cost in the instance's currency. A model without a price then does not count – administrators see a note about it.
- **Every AI feature** with the instance's provider: writing assistant, summaries, Ask AI, AI actions, AI in databases, whiteboards, handwriting, flashcards and meeting notes. [Semantic search](/ask-ai#semantic-search-optional) counts towards the whole instance's limit, not towards a person.
- **Workflows** keep their own daily budget. Whether their AI nodes count towards the whole instance's limit is a setting (default: yes); they never count towards the person a workflow runs as.
- **Not counted** is the transcription of voice notes and meetings: it runs on its own Whisper service, not through the AI provider.

The periods are calendar periods in the time zone the administrators choose: a day starts at midnight, a week on Monday (or Sunday), a month on the 1st, a year on 1 January.

## For admins {since=0.10.2}

Under **Administration → AI → Quotas**:

::: steps

1. Choose the **unit**: **Tokens** or – with prices per model – **Cost**. Changing the unit clears the limits entered.
2. Set the **time zone** and **Week starts on**.
3. **Note from** (default 80 %): from this share people see a note; for the whole instance you get a notification.
4. Switch **Workflows count towards the instance ceiling** on or off.
5. Enter the numbers per day, week, month and year under **Limits**. Empty means: no limit for that period. Several periods apply at once, for example 50,000 tokens a day and 1 million a month.

:::

The levels:

| Level | Applies to |
| --- | --- |
| **Whole instance** | Everyone together – a ceiling so the bill cannot run away. It always applies on top. |
| **Default per person** | Everyone without their own limit and without a group with a limit. |
| **Roles** | **Administrators** and **Guests** (people who only have guest access). |
| **Groups** | Workspace groups – also those filled from SSO, SCIM and LDAP groups through the [SSO group mappings](/sso-oidc#map-sso-groups-to-workspaces). |
| **Single people** | More, less or **exempt**. |

Which limit applies to a person: their own, else the **highest** of their groups and roles (per period; if one of their groups leaves a period open, there is no limit for it), else the default. **Exempt** – a person or a group – lifts the personal limits; the whole instance's limit stays.

Under **Usage and limits** you see, for the chosen period, the usage of the whole instance, per person (sortable by usage, what is left or name, with the limit and where it comes from), per group and per model. The [AI statistics](/administration#monitoring) show the instance's limit as a line.

**Notifications:** when the whole instance reaches the note share and later 100 %, every administrator gets one message per period (kind **AI quota of the instance** under **Settings → Notifications**).

## For users {since=0.10.2}

- **Settings → AI → AI quota** shows a bar per period: “1,500 of 10,000 left” and when it starts again – in tokens or, if the administrators chose cost, in money.
- **In the AI panels** (Ask AI, writing assistant, summary) a small note appears once less than 20 % is left (or what the administrators set).
- **Used up:** a request that would cross a limit is refused before it reaches the provider – with the time it works again and the alternatives: your own provider (if allowed) or on-device AI. Every AI feature shows the same message.

Scripts and AI assistants read the same with `GET /api/ai/quota` (API token with the permission **AI and transcription**, see [OpenAPI](/openapi)).

## Frequently asked questions

**How exact is the estimate beforehand?**
Before sending, Flowplan counts the length of the request and the longest answer allowed. If that no longer fits the quota, the request is refused. Afterwards it counts what the answer really used.

**Do earlier requests count?**
Counting starts with this version. It is separate from the usage statistics under Monitoring and runs even when those are switched off.

**What happens to the usage of deleted accounts?**
It stays in the whole instance's usage, without a person.
