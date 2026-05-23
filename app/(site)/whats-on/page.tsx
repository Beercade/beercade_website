import type { Metadata } from "next";
import { sanityClient } from "@/lib/sanity/client";
import {
  upcomingEventsQuery,
  whatsOnQuery,
  openingHoursQuery,
} from "@/lib/sanity/queries";
import { EventCard } from "@/components/event/EventCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import type { SanityImageSource } from "@sanity/image-url";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "What's on",
  description:
    "Upcoming tournaments, league nights, and standing events at Beercade Redfern.",
};

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  kicker?: string | null;
  kind: string;
  startDate: string;
  endDate?: string | null;
  recurring?: string | null;
  entry?: string | null;
  prize?: string | null;
  status: "upcoming" | "live" | "wrapped" | "cancelled";
  hero?: (SanityImageSource & { alt?: string }) | null;
}

interface WhatsOn {
  _id: string;
  dayOfWeek: string;
  title: string;
  summary?: string | null;
}

const DAY_ORDER = ["Wed", "Thu", "Fri", "Sat", "Sun"];

export default async function WhatsOnPage() {
  const [events, standingNights] = await Promise.all([
    sanityClient.fetch<Event[]>(upcomingEventsQuery),
    sanityClient.fetch<WhatsOn[]>(whatsOnQuery),
  ]);

  const sorted = [...standingNights].sort(
    (a, b) => DAY_ORDER.indexOf(a.dayOfWeek) - DAY_ORDER.indexOf(b.dayOfWeek)
  );

  return (
    <div className="py-16">
      <Container>
        <SectionHeading as="h1" className="mb-12">
          What&rsquo;s on.
        </SectionHeading>

        {/* Upcoming events */}
        {events.length > 0 && (
          <section className="mb-20" aria-labelledby="upcoming-heading">
            <h2
              id="upcoming-heading"
              className="mb-6 font-display text-xl font-semibold text-crema"
            >
              Upcoming
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} {...event} />
              ))}
            </div>
          </section>
        )}

        {/* Standing nights */}
        {sorted.length > 0 && (
          <section aria-labelledby="standing-heading">
            <h2
              id="standing-heading"
              className="mb-6 font-display text-xl font-semibold text-crema"
            >
              Every week
            </h2>
            <div className="flex flex-wrap gap-4">
              {sorted.map((night) => (
                <div
                  key={night._id}
                  className="min-w-[200px] flex-1 border border-tilt-purple/30 bg-last-train-purple p-5"
                >
                  <p className="font-body text-xs uppercase tracking-widest text-high-score-orange">
                    {night.dayOfWeek}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold text-crema">
                    {night.title}
                  </p>
                  {night.summary && (
                    <p className="mt-2 font-body text-sm text-crema/60">
                      {night.summary}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {events.length === 0 && sorted.length === 0 && (
          <p className="font-body text-crema/50">
            {/* PLACEHOLDER: shown before Sanity content is entered */}
            Nothing scheduled yet. Check back soon.
          </p>
        )}
      </Container>
    </div>
  );
}
