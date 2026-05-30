import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

// Auto-captures unhandled server-side request errors (server actions, server
// components, route handlers). Requires @sentry/nextjs >= 8.28.
export const onRequestError = Sentry.captureRequestError;
