import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/dal";
import { getCategoryBySlug } from "@/data/categories";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { SocialShareBar } from "@/components/shared/SocialShareBar";
import { RelatedArticles } from "@/components/news/RelatedArticles";
import { formatDate, formatReadingTime } from "@/lib/format";
import Link from "next/link";
import { Clock, User } from "lucide-react";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const cat = getCategoryBySlug(article.category);

  return (
    <article>
      {/* Hero image */}
      <div className="relative w-full aspect-[16/9] max-h-[500px] overflow-hidden bg-muted">
        <ImageWithFallback
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <BreadcrumbNav
          items={[
            ...(cat ? [{ label: cat.name, href: `/${article.category}` }] : []),
            { label: article.title },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8">
          {/* Share bar - desktop left */}
          <div className="hidden lg:flex justify-end pt-4">
            <div className="sticky top-24">
              <SocialShareBar title={article.title} vertical />
            </div>
          </div>

          {/* Article content */}
          <div className="max-w-[720px] w-full">
            {/* Header */}
            <header className="mb-8">
              <CategoryBadge category={article.category} size="md" />
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-spng-primary mt-4 mb-4 leading-tight">
                {article.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground border-y border-spng-border py-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground block">{article.author.name}</span>
                    {article.author.role && (
                      <span className="text-xs">{article.author.role}</span>
                    )}
                  </div>
                </div>
                <span>&middot;</span>
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                <span>&middot;</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {formatReadingTime(article.readingTime)}
                </span>
              </div>
            </header>

            {/* Body */}
            <div
              className="prose prose-lg prose-spng max-w-none prose-headings:font-serif prose-headings:text-spng-primary prose-a:text-spng-primary prose-a:underline prose-a:decoration-spng-accent prose-a:underline-offset-4 hover:prose-a:text-spng-accent"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-4 border-t border-spng-border">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="text-xs bg-spng-bg-secondary px-3 py-1.5 rounded-full text-spng-muted hover:bg-spng-accent/10 hover:text-spng-primary transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Share bar - mobile bottom */}
            <div className="lg:hidden mt-6 flex justify-center">
              <SocialShareBar title={article.title} />
            </div>
          </div>

          {/* Right spacer for desktop symmetry */}
          <div className="hidden lg:block" />
        </div>

        {/* Related articles */}
        <div className="mt-12 pt-8 border-t border-spng-border">
          <RelatedArticles article={article} />
        </div>
      </div>
    </article>
  );
}
