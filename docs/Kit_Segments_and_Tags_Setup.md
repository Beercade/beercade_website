# Kit Setup — Segments, Tags, Forms & Automations

**Purpose.** Build the Kit account from empty to launch-ready. Covers custom fields, forms, tags, segments, sequences, and the automations that wire them together. Do it in order — later steps depend on earlier ones.

**Time to complete.** ~90 minutes if you don't get distracted.

**Audience for this doc.** John / Roger doing the setup inside Kit. Lab-report voice — what to create, where, and why.

---

## 1. The model (read this first)

Kit has four building blocks. Don't confuse them.

- **Custom fields** — data stored against a subscriber (e.g. `function_type`, `guest_count`, `signup_source`). Set once on signup.
- **Tags** — labels applied by an action (filled a form, clicked a link, finished a sequence). Cheap, additive, never deleted. The atomic unit.
- **Segments** — saved filters that ask "show me everyone matching tag X AND field Y." Dynamic — membership updates as tags change. Used for sending and reporting, never for storage.
- **Sequences & Automations** — sequences are timed email series; automations are the visual workflows that trigger them ("when tagged X → enter sequence Y → on completion tag Z").

Rule of thumb: **tag on entry, segment for output.** If you're tempted to make a tag for "engaged subscribers" — don't. That's a segment.

---

## 2. Naming conventions

Apply these before creating anything. Kit has no folders, so the prefix is the folder.

- Forms: `Form / [source]` — e.g. `Form / Newsletter Footer`
- Tags: `[category]: [value]` — e.g. `source: newsletter-footer`, `interest: functions`, `lifecycle: engaged-30d`
- Segments: `Seg / [purpose]` — e.g. `Seg / Functions buyers — warm`
- Sequences: `Seq / [purpose]` — e.g. `Seq / Welcome — newsletter`
- Automations: `Auto / [trigger → outcome]` — e.g. `Auto / Newsletter signup → welcome`

Lowercase tag values, hyphens not spaces. Consistency matters more than the convention itself.

---

## 3. Custom fields to create

Settings → Subscribers → Custom Fields → **Add field**. Create these six:

| Field name | Type | Used by | Notes |
|---|---|---|---|
| `signup_source` | Text | All forms | Hard-coded per form (e.g. `newsletter-footer`, `functions-form`). |
| `function_type` | Text | Functions form | Birthday / corporate / EOFY / hens / bucks / other. |
| `function_date_pref` | Date | Functions form | Their preferred date — drives urgency tagging. |
| `guest_count` | Number | Functions form | Drives segment for "big bookings ≥ 30 guests". |
| `league_team_name` | Text | Tournament form | For roster display. |
| `referral_source` | Text | All forms | Optional dropdown: friend / Instagram / Google / walked past / other. |

Use the field name verbatim — automations break on typos.

---

## 4. Forms to create

Forms → **New Form**. Build four. Use Inline format unless noted.

### 4.1 Form / Newsletter Footer

- **Where it lives.** Site-wide footer + homepage hero.
- **Fields.** Email + first name (optional).
- **Hidden field.** `signup_source = newsletter-footer`.
- **Success action.** Redirect to `/thanks-newsletter` (or show inline confirmation if the page already does the job).
- **Incentive.** None at launch. If conversion is weak after week one, add "first to know about leagues + EOFY night."

### 4.2 Form / Functions Enquiry

- **Where it lives.** `/functions` page.
- **Fields.** Email, first name, `function_type`, `function_date_pref`, `guest_count`, message.
- **Hidden field.** `signup_source = functions-form`.
- **Success action.** Redirect to `/thanks-functions`. Also fires the internal alert to `functions@beercade.com.au` (handled by the site, not Kit).
- **Notification.** Turn on email notification to `functions@` so the shared inbox sees every enquiry.

### 4.3 Form / Tournament Signup

- **Where it lives.** `/league` page. Goes live Day 10ish, league opens Tue 16 June.
- **Fields.** Email, first name, last name, `league_team_name` (optional — solos welcome).
- **Hidden field.** `signup_source = tournament-signup`.
- **Success action.** Redirect to `/thanks-league`.

### 4.4 Form / EOFY Trash Night RSVP

- **Where it lives.** `/eofy` event landing page.
- **Fields.** Email, first name, `guest_count`.
- **Hidden field.** `signup_source = eofy-trash-night`.
- **Success action.** Redirect to `/thanks-eofy`.

---

## 5. Tags to create

Subscribers → Tags → **New Tag**. Build them grouped — order doesn't matter, but creating in groups keeps the list scannable.

### 5.1 Source tags (where they came in)

One per form. Applied automatically by the form's "Incentive → Add tag" setting.

- `source: newsletter-footer`
- `source: functions-form`
- `source: tournament-signup`
- `source: eofy-trash-night`
- `source: instagram-bio` *(if you ever run a Linktree-style landing → form path)*
- `source: import` *(reserved for any one-off CSV imports — keeps them flagged)*

### 5.2 Interest tags (what they care about)

