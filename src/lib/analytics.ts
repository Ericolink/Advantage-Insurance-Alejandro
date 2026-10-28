// Conversion events. Only the event name, the button's placement and the page language are sent —
// never names, phone numbers, emails, form answers or topics.

export type AnalyticsEvent =
  | "call_click"
  | "whatsapp_click"
  | "email_click"
  | "schedule_click"
  | "schedule_open"
  | "lead_submit_success"
  | "lead_submit_error";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || null;

export function track(event: AnalyticsEvent, params: { location?: string } = {}) {
  if (typeof window === "undefined") return;
  const payload = { ...params, page_language: document.documentElement.lang };
  if (process.env.NODE_ENV !== "production") console.info("[analytics]", event, payload);
  window.gtag?.("event", event, payload);
}
