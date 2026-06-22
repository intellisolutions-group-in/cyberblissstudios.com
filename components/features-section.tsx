"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlideUp } from "@/components/ui/slide-up"
import { SectionReveal } from "@/components/premium/section-reveal"
import { TiltCard } from "@/components/premium/tilt-card"
import { Code, Shield, Smartphone, Cloud, Database, Layers } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const features: { title: string; description: string; icon: LucideIcon; badge: string }[] = [
  {
    title: "Custom Development",
    description: "Tailored software solutions engineered to match your business processes and growth objectives.",
    icon: Code,
    badge: "Bespoke",
  },
  {
    title: "Security First",
    description: "Secure coding practices, encrypted data handling, and security-conscious architecture from day one.",
    icon: Shield,
    badge: "Secure",
  },
  {
    title: "Mobile Excellence",
    description: "Native and cross-platform mobile applications optimised for performance across Android and iOS.",
    icon: Smartphone,
    badge: "Mobile",
  },
  {
    title: "Cloud Ready",
    description: "Scalable cloud deployments on leading cloud platforms with reliable infrastructure design.",
    icon: Cloud,
    badge: "Cloud",
  },
  {
    title: "Data Engineering",
    description: "Robust database design, API development, and data integration for connected enterprise systems.",
    icon: Database,
    badge: "Data",
  },
  {
    title: "Full Stack Delivery",
    description: "End-to-end project delivery from UI/UX design through development, testing, and deployment.",
    icon: Layers,
    badge: "Complete",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-6 bg-background overflow-hidden">
      <div className="absolute inset-0 ambient-gradient pointer-events-none opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionReveal
          title="Why Businesses Choose Us"
          subtitle="Comprehensive software development capabilities backed by over two decades of engineering experience"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <SlideUp key={index} index={index} hover>
                <TiltCard maxTilt={6}>
                  <Card className="glow-border h-full bg-card/50 border-red-500/20 glass-card">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="h-8 w-8 text-red-500" />
                      <Badge variant="secondary" className="bg-accent text-accent-foreground font-geist">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-card-foreground font-orbitron">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed font-geist">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
                </TiltCard>
              </SlideUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
