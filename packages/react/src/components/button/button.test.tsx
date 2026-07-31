import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { Button } from "./index";

describe("Button", () => {
  it("renders as a native button with its label", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("fires onPress on click and on Enter", async () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });

    await userEvent.click(button);
    button.focus();
    await userEvent.keyboard("{Enter}");

    expect(onPress).toHaveBeenCalledTimes(2);
  });

  it("does not fire when disabled", async () => {
    const onPress = vi.fn();
    render(
      <Button isDisabled onPress={onPress}>
        Save
      </Button>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    expect(onPress).not.toHaveBeenCalled();
  });

  it("applies variant and size classes", () => {
    render(
      <Button variant="outline" size="lg">
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button.className).toContain("border-border-strong");
    expect(button.className).toContain("h-12");
  });

  it("has no axe violations across variants", async () => {
    const { container } = render(
      <>
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button isDisabled>Disabled</Button>
      </>,
    );

    // ponytail: color-contrast is off — jsdom has no layout or real CSS, the
    // rule can only produce noise here. Cover it in a browser-mode run later.
    expect(
      await axe(container, { rules: { "color-contrast": { enabled: false } } }),
    ).toHaveNoViolations();
  });
});
