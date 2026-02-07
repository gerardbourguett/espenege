/**
 * Seed script for Sanity CMS
 *
 * Run with: npx tsx src/sanity/seed.ts
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * and SANITY_API_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import { articles } from "../data/articles";
import { categories } from "../data/categories";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

// Unique authors from articles
const uniqueAuthors = Array.from(
  new Map(articles.map((a) => [a.author.name, a.author])).values()
);

async function seed() {
  console.log("Seeding Sanity CMS...");

  // 1. Create categories
  console.log("Creating categories...");
  const categoryRefs: Record<string, string> = {};
  for (const cat of categories) {
    const doc = await client.createOrReplace({
      _id: `category-${cat.slug}`,
      _type: "category",
      name: cat.name,
      slug: { _type: "slug", current: cat.slug },
      description: cat.description,
      color: cat.color,
    });
    categoryRefs[cat.slug] = doc._id;
    console.log(`  Created category: ${cat.name}`);
  }

  // 2. Create authors
  console.log("Creating authors...");
  const authorRefs: Record<string, string> = {};
  for (const author of uniqueAuthors) {
    const slug = author.name.toLowerCase().replace(/\s+/g, "-");
    const doc = await client.createOrReplace({
      _id: `author-${slug}`,
      _type: "author",
      name: author.name,
      slug: { _type: "slug", current: slug },
      role: author.role || "",
    });
    authorRefs[author.name] = doc._id;
    console.log(`  Created author: ${author.name}`);
  }

  // 3. Create articles
  console.log("Creating articles...");
  for (const article of articles) {
    await client.createOrReplace({
      _id: `article-${article.slug}`,
      _type: "article",
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      excerpt: article.excerpt,
      content: [
        {
          _type: "block",
          _key: `block-${article.id}`,
          style: "normal",
          children: [
            {
              _type: "span",
              _key: `span-${article.id}`,
              text: article.content.replace(/<[^>]*>/g, "").trim(),
            },
          ],
        },
      ],
      category: { _type: "reference", _ref: categoryRefs[article.category] },
      author: { _type: "reference", _ref: authorRefs[article.author.name] },
      publishedAt: article.publishedAt,
      readingTime: article.readingTime,
      isFeatured: article.isFeatured || false,
      isBreaking: article.isBreaking || false,
      views: article.views,
      tags: article.tags,
    });
    console.log(`  Created article: ${article.title.substring(0, 50)}...`);
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
