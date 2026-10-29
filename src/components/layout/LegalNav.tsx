import Link from "next/link";
import { legalPageIds, pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { termsVisible } from "@/config/visibility";
import { getContent } from "@/lib/i18n";
import { GA_ID } from "@/lib/analytics";
import { AnalyticsPreferencesButton } from "./Analytics";

/** Privacy · Terms · Disclosures (Terms only once its text exists, or in review mode). */
export function LegalNav({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  const labels = { privacy: ui.footer.privacy, terms: ui.footer.terms, disclosures: ui.footer.disclosures };
  const pages = legalPageIds.filter((id) => id !== "terms" || termsVisible(site));
  const linkClass = "inline-flex min-h-tap items-center underline underline-offset-4 hover:decoration-2";
  return (
    <nav aria-label={ui.footer.legalLabel}>
      <ul className="flex flex-wrap items-center gap-x-6 text-small">
        {pages.map((id) => (
          <li key={id}>
            <Link href={pathFor({ kind: "page", id }, locale, site)} className={linkClass}>
              {labels[id]}
            </Link>
          </li>
        ))}
        {GA_ID && (
          <li>
            <AnalyticsPreferencesButton label={ui.footer.analytics} className={linkClass} />
          </li>
        )}
      </ul>
    </nav>
  );
}
