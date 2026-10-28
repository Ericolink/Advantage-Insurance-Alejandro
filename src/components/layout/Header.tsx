import Link from "next/link";
import { pathFor, type PageId } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { brandName } from "@/config/visibility";
import { getContent } from "@/lib/i18n";
import { CallButton } from "@/components/content/ContactButtons";
import { Container } from "@/components/ui/Layout";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { DesktopNav, MobileNav, type NavItem } from "./Navigation";

export function navItems(locale: Locale): NavItem[] {
  const { ui } = getContent(locale);
  const page = (id: PageId) => pathFor({ kind: "page", id }, locale, site);
  return [
    { href: page("services"), label: ui.nav.services },
    { href: page("newToMedicare"), label: ui.nav.newToMedicare },
    { href: page("about"), label: ui.nav.about },
    { href: page("faq"), label: ui.nav.faq },
    { href: page("contact"), label: ui.nav.contact },
  ];
}

export function Header({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  const items = navItems(locale);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur-sm">
      <Container className="relative flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href={`/${locale}`} className="shrink-0 rounded-control" aria-label={`${brandName(site)} — ${ui.common.home}`}>
          <Logo name={brandName(site)} tagline={ui.home.eyebrow} />
        </Link>
        <DesktopNav items={items} label={ui.nav.label} />
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} label={ui.nav.switchTo} ariaLabel={ui.nav.switchToLabel} />
          <div className="hidden 2xl:block">
            <CallButton ui={ui} location="header" variant="primary" />
          </div>
          <MobileNav items={items} label={ui.nav.label} openLabel={ui.nav.menu} closeLabel={ui.nav.closeMenu} />
        </div>
      </Container>
    </header>
  );
}
