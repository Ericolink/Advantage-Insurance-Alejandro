"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  href: string;
  label: string;
}

export const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

/** Desktop navigation (≥1280px: the Spanish labels need that width on one row). Active page: navy bold + 3px red underline + aria-current — shape, not color only. */
export function MainNav({ items, label }: { items: NavItem[]; label: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label={label} className="hidden self-stretch text-small xl:flex">
      <ul className="flex items-stretch">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href} className="flex">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center border-b-[3px] px-2.5 pt-[3px] whitespace-nowrap transition-colors duration-150 ${
                  active ? "border-red-600 font-bold text-navy-900" : "border-transparent font-semibold text-gray-700 hover:border-gray-200 hover:text-navy-900"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
