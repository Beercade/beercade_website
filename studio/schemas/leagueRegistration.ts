import { defineType, defineField } from "sanity";

// One document per finals signup. Created (status "pending") when a player
// starts a Square checkout; flipped to "paid" by the Square webhook on a
// confirmed payment. This is the source of truth for the TD's door check-in
// list — Match Play registration is secondary.
//
// Add `leagueRegistration` to studio/schemas/index.ts.
// Set the studio document list for this type to read-only for Editors if you
// don't want staff editing payment records by hand (recommended).

export default defineType({
  name: "leagueRegistration",
  title: "League registration",
  type: "document",
  fields: [
    defineField({ name: "playerName", title: "Player name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (r) => r.required().email() }),
    defineField({ name: "ifpaNumber", title: "IFPA number (optional)", type: "string" }),
    defineField({ name: "event", title: "Event", type: "reference", to: [{ type: "event" }] }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "pending",
      options: {
        list: [
          { title: "Pending payment", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Refunded", value: "refunded" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    }),
    defineField({ name: "amountAud", title: "Amount (AUD)", type: "number" }),
    defineField({ name: "squarePaymentLinkId", title: "Square payment link id", type: "string", readOnly: true }),
    defineField({ name: "squareOrderId", title: "Square order id", type: "string", readOnly: true }),
    defineField({ name: "squarePaymentId", title: "Square payment id", type: "string", readOnly: true }),
    defineField({ name: "matchplayRegistered", title: "Registered in Match Play", type: "boolean", initialValue: false, readOnly: true }),
    defineField({ name: "createdAt", title: "Created", type: "datetime", readOnly: true }),
    defineField({ name: "paidAt", title: "Paid", type: "datetime", readOnly: true }),
  ],
  orderings: [
    { title: "Newest first", name: "createdDesc", by: [{ field: "createdAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "playerName", subtitle: "status" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `Finals · ${subtitle}` }),
  },
});
