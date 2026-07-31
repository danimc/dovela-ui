import { useState } from "react";
import { Button, Card, Input } from "@dovela-ui/react";

// Scratch surface for developing components. Break it freely — nothing here
// ships, and nothing in the docs depends on it.
export function App() {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState("");

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark", !dark);
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 p-10">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Playground</h1>
        <Button variant="outline" size="sm" onPress={toggleTheme}>
          {dark ? "Light" : "Dark"}
        </Button>
      </header>

      <section className="flex flex-wrap gap-3">
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button isDisabled>Disabled</Button>
      </section>

      <section className="flex flex-col gap-4">
        <Input
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          description="Type something invalid to see the error state."
          isInvalid={email.length > 0 && !email.includes("@")}
          errorMessage="Enter a valid email."
        />
      </section>

      <Card className="w-80">
        <Card.Header>
          <h2 className="font-medium">Pro</h2>
        </Card.Header>
        <Card.Body className="text-sm text-fg-muted">
          Everything in Free, plus priority support.
        </Card.Body>
        <Card.Footer>
          <Button size="sm">Upgrade</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
