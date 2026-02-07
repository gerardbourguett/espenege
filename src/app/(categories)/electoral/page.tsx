import type { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/sections/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Electoral",
  description: "Elecciones, partidos politicos y campanas",
};

export default function ElectoralPage() {
  return <CategoryPageTemplate category="electoral" />;
}
