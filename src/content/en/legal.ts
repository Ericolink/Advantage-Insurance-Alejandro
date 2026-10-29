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
    updated: "Last updated: October 29, 2026",
    outline: [
      "Who operates the website and how to contact them",
      "Purpose of the website (general information; not an application or enrollment)",
      "Use of the content and intellectual property",
      "Links to third-party websites (Medicare.gov, scheduling provider…)",
      "Limitation of liability",
      "Governing law and state",
      "Changes to these terms and effective date",
    ],
    // Translation of the Spanish text provided on October 29, 2026. Pending approval (site.approvals.terms).
    sections: [
      {
        heading: "1. General information and website operator",
        paragraphs: [
          "This website is operated by **{name}**, a private health insurance agent who provides information and guidance about health coverage options in the United States.",
          "For questions about this website, you can reach us through the following channels:",
        ],
        listStyle: "bullet",
        list: ["**Name:** {name}", "**Phone:** {phone}", "**Email:** {email}", "**Website:** {website}"],
        after: ["By using this website, you acknowledge that you have read these Terms of use. If you do not agree with them, please do not use the site."],
      },
      {
        heading: "2. Purpose of the website",
        paragraphs: [
          "The purpose of this website is to provide general information about health insurance, coverage options and guidance services related to Medicare, Medicaid and health insurance plans available through the Health Insurance Marketplace (ACA), as applicable.",
          "The information published is for informational and commercial purposes. **Browsing the site, sending a message or requesting information does not, by itself, constitute a formal insurance application, enrollment in a plan or confirmation of eligibility.**",
          "Any application, enrollment or change in coverage must be completed through the corresponding official procedures and is subject to the applicable requirements, deadlines and conditions.",
          "The content of this site does not replace official plan documents, policy terms or the information provided by insurance companies or the relevant government agencies.",
        ],
      },
      {
        heading: "3. Permitted use of the website",
        paragraphs: ["You agree to use this site lawfully and responsibly. You must not:"],
        listStyle: "bullet",
        list: [
          "Use the site for fraudulent, illegal or deceptive activities.",
          "Attempt to gain unauthorized access to systems, accounts or restricted information.",
          "Interfere with the operation, security or availability of the site.",
          "Send malicious content, deliberately false information or communications that violate the rights of others.",
        ],
        after: ["{name} reserves the right to take reasonable measures to protect the site and its users against misuse, in accordance with applicable law."],
      },
      {
        heading: "4. Intellectual property",
        paragraphs: [
          "Unless otherwise stated, the text, designs, graphics, logos, photographs and other original content of this website belong to {name} or are used with the corresponding authorization.",
          "Reproduction, distribution, modification or commercial use of these materials without prior authorization from the rights holder is prohibited, except where permitted by applicable law.",
          "Names, trademarks, logos and materials of insurance companies, government programs and third parties belong to their respective owners. Their appearance on this site does not necessarily imply sponsorship, affiliation or endorsement.",
        ],
      },
      {
        heading: "5. Links to third-party websites",
        paragraphs: ["This site may include links to external pages to provide access to additional information, official resources or third-party services. These may include:"],
        listStyle: "bullet",
        list: ["Medicare: https://www.medicare.gov/", "Health Insurance Marketplace: https://www.healthcare.gov/", "Other insurance company or service provider websites, where applicable."],
        after: [
          "These links are provided for reference. {name} does not necessarily control the content, availability, privacy policies or security practices of those sites.",
          "Including a link does not imply endorsement or a business relationship, and does not guarantee the products or services offered by the third party. Use of external pages is governed by their own terms and policies.",
          "If this site includes external scheduling, form or communication tools, you should review those providers' terms before using them.",
        ],
      },
      {
        heading: "6. Accuracy and availability of information",
        paragraphs: [
          "We try to keep the information on this site up to date and easy to understand. However, insurance benefits, prices, eligibility requirements, enrollment periods and conditions may change.",
          "We do not guarantee that all content is free of errors, up to date at all times, or that the site will remain available without interruption.",
          "You should verify relevant information with the insurance company, the official agency or the corresponding provider before making decisions about your health coverage.",
        ],
      },
      {
        heading: "7. Limitation of liability",
        paragraphs: [
          "To the extent permitted by applicable law, {name} does not guarantee that use of the site will be uninterrupted, error-free or compatible with all devices and systems.",
          "The content is provided for general informational purposes and does not guarantee coverage, eligibility, acceptance of an application or the availability of any specific product.",
          "To the extent permitted by law, {name} will not be liable for losses or damages arising from the use of, or inability to use, the site; from reliance solely on general information published on it; or from the content and operation of external pages.",
          "**Nothing in this section excludes or limits liability that cannot legally be excluded or limited**, nor does it affect any rights you have as a consumer under applicable law.",
        ],
      },
      {
        heading: "8. Privacy and data protection",
        paragraphs: [
          "Personal information you provide through the website is handled according to the corresponding Privacy notice.",
          "We recommend reviewing that notice before sending personal information. Information related to health, medical coverage or other sensitive circumstances should be provided only when necessary and through the appropriate channels.",
          "If forms, scheduling tools or other third-party services are used, those providers' privacy policies may also apply.",
        ],
      },
      {
        heading: "9. Governing law and jurisdiction",
        paragraphs: [
          "These Terms of use will be interpreted in accordance with the applicable laws of the State of Texas and the federal laws of the United States, as applicable, without prejudice to any mandatory rules that may apply.",
          "Any dispute related to the use of this site will be resolved before the competent courts in accordance with applicable law.",
          "The final determination of the competent jurisdiction and any additional dispute-resolution provisions must be reviewed by the business's legal counsel.",
        ],
      },
      {
        heading: "10. Changes to these terms",
        paragraphs: [
          "{name} may update these Terms of use when necessary to reflect changes to the website, the services offered or applicable legal requirements.",
          "Changes will be posted on this page with the corresponding update date. We recommend reviewing this document periodically.",
          "Where applicable law requires notice or specific consent for certain changes, the corresponding procedures will be followed.",
        ],
      },
      {
        heading: "11. Contact",
        paragraphs: ["If you have questions about these Terms of use, you can reach us through the following channels:"],
        listStyle: "bullet",
        list: ["**Responsible party:** {name}", "**Phone:** {phone}", "**Email:** {email}"],
        after: ["**Effective date:** [Date of final approval and publication]."],
      },
    ],
  },
  disclosures: {
    metaTitle: "Disclosures",
    metaDescription: "Important notices about this website and the information it contains.",
    title: "Disclosures",
    lead: "Important information about this website.",
    nonAffiliation:
      "This website is operated by {name}, a health insurance agent. It is not affiliated with, connected to or endorsed by the United States government, Medicare or any state or federal government agency, including Medicaid.",
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
