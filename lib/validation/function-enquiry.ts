import { z } from "zod";

// "Today" in the venue's timezone as YYYY-MM-DD. ISO date strings compare
// lexicographically, so a simple >= works. Computed the same on server + client.
function sydneyToday(): string {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "Australia/Sydney",
  });
}

export const functionEnquirySchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^[\d\s+()\\-]{6,20}$/)
    .optional()
    .or(z.literal("")),
  groupSize: z.coerce.number().int().min(6).max(100),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a preferred date.")
    .refine((d) => d >= sydneyToday(), "Pick a date from today onwards."),
  preferredTime: z.enum(["17-21", "18-22", "19-23", "other"]),
  occasion: z.enum(["birthday", "eofy", "corporate", "hens-bucks", "other"]),
  machinePreference: z.string().max(120).optional().or(z.literal("")),
  drinksStyle: z.enum(["bar-tab", "cash-bar", "mixed"]),
  food: z.boolean(),
  notes: z.string().max(600).optional().or(z.literal("")),
  consent: z.literal(true),
  honeypot: z.string().max(0),
  turnstileToken: z.string().min(10),
});

export type FunctionEnquiryInput = z.infer<typeof functionEnquirySchema>;
