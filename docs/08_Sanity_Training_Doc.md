# 08 — Sanity Studio Training

**Client:** Beercade Australia
**Owner:** Roger Robertson
**Authors:** John Willsdon (consultant) with Roger
**Version:** v1.0
**Date:** Sat 23 May 2026
**Audience:** Roger + two manager-shift staff
**Studio URL:** `https://beercade.com.au/studio` (or local dev: `http://localhost:3000/studio`)
**Status:** Draft for Roger review

---

## 1. What this is

The training doc for the back-end of beercade.com.au. The website is built in Next.js. The team-facing content is managed in a tool called Sanity — opening hours, machine list, events, function packages, what's-on, testimonials, the homepage panels. This doc covers everything the team needs to do without calling the consultant.

It does not cover the developer side of the site (code changes, schema changes, deployment). That stays with John for now. Schema or layout changes in Year 1 are scoped, costed, and scheduled like any other website work.

If something in this doc doesn't match what the team sees on screen, message John before improvising.

## 2. What Sanity actually is

Sanity is a content management system. The team uses the "studio" — a private admin app at `/studio` on the Beercade website — to edit content. Edits go into Sanity's database, then the public website pulls the latest content the next time someone loads a page.

Two things to internalise before touching anything:

1. **Edits are live the moment you click Publish.** There is no separate "push to production" step. If you change opening hours and publish, the website shows the new hours within 60 seconds.

2. **Draft mode exists.** You can save changes without publishing them. Save = stored, only visible to the team in the studio. Publish = live on the site. If you are unsure, save as draft, message Roger or John, then publish once confirmed.

## 3. Access and accounts

### 3.1 Who has access

| Person | Role | What they can do |
|---|---|---|
| Roger | Administrator | Everything, including inviting new users |
| Manager-shift staff 1 | Editor | All content edits and publishing |
| Manager-shift staff 2 | Editor | All content edits and publishing |
| John (consultant) | Administrator | Everything, including schema changes |
| Future staff | Editor (default) or Viewer (training) | Configurable per person |

A "Viewer" role exists for trainees — they can see everything in the studio but cannot save or publish. Use Viewer for the first two weeks of any new Editor's onboarding, then promote them to Editor.

### 3.2 Logging in

1. Go to `https://beercade.com.au/studio`.
2. Log in with the Google account associated with your `@beercade.com.au` email. Sanity authenticates via Google Workspace.
3. First-time login: Roger or John approves the account from the Sanity admin panel before access is granted.

### 3.3 Adding or removing users

Done by Roger only.

1. In the studio, click the user icon top-right, then "Manage users" (opens the Sanity admin web app in a new tab).
2. Click "Invite member", enter the new staff member's `@beercade.com.au` email, select role (Editor or Viewer).
3. The invitee gets an email. They click the link, sign in with Google, and access is provisioned.

To remove a user (e.g. staff member leaves): same admin web app, find the user, click "Remove from project". Take this seriously. Departing staff get removed within 24 hours of their last shift.

## 4. The schemas — what each one controls on the site

A schema is just a category of content. Each schema is a section in the left sidebar of the studio. Eight schemas:

| Schema | Controls | Edited how often |
|---|---|---|
| Opening Hours | The opening hours block on every page footer + the /visit page | When hours change |
| Machine | The full machine list on /machines and the rotating "now playing" widget on the homepage | When a machine is added, removed, or down for service |
| Event | One-off events on the /events page (league nights, EOFY, function showcases) | When a new event is added or one is updated |
| Function Package | The three tiers + any seasonal packages on the /functions page | Rarely. Locked changes only via Roger |
| What's On | The rotating banner at the top of the homepage | Weekly |
| Testimonial | Customer quotes on the /functions page and the homepage | When a new one is captured |
| Homepage | The featured machine, the featured event, the hero copy | Weekly or as needed |
| Function Enquiry | Submitted enquiries from the website form. Read-only for editors | Whenever an enquiry comes in |

Schema-by-schema walkthroughs in section 6.

## 5. The studio interface — what you're looking at

When you log in, the screen has three parts.

