"use client"

import { useRef, useEffect } from "react"
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap/register"
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced) {
      el.textContent = `${prefix}${value}${suffix}`
      return
    }

    registerGsap()
    const obj = { val: 0 }

    const ctx = gsap.context(() => {
      const tween = gsap.to(obj, {
        val: value,
        duration,
        ease: "power2.out",
        paused: true,
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`
        },
      })

      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => tween.play(),
      })
    }, ref)

    return () => ctx.revert()
  }, [value, suffix, prefix, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
