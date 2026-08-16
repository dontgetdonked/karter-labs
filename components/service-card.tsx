import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Service } from "@/config/services";
import { startingPriceLabel } from "@/config/pricing";
import { serviceIcons } from "@/components/icons";
import { TrackedLink } from "@/components/analytics/tracked-link";

/**
 * One service, rendered as a full-bleed cell inside a hairline grid.
 * The whole cell is the link target — no nested interactive elements.
 */
export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  const Icon = serviceIcons[service.icon];
  const price = startingPriceLabel(service.slug);

  return (
    <TrackedLink
      href={`/servicii/${service.slug}`}
      event="service_viewed"
      eventProps={{ slug: service.slug, source: "card" }}
      className={cn(
        "group flex min-h-full flex-col justify-between gap-10 bg-paper p-7 transition-colors duration-300 hover:bg-surface sm:p-9",
        className,
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <Icon className="h-6 w-6 text-ink" strokeWidth={1.25} aria-hidden="true" />
          <span className="font-mono text-label uppercase text-faint">{service.tag}</span>
        </div>

        <h3 className="mt-8 text-h3 font-medium">{service.title}</h3>
        <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
          {service.summary}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-label uppercase text-faint">
          {price ?? "Estimare la cerere"}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
        />
      </div>
    </TrackedLink>
  );
}
