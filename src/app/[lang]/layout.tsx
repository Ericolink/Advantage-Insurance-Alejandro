import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { brandName, reviewMode } from "@/config/visibility";
import { getContent, hasLocale, localeTags, locales } from "@/lib/i18n";
import { AnalyticsConsent, TrackClicks } from "@/components/layout/Analytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { ReviewBanner } from "@/components/layout/ReviewBanner";
import "../globals.css";

// Atkinson Hyperlegible Next: designed for readers with low vision. Change the font here (and in globals.css tokens).
const body = Atkinson_Hyperlegible_Next({ subsets: ["latin"], variable: "--font-body", display: "swap", weight: ["400", "600", "700"], adjustFontFallback: false });

type LayoutProps = { children: ReactNode; params: Promise<{ lang: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: "#12325b", viewportFit: "cover" };

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
    <html lang={localeTags[lang]} className={body.variable}>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only z-50 rounded-control bg-brand px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          {ui.common.skipToContent}
        </a>
        <ReviewBanner text={ui.pending.reviewBanner} />
        <Header locale={lang} />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer locale={lang} />
        <MobileCallBar locale={lang} />
        <AnalyticsConsent title={ui.analytics.title} text={ui.analytics.text} accept={ui.analytics.accept} decline={ui.analytics.decline} />
        <TrackClicks />
      </body>
    </html>
  );
}
