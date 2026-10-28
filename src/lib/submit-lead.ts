"use server";

import { headers } from "next/headers";
import { hasLeadDestination } from "@/config/lead-env";
import { hasLocale } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { getContent, fill } from "@/lib/i18n";
import { leadTopics, topicLabel } from "@/lib/lead-topics";
import { readLeadForm, validateLead, type LeadFormState } from "@/lib/lead-validation";
import { deliverLead, isRateLimited } from "@/lib/leads";
import { visible } from "@/config/visibility";

export async function submitLead(_previous: LeadFormState, data: FormData): Promise<LeadFormState> {
  const rawLocale = String(data.get("locale") ?? "");
  const pageLocale: Locale = hasLocale(rawLocale) ? rawLocale : "en";
  const input = readLeadForm(data);

  // Bots fill the hidden field: answer as if it worked, deliver nothing.
  if (input.trap) return { status: "success", visitor: "" };

  const { errors, lead } = validateLead(input, { topics: leadTopics(), allowWhatsapp: visible(site.whatsapp) !== null });
  if (!lead) return { status: "invalid", errors };

  // Never pretend the request was sent.
  if (!hasLeadDestination()) return { status: "unavailable" };

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-nf-client-connection-ip") ?? requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) return { status: "rateLimited" };

  const delivered = await deliverLead({
    ...lead,
    // The agent reads the topic in both languages, whatever language the visitor used.
    topicLabel: `${topicLabel(lead.topic, "es")} / ${topicLabel(lead.topic, "en")}`,
    consentText: fill(getContent(pageLocale).ui.form.consent),
    pageLocale,
    submittedAt: new Date().toISOString(),
  });

  return delivered ? { status: "success", visitor: lead.name.split(/\s+/)[0] } : { status: "failed" };
}
