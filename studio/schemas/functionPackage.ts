import { defineType, defineField } from "sanity";

export default defineType({
  name: "functionPackage",
  title: "Function package",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Package name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "minHeads", title: "Minimum heads", type: "number" }),
    defineField({ name: "maxHeads", title: "Maximum heads", type: "number" }),
    defineField({
      name: "pricePerHead",
      title: "Price per head (AUD, indicative)",
      type: "number",
    }),
    defineField({ name: "duration", title: "Duration (hours)", type: "number" }),
    defineField({
      name: "inclusions",
      title: "Inclusions",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "machinesIncluded",
      title: "Machines included",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
});
