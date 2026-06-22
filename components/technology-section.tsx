"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlideUp } from "@/components/ui/slide-up"
import { SectionReveal } from "@/components/premium/section-reveal"
import { TiltCard } from "@/components/premium/tilt-card"

const technologies = [
  { name: "React / Next.js", category: "Frontend" },
  { name: "Node.js / Python", category: "Backend" },
  { name: ".NET / C#", category: "Enterprise" },
  { name: "Flutter / React Native", category: "Mobile" },
  { name: "PostgreSQL / MongoDB", category: "Database" },
  { name: "Cloud Platforms", category: "Cloud" },
  { name: "Docker / CI/CD", category: "DevOps" },
  { name: "TypeScript", category: "Language" },
]

export function TechnologySection() {
  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 ambient-gradient pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.03]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionReveal
          title="Technology Stack"
          subtitle="We select proven, modern technologies that deliver performance, maintainability, and long-term value for your projects"
          align="center"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <SlideUp key={index} index={index} hover>
              <TiltCard maxTilt={6}>
                <Card className="glow-border bg-card/30 border-red-500/20 h-full glass-card">
                  <CardContent className="p-6 text-center">
                    <Badge variant="outline" className="border-red-500/30 text-red-400 font-geist mb-3">
                      {tech.category}
                    </Badge>
                    <p className="text-white font-orbitron font-semibold">{tech.name}</p>
                  </CardContent>
                </Card>
              </TiltCard>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  )
}
