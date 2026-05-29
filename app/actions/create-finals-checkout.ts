"use server";

import { randomUUID } from "node:crypto";
import { createPaymentLink } from "@/lib/square/client";
import {
  attachSquareIds,
  createPendingRegistration,
  getPrepayEvent,
} from "@/lib/league/registrations";

// Server action behind the finals signup form.
// Flow: create a pending registration → create the Square checkout → stamp the
// Square ids back onto the record → return the hosted checkout URL for redirect.
//
// The webhook (app/api/square/webhook/route.ts) is what actually confirms
// payment and flips the record to "paid"; this action only opens the door.

export interface CheckoutResult {
  ok: boolean;
  url?: string;
  error?: string;
}

export async function createFinalsCheckout(formData: FormData): Promise<CheckoutResult> {
  const playerName = String(formData.get("playerName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const ifpaNumber = String(formData.get("ifpaNumber") ?? "").trim() || undefined;

  if (!playerName || !email) {
    return { ok: false, error: "Name and email are required." };
  }

  const event = await getPrepayEvent();
  if (!event || !event.prepayRequired) {
    return { ok: false, error: "Finals prepay isn't open right now." };
  }

  const amountAud = event.entryFeeAud ?? 15;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://beercade.com.au";

  try {
    const registrationId = await createPendingRegistration({
      playerName,
      email,
      ifpaNumber,
      eventId: event._id,
      amountAud,
    });

    const link = await createPaymentLink({
      itemName: `${event.title} — Entry`,
      amountCents: Math.round(amountAud * 100),
      buyerEmail: email,
      redirectUrl: `${siteUrl}/league/thanks`,
      referenceNote: `regId:${registrationId}`,
      idempotencyKey: randomUUID(),
    });

    await attachSquareIds(registrationId, {
      paymentLinkId: link.paymentLinkId,
      orderId: link.orderId,
    });

    return { ok: true, url: link.url };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
