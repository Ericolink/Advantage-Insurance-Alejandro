import Image from "next/image";
import type { Photo } from "@/config/types";
import { reviewMode } from "@/config/visibility";
import { Icon } from "./Icon";

/**
 * A real photo, or — in review mode only — a dashed placeholder stating subject, ratio and minimum size.
 * On the public site a missing photo renders nothing, so it can never look like a real portrait or credential.
 * `aspect` holds the ratio classes per breakpoint (e.g. "aspect-[4/3] sm:aspect-video lg:aspect-[4/5]").
 */
export function PhotoFrame({
  photo,
  alt,
  placeholderTitle,
  placeholderLabel,
  aspect = "aspect-[4/5]",
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  className = "",
}: {
  photo: Photo | null;
  alt: string;
  placeholderTitle: string;
  placeholderLabel: string;
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (photo) {
    return (
      <div className={`overflow-hidden rounded-xl bg-navy-50 ${aspect} ${className}`}>
        <Image src={photo.src} width={photo.width} height={photo.height} alt={alt} priority={priority} sizes={sizes} className="size-full object-cover" />
      </div>
    );
  }
  if (!reviewMode) return null;
  return (
    <div className={`grid place-items-center rounded-xl border-2 border-dashed border-gray-500 bg-navy-50 p-6 text-center ${aspect} ${className}`} data-pending>
      <div className="max-w-xs space-y-2">
        <Icon name="image" className="mx-auto size-8 text-navy-900" />
        <p className="font-bold text-navy-900">{placeholderTitle}</p>
        <p className="text-small text-gray-600">{placeholderLabel}</p>
      </div>
    </div>
  );
}

/** True when a PhotoFrame would render something (a photo, or the placeholder in review mode). */
export const hasPhotoFrame = (photo: Photo | null) => photo !== null || reviewMode;
