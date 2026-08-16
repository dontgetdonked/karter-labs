import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";

/** Shared hero for every page below the homepage. */
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  meta,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  /** Optional mono key/value strip under the copy. */
  meta?: { label: string; value: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-50 mask-fade-b"
      />

      <Container className="relative">
        <div className="py-16 sm:py-20 lg:py-28">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-7 max-w-4xl text-balance-tight text-h1 font-semibold">{title}</h1>
          </Reveal>

          {description ? (
            <Reveal delay={110}>
              <p className="mt-6 max-w-2xl text-lead text-muted">{description}</p>
            </Reveal>
          ) : null}

          {actions ? (
            <Reveal delay={160} className="mt-10">
              {actions}
            </Reveal>
          ) : null}

          {meta && meta.length > 0 ? (
            <Reveal delay={200}>
              <dl className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {meta.map((entry) => (
                  <div key={entry.label} className="bg-paper p-5">
                    <dt className="font-mono text-label uppercase text-faint">{entry.label}</dt>
                    <dd className="mt-2 text-[0.9375rem] text-ink">{entry.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
