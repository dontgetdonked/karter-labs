import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { projects } from "@/config/projects";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { CtaSection, CtaPair } from "@/components/cta-section";

export const metadata: Metadata = buildMetadata({
  title: "Proiecte",
  description:
    "Proiecte-concept construite de Karter Labs: platformă de stocuri, sistem de lead-uri și magazin online. Marcate ca demo, fără clienți sau rezultate inventate.",
  path: "/proiecte",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Proiecte"
        title="Proiecte selectate."
        description="Karter Labs este la început, așa că nu publicăm clienți pe care nu i-am avut. În schimb, arătăm proiecte-concept construite intern: aceeași problemă de business, aceeași abordare, aceleași decizii tehnice pe care le-am lua într-un proiect real."
        actions={<CtaPair location="proiecte-hero" />}
      />

      <Section divider={false}>
        <div className="border border-line bg-line">
          <div className="grid gap-px">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 60}>
                <ProjectCard project={project} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-faint">
          Toate proiectele de mai sus sunt marcate ca <strong className="font-medium">Demo project</strong>.
          Sunt concepte construite de echipa Karter Labs pentru a demonstra abordarea și nivelul de
          execuție. Nu reprezintă clienți reali și nu conțin date sau rezultate ale unor companii.
        </p>
      </Section>

      <CtaSection location="proiecte" />
    </>
  );
}
