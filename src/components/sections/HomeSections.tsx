// Home page sections. All text comes from src/content/<lang>/ui.ts → home.
import Link from "next/link";
import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { IconName, Locale } from "@/config/types";
import { approvedOrReview, visible, visibleServices } from "@/config/visibility";
import { fill, getContent } from "@/lib/i18n";
import { AgentPortrait, hasPortrait } from "@/components/content/AgentPortrait";
import { CallButton, RequestButton, WhatsAppButton } from "@/components/content/ContactButtons";
import { buttonClass } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { Icon } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Pending } from "@/components/ui/Pending";
import { ServiceCards } from "./ServiceCards";

export function Hero({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  return (
    <section aria-labelledby="hero-title" className="bg-canvas">
      <Container className={`grid items-center gap-10 py-12 sm:py-16 lg:gap-16 lg:py-20 ${hasPortrait() ? "lg:grid-cols-[1.25fr_1fr]" : ""}`}>
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-base font-bold text-accent-strong">
            <Icon name="shield" className="size-5" />
            {ui.home.eyebrow}
          </p>
          <h1 id="hero-title" className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            {ui.home.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-muted sm:text-2xl">{fill(ui.home.lead)}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RequestButton ui={ui} locale={locale} location="hero" />
            <CallButton ui={ui} location="hero" />
          </div>
        </div>
        {hasPortrait() && (
          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <AgentPortrait locale={locale} priority />
          </div>
        )}
      </Container>
    </section>
  );
}

export function ServicesOverview({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  if (visibleServices(site).length === 0) return null;
  return (
    <Section labelledBy="services-title">
      <SectionHeading id="services-title" title={fill(ui.home.servicesTitle)} lead={ui.home.servicesLead} />
      <ServiceCards locale={locale} />
      <div className="mt-8">
        <Link href={pathFor({ kind: "page", id: "services" }, locale, site)} className={buttonClass("outline")}>
          {ui.home.allServices}
        </Link>
      </div>
    </Section>
  );
}

export function HowItWorks({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  return (
    <Section tone="gray" labelledBy="how-title">
      <SectionHeading id="how-title" title={ui.home.howTitle} />
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ui.home.howSteps.map((step, index) => (
          <li key={step.title} className="rounded-card bg-surface p-6">
            <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-brand font-display text-xl font-bold text-white">
              {index + 1}
            </span>
            <h3 className="mt-5 font-sans text-xl font-bold text-brand">{step.title}</h3>
            <p className="mt-2 text-lg text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const benefitIcons: IconName[] = ["file", "question", "users", "phone"];

export function Benefits({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  return (
    <Section labelledBy="benefits-title">
      <SectionHeading id="benefits-title" title={ui.home.benefitsTitle} />
      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {ui.home.benefits.map((benefit, index) => (
          <li key={benefit.title} className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-control bg-accent-soft text-accent-strong">
              <Icon name={benefitIcons[index] ?? "check"} className="size-6" />
            </span>
            <div>
              <h3 className="font-sans text-xl font-bold text-brand">{benefit.title}</h3>
              <p className="mt-1 text-lg text-muted">{benefit.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-base text-muted">{ui.home.benefitsNote}</p>
    </Section>
  );
}

export function AgentIntro({ locale }: { locale: Locale }) {
  const { ui, about } = getContent(locale);
  const showBio = approvedOrReview(site.approvals.biography) && about.biography.length > 0;
  const languages = visible(site.languages);
  return (
    <Section tone="gray" labelledBy="agent-title">
      <div className={`grid items-center gap-10 ${hasPortrait() ? "md:grid-cols-[minmax(0,20rem)_1fr]" : ""}`}>
        {hasPortrait() && <AgentPortrait locale={locale} className="mx-auto w-full max-w-xs" />}
        <div>
          <h2 id="agent-title" className="text-3xl font-bold sm:text-4xl">
            {fill(ui.home.agentTitle)}
          </h2>
          <p className="mt-2 text-lg font-semibold text-accent-strong">{ui.about.role}</p>
          <div className="mt-5 space-y-4 text-lg text-muted">
            {showBio ? <p>{about.biography[0]}</p> : <p>{fill(ui.home.agentFallback)}</p>}
            {about.biography.length === 0 && <Pending block marker={ui.pending.marker} label={ui.pending.biography} />}
          </div>
          {languages && (
            <p className="mt-5 flex flex-wrap items-center gap-2 text-lg">
              <Icon name="globe" className="size-5 text-accent-strong" />
              <span className="font-semibold">{ui.about.languagesLabel}:</span>
              {languages.map((code) => (code === "es" ? "Español" : "English")).join(" · ")}
              {site.languages.status === "pending" && <Pending marker={ui.pending.marker} label={ui.pending.languages} />}
            </p>
          )}
          <div className="mt-7">
            <Link href={pathFor({ kind: "page", id: "about" }, locale, site)} className={buttonClass("outline")}>
              {ui.home.agentLink}
              <Icon name="arrow-right" className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function FaqTeaser({ locale }: { locale: Locale }) {
  const { ui, faq } = getContent(locale);
  return (
    <Section labelledBy="faq-title">
      <SectionHeading id="faq-title" title={ui.home.faqTitle} />
      <FaqList items={faq.slice(0, 4)} />
      <div className="mt-8">
        <Link href={pathFor({ kind: "page", id: "faq" }, locale, site)} className={buttonClass("outline")}>
          {ui.home.faqLink}
          <Icon name="arrow-right" className="size-5" />
        </Link>
      </div>
    </Section>
  );
}

/** Closing call to action, reused at the end of inner pages. */
export function FinalCta({ locale, title, text }: { locale: Locale; title?: string; text?: string }) {
  const { ui } = getContent(locale);
  return (
    <Section tone="brand" labelledBy="final-cta-title">
      <div className="max-w-3xl">
        <h2 id="final-cta-title" className="text-3xl font-bold text-white sm:text-4xl">
          {title ?? ui.home.finalTitle}
        </h2>
        <p className="mt-4 text-xl text-white/85">{text ?? ui.home.finalText}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <RequestButton ui={ui} locale={locale} location="final_cta" variant="light" />
          <CallButton ui={ui} location="final_cta" variant="ghostLight" />
          <WhatsAppButton ui={ui} location="final_cta" variant="ghostLight" />
        </div>
      </div>
    </Section>
  );
}
