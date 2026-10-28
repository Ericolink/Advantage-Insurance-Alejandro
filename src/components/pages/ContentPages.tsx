// Services, single service, New to Medicare and FAQ pages.
import Link from "next/link";
import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale, ServiceId } from "@/config/types";
import type { TextSection } from "@/content/types";
import { fill, getContent } from "@/lib/i18n";
import { TpmoNotice } from "@/components/content/Compliance";
import { OfficialLinks } from "@/components/content/OfficialLinks";
import { PageHeader } from "@/components/content/PageHeader";
import { FinalCta } from "@/components/sections/HomeSections";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { buttonClass } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layout";
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
      <Heading className="text-2xl font-bold sm:text-3xl">{fill(section.heading)}</Heading>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-lg text-ink">
          {fill(paragraph)}
        </p>
      ))}
      {section.list && (
        <ul className="space-y-2 text-lg">
          {section.list.map((item) => (
            <li key={item} className="flex gap-3">
              <Icon name="check" className="mt-1 size-5 shrink-0 text-accent-strong" />
              <span>{fill(item)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const educationApproved = () => site.approvals.educationalContent === "confirmed";

export function ServicesIndexPage({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  return (
    <>
      <PageHeader locale={locale} title={ui.services.title} lead={ui.services.lead} crumbs={[{ name: ui.services.title, path: pathFor({ kind: "page", id: "services" }, locale, site) }]}>
        <ReviewMarker locale={locale} approved={educationApproved()} />
      </PageHeader>
      <Container className="space-y-8 py-14">
        <ServiceCards locale={locale} headingLevel={2} />
        <p className="max-w-3xl text-base text-muted">{ui.services.educationalNote}</p>
        <TpmoNotice locale={locale} />
      </Container>
      <FinalCta locale={locale} />
    </>
  );
}

export function ServicePage({ locale, id }: { locale: Locale; id: ServiceId }) {
  const { ui, services } = getContent(locale);
  const content = services[id];
  const config = site.services.find((service) => service.id === id)!;

  return (
    <>
      <PageHeader
        locale={locale}
        title={content.title}
        lead={content.lead}
        crumbs={[
          { name: ui.services.title, path: pathFor({ kind: "page", id: "services" }, locale, site) },
          { name: content.title, path: pathFor({ kind: "service", id }, locale, site) },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          {config.status === "pending" && <Pending marker={ui.pending.marker} label={ui.pending.service} />}
          <ReviewMarker locale={locale} approved={educationApproved()} />
        </div>
      </PageHeader>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_22rem]">
        <div className="max-w-3xl space-y-12">
          {content.sections.map((section) => (
            <Prose key={section.heading} section={section} />
          ))}

          <section className="rounded-card bg-canvas p-6 sm:p-8">
            <h2 className="text-2xl font-bold">{ui.common.whoFor}</h2>
            <ul className="mt-4 space-y-3 text-lg">
              {content.whoFor.map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon name="users" className="mt-1 size-5 shrink-0 text-accent-strong" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {content.faqs.length > 0 && (
            <section className="space-y-5">
              <h2 className="text-2xl font-bold sm:text-3xl">{ui.common.relatedQuestions}</h2>
              <FaqList items={content.faqs} />
            </section>
          )}

          <p className="text-base text-muted">{ui.services.educationalNote}</p>
          {config.requiresTpmo && <TpmoNotice locale={locale} />}
          {config.aca && site.approvals.acaConsentProcess !== "confirmed" && <Pending block marker={ui.pending.marker} label={ui.pending.acaConsent} />}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-card border-2 border-brand bg-brand-soft p-6">
            <h2 className="font-sans text-xl font-bold text-brand">{fill(ui.services.ctaTitle, { service: content.title })}</h2>
            <p className="mt-2 text-lg text-ink">{ui.services.ctaText}</p>
            <Link href={`${pathFor({ kind: "page", id: "contact" }, locale, site)}#request`} className={buttonClass("primary", "mt-5 w-full")}>
              {ui.cta.requestConversation}
            </Link>
          </div>
          <OfficialLinks title={ui.common.officialResources} links={content.officialLinks} newTabLabel={ui.common.opensInNewTab} />
        </aside>
      </Container>
      <FinalCta locale={locale} />
    </>
  );
}

export function GuidePage({ locale }: { locale: Locale }) {
  const { ui, guide } = getContent(locale);
  return (
    <>
      <PageHeader locale={locale} title={guide.title} lead={guide.lead} crumbs={[{ name: guide.title, path: pathFor({ kind: "page", id: "newToMedicare" }, locale, site) }]}>
        <ReviewMarker locale={locale} approved={educationApproved()} />
      </PageHeader>

      <Container className="max-w-4xl space-y-14 py-14">
        {guide.sections.map((section) => (
          <Prose key={section.heading} section={section} />
        ))}

        <section className="space-y-4">
          <h2 className="text-2xl font-bold sm:text-3xl">{guide.compare.heading}</h2>
          <p className="text-lg">{guide.compare.intro}</p>
          {/* Scrolls sideways on narrow phones instead of squeezing the text. */}
          <div className="overflow-x-auto rounded-card border-2 border-line" tabIndex={0} role="region" aria-label={guide.compare.heading}>
            <table className="w-full min-w-[36rem] border-collapse text-left text-lg">
              <thead className="bg-brand text-white">
                <tr>
                  {guide.compare.columns.map((column, index) => (
                    <th key={column || index} scope="col" className="p-4 font-bold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {guide.compare.rows.map(([label, original, advantage]) => (
                  <tr key={label} className="border-t-2 border-line even:bg-canvas">
                    <th scope="row" className="p-4 font-bold text-brand">
                      {label}
                    </th>
                    <td className="p-4">{original}</td>
                    <td className="p-4">{advantage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-base text-muted">{guide.compare.note}</p>
        </section>

        <Prose section={guide.drugCoverage} />

        <section className="rounded-card bg-canvas p-6 sm:p-8">
          <h2 className="text-2xl font-bold sm:text-3xl">{guide.checklist.heading}</h2>
          <p className="mt-3 text-lg">{guide.checklist.intro}</p>
          <ul className="mt-5 space-y-3 text-lg">
            {guide.checklist.items.map((item) => (
              <li key={item} className="flex gap-3">
                <Icon name="question" className="mt-1 size-5 shrink-0 text-accent-strong" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-start gap-3 rounded-control bg-surface p-4 text-base font-semibold text-ink">
            <Icon name="info" className="mt-0.5 size-5 shrink-0 text-accent-strong" />
            {guide.checklist.warning}
          </p>
        </section>

        <p className="text-base text-muted">{ui.services.educationalNote}</p>
        <OfficialLinks title={ui.common.officialResources} links={guide.officialLinks} newTabLabel={ui.common.opensInNewTab} />
      </Container>
      <FinalCta locale={locale} />
    </>
  );
}

export function FaqPage({ locale }: { locale: Locale }) {
  const { ui, faq } = getContent(locale);
  return (
    <>
      <PageHeader locale={locale} title={ui.home.faqTitle} crumbs={[{ name: ui.home.faqTitle, path: pathFor({ kind: "page", id: "faq" }, locale, site) }]}>
        {site.approvals.faq !== "confirmed" && <Pending marker={ui.pending.marker} label={ui.pending.contentReview} />}
      </PageHeader>
      <Container className="max-w-4xl py-14">
        <FaqList items={faq} headingLevel={2} />
      </Container>
      <FinalCta locale={locale} />
    </>
  );
}
