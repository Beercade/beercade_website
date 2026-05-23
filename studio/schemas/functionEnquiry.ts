import { defineType, defineField } from "sanity";

export default defineType({
  name: "functionEnquiry",
  title: "Function enquiry",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "submittedAt", title: "Submitted at", type: "datetime" }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "groupSize", title: "Group size", type: "number" }),
    defineField({ name: "preferredDate", title: "Preferred date", type: "date" }),
    defineField({
      name: "preferredTime",
      title: "Preferred time window",
      type: "string",
    }),
    defineField({ name: "occasion", title: "Occasion", type: "string" }),
    defineField({
      name: "machinePreference",
      title: "Machine preference",
      type: "string",
    }),
    defineField({
      name: "drinksStyle",
      title: "Drinks style",
      type: "string",
      options: { list: ["bar-tab", "cash-bar", "mixed"] },
    }),
    defineField({ name: "food", title: "Food required", type: "boolean" }),
    defineField({ name: "notes", title: "Notes", type: "text", rows: 4 }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Replied", value: "replied" },
          { title: "Quoted", value: "quoted" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Lost", value: "lost" },
        ],
      },
    }),
    defineField({
      name: "calendarEventId",
      title: "Calendar event ID",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "submittedAt", status: "status" },
    prepare: ({ title, subtitle, status }) => ({
      title,
      subtitle: `${new Date(subtitle).toLocaleDateString("en-AU")} · ${status}`,
    }),
  },
});
