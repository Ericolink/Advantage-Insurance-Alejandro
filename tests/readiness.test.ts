// The launch check guards what may be published. These tests pin its rules; they use copies of the config, never site.ts itself.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getPendingItems, isLaunchReady, isValidSiteUrl } from "../src/config/readiness.ts";
import { site } from "../src/config/site.ts";
import type { SiteConfig } from "../src/config/types.ts";
import { visible, visibleServices } from "../src/config/visibility.ts";

const ok = <T,>(value: T) => ({ value, status: "confirmed" as const });
const env = { RESEND_API_KEY: "re_test", LEAD_EMAIL_TO: "agent@agency-domain.com", LEAD_EMAIL_FROM: "Web <web@agency-domain.com>" };

/** A config with every blocking item resolved, offering only Medicaid (no TPMO / ACA requirements). */
const ready: SiteConfig = {
  ...site,
  url: "https://www.agency-domain.com",
  phone: ok("+13055550123"),
  email: ok("agent@agency-domain.com"),
  serviceArea: ok({ en: "Florida", es: "Florida" }),
  languages: ok(["en", "es"]),
  licenses: ok([{ state: "FL", number: "X000000", verifyUrl: null }]),
  npn: ok("00000000"),
  services: site.services.map((service) => ({ ...service, status: service.id === "medicaid" ? "confirmed" : "not-offered" })),
  approvals: Object.fromEntries(Object.keys(site.approvals).map((key) => [key, "confirmed"])) as SiteConfig["approvals"],
};

const blocking = (config: SiteConfig, environment: Record<string, string> = env) =>
  getPendingItems(config, environment).filter((item) => item.blocking).map((item) => item.key);

describe("launch check", () => {
  it("blocks an incomplete configuration", () => {
    const missing = { value: null, status: "pending" as const };
    const incomplete: SiteConfig = {
      ...site,
      url: null,
      phone: missing,
      email: missing,
      licenses: missing,
      npn: missing,
      services: site.services.map((service) => ({ ...service, status: "pending" })),
      approvals: { ...site.approvals, privacyPolicy: "pending" },
    };
    assert.equal(isLaunchReady(incomplete, {}), false);
    for (const key of ["url", "phone", "email", "licenses", "npn", "privacyPolicy", "leadDestination", "services-none"]) {
      assert.ok(blocking(incomplete, {}).includes(key), `expected ${key} to block`);
    }
  });

  it("passes when everything blocking is resolved", () => {
    assert.deepEqual(blocking(ready), []);
  });

  it("requires a lead destination", () => {
    assert.ok(blocking(ready, {}).includes("leadDestination"));
    assert.deepEqual(blocking(ready, { LEAD_WEBHOOK_URL: "https://hooks.example.org/x" }), []);
  });

  it("requires the exact TPMO text when Medicare Advantage or Part D are offered", () => {
    const withMa: SiteConfig = { ...ready, services: ready.services.map((s) => (s.id === "medicare-advantage" ? { ...s, status: "confirmed" } : s)) };
    assert.ok(blocking(withMa).includes("tpmo"));
    assert.deepEqual(blocking({ ...withMa, tpmoDisclaimer: ok({ en: "Exact text", es: "Texto exacto" }) }), []);
  });

  it("requires an approved ACA consent process when the Marketplace is offered", () => {
    const withAca: SiteConfig = {
      ...ready,
      services: ready.services.map((s) => (s.id === "aca-marketplace" ? { ...s, status: "confirmed" } : s)),
      approvals: { ...ready.approvals, acaConsentProcess: "pending" },
    };
    assert.ok(blocking(withAca).includes("acaConsent"));
  });

  it("validates phone and URL formats", () => {
    assert.ok(blocking({ ...ready, phone: ok("305-555-0123") }).includes("phone-format"));
    for (const url of ["http://agency-domain.com", "https://agency.netlify.app", "https://www.example.com", "https://agency-domain.com/", "https://agency-domain.com/es"]) {
      assert.equal(isValidSiteUrl(url), false, url);
    }
    assert.equal(isValidSiteUrl("https://www.agency-domain.com"), true);
  });
});

describe("visibility", () => {
  it("hides pending data outside review mode", () => {
    assert.equal(visible({ value: "+13055550123", status: "pending" }, false), null);
    assert.equal(visible({ value: "+13055550123", status: "pending" }, true), "+13055550123");
    assert.equal(visible({ value: "+13055550123", status: "confirmed" }, false), "+13055550123");
  });

  it("never shows services that are not offered, and shows pending ones only in review mode", () => {
    const config: SiteConfig = { ...site, services: site.services.map((s, i) => ({ ...s, status: i === 0 ? "not-offered" : "pending" })) };
    assert.equal(visibleServices(config, false).length, 0);
    assert.equal(visibleServices(config, true).length, site.services.length - 1);
  });
});
