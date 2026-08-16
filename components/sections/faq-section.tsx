import { faq } from "@/config/faq";
import { home } from "@/config/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/reveal";

export function FaqSection({ divider = true }: { divider?: boolean }) {
  return (
    <Section id="intrebari" divider={divider}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={home.faq.eyebrow} title={home.faq.headline} />
        </div>

        <Reveal className="lg:col-span-8">
          <Accordion items={[...faq]} name="faq" />
        </Reveal>
      </div>
    </Section>
  );
}
