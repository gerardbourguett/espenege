import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  href?: string;
  accentColor?: string;
}

export function SectionHeader({ title, href, accentColor }: SectionHeaderProps) {
  return (
    <div className="group flex items-center justify-between mb-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-serif text-2xl font-bold text-spng-primary flex items-center gap-3">
          <span
            className="w-1.5 h-7 rounded-sm"
            style={{ backgroundColor: accentColor || "#84cc16" }}
          />
          {title}
        </h2>
        <div
          className="h-0.5 ml-6"
          style={{
            backgroundColor: accentColor || "#84cc16",
            width: "calc(100% - 1.5rem)"
          }}
        />
      </div>
      {href && (
        <Link
          href={href}
          className="text-sm font-medium text-spng-muted hover:text-spng-accent transition-colors flex items-center gap-1"
        >
          Ver todo
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
