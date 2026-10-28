// Shared button styles. Large targets (min 3rem high) for easy tapping.
const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-control px-6 py-3 text-center text-lg font-bold leading-tight no-underline transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-brand text-white hover:bg-brand-strong",
  accent: "bg-accent-strong text-white hover:bg-brand",
  outline: "border-2 border-brand bg-surface text-brand hover:bg-brand-soft",
  light: "bg-white text-brand hover:bg-brand-soft",
  ghostLight: "border-2 border-white/70 text-white hover:bg-white/10",
} as const;

export type ButtonVariant = keyof typeof variants;

export const buttonClass = (variant: ButtonVariant = "primary", extra = "") => `${base} ${variants[variant]} ${extra}`.trim();
