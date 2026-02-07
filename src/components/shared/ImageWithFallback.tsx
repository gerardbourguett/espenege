"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          "bg-muted flex items-center justify-center text-muted-foreground",
          fill && "absolute inset-0",
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 opacity-30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
