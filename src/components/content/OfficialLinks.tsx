import type { OfficialLink } from "@/content/types";
import { ExternalLink } from "@/components/ui/ExternalLink";

export function OfficialLinks({ title, links, newTabLabel }: { title: string; links: OfficialLink[]; newTabLabel: string }) {
  if (links.length === 0) return null;
  return (
    <aside aria-label={title} className="rounded-card border-2 border-line bg-surface p-6">
      <h2 className="font-sans text-xl font-bold text-ink">{title}</h2>
      <ul className="mt-4 space-y-3 text-lg">
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
