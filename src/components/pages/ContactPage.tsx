import type { ReactNode } from "react";
import { hasLeadDestination } from "@/config/lead-env";
import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { IconName, Locale } from "@/config/types";
import { reviewMode, visible } from "@/config/visibility";
import { getContact } from "@/lib/contact";
import { fill, getContent } from "@/lib/i18n";
import { leadTopics, topicLabel } from "@/lib/lead-topics";
import { showsTpmoProducts, TpmoNotice } from "@/components/content/DisclosureBlock";
import { CallButton, EmailButton } from "@/components/content/ContactButtons";
import { PageHero } from "@/components/content/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Scheduler } from "@/components/forms/Scheduler";
import { Icon } from "@/components/ui/Icon";
import { Notice } from "@/components/ui/Notice";
import { Container } from "@/components/ui/Section";
import { Pending } from "@/components/ui/Pending";

function OptionCard({ icon, title, children }: { icon: IconName; title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="flex items-center gap-3 text-h3 font-bold">
        <span className="grid size-11 place-items-center rounded-md bg-navy-50 text-navy-900">
          <Icon name={icon} className="size-5" />
        </span>
        {title}
      </h2>
      <div className="space-y-3 text-gray-600">{children}</div>
    </div>
  );
}

/** Phone, email and booking only when confirmed; the form only when a delivery destination is configured. */
export function ContactPage({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  const marker = ui.pending.marker;
  const contact = getContact();
  const area = visible(site.serviceArea);
  const hours = visible(site.hours);
  const responseTime = visible(site.responseTime);
  const connected = hasLeadDestination();
  const phoneText = contact.phone?.display;

  return (
    <>
      <PageHero locale={locale} title={fill(ui.contact.title)} lead={ui.contact.lead} crumbs={[{ name: ui.nav.contact, path: pathFor({ kind: "page", id: "contact" }, locale, site) }]} />

      <Container className="space-y-16 py-section">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <OptionCard icon="phone" title={ui.contact.callTitle}>
            {phoneText && <p className="text-h3 font-bold text-navy-900">{phoneText}</p>}
            <CallButton ui={ui} location="contact_page" withNumber={false} className="w-full sm:w-auto" />
            {contact.phone?.pending && <Pending marker={marker} label={ui.pending.phone} />}
          </OptionCard>

          {(contact.email || reviewMode) && (
            <OptionCard icon="mail" title={ui.contact.emailTitle}>
              {contact.email && <p className="font-semibold break-all text-gray-700">{contact.email}</p>}
              <EmailButton ui={ui} location="contact_page" className="w-full sm:w-auto" />
              {contact.email && contact.emailPending && <Pending marker={marker} label={ui.pending.email} />}
            </OptionCard>
          )}

          {(area || reviewMode) && (
            <OptionCard icon="map-pin" title={ui.contact.areaTitle}>
              {area ? <p className="text-gray-700">{area[locale]}</p> : <Pending marker={marker} label={ui.pending.serviceArea} />}
              {area && site.serviceArea.status === "pending" && <Pending marker={marker} label={ui.pending.serviceArea} />}
            </OptionCard>
          )}

          {(hours || (reviewMode && site.hours.status === "pending")) && (
            <OptionCard icon="clock" title={ui.contact.hoursTitle}>
              {hours ? <p className="text-gray-700">{hours[locale]}</p> : <Pending marker={marker} label={ui.pending.hours} />}
            </OptionCard>
          )}
        </div>

        {/* "Book a time" exists only with a real scheduling URL; otherwise it is hidden and the form does the job. */}
        {contact.scheduling ? (
          <section id="schedule" aria-labelledby="schedule-title" className="rounded-lg bg-gray-50 p-6 sm:p-10">
            <h2 id="schedule-title" className="text-h2 font-bold">
              {ui.contact.scheduleTitle}
            </h2>
            <p className="mt-3 mb-6 text-gray-600">{ui.contact.scheduleText}</p>
            <Scheduler
              url={contact.scheduling.url}
              provider={contact.scheduling.provider}
              allowEmbed={contact.scheduling.allowEmbed}
              labels={{
                open: ui.cta.bookTime,
                load: ui.contact.scheduleLoad,
                loadNote: ui.contact.scheduleLoadNote,
                frameTitle: ui.contact.scheduleFrameTitle,
                newTab: ui.common.opensInNewTab,
              }}
            />
            {contact.scheduling.pending && (
              <p className="mt-4">
                <Pending marker={marker} label={ui.pending.scheduling} />
              </p>
            )}
          </section>
        ) : (
          <Pending block marker={marker} label={ui.pending.scheduling} />
        )}

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,40rem)] lg:gap-16">
          <div className="max-w-measure">
            <h2 id="request" className="text-h2 font-bold">
              {ui.contact.formTitle}
            </h2>
            <p className="mt-4 text-lead text-gray-600">{fill(ui.contact.formLead)}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5 sm:p-8">
            {connected || reviewMode ? (
              <ContactForm
                locale={locale}
                text={ui.form}
                consentText={fill(ui.form.consent)}
                successNext={fill(ui.form.successNext)}
                successResponse={responseTime ? fill(ui.form.successResponse, { time: responseTime[locale] }) : null}
                failedText={phoneText ? fill(ui.form.failed, { phone: phoneText }) : ui.form.failedNoPhone}
                topics={leadTopics().map((id) => ({ id, label: topicLabel(id, locale) }))}
                privacyHref={pathFor({ kind: "page", id: "privacy" }, locale, site)}
                notices={
                  reviewMode && (
                    <div className="space-y-3">
                      {!connected && <Pending block marker={marker} label={ui.pending.formNotConnected} />}
                      {site.approvals.contactConsent !== "confirmed" && <Pending block marker={marker} label={ui.pending.consent} />}
                      {!responseTime && <Pending block marker={marker} label={ui.pending.responseTime} />}
                    </div>
                  )
                }
              />
            ) : (
              <Notice kind="info" role="status" title={ui.contact.unavailableTitle}>
                <p>{ui.contact.unavailableText}</p>
                <div className="flex flex-wrap gap-3 pt-3">
                  <CallButton ui={ui} location="contact_form_unavailable" />
                  <EmailButton ui={ui} location="contact_form_unavailable" />
                </div>
              </Notice>
            )}
          </div>
        </section>

        {showsTpmoProducts() && <TpmoNotice locale={locale} />}
      </Container>
    </>
  );
}
