"use client";

import { usePathname } from "next/navigation";
import { translatePath } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";

const labels: Record<Locale, { long: string; short: string }> = { en: { long: "English", short: "EN" }, es: { long: "Español", short: "ES" } };

const tones = {
  // Navy top bar.
  dark: { group: "bg-white/10", current: "bg-white text-navy-900", other: "text-white hover:bg-white/15" },
  // White mobile menu: full width, two equal halves.
  light: { group: "w-full bg-navy-50", current: "flex-1 bg-navy-900 text-white", other: "flex-1 text-navy-900 hover:bg-white" },
};

/**
 * English / Español switch: in the navy top bar (desktop) and inside the mobile menu. The other language links to the
 * SAME page there; src/proxy.ts remembers the choice in a language-only cookie.
 */
export function LanguageSwitch({ locale, groupLabel, switchLabel, tone = "dark" }: { locale: Locale; groupLabel: string; switchLabel: string; tone?: keyof typeof tones }) {
  const pathname = usePathname();
  const style = tones[tone];
  const item = "inline-flex min-h-tap min-w-tap items-center justify-center rounded-full px-4 text-small";
  const text = (code: Locale) =>
    tone === "light" ? (
      labels[code].long
    ) : (
      <>
        <span className="sm:hidden">{labels[code].short}</span>
        <span className="hidden sm:inline">{labels[code].long}</span>
      </>
    );
  return (
    <div role="group" aria-label={groupLabel} className={`flex items-center gap-1 rounded-full p-0.5 ${style.group}`}>
      {(Object.keys(labels) as Locale[]).map((code) =>
        code === locale ? (
          <span key={code} aria-current="true" lang={code} className={`${item} font-bold ${style.current}`}>
            {text(code)}
          </span>
        ) : (
          <a
            key={code}
            href={translatePath(pathname, code, site)}
            hrefLang={code}
            lang={code}
            aria-label={switchLabel}
            className={`${item} font-semibold underline-offset-4 transition-colors duration-150 hover:underline ${style.other}`}
          >
            {text(code)}
          </a>
        ),
      )}
    </div>
  );
}
