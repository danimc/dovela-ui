import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoViolations } from "../../../test/axe";
import { Input } from "./index";

describe("Input", () => {
  it("associates the visible label with the field", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInstanceOf(HTMLInputElement);
  });

  it("wires the description to the field via aria-describedby", () => {
    render(<Input label="Email" description="We never share it." />);
    expect(screen.getByLabelText("Email")).toHaveAccessibleDescription(
      "We never share it.",
    );
  });

  it("accepts typed input", async () => {
    render(<Input label="Email" />);
    await userEvent.type(screen.getByLabelText("Email"), "hi@example.com");
    expect(screen.getByLabelText("Email")).toHaveValue("hi@example.com");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Input label="Email" description="We never share it." />,
    );
    await expectNoViolations(container, {
      rules: { "color-contrast": { enabled: false } },
    });
  });
});
