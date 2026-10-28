// Lead destinations, read from environment variables. Alias-free so next.config.ts and scripts can import it.

type Env = Record<string, string | undefined>;

const read = (env: Env, name: string) => env[name]?.trim() || null;

export function leadEmailConfig(env: Env = process.env) {
  const apiKey = read(env, "RESEND_API_KEY");
  const to = read(env, "LEAD_EMAIL_TO");
  const from = read(env, "LEAD_EMAIL_FROM");
  return apiKey && to && from ? { apiKey, to, from } : null;
}

export function leadWebhookConfig(env: Env = process.env) {
  const url = read(env, "LEAD_WEBHOOK_URL");
  return url ? { url, secret: read(env, "LEAD_WEBHOOK_SECRET") } : null;
}

/** True when at least one destination (email or webhook) is configured. */
export const hasLeadDestination = (env: Env = process.env) => leadEmailConfig(env) !== null || leadWebhookConfig(env) !== null;
