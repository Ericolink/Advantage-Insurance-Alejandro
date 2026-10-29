import type { ReactNode } from "react";
import { linkClass } from "./Button";
import { Icon } from "./Icon";

/** Link to another website: opens in a new tab and says so to screen readers. */
export function ExternalLink({ href, children, newTabLabel, className = "" }: { href: string; children: ReactNode; newTabLabel: string; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-start gap-2 ${linkClass} ${className}`}>
      <span>
        {children}
        <span className="sr-only"> {newTabLabel}</span>
      </span>
      <Icon name="external" className="mt-1 size-4 shrink-0" />
    </a>
  );
}
