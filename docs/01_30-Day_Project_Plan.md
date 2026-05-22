# Beercade Launch Sprint — 30-Day Project Plan

Sprint window: Friday 22 May 2026 → Saturday 20 June 2026
Owner: Beercade Australia
Consultant: John Willsdon (independent marketing + dev)
Document status: v2.0, living. Supersedes the 14-day version.
Update at end of every working day in section 11.

---

## TL;DR

Thirty days to stand up the full marketing and digital stack: website on Next.js + Sanity, Google Workspace, Drive, Kit, Resend, Google Business Profile, three social accounts, the four-week pinball ladder league live, and the EOFY function campaign in market. Day 1 is today. Public launch on Day 21.

The extra fortnight beyond the original 14-day window does three things the shorter sprint could not. First, it lets the website build go through a proper soft launch on Day 17 — a closed beta with a small list of regulars before the public turn-on — instead of going live and triaging bugs in front of the audience. Second, it gives the pinball ladder league a real Day 25 start, which means the first night of league play falls inside the sprint and produces day-one content. Third, it gives the EOFY function outreach two clean working weeks to convert before financial-year-end on 30 June.

The sequencing is still dictated by three hard dependencies: Google Workspace before email / Drive / Kit DNS auth; Sanity schemas before website content entry; staff content shot before social and GBP photos finalised. Four owner decision batches keep the owner's time bounded.

The honest risk call from Day 1: with 30 days the website is no longer the squeeze. The squeeze is now staff content production — the brand depends on real-venue, real-punter photography and the sprint needs three usable shoot nights (the two Saturdays in the second and third weeks, plus the league opening on Day 25) to feed the launch grid. If staff don't shoot, the rest of the plan is starved of fuel.

---

## 1. Sprint shape at a glance

| Week | Days | Theme | What ships by end of week |
|---|---|---|---|
| 1 | 1–7 | Foundations | Owner decisions closed, GWS live, Drive structured, Sanity project + schemas v1, Next.js scaffold on Vercel, GBP audit done, social accounts created |
| 2 | 8–14 | Build heavy | All pages built, all components functional, Sanity content entered, function form wired end-to-end, Kit configured, second staff shoot logged |
| 3 | 15–21 | Polish and soft launch | A11y + perf pass, soft launch to closed list Day 17, bug triage, public launch on Day 21 |
| 4 | 22–30 | Launch, league live, EOFY in market | First newsletter, IG + FB + TikTok push, pinball ladder league opens Day 25, EOFY outreach engaged, sprint retro on Day 30 |

---

## 2. Owner decision moments

Four batches. Anything not in a batch is on the consultant.

**Batch 1 — Day 1 (Fri 22 May).** Domain and email scheme, tournament format (single elim vs ladder league — recommended: ladder), second event from three options (recommended: EOFY Office Trash Night). Memo at `03_Owner_Decision_Memo_Batch_1.md` (drafting).

**Batch 2 — Day 6 (Wed 27 May).** Sanity schema sign-off, staff content guidelines sign-off, tournament format and run-of-show sign-off, second event format sign-off.

