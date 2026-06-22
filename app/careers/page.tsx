import { InnerPage } from "@/components/layout/inner-page"
import { JobCard } from "@/components/ui/job-card"
import { SlideUp } from "@/components/ui/slide-up"
import { CTASection } from "@/components/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { createMetadata, jobPostingSchema, webPageSchema } from "@/lib/seo"
import careers from "@/data/careers.json"
import company from "@/data/company.json"

export const metadata = createMetadata({
  title: "Careers",
  description: `Join ${company.brandName} and build innovative software solutions. Explore current job openings in engineering, design, and more.`,
  keywords: ["careers", "software jobs India", "developer jobs"],
  path: "/careers/",
})

const pageDescription = `Join ${company.brandName} and build innovative software solutions. Explore current job openings in engineering, design, and more.`

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: `Careers | ${company.brandName}`,
            description: pageDescription,
            path: "/careers/",
          }),
          ...jobPostingSchema(careers),
        ]}
      />
      <InnerPage
        title="Careers"
        subtitle="Build your career with a team that values engineering excellence and continuous growth"
        path="/careers/"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <SlideUp>
            <p className="text-gray-300 font-geist leading-relaxed mb-12 text-center max-w-2xl mx-auto">
              {company.brandName} is always looking for talented individuals passionate about software development. Browse our current openings below and apply to join our team.
            </p>
          </SlideUp>

          <div className="space-y-8">
            {careers.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>
        </div>
      </InnerPage>
      <CTASection />
    </>
  )
}
