import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Articulo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titulo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extracto",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Contenido",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Texto alternativo",
              type: "string",
            },
            {
              name: "caption",
              title: "Pie de foto",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagen destacada",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Texto alternativo",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicacion",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Tiempo de lectura (minutos)",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "isFeatured",
      title: "Destacado",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isBreaking",
      title: "Ultimo Momento",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "views",
      title: "Vistas",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "tags",
      title: "Etiquetas",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  orderings: [
    {
      title: "Fecha de publicacion (reciente)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category.name",
      media: "image",
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
});
