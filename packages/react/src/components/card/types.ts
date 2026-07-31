import type { HTMLAttributes } from "react";
import type { CardVariants } from "./styles";

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    CardVariants {}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export type CardBodyProps = HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;
