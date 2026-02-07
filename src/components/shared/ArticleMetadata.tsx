import { Clock, Eye } from "lucide-react";
import { formatRelativeTime, formatReadingTime, formatViews } from "@/lib/format";
import type { Article } from "@/types/article";

interface ArticleMetadataProps {
  article: Article;
  showViews?: boolean;
  showReadingTime?: boolean;
  className?: string;
}

export function ArticleMetadata({
  article,
  showViews = false,
  showReadingTime = true,
  className = "",
}: ArticleMetadataProps) {
  return (
    <div className={`flex items-center gap-3 text-xs text-muted-foreground ${className}`}>
      <span>{formatRelativeTime(article.publishedAt)}</span>
      {showReadingTime && (
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {formatReadingTime(article.readingTime)}
        </span>
      )}
      {showViews && (
        <span className="flex items-center gap-1">
          <Eye className="h-3 w-3" />
          {formatViews(article.views)}
        </span>
      )}
    </div>
  );
}
