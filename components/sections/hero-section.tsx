"use client"

import dynamic from "next/dynamic"

const Hero3D = dynamic(
  () => import("@/components/hero-webgl").then((mod) => mod.Hero3DWebGL),
  { ssr: false }
)

export function HeroSection() {
  return <Hero3D />
}
