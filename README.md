# dovela

> Accessible React components built on React Aria Components, Tailwind CSS v4
> and tailwind-variants. Install the package — or copy the source.

[![CI](https://img.shields.io/github/actions/workflow/status/danimc/dovela/ci.yml?branch=main)](https://github.com/danimc/dovela/actions)
[![npm](https://img.shields.io/npm/v/@dovela/react)](https://www.npmjs.com/package/@dovela/react)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@dovela/react)](https://bundlephobia.com/package/@dovela/react)
[![license](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

<!-- screenshot: drop a components grid here (light + dark side by side) -->

## Why

- **Accessibility is not a checklist item.** Focus management, keyboard
  interaction and ARIA come from React Aria Components, not from hand-rolled
  event handlers.
- **Tokens, not hardcoded values.** Every color, radius, shadow and font is a
  CSS custom property you can override at any scope.
- **Two ways to consume it.** `pnpm add @dovela/react` for the whole system, or
  lift a single component's source into your own codebase.

## Install

```bash
pnpm add @dovela/react @dovela/core
```

Peer dependencies: `react >= 18`, `react-dom >= 18`. Tailwind CSS v4 is required
in the consuming app.

Then, in your CSS entry:

```css
@import "tailwindcss";
@import "@dovela/core/tokens.css";

/* Let Tailwind see the classes inside the published components. */
@source "../node_modules/@dovela/react/dist";
```

## Quick start

```tsx
import { Button, Card, Input } from "@dovela/react";

export function SignUp() {
  return (
    <Card className="w-80">
      <Card.Header>
        <h2 className="font-medium">Create an account</h2>
      </Card.Header>
      <Card.Body>
        <Input label="Email" placeholder="you@example.com" />
      </Card.Body>
      <Card.Footer>
        <Button onPress={() => console.log("submit")}>Sign up</Button>
      </Card.Footer>
    </Card>
  );
}
```

## Server Components

The package is client-side (`"use client"` — React Aria needs hooks) and drops
straight into a Next.js App Router app. One caveat: **dot notation does not
cross the RSC boundary**. Inside a Server Component, React sees a *reference* to
each export, and a reference has no properties — so `Card.Header` is `undefined`.
Use the flat exports there:

```tsx
// Server Component
import { Card, CardHeader, CardBody } from "@dovela/react";
```

Both forms work inside a Client Component.

## Dark mode

Tokens ship in two sets: light on `:root`, dark on `.dark` / `[data-theme="dark"]`.
Toggle the class on `<html>`. To follow the system preference without a flash of
light on load, run this before paint:

```html
<script>
  var t =
    localStorage.getItem("dovela-theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.classList.toggle("dark", t === "dark");
</script>
```

## Theming

Override any token wherever you need it — globally or scoped to a subtree:

```css
:root {
  --dovela-color-accent: oklch(0.62 0.19 145);
  --dovela-radius-md: 0.125rem;
}
```

The full list lives in
[`packages/core/src/tokens.css`](./packages/core/src/tokens.css).

## Components

| Component | Status |
| --------- | ------ |
| `Button`  | ✅     |
| `Input`   | ✅     |
| `Card`    | ✅     |

More to come. Recipes (copy-pasteable source, `npx dovela add button`) are
planned once the package flow is settled.

## Repo layout

```
packages/
  core/        design tokens (CSS variables) + shared utilities
  react/       the components
apps/
  docs/        documentation site (Next.js + MDX)
  playground/  local development sandbox (Vite)
```

## Development

```bash
pnpm install
pnpm dev          # tsup --watch + docs on :3000 + playground on :3001
pnpm test         # vitest, including axe accessibility checks
pnpm typecheck
pnpm build
```

### Adding a component

1. `packages/react/src/components/<name>/` with `index.tsx`, `styles.ts`,
   `types.ts` and `<name>.test.tsx` — always those four files.
2. Re-export it from `packages/react/src/index.ts`.
3. Add a page at `apps/docs/app/components/<name>/page.mdx`.
4. `pnpm changeset` to describe the change for the release notes.

### Releasing

Changesets drives versioning. Every user-facing change carries a changeset; on
merge to `main` the release workflow opens a "Version Packages" PR, and merging
that PR publishes to npm.

## License

MIT
