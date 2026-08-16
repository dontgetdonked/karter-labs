import { home } from "@/config/content";
import { services } from "@/config/services";
import { pricing, startingPriceLabel } from "@/config/pricing";
import { cta } from "@/config/navigation";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { TrackedLink } from "@/components/analytics/tracked-link";

/**
 * No invented packages. Entry prices are shown only where a meaningful floor
 * exists, and every figure comes from config/pricing.ts.
 */
export function PricingNote() {
  const withPrices = pricing.showStartingPrices
    ? services
        .map((service) => ({ service, price: startingPriceLabel(service.slug) }))
        .filter((entry): entry is { service: (typeof services)[number]; price: string } =>
          Boolean(entry.price),
        )
    : [];

  return (
    <Section tone="muted">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow>{home.pricing.eyebrow}</Eyebrow>
          <h2 className="mt-7 text-h1 font-semibold">{home.pricing.headline}</h2>
          <p className="mt-6 max-w-lg text-lead text-muted">{home.pricing.body}</p>

          <TrackedLink
            href={cta.estimate.href}
            event="cta_clicked"
            eventProps={{ label: cta.estimate.label, location: "pricing" }}
            className={buttonVariants({ size: "lg", className: "mt-9" })}
          >
            {cta.estimate.label}
          </TrackedLink>
        </Reveal>

        {withPrices.length > 0 ? (
          <Reveal delay={80} className="lg:col-span-7">
            <div className="border-t border-line">
              {withPrices.map(({ service, price }) => (
                <div
                  key={service.slug}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-5"
                >
                  <span className="text-h3 font-medium">{service.title}</span>
                  <span className="font-mono text-label uppercase text-muted">{price}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-xl text-xs leading-relaxed text-faint">
              Prețurile de start sunt orientative și acoperă un proiect de bază. Costul final
              depinde de funcționalități, integrări și volumul de conținut.
            </p>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
