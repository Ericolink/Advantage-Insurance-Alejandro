import Link from "next/link";
import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { getContact, telHref } from "@/lib/contact";
import { fill, getContent } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";

/** Bottom bar on phones and tablets: call (when a phone is configured) and request a conversation. */
export function MobileCallBar({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  const { phone } = getContact();
  const contactHref = `${pathFor({ kind: "page", id: "contact" }, locale, site)}#request`;
  const item = "flex min-h-14 flex-1 items-center justify-center gap-2 rounded-control px-3 text-lg font-bold";

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-line bg-surface p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(18,50,91,0.08)] lg:hidden">
      <div className="mx-auto flex max-w-xl gap-3">
        {phone && (
          <a href={telHref(phone.e164)} className={`${item} bg-brand text-white`} aria-label={fill(ui.cta.callAria, { phone: phone.display })} data-event="call_click" data-location="mobile_bar">
            <Icon name="phone" className="size-5" />
            {ui.cta.callShort}
          </a>
        )}
        <Link href={contactHref} className={`${item} ${phone ? "border-2 border-brand text-brand" : "bg-brand text-white"}`} data-location="mobile_bar">
          <Icon name="calendar" className="size-5" />
          {ui.cta.requestConversation}
        </Link>
      </div>
    </div>
  );
}
