import Link from "next/link";
import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { brandName, visible } from "@/config/visibility";
import { getContact, telHref } from "@/lib/contact";
import { fill, getContent } from "@/lib/i18n";
import { GA_ID } from "@/lib/analytics";
import { FooterNotices } from "@/components/content/Compliance";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layout";
import { Pending } from "@/components/ui/Pending";
import { AnalyticsPreferencesButton } from "./Analytics";
import { navItems } from "./Header";
import { Logo } from "./Logo";

export function Footer({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  const contact = getContact();
  const area = visible(site.serviceArea);
  const linkClass = "underline-offset-4 hover:underline";

  return (
    <footer className="bg-brand-strong pb-28 text-white lg:pb-0">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-5">
          <Logo name={brandName(site)} tagline={ui.home.eyebrow} inverted />
          <div className="space-y-3 text-lg">
            <h2 className="font-sans text-base font-bold tracking-wide text-white/80 uppercase">{ui.footer.contactTitle}</h2>
            {contact.phone ? (
              <a href={telHref(contact.phone.e164)} className={`flex items-center gap-2 ${linkClass}`} data-event="call_click" data-location="footer">
                <Icon name="phone" className="size-5" /> {contact.phone.display}
              </a>
            ) : (
              <Pending marker={ui.pending.marker} label={ui.pending.phone} />
            )}
            {contact.email ? (
              <a href={`mailto:${contact.email}`} className={`flex items-center gap-2 break-all ${linkClass}`} data-event="email_click" data-location="footer">
                <Icon name="mail" className="size-5" /> {contact.email}
              </a>
            ) : (
              <Pending marker={ui.pending.marker} label={ui.pending.email} />
            )}
            {area ? (
              <p className="flex items-center gap-2">
                <Icon name="map-pin" className="size-5" /> {area[locale]}
              </p>
            ) : (
              <Pending marker={ui.pending.marker} label={ui.pending.serviceArea} />
            )}
          </div>
        </div>

        <nav aria-label={ui.footer.pagesTitle}>
          <h2 className="font-sans text-base font-bold tracking-wide text-white/80 uppercase">{ui.footer.pagesTitle}</h2>
          <ul className="mt-3 space-y-2 text-lg">
            {navItems(locale).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-base font-bold tracking-wide text-white/80 uppercase">{ui.footer.legalTitle}</h2>
          <ul className="mt-3 space-y-2 text-lg">
            <li>
              <Link href={pathFor({ kind: "page", id: "privacy" }, locale, site)} className={linkClass}>
                {ui.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={pathFor({ kind: "page", id: "disclaimers" }, locale, site)} className={linkClass}>
                {ui.footer.disclaimers}
              </Link>
            </li>
            {GA_ID && (
              <li>
                <AnalyticsPreferencesButton label={ui.footer.analytics} />
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="space-y-5 py-8">
          <FooterNotices locale={locale} />
          <p className="text-base text-white/75">{fill(ui.footer.rights, { year: new Date().getFullYear() })}</p>
        </Container>
      </div>
    </footer>
  );
}
