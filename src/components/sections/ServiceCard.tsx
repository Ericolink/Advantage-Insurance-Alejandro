import Link from "next/link";
import type { ReactNode } from "react";
import { pathFor } from "@/config/routes";
import { site } from "@/config/site";
import type { IconName, Locale, ServiceConfig } from "@/config/types";
import { visibleServices } from "@/config/visibility";
import { getContent } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";

/**
 * The whole card is one link. Hover: 2px navy border and the icon tile fills navy — no lift, no shadow.
 * (The second pixel of the border is a ring, so the layout does not shift.)
 */
export function ServiceCard({ href, icon, title, text, linkLabel, headingLevel = 3, status }: { href: string; icon: IconName; title: string; text: string; linkLabel: string; headingLevel?: 2 | 3; status?: ReactNode }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link href={href} className="group flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 transition-colors duration-150 hover:border-navy-900 hover:ring-1 hover:ring-navy-900">
      <span className="grid size-12 place-items-center rounded-md bg-navy-50 text-navy-900 transition-colors duration-150 group-hover:bg-navy-900 group-hover:text-white">
        <Icon name={icon} className="size-6" />
      </span>
      <Heading className="mt-5 text-h3 font-bold">{title}</Heading>
      <p className="mt-2 flex-1 text-gray-600">{text}</p>
      {status && <span className="mt-4">{status}</span>}
      <span className="mt-5 font-semibold text-navy-900 underline decoration-1 underline-offset-4 group-hover:text-red-700 group-hover:decoration-2">{linkLabel}</span>
    </Link>
  );
}

/** Cards for every service that may be shown (confirmed, or pending in review mode with a marker). 1 → 2 → 3 columns. */
export function ServiceGrid({ locale, headingLevel = 3, services = visibleServices(site) }: { locale: Locale; headingLevel?: 2 | 3; services?: ServiceConfig[] }) {
  const { ui, services: text } = getContent(locale);
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.id}>
          <ServiceCard
            href={pathFor({ kind: "service", id: service.id }, locale, site)}
            icon={service.icon}
            title={text[service.id].title}
            text={text[service.id].cardText}
            linkLabel={ui.common.learnMore}
            headingLevel={headingLevel}
            status={service.status === "pending" && <Pending marker={ui.pending.marker} label={ui.pending.service} />}
          />
        </li>
      ))}
    </ul>
  );
}
