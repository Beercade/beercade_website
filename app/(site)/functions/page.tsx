import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import { sanityClient } from "@/lib/sanity/client";
import {
  functionPackagesQuery,
  functionTestimonialsQuery,
} from "@/lib/sanity/queries";
import { FunctionPackageCard } from "@/components/function/FunctionPackageCard";
import { FunctionEnquiryForm } from "@/components/function/FunctionEnquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Functions",
  description:
    "Book the room. Pinball, arcade machines, cold beer — private hire at Beercade Redfern from 6 people.",
};

interface Package {
  _id: string;
  name: string;
  minHeads?: number | null;
  maxHeads?: number | null;
  pricePerHead?: number | null;
  duration?: number | null;
  inclusions?: string[] | null;
  machinesIncluded?: string | null;
  description?: string | null;
}

interface Testimonial {
  _id: string;
  quote: string;
  attribution?: string | null;
  context?: string | null;
}

export default async function FunctionsPage() {
  const [packages, testimonials] = await Promise.all([
    sanityClient.fetch<Package[]>(functionPackagesQuery).catch(() => []),
    sanityClient.fetch<Testimonial[]>(functionTestimonialsQuery).catch(() => []),
  ]);

  return (
    <div className="py-16">
      {/* Pitch */}
      <Container>
        <div className="mb-16 max-w-2xl">
          <SectionHeading as="h1" kicker="Private hire">
            {/* FILLME: in-voice functions pitch headline */}
            Book the room.
          </SectionHeading>
          <div className="mt-6 space-y-4 font-body text-lg text-crema/70">
            {/* FILLME: in-voice functions pitch — 2–3 paragraphs */}
          </div>
        </div>
      </Container>

      {/* Packages */}
      {packages.length > 0 && (
        <section className="bg-tilt-purple/5 py-16" aria-labelledby="packages-heading">
          <Container>
            <h2
              id="packages-heading"
              className="mb-8 font-heading text-2xl font-bold text-crema"
            >
              {/* FILLME: in-voice packages section heading */}
              What&rsquo;s included.
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {packages.map((pkg) => (
                <FunctionPackageCard key={pkg._id} {...pkg} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16" aria-labelledby="testimonials-heading">
          <Container>
            <h2
              id="testimonials-heading"
              className="mb-8 font-heading text-2xl font-bold text-crema"
            >
              What groups say.
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <blockquote
                  key={t._id}
                  className="border border-tilt-purple/30 bg-last-train-purple p-6"
                >
                  <p className="font-body text-base italic text-crema/80">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  {t.attribution && (
                    <footer className="mt-3 font-body text-sm text-crema/50">
                      — {t.attribution}
                      {t.context && <>, {t.context}</>}
                    </footer>
                  )}
                </blockquote>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Enquiry form */}
      <section
        className="border-t border-tilt-purple/30 py-16"
        aria-labelledby="enquire-heading"
      >
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_560px]">
            <div className="space-y-4">
              <h2
                id="enquire-heading"
                className="font-heading text-3xl font-bold text-crema"
              >
                {/* FILLME: in-voice form intro heading */}
                Get in touch.
              </h2>
              <p className="font-body text-crema/60">
                {/* FILLME: in-voice form helper text — one sentence */}
                Fill in the details below and we&rsquo;ll hold the date and come
                back with a quote within 24 hours.
              </p>
            </div>
            <FunctionEnquiryForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
