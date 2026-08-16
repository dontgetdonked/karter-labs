import { ArrowRight } from "lucide-react";

import { home } from "@/config/content";
import { getService } from "@/config/services";
import { Section, HairlineGrid } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";
import { TrackedLink } from "@/components/analytics/tracked-link";

/**
 * Problem → solution. The section that says "we solve business problems"
 * without ever using the phrase.
 */
export function Problems() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow={home.problems.eyebrow}
        title={home.problems.headline}
        description={home.problems.description}
      />

      <HairlineGrid className="mt-14 sm:grid-cols-2">
        {home.problems.items.map((item, index) => {
          const service = getService(item.service);

          return (
            <div key={item.problem} className="bg-paper">
              <Reveal delay={index * 60} className="flex h-full flex-col p-7 sm:p-9">
                <span className="font-mono text-label uppercase text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-7 text-h3 font-medium">{item.problem}</h3>

                <p className="mt-5 flex items-start gap-3 text-[0.9375rem] font-medium text-ink">
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-muted"
                    strokeWidth={1.5}
                  />
                  {item.solution}
                </p>

                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{item.detail}</p>

                {service ? (
                  <TrackedLink
                    href={`/servicii/${service.slug}`}
                    event="service_viewed"
                    eventProps={{ slug: service.slug, source: "card" }}
                    className="mt-auto inline-block w-fit pt-8 font-mono text-label uppercase text-muted transition-colors hover:text-ink"
                  >
                    {service.title} →
                  </TrackedLink>
                ) : null}
              </Reveal>
            </div>
          );
        })}
      </HairlineGrid>
    </Section>
  );
}
