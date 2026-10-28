"use client";

// Rendered inside the [lang] layout; not-found receives no props, so the language is read from the URL.
import Link from "next/link";
import { useParams } from "next/navigation";
import { ui as en } from "@/content/en/ui";
import { ui as es } from "@/content/es/ui";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  const params = useParams<{ lang?: string }>();
  const locale = params?.lang === "es" ? "es" : "en";
  const ui = locale === "es" ? es : en;
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
      <title>{ui.meta.notFoundTitle}</title>
      <h1 className="text-4xl font-bold">{ui.notFound.title}</h1>
      <p className="mt-5 text-xl text-muted">{ui.notFound.text}</p>
      <Link href={`/${locale}`} className={buttonClass("primary", "mt-8")}>
        {ui.notFound.home}
      </Link>
    </div>
  );
}
