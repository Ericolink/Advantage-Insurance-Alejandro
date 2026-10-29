// Contact-form rules shared by the browser (instant feedback) and the server (the source of truth).
// Fields follow the design handoff: name*, phone*, email (optional), best time, topic, short message (optional, 500), consent*.
// Never add Medicare/SSN numbers, birth dates, health data, medications or income.

export const timeSlots = ["any", "morning", "afternoon", "evening"] as const;
export type TimeSlot = (typeof timeSlots)[number];
export const extraTopics = ["general", "notSure"] as const;
export const MESSAGE_MAX = 500;

export type LeadField = "name" | "phone" | "email" | "time" | "topic" | "message" | "consent";
export type LeadErrors = Partial<Record<LeadField, true>>;
export const fieldOrder: LeadField[] = ["name", "phone", "email", "time", "topic", "message", "consent"];

export interface LeadInput {
  name: string;
  phone: string;
  email: string;
  time: string;
  topic: string;
  message: string;
  consent: boolean;
  /** Honeypot: hidden from people, bots fill it in. */
  trap: string;
}

export interface LeadRules {
  topics: readonly string[];
}

export type LeadFormState =
  | { status: "idle" }
  | { status: "success"; visitor: string }
  | { status: "invalid"; errors: LeadErrors }
  | { status: "unavailable" }
  | { status: "rateLimited" }
  | { status: "failed" };

const text = (data: FormData, key: string, max: number) => String(data.get(key) ?? "").trim().slice(0, max);

/** Reads ONLY the known fields: anything else that is posted (e.g. an SSN) is ignored. */
export function readLeadForm(data: FormData): LeadInput {
  return {
    name: text(data, "name", 100),
    phone: text(data, "phone", 30),
    email: text(data, "email", 200),
    time: text(data, "time", 20),
    topic: text(data, "topic", 40),
    // Read a little past the limit so an over-long message is reported instead of silently cut.
    message: text(data, "message", MESSAGE_MAX + 1),
    consent: data.get("consent") === "on",
    trap: text(data, "website", 200),
  };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** U.S. number → E.164 (+1XXXXXXXXXX), or null when invalid. */
export function normalizeUsPhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(national) ? `+1${national}` : null;
}

export interface ValidLead {
  name: string;
  phone: string;
  email: string | null;
  time: TimeSlot;
  topic: string;
  message: string | null;
}

export function validateLead(input: LeadInput, rules: LeadRules): { errors: LeadErrors; lead: ValidLead | null } {
  const errors: LeadErrors = {};
  const phone = normalizeUsPhone(input.phone);

  if (input.name.length < 2) errors.name = true;
  if (!phone) errors.phone = true;
  if (input.email && !EMAIL.test(input.email)) errors.email = true;
  if (!(timeSlots as readonly string[]).includes(input.time)) errors.time = true;
  if (!rules.topics.includes(input.topic)) errors.topic = true;
  if (input.message.length > MESSAGE_MAX) errors.message = true;
  if (!input.consent) errors.consent = true;

  if (Object.keys(errors).length > 0 || !phone) return { errors, lead: null };
  return {
    errors,
    lead: { name: input.name, phone, email: input.email || null, time: input.time as TimeSlot, topic: input.topic, message: input.message || null },
  };
}
