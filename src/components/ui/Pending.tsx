import { reviewMode } from "@/config/visibility";
import { Icon } from "./Icon";

/**
 * Visible marker for missing or unapproved data. Renders ONLY in review mode, so it can never
 * reach the public site. Search the code for <Pending to find every placeholder.
 */
export function Pending({ label, marker, block = false }: { label: string; marker: string; block?: boolean }) {
  if (!reviewMode) return null;
  if (block) {
    return (
      <div className="flex items-start gap-3 rounded-control border-2 border-dashed border-pending-line bg-pending-soft p-4 text-base font-semibold text-pending" data-pending>
        <Icon name="alert" className="mt-0.5 size-5 shrink-0" />
        <p>
          <span className="uppercase tracking-wide">{marker}:</span> {label}
        </p>
      </div>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-pending-line bg-pending-soft px-3 py-0.5 text-sm font-semibold text-pending" data-pending>
      <Icon name="alert" className="size-4 shrink-0" />
      <span>
        {marker}: {label}
      </span>
    </span>
  );
}
