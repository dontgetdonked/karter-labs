import Link from "next/link";

import { site, contactChannels, socialChannels } from "@/config/site";
import { mainNav } from "@/config/navigation";
import { services } from "@/config/services";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/logo";
import { brandIcons } from "@/components/icons";

const year = site.copyrightYear;

export function SiteFooter() {
  const email = contactChannels.find((channel) => channel.key === "email");

  return (
    <footer className="on-ink mt-auto border-t border-ink-line bg-ink text-paper">
      <Container>
        <div className="grid gap-14 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Logo tone="inverse" />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-ink-muted">
              {site.tagline}
            </p>

            {email ? (
              <a
                href={email.href}
                className="mt-8 inline-block border-b border-ink-line-strong pb-1 text-[0.9375rem] transition-colors hover:border-paper"
              >
                {email.value}
              </a>
            ) : null}
          </div>

          <nav aria-label="Servicii" className="md:col-span-3">
            <h2 className="font-mono text-label uppercase text-ink-muted">Servicii</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/servicii/${service.slug}`}
                    className="text-[0.9375rem] text-paper/85 transition-colors hover:text-paper"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Pagini" className="md:col-span-2">
            <h2 className="font-mono text-label uppercase text-ink-muted">Site</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-paper/85 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {socialChannels.length > 0 ? (
            <nav aria-label="Rețele" className="md:col-span-2">
              <h2 className="font-mono text-label uppercase text-ink-muted">Urmărește</h2>
              <ul className="mt-6 flex flex-col gap-3.5">
                {socialChannels.map((channel) => {
                  const Icon = brandIcons[channel.key as keyof typeof brandIcons];
                  return (
                    <li key={channel.key}>
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 text-[0.9375rem] text-paper/85 transition-colors hover:text-paper"
                      >
                        {Icon ? <Icon className="h-4 w-4" /> : null}
                        {channel.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 border-t border-ink-line py-8 font-mono text-label uppercase text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Toate drepturile rezervate.
          </p>
          <p>Chișinău, Republica Moldova</p>
        </div>
      </Container>
    </footer>
  );
}
