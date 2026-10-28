import Image from "next/image";
import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { reviewMode, visible } from "@/config/visibility";
import { fill, getContent } from "@/lib/i18n";
import { Pending } from "@/components/ui/Pending";

/** True when there is something to show: a photo, or the placeholder tile in review mode. */
export const hasPortrait = () => visible(site.photo) !== null || reviewMode;

/** Professional photo when available; otherwise a neutral monogram tile (plus a Pending marker in review mode). */
export function AgentPortrait({ locale, priority = false, className = "" }: { locale: Locale; priority?: boolean; className?: string }) {
  const { ui } = getContent(locale);
  const photo = visible(site.photo);
  const name = site.agentName.value ?? "";

  if (photo) {
    return (
      <div className={`overflow-hidden rounded-card bg-canvas ${className}`}>
        <Image
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={photo.alt[locale] || fill(ui.home.portraitAlt)}
          priority={priority}
          sizes="(min-width: 1024px) 28rem, 90vw"
          className="aspect-[4/5] h-auto w-full object-cover"
        />
      </div>
    );
  }

  if (!reviewMode) return null;
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return (
    <div className={`relative grid aspect-[4/5] place-items-center rounded-card bg-brand-soft ${className}`}>
      <span aria-hidden="true" className="font-display text-8xl font-bold text-brand/25">
        {initials}
      </span>
      <div className="absolute inset-x-4 bottom-4">
        <Pending marker={ui.pending.marker} label={ui.pending.photo} />
      </div>
    </div>
  );
}
