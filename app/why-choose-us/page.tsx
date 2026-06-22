import { InnerPage } from "@/components/layout/inner-page"
import { Card, CardContent } from "@/components/ui/card"
import { SlideUp } from "@/components/ui/slide-up"
import { CTASection } from "@/components/cta-section"
import { createMetadata } from "@/lib/seo"
import { CheckCircle } from "lucide-react"
import company from "@/data/company.json"

export const metadata = createMetadata({
  title: "Why Choose Us",
  description: `Discover why businesses trust ${company.brandName} for custom software development, enterprise solutions, and long-term technology partnerships.`,
  keywords: ["why choose us", "software development partner", "IT company India"],
  path: "/why-choose-us/",
})

const reasons = [
  {
    title: "Proven Track Record Since 2004",
    description: "With over two decades in the industry, we bring deep experience across web, mobile, desktop, and enterprise software development for diverse business domains.",
  },
  {
    title: "Transparent Agile Delivery",
    description: "Regular sprint demos, clear progress reporting, and open communication ensure you always know where your project stands and can provide timely feedback.",
  },
  {
    title: "Full-Stack Engineering Capability",
    description: "From UI/UX design to back-end architecture, database design, API integration, testing, and cloud deployment, we handle the complete software lifecycle.",
  },
  {
    title: "Security-Conscious Development",
    description: "We embed security best practices throughout development including secure coding standards, encrypted data handling, and access control design.",
  },
  {
    title: "India-Based with Global Standards",
    description: "Operating from India, we combine cost-effective delivery with engineering practices that meet international quality expectations.",
  },
  {
    title: "Flexible Engagement Models",
    description: "Whether you need a fixed-scope project, a dedicated development team, or ongoing maintenance support, we adapt to your business needs.",
  },
  {
    title: "Long-Term Partnership Approach",
    description: "Many clients start with a single project and expand into ongoing development partnerships. We invest in understanding your business for sustained value.",
  },
  {
    title: "Quality Assurance Built In",
    description: "Code reviews, automated testing, manual QA cycles, and performance validation are standard in every engagement, not optional add-ons.",
  },
]

export default function WhyChooseUsPage() {
  return (
    <>
      <InnerPage
        title="Why Choose Us"
        subtitle="The reasons businesses across India trust CyberBliss Studios for their software development needs"
      >
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          {reasons.map((reason, index) => (
            <SlideUp key={reason.title} index={index} hover>
              <Card className="glow-border bg-card/30 border-red-500/20 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-red-500 shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-orbitron text-white font-semibold mb-2">{reason.title}</h3>
                      <p className="text-gray-300 font-geist leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>
          ))}
        </div>
      </InnerPage>
      <CTASection />
    </>
  )
}
