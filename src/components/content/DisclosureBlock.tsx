// Regulatory notices. Texts come from site.ts (TPMO, marketing) or src/content/*/legal.ts (non-affiliation draft).
// Unapproved texts appear only in review mode, with a marker. Nothing here makes the site "compliant" by itself.
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { approvedOrReview, visible, visibleServices } from "@/config/visibility";
import { getContent, fill } from "@/lib/i18n";
import { Pending } from "@/components/ui/Pending";

const showsMedicare = () => visibleServices(site).some((service) => service.medicare);
export const showsTpmoProducts = () => visibleServices(site).some((service) => service.requiresTpmo);

/** TPMO disclaimer box, for pages that market Medicare Advantage or Part D. */
export function TpmoNotice({ locale, tone = "light" }: { locale: Locale; tone?: "light" | "dark" }) {
  if (!showsTpmoProducts()) return null;
  const { ui } = getContent(locale);
  const text = visible(site.tpmoDisclaimer);
  if (!text) return tone === "dark" ? <Pending tone="dark" marker={ui.pending.marker} label={ui.pending.tpmo} /> : <Pending block marker={ui.pending.marker} label={ui.pending.tpmo} />;
  return (
    <div role="note" className={tone === "dark" ? "text-small text-white/85" : "rounded-lg bg-gray-50 p-5 text-small text-gray-700"}>
      {site.tpmoDisclaimer.status === "pending" && (
        <p className="mb-2">
          <Pending tone={tone} marker={ui.pending.marker} label={ui.pending.tpmo} />
        </p>
      )}
      <p>{text[locale]}</p>
    </div>
  );
}

/** Footer disclosure block: non-affiliation, TPMO and any product marketing disclaimers (rich text from content/config files). */
export function DisclosureBlock({ locale }: { locale: Locale }) {
  const { ui, legal } = getContent(locale);
  const marketing = visible(site.marketingDisclaimers);
  const showNonAffiliation = showsMedicare() && approvedOrReview(site.approvals.nonAffiliationNotice);

  return (
    <div className="max-w-measure space-y-4 text-small text-white/85">
      {showNonAffiliation && (
        <p>
          {site.approvals.nonAffiliationNotice !== "confirmed" && (
            <>
              <Pending tone="dark" marker={ui.pending.marker} label={ui.pending.legalReview} />{" "}
            </>
          )}
          {fill(legal.disclosures.nonAffiliation)}
        </p>
      )}
      <TpmoNotice locale={locale} tone="dark" />
      {marketing?.map((item) => (
        <p key={item.en}>{item[locale]}</p>
      ))}
      {site.marketingDisclaimers.status === "pending" && (
        <p>
          <Pending tone="dark" marker={ui.pending.marker} label={ui.pending.marketing} />
        </p>
      )}
    </div>
  );
}
