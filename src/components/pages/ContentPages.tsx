// Services, single service (reusable template), New to Medicare and FAQ pages.
import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale, ServiceId } from "@/config/types";
import type { TextSection } from "@/content/types";
import { fill, getContent } from "@/lib/i18n";
import { ScheduleButton } from "@/components/content/ContactButtons";
import { TpmoNotice } from "@/components/content/DisclosureBlock";
import { OfficialLinks } from "@/components/content/OfficialLinks";
import { PageHero } from "@/components/content/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { ServiceGrid } from "@/components/sections/ServiceCard";
import { Accordion } from "@/components/ui/Accordion";
import { CompareColumns } from "@/components/ui/CompareColumns";
import { Icon } from "@/components/ui/Icon";
import { Notice } from "@/components/ui/Notice";
import { Container } from "@/components/ui/Section";
import { Pending } from "@/components/ui/Pending";

function ReviewMarker({ locale, approved }: { locale: Locale; approved: boolean }) {
  if (approved) return null;
  const { ui } = getContent(locale);
  return <Pending marker={ui.pending.marker} label={ui.pending.contentReview} />;
}

export function Prose({ section, level = 2 }: { section: TextSection; level?: 2 | 3 }) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <section className="space-y-4">
      <Heading className={`${level === 2 ? "text-h2" : "text-h3"} font-bold`}>{fill(section.heading)}</Heading>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{fill(paragraph)}</p>
      ))}
      {section.list && (
        <ul className="space-y-2">
          {section.list.map((item) => (
            <li key={item} className="flex gap-3">
              <Icon name="check" className="mt-1 size-5 shrink-0 text-green-700" />
              <span>{fill(item)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** Eligibility notice required next to coverage information. */
export function EligibilityNotice({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  return (
    <Notice kind="info" role="note" title={ui.common.eligibilityTitle}>
      <p>
        {ui.common.eligibility} {ui.services.educationalNote}
      </p>
    </Notice>
  );
}

const educationApproved = () => site.approvals.educationalContent === "confirmed";

export function ServicesIndexPage({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  return (
    <>
      <PageHero locale={locale} title={ui.services.title} lead={ui.services.lead} crumbs={[{ name: ui.services.title, path: pathFor({ kind: "page", id: "services" }, locale, site) }]}>
        <ReviewMarker locale={locale} approved={educationApproved()} />
      </PageHero>
      <Container className="space-y-10 py-section">
        <ServiceGrid locale={locale} headingLevel={2} />
        <EligibilityNotice locale={locale} />
        <TpmoNotice locale={locale} />
      </Container>
      <CTABand locale={locale} />
    </>
  );
}

/** Reusable template for every service (Medicare Advantage, Medigap, Part D, D-SNP, Medicaid, ACA…). */
export function ServicePage({ locale, id }: { locale: Locale; id: ServiceId }) {
  const { ui, services } = getContent(locale);
  const content = services[id];
  const config = site.services.find((service) => service.id === id)!;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={ui.services.title}
        title={content.title}
        lead={content.lead}
        crumbs={[
          { name: ui.services.title, path: pathFor({ kind: "page", id: "services" }, locale, site) },
          { name: content.title, path: pathFor({ kind: "service", id }, locale, site) },
        ]}
      >
        {config.status === "pending" && <Pending marker={ui.pending.marker} label={ui.pending.service} />}
        <ReviewMarker locale={locale} approved={educationApproved()} />
      </PageHero>

      <Container className="grid gap-12 py-section lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <div className="max-w-measure space-y-12">
          {content.sections.map((section) => (
            <Prose key={section.heading} section={section} />
          ))}

          <section className="rounded-lg bg-gray-50 p-6 sm:p-8">
            <h2 className="text-h3 font-bold">{ui.common.whoFor}</h2>
            <ul className="mt-4 space-y-3">
              {content.whoFor.map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon name="users" className="mt-1 size-5 shrink-0 text-navy-900" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {content.faqs.length > 0 && (
            <section className="space-y-5">
              <h2 className="text-h2 font-bold">{ui.common.relatedQuestions}</h2>
              <Accordion items={content.faqs} />
            </section>
          )}

          <EligibilityNotice locale={locale} />
          {config.requiresTpmo && <TpmoNotice locale={locale} />}
          {config.aca && site.approvals.acaConsentProcess !== "confirmed" && <Pending block marker={ui.pending.marker} label={ui.pending.acaConsent} />}
        </div>

        <aside className="space-y-6 lg:self-start">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="text-h3 font-bold">{fill(ui.services.ctaTitle, { service: content.title })}</h2>
            <p className="mt-2 text-gray-600">{ui.services.ctaText}</p>
            <ScheduleButton ui={ui} locale={locale} location="service_aside" className="mt-5 w-full" />
          </div>
          <OfficialLinks title={ui.common.officialResources} links={content.officialLinks} newTabLabel={ui.common.opensInNewTab} />
        </aside>
      </Container>
      <CTABand locale={locale} />
    </>
  );
}

export function GuidePage({ locale }: { locale: Locale }) {
  const { ui, guide } = getContent(locale);
  const [, original, advantage] = guide.compare.columns;
  return (
    <>
      <PageHero locale={locale} title={guide.title} lead={guide.lead} crumbs={[{ name: guide.title, path: pathFor({ kind: "page", id: "newToMedicare" }, locale, site) }]}>
        <ReviewMarker locale={locale} approved={educationApproved()} />
      </PageHero>

      <Container className="space-y-16 py-section">
        <div className="max-w-measure space-y-12">
          {guide.sections.map((section) => (
            <Prose key={section.heading} section={section} />
          ))}
        </div>

        <section aria-labelledby="compare-title" className="space-y-6">
          <div className="max-w-measure space-y-4">
            <h2 id="compare-title" className="text-h2 font-bold">
              {guide.compare.heading}
            </h2>
            <p>{guide.compare.intro}</p>
          </div>
          <CompareColumns columns={[original, advantage]} rows={guide.compare.rows} />
          <p className="max-w-measure text-small text-gray-600">{guide.compare.note}</p>
        </section>

        <div className="max-w-measure space-y-12">
          <Prose section={guide.drugCoverage} />

          <section className="rounded-lg bg-gray-50 p-6 sm:p-8">
            <h2 className="text-h3 font-bold">{guide.checklist.heading}</h2>
            <p className="mt-3">{guide.checklist.intro}</p>
            <ul className="mt-5 space-y-3">
              {guide.checklist.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon name="question" className="mt-1 size-5 shrink-0 text-navy-900" />
                  {item}
                </li>
              ))}
            </ul>
            <Notice kind="info" className="mt-6">
              <p className="font-semibold">{guide.checklist.warning}</p>
            </Notice>
          </section>

          <EligibilityNotice locale={locale} />
          <OfficialLinks title={ui.common.officialResources} links={guide.officialLinks} newTabLabel={ui.common.opensInNewTab} />
        </div>
      </Container>
      <CTABand locale={locale} />
    </>
  );
}

export function FaqPage({ locale }: { locale: Locale }) {
  const { ui, faq } = getContent(locale);
  return (
    <>
      <PageHero locale={locale} title={ui.home.faqTitle} crumbs={[{ name: ui.home.faqTitle, path: pathFor({ kind: "page", id: "faq" }, locale, site) }]}>
        {site.approvals.faq !== "confirmed" && <Pending marker={ui.pending.marker} label={ui.pending.contentReview} />}
      </PageHero>
      <Container className="py-section">
        <div className="max-w-4xl">
          <Accordion items={faq} headingLevel={2} />
        </div>
      </Container>
      <CTABand locale={locale} />
    </>
  );
}
