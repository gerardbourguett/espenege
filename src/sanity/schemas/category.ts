import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Categoria",
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
      name: "description",
      title: "Descripcion",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "color",
      title: "Color (hex)",
      type: "string",
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, { name: "hex color" }),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current" },
  },
});
