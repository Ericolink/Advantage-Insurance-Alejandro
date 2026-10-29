// Privacy notice and disclaimers (English). DRAFTS — PENDING legal/compliance review
// (site.approvals.privacyPolicy and site.approvals.nonAffiliationNotice). The TPMO text is NOT here: it comes from site.ts.
import type { LegalContent } from "../types";

export const legal: LegalContent = {
  privacy: {
    metaTitle: "Privacy notice",
    metaDescription: "How this website handles the information you send through the contact form.",
    title: "Privacy notice",
    lead: "This notice explains what information this website collects and how it is used.",
    updated: "Last updated: pending approval",
    sections: [
      {
        heading: "Who is responsible",
        paragraphs: ["This website is operated by {brand}. You can contact us using the details on the contact page."],
      },
      {
        heading: "Information you send us",
        paragraphs: ["When you use the contact form, we collect only:"],
        list: [
          "Your name and phone number.",
          "Your email address, if you choose to give it.",
          "The best time to call you and the general topic of your question.",
          "A short message, if you choose to write one.",
          "Your agreement to be contacted, the page language and the date and time of the request.",
        ],
      },
      {
        heading: "Information we do not ask for",
        paragraphs: [
          "The form does not ask for Medicare or Social Security numbers, dates of birth, income, diagnoses, medications or other health information. Please do not include them.",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "We use your information only to respond to your request. We do not sell your personal information.",
          "To deliver requests, the website uses service providers (for example, website hosting and email delivery). They process the information only to provide that service.",
        ],
      },
      {
        heading: "Cookies and analytics",
        paragraphs: [
          "The website stores a cookie with your language preference.",
          "If enabled, Google Analytics is used only after you allow it, to count visits and clicks on contact buttons. Your name, phone, email and form answers are never sent to analytics. You can change your choice with “Analytics preferences” at the bottom of each page.",
          "If you open the scheduling calendar, it is provided by a third party under its own privacy policy.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: ["Retention period pending definition by the business."],
      },
      {
        heading: "Your choices",
        paragraphs: ["You can ask us at any time to stop contacting you, or to correct or delete the information you sent us."],
      },
    ],
  },
  terms: {
    metaTitle: "Terms of use",
    metaDescription: "Terms that apply to the use of this website.",
    title: "Terms of use",
    lead: "The terms that apply when you use this website.",
    outline: [
      "Who operates the website and how to contact them",
      "Purpose of the website (general information; not an application or enrollment)",
      "Use of the content and intellectual property",
      "Links to third-party websites (Medicare.gov, scheduling provider…)",
      "Limitation of liability",
      "Governing law and state",
      "Changes to these terms and effective date",
    ],
    sections: [],
  },
  disclosures: {
    metaTitle: "Disclosures",
    metaDescription: "Important notices about this website and the information it contains.",
    title: "Disclosures",
    lead: "Important information about this website.",
    nonAffiliation:
      "This website is operated by {brand}, a private health insurance agent. It is not connected with or endorsed by the U.S. government, the federal Medicare program or any state Medicaid agency.",
    educational: {
      heading: "General information",
      paragraphs: [
        "The content on this website is general and educational. It is not a recommendation of any plan and is not legal, tax or medical advice.",
        "Plan availability, costs, benefits and rules vary by plan and location and can change. Always review official plan documents before making a decision.",
        "Sending a request through this website is not an application and does not enroll you in any plan.",
      ],
    },
    aca: {
      heading: "Marketplace (ACA) coverage",
      paragraphs: [
        "Requests about Marketplace coverage are subject to the consent and documentation process that the business uses for the Marketplace. The contact checkbox on this website is not a substitute for those consents.",
      ],
    },
    officialHeading: "Official sources of information",
    officialLinks: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "HealthCare.gov", href: "https://www.healthcare.gov/" },
      { label: "Medicaid.gov", href: "https://www.medicaid.gov/" },
      { label: "SHIP — State Health Insurance Assistance Programs", href: "https://www.shiphelp.org/" },
    ],
    medicareContact: "1-800-MEDICARE (1-800-633-4227), TTY 1-877-486-2048, 24 hours a day, 7 days a week.",
  },
};
