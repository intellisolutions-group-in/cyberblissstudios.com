import { InnerPage } from "@/components/layout/inner-page"
import { ApplicationsTimeline } from "@/components/applications-timeline"
import { SlideUp } from "@/components/ui/slide-up"
import { CTASection } from "@/components/cta-section"
import { createMetadata } from "@/lib/seo"
import company from "@/data/company.json"

export const metadata = createMetadata({
  title: "Our Development Process",
  description: `Learn about ${company.brandName}'s proven software development methodology from discovery through deployment and support.`,
  keywords: ["development process", "Agile software development", "SDLC"],
  path: "/our-process/",
})

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
      <InnerPage
        title="Our Development Process"
        subtitle="A structured, transparent methodology that delivers quality software on schedule"
      >
        <SlideUp>
          <p className="text-gray-300 font-geist leading-relaxed text-center max-w-2xl mx-auto mb-16 px-4">
            At {company.brandName}, we follow a proven six-phase development process that ensures clarity, quality, and continuous client collaboration from project kick-off through long-term support.
          </p>
        </SlideUp>

        <ApplicationsTimeline showHeader={false} />

        <div className="container mx-auto px-4 max-w-4xl space-y-12 pt-16">
          <SlideUp>
            <h2 className="text-3xl font-bold text-white font-orbitron text-center mb-12">Detailed Phase Breakdown</h2>
          </SlideUp>

          {phases.map((phase, index) => (
            <SlideUp key={phase.step} index={index} hover>
              <div className="glow-border rounded-lg p-8 bg-card/30 h-full">
                <div className="flex items-start gap-6">
                  <span className="text-4xl font-orbitron font-bold text-red-500">{phase.step}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-orbitron text-white font-semibold mb-3">{phase.title}</h3>
                    <p className="text-gray-300 font-geist leading-relaxed mb-4">{phase.description}</p>
                    <h4 className="text-sm font-orbitron text-red-400 mb-2">Key Deliverables</h4>
                    <ul className="list-disc list-inside text-gray-400 font-geist space-y-1">
                      {phase.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SlideUp>
          ))}
        </div>
      </InnerPage>
      <CTASection />
    </>
  )
}
