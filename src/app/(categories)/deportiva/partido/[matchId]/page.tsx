import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { fetchMatchById } from "@/lib/match-api";
import { MatchDetail } from "@/components/sports/MatchDetail";
import { MatchDetailSkeleton } from "@/components/sports/MatchDetailSkeleton";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { ArrowLeft } from "lucide-react";

interface MatchPageProps {
  params: Promise<{ matchId: string }>;
}

export async function generateMetadata({ params }: MatchPageProps): Promise<Metadata> {
  const { matchId } = await params;
  const match = await fetchMatchById(matchId);

  if (!match) {
    return { title: "Partido | SPNG Deportiva" };
  }

  const title = `${match.homeTeam.shortName} vs ${match.awayTeam.shortName} | SPNG Deportiva`;
  const description = `${match.homeTeam.name} vs ${match.awayTeam.name} — ${match.league}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

async function MatchContent({ matchId }: { matchId: string }) {
  const match = await fetchMatchById(matchId);

  if (!match) {
    notFound();
  }

  return <MatchDetail match={match} />;
}

export default async function MatchPage({ params }: MatchPageProps) {
  const { matchId } = await params;

  return (
    <div className="min-h-screen bg-spng-bg-primary">
      <div className="max-w-7xl mx-auto px-4">
        <BreadcrumbNav
          items={[
            { label: "Deportiva", href: "/deportiva" },
            { label: "Partido" },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Back link */}
        <Link
          href="/deportiva"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-spng-accent transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Deportiva
        </Link>

        <Suspense fallback={<MatchDetailSkeleton />}>
          <MatchContent matchId={matchId} />
        </Suspense>
      </div>
    </div>
  );
}
