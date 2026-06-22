"use client"

import { useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { registerGsap, ScrollTrigger } from "@/lib/gsap/register"

export function GsapProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    registerGsap()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => clearTimeout(timer)
  }, [pathname])

  return children
}
