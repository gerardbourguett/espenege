"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        aria-label="Pagina anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="icon"
          className={page === currentPage ? "bg-spng-primary text-white hover:bg-spng-primary/90" : "hover:border-spng-accent hover:text-spng-accent"}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        aria-label="Pagina siguiente"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
