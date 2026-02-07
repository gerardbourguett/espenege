import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@/lib/dal";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json(
      { error: "La consulta debe tener al menos 2 caracteres" },
      { status: 400 }
    );
  }

  const articles = await searchArticles(q);

  const results = articles.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    imageUrl: a.imageUrl,
    publishedAt: a.publishedAt,
    tags: a.tags,
  }));

  return NextResponse.json({ results });
}
