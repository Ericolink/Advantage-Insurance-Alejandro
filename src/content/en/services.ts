// Service pages (English). General, educational text — PENDING compliance review (site.approvals.educationalContent).
// Do not add prices, premiums, specific benefits, carrier names or eligibility promises.
import type { ServiceId } from "@/config/types";
import type { ServiceContent } from "../types";

const medicareGov = { label: "Medicare.gov — official U.S. government site for Medicare", href: "https://www.medicare.gov/" };
const ship = { label: "SHIP — free, unbiased State Health Insurance Assistance Programs", href: "https://www.shiphelp.org/" };
const medicaidGov = { label: "Medicaid.gov — official federal Medicaid information", href: "https://www.medicaid.gov/" };
const healthcareGov = { label: "HealthCare.gov — official Health Insurance Marketplace", href: "https://www.healthcare.gov/" };
const ssa = { label: "Social Security Administration — Medicare enrollment", href: "https://www.ssa.gov/medicare/" };

export const services: Record<ServiceId, ServiceContent> = {
  "medicare-advantage": {
    title: "Medicare & Medicare Advantage",
    cardText: "Understand how Original Medicare and Medicare Advantage plans work, and which questions to ask.",
    metaTitle: "Medicare and Medicare Advantage",
    metaDescription: "A plain-language overview of Original Medicare and Medicare Advantage (Part C), and how to request guidance.",
    lead: "Medicare offers more than one way to get your coverage. Knowing the basic differences makes the conversation about your options easier.",
    sections: [
      {
        heading: "Original Medicare",
        paragraphs: [
          "Original Medicare is managed by the federal government. It includes Part A (hospital insurance) and Part B (medical insurance).",
          "Many people add a separate Part D plan for prescription drugs and, in some cases, a Medicare Supplement (Medigap) policy to help with some out-of-pocket costs.",
        ],
      },
      {
        heading: "Medicare Advantage (Part C)",
        paragraphs: [
          "Medicare Advantage plans are offered by private companies approved by Medicare. They combine Part A and Part B coverage in one plan, and many include drug coverage.",
          "Each plan has its own network, rules, costs and benefits, and availability depends on where you live. That is why it helps to review the details of each plan before deciding.",
        ],
      },
    ],
    whoFor: [
      "People who already have Medicare and want to understand their options.",
      "People who are about to become eligible for Medicare.",
      "Family members helping a parent or relative review coverage.",
    ],
    faqs: [
      {
        q: "Do I lose Original Medicare if I join a Medicare Advantage plan?",
        a: "You still have Medicare, but the Medicare Advantage plan provides your Part A and Part B coverage under its own rules. Your situation can be reviewed in a conversation.",
      },
      {
        q: "Can an agent tell me which plan is best?",
        a: "An agent can explain the options available to you and how they compare on the points that matter to you. The decision is always yours.",
      },
    ],
    officialLinks: [medicareGov, ship],
  },
  "medicare-supplement": {
    title: "Medicare Supplement (Medigap)",
    cardText: "Learn how Medigap policies work alongside Original Medicare.",
    metaTitle: "Medicare Supplement (Medigap)",
    metaDescription: "A plain-language overview of Medicare Supplement (Medigap) insurance and how it works with Original Medicare.",
    lead: "Medicare Supplement insurance, also called Medigap, is sold by private companies and works together with Original Medicare.",
    sections: [
      {
        heading: "What Medigap does",
        paragraphs: [
          "A Medigap policy can help pay some of the costs that Original Medicare does not cover, such as certain copayments, coinsurance and deductibles.",
          "Medigap policies work only with Original Medicare. They do not work with Medicare Advantage plans, and they generally do not include prescription drug coverage.",
        ],
      },
      {
        heading: "Standardized plans",
        paragraphs: [
          "In most states, Medigap plans are standardized and identified by letters. Plans with the same letter offer the same basic benefits, but prices can differ between companies.",
          "Rules about when you can buy a policy and how it is priced can vary. These details are best reviewed in a conversation.",
        ],
      },
    ],
    whoFor: [
      "People with Original Medicare who want to understand how to handle out-of-pocket costs.",
      "People comparing Original Medicare with Medicare Advantage.",
    ],
    faqs: [
      {
        q: "Does Medigap include drug coverage?",
        a: "Medigap policies sold today generally do not include prescription drug coverage. Drug coverage is usually obtained through a separate Part D plan.",
      },
    ],
    officialLinks: [medicareGov, ship],
  },
  "part-d": {
    title: "Medicare Part D (prescription drugs)",
    cardText: "Learn the basics of Medicare drug coverage and what to check in a plan.",
    metaTitle: "Medicare Part D prescription drug coverage",
    metaDescription: "A plain-language overview of Medicare Part D drug coverage and the questions worth asking.",
    lead: "Medicare drug coverage (Part D) helps pay for prescription medicines. It is offered by private companies approved by Medicare.",
    sections: [
      {
        heading: "How you can get drug coverage",
        paragraphs: [
          "If you have Original Medicare, you can join a separate Part D plan. Many Medicare Advantage plans already include drug coverage.",
          "Each plan has a list of covered drugs (called a formulary) and its own costs and pharmacy rules. Plans can change from year to year.",
        ],
      },
      {
        heading: "Why timing matters",
        paragraphs: [
          "If you go without Part D or other creditable drug coverage for a period of time after you first become eligible, you may have to pay a late enrollment penalty. Ask about your situation before deciding.",
        ],
      },
    ],
    whoFor: ["People with Original Medicare reviewing drug coverage.", "People whose prescriptions have changed and want to understand their coverage."],
    faqs: [
      {
        q: "Should I send my list of medicines through the website?",
        a: "No. Please do not send medical information through the website. You can review it during your conversation.",
      },
    ],
    officialLinks: [medicareGov, ship],
  },
  "dual-eligible": {
    title: "Medicare & Medicaid (dual eligibility) and D-SNP",
    cardText: "General information for people who may qualify for both Medicare and Medicaid.",
    metaTitle: "Dual eligibility (Medicare and Medicaid) and D-SNP plans",
    metaDescription: "A plain-language overview of dual eligibility and Dual Special Needs Plans (D-SNP).",
    lead: "Some people qualify for both Medicare and Medicaid. They are often called “dual eligible.”",
    sections: [
      {
        heading: "What dual eligibility means",
        paragraphs: [
          "Medicare and Medicaid are different programs. When a person qualifies for both, the two programs can work together to cover health care costs.",
          "Medicaid eligibility is decided by each state, based on its own rules.",
        ],
      },
      {
        heading: "Dual Special Needs Plans (D-SNP)",
        paragraphs: [
          "A D-SNP is a type of Medicare Advantage plan designed for people who have both Medicare and Medicaid. Plan availability and benefits vary by location.",
        ],
      },
    ],
    whoFor: ["People who have, or may qualify for, both Medicare and Medicaid.", "Family members and caregivers helping with coverage decisions."],
    faqs: [
      {
        q: "How do I know if I qualify for Medicaid?",
        a: "Medicaid eligibility is determined by your state’s Medicaid agency. An agent can explain general information, but cannot decide eligibility.",
      },
    ],
    officialLinks: [medicareGov, medicaidGov, ship],
  },
  medicaid: {
    title: "Medicaid",
    cardText: "General information about Medicaid and where to find official answers.",
    metaTitle: "Medicaid",
    metaDescription: "A plain-language overview of Medicaid and official resources.",
    lead: "Medicaid is a program run by each state, with federal participation, that helps cover health care costs for eligible people.",
    sections: [
      {
        heading: "Each state has its own rules",
        paragraphs: [
          "Eligibility, benefits and how to apply depend on the state where you live. Your state’s Medicaid agency makes the final decision about eligibility.",
          "Some states offer Medicaid through managed care plans run by private companies.",
        ],
      },
    ],
    whoFor: ["People who want to understand how Medicaid works in their state.", "People who have Medicare and want to know about Medicaid."],
    faqs: [
      {
        q: "Can I apply for Medicaid through this website?",
        a: "No. This website does not process applications. Official applications go through your state’s Medicaid agency.",
      },
    ],
    officialLinks: [medicaidGov, healthcareGov],
  },
  "aca-marketplace": {
    title: "Marketplace health insurance (ACA / Obamacare)",
    cardText: "Learn the basics of individual and family coverage through the Health Insurance Marketplace.",
    metaTitle: "Marketplace health insurance (ACA / Obamacare)",
    metaDescription: "A plain-language overview of Health Insurance Marketplace coverage under the Affordable Care Act.",
    lead: "The Health Insurance Marketplace, created by the Affordable Care Act (ACA, also called “Obamacare”), offers coverage for individuals and families.",
    sections: [
      {
        heading: "How the Marketplace works",
        paragraphs: [
          "You can generally enroll or change plans during the yearly Open Enrollment Period. Outside that period, you may be able to enroll if you have certain life events, such as losing other coverage.",
          "Depending on your household and income, you may qualify for savings. Eligibility for savings is determined through the official application.",
        ],
      },
    ],
    whoFor: ["Individuals and families without coverage through work or Medicare.", "People who had a life change and need to review their coverage."],
    faqs: [
      {
        q: "Is this website the official Marketplace?",
        a: "No. The official Marketplace is HealthCare.gov or your state’s official exchange.",
      },
    ],
    officialLinks: [healthcareGov],
  },
  "turning-65": {
    title: "Turning 65",
    cardText: "Getting close to 65? Learn when to start looking at Medicare and what to prepare.",
    metaTitle: "Turning 65: getting ready for Medicare",
    metaDescription: "General information for people approaching 65 who are starting to learn about Medicare.",
    lead: "Turning 65 is when many people first become eligible for Medicare. Starting early gives you time to understand your options.",
    sections: [
      {
        heading: "Your Initial Enrollment Period",
        paragraphs: [
          "For most people, the Initial Enrollment Period lasts seven months: it starts three months before the month you turn 65, includes your birthday month, and ends three months after it.",
          "Some people are enrolled automatically, for example if they already receive Social Security benefits. Others need to sign up. If you or your spouse are still working and have employer coverage, the rules can be different.",
        ],
      },
      {
        heading: "Getting started",
        paragraphs: ["Read the general guide for people new to Medicare and write down your questions before talking with an agent."],
      },
    ],
    whoFor: ["People who will turn 65 in the coming months.", "Adult children helping a parent get ready for Medicare."],
    faqs: [
      {
        q: "When should I start looking at Medicare?",
        a: "Many people start a few months before their Initial Enrollment Period begins. Your specific dates can be reviewed in a conversation or on Medicare.gov.",
      },
    ],
    officialLinks: [medicareGov, ssa, ship],
  },
};
