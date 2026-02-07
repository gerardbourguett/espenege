import { getLatestArticles } from "@/lib/dal";
import { siteConfig } from "@/data/site-config";
import { categories } from "@/data/categories";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getLatestArticles(50);

  const categoryMap = Object.fromEntries(
    categories.map((c) => [c.slug, c.name])
  );

  const items = articles
    .map(
      (article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${siteConfig.url}/articulo/${article.slug}</link>
      <description>${escapeXml(article.excerpt)}</description>
      <category>${escapeXml(categoryMap[article.category] || article.category)}</category>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteConfig.url}/articulo/${article.slug}</guid>
      <dc:creator>${escapeXml(article.author.name)}</dc:creator>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>es-CL</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
