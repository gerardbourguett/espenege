/**
 * Podcast Fetcher - Anchor FM RSS → JSON
 * 
 * Fetches podcast episodes from Anchor FM RSS feed
 * and returns structured JSON for the frontend.
 * 
 * Usage: npx ts-node scripts/podcast-fetcher.ts
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

// Simple XML parser for RSS
function parseXml(xml: string): Map<string, string | Map<string, string>> {
  const result = new Map<string, string | Map<string, string>>();
  const stack: Map<string, string>[] = [result];

  // Remove XML declaration and comments
  const cleanXml = xml
    .replace(/<\?xml[^?]*\?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, (match) => match.replace(/<!\[CDATA\[|\]\]>/g, ""));

  // Parse tags
  const tagRegex = /<(\/?)([\w:-]+)([^>]*)>/gi;
  let lastTag: string | null = null;
  let lastAttrs = "";

  while ((tagRegex.lastIndex < cleanXml.length)) {
    const match = tagRegex.exec(cleanXml);
    if (!match) break;

    const [, isClosing, tagName, attrs] = match;

    if (isClosing === "/") {
      stack.pop();
    } else if (attrs.trim().endsWith("/>")) {
      // Self-closing tag
      const obj = new Map<string, string>();
      parseAttributes(attrs, obj);
      const current = stack[stack.length - 1];
      if (lastTag) {
        const existing = current.get(tagName);
        if (existing instanceof Map) {
          // Already has array of items
          const arr = current.get(`_${tagName}`) as Map<string, string>[];
          arr.push(obj);
        } else {
          // Convert to array
          current.set(`_${tagName}`, [existing as string, obj]);
          current.set(tagName, "array");
        }
      }
    } else {
      const obj = new Map<string, string>();
      parseAttributes(attrs, obj);
      stack.push(obj);

      // Find content between tags
      const contentStart = tagRegex.lastIndex;
      const nextTagMatch = cleanXml.match(/<(\/?)([\w:-]+)/, contentStart);
      if (nextTagMatch) {
        const contentEnd = cleanXml.indexOf("<", contentStart);
        if (contentEnd !== -1) {
          const content = cleanXml.slice(contentStart, contentEnd).trim();
          if (content) {
            obj.set("_text", content);
          }
        }
      }

      const current = stack[stack.length - 1];
      current.set("_tag", tagName);
    }

    lastTag = tagName;
    lastAttrs = attrs;
  }

  return result;
}

function parseAttributes(attrs: string, obj: Map<string, string>): void {
  const attrRegex = /([\w:-]+)="([^"]*)"/g;
  let match;
  while ((match = attrRegex.exec(attrs)) !== null) {
    obj.set(`@${match[1]}`, match[2]);
  }
}

// Flatten Map to object
function flattenMap(map: Map<string, any>, prefix = ""): any {
  const result: any = {};

  for (const [key, value] of map) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value instanceof Map) {
      const flat = flattenMap(value, newKey);
      Object.assign(result, flat);
    } else if (key !== "_tag" && !key.startsWith("_")) {
      result[newKey] = value;
    } else if (key === "_text") {
      return value;
    }
  }

  return result;
}

// Extract item fields from RSS item
function extractEpisode(item: Map<string, string | Map<string, string>>): PodcastEpisode {
  const get = (key: string): string => {
    const val = item.get(key);
    if (val instanceof Map) return val.get("_text") || "";
    if (typeof val === "string") return val;
    return "";
  };

  const enclosure = item.get("enclosure") as Map<string, string>;
  const audioUrl = enclosure?.get?.("@url") || "";

  const itunes = item.get("itunes") as Map<string, string> | undefined;

  return {
    title: get("title"),
    description: get("description") || get("itunes:summary") || "",
    pubDate: get("pubDate"),
    audioUrl,
    duration: itunes?.get?.("itunes:duration") || null,
    imageUrl: itunes?.get?.("itunes:image")?.replace("@href=", "") || null,
    guid: get("guid")
  };
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
    const parsed = parseXml(xml);

    // Extract channel info
    const channel = parsed.get("channel") as Map<string, string | Map<string, string>>;
    if (!channel) {
      throw new Error("No <channel> element found in RSS");
    }

    const get = (key: string): string => {
      const val = channel.get(key);
      if (val instanceof Map) return val.get("_text") || "";
      if (typeof val === "string") return val;
      return "";
    };

    const getItunes = (key: string): string => {
      const itunes = channel.get("itunes") as Map<string, string> | undefined;
      return itunes?.get?.(key)?.replace("@href=", "") || "";
    };

    // Get episodes
    const itemsData = channel.get("item");
    const items: Map<string, string>[] = [];

    if (itemsData instanceof Map) {
      const arr = channel.get("_item") as Map<string, string>[];
      if (arr) {
        items.push(...arr);
      } else {
        items.push(itemsData);
      }
    }

    const episodes: PodcastEpisode[] = items.map(extractEpisode);

    return {
      title: get("title"),
      description: get("description") || get("itunes:summary") || "",
      link: get("link"),
      imageUrl: getItunes("itunes:image") || null,
      episodes
    };

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

  feed.episodes.forEach((ep, i) => {
    console.log(`${i + 1}. ${ep.title}`);
    console.log(`   ${ep.pubDate} | ${ep.duration || "N/A"}`);
    console.log(`   ${ep.audioUrl.substring(0, 60)}...`);
    console.log();
  });

  console.log("=".repeat(60));
}

main();
