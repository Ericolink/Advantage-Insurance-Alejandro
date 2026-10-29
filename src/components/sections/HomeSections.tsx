// Home page sections. All text comes from src/content/<lang>/ui.ts → home.
// Backgrounds alternate white / light grey (≈60% white · 20% grey); red never fills a section.
import Image from "next/image";
import Link from "next/link";
import heroImage from "../../../public/images/abuelos1.jpg";
import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { IconName, Locale, ServiceId } from "@/config/types";
import { approvedOrReview, visible, visibleServices } from "@/config/visibility";
import { fill, getContent } from "@/lib/i18n";
import { AgentPhoto, hasAgentPhoto } from "@/components/content/AgentPhoto";
import { CallButton, ScheduleButton } from "@/components/content/ContactButtons";
import { Accordion } from "@/components/ui/Accordion";
import { buttonClass, linkClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { Pending } from "@/components/ui/Pending";
import { StepList } from "@/components/ui/StepList";
import { ServiceGrid } from "./ServiceCard";

/**
 * Hero with a family photo: behind the text under a white veil on mobile; on desktop it fills the right side
 * and fades into the white text column, so the whole family stays visible.
 * Photo: Mikhail Nilov, Pexels (free to use) — https://www.pexels.com/photo/cute-girl-sitting-in-between-her-grandparents-8307519/
 */
export function Hero({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b-4 border-red-600 bg-white">
      <div className="absolute inset-0 -z-10 lg:left-auto lg:w-1/2 xl:w-3/5">
        <Image src={heroImage} alt="" fill priority placeholder="blur" sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover object-[center_30%]" />
        <div aria-hidden="true" className="absolute inset-0 bg-white/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-white lg:to-white/0 lg:to-25%" />
      </div>
      <Container className="py-16 sm:py-20 lg:py-32">
        <div className="max-w-measure lg:max-w-xl">
          <Eyebrow>{ui.home.eyebrow}</Eyebrow>
          <h1 id="hero-title" className="mt-5 text-h1 font-extrabold">
            {ui.home.title}
          </h1>
          <p className="mt-6 max-w-measure text-lead text-gray-700">{fill(ui.home.lead)}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ScheduleButton ui={ui} locale={locale} location="hero" className="w-full sm:w-auto" />
            <CallButton ui={ui} location="hero" className="w-full sm:w-auto" />
          </div>
        </div>
      </Container>
    </section>
  );
}

const introIcons: IconName[] = ["file", "question", "users", "phone"];

/** Short introduction: why talk with an agent. */
export function Intro({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  return (
    <Section bg="gray" labelledBy="intro-title">
      <SectionHeading id="intro-title" title={ui.home.introTitle} />
      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {ui.home.intro.map((item, index) => (
          <li key={item.title} className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-md bg-red-600 text-white">
              <Icon name={introIcons[index] ?? "check"} className="size-6" />
            </span>
            <div>
              <h3 className="text-h3 font-bold">{item.title}</h3>
              <p className="mt-1 text-gray-600">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-small text-gray-600">{ui.home.introNote}</p>
    </Section>
  );
}

/** The three services highlighted on the home page, in display order. The rest are on the services page. */
const featuredServiceIds: ServiceId[] = ["turning-65", "medicaid", "aca-marketplace"];

/** Featured service cards — only confirmed services on the public site. The section disappears when none is visible. */
export function ServicesOverview({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  const visibleIds = new Set(visibleServices(site).map((service) => service.id));
  const featured = featuredServiceIds.filter((id) => visibleIds.has(id)).map((id) => site.services.find((service) => service.id === id)!);
  if (featured.length === 0) return null;
  return (
    <Section labelledBy="services-title">
      <SectionHeading id="services-title" eyebrow={ui.home.servicesEyebrow} title={fill(ui.home.servicesTitle)} lead={ui.home.servicesLead} />
      <ServiceGrid locale={locale} services={featured} />
      <div className="mt-10">
        <Link href={pathFor({ kind: "page", id: "services" }, locale, site)} className={buttonClass("secondary")}>
          {ui.home.allServices}
        </Link>
      </div>
    </Section>
  );
}

export function HowItWorks({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  return (
    <Section bg="gray" labelledBy="how-title">
      <SectionHeading id="how-title" eyebrow={ui.home.howEyebrow} title={ui.home.howTitle} />
      <StepList steps={ui.home.howSteps} onGray />
    </Section>
  );
}

export function AgentIntro({ locale }: { locale: Locale }) {
  const { ui, about } = getContent(locale);
  const showBio = approvedOrReview(site.approvals.biography) && about.biography.length > 0;
  const languages = visible(site.languages);
  const withPhoto = hasAgentPhoto();
  return (
    <Section labelledBy="agent-title">
      <div className={`grid items-center gap-10 lg:gap-16 ${withPhoto ? "md:grid-cols-[minmax(0,22rem)_1fr]" : ""}`}>
        {withPhoto && <AgentPhoto locale={locale} placeholder="about" sizes="(min-width: 768px) 352px, 100vw" className="w-full max-w-sm" />}
        <div className="max-w-measure">
          <Eyebrow>{ui.home.agentEyebrow}</Eyebrow>
          <h2 id="agent-title" className="mt-4 text-h2 font-bold">
            {fill(ui.home.agentTitle)}
          </h2>
          <p className="mt-2 font-semibold text-gray-600">{ui.about.role}</p>
          <div className="mt-5 space-y-4">
            {showBio ? <p>{about.biography[0]}</p> : <p>{fill(ui.home.agentFallback)}</p>}
            {about.biography.length === 0 && <Pending block marker={ui.pending.marker} label={ui.pending.biography} />}
          </div>
          {languages && (
            <p className="mt-5 flex flex-wrap items-center gap-2">
              <Icon name="globe" className="size-5 text-navy-900" />
              <span className="font-semibold">{ui.about.languagesLabel}:</span>
              {languages.map((code) => (code === "es" ? "Español" : "English")).join(" · ")}            </p>
          )}
          <p className="mt-7">
            <Link href={pathFor({ kind: "page", id: "about" }, locale, site)} className={linkClass}>
              {ui.home.agentLink} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}

export function FaqTeaser({ locale }: { locale: Locale }) {
  const { ui, faq } = getContent(locale);
  return (
    <Section bg="gray" labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <SectionHeading id="faq-title" eyebrow={ui.home.faqEyebrow} title={ui.home.faqTitle} />
          {site.approvals.faq !== "confirmed" && <Pending marker={ui.pending.marker} label={ui.pending.contentReview} />}
        </div>
        <div>
          <Accordion items={faq.slice(0, 4)} />
          <p className="mt-8">
            <Link href={pathFor({ kind: "page", id: "faq" }, locale, site)} className={linkClass}>
              {ui.home.faqLink} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
