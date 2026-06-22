import { InnerPage } from "@/components/layout/inner-page"
import { ServiceCard } from "@/components/ui/service-card"
import { SlideUp } from "@/components/ui/slide-up"
import { CTASection } from "@/components/cta-section"
import { createMetadata } from "@/lib/seo"
import { services } from "@/lib/services"
import company from "@/data/company.json"

export const metadata = createMetadata({
  title: "Software Development Services",
  description: `Explore the full range of IT and software development services offered by ${company.brandName}.`,
  keywords: ["software services", "web development", "mobile apps", "enterprise software"],
  path: "/services/",
})

const categories = ["Web", "Mobile", "Desktop", "Enterprise", "Design", "Data", "Cloud", "Consulting"] as const

export default function ServicesPage() {
  return (
    <>
      <InnerPage
        title="Our Services"
        subtitle="Comprehensive software development services for businesses of all sizes"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          {categories.map((category, categoryIndex) => {
            const categoryServices = services.filter((s) => s.category === category)
            if (categoryServices.length === 0) return null
            return (
              <SlideUp key={category} delay={categoryIndex * 0.05} className="mb-16">
                <h2 className="text-2xl font-bold text-red-500 font-orbitron mb-8">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryServices.map((service, index) => (
                    <ServiceCard key={service.slug} service={service} index={index} />
                  ))}
                </div>
              </SlideUp>
            )
          })}
        </div>
      </InnerPage>
      <CTASection />
    </>
  )
}
