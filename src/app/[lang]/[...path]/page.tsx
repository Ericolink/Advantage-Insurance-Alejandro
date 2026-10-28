// Every inner page, in both languages, with translated URLs from src/config/routes.ts.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales, pageIds, pageSlugs, resolveSegments, type Route } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { visibleServices } from "@/config/visibility";
import { fill, getContent } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { AboutPage } from "@/components/pages/AboutPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { FaqPage, GuidePage, ServicePage, ServicesIndexPage } from "@/components/pages/ContentPages";
import { DisclaimersPage, PrivacyPage } from "@/components/pages/LegalPages";

type Props = { params: Promise<{ lang: string; path: string[] }> };

// Only URLs generated below exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => [
    ...pageIds.map((id) => ({ lang, path: [pageSlugs[id][lang]] })),
    ...visibleServices(site).map((service) => ({ lang, path: [pageSlugs.services[lang], service.slug[lang]] })),
  ]);
}

async function resolve(params: Props["params"]): Promise<{ locale: Locale; route: Exclude<Route, { kind: "home" }> } | null> {
  const { lang, path } = await params;
  if (!hasLocale(lang)) return null;
  const route = resolveSegments(path.map(decodeURIComponent), lang, site);
  if (!route || route.kind === "home") return null;
  // Services hidden in this mode (pending on the public site, or not offered) do not exist.
  if (route.kind === "service" && !visibleServices(site).some((service) => service.id === route.id)) return null;
  return { locale: lang, route };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const match = await resolve(params);
  if (!match) return {};
  const { locale, route } = match;
  const { ui, services, guide, legal } = getContent(locale);

  const meta: { title: string; description: string } =
    route.kind === "service"
      ? { title: services[route.id].metaTitle, description: services[route.id].metaDescription }
      : {
          about: { title: ui.about.metaTitle, description: ui.about.metaDescription },
          services: { title: ui.services.metaTitle, description: ui.services.metaDescription },
          newToMedicare: { title: guide.metaTitle, description: guide.metaDescription },
          faq: { title: ui.home.faqTitle, description: ui.meta.faqDescription },
          contact: { title: ui.contact.metaTitle, description: ui.contact.metaDescription },
          privacy: { title: legal.privacy.metaTitle, description: legal.privacy.metaDescription },
          disclaimers: { title: legal.disclaimers.metaTitle, description: legal.disclaimers.metaDescription },
        }[route.id];

  return pageMetadata({ locale, route, title: fill(meta.title), description: fill(meta.description) });
}

export default async function InnerPage({ params }: Props) {
  const match = await resolve(params);
  if (!match) notFound();
  const { locale, route } = match;

  if (route.kind === "service") return <ServicePage locale={locale} id={route.id} />;
  switch (route.id) {
    case "about":
      return <AboutPage locale={locale} />;
    case "services":
      return <ServicesIndexPage locale={locale} />;
    case "newToMedicare":
      return <GuidePage locale={locale} />;
    case "faq":
      return <FaqPage locale={locale} />;
    case "contact":
      return <ContactPage locale={locale} />;
    case "privacy":
      return <PrivacyPage locale={locale} />;
    case "disclaimers":
      return <DisclaimersPage locale={locale} />;
  }
}
