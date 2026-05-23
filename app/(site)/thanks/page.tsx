import type { Metadata } from "next";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Enquiry received",
  robots: { index: false },
};

export default function ThanksPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="font-accent text-xs text-high-score-orange">Done.</p>
      <h1 className="font-display text-4xl font-bold text-crema md:text-5xl">
        Enquiry received.
      </h1>
      <p className="max-w-sm font-body text-lg text-crema/70">
        We&rsquo;ll be in touch within 24 hours with the details. If you need us
        sooner, reply to the confirmation email.
      </p>
      <div className="flex flex-wrap gap-4">
        <CTAButton href="/machines" variant="primary">
          See the machines
        </CTAButton>
        <CTAButton href="/whats-on" variant="secondary">
          What&rsquo;s on
        </CTAButton>
      </div>
    </Container>
  );
}
