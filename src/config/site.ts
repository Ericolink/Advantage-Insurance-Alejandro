// ─────────────────────────────────────────────────────────────────────────────
// ALL of Alejandro's business data lives here. Edit this file only.
//
// Rules:
//  - `value: null` = we don't have it yet.
//  - `status: "pending"` = not verified. It is shown only in review mode (with a
//    visible "Pending" marker) and never on the public site.
//  - Switch to `status: "confirmed"` only after Alejandro confirms it in writing.
//  - `npm run check:launch` lists everything still missing.
// ─────────────────────────────────────────────────────────────────────────────
import type { SiteConfig } from "./types.ts";

export const site: SiteConfig = {
  url: null,

  agentName: {
    value: "Alejandro Alcazar",
    status: "confirmed",
    note: "Confirm exact spelling used professionally (Alcazar / Alcázar).",
  },
  businessName: { value: null, status: "pending", note: "Commercial/agency name, if any. Otherwise the agent's name is used." },

  phone: { value: "+19153732864", status: "confirmed" },
  email: { value: null, status: "pending", note: "Business email that will appear publicly." },
  whatsapp: { value: null, status: "pending", note: "Only if Alejandro uses WhatsApp for the business. Leave null otherwise." },

  serviceArea: { value: null, status: "pending", note: "States / counties / cities served (must match licensed states)." },
  languages: { value: ["en", "es"], status: "pending", note: "Languages in which Alejandro offers appointments." },
  hours: { value: null, status: "pending", note: "Business hours, if they should be published." },

  licenses: { value: null, status: "pending", note: "State license number(s) and verification links." },
  npn: { value: null, status: "pending", note: "National Producer Number (verifiable on nipr.com)." },

  photo: { value: null, status: "pending", note: "Professional photo, authorized for web use. Put it in /public/images." },
  scheduling: { value: null, status: "pending", note: "Calendly (or similar) booking link." },
  social: { value: null, status: "pending", note: "Business social profiles, if any." },

  // Initial proposal. Alejandro must confirm which products are actually sold.
  services: [
    { id: "medicare-advantage", status: "pending", slug: { en: "medicare-advantage", es: "medicare-advantage" }, icon: "shield", requiresTpmo: true, medicare: true, aca: false },
    { id: "medicare-supplement", status: "pending", slug: { en: "medicare-supplement", es: "medicare-suplementario" }, icon: "plus", requiresTpmo: false, medicare: true, aca: false },
    { id: "part-d", status: "pending", slug: { en: "medicare-part-d", es: "medicare-parte-d" }, icon: "pill", requiresTpmo: true, medicare: true, aca: false },
    { id: "dual-eligible", status: "pending", slug: { en: "dual-eligible-d-snp", es: "doble-elegibilidad-d-snp" }, icon: "layers", requiresTpmo: true, medicare: true, aca: false },
    { id: "medicaid", status: "pending", slug: { en: "medicaid", es: "medicaid" }, icon: "heart", requiresTpmo: false, medicare: false, aca: false },
    { id: "aca-marketplace", status: "pending", slug: { en: "aca-marketplace", es: "mercado-aca-obamacare" }, icon: "home", requiresTpmo: false, medicare: false, aca: true },
    { id: "turning-65", status: "pending", slug: { en: "turning-65", es: "cumplir-65" }, icon: "calendar", requiresTpmo: false, medicare: true, aca: false },
  ],

  approvals: {
    biography: "pending",
    educationalContent: "pending",
    faq: "pending",
    privacyPolicy: "pending",
    nonAffiliationNotice: "pending",
    contactConsent: "pending",
    acaConsentProcess: "pending",
  },

  // Paste the exact, current wording provided by Alejandro or the compliance contact.
  tpmoDisclaimer: { value: null, status: "pending", note: "Exact current TPMO disclaimer (number of organizations/plans represented)." },
  marketingDisclaimers: { value: null, status: "pending", note: "Any carrier/FMO-required disclaimers, exactly as approved." },
};
