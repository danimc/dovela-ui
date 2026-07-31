import Link from "next/link";
// Server Component: use the flat part exports, not `Card.Body`.
// See apps/docs/app/components/card/page.mdx#server-components.
import { Button, Card, CardBody, CardHeader } from "@dovela/react";
import { CodeBlock } from "@/components/code-block";

const FEATURES = [
  {
    title: "Accessible by default",
    body: "Focus management, keyboard interaction and ARIA come from React Aria Components — not from hand-rolled event handlers.",
  },
  {
    title: "Themeable with CSS variables",
    body: "Every color, radius, shadow and font is a token. Override them at :root, per section, or per component.",
  },
  {
    title: "Install it or copy it",
    body: "Use the npm package for the whole system, or lift a single component's source into your codebase.",
  },
];

export default function Home() {
  return (
    <div className="space-y-14">
      <section className="space-y-5">
        <h1 className="text-4xl font-semibold tracking-tight">dovela</h1>
        <p className="max-w-xl text-lg text-fg-muted">
          An accessible React component library built on React Aria Components,
          Tailwind CSS v4 and tailwind-variants.
        </p>
        <div className="flex gap-3">
          <Link href="/components/button">
            <Button>Browse components</Button>
          </Link>
          <Link href="/components/button">
            <Button variant="outline">Get started</Button>
          </Link>
        </div>
        <CodeBlock code={"pnpm add @dovela/react @dovela/core"} />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {FEATURES.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <h2 className="font-medium">{feature.title}</h2>
            </CardHeader>
            <CardBody className="text-sm text-fg-muted">{feature.body}</CardBody>
          </Card>
        ))}
      </section>
    </div>
  );
}
