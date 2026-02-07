import Link from "next/link";
import type { CategorySlug } from "@/types/article";
import { getCategoryBySlug } from "@/data/categories";

interface CategoryBadgeProps {
  category: CategorySlug;
  linked?: boolean;
  size?: "sm" | "md";
}

export function CategoryBadge({ category, linked = true, size = "sm" }: CategoryBadgeProps) {
  const cat = getCategoryBySlug(category);
  if (!cat) return null;

  const classes = `inline-block font-medium uppercase tracking-wider text-white rounded-full ${
    size === "sm" ? "text-[10px] px-3 py-0.5" : "text-xs px-3.5 py-1"
  }`;

  if (linked) {
    return (
      <Link
        href={`/${category}`}
        className={classes}
        style={{ backgroundColor: cat.color }}
      >
        {cat.name}
      </Link>
    );
  }

  return (
    <span className={classes} style={{ backgroundColor: cat.color }}>
      {cat.name}
    </span>
  );
}
