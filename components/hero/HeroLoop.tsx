"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { CTAButton } from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils/cn";
import type { SanityImageSource } from "@sanity/image-url";

interface HeroLoopProps {
  videoUrl?: string | null;
  poster?: (SanityImageSource & { alt?: string }) | null;
  headline?: string | null;
  subline?: string | null;
  ctaLabel?: string | null;
  ctaTarget?: string | null;
}

export function HeroLoop({
  videoUrl,
  poster,
  headline,
  subline,
  ctaLabel = "BOOK A FUNCTION",
  ctaTarget = "/functions",
}: HeroLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <section
      className="relative flex min-h-[90svh] items-end overflow-hidden bg-tilt-purple"
      aria-label="Hero"
    >
      {/* Background video or poster */}
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          aria-hidden="true"
        />
      ) : poster ? (
        <Image
          src={urlFor(poster).width(1920).height(1080).auto("format").url()}
          alt={poster.alt ?? "Beercade venue"}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
      ) : null}

      {/* Scanline overlay — on-brand graphic device per brand guide §8 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgb(0 0 0 / 0.05) 3px, rgb(0 0 0 / 0.05) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full pb-16 pt-24">
        <div className="mx-auto w-full max-w-layout px-[var(--grid-gutter-mobile)] md:px-[var(--grid-gutter)]">
          {headline ? (
            <h1 className="max-w-3xl font-display text-5xl font-bold text-crema md:text-7xl lg:text-8xl">
              {headline}
            </h1>
          ) : (
            <h1 className="max-w-3xl font-display text-5xl font-bold text-crema md:text-7xl lg:text-8xl">
              {/* FILLME: in-voice hero headline */}
              The pub night that actually has something to do.
            </h1>
          )}
          {subline && (
            <p className="mt-4 max-w-xl font-body text-lg text-crema/80">
              {subline}
            </p>
          )}
          <div className="mt-10">
            <CTAButton
              href={ctaTarget ?? "/functions"}
              variant="primary"
              className="px-8 py-4 text-base"
            >
              {ctaLabel ?? "BOOK A FUNCTION"}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
