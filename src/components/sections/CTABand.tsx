import type { Locale } from "@/config/types";
import { fill, getContent } from "@/lib/i18n";
import { CallButton, ScheduleButton, WhatsAppButton } from "@/components/content/ContactButtons";
import { Container } from "@/components/ui/Section";

/** Closing call to action on every page: light grey panel, one red button, the call button next to it. */
export function CTABand({ locale, title, text }: { locale: Locale; title?: string; text?: string }) {
  const { ui } = getContent(locale);
  return (
    <section aria-labelledby="cta-band-title" className="bg-white py-section">
      <Container>
        <div className="flex flex-col gap-8 rounded-xl bg-gray-50 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-14">
          <div className="max-w-2xl">
            <h2 id="cta-band-title" className="text-h2 font-bold">
              {title ?? ui.home.ctaTitle}
            </h2>
            <p className="mt-4 text-lead text-gray-600">{fill(text ?? ui.home.ctaText)}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ScheduleButton ui={ui} locale={locale} location="cta_band" className="w-full sm:w-auto" />
            <CallButton ui={ui} location="cta_band" className="w-full sm:w-auto" />
            <WhatsAppButton ui={ui} location="cta_band" className="w-full sm:w-auto" />
          </div>
        </div>
      </Container>
    </section>
  );
}
