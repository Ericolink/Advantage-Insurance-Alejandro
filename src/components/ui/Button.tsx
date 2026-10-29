// Button styles from design sheet 02. Use on a real <a> or <button>, never on a <div>.
// Sizes: lg 56px (default, all CTAs) · md 48px (inline, header). One red button per screen area;
// the call button is always the secondary one next to it.
const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 text-center text-body leading-6 font-bold no-underline transition-colors duration-150 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-red-600 text-white hover:bg-red-700 active:bg-red-700 disabled:bg-gray-200 disabled:text-gray-600",
  secondary:
    "border-2 border-navy-900 bg-white text-navy-900 hover:bg-navy-50 active:bg-navy-50 disabled:border-gray-200 disabled:bg-white disabled:text-gray-600",
  /** Light button on navy surfaces (focus ring turns white there, see globals.css). */
  onNavy: "bg-white text-navy-900 hover:bg-navy-50 active:bg-navy-50",
} as const;

const sizes = { lg: "min-h-btn py-3", md: "min-h-tap py-2 px-5" } as const;

export type ButtonVariant = keyof typeof variants;

export const buttonClass = (variant: ButtonVariant = "primary", extra = "", size: keyof typeof sizes = "lg") =>
  `${base} ${sizes[size]} ${variants[variant]} ${extra}`.trim();

/** Text link: always underlined, red on hover. */
export const linkClass = "font-semibold text-navy-900 underline decoration-1 underline-offset-4 transition-colors duration-150 hover:text-red-700 hover:decoration-2";
