// "New to Medicare" guide (English). Educational only — PENDING compliance review (site.approvals.educationalContent).
import type { GuideContent } from "../types";

export const guide: GuideContent = {
  metaTitle: "New to Medicare: a plain-language guide",
  metaDescription: "What Medicare is, how Original Medicare and Medicare Advantage differ, drug coverage basics and the questions to prepare.",
  title: "New to Medicare",
  lead: "A short, general guide for people starting to learn about Medicare, and for the family members helping them.",
  sections: [
    {
      heading: "What is Medicare?",
      paragraphs: [
        "Medicare is the federal health insurance program for people 65 and older. Some younger people with certain disabilities or conditions can also qualify.",
        "Medicare has different parts, and each part covers different services:",
      ],
      list: [
        "Part A — hospital insurance (for example, inpatient hospital stays).",
        "Part B — medical insurance (for example, doctor visits and outpatient care).",
        "Part C — Medicare Advantage, plans from private companies approved by Medicare.",
        "Part D — prescription drug coverage.",
      ],
    },
  ],
  compare: {
    heading: "Original Medicare and Medicare Advantage: the general differences",
    intro: "These are two different ways of getting your Medicare coverage. This table is a general summary, not a comparison of specific plans.",
    columns: ["", "Original Medicare", "Medicare Advantage"],
    rows: [
      ["Who offers it", "The federal government", "Private companies approved by Medicare"],
      ["What it includes", "Part A and Part B", "Part A and Part B in one plan; many plans include drug coverage"],
      ["Doctors and hospitals", "Generally, providers across the country that accept Medicare", "Usually a network of providers, with rules that vary by plan"],
      ["Drug coverage", "Through a separate Part D plan", "Included in many plans"],
      ["Help with out-of-pocket costs", "Can be combined with a Medigap policy", "Medigap does not work with Medicare Advantage"],
    ],
    note: "Costs, benefits, networks and availability vary by plan and location.",
  },
  drugCoverage: {
    heading: "What drug coverage means",
    paragraphs: [
      "Medicare drug coverage (Part D) helps pay for prescription medicines. Each plan has a list of covered drugs, called a formulary, and its own costs and pharmacy rules.",
      "If you go without creditable drug coverage after you first become eligible, you may have to pay a late enrollment penalty. This is a good topic to ask about.",
    ],
  },
  checklist: {
    heading: "Questions to prepare before talking with an agent",
    intro: "Writing these down helps make the conversation clear and useful:",
    items: [
      "When do I (or my parent) become eligible, and do I already have Part A or Part B?",
      "Do I have coverage through work, a spouse, or a former employer?",
      "Which doctors, hospitals or pharmacies would I like to keep?",
      "Do I travel or spend part of the year in another state?",
      "What matters most to me: predictable costs, flexibility in choosing providers, or other things?",
      "Who else should be part of the conversation (a son, daughter or caregiver)?",
    ],
    warning: "Bring this information to the conversation. Please do not send Medicare numbers, Social Security numbers or medical details through the website.",
  },
  officialLinks: [
    { label: "Medicare.gov — official U.S. government site for Medicare", href: "https://www.medicare.gov/" },
    { label: "Social Security Administration — Medicare enrollment", href: "https://www.ssa.gov/medicare/" },
    { label: "SHIP — free, unbiased State Health Insurance Assistance Programs", href: "https://www.shiphelp.org/" },
  ],
};
