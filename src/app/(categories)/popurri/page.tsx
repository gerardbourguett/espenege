import type { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/sections/CategoryPageTemplate";
import { WorldNewsSection } from "@/components/sections/WorldNewsSection";

export const metadata: Metadata = {
  title: "Popurri",
  description: "Entretenimiento, cultura y variedad",
};

export default function PopurriPage() {
  return (
    <CategoryPageTemplate
      category="popurri"
      extraTop={<WorldNewsSection section="popurri" />}
    />
  );
}
