import { cn } from "@/lib/utils";

/** Small mono label that opens a section. Technical, quiet, always uppercase. */
export function Eyebrow({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-mono text-label uppercase",
        tone === "inverse" ? "text-ink-muted" : "text-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-px w-6",
          tone === "inverse" ? "bg-ink-line-strong" : "bg-line-strong",
        )}
      />
      {children}
    </p>
  );
}
