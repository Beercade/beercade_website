import "server-only";
import { sanityWriteClient } from "@/lib/sanity/serverClient";

// Sanity helpers for the leagueRegistration document. Server-only.

export interface FinalsEvent {
  _id: string;
  title: string;
  prepayRequired: boolean;
  entryFeeAud: number;
  matchplayTournamentId: string | null;
}

/** The single Event flagged prepayRequired (the finals). Null if none is live. */
export async function getPrepayEvent(): Promise<FinalsEvent | null> {
  return sanityWriteClient.fetch<FinalsEvent | null>(
    `*[_type == "event" && prepayRequired == true]
      | order(startDate desc)[0]{
        _id, title, prepayRequired,
        "entryFeeAud": coalesce(entryFeeAud, 15),
        "matchplayTournamentId": matchplayTournamentId
      }`,
  );
}

export async function createPendingRegistration(input: {
  playerName: string;
  email: string;
  ifpaNumber?: string;
  eventId: string;
  amountAud: number;
}): Promise<string> {
  const doc = await sanityWriteClient.create({
    _type: "leagueRegistration",
    playerName: input.playerName,
    email: input.email,
    ifpaNumber: input.ifpaNumber,
    event: { _type: "reference", _ref: input.eventId },
    status: "pending",
    amountAud: input.amountAud,
    matchplayRegistered: false,
    createdAt: new Date().toISOString(),
  });
  return doc._id;
}

export async function attachSquareIds(
  registrationId: string,
  ids: { paymentLinkId: string; orderId: string },
): Promise<void> {
  await sanityWriteClient
    .patch(registrationId)
    .set({ squarePaymentLinkId: ids.paymentLinkId, squareOrderId: ids.orderId })
    .commit();
}

interface RegistrationRecord {
  _id: string;
  status: string;
  playerName: string;
  email: string;
  ifpaNumber: string | null;
  matchplayRegistered: boolean;
}

export async function findByOrderId(orderId: string): Promise<RegistrationRecord | null> {
  return sanityWriteClient.fetch<RegistrationRecord | null>(
    `*[_type == "leagueRegistration" && squareOrderId == $orderId][0]{
      _id, status, playerName, email, "ifpaNumber": ifpaNumber, matchplayRegistered
    }`,
    { orderId },
  );
}

export async function markPaid(
  registrationId: string,
  squarePaymentId: string,
): Promise<void> {
  await sanityWriteClient
    .patch(registrationId)
    .set({ status: "paid", squarePaymentId, paidAt: new Date().toISOString() })
    .commit();
}

export async function markMatchplayRegistered(registrationId: string): Promise<void> {
  await sanityWriteClient.patch(registrationId).set({ matchplayRegistered: true }).commit();
}

export type { RegistrationRecord };