Applied by form OR by link-click in emails ("click here to hear about functions"). Multiple per subscriber is fine.

- `interest: functions`
- `interest: league`
- `interest: events`
- `interest: casual-drop-in`

### 5.3 Function-specific tags (only if they came through the functions form)

Applied by automation reading `function_type` field. Saves you filtering by field in segments later.

- `function-type: birthday`
- `function-type: corporate`
- `function-type: eofy`
- `function-type: hens`
- `function-type: bucks`
- `function-type: other`

### 5.4 Lifecycle tags (engagement state)

Applied/removed by automation based on email behaviour. **Don't apply manually.**

- `lifecycle: new` — auto-applied on signup, auto-removed after welcome sequence completes.
- `lifecycle: engaged` — opened or clicked in last 60 days.
- `lifecycle: cold` — no opens in 90 days.
- `lifecycle: sunset-pending` — 120 days no opens, queued for re-engagement.

### 5.5 Status tags (operational)

- `status: customer` — applied when a booking is confirmed (manually or via Stripe automation later).
- `status: league-player-active` — current season.
- `status: league-player-alumni` — played a past season.
- `status: vip` — Roger applies manually. People worth more attention.

### 5.6 Suppression tags

- `suppress: bulk` — exclude from marketing broadcasts; transactional only.
- `suppress: complaint` — auto-applied if anyone marks an email as spam.

---

## 6. Segments to create

Subscribers → Segments → **New Segment**. These are the saved filters you'll actually send from.

### 6.1 Seg / All marketing-eligible

- **Filter.** Confirmed subscribers, NOT tagged `suppress: bulk`, NOT tagged `suppress: complaint`.
- **Use.** Default audience for any general broadcast. Never send to "all subscribers" — send to this.

### 6.2 Seg / Functions buyers — warm

- **Filter.** Has tag `interest: functions` OR `source: functions-form`, AND `lifecycle: engaged`, AND NOT `status: customer`.
- **Use.** Function nurture campaigns, package promotions.

### 6.3 Seg / Functions buyers — high intent

- **Filter.** Tag `source: functions-form` AND `function_date_pref` within next 90 days AND NOT `status: customer`.
- **Use.** Roger's manual follow-up list. Export weekly.

### 6.4 Seg / Big bookings

- **Filter.** Tag `source: functions-form` AND `guest_count >= 30`.
- **Use.** Always-on hot list. Slack notification optional via Zapier later.

### 6.5 Seg / League — active roster

- **Filter.** Tag `status: league-player-active`.
- **Use.** Weekly league updates, fixtures, results.

### 6.6 Seg / League — alumni

- **Filter.** Tag `status: league-player-alumni` AND NOT `status: league-player-active`.
- **Use.** Next-season re-engagement.

### 6.7 Seg / EOFY RSVPs

- **Filter.** Tag `source: eofy-trash-night`.
- **Use.** Event reminders, day-of comms, post-event follow-up.

### 6.8 Seg / Newsletter only

- **Filter.** Tag `source: newsletter-footer` AND NOT any `interest:` tag.
- **Use.** People who signed up but haven't told you what they care about. Send an interest-tagging email.

### 6.9 Seg / Cold — re-engagement candidates

- **Filter.** Tag `lifecycle: cold` AND NOT `suppress: bulk`.
- **Use.** Quarterly win-back sequence. If they don't engage, tag `suppress: bulk`.

---

## 7. Sequences to create

Sequences → **New Sequence**. Skeleton structure here; copy gets written in the welcome-sequence task (Day 18 in the sprint plan).

### 7.1 Seq / Welcome — newsletter (3 emails over 7 days)

1. Day 0 — "You're in. Here's what Beercade actually is." Plus interest-tagging links (3 buttons: functions / league / casual).
2. Day 3 — Story-driven: why this place exists. Soft CTA to follow IG.
3. Day 7 — "What's on" — current league + EOFY night. Final interest-tag prompt.

### 7.2 Seq / Welcome — functions (2 emails, fast)

1. Day 0 — "Roger will be in touch within 24 hours." Sets expectation. Plus the package PDF inline.
2. Day 2 — Social proof: one past event recap + booking link.

### 7.3 Seq / Welcome — league (2 emails)

1. Day 0 — Confirm registration. League format, dates, fixtures release date.
2. Day 1 before league start — "It's tomorrow. Here's the bracket + house rules."

### 7.4 Seq / Welcome — EOFY (2 emails)

1. Day 0 — "You're RSVP'd. Here's what to expect."
2. Day -1 from event — Day-of details: door time, dress code, location pin.

---

## 8. Automations to wire

Automations → **New Automation**. These connect forms → tags → sequences. One per signup source plus the lifecycle automations.

### 8.1 Auto / Newsletter signup → welcome

- **Trigger.** Subscribes to `Form / Newsletter Footer`.
- **Steps.**
  1. Add tag `source: newsletter-footer`
  2. Add tag `lifecycle: new`
  3. Enter sequence `Seq / Welcome — newsletter`
