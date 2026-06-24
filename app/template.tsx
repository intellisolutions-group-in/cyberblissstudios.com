"use client"

import { motion } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 0.35 }}
      className="relative"
    >
      {/* Cyberpunk Scanline Page Transition Accent */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-red-500 origin-left z-[9999] pointer-events-none shadow-[0_0_10px_#ef4444]"
      />
      {children}
    </motion.div>
  )
}
