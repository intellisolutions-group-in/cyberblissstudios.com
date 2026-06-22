"use client"

import { TextMarquee } from "@/components/premium/text-marquee"
import { AnimatedCounter } from "@/components/premium/animated-counter"
import company from "@/data/company.json"
import {
  getProjectsDelivered,
  getServiceCount,
  getYearsSinceEstablishment,
} from "@/lib/company-stats"

const techStack = [
  "React", "Next.js", "Node.js", "Python", ".NET", "Flutter",
  "Cloud", "PostgreSQL", "Docker", "TypeScript", "GraphQL",
]

export function TrustBar() {
  const years = getYearsSinceEstablishment()
  const serviceCount = getServiceCount()
  const projectsDelivered = getProjectsDelivered()

  return (
    <section className="relative border-y border-red-500/10 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-red-500 font-orbitron">
              <AnimatedCounter value={years} suffix="+" />
            </p>
            <p className="text-gray-500 font-geist text-sm mt-1">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-red-500 font-orbitron">
              <AnimatedCounter value={serviceCount} suffix="+" />
            </p>
            <p className="text-gray-500 font-geist text-sm mt-1">Service Areas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-red-500 font-orbitron">
              <AnimatedCounter value={projectsDelivered} suffix="+" />
            </p>
            <p className="text-gray-500 font-geist text-sm mt-1">Projects Delivered</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-red-500 font-orbitron">
              {company.establishedYear}
            </p>
            <p className="text-gray-500 font-geist text-sm mt-1">Established</p>
          </div>
        </div>
      </div>
      <TextMarquee items={techStack} speed="slow" />
    </section>
  )
}
