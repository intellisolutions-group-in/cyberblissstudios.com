"use client"

import { useEffect } from "react"
import { Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ThankYouModalProps {
  isOpen: boolean
  onClose: () => void
  message?: string
}

export function ThankYouModal({
  isOpen,
  onClose,
  message = "Thank you! We will reach you soon.",
}: ThankYouModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md rounded-xl bg-white p-8 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <p className="font-geist text-lg text-gray-800">{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
