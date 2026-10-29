// Social-sharing image (Open Graph, 1200×630), generated at build time from the provisional identity.
// Replace with the final shared image (design handoff §8) once the logo and photo exist.
import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { brandName } from "@/config/visibility";
import { getContent, hasLocale, locales } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Alejandro Alcazar";

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { ui } = getContent(hasLocale(lang) ? lang : "en");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#18324B", color: "#FFFFFF" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="96" height="96" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="9" fill="#B42332" />
            <path d="M12 29 20 11l8 18" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.6 23.2h8.8" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 56, fontWeight: 700 }}>{brandName(site)}</div>
            <div style={{ fontSize: 30, color: "#EEF2F6" }}>{ui.brand.tagline}</div>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 54, fontWeight: 700, lineHeight: 1.2, maxWidth: 980 }}>{ui.home.title}</div>
        <div style={{ display: "flex", height: 8, width: 160, background: "#B42332", borderRadius: 4 }} />
      </div>
    ),
    size,
  );
}
