import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/ui/service-card"
import { services } from "@/lib/services"

export function ServicesPreview() {
  const featured = services.slice(0, 6)

  return (
    <section id="services" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-orbitron">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-geist">
            End-to-end software development services tailored for businesses across India and beyond
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services/">
            <Button className="bg-red-500 hover:bg-red-600 text-white font-geist border-0">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
