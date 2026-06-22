"use client"

import { ScrollProgress } from "@/components/premium/scroll-progress"
import { CursorEffects } from "@/components/premium/cursor-effects"

/** Scroll progress only — cursor renders separately in layout (must be last in DOM). */
export function PremiumShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      {children}
    </>
  )
}

export { CursorEffects }
