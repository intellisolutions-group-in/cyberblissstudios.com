"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SlideUp } from "@/components/ui/slide-up"
import { Magnetic } from "@/components/premium/magnetic"

export function CTASection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
      <div className="absolute inset-0 ambient-gradient pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <SlideUp>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-orbitron text-balance">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto font-geist">
            Partner with CyberBliss Studios for reliable, scalable software solutions. Contact us today for a free consultation and project estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Magnetic strength={0.3}>
              <Link href="/contact/" data-cursor="pointer">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 pulse-button text-lg px-8 py-4 font-geist shadow-lg shadow-red-500/20"
                >
                  Get a Free Quote
                </Button>
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href="/services/" data-cursor="pointer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4 bg-transparent font-geist"
                >
                  Explore Services
                </Button>
              </Link>
            </Magnetic>
          </div>
        </SlideUp>
      </div>
    </section>
  )
}
