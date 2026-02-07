"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, FileText, Tag } from "lucide-react";
import { categoryColorMap } from "@/data/categories";
import { formatRelativeTime } from "@/lib/format";

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  publishedAt: string;
  tags: string[];
}

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const POPULAR_TAGS = [
  "futbol",
  "politica",
  "educacion",
  "economia",
  "tecnologia",
  "clima",
  "elecciones",
  "medio-ambiente",
];

export function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchResults = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setHasSearched(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setHasSearched(false);
      setIsLoading(false);
      return;
    }
  }, [open]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      fetchResults(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, fetchResults]);

  function handleResultClick(slug: string) {
    onOpenChange(false);
    router.push(`/articulo/${slug}`);
  }

  function handleTagClick(tag: string) {
    onOpenChange(false);
    router.push(`/tag/${tag}`);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg top-[20%] translate-y-0 max-h-[70vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Buscar noticias</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Escribe para buscar..."
            className="pl-10 text-base"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="overflow-y-auto flex-1 -mx-6 px-6">
          {/* Empty state — no query */}
          {!query && !hasSearched && (
            <div className="py-6 text-center space-y-4">
              <div className="flex justify-center">
                <Search className="h-10 w-10 text-muted-foreground/30" />
              </div>
              <p className="text-sm text-muted-foreground">
                Escribe para buscar noticias
              </p>

              {/* Popular tags */}
              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-3 flex items-center justify-center gap-1.5">
                  <Tag className="h-3 w-3" />
                  Etiquetas populares
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="text-xs bg-spng-bg-secondary px-3 py-1.5 rounded-full text-spng-muted hover:bg-spng-accent/10 hover:text-spng-primary transition-colors cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="py-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-16 h-12 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {!isLoading && hasSearched && results.length === 0 && (
            <div className="py-8 text-center space-y-2">
              <FileText className="h-10 w-10 text-muted-foreground/30 mx-auto" />
              <p className="text-sm text-muted-foreground">
                No se encontraron resultados para &quot;{query}&quot;
              </p>
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <div className="py-2 space-y-1">
              <p className="text-xs text-muted-foreground mb-2">
                {results.length} resultado{results.length !== 1 ? "s" : ""}
              </p>
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.slug)}
                  className="flex gap-3 w-full text-left p-2 rounded-lg hover:bg-spng-bg-secondary transition-colors cursor-pointer"
                >
                  <div
                    className="w-1 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        categoryColorMap[result.category] ?? "#737373",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium leading-snug line-clamp-2">
                      {result.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="text-[10px] font-medium uppercase tracking-wider text-white rounded-full px-2 py-0.5"
                        style={{
                          backgroundColor:
                            categoryColorMap[result.category] ?? "#737373",
                        }}
                      >
                        {result.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(result.publishedAt)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
