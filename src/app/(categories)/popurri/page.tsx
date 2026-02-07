import type { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/sections/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Popurri",
  description: "Entretenimiento, cultura y variedad",
};

export default function PopurriPage() {
  return <CategoryPageTemplate category="popurri" />;
}
