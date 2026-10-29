import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { alternatePaths, legacyPaths, locales, pageIds, pageSlugs, resolveSegments, translatePath, type Route } from "../src/config/routes.ts";
import { site } from "../src/config/site.ts";

const allRoutes: Route[] = [
  { kind: "home" },
  ...pageIds.map((id) => ({ kind: "page", id }) as Route),
  ...site.services.map((service) => ({ kind: "service", id: service.id }) as Route),
];

describe("routes", () => {
  it("has unique slugs per language", () => {
    for (const locale of locales) {
      const pages = pageIds.map((id) => pageSlugs[id][locale]);
      assert.equal(new Set(pages).size, pages.length, `duplicate page slug in ${locale}`);
      const services = site.services.map((service) => service.slug[locale]);
      assert.equal(new Set(services).size, services.length, `duplicate service slug in ${locale}`);
    }
  });

  it("uses URL-safe slugs", () => {
    for (const locale of locales) {
      for (const id of pageIds) assert.match(pageSlugs[id][locale], /^[a-z0-9-]+$/);
      for (const service of site.services) assert.match(service.slug[locale], /^[a-z0-9-]+$/);
    }
  });

  it("language switch lands on the equivalent page, both ways", () => {
    for (const route of allRoutes) {
      const paths = alternatePaths(route, site);
      assert.equal(translatePath(paths.en, "es", site), paths.es);
      assert.equal(translatePath(paths.es, "en", site), paths.en);
    }
  });

  it("resolves every generated path back to its route", () => {
    for (const route of allRoutes) {
      for (const locale of locales) {
        const segments = alternatePaths(route, site)[locale].split("/").filter(Boolean).slice(1);
        assert.deepEqual(resolveSegments(segments, locale, site), route);
      }
    }
  });

  it("matches the route map of the design handoff", () => {
    const expected = {
      about: ["/en/about", "/es/sobre-alejandro"],
      services: ["/en/services", "/es/servicios"],
      newToMedicare: ["/en/new-to-medicare", "/es/nuevo-en-medicare"],
      faq: ["/en/faq", "/es/preguntas"],
      contact: ["/en/contact", "/es/contacto"],
      privacy: ["/en/privacy", "/es/privacidad"],
      terms: ["/en/terms", "/es/terminos"],
      disclosures: ["/en/disclosures", "/es/avisos"],
    };
    for (const [id, [en, es]] of Object.entries(expected)) {
      assert.deepEqual(alternatePaths({ kind: "page", id } as Route, site), { en, es }, id);
    }
  });

  it("redirects every legacy URL to a page that exists", () => {
    for (const { from, to } of legacyPaths) {
      const [locale, ...rest] = to.split("/").filter(Boolean);
      assert.notEqual(resolveSegments(rest, locale as "en" | "es", site), null, `${from} → ${to}`);
    }
  });

  it("rejects unknown URLs and falls back to the home page when switching", () => {
    assert.equal(resolveSegments(["nope"], "en", site), null);
    assert.equal(resolveSegments(["services", "unknown"], "en", site), null);
    assert.equal(resolveSegments(["servicios", "medicaid"], "en", site), null, "Spanish slug under the English locale");
    assert.equal(translatePath("/en/nope", "es", site), "/es");
    assert.equal(translatePath("/", "es", site), "/es");
  });
});
