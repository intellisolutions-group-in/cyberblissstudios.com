"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ThankYouModal } from "@/components/ui/thank-you-modal"
import { Loader2 } from "lucide-react"

interface ContactFormProps {
  showSubject?: boolean
  serviceName?: string
}

export function ContactForm({ showSubject = true, serviceName }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: serviceName || "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.message.trim()) newErrors.message = "Message is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    setShowModal(true)
    setFormData({ name: "", email: "", phone: "", subject: serviceName || "", message: "" })
    setErrors({})
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white font-geist">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-black/50 border-red-500/20 text-white font-geist"
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-geist">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-black/50 border-red-500/20 text-white font-geist"
              placeholder="you@company.com"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white font-geist">
              Phone
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-black/50 border-red-500/20 text-white font-geist"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          {showSubject && !serviceName && (
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white font-geist">
                Subject
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="bg-black/50 border-red-500/20 text-white font-geist"
                placeholder="Project inquiry"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-white font-geist">
            Message <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="bg-black/50 border-red-500/20 text-white font-geist min-h-[140px]"
            placeholder="Tell us about your project requirements..."
          />
          {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white font-geist border-0 w-full md:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>

      <ThankYouModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
