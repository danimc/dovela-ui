import { forwardRef } from "react";
import { cardStyles } from "./styles";
import type {
  CardBodyProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
} from "./types";

const styles = cardStyles();

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cardStyles({ variant }).root({ class: className })}
      {...props}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <div ref={ref} className={styles.header({ class: className })} {...props} />
    );
  },
);

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  function CardBody({ className, ...props }, ref) {
    return (
      <div ref={ref} className={styles.body({ class: className })} {...props} />
    );
  },
);

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div ref={ref} className={styles.footer({ class: className })} {...props} />
    );
  },
);

/**
 * Compound API: `<Card><Card.Header/><Card.Body/><Card.Footer/></Card>`.
 * The parts are also exported individually for named imports.
 */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export { cardStyles } from "./styles";
export type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from "./types";
export type { CardVariants } from "./styles";
