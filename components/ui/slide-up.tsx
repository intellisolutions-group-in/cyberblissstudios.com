"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/register"

interface SlideUpProps {
  children: ReactNode
  className?: string
  delay?: number
  index?: number
  hover?: boolean
}

export function SlideUp({
  children,
  className,
  delay,
  index = 0,
  hover = false,
}: SlideUpProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGsap()
    const el = ref.current
    if (!el) return

    const scrollDelay = delay ?? index * 0.12
    let onEnter: (() => void) | undefined
    let onLeave: (() => void) | undefined

    const reveal = () => {
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        delay: scrollDelay,
        ease: "power3.out",
        overwrite: "auto",
      })
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { autoAlpha: 0, y: 48 })

      const rect = el.getBoundingClientRect()
      const alreadyVisible = rect.top < window.innerHeight * 0.92

      if (alreadyVisible) {
        reveal()
      } else {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          delay: scrollDelay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
            once: true,
          },
        })
      }

      if (hover) {
        onEnter = () => {
          gsap.to(el, {
            y: -10,
            scale: 1.025,
            duration: 0.4,
            ease: "power2.out",
            boxShadow: "0 24px 48px -12px rgba(239, 68, 68, 0.35)",
          })
        }
        onLeave = () => {
          gsap.to(el, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          })
        }
        el.addEventListener("mouseenter", onEnter)
        el.addEventListener("mouseleave", onLeave)
      }
    }, ref)

    return () => {
      if (onEnter) el.removeEventListener("mouseenter", onEnter)
      if (onLeave) el.removeEventListener("mouseleave", onLeave)
      ctx.revert()
    }
  }, [delay, hover, index])

  return (
    <div ref={ref} className={cn(className, hover && "will-change-transform")}>
      {children}
    </div>
  )
}
