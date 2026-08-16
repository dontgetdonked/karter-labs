import { home } from "@/config/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

/** Four steps, numbered, connected by a single hairline. */
export function Process() {
  return (
    <Section>
      <SectionHeading
        eyebrow={home.process.eyebrow}
        title={home.process.headline}
        description={home.process.description}
      />

      <ol className="mt-16 grid gap-px border-t border-line sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {home.process.steps.map((step, index) => (
          <li key={step.number} className="lg:border-l lg:border-line lg:first:border-l-0">
            <Reveal delay={index * 70} className="flex h-full flex-col py-8 lg:px-7 lg:first:pl-0">
              <div className="flex items-center gap-4">
                <span className="font-mono text-label uppercase text-ink">{step.number}</span>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
              </div>

              <h3 className="mt-7 text-h3 font-medium">{step.title}</h3>
              <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-muted">
                {step.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
