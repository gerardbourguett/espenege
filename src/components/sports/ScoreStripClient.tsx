"use client";

import { useEffect } from "react";
import { SportScoreCard } from "./SportScoreCard";
import { useSportsStore } from "@/stores/sports-store";

export function ScoreStripClient() {
  const { football, tennis, basketball, isLoading, hasFetched, fetchAllSports } = useSportsStore();

  useEffect(() => {
    fetchAllSports();
  }, [fetchAllSports]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllSports();
    }, 60000);
    return () => clearInterval(interval);
  }, [fetchAllSports]);

  const allMatches = [...football, ...tennis, ...basketball];
  const showLoading = isLoading && !hasFetched && allMatches.length === 0;

  const liveMatches = allMatches.filter((m) => m.status === "live");
  const finishedMatches = allMatches.filter((m) => m.status === "finished");
  const upcomingMatches = allMatches.filter((m) => m.status === "upcoming");
  const displayMatches = [...liveMatches, ...finishedMatches, ...upcomingMatches].slice(0, 12);

  return (
    <div className="mb-8 -mx-4 px-4">
      <div className="bg-neutral-950 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Marcadores</span>
            {liveMatches.length > 0 && (
              <span className="text-[10px] font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                {liveMatches.length} en vivo
              </span>
            )}
          </div>
        </div>

        {showLoading ? (
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="min-w-[220px] h-[100px] bg-neutral-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
            {displayMatches.map((match) => (
              <SportScoreCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
