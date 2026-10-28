import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { approvedOrReview, visible } from "@/config/visibility";
import { fill, getContent } from "@/lib/i18n";
import { AgentPortrait, hasPortrait } from "@/components/content/AgentPortrait";
import { PageHeader } from "@/components/content/PageHeader";
import { FinalCta } from "@/components/sections/HomeSections";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layout";
import { Pending } from "@/components/ui/Pending";
import { AgentJsonLd } from "@/components/seo/JsonLd";

const languageNames = { en: "English", es: "Español" } as const;

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

  const detail = (icon: "globe" | "map-pin" | "clock", label: string, value: string | null, pendingLabel: string, pending: boolean) => (
    <div className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-control bg-accent-soft text-accent-strong">
        <Icon name={icon} className="size-5" />
      </span>
      <div>
        <dt className="font-bold text-ink">{label}</dt>
        <dd className="text-lg text-muted">
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
      <PageHeader locale={locale} title={fill(ui.about.title)} lead={ui.about.role} crumbs={[{ name: ui.nav.about, path: pathFor({ kind: "page", id: "about" }, locale, site) }]} />

      <Container className={`grid gap-12 py-14 ${hasPortrait() ? "lg:grid-cols-[22rem_1fr]" : ""}`}>
        {hasPortrait() && <AgentPortrait locale={locale} className="mx-auto w-full max-w-sm" />}

        <div className="space-y-12">
          <section className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-bold sm:text-3xl">{ui.about.bioTitle}</h2>
            {showBio ? (
              about.biography.map((paragraph) => (
                <p key={paragraph} className="text-lg">
                  {paragraph}
                </p>
              ))
            ) : (
              <Pending block marker={marker} label={ui.pending.biography} />
            )}
            {showBio && site.approvals.biography !== "confirmed" && <Pending marker={marker} label={ui.pending.contentReview} />}
          </section>

          <section>
            <h2 className="text-2xl font-bold sm:text-3xl">{ui.about.detailsTitle}</h2>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              {detail("globe", ui.about.languagesLabel, languages ? languages.map((code) => languageNames[code]).join(" · ") : null, ui.pending.languages, site.languages.status === "pending")}
              {detail("map-pin", ui.about.areaLabel, area?.[locale] ?? null, ui.pending.serviceArea, site.serviceArea.status === "pending")}
              {(hours || site.hours.status === "pending") && detail("clock", ui.about.hoursLabel, hours?.[locale] ?? null, ui.pending.hours, site.hours.status === "pending")}
            </dl>
          </section>

          <section className="rounded-card border-2 border-line p-6 sm:p-8">
            <h2 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
              <Icon name="shield" className="size-7 text-accent-strong" />
              {ui.about.credentialsTitle}
            </h2>
            <p className="mt-3 text-lg text-muted">{ui.about.credentialsLead}</p>
            <dl className="mt-6 space-y-4 text-lg">
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
              <h2 className="text-2xl font-bold">{fill(ui.about.socialTitle)}</h2>
              <ul className="mt-4 flex flex-wrap gap-4 text-lg">
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
      <FinalCta locale={locale} />
    </>
  );
}
