"use client";

import { useEffect } from "react";
import { trackEvent, type PlausibleEvent } from "@/lib/analytics/plausible";

export function TrackEvent({ name }: { name: PlausibleEvent }) {
  useEffect(() => {
    trackEvent(name);
  }, [name]);

  return null;
}
