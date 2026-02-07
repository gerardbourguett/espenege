import Link from "next/link";
import type { Article } from "@/types/article";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { formatRelativeTime } from "@/lib/format";

interface NewsCardHorizontalProps {
  article: Article;
}

export function NewsCardHorizontal({ article }: NewsCardHorizontalProps) {
  return (
    <article className="group flex gap-4 py-3">
      <Link
        href={`/articulo/${article.slug}`}
        className="relative shrink-0 w-28 h-20 md:w-36 md:h-24 rounded-lg overflow-hidden"
      >
        <ImageWithFallback
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col justify-center min-w-0 group-hover:translate-x-1 transition-transform">
        <CategoryBadge category={article.category} size="sm" />
        <Link href={`/articulo/${article.slug}`}>
          <h3 className="text-sm font-bold mt-1 line-clamp-2 leading-snug group-hover:text-spng-accent transition-colors">
            {article.title}
          </h3>
        </Link>
        <span className="text-xs text-spng-muted mt-1">
          {formatRelativeTime(article.publishedAt)}
        </span>
      </div>
    </article>
  );
}
