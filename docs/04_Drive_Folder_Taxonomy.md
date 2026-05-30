# Drive Folder Taxonomy

Document status: v1.0 draft for Roger's review.
Roger's sign-off needed by end of Day 2 (Sat 23 May) so the structure can be created and content migrated on Day 3.
Author: John Willsdon.

---

## TL;DR

Use a Google **Shared Drive** (not a personal *My Drive* folder owned by one person) called **Beercade Australia**. Eight top-level folders, numbered for deterministic sort, mapped to the eight workstreams in the marketing brief. Photography stays as its own top-level rather than nesting under Brand & Assets — it is the highest-volume folder, accessed in-shift, and deserves its own permission scope.

Three permission tiers: owner has Manager rights everywhere; the two manager-shift staff get Content Manager rights on operational folders; Legal and Finance are restricted to owner + consultant. The consultant has Content Manager rights across all folders during the engagement.

Total depth capped at four levels in 95% of paths. No "Misc" folder. No dates in top-level folder names. Numbered prefixes (01, 02, 03 …) on top-level folders only.

---

## 1. Why a Shared Drive, not a personal-folder share

A Google Shared Drive is owned by the workspace itself, not by an individual member. Three practical consequences for Beercade:

- **Files survive staff turnover.** When a manager-shift staff member leaves and their workspace account is deactivated, files they created stay in the Shared Drive, owned by the venue, accessible to everyone else. In a personal My Drive setup, those files become orphaned and recovery is painful.
- **Permission management is cleaner.** Membership is set once at the drive level, not file-by-file. New team member added today gets access to everything appropriate immediately.
- **Storage is pooled, not per-user.** Counts against the workspace's pooled storage; one staff member can't accidentally fill their personal allotment.

Cost: included in Google Workspace Business Standard and above (which Beercade will be on for the shared mailbox feature anyway). No extra spend.

---

## 2. Top-level structure

```
Beercade Australia/                  (Shared Drive)
├── 01 Brand & Assets/
├── 02 Marketing/
├── 03 Operations/
├── 04 Functions/
├── 05 Finance/                       restricted: Owner + Consultant
├── 06 Legal/                         restricted: Owner + Consultant
├── 07 Suppliers/
└── 08 Photography Library/
```

Numbered prefixes keep Google Drive's alphabetical sort deterministic, so Roger sees the eight folders in the same order every time. Two-digit prefixes leave room to slot a ninth or tenth folder in if needed without renumbering.

---

## 3. Folder-by-folder

### 01 Brand & Assets

The "look and feel" layer. Stable content; updates monthly at most.

```
01 Brand & Assets/
├── Brand Guide/                       (current + version archive)
├── Logos & Wordmarks/
│   ├── Source files/                  (AI, SVG, original-format)
│   └── Exports/                       (PNG, JPG, SVG-for-web)
├── Colour & Type/                     (palette swatches, font files, licences)
├── Templates/                         (Canva, Google Docs, function quote letterhead)
└── Voice & Messaging/                 (banned vocab list, sample copy, positioning one-pager)
```

Lives close to the surface so the team can grab a logo or a colour swatch in three clicks.

### 02 Marketing

The "work in progress" layer. High traffic; weekly updates.

```
02 Marketing/
├── Strategy/                          (strategy doc, personas, positioning, audience anchors)
├── Content Calendar/                  (rolling 90 days)
├── Campaigns/
│   ├── 2026-06 EOFY Office Trash Night/
│   ├── 2026-06 Ladder League Launch/
│   └── (one folder per campaign — YYYY-MM prefix + clear name)
├── Newsletters/                       (drafts, copy, send logs)
├── Social Content/                    (scheduled posts, captions, shot lists)
├── Partnerships & PR/                 (outreach lists, press kit, partner agreements)
└── Analytics & Reporting/             (monthly reports, GBP insights, Kit performance)
```

Campaign folders use a `YYYY-MM` prefix so the team can tell at a glance which is current and which is wrapped without opening the folder. Wrapped campaigns stay in place; we don't move them to an "Archive" subfolder. Old campaigns are a research resource for the next one.

### 03 Operations

The "how the venue runs" layer. Edited by the team in shift.

```
03 Operations/
├── Opening & Closing Procedures/
├── Cleaning & Maintenance/
├── Machine Maintenance Logs/
├── Incident Reports/                  (anything that needs to be on record)
├── Staff Training Docs/
├── Rosters/                           (or empty, if rostering lives in a separate app)
└── Risk & Safety/                     (RSA records, evacuation, first aid)
```

If Beercade uses an external rostering tool (Deputy, Tanda, etc.), the Rosters folder becomes a shortcut to that tool plus any backup exports — not the source of truth.

### 04 Functions

The customer-facing booking layer. High traffic from the team; restricted from public sharing.

```
04 Functions/
├── Function Packages/                 (current pricing, inclusions, decision tree)
├── Enquiry Templates/                 (in-voice reply templates by occasion)
├── Quote Templates/                   (Google Docs letterhead with pricing variables)
├── Contracts/                         (active contracts; signed copies)
├── Invoices/                          (shortcut into 05 Finance / Invoices Sent)
└── Booked Functions/
    └── 2026/                          (one folder per booking, named: 2026-06-28 Smith 30th)
```

