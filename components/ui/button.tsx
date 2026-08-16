import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Shared button styling. Exported separately so `next/link` anchors can wear
 * the same look without a polymorphic wrapper: `<Link className={buttonVariants()}>`.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-ink bg-ink text-paper hover:bg-ink-2 hover:border-ink-2",
        secondary: "border-line-strong bg-paper text-ink hover:border-ink hover:bg-surface",
        ghost: "border-transparent bg-transparent text-ink hover:bg-surface",
        /** For use inside .on-ink sections. */
        inverse: "border-paper bg-paper text-ink hover:bg-surface hover:border-surface",
        inverseOutline:
          "border-ink-line-strong bg-transparent text-paper hover:border-paper hover:bg-ink-2",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm sm:text-[0.9375rem]",
        lg: "h-13 px-7 text-[0.9375rem] sm:text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
