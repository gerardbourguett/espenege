import type { Match } from "@/types/sports";
import { LiveBadge } from "./LiveBadge";
import { TeamLogo } from "./TeamLogo";
import { Calendar, MapPin, Trophy } from "lucide-react";

interface MatchDetailProps {
  match: Match;
}

function StatusBadge({ match }: { match: Match }) {
  if (match.status === "live") {
    return (
      <div className="flex items-center gap-2">
        <LiveBadge />
        {match.minute && (
          <span className="text-sm font-bold text-red-400 tabular-nums">
            {match.minute}
          </span>
        )}
      </div>
    );
  }

  if (match.status === "finished") {
    return (
      <span className="text-sm font-semibold uppercase text-neutral-400 tracking-wider">
        Finalizado
      </span>
    );
  }

  return (
    <span className="text-sm font-semibold text-spng-accent tabular-nums">
      {new Date(match.startTime).toLocaleTimeString("es-CL", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
  );
}

export function MatchDetail({ match }: MatchDetailProps) {
  const isUpcoming = match.status === "upcoming";
  const isLive = match.status === "live";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Main score card */}
      <div
        className={`relative bg-neutral-950 rounded-2xl overflow-hidden ${
          isLive ? "ring-1 ring-red-500/40" : "ring-1 ring-neutral-800"
        }`}
      >
        {/* Live accent bar */}
        {isLive && (
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 via-red-400 to-red-500" />
        )}

        <div className="p-6 md:p-8">
          {/* League + status */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-spng-accent" />
              <span className="text-sm font-medium text-neutral-400">
                {match.league}
              </span>
            </div>
            <StatusBadge match={match} />
          </div>

          {/* Teams + Score */}
          <div className="flex items-center justify-between gap-4">
            {/* Home team */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <TeamLogo src={match.homeTeam.logo} alt={match.homeTeam.name} size={64} />
              <div className="text-center">
                <span className="text-base md:text-lg font-bold text-white block">
                  {match.homeTeam.shortName}
                </span>
                <span className="text-xs text-neutral-500 block mt-0.5 max-w-[140px] truncate">
                  {match.homeTeam.name}
                </span>
              </div>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center gap-1">
              {!isUpcoming ? (
                <div className="flex items-center gap-3">
                  <span
                    className={`text-4xl md:text-5xl font-bold tabular-nums ${
                      isLive ? "text-white" : "text-neutral-200"
                    }`}
                  >
                    {match.homeScore}
                  </span>
                  <span className="text-2xl font-light text-neutral-600">-</span>
                  <span
                    className={`text-4xl md:text-5xl font-bold tabular-nums ${
                      isLive ? "text-white" : "text-neutral-200"
                    }`}
                  >
                    {match.awayScore}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-light text-neutral-500">vs</span>
              )}
            </div>

            {/* Away team */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <TeamLogo src={match.awayTeam.logo} alt={match.awayTeam.name} size={64} />
              <div className="text-center">
                <span className="text-base md:text-lg font-bold text-white block">
                  {match.awayTeam.shortName}
                </span>
                <span className="text-xs text-neutral-500 block mt-0.5 max-w-[140px] truncate">
                  {match.awayTeam.name}
                </span>
              </div>
            </div>
          </div>

          {/* Period scores */}
          {match.periodScores && match.periodScores.length > 0 && (
            <div className="mt-6 pt-4 border-t border-neutral-800">
              <div className="flex justify-center gap-6">
                {match.periodScores.map((period, i) => (
                  <div key={i} className="text-center">
                    <span className="text-[10px] uppercase text-neutral-500 tracking-wider block mb-1">
                      {match.sport === "tenis"
                        ? `Set ${i + 1}`
                        : match.sport === "basquetbol"
                          ? `${i + 1}Q`
                          : i === 0
                            ? "1T"
                            : "2T"}
                    </span>
                    <span className="text-sm font-semibold text-neutral-300 tabular-nums">
                      {period.home} - {period.away}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Match info */}
      <div className="mt-4 bg-neutral-950 rounded-xl p-5 ring-1 ring-neutral-800">
        <h3 className="text-sm font-semibold text-white mb-3">
          Información del partido
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-neutral-500 shrink-0" />
            <span className="text-neutral-300">
              {new Date(match.startTime).toLocaleDateString("es-CL", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              {" — "}
              {new Date(match.startTime).toLocaleTimeString("es-CL", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {match.round && (
            <div className="flex items-center gap-3 text-sm">
              <Trophy className="h-4 w-4 text-neutral-500 shrink-0" />
              <span className="text-neutral-300">{match.round}</span>
            </div>
          )}

          {match.venue && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-neutral-500 shrink-0" />
              <span className="text-neutral-300">{match.venue}</span>
            </div>
          )}

          <div className="flex items-center gap-3 text-sm">
            <span className="text-neutral-500 shrink-0 text-xs w-4 text-center">
              {match.sport === "futbol" ? "⚽" : match.sport === "tenis" ? "🎾" : "🏀"}
            </span>
            <span className="text-neutral-300 capitalize">{match.sport}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
