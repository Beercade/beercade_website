import type { Metadata } from "next";
import { sanityClient } from "@/lib/sanity/client";
import { allMachinesQuery } from "@/lib/sanity/queries";
import { MachineCard } from "@/components/machine/MachineCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import dynamic from "next/dynamic";
import type { SanityImageSource } from "@sanity/image-url";

const ExitIntentPopup = dynamic(
  () => import("@/components/newsletter/ExitIntentPopup").then((m) => m.ExitIntentPopup),
  { ssr: false }
);

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Machines",
  description:
    "Every machine on the floor — pinball, arcade, racing. 113 Regent Street, Redfern.",
};

interface Machine {
  _id: string;
  name: string;
  slug: { current: string };
  type: string;
  status: "working" | "maintenance" | "down";
  photo: SanityImageSource & { alt?: string };
  description?: string | null;
}

export default async function MachinesPage() {
  const machines: Machine[] = await sanityClient.fetch(allMachinesQuery);

  return (
    <div className="py-16">
      <Container>
        <div className="mb-12 max-w-prose">
          <SectionHeading as="h1">
            {/* FILLME: in-voice intro for the machines page */}
            The machines.
          </SectionHeading>
          <p className="mt-4 font-body text-lg text-crema/70">
            {/* FILLME: one-paragraph in-voice intro */}
          </p>
        </div>

        {machines.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {machines.map((machine) => (
              <MachineCard key={machine._id} {...machine} />
            ))}
          </div>
        ) : (
          <p className="font-body text-crema/50">
            {/* PLACEHOLDER: shown before content is entered in Sanity */}
            Machines loading&hellip;
          </p>
        )}
      </Container>

      <ExitIntentPopup />
    </div>
  );
}
