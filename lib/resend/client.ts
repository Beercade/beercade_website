import { Resend } from "resend";
import { FunctionEnquiryCustomer } from "@/lib/email-templates/FunctionEnquiryCustomer";
import { FunctionEnquiryTeam } from "@/lib/email-templates/FunctionEnquiryTeam";
import type { FunctionEnquiryInput } from "@/lib/validation/function-enquiry";

// Lazy so a missing RESEND_API_KEY doesn't throw at module load and crash the
// whole /functions page render. The throw, if any, happens at send time.
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendTeamNotification(
  data: FunctionEnquiryInput,
  calendarEventId: string,
  calendarEventUrl?: string
) {
  const { data: sent, error } = await getResend().emails.send({
    from: `Beercade Bookings <${process.env.RESEND_FROM_HELLO!}>`,
    to: [process.env.TEAM_INBOX!],
    replyTo: data.email,
    subject: `New enquiry — ${data.name} (${data.groupSize} on ${data.preferredDate})`,
    react: FunctionEnquiryTeam({ data, calendarEventId, calendarEventUrl }),
  });
  if (error) {
    throw new Error(
      `Resend team notification failed: ${error.message ?? JSON.stringify(error)}`
    );
  }
  return sent;
}

export async function sendCustomerAutoresponder(data: FunctionEnquiryInput) {
  const { data: sent, error } = await getResend().emails.send({
    from: `Beercade <${process.env.RESEND_FROM_FUNCTIONS!}>`,
    to: data.email,
    replyTo: process.env.RESEND_REPLY_TO!,
    subject: "Got your enquiry — Beercade",
    react: FunctionEnquiryCustomer({
      name: data.name,
      groupSize: data.groupSize,
      preferredDate: data.preferredDate,
    }),
  });
  if (error) {
    throw new Error(
      `Resend customer autoresponder failed: ${error.message ?? JSON.stringify(error)}`
    );
  }
  return sent;
}
