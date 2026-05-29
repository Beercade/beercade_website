import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

// Square via the REST API directly (fetch), not the SDK.
// Rationale: the square npm SDK has churned its surface across major versions;
// the REST contract is stable. This keeps us off the upgrade treadmill.
//
// Docs: https://developer.squareup.com/reference/square/checkout-api/create-payment-link
// AU accounts use the production host below; sandbox swaps the host only.

const SQUARE_VERSION = "2025-04-16"; // bump deliberately; pin so behaviour doesn't drift
const HOST =
  process.env.SQUARE_ENVIRONMENT === "sandbox"
    ? "https://connect.squareupsandbox.com"
    : "https://connect.squareup.com";

function accessToken(): string {
  const t = process.env.SQUARE_ACCESS_TOKEN;
  if (!t) throw new Error("SQUARE_ACCESS_TOKEN is not set");
  return t;
}

export interface CreatedPaymentLink {
  paymentLinkId: string;
  orderId: string;
  url: string;
}

/**
 * Create a hosted Square checkout for a fixed-amount entry fee.
 * `referenceNote` is stamped on the payment so it's visible in the Dashboard;
 * correlation back to our record is done by orderId (returned here, echoed by
 * the webhook), which is the reliable join.
 */
export async function createPaymentLink(opts: {
  itemName: string;
  amountCents: number;
  buyerEmail: string;
  redirectUrl: string;
  referenceNote: string;
  idempotencyKey: string;
}): Promise<CreatedPaymentLink> {
  const locationId = process.env.SQUARE_LOCATION_ID;
  if (!locationId) throw new Error("SQUARE_LOCATION_ID is not set");

  const res = await fetch(`${HOST}/v2/online-checkout/payment-links`, {
    method: "POST",
    headers: {
      "Square-Version": SQUARE_VERSION,
      Authorization: `Bearer ${accessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idempotency_key: opts.idempotencyKey,
      quick_pay: {
        name: opts.itemName,
        price_money: { amount: opts.amountCents, currency: "AUD" },
        location_id: locationId,
      },
      checkout_options: {
        redirect_url: opts.redirectUrl,
        ask_for_shipping_address: false,
      },
      pre_populated_data: { buyer_email: opts.buyerEmail },
      payment_note: opts.referenceNote,
    }),
  });

  const json = (await res.json()) as {
    payment_link?: { id: string; order_id: string; url: string };
    errors?: { detail?: string }[];
  };

  if (!res.ok || !json.payment_link) {
    const detail = json.errors?.map((e) => e.detail).join("; ") ?? res.statusText;
    throw new Error(`Square createPaymentLink failed: ${detail}`);
  }

  return {
    paymentLinkId: json.payment_link.id,
    orderId: json.payment_link.order_id,
    url: json.payment_link.url,
  };
}

/**
 * Verify a Square webhook signature.
 * Algorithm: base64( HMAC-SHA256( key = signatureKey, msg = notificationUrl + rawBody ) )
 * compared against the `x-square-hmacsha256-signature` header.
 * The notificationUrl must match EXACTLY what's configured in the Square
 * dashboard (scheme, host, path, no trailing slash mismatch).
 */
export function verifyWebhookSignature(opts: {
  rawBody: string;
  signatureHeader: string | null;
  notificationUrl: string;
}): boolean {
  const key = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  if (!key || !opts.signatureHeader) return false;

  const expected = createHmac("sha256", key)
    .update(opts.notificationUrl + opts.rawBody)
    .digest("base64");

  const a = Buffer.from(expected);
  const b = Buffer.from(opts.signatureHeader);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
