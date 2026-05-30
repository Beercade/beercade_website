# Machine seed — Venom, The Addams Family, Godzilla LE, KISS

Four pinball listings for the machines page. The page renders from Sanity `machine`
documents; until these exist it shows the "Machines loading…" placeholder.

## Import

Run from the repo root (`Beercade_website/`), where `sanity.cli.ts` sets the
project (`pd409r0v`) and dataset (`production`):

```bash
npx sanity dataset import ./seed/machines.ndjson production --replace
```

`--replace` makes it idempotent — re-running upserts by `_id` rather than duplicating.

Auth: if you're already logged in (`npx sanity login`) it just works. Otherwise pass a
token that can write — the `SANITY_API_WRITE_TOKEN` from `.env.local`:

```bash
npx sanity dataset import ./seed/machines.ndjson production --replace --token "$SANITY_API_WRITE_TOKEN"
```

The importer uploads `placeholder-floor.png` as the image asset for all four docs at
import time (that's what the `_sanityAsset` reference does).

## The photo is a TEMPORARY placeholder

`photo` is a required field, so every doc needs an image to validate and to keep
`MachineCard` from breaking on `urlFor(photo)`. No per-machine photos exist yet — these
four all point at one real wide floor shot (`placeholder-floor.png`) as a stand-in.

**Swap in real close-ups from the Day 9 / Day 16 staff shoots before public launch.**
In the studio: open each machine → replace the Photo → rewrite the alt text to describe
that specific machine (e.g. "Godzilla LE playfield with multiball lit"). The brand guide
wants real-venue, photographed-close shots, not a shared wide room shot.

## What OPDB will and won't do

The nightly OPDB cron (`/api/cron/opdb-sync`, 16:30 daily) only enriches
`manufacturer` and `year` on machines that already exist. It never creates docs and
never touches name/type/status/photo/description. Manufacturer and year are already set
here by hand, so the page is correct immediately.

The OPDB matcher is strict — it links a machine only when exactly one typeahead row
matches the name case-insensitively. So:

- **The Addams Family** — likely resolves.
- **Godzilla LE**, **KISS**, **Venom** — OPDB's canonical titles are "Godzilla
  (Premium/LE)", "Kiss (Pro/Premium/LE)", "Venom (Pro/Premium/LE)", so these will land
  in the sync's `unresolved` list and keep their hand-set manufacturer/year. That's fine.
  If you want them linked, paste the OPDB id into the (read-only by default) `opdbId`
  field, or rename to the canonical title.

## Listings at a glance

| Machine | Type | Maker | Year | Featured |
|---|---|---|---|---|
| Godzilla LE | pinball | Stern Pinball | 2021 | yes |
| The Addams Family | pinball | Bally | 1992 | no |
| Venom | pinball | Stern Pinball | 2023 | no |
| KISS | pinball | Stern Pinball | 2015 | no |
