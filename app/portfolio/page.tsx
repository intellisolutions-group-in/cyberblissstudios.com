import { InnerPage } from "@/components/layout/inner-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlideUp } from "@/components/ui/slide-up"
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
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          {portfolio.map((project, index) => (
            <SlideUp key={project.id} index={index} hover>
              <Card className="glow-border bg-card/30 border-red-500/20 h-full">
                <CardHeader>
                  <Badge variant="outline" className="w-fit border-red-500/30 text-red-400 font-geist mb-2">
                    {project.type}
                  </Badge>
                  <CardTitle className="text-white font-orbitron text-2xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-red-400 font-orbitron text-sm font-semibold mb-2">Challenge</h3>
                    <p className="text-gray-300 font-geist leading-relaxed">{project.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-red-400 font-orbitron text-sm font-semibold mb-2">Solution</h3>
                    <p className="text-gray-300 font-geist leading-relaxed">{project.solution}</p>
                  </div>
                  <div>
                    <h3 className="text-red-400 font-orbitron text-sm font-semibold mb-2">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-geist">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-red-400 font-orbitron text-sm font-semibold mb-2">Outcome</h3>
                    <p className="text-gray-300 font-geist leading-relaxed">{project.outcome}</p>
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
