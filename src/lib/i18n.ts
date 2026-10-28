import { brandName } from "@/config/visibility";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { en } from "@/content/en";
import { es } from "@/content/es";
import type { Content } from "@/content/types";

export { hasLocale, locales, defaultLocale } from "@/config/routes";

/** BCP 47 tags used for <html lang>, hreflang and Open Graph. */
export const localeTags: Record<Locale, string> = { en: "en-US", es: "es-US" };

const content: Record<Locale, Content> = { en, es };
export const getContent = (locale: Locale): Content => content[locale];

/** Values available to every text as {name} and {brand}. */
export const siteVars = { name: site.agentName.value ?? "", brand: brandName(site) };

/** Replaces {placeholders}; unknown placeholders are left untouched so they are easy to spot. */
export function fill(text: string, vars: Record<string, string | number> = {}): string {
  const all: Record<string, string | number> = { ...siteVars, ...vars };
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in all ? String(all[key]) : match));
}
