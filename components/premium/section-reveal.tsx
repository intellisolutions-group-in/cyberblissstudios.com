"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { gsap, registerGsap } from "@/lib/gsap/register"
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface SectionRevealProps {
  title: string
  subtitle?: string
  className?: string
  align?: "center" | "left"
  children?: ReactNode
}

export function SectionReveal({
  title,
  subtitle,
  className,
  align = "center",
  children,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    registerGsap()
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-reveal]"), {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [reduced, title])

  return (
    <div
      ref={ref}
      className={cn(
        "mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <h2
        data-reveal
        className={cn(
          "text-4xl md:text-5xl font-bold font-orbitron mb-4",
          align === "center" ? "text-foreground" : "text-white"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          data-reveal
          className={cn(
            "text-lg md:text-xl max-w-3xl leading-relaxed font-geist",
            align === "center" ? "mx-auto text-muted-foreground" : "text-gray-300"
          )}
        >
          {subtitle}
        </p>
      )}
      {children}
    </div>
  )
}
