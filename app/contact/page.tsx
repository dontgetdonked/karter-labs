import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { contactPage } from "@/config/content";
import { contact, contactChannels } from "@/config/site";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { FaqSection } from "@/components/sections/faq-section";
import { brandIcons } from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Spune-ne despre proiectul tău. Karter Labs revine cu întrebări, o discuție scurtă și o estimare scrisă.",
  path: "/contact",
});

export default function ContactPageRoute() {
  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.headline}
        description={contactPage.intro}
      />

      <Section divider={false}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-mono text-label uppercase text-faint">{contactPage.formTitle}</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <Reveal delay={80} className="lg:col-span-5">
            <div className="flex flex-col gap-10">
              {contactChannels.length > 0 ? (
                <div className="border border-line p-7 sm:p-8">
                  <h2 className="font-mono text-label uppercase text-faint">
                    {contactPage.directTitle}
                  </h2>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                    {contactPage.directBody}
                  </p>

                  <ul className="mt-7 flex flex-col">
                    {contactChannels.map((channel) => {
                      const Icon = brandIcons[channel.key as keyof typeof brandIcons];
                      const external = channel.href.startsWith("http");

                      return (
                        <li key={channel.key} className="border-t border-line first:border-t-0">
                          <a
                            href={channel.href}
                            {...(external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-muted"
                          >
                            <span className="flex items-center gap-3">
                              {Icon ? (
                                <Icon className="h-4 w-4 text-muted" aria-hidden="true" />
                              ) : null}
                              <span className="font-mono text-label uppercase text-faint">
                                {channel.label}
                              </span>
                            </span>
                            <span className="text-[0.9375rem] text-ink transition-transform duration-300 group-hover:-translate-x-0.5">
                              {channel.value}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  <p className="mt-7 border-t border-line pt-5 text-xs leading-relaxed text-faint">
                    {contact.responseTime}
                  </p>
                </div>
              ) : null}

              <div className="border border-line bg-surface p-7 sm:p-8">
                <h2 className="font-mono text-label uppercase text-faint">
                  {contactPage.whatHappensTitle}
                </h2>
                <ol className="mt-7 flex flex-col gap-5">
                  {contactPage.whatHappensSteps.map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span className="mt-0.5 font-mono text-label uppercase text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-muted">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <FaqSection />
    </>
  );
}
