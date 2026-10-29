"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { isActive, type NavItem } from "./MainNav";

/**
 * Compact menu (<1280px): a real button with aria-expanded. The panel opens BELOW the header
 * and pushes the content down (not a full-screen overlay). Escape closes it and returns focus to the
 * button; it also closes on navigation. Must sit last inside the header's flex-wrap row.
 */
export function MobileMenu({ items, label, openLabel, closeLabel, children }: { items: NavItem[]; label: string; openLabel: string; closeLabel: string; children?: ReactNode }) {
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
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-tap min-w-tap flex-col items-center justify-center rounded-md bg-navy-900 px-3 py-1 text-small leading-5 font-bold text-white transition-colors duration-150 hover:bg-gray-700 xl:hidden"
      >
        <Icon name={open ? "x" : "menu"} className="size-5" />
        {open ? closeLabel : openLabel}
      </button>
      <div id="mobile-menu" hidden={!open} className="basis-full border-t border-gray-200 pb-6 xl:hidden">
        <nav aria-label={label}>
          <ul>
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-14 items-center border-b border-gray-200 ${active ? "font-bold text-navy-900" : "font-semibold text-gray-700"}`}
                  >
                    <span className={active ? "border-b-[3px] border-red-600" : ""}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {children && <div className="mt-6 flex flex-col gap-3">{children}</div>}
      </div>
    </>
  );
}
