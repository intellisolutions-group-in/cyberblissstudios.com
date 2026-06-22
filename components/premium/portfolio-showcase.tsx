"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionReveal } from "@/components/premium/section-reveal"
import { TiltCard } from "@/components/premium/tilt-card"
import { gsap, registerGsap } from "@/lib/gsap/register"
import portfolio from "@/data/portfolio.json"

const categories = ["All", "Enterprise", "Mobile", "E-commerce", "Web", "Learning"]

export function PortfolioShowcase() {
  const [active, setActive] = useState("All")
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered =
    active === "All"
      ? portfolio.slice(0, 6)
      : portfolio.filter((p) => p.type.toLowerCase().includes(active.toLowerCase())).slice(0, 6)

  useEffect(() => {
    registerGsap()
    const grid = gridRef.current
    if (!grid) return

    const cards = grid.querySelectorAll("[data-portfolio-card]")
    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 30, scale: 0.96 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      }
    )
  }, [active])

  return (
    <section id="portfolio" className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 ambient-gradient pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionReveal
          title="Featured Projects"
          subtitle="Explore software solutions delivered across industries — filter by project type"
          align="center"
        />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              data-cursor="pointer"
              className={`px-5 py-2 rounded-full font-geist text-sm transition-all duration-300 border ${
                active === cat
                  ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/25"
                  : "bg-transparent text-gray-400 border-red-500/20 hover:border-red-500/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <div key={project.id} data-portfolio-card>
              <TiltCard>
                <Card className="glow-border bg-card/30 border-red-500/20 h-full glass-card">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit border-red-500/30 text-red-400 font-geist mb-2">
                      {project.type}
                    </Badge>
                    <CardTitle className="text-white font-orbitron">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 font-geist text-sm mb-4 leading-relaxed line-clamp-3">
                      {project.challenge}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-geist text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio/">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-geist bg-transparent"
              data-cursor="pointer"
            >
              View Full Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
