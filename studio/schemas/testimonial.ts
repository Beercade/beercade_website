import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({ name: "attribution", title: "Attribution", type: "string" }),
    defineField({
      name: "context",
      title: "Context",
      type: "string",
      description: "e.g. 30th birthday function, June 2026",
    }),
    defineField({
      name: "useOn",
      title: "Use on",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Homepage", value: "home" },
          { title: "Functions page", value: "functions" },
        ],
      },
    }),
  ],
});