Notes:
- Enquiry archives are stored in **Sanity** (the studio's Function enquiry document), not here. Functions/ in Drive is for templates and per-booking artefacts (contracts, signed quotes, run sheets, post-event invoices), not the enquiry pipeline.
- The Invoices subfolder is a **shortcut** into the Finance folder, not a duplicate. Single source of truth on invoices.
- Booked Functions get one folder per booking, named `YYYY-MM-DD Surname Occasion` so they sort chronologically and search well.

### 05 Finance (restricted)

Source of truth for money in and money out. Roger + consultant only.

```
05 Finance/
├── Bank & Accounting/                 (statements, reconciliations)
├── Invoices Received/                 (suppliers billing Beercade)
├── Invoices Sent/                     (Beercade billing function customers)
├── Bills & Receipts/                  (utilities, recurring expenses)
├── Payroll/                           (or shortcut to payroll provider)
├── BAS & GST/
└── Reports & Forecasts/               (P&L, cash flow, monthly snapshots)
```

Team does not get access. If a team member needs to know whether a customer paid, they ask Roger — they do not get a permission carve-out for one folder.

### 06 Legal (restricted)

Contracts, licences, and the engagement paperwork that sits behind the whole operation. Roger + consultant only.

```
06 Legal/
├── Marketing Services Agreement/      (this engagement's contract, signed and dated)
├── Liquor Licence/
├── Insurance/                         (public liability, contents, business)
├── Lease & Premises/
├── Compliance/                        (council, fire safety, food)
└── Contractor Agreements/             (cleaners, machine techs, designers)
```

Same restriction as Finance.

### 07 Suppliers

The "who supplies what" layer. Updated when a supplier changes; otherwise dormant.

```
07 Suppliers/
├── Beer & Beverages/                  (one subfolder per supplier with contacts, agreements, order forms)
├── Food/
├── Machines & Spare Parts/
├── Cleaning & Consumables/
├── POS & Tech/                        (POS provider, EFTPOS, internet, music licensing)
└── Insurance & Services/
```

Each per-supplier folder contains: contact card (name, email, phone, account number), latest pricing, signed agreements, key correspondence. Not a CRM — a reference.

### 08 Photography Library

The brand's highest-volume folder. Real-venue, real-punter photography is the core of the brand. Designed for fast searching and for the team to dump raw content from their phones without thinking about taxonomy.

```
08 Photography Library/
├── 01 Master Library/                 (by year-month)
│   ├── 2026-05/
│   ├── 2026-06/
│   └── …
├── 02 By Subject/
│   ├── Machines/                      (with sub-subfolders per machine name where volume warrants)
│   ├── Crowd & Atmosphere/
│   ├── Functions/                     (with sub-subfolders per function — consent required)
│   ├── Staff/                         (consent required)
│   └── Venue Exteriors/
├── 03 Function Proof/                 (curated, consent-confirmed, ready to share with prospects)
├── 04 Brand Library/                  (the 30-50 best images — used everywhere)
└── 05 Raw / Unsorted/                 (incoming — needs triage weekly)
```

Workflow:

1. Staff shoot in shift → dump to **05 Raw / Unsorted** that night from their phones.
2. Weekly triage (consultant in Sprint 4, then handed to a nominated team member): move usable frames to **01 Master Library** under the right year-month, and tag-by-copy into **02 By Subject** where appropriate.
3. The best images get a copy into **04 Brand Library** for everyday use across socials, website, and GBP.
4. Function photos with signed consent go into **03 Function Proof**.

Consent: a one-page consent form template lives in `01 Brand & Assets/Templates/`. Anyone identifiable in a published photo signs it before the image moves out of the Master Library into Brand or Function Proof.

---

## 4. Permissions model

Three roles, one config:

| Role | Members | Drive role | Excluded folders |
|---|---|---|---|
| Manager | Owner + consultant | Manager | None |
| Content Manager | Manager-shift staff × 2 | Content Manager | 05 Finance, 06 Legal |
| Viewer (external) | Accountant, designer, etc. | Viewer or Commenter | Set per engagement |

The exclusion on Finance and Legal is enforced by **moving those two folders into a separate Shared Drive** called *Beercade Confidential*, with membership of just Roger + consultant. This is cleaner than per-folder permission overrides inside a single Shared Drive — Google's per-folder overrides on Shared Drives are limited and confusing.

Practically:

```
Beercade Australia/                    (Shared Drive — Roger, consultant, staff)
├── 01 Brand & Assets/
├── 02 Marketing/
├── 03 Operations/
├── 04 Functions/
├── 07 Suppliers/
└── 08 Photography Library/

Beercade Confidential/                 (Shared Drive — Roger + consultant only)
├── 05 Finance/
└── 06 Legal/
```

Roger sees both drives in his Drive sidebar. The team sees only the first. External viewers (accountant, etc.) get access to single folders inside *Beercade Confidential* via standard Drive sharing, not as drive members.

Note: the numbering is preserved (05 and 06 still exist) so future reference like "the Finance folder" maps consistently.

---

## 5. Naming conventions

**Folders.**
- Title Case. Spaces fine.
- No special characters: avoid `/`, `:`, `*`, `?`, `|`.
- Use numeric prefixes only on top-level folders (01–08) and on Photography Library subfolders (01–05) for sort control.
- Campaign folders: `YYYY-MM Short Name` (e.g. *2026-06 EOFY Office Trash Night*). Date prefix sorts campaigns chronologically without effort.
- Booking folders: `YYYY-MM-DD Surname Occasion` (e.g. *2026-06-28 Smith 30th*).

**Files.**
- Date prefix for time-sensitive docs: `2026-06-12 Launch Press Release.docx`. ISO date format (`YYYY-MM-DD`) so files sort chronologically.
- Use Drive's built-in version history rather than `_v1`, `_v2` suffixes. Two exceptions: contract signatures (`Smith 30th Contract — signed.pdf`) and final deliverables (`EOFY Email Sequence — final.docx`).
- Spaces are fine. Capitalisation should match how a human would write the title.
- No "FINAL", no "FINAL FINAL", no "FINAL_v3_REAL_THIS_TIME". Drive's version history exists for a reason.

**Shortcuts (alias files).**
- Use `(shortcut)` suffix in the name where the target location matters: `2026-06-28 Smith 30th — Invoice (shortcut).gdoc`. Clarifies that the canonical file lives elsewhere.

---

## 6. Migration plan for Day 3

Once the structure is created on Day 2 (after Roger signs-off on this doc), Day 3 migrates the existing materials into it.

**Things that will land on Day 3:**

| Existing artefact | New home |
|---|---|
| Beercade Brand Guide (already drafted) | `01 Brand & Assets/Brand Guide/` |
| Logo and wordmark source files | `01 Brand & Assets/Logos & Wordmarks/Source files/` |
| Marketing strategy and personas (already drafted) | `02 Marketing/Strategy/` |
| Content calendar (already drafted) | `02 Marketing/Content Calendar/` |
| Welcome email sequence draft (already drafted) | `02 Marketing/Newsletters/` (until loaded into Kit on Day 12, then archived here) |
| Newsletter template (already drafted) | `02 Marketing/Newsletters/` |
| Marketing Services Agreement | `06 Legal/Marketing Services Agreement/` |
| Existing photography library | `08 Photography Library/05 Raw / Unsorted/` → triaged into Master Library across Sprint 1 |
| Any existing supplier contacts and agreements | `07 Suppliers/` (per category) |

Roger provides the locations of these existing materials in response to Owner Decision Memo Batch 1 (info requests I1, I2). Until those locations are confirmed, Day 3 migration is partial.

---

## 7. What this taxonomy deliberately does not solve

Worth being explicit so we don't kludge in workarounds later:

- **It is not a CRM.** Customer pipeline lives in Sanity (function enquiries) and Kit (subscribers). Drive holds documents and assets, not customer records.
- **It is not a project management tool.** Sprint tracking lives in `OUTPUTS/Beercade/Launch Sprint/01_30-Day_Project_Plan.md` (this folder, on the consultant's machine, with the daily log appended). Ongoing post-launch work goes into wherever the team chooses (Trello, Notion, ClickUp) and a quarterly review prompts a re-evaluation of whether Drive needs a "Projects" folder.
- **It is not the source of truth for menus or prices.** Those live wherever the POS lives — Drive holds the latest exported version for reference, not the canonical record.
- **It does not solve compliance retention.** ATO record-keeping rules require seven-year retention on tax-relevant records. Finance and Legal folders are the locations, but a retention policy and an annual review cadence sits outside this taxonomy.

---

## 8. Future additions

The structure should evolve, not be re-invented. Two rules for adding folders:

1. **Top-level additions need Roger's sign-off.** A ninth top-level folder is a significant change to how the venue thinks about its work. Don't add one in passing.
2. **Subfolder additions are at the editor's discretion.** A new supplier under `07 Suppliers/Beer & Beverages/`, a new campaign under `02 Marketing/Campaigns/`, a new month under `08 Photography Library/01 Master Library/` — fine, just follow the naming conventions in section 5.

A folder named *Misc*, *Other*, or *To sort later* is a smell. If something doesn't fit, the conversation is "where does this belong?", not "let's create a junk drawer."

Quarterly review of the structure starts in Sprint 5 (or whenever Q1 of BAU operations rolls around). Cull empty folders, rename anything that has drifted, log changes in a `00 README.md` at the root of the Shared Drive.

---

## 9. Roger's sign-off

For Roger's tick when reviewing:

- ☐ Shared Drive name **Beercade Australia** is fine (or suggest alternative)
- ☐ Eight-folder top level as above
- ☐ Photography Library as its own top-level
- ☐ Finance and Legal split into a separate **Beercade Confidential** Shared Drive
- ☐ Permission model: Roger + consultant on both; team on the main drive only
- ☐ Migration plan in section 6 — go for it on Day 3
