import { google } from "googleapis";
import type { FunctionEnquiryInput } from "@/lib/validation/function-enquiry";

function getCalendarClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return google.calendar({ version: "v3", auth });
}

const TIME_WINDOWS: Record<string, [number, number]> = {
  "17-21": [17, 21],
  "18-22": [18, 22],
  "19-23": [19, 23],
  other: [18, 22],
};

export async function createTentativeCalendarEvent(
  data: FunctionEnquiryInput
): Promise<{ id: string; htmlLink?: string }> {
  const calendar = getCalendarClient();
  const [startHour, endHour] = TIME_WINDOWS[data.preferredTime] ?? [18, 22];
  const dateBase = data.preferredDate;

  const event = await calendar.events.insert({
    calendarId: process.env.GOOGLE_BOOKINGS_CALENDAR_ID!,
    requestBody: {
      summary: `[TENTATIVE] ${data.name} · ${data.groupSize} pax · ${data.occasion}`,
      description: [
        `Function enquiry from ${data.name} (${data.email}${data.phone ? ", " + data.phone : ""})`,
        `Group size: ${data.groupSize}`,
        `Drinks: ${data.drinksStyle}`,
        `Food: ${data.food ? "yes" : "no"}`,
        data.machinePreference ? `Machines: ${data.machinePreference}` : null,
        data.notes ? `Notes: ${data.notes}` : null,
        "",
        "Workflow: flip status to 'confirmed' when booked. Update the matching enquiry in Sanity studio.",
      ]
        .filter(Boolean)
        .join("\n"),
      start: {
        dateTime: `${dateBase}T${String(startHour).padStart(2, "0")}:00:00+10:00`,
        timeZone: "Australia/Sydney",
      },
      end: {
        dateTime: `${dateBase}T${String(endHour).padStart(2, "0")}:00:00+10:00`,
        timeZone: "Australia/Sydney",
      },
      status: "tentative",
      transparency: "opaque",
    },
  });

  return {
    id: event.data.id!,
    htmlLink: event.data.htmlLink ?? undefined,
  };
}
