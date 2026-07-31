import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  // No `treeshake` — it routes the output through rollup, which drops the
  // banner below. esbuild already tree-shakes, and `sideEffects: false` lets
  // consumers drop what they don't import.
  external: ["react", "react-dom"],
  // Every component is interactive (React Aria hooks) — mark the whole bundle
  // as client so it drops straight into a React Server Components app.
  banner: { js: '"use client";' },
});
