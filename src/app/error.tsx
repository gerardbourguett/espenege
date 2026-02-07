"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-spng-alert/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-spng-alert" />
          </div>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-spng-primary mb-4">
          Algo salio mal
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Ocurrio un error inesperado. Por favor intenta de nuevo o vuelve al inicio.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={reset} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reintentar
          </Button>
          <Button asChild>
            <Link href="/" className="gap-2">
              <Home className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
