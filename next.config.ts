import type { NextConfig } from "next";
import { getPendingItems } from "./src/config/readiness.ts";
import { site } from "./src/config/site.ts";

// With REQUIRE_LAUNCH_READY=1 the build refuses to run while blocking launch items remain.
const isBuild = process.argv.includes("build");
if (isBuild && process.env.REQUIRE_LAUNCH_READY === "1") {
  if (process.env.NEXT_PUBLIC_SHOW_PENDING === "1") {
    throw new Error("Launch build: remove NEXT_PUBLIC_SHOW_PENDING (review mode) before publishing.");
  }
  const blocking = getPendingItems(site).filter((item) => item.blocking);
  if (blocking.length > 0) {
    throw new Error(`Launch check failed. Resolve before publishing:\n${blocking.map((item) => `  - ${item.message}`).join("\n")}`);
  }
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
