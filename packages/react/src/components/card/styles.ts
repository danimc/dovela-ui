import { tv, type VariantProps } from "tailwind-variants";

export const cardStyles = tv({
  slots: {
    root: "font-sans bg-surface text-fg rounded-lg overflow-hidden",
    header: "px-5 pt-5 pb-3 flex flex-col gap-1",
    body: "px-5 py-3",
    footer: "px-5 pt-3 pb-5 flex items-center gap-2",
  },
  variants: {
    variant: {
      elevated: { root: "shadow-md" },
      outlined: { root: "border border-border" },
      flat: { root: "" },
    },
  },
  defaultVariants: {
    variant: "outlined",
  },
});

export type CardVariants = VariantProps<typeof cardStyles>;
