import { Hero } from "@/components/sections/hero";
import { Positioning } from "@/components/sections/positioning";
import { ServicesSection } from "@/components/sections/services-section";
import { Problems } from "@/components/sections/problems";
import { Process } from "@/components/sections/process";
import { WhyUs } from "@/components/sections/why-us";
import { SelectedWork } from "@/components/sections/selected-work";
import { PricingNote } from "@/components/sections/pricing-note";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/cta-section";

/**
 * Homepage. Reads top to bottom as:
 * problem → solution → services → process → proof → contact.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <ServicesSection />
      <Problems />
      <Process />
      <WhyUs />
      <SelectedWork />
      <PricingNote />
      <FaqSection />
      <CtaSection location="home" />
    </>
  );
}
