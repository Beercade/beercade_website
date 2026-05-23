"use client";

import { useState } from "react";

const MAP_SRC =
  "https://maps.google.com/maps?q=113+Regent+Street,+Redfern+NSW+2016&output=embed";

export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-sm">
      {loaded ? (
        <iframe
          src={MAP_SRC}
          title="Beercade location — 113 Regent Street, Redfern NSW 2016"
          width="100%"
          height="400"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block border-0"
        />
      ) : (
        <div className="flex h-[400px] flex-col items-center justify-center gap-4 bg-after-dark text-center">
          <div className="space-y-1">
            <p className="font-display text-base font-bold text-crema">
              113 Regent Street
            </p>
            <p className="font-body text-sm text-crema/60">
              Redfern NSW 2016
            </p>
          </div>
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="rounded-sm border border-tilt-purple/50 px-5 py-2.5 font-body text-sm text-crema transition-colors hover:border-tilt-purple hover:bg-tilt-purple/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tilt-purple"
          >
            Load map
          </button>
          <p className="font-body text-xs text-crema/40">
            Loads Google Maps — subject to Google&rsquo;s privacy policy.
          </p>
        </div>
      )}
    </div>
  );
}
