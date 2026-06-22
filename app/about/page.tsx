import { InnerPage } from "@/components/layout/inner-page"
import { SlideUp } from "@/components/ui/slide-up"
import { CTASection } from "@/components/cta-section"
import { createMetadata } from "@/lib/seo"
import company from "@/data/company.json"
import { CheckCircle } from "lucide-react"

export const metadata = createMetadata({
  title: "About Us",
  description: `Learn about ${company.brandName}, an India-based software development company established in ${company.establishedYear}.`,
  keywords: ["about CyberBliss Studios", "software company India"],
  path: "/about/",
})

export default function AboutPage() {
  return (
    <>
      <InnerPage
        title="About Us"
        subtitle={`Delivering premium software solutions from India since ${company.establishedYear}`}
      >
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          <SlideUp hover>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
              <div className="glow-border rounded-lg p-6 text-center bg-card/50">
                <p className="text-4xl font-bold text-red-500 font-orbitron">{new Date().getFullYear() - company.establishedYear}+</p>
                <p className="text-muted-foreground font-geist mt-2 text-sm">Years Experience</p>
              </div>
              <div className="glow-border rounded-lg p-6 text-center bg-card/50">
                <p className="text-4xl font-bold text-red-500 font-orbitron">18+</p>
                <p className="text-muted-foreground font-geist mt-2 text-sm">Service Areas</p>
              </div>
              <div className="glow-border rounded-lg p-6 text-center bg-card/50">
                <p className="text-4xl font-bold text-red-500 font-orbitron">Agile</p>
                <p className="text-muted-foreground font-geist mt-2 text-sm">Delivery Model</p>
              </div>
              <div className="glow-border rounded-lg p-6 text-center bg-card/50">
                <p className="text-4xl font-bold text-red-500 font-orbitron">India</p>
                <p className="text-muted-foreground font-geist mt-2 text-sm">Based Operations</p>
              </div>
            </div>
          </SlideUp>

          <SlideUp delay={0.1}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold text-red-500 font-orbitron mb-4">Company Overview</h2>
              <p className="text-gray-300 leading-relaxed font-geist mb-4">
                {company.brandName} is an India-based IT and software development company specialising in custom web applications, mobile apps, desktop software, and enterprise solutions. Our domain has been registered since {new Date(company.domainRegisteredDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}, and we have been actively delivering software projects since {company.establishedYear}.
              </p>
              <p className="text-gray-300 leading-relaxed font-geist">
                {company.description} We serve clients across India and internationally, combining local market understanding with global engineering standards.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.15}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold text-red-500 font-orbitron mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed font-geist">{company.mission}</p>
            </section>
          </SlideUp>

          <SlideUp delay={0.2}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold text-red-500 font-orbitron mb-4">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed font-geist">{company.vision}</p>
            </section>
          </SlideUp>

          <SlideUp delay={0.25}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold text-red-500 font-orbitron mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {company.values.map((value, index) => (
                  <div key={value} className="flex items-center gap-3 text-gray-300 font-geist">
                    <CheckCircle className="h-5 w-5 text-red-500 shrink-0" />
                    {value}
                  </div>
                ))}
              </div>
            </section>
          </SlideUp>

          <SlideUp delay={0.3}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold text-red-500 font-orbitron mb-4">Software Development Expertise</h2>
              <p className="text-gray-300 leading-relaxed font-geist mb-4">
                Our engineering teams cover the full software development lifecycle: requirements analysis, UI/UX design, front-end and back-end development, database architecture, API integration, quality assurance, cloud deployment, and ongoing maintenance.
              </p>
              <p className="text-gray-300 leading-relaxed font-geist">
                We work with modern technology stacks including React, Next.js, Node.js, Python, .NET, Flutter, and cloud platforms such as AWS and Azure. Every project is approached with security, scalability, and maintainability as foundational requirements.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.35}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold text-red-500 font-orbitron mb-4">Business Presence in India</h2>
              <p className="text-gray-300 leading-relaxed font-geist">
                Based in India, we understand the unique needs of Indian businesses including regional payment integrations, compliance considerations, and the importance of mobile-first design for diverse connectivity conditions. We offer both remote and on-site engagement models to suit your project requirements.
              </p>
            </section>
          </SlideUp>
        </div>
      </InnerPage>
      <CTASection />
    </>
  )
}
