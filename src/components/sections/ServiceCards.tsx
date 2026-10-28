import Link from "next/link";
import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { visibleServices } from "@/config/visibility";
import { getContent } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";

/** Service cards, generated from site.services (only those that may be shown). */
export function ServiceCards({ locale, headingLevel = 3 }: { locale: Locale; headingLevel?: 2 | 3 }) {
  const { ui, services } = getContent(locale);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const list = visibleServices(site);

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((service) => {
        const text = services[service.id];
        return (
          <li key={service.id}>
            <Link
              href={pathFor({ kind: "service", id: service.id }, locale, site)}
              className="group flex h-full flex-col rounded-card border-2 border-line bg-surface p-6 transition-colors hover:border-brand"
            >
              <span className="grid size-12 place-items-center rounded-control bg-accent-soft text-accent-strong">
                <Icon name={service.icon} className="size-6" />
              </span>
              <Heading className="mt-5 font-sans text-xl font-bold text-brand">{text.title}</Heading>
              <p className="mt-2 flex-1 text-lg text-muted">{text.cardText}</p>
              {service.status === "pending" && (
                <span className="mt-4">
                  <Pending marker={ui.pending.marker} label={ui.pending.service} />
                </span>
              )}
              <span className="mt-5 inline-flex items-center gap-2 text-lg font-bold text-accent-strong group-hover:text-brand">
                {ui.common.learnMore}
                <Icon name="arrow-right" className="size-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
