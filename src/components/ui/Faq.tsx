import type { QA } from "@/content/types";
import { fill } from "@/lib/i18n";
import { Icon } from "./Icon";

/** Accessible disclosure list built on native <details>/<summary>: keyboard and screen-reader friendly, no JavaScript. */
export function FaqList({ items, headingLevel = 3 }: { items: QA[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="divide-y-2 divide-line overflow-hidden rounded-card border-2 border-line bg-surface">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-5 hover:bg-canvas sm:px-7">
            <Heading className="font-sans text-xl font-bold text-ink">{fill(item.q)}</Heading>
            <span className="faq-chevron grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition-transform">
              <Icon name="chevron-down" className="size-5" />
            </span>
          </summary>
          <div className="px-5 pb-6 text-lg text-muted sm:px-7">
            <p>{fill(item.a)}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
