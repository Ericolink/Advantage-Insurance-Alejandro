import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/config/types";
import { getContent } from "@/lib/i18n";
import { Container } from "@/components/ui/Layout";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export interface Crumb {
  name: string;
  path: string;
}

/** Inner-page header: breadcrumb, H1 and lead paragraph. */
export function PageHeader({ locale, title, lead, crumbs, children }: { locale: Locale; title: string; lead?: string; crumbs: Crumb[]; children?: ReactNode }) {
  const { ui } = getContent(locale);
  const trail = [{ name: ui.common.home, path: `/${locale}` }, ...crumbs];
  return (
    <div className="border-b border-line bg-canvas">
      <BreadcrumbJsonLd items={trail} />
      <Container className="py-10 sm:py-14">
        <nav aria-label={ui.common.breadcrumb} className="mb-5 text-base">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
            {trail.map((crumb, index) => {
              const last = index === trail.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-2">
                  {last ? (
                    <span aria-current="page" className="font-semibold text-ink">
                      {crumb.name}
                    </span>
                  ) : (
                    <>
                      <Link href={crumb.path} className="underline underline-offset-4 hover:text-brand">
                        {crumb.name}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="max-w-4xl text-4xl font-bold sm:text-5xl">{title}</h1>
        {lead && <p className="mt-5 max-w-3xl text-xl text-muted">{lead}</p>}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </div>
  );
}
