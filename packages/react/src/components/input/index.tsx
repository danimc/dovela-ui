import { forwardRef } from "react";
import {
  Input as AriaInput,
  FieldError,
  Label,
  Text,
  TextField,
} from "react-aria-components";
import { inputStyles } from "./styles";
import type { InputProps } from "./types";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, description, errorMessage, placeholder, size, className, ...props },
  ref,
) {
  const styles = inputStyles({ size });

  return (
    <TextField className={styles.root({ class: className })} {...props}>
      {label ? <Label className={styles.label()}>{label}</Label> : null}
      <AriaInput ref={ref} placeholder={placeholder} className={styles.input()} />
      {description ? (
        <Text slot="description" className={styles.description()}>
          {description}
        </Text>
      ) : null}
      <FieldError className={styles.error()}>{errorMessage}</FieldError>
    </TextField>
  );
});

export { inputStyles } from "./styles";
export type { InputProps } from "./types";
export type { InputVariants } from "./styles";
