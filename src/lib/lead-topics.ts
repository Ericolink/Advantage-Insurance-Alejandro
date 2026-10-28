import { site } from "@/config/site";
import type { Locale, ServiceId } from "@/config/types";
import { visibleServices } from "@/config/visibility";
import { getContent } from "@/lib/i18n";
import { extraTopics } from "@/lib/lead-validation";

/** Topics the form offers: the services shown on the site plus "general question" and "not sure". */
export const leadTopics = (): string[] => [...visibleServices(site).map((service) => service.id), ...extraTopics];

export function topicLabel(topic: string, locale: Locale): string {
  const { ui, services } = getContent(locale);
  if (topic === "general") return ui.form.topicGeneral;
  if (topic === "notSure") return ui.form.topicNotSure;
  return services[topic as ServiceId]?.title ?? topic;
}
