import Link from "next/link";
import type { Article } from "@/types/article";
import { formatRelativeTime } from "@/lib/format";

interface NewsCardCompactProps {
  article: Article;
  index?: number;
}

export function NewsCardCompact({ article, index }: NewsCardCompactProps) {
  return (
    <article className="group flex items-start gap-3 py-3 border-b border-spng-border last:border-0">
      {typeof index === "number" && (
        <span className="text-2xl font-serif font-bold text-spng-accent/40 shrink-0 w-8 text-center">
          {index + 1}
        </span>
      )}
      <div className="min-w-0">
        <Link href={`/articulo/${article.slug}`}>
          <h3 className="text-sm font-semibold line-clamp-2 leading-snug group-hover:text-spng-accent transition-colors duration-200">
            {article.title}
          </h3>
        </Link>
        <span className="text-xs text-spng-muted mt-0.5 block">
          {formatRelativeTime(article.publishedAt)}
        </span>
      </div>
    </article>
  );
}
