// Privacy, Terms and Disclosures. Structure only: no legal text is written here — drafts live in
// src/content/<lang>/legal.ts and stay marked until the client or their compliance contact approves them.
import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { visible, visibleServices } from "@/config/visibility";
import { fill, getContent } from "@/lib/i18n";
import { TpmoNotice } from "@/components/content/DisclosureBlock";
import { OfficialLinks } from "@/components/content/OfficialLinks";
import { PageHero } from "@/components/content/PageHero";
import { Notice } from "@/components/ui/Notice";
import { Container } from "@/components/ui/Section";
import { Pending } from "@/components/ui/Pending";
import { Prose } from "./ContentPages";

export function PrivacyPage({ locale }: { locale: Locale }) {
  const { ui, legal } = getContent(locale);
  const page = legal.privacy;
  return (
    <>
      <PageHero locale={locale} title={page.title} lead={page.lead} crumbs={[{ name: page.title, path: pathFor({ kind: "page", id: "privacy" }, locale, site) }]}>
        {site.approvals.privacyPolicy !== "confirmed" && <Pending marker={ui.pending.marker} label={ui.pending.legalReview} />}
      </PageHero>
      <Container className="py-section">
        <div className="max-w-measure space-y-10">
          {page.sections.map((section) => (
            <Prose key={section.heading} section={section} />
          ))}
          <p className="text-small text-gray-600">{page.updated}</p>
        </div>
      </Container>
    </>
  );
}

/** Reachable on the public site only once approved (see termsVisible); in review mode it shows the outline to complete. */
export function TermsPage({ locale }: { locale: Locale }) {
  const { ui, legal } = getContent(locale);
  const page = legal.terms;
  return (
    <>
      <PageHero locale={locale} title={page.title} lead={page.lead} crumbs={[{ name: page.title, path: pathFor({ kind: "page", id: "terms" }, locale, site) }]}>
        {site.approvals.terms !== "confirmed" && <Pending marker={ui.pending.marker} label={ui.pending.legalReview} />}
      </PageHero>
      <Container className="py-section">
        <div className="max-w-measure space-y-10">
          {page.sections.length > 0 ? (
            page.sections.map((section) => <Prose key={section.heading} section={section} />)
          ) : (
            <Pending block marker={ui.pending.marker} label={`${ui.pending.terms}: ${page.outline.join(" · ")}`} />
          )}
        </div>
      </Container>
    </>
  );
}

export function DisclosuresPage({ locale }: { locale: Locale }) {
  const { ui, legal } = getContent(locale);
  const page = legal.disclosures;
  const services = visibleServices(site);
  const marker = ui.pending.marker;

  return (
    <>
      <PageHero locale={locale} title={page.title} lead={page.lead} crumbs={[{ name: page.title, path: pathFor({ kind: "page", id: "disclosures" }, locale, site) }]} />
      <Container className="py-section">
        <div className="max-w-measure space-y-10">
          {services.some((service) => service.medicare) && (
            <section className="space-y-3">
              {site.approvals.nonAffiliationNotice !== "confirmed" && <Pending marker={marker} label={ui.pending.legalReview} />}
              <Notice kind="info" role="note">
                <p className="text-body font-semibold">{fill(page.nonAffiliation)}</p>
              </Notice>
            </section>
          )}

          <TpmoNotice locale={locale} />

          {visible(site.marketingDisclaimers)?.map((item) => <p key={item.en}>{item[locale]}</p>)}
          {site.marketingDisclaimers.status === "pending" && <Pending block marker={marker} label={ui.pending.marketing} />}

          <Prose section={page.educational} />

          {services.some((service) => service.aca) && (
            <div className="space-y-3">
              {site.approvals.acaConsentProcess !== "confirmed" && <Pending marker={marker} label={ui.pending.acaConsent} />}
              <Prose section={page.aca} />
            </div>
          )}

          <OfficialLinks title={page.officialHeading} links={page.officialLinks} newTabLabel={ui.common.opensInNewTab} />
          <p>{page.medicareContact}</p>
        </div>
      </Container>
    </>
  );
}
