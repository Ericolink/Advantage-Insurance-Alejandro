"use client";

import { startTransition, useActionState, useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Locale } from "@/config/types";
import type { UiContent } from "@/content/types";
import { track } from "@/lib/analytics";
import { fieldOrder, MESSAGE_MAX, readLeadForm, timeSlots, validateLead, type LeadErrors, type LeadField, type LeadFormState } from "@/lib/lead-validation";
import { submitLead } from "@/lib/submit-lead";
import { buttonClass, linkClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Notice } from "@/components/ui/Notice";

export interface ContactFormProps {
  locale: Locale;
  text: UiContent["form"];
  /** Consent wording with the agent's name filled in. */
  consentText: string;
  /** "What happens next" line, name filled in. */
  successNext: string;
  /** Promised reply time, only when confirmed in site.ts. */
  successResponse: string | null;
  failedText: string;
  topics: { id: string; label: string }[];
  privacyHref: string;
  /** Review-mode notices shown above the fields (e.g. "consent wording pending"). */
  notices?: ReactNode;
}

const inputClass =
  "mt-2 block min-h-tap w-full rounded-md border-2 border-gray-500 bg-white px-4 py-3 text-body text-gray-700 focus-visible:border-navy-900 focus-visible:ring-4 focus-visible:ring-navy-900/25 focus-visible:outline-none aria-[invalid=true]:border-red-700";
const labelClass = "block font-bold text-navy-900";

// A network failure (offline, timeout) is reported like a delivery failure: honest, with the phone as fallback.
async function submitSafely(previous: LeadFormState, data: FormData): Promise<LeadFormState> {
  try {
    return await submitLead(previous, data);
  } catch {
    return { status: "failed" };
  }
}

/** Wrapper so "send another request" starts a fresh form (new action state). */
export function ContactForm(props: ContactFormProps) {
  const [round, setRound] = useState(0);
  return <ContactFormInner key={round} {...props} onReset={() => setRound((value) => value + 1)} />;
}

