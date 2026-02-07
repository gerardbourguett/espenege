import Link from "next/link";
import type { Match } from "@/types/sports";
import { LiveBadge } from "./LiveBadge";
import { TeamLogo } from "./TeamLogo";

interface SportScoreCardProps {
  match: Match;
}

function TeamRow({
  team,
  score,
  isWinner,
  showScore,
}: {
  team: Match["homeTeam"];
  score?: number;
  isWinner: boolean;
  showScore: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <TeamLogo src={team.logo} alt={team.name} size={20} />
        <span
          className={`text-[13px] truncate ${
            isWinner ? "font-bold text-white" : "font-medium text-neutral-300"
          }`}
        >
          {team.shortName}
        </span>
      </div>
      {showScore && (
        <span
          className={`text-base tabular-nums min-w-[1.25rem] text-right ${
            isWinner ? "font-bold text-white" : "font-medium text-neutral-400"
          }`}
        >
          {score}
        </span>
      )}
    </div>
  );
}

export function SportScoreCard({ match }: SportScoreCardProps) {
  const isFinished = match.status === "finished";
  const isLive = match.status === "live";
  const isUpcoming = match.status === "upcoming";

  const homeWins =
    isFinished &&
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    match.homeScore > match.awayScore;
  const awayWins =
    isFinished &&
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    match.awayScore > match.homeScore;

  const timeLabel = isUpcoming
    ? new Date(match.startTime).toLocaleTimeString("es-CL", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const matchUrl = `/deportiva/partido/${match.id}`;

  return (
    <Link
      href={matchUrl}
      className={`relative rounded-lg min-w-[220px] shrink-0 transition-all duration-200 hover:scale-[1.02] block ${
        isLive
          ? "bg-neutral-900 ring-1 ring-red-500/40"
          : "bg-neutral-900 ring-1 ring-neutral-700/50 hover:ring-neutral-600"
      }`}
    >
      {/* Live pulse accent bar */}
      {isLive && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-red-400 to-red-500 rounded-t-lg" />
      )}

      <div className="px-3.5 pt-2.5 pb-3">
        {/* Header: league + status */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider truncate max-w-[60%]">
            {match.league}
          </span>
          {isLive ? (
            <LiveBadge />
          ) : isFinished ? (
            <span className="text-[10px] font-semibold uppercase text-neutral-500 tracking-wider">
              Final
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-spng-accent tabular-nums">
              {timeLabel}
            </span>
          )}
        </div>

        {/* Teams */}
        <div className="space-y-1.5">
          <TeamRow
            team={match.homeTeam}
            score={match.homeScore}
            isWinner={isLive ? false : homeWins}
            showScore={!isUpcoming}
          />
          <TeamRow
            team={match.awayTeam}
            score={match.awayScore}
            isWinner={isLive ? false : awayWins}
            showScore={!isUpcoming}
          />
        </div>

        {/* Live minute */}
        {isLive && match.minute && (
          <div className="mt-2 pt-1.5 border-t border-neutral-800">
            <span className="text-[11px] font-bold text-red-400 tabular-nums">
              {match.minute}
            </span>
          </div>
        )}

        {/* Upcoming date */}
        {isUpcoming && (
          <div className="mt-2 pt-1.5 border-t border-neutral-800">
            <span className="text-[10px] text-neutral-500">
              {new Date(match.startTime).toLocaleDateString("es-CL", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
