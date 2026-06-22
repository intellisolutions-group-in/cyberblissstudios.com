"use client"

import { useEffect, useRef } from "react"
import { gsap, registerGsap } from "@/lib/gsap/register"
import { useFinePointer, useReducedMotion } from "@/lib/hooks/use-reduced-motion"

export function CursorEffects() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!fine || reduced) return

    registerGsap()
    const cursor = cursorRef.current
    const ring = ringRef.current
    const spotlight = spotlightRef.current
    if (!cursor || !ring || !spotlight) return

    document.body.classList.add("premium-cursor-active")

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }

    const moveCursor = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      gsap.to(spotlight, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power2.out",
      })
    }

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.15
      ringPos.y += (pos.y - ringPos.y) * 0.15
      gsap.set(cursor, { x: pos.x, y: pos.y })
      gsap.set(ring, { x: ringPos.x, y: ringPos.y })
    }

    gsap.ticker.add(tick)

    const onEnterInteractive = () => {
      gsap.to(ring, { scale: 1.8, borderColor: "rgba(239,68,68,0.9)", duration: 0.3 })
      gsap.to(cursor, { scale: 0.5, duration: 0.3 })
    }
    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(239,68,68,0.5)", duration: 0.3 })
      gsap.to(cursor, { scale: 1, duration: 0.3 })
    }

    window.addEventListener("mousemove", moveCursor, { passive: true })

    const bindInteractives = () => {
      const interactives = document.querySelectorAll("a, button, [data-cursor='pointer'], input, textarea, select, label")
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive)
        el.addEventListener("mouseleave", onLeaveInteractive)
      })
      return interactives
    }

    let interactives = bindInteractives()
    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive)
        el.removeEventListener("mouseleave", onLeaveInteractive)
      })
      interactives = bindInteractives()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.classList.remove("premium-cursor-active")
      window.removeEventListener("mousemove", moveCursor)
      gsap.ticker.remove(tick)
      observer.disconnect()
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive)
        el.removeEventListener("mouseleave", onLeaveInteractive)
      })
    }
  }, [fine, reduced])

  if (!fine || reduced) return null

  return (
    <>
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed top-0 left-0 z-[9500] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.05) 40%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-500/50"
        aria-hidden
      />
    </>
  )
}
