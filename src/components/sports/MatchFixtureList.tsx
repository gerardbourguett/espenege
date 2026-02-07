import Link from "next/link";
import type { Match } from "@/types/sports";
import { LiveBadge } from "./LiveBadge";
import { TeamLogo } from "./TeamLogo";

interface MatchFixtureListProps {
  matches: Match[];
}

export function MatchFixtureList({ matches }: MatchFixtureListProps) {
  return (
    <div className="bg-neutral-950 rounded-xl overflow-hidden">
      {matches.map((match, i) => {
        const isLive = match.status === "live";
        const isFinished = match.status === "finished";

        return (
          <Link
            key={match.id}
            href={`/deportiva/partido/${match.id}`}
            className={`flex items-center justify-between py-3 px-4 transition-colors hover:bg-neutral-900/50 ${
              i < matches.length - 1 ? "border-b border-neutral-800" : ""
            } ${isLive ? "bg-red-500/5" : ""}`}
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <span className="text-[10px] font-medium text-neutral-500 uppercase w-20 shrink-0 truncate tracking-wider">
                {match.league}
              </span>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <TeamLogo src={match.homeTeam.logo} alt={match.homeTeam.name} size={16} />
                <span className="text-sm text-neutral-200 truncate font-medium">
                  {match.homeTeam.shortName}
                </span>
                {match.status !== "upcoming" ? (
                  <span className="text-sm font-bold text-white px-2 tabular-nums">
                    {match.homeScore} - {match.awayScore}
                  </span>
                ) : (
                  <span className="text-xs text-neutral-500 px-2">vs</span>
                )}
                <TeamLogo src={match.awayTeam.logo} alt={match.awayTeam.name} size={16} />
                <span className="text-sm text-neutral-200 truncate font-medium">
                  {match.awayTeam.shortName}
                </span>
              </div>
            </div>
            <div className="shrink-0 ml-2">
              {isLive ? (
                <LiveBadge />
              ) : isFinished ? (
                <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Final
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-spng-accent tabular-nums">
                  {new Date(match.startTime).toLocaleTimeString("es-CL", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
