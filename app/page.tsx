import { HeroSection } from "@/components/sections/hero-section"
import { TrustBar } from "@/components/premium/trust-bar"
import { FeaturesSection } from "@/components/features-section"
import { TechnologySection } from "@/components/technology-section"
import { ServicesPreview } from "@/components/sections/services-preview"
import { ApplicationsTimeline } from "@/components/applications-timeline"
import { AboutSection } from "@/components/about-section"
import { PrinciplesSection } from "@/components/premium/principles-section"
import { SafetySection } from "@/components/safety-section"
import { PortfolioShowcase } from "@/components/premium/portfolio-showcase"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { ContactInquirySection } from "@/components/sections/contact-inquiry-section"
import { CTASection } from "@/components/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { webPageSchema } from "@/lib/seo"
import company from "@/data/company.json"

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          title: `${company.brandName} | IT & Software Development Company in India`,
          description: company.description,
          path: "/",
        })}
      />
      <main>
        <section aria-label="Hero">
          <h1 className="sr-only">
            CyberBliss Studios — Premium software development solutions from India since 2004
          </h1>
          <HeroSection />
        </section>
        <TrustBar />
        <AboutSection />
        <ServicesPreview />
        <FeaturesSection />
        <PrinciplesSection />
        <section id="technology" aria-label="Technology stack">
          <TechnologySection />
        </section>
        <ApplicationsTimeline />
        <SafetySection />
        <PortfolioShowcase />
        <TestimonialsSection />
        <section id="faq" aria-label="Frequently asked questions">
          <FAQSection />
        </section>
        <ContactInquirySection />
        <CTASection />
      </main>
    </>
  )
}
