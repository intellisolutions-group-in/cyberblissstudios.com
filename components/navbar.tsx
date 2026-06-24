"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/premium/magnetic"
import { Menu, X, ChevronDown, Search } from "lucide-react"
import { services } from "@/lib/services"
import { getServiceCount } from "@/lib/company-stats"
import { LOGO_PATH } from "@/lib/seo"
import company from "@/data/company.json"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/about/", label: "About" },
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/blog/", label: "Blog" },
  { href: "/faq/", label: "FAQ" },
  { href: "/careers/", label: "Careers" },
  { href: "/contact/", label: "Contact" },
]

const serviceCategories = ["Web", "Mobile", "Enterprise", "Cloud", "Design"] as const

const CLOSE_DELAY_MS = 280

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const servicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navHeight = scrolled ? "3.5rem" : "4rem"

  const clearServicesTimer = () => {
    if (servicesTimer.current) {
      clearTimeout(servicesTimer.current)
      servicesTimer.current = null
    }
  }

  const openServices = () => {
    clearServicesTimer()
    setServicesOpen(true)
  }

  const scheduleServicesClose = () => {
    clearServicesTimer()
    servicesTimer.current = setTimeout(() => setServicesOpen(false), CLOSE_DELAY_MS)
  }

  const closeAllMenus = () => {
    clearServicesTimer()
    setServicesOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", closeAllMenus, { passive: true })
    return () => window.removeEventListener("scroll", closeAllMenus)
  }, [])

  useEffect(() => {
    if (!servicesOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAllMenus()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [servicesOpen])

  useEffect(() => {
    return () => clearServicesTimer()
  }, [])

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 border-b",
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-red-500/30 shadow-lg shadow-black/40"
            : "bg-black/80 backdrop-blur-lg border-red-500/10"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-500",
              scrolled ? "h-14" : "h-16"
            )}
          >
            <div className="flex-shrink-0">
              <Link href="/" data-cursor="pointer" aria-label={`${company.brandName} — Home`}>
                <Image
                  src={LOGO_PATH}
                  alt={`${company.brandName} logo`}
                  width={350}
                  height={100}
                  className={cn(
                    "w-auto transition-all duration-500",
                    scrolled ? "h-8 sm:h-9" : "h-9 sm:h-11"
                  )}
                  priority
                />
              </Link>
            </div>

            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Link
                  href="/about/"
                  className="font-geist text-white/90 hover:text-red-500 transition-colors duration-200"
                  data-cursor="pointer"
                >
                  About
                </Link>

                <div
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleServicesClose}
                >
                  <Link
                    href="/services/"
                    className={cn(
                      "font-geist transition-colors duration-200 flex items-center gap-1 py-2",
                      servicesOpen ? "text-red-500" : "text-white/90 hover:text-red-500"
                    )}
                    data-cursor="pointer"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    Services{" "}
                    <ChevronDown size={16} className={cn("transition-transform duration-300", servicesOpen && "rotate-180")} />
                  </Link>
                </div>

                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-geist text-white/90 hover:text-red-500 transition-colors duration-200"
                    data-cursor="pointer"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-menu"))}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-red-500/10 hover:border-red-500/30 bg-black/40 hover:bg-red-500/5 text-gray-400 hover:text-white transition-all text-xs font-geist cursor-pointer group"
                aria-label="Search site"
              >
                <Search size={14} className="text-gray-500 group-hover:text-red-500 transition-colors" />
                <span>Search</span>
                <kbd className="pointer-events-none select-none px-1.5 py-0.5 rounded border border-red-500/10 bg-black/80 font-mono text-[9px] text-gray-500 group-hover:text-red-400 transition-colors ml-1">
                  Ctrl+K
                </kbd>
              </button>

              <Magnetic strength={0.25}>
                <Link href="/contact/" data-cursor="pointer">
                  <Button className="bg-red-500 hover:bg-red-600 text-white font-geist border-0 shadow-lg shadow-red-500/20">
                    Get a Quote
                  </Button>
                </Link>
              </Magnetic>
            </div>

            <div className="lg:hidden flex items-center gap-4">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-menu"))}
                className="text-white hover:text-red-500 transition-colors duration-200 cursor-pointer"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-red-500 transition-colors duration-200 cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="lg:hidden pb-4">
              <div className="space-y-1 border-t border-red-500/20 pt-2">
                <Link href="/about/" className="block px-3 py-2 font-geist text-white" onClick={() => setIsOpen(false)}>
                  About
                </Link>
                <Link href="/services/" className="block px-3 py-2 font-geist text-white" onClick={() => setIsOpen(false)}>
                  Services
                </Link>
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 font-geist text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <Link href="/contact/" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-geist border-0">Get a Quote</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {servicesOpen && (
        <div
          className="fixed left-0 right-0 z-[9010] hidden lg:block pt-4 -mt-4"
          style={{ top: navHeight }}
          onMouseEnter={openServices}
          onMouseLeave={scheduleServicesClose}
        >
          <div className="nav-dropdown border-b border-red-500/20 shadow-2xl shadow-black/60 animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {serviceCategories.map((cat) => {
                  const catServices = services.filter((s) => s.category === cat).slice(0, 3)
                  if (catServices.length === 0) return null
                  return (
                    <div key={cat}>
                      <p className="font-orbitron text-red-500 text-xs uppercase tracking-wider mb-3">{cat}</p>
                      <ul className="space-y-2">
                        {catServices.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}/`}
                              className="block font-geist text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-200 rounded px-1 py-0.5 hover:bg-red-500/10"
                              data-cursor="pointer"
                            >
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-red-500/10 flex justify-between items-center">
                <p className="text-xs text-gray-500 font-geist">{getServiceCount()}+ services across the full stack</p>
                <Link
                  href="/services/"
                  className="text-sm text-red-500 hover:text-red-400 font-geist transition-colors"
                  data-cursor="pointer"
                >
                  View all services →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {servicesOpen && (
        <div
          className="fixed inset-0 z-[9005] bg-black/30 hidden lg:block"
          style={{ top: navHeight }}
          aria-hidden
          onClick={closeAllMenus}
        />
      )}
    </>
  )
}
