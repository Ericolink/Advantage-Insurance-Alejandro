import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { reviewMode, visible } from "@/config/visibility";
import { getContact, telHref } from "@/lib/contact";
import { fill, getContent } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Section";
import { Pending } from "@/components/ui/Pending";
import { LanguageSwitch } from "./LanguageSwitch";

/**
 * Navy bar: license line + phone (desktop) and the language switch (all sizes).
 * "Licensed" is only said once licenses are on file — never before.
 */
export function TopBar({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  const { phone } = getContact();
  const licenses = visible(site.licenses);
  const states = licenses?.length ? [...new Set(licenses.map((license) => license.state))].join(", ") : null;

  return (
    <div data-surface="dark" className="bg-navy-900 text-white">
      <Container className="flex min-h-14 items-center justify-end gap-6 py-1 lg:justify-between">
        <p className="hidden text-small lg:block">
          {states ? `${ui.topBar.licensed} · ${states}` : ui.topBar.agent}
          {reviewMode && site.licenses.status === "pending" && (
            <>
              {" · "}
              <Pending tone="dark" marker={ui.pending.marker} label={ui.pending.licensedStates} />
            </>
          )}
        </p>
        <div className="flex items-center gap-4">
          {phone && (
            <a
              href={telHref(phone.e164)}
              aria-label={fill(ui.cta.callAria, { phone: phone.display })}
              className="hidden min-h-tap items-center gap-2 text-small font-bold underline-offset-4 hover:underline lg:inline-flex"
              data-event="call_click"
              data-location="top_bar"
            >
              <Icon name="phone" className="size-4" />
              {phone.display}
            </a>
          )}
          <LanguageSwitch locale={locale} groupLabel={ui.topBar.languageLabel} switchLabel={ui.nav.switchToLabel} />
        </div>
      </Container>
    </div>
  );
}
