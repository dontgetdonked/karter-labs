import Link from "next/link";

import { cta } from "@/config/navigation";
import { contactChannels } from "@/config/site";
import { home } from "@/config/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { TrackedLink } from "@/components/analytics/tracked-link";

/**
 * Closing call to action. Rendered at the bottom of every page, so the visitor
 * always finishes on the same next step.
 */
export function CtaSection({ location }: { location: string }) {
  const email = contactChannels.find((channel) => channel.key === "email");

  return (
    <Section tone="inverse" divider={false}>
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-6 -top-24 h-64 bg-blueprint-ink opacity-40 mask-fade-b"
        />

        <div className="relative flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <Eyebrow tone="inverse" className="mb-7">
              Contact
            </Eyebrow>
            <h2 className="text-display font-semibold text-paper">{home.finalCta.headline}</h2>
            <p className="mt-4 text-h2 font-medium text-ink-muted">
              {home.finalCta.subheadline}
            </p>
          </Reveal>

          <Reveal delay={80} className="flex flex-col items-start gap-6">
            <TrackedLink
              href={cta.write.href}
              event="cta_clicked"
              eventProps={{ label: cta.write.label, location }}
              className={buttonVariants({ variant: "inverse", size: "lg" })}
            >
              {cta.write.label}
            </TrackedLink>

            {email ? (
              <a
                href={email.href}
                className="border-b border-ink-line-strong pb-1 font-mono text-label uppercase text-ink-muted transition-colors hover:border-paper hover:text-paper"
              >
                {email.value}
              </a>
            ) : null}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/** Compact estimate CTA used inside service pages. */
export function EstimateCallout({ location }: { location: string }) {
  return (
    <div className="flex flex-col gap-6 border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
      <div className="max-w-xl">
        <h2 className="text-h3 font-medium">{home.pricing.headline}</h2>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{home.pricing.body}</p>
      </div>
      <TrackedLink
        href={cta.estimate.href}
        event="cta_clicked"
        eventProps={{ label: cta.estimate.label, location }}
        className={buttonVariants({ size: "md", className: "shrink-0" })}
      >
        {cta.estimate.label}
      </TrackedLink>
    </div>
  );
}

/** Two-button pair used under page heroes. */
export function CtaPair({ location, tone = "default" }: { location: string; tone?: "default" | "inverse" }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <TrackedLink
        href={cta.hero.href}
        event="cta_clicked"
        eventProps={{ label: cta.hero.label, location }}
        className={buttonVariants({
          variant: tone === "inverse" ? "inverse" : "primary",
          size: "lg",
        })}
      >
        {cta.hero.label}
      </TrackedLink>

      <Link
        href={cta.secondary.href}
        className={buttonVariants({
          variant: tone === "inverse" ? "inverseOutline" : "secondary",
          size: "lg",
        })}
      >
        {cta.secondary.label}
      </Link>
    </div>
  );
}
