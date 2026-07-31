import { tv, type VariantProps } from "tailwind-variants";

export const buttonStyles = tv({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-sans font-medium transition-colors outline-none cursor-pointer",
    "data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-ring",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ],
  variants: {
    variant: {
      solid: "bg-accent text-accent-fg data-[hovered]:bg-accent-hover",
      outline:
        "border border-border-strong text-fg bg-transparent data-[hovered]:bg-surface",
      ghost: "text-fg bg-transparent data-[hovered]:bg-surface",
    },
    size: {
      sm: "h-8 px-3 text-sm rounded-sm",
      md: "h-10 px-4 text-base rounded-md",
      lg: "h-12 px-6 text-lg rounded-md",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

export type ButtonVariants = VariantProps<typeof buttonStyles>;
