// Contact details ready for display, honoring the confirmed/pending rules of src/config/visibility.ts.
import { site } from "@/config/site";
import { visible } from "@/config/visibility";

/** "+15551234567" → "(555) 123-4567". Other formats are returned unchanged. */
export function formatUsPhone(e164: string): string {
  const match = /^\+1(\d{3})(\d{3})(\d{4})$/.exec(e164);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : e164;
}

export const telHref = (e164: string) => `tel:${e164}`;

export const whatsappHref = (e164: string, message: string) =>
  `https://wa.me/${e164.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

export interface PhoneInfo {
  e164: string;
  display: string;
  pending: boolean;
}

const phoneInfo = (value: string | null, pending: boolean): PhoneInfo | null =>
  value ? { e164: value, display: formatUsPhone(value), pending } : null;

/** Everything a contact button needs. Null values mean "don't render a button" (see the Pending marker instead). */
export function getContact() {
  const scheduling = visible(site.scheduling);
  return {
    phone: phoneInfo(visible(site.phone), site.phone.status === "pending"),
    whatsapp: phoneInfo(visible(site.whatsapp), site.whatsapp.status === "pending"),
    email: visible(site.email),
    emailPending: site.email.status === "pending",
    scheduling: scheduling ? { ...scheduling, pending: site.scheduling.status === "pending" } : null,
  };
}

export type Contact = ReturnType<typeof getContact>;
