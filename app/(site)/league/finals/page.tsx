import Link from "next/link";
import FinalsSignupForm from "@/components/league/FinalsSignupForm";
import { getPrepayEvent } from "@/lib/league/registrations";

// /league/finals — prepay signup, shown only when an Event is flagged
// prepayRequired. Otherwise it points players at the normal signup.
// Not statically cached: prepay state is operational and can flip on the day.

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Beercade League Finals — Reserve your spot",
};

export default async function FinalsSignupPage() {
  const event = await getPrepayEvent();

  if (!event || !event.prepayRequired) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16">
        <h1 className="font-[family-name:var(--font-display)] text-3xl">Finals signup</h1>
        <p className="mt-4 text-[var(--color-text-muted)]">
          Prepay isn&apos;t open. For the qualifying nights, sign up at the bar or through the{" "}
          <Link href="/league" className="underline">
            league page
          </Link>
          .
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-3xl">{event.title}</h1>
      <p className="mt-2 text-[var(--color-text-muted)]">
        Lock your finals spot. ${event.entryFeeAud} covers entry and a drink token.
      </p>
      <div className="mt-8">
        <FinalsSignupForm feeAud={event.entryFeeAud} />
      </div>
    </main>
  );
}
