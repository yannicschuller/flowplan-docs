---
keywords: emergency access, trusted contact, legacy, relatives, inactivity, dead man's switch, digital legacy
---

# Emergency access and inactivity message

So your family can reach your content in an emergency: trusted contacts with read access after a waiting period, and a message Flowplan sends when you haven't used it for a long time.

## Emergency access {since=0.9.6}

Under **Settings → Account & security → Emergency access** you name up to five **trusted contacts** – people with an account on this instance – each with a waiting period (1, 2, 7, 14 or 30 days) and an access length (until you end it, or 7, 30 or 90 days). The person has to accept the role.

- **Request:** In an emergency they request access under "I am a trusted contact for …". You are told right away – in Flowplan, by push, chat app and an e-mail whose link denies the request without signing in – and reminded before the waiting period ends. After a denial they can ask again after 24 hours at the earliest.
- **Grant:** Unless you deny, after the waiting period the person can read your private spaces and export them as Markdown or ZIP. They cannot change, delete or share anything or touch your settings, and they don't take over your account; only admins reset credentials.
- **Not included:** team spaces, content you only see through a workspace (the person needs their own membership for that), other people's private spaces shared with you, and journals with a PIN.
- **Encrypted spaces** are included once the person has set up encryption: your browser seals the keys for them the next time you unlock, and the server never sees them in plaintext. When the access ends, those spaces get a new key at your next visit.
- You can end an access or remove a trusted contact at any time; every step is in the activity log and the security events, and an export also notifies you.
- Admins switch the feature off under **Administration → Sign-in & SSO → Emergency access** (or with `FLOWPLAN_EMERGENCY_ACCESS=off`); granted access is suspended then.

## Inactivity message {since=0.9.6}

If you don't use Flowplan for a while, Flowplan sends a note of yours to people you choose – so your family knows how to reach your data, for example. Set it up under **Settings → Account & security → Inactivity message**, separately for each workspace you're a member of (not as a guest; up to three).

- **Period:** 30, 60, 90 (default), 180 or 365 days without use.
- **What counts as use:** any use of your account (signing in, working in the open app), or only use of this workspace. A tab that is only open in the background, and API tokens, don't count.
- **Note and recipients:** text or Markdown, up to 5000 characters, to up to ten e-mail addresses. Recipients need no account. They only get your note, from "<Your name> via Flowplan (<instance>)", with a footer explaining the e-mail – no workspace content, no links, no tracking. Don't put passwords in it.
- **Reminders:** 7, 3 and 1 day before you get a notification, a push message and an e-mail with an **I'm here** button. It works without signing in, only once and for ten days. Any sign-in or use resets the period too. Nothing is sent without a last reminder a day before.
- **Sending:** the note goes to each recipient exactly once; afterwards you're told when and to whom. As soon as you use Flowplan again, the message is switched on again.
- **With [emergency access](#emergency-access):** with **Grant emergency access to my trusted contacts at once**, your trusted contacts get read access without their waiting period when the message is sent – only those who accepted the role at least as long ago as their own waiting period.
- **Protection:** we e-mail you at once about every change of recipients or note. Setting it up works only when signed in in the browser, not with API tokens. **Preview the e-mail** shows the e-mail without sending it.

For administrators: the feature needs [e-mail delivery](/configuration-integrations#e-mail-smtp) (SMTP). It can be switched off under **Administration → Sign-in & SSO → Allow inactivity messages** (default: on); `FLOWPLAN_DEAD_MAN_SWITCH=off` switches it off for good. Every sending and every change of recipients shows in the security events. Disabled accounts still send their message; an account deleted for inactivity sends it right before the deletion.
