import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/**
 * Wordmark.
 *
 * No official logo file was supplied with the project, so the name is set
 * typographically in the site's own typeface rather than invented as a mark.
 * When the real asset arrives, drop it at `public/logo.svg` and replace the
 * <span> below with:
 *
 *   <Image src="/logo.svg" alt="Karter Labs" width={132} height={20} priority />
 *
 * Nothing else needs to change — every usage goes through this component.
 */
export function Logo({ className, tone = "default" }: { className?: string; tone?: "default" | "inverse" }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-[0.42em] text-[0.9375rem] font-semibold uppercase leading-none tracking-[0.16em]",
        tone === "inverse" ? "text-paper" : "text-ink",
        className,
      )}
    >
      Karter
      <span className={tone === "inverse" ? "text-ink-muted" : "text-muted"}>Labs</span>
    </span>
  );
}

/** The wordmark as a link home. Used by the header and the footer. */
export function LogoLink({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — pagina principală`}
      className={cn("inline-flex items-center transition-opacity hover:opacity-70", className)}
    >
      <Logo tone={tone} />
    </Link>
  );
}
