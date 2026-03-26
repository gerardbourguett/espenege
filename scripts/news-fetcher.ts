/**
 * News Fetcher - WorldNews API → Sanity CMS
 * 
 * Fetches news from WorldNews API, categorizes, summarizes with AI,
 * and publishes to Sanity CMS.
 * 
 * Usage: npx ts-node scripts/news-fetcher.ts
 * Usage (dry run): WORLDNEWS_DRY_RUN=true npx ts-node scripts/news-fetcher.ts
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@sanity/client";
import { categorize, type Category } from "./categorizer";
import { summarize } from "./summarizer";

// Sanity client
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

// Types
interface WorldNewsArticle {
  id: number;
  title: string;
  text: string;
  url: string;
  image: string | null;
  video: string | null;
  publish_date: string;
  author: string | null;
  authors: string[] | null;
  language: string;
  source_country: string;
}

interface WorldNewsResponse {
  offset: number;
  number: number;
  available: number;
  news: WorldNewsArticle[];
  tutorials?: unknown[];
}

// Config
const WORLDNEWS_API_KEY = process.env.WORLDNEWS_API_KEY;
const FETCH_COUNT = parseInt(process.env.WORLDNEWS_FETCH_COUNT || "20");
const DRY_RUN = process.env.WORLDNEWS_DRY_RUN === "true";

// Known category slugs in Sanity
const CATEGORY_SLUGS: Record<Category, string> = {
  nacional: "nacional",
  internacional: "internacional",
  deportiva: "deportiva"
};

// Default author/document IDs (we'll create these if they don't exist)
const DEFAULT_AUTHOR = {
  name: "Equipo SPNG",
  slug: "equipo-spng"
};

// Slug generator
function generateSlug(text: string, id: number): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 60);
  return `${base}-${id}`;
}

// Get or create author document
async function getOrCreateAuthor(): Promise<string> {
  const query = `*[_type == "author" && slug.current == $slug][0]._id`;
  const existingId = await sanity.fetch<string>(query, { slug: DEFAULT_AUTHOR.slug });

  if (existingId) {
    console.log(`[author] Using existing: ${DEFAULT_AUTHOR.name} (${existingId})`);
    return existingId;
  }

  // Create author
  const doc = {
    _type: "author",
    name: DEFAULT_AUTHOR.name,
    slug: { _type: "slug", current: DEFAULT_AUTHOR.slug },
    bio: "Contenido agregado automáticamente por SPNG Media",
    image: null
  };

  const result = await sanity.create(doc) as { _id: string };
  const id = result._id;
  console.log(`[author] Created: ${DEFAULT_AUTHOR.name} (${id})`);
  return id;
}

// Get or create category document
async function getOrCreateCategory(category: Category): Promise<string> {
  const slug = CATEGORY_SLUGS[category];
  const query = `*[_type == "category" && slug.current == $slug][0]._id`;
  const existingId = await sanity.fetch<string>(query, { slug });

  if (existingId) {
    console.log(`[category] Using existing: ${category} (${existingId})`);
    return existingId;
  }

  // Create category
  const categoryNames: Record<Category, string> = {
    nacional: "Nacional",
    internacional: "Internacional",
    deportiva: "Deportiva"
  };

  const doc = {
    _type: "category",
    name: categoryNames[category],
    slug: { _type: "slug", current: slug },
    description: `Noticias ${categoryNames[category].toLowerCase()} de Chile y el mundo`,
    color: category === "deportiva" ? "#00ff00" : category === "nacional" ? "#0000ff" : "#ff0000"
  };

  const result = await sanity.create(doc) as { _id: string };
  const id = result._id;
  console.log(`[category] Created: ${category} (${id})`);
  return id;
}

// Check if article already exists (deduplication)
async function articleExists(worldNewsId: string): Promise<boolean> {
  const query = `*[_type == "article" && worldNewsId == $id][0]._id`;
  const existingId = await sanity.fetch<string | null>(query, { id: worldNewsId.toString() });
  return existingId !== null;
}

// Create article in Sanity
async function createArticle(
  article: WorldNewsArticle,
  categoryId: string,
  authorId: string,
  summary: string
): Promise<string> {
  const slug = generateSlug(article.title, article.id);
  const readingTime = Math.max(1, Math.ceil(article.text.length / 1000));

  // Build content blocks from original text
  const content = article.text;

  const doc = {
    _type: "article",
    title: article.title,
    slug: { _type: "slug", current: slug },
    excerpt: summary,
    content: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: content }]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [{
          _type: "span",
          text: `Fuente: ${article.author || "Desconocido"} | ${article.url}`
        }]
      }
    ],
    category: { _type: "reference", _ref: categoryId },
    author: { _type: "reference", _ref: authorId },
    publishedAt: new Date(article.publish_date).toISOString(),
    readingTime,
    worldNewsId: article.id.toString(),
    originalUrl: article.url,
    originalAuthor: article.author || "Desconocido",
    isFeatured: false,
    isBreaking: false,
    views: 0
  };

  const result = await sanity.create(doc) as { _id: string };
  const id = result._id;
  console.log(`[article] Created: "${article.title.substring(0, 50)}..." → ${id}`);
  return id;
}

// Fetch from WorldNews API
async function fetchWorldNews(): Promise<WorldNewsArticle[]> {
  if (!WORLDNEWS_API_KEY) {
    throw new Error("WORLDNEWS_API_KEY not configured");
  }

  const url = `https://api.worldnewsapi.com/search-news?source-country=cl&language=es&number=${FETCH_COUNT}&api-key=${WORLDNEWS_API_KEY}`;

  console.log(`[worldnews] Fetching from: ${url.replace(WORLDNEWS_API_KEY!, "***")}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`WorldNews API error: ${response.status} ${response.statusText}`);
  }

  const data: WorldNewsResponse = await response.json();
  console.log(`[worldnews] Received ${data.news.length} articles (available: ${data.available})`);

  return data.news;
}

// Main
async function main() {
  console.log("=".repeat(60));
  console.log("SPNG Media - News Fetcher");
  console.log(`Dry run: ${DRY_RUN}`);
  console.log("=".repeat(60));

  const startTime = Date.now();

  try {
    // Setup: get/create default author and categories
    console.log("\n[setup] Initializing author and categories...");
    const authorId = await getOrCreateAuthor();
    const categoryIds: Record<Category, string> = {
      nacional: await getOrCreateCategory("nacional"),
      internacional: await getOrCreateCategory("internacional"),
      deportiva: await getOrCreateCategory("deportiva")
    };

    // Fetch news
    console.log("\n[fetch] Fetching from WorldNews...");
    const articles = await fetchWorldNews();

    // Process
    let processed = 0;
    let skipped = 0;
    let errors = 0;
    const results: Array<{ title: string; status: "published" | "skipped" | "error"; category?: Category; error?: string }> = [];

    for (const article of articles) {
      processed++;

      try {
        // Skip non-Spanish articles
        if (article.language !== "es") {
          console.log(`[skip] Article ${article.id}: not Spanish (${article.language})`);
          skipped++;
          results.push({ title: article.title, status: "skipped", error: "not Spanish" });
          continue;
        }

        // Deduplication check
        if (await articleExists(article.id.toString())) {
          console.log(`[skip] Article ${article.id}: already exists (duplicate)`);
          skipped++;
          results.push({ title: article.title, status: "skipped", error: "duplicate" });
          continue;
        }

        // Categorize
        const { category } = categorize(article.title, article.text);
        console.log(`[categorize] "${article.title.substring(0, 40)}..." → ${category}`);

        // Summarize
        console.log(`[summarize] Generating summary for article ${article.id}...`);
        const { summary, success } = await summarize(article.text);
        console.log(`[summarize] ${success ? "✅" : "⚠️"} Summary: ${summary.substring(0, 50)}...`);

        // Create in Sanity
        if (!DRY_RUN) {
          await createArticle(article, categoryIds[category], authorId, summary);
        } else {
          console.log(`[dry-run] Would create: "${article.title.substring(0, 50)}..." → ${category}`);
        }

        results.push({ title: article.title, status: "published", category });

        // Rate limiting - be nice to APIs
        await new Promise(r => setTimeout(r, 500));

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error(`[error] Article ${article.id}: ${errorMessage}`);
        errors++;
        results.push({ title: article.title, status: "error", error: errorMessage });
      }
    }

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log("\n" + "=".repeat(60));
    console.log("SUMMARY");
    console.log("=".repeat(60));
    console.log(`Total processed: ${processed}`);
    console.log(`Published: ${processed - skipped - errors}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Errors: ${errors}`);
    console.log(`Duration: ${duration}s`);
    console.log("=".repeat(60));

    process.exit(errors > 0 ? 1 : 0);

  } catch (err) {
    console.error("[fatal]", err);
    process.exit(1);
  }
}

main();
