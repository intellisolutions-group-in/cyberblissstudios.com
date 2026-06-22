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

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <ServicesPreview />
      <FeaturesSection />
      <PrinciplesSection />
      <section id="technology">
        <TechnologySection />
      </section>
      <ApplicationsTimeline />
      <SafetySection />
      <PortfolioShowcase />
      <TestimonialsSection />
      <section id="faq">
        <FAQSection />
      </section>
      <ContactInquirySection />
      <CTASection />
    </main>
  )
}
