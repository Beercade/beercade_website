import { defineType, defineField } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "kicker",
      title: "Kicker (one short line above title)",
      type: "string",
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Tournament", value: "tournament" },
          { title: "League", value: "league" },
          { title: "Date night package", value: "date-night" },
          { title: "Function takeover", value: "function" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({ name: "endDate", title: "End date", type: "datetime" }),
    defineField({
      name: "recurring",
      title: "Recurring schedule",
      type: "string",
      description: "e.g. Tuesdays and Thursdays for 4 weeks",
    }),
    defineField({
      name: "entry",
      title: "Entry detail",
      type: "string",
      description: "e.g. $40 covers all sessions",
    }),
    defineField({ name: "prize", title: "Prize detail", type: "string" }),
    defineField({
      name: "body",
      title: "Body copy",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      initialValue: "Reserve a spot",
    }),
    defineField({
      name: "ctaTarget",
      title: "CTA target",
      type: "string",
      options: {
        list: [
          { title: "Function enquiry form", value: "function-form" },
          { title: "External URL", value: "external" },
          { title: "Email functions@", value: "email-functions" },
        ],
      },
    }),
    defineField({
      name: "ctaUrl",
      title: "External URL (if applicable)",
      type: "url",
    }),
    defineField({
      name: "hero",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text (required)",
          type: "string",
          validation: (r) => r.required().min(4).max(120),
        },
      ],
    }),
    defineField({
      name: "machines",
      title: "Featured machines",
      type: "array",
      of: [{ type: "reference", to: [{ type: "machine" }] }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "upcoming",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "On now", value: "live" },
          { title: "Wrapped", value: "wrapped" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    }),
    // ── Square prepay switch (finals only) ──────────────────────────────────
    defineField({
      name: "prepayRequired",
      title: "Prepay required (Square)",
      type: "boolean",
      initialValue: false,
      description:
        "When on, the signup flow takes the entry fee through Square before registering the player. Leave off for bar-door nights.",
    }),
    defineField({
      name: "entryFeeAud",
      title: "Entry fee (AUD)",
      type: "number",
      initialValue: 15,
      description:
        "Amount charged at prepay. Includes the drink token per the Run of Show.",
    }),
    defineField({
      name: "matchplayTournamentId",
      title: "Match Play tournament id",
      type: "string",
      description:
        "The Match Play tournament this event maps to. Join key for standings and for post-payment registration.",
    }),
  ],
});
