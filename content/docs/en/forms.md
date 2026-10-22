# Forms

A form view collects answers directly as records in the database – from members or, if enabled, from anyone with the link.

## Design a form

1. Create a view of the type **Form** in the database.
2. **Design form** opens the editor:
   - title, description and the label of the submit button,
   - questions: order, hide, **required**, help text per question,
   - question type: short or **long text**, **radio buttons** instead of a list, a **linear scale 1–10** for numbers,
   - **Only show if …** per question (see [Conditions and pages](#conditions-and-pages)),
   - **Text block before**, **Text block at the end** and **New page from here** for explanations and several pages,
   - **title after submitting** and **confirmation text**,
   - what happens **after sending** (see [Settings](#settings)).
3. **Save form**.

Flowplan checks required fields and input types in the browser and on the server. Files properties allow uploads in the form.

### Conditions and pages

Every question, text block and page break can **Only show if …** an earlier answer matches – for example “Kind **is** Bug”, “Topics **includes** Billing”, “Subject **contains the text** invoice”, “Importance **is greater than** 7” or “E-mail **is answered**”. A hidden page break hides its whole page.

- Hidden questions are not required, and their answers are not saved – not even when they are sent anyway. The server checks the same rules as the browser.
- A question that depends on a hidden question stays hidden as well.
- With several pages a **progress bar** shows how far along you are (can be switched off); **Back** and **Next** change the page, and required questions are checked per page.

### Settings

Under **After sending**, **Confirmation by e-mail** and **Notify the team** – in the form editor as well as in a survey's settings:

- **Then redirect to**: an address with `https://` that the thank-you page leads to after a few seconds (0–60, default 3).
- **Placeholders**: `{Name of the question}` inserts the answer to that question – in the title and text after submitting, in the redirect (there only after the domain name, e.g. `https://example.com/thanks?name={Name}`) and in the e-mail. Unknown names stay as they are; people, relations and files are not inserted.
- **Confirmation by e-mail to the people answering**: subject and text are up to you. The e-mail contains the text and the answered questions as a list – without hidden and internal properties – and, with the [customer portal](#customer-portal), the link to the request (then only this one e-mail is sent). It goes to the first answered e-mail question; in forms that are not anonymous, otherwise to the signed-in account's address. Anonymous forms only write when the person types their address. E-mail must be set up ([Configuration](/en/configuration)); at most 5 e-mails per hour go to an address, 10 per sender and 300 per form.
- **Notify the team**: the chosen members get a notification of the kind “Guest comments and guest records” for each new answer – if they may see the record.

### Continue later

In forms and surveys that are not anonymous, **Save and continue later** keeps your answers so far as a draft for you (without files). When you open the link again, you continue on the same page; after sending, the draft is gone. Drafts unchanged for half a year are deleted.

## Share a form

Under **Share form**, switch the form on and copy the link.

- **Members only**: answering requires signing in; the answer carries the person's name.
- **Anonymous**: anyone with the link can answer, without an account and without a name. Files from anonymous answers count against a daily budget: 200 MB per form and `FLOWPLAN_ANONYMOUS_UPLOAD_MB` for the whole instance ([Configuration](/en/configuration)); each form also accepts at most 1000 answers per hour.

Person and relation questions only exist in forms for members, because they would reveal members and records.

> [!NOTE]
> Copied or imported forms start switched off and for members only. In the demo, forms can be designed but not made public, and confirmation e-mails cannot be switched on.

## Answers

Every answer is a normal record: it appears in all views and can be filtered, assigned and commented on.

## Surveys

**Turn into a survey** makes a form a survey – or create a new page from the **Survey** template. The builder has five tabs: **Questions**, **Preview**, **Settings**, **Share** and **Results**.

On the left is the flow with numbered questions, text blocks and page breaks; on the right you edit the selected item. **Add question** shows the question types grouped into choice, rating, and text and details. Everything is **saved automatically** shortly after you stop typing – the dot at the top right shows the state. If something is still missing (a question without text, an empty answer, a redirect without `https://`), saving waits and says why.

### Question types

Surveys have {{facts.questionTypes}} question types:

- **Text**: short answer, long text, e-mail, phone, website, number, date, time
- **Choice**: single choice, multiple choice, dropdown, yes / no – optionally with “Other” and a text field, a random order and a minimum or maximum number
- **Rating**: stars (3 to 10), Net Promoter Score (0–10), a scale with labels at both ends, a slider
- **Matrix (Likert)**: several statements with the same answers
- **Ranking**: put items in order
- **File upload**
- Also **text blocks** for explanations and **page breaks** for several pages.

Pasting several lines into an answer field adds several answers at once.

### Conditions

Every question, text block and page break can **Only show if …** an earlier answer matches – with the same comparisons as in [forms](#conditions-and-pages). Example: “What should we improve?” only appears for a recommendation score up to 6. Hidden questions are not required, and their answers are not saved.

### Survey settings

- a welcome page, a progress bar for several pages, a thank-you text with placeholders
- redirect, confirmation e-mail and team notification as for [forms](#settings)
- **Closes on** and **At most this many answers** – after that the survey takes no more answers
- **One answer per person** – signed-in people by their account, anonymous ones by their connection
- an accent colour

### Sharing and results

**Share** opens the survey. It can be public, so anyone with the link can take part, and anonymous, so without signing in and without names.

Every answer is a record of the database. Each question is a property, a matrix one property per row. So you can filter and sort answers, export them as CSV and process them with automations.

**Results** shows:
- the answers per day,
- per question the count and share of every answer,
- averages, minimum and maximum,
- the NPS score with promoters, passives and detractors,
- matrix tables, the average places of rankings and the latest text answers.

> [!NOTE]
> Renaming a question keeps its answers. Changing the type so that the stored kind changes (e.g. from text to number) creates a new property – earlier answers stay in the old one.

## Customer portal

The customer portal turns a form into a service desk: whoever sends it can follow their request afterwards.

1. Under **Share form**, switch on the **customer portal**.
2. Choose which properties are visible in the portal – for example **Status** or a due date. A select property named “Status” is preselected when you switch it on. People, relations and files always stay internal.

After sending, the person sees a private link to their request. If they answered an e-mail question and e-mail is set up, the link also arrives by e-mail – in their language; with the confirmation e-mail switched on, it is part of that one e-mail. The page shows the status, their answers and a conversation with the team.

The team replies in the record under **Customer request**. Replies go to the person by e-mail; when they write back, the people on the record, everyone who already replied and whoever created the database get a notification. **Copy customer link** passes the link on when there is no e-mail address.

> [!NOTE]
> The link is the key: anyone who has it sees the request and can reply. Switching off the customer portal or the form stops all links from working; switching it back on restores them.
