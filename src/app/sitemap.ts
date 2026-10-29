import type { MetadataRoute } from "next";
import { alternatePaths, legalPageIds, locales, pageIds, type Route } from "@/config/routes";
import { site } from "@/config/site";
import { pageApproval, reviewMode } from "@/config/visibility";
import { localeTags } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  // No sitemap until there is a production domain, and never in review mode.
  if (!site.url || reviewMode) return [];
  const base = site.url;
  const isLegal = (id: string) => (legalPageIds as readonly string[]).includes(id);

  // Only approved pages and confirmed services: drafts are noindex and stay out of the sitemap too.
  const routes: { route: Route; priority: number }[] = [
    { route: { kind: "home" }, priority: 1 },
    ...pageIds.filter((id) => pageApproval(site, id) === "confirmed").map((id) => ({ route: { kind: "page", id } as Route, priority: isLegal(id) ? 0.2 : 0.8 })),
    ...(pageApproval(site, "service") === "confirmed" ? site.services.filter((service) => service.status === "confirmed") : []).map((service) => ({
      route: { kind: "service", id: service.id } as Route,
      priority: 0.7,
    })),
  ];

  return routes.flatMap(({ route, priority }) => {
    const paths = alternatePaths(route, site);
    return locales.map((locale) => ({
      url: `${base}${paths[locale]}`,
      priority,
      alternates: { languages: Object.fromEntries(locales.map((code) => [localeTags[code], `${base}${paths[code]}`])) },
    }));
  });
}
