"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { CTAButton } from "@/components/ui/CTAButton";
import type { SanityImageSource } from "@sanity/image-url";

const KB_CLASSES = ["kb-1", "kb-2", "kb-3", "kb-4"] as const;

export interface HeroSlide {
  _key: string;
  mediaType: "image" | "video";
  videoUrl?: string | null;
  image?: (SanityImageSource & { alt?: string }) | null;
}

interface HeroLoopProps {
  slides?: HeroSlide[] | null;
  headline?: string | null;
  subline?: string | null;
  ctaLabel?: string | null;
  ctaTarget?: string | null;
  // Legacy single-media props kept for backward compat
  videoUrl?: string | null;
  poster?: (SanityImageSource & { alt?: string }) | null;
}

const SLIDE_DURATION = 6000;
const FADE_DURATION = 600;

export function HeroLoop({
  slides,
  headline,
  subline,
  ctaLabel = "BOOK A FUNCTION",
  ctaTarget = "/functions",
  videoUrl,
  poster,
}: HeroLoopProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [fadingIdx, setFadingIdx] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build a normalised slide list — fall back to legacy single-media props
  const normalisedSlides: HeroSlide[] = slides?.length
    ? slides
    : videoUrl
    ? [{ _key: "legacy-video", mediaType: "video", videoUrl }]
    : poster
    ? [{ _key: "legacy-poster", mediaType: "image", image: poster }]
    : [];

  const hasMultiple = normalisedSlides.length > 1;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (reducedMotion || !hasMultiple) return;

    timerRef.current = setTimeout(() => {
      const next = (activeIdx + 1) % normalisedSlides.length;
      setFadingIdx(activeIdx);
      setActiveIdx(next);
      setTimeout(() => setFadingIdx(null), FADE_DURATION);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIdx, reducedMotion, hasMultiple, normalisedSlides.length]);

  const goTo = (idx: number) => {
    if (idx === activeIdx) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setFadingIdx(activeIdx);
    setActiveIdx(idx);
    setTimeout(() => setFadingIdx(null), FADE_DURATION);
  };

  return (
    <section
      className="relative flex min-h-[90svh] items-end overflow-hidden bg-tilt-purple"
      aria-label="Hero"
    >
      {/* Slide stack */}
      {normalisedSlides.map((slide, i) => {
        const isActive = i === activeIdx;
        const isFading = i === fadingIdx;
        if (!isActive && !isFading) return null;

        const kbClass = KB_CLASSES[i % KB_CLASSES.length];

        return (
          <div
            key={slide._key}
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: isActive ? 1 : 0,
              transitionDuration: `${FADE_DURATION}ms`,
              zIndex: isActive ? 1 : 0,
            }}
            aria-hidden={!isActive}
          >
            {slide.mediaType === "video" && slide.videoUrl && !reducedMotion ? (
              <video
                src={slide.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover opacity-40"
              />
            ) : slide.mediaType === "image" && slide.image ? (
              <div className={`h-full w-full ${!reducedMotion ? kbClass : ""}`}>
                <Image
                  src={urlFor(slide.image).width(1920).height(1080).auto("format").url()}
                  alt={(slide.image as { alt?: string }).alt ?? "Beercade venue"}
                  fill
                  priority={i === 0}
                  className="object-cover opacity-40"
                  sizes="100vw"
                />
              </div>
            ) : null}
          </div>
        );
      })}

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgb(0 0 0 / 0.05) 3px, rgb(0 0 0 / 0.05) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-[3] w-full pb-16 pt-24">
        <div className="mx-auto w-full max-w-layout px-(--grid-gutter-mobile) md:px-(--grid-gutter)">
          <h1 className="max-w-3xl font-display text-5xl font-bold text-crema md:text-7xl lg:text-8xl">
            {headline ?? (
              /* PLACEHOLDER */
              "The pub night that actually has something to do."
            )}
          </h1>
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

        {/* Slide indicators */}
        {hasMultiple && (
          <div
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2"
            role="tablist"
            aria-label="Hero slides"
          >
            {normalisedSlides.map((slide, i) => (
              <button
                key={slide._key}
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-crema ${
                  i === activeIdx
                    ? "w-8 bg-crema"
                    : "w-1.5 bg-crema/40 hover:bg-crema/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
