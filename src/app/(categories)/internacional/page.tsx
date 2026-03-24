import type { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/sections/CategoryPageTemplate";
import { WorldNewsSection } from "@/components/sections/WorldNewsSection";

export const metadata: Metadata = {
  title: "Internacional",
  description: "Noticias del mundo y asuntos globales",
};

export default function InternacionalPage() {
  return (
    <CategoryPageTemplate
      category="internacional"
      extraTop={<WorldNewsSection section="internacional" />}
    />
  );
}
