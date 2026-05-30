// TEMPORARY — verification route for Sentry setup.
// Visit /sentry-test on a deploy with NEXT_PUBLIC_SENTRY_DSN set, confirm the
// error shows in the Sentry Issues dashboard, then DELETE this file.
export const dynamic = "force-dynamic";

export function GET() {
  throw new Error(
    "Sentry test error — delete app/sentry-test/ after verifying"
  );
}
