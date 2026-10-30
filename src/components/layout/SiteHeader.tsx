import Link from "next/link";
import { pathFor, type PageId } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { brandName } from "@/config/visibility";
import { getContent } from "@/lib/i18n";
import { CallButton, ScheduleButton } from "@/components/content/ContactButtons";
import { Container } from "@/components/ui/Section";
import { BrandMark } from "./BrandMark";
import { LanguageSwitch } from "./LanguageSwitch";
import { MainNav, type NavItem } from "./MainNav";
import { MobileMenu } from "./MobileMenu";
import { TopBar } from "./TopBar";

export function navItems(locale: Locale, long = false): NavItem[] {
  const { ui } = getContent(locale);
  const page = (id: PageId) => pathFor({ kind: "page", id }, locale, site);
  return [
    { href: pathFor({ kind: "home" }, locale, site), label: ui.nav.home },
    { href: page("about"), label: long ? ui.nav.aboutLong : ui.nav.about },
    { href: page("services"), label: ui.nav.services },
    { href: page("newToMedicare"), label: ui.nav.newToMedicare },
    { href: page("faq"), label: ui.nav.faq },
    { href: page("contact"), label: ui.nav.contact },
  ];
}

/** Top bar + header. Not sticky (design sheet 03): the phone lives in the top bar, the header, the hero and every CTA band. */
export function SiteHeader({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  return (
    <header>
      <TopBar locale={locale} />
      <div className="border-b border-gray-200 bg-white">
        <Container className="flex flex-wrap items-center gap-x-3 sm:gap-x-4">
          <Link href={`/${locale}`} className="mr-auto rounded-md py-4" aria-label={`${brandName(site)} — ${ui.common.home}`}>
            <BrandMark name={brandName(site)} tagline={ui.brand.tagline} />
          </Link>
          <MainNav items={navItems(locale)} label={ui.nav.label} />
          {/* Wrapper carries the visibility: the button's own inline-flex would override `hidden`. */}
          <div className="hidden xl:block">
            <ScheduleButton ui={ui} locale={locale} location="header" size="md" className="whitespace-nowrap" />
          </div>
          <MobileMenu items={navItems(locale, true)} label={ui.nav.label} openLabel={ui.nav.menu} closeLabel={ui.nav.close}>
            <LanguageSwitch locale={locale} groupLabel={ui.topBar.languageLabel} switchLabel={ui.nav.switchToLabel} tone="light" />
            <ScheduleButton ui={ui} locale={locale} location="mobile_menu" className="w-full" />
            <CallButton ui={ui} location="mobile_menu" className="w-full" />
          </MobileMenu>
        </Container>
      </div>
    </header>
  );
}
