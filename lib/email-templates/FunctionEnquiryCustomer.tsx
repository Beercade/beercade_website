import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface Props {
  name: string;
  groupSize: number;
  preferredDate: string;
}

export function FunctionEnquiryCustomer({ name, groupSize, preferredDate }: Props) {
  return (
    <Html>
      <Head />
      <Preview>We got your enquiry. We&rsquo;ll be back to you inside 24 hours.</Preview>
      <Body
        style={{
          background: "#2A1745",
          color: "#F7EFE3",
          fontFamily: "Inter, sans-serif",
          padding: 24,
        }}
      >
        <Container style={{ maxWidth: 560, margin: "0 auto" }}>
          <Heading
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#F7EFE3",
            }}
          >
            Thanks {name} &mdash; got it.
          </Heading>
          <Text>
            We&rsquo;ve got your enquiry for {groupSize} people on{" "}
            {preferredDate}. One of us will be back to you inside 24 hours with
            the room hold, the package detail, and a couple of options.
          </Text>
          <Text>
            If you want to grab us sooner, reply to this email &mdash; it goes
            straight to the team.
          </Text>
          <Text>
            &mdash; Beercade, Redfern. Two minutes from the station.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
