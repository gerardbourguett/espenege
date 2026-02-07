import { Category, CategorySlug } from "@/types/article";

export const categories: Category[] = [
  {
    slug: "nacional",
    name: "Nacional",
    description: "Noticias de Chile, politica y sociedad",
    color: "#2563eb",
  },
  {
    slug: "internacional",
    name: "Internacional",
    description: "Noticias del mundo y asuntos globales",
    color: "#7c3aed",
  },
  {
    slug: "deportiva",
    name: "Deportiva",
    description: "Lo mejor del deporte nacional e internacional",
    color: "#16a34a",
  },
  {
    slug: "electoral",
    name: "Electoral",
    description: "Elecciones, partidos politicos y campanas",
    color: "#dc2626",
  },
  {
    slug: "popurri",
    name: "Popurri",
    description: "Entretenimiento, cultura y variedad",
    color: "#ea580c",
  },
  {
    slug: "no-somos-nada",
    name: "No Somos Nada",
    description: "Las noticias mas curiosas e increibles",
    color: "#ec4899",
  },
];

/**
 * Map category slug to its color for quick access
 */
export const categoryColorMap: Record<string, string> = {
  nacional: "#2563eb",
  internacional: "#7c3aed",
  deportiva: "#16a34a",
  electoral: "#dc2626",
  popurri: "#ea580c",
  "no-somos-nada": "#ec4899",
};

/**
 * Helper function to get category metadata by slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}
