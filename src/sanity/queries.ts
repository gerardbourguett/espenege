import { groq } from "next-sanity";

const articleFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  "category": category->slug.current,
  "author": author->{name, "avatar": avatar.asset->url, role},
  "publishedAt": publishedAt,
  "updatedAt": _updatedAt,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  readingTime,
  isFeatured,
  isBreaking,
  views,
  tags
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0]{
    ${articleFields}
  }
`;

export const articlesByCategoryQuery = groq`
  *[_type == "article" && category->slug.current == $category] | order(publishedAt desc){
    ${articleFields}
  }
`;

export const featuredArticlesQuery = groq`
  *[_type == "article" && isFeatured == true] | order(publishedAt desc){
    ${articleFields}
  }
`;

export const mostReadArticlesQuery = groq`
  *[_type == "article"] | order(views desc)[0...$limit]{
    ${articleFields}
  }
`;

export const latestArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc)[0...$limit]{
    ${articleFields}
  }
`;

export const relatedArticlesQuery = groq`
  *[_type == "article" && category->slug.current == $category && slug.current != $slug] | order(publishedAt desc)[0...$limit]{
    ${articleFields}
  }
`;

export const breakingNewsQuery = groq`
  *[_type == "article" && isBreaking == true] | order(publishedAt desc){
    ${articleFields}
  }
`;

export const allArticleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const searchArticlesQuery = groq`
  *[_type == "article" && (title match $q || excerpt match $q || $q in tags)] | order(publishedAt desc)[0...20]{
    ${articleFields}
  }
`;

export const articlesByTagQuery = groq`
  *[_type == "article" && $tag in tags] | order(publishedAt desc){
    ${articleFields}
  }
`;
