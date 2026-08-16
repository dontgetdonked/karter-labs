import Link from "next/link";

import { home } from "@/config/content";
import { projects } from "@/config/projects";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";

/** Selected work. Every entry is a clearly-labelled concept. */
export function SelectedWork({ showAllLink = true }: { showAllLink?: boolean }) {
  return (
    <Section id="proiecte">
      <SectionHeading
        eyebrow={home.work.eyebrow}
        title={home.work.headline}
        description={home.work.description}
        aside={
          showAllLink ? (
            <Link href="/proiecte" className={buttonVariants({ variant: "secondary", size: "md" })}>
              Toate proiectele
            </Link>
          ) : undefined
        }
      />

      <div className="mt-14 grid gap-px border border-line bg-line">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60}>
            <ProjectCard project={project} className="h-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
