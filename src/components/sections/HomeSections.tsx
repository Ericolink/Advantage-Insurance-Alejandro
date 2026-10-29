// Home page sections. All text comes from src/content/<lang>/ui.ts → home.
// Backgrounds alternate white / light grey (≈60% white · 20% grey); red never fills a section.
import Link from "next/link";
import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { IconName, Locale } from "@/config/types";
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

/** Hero: 7/5 columns on desktop (text | 4:5 portrait); stacked text → buttons → photo below 1024px. */
export function Hero({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  const withPhoto = hasAgentPhoto();
  return (
    <section aria-labelledby="hero-title" className="bg-white">
      <Container className={`grid items-center gap-10 py-12 sm:py-16 lg:py-24 ${withPhoto ? "lg:grid-cols-12 lg:gap-16" : ""}`}>
        <div className={withPhoto ? "lg:col-span-7" : "max-w-measure"}>
          <Eyebrow>{ui.home.eyebrow}</Eyebrow>
          <h1 id="hero-title" className="mt-5 text-h1 font-extrabold">
            {ui.home.title}
          </h1>
          <p className="mt-6 max-w-measure text-lead text-gray-600">{fill(ui.home.lead)}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ScheduleButton ui={ui} locale={locale} location="hero" className="w-full sm:w-auto" />
            <CallButton ui={ui} location="hero" className="w-full sm:w-auto" />
          </div>
        </div>
        {withPhoto && (
          <div className="lg:col-span-5">
            <AgentPhoto locale={locale} placeholder="hero" priority aspect="aspect-[4/3] sm:aspect-video lg:aspect-[4/5]" sizes="(min-width: 1024px) 480px, 100vw" />
          </div>
        )}
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
            <span className="grid size-12 shrink-0 place-items-center rounded-md bg-white text-navy-900">
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

/** Service cards — only confirmed services on the public site. The section disappears when there are none. */
export function ServicesOverview({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  if (visibleServices(site).length === 0) return null;
  return (
    <Section labelledBy="services-title">
      <SectionHeading id="services-title" eyebrow={ui.home.servicesEyebrow} title={fill(ui.home.servicesTitle)} lead={ui.home.servicesLead} />
      <ServiceGrid locale={locale} />
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
              {languages.map((code) => (code === "es" ? "Español" : "English")).join(" · ")}
              {site.languages.status === "pending" && <Pending marker={ui.pending.marker} label={ui.pending.languages} />}
            </p>
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
