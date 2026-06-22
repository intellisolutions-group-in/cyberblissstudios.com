"use client"

import { TextMarquee } from "@/components/premium/text-marquee"
import { AnimatedCounter } from "@/components/premium/animated-counter"
import company from "@/data/company.json"

const techStack = [
  "React", "Next.js", "Node.js", "Python", ".NET", "Flutter",
  "AWS", "Azure", "PostgreSQL", "Docker", "TypeScript", "GraphQL",
]

export function TrustBar() {
  const years = new Date().getFullYear() - company.establishedYear

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
              <AnimatedCounter value={18} suffix="+" />
            </p>
            <p className="text-gray-500 font-geist text-sm mt-1">Service Areas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-red-500 font-orbitron">
              <AnimatedCounter value={200} suffix="+" />
            </p>
            <p className="text-gray-500 font-geist text-sm mt-1">Projects Delivered</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-red-500 font-orbitron">
              <AnimatedCounter value={98} suffix="%" />
            </p>
            <p className="text-gray-500 font-geist text-sm mt-1">Client Satisfaction</p>
          </div>
        </div>
      </div>
      <TextMarquee items={techStack} speed="slow" />
    </section>
  )
}
