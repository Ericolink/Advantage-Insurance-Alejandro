"use client";

import { startTransition, useActionState, useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Locale } from "@/config/types";
import type { UiContent } from "@/content/types";
import { track } from "@/lib/analytics";
import { fieldOrder, readLeadForm, timeSlots, validateLead, type ContactMethod, type LeadErrors, type LeadField, type LeadFormState } from "@/lib/lead-validation";
import { submitLead } from "@/lib/submit-lead";
import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export interface ContactFormProps {
  locale: Locale;
  text: UiContent["form"];
  /** Consent wording with the agent's name filled in. */
  consentText: string;
  /** Success text with the agent's name filled in ({visitor} is filled here). */
  successTitle: string;
  successText: string;
  failedText: string;
  topics: { id: string; label: string }[];
  allowWhatsapp: boolean;
  privacyHref: string;
  /** Review-mode notices shown above the fields (e.g. "consent wording pending"). */
  notices?: ReactNode;
}

const inputClass =
  "mt-2 block w-full rounded-control border-2 border-muted/60 bg-surface px-4 py-3 text-lg text-ink placeholder:text-muted/70 focus:border-brand aria-[invalid=true]:border-danger";
const labelClass = "block text-lg font-bold text-ink";
const choiceClass =
  "flex min-h-12 cursor-pointer items-center gap-3 rounded-control border-2 border-line bg-surface px-4 py-2 text-lg has-[:checked]:border-brand has-[:checked]:bg-brand-soft";

/** Wrapper so "send another request" starts a fresh form (new action state). */
export function ContactForm(props: ContactFormProps) {
  const [round, setRound] = useState(0);
  return <ContactFormInner key={round} {...props} onReset={() => setRound((value) => value + 1)} />;
}

