// Structured data. Only CONFIRMED facts are included, and nothing is emitted without a production domain.
import { site } from "@/config/site";
import { confirmed } from "@/config/visibility";
import type { Locale } from "@/config/types";
import { localeTags } from "@/lib/i18n";

function JsonLd({ data }: { data: object }) {
  // "<" is escaped so the JSON can never close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  if (!site.url) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${site.url}${item.path}` })),
      }}
    />
  );
}

/** Person schema for the home and About pages, built from confirmed data only. */
export function AgentJsonLd({ locale }: { locale: Locale }) {
  const name = confirmed(site.agentName);
  if (!site.url || !name) return null;
  const area = confirmed(site.serviceArea);
  const languages = confirmed(site.languages);
  const photo = confirmed(site.photo);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url: `${site.url}/${locale}`,
    jobTitle: locale === "es" ? "Agente de seguros médicos" : "Health insurance agent",
  };
  const phone = confirmed(site.phone);
  const email = confirmed(site.email);
  if (phone) data.telephone = phone;
  if (email) data.email = email;
  if (area) data.areaServed = area[locale];
  if (languages) data.knowsLanguage = languages.map((code) => localeTags[code]);
  if (photo) data.image = `${site.url}${photo.src}`;
  const social = confirmed(site.social);
  if (social?.length) data.sameAs = social.map((item) => item.url);
  return <JsonLd data={data} />;
}
