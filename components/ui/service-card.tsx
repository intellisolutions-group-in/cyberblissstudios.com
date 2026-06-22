import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlideUp } from "@/components/ui/slide-up"
import { TiltCard } from "@/components/premium/tilt-card"
import { ArrowRight } from "lucide-react"
import type { Service } from "@/lib/services"

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <SlideUp index={index} hover>
      <TiltCard>
        <Link href={`/services/${service.slug}/`} className="block h-full" data-cursor="pointer" aria-label={`Learn more about ${service.title}`}>
          <Card className="glow-border h-full bg-card/30 border-red-500/20 group glass-card transition-colors duration-300">
        <CardHeader>
          <Badge variant="outline" className="w-fit border-red-500/30 text-red-400 font-geist mb-2">
            {service.category}
          </Badge>
          <CardTitle className="text-white font-orbitron group-hover:text-red-400 transition-colors">
            {service.title}
          </CardTitle>
          <CardDescription className="text-gray-400 font-geist">{service.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="inline-flex items-center text-red-500 font-geist text-sm group-hover:gap-2 transition-all">
            Learn more <ArrowRight className="ml-1 h-4 w-4" />
          </span>
        </CardContent>
        </Card>
        </Link>
      </TiltCard>
    </SlideUp>
  )
}
