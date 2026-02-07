import { createClient } from "next-sanity";
import { sanityConfig } from "./config";

export const client = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
});

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
