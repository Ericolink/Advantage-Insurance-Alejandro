import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { reviewMode } from "@/config/visibility";

export default function robots(): MetadataRoute.Robots {
  // Crawlers stay out until the production domain is set and review mode is off.
  if (!site.url || reviewMode) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
