import type { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/sections/CategoryPageTemplate";
import { WorldNewsSection } from "@/components/sections/WorldNewsSection";

export const metadata: Metadata = {
  title: "Nacional",
  description: "Noticias nacionales y politica del pais",
};

export default function NacionalPage() {
  return (
    <CategoryPageTemplate
      category="nacional"
      extraTop={<WorldNewsSection section="nacional" />}
    />
  );
}
