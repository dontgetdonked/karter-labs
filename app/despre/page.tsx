import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { about } from "@/config/content";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { Process } from "@/components/sections/process";
import { CtaSection, CtaPair } from "@/components/cta-section";

export const metadata: Metadata = buildMetadata({
  title: "Despre noi",
  description:
    "Karter Labs este o agenție de software din Republica Moldova. Construim website-uri, aplicații, automatizări și software custom pornind de la problema de business.",
  path: "/despre",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        title={about.headline}
        description={about.intro}
        actions={<CtaPair location="despre-hero" />}
      />

      <Section divider={false}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>Abordare</Eyebrow>
          </div>

          <Reveal className="lg:col-span-8">
            <div className="flex flex-col gap-7">
              {about.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-3xl text-lead text-ink">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow={about.principles.eyebrow}
          title={about.principles.headline}
        />

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {about.principles.items.map((item, index) => (
            <li key={item.title} className="bg-paper-2">
              <Reveal delay={index * 60} className="h-full p-7 sm:p-8">
                <span className="font-mono text-label uppercase text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-h3 font-medium">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {item.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="inverse">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Eyebrow tone="inverse">{about.market.eyebrow}</Eyebrow>
            <h2 className="mt-7 text-h2 font-semibold text-paper">{about.market.headline}</h2>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-8 lg:pt-2">
            <p className="max-w-3xl text-lead text-ink-muted">{about.market.body}</p>
          </Reveal>
        </div>
      </Section>

      <Process />
      <CtaSection location="despre" />
    </>
  );
}
