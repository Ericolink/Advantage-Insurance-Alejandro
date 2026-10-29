"use client";

import { usePathname } from "next/navigation";
import { translatePath } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";

const labels: Record<Locale, { long: string; short: string }> = { en: { long: "English", short: "EN" }, es: { long: "Español", short: "ES" } };

/**
 * English / Español switch for the navy top bar. The other language links to the SAME page there;
 * src/proxy.ts remembers the choice in a language-only cookie.
 */
export function LanguageSwitch({ locale, groupLabel, switchLabel }: { locale: Locale; groupLabel: string; switchLabel: string }) {
  const pathname = usePathname();
  const item = "inline-flex min-h-tap min-w-tap items-center justify-center rounded-full px-4 text-small";
  return (
    <div role="group" aria-label={groupLabel} className="flex items-center gap-1 rounded-full bg-white/10 p-0.5">
      {(Object.keys(labels) as Locale[]).map((code) =>
        code === locale ? (
          <span key={code} aria-current="true" lang={code} className={`${item} bg-white font-bold text-navy-900`}>
            <span className="sm:hidden">{labels[code].short}</span>
            <span className="hidden sm:inline">{labels[code].long}</span>
          </span>
        ) : (
          <a
            key={code}
            href={translatePath(pathname, code, site)}
            hrefLang={code}
            lang={code}
            aria-label={switchLabel}
            className={`${item} font-semibold text-white underline-offset-4 transition-colors duration-150 hover:bg-white/15 hover:underline`}
          >
            <span className="sm:hidden">{labels[code].short}</span>
            <span className="hidden sm:inline">{labels[code].long}</span>
          </a>
        ),
      )}
    </div>
  );
}
