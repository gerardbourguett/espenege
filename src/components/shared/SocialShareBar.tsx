"use client";

import { Facebook, Twitter, Link as LinkIcon, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareBarProps {
  title: string;
  vertical?: boolean;
}

export function SocialShareBar({ title, vertical = false }: SocialShareBarProps) {
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div
      className={`flex ${vertical ? "flex-col" : "flex-row"} gap-2`}
    >
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        aria-label="Compartir en Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        aria-label="Compartir en Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={handleCopyLink}
        aria-label="Copiar enlace"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 sm:hidden"
        aria-label="Compartir"
        onClick={() => {
          if (typeof navigator !== "undefined" && navigator.share) {
            navigator.share({ title, url: window.location.href });
          }
        }}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
