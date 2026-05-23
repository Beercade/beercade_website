"use server";

import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  source: z.enum(["footer", "popup"]),
});

export async function submitNewsletterSignup(
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { ok: false, error: "Enter a valid email address." };

  const formId =
    parsed.data.source === "footer"
      ? process.env.KIT_FORM_ID_FOOTER
      : process.env.KIT_FORM_ID_POPUP;

  if (!process.env.KIT_API_KEY || !formId) {
    return { ok: false, error: "Newsletter sign-up is not yet available." };
  }

  const res = await fetch(
    `https://api.kit.com/v4/forms/${formId}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": process.env.KIT_API_KEY,
      },
      body: JSON.stringify({ email_address: parsed.data.email }),
    }
  );

  if (!res.ok) {
    return {
      ok: false,
      error: "Sign-up failed. Try again or email hello@beercade.com.au.",
    };
  }

  return { ok: true };
}
