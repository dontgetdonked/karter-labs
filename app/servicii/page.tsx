import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { services } from "@/config/services";
import { startingPriceLabel } from "@/config/pricing";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Process } from "@/components/sections/process";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection, CtaPair } from "@/components/cta-section";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { serviceIcons } from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "Servicii",
  description:
    "Website-uri, aplicații web, automatizări și software custom pentru business-uri din Moldova. Vezi ce construim și pentru cine.",
  path: "/servicii",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicii"
        title="Patru direcții, aceeași abordare."
        description="Pornim de la problema ta de business, nu de la o listă de tehnologii. Alege direcția care se apropie cel mai mult de situația ta — restul stabilim împreună."
        actions={<CtaPair location="servicii-hero" />}
      />

      <Section divider={false}>
        <div className="flex flex-col">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            const price = startingPriceLabel(service.slug);

            return (
              <Reveal key={service.slug} delay={index * 50}>
                <TrackedLink
                  href={`/servicii/${service.slug}`}
                  event="service_viewed"
                  eventProps={{ slug: service.slug, source: "card" }}
                  className="group grid gap-6 border-t border-line py-10 transition-colors hover:bg-surface sm:py-12 lg:grid-cols-12 lg:gap-10"
                >
                  <div className="flex items-start gap-5 lg:col-span-5">
                    <Icon
                      className="mt-1.5 h-6 w-6 shrink-0 text-ink"
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-mono text-label uppercase text-faint">
                        {String(index + 1).padStart(2, "0")} / {service.tag}
                      </span>
                      <h2 className="mt-3 text-h2 font-semibold tracking-tight">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="max-w-lg text-[0.9375rem] leading-relaxed text-muted">
                      {service.summary}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {service.stack.slice(0, 4).map((tech) => (
                        <li
                          key={tech}
                          className="border border-line px-2.5 py-1 font-mono text-label uppercase text-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-end justify-between gap-4 lg:col-span-2 lg:flex-col lg:items-end lg:justify-between">
                    <span className="font-mono text-label uppercase text-faint">
                      {price ?? "Estimare la cerere"}
                    </span>
                    <span className="font-mono text-label uppercase text-ink transition-transform duration-300 group-hover:translate-x-1">
                      Detalii →
                    </span>
                  </div>
                </TrackedLink>
              </Reveal>
            );
          })}
          <div className="border-t border-line" />
        </div>
      </Section>

      <Process />
      <FaqSection />
      <CtaSection location="servicii" />
    </>
  );
}
