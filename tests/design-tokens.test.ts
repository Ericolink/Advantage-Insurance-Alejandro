// Guards the "Steady Guidance" identity: globals.css clears Tailwind's default palette and type scale,
// so an off-brand class (text-blue-500, text-sm…) would silently produce no CSS. These checks catch it.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const root = join(import.meta.dirname, "..", "src");
const sources = readdirSync(root, { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => ({ file, text: readFileSync(join(root, file), "utf8") }));
const css = readFileSync(join(root, "app", "globals.css"), "utf8");

const palette = new Set([...css.matchAll(/--color-([a-z]+-\d{2,3}):/g)].map((match) => match[1]));
const textSizes = new Set([...css.matchAll(/--text-([a-z0-9]+):/g)].map((match) => match[1]));

describe("design tokens", () => {
  it("defines the handoff palette exactly", () => {
    assert.deepEqual([...palette].sort(), ["gray-200", "gray-50", "gray-500", "gray-600", "gray-700", "green-50", "green-700", "navy-50", "navy-900", "red-600", "red-700"].sort());
  });

  it("uses only palette colors in components", () => {
    const colorClass = /\b(?:bg|text|border|ring|fill|stroke|decoration|outline|accent|divide|from|to)-([a-z]+-\d{2,3})\b/g;
    for (const { file, text } of sources) {
      for (const [, color] of text.matchAll(colorClass)) assert.ok(palette.has(color), `${file}: ${color} is not a design token`);
    }
  });

  it("uses only the design type scale (16px minimum)", () => {
    const sizeClass = /\btext-(xs|sm|base|lg|[2-9]?xl)\b/g;
    for (const { file, text } of sources) {
      const found = [...text.matchAll(sizeClass)].map((match) => match[0]);
      assert.deepEqual(found, [], `${file} uses sizes outside the scale (${[...textSizes].join(", ")})`);
    }
  });

  it("has no leftovers from the previous identity", () => {
    const legacy = /\b(?:bg|text|border|ring|decoration)-(?:brand|accent|ink|muted|line|canvas|surface|danger|success|pending)(?:-[a-z]+)?\b|rounded-(?:card|control)\b/g;
    for (const { file, text } of sources) assert.deepEqual([...text.matchAll(legacy)].map((match) => match[0]), [], file);
  });
});
