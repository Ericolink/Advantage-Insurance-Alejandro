import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/config/routes";
import { fill, getContent } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { CTABand } from "@/components/sections/CTABand";
import { AgentIntro, FaqTeaser, Hero, HowItWorks, Intro, ServicesOverview } from "@/components/sections/HomeSections";
import { AgentJsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { ui } = getContent(lang);
  return pageMetadata({ locale: lang, route: { kind: "home" }, title: fill(ui.meta.homeTitle), description: fill(ui.meta.homeDescription), absoluteTitle: true });
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <AgentJsonLd locale={lang} />
      <Hero locale={lang} />
      <Intro locale={lang} />
      <ServicesOverview locale={lang} />
      <HowItWorks locale={lang} />
      <AgentIntro locale={lang} />
      <FaqTeaser locale={lang} />
      <CTABand locale={lang} />
    </>
  );
}
