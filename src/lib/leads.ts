// Server-only (imported only by the submit-lead server action). Delivery of contact requests: email through Resend and/or a webhook (configured in .env).
import { leadEmailConfig, leadWebhookConfig } from "@/config/lead-env";
import { brandName } from "@/config/visibility";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import type { ValidLead } from "@/lib/lead-validation";

export interface Lead extends ValidLead {
  /** Human-readable topic, e.g. "Medicare Supplement (Medigap)". */
  topicLabel: string;
  /** Exact consent wording the visitor agreed to, kept as a record. */
  consentText: string;
  pageLocale: Locale;
  submittedAt: string;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

const timeLabels = { any: "Cualquiera / Any time", morning: "Mañana / Morning", afternoon: "Tarde / Afternoon", evening: "Noche / Evening" } as const;

function emailRows(lead: Lead): [string, string][] {
  const rows: [string, string | null][] = [
    ["Nombre / Name", lead.name],
    ["Teléfono / Phone", lead.phone],
    ["Correo / Email", lead.email],
    ["Idioma de la página / Page language", lead.pageLocale === "es" ? "Español / Spanish" : "Inglés / English"],
    ["Tema / Topic", lead.topicLabel],
    ["Horario / Best time", timeLabels[lead.time]],
    ["Mensaje / Message", lead.message],
    ["Consentimiento / Consent", `Sí / Yes — “${lead.consentText}”`],
    ["Enviado / Sent", lead.submittedAt],
  ];
  return rows.filter((row): row is [string, string] => Boolean(row[1]));
}

async function sendEmail(lead: Lead, config: { apiKey: string; to: string; from: string }) {
  const rows = emailRows(lead);
  const html = `<h2>Nueva solicitud de contacto / New contact request</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([label, value]) => `<tr><th align="left" valign="top">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`)
    .join("")}</table>`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: lead.email ?? undefined,
      subject: `Nueva solicitud / New request: ${lead.name} — ${lead.topicLabel}`,
      html,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Resend responded ${response.status}`);
}

async function sendWebhook(lead: Lead, config: { url: string; secret: string | null }) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.secret) headers["X-Lead-Secret"] = config.secret;
  const response = await fetch(config.url, {
    method: "POST",
    headers,
    body: JSON.stringify({ source: "website", business: brandName(site), ...lead }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
}

/** Sends the lead to every configured destination. Succeeds if at least one accepted it. */
export async function deliverLead(lead: Lead): Promise<boolean> {
  const email = leadEmailConfig();
  const webhook = leadWebhookConfig();
  const tasks: Promise<void>[] = [];
  if (email) tasks.push(sendEmail(lead, email));
  if (webhook) tasks.push(sendWebhook(lead, webhook));
  if (tasks.length === 0) return false;

  const results = await Promise.allSettled(tasks);
  for (const result of results) {
    // Log only the failure reason, never the visitor's data.
    if (result.status === "rejected") console.error("[lead] delivery failed:", String(result.reason));
  }
  return results.some((result) => result.status === "fulfilled");
}

// Best-effort, per-instance rate limit; enough to stop casual abuse.
const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > 5000) attempts.clear();
  return recent.length > MAX_ATTEMPTS;
}
