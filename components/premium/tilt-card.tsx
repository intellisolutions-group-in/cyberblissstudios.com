"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { gsap, registerGsap } from "@/lib/gsap/register"
import { useFinePointer, useReducedMotion } from "@/lib/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!fine || reduced) return
    registerGsap()
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(el, {
        rotateY: x * maxTilt,
        rotateX: -y * maxTilt,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      })
    }
    const onLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: "power2.out",
      })
    }

    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [fine, reduced, maxTilt])

  return (
    <div ref={ref} className={cn("transform-gpu will-change-transform", className)} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  )
}
