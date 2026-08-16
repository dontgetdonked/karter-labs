import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { mainNav } from "@/config/navigation";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Pagina nu a fost găsită",
  description: "Pagina căutată nu există sau a fost mutată.",
  path: "/404",
  index: false,
});

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-start py-24 sm:py-32 lg:py-40">
        <Eyebrow>Eroare 404</Eyebrow>
        <h1 className="mt-8 max-w-2xl text-h1 font-semibold">Pagina nu a fost găsită.</h1>
        <p className="mt-6 max-w-xl text-lead text-muted">
          Adresa accesată nu există sau a fost mutată. Poți reveni la pagina principală sau alege
          una dintre secțiunile de mai jos.
        </p>

        <Link href="/" className={buttonVariants({ size: "lg", className: "mt-10" })}>
          Înapoi la pagina principală
        </Link>

        <nav aria-label="Secțiuni" className="mt-14 w-full border-t border-line">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-line lg:border-r lg:last:border-r-0">
                <Link
                  href={item.href}
                  className="block px-1 py-5 font-mono text-label uppercase text-muted transition-colors hover:text-ink"
                >
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Container>
  );
}
