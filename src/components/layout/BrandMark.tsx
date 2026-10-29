// PROVISIONAL mark + wordmark (design sheet 01) until a final logo is commissioned.
// The "A" reads as a path upward — guidance, not a medical symbol. To use the final logo, replace the
// contents of this component (e.g. next/image with /public/images/logo.svg) and src/app/icon.svg.

export function Mark({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={`shrink-0 ${className}`}>
      <rect width="40" height="40" rx="9" fill="#B42332" />
      <path d="M12 29 20 11l8 18" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.6 23.2h8.8" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

/** Lockup: mark + name + tagline. `variant="dark"` is the reversed lockup used on navy (footer). */
export function BrandMark({ name, tagline, variant = "light" }: { name: string; tagline: string; variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  return (
    <span className="flex items-center gap-3">
      <Mark className="size-10 sm:size-11" />
      <span className="flex flex-col leading-tight">
        <span className={`text-body font-extrabold max-sm:w-min sm:text-[1.25rem] ${dark ? "text-white" : "text-navy-900"}`}>{name}</span>
        {/* In the header the tagline steps aside at 1280–1535px so the full nav fits on one row (Spanish labels are long). */}
        <span className={`hidden text-small font-semibold sm:block ${dark ? "text-white/85" : "text-gray-600 xl:hidden 2xl:block"}`}>{tagline}</span>
      </span>
    </span>
  );
}
