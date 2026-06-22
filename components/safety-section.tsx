"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SlideUp } from "@/components/ui/slide-up"
import { CheckCircle } from "lucide-react"

const reasons = [
  "Over two decades of software development experience since 2004",
  "Transparent Agile delivery with regular progress demos",
  "Full-stack capabilities from design to deployment and support",
  "Security-conscious development with industry best practices",
  "Flexible engagement models for startups and enterprises",
  "Dedicated project management and clear communication",
]

export function SafetySection() {
  return (
    <section id="why-us" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Why Choose Us</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-geist">
            A trusted technology partner for organisations that value quality engineering and dependable delivery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
          {reasons.map((reason, index) => (
            <SlideUp key={index} index={index} hover>
              <Card className="glow-border bg-card/30 border-red-500/20 h-full">
                <CardContent className="p-4 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-gray-300 font-geist">{reason}</p>
                </CardContent>
              </Card>
            </SlideUp>
          ))}
        </div>

        <div className="text-center">
          <Link href="/why-choose-us/">
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-geist bg-transparent">
              Explore All Reasons
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
