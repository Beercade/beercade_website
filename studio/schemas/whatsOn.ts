import { defineType, defineField } from "sanity";

export default defineType({
  name: "whatsOn",
  title: "What's on (standing nights)",
  type: "document",
  fields: [
    defineField({
      name: "dayOfWeek",
      title: "Day",
      type: "string",
      options: { list: ["Wed", "Thu", "Fri", "Sat", "Sun"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "photo",
      title: "Photo",
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
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
});
