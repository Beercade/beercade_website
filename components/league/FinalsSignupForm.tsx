"use client";

import { useState, useTransition } from "react";
import { createFinalsCheckout } from "@/app/actions/create-finals-checkout";

// Client form for finals prepay. Posts to the server action, then redirects the
// browser to the Square hosted checkout. ID is still checked at the door — this
// only takes the entry fee and reserves the spot.

export default function FinalsSignupForm({ feeAud }: { feeAud: number }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await createFinalsCheckout(formData);
      if (result.ok && result.url) {
        window.location.href = result.url;
      } else {
        setError(result.error ?? "Something went wrong. Try again.");
      }
    });
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-sm text-[var(--color-text-muted)]">Name</span>
        <input
          name="playerName"
          required
          autoComplete="name"
          className="rounded-md border border-[var(--color-fg)]/20 bg-transparent px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-[var(--color-text-muted)]">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-md border border-[var(--color-fg)]/20 bg-transparent px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-[var(--color-text-muted)]">IFPA number (optional)</span>
        <input
          name="ifpaNumber"
          inputMode="numeric"
          className="rounded-md border border-[var(--color-fg)]/20 bg-transparent px-3 py-2"
        />
      </label>

      {error && <p className="text-[var(--color-action)]">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-md bg-[var(--color-action)] px-5 py-3 font-semibold text-[var(--color-after-dark)] disabled:opacity-60"
      >
        {pending ? "Taking you to checkout…" : `Pay $${feeAud} and lock my spot`}
      </button>

      <p className="text-sm text-[var(--color-text-muted)]">
        18+. Bring ID. Payment is handled by Square; we never see your card details.
      </p>
    </form>
  );
}
