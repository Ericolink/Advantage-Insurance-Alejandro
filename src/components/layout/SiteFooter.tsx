import Link from "next/link";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { brandName, visible } from "@/config/visibility";
import { getContact, telHref } from "@/lib/contact";
import { fill, getContent } from "@/lib/i18n";
import { DisclosureBlock } from "@/components/content/DisclosureBlock";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Section";
import { Pending } from "@/components/ui/Pending";
import { BrandMark } from "./BrandMark";
import { LegalNav } from "./LegalNav";
import { navItems } from "./SiteHeader";

/** Navy footer: reversed logo, page links, contact, legal links and the disclosure block. */
export function SiteFooter({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  const contact = getContact();
  const area = visible(site.serviceArea);
  const heading = "text-small font-bold tracking-[0.08em] text-white/85 uppercase";
  const link = "inline-flex min-h-tap items-center gap-2 underline-offset-4 hover:underline";

  return (
    <footer data-surface="dark" className="bg-navy-900 text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <BrandMark name={brandName(site)} tagline={ui.brand.tagline} variant="dark" />
        </div>

        <nav aria-label={ui.footer.pagesTitle}>
          <h2 className={heading}>{ui.footer.pagesTitle}</h2>
          <ul className="mt-3">
            {navItems(locale, true).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>{ui.footer.contactTitle}</h2>
          <ul className="mt-3 space-y-1">
            <li>
              {contact.phone ? (
                <a href={telHref(contact.phone.e164)} className={link} aria-label={fill(ui.cta.callAria, { phone: contact.phone.display })} data-event="call_click" data-location="footer">
                  <Icon name="phone" className="size-5" /> {contact.phone.display}
                </a>
              ) : (
                <Pending tone="dark" marker={ui.pending.marker} label={ui.pending.phone} />
              )}
            </li>
            <li>
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className={`${link} break-all`} data-event="email_click" data-location="footer">
                  <Icon name="mail" className="size-5" /> {contact.email}
                </a>
              ) : (
                <Pending tone="dark" marker={ui.pending.marker} label={ui.pending.email} />
              )}
            </li>
            <li>
              {area ? (
                <p className="flex min-h-tap items-center gap-2">
                  <Icon name="map-pin" className="size-5" /> {area[locale]}
                </p>
              ) : (
                <Pending tone="dark" marker={ui.pending.marker} label={ui.pending.serviceArea} />
              )}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="space-y-6 py-8">
          <LegalNav locale={locale} />
          <DisclosureBlock locale={locale} />
          <p className="text-small text-white/85">{fill(ui.footer.rights, { year: new Date().getFullYear() })}</p>
        </Container>
      </div>
    </footer>
  );
}
