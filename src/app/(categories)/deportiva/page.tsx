import type { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/sections/CategoryPageTemplate";
import { ScoreStripClient } from "@/components/sports/ScoreStripClient";
import { WorldNewsSection } from "@/components/sections/WorldNewsSection";

export const metadata: Metadata = {
  title: "Deportiva",
  description: "Lo mejor del deporte nacional e internacional",
};

export default function DeportivaPage() {
  return (
    <CategoryPageTemplate
      category="deportiva"
      extraTop={
        <>
          <ScoreStripClient />
          <WorldNewsSection section="deportiva" />
        </>
      }
    />
  );
}
