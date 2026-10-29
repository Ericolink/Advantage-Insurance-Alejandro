// Launch check: everything that must be resolved (blocking) or should be reviewed before publishing.
import { hasLeadDestination } from "./lead-env.ts";
import type { Fact, SiteConfig } from "./types.ts";

export interface PendingItem {
  key: string;
  message: string;
  /** Blocking items stop a launch build (REQUIRE_LAUNCH_READY=1). */
  blocking: boolean;
}

const E164_US = /^\+1[2-9]\d{2}[2-9]\d{6}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PLACEHOLDER_DOMAINS = /(example\.(com|org|net)|netlify\.app|vercel\.app|localhost)/i;

export function isValidSiteUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && (parsed.pathname === "/" && !url.endsWith("/")) && !PLACEHOLDER_DOMAINS.test(parsed.hostname);
  } catch {
    return false;
  }
}

const isConfirmed = <T,>(fact: Fact<T>) => fact.status === "confirmed" && fact.value !== null;

export function getPendingItems(site: SiteConfig, env: Record<string, string | undefined> = process.env): PendingItem[] {
  const items: PendingItem[] = [];
  const add = (key: string, message: string, blocking: boolean) => items.push({ key, message, blocking });
  const offered = site.services.filter((service) => service.status === "confirmed");

  // Domain
  if (!site.url) add("url", "Production domain (site.url) is not set.", true);
  else if (!isValidSiteUrl(site.url)) add("url-invalid", `site.url must be https://your-domain.com (no path, no trailing slash, no placeholder domain). Got: ${site.url}`, true);

  // Identity and contact
  if (!isConfirmed(site.agentName)) add("agentName", "Agent name is not confirmed.", true);
  if (site.businessName.status === "pending") add("businessName", "Commercial name: confirm it, or confirm that the agent's own name is used.", false);
  if (site.phone.value && !E164_US.test(site.phone.value)) add("phone-format", "Phone must be in E.164 format: +1XXXXXXXXXX.", true);
  if (site.email.value && !EMAIL.test(site.email.value)) add("email-format", "Email address is not valid.", true);
  if (site.whatsapp.value && !E164_US.test(site.whatsapp.value)) add("whatsapp-format", "WhatsApp number must be in E.164 format: +1XXXXXXXXXX.", true);
  if (!isConfirmed(site.phone)) add("phone", "Business phone is not confirmed.", true);
  if (!isConfirmed(site.email)) add("email", "Business email is not confirmed.", true);
  if (site.whatsapp.status === "pending") add("whatsapp", "WhatsApp: confirm the number, or confirm it is not used (set status confirmed with value null).", false);
  if (!isConfirmed(site.serviceArea)) add("serviceArea", "Service area is not confirmed.", true);
  if (!isConfirmed(site.languages)) add("languages", "Appointment languages are not confirmed.", true);
  if (site.hours.status === "pending") add("hours", "Business hours: confirm them or confirm they will not be published.", false);
  if (site.responseTime.status === "pending") add("responseTime", "Reply time after a form request: confirm it, or confirm none will be promised.", false);

  // Credentials
  if (!isConfirmed(site.licenses) || (site.licenses.value?.length ?? 0) === 0) add("licenses", "At least one verified state license is required.", true);
  if (!isConfirmed(site.npn)) add("npn", "NPN is not confirmed.", true);

  // Profile
  if (!isConfirmed(site.photo)) add("photo", "Professional photo is missing (the public site shows no photo; review mode shows a placeholder).", false);
  if (site.approvals.biography !== "confirmed") add("biography", "Biography has not been provided/approved.", true);
  if (site.scheduling.status === "pending") add("scheduling", "Scheduling link: provide it or confirm it will not be used.", false);
  if (site.social.status === "pending") add("social", "Social profiles: provide them or confirm there are none.", false);

  // Services and regulated content
  if (site.services.some((service) => service.status === "pending")) add("services", "Some services are still pending confirmation (pending services are hidden on the public site).", false);
  if (offered.length === 0) add("services-none", "No service is confirmed yet.", true);
  if (site.approvals.educationalContent !== "confirmed") add("educationalContent", "Educational content (services, New to Medicare) has not been reviewed/approved.", true);
  if (site.approvals.faq !== "confirmed") add("faq", "FAQ answers have not been reviewed/approved.", true);
  if (offered.some((service) => service.medicare) && site.approvals.nonAffiliationNotice !== "confirmed")
    add("nonAffiliation", "Government non-affiliation notice has not been approved.", true);
  if (offered.some((service) => service.requiresTpmo) && !isConfirmed(site.tpmoDisclaimer))
    add("tpmo", "Medicare Advantage / Part D are offered: the exact current TPMO disclaimer is required.", true);
  if (site.marketingDisclaimers.status === "pending") add("marketingDisclaimers", "Carrier/FMO marketing disclaimers: provide them or confirm none are required.", false);
  if (offered.some((service) => service.aca) && site.approvals.acaConsentProcess !== "confirmed")
    add("acaConsent", "ACA Marketplace is offered: the business must approve its consent/documentation process.", true);

  // Legal and lead capture
  if (site.approvals.privacyPolicy !== "confirmed") add("privacyPolicy", "Privacy notice has not been approved.", true);
  if (site.approvals.terms !== "confirmed") add("terms", "Terms of use have not been provided/approved (the page stays hidden on the public site until then).", false);
  if (site.approvals.contactConsent !== "confirmed") add("contactConsent", "Contact-consent wording on the form has not been approved.", true);
  if (!hasLeadDestination(env)) add("leadDestination", "No lead destination: set RESEND_API_KEY + LEAD_EMAIL_TO + LEAD_EMAIL_FROM and/or LEAD_WEBHOOK_URL.", true);

  return items;
}

export const isLaunchReady = (site: SiteConfig, env?: Record<string, string | undefined>) =>
  getPendingItems(site, env).every((item) => !item.blocking);
