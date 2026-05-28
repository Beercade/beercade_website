import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity/client";
import { upcomingEventsQuery, eventBySlugQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { EventDetail } from "@/components/event/EventDetail";

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const events = await sanityClient
    .fetch<{ slug: { current: string } }[]>(upcomingEventsQuery)
    .catch(() => []);
  return events.map((e) => ({ slug: e.slug.current }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const event = await sanityClient.fetch(eventBySlugQuery, {
    slug: params.slug,
  });
  if (!event) return {};

  return {
    title: event.title,
    description: event.kicker ?? undefined,
    openGraph: event.hero
      ? {
          images: [
            urlFor(event.hero).width(1200).height(630).auto("format").url(),
          ],
        }
      : undefined,
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const event = await sanityClient.fetch(eventBySlugQuery, {
    slug: params.slug,
  });

  if (!event) notFound();

  return <EventDetail {...event} />;
}
