"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SlideUp } from "@/components/ui/slide-up"
import testimonials from "@/data/testimonials.json"

export function TestimonialsSection() {
  const featured = testimonials.slice(0, 3)

  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-card-foreground mb-4 font-orbitron">Client Testimonials</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-geist">
            What our clients say about working with CyberBliss Studios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((testimonial, index) => (
            <SlideUp key={testimonial.id} index={index} hover>
              <Card className="glow-border h-full bg-card/30 border-red-500/20">
                <CardContent className="p-6">
                  <p className="text-card-foreground mb-6 leading-relaxed font-geist">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-red-500/20 text-red-500 font-orbitron">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-primary font-geist">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground font-geist">
                        {testimonial.designation}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/testimonials/">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-geist bg-transparent">
              View All Testimonials
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
