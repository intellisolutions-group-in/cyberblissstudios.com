"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ThankYouModal } from "@/components/ui/thank-you-modal"
import { Loader2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import company from "@/data/company.json"

interface CareerFormProps {
  isOpen: boolean
  onClose: () => void
  jobTitle: string
}

export function CareerForm({ isOpen, onClose, jobTitle }: CareerFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    coverLetter: "",
  })
  const [resume, setResume] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!resume) {
      newErrors.resume = "Resume is required"
    } else {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!validTypes.includes(resume.type)) {
        newErrors.resume = "Only PDF or DOC files are allowed"
      } else if (resume.size > 5 * 1024 * 1024) {
        newErrors.resume = "File size must be under 5MB"
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    const body = new FormData()
    body.append("name", formData.name)
    body.append("email", formData.email)
    body.append("phone", formData.phone)
    body.append("location", formData.location)
    body.append("jobTitle", jobTitle)
    if (resume) body.append("resume", resume)
    if (formData.coverLetter) body.append("coverLetter", formData.coverLetter)

    try {
      await fetch(`https://${company.domain}/api/career-application`, {
        method: "POST",
        body,
      })
    } catch {
      // Ignore response or error per spec
    }

    setLoading(false)
    onClose()
    setShowThankYou(true)
    setFormData({ name: "", email: "", phone: "", location: "", coverLetter: "" })
    setResume(null)
    setErrors({})
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setResume(file)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 px-4 py-8 overflow-y-auto"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-xl bg-white p-8 shadow-xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <h2 className="font-orbitron text-xl font-bold text-gray-900 mb-1">Apply for Position</h2>
              <p className="text-gray-600 font-geist mb-6">{jobTitle}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="career-name">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="career-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="career-email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="career-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="career-phone">Phone <span className="text-red-500">*</span></Label>
                  <Input
                    id="career-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="career-location">Current Location <span className="text-red-500">*</span></Label>
                  <Input
                    id="career-location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, State"
                  />
                  {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="career-resume">Resume (PDF/DOC, max 5MB) <span className="text-red-500">*</span></Label>
                  <Input
                    id="career-resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="career-cover">Cover Letter (Optional)</Label>
                  <Textarea
                    id="career-cover"
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    placeholder="Tell us why you are a good fit..."
                    className="min-h-[100px]"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-red-500 hover:bg-red-600 text-white border-0">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ThankYouModal
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        message="Thank you! Our team will review your application and reach you soon."
      />
    </>
  )
}
