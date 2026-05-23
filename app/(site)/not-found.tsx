import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="font-accent text-xs text-high-score-orange">404</p>
      <h1 className="font-display text-4xl font-bold text-crema md:text-5xl">
        This page is out of order.
      </h1>
      <p className="font-body text-lg text-crema/70">
        The bar is not. Try Machines or What&rsquo;s On.
      </p>
      <div className="flex flex-wrap gap-4">
        <CTAButton href="/machines" variant="primary">
          Machines
        </CTAButton>
        <CTAButton href="/whats-on" variant="secondary">
          What&rsquo;s on
        </CTAButton>
      </div>
    </Container>
  );
}
