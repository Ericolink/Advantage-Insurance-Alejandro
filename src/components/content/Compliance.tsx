// Regulatory notices. Texts come from site.ts (TPMO, marketing) or src/content/*/legal.ts (non-affiliation draft).
// Unapproved texts appear only in review mode, with a marker. Nothing here makes the site "compliant" by itself.
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { approvedOrReview, visible, visibleServices } from "@/config/visibility";
import { getContent, fill } from "@/lib/i18n";
import { Pending } from "@/components/ui/Pending";

const showsMedicare = () => visibleServices(site).some((service) => service.medicare);
export const showsTpmoProducts = () => visibleServices(site).some((service) => service.requiresTpmo);

/** Prominent TPMO disclaimer box, for pages that market Medicare Advantage or Part D. */
export function TpmoNotice({ locale }: { locale: Locale }) {
  if (!showsTpmoProducts()) return null;
  const { ui } = getContent(locale);
  const text = visible(site.tpmoDisclaimer);
  if (!text) return <Pending block marker={ui.pending.marker} label={ui.pending.tpmo} />;
  return (
    <div className="rounded-control border-2 border-line bg-canvas p-5 text-base text-ink" role="note">
      {site.tpmoDisclaimer.status === "pending" && (
        <p className="mb-2">
          <Pending marker={ui.pending.marker} label={ui.pending.tpmo} />
        </p>
      )}
      <p>{text[locale]}</p>
    </div>
  );
}

/** Footer notices: non-affiliation, TPMO and any product marketing disclaimers. */
export function FooterNotices({ locale }: { locale: Locale }) {
  const { ui, legal } = getContent(locale);
  const marketing = visible(site.marketingDisclaimers);
  const showNonAffiliation = showsMedicare() && approvedOrReview(site.approvals.nonAffiliationNotice);

  return (
    <div className="space-y-4 text-base text-white/85">
      {showNonAffiliation && (
        <div className="space-y-2">
          {site.approvals.nonAffiliationNotice !== "confirmed" && <Pending marker={ui.pending.marker} label={ui.pending.legalReview} />}
          <p>{fill(legal.disclaimers.nonAffiliation)}</p>
        </div>
      )}
      <TpmoNotice locale={locale} />
      {marketing?.map((item) => (
        <p key={item.en}>{item[locale]}</p>
      ))}
      {site.marketingDisclaimers.status === "pending" && <Pending marker={ui.pending.marker} label={ui.pending.marketing} />}
    </div>
  );
}
