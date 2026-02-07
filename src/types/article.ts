/**
 * Article and Content Type Definitions
 * SPNG Media News Portal
 */

/**
 * Available category slugs for article classification
 */
export type CategorySlug =
  | "nacional"
  | "internacional"
  | "deportiva"
  | "electoral"
  | "popurri"
  | "no-somos-nada";

/**
 * Author information for articles
 */
export interface Author {
  /** Full name of the author */
  name: string;
  /** Avatar image URL or path */
  avatar: string;
  /** Optional role/title of the author */
  role?: string;
}

/**
 * Main article interface representing a news article
 */
export interface Article {
  /** Unique identifier for the article */
  id: string;
  /** URL-friendly slug for routing */
  slug: string;
  /** Article headline/title */
  title: string;
  /** Brief summary or preview text */
  excerpt: string;
  /** Full HTML content for prose rendering */
  content: string;
  /** Category classification */
  category: CategorySlug;
  /** Article author information */
  author: Author;
  /** Publication date in ISO format */
  publishedAt: string;
  /** Last update date in ISO format (optional) */
  updatedAt?: string;
  /** Featured image URL */
  imageUrl: string;
  /** Alt text for the featured image */
  imageAlt: string;
  /** Estimated reading time in minutes */
  readingTime: number;
  /** Whether article is featured on homepage */
  isFeatured?: boolean;
  /** Whether article is breaking news */
  isBreaking?: boolean;
  /** Number of article views */
  views: number;
  /** Article tags for filtering and search */
  tags: string[];
}

/**
 * Category metadata for navigation and display
 */
export interface Category {
  /** Category identifier matching CategorySlug */
  slug: CategorySlug;
  /** Display name for the category */
  name: string;
  /** Category description for SEO and display */
  description: string;
  /** Tailwind color class (e.g., "blue-600") or hex color */
  color: string;
}
