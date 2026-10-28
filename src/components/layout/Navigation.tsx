"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export interface NavItem {
  href: string;
  label: string;
}

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

export function DesktopNav({ items, label }: { items: NavItem[]; label: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-control px-2.5 py-2 text-base font-semibold whitespace-nowrap xl:text-lg hover:bg-brand-soft hover:text-brand ${active ? "text-brand underline decoration-accent decoration-[3px] underline-offset-8" : "text-ink"}`}
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

/** Mobile menu: a real button with aria-expanded; closes with Escape, on navigation and when tapping a link. */
export function MobileNav({ items, label, openLabel, closeLabel }: { items: NavItem[]; label: string; openLabel: string; closeLabel: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close when the route changes (state adjusted during render, as React recommends).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-12 items-center gap-2 rounded-control border-2 border-brand px-4 text-base font-bold text-brand hover:bg-brand-soft"
      >
        <Icon name={open ? "x" : "menu"} className="size-5" />
        {open ? closeLabel : openLabel}
      </button>
      <nav id="mobile-menu" aria-label={label} hidden={!open} className="absolute inset-x-0 top-full border-b-2 border-line bg-surface shadow-lg">
        <ul className="mx-auto max-w-page px-5 py-4 sm:px-8">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-14 items-center justify-between border-b border-line text-xl font-semibold ${active ? "text-brand" : "text-ink"}`}
                >
                  {item.label}
                  <Icon name="arrow-right" className="size-5 text-accent" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