- **Exit.** On sequence completion → remove `lifecycle: new`, add `lifecycle: engaged` (if any opens), otherwise add `lifecycle: cold`.

### 8.2 Auto / Functions enquiry → welcome + alert

- **Trigger.** Subscribes to `Form / Functions Enquiry`.
- **Steps.**
  1. Add tag `source: functions-form`
  2. Add tag `interest: functions`
  3. Add function-type tag matching `function_type` field (use a Rule per type — see 8.6).
  4. Add tag `lifecycle: new`
  5. Enter sequence `Seq / Welcome — functions`

### 8.3 Auto / Tournament signup → welcome

- **Trigger.** Subscribes to `Form / Tournament Signup`.
- **Steps.**
  1. Add tags `source: tournament-signup`, `interest: league`, `status: league-player-active`, `lifecycle: new`
  2. Enter sequence `Seq / Welcome — league`

### 8.4 Auto / EOFY RSVP → welcome

- **Trigger.** Subscribes to `Form / EOFY Trash Night RSVP`.
- **Steps.**
  1. Add tags `source: eofy-trash-night`, `interest: events`, `lifecycle: new`
  2. Enter sequence `Seq / Welcome — EOFY`

### 8.5 Auto / Link click → interest tag

- **Trigger.** Clicks a specific link in any broadcast (set per-link via "trigger" in the link editor).
- **Use.** The 3 buttons in the newsletter welcome email each tag `interest: functions`, `interest: league`, or `interest: casual-drop-in`.

### 8.6 Auto / Functions: field-to-tag mapping (Rules)

Automations → Rules. Six rules, one per function type.

- **Trigger.** `function_type` is set to `birthday` → Add tag `function-type: birthday`.
- Repeat for: corporate, eofy, hens, bucks, other.

### 8.7 Auto / Lifecycle hygiene (run weekly)

Kit doesn't have "subscriber inactive for X days" as a native trigger in all plans. Use Rules:

- No opens in 60 days → add `lifecycle: cold`, remove `lifecycle: engaged`.
- No opens in 120 days → add `lifecycle: sunset-pending`.
- Opens after being cold → remove `lifecycle: cold`, add `lifecycle: engaged`.

If your plan doesn't expose these triggers, do it via segment + manual bulk action monthly. Set a recurring calendar reminder.

### 8.8 Auto / Spam complaint → suppression

- **Trigger.** Marks email as spam (native event).
- **Action.** Add tag `suppress: complaint`. Remove all `interest:` and `lifecycle:` tags.

---

## 9. Build order (do it in this order)

Each block depends on the previous one existing.

1. Custom fields (§3)
2. Tags (§5) — create every tag empty, before any forms or automations reference them.
3. Forms (§4) — set their hidden `signup_source` field as you build each.
4. Sequences (§7) — empty shells with placeholder copy is fine; you can fill copy later.
5. Segments (§6) — these will populate as data arrives.
6. Automations (§8) — wire last.
7. Test: subscribe yourself to each form with a different email alias (`john+newsletter@`, `john+functions@`, etc.). Confirm tags land and sequences fire.

---

## 10. Pre-launch checklist

Before flipping forms live on the production site:

- [ ] All four forms have correct hidden `signup_source` value
- [ ] Functions form notification is going to `functions@beercade.com.au`
- [ ] Welcome sequences have real copy, not placeholders
- [ ] DKIM/SPF/DMARC pass at `kit.beercade.com.au` (or whatever subdomain Kit assigns) — verify via Kit's domain auth panel
- [ ] Test subscription from each form lands the right tags + fires the right sequence
- [ ] `Seg / All marketing-eligible` returns the test subscribers
- [ ] Confirmation emails have Beercade brand (Tilt Purple background, Space Grotesk for headers, mono logo)
- [ ] Unsubscribe footer says "Beercade, [venue address]" — required by Australian Spam Act

---

## 11. What you can defer

To keep launch lean. Add post-launch.

- Geography segmentation (suburb / distance from venue).
- Birthday automation (annual happy-birthday-here's-10%-off).
- Stripe → `status: customer` automation (needs Zapier or Kit's commerce integration, takes ~2 hours).
- Referral tagging from UTM parameters (needs landing page logic).
- Two-tier league tagging (division A / B) — add when you have enough players to bother.

---

## 12. Notes on Kit-specific gotchas

- Kit forms send the **confirmation email** (double opt-in) by default. Decide per form whether you want it on. Functions enquiry should be OFF — those people want a fast reply, not an opt-in friction. Newsletter should be ON — protects deliverability.
- Tags applied during an automation run **don't re-trigger other automations** that use the same tag as a trigger. Avoid building tag-trigger loops.
- Custom field values are subscriber-wide, not per-form-submission. If someone fills the functions form twice with different `guest_count`, the second value overwrites the first. Use a tag if you need history.
- Segments are evaluated at send-time. A segment showing 412 subscribers in the UI might send to 408 if 4 unsubscribed in the window.
