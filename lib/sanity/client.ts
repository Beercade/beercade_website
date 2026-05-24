import { createClient } from "@sanity/client";

// Trim to guard against trailing newlines injected by some CI/CD env-var tools
const projectId = (
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder"
).trim();
const dataset = (
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
).trim();
const apiVersion = (
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-01"
).trim();

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
