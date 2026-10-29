import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { IconName, Locale } from "@/config/types";
import { approvedOrReview, visible } from "@/config/visibility";
import { fill, getContent } from "@/lib/i18n";
import { AgentPhoto, hasAgentPhoto } from "@/components/content/AgentPhoto";
import { PageHero } from "@/components/content/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Section";
import { Pending } from "@/components/ui/Pending";
import { AgentJsonLd } from "@/components/seo/JsonLd";

const languageNames = { en: "English", es: "Español" } as const;

/** Photo, biography, way of working, details and VERIFIED credentials only. */
export function AboutPage({ locale }: { locale: Locale }) {
  const { ui, about } = getContent(locale);
  const marker = ui.pending.marker;
  const languages = visible(site.languages);
  const area = visible(site.serviceArea);
  const hours = visible(site.hours);
  const licenses = visible(site.licenses);
  const npn = visible(site.npn);
  const social = visible(site.social);
  const showBio = approvedOrReview(site.approvals.biography) && about.biography.length > 0;
  const showApproach = approvedOrReview(site.approvals.biography) && about.approach.length > 0;
  const withPhoto = hasAgentPhoto();

  const detail = (icon: IconName, label: string, value: string | null, pendingLabel: string, pending: boolean) => (
    <div className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-md bg-navy-50 text-navy-900">
        <Icon name={icon} className="size-5" />
      </span>
      <div>
        <dt className="font-bold text-navy-900">{label}</dt>
        <dd className="text-gray-600">
          {value ?? <Pending marker={marker} label={pendingLabel} />}
          {value && pending && (
            <span className="ml-2">
              <Pending marker={marker} label={pendingLabel} />
            </span>
          )}
        </dd>
      </div>
    </div>
  );

  return (
    <>
      <AgentJsonLd locale={locale} />
      <PageHero locale={locale} title={fill(ui.about.title)} lead={ui.about.role} crumbs={[{ name: ui.nav.aboutLong, path: pathFor({ kind: "page", id: "about" }, locale, site) }]} />

      <Container className={`grid gap-12 py-section lg:gap-16 ${withPhoto ? "lg:grid-cols-[22rem_minmax(0,1fr)]" : ""}`}>
        {withPhoto && (
          <div>
            <AgentPhoto locale={locale} placeholder="about" sizes="(min-width: 1024px) 352px, 100vw" className="w-full max-w-sm lg:max-w-none" />
          </div>
        )}

        <div className="max-w-measure space-y-14">
          <section className="space-y-4">
            <h2 className="text-h2 font-bold">{ui.about.bioTitle}</h2>
            {showBio ? about.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : <Pending block marker={marker} label={ui.pending.biography} />}
            {showBio && site.approvals.biography !== "confirmed" && <Pending marker={marker} label={ui.pending.contentReview} />}
          </section>

          {/* "How Alejandro works" must come from Alejandro, in Alejandro's own words (src/content/<lang>/about.ts → approach). */}
          {showApproach ? (
            <section className="space-y-4">
              <h2 className="text-h2 font-bold">{ui.about.approachTitle}</h2>
              {about.approach.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ) : (
            <Pending block marker={marker} label={ui.pending.approach} />
          )}

          <section>
            <h2 className="text-h2 font-bold">{ui.about.detailsTitle}</h2>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              {detail("globe", ui.about.languagesLabel, languages ? languages.map((code) => languageNames[code]).join(" · ") : null, ui.pending.languages, false)}
              {detail("map-pin", ui.about.areaLabel, area?.[locale] ?? null, ui.pending.serviceArea, site.serviceArea.status === "pending")}
              {(hours || site.hours.status === "pending") && detail("clock", ui.about.hoursLabel, hours?.[locale] ?? null, ui.pending.hours, site.hours.status === "pending")}
            </dl>
          </section>

          <section className="rounded-lg border border-gray-200 p-6 sm:p-8">
            <h2 className="flex items-center gap-3 text-h2 font-bold">
              <Icon name="shield" className="size-7 text-navy-900" />
              {ui.about.credentialsTitle}
            </h2>
            <p className="mt-3 text-gray-600">{ui.about.credentialsLead}</p>
            <dl className="mt-6 space-y-4">
              {licenses && licenses.length > 0 ? (
                licenses.map((license) => (
                  <div key={`${license.state}-${license.number}`} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <dt className="font-bold">{fill(ui.about.licenseLabel, { state: license.state })}:</dt>
                    <dd className="flex flex-wrap items-center gap-3">
                      {license.number}
                      {license.verifyUrl && (
                        <ExternalLink href={license.verifyUrl} newTabLabel={ui.common.opensInNewTab}>
                          {ui.about.verify}
                        </ExternalLink>
                      )}
                      {site.licenses.status === "pending" && <Pending marker={marker} label={ui.pending.licenses} />}
                    </dd>
                  </div>
                ))
              ) : (
                <Pending block marker={marker} label={ui.pending.licenses} />
              )}
              {npn ? (
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <dt className="font-bold">{ui.about.npnLabel}:</dt>
                  <dd className="flex flex-wrap items-center gap-3">
                    {npn}
                    {site.npn.status === "pending" && <Pending marker={marker} label={ui.pending.npn} />}
                  </dd>
                </div>
              ) : (
                <Pending block marker={marker} label={ui.pending.npn} />
              )}
            </dl>
            {Boolean(npn || licenses?.length) && (
              <p className="mt-6">
                <ExternalLink href="https://nipr.com/" newTabLabel={ui.common.opensInNewTab}>
                  {ui.about.verifyNpn}
                </ExternalLink>
              </p>
            )}
          </section>

          {social && social.length > 0 && (
            <section>
              <h2 className="text-h3 font-bold">{fill(ui.about.socialTitle)}</h2>
              <ul className="mt-4 flex flex-wrap gap-6">
                {social.map((item) => (
                  <li key={item.url}>
                    <ExternalLink href={item.url} newTabLabel={ui.common.opensInNewTab}>
                      {item.label}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </Container>
      <CTABand locale={locale} />
    </>
  );
}
