import { InnerPage } from "@/components/layout/inner-page"
import { ApplicationsTimeline } from "@/components/applications-timeline"
import { ScrollProcess } from "@/components/process/scroll-process"
import { SlideUp } from "@/components/ui/slide-up"
import { CTASection } from "@/components/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { createMetadata, webPageSchema } from "@/lib/seo"
import company from "@/data/company.json"

export const metadata = createMetadata({
  title: "Our Development Process",
  description: `Learn about ${company.brandName}'s proven software development methodology from discovery through deployment and support.`,
  keywords: ["development process", "Agile software development", "SDLC"],
  path: "/our-process/",
})

const pageDescription = `Learn about ${company.brandName}'s proven software development methodology from discovery through deployment and support.`

const phases = [
  {
    step: "01",
    title: "Discovery and Requirements",
    description: "We conduct stakeholder workshops, document functional and non-functional requirements, assess technical feasibility, and define project scope, milestones, and success criteria. This phase ensures alignment before development begins.",
    deliverables: ["Requirements document", "Technical architecture outline", "Project timeline and milestones"],
  },
  {
    step: "02",
    title: "Design and Prototyping",
    description: "Our UI/UX designers create wireframes and interactive prototypes for approval. Information architecture, user flows, and visual design are refined based on your feedback before engineering starts.",
    deliverables: ["Wireframes and mockups", "Design system components", "Approved UI specifications"],
  },
  {
    step: "03",
    title: "Agile Development",
    description: "Development proceeds in two-week sprints with defined goals, daily stand-ups, and fortnightly demos. You see working software regularly and can adjust priorities based on evolving business needs.",
    deliverables: ["Sprint demos", "Working software increments", "Technical documentation"],
  },
  {
    step: "04",
    title: "Quality Assurance",
    description: "Dedicated QA engineers perform functional testing, regression testing, API validation, performance checks, and security reviews. Issues are logged, prioritised, and resolved before release.",
    deliverables: ["Test cases and reports", "Bug resolution log", "Performance benchmarks"],
  },
  {
    step: "05",
    title: "Deployment and Launch",
    description: "We manage staging environments, user acceptance testing, production deployment, and go-live support. Deployment runbooks and rollback procedures are prepared for a smooth launch.",
    deliverables: ["Production deployment", "UAT sign-off", "Launch support"],
  },
  {
    step: "06",
    title: "Maintenance and Support",
    description: "Post-launch, we offer maintenance packages covering bug fixes, security patches, dependency updates, and feature enhancements to keep your software current and secure.",
    deliverables: ["Support SLA", "Monitoring setup", "Enhancement roadmap"],
  },
]

export default function OurProcessPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          title: `Our Development Process | ${company.brandName}`,
          description: pageDescription,
          path: "/our-process/",
        })}
      />
      <InnerPage
        title="Our Development Process"
        subtitle="A structured, transparent methodology that delivers quality software on schedule"
        path="/our-process/"
      >
        <SlideUp>
          <p className="text-gray-300 font-geist leading-relaxed text-center max-w-2xl mx-auto mb-16 px-4">
            At {company.brandName}, we follow a proven six-phase development process that ensures clarity, quality, and continuous client collaboration from project kick-off through long-term support.
          </p>
        </SlideUp>

        <ApplicationsTimeline showHeader={false} />

        <div className="pt-16 pb-12">
          <SlideUp>
            <h2 className="text-3xl font-bold text-white font-orbitron text-center mb-12">Detailed Phase Breakdown</h2>
          </SlideUp>

          <ScrollProcess phases={phases} />
        </div>
      </InnerPage>
      <CTASection />
    </>
  )
}
