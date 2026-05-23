import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import type { FunctionEnquiryInput } from "@/lib/validation/function-enquiry";

interface Props {
  data: FunctionEnquiryInput;
  calendarEventId: string;
  calendarEventUrl?: string;
}

export function FunctionEnquiryTeam({ data, calendarEventId, calendarEventUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        New function enquiry &mdash; {data.name}, {String(data.groupSize)} on{" "}
        {data.preferredDate}
      </Preview>
      <Body style={{ fontFamily: "Inter, sans-serif" }}>
        <Container>
          <Heading>New function enquiry</Heading>
          <Text>
            <strong>{data.name}</strong> ({data.email}
            {data.phone ? `, ${data.phone}` : ""})
          </Text>
          <Text>
            {String(data.groupSize)} people &middot; {data.preferredDate} &middot;{" "}
            {data.preferredTime}
          </Text>
          <Text>
            Occasion: {data.occasion} &middot; Drinks: {data.drinksStyle}{" "}
            &middot; Food: {data.food ? "yes" : "no"}
          </Text>
          {data.machinePreference && (
            <Text>Machines: {data.machinePreference}</Text>
          )}
          {data.notes && <Text>Notes: {data.notes}</Text>}
          <Hr />
          <Text>Tentative event on Bookings calendar: {calendarEventId}</Text>
          {calendarEventUrl && (
            <Text>
              <a href={calendarEventUrl}>Open in Google Calendar</a>
            </Text>
          )}
          <Text style={{ color: "#666" }}>
            Reply directly from the group inbox so the conversation stays
            threaded for the team. Update enquiry status in the Sanity studio as
            you progress.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
