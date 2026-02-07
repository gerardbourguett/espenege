"use client";

import { useState } from "react";

interface TeamLogoProps {
  src: string;
  alt: string;
  size?: number;
}

/**
 * Renders a team logo — real image if src is a URL, emoji text if not.
 * Falls back to a neutral circle with initials on image load error.
 */
export function TeamLogo({ src, alt, size = 20 }: TeamLogoProps) {
  const [error, setError] = useState(false);
  const isUrl = src.startsWith("http");

  if (!isUrl) {
    // Emoji fallback (tennis, basketball mock data)
    return (
      <span
        className="shrink-0 text-center leading-none"
        style={{ width: size, fontSize: size * 0.7 }}
      >
        {src}
      </span>
    );
  }

  if (error) {
    // Image failed to load — show initials circle
    const initials = alt
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <span
        className="shrink-0 rounded-full bg-neutral-700 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="text-[8px] font-bold text-neutral-300">{initials}</span>
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="shrink-0 rounded-sm object-contain"
      onError={() => setError(true)}
    />
  );
}
