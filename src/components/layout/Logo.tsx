// PROVISIONAL typographic logo. When the client approves a logo, replace the contents of this
// component (e.g. with next/image pointing to /public/images/logo.svg). Nothing else needs to change.
export function Logo({ name, tagline, inverted = false }: { name: string; tagline: string; inverted?: boolean }) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`grid size-11 shrink-0 place-items-center rounded-control font-display text-lg font-bold tracking-wide ${inverted ? "bg-white text-brand" : "bg-brand text-white"}`}
      >
        {initials}
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`font-display text-xl font-bold ${inverted ? "text-white" : "text-brand"}`}>{name}</span>
        <span className={`text-sm ${inverted ? "text-white/80" : "text-muted"}`}>{tagline}</span>
      </span>
    </span>
  );
}
