import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Heading level. Sections use h2; page heroes use h1. */
  as?: "h1" | "h2";
  align?: "left" | "center";
  tone?: "default" | "inverse";
  className?: string;
  /** Optional slot rendered to the right on wide screens. */
  aside?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "left",
  tone = "default",
  className,
  aside,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between",
        centered && "lg:flex-col lg:items-center",
        className,
      )}
    >
      <Reveal className={cn("max-w-3xl", centered && "text-center")}>
        {eyebrow ? (
          <Eyebrow tone={tone} className={cn("mb-6", centered && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        ) : null}

        <Tag
          className={cn(
            "text-balance-tight font-semibold",
            Tag === "h1" ? "text-display" : "text-h2",
            tone === "inverse" ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </Tag>

        {description ? (
          <p
            className={cn(
              "mt-5 max-w-2xl text-lead",
              centered && "mx-auto",
              tone === "inverse" ? "text-ink-muted" : "text-muted",
            )}
          >
            {description}
          </p>
        ) : null}
      </Reveal>

      {aside ? <Reveal delay={80}>{aside}</Reveal> : null}
    </div>
  );
}
