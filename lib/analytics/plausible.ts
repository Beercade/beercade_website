declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number> }
    ) => void;
  }
}

export type PlausibleEvent =
  | "function-enquiry-submitted"
  | "newsletter-signup"
  | "cta-click-functions"
  | "cta-click-event";

export function trackEvent(
  name: PlausibleEvent,
  props?: Record<string, string | number>
) {
  if (typeof window === "undefined") return;
  window.plausible?.(name, props ? { props } : undefined);
}
