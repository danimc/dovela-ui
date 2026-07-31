import { tv, type VariantProps } from "tailwind-variants";

export const inputStyles = tv({
  slots: {
    // `group` lets the input react to the field's data-invalid state.
    root: "group flex flex-col gap-1.5 font-sans",
    label: "text-sm font-medium text-fg",
    input: [
      // border-strong, not border: the edge of a field is what identifies the
      // control, so WCAG 1.4.11 wants it at 3:1 — the decorative hairline is
      // not enough here.
      "w-full bg-bg text-fg border border-border-strong rounded-md outline-none transition-colors",
      "placeholder:text-fg-muted",
      "data-[hovered]:border-fg-muted",
      "data-[focused]:outline-2 data-[focused]:outline-offset-2 data-[focused]:outline-ring",
      // Colour swap rather than opacity — see the note in button/styles.ts.
      "data-[disabled]:cursor-not-allowed data-[disabled]:bg-disabled data-[disabled]:text-disabled-fg",
      "group-data-[invalid]:border-danger",
    ],
    description: "text-sm text-fg-muted",
    error: "text-sm text-danger",
  },
  variants: {
    size: {
      sm: { input: "h-8 px-2.5 text-sm" },
      md: { input: "h-10 px-3 text-base" },
      lg: { input: "h-12 px-4 text-lg" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type InputVariants = VariantProps<typeof inputStyles>;
