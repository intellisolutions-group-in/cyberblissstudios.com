import { notFound } from "next/navigation"
import Link from "next/link"
import { InnerPage } from "@/components/layout/inner-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/ui/service-card"
import { ContactForm } from "@/components/ui/contact-form"
import { SlideUp } from "@/components/ui/slide-up"
import { CTASection } from "@/components/cta-section"
import { createMetadata } from "@/lib/seo"
import { getServiceBySlug, getAllServiceSlugs, getRelatedServices } from "@/lib/services"
import { CheckCircle } from "lucide-react"
import company from "@/data/company.json"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return createMetadata({
    title: service.title,
    description: service.shortDescription,
    keywords: [service.title, service.category, "software development India"],
    path: `/services/${slug}/`,
  })
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const related = getRelatedServices(slug)

  return (
    <>
      <InnerPage title={service.title} subtitle={service.shortDescription}>
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          <SlideUp>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-red-500/30 text-red-400 font-geist">
                {service.category}
              </Badge>
              {service.technologies.slice(0, 5).map((tech) => (
                <Badge key={tech} variant="secondary" className="font-geist">
                  {tech}
                </Badge>
              ))}
            </div>
          </SlideUp>

          <SlideUp delay={0.1}>
            <section className="glow-border rounded-lg p-8 bg-card/30 space-y-4">
              {service.content.map((paragraph, i) => (
                <p key={i} className="text-gray-300 leading-relaxed font-geist">
                  {paragraph}
                </p>
              ))}
            </section>
          </SlideUp>

          <SlideUp delay={0.15}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold text-red-500 font-orbitron mb-6">Key Features and Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-gray-300 font-geist">
                    <CheckCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    {feature}
                  </div>
                ))}
              </div>
            </section>
          </SlideUp>

          <SlideUp delay={0.2}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold text-red-500 font-orbitron mb-6">Technologies and Tools</h2>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="border-red-500/30 text-gray-300 font-geist">
                    {tech}
                  </Badge>
                ))}
              </div>
            </section>
          </SlideUp>

          <SlideUp delay={0.25}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold text-red-500 font-orbitron mb-6">Our Development Process</h2>
              <ol className="space-y-4">
                {service.process.map((step, i) => (
                  <li key={step} className="flex items-start gap-4 text-gray-300 font-geist">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-500 font-orbitron font-bold text-sm">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          </SlideUp>

          <SlideUp delay={0.3}>
            <section className="glow-border rounded-lg p-8 bg-card/30">
              <h2 className="text-2xl font-bold text-white font-orbitron mb-4">Request a Consultation</h2>
              <p className="text-gray-400 font-geist mb-6">
                Interested in {service.title.toLowerCase()}? Contact {company.brandName} for a free project consultation.
              </p>
              <ContactForm showSubject={false} serviceName={service.title} />
            </section>
          </SlideUp>

          {related.length > 0 && (
            <SlideUp delay={0.35}>
              <section>
                <h2 className="text-2xl font-bold text-red-500 font-orbitron mb-8">Related Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {related.map((s, index) => (
                    <ServiceCard key={s.slug} service={s} index={index} />
                  ))}
                </div>
              </section>
            </SlideUp>
          )}

          <SlideUp delay={0.4}>
            <div className="text-center">
              <Link href="/services/">
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-geist bg-transparent">
                  View All Services
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </InnerPage>
      <CTASection />
    </>
  )
}
