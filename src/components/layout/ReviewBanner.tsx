import { reviewMode } from "@/config/visibility";
import { Icon } from "@/components/ui/Icon";

/** Shown at the top of every page in review mode so nobody mistakes drafts for published information. */
export function ReviewBanner({ text }: { text: string }) {
  if (!reviewMode) return null;
  return (
    <div className="border-b-2 border-pending-line bg-pending-soft text-pending">
      <p className="mx-auto flex max-w-page items-start gap-2 px-5 py-2 text-base font-semibold sm:px-8">
        <Icon name="alert" className="mt-0.5 size-5 shrink-0" />
        {text}
      </p>
    </div>
  );
}
