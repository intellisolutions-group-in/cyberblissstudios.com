"use client"

import { useEffect, useRef } from "react"
import { gsap, registerGsap } from "@/lib/gsap/register"
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion"

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    registerGsap()
    const bar = barRef.current
    if (!bar) return

    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" })

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })
    })

    return () => ctx.revert()
  }, [reduced])

  if (reduced) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9020] h-[2px] bg-gradient-to-r from-red-600 via-red-500 to-red-400 pointer-events-none"
      ref={barRef}
      aria-hidden
    />
  )
}
