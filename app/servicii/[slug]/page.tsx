import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { services, getService, serviceSlugs } from "@/config/services";
import { startingPriceLabel } from "@/config/pricing";
import { PageHero } from "@/components/page-hero";
import { Section, HairlineGrid } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";
import { Process } from "@/components/sections/process";
import { CtaSection, CtaPair, EstimateCallout } from "@/components/cta-section";
import { serviceIcons } from "@/components/icons";

/** The four service pages are fully static. */
export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/servicii/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return buildMetadata({
      title: "Serviciu inexistent",
      description: "Pagina căutată nu există.",
      path: "/servicii",
      index: false,
    });
  }

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/servicii/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/servicii/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  const price = startingPriceLabel(service.slug);
  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={`Servicii / ${service.title}`}
        title={service.headline}
        description={service.intro}
        actions={<CtaPair location={`serviciu-${service.slug}`} />}
        meta={[
          { label: "Serviciu", value: service.title },
          { label: "Categorie", value: service.tag },
          { label: "Preț de start", value: price ?? "Doar pe bază de estimare" },
          { label: "Piață", value: "Republica Moldova & remote" },
        ]}
      />

      <Section divider={false}>
        <SectionHeading
          eyebrow="Ce construim"
          title={`Ce intră în ${service.title.toLowerCase()}`}
          aside={
            <div className="flex items-center gap-3 text-muted">
              <Icon className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
              <span className="font-mono text-label uppercase">{service.tag}</span>
            </div>
          }
        />

        <HairlineGrid className="mt-14 sm:grid-cols-2">
          {service.deliverables.map((item, index) => (
            <div key={item.title} className="bg-paper">
              <Reveal delay={index * 50} className="h-full p-7 sm:p-9">
                <span className="font-mono text-label uppercase text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-h3 font-medium">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {item.description}
                </p>
              </Reveal>
            </div>
          ))}
        </HairlineGrid>
      </Section>

      <Section tone="muted">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Pentru cine" title="Când are sens acest serviciu" />
            <ul className="mt-10 flex flex-col gap-4">
              {service.fitFor.map((item) => (
                <li key={item} className="flex gap-4 text-[0.9375rem] leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-line-strong" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={80} className="lg:col-span-7">
            <div className="border border-line bg-paper p-8 sm:p-10">
              <h2 className="font-mono text-label uppercase text-faint">Ce primești</h2>
              <ul className="mt-8 flex flex-col gap-5">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex gap-4 text-[0.9375rem] leading-relaxed">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-ink"
                      strokeWidth={2}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-line pt-7">
                <h3 className="font-mono text-label uppercase text-faint">Tehnologii</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.stack.map((tech) => (
                    <li
                      key={tech}
                      className="border border-line px-2.5 py-1 font-mono text-label uppercase text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Process />

      <Section>
        <EstimateCallout location={`serviciu-${service.slug}`} />

        <div className="mt-20">
          <h2 className="font-mono text-label uppercase text-faint">Alte servicii</h2>
          <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/servicii/${item.slug}`}
                  className="group flex h-full flex-col justify-between gap-8 bg-paper p-6 transition-colors hover:bg-surface"
                >
                  <span className="text-h3 font-medium">{item.title}</span>
                  <span className="font-mono text-label uppercase text-muted transition-transform duration-300 group-hover:translate-x-1">
                    Vezi →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaSection location={`serviciu-${service.slug}`} />
    </>
  );
}
