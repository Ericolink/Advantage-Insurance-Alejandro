"use client";

import { usePathname } from "next/navigation";
import { translatePath } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { Icon } from "@/components/ui/Icon";

/** Links to the SAME page in the other language. The choice is remembered by src/proxy.ts (language cookie only). */
export function LanguageSwitcher({ locale, label, ariaLabel }: { locale: Locale; label: string; ariaLabel: string }) {
  const pathname = usePathname();
  const target: Locale = locale === "en" ? "es" : "en";
  return (
    <a
      href={translatePath(pathname, target, site)}
      hrefLang={target}
      lang={target}
      aria-label={ariaLabel}
      className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-line px-4 text-base font-bold text-brand hover:border-brand hover:bg-brand-soft"
    >
      <Icon name="globe" className="size-5" />
      {label}
    </a>
  );
}
