"use client"

import { useEffect, useRef } from "react"
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap/register"
import { Check } from "lucide-react"

interface Phase {
  step: string
  title: string
  description: string
  deliverables: string[]
}

interface ScrollProcessProps {
  phases: Phase[]
}

export function ScrollProcess({ phases }: ScrollProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // 1. Initialize and register GSAP plugins
    registerGsap()

    // 2. Setup line growth animation
    const progressTween = gsap.fromTo(
      lineRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 30%",
          end: "bottom 70%",
          scrub: true,
        },
      }
    )

    // 3. Setup sequential steps trigger highlights
    const triggerTimelines: gsap.core.Timeline[] = []

    phases.forEach((_, idx) => {
      const stepEl = stepRefs.current[idx]
      const nodeEl = nodeRefs.current[idx]
      const cardEl = cardRefs.current[idx]

      if (!stepEl || !nodeEl || !cardEl) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stepEl,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse",
        },
      })

      // Animate active dot
      tl.to(nodeEl, {
        scale: 1.2,
        backgroundColor: "rgba(239, 68, 68, 1)", // solid red-500
        borderColor: "rgba(248, 113, 113, 1)", // red-400
        boxShadow: "0 0 15px rgba(239, 68, 68, 0.7)",
        duration: 0.25,
      })

      // Animate active card border and background glow
      tl.to(cardEl, {
        borderColor: "rgba(239, 68, 68, 0.4)", // red border glow
        backgroundColor: "rgba(20, 20, 20, 0.7)", // darker highlight
        boxShadow: "0 4px 20px rgba(239, 68, 68, 0.05)",
        duration: 0.25,
      }, "<")

      // Animate text highlights
      const stepNumberText = cardEl.querySelector(".step-number")
      if (stepNumberText) {
        tl.to(stepNumberText, {
          color: "rgba(239, 68, 68, 1)",
          duration: 0.25,
        }, "<")
      }

      triggerTimelines.push(tl)
    })

    // 4. Cleanup function to kill triggers on unmount
    return () => {
      progressTween.scrollTrigger?.kill()
      progressTween.kill()
      triggerTimelines.forEach((tl) => {
        tl.scrollTrigger?.kill()
        tl.kill()
      })
    }
  }, [phases])

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6" ref={containerRef}>
      {/* Background Static Line Track */}
      <div className="absolute w-[2px] bg-red-500/10 left-[21px] md:left-[35px] top-6 bottom-6 pointer-events-none" />

      {/* Animated Growing Active Line */}
      <div
        ref={lineRef}
        className="absolute w-[2px] bg-gradient-to-b from-red-500 to-red-400 left-[21px] md:left-[35px] top-6 origin-top pointer-events-none shadow-md shadow-red-500/50"
        style={{ height: "0%" }}
      />

      {/* Steps List */}
      <div className="space-y-16 relative z-10">
        {phases.map((phase, index) => (
          <div
            key={phase.step}
            ref={(el) => { stepRefs.current[index] = el }}
            className="relative pl-10 md:pl-20 flex justify-start items-start"
          >
            {/* Circular Timeline Node */}
            <div
              ref={(el) => { nodeRefs.current[index] = el }}
              className="absolute left-[10px] md:left-[24px] top-6 -translate-x-1/2 h-6 w-6 rounded-full border border-red-500/30 bg-black flex items-center justify-center transition-all duration-300"
            >
              <div className="h-2 w-2 rounded-full bg-red-500/40" />
            </div>

            {/* Content Card */}
            <div
              ref={(el) => { cardRefs.current[index] = el }}
              className="w-full glow-border border border-red-500/10 rounded-lg p-6 sm:p-8 bg-card/25 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <span className="step-number text-3xl font-orbitron font-bold text-gray-600 transition-colors duration-300 shrink-0">
                  {phase.step}
                </span>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-orbitron text-white font-semibold mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-gray-300 font-geist text-sm sm:text-base leading-relaxed">
                      {phase.description}
                    </p>
                  </div>

                  {/* Deliverables Sublist */}
                  <div className="border-t border-red-500/5 pt-4">
                    <h4 className="text-xs font-orbitron font-bold uppercase tracking-wider text-red-400/80 mb-2">
                      Key Deliverables
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2" aria-label="Key Deliverables">
                      {phase.deliverables.map((item) => (
                        <li key={item} className="flex gap-2 items-center">
                          <Check className="h-3.5 w-3.5 text-red-500/60 shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-400 font-geist">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
