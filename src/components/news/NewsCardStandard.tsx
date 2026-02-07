import Link from "next/link";
import type { Article } from "@/types/article";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { ArticleMetadata } from "@/components/shared/ArticleMetadata";

interface NewsCardStandardProps {
  article: Article;
}

export function NewsCardStandard({ article }: NewsCardStandardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-spng-border bg-white hover:shadow-lg hover:shadow-black/5 hover:border-spng-accent/30 transition-all duration-300">
      <Link
        href={`/articulo/${article.slug}`}
        className="relative aspect-[16/9] overflow-hidden"
      >
        <ImageWithFallback
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col flex-1 p-4">
        <CategoryBadge category={article.category} size="sm" />
        <Link href={`/articulo/${article.slug}`}>
          <h3 className="font-serif text-lg font-bold mt-2 mb-1 line-clamp-2 leading-snug group-hover:text-spng-accent transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-sm text-spng-muted line-clamp-2 mb-3 flex-1">
          {article.excerpt}
        </p>
        <ArticleMetadata article={article} />
      </div>
    </article>
  );
}
