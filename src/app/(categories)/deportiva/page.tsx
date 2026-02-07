import type { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/sections/CategoryPageTemplate";
import { matches } from "@/data/sports-fixtures";
import { SportScoreCard } from "@/components/sports/SportScoreCard";

export const metadata: Metadata = {
  title: "Deportiva",
  description: "Lo mejor del deporte nacional e internacional",
};

function ScoreStrip() {
  const liveAndRecent = matches
    .filter((m) => m.status === "live" || m.status === "finished")
    .slice(0, 8);

  return (
    <div className="mb-8 -mx-4 px-4">
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
        {liveAndRecent.map((match) => (
          <SportScoreCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}

export default function DeportivaPage() {
  return (
    <CategoryPageTemplate
      category="deportiva"
      extraTop={<ScoreStrip />}
    />
  );
}
