import { ContactForm } from "@/components/ui/contact-form"
import company from "@/data/company.json"
import { Mail, Clock } from "lucide-react"

export function ContactInquirySection() {
  return (
    <section id="contact" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-orbitron">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-geist">
            Have a project in mind? Send us a quick inquiry and our team will respond promptly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="glow-border rounded-lg p-6 bg-card/50">
              <Mail className="h-6 w-6 text-red-500 mb-3" />
              <h3 className="text-white font-orbitron font-semibold mb-2">Email</h3>
              <a href={`mailto:${company.email}`} className="text-gray-300 hover:text-red-500 font-geist transition-colors">
                {company.email}
              </a>
            </div>
            {/* Phone - uncomment when available
            <div className="glow-border rounded-lg p-6 bg-card/50">
              <Phone className="h-6 w-6 text-red-500 mb-3" />
              <h3 className="text-white font-orbitron font-semibold mb-2">Phone</h3>
              <p className="text-gray-300 font-geist">+91 XXXXX XXXXX</p>
            </div>
            */}
            <div className="glow-border rounded-lg p-6 bg-card/50">
              <Clock className="h-6 w-6 text-red-500 mb-3" />
              <h3 className="text-white font-orbitron font-semibold mb-2">Business Hours</h3>
              <p className="text-gray-300 font-geist">{company.businessHours}</p>
            </div>
          </div>

          <div className="lg:col-span-2 glow-border rounded-lg p-8 bg-card/30">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
