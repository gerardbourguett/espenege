import { NextResponse } from "next/server";
import { getMatchesBySport } from "@/data/sports-fixtures";

// Cache for 5 minutes
let cache: { data: unknown; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

export async function GET() {
  const now = Date.now();

  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  // Tennis API integration placeholder
  // For now, return mock data. In production, integrate with a tennis API
  // (e.g., SportMonks, API-Tennis on RapidAPI)
  const mockData = getMatchesBySport("tenis");
  cache = { data: mockData, timestamp: now };

  return NextResponse.json(mockData);
}
