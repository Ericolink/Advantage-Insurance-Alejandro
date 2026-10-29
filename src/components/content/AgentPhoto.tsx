import { site } from "@/config/site";
import type { Locale } from "@/config/types";
import { visible } from "@/config/visibility";
import { fill, getContent } from "@/lib/i18n";
import { hasPhotoFrame, PhotoFrame } from "@/components/ui/PhotoFrame";

export const hasAgentPhoto = () => hasPhotoFrame(visible(site.photo));

/** Alejandro's portrait from site.ts, or the review-mode placeholder describing the photo to supply. */
export function AgentPhoto({ locale, placeholder, aspect, priority, sizes, className }: { locale: Locale; placeholder: "hero" | "about"; aspect?: string; priority?: boolean; sizes?: string; className?: string }) {
  const { ui } = getContent(locale);
  const photo = visible(site.photo);
  return (
    <PhotoFrame
      photo={photo}
      alt={photo?.alt[locale] || fill(ui.home.portraitAlt)}
      placeholderTitle={ui.pending.photoTitle}
      placeholderLabel={placeholder === "hero" ? ui.pending.photoHero : ui.pending.photoAbout}
      aspect={aspect}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
