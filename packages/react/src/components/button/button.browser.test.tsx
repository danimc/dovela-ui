import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { expectNoViolations } from "../../../test/axe";
import { Button } from "./index";

/**
 * Real Chromium. Everything asserted here is something jsdom reports as
 * passing whether or not it is true — colour contrast, focus rings, tab order.
 */

const setTheme = (theme: "light" | "dark") =>
  document.documentElement.classList.toggle("dark", theme === "dark");

describe("Button accessibility", () => {
  afterEach(() => setTheme("light"));

  it.each(["light", "dark"] as const)(
    "has no axe violations in %s mode, colour-contrast included",
    async (theme) => {
      setTheme(theme);
      const { container } = render(
        <div className="bg-bg p-4">
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button isDisabled>Disabled</Button>
        </div>,
      );

      // No rule disabled. This is the assertion the jsdom suite cannot make:
      // there, colour-contrast is inert because nothing has computed styles.
      await expectNoViolations(container);
    },
  );
});

describe("Button focus behaviour", () => {
  it("paints a visible focus ring on keyboard focus", async () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });

    await userEvent.tab();

    expect(document.activeElement).toBe(button);
    const outline = getComputedStyle(button).outlineWidth;
    expect(
      Number.parseFloat(outline),
      `expected a focus ring, got outline-width: ${outline}`,
    ).toBeGreaterThan(0);
  });

  it("keeps a disabled button out of the tab order", async () => {
    render(
      <>
        <Button isDisabled>First</Button>
        <Button>Second</Button>
      </>,
    );

    await userEvent.tab();

    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Second" }),
    );
  });
});
