import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuracion del Sitio",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre del sitio",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripcion",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "url",
      title: "URL del sitio",
      type: "url",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
    }),
    defineField({
      name: "socialLinks",
      title: "Redes sociales",
      type: "object",
      fields: [
        { name: "twitter", title: "Twitter/X", type: "url" },
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
      ],
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});