function ContactFormInner({ locale, text, consentText, successNext, successResponse, failedText, topics, privacyHref, notices, onReset }: ContactFormProps & { onReset: () => void }) {
  const [state, formAction, pending] = useActionState<LeadFormState, FormData>(submitSafely, { status: "idle" });
  // Errors shown next to fields: set on leaving a field, on submit, or by the server.
  const [errors, setErrors] = useState<LeadErrors>({});
  // Bumped on each failed submit so focus moves to the summary even when the same errors repeat.
  const [attempt, setAttempt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const fieldId = (field: LeadField) => `${id}-${field}`;
  const rules = { topics: topics.map((topic) => topic.id) };

  const shown: LeadErrors = state.status === "invalid" && attempt === 0 ? state.errors : errors;
  const errorFields = fieldOrder.filter((field) => shown[field]);

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

  useLayoutEffect(() => {
    if (attempt > 0) summaryRef.current?.focus();
  }, [attempt]);

  const currentErrors = () => (formRef.current ? validateLead(readLeadForm(new FormData(formRef.current)), rules).errors : {});

  /** Leaving a field shows (or clears) that field's error only. */
  function checkField(field: LeadField) {
    const found = currentErrors();
    setErrors((previous) => ({ ...previous, [field]: found[field] }));
  }

  /** While typing, an error that is already shown clears as soon as the value becomes valid. */
  function recheckIfShown(field: LeadField) {
    if (errors[field]) checkField(field);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    const { errors: found } = validateLead(readLeadForm(data), rules);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setAttempt((value) => value + 1);
      return;
    }
    setAttempt(0);
    startTransition(() => formAction(data));
  }

  if (state.status === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} className="space-y-6 focus-visible:outline-none">
        <Notice kind="success" role="status" title={text.successTitle}>
          <p>{text.successText.replace(/,?\s*\{visitor\}/, state.visitor ? `, ${state.visitor}` : "")}</p>
          <p>{successNext}</p>
          {successResponse && <p>{successResponse}</p>}
        </Notice>
        <button type="button" onClick={onReset} className={buttonClass("secondary")}>
          {text.successAgain}
        </button>
      </div>
    );
  }

  const describedBy = (field: LeadField, hint?: string) => [hint, shown[field] ? `${fieldId(field)}-error` : null].filter(Boolean).join(" ") || undefined;
  const invalid = (field: LeadField) => (shown[field] ? true : undefined);
  const error = (field: LeadField) =>
    shown[field] ? (
      <p id={`${fieldId(field)}-error`} className="mt-2 flex items-start gap-2 text-small font-semibold text-red-700">
        <Icon name="alert" className="mt-0.5 size-5 shrink-0" />
        {text.errors[field]}
      </p>
    ) : null;
  const optional = <span className="font-normal text-gray-600"> {text.optional}</span>;

  const serverMessage =
    state.status === "failed" ? failedText : state.status === "unavailable" ? text.unavailable : state.status === "rateLimited" ? text.rateLimited : null;

  return (
    // method="post" so that, even without JavaScript, personal data never ends up in a URL.
    <form ref={formRef} method="post" noValidate onSubmit={onSubmit} className="space-y-7" aria-busy={pending}>
      <input type="hidden" name="locale" value={locale} />
      <p className="text-small text-gray-600">{text.requiredNote}</p>
      {notices}

      {errorFields.length > 0 && (attempt > 0 || state.status === "invalid") && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-lg border-2 border-red-700 bg-white p-5">
          <p className="flex items-center gap-2 font-bold text-red-700">
            <Icon name="alert" className="size-5 shrink-0" />
            {text.errorSummary}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-10">
            {errorFields.map((field) => (
              <li key={field}>
                <a href={`#${fieldId(field)}`} className={linkClass}>
                  {text.errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {serverMessage && (
        <div ref={resultRef} tabIndex={-1} className="focus-visible:outline-none">
          <Notice kind="error" role="alert">
            <p className="font-semibold text-red-700">{serverMessage}</p>
          </Notice>
        </div>
      )}

      <div>
        <label htmlFor={fieldId("name")} className={labelClass}>
          {text.name}
        </label>
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          required
          aria-invalid={invalid("name")}
          aria-describedby={describedBy("name")}
          onBlur={() => checkField("name")}
          onChange={() => recheckIfShown("name")}
          className={inputClass}
        />
        {error("name")}
      </div>

      <div>
        <label htmlFor={fieldId("phone")} className={labelClass}>
          {text.phone}
        </label>
        <p id={`${fieldId("phone")}-hint`} className="mt-1 text-small text-gray-600">
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
          onBlur={() => checkField("phone")}
          onChange={() => recheckIfShown("phone")}
          className={inputClass}
        />
        {error("phone")}
      </div>

      <div>
        <label htmlFor={fieldId("email")} className={labelClass}>
          {text.email}
          {optional}
        </label>
        <input
          id={fieldId("email")}
          name="email"
          type="email"
          autoComplete="email"
          maxLength={200}
          aria-invalid={invalid("email")}
          aria-describedby={describedBy("email")}
          onBlur={() => checkField("email")}
          onChange={() => recheckIfShown("email")}
          className={inputClass}
        />
        {error("email")}
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("time")} className={labelClass}>
            {text.time}
          </label>
          <select id={fieldId("time")} name="time" defaultValue="any" aria-invalid={invalid("time")} aria-describedby={describedBy("time")} className={inputClass}>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {text.timeOptions[slot]}
              </option>
            ))}
          </select>
          {error("time")}
        </div>
        <div>
          <label htmlFor={fieldId("topic")} className={labelClass}>
            {text.topic}
          </label>
          <select id={fieldId("topic")} name="topic" defaultValue="notSure" aria-invalid={invalid("topic")} aria-describedby={describedBy("topic")} className={inputClass}>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.label}
              </option>
            ))}
          </select>
          {error("topic")}
        </div>
      </div>

      <div>
        <label htmlFor={fieldId("message")} className={labelClass}>
          {text.message}
          {optional}
        </label>
        <p id={`${fieldId("message")}-hint`} className="mt-1 text-small text-gray-600">
          {text.messageHint}
        </p>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={4}
          maxLength={MESSAGE_MAX}
          aria-invalid={invalid("message")}
          aria-describedby={describedBy("message", `${fieldId("message")}-hint`)}
          onBlur={() => checkField("message")}
          className={inputClass}
        />
        {error("message")}
      </div>

      {/* Honeypot: invisible to people and screen readers; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          {text.honeypot}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={fieldId("consent")}
            type="checkbox"
            name="consent"
            required
            aria-invalid={invalid("consent")}
            aria-describedby={describedBy("consent")}
            onChange={() => recheckIfShown("consent")}
            className="mt-0.5 size-6 shrink-0 cursor-pointer rounded-sm accent-navy-900"
          />
          <div>
            <label htmlFor={fieldId("consent")} className="cursor-pointer text-gray-700">
              {consentText}
            </label>{" "}
            <a href={privacyHref} className={linkClass}>
              {text.privacyLink}
            </a>
          </div>
        </div>
        {error("consent")}
      </div>

      <Notice kind="info">
        <p>{text.sensitiveWarning}</p>
      </Notice>

      <button type="submit" disabled={pending} className={buttonClass("primary", "w-full sm:w-auto")}>
        {pending ? text.sending : text.submit}
      </button>
    </form>
  );
}
