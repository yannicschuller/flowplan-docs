# Forms

A form view collects answers directly as records in the database – from members or, if enabled, from anyone with the link.

## Design a form

1. Create a view of the type **Form** in the database.
2. **Design form** opens the editor:
   - title, description and the label of the submit button,
   - questions: order, hide, **required**, help text per question,
   - question type: short or **long text**, **radio buttons** instead of a list, a **linear scale 1–10** for numbers,
   - **confirmation text** after submitting.
3. **Save form**.

Flowplan checks required fields and input types in the browser and on the server. Files properties allow uploads in the form.

## Share a form

Under **Share form**, switch the form on and copy the link.

- **Members only**: answering requires signing in; the answer carries the person's name.
- **Anonymous**: anyone with the link can answer, without an account and without a name.

Person and relation questions only exist in forms for members, because they would reveal members and records.

> [!NOTE]
> Copied or imported forms start switched off and for members only. In the demo, forms can be designed but not made public.

## Answers

Every answer is a normal record: it appears in all views and can be filtered, assigned and commented on.

## Surveys

**Turn into a survey** makes a form a survey – or create a new page from the **Survey** template. The builder has five tabs: **Questions**, **Preview**, **Settings**, **Share** and **Results**.

### Question types

- **Text**: short answer, long text, e-mail, phone, website, number, date, time
- **Choice**: single choice, multiple choice, dropdown, yes / no – optionally with “Other” and a text field, a random order and a minimum or maximum number
- **Rating**: stars (3 to 10), Net Promoter Score (0–10), a scale with labels at both ends, a slider
- **Matrix (Likert)**: several statements with the same answers
- **Ranking**: put items in order
- **File upload**
- Also **text blocks** for explanations and **page breaks** for several pages.

Pasting several lines into an answer field adds several answers at once.

### Conditions

Every question and text block can **Only show if …** an earlier answer matches. Example: “What should we improve?” only appears for a recommendation score up to 6. Hidden questions are not required, and their answers are not saved.

### Settings

- a welcome page, a progress bar for several pages, a thank-you text and an optional redirect
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

After sending, the person sees a private link to their request. If they answered an e-mail question and e-mail is set up, the link also arrives by e-mail – in their language. The page shows the status, their answers and a conversation with the team.

The team replies in the record under **Customer request**. Replies go to the person by e-mail; when they write back, the people on the record, everyone who already replied and whoever created the database get a notification. **Copy customer link** passes the link on when there is no e-mail address.

> [!NOTE]
> The link is the key: anyone who has it sees the request and can reply. Switching off the customer portal or the form stops all links from working; switching it back on restores them.
