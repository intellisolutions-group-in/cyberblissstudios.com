"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SlideUp } from "@/components/ui/slide-up"
import portfolio from "@/data/portfolio.json"

export function PortfolioPreview() {
  const featured = portfolio.slice(0, 3)

  return (
    <section id="portfolio" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 font-orbitron">Featured Projects</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-geist">
            A selection of software solutions we have delivered for clients across diverse industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((project, index) => (
            <SlideUp key={project.id} index={index} hover>
              <Card className="glow-border bg-card/30 border-red-500/20 h-full">
                <CardHeader>
                  <Badge variant="outline" className="w-fit border-red-500/30 text-red-400 font-geist mb-2">
                    {project.type}
                  </Badge>
                  <CardTitle className="text-white font-orbitron">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 font-geist text-sm mb-4 leading-relaxed">{project.challenge}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-geist text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SlideUp>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio/">
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-geist bg-transparent">
              View Full Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
