import type { Metadata, Viewport } from "next";
import { Public_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { brandName, reviewMode } from "@/config/visibility";
import { getContent, hasLocale, localeTags, locales } from "@/lib/i18n";
import { AnalyticsConsent, TrackClicks } from "@/components/layout/Analytics";
import { ReviewBanner } from "@/components/layout/ReviewBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "../globals.css";

// Public Sans (design sheet 01): self-hosted by next/font, only the weights in use, with a metric-matched fallback.
const publicSans = Public_Sans({ subsets: ["latin", "latin-ext"], weight: ["400", "600", "700", "800"], variable: "--font-public-sans", display: "swap" });

type LayoutProps = { children: ReactNode; params: Promise<{ lang: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: "#18324B", viewportFit: "cover" };

// Indexable only with a production domain and outside review mode.
const indexable = Boolean(site.url) && !reviewMode;

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  return {
    ...(site.url && { metadataBase: new URL(site.url) }),
    title: { default: brandName(site), template: `%s | ${brandName(site)}` },
    applicationName: brandName(site),
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    formatDetection: { telephone: false },
    ...(verification && { verification: { google: verification } }),
    other: { "content-language": localeTags[lang] },
  };
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { ui } = getContent(lang);

  return (
    <html lang={localeTags[lang]} className={publicSans.variable}>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only z-50 rounded-md bg-navy-900 px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          {ui.common.skipToContent}
        </a>
        <ReviewBanner text={ui.pending.reviewBanner} />
        <SiteHeader locale={lang} />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter locale={lang} />
        <AnalyticsConsent title={ui.analytics.title} text={ui.analytics.text} accept={ui.analytics.accept} decline={ui.analytics.decline} />
        <TrackClicks />
      </body>
    </html>
  );
}
