import { home } from "@/config/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";

/** Four concrete advantages, stated plainly. */
export function WhyUs() {
  return (
    <Section tone="muted">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={home.why.eyebrow} title={home.why.headline} />
        </div>

        <ul className="grid gap-px bg-line lg:col-span-8 sm:grid-cols-2">
          {home.why.items.map((item, index) => (
            <li key={item.title} className="bg-paper-2">
              <Reveal delay={index * 60} className="h-full p-7 sm:p-8">
                <h3 className="text-h3 font-medium">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {item.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
