import type { OfficialLink } from "@/content/types";
import { ExternalLink } from "@/components/ui/ExternalLink";

export function OfficialLinks({ title, links, newTabLabel }: { title: string; links: OfficialLink[]; newTabLabel: string }) {
  if (links.length === 0) return null;
  return (
    <aside aria-label={title} className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-h3 font-bold">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <ExternalLink href={link.href} newTabLabel={newTabLabel}>
              {link.label}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
