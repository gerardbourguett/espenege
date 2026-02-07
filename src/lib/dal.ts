/**
 * Data Access Layer (DAL)
 *
 * Provides data functions with the same signatures as the original mock helpers.
 * When NEXT_PUBLIC_SANITY_PROJECT_ID is set, fetches from Sanity CMS.
 * Otherwise, falls back to local mock data.
 */

import type { Article, CategorySlug } from "@/types/article";
import { toHTML } from "@portabletext/to-html";

const useSanity = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Dynamic imports to avoid loading Sanity client when not configured
async function getSanityClient() {
  const { client } = await import("@/sanity/client");
  return client;
}

async function getSanityQueries() {
  return import("@/sanity/queries");
}

async function getMockData() {
  return import("@/data/articles");
}

/**
 * Transform a Sanity document into the Article shape expected by components.
 * Converts _id -> id, Portable Text content -> HTML string, null -> defaults.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toArticle(doc: any): Article {
  if (!doc) return doc;
  return {
    id: doc._id || doc.id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt || "",
    content: Array.isArray(doc.content) ? toHTML(doc.content) : (doc.content || ""),
    category: doc.category,
    author: {
      name: doc.author?.name || "Redaccion",
      avatar: doc.author?.avatar || "/images/avatars/default.jpg",
      role: doc.author?.role,
    },
    publishedAt: doc.publishedAt,
    updatedAt: doc.updatedAt,
    imageUrl: doc.imageUrl || "/images/placeholder-hero.jpg",
    imageAlt: doc.imageAlt || doc.title || "",
    readingTime: doc.readingTime || 3,
    isFeatured: doc.isFeatured || false,
    isBreaking: doc.isBreaking || false,
    views: doc.views || 0,
    tags: doc.tags || [],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toArticles(docs: any[]): Article[] {
  return (docs || []).map(toArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  if (useSanity) {
    const client = await getSanityClient();
    const queries = await getSanityQueries();
    const doc = await client.fetch(queries.articleBySlugQuery, { slug });
    return doc ? toArticle(doc) : undefined;
  }
  const { getArticleBySlug } = await getMockData();
  return getArticleBySlug(slug);
}

export async function getArticlesByCategory(category: CategorySlug): Promise<Article[]> {
  if (useSanity) {
    const client = await getSanityClient();
    const queries = await getSanityQueries();
    const docs = await client.fetch(queries.articlesByCategoryQuery, { category });
    return toArticles(docs);
  }
  const { getArticlesByCategory } = await getMockData();
  return getArticlesByCategory(category);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  if (useSanity) {
    const client = await getSanityClient();
    const queries = await getSanityQueries();
    const docs = await client.fetch(queries.featuredArticlesQuery);
    return toArticles(docs);
  }
  const { getFeaturedArticles } = await getMockData();
  return getFeaturedArticles();
}

export async function getMostReadArticles(limit: number = 10): Promise<Article[]> {
  if (useSanity) {
    const client = await getSanityClient();
    const queries = await getSanityQueries();
    const docs = await client.fetch(queries.mostReadArticlesQuery, { limit });
    return toArticles(docs);
  }
  const { getMostReadArticles } = await getMockData();
  return getMostReadArticles(limit);
}

export async function getLatestArticles(limit: number = 10): Promise<Article[]> {
  if (useSanity) {
    const client = await getSanityClient();
    const queries = await getSanityQueries();
    const docs = await client.fetch(queries.latestArticlesQuery, { limit });
    return toArticles(docs);
  }
  const { getLatestArticles } = await getMockData();
  return getLatestArticles(limit);
}

export async function getRelatedArticles(article: Article, limit: number = 3): Promise<Article[]> {
  if (useSanity) {
    const client = await getSanityClient();
    const queries = await getSanityQueries();
    const docs = await client.fetch(queries.relatedArticlesQuery, {
      category: article.category,
      slug: article.slug,
      limit,
    });
    return toArticles(docs);
  }
  const { getRelatedArticles } = await getMockData();
  return getRelatedArticles(article, limit);
}

export async function getBreakingNews(): Promise<Article[]> {
  if (useSanity) {
    const client = await getSanityClient();
    const queries = await getSanityQueries();
    const docs = await client.fetch(queries.breakingNewsQuery);
    return toArticles(docs);
  }
  const { getBreakingNews } = await getMockData();
  return getBreakingNews();
}

export async function getAllArticles(): Promise<Article[]> {
  if (useSanity) {
    const client = await getSanityClient();
    const queries = await getSanityQueries();
    const docs = await client.fetch(queries.latestArticlesQuery, { limit: 100 });
    return toArticles(docs);
  }
  const { articles } = await getMockData();
  return articles;
}

export async function getAllArticleSlugs(): Promise<{ slug: string }[]> {
  if (useSanity) {
    const client = await getSanityClient();
    const queries = await getSanityQueries();
    return client.fetch(queries.allArticleSlugsQuery) ?? [];
  }
  const { articles } = await getMockData();
  return articles.map((a) => ({ slug: a.slug }));
}
