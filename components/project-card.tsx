import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Project } from "@/config/projects";
import { getService } from "@/config/services";
import { TrackedDetails } from "@/components/analytics/tracked-details";

/** Always-visible marker that an entry is a concept, not delivered client work. */
export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-line-strong px-2.5 py-1 font-mono text-label uppercase text-muted",
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 bg-faint" />
      Demo project
    </span>
  );
}

/**
 * Portfolio entry. Compact by default; the full problem/solution breakdown
 * lives behind a native <details>, which also records the `project_viewed`
 * analytics event.
 */
export function ProjectCard({
  project,
  className,
  headingLevel = 3,
}: {
  project: Project;
  className?: string;
  /** 3 under a section heading (homepage), 2 when the cards follow the page h1. */
  headingLevel?: 2 | 3;
}) {
  const service = getService(project.service);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const SubHeading = headingLevel === 2 ? "h3" : "h4";

  return (
    <article className={cn("bg-paper p-7 sm:p-9", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-label uppercase text-faint">{project.category}</span>
        {project.demo ? <DemoBadge /> : null}
      </div>

      <Heading className="mt-7 text-h2 font-semibold tracking-tight">{project.name}</Heading>
      <p className="mt-3 max-w-xl text-lead text-muted">{project.summary}</p>

      <ul className="mt-7 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="border border-line px-2.5 py-1 font-mono text-label uppercase text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      <TrackedDetails
        event="project_viewed"
        eventProps={{ slug: project.slug }}
        className="group mt-8 border-t border-line pt-6"
      >
        <summary className="flex cursor-pointer items-center gap-2 font-mono text-label uppercase text-ink transition-colors hover:text-muted">
          <span className="group-open:hidden">Vezi problema și soluția</span>
          <span className="hidden group-open:inline">Ascunde detaliile</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform duration-300 group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>

        <div className="mt-7 grid gap-8 sm:grid-cols-2">
          <div>
            <SubHeading className="font-mono text-label uppercase text-faint">Problema</SubHeading>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{project.problem}</p>
          </div>
          <div>
            <SubHeading className="font-mono text-label uppercase text-faint">Soluția</SubHeading>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{project.solution}</p>
          </div>
        </div>

        <div className="mt-8">
          <SubHeading className="font-mono text-label uppercase text-faint">Ce include</SubHeading>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {project.scope.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {service ? (
          <Link
            href={`/servicii/${service.slug}`}
            className="mt-8 inline-block border-b border-line-strong pb-1 font-mono text-label uppercase text-ink transition-colors hover:border-ink"
          >
            Serviciu: {service.title}
          </Link>
        ) : null}
      </TrackedDetails>
    </article>
  );
}
