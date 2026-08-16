import { services } from "@/config/services";
import { home } from "@/config/content";
import { Section, HairlineGrid } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/service-card";

/** The four services. Shared by the homepage and /servicii. */
export function ServicesSection({
  eyebrow = home.services.eyebrow,
  headline = home.services.headline,
  description = home.services.description,
  divider = true,
}: {
  eyebrow?: string;
  headline?: string;
  description?: string;
  divider?: boolean;
}) {
  return (
    <Section id="servicii" divider={divider}>
      <SectionHeading eyebrow={eyebrow} title={headline} description={description} />

      <HairlineGrid className="mt-14 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </HairlineGrid>
    </Section>
  );
}
