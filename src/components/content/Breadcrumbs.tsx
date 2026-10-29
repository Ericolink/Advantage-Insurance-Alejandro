import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export interface Crumb {
  name: string;
  path: string;
}

/** Breadcrumb trail for inner pages (plus BreadcrumbList structured data once a domain exists). */
export function Breadcrumbs({ label, items }: { label: string; items: Crumb[] }) {
  return (
    <nav aria-label={label} className="text-small">
      <BreadcrumbJsonLd items={items} />
      <ol className="flex flex-wrap items-center gap-x-2 text-gray-600">
        {items.map((crumb, index) => {
          const last = index === items.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-semibold text-gray-700">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={crumb.path} className="inline-flex min-h-tap items-center underline underline-offset-4 hover:text-red-700">
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
  );
}
