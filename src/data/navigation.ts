export interface NavItem {
  label: string;
  href: string;
  slug?: string;
}

export const mainNavItems: NavItem[] = [
  { label: "Nacional", href: "/nacional", slug: "nacional" },
  { label: "Internacional", href: "/internacional", slug: "internacional" },
  { label: "Deportiva", href: "/deportiva", slug: "deportiva" },
  { label: "Electoral", href: "/electoral", slug: "electoral" },
  { label: "Popurri", href: "/popurri", slug: "popurri" },
  { label: "No Somos Nada", href: "/no-somos-nada", slug: "no-somos-nada" },
];
