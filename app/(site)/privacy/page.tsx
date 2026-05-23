import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <Container className="py-16">
      <h1 className="mb-8 font-display text-4xl font-bold text-crema">
        Privacy
      </h1>
      <div className="max-w-prose space-y-4 font-body text-crema/70">
        {/* FILLME: privacy policy copy — consultant to draft */}
        <p>
          Beercade Australia collects personal information (name, email, phone)
          only when you submit a function enquiry or sign up for our newsletter.
          We use this information to respond to your enquiry and, if you
          consent, to send you updates about events.
        </p>
        <p>
          We do not sell or share your personal information with third parties
          except as required to deliver the services you&rsquo;ve requested
          (email delivery via Resend, calendar management via Google).
        </p>
        <p>
          To request access to, correction of, or deletion of your data, email{" "}
          <a
            href="mailto:hello@beercade.com.au"
            className="text-high-score-orange underline underline-offset-4 hover:opacity-80"
          >
            hello@beercade.com.au
          </a>
          .
        </p>
      </div>
    </Container>
  );
}
