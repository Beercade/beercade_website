import Link from "next/link";

// Where Square redirects after a completed checkout. This is UX only — the
// webhook is what actually confirms payment, so don't assert "you're paid"
// with certainty here; the confirmation email does that once the webhook lands.

export const metadata = { title: "You're in — Beercade League Finals" };

export default function FinalsThanksPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-3xl">Spot reserved</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        Thanks — we&apos;ll email your confirmation shortly. Doors at 6:30, first ball at 7.
        Bring ID; it&apos;s an 18+ night.
      </p>
      <Link href="/league" className="mt-8 inline-block underline">
        Back to the ladder
      </Link>
    </main>
  );
}