function ContactFormInner({ locale, text, consentText, successTitle, successText, failedText, topics, allowWhatsapp, privacyHref, notices, onReset }: ContactFormProps & { onReset: () => void }) {
  const [state, formAction, pending] = useActionState<LeadFormState, FormData>(submitLead, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<LeadErrors | null>(null);
  const [method, setMethod] = useState<ContactMethod>("phone");
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const fieldId = (field: LeadField) => `${id}-${field}`;

  const errors: LeadErrors = clientErrors ?? (state.status === "invalid" ? state.errors : {});
  const errorFields = fieldOrder.filter((field) => errors[field]);

  // React to the server's answer: analytics (event name only) and move focus to the message.
  useEffect(() => {
    if (state.status === "idle") return;
    if (state.status === "success") {
      track("lead_submit_success", { location: "contact_form" });
      resultRef.current?.focus();
    } else {
      track("lead_submit_error", { location: "contact_form" });
      (state.status === "invalid" ? summaryRef : resultRef).current?.focus();
    }
  }, [state]);

  // Browser-side errors: move focus to the summary once it is rendered.
  useLayoutEffect(() => {
    if (clientErrors) summaryRef.current?.focus();
  }, [clientErrors]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { errors: found } = validateLead(readLeadForm(data), { topics: topics.map((topic) => topic.id), allowWhatsapp });
    if (Object.keys(found).length > 0) {
      // A new object each time, so the focus effect runs even when the same errors repeat.
      setClientErrors({ ...found });
      return;
    }
    setClientErrors(null);
    startTransition(() => formAction(data));
  }

  if (state.status === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-card border-2 border-success bg-success-soft p-6 sm:p-8">
        <p className="flex items-start gap-3 text-2xl font-bold text-success">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-success text-white">
            <Icon name="check" className="size-6" />
          </span>
          {successTitle.replace(/,?\s*\{visitor\}/, state.visitor ? `, ${state.visitor}` : "")}
        </p>
        <p className="mt-4 text-lg text-ink">{successText}</p>
        <button type="button" onClick={onReset} className={buttonClass("outline", "mt-6")}>
          {text.successAgain}
        </button>
      </div>
    );
  }

  const describedBy = (field: LeadField, hint?: string) => [hint, errors[field] ? `${fieldId(field)}-error` : null].filter(Boolean).join(" ") || undefined;
  const invalid = (field: LeadField) => (errors[field] ? true : undefined);
  const error = (field: LeadField) =>
    errors[field] ? (
      <p id={`${fieldId(field)}-error`} className="mt-2 flex items-center gap-2 text-lg font-semibold text-danger">
        <Icon name="alert" className="size-5 shrink-0" />
        {text.errors[field]}
      </p>
    ) : null;

  const serverMessage =
    state.status === "failed" ? failedText : state.status === "unavailable" ? text.unavailable : state.status === "rateLimited" ? text.rateLimited : null;

  const methods: { value: ContactMethod; label: string }[] = [
    { value: "phone", label: text.methodPhone },
    ...(allowWhatsapp ? [{ value: "whatsapp" as const, label: text.methodWhatsapp }] : []),
    { value: "email", label: text.methodEmail },
  ];

  return (
    // method="post" so that, even without JavaScript, personal data never ends up in a URL.
    <form method="post" noValidate onSubmit={onSubmit} className="space-y-7" aria-busy={pending}>
      <input type="hidden" name="locale" value={locale} />
      <p className="text-base text-muted">{text.requiredNote}</p>
      {notices}

      {errorFields.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-control border-2 border-danger bg-danger-soft p-5">
          <p className="text-lg font-bold text-danger">{text.errorSummary}</p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-lg">
            {errorFields.map((field) => (
              <li key={field}>
                <a href={`#${fieldId(field)}`} className="font-semibold text-danger underline underline-offset-4">
                  {text.errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {serverMessage && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="flex items-start gap-3 rounded-control border-2 border-danger bg-danger-soft p-5 text-lg font-semibold text-danger">
          <Icon name="alert" className="mt-1 size-5 shrink-0" />
          <p>{serverMessage}</p>
        </div>
      )}

      <div>
        <label htmlFor={fieldId("name")} className={labelClass}>
          {text.name}
        </label>
        <input id={fieldId("name")} name="name" type="text" autoComplete="name" maxLength={100} required aria-invalid={invalid("name")} aria-describedby={describedBy("name")} className={inputClass} />
        {error("name")}
      </div>

      <fieldset aria-describedby={describedBy("method")}>
        <legend id={fieldId("method")} tabIndex={-1} className={labelClass}>
          {text.method}
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {methods.map((option) => (
            <label key={option.value} className={choiceClass}>
              <input type="radio" name="method" value={option.value} checked={method === option.value} onChange={() => setMethod(option.value)} className="size-5 accent-brand" />
              {option.label}
            </label>
          ))}
        </div>
        {error("method")}
      </fieldset>

      {method === "email" ? (
        <div>
          <label htmlFor={fieldId("email")} className={labelClass}>
            {text.email}
          </label>
          <input id={fieldId("email")} name="email" type="email" autoComplete="email" maxLength={200} required aria-invalid={invalid("email")} aria-describedby={describedBy("email")} className={inputClass} />
          {error("email")}
        </div>
      ) : (
        <div>
          <label htmlFor={fieldId("phone")} className={labelClass}>
            {text.phone}
          </label>
          <p id={`${fieldId("phone")}-hint`} className="mt-1 text-base text-muted">
            {text.phoneHint}
          </p>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            maxLength={30}
            required
            aria-invalid={invalid("phone")}
            aria-describedby={describedBy("phone", `${fieldId("phone")}-hint`)}
            className={inputClass}
          />
          {error("phone")}
        </div>
      )}

      <fieldset aria-describedby={describedBy("language")}>
        <legend id={fieldId("language")} tabIndex={-1} className={labelClass}>
          {text.language}
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(["en", "es"] as const).map((code) => (
            <label key={code} className={choiceClass} lang={code}>
              <input type="radio" name="language" value={code} defaultChecked={code === locale} className="size-5 accent-brand" />
              {code === "es" ? "Español" : "English"}
            </label>
          ))}
        </div>
        {error("language")}
      </fieldset>

      <div>
        <label htmlFor={fieldId("topic")} className={labelClass}>
          {text.topic}
        </label>
        <select id={fieldId("topic")} name="topic" defaultValue="" required aria-invalid={invalid("topic")} aria-describedby={describedBy("topic")} className={`${inputClass} appearance-auto`}>
          <option value="" disabled>
            {text.topicPlaceholder}
          </option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.label}
            </option>
          ))}
        </select>
        {error("topic")}
      </div>

      <fieldset aria-describedby={describedBy("time")}>
        <legend id={fieldId("time")} tabIndex={-1} className={labelClass}>
          {text.time}
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {timeSlots.map((slot) => (
            <label key={slot} className={choiceClass}>
              <input type="radio" name="time" value={slot} className="size-5 accent-brand" />
              {text.timeOptions[slot]}
            </label>
          ))}
        </div>
        {error("time")}
      </fieldset>

      {/* Honeypot: invisible to people and screen readers; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          {text.honeypot}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-lg text-ink">
          <input
            id={fieldId("consent")}
            type="checkbox"
            name="consent"
            required
            aria-invalid={invalid("consent")}
            aria-describedby={describedBy("consent")}
            className="mt-1 size-6 shrink-0 accent-brand"
          />
          <span>
            {consentText}{" "}
            <a href={privacyHref} className="font-semibold text-accent-strong underline underline-offset-4">
              {text.privacyLink}
            </a>
          </span>
        </label>
        {error("consent")}
      </div>

      <p className="flex items-start gap-3 rounded-control bg-canvas p-4 text-base text-muted">
        <Icon name="info" className="mt-0.5 size-5 shrink-0 text-accent-strong" />
        {text.sensitiveWarning}
      </p>

      <button type="submit" disabled={pending} className={buttonClass("primary", "w-full sm:w-auto")}>
        {pending ? text.sending : text.submit}
        {!pending && <Icon name="arrow-right" className="size-5" />}
      </button>
    </form>
  );
}
