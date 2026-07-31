import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * The AAA claim in the README is only worth making if something enforces it.
 * This parses tokens.css and checks every pair a user actually sees, in both
 * modes. Change a colour, run this — it is the whole point of the palette.
 */

type Oklch = [L: number, C: number, h: number];

const css = readFileSync(
  fileURLToPath(new URL("./tokens.css", import.meta.url)),
  "utf8",
);

/** Pull `--dovela-color-*: oklch(...)` declarations out of one CSS block. */
function parseBlock(selector: string): Record<string, Oklch> {
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`block not found: ${selector}`);
  const open = css.indexOf("{", start);
  const body = css.slice(open + 1, css.indexOf("}", open));

  const out: Record<string, Oklch> = {};
  for (const [, name, l, c, h] of body.matchAll(
    /--dovela-color-([\w-]+):\s*oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/g,
  )) {
    out[name!] = [Number(l), Number(c), Number(h)];
  }
  return out;
}

/** oklch -> oklab -> linear sRGB. Linear is what luminance wants. */
function toLinearRgb([L, C, hDeg]: Oklch): [number, number, number] {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function contrast(a: Oklch, b: Oklch): number {
  const luminance = (c: Oklch) => {
    const [r, g, bl] = toLinearRgb(c);
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    return 0.2126 * clamp(r) + 0.7152 * clamp(g) + 0.0722 * clamp(bl);
  };
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (hi + 0.05) / (lo + 0.05);
}

const AAA_TEXT = 7;
const AA_UI = 3;

/** [foreground, background, minimum ratio] */
const PAIRS: Array<[string, string, number]> = [
  // Text — WCAG 1.4.6 (AAA)
  ["fg", "bg", AAA_TEXT],
  ["fg", "surface", AAA_TEXT],
  ["fg-muted", "bg", AAA_TEXT],
  ["fg-muted", "surface", AAA_TEXT],
  ["accent", "bg", AAA_TEXT],
  ["accent", "surface", AAA_TEXT],
  ["accent-fg", "accent", AAA_TEXT],
  ["accent-fg", "accent-hover", AAA_TEXT],
  ["danger", "bg", AAA_TEXT],
  ["danger", "surface", AAA_TEXT],
  ["danger-fg", "danger", AAA_TEXT],
  ["danger-fg", "danger-hover", AAA_TEXT],
  // Non-text UI — WCAG 1.4.11 (AA)
  ["border-strong", "bg", AA_UI],
  ["border-strong", "surface", AA_UI],
  ["ring", "bg", AA_UI],
  ["ring", "surface", AA_UI],
  ["disabled-fg", "bg", AA_UI],
  ["disabled-fg", "disabled-bg", AA_UI],
];

describe.each([
  ["light", ":root"],
  ["dark", ".dark,"],
])("%s mode contrast", (_mode, selector) => {
  const tokens = parseBlock(selector);
  // Dark only overrides colours; anything it omits inherits from :root.
  const base = selector === ":root" ? {} : parseBlock(":root");
  const resolve = (name: string) => tokens[name] ?? base[name];

  it("parses every colour token it is about to check", () => {
    for (const [fg, bg] of PAIRS) {
      expect(resolve(fg), `missing token --dovela-color-${fg}`).toBeDefined();
      expect(resolve(bg), `missing token --dovela-color-${bg}`).toBeDefined();
    }
  });

  it.each(PAIRS)("%s on %s clears %d:1", (fg, bg, min) => {
    const ratio = contrast(resolve(fg)!, resolve(bg)!);
    expect(
      Number(ratio.toFixed(2)),
      `${fg} on ${bg} is ${ratio.toFixed(2)}:1, needs ${min}:1`,
    ).toBeGreaterThanOrEqual(min);
  });
});
