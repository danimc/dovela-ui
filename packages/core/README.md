# @dovela-ui/core

Design tokens for [Dovela UI](https://github.com/danimc/dovela-ui) — every color, radius, spacing step, shadow and font as a CSS custom property.

Ships a single stylesheet plus a typed registry of the token names. Installed automatically with [`@dovela-ui/react`](https://www.npmjs.com/package/@dovela-ui/react); install it directly only if you want the tokens without the components.

## Install

```bash
pnpm add @dovela-ui/core
```

## Usage

Import after Tailwind, in your CSS entry:

```css
@import "tailwindcss";
@import "@dovela-ui/core/tokens.css";
```

Raw values live on `:root` and `.dark` as plain CSS variables, so you can override any of them — globally or scoped to a subtree:

```css
:root {
  --dovela-color-accent: oklch(0.62 0.19 145);
  --dovela-radius-md: 0.125rem;
}
```

`@theme inline` maps them into Tailwind utilities, so `bg-surface`, `text-fg-muted`, `rounded-md` and friends resolve to your values.

## Dark mode

Tokens ship in two sets: light on `:root`, dark on `.dark` / `[data-theme="dark"]`. Toggle the class on `<html>`.

## Token names in JS

```ts
import { tokens, cssVar } from "@dovela-ui/core";

cssVar(tokens.color.accent); // "var(--dovela-color-accent)"
```

## Links

- [Documentation and full README](https://github.com/danimc/dovela-ui#readme)
- [Components](https://www.npmjs.com/package/@dovela-ui/react)
- [Issues](https://github.com/danimc/dovela-ui/issues)

MIT © Daniel Mora
