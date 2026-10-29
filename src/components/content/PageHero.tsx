import type { ReactNode } from "react";
import type { Locale } from "@/config/types";
import { getContent } from "@/lib/i18n";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** Inner-page hero: breadcrumbs, optional eyebrow, the page's single H1, lead and optional actions/markers. */
export function PageHero({ locale, eyebrow, title, lead, crumbs, children }: { locale: Locale; eyebrow?: string; title: string; lead?: string; crumbs: Crumb[]; children?: ReactNode }) {
  const { ui } = getContent(locale);
  return (
    <div className="border-b border-gray-200 bg-gray-50">
      <Container className="pt-4 pb-12 sm:pb-16">
        <Breadcrumbs label={ui.common.breadcrumb} items={[{ name: ui.common.home, path: `/${locale}` }, ...crumbs]} />
        <div className="mt-6 max-w-measure">
          {eyebrow && (
            <div className="mb-4">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <h1 className="text-h1 font-extrabold">{title}</h1>
          {lead && <p className="mt-5 text-lead text-gray-600">{lead}</p>}
          {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
