"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SlideUp } from "@/components/ui/slide-up"
import { AnimatedCounter } from "@/components/premium/animated-counter"
import company from "@/data/company.json"

export function AboutSection() {
  const years = new Date().getFullYear() - company.establishedYear

  return (
    <section className="relative py-24 px-6 bg-background overflow-hidden">
      <div className="absolute inset-0 ambient-gradient pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <SlideUp>
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6 font-orbitron">
                About {company.brandName}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 font-geist">
                Since {company.establishedYear}, {company.brandName} has been delivering custom software solutions to businesses across India and internationally. Our domain has been registered since {new Date(company.domainRegisteredDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}, reflecting our long-standing commitment to the industry.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6 font-geist">
                {company.description} We combine technical depth with practical business understanding to build applications that solve real operational challenges.
              </p>
              <Link href="/about/" data-cursor="pointer">
                <Button className="bg-red-500 hover:bg-red-600 text-white font-geist border-0 shadow-lg shadow-red-500/20">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </SlideUp>
          <div className="grid grid-cols-2 gap-6">
            <SlideUp index={0} hover>
              <div className="glow-border glass-card rounded-lg p-6 text-center h-full">
                <p className="text-4xl font-bold text-red-500 font-orbitron">
                  <AnimatedCounter value={years} suffix="+" />
                </p>
                <p className="text-muted-foreground font-geist mt-2">Years Experience</p>
              </div>
            </SlideUp>
            <SlideUp index={1} hover>
              <div className="glow-border glass-card rounded-lg p-6 text-center h-full">
                <p className="text-4xl font-bold text-red-500 font-orbitron">
                  <AnimatedCounter value={18} suffix="+" />
                </p>
                <p className="text-muted-foreground font-geist mt-2">Service Areas</p>
              </div>
            </SlideUp>
            <SlideUp index={2} hover>
              <div className="glow-border glass-card rounded-lg p-6 text-center h-full">
                <p className="text-4xl font-bold text-red-500 font-orbitron">Agile</p>
                <p className="text-muted-foreground font-geist mt-2">Delivery Model</p>
              </div>
            </SlideUp>
            <SlideUp index={3} hover>
              <div className="glow-border glass-card rounded-lg p-6 text-center h-full">
                <p className="text-4xl font-bold text-red-500 font-orbitron">India</p>
                <p className="text-muted-foreground font-geist mt-2">Based Operations</p>
              </div>
            </SlideUp>
          </div>
        </div>
      </div>
    </section>
  )
}
