// Contact-form rules shared by the browser (instant feedback) and the server (the source of truth).
// The form collects only what is needed to call back. Never add Medicare/SSN numbers, birth dates, health data or income.
import type { Locale } from "@/config/types";

export type ContactMethod = "phone" | "whatsapp" | "email";
export const timeSlots = ["morning", "afternoon", "evening", "any"] as const;
export type TimeSlot = (typeof timeSlots)[number];
export const extraTopics = ["general", "notSure"] as const;

export type LeadField = "name" | "method" | "phone" | "email" | "language" | "topic" | "time" | "consent";
export type LeadErrors = Partial<Record<LeadField, true>>;
export const fieldOrder: LeadField[] = ["name", "method", "phone", "email", "language", "topic", "time", "consent"];

export interface LeadInput {
  name: string;
  method: string;
  phone: string;
  email: string;
  language: string;
  topic: string;
  time: string;
  consent: boolean;
  /** Honeypot: hidden from people, bots fill it in. */
  trap: string;
}

export interface LeadRules {
  topics: readonly string[];
  allowWhatsapp: boolean;
}

export type LeadFormState =
  | { status: "idle" }
  | { status: "success"; visitor: string }
  | { status: "invalid"; errors: LeadErrors }
  | { status: "unavailable" }
  | { status: "rateLimited" }
  | { status: "failed" };

const text = (data: FormData, key: string, max: number) => String(data.get(key) ?? "").trim().slice(0, max);

export function readLeadForm(data: FormData): LeadInput {
  return {
    name: text(data, "name", 100),
    method: text(data, "method", 20),
    phone: text(data, "phone", 30),
    email: text(data, "email", 200),
    language: text(data, "language", 5),
    topic: text(data, "topic", 40),
    time: text(data, "time", 20),
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
  method: ContactMethod;
  phone: string | null;
  email: string | null;
  language: Locale;
  topic: string;
  time: TimeSlot;
}

export function validateLead(input: LeadInput, rules: LeadRules): { errors: LeadErrors; lead: ValidLead | null } {
  const errors: LeadErrors = {};
  const methods: ContactMethod[] = rules.allowWhatsapp ? ["phone", "whatsapp", "email"] : ["phone", "email"];
  const method = methods.find((item) => item === input.method) ?? null;

  if (input.name.length < 2) errors.name = true;
  if (!method) errors.method = true;

  // Only the field for the chosen method is required (and kept).
  const needsPhone = method === "phone" || method === "whatsapp";
  const phone = needsPhone ? normalizeUsPhone(input.phone) : null;
  if (needsPhone && !phone) errors.phone = true;
  const email = method === "email" ? input.email : null;
  if (method === "email" && !EMAIL.test(input.email)) errors.email = true;

  if (input.language !== "en" && input.language !== "es") errors.language = true;
  if (!rules.topics.includes(input.topic)) errors.topic = true;
  if (!(timeSlots as readonly string[]).includes(input.time)) errors.time = true;
  if (!input.consent) errors.consent = true;

  if (Object.keys(errors).length > 0 || !method) return { errors, lead: null };
  return {
    errors,
    lead: { name: input.name, method, phone, email, language: input.language as Locale, topic: input.topic, time: input.time as TimeSlot },
  };
}
