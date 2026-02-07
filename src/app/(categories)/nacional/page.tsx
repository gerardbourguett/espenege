import type { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/sections/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Nacional",
  description: "Noticias nacionales y politica del pais",
};

export default function NacionalPage() {
  return <CategoryPageTemplate category="nacional" />;
}
