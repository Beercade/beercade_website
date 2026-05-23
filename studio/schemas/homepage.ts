import { defineType, defineField } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroVideoUrl",
      title: "Hero video (muted loop, mp4/webm)",
      type: "url",
    }),
    defineField({
      name: "heroPoster",
      title: "Hero poster image",
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
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string" }),
    defineField({ name: "heroSubline", title: "Hero subline", type: "string" }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA label",
      type: "string",
      initialValue: "BOOK A FUNCTION",
    }),
    defineField({
      name: "primaryCtaTarget",
      title: "Primary CTA target",
      type: "string",
      initialValue: "/functions",
    }),
    defineField({
      name: "featuredMachines",
      title: "Featured machines",
      type: "array",
      of: [{ type: "reference", to: [{ type: "machine" }] }],
    }),
    defineField({
      name: "featuredEvents",
      title: "Featured events",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
    }),
  ],
});
