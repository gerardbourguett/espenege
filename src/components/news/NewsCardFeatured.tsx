import Link from "next/link";
import type { Article } from "@/types/article";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { formatRelativeTime } from "@/lib/format";

interface NewsCardFeaturedProps {
  article: Article;
  priority?: boolean;
}

export function NewsCardFeatured({ article, priority }: NewsCardFeaturedProps) {
  return (
    <Link
      href={`/articulo/${article.slug}`}
      className="group relative block overflow-hidden rounded-xl aspect-[4/3] md:aspect-[16/10] border-b-2 border-spng-accent"
    >
      <ImageWithFallback
        src={article.imageUrl}
        alt={article.imageAlt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={priority}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
        <CategoryBadge category={article.category} linked={false} />
        <h3 className="font-serif text-xl md:text-3xl font-bold text-white mt-2 mb-2 line-clamp-3 leading-tight group-hover:text-spng-accent transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-white/80 line-clamp-2 hidden md:block mb-2">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span>{article.author.name}</span>
          <span>&middot;</span>
          <span>{formatRelativeTime(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
