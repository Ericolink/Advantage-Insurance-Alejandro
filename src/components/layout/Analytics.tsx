"use client";

import { useEffect, useSyncExternalStore } from "react";
import { GA_ID, track, type AnalyticsEvent } from "@/lib/analytics";
import { buttonClass } from "@/components/ui/Button";

// Analytics consent is a per-browser convenience, stored in localStorage. Never stores personal data.
const STORAGE_KEY = "analytics-consent";
const CHANGE_EVENT = "analytics-consent-change";
type Choice = "granted" | "denied" | null;

function readChoice(): Choice {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    if (choice) localStorage.setItem(STORAGE_KEY, choice);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage blocked: the choice lasts for this page view only.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

const subscribe = (callback: () => void) => {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

// "unknown" during server rendering, so the banner never flashes for visitors who already chose.
const useChoice = () => useSyncExternalStore<Choice | "unknown">(subscribe, readChoice, () => "unknown");

let gaLoaded = false;
function loadGoogleAnalytics(id: string) {
  if (gaLoaded) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the `arguments` object itself.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { allow_google_signals: false, allow_ad_personalization_signals: false });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

/** Small, non-blocking notice. Google Analytics loads only after "Allow". Not rendered at all without a GA ID. */
export function AnalyticsConsent({ title, text, accept, decline }: { title: string; text: string; accept: string; decline: string }) {
  const choice = useChoice();

  useEffect(() => {
    if (GA_ID && choice === "granted") loadGoogleAnalytics(GA_ID);
  }, [choice]);

  if (!GA_ID || choice !== null) return null;
  return (
    <div role="region" aria-label={title} className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-5 shadow-md">
      <p className="text-small text-gray-700">{text}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => saveChoice("granted")} className={buttonClass("secondary", "", "md")}>
          {accept}
        </button>
        <button type="button" onClick={() => saveChoice("denied")} className={buttonClass("secondary", "", "md")}>
          {decline}
        </button>
      </div>
    </div>
  );
}

/** Footer button that reopens the analytics notice. Withdrawing consent reloads the page so GA is unloaded. */
export function AnalyticsPreferencesButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      className={`text-left ${className}`}
      onClick={() => {
        const wasGranted = readChoice() === "granted";
        saveChoice(null);
        if (wasGranted) window.location.reload();
      }}
    >
      {label}
    </button>
  );
}

/** One listener for every element with data-event="…" (call, WhatsApp, email, scheduling buttons). */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-event]");
      if (!target) return;
      track(target.dataset.event as AnalyticsEvent, { location: target.dataset.location });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
