// Shared types for the business configuration. Kept alias-free so Node scripts and tests can import it.

export type Locale = "en" | "es";
export type Localized<T = string> = Record<Locale, T>;

/**
 * confirmed: the client confirmed it in writing and it may be published.
 * pending:   missing or not yet verified. Shown only in review mode, with a visible marker.
 */
export type Status = "confirmed" | "pending";

/** One business fact plus whether it may be published. `value: null` means we don't have it yet. */
export interface Fact<T> {
  value: T | null;
  status: Status;
  /** What still has to be confirmed (shown in the launch check, never on the site). */
  note?: string;
}

export type IconName =
  | "alert"
  | "arrow-right"
  | "calendar"
  | "check"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "clock"
  | "external"
  | "file"
  | "globe"
  | "heart"
  | "home"
  | "image"
  | "info"
  | "layers"
  | "mail"
  | "map-pin"
  | "menu"
  | "message"
  | "pencil"
  | "phone"
  | "pill"
  | "plus"
  | "question"
  | "shield"
  | "users"
  | "x";

export type ServiceId =
  | "medicare-advantage"
  | "medicare-supplement"
  | "part-d"
  | "dual-eligible"
  | "medicaid"
  | "aca-marketplace"
  | "turning-65";

export interface ServiceConfig {
  id: ServiceId;
  /** pending until Alejandro confirms selling it. "not-offered" removes it everywhere. */
  status: "confirmed" | "pending" | "not-offered";
  slug: Localized;
  icon: IconName;
  /** Medicare Advantage / Part D marketing: requires the current TPMO disclaimer. */
  requiresTpmo: boolean;
  /** Medicare-related: requires the government non-affiliation notice. */
  medicare: boolean;
  /** ACA Marketplace: consent/documentation process must be approved by the business. */
  aca: boolean;
}

export interface License {
  /** Two-letter state code, e.g. "FL". */
  state: string;
  number: string;
  /** Public page where visitors can verify the license (state DOI or NIPR). */
  verifyUrl: string | null;
}

export interface Photo {
  /** Path under /public, e.g. "/images/alejandro.jpg". */
  src: string;
  width: number;
  height: number;
  alt: Localized;
}

export interface SiteConfig {
  /** Production domain with https and no trailing slash, e.g. "https://www.example.com". */
  url: string | null;
  agentName: Fact<string>;
  /** Commercial name, if different from the agent's own name. */
  businessName: Fact<string>;
  /** E.164 format: +1XXXXXXXXXX */
  phone: Fact<string>;
  email: Fact<string>;
  /** E.164 number used for WhatsApp, only if Alejandro uses WhatsApp for the business. */
  whatsapp: Fact<string>;
  serviceArea: Fact<Localized>;
  /** Languages Alejandro offers appointments in (not the languages of the website). */
  languages: Fact<Locale[]>;
  hours: Fact<Localized>;
  /** Reply time Alejandro can promise after a form request, e.g. "one business day". Shown in the success message. */
  responseTime: Fact<Localized>;
  licenses: Fact<License[]>;
  npn: Fact<string>;
  photo: Fact<Photo>;
  /** Scheduling page (Calendly, Cal.com, Google Calendar booking…). */
  scheduling: Fact<{ provider: string; url: string; allowEmbed: boolean }>;
  social: Fact<{ label: string; url: string }[]>;
  services: ServiceConfig[];
  /** Approval of texts that live in src/content (biography, education, legal). */
  approvals: {
    biography: Status;
    educationalContent: Status;
    faq: Status;
    privacyPolicy: Status;
    /** Terms of use (src/content/<lang>/legal.ts → terms), provided by the client or their counsel. */
    terms: Status;
    nonAffiliationNotice: Status;
    contactConsent: Status;
    /** Business-approved consent/documentation process for ACA Marketplace leads. */
    acaConsentProcess: Status;
  };
  /** Exact current TPMO disclaimer, supplied by Alejandro / compliance. Never write it ourselves. */
  tpmoDisclaimer: Fact<Localized>;
  /** Any additional product marketing disclaimers required by carriers/FMO, exactly as approved. */
  marketingDisclaimers: Fact<Localized[]>;
}
