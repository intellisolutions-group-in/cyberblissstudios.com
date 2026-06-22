"use client"

import { useRef, useEffect } from "react"
import { gsap, registerGsap } from "@/lib/gsap/register"
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion"
import { SectionReveal } from "@/components/premium/section-reveal"
import company from "@/data/company.json"
import { Shield, Eye, Zap, Users, Lock } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const principles: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Shield,
    title: "Engineering Excellence",
    description: "Clean architecture, code reviews, and quality gates on every delivery.",
  },
  {
    icon: Eye,
    title: "Transparent Delivery",
    description: "Regular demos, open communication, and visible sprint progress.",
  },
  {
    icon: Lock,
    title: "Security by Design",
    description: "Secure coding, encrypted data, and security-conscious development.",
  },
  {
    icon: Zap,
    title: "Continuous Improvement",
    description: "Iterative refinement backed by metrics and client feedback.",
  },
  {
    icon: Users,
    title: "Client-Centric Focus",
    description: "Business outcomes drive every technical decision we make.",
  },
]

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    registerGsap()
    const section = sectionRef.current
    const line = lineRef.current
    if (!section || !line) return

    const length = line.getTotalLength()
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })

    const ctx = gsap.context(() => {
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
          once: true,
        },
      })

      gsap.from("[data-node]", {
        scale: 0,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={sectionRef} className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 ambient-gradient pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.03]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionReveal
          title="Operating Principles"
          subtitle={`The values that guide every project at ${company.brandName}`}
          align="center"
        />

        <div className="relative hidden lg:block h-24 mb-8">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 80">
            <path
              ref={lineRef}
              d="M 50 40 Q 250 10, 500 40 T 950 40"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(239,68,68,0.2)" />
                <stop offset="50%" stopColor="rgba(239,68,68,0.8)" />
                <stop offset="100%" stopColor="rgba(239,68,68,0.2)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {principles.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                data-node
                className="glass-card glow-border rounded-xl p-6 text-center group hover:border-red-500/50 transition-colors duration-300"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 group-hover:bg-red-500/20 transition-colors">
                  <Icon className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="font-orbitron text-white font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-gray-400 font-geist text-xs leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
