"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg top-[20%] translate-y-0">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Buscar noticias</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Escribe para buscar..."
            className="pl-10 text-base"
            autoFocus
          />
        </div>
        <p className="text-sm text-muted-foreground text-center py-8">
          La busqueda estara disponible proximamente.
        </p>
      </DialogContent>
    </Dialog>
  );
}
