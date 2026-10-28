import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-page px-5 sm:px-8 ${className}`}>{children}</div>;
}

const tones = { white: "bg-surface", gray: "bg-canvas", brand: "bg-brand text-white" } as const;

export function Section({
  children,
  tone = "white",
  className = "",
  labelledBy,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section aria-labelledby={labelledBy} className={`${tones[tone]} py-14 sm:py-section ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({ id, title, lead, align = "left" }: { id: string; title: string; lead?: string; align?: "left" | "center" }) {
  return (
    <div className={`mb-10 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <h2 id={id} className="text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-xl text-muted">{lead}</p>}
    </div>
  );
}