**Left sidebar.** The list of schemas. Click one to see all the documents inside it (e.g. click "Machine" to see all eight machines listed).

**Middle column.** The list view for whichever schema you clicked. Each row is a document. Click a row to edit it.

**Right column.** The edit form for whichever document you opened. Save and Publish buttons are at the top right of this column.

Three buttons across the top of the edit form, always in the same place:

- **Save** — saves changes as a draft. Not visible on the public site. Visible to other editors in the studio.
- **Publish** — pushes the current state of the document live to the website.
- **Discard changes** — throws away unsaved edits. Asks for confirmation. Cannot be undone.

There is also a version history panel (clock icon, top right of the edit form). Every save and publish creates a version. You can scroll back through history and restore any previous version with one click. This is the safety net. If a publish goes wrong, the previous version is one click away.

## 6. Common tasks

Each task below is the canonical procedure. Following the steps in order means nothing goes wrong. Improvising means we end up with the website showing a typo on the homepage at 9 pm on a Friday.

### 6.1 Update opening hours

**When:** hours changing for a public holiday, a one-off late close, or a permanent change.

1. In the left sidebar, click "Opening Hours".
2. Click the single "Opening Hours" document in the middle column.
3. The form shows seven days (Mon-Sun) and an exceptions list.
4. To update standard hours: change the open / close times for the relevant day. Times are in 24-hour format (e.g. `17:00`, `23:30`).
5. To add a one-off exception: scroll to the Exceptions section, click "Add item", enter the date (e.g. `2026-12-25`), set whether the venue is open or closed, and (if open) the special hours.
6. Save.
7. Read what you saved out loud. If it sounds right, click Publish.

**Common mistake:** entering `5:00 PM` instead of `17:00`. The studio will let you, but the website will display nothing. Always 24-hour.

**The "closed" toggle:** there is a "Temporarily closed" toggle at the top of this schema. Flipping it on shows a banner on every page. Use this for unscheduled closures (e.g. power outage, sick staff). Flip it off when you reopen. The text shown on the banner is configurable.

### 6.2 Add a new machine

**When:** a new machine arrives or replaces one in the lineup.

1. Left sidebar, click "Machine".
2. Top of the middle column, click "Create new".
3. Fill the form:
   - **Name:** the official machine name (e.g. "Funhouse", "Galaga"). This is what shows on /machines and in tournament announcements.
   - **Manufacturer:** Williams, Bally, Stern, Sega, Atari, etc.
   - **Year:** original release year.
   - **Type:** Pinball or Arcade. Drop-down.
   - **Status:** Available, In Service, Down for Repair. Drop-down. If a machine is "Down for Repair", it shows greyed out on /machines with the date last updated.
   - **Description:** 2-3 sentences. Voice rules from `05_Staff_Content_Guidelines.md` section 7. Avoid the banned word list.
   - **Image:** upload one or more photos. Alt text required (see section 7).
   - **Slug:** auto-generated from the name. Don't change it unless the auto-slug is wrong.
4. Save. Look at the preview pane (right side of the form) to check it renders correctly.
5. Publish.

**To edit an existing machine:** click the machine in the list, change fields, save, publish.

