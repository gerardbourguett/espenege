import type { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/sections/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "No Somos Nada",
  description: "Las noticias mas curiosas e increibles",
};

export default function NoSomosNadaPage() {
  return <CategoryPageTemplate category="no-somos-nada" />;
}
