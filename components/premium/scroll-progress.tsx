"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) {
        setScrollPercent(0)
        return
      }
      const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / scrollHeight) * 100)))
      setScrollPercent(pct)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const isVisible = scrollPercent > 4
  const radius = 18
  const circumference = 2 * Math.PI * radius // ~113.1

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-6 right-6 z-[8000] h-12 w-12 rounded-full bg-black/90 backdrop-blur-md border border-red-500/10 hover:border-red-500/30 flex items-center justify-center transition-all duration-300 outline-none cursor-pointer shadow-lg shadow-black/50 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-75 pointer-events-none"
      }`}
      aria-label="Scroll to top"
      data-cursor="pointer"
    >
      {/* Radial Progress Circle SVG */}
      <svg className="absolute inset-0 h-full w-full transform -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={radius}
          className="stroke-red-500/10 fill-none"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          className="stroke-red-500 fill-none transition-all duration-300 ease-out"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - scrollPercent / 100)}
          strokeLinecap="round"
        />
      </svg>

      {/* Center Label (percentage or arrow) */}
      <div className="relative z-10 flex items-center justify-center">
        {isHovered ? (
          <ArrowUp className="h-4 w-4 text-red-500 animate-bounce" />
        ) : (
          <span className="text-[9px] font-orbitron font-bold text-white tracking-tighter">
            {scrollPercent}%
          </span>
        )}
      </div>
    </button>
  )
}
