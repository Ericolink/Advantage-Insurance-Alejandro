import { reviewMode } from "@/config/visibility";
import { Icon } from "@/components/ui/Icon";

/** Shown at the top of every page in review mode so nobody mistakes drafts for published information. */
export function ReviewBanner({ text }: { text: string }) {
  if (!reviewMode) return null;
  return (
    <div className="border-b-2 border-dashed border-red-600 bg-white text-red-700" data-pending>
      <p className="mx-auto flex max-w-page items-start gap-2 px-gutter py-2 text-small font-semibold">
        <Icon name="pencil" className="mt-0.5 size-5 shrink-0" />
        {text}
      </p>
    </div>
  );
}
