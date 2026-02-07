import type { Match } from "@/types/sports";
import { LiveBadge } from "./LiveBadge";

interface MatchFixtureListProps {
  matches: Match[];
}

export function MatchFixtureList({ matches }: MatchFixtureListProps) {
  return (
    <div className="divide-y divide-spng-border">
      {matches.map((match) => (
        <div key={match.id} className="flex items-center justify-between py-3 px-2">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <span className="text-[10px] font-medium text-muted-foreground uppercase w-16 shrink-0 truncate">
              {match.league}
            </span>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-sm truncate">
                {match.homeTeam.shortName}
              </span>
              {match.status !== "upcoming" ? (
                <span className="text-sm font-bold px-2 tabular-nums">
                  {match.homeScore} - {match.awayScore}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground px-2">vs</span>
              )}
              <span className="text-sm truncate">
                {match.awayTeam.shortName}
              </span>
            </div>
          </div>
          <div className="shrink-0 ml-2">
            {match.status === "live" ? (
              <LiveBadge />
            ) : match.status === "finished" ? (
              <span className="text-[10px] font-medium text-muted-foreground uppercase">Final</span>
            ) : (
              <span className="text-xs text-spng-secondary">
                {new Date(match.startTime).toLocaleTimeString("es", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
