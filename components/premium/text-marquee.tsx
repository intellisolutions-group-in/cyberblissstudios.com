"use client"

import { cn } from "@/lib/utils"

interface TextMarqueeProps {
  items: string[]
  className?: string
  speed?: "slow" | "normal" | "fast"
}

export function TextMarquee({ items, className, speed = "normal" }: TextMarqueeProps) {
  const duration = speed === "slow" ? "40s" : speed === "fast" ? "20s" : "30s"
  const row = [...items, ...items]

  return (
    <div className={cn("relative overflow-hidden py-4", className)}>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div
        className="flex w-max gap-12 animate-marquee motion-reduce:animate-none"
        style={{ animationDuration: duration }}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-orbitron text-sm md:text-base text-gray-500 whitespace-nowrap uppercase tracking-widest"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
