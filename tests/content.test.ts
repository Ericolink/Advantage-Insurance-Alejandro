// Content checks: both languages have the same structure, and no invented commercial claims slip in.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { site } from "../src/config/site.ts";
import { about as enAbout } from "../src/content/en/about.ts";
import { faq as enFaq } from "../src/content/en/faq.ts";
import { guide as enGuide } from "../src/content/en/guide.ts";
import { legal as enLegal } from "../src/content/en/legal.ts";
import { services as enServices } from "../src/content/en/services.ts";
import { ui as enUi } from "../src/content/en/ui.ts";
import { about as esAbout } from "../src/content/es/about.ts";
import { faq as esFaq } from "../src/content/es/faq.ts";
import { guide as esGuide } from "../src/content/es/guide.ts";
import { legal as esLegal } from "../src/content/es/legal.ts";
import { services as esServices } from "../src/content/es/services.ts";
import { ui as esUi } from "../src/content/es/ui.ts";

const en = { ui: enUi, services: enServices, guide: enGuide, faq: enFaq, about: enAbout, legal: enLegal };
const es = { ui: esUi, services: esServices, guide: esGuide, faq: esFaq, about: esAbout, legal: esLegal };

/** Every key path (arrays included by index) so missing or extra items show up. */
function shape(value: unknown, path = ""): string[] {
  if (Array.isArray(value)) return [`${path}[${value.length}]`, ...value.flatMap((item, index) => shape(item, `${path}[${index}]`))];
  if (value && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => shape(item, path ? `${path}.${key}` : key));
  return [path];
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe("content", () => {
  it("English and Spanish have exactly the same structure", () => {
    assert.deepEqual(shape(es), shape(en));
  });

  it("has text for every configured service in both languages", () => {
    for (const service of site.services) {
      assert.ok(en.services[service.id]?.title, `en: ${service.id}`);
      assert.ok(es.services[service.id]?.title, `es: ${service.id}`);
    }
  });

  it("has no empty strings (except intentionally empty table headers)", () => {
    for (const lang of [en, es]) {
      const empty = shape(lang).filter((path) => {
        const value = path.split(/\.|\[(\d+)\]/).filter(Boolean).reduce<unknown>((node, key) => (node as Record<string, unknown>)?.[key], lang);
        return value === "";
      });
      assert.deepEqual(empty, ["guide.compare.columns[0]"]);
    }
  });

  it("contains no prices, invented track records or aggressive claims", () => {
    const forbidden = [/\$\s?\d/, /\b(years|años)\s+(of|de)\s+(experience|experiencia)/i, /(?<!\bnot\s)\bguarantee/i, /(?<!\bno\s(?:se\s)?)\bgarantiza/i, /\b(best|lowest|cheapest)\s+(price|plan|rate)/i, /\b(mejor|más barato)\s+(precio|plan)/i, /lorem ipsum/i, /\bTODO\b/];
    // Visitors' questions ("Can an agent tell me which plan is best?") are not claims; everything else is checked.
    for (const text of [...strings(en), ...strings(es)].filter((value) => !value.trim().endsWith("?"))) {
      for (const pattern of forbidden) assert.doesNotMatch(text, pattern, `"${text}"`);
    }
  });

  it("keeps the biography empty until Alejandro provides it", () => {
    if (site.approvals.biography !== "confirmed") {
      assert.deepEqual(en.about.biography, []);
      assert.deepEqual(es.about.biography, []);
    }
  });

  it("links only to https URLs", () => {
    for (const text of [...strings(en), ...strings(es)].filter((value) => value.startsWith("http"))) assert.match(text, /^https:\/\//);
  });
});
