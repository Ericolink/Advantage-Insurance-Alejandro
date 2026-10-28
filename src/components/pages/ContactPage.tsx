import type { ReactNode } from "react";
import { hasLeadDestination } from "@/config/lead-env";
import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { IconName, Locale } from "@/config/types";
import { reviewMode, visible } from "@/config/visibility";
import { getContact } from "@/lib/contact";
import { fill, getContent } from "@/lib/i18n";
import { leadTopics, topicLabel } from "@/lib/lead-topics";
import { showsTpmoProducts, TpmoNotice } from "@/components/content/Compliance";
import { CallButton, EmailButton, WhatsAppButton } from "@/components/content/ContactButtons";
import { PageHeader } from "@/components/content/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { Scheduler } from "@/components/forms/Scheduler";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layout";
import { Pending } from "@/components/ui/Pending";

function OptionCard({ icon, title, children }: { icon: IconName; title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-card border-2 border-line bg-surface p-6">
      <h2 className="flex items-center gap-3 font-sans text-xl font-bold text-brand">
        <span className="grid size-11 place-items-center rounded-control bg-accent-soft text-accent-strong">
          <Icon name={icon} className="size-5" />
        </span>
        {title}
      </h2>
      <div className="space-y-3 text-lg text-muted">{children}</div>
    </div>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const { ui } = getContent(locale);
  const marker = ui.pending.marker;
  const contact = getContact();
  const area = visible(site.serviceArea);
  const hours = visible(site.hours);
  const connected = hasLeadDestination();
  const phoneText = contact.phone?.display;

  return (
    <>
      <PageHeader locale={locale} title={fill(ui.contact.title)} lead={ui.contact.lead} crumbs={[{ name: ui.nav.contact, path: pathFor({ kind: "page", id: "contact" }, locale, site) }]} />

      <Container className="space-y-14 py-14">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <OptionCard icon="phone" title={ui.contact.callTitle}>
            {phoneText && <p className="text-2xl font-bold text-ink">{phoneText}</p>}
            <CallButton ui={ui} location="contact_page" variant="primary" withNumber={false} />
            {contact.phone?.pending && <Pending marker={marker} label={ui.pending.phone} />}
          </OptionCard>

          {contact.whatsapp ? (
            <OptionCard icon="message" title={ui.contact.whatsappTitle}>
              <WhatsAppButton ui={ui} location="contact_page" />
              {contact.whatsapp.pending && <Pending marker={marker} label={ui.pending.whatsapp} />}
            </OptionCard>
          ) : (
            site.whatsapp.status === "pending" && reviewMode && (
              <OptionCard icon="message" title={ui.contact.whatsappTitle}>
                <Pending marker={marker} label={ui.pending.whatsapp} />
              </OptionCard>
            )
          )}

          <OptionCard icon="mail" title={ui.contact.emailTitle}>
            {contact.email && <p className="break-all font-semibold text-ink">{contact.email}</p>}
            <EmailButton ui={ui} location="contact_page" />
            {contact.email && contact.emailPending && <Pending marker={marker} label={ui.pending.email} />}
          </OptionCard>

          <OptionCard icon="map-pin" title={ui.contact.areaTitle}>
            {area ? <p className="text-ink">{area[locale]}</p> : <Pending marker={marker} label={ui.pending.serviceArea} />}
            {area && site.serviceArea.status === "pending" && <Pending marker={marker} label={ui.pending.serviceArea} />}
          </OptionCard>

          {(hours || (reviewMode && site.hours.status === "pending")) && (
            <OptionCard icon="clock" title={ui.contact.hoursTitle}>
              {hours ? <p className="text-ink">{hours[locale]}</p> : <Pending marker={marker} label={ui.pending.hours} />}
            </OptionCard>
          )}
        </div>

        {(contact.scheduling || reviewMode) && (
          <section aria-labelledby="schedule-title" className="rounded-card bg-canvas p-6 sm:p-8">
            <h2 id="schedule-title" className="text-2xl font-bold sm:text-3xl">
              {ui.contact.scheduleTitle}
            </h2>
            <p className="mt-3 mb-6 text-lg text-muted">{ui.contact.scheduleText}</p>
            {contact.scheduling ? (
              <>
                <Scheduler
                  url={contact.scheduling.url}
                  provider={contact.scheduling.provider}
                  allowEmbed={contact.scheduling.allowEmbed}
                  labels={{
                    open: ui.cta.schedule,
                    load: ui.contact.scheduleLoad,
                    loadNote: ui.contact.scheduleLoadNote,
                    frameTitle: ui.contact.scheduleFrameTitle,
                    newTab: ui.common.opensInNewTab,
                  }}
                />
                {contact.scheduling.pending && <Pending marker={marker} label={ui.pending.scheduling} />}
              </>
            ) : (
              <Pending block marker={marker} label={ui.pending.scheduling} />
            )}
          </section>
        )}

        <section aria-labelledby="request" className="grid gap-10 lg:grid-cols-[1fr_minmax(0,40rem)]">
          <div>
            <h2 id="request" className="text-3xl font-bold sm:text-4xl">
              {ui.contact.formTitle}
            </h2>
            <p className="mt-4 text-xl text-muted">{ui.contact.formLead}</p>
          </div>
          <div className="rounded-card border-2 border-line bg-surface p-5 sm:p-8">
            {connected || reviewMode ? (
              <ContactForm
                locale={locale}
                text={ui.form}
                consentText={fill(ui.form.consent)}
                successTitle={fill(ui.form.successTitle, {})}
                successText={fill(ui.form.successText)}
                failedText={phoneText ? fill(ui.form.failed, { phone: phoneText }) : ui.form.failedNoPhone}
                topics={leadTopics().map((id) => ({ id, label: topicLabel(id, locale) }))}
                allowWhatsapp={contact.whatsapp !== null}
                privacyHref={pathFor({ kind: "page", id: "privacy" }, locale, site)}
                notices={
                  reviewMode && (
                    <div className="space-y-3">
                      {!connected && <Pending block marker={marker} label={ui.pending.formNotConnected} />}
                      {site.approvals.contactConsent !== "confirmed" && <Pending block marker={marker} label={ui.pending.consent} />}
                    </div>
                  )
                }
              />
            ) : (
              <div role="status" className="space-y-4">
                <p className="text-xl font-bold text-ink">{ui.contact.unavailableTitle}</p>
                <p className="text-lg text-muted">{ui.contact.unavailableText}</p>
                <div className="flex flex-wrap gap-3">
                  <CallButton ui={ui} location="contact_form_unavailable" variant="primary" />
                  <EmailButton ui={ui} location="contact_form_unavailable" />
                </div>
              </div>
            )}
          </div>
        </section>

        {showsTpmoProducts() && <TpmoNotice locale={locale} />}
      </Container>
    </>
  );
}
