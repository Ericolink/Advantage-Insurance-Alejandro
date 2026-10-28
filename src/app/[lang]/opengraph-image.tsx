// Social-sharing image (Open Graph), generated at build time from the provisional typographic identity.
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
  const name = brandName(site);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#12325b", color: "#ffffff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ width: 96, height: 96, borderRadius: 20, background: "#ffffff", color: "#12325b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 700 }}>
            AA
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 56, fontWeight: 700 }}>{name}</div>
            <div style={{ fontSize: 32, color: "#cfe9e6" }}>{ui.home.eyebrow}</div>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 52, fontWeight: 700, lineHeight: 1.2, maxWidth: 980 }}>{ui.home.title}</div>
        <div style={{ display: "flex", height: 10, width: 220, background: "#138a80", borderRadius: 5 }} />
      </div>
    ),
    size,
  );
}
