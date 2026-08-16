import { home } from "@/config/content";
import { site } from "@/config/site";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";

/** High-contrast statement of what Karter Labs is — and what it is not. */
export function Positioning() {
  return (
    <Section tone="inverse" divider={false}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <Eyebrow tone="inverse">{home.positioning.eyebrow}</Eyebrow>
          <h2 className="mt-7 text-h1 font-semibold text-paper">{home.positioning.headline}</h2>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-8 lg:pt-2">
          <p className="max-w-3xl text-balance-tight text-h3 font-normal leading-relaxed text-paper sm:text-[1.625rem] sm:leading-[1.45]">
            {home.positioning.body}
          </p>
          <p className="mt-10 max-w-xl border-l border-ink-line-strong pl-6 text-[0.9375rem] leading-relaxed text-ink-muted">
            {site.positioning}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
