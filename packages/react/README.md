# @dovela-ui/react

Accessible React components built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/), Tailwind CSS v4 and tailwind-variants.

Focus management, keyboard interaction and ARIA come from React Aria — not from hand-rolled event handlers. Every color, radius, shadow and font is a CSS custom property you can override at any scope.

## Install

```bash
pnpm add @dovela-ui/react @dovela-ui/core
```

Peer dependencies: `react >= 18`, `react-dom >= 18`. Tailwind CSS v4 is required in the consuming app.

In your CSS entry:

```css
@import "tailwindcss";
@import "@dovela-ui/core/tokens.css";

/* Let Tailwind see the classes inside the published components. */
@source "../node_modules/@dovela-ui/react/dist";
```

## Usage

```tsx
import { Button, Card, Input } from "@dovela-ui/react";

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

## Components

`Button` · `Input` · `Card`

## Server Components

This is a client package (`"use client"` — React Aria needs hooks) and drops
straight into a Next.js App Router app. One caveat: **dot notation does not
cross the RSC boundary**. Inside a Server Component, React sees a *reference*
to each export, and a reference has no properties — so `Card.Header` is
`undefined`. Use the flat exports there:

```tsx
import { Card, CardHeader, CardBody, CardFooter } from "@dovela-ui/react";
```

Both forms work inside a Client Component.

## Links

- [Documentation and full README](https://github.com/danimc/dovela-ui#readme)
- [Design tokens](https://www.npmjs.com/package/@dovela-ui/core)
- [Issues](https://github.com/danimc/dovela-ui/issues)

MIT © Daniel Mora
