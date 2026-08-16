import { home } from "@/config/content";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { CtaPair } from "@/components/cta-section";

/**
 * Homepage hero. One headline, one supporting sentence, two actions —
 * plus a faint blueprint grid as the only decoration.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-60 mask-fade-b"
      />

      <Container className="relative">
        <div className="py-20 sm:py-28 lg:py-40">
          <Reveal>
            <Eyebrow>{home.hero.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-8 max-w-5xl text-balance-tight text-display font-semibold">
              {home.hero.headline}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-7 max-w-2xl text-lead text-muted">{home.hero.subheadline}</p>
          </Reveal>

          <Reveal delay={180} className="mt-10 sm:mt-12">
            <CtaPair location="hero" />
          </Reveal>
        </div>
      </Container>

      <div className="relative border-y border-line bg-paper">
        <Container>
          <ul className="scrollbar-none flex items-center gap-6 overflow-x-auto py-4 font-mono text-label uppercase text-faint sm:gap-8">
            {home.hero.capabilities.map((capability, index) => (
              <li key={capability} className="flex shrink-0 items-center gap-6 sm:gap-8">
                {index > 0 ? (
                  <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
                ) : null}
                {capability}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
