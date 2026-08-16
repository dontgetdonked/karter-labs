import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

/** Consistent vertical rhythm and hairline separation for every section. */
export function Section({
  id,
  tone = "default",
  divider = true,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: "default" | "muted" | "inverse";
  /** Hairline rule on top. Turn off where two sections share a tone. */
  divider?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-24 lg:py-32",
        tone === "inverse" && "on-ink bg-ink text-paper",
        tone === "muted" && "bg-paper-2",
        divider && (tone === "inverse" ? "border-t border-ink-line" : "border-t border-line"),
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Hairline grid used for card groups — the gap itself is the border. */
export function HairlineGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("grid gap-px border border-line bg-line", className)}>{children}</div>
  );
}
