import { reviewMode } from "@/config/visibility";
import { Notice } from "./Notice";

/**
 * Marker for missing or unapproved data: [BRACKETED] text, or a red dashed box when `block`.
 * Renders ONLY in review mode, so it can never reach the public site. Search the code for
 * <Pending (or the data-pending attribute in the HTML) to find every placeholder.
 */
export function Pending({ label, marker, block = false, tone = "light" }: { label: string; marker: string; block?: boolean; tone?: "light" | "dark" }) {
  if (!reviewMode) return null;
  if (block) {
    return (
      <Notice kind="pending" title={`${marker}.`}>
        <p>{label}</p>
      </Notice>
    );
  }
  const color = tone === "dark" ? "border-white/70 text-white" : "border-red-600 text-red-700";
  return (
    <span className={`inline-block rounded-sm border border-dashed px-1.5 font-semibold ${color}`} data-pending>
      <span className="sr-only">{marker}: </span>[{label}]
    </span>
  );
}
