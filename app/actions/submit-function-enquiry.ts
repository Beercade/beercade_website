"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { functionEnquirySchema } from "@/lib/validation/function-enquiry";
import { writeClient } from "@/lib/sanity/client";
import { sendTeamNotification, sendCustomerAutoresponder } from "@/lib/resend/client";
import { createTentativeCalendarEvent } from "@/lib/google/calendar";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { rateLimit } from "@/lib/security/rate-limit";

type ActionResult = { ok: false; errors: Record<string, string[]> } | null;

export async function submitFunctionEnquiry(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  // 0) Rate limit — 5 submissions per IP per hour
  const ip =
    headers().get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const limit = await rateLimit(ip);
  if (!limit.success) {
    return {
      ok: false,
      errors: {
        _form: [
          "Too many submissions. Try again in an hour, or email functions@beercade.com.au.",
        ],
      },
    };
  }

  // 1) Validate
  const raw = Object.fromEntries(formData.entries());
  const parsed = functionEnquirySchema.safeParse({
    ...raw,
    food: raw.food === "on",
    consent: raw.consent === "on" ? true : raw.consent,
  });
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;

  // 2) Turnstile verification
  const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstileOk) {
    return {
      ok: false,
      errors: { _form: ["Verification failed. Refresh and try again."] },
    };
  }

  // 3) Calendar tentative event (first — so the team can see it immediately)
  const { id: calendarEventId, htmlLink: calendarEventUrl } =
    await createTentativeCalendarEvent(data);

  // 4) Sanity archive
  const { turnstileToken: _t, honeypot: _h, consent: _c, ...archiveData } = data;
  await writeClient.create({
    _type: "functionEnquiry",
    submittedAt: new Date().toISOString(),
    ...archiveData,
    calendarEventId,
    status: "new",
  });

  // 5) Team notification to group inbox
  await sendTeamNotification(data, calendarEventId, calendarEventUrl);

  // 6) Customer autoresponder
  await sendCustomerAutoresponder(data);

  revalidatePath("/studio");
  redirect("/thanks");
}
