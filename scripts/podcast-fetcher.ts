/**
 * Podcast Fetcher - Anchor FM RSS → JSON
 * 
 * Fetches podcast episodes from Anchor FM RSS feed
 * and returns structured JSON for the frontend.
 * 
 * Usage: npx tsx scripts/podcast-fetcher.ts
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Types
export interface PodcastEpisode {
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  duration: string | null;
  imageUrl: string | null;
  guid: string;
}

export interface PodcastFeed {
  title: string;
  description: string;
  link: string;
  imageUrl: string | null;
  episodes: PodcastEpisode[];
}

// Internal types for RSS parsing
interface RssItem {
  title?: string | { "#text": string } | null;
  description?: string | { "#text": string } | null;
  pubDate?: string | null;
  enclosure?: { "@_url"?: string; url?: string; "@_length"?: string | null } | null;
  guid?: string | { "#text": string } | null;
  "itunes:summary"?: string | { "#text": string } | null;
  itunes?: {
    image?: string | { "@_href": string } | null;
    duration?: string | null;
  } | null;
}

interface RssChannel {
  title?: string | null;
  description?: string | null;
  link?: string | null;
  "itunes:image"?: string | { "@_href": string } | null;
  item?: RssItem[] | RssItem | null;
}

interface RssRoot {
  rss?: {
    channel?: RssChannel;
  };
}

// Helper type for text or object with #text
type TextOrTextObject = string | { "#text": string } | null;

// Helper to extract text value
function extractText(value: TextOrTextObject): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null && "#text" in value) return value["#text"];
  return "";
}

// Helper type for href or object with @_href  
type HrefOrHrefObject = string | { "@_href": string } | null;

// Helper to extract href value
function extractHref(value: HrefOrHrefObject): string | null {
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null && "@_href" in value) return value["@_href"];
  return null;
}

// Fetch and parse RSS
export async function fetchPodcastFeed(): Promise<PodcastFeed | null> {
  const rssUrl = process.env.ANCHOR_FM_RSS_URL;

  if (!rssUrl) {
    console.warn("[podcast] ANCHOR_FM_RSS_URL not configured");
    return null;
  }

  console.log(`[podcast] Fetching: ${rssUrl}`);

  try {
    const response = await fetch(rssUrl, {
      headers: {
        "User-Agent": "SPNG Media Podcast Fetcher/1.0"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xml = await response.text();

    // Dynamic import to avoid build issues
    const { XMLParser } = await import("fast-xml-parser");
    
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      textNodeName: "#text",
      cdataPropName: "__cdata",
      isArray: (name) => ["item", "enclosure"].includes(name)
    });

    const parsed = parser.parse(xml) as RssRoot;
    
    // Navigate to channel
    const channel = parsed?.rss?.channel;
    if (!channel) {
      throw new Error("No <channel> element found in RSS");
    }

    // Get channel metadata
    const itunesImage = channel["itunes:image"];
    const imageUrl = typeof itunesImage === 'object' && itunesImage !== null && "@_href" in itunesImage 
      ? itunesImage["@_href"] 
      : typeof itunesImage === 'string' ? itunesImage : null;

    const feed: PodcastFeed = {
      title: channel.title || "",
      description: channel.description || "",
      link: channel.link || "",
      imageUrl,
      episodes: []
    };

    // Get episodes
    const items = Array.isArray(channel.item) ? channel.item : channel.item ? [channel.item] : [];
    
    feed.episodes = items.map((item: RssItem): PodcastEpisode => {
      // Handle enclosure
      let audioUrl = "";
      let duration: string | null = null;
      
      if (item.enclosure) {
        const enc = item.enclosure as { "@_url"?: string; url?: string; "@_length"?: string | null };
        audioUrl = enc["@_url"] || enc.url || "";
        duration = enc["@_length"] || null;
      }
      
      // Handle itunes fields
      const itunes = (item["itunes"] || {}) as { image?: string | { "@_href": string } | null; duration?: string | null };
      const imageHref = extractHref(itunes.image || null);
      
      // Handle description (may be in description or itunes:summary)
      const description = extractText(item.description || null) ||
                          extractText(item["itunes:summary"] || null);
      
      return {
        title: extractText(item.title || null),
        description,
        pubDate: item.pubDate || "",
        audioUrl,
        duration: duration || itunes.duration || null,
        imageUrl: imageHref,
        guid: extractText(item.guid || null) || extractText(item.title || null)
      };
    });

    return feed;

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[podcast] Error fetching RSS: ${message}`);
    return null;
  }
}

// CLI mode
async function main() {
  console.log("=".repeat(60));
  console.log("SPNG Media - Podcast Fetcher");
  console.log("=".repeat(60));

  const feed = await fetchPodcastFeed();

  if (!feed) {
    console.error("Failed to fetch podcast feed");
    process.exit(1);
  }

  console.log(`\n[feed] ${feed.title}`);
  console.log(`[description] ${feed.description}`);
  console.log(`[episodes] ${feed.episodes.length} episodes\n`);

  feed.episodes.slice(0, 5).forEach((ep, i) => {
    console.log(`${i + 1}. ${ep.title}`);
    console.log(`   ${ep.pubDate} | ${ep.duration || "N/A"}`);
    console.log(`   ${ep.audioUrl ? ep.audioUrl.substring(0, 60) + "..." : "no audio"}`);
    console.log();
  });

  if (feed.episodes.length > 5) {
    console.log(`... and ${feed.episodes.length - 5} more episodes`);
  }

  console.log("=".repeat(60));
}

main();
