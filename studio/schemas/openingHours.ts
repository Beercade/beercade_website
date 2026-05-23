import { defineType, defineField } from "sanity";

export default defineType({
  name: "openingHours",
  title: "Opening hours",
  type: "document",
  fields: [
    defineField({
      name: "weeklyHours",
      title: "Weekly hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              title: "Day",
              type: "string",
              options: { list: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
            },
            {
              name: "open",
              title: "Open",
              type: "string",
              description: "24h e.g. 17:00; leave blank if closed",
            },
            {
              name: "close",
              title: "Close",
              type: "string",
              description: "24h e.g. 00:00 (next day)",
            },
            {
              name: "closed",
              title: "Closed all day",
              type: "boolean",
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: "exceptions",
      title: "Exceptions (public holidays etc.)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "date", title: "Date", type: "date" },
            { name: "open", title: "Open", type: "string" },
            { name: "close", title: "Close", type: "string" },
            {
              name: "closed",
              title: "Closed",
              type: "boolean",
              initialValue: false,
            },
            {
              name: "reason",
              title: "Reason (internal note)",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
});
