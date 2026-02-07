import type { CategorySlug } from "@/types/article";

export const SITE_NAME = "SPNG Media";

export const CATEGORY_SLUGS: CategorySlug[] = [
  "nacional",
  "internacional",
  "deportiva",
  "electoral",
  "popurri",
  "no-somos-nada",
];

export const ARTICLES_PER_PAGE = 9;

export const CATEGORY_COLOR_MAP: Record<CategorySlug, string> = {
  nacional: "bg-cat-nacional",
  internacional: "bg-cat-internacional",
  deportiva: "bg-cat-deportiva",
  electoral: "bg-cat-electoral",
  popurri: "bg-cat-popurri",
  "no-somos-nada": "bg-cat-no-somos-nada",
};

export const CATEGORY_TEXT_COLOR_MAP: Record<CategorySlug, string> = {
  nacional: "text-cat-nacional",
  internacional: "text-cat-internacional",
  deportiva: "text-cat-deportiva",
  electoral: "text-cat-electoral",
  popurri: "text-cat-popurri",
  "no-somos-nada": "text-cat-no-somos-nada",
};
