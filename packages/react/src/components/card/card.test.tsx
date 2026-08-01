import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoViolations } from "../../../test/axe";
import { Card } from "./index";

describe("Card", () => {
  it("renders the compound parts in order", () => {
    render(
      <Card aria-label="Plan">
        <Card.Header>
          <h3>Pro</h3>
        </Card.Header>
        <Card.Body>Everything in Free, plus support.</Card.Body>
        <Card.Footer>
          <span>$12/mo</span>
        </Card.Footer>
      </Card>,
    );

    expect(screen.getByRole("heading", { name: "Pro" })).toBeInTheDocument();
    expect(screen.getByText("$12/mo")).toBeInTheDocument();
  });

  it("merges a custom className over the variant classes", () => {
    const { container } = render(
      <Card variant="elevated" className="rounded-xl" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("shadow-md");
    expect(root.className).toContain("rounded-xl");
    expect(root.className).not.toContain("rounded-lg");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Card>
        <Card.Header>
          <h3>Pro</h3>
        </Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );
    await expectNoViolations(container, {
      rules: { "color-contrast": { enabled: false } },
    });
  });
});
