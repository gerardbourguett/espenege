import type { Match } from "@/types/sports";
import { LiveBadge } from "./LiveBadge";

interface SportScoreCardProps {
  match: Match;
}

export function SportScoreCard({ match }: SportScoreCardProps) {
  const statusLabel =
    match.status === "live"
      ? match.minute
      : match.status === "finished"
        ? "Final"
        : new Date(match.startTime).toLocaleTimeString("es", {
            hour: "2-digit",
            minute: "2-digit",
          });

  return (
    <div className="bg-white rounded-xl border border-spng-border p-4 min-w-[200px] shrink-0 hover:shadow-lg hover:shadow-black/5 hover:border-spng-accent/30 transition-all duration-300">
      {/* League & status */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          {match.league}
        </span>
        {match.status === "live" ? (
          <LiveBadge />
        ) : (
          <span
            className={`text-[10px] font-semibold uppercase ${
              match.status === "finished" ? "text-spng-muted" : "text-spng-primary"
            }`}
          >
            {statusLabel}
          </span>
        )}
      </div>

      {/* Teams & scores */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{match.homeTeam.logo}</span>
            <span className="text-sm font-semibold">{match.homeTeam.shortName}</span>
          </div>
          {match.status !== "upcoming" && (
            <span className="text-lg font-bold tabular-nums">{match.homeScore}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{match.awayTeam.logo}</span>
            <span className="text-sm font-semibold">{match.awayTeam.shortName}</span>
          </div>
          {match.status !== "upcoming" && (
            <span className="text-lg font-bold tabular-nums">{match.awayScore}</span>
          )}
        </div>
      </div>

      {/* Live minute indicator */}
      {match.status === "live" && (
        <div className="mt-2 pt-2 border-t border-spng-border">
          <span className="text-xs text-spng-alert font-medium">{match.minute}</span>
        </div>
      )}
    </div>
  );
}
