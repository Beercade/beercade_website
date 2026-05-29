import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero slides",
      description:
        "Add 3–5 images or videos. Images get a slow Ken Burns zoom. Videos play muted and loop.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "heroSlide",
          title: "Slide",
          fields: [
            defineField({
              name: "mediaType",
              title: "Media type",
              type: "string",
              options: {
                list: [
                  { title: "Image", value: "image" },
                  { title: "Video (URL)", value: "video" },
                ],
                layout: "radio",
              },
              initialValue: "image",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.mediaType !== "image",
              fields: [
                {
                  name: "alt",
                  title: "Alt text",
                  type: "string",
                  validation: (r) => r.required().min(4).max(120),
                },
              ],
            }),
            defineField({
              name: "videoUrl",
              title: "Video URL (mp4 or webm, hosted externally)",
              type: "url",
              hidden: ({ parent }) => parent?.mediaType !== "video",
            }),
          ],
          preview: {
            select: {
              mediaType: "mediaType",
              image: "image",
              videoUrl: "videoUrl",
            },
            prepare({ mediaType, image, videoUrl }) {
              return {
                title:
                  mediaType === "video"
                    ? `Video — ${videoUrl ?? "no URL"}`
                    : "Image",
                media: image,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Hero video (legacy — use Hero slides above instead)",
      type: "url",
    }),
    defineField({
      name: "heroPoster",
      title: "Hero poster image (legacy — use Hero slides above instead)",
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
