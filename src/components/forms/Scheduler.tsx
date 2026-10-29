"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

interface Props {
  url: string;
  provider: string;
  allowEmbed: boolean;
  labels: { open: string; load: string; loadNote: string; frameTitle: string; newTab: string };
}

/**
 * Scheduling link (Calendly or similar). The embedded calendar is a third party, so it loads
 * only when the visitor asks for it — no third-party scripts or cookies before that.
 */
export function Scheduler({ url, provider, allowEmbed, labels }: Props) {
  const [embedded, setEmbedded] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")} data-event="schedule_click" data-location="contact_page">
          <Icon name="calendar" className="size-5" />
          {labels.open}
          <span className="sr-only"> {labels.newTab}</span>
        </a>
        {allowEmbed && !embedded && (
          <button
            type="button"
            className={buttonClass("secondary")}
            onClick={() => {
              setEmbedded(true);
              track("schedule_open", { location: "contact_page" });
            }}
          >
            {labels.load}
          </button>
        )}
      </div>
      {allowEmbed && !embedded && <p className="text-small text-gray-600">{labels.loadNote.replace("{provider}", provider)}</p>}
      {embedded && <iframe src={url} title={labels.frameTitle} className="h-[44rem] w-full rounded-lg border border-gray-200 bg-white" loading="lazy" />}
    </div>
  );
}
