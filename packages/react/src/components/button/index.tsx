import { forwardRef } from "react";
import { Button as AriaButton } from "react-aria-components";
import { buttonStyles } from "./styles";
import type { ButtonProps } from "./types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant, size, className, ...props }, ref) {
    return (
      <AriaButton
        ref={ref}
        className={buttonStyles({ variant, size, class: className })}
        {...props}
      />
    );
  },
);

export { buttonStyles } from "./styles";
export type { ButtonProps } from "./types";
export type { ButtonVariants } from "./styles";