**Batch 3 — Day 14 (Thu 4 June).** Website copy review (hero, machines, functions, what's on), GBP business description, social bios, first newsletter content.

**Batch 4 — Day 19 (Tue 9 June).** Final visual approvals post-soft-launch, public launch go/no-go, EOFY outreach target list approved.

If any batch slips by 24 hours, the downstream phase slips by at least one day. Flag immediately.

---

## 3. Workstream summary

| # | Workstream | Lead | Notes entering sprint |
|---|---|---|---|
| 1 | Website (Next.js + Sanity + Resend on Vercel) | C | Pinball-themed prototype exists; full build spec at `02_Website_Build_Spec.md` |
| 2 | Sanity CMS | C | Schemas defined inside the build spec; training doc due Day 18 |
| 3 | Google Workspace | C with O input | Domain confirmation needed in Batch 1 |
| 4 | Drive structure | C | Taxonomy due Day 2 |
| 5 | Kit (email) | C | Welcome sequence + newsletter template drafted; load Day 12 |
| 6 | Google Business Profile | C with O input | Audit Day 1; recovery may eat a week if listing is claimed |
| 7 | Social accounts | J — C sets up, S shoots ongoing | Audit Day 1; guidelines doc due Day 4 |
| 8 | Event marketing | C with O input | Ladder league recommended start Day 25 (Tue 16 June); EOFY outreach starts Day 22 |

C = consultant. O = owner. S = venue staff. J = joint.

---

## 4. The 30 days, in detail

Owner-input days are marked **decision day**. Quiet-build days are marked **deep work**. Venue-open days are marked **open**.

---

### Week 1 — Foundations

**Day 1 — Friday 22 May (today). Decision day.**
- Project plan v2.0 saved (this document).
- Website build spec saved at `02_Website_Build_Spec.md` for Claude Code to pick up.
- Owner Decision Memo Batch 1 drafted at `03_Owner_Decision_Memo_Batch_1.md`.
- Domain and email audit: registrar, current DNS, GBP listing audit, social handle audit.
- Stack accounts pre-created where no domain is needed: Sanity, Vercel, Resend, Sentry, Plausible Cloud, Cloudflare Turnstile, Upstash Redis.
- Confirm GitHub repo `Beercade_website` exists with the consultant added as collaborator; clone into the local working directory.

**Day 2 — Saturday 23 May. Open.**
- Owner Batch 1 closed by midday.
- Google Workspace account created. Domain verification kicked off.
- `hello@beercade.com.au` provisioned as a standard mailbox.
- `functions@beercade.com.au` provisioned as a **Google Group**, configured as a Collaborative Inbox. Owner + two manager-shift staff added as members. *Anyone on the web can post* enabled so customer replies reach the group.
- Each team member's Gmail set up with *Send mail as* `functions@beercade.com.au` so they can reply from the group address.
- **Beercade Bookings** calendar created in the workspace. Editor access to all three team members. Manager access (Make changes to events) to the Google service account. Calendar ID captured for the build spec env var.
- Drive folder taxonomy drafted at `04_Drive_Folder_Taxonomy.md`.
- Kit account created. Audience and tag structure designed.
- Sanity project provisioned with embedded studio in `/studio`.
- Next.js 14 App Router project initialised inside the existing `Beercade_website` GitHub repo. Vercel project linked to the repo.

**Day 3 — Sunday 24 May. Open.**
- Sanity schemas v1 complete and deployed to studio.
- Drive structure built. Existing strategy, personas, content calendar, welcome sequence, newsletter template, MSA migrated in.
- Resend account configured. Domain DNS records for SPF / DKIM added.
- Repo: Tailwind v4 configured, brand tokens loaded, Space Grotesk + Inter + Press Start 2P wired via next/font.
- Prototype audit: what components from the existing pinball-themed site are salvageable, what needs rebuild.

**Day 4 — Monday 25 May. Closed. Deep work.**
- Drive folder taxonomy signed off; structure created in GWS.
- Information architecture finalised: Home, Machines, Machine detail, What's On, Event detail, Functions, Find Us, plus thank-you and 404.
- Function enquiry form spec written into the build spec.
- Staff content guidelines drafted at `05_Staff_Content_Guidelines.md`.

**Day 5 — Tuesday 26 May. Closed. Deep work.**
- GBP audit: listing exists or doesn't, claimed or not, categories, hours, photos. Recovery plan if needed.
- Kit DNS auth records added; propagation underway.
- Homepage hero component built. Layout shell and global navigation built.
- Sanity studio deploys live, accessible to owner for preview.

**Day 6 — Wednesday 28 May. Open. Decision day.**
- Owner Decision Batch 2 closed by midday.
- Sanity schemas locked.
- Tournament format locked. Ladder league run-of-show drafted at `06_Tournament_Run_of_Show.md`.
- Second event scoped and signed off. Promo plan drafted at `07_Event_Promo_Plan.md`.
- Machines page component built. Machines content entry begins in studio.
- First staff content briefing in-shift tonight.

**Day 7 — Thursday 29 May. Open.**
- Function form built end-to-end on staging: server action submits, Resend sends autoresponder, Calendar service account creates tentative event, Drive copy archived.
- Social accounts created or audited: Facebook page, Instagram, TikTok. Profile imagery briefed.
- GBP corrective actions in progress.
- Machine records continuing to populate in Sanity.

---

### Week 2 — Build heavy

**Day 8 — Friday 30 May. Open.**
- What's On page component built. Standing nights and league listing entered in studio.
- Functions page component built. Function form embedded.
- First Vercel preview URL shareable for owner walk-through.

**Day 9 — Saturday 31 May. Open. Content shoot night.**
- Find Us page built with embedded map, transport detail, hours pulled from Sanity.
- Newsletter signup form embedded in footer and exit-intent on home + machines.
- Staff content shoot in-shift. Quota: 40 frames across machines, hands on flippers, beer-on-cabinet, condensation, the room at 9pm.

**Day 10 — Sunday 1 June. Open.**
- All page-level components built. Site is feature-complete on staging.
- Begin SEO foundation: per-page metadata, OG images, LocalBusiness JSON-LD, sitemap, robots.
- Sanity content review pass: every machine has photo + status + condition note.

**Day 11 — Monday 2 June. Closed. Deep work.**
- Sentry wired. Plausible wired. Vercel Analytics enabled.
- Function form end-to-end test in staging. Smoke test from form submission to Calendar invite landed in functions@.
- Begin accessibility pass: keyboard nav, focus states, screen reader smoke, contrast audit against Combinations A/B/C in brand guide.

**Day 12 — Tuesday 3 June. Closed. Deep work.**
- Kit DNS auth verified.
- Welcome sequence loaded into Kit from drafted copy. Monthly newsletter template loaded.
- Kit signup automation: tag on signup, trigger welcome sequence.
- Performance pass: image sizing, Sanity asset CDN parameters, Lighthouse target ≥ 90 perf / ≥ 95 a11y.

**Day 13 — Wednesday 4 June. Open.**
- Sanity content entry day in-venue: events for the next 8 weeks, weekly standing nights, function packages, opening hours edge cases (public holidays).
- Staff in-shift briefed on Sanity studio basics so they can do the easy updates immediately.

**Day 14 — Thursday 5 June. Open. Decision day.**
- Owner Decision Batch 3 closed by midday.
- Copy review across hero, machines, functions, what's on, find us.
- GBP business description final. Social bios final.
- First newsletter content review.

---

### Week 3 — Polish and soft launch

**Day 15 — Friday 6 June. Open.**
- Copy edits landed.
- Final accessibility fixes.
- Redirect plan for the existing beercadeaustralia.com.au URLs written into a Vercel redirects table.

**Day 16 — Saturday 7 June. Open. Second content shoot night.**
- Second staff content shoot. Brief: function-style group shot (with signed consent), one wide-room shot for the library, hands on a Daytona wheel, beer condensation close-up. Quota: 40 frames.
- TTL on existing DNS records reduced to 300s to ease the Day 21 cutover.

**Day 17 — Sunday 8 June. Open. Soft launch.**
- Soft launch: a staging URL is sent to a closed list of 30–50 regulars and the personal network. Three days to find bugs before the public turn-on.
- Bug triage tracker live.
- First proper test of the function form by external users.

**Day 18 — Monday 9 June. Closed. Deep work.**
- Bug triage from soft launch. Three buckets: launch-blockers, ship-this-week, parked.
- Sanity training doc finalised at `08_Sanity_Training_Doc.md`. Eight-minute screen-recorded walkthrough.
- Sanity training session with venue team — 30 minutes, two manager-shift staff plus owner.

**Day 19 — Tuesday 10 June. Closed. Deep work. Decision day.**
- Owner Decision Batch 4 closed by midday: public launch go/no-go, EOFY outreach target list approved.
- Final visual approvals.
- Public launch checklist signed off.
- EOFY outreach assets drafted: LinkedIn DM template, follow-up template, coworking-space partnership note (`09_EOFY_Outreach_Pack.md`).

**Day 20 — Wednesday 11 June. Open.**
- Pre-launch dry run. Two-person smoke test (consultant + owner) against the production preview.
- Tournament 14 days out — first social tease (Sanity event live, IG story countdown, GBP post draft).

**Day 21 — Thursday 12 June. Open. Public launch.**
- DNS cutover: production domain points at Vercel. SSL active. WWW canonical sorted.
- Production smoke test by 9am.
- Old hosting deprovisioned in 24-hour delay.

---

### Week 4 — Launch, league live, EOFY in market

**Day 22 — Friday 13 June. Open.**
- First newsletter sent through Kit.
- Instagram launch post: single Space Grotesk slogan on Tilt Purple plus a Reel cover from one of the shoots.
- Facebook launch post live.
- TikTok first post: 12 seconds of a Daytona race or Godzilla LE multiball, captions on.
- GBP launch post live.
- Tournament 12 days out — second push.

**Day 23 — Saturday 14 June. Open. Third content shoot.**
- Tournament 11 days out — push three.
- Weekend content shoot in-shift. Brief: event-style content, build the library for next month.

**Day 24 — Sunday 15 June. Open.**
- Tournament 10 days out — pinball ladder league public signups open on the website.
- Sanity event has a working "sign up" CTA that opens the function form or a separate signup form (see build spec).

**Day 25 — Monday 16 June. Closed but league night opens at the venue on Tuesday.**
- EOFY outreach: 50 inner-Sydney small businesses, 3 coworking spaces, 2 industry-relevant LinkedIn group posts. All from drafted assets.
- League opening promo final push.

**Day 26 — Tuesday 17 June. Pinball Ladder League — Week 1 Night 1.**
- League night one in the venue. Content captured in-shift.
- EOFY follow-ups: first reply triage.

**Day 27 — Wednesday 18 June. Open.**
- League content recap on socials.
- EOFY: first bookings expected to land. Function form sees real traffic for the first time at scale.
- GBP review request flow tested on the night's guests.

**Day 28 — Thursday 19 June. Open. Pinball Ladder League — Week 1 Night 2.**
- League night two. Standings posted on socials and on the event detail page in Sanity.

**Day 29 — Friday 20 June. Open.**
- Weekly content review meeting in-shift.
- EOFY pipeline review. Confirm-vs-quote-vs-cold split.
- Sprint retro drafting begins.

**Day 30 — Saturday 21 June. Open. End of sprint.**
- Sprint retrospective at `10_Sprint_Retro.md`: what shipped, what slipped, what got parked, what's now in the BAU rhythm.
- Handoff doc to the owner and staff: weekly cadence, what each role owns, monthly cadence with consultant.
- Day 30 is also Pinball Ladder League weekend two on Tuesday + Thursday next week. Sprint ends; BAU begins.

---

## 5. Second event — three options for the owner to pick from

Constraint check: organic only, no paid ads. Sydney late May → early July (winter, indoor favoured). Must fit the four personas, the machine lineup, and the brand voice.

### Option A — Daytona Head-to-Head

Six linked cabinets is an unusual Sydney asset. A bracket-format Saturday afternoon → evening event, $20 entry, $400 bar tab and a side-art print for the winner. Fast, social, crowd-pulling. 24–36 racers × $20 = $480–720 entry, plus a five-hour-hard bar. Realistic gross north of $4k. Medium effort. Risk: Daytona LAN-link reliability needs a maintenance pass two days before.

### Option B — EOFY Office Trash Night (recommended)

A campaign, not a single event. Push the back-room-plus-Daytona-twin-seater function package to 30–60 attendee teams in the last fortnight of June. Eight bookings × $1,000 average = $8,000 in package revenue, plus bar carry on the night. Builds Sarah's persona pipeline at exactly the right time. Requires the function flow on the new website to work — which the sprint delivers. Medium effort, highest revenue, lower brand-spectacle.

### Option C — First Thursday Date Night

A monthly $90-a-couple package: two cocktails, $20 in tokens, a shared plate. Recurring. 15 couples × $90 = $1,350 a night, ~$16k a year in package revenue before incremental bar. Low setup effort. Recurring effort post-launch. Best as a content series starting July, not a launch event.

**My recommendation.** Option B for revenue swing in the sprint window; Option A held for the next sprint as a brand-building event; Option C started in July as a recurring asset. If the owner wants both A and B inside this sprint: A as a one-night event in week 4, B as a campaign running throughout.

---

## 6. Pinball tournament — format options

### Format 1 — Single-elimination, one night

Friday 7pm, 32 entrants, $25 entry, three machines drawn at random per round, trophy + $300 bar tab to winner. One night, four hours, big spectator energy. Easy to promote, but the room turns over too fast and half the field exits in the first hour.

### Format 2 — Ladder league, four weeks (recommended)

Tuesdays and Thursdays for four weeks. Points accumulate across machines. Top 8 enter finals night in week five. $40 entry covers all sessions. Trophy + $500 bar tab to overall winner. Builds a regular crowd, pulls Dave's persona, produces weekly content beats, higher per-player revenue. Operational lift spread across five nights rather than crammed into one.

**My recommendation.** Format 2. Beercade's brand essence is the pub night that actually has something to do, not the one-off event venue. A four-week league turns the launch window into a content engine and produces real Day 25–28 content inside this sprint.

---

## 7. Risk register

**R1 — Owner decision velocity.** Four batches. Each batch slipping by a day slips the launch by a day. Mitigation: short memos, clear defaults.

**R2 — Staff content production.** The brand depends on real-venue, real-punter photography. Three shoot nights are scheduled (Day 9, Day 16, Day 23). If two of three underdeliver, the launch grid is thin. Mitigation: brief in shift on Day 6, reshoot Sunday after any weak Saturday, owner-led nudge to staff on shoot nights.

**R3 — DNS propagation.** GWS verification, Kit DNS auth, Resend DNS auth, and production domain cutover all hit DNS at different points. TTL reduced to 300s on Day 16 to keep the Day 21 cutover clean.

**R4 — GBP listing recovery.** If the listing is claimed by an old contact, recovery can take 5–10 days. Day 1 audit catches this early; recovery starts immediately if needed.

**R5 — EOFY outreach conversion.** First-time campaign, no historical conversion rate. Mitigation: build the list to 50–80 prospects so even a 10% conversion lands the revenue target; track responses in a simple spreadsheet inside Drive/Marketing/EOFY.

---

## 8. What this plan deliberately does not include

- Paid media setup.
- Loyalty / rewards program.
- POS or booking platform integration beyond the function form.
- Influencer or PR outreach beyond the small inner-Sydney partnership outreach in week 4.
- Reviews automation (the Day 27 manual flow is what ships).
- Recreating brand guide, personas, strategy, content calendar, welcome sequence, newsletter template, MSA — all exist.

---

## 9. File index

All sprint deliverables live in `OUTPUTS/Beercade/Launch Sprint/`. Numbered for reading order.

- `01_30-Day_Project_Plan.md` — this file. Supersedes the 14-day version.
- `02_Website_Build_Spec.md` — complete build spec for Claude Code.
- `03_Owner_Decision_Memo_Batch_1.md` — drafting next.
- `04_Drive_Folder_Taxonomy.md` — Day 2.
- `05_Staff_Content_Guidelines.md` — Day 4.
- `06_Tournament_Run_of_Show.md` — Day 6.
- `07_Event_Promo_Plan.md` — Day 6.
- `08_Sanity_Training_Doc.md` — Day 18.
- `09_EOFY_Outreach_Pack.md` — Day 19.
- `10_Sprint_Retro.md` — Day 30.

---

## 10. Note on the prior 14-day plan

The file at `00_Archive_14-Day_Project_Plan.md` (rename of the previous master) is preserved for history. It is superseded by this document on 22 May 2026. Do not work from the 14-day version.

---

## 11. Daily log

### Day 1 — Friday 22 May (in progress)

Plan v2.0 drafted and saved. Website build spec v1.1 drafted and saved at `02_Website_Build_Spec.md`. Stack confirmed: Next.js 14 + Sanity + Vercel + Resend + Kit + Plausible Cloud + Sentry (free tier) + Cloudflare Turnstile + Upstash Redis + Google service account for the Beercade Bookings calendar. GitHub repo `Beercade_website` confirmed by the consultant. Function enquiry path settled: form for launch, voice-locked function concierge deferred to Sprint 2 with proper evals. Five build-spec open questions all closed: alt text required across image schemas; Tilt-Purple contrast handled by utility classes rather than studio enforcement; Sanity is the enquiry archive of record (no Drive copy); Plausible Cloud not self-hosted; Sentry free tier. Team-inbox architecture locked: `functions@beercade.com.au` as a Google Group Collaborative Inbox with three members, separate `Beercade Bookings` calendar as the availability source of truth, Sanity studio as the pipeline view. Owner Decision Memo Batch 1 drafts next; once that lands, Day 2 Google Workspace setup can begin.
