"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { mainNavItems } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-2xl font-bold tracking-tight">
            <span className="text-spng-primary">{siteConfig.name}</span>
            <span className="text-spng-accent">.</span>
          </SheetTitle>
        </SheetHeader>
        <Separator className="bg-spng-border" />
        <nav className="flex flex-col py-2">
          <Link
            href="/"
            onClick={() => onOpenChange(false)}
            className="px-6 py-3.5 text-sm font-medium hover:bg-spng-bg-secondary hover:text-spng-accent transition-colors"
          >
            Inicio
          </Link>
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="px-6 py-3.5 text-sm font-medium hover:bg-spng-bg-secondary hover:text-spng-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Separator className="bg-spng-border" />
        <div className="p-6 pt-4">
          <p className="text-xs text-spng-muted leading-relaxed">
            {siteConfig.description}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
