import type { ReactNode } from "react";

/** Max 1200px, side gutters 20 (mobile) → 32 (tablet) → 48px (desktop). */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-page px-gutter ${className}`}>{children}</div>;
}

const backgrounds = { white: "bg-white", gray: "bg-gray-50" } as const;

/** Page section: white or light gray (never red), padding 64px mobile → 112px desktop. */
export function Section({ children, bg = "white", labelledBy, className = "" }: { children: ReactNode; bg?: keyof typeof backgrounds; labelledBy?: string; className?: string }) {
  return (
    <section aria-labelledby={labelledBy} className={`${backgrounds[bg]} py-section ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Eyebrow with the 4px red accent rule, then the title. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-small font-bold tracking-[0.08em] text-red-600 uppercase">
      {children}
      <span aria-hidden="true" className="mt-2 block h-1 w-10 rounded-full bg-red-600" />
    </p>
  );
}

export function SectionHeading({ id, eyebrow, title, lead }: { id: string; eyebrow?: string; title: string; lead?: string }) {
  return (
    <div className="mb-12 max-w-measure">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`text-h2 font-bold ${eyebrow ? "mt-4" : ""}`}>
        {title}
      </h2>
      {lead && <p className="mt-4 text-lead text-gray-600">{lead}</p>}
    </div>
  );
}
