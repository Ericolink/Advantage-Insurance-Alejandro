// URL table for both languages. Every link and the language switcher go through these helpers.
import type { Locale, ServiceId, SiteConfig } from "./types.ts";

export const locales = ["en", "es"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Static pages and their translated slugs. Changing a slug here changes it everywhere. */
export const pageSlugs = {
  about: { en: "about", es: "sobre-alejandro" },
  services: { en: "services", es: "servicios" },
  newToMedicare: { en: "new-to-medicare", es: "nuevo-en-medicare" },
  faq: { en: "faq", es: "preguntas-frecuentes" },
  contact: { en: "contact", es: "contacto" },
  privacy: { en: "privacy", es: "privacidad" },
  disclaimers: { en: "disclaimers", es: "avisos" },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageId = keyof typeof pageSlugs;
export const pageIds = Object.keys(pageSlugs) as PageId[];

export type Route = { kind: "home" } | { kind: "page"; id: PageId } | { kind: "service"; id: ServiceId };

export function pathFor(route: Route, locale: Locale, site: SiteConfig): string {
  if (route.kind === "home") return `/${locale}`;
  if (route.kind === "page") return `/${locale}/${pageSlugs[route.id][locale]}`;
  const service = site.services.find((item) => item.id === route.id);
  if (!service) throw new Error(`Unknown service: ${route.id}`);
  return `/${locale}/${pageSlugs.services[locale]}/${service.slug[locale]}`;
}

/** Turns URL segments after the locale into a route, or null for unknown URLs. */
export function resolveSegments(segments: string[], locale: Locale, site: SiteConfig): Route | null {
  if (segments.length === 0) return { kind: "home" };
  const page = pageIds.find((id) => pageSlugs[id][locale] === segments[0]);
  if (!page) return null;
  if (segments.length === 1) return { kind: "page", id: page };
  if (page !== "services" || segments.length !== 2) return null;
  const service = site.services.find((item) => item.status !== "not-offered" && item.slug[locale] === segments[1]);
  return service ? { kind: "service", id: service.id } : null;
}

/** Equivalent URL in another language, for the language switcher. Falls back to that language's home page. */
export function translatePath(pathname: string, target: Locale, site: SiteConfig): string {
  const [first, ...rest] = pathname.split("/").filter(Boolean);
  if (!first || !hasLocale(first)) return `/${target}`;
  const route = resolveSegments(rest.map(decodeURIComponent), first, site);
  return route ? pathFor(route, target, site) : `/${target}`;
}

/** The same route in every language (for hreflang and the sitemap). */
export const alternatePaths = (route: Route, site: SiteConfig) =>
  Object.fromEntries(locales.map((locale) => [locale, pathFor(route, locale, site)])) as Record<Locale, string>;
