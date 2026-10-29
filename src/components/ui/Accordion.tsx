import type { QA } from "@/content/types";
import { fill } from "@/lib/i18n";

/**
 * Native <details>/<summary>: keyboard and screen-reader support with no JavaScript, and several
 * items may be open at once. The whole row is the target (min 48px); the + turns 45° into ×.
 */
export function Accordion({ items, headingLevel = 3 }: { items: QA[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="border-t border-gray-200">
      {items.map((item) => (
        <AccordionItem key={item.q} question={fill(item.q)} answer={fill(item.a)} Heading={Heading} />
      ))}
    </div>
  );
}

export function AccordionItem({ question, answer, Heading = "h3" }: { question: string; answer: string; Heading?: "h2" | "h3" }) {
  return (
    <details className="group border-b border-gray-200">
      <summary className="flex min-h-tap cursor-pointer items-center justify-between gap-4 py-5">
        <Heading className="text-body font-bold text-navy-900">{question}</Heading>
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-full border border-gray-500 text-navy-900 transition-colors duration-150 group-open:border-navy-900 group-open:bg-navy-900 group-open:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-4 transition-transform duration-150 group-open:rotate-45">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </summary>
      <p className="max-w-measure pr-12 pb-6 text-gray-700">{answer}</p>
    </details>
  );
}
