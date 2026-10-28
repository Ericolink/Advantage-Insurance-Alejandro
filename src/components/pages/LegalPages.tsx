import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { visible, visibleServices } from "@/config/visibility";
import { fill, getContent } from "@/lib/i18n";
import { TpmoNotice } from "@/components/content/Compliance";
import { OfficialLinks } from "@/components/content/OfficialLinks";
import { PageHeader } from "@/components/content/PageHeader";
import { Container } from "@/components/ui/Layout";
import { Pending } from "@/components/ui/Pending";
import { Prose } from "./ContentPages";

export function PrivacyPage({ locale }: { locale: Locale }) {
  const { ui, legal } = getContent(locale);
  const page = legal.privacy;
  return (
    <>
      <PageHeader locale={locale} title={page.title} lead={page.lead} crumbs={[{ name: page.title, path: pathFor({ kind: "page", id: "privacy" }, locale, site) }]}>
        {site.approvals.privacyPolicy !== "confirmed" && <Pending marker={ui.pending.marker} label={ui.pending.legalReview} />}
      </PageHeader>
      <Container className="max-w-3xl space-y-10 py-14">
        {page.sections.map((section) => (
          <Prose key={section.heading} section={section} />
        ))}
        <p className="text-base text-muted">{page.updated}</p>
      </Container>
    </>
  );
}

export function DisclaimersPage({ locale }: { locale: Locale }) {
  const { ui, legal } = getContent(locale);
  const page = legal.disclaimers;
  const services = visibleServices(site);
  const marker = ui.pending.marker;

  return (
    <>
      <PageHeader locale={locale} title={page.title} lead={page.lead} crumbs={[{ name: page.title, path: pathFor({ kind: "page", id: "disclaimers" }, locale, site) }]} />
      <Container className="max-w-3xl space-y-10 py-14">
        {services.some((service) => service.medicare) && (
          <section className="space-y-3">
            {site.approvals.nonAffiliationNotice !== "confirmed" && <Pending marker={marker} label={ui.pending.legalReview} />}
            <p className="text-lg font-semibold">{fill(page.nonAffiliation)}</p>
          </section>
        )}

        <TpmoNotice locale={locale} />

        {visible(site.marketingDisclaimers)?.map((item) => (
          <p key={item.en} className="text-lg">
            {item[locale]}
          </p>
        ))}
        {site.marketingDisclaimers.status === "pending" && <Pending block marker={marker} label={ui.pending.marketing} />}

        <Prose section={page.educational} />

        {services.some((service) => service.aca) && (
          <div className="space-y-3">
            {site.approvals.acaConsentProcess !== "confirmed" && <Pending marker={marker} label={ui.pending.acaConsent} />}
            <Prose section={page.aca} />
          </div>
        )}

        <OfficialLinks title={page.officialHeading} links={page.officialLinks} newTabLabel={ui.common.opensInNewTab} />
        <p className="text-lg">{page.medicareContact}</p>
      </Container>
    </>
  );
}
