// Shape of the visitor-facing content. Both languages must satisfy these types, so nothing is left untranslated.
// Text may contain {name} (agent's name) and {brand} (brand name); they are filled in at render time.
import type { ServiceId } from "@/config/types";
import type { ui } from "./en/ui";

export type UiContent = typeof ui;

export interface QA {
  q: string;
  a: string;
}

export interface OfficialLink {
  label: string;
  href: string;
}

export interface TextSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface ServiceContent {
  title: string;
  /** One or two sentences for the service card. */
  cardText: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  sections: TextSection[];
  whoFor: string[];
  faqs: QA[];
  officialLinks: OfficialLink[];
}

export interface GuideContent {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  sections: TextSection[];
  compare: {
    heading: string;
    intro: string;
    columns: [string, string, string];
    rows: [string, string, string][];
    note: string;
  };
  drugCoverage: TextSection;
  checklist: { heading: string; intro: string; items: string[]; warning: string };
  officialLinks: OfficialLink[];
}

export interface AboutContent {
  /** Biography paragraphs provided by Alejandro. Empty until received. */
  biography: string[];
  /** "How Alejandro works", in Alejandro's own words. Empty until received; approved together with the biography. */
  approach: string[];
}

export interface LegalContent {
  privacy: { metaTitle: string; metaDescription: string; title: string; lead: string; updated: string; sections: TextSection[] };
  /**
   * Terms of use. `sections` stays EMPTY until the client or their counsel provides the text — we never write legal terms.
   * `outline` lists the topics usually covered, shown only in review mode as a checklist for the client.
   */
  terms: { metaTitle: string; metaDescription: string; title: string; lead: string; outline: string[]; sections: TextSection[] };
  disclosures: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lead: string;
    nonAffiliation: string;
    educational: TextSection;
    aca: TextSection;
    officialHeading: string;
    officialLinks: OfficialLink[];
    medicareContact: string;
  };
}

export interface Content {
  ui: UiContent;
  services: Record<ServiceId, ServiceContent>;
  guide: GuideContent;
  faq: QA[];
  about: AboutContent;
  legal: LegalContent;
}
