import "server-only";
import { createClient } from "@sanity/client";

// Write-capable Sanity client for server-only jobs (OPDB sync, Square webhook).
// Uses a token with write permission — keep it server-side, never NEXT_PUBLIC_*.
// The read client in lib/sanity/client.ts stays separate and read-only.

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-01";
const tokenWrite = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
}

export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: tokenWrite,
  useCdn: false, // never cache writes or the freshest reads
});
