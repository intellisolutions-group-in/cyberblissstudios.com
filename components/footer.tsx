import Link from "next/link"
import { Mail } from "lucide-react"
import company from "@/data/company.json"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-red-500/20" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="font-orbitron text-2xl font-bold text-white mb-4">
              Cyber<span className="text-red-500">Bliss</span> Studios
            </p>
            {/* Logo placeholder - uncomment when logo is available
            <Image
              src="/images/logo.svg"
              alt={`${company.brandName} Logo`}
              width={128}
              height={32}
              className="h-8 w-auto mb-4"
            />
            */}
            <p className="font-geist text-gray-300 mb-6 max-w-md leading-relaxed">
              {company.tagline} Delivering reliable software solutions from India since {company.establishedYear}.
            </p>
            <div className="flex space-x-4">
              <a
                href={`mailto:${company.email}`}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              {/* Social media links - uncomment when available
              <a href="https://instagram.com/..." className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com/..." className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              */}
            </div>
          </div>

          <div>
            <h3 className="font-orbitron text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/web-development/" className="font-geist text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-app-development/" className="font-geist text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services/custom-software-development/" className="font-geist text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Custom Software
                </Link>
              </li>
              <li>
                <Link href="/services/" className="font-geist text-gray-400 hover:text-red-500 transition-colors duration-200">
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about/" className="font-geist text-gray-400 hover:text-red-500 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers/" className="font-geist text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="font-geist text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/portfolio/" className="font-geist text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="font-geist text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/why-choose-us/" className="font-geist text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/our-process/" className="font-geist text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="/faq/" className="font-geist text-gray-400 hover:text-red-500 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/testimonials/" className="font-geist text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-red-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-geist text-gray-400 text-sm">
              &copy; {currentYear} {company.brandName}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy/" className="font-geist text-gray-400 hover:text-red-500 text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms/" className="font-geist text-gray-400 hover:text-red-500 text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies/" className="font-geist text-gray-400 hover:text-red-500 text-sm transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
          {/* Office address - uncomment when available
          <p className="font-geist text-gray-500 text-sm mt-4 text-center md:text-left">
            {office address here}
          </p>
          */}
          {/* Phone number - uncomment when available
          <p className="font-geist text-gray-500 text-sm mt-2 text-center md:text-left">
            Phone: +91 XXXXX XXXXX
          </p>
          */}
        </div>
      </div>
    </footer>
  )
}
