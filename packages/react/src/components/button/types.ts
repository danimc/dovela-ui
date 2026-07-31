import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import type { ButtonVariants } from "./styles";

export interface ButtonProps
  extends Omit<AriaButtonProps, "className" | "style">,
    ButtonVariants {
  className?: string;
}
