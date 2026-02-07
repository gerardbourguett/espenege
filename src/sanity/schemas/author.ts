import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Autor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "role",
      title: "Rol",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Biografia",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" },
  },
});
