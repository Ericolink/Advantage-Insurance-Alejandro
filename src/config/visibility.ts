// Decides what may be shown. Pending data is visible only in review mode, never on the public site.
import type { Fact, ServiceConfig, SiteConfig, Status } from "./types.ts";

/**
 * Review mode: local development, or a build with NEXT_PUBLIC_SHOW_PENDING=1 (client review deploys).
 * In review mode pending data appears with a visible marker and the site is not indexable.
 */
export const reviewMode = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PENDING === "1";

/** The fact's value if it may be shown in the current mode, otherwise null. */
export function visible<T>(fact: Fact<T>, review = reviewMode): T | null {
  if (fact.value === null) return null;
  return fact.status === "confirmed" || review ? fact.value : null;
}

/** The value only if confirmed, in any mode (used for structured data and other machine-readable output). */
export const confirmed = <T,>(fact: Fact<T>): T | null => (fact.status === "confirmed" ? fact.value : null);

/** True when an approval-gated text may be shown in the current mode. */
export const approvedOrReview = (status: Status, review = reviewMode) => status === "confirmed" || review;

export function visibleServices(site: SiteConfig, review = reviewMode): ServiceConfig[] {
  return site.services.filter((service) => service.status === "confirmed" || (review && service.status === "pending"));
}

/** Terms of use exist only once provided and approved (or as an outline in review mode). */
export const termsVisible = (site: SiteConfig, review = reviewMode) => approvedOrReview(site.approvals.terms, review);

/**
 * Approval that governs a page's text. Pages whose text is not approved get `noindex`
 * even on an indexable build, so drafts never reach search results.
 */
export function pageApproval(site: SiteConfig, page: "home" | "about" | "services" | "service" | "newToMedicare" | "faq" | "contact" | "privacy" | "terms" | "disclosures"): Status {
  switch (page) {
    case "about":
      return site.approvals.biography;
    case "services":
    case "service":
    case "newToMedicare":
      return site.approvals.educationalContent;
    case "faq":
      return site.approvals.faq;
    case "privacy":
      return site.approvals.privacyPolicy;
    case "terms":
      return site.approvals.terms;
    case "disclosures":
      return site.approvals.nonAffiliationNotice;
    default:
      return "confirmed";
  }
}

/** Name shown as the site/brand name: the commercial name once confirmed, otherwise the agent's name. */
export function brandName(site: SiteConfig): string {
  return confirmed(site.businessName) ?? site.agentName.value ?? "";
}