**To remove a machine:** open it, click the three-dot menu in the top right of the form, choose "Delete". You will be asked to confirm. The machine disappears from /machines on the next page load. If the machine is referenced by an active event (e.g. it's in the tournament pool), the studio will warn you. Don't delete machines that are referenced live — set their status to "In Service" instead and remove them from the tournament pool first.

### 6.3 Create a new event

**When:** any one-off event — league night, EOFY, a guest DJ, a special tournament.

1. Left sidebar, click "Event".
2. Click "Create new".
3. Fill the form:
   - **Title:** what the event is called (e.g. "Beercade League — Week 1").
   - **Date and start time:** the actual start of the event, not when doors open.
   - **Doors open:** if different from the start time.
   - **End time:** when the event ends (not when the venue closes).
   - **Type:** Tournament, Function, Guest, Other. Drop-down.
   - **Short description:** 1-2 sentences for the events list page.
   - **Long description:** longer copy for the event's individual page. Markdown supported.
   - **Image:** one hero image with alt text.
   - **Linked machines:** if relevant (e.g. the four machines in tournament rotation that night), select from the machine list.
   - **Booking link:** internal route (e.g. `/league`) or external link.
   - **Visibility:** Public (shows on /events) or Hidden (only direct-link access).
4. Save. Look at the preview.
5. Publish.

**To duplicate an event:** open the source event, three-dot menu, "Duplicate". Use this for recurring events like weekly league nights — duplicate the previous week's event, change the date and the round-specific details, publish.

### 6.4 Update a function package

**Locked workflow.** Function packages affect pricing and customer expectations. Changes to packages go through Roger first, not edited live by manager-shift staff.

The procedure for staff:

1. If a function package needs updating (pricing change, inclusion change, new package added), draft the change in the studio and **save as draft only — do not publish**.
2. Message Roger with: "I've drafted a change to [package name]. Can you review before I publish?"
3. Roger reviews in the studio. If approved, Roger publishes (or instructs the staff member to publish).
4. If the change has any price impact, Roger also updates the corresponding line on the /functions page copy.

For Roger:

Same procedure as section 6.2 (machine), applied to the Function Package schema. Fields include tier name, price per head, minimum guests, maximum guests, inclusions list, duration, terms.

### 6.5 Update what's on (homepage banner)

**When:** weekly. The rolling "this week at Beercade" banner on the homepage.

1. Left sidebar, click "What's On".
2. There's a single What's On document. Open it.
3. Three to five "this week" items configurable. Each has:
   - **Headline:** short (max 60 characters). Voice rules apply.
   - **Sub-line:** optional, 80 characters max.
   - **Link:** internal route or external URL.
   - **Active from / active until:** date range. The item shows on the banner only inside this window.
4. To rotate items: deactivate last week's, activate this week's. Save. Publish.

**Common mistake:** forgetting to update active-until dates. Items stay live until the date passes; if you set the wrong date, last week's headline keeps showing. Cross-check after every Monday update.

### 6.6 Add a testimonial

**When:** a customer writes something genuinely good and gives us permission to use it.

**Permission first.** Don't add a testimonial without an explicit yes from the customer. A casual "yeah you can use that" in a DM is enough — screenshot it and file in `02 Marketing / Testimonials / Permission_Screenshots`.

1. Left sidebar, click "Testimonial".
2. Click "Create new".
3. Fields:
   - **Quote:** the exact wording. Don't rewrite. Tidy obvious typos only.
   - **Attribution:** name + role + company, OR "Jess, regular" — whatever the customer is comfortable with. If they want to be anonymous, use a first-name-only or a relevant role descriptor.
   - **Date captured:** the date the customer gave permission.
   - **Source:** where the quote came from (DM, post-event email, in-person).
   - **Use cases:** check the boxes for where the testimonial can appear (homepage, /functions page, social).
4. Save. Publish.

### 6.7 Update the homepage

**Featured machine and featured event.** The homepage has two slots that change frequently — a featured machine and a featured event.

1. Left sidebar, click "Homepage".
2. Open the single Homepage document.
3. Featured Machine: drop-down listing all Available machines from the Machine schema. Pick one.
4. Featured Event: drop-down listing all Visibility=Public events with a future date. Pick one.
5. Hero copy (the headline above the fold): editable text field, 80 characters max.
6. Save. Preview. Publish.

The "featured" selections are visual real estate. Don't leave a stale event in the featured slot once it's passed — the homepage will look like nobody is paying attention.

### 6.8 Function enquiries — read only

The Function Enquiry schema is read-only for editors. Enquiries arrive in the studio when the public website form is submitted (per `02_Website_Build_Spec.md` section 8). The studio is where the team views the enquiry archive.

To view enquiries:

1. Left sidebar, click "Function Enquiry".
2. List view shows all enquiries, newest first.
3. Click one to see the full submission: name, email, phone, date requested, guests, package interest, notes.
4. The "Status" field is editable — values: New, Acknowledged, Confirmed, Lost, Completed. Update as the booking progresses.

The team works the live enquiries from the `functions@beercade.com.au` group inbox primarily, with the studio as the searchable archive. Don't rely on the studio for live triage; rely on the inbox.

## 7. Images and alt text

Every image upload in Sanity requires alt text. This is a hard schema rule — the studio will not let you save without filling it.

### What alt text is

A short text description of what the image shows, for people who can't see the image (screen readers) and for when an image fails to load. Not a caption. Not marketing copy. A description.

### What good alt text looks like

| Image | Good alt text | Bad alt text |
|---|---|---|
| Photo of a Funhouse pinball playfield | "Funhouse pinball playfield with the Rudy face mid-game" | "Pinball" or "Cool shot" |
| Wide of the bar at peak | "Beercade bar at evening peak, neon signs lit, customers seated" | "The vibe" |
| Close-up of a tap pour | "West Coast IPA being poured into a pint glass at the bar" | "Beer" |

Rules: 4-120 characters. Describes what's actually in the image. No banned words from the content guidelines list.

### What if alt text feels stupid to write

Write it anyway. Alt text is also indexed by Google and other search engines, so it doubles as SEO. Empty alt text is a missed signal on every front.

## 8. The publish flow

A safe publish always goes:

```
1. Open the document.
2. Make the edit.
3. SAVE first. Take a breath.
4. Look at the preview pane (right side of the form, where available).
5. If it looks right, click PUBLISH.
6. Open beercade.com.au in a separate tab.
7. Refresh the relevant page.
8. Confirm the change is live and looks correct.
```

The refresh-and-confirm step is the one people skip. Skipping it is how a typo in the opening hours stays live for two days.

### Preview mode

For some schemas (Event, Machine, Function Package), the studio has a "Preview" link in the edit form that opens a draft preview of the public page with your saved-but-unpublished changes baked in. Use it. It's the only way to see exactly how the change will look without publishing.

## 9. Common mistakes (a checklist before any publish)

Read this list before clicking Publish on anything that's customer-facing. Six items.

1. **Typo check.** Read the text out loud. Typos are 3x more likely to be caught reading aloud than scanning.
2. **Australian English.** colour, favourite, organisation, no z's. Easy to slip into US English when copy-pasting from elsewhere.
3. **Times in 24-hour format.** `17:00`, not `5pm`.
4. **Dates in correct format.** `25 June 2026`, not `June 25th` or `25/6/26`.
5. **Image has alt text.** Mandatory. Studio will block save without it.
6. **Banned words check.** Section 7.2 of `05_Staff_Content_Guidelines.md`. Especially: vibes, iconic, experience, journey, space.

If you can't tick all six, save as draft and come back to it later. Don't publish under pressure.

## 10. What NOT to do

Hard rules. Same energy as the don't-post list in `05_Staff_Content_Guidelines.md`.

- **Don't publish on a Friday after 6 pm.** Saturday morning fixes are painful and Friday-night publishes are when mistakes happen. If something can't wait, save it as a draft and Roger or John publishes Saturday morning.
- **Don't delete documents you didn't create.** If something looks wrong, set status to hidden or message Roger. Deletion is permanent and often references break elsewhere.
- **Don't paste rich text from Word or Google Docs.** It brings hidden formatting that breaks the website's typography. Always paste as plain text (`Cmd+Shift+V` on Mac).
- **Don't upload images straight from a phone without checking file size.** Anything over 5 MB needs to be resized in Photos or Canva first. Big files slow the website.
- **Don't edit the same document at the same time as someone else.** Sanity supports multi-user editing but conflicts are silent and confusing. Check the right sidebar of the edit form to see who else is in the document.
- **Don't change schema fields, types, or structure.** Those changes live in the developer side. If a new field is needed (e.g. "What if we want to add a beer list schema?"), message John.
- **Don't share studio access with non-staff.** Every editor account is named and logged. No shared logins.

## 11. Troubleshooting

| Symptom | First thing to try |
|---|---|
| "I clicked Publish but the website still shows the old version" | Hard refresh (`Cmd+Shift+R` on Mac, `Ctrl+F5` on Windows). The browser cache is usually the culprit. |
| "The studio won't let me save" | Check for a red error message in the form. Usually a missing required field (often alt text on an image). |
| "I can't log in" | Confirm you're using your `@beercade.com.au` Google account. Personal Gmail accounts don't have access. |
| "I published the wrong version" | Click the version history icon (clock, top right of the form), find the previous version, click "Restore". |
| "The image I uploaded looks blurry" | The source file was too small. Re-export from the original at 1920px wide minimum and re-upload. |
| "Something has clearly broken on the live site" | Don't try to fix it. Message John immediately with: a screenshot, the URL, and the time it happened. Roll back via version history if it was a Sanity-triggered issue. |

If a symptom isn't on this list, message John before publishing anything new. Don't pile fixes on top of a problem.

## 12. Approval workflow — what needs Roger before publishing

| Change | Who can publish directly |
|---|---|
| Opening hours (standard or exceptions) | Any editor |
| Machine status (Available, In Service, Down for Repair) | Any editor |
| New machine, edits to existing machine description | Any editor |
| New event (league night, weekly recurring) | Any editor |
| One-off event (EOFY, guest DJ, special tournament) | Any editor, with notice to Roger |
| Function package — pricing change | Roger only |
| Function package — inclusions change | Roger only |
| New function package | Roger only |
| Testimonial (with documented permission) | Any editor |
| Homepage featured items | Any editor |
| What's On banner | Any editor |
| Hero copy on homepage | Roger only |

When in doubt, save as draft and message Roger. Drafts cost nothing. Bad live publishes cost trust.

## 13. The first-week training plan

Same shape as `05a_Training_Program.md`. Two sessions plus a supervised week.

### Session 1 — Tour (45 minutes)

- Roger walks the new editor through every schema, opening one document of each.
- For each schema, Roger explains: what it controls on the site, how often it's edited, who can edit it.
- New editor logs in for the first time, confirms access, sets up their preview.
- New editor performs three Viewer-mode read-onlys: opens an event, opens a machine, opens the Homepage document. Doesn't edit yet.

### Practical week (5 shifts)

- The new editor starts as Viewer-only. They can navigate, read, and use the version history, but cannot save or publish.
- During this week, Roger gives them three "ghost edits" to draft on paper or in a Doc: "If you were updating Christmas Eve hours, what would you put?" "If you were adding a new machine [name], what would the description say?" "If you were rotating What's On for next Monday, what would you choose?"
- Roger reviews each ghost edit at the end of the relevant shift.

### Session 2 — Hands-on (45 minutes)

- Promote new editor from Viewer to Editor.
- New editor performs three real edits, supervised: (a) update one machine's description, (b) duplicate next week's league night event from this week's, (c) add or rotate one What's On item.
- For each, the new editor: drafts → saves → previews → asks Roger to confirm → publishes → refreshes the live site to confirm.
- Roger watches every publish click.

### Sign-off

After Session 2, the editor is signed off to publish independently against the rules in section 12. The first month, Roger reviews their published changes weekly. After a month with no incidents, they're at full Editor speed.

## 14. Reference card

A quick-reference card lives on the back-bar near the till. Same print spec as the content training cards in `05b_Quick_Reference_Cards.md`.

```
SANITY QUICK CARD

URL: beercade.com.au/studio
LOGIN: your @beercade.com.au Google account

PUBLISH FLOW
1. Open document
2. Make edit
3. SAVE (draft)
4. Check preview
5. PUBLISH
6. Open live site, refresh, confirm

BEFORE PUBLISHING — TICK 6
[ ] Typo check (read aloud)
[ ] Australian English
[ ] 24-hour times
[ ] Date format: 25 June 2026
[ ] Image alt text
[ ] No banned words

DON'T
- Publish Fri after 6 pm
- Delete what you didn't create
- Paste from Word — plain text only
- Edit if another editor is in the doc

PROBLEM? Message John before trying to fix.
```

---

**Next deliverable:** `09_EOFY_Outreach_Pack.md` — the operational pack for the outreach campaign behind doc 7, including the contact list template, sequenced LinkedIn + email touches, response handling scripts, and the Christmas-soft-open email template. Due Day 19 in the plan.

Related: [[02_Website_Build_Spec]], [[05_Staff_Content_Guidelines]], [[05a_Training_Program]], [[07_Event_Promo_Plan]].
