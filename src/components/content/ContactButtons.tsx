// Contact buttons. Each one either works with configured data or is replaced by a Pending marker (review mode only).
// data-event / data-location are picked up by <TrackClicks> for analytics (no personal data).
import Link from "next/link";
import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import type { UiContent } from "@/content/types";
import { getContact, telHref, whatsappHref } from "@/lib/contact";
import { fill } from "@/lib/i18n";
import { buttonClass, type ButtonVariant } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";

interface Props {
  ui: UiContent;
  location: string;
  variant?: ButtonVariant;
  size?: "lg" | "md";
  className?: string;
  /** Show the number in the label ("Call (555) 123-4567") instead of just "Call". */
  withNumber?: boolean;
}

export function CallButton({ ui, location, variant = "secondary", size = "lg", className = "", withNumber = true }: Props) {
  const { phone } = getContact();
  if (!phone) return <Pending marker={ui.pending.marker} label={ui.pending.phone} />;
  return (
    <a
      href={telHref(phone.e164)}
      className={buttonClass(variant, className, size)}
      aria-label={fill(ui.cta.callAria, { phone: phone.display })}
      data-event="call_click"
      data-location={location}
    >
      <Icon name="phone" className="size-5" />
      {withNumber ? fill(ui.cta.call, { phone: phone.display }) : ui.cta.callShort}
    </a>
  );
}

export function WhatsAppButton({ ui, location, variant = "secondary", size = "lg", className = "" }: Props) {
  const { whatsapp } = getContact();
  // WhatsApp is optional: when it is not configured there is simply no button (the launch check tracks the decision).
  if (!whatsapp) return null;
  return (
    <a
      href={whatsappHref(whatsapp.e164, ui.cta.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClass(variant, className, size)}
      aria-label={`${fill(ui.cta.whatsappAria)} ${ui.common.opensInNewTab}`}
      data-event="whatsapp_click"
      data-location={location}
    >
      <Icon name="message" className="size-5" />
      {ui.cta.whatsapp}
    </a>
  );
}

export function EmailButton({ ui, location, variant = "secondary", size = "lg", className = "" }: Props) {
  const { email } = getContact();
  if (!email) return <Pending marker={ui.pending.marker} label={ui.pending.email} />;
  return (
    <a href={`mailto:${email}`} className={buttonClass(variant, className, size)} data-event="email_click" data-location={location}>
      <Icon name="mail" className="size-5" />
      {ui.cta.email}
    </a>
  );
}

/** Where "Schedule a Consultation" leads: the booking block when a scheduling link exists, otherwise the request form. */
export const scheduleHref = (locale: Locale) => `${pathFor({ kind: "page", id: "contact" }, locale, site)}#${getContact().scheduling ? "schedule" : "request"}`;

/** Main conversion (the one red button of a screen area). */
export function ScheduleButton({ ui, locale, location, variant = "primary", size = "lg", className = "" }: Props & { locale: Locale }) {
  return (
    <Link href={scheduleHref(locale)} className={buttonClass(variant, className, size)} data-location={location}>
      {ui.cta.schedule}
    </Link>
  );
}
