import type { ReactNode } from "react";
import type { TextFieldProps, ValidationResult } from "react-aria-components";
import type { InputVariants } from "./styles";

export interface InputProps
  extends Omit<TextFieldProps, "className" | "style" | "children">,
    InputVariants {
  /** Visible label. Omit only if you pass `aria-label`. */
  label?: ReactNode;
  /** Helper text rendered below the field and wired up via aria-describedby. */
  description?: ReactNode;
  /** Error text, or a function receiving React Aria's validation result. */
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  placeholder?: string;
  className?: string;
}
