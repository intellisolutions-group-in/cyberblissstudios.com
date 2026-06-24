import { InnerPage } from "@/components/layout/inner-page"
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid"
import { CTASection } from "@/components/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { createMetadata, portfolioItemListSchema, webPageSchema } from "@/lib/seo"
import portfolio from "@/data/portfolio.json"
import company from "@/data/company.json"

export const metadata = createMetadata({
  title: "Portfolio and Case Studies",
  description: `Explore software projects delivered by ${company.brandName} across healthcare, logistics, retail, education, and more.`,
  keywords: ["portfolio", "case studies", "software projects"],
  path: "/portfolio/",
})

const pageDescription = `Explore software projects delivered by ${company.brandName} across healthcare, logistics, retail, education, and more.`

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: `Portfolio and Case Studies | ${company.brandName}`,
            description: pageDescription,
            path: "/portfolio/",
          }),
          portfolioItemListSchema(
            portfolio.map((project) => ({
              title: project.title,
              description: project.challenge,
              type: project.type,
            }))
          ),
        ]}
      />
      <InnerPage
        title="Portfolio"
        subtitle="A selection of software solutions delivered for clients across diverse industries"
        path="/portfolio/"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <PortfolioGrid projects={portfolio} />
        </div>
      </InnerPage>
      <CTASection />
    </>
  )
}
